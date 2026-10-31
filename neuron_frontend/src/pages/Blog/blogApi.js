import { useCallback, useEffect, useState } from "react";

const REFRESH_AFTER_MS = 60 * 1000;
const cache = new Map();

async function getJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;
  if (!response.ok || !data) {
    const error = new Error(data?.message || "Failed to load blog data.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function cached(key, load) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.at < REFRESH_AFTER_MS) return entry.promise;
  const promise = load().catch((error) => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, { at: Date.now(), promise });
  return promise;
}

export const fetchBlogList = () => cached("list", () => getJson("/api/blogs/public"));

export const fetchBlogPost = (slug) => cached(`post:${slug}`, () => getJson(`/api/blogs/public/${encodeURIComponent(slug)}`));

export const fetchBlogComments = (slug, page = 1) => getJson(`/api/blogs/public/${encodeURIComponent(slug)}/comments?page=${page}`);

export async function postBlogComment(slug, body) {
  const response = await fetch(`/api/blogs/public/${encodeURIComponent(slug)}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Your comment could not be sent. Please try again.");
  return data;
}

/** { data, error, loading, reload } for a cached blog request. */
export function useBlogRequest(key, load) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  const run = useCallback(() => {
    let active = true;
    setState({ data: null, error: null, loading: true });
    load()
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => run(), [run]);

  const reload = () => {
    cache.clear();
    run();
  };

  return { ...state, reload };
}

const DATE = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Kolkata" });
const TIME = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export const formatBlogDate = (iso) => (iso ? DATE.format(new Date(iso)) : "");

export const formatCommentDate = (iso) => (iso ? `${DATE.format(new Date(iso))} at ${TIME.format(new Date(iso)).toLowerCase()}` : "");
