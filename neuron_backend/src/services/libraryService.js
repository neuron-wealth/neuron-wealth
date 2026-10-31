// Media Library: a folder tree of images and documents the admin manages directly, stored under
// uploads/library and served at /api/uploads/library/... Every path is validated so nothing can
// reach outside the library folder.
const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");
const env = require("../config/env");
const { HttpError } = require("../utils/http");

const ROOT = path.join(env.uploadsDir, "library");
const URL_PREFIX = "/api/uploads/library/";
const MAX_BYTES = 25 * 1024 * 1024;
const MAX_FILES = 20;

// First bytes each type must start with, so a renamed file cannot slip through.
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const JPG = Buffer.from([0xff, 0xd8, 0xff]);
const GIF = Buffer.from("GIF8");
const PDF = Buffer.from("%PDF-");
const ZIP = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const OLE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
const isWebp = (buf) => buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP";

const TYPES = {
  jpg: { kind: "image", check: (b) => b.subarray(0, 3).equals(JPG) },
  jpeg: { kind: "image", check: (b) => b.subarray(0, 3).equals(JPG) },
  png: { kind: "image", check: (b) => b.subarray(0, 4).equals(PNG) },
  gif: { kind: "image", check: (b) => b.subarray(0, 4).equals(GIF) },
  webp: { kind: "image", check: isWebp },
  pdf: { kind: "document", check: (b) => b.subarray(0, 5).equals(PDF) },
  doc: { kind: "document", check: (b) => b.subarray(0, 8).equals(OLE) },
  xls: { kind: "document", check: (b) => b.subarray(0, 8).equals(OLE) },
  ppt: { kind: "document", check: (b) => b.subarray(0, 8).equals(OLE) },
  docx: { kind: "document", check: (b) => b.subarray(0, 4).equals(ZIP) },
  xlsx: { kind: "document", check: (b) => b.subarray(0, 4).equals(ZIP) },
  pptx: { kind: "document", check: (b) => b.subarray(0, 4).equals(ZIP) },
};
const EXTENSIONS = Object.keys(TYPES);

const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9 ._()&-]{0,79}$/;

/** "Reports/2026 Q1" -> ["Reports", "2026 Q1"]; rejects anything unsafe. */
function segments(relPath) {
  const parts = String(relPath || "")
    .replace(/\\/g, "/")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
  for (const part of parts) {
    if (part === "." || part === ".." || !NAME_RE.test(part)) throw new HttpError(400, `"${part}" is not a valid name.`);
  }
  return parts;
}

function resolve(relPath) {
  const parts = segments(relPath);
  const full = path.resolve(ROOT, ...parts);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) throw new HttpError(400, "That location is outside the library.");
  return { parts, full, rel: parts.join("/") };
}

function cleanFolderName(name) {
  const value = String(name || "").replace(/\s+/g, " ").trim();
  if (!value) throw new HttpError(400, "Enter a folder name.");
  if (!NAME_RE.test(value) || value.includes(".")) throw new HttpError(400, "Folder names can use letters, numbers, spaces, ( ) & - and _ (up to 80 characters).");
  return value;
}

function cleanFileBase(name) {
  const base = String(name || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^A-Za-z0-9 ._()&-]+/g, "-")
    .replace(/\s+/g, " ")
    .replace(/-{2,}/g, "-")
    .replace(/^[^A-Za-z0-9]+|[-. ]+$/g, "")
    .slice(0, 70);
  return base || "file";
}

function extOf(name) {
  return path.extname(String(name || "")).slice(1).toLowerCase();
}

const encodeUrl = (rel) => URL_PREFIX + rel.split("/").map(encodeURIComponent).join("/");

/** Next free name: "Brochure.pdf", "Brochure (2).pdf", … */
function freeName(dir, base, ext) {
  let candidate = `${base}.${ext}`;
  for (let n = 2; fs.existsSync(path.join(dir, candidate)); n++) candidate = `${base} (${n}).${ext}`;
  return candidate;
}

