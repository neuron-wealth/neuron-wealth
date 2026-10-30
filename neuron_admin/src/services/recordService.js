import { api } from "./api";

const base = (type) => `/api/${type}`;
const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const fetchDashboard = () => api("/api/dashboard");
export const fetchRecords = (type) => api(base(type));
export const createRecord = (type, data) => api(`${base(type)}/manual`, json("POST", data));
export const updateRecord = (type, id, patch) => api(`${base(type)}/${id}`, json("PATCH", patch));
export const deleteRecord = (type, id) => api(`${base(type)}/${id}`, { method: "DELETE" });
export const bulkRecords = (type, ids, action, status) => api(`${base(type)}/bulk`, json("POST", { ids, action, status }));
