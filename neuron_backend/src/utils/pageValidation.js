const { randomUUID } = require("crypto");
const { HttpError } = require("./http");
const {
  SECTION_TYPES,
  DESIGN_FIELDS,
  DESIGN_DEFAULTS,
  CATEGORIES,
  PAGE_ICONS,
  LIMITS,
  RESERVED_SLUGS,
} = require("../config/pageSchema");

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ANCHOR_PATTERN = /^[a-z][a-z0-9-]{0,39}$/;
const IMAGE_FITS = ["", "cover", "contain"];
const IMAGE_POSITIONS = ["", "center", "top", "bottom", "left", "right"];

function str(value, label, max) {
  const result = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  if (result.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`);
  return result;
}

function safeUrl(value, label, { allowAnchor = true, allowMail = true } = {}) {
  const result = str(value, label, 500);
  if (!result) return "";
  const allowed =
    (result.startsWith("/") && !result.startsWith("//")) ||
    (allowAnchor && result.startsWith("#")) ||
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(result) ||
    (allowMail && /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+(\?[^\s]*)?$/i.test(result)) ||
    (allowMail && /^tel:\+?[0-9\s-]{6,20}$/i.test(result));
  if (!allowed) {
    const options = allowMail ? '"/", "#", "https://", "mailto:" or "tel:"' : '"/" or "https://"';
    throw new HttpError(400, `${label} must start with ${options}.`);
  }
  return result;
}

function idFor(value, used) {
  let id = typeof value === "string" && /^[a-z0-9-]{1,40}$/i.test(value) ? value : "";
  if (!id || used.has(id)) id = randomUUID().slice(0, 8);
  used.add(id);
  return id;
}

function size(value, label) {
  const number = Number(value) || 0;
  if (number === 0) return 0;
  const { min, max } = LIMITS.imageSize;
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new HttpError(400, `${label} must be 0 (automatic) or a whole number between ${min} and ${max} pixels.`);
  }
  return number;
}

function cleanImage(value, label) {
  const source = isObject(value) ? value : {};
  return {
    url: safeUrl(source.url, `${label} address`, { allowAnchor: false, allowMail: false }),
    alt: str(source.alt, `${label} alt text`, 200),
    width: size(source.width, `${label} width`),
    height: size(source.height, `${label} height`),
    fit: IMAGE_FITS.includes(source.fit) ? source.fit : "",
    position: IMAGE_POSITIONS.includes(source.position) ? source.position : "",
  };
}

function cleanLink(value, label) {
  const source = isObject(value) ? value : {};
  return {
    label: str(source.label, `${label} label`, 120),
    shortLabel: str(source.shortLabel, `${label} mobile label`, 60),
    href: safeUrl(source.href, `${label} address`),
    newTab: source.newTab === true,
  };
}

function cleanStrings(value, label, max, itemMax) {
  const entries = Array.isArray(value) ? value : [];
  if (entries.length > max) throw new HttpError(400, `${label} can have at most ${max} entries.`);
  return entries.map((entry, index) => str(entry, `${label} ${index + 1}`, itemMax)).filter(Boolean);
}

function cleanTable(value, label) {
  const source = isObject(value) ? value : {};
  const columns = cleanStrings(source.columns, `${label} column`, LIMITS.tableColumns, 120);
  const rawRows = Array.isArray(source.rows) ? source.rows : [];
  if (rawRows.length > LIMITS.tableRows) throw new HttpError(400, `${label} can have at most ${LIMITS.tableRows} rows.`);
  const rows = rawRows.map((row, rowIndex) =>
    columns.map((_, columnIndex) => str(Array.isArray(row) ? row[columnIndex] : "", `${label} row ${rowIndex + 1} cell ${columnIndex + 1}`, 200))
  );
  return { columns, rows };
}

function cleanField(field, value, where, used) {
  const label = `${where} › ${field.label}`;
  switch (field.kind) {
    case "text":
    case "textarea":
      return str(value, label, field.max);
    case "link":
      return cleanLink(value, label);
    case "image":
      return cleanImage(value, label);
    case "icon":
      return typeof value === "string" && PAGE_ICONS.includes(value) ? value : "";
    case "tags":
    case "paragraphs":
      return cleanStrings(value, label, field.max, field.itemMax);
    case "toggle":
      return value === true;
    case "select":
      return field.options.some((option) => option.value === value) ? value : field.options[0].value;
    case "table":
      return cleanTable(value, label);
    case "list": {
      const entries = Array.isArray(value) ? value : [];
      if (entries.length > field.max) throw new HttpError(400, `${label} can have at most ${field.max} entries.`);
      return entries.map((entry, index) => {
        const source = isObject(entry) ? entry : {};
        const item = { id: idFor(source.id, used), visible: source.visible !== false };
        for (const sub of field.fields) item[sub.key] = cleanField(sub, source[sub.key], `${label} ${index + 1}`, used);
        return item;
      });
    }
    default:
      return undefined;
  }
}

function cleanDesign(value, allowed, where) {
  const source = isObject(value) ? value : {};
  const design = { ...DESIGN_DEFAULTS };
  for (const key of allowed) {
    const field = DESIGN_FIELDS[key];
    const raw = source[key];
    if (field.kind === "select") {
      design[key] = field.options.some((option) => option.value === raw) ? raw : DESIGN_DEFAULTS[key];
    } else if (field.kind === "color") {
      const hex = typeof raw === "string" ? raw.trim() : "";
      if (hex && !/^#[0-9a-f]{6}$/i.test(hex)) throw new HttpError(400, `${where} › ${field.label} must be a hex colour such as #21649A.`);
      design[key] = hex ? hex.toUpperCase() : DESIGN_DEFAULTS[key];
    } else if (key === "anchor") {
      const anchor = str(raw, `${where} › ${field.label}`, field.max).toLowerCase();
      if (anchor && !ANCHOR_PATTERN.test(anchor)) {
        throw new HttpError(400, `${where} › ${field.label} must start with a letter and use only lowercase letters, numbers and hyphens.`);
      }
      design[key] = anchor;
    }
  }
  return design;
}