function describeFile(dirRel, name, stat) {
  const rel = dirRel ? `${dirRel}/${name}` : name;
  const ext = extOf(name);
  const info = { name, path: rel, url: encodeUrl(rel), ext, kind: TYPES[ext]?.kind || "other", bytes: stat.size, modifiedAt: stat.mtime.toISOString() };
  if (info.kind === "image") {
    try {
      const { width, height } = imageSize(fs.readFileSync(path.join(ROOT, ...rel.split("/"))));
      Object.assign(info, { width, height });
    } catch {
      // Dimensions are optional.
    }
  }
  return info;
}

function countEntries(full) {
  try {
    return fs.readdirSync(full).filter((name) => !name.startsWith(".")).length;
  } catch {
    return 0;
  }
}

function ensureRoot() {
  fs.mkdirSync(ROOT, { recursive: true });
}

/** Folders and files directly inside one folder, plus the breadcrumb trail. */
function list(relPath = "") {
  ensureRoot();
  const { full, rel, parts } = resolve(relPath);
  if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) throw new HttpError(404, "Folder not found.");
  const folders = [];
  const files = [];
  for (const name of fs.readdirSync(full)) {
    if (name.startsWith(".")) continue;
    const stat = fs.statSync(path.join(full, name));
    if (stat.isDirectory()) folders.push({ name, path: rel ? `${rel}/${name}` : name, items: countEntries(path.join(full, name)), modifiedAt: stat.mtime.toISOString() });
    else files.push(describeFile(rel, name, stat));
  }
  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
  const breadcrumb = parts.map((name, i) => ({ name, path: parts.slice(0, i + 1).join("/") }));
  return { path: rel, breadcrumb, folders, files };
}

/** Every folder in the library (for "Move to"). */
function allFolders() {
  ensureRoot();
  const out = [{ path: "", name: "Library" }];
  const walk = (dirFull, dirRel, depth) => {
    if (depth > 8) return;
    for (const name of fs.readdirSync(dirFull).sort()) {
      if (name.startsWith(".")) continue;
      const full = path.join(dirFull, name);
      if (!fs.statSync(full).isDirectory()) continue;
      const rel = dirRel ? `${dirRel}/${name}` : name;
      out.push({ path: rel, name });
      walk(full, rel, depth + 1);
    }
  };
  walk(ROOT, "", 0);
  return out;
}

/** Search every folder by file name. */
function search(query) {
  ensureRoot();
  const needle = String(query || "").trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  const walk = (dirFull, dirRel) => {
    for (const name of fs.readdirSync(dirFull)) {
      if (name.startsWith(".") || results.length >= 200) continue;
      const full = path.join(dirFull, name);
      const stat = fs.statSync(full);
      const rel = dirRel ? `${dirRel}/${name}` : name;
      if (stat.isDirectory()) walk(full, rel);
      else if (name.toLowerCase().includes(needle)) results.push(describeFile(dirRel, name, stat));
    }
  };
  walk(ROOT, "");
  return results;
}

function createFolder(parentPath, name) {
  ensureRoot();
  const parent = resolve(parentPath);
  if (!fs.existsSync(parent.full)) throw new HttpError(404, "Parent folder not found.");
  if (parent.parts.length >= 6) throw new HttpError(400, "Folders can be nested up to 6 levels deep.");
  const folderName = cleanFolderName(name);
  const target = path.join(parent.full, folderName);
  if (fs.existsSync(target)) throw new HttpError(409, `A folder or file named "${folderName}" already exists here.`);
  fs.mkdirSync(target);
  return { path: parent.rel ? `${parent.rel}/${folderName}` : folderName, name: folderName };
}

