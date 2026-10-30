const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "general" },
    icon: { type: String, default: "FileText" },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    seo: { type: mongoose.Schema.Types.Mixed, default: {} },
    sections: { type: mongoose.Schema.Types.Mixed, default: [] },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.models.Page || mongoose.model("Page", pageSchema);
