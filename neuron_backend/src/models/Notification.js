const mongoose = require("mongoose");
const { withId } = require("./constants");

// Admin console notifications: one per website form submission or blog comment.
const notificationSchema = new mongoose.Schema(
  {
    kind: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, default: "" },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, toJSON: withId, toObject: withId }
);

notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