function renameEntry(relPath, newName, { folder }) {
  const current = resolve(relPath);
  if (!current.parts.length) throw new HttpError(400, "The library itself cannot be renamed.");
  if (!fs.existsSync(current.full)) throw new HttpError(404, `${folder ? "Folder" : "File"} not found.`);
  const isDir = fs.statSync(current.full).isDirectory();
  if (isDir !== folder) throw new HttpError(400, "That item is not a " + (folder ? "folder." : "file."));
  let finalName;
  if (folder) finalName = cleanFolderName(newName);
  else {
    const ext = extOf(current.full);
    finalName = `${cleanFileBase(newName)}.${ext}`;
  }
  const target = path.join(path.dirname(current.full), finalName);
  if (target === current.full) return { path: current.rel, name: finalName };
  if (fs.existsSync(target)) throw new HttpError(409, `"${finalName}" already exists in this folder.`);
  fs.renameSync(current.full, target);
  const parentRel = current.parts.slice(0, -1).join("/");
  return { path: parentRel ? `${parentRel}/${finalName}` : finalName, name: finalName };
}

function moveEntry(relPath, toFolder) {
  const current = resolve(relPath);
  const destination = resolve(toFolder);
  if (!current.parts.length) throw new HttpError(400, "The library itself cannot be moved.");
  if (!fs.existsSync(current.full)) throw new HttpError(404, "Item not found.");
  if (!fs.existsSync(destination.full) || !fs.statSync(destination.full).isDirectory()) throw new HttpError(404, "Destination folder not found.");
  if (destination.full === current.full || destination.full.startsWith(current.full + path.sep)) throw new HttpError(400, "A folder cannot be moved into itself.");
  const name = current.parts[current.parts.length - 1];
  const target = path.join(destination.full, name);
  if (target === current.full) return { path: current.rel };
  if (fs.existsSync(target)) throw new HttpError(409, `"${name}" already exists in the destination folder.`);
  fs.renameSync(current.full, target);
  return { path: destination.rel ? `${destination.rel}/${name}` : name };
}

function removeEntry(relPath, { folder }) {
  const current = resolve(relPath);
  if (!current.parts.length) throw new HttpError(400, "The library itself cannot be deleted.");
  if (!fs.existsSync(current.full)) throw new HttpError(404, `${folder ? "Folder" : "File"} not found.`);
  const isDir = fs.statSync(current.full).isDirectory();
  if (isDir !== folder) throw new HttpError(400, "That item is not a " + (folder ? "folder." : "file."));
  if (folder) fs.rmSync(current.full, { recursive: true, force: true });
  else fs.unlinkSync(current.full);
}

/** Saves uploaded files into a folder. Each file is checked; problems are reported per file. */
function saveUploads(folderPath, files) {
  ensureRoot();
  const folder = resolve(folderPath);
  if (!fs.existsSync(folder.full)) throw new HttpError(404, "Folder not found.");
  if (!files?.length) throw new HttpError(400, "Choose at least one file to upload.");
  const saved = [];
  const rejected = [];
  for (const file of files) {
    const original = Buffer.from(file.originalname || "file", "latin1").toString("utf8");
    const ext = extOf(original);
    const type = TYPES[ext];
    if (!type) {
      rejected.push({ name: original, reason: "This file type is not allowed." });
      continue;
    }
    if (!type.check(file.buffer)) {
      rejected.push({ name: original, reason: `The file does not look like a real .${ext} file.` });
      continue;
    }
    const finalExt = ext === "jpeg" ? "jpg" : ext;
    const name = freeName(folder.full, cleanFileBase(original), finalExt);
    fs.writeFileSync(path.join(folder.full, name), file.buffer);
    saved.push(describeFile(folder.rel, name, fs.statSync(path.join(folder.full, name))));
  }
  return { saved, rejected };
}

module.exports = { list, allFolders, search, createFolder, renameEntry, moveEntry, removeEntry, saveUploads, EXTENSIONS, MAX_BYTES, MAX_FILES };
