// Field builders shared by pageSchema.js and the per-page modules in ./pages.
const text = (key, label, max = 120, extra = {}) => ({ key, label, kind: "text", max, ...extra });
const textarea = (key, label, max = 600, extra = {}) => ({ key, label, kind: "textarea", max, ...extra });
const link = (key, label, extra = {}) => ({ key, label, kind: "link", ...extra });
const image = (key, label, extra = {}) => ({ key, label, kind: "image", sizing: true, ...extra });
const icon = (key = "icon", label = "Icon") => ({ key, label, kind: "icon" });
const tags = (key, label, max = 12, itemMax = 60, extra = {}) => ({ key, label, kind: "tags", max, itemMax, ...extra });
const paragraphs = (key, label, max = 8, itemMax = 1500, extra = {}) => ({ key, label, kind: "paragraphs", max, itemMax, ...extra });
const toggle = (key, label, extra = {}) => ({ key, label, kind: "toggle", ...extra });
const select = (key, label, options, extra = {}) => ({ key, label, kind: "select", options, ...extra });
const table = (key, label, extra = {}) => ({ key, label, kind: "table", ...extra });
const list = (key, label, itemLabel, max, fields, extra = {}) => ({ key, label, kind: "list", itemLabel, max, fields, ...extra });
const opt = (value, label) => ({ value, label });

module.exports = { text, textarea, link, image, icon, tags, paragraphs, toggle, select, table, list, opt };
