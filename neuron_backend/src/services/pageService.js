const fs = require("fs");
const path = require("path");
const { randomBytes } = require("crypto");
const { imageSize } = require("image-size");
const { hasDB } = require("../config/db");
const env = require("../config/env");
const Page = require("../models/Page");
const { pageDefaults, DEFAULT_SLUGS } = require("../config/pageDefaults");
const schema = require("../config/pageSchema");
const validate = require("../utils/pageValidation");
const { readJson, writeJson } = require("../utils/fileStore");
const { HttpError } = require("../utils/http");

const FILE = "pages.json";
const UPLOAD_PREFIX = "/api/uploads/media/";
const mediaDir = path.join(env.uploadsDir, "media");
const DOCUMENT_PREFIX = "/api/uploads/documents/";
const documentsDir = path.join(env.uploadsDir, "documents");
const FIELDS = ["slug", "title", "description", "category", "icon", "status", "seo", "sections"];

const clone = (value) => JSON.parse(JSON.stringify(value));
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isCore = (slug) => DEFAULT_SLUGS.includes(slug);
const pathFor = (slug) => {
  if (slug === "home") return "/";
  if (slug === "nri-returning-to-india") return "/services/nri-returning-to-india";
  if (slug === "global-indians") return "/services/global-indians";
  if (slug === "global-citizens-in-india") return "/services/global-citizens-in-india";
  if (slug === "global-investor") return "/services/global-investor";
  if (slug === "founders-and-entrepreneurs") return "/services/founders-and-entrepreneurs";
  if (slug === "professionals-and-cxos") return "/services/professionals-and-cxos";
  return `/${slug}`;
};

function shape(doc) {
  return {
    ...Object.fromEntries(FIELDS.map((key) => [key, doc[key]])),
    sections: Array.isArray(doc.sections) ? doc.sections : [],
    seo: isObject(doc.seo) ? doc.seo : { title: "", description: "" },
    core: isCore(doc.slug),
    seeded: true,
    path: pathFor(doc.slug),
    createdAt: doc.createdAt || null,
    updatedAt: doc.updatedAt || null,
  };
}

function fromDefaults(slug) {
  return { ...shape(clone(pageDefaults[slug])), seeded: false };
}

function readFileStore() {
  const stored = readJson(FILE, {});
  return Array.isArray(stored.pages) ? stored.pages : [];
}

async function readAll() {
  if (hasDB()) return (await Page.find().lean()).map(shape);
  return readFileStore().map(shape);
}

async function readOne(slug) {
  if (hasDB()) {
    const doc = await Page.findOne({ slug }).lean();
    return doc ? shape(doc) : null;
  }
  const doc = readFileStore().find((entry) => entry.slug === slug);
  return doc ? shape(doc) : null;
}

async function writeOne(page, previousSlug = page.slug) {
  const data = Object.fromEntries(FIELDS.map((key) => [key, page[key]]));
  if (hasDB()) {
    await Page.findOneAndUpdate({ slug: previousSlug }, { $set: data }, { upsert: true });
    return readOne(page.slug);
  }
  const now = new Date().toISOString();
  const pages = readFileStore();
  const index = pages.findIndex((entry) => entry.slug === previousSlug);
  if (index >= 0) pages[index] = { ...pages[index], ...data, updatedAt: now };
  else pages.push({ ...data, createdAt: now, updatedAt: now });
  writeJson(FILE, { pages });
  return readOne(page.slug);
}

async function removeOne(slug) {
  if (hasDB()) {
    await Page.deleteOne({ slug });
    return;
  }
  writeJson(FILE, { pages: readFileStore().filter((entry) => entry.slug !== slug) });
}

function summary(page) {
  return {
    slug: page.slug,
    title: page.title,
    description: page.description,
    category: page.category,
    icon: page.icon,
    status: page.status,
    core: page.core,
    seeded: page.seeded,
    path: page.path,
    sectionCount: page.sections.length,
    hiddenCount: page.sections.filter((entry) => entry.visible === false).length,
    updatedAt: page.updatedAt,
  };
}

function isEmptyVal(val) {
  if (val === undefined || val === null || val === "") return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === "object" && !Array.isArray(val)) {
    const vals = Object.values(val);
    return vals.every((v) => v === "" || v === false || v === 0 || v === null || v === undefined);
  }
  return false;
}

