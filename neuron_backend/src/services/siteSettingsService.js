const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");
const { hasDB } = require("../config/db");
const env = require("../config/env");
const SiteSettings = require("../models/SiteSettings");
const { siteDefaults, NAV_ICONS, SOCIAL_PLATFORMS, SECTIONS } = require("../config/siteDefaults");
const { readJson, writeJson } = require("../utils/fileStore");
const { HttpError } = require("../utils/http");
const validate = require("../utils/siteValidation");

const FILE = "site-settings.json";
const KEY = "site";
const UPLOAD_PREFIX = "/api/uploads/logos/";
const logosDir = path.join(env.uploadsDir, "logos");

const LOGO_RULES = {
  maxBytes: 2 * 1024 * 1024,
  types: { png: "image/png", jpg: "image/jpeg", webp: "image/webp" },
  minWidth: 200,
  maxWidth: 4000,
  minHeight: 50,
  maxHeight: 2000,
  minRatio: 1.5,
  maxRatio: 6,
  displayHeight: { header: 62, footer: 64 },
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function merge(defaults, stored) {
  if (!isObject(defaults) || !isObject(stored)) return stored === undefined ? defaults : stored;
  const result = { ...defaults };
  for (const [key, value] of Object.entries(stored)) result[key] = merge(defaults[key], value);
  return result;
}

async function readStored() {
  if (hasDB()) {
    const doc = await SiteSettings.findOne({ key: KEY }).lean();
    return { data: doc?.data || {}, updatedAt: doc?.updatedAt || null };
  }
  const stored = readJson(FILE, {});
  return { data: stored.data || {}, updatedAt: stored.updatedAt || null };
}

async function writeSection(section, value) {
  if (hasDB()) {
    const change = value === undefined ? { $unset: { [`data.${section}`]: 1 } } : { $set: { [`data.${section}`]: value } };
    await SiteSettings.updateOne({ key: KEY }, change, { upsert: true });
    return;
  }
  const { data } = await readStored();
  if (value === undefined) delete data[section];
  else data[section] = value;
  writeJson(FILE, { data, updatedAt: new Date().toISOString() });
}

async function getSettings() {
  const { data, updatedAt } = await readStored();
  const settings = Object.fromEntries(SECTIONS.map((section) => [section, merge(siteDefaults[section], data[section])]));
  return { ...settings, updatedAt };
}

function assertSection(section) {
  if (!SECTIONS.includes(section)) throw new HttpError(404, "Unknown settings section.");
}

async function updateSection(section, input) {
  assertSection(section);
  const current = await getSettings();
  const value =
    section === "branding" ? validate.branding(input, current.branding) : validate[section](input, siteDefaults[section]);
  await writeSection(section, value);
  return getSettings();
}

function removeUploadedFile(url) {
  if (typeof url !== "string" || !url.startsWith(UPLOAD_PREFIX)) return;
  const file = path.join(logosDir, path.basename(url));
  fs.promises.unlink(file).catch(() => {});
}

async function resetSection(section) {
  assertSection(section);
  if (section === "branding") {
    const { branding } = await getSettings();
    removeUploadedFile(branding.logoLight.url);
    removeUploadedFile(branding.logoDark.url);
  }
  await writeSection(section, undefined);
  return getSettings();
}

function logoKey(variant) {
  if (variant !== "light" && variant !== "dark") throw new HttpError(404, "Logo variant must be light or dark.");
  return variant === "light" ? "logoLight" : "logoDark";
}

function inspectLogo(file) {
  if (!file) throw new HttpError(400, "Choose an image file to upload.");
  let info;
  try {
    info = imageSize(file.buffer);
  } catch {
    throw new HttpError(400, "The file could not be read as an image.");
  }
  const { width, height, type } = info;
  if (!LOGO_RULES.types[type]) throw new HttpError(400, "Logo must be a PNG, JPG or WEBP image.");
  if (width < LOGO_RULES.minWidth || height < LOGO_RULES.minHeight) {
    throw new HttpError(400, `Logo is too small (${width}×${height}). Use at least ${LOGO_RULES.minWidth}×${LOGO_RULES.minHeight} pixels.`);
  }
  if (width > LOGO_RULES.maxWidth || height > LOGO_RULES.maxHeight) {
    throw new HttpError(400, `Logo is too large (${width}×${height}). Keep it within ${LOGO_RULES.maxWidth}×${LOGO_RULES.maxHeight} pixels.`);
  }
  const ratio = width / height;
  if (ratio < LOGO_RULES.minRatio || ratio > LOGO_RULES.maxRatio) {
    throw new HttpError(
      400,
      `Logo must be a horizontal image between ${LOGO_RULES.minRatio}:1 and ${LOGO_RULES.maxRatio}:1 (this one is ${ratio.toFixed(2)}:1).`
    );
  }
  return { width, height, ext: type };
}

async function setLogo(variant, file) {
  const key = logoKey(variant);
  const { width, height, ext } = inspectLogo(file);
  await fs.promises.mkdir(logosDir, { recursive: true });
  const fileName = `logo-${variant}-${Date.now()}.${ext}`;
  await fs.promises.writeFile(path.join(logosDir, fileName), file.buffer);

  const { branding } = await getSettings();
  const previous = branding[key].url;
  await writeSection("branding", { ...branding, [key]: { ...branding[key], url: `${UPLOAD_PREFIX}${fileName}`, width, height } });
  removeUploadedFile(previous);
  return getSettings();
}

async function removeLogo(variant) {
  const key = logoKey(variant);
  const { branding } = await getSettings();
  removeUploadedFile(branding[key].url);
  await writeSection("branding", { ...branding, [key]: { ...siteDefaults.branding[key], alt: branding[key].alt } });
  return getSettings();
}

function getMeta() {
  return {
    logo: { ...LOGO_RULES, types: Object.values(LOGO_RULES.types) },
    icons: NAV_ICONS,
    platforms: SOCIAL_PLATFORMS,
    limits: validate.LIMITS,
  };
}

module.exports = { getSettings, updateSection, resetSection, setLogo, removeLogo, getMeta, LOGO_RULES };
