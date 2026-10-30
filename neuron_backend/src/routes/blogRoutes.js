const { Router } = require("express");
const controller = require("../controllers/blogController");
const { requireAuth } = require("../middleware/auth");
const { uploadImage } = require("../middleware/upload");
const { rateLimit } = require("../middleware/rateLimit");

const commentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "You have posted several comments in a short time. Please try again in a few minutes.",
});

const router = Router();

router.get("/public", controller.listPublic);
router.get("/public/:slug", controller.getPublic);
router.get("/public/:slug/comments", controller.listPublicComments);
router.post("/public/:slug/comments", commentLimiter, controller.addPublicComment);

router.get("/", requireAuth, controller.listAdmin);
router.post("/", requireAuth, controller.createBlog);
router.get("/meta", requireAuth, controller.getMeta);
router.post("/media", requireAuth, uploadImage, controller.uploadImage);
router.post("/import-originals", requireAuth, controller.importOriginals);

router.get("/comments", requireAuth, controller.listComments);
router.post("/comments/bulk", requireAuth, controller.bulkComments);
router.patch("/comments/:id", requireAuth, controller.updateComment);
router.delete("/comments/:id", requireAuth, controller.deleteComment);
router.post("/comments/:id/reply", requireAuth, controller.replyToComment);

router.get("/:id", requireAuth, controller.getAdmin);
router.put("/:id", requireAuth, controller.updateBlog);
router.patch("/:id/status", requireAuth, controller.setStatus);
router.delete("/:id", requireAuth, controller.deleteBlog);
router.post("/:id/restore", requireAuth, controller.restoreOriginal);

module.exports = router;