function mergeCoreDefaults(page) {
  if (!page || !isCore(page.slug)) return page;
  const def = pageDefaults[page.slug];
  if (!def || !Array.isArray(def.sections)) return page;

  const defaultSectionMap = new Map();
  for (const s of def.sections) {
    if (s.id) defaultSectionMap.set(s.id, s);
    if (s.type) defaultSectionMap.set(`type:${s.type}`, s);
  }

  const existingSections = Array.isArray(page.sections) ? page.sections : [];
  const mergedSections = existingSections.map((section) => {
    const defSec = defaultSectionMap.get(section.id) || defaultSectionMap.get(`type:${section.type}`);
    if (!defSec || !defSec.content || typeof defSec.content !== "object") return section;

    const baseContent = clone(defSec.content);
    if (section.content && typeof section.content === "object") {
      for (const [key, val] of Object.entries(section.content)) {
        if (!isEmptyVal(val)) {
          baseContent[key] = val;
        }
      }
    }
    return { ...section, content: baseContent };
  });

  const existingTypes = new Set(mergedSections.map((s) => s.type));
  for (const defSec of def.sections) {
    if (!existingTypes.has(defSec.type)) {
      mergedSections.push(clone(defSec));
    }
  }

  return {
    ...page,
    title: page.title || def.title,
    description: page.description || def.description,
    icon: page.icon || def.icon,
    sections: mergedSections,
  };
}

async function findPage(slug) {
  const stored = await readOne(slug);
  if (stored) return isCore(slug) ? mergeCoreDefaults(stored) : stored;
  if (isCore(slug)) return fromDefaults(slug);
  return null;
}

async function listPages() {
  const stored = await readAll();
  const known = new Set(stored.map((page) => page.slug));
  const pages = [...DEFAULT_SLUGS.filter((slug) => !known.has(slug)).map(fromDefaults), ...stored];
  pages.sort((a, b) => {
    if (a.core && b.core) {
      const ia = DEFAULT_SLUGS.indexOf(a.slug);
      const ib = DEFAULT_SLUGS.indexOf(b.slug);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    }
    return Number(b.core) - Number(a.core) || a.title.localeCompare(b.title);
  });
  return { pages: pages.map(summary), missing: DEFAULT_SLUGS.filter((slug) => !known.has(slug)) };
}

async function getPage(slug) {
  const page = await findPage(slug);
  if (!page) throw new HttpError(404, "Page not found.");
  return page;
}

function stripHidden(value) {
  if (Array.isArray(value)) return value.filter((entry) => !(isObject(entry) && entry.visible === false)).map(stripHidden);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, stripHidden(entry)]));
  return value;
}

async function getPublicPage(slug) {
  const page = await findPage(slug);
  if (!page || page.status !== "published") throw new HttpError(404, "Page not found.");
  return {
    slug: page.slug,
    title: page.title,
    seo: page.seo,
    path: page.path,
    updatedAt: page.updatedAt,
    sections: stripHidden(page.sections.filter((entry) => entry.visible !== false)),
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

async function assertSlugFree(slug) {
  if (isCore(slug) || (await readOne(slug))) throw new HttpError(409, `A page at "/${slug}" already exists.`);
}

async function createPage(input) {
  const { pages } = await listPages();
  if (pages.length >= schema.LIMITS.pages) throw new HttpError(400, `The CMS can hold at most ${schema.LIMITS.pages} pages.`);
  const info = validate.pageInfo(input);
  const slug = validate.slug(input?.slug || slugify(info.title));
  await assertSlugFree(slug);

  let sections;
  if (input?.copyFrom) {
    const source = await getPage(String(input.copyFrom));
    sections = validate.sections(clone(source.sections));
  } else {
    sections = validate.sections([
      { type: "richText", label: "Introduction", content: { ...clone(schema.TEMPLATES.richText), title: info.title } },
    ]);
  }
  return writeOne({ ...info, slug, sections });
}

async function updatePage(slug, input) {
  const existing = await getPage(slug);
  const core = existing.core;
  const info = validate.pageInfo(input, { core });
  const sections = validate.sections(input?.sections);
  const nextSlug = core || input?.slug === undefined ? slug : validate.slug(input.slug);
  if (nextSlug !== slug) await assertSlugFree(nextSlug);
  return writeOne({ ...info, slug: nextSlug, sections }, slug);
}

async function deletePage(slug) {
  if (isCore(slug)) throw new HttpError(400, "Core pages cannot be deleted. Use Restore Defaults instead.");
  if (!(await readOne(slug))) throw new HttpError(404, "Page not found.");
  await removeOne(slug);
}

async function resetPage(slug) {
  if (!isCore(slug)) throw new HttpError(400, "Only preloaded pages have default content to restore.");
  return writeOne(clone(pageDefaults[slug]));
}

async function seedMissing() {
  const filePages = readFileStore();
  const filePageMap = new Map(filePages.map((p) => [p.slug, p]));
  const { missing } = await listPages();
  for (const slug of missing) {
    const pageToSeed = filePageMap.get(slug) || pageDefaults[slug];
    if (pageToSeed) await writeOne(clone(pageToSeed));
  }
  if (hasDB()) {
    for (const filePage of filePages) {
      if (!DEFAULT_SLUGS.includes(filePage.slug)) {
        const exists = await Page.findOne({ slug: filePage.slug }).lean();
        if (!exists) await writeOne(clone(filePage));
      }
    }
  }
  return missing;
}

async function reloadDefaults() {
  for (const slug of DEFAULT_SLUGS) await writeOne(clone(pageDefaults[slug]));
  return DEFAULT_SLUGS;
}

async function saveImage(file) {
  if (!file) throw new HttpError(400, "Choose an image file to upload.");
  let info;
  try {
    info = imageSize(file.buffer);
  } catch {
    throw new HttpError(400, "The file could not be read as an image.");
  }
  const { width, height, type } = info;
  const ext = type === "jpeg" ? "jpg" : type;
  if (!schema.IMAGE_RULES.types[ext]) throw new HttpError(400, "Images must be PNG, JPG, WEBP or GIF.");
  if (width > schema.IMAGE_RULES.maxWidth || height > schema.IMAGE_RULES.maxHeight) {
    throw new HttpError(
      400,
      `Image is too large (${width}×${height}). Keep it within ${schema.IMAGE_RULES.maxWidth}×${schema.IMAGE_RULES.maxHeight} pixels.`
    );
  }
  await fs.promises.mkdir(mediaDir, { recursive: true });
  const fileName = `img-${Date.now()}-${randomBytes(3).toString("hex")}.${ext}`;
  await fs.promises.writeFile(path.join(mediaDir, fileName), file.buffer);
  return { url: `${UPLOAD_PREFIX}${fileName}`, width, height, bytes: file.size };
}

// The first bytes each document type must start with, so a renamed file cannot slip through.
const PDF_MAGIC = Buffer.from("%PDF-");
const ZIP_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]); // docx, xlsx, pptx
const OLE_MAGIC = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]); // doc, xls, ppt
const DOCUMENT_MAGIC = { pdf: PDF_MAGIC, docx: ZIP_MAGIC, xlsx: ZIP_MAGIC, pptx: ZIP_MAGIC, doc: OLE_MAGIC, xls: OLE_MAGIC, ppt: OLE_MAGIC };

