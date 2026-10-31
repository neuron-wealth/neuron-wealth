const { Router } = require("express");
const { health } = require("../controllers/healthController");
const { getDashboard } = require("../controllers/dashboardController");
const { requireAuth } = require("../middleware/auth");
const authRoutes = require("./authRoutes");
const { createRecordRouter } = require("./recordRoutes");
const siteSettingsRoutes = require("./siteSettingsRoutes");
const pageRoutes = require("./pageRoutes");
const blogRoutes = require("./blogRoutes");
const notificationRoutes = require("./notificationRoutes");
const libraryRoutes = require("./libraryRoutes");
const { RECORD_KEYS } = require("../config/recordTypes");

const router = Router();

router.get("/health", health);
router.get("/dashboard", requireAuth, getDashboard);
router.use("/auth", authRoutes);
for (const key of RECORD_KEYS) router.use(`/${key}`, createRecordRouter(key));
router.use("/site-settings", siteSettingsRoutes);
router.use("/pages", pageRoutes);
router.use("/blogs", blogRoutes);
router.use("/notifications", notificationRoutes);
router.use("/library", libraryRoutes);

module.exports = router;
