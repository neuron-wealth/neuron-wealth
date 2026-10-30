import { api, post } from "./api";

const BASE = "/api/site-settings";

export const fetchSiteSettings = () => api(BASE).then((data) => data.settings);

export const fetchSiteMeta = () => api(`${BASE}/meta`);

export const saveSiteSection = (section, value) =>
  api(`${BASE}/${section}`, { method: "PUT", body: JSON.stringify(value) });

export const resetSiteSection = (section) => post(`${BASE}/${section}/reset`);

export function uploadLogo(variant, file) {
  const body = new FormData();
  body.append("logo", file);
  return api(`${BASE}/logo/${variant}`, { method: "POST", body });
}

export const removeLogo = (variant) => api(`${BASE}/logo/${variant}`, { method: "DELETE" });
