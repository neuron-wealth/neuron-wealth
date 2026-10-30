function resolveSiteUrl() {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:3000";
  }
  return (process.env.SITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://neuronwealth.com")).replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();

export const SITE_ORIGIN = new URL(SITE_URL).origin;

export const siteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Website assets such as /images/... live on the website, uploads are proxied through /api. */
export function assetUrl(url) {
  if (!url) return "";
  if (url.startsWith("/api/") || /^https?:\/\//i.test(url)) return url;
  return url.startsWith("/") ? siteUrl(url) : url;
}
