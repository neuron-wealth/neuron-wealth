import { api, post } from "./api";

const BASE = "/api/library";
const json = (method, body) => ({ method, body: JSON.stringify(body) });
const q = (path) => encodeURIComponent(path || "");

export const listFolder = (path = "") => api(`${BASE}?path=${q(path)}`);

export const listAllFolders = () => api(`${BASE}/folders`).then((data) => data.folders);

export const searchLibrary = (query) => api(`${BASE}/search?q=${encodeURIComponent(query)}`).then((data) => data.files);

export const createFolder = (path, name) => post(`${BASE}/folders`, { path, name });

export const renameItem = (path, name, folder) => api(`${BASE}/rename`, json("PATCH", { path, name, folder }));

export const moveItem = (path, to) => post(`${BASE}/move`, { path, to });

export const deleteItem = (path, folder) => api(`${BASE}?path=${q(path)}&folder=${folder ? "true" : "false"}`, { method: "DELETE" });

export function uploadFiles(path, files) {
  const body = new FormData();
  [...files].forEach((file) => body.append("files", file));
  return api(`${BASE}/upload?path=${q(path)}`, { method: "POST", body });
}
