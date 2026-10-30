const mongoose = require("mongoose");
const { hasDB } = require("../config/db");
const Notification = require("../models/Notification");
const { readJson, writeJson } = require("../utils/fileStore");

const FILE = "notifications.json";
const FILE_MAX = 500; // the local store only keeps the most recent notifications
const LIST_MAX = 30;

const isDbId = (id) => mongoose.isValidObjectId(id) && /^[a-f0-9]{24}$/i.test(String(id));
const readFile = () => {
  const list = readJson(FILE, []);
  return Array.isArray(list) ? list : [];
};

function shape(doc) {
  return {
    id: doc.id || String(doc._id),
    kind: doc.kind,
    title: doc.title,
    message: doc.message || "",
    link: doc.link || "",
    read: Boolean(doc.read),
    createdAt: new Date(doc.createdAt).toISOString(),
  };
}

function countByKind(rows) {
  const byKind = {};
  for (const row of rows) byKind[row.kind] = (byKind[row.kind] || 0) + row.n;
  return byKind;
}

async function create({ kind, title, message = "", link = "" }) {
  const entry = { kind, title: String(title).slice(0, 200), message: String(message).slice(0, 300), link, read: false };
  if (hasDB()) {
    try {
      return shape((await Notification.create(entry)).toObject());
    } catch (error) {
      console.error("[Notifications] MongoDB save failed, using the local store:", error.message);
    }
  }
  const local = { ...entry, id: `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date().toISOString() };
  writeJson(FILE, [local, ...readFile()].slice(0, FILE_MAX));
  return local;
}

/** Latest notifications plus unread totals, overall and per kind (used for the sidebar badges). */
async function list({ limit = LIST_MAX } = {}) {
  const max = Math.min(Math.max(Number(limit) || LIST_MAX, 1), 100);
  // Only unseen notifications are listed; seen ones are removed from view.
  const local = readFile().filter((entry) => !isDbId(entry.id) && !entry.read);
  let items = local;
  let unreadRows = local.map((entry) => ({ kind: entry.kind, n: 1 }));

  if (hasDB()) {
    const [docs, rows] = await Promise.all([
      Notification.find({ read: false }).sort({ createdAt: -1 }).limit(max).lean(),
      Notification.aggregate([{ $match: { read: false } }, { $group: { _id: "$kind", n: { $sum: 1 } } }]),
    ]);
    items = [...docs.map(shape), ...local];
    unreadRows = [...unreadRows, ...rows.map((row) => ({ kind: row._id, n: row.n }))];
  }

  const byKind = countByKind(unreadRows);
  return {
    items: items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, max).map(shape),
    unread: Object.values(byKind).reduce((sum, n) => sum + n, 0),
    byKind,
  };
}

/** Marks notifications read: specific ids, every notification of one kind, or all of them. */
async function markRead({ ids, kind, all } = {}) {
  const idList = Array.isArray(ids) ? ids.map(String).slice(0, 200) : [];
  const kindName = typeof kind === "string" ? kind.slice(0, 40) : "";
  if (!all && !idList.length && !kindName) return 0;

  const matches = (entry) => all || (kindName && entry.kind === kindName) || idList.includes(entry.id);
  let changed = 0;

  if (hasDB()) {
    const filter = all ? { read: false } : kindName ? { read: false, kind: kindName } : { read: false, _id: { $in: idList.filter(isDbId) } };
    changed += (await Notification.updateMany(filter, { $set: { read: true } })).modifiedCount || 0;
  }

  const store = readFile();
  let fileChanged = false;
  const next = store.map((entry) => {
    if (entry.read || !matches(entry)) return entry;
    fileChanged = true;
    if (!isDbId(entry.id)) changed += 1;
    return { ...entry, read: true };
  });
  if (fileChanged) writeJson(FILE, next);
  return changed;
}

/** Deletes notifications: specific ids, every notification of one kind, or all of them. */
async function clear({ ids, kind, all } = {}) {
  const idList = Array.isArray(ids) ? ids.map(String).slice(0, 200) : [];
  const kindName = typeof kind === "string" ? kind.slice(0, 40) : "";
  if (!all && !idList.length && !kindName) return 0;

  let removed = 0;
  if (hasDB()) {
    const filter = all ? {} : kindName ? { kind: kindName } : { _id: { $in: idList.filter(isDbId) } };
    removed += (await Notification.deleteMany(filter)).deletedCount || 0;
  }
  const store = readFile();
  const keep = store.filter((entry) => !(all || (kindName && entry.kind === kindName) || idList.includes(entry.id)));
  if (keep.length !== store.length) {
    removed += store.filter((entry) => !isDbId(entry.id)).length - keep.filter((entry) => !isDbId(entry.id)).length;
    writeJson(FILE, keep);
  }
  return removed;
}

module.exports = { create, list, markRead, clear };
