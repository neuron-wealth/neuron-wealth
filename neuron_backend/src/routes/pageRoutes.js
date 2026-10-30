const { Router } = require("express");
const controller = require("../controllers/pageController");
const { requireAuth } = require("../middleware/auth");
const { uploadImage, uploadDocument } = require("../middleware/upload");

const router = Router();

router.get("/", requireAuth, controller.listPages);
router.post("/", requireAuth, controller.createPage);
router.get("/meta", requireAuth, controller.getMeta);
router.post("/seed", requireAuth, controller.seedMissing);
router.post("/reload-defaults", requireAuth, controller.reloadDefaults);
router.post("/media", requireAuth, uploadImage, controller.uploadImage);
router.post("/documents", requireAuth, uploadDocument, controller.uploadDocument);
router.get("/public/:slug", controller.getPublicPage);
router.get("/:slug", requireAuth, controller.getPage);
router.put("/:slug", requireAuth, controller.updatePage);
router.delete("/:slug", requireAuth, controller.deletePage);
router.post("/:slug/reset", requireAuth, controller.resetPage);

module.exports = router;
