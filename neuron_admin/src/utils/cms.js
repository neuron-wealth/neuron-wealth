import { clone, newId } from "./list";

export const emptyImage = () => ({ url: "", alt: "", width: 0, height: 0, fit: "", position: "" });
export const emptyLink = () => ({ label: "", shortLabel: "", href: "", newTab: false });

export function emptyValue(field) {
  switch (field.kind) {
    case "link":
      return emptyLink();
    case "image":
      return emptyImage();
    case "tags":
    case "paragraphs":
    case "list":
      return [];
    case "toggle":
      return false;
    case "select":
      return field.options[0].value;
    case "table":
      return { columns: ["Column 1", "Column 2"], rows: [["", ""]] };
    default:
      return "";
  }
}

export function getPath(source, path) {
  return String(path || "")
    .split(".")
    .reduce((value, key) => (value && typeof value === "object" ? value[key] : undefined), source);
}

export function blankItem(field) {
  const item = { id: newId(), visible: true };
  for (const sub of field.fields) item[sub.key] = emptyValue(sub);
  if (field.titleKey && !field.titleKey.includes(".")) item[field.titleKey] = `New ${field.itemLabel}`;
  if (field.titleKey === "link.label") item.link.label = `New ${field.itemLabel}`;
  return item;
}

/** Deep copy that gives every list entry (and the copy itself) a fresh id. */
export function withNewIds(value) {
  const copy = clone(value);
  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach((entry) => {
        if (entry && typeof entry === "object" && !Array.isArray(entry) && typeof entry.id !== "string") {
          entry.id = "";
          entry.visible = entry.visible !== false;
        }
        walk(entry);
      });
    } else if (node && typeof node === "object") {
      if (typeof node.id === "string") node.id = newId();
      Object.values(node).forEach(walk);
    }
  };
  walk(copy);
  return copy;
}

export function newSection(type, designDefaults) {
  return withNewIds({
    id: "",
    type: type.type,
    label: type.label,
    visible: true,
    design: { ...designDefaults },
    content: { ...Object.fromEntries(type.fields.map((field) => [field.key, emptyValue(field)])), ...clone(type.template) },
  });
}

export const WIDE_KINDS = new Set(["textarea", "link", "image", "tags", "paragraphs", "table", "list", "note"]);

const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/[^\s/$.?#].[^\s]*$|mailto:[^\s@]+@[^\s@]+\.[^\s@]+|tel:\+?[0-9\s-]{6,20}$)/i;
export const isSafeHref = (href) => !href || SAFE_HREF.test(href.trim());

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

export const pagePayload = (page) =>
  page && {
    slug: page.slug,
    title: page.title,
    description: page.description,
    category: page.category,
    icon: page.icon,
    status: page.status,
    seo: page.seo,
    sections: page.sections,
  };
