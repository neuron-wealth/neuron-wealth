import { api, post } from "./api";

const BASE = "/api/pages";
const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const listPages = () => api(BASE);

export const fetchPageMeta = () => api(`${BASE}/meta`);

export const fetchPage = (slug) => api(`${BASE}/${encodeURIComponent(slug)}`).then((data) => data.page);

export const createPage = (page) => post(BASE, page);

export const savePage = (slug, page) => api(`${BASE}/${encodeURIComponent(slug)}`, json("PUT", page));

export const deletePage = (slug) => api(`${BASE}/${encodeURIComponent(slug)}`, { method: "DELETE" });

export const resetPage = (slug) => post(`${BASE}/${encodeURIComponent(slug)}/reset`);

export const seedPages = () => post(`${BASE}/seed`);

export const reloadDefaultPages = () => post(`${BASE}/reload-defaults`);

export function uploadImage(file) {
  const body = new FormData();
  body.append("image", file);
  return api(`${BASE}/media`, { method: "POST", body }).then((data) => data.image);
}

export function uploadDocument(file) {
  const body = new FormData();
  body.append("file", file);
  return api(`${BASE}/documents`, { method: "POST", body }).then((data) => data.file);
}
