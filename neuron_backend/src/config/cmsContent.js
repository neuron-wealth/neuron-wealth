// Content builders for the per-page default modules in ./pages.
// Mirrored in neuron_frontend/src/config/cmsContent.js — keep both in sync.
const img = (url, alt, extra = {}) => ({ url, alt, width: 0, height: 0, fit: "", position: "", ...extra });
const lnk = (label, href, extra = {}) => ({ label, shortLabel: "", href, newTab: false, ...extra });
const design = (extra = {}) => ({
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
const section = (id, type, label, content, designExtra) => ({ id, type, label, visible: true, design: design(designExtra), content });
const items = (prefix, list) => list.map((entry, index) => ({ id: `${prefix}-${index + 1}`, visible: true, ...entry }));

module.exports = { img, lnk, design, section, items };
