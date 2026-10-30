import { useCallback, useSyncExternalStore } from "react";
import { pageDefaults } from "../config/pageDefaults";

const CACHE_PREFIX = "neuron-page-";
const REFRESH_AFTER_MS = 60 * 1000;
const stores = new Map();

const isPage = (value) => Boolean(value) && Array.isArray(value.sections);

function readCache(slug) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CACHE_PREFIX + slug) || "null");
    return isPage(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(slug, page) {
  try {
    if (page) window.localStorage.setItem(CACHE_PREFIX + slug, JSON.stringify(page));
    else window.localStorage.removeItem(CACHE_PREFIX + slug);
  } catch {
    // Storage can be full or disabled; the in-memory copy still applies.
  }
}

function storeFor(slug) {
  if (!stores.has(slug)) {
    const fallback = pageDefaults[slug] || null;
    const cached = typeof window === "undefined" ? null : readCache(slug);
    const page = cached || fallback;
    stores.set(slug, {
      snapshot: { page, status: page ? "ready" : "loading" },
      listeners: new Set(),
      lastFetched: 0,
      inFlight: null,
    });
  }
  return stores.get(slug);
}

function publish(store, snapshot) {
  store.snapshot = snapshot;
  store.listeners.forEach((listener) => listener());
}

function refresh(slug) {
  const store = storeFor(slug);
  if (typeof window === "undefined" || store.inFlight) return;
  store.lastFetched = Date.now();
  store.inFlight = fetch(`/api/pages/public/${encodeURIComponent(slug)}`, { headers: { Accept: "application/json" } })
    .then(async (response) => {
      if (response.status === 404) {
        const fallback = pageDefaults[slug] || null;
        writeCache(slug, null);
        publish(store, { page: fallback, status: fallback ? "ready" : "missing" });
        return;
      }
      const data = response.ok ? await response.json() : null;
      if (!isPage(data?.page)) throw new Error("Invalid page response");
      writeCache(slug, data.page);
      publish(store, { page: data.page, status: "ready" });
    })
    .catch(() => {
      if (store.snapshot.status === "loading") publish(store, { page: null, status: "error" });
    })
    .finally(() => {
      store.inFlight = null;
    });
}

function onVisible() {
  if (document.visibilityState !== "visible") return;
  for (const [slug, store] of stores) {
    if (store.listeners.size && Date.now() - store.lastFetched > REFRESH_AFTER_MS) refresh(slug);
  }
}

let watching = 0;

/** Live CMS page content with the bundled defaults (or last cached copy) shown until the API answers. */
export function usePage(slug) {
  const store = storeFor(slug);
  const subscribe = useCallback(
    (listener) => {
      store.listeners.add(listener);
      if (!store.lastFetched) refresh(slug);
      if (watching++ === 0) document.addEventListener("visibilitychange", onVisible);
      return () => {
        store.listeners.delete(listener);
        if (--watching === 0) document.removeEventListener("visibilitychange", onVisible);
      };
    },
    [slug, store]
  );
  return useSyncExternalStore(subscribe, () => store.snapshot, () => store.snapshot);
}
