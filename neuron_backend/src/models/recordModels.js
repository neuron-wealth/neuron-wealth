const mongoose = require("mongoose");
const { RECORD_TYPES } = require("../config/recordTypes");
const { withId } = require("./constants");

function buildModel(def) {
  if (mongoose.models[def.model]) return mongoose.models[def.model];
  const shape = {};
  for (const entry of def.fields) {
    shape[entry.key] = { type: String, trim: true, default: "", ...(entry.kind === "email" ? { lowercase: true } : {}) };
  }
  shape.status = { type: String, enum: def.statuses, default: def.statuses[0] };
  shape.notes = { type: String, default: "" };
  shape.sourcePage = { type: String, default: "" };
  shape.createdAt = { type: Date, default: Date.now };

  const schema = new mongoose.Schema(shape, { timestamps: true, toJSON: withId, toObject: withId });
  schema.index({ createdAt: -1 });
  if (def.uniqueField) schema.index({ [def.uniqueField]: 1 }, { unique: true });
  return mongoose.model(def.model, schema);
}

const recordModels = Object.fromEntries(Object.entries(RECORD_TYPES).map(([key, def]) => [key, buildModel(def)]));

module.exports = { recordModels };
