import { api, post } from "./api";

const BASE = "/api/notifications";
const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const fetchNotifications = () => api(BASE);

/** `target` is { ids: [...] }, { kind: "enquiries" } or { all: true }. */
export const markNotificationsRead = (target) => post(`${BASE}/read`, target);

/** Removes notifications: { ids: [...] }, { kind: "enquiries" } or { all: true }. */
export const clearNotifications = (target) => post(`${BASE}/clear`, target);

export const fetchEmailSettings = () => api(`${BASE}/email-settings`);

export const saveEmailSettings = (settings) => api(`${BASE}/email-settings`, json("PUT", settings));

export const resetEmailTemplate = (event) => post(`${BASE}/email-settings/${encodeURIComponent(event)}/reset`);

export const sendTestEmail = (event, template) => post(`${BASE}/email-settings/${encodeURIComponent(event)}/test`, { template });
