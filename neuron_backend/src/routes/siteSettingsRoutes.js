const { Router } = require("express");
const controller = require("../controllers/siteSettingsController");
const { requireAuth } = require("../middleware/auth");
const { uploadLogo } = require("../middleware/upload");

const router = Router();

router.get("/", controller.getPublicSettings);
router.get("/meta", requireAuth, controller.getMeta);
router.post("/logo/:variant", requireAuth, uploadLogo, controller.uploadLogo);
router.delete("/logo/:variant", requireAuth, controller.removeLogo);
router.put("/:section", requireAuth, controller.updateSection);
router.post("/:section/reset", requireAuth, controller.resetSection);

module.exports = router;
