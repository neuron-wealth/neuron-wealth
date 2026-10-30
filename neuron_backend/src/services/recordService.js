const mongoose = require("mongoose");
const { hasDB } = require("../config/db");
const { RECORD_TYPES } = require("../config/recordTypes");
const { recordModels } = require("../models/recordModels");
const { readRecords, writeRecords } = require("../utils/fileStore");
const { HttpError } = require("../utils/http");

const TREND_DAYS = 14;
const BULK_MAX = 500;

function serialize(doc) {
  const { _id, __v, ...rest } = doc;
  return { ...rest, id: _id.toString() };
}

function dayKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const newest = (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

function createRecordService(key) {
  const def = RECORD_TYPES[key];
  const Model = recordModels[key];
  const closedStatus = def.statuses[def.statuses.length - 1];

  const localId = () => `${key.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const isDbId = (id) => mongoose.isValidObjectId(id) && /^[a-f0-9]{24}$/i.test(String(id));

  // The local store keeps a backup copy of every record, even when MongoDB is available.
  function patchLocal(id, apply) {
    const store = readRecords();
    const list = store[key];
    const index = list.findIndex((entry) => entry.id === id);
    if (index < 0) return null;
    const next = apply(list[index]);
    if (next === null) list.splice(index, 1);
    else list[index] = next;
    writeRecords(store);
    return next === null ? true : next;
  }

  // Records saved while MongoDB was unreachable only exist in the local store.
  const localOnly = () => readRecords()[key].filter((entry) => !isDbId(entry.id));

  async function list() {
    if (hasDB()) {
      const docs = await Model.find().sort({ createdAt: -1 }).lean();
      return [...docs.map(serialize), ...localOnly()].sort(newest);
    }
    return [...readRecords()[key]].sort(newest);
  }

  async function get(id) {
    if (hasDB() && isDbId(id)) {
      const doc = await Model.findById(id).lean();
      if (doc) return serialize(doc);
    }
    const item = readRecords()[key].find((entry) => entry.id === id);
    if (!item) throw new HttpError(404, `${def.label} not found.`);
    return item;
  }

  async function findUnique(value) {
    const field = def.uniqueField;
    if (hasDB()) {
      const doc = await Model.findOne({ [field]: value }).lean();
      if (doc) return serialize(doc);
    }
    return readRecords()[key].find((entry) => entry[field] === value) || null;
  }

  async function create(data, { rejectDuplicate = false } = {}) {
    const record = { status: def.statuses[0], notes: "", sourcePage: "", ...data };

    if (def.uniqueField && record[def.uniqueField]) {
      const existing = await findUnique(record[def.uniqueField]);
      if (existing && rejectDuplicate) {
        throw new HttpError(409, `A ${def.label.toLowerCase()} with this ${def.uniqueField} already exists.`);
      }
      if (existing) {
        if (existing.status !== record.status) return { item: await update(existing.id, { status: record.status }), duplicate: true };
        return { item: existing, duplicate: true };
      }
    }

    let saved = null;
    if (hasDB()) {
      try {
        const doc = await Model.create(record);
        saved = serialize(doc.toObject());
        console.log(`[${def.label}] Saved to MongoDB: ${saved.id}`);
      } catch (error) {
        console.error(`[${def.label}] MongoDB save failed, using the local store:`, error.message);
      }
    }

    const now = new Date().toISOString();
    const local = { ...record, id: saved?.id || localId(), createdAt: now, updatedAt: now };
    const store = readRecords();
    store[key].unshift(local);
    writeRecords(store);

    return { item: saved || local, duplicate: false };
  }

  async function update(id, patch) {
    if (def.uniqueField && patch[def.uniqueField]) {
      const existing = await findUnique(patch[def.uniqueField]);
      if (existing && existing.id !== id) {
        throw new HttpError(409, `Another ${def.label.toLowerCase()} already uses this ${def.uniqueField}.`);
      }
    }
    let updated = null;
    if (hasDB() && isDbId(id)) {
      const doc = await Model.findByIdAndUpdate(id, { $set: patch }, { new: true, runValidators: true }).lean();
      if (doc) updated = serialize(doc);
    }
    const local = patchLocal(id, (entry) => ({ ...entry, ...patch, updatedAt: new Date().toISOString() }));
    if (!updated && local) updated = local;
    if (!updated) throw new HttpError(404, `${def.label} not found.`);
    return updated;
  }

  async function remove(id) {
    let removed = false;
    if (hasDB() && isDbId(id)) {
      const result = await Model.deleteOne({ _id: id });
      removed = result.deletedCount > 0;
    }
    if (patchLocal(id, () => null)) removed = true;
    if (!removed) throw new HttpError(404, `${def.label} not found.`);
  }

  async function bulk(ids, action, status) {
    const unique = [...new Set((Array.isArray(ids) ? ids : []).map(String))].filter(Boolean);
    if (!unique.length) throw new HttpError(400, "Select at least one record.");
    if (unique.length > BULK_MAX) throw new HttpError(400, `You can change at most ${BULK_MAX} records at once.`);
    if (action === "status" && !def.statuses.includes(status)) {
      throw new HttpError(400, `Choose a valid status: ${def.statuses.join(", ")}.`);
    }
    if (action !== "delete" && action !== "status") throw new HttpError(400, "Unknown bulk action.");

    const dbIds = unique.filter(isDbId);
    if (hasDB() && dbIds.length) {
      if (action === "delete") await Model.deleteMany({ _id: { $in: dbIds } });
      else await Model.updateMany({ _id: { $in: dbIds } }, { $set: { status } });
    }

    const store = readRecords();
    const wanted = new Set(unique);
    const now = new Date().toISOString();
    store[key] =
      action === "delete"
        ? store[key].filter((entry) => !wanted.has(entry.id))
        : store[key].map((entry) => (wanted.has(entry.id) ? { ...entry, status, updatedAt: now } : entry));
    writeRecords(store);
    return unique.length;
  }

  function summarize(items, recent) {
    const byStatus = Object.fromEntries(def.statuses.map((status) => [status, 0]));
    const perDay = new Map();
    items.forEach((item) => {
      if (byStatus[item.status] !== undefined) byStatus[item.status] += 1;
      const day = dayKey(item.createdAt);
      perDay.set(day, (perDay.get(day) || 0) + 1);
    });

    const trend = [];
    const today = new Date();
    for (let offset = TREND_DAYS - 1; offset >= 0; offset -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
      const day = dayKey(date);
      trend.push({ date: day, count: perDay.get(day) || 0 });
    }

    return { total: items.length, open: items.length - (byStatus[closedStatus] || 0), byStatus, trend, recent };
  }

  async function summary() {
    if (hasDB()) {
      const [items, recent] = await Promise.all([
        Model.find({}, { status: 1, createdAt: 1 }).lean(),
        Model.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);
      const fallback = localOnly();
      return summarize([...items, ...fallback], [...recent.map(serialize), ...fallback].sort(newest).slice(0, 5));
    }
    const items = [...readRecords()[key]].sort(newest);
    return summarize(items, items.slice(0, 5));
  }

  return { key, def, list, get, create, update, remove, bulk, summary };
}

const recordServices = Object.fromEntries(Object.keys(RECORD_TYPES).map((key) => [key, createRecordService(key)]));

module.exports = { recordServices };
