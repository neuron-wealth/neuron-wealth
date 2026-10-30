const mongoose = require("mongoose");

const blogCommentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    blogId: { type: String, required: true, index: true },
    parentId: { type: String, default: "" },
    authorName: { type: String, required: true },
    authorEmail: { type: String, default: "" },
    authorWebsite: { type: String, default: "" },
    content: { type: String, required: true },
    status: { type: String, enum: ["approved", "pending", "spam"], default: "pending", index: true },
    byAdmin: { type: Boolean, default: false },
    legacyId: { type: Number, default: null },
  },
  { timestamps: true }
);

blogCommentSchema.index({ blogId: 1, status: 1, createdAt: 1 });

module.exports = mongoose.models.BlogComment || mongoose.model("BlogComment", blogCommentSchema);
