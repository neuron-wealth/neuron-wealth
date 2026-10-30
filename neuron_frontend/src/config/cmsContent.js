// Content builders for the per-page default modules in ./pages.
// Mirrored in neuron_backend/src/config/cmsContent.js — keep both in sync.
export const img = (url, alt, extra = {}) => ({ url, alt, width: 0, height: 0, fit: "", position: "", ...extra });
export const lnk = (label, href, extra = {}) => ({ label, shortLabel: "", href, newTab: false, ...extra });
export const design = (extra = {}) => ({
  background: "default",
  backgroundColor: "#F7F8F5",
  spacing: "default",
  tone: "auto",
  align: "default",
  columns: "default",
  imageSide: "default",
  cardStyle: "default",
  layout: "default",
  width: "default",
  anchor: "",
  ...extra,
});
export const section = (id, type, label, content, designExtra) => ({ id, type, label, visible: true, design: design(designExtra), content });
export const items = (prefix, list) => list.map((entry, index) => ({ id: `${prefix}-${index + 1}`, visible: true, ...entry }));
