import { useSyncExternalStore } from "react";
import { siteDefaults } from "../config/siteDefaults";

const CACHE_KEY = "neuron-site-settings";
const ENDPOINT = "/api/site-settings";
const REFRESH_AFTER_MS = 60 * 1000;

const listeners = new Set();
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function merge(defaults, stored) {
  if (!isObject(defaults) || !isObject(stored)) return stored === undefined ? defaults : stored;
  const result = { ...defaults };
  for (const [key, value] of Object.entries(stored)) result[key] = merge(defaults[key], value);
  return result;
}

function normalize(settings) {
  const result = {};
  for (const section of Object.keys(siteDefaults)) {
    const value = merge(siteDefaults[section], settings?.[section]);
    const valid = Array.isArray(siteDefaults[section]) ? Array.isArray(value) : isObject(value);
    result[section] = valid ? value : siteDefaults[section];
  }
  return result;
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

let base = typeof window === "undefined" ? siteDefaults : readCache() || siteDefaults;
let overrides = null;
let state = base;
let lastFetched = 0;
let inFlight = null;

function recompute() {
  state = overrides ? normalize({ ...base, ...overrides }) : base;
  listeners.forEach((listener) => listener());
}

/** Admin preview only: shows unsaved settings on top of the saved ones. Never cached. */
export function setPreviewSettings(next) {
  overrides = isObject(next) ? Object.fromEntries(Object.entries(next).filter(([key]) => key in siteDefaults)) : null;
  recompute();
}

function refresh() {
  if (typeof window === "undefined" || inFlight) return;
  lastFetched = Date.now();
  inFlight = fetch(ENDPOINT, { headers: { Accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data?.settings) return;
      base = normalize(data.settings);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(base));
      } catch {
        // Storage can be full or disabled; the in-memory copy still applies.
      }
      recompute();
    })
    .catch(() => {})
    .finally(() => {
      inFlight = null;
    });
}

function onVisible() {
  if (document.visibilityState === "visible" && Date.now() - lastFetched > REFRESH_AFTER_MS) refresh();
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    if (!lastFetched) refresh();
    document.addEventListener("visibilitychange", onVisible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) document.removeEventListener("visibilitychange", onVisible);
  };
}

export function useSiteSettings(section) {
  const settings = useSyncExternalStore(subscribe, () => state, () => siteDefaults);
  return section ? settings[section] : settings;
}

export function getSiteSettings() {
  return state;
}

export const visibleOnly = (list) => (Array.isArray(list) ? list.filter((entry) => entry && entry.visible !== false) : []);

export function phoneHref(phone) {
  const digits = String(phone || "").replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}
