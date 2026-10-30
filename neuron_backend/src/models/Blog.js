const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    previousSlugs: { type: [String], default: [], index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    coverAlt: { type: String, default: "" },
    categories: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    author: { type: String, default: "" },
    status: { type: String, enum: ["published", "draft"], default: "draft", index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    commentsEnabled: { type: Boolean, default: true },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    legacyId: { type: Number, default: null },
    legacyUrl: { type: String, default: "" },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
