const { hasDB } = require("../config/db");
const env = require("../config/env");
const Admin = require("../models/Admin");
const { readJson, writeJson } = require("../utils/fileStore");
const { hashPassword } = require("../utils/crypto");

const ADMIN_FILE = "admin.json";
const emptyReset = () => ({ tokenHash: "", purpose: "", expiresAt: null });

function normalize(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id || doc.id),
    username: doc.username,
    email: doc.email,
    name: doc.name,
    passwordHash: doc.passwordHash,
    tokenVersion: Number(doc.tokenVersion) || 0,
    reset: { ...emptyReset(), ...(doc.reset || {}) },
  };
}

function readFileAdmin() {
  const admin = readJson(ADMIN_FILE, null);
  return admin?.username ? normalize(admin) : null;
}

async function getAdmin() {
  if (hasDB()) return normalize(await Admin.findOne().lean());
  return readFileAdmin();
}

async function findById(id) {
  if (hasDB()) {
    try {
      return normalize(await Admin.findById(id).lean());
    } catch {
      return null;
    }
  }
  const admin = readFileAdmin();
  return admin && admin.id === id ? admin : null;
}

async function findByIdentifier(identifier) {
  const value = String(identifier || "").trim().toLowerCase();
  if (!value) return null;
  const admin = await getAdmin();
  return admin && (admin.username === value || admin.email === value) ? admin : null;
}

async function findByResetHash(tokenHash) {
  const admin = await getAdmin();
  if (!admin || !admin.reset.tokenHash || admin.reset.tokenHash !== tokenHash) return null;
  if (!admin.reset.expiresAt || new Date(admin.reset.expiresAt).getTime() < Date.now()) return null;
  return admin;
}

async function update(admin, changes) {
  const next = { ...admin, ...changes };
  if (hasDB()) {
    const { id, ...fields } = next;
    await Admin.updateOne({ _id: id }, { $set: fields });
  } else {
    writeJson(ADMIN_FILE, next);
  }
  return next;
}

async function ensureAdmin() {
  if (await getAdmin()) return;

  const fileAdmin = hasDB() ? readFileAdmin() : null;
  if (fileAdmin) {
    const { id, ...fields } = fileAdmin;
    await Admin.create({ ...fields, reset: emptyReset() });
    console.log("[Admin] Copied the local admin account into MongoDB.");
    return;
  }

  if (!env.admin.email || !env.admin.password) {
    console.warn("[Admin] ADMIN_EMAIL and ADMIN_PASSWORD are not set, so no admin account was created.");
    return;
  }

  const seed = {
    username: env.admin.username,
    email: env.admin.email,
    name: env.admin.name,
    passwordHash: hashPassword(env.admin.password),
    tokenVersion: 0,
    reset: emptyReset(),
  };

  if (hasDB()) await Admin.create(seed);
  else writeJson(ADMIN_FILE, { id: "local-admin", ...seed });
  console.log(`[Admin] Admin account created from .env (username: ${seed.username}).`);
}

function toPublic(admin) {
  return { id: admin.id, username: admin.username, email: admin.email, name: admin.name };
}

module.exports = { getAdmin, findById, findByIdentifier, findByResetHash, update, ensureAdmin, toPublic, emptyReset };
