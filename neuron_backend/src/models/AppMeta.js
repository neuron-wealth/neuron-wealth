const mongoose = require("mongoose");

const appMetaSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.models.AppMeta || mongoose.model("AppMeta", appMetaSchema);