async function saveDocument(file) {
  if (!file) throw new HttpError(400, "Choose a file to upload.");
  const ext = path.extname(file.originalname || "").slice(1).toLowerCase();
  const magic = DOCUMENT_MAGIC[ext];
  if (!schema.DOCUMENT_RULES.types[ext] || !magic) {
    throw new HttpError(400, "Files must be PDF, Word (DOC/DOCX), Excel (XLS/XLSX) or PowerPoint (PPT/PPTX).");
  }
  if (!file.buffer.subarray(0, magic.length).equals(magic)) {
    throw new HttpError(400, `The file does not look like a real .${ext} file.`);
  }
  const base =
    path
      .basename(file.originalname, path.extname(file.originalname))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "document";
  const fileName = `${base}-${Date.now().toString(36)}${randomBytes(2).toString("hex")}.${ext}`;
  await fs.promises.mkdir(documentsDir, { recursive: true });
  await fs.promises.writeFile(path.join(documentsDir, fileName), file.buffer);
  return { url: `${DOCUMENT_PREFIX}${fileName}`, name: file.originalname, bytes: file.size, type: ext };
}

function templateFor(type) {
  if (schema.TEMPLATES[type]) return clone(schema.TEMPLATES[type]);
  for (const page of Object.values(pageDefaults)) {
    const match = page.sections.find((entry) => entry.type === type);
    if (match) return clone(match.content);
  }
  return {};
}

function getMeta() {
  return {
    sectionTypes: Object.entries(schema.SECTION_TYPES).map(([type, definition]) => ({ type, ...definition, template: templateFor(type) })),
    designFields: schema.DESIGN_FIELDS,
    designDefaults: schema.DESIGN_DEFAULTS,
    categories: schema.CATEGORIES,
    icons: schema.PAGE_ICONS,
    limits: schema.LIMITS,
    image: { ...schema.IMAGE_RULES, types: Object.values(schema.IMAGE_RULES.types) },
    document: { maxBytes: schema.DOCUMENT_RULES.maxBytes, extensions: Object.keys(schema.DOCUMENT_RULES.types) },
    reservedSlugs: schema.RESERVED_SLUGS,
  };
}

module.exports = {
  listPages,
  getPage,
  getPublicPage,
  createPage,
  updatePage,
  deletePage,
  resetPage,
  seedMissing,
  reloadDefaults,
  saveImage,
  saveDocument,
  getMeta,
};