function section(input, index, used) {
  const where = `Section ${index + 1}`;
  if (!isObject(input)) throw new HttpError(400, `${where} is invalid.`);
  const type = SECTION_TYPES[input.type];
  if (!type) throw new HttpError(400, `${where} has an unknown section type.`);
  const label = `${where} (${type.label})`;
  const source = isObject(input.content) ? input.content : {};
  const content = {};
  for (const field of type.fields) content[field.key] = cleanField(field, source[field.key], label, used);
  return {
    id: idFor(input.id, used),
    type: input.type,
    label: str(input.label, `${label} name`, 60) || type.label,
    visible: input.visible !== false,
    design: cleanDesign(input.design, type.design, label),
    content,
  };
}

function sections(input) {
  if (!Array.isArray(input)) throw new HttpError(400, "Page sections must be a list.");
  if (input.length > LIMITS.sections) throw new HttpError(400, `A page can have at most ${LIMITS.sections} sections.`);
  const used = new Set();
  const result = input.map((entry, index) => section(entry, index, used));
  const anchors = new Set();
  for (const entry of result) {
    if (!entry.design.anchor) continue;
    if (anchors.has(entry.design.anchor)) throw new HttpError(400, `Anchor ID "${entry.design.anchor}" is used by more than one section.`);
    anchors.add(entry.design.anchor);
  }
  return result;
}

function slug(value) {
  const result = str(value, "Page address", 60).toLowerCase();
  if (!result) throw new HttpError(400, "Page address is required.");
  if (!SLUG_PATTERN.test(result)) {
    throw new HttpError(400, "Page address may only use lowercase letters, numbers and single hyphens, e.g. family-events.");
  }
  if (RESERVED_SLUGS.includes(result)) throw new HttpError(409, `"/${result}" is already used by the website. Choose another address.`);
  return result;
}

function pageInfo(input, { core = false } = {}) {
  if (!isObject(input)) throw new HttpError(400, "Page details are missing.");
  const title = str(input.title, "Page title", 80);
  if (!title) throw new HttpError(400, "Page title is required.");
  const seo = isObject(input.seo) ? input.seo : {};
  const category = CATEGORIES.some((entry) => entry.value === input.category) ? input.category : "general";
  return {
    title,
    description: str(input.description, "Page description", 240),
    category: core
      ? (CATEGORIES.some((entry) => entry.value === input.category) ? input.category : "core")
      : category === "core"
        ? "general"
        : category,
    icon: PAGE_ICONS.includes(input.icon) ? input.icon : "FileText",
    status: core || input.status !== "draft" ? "published" : "draft",
    seo: {
      title: str(seo.title, "SEO title", 100),
      description: str(seo.description, "SEO description", 200),
    },
  };
}

module.exports = { sections, pageInfo, slug, SLUG_PATTERN };
