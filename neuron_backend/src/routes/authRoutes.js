const { Router } = require("express");
const auth = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { loginLimiter, recoveryLimiter, resetLimiter } = require("../middleware/rateLimit");

const router = Router();

router.post("/login", loginLimiter, auth.login);
router.get("/me", requireAuth, auth.me);
router.post("/forgot-password", recoveryLimiter, auth.forgotPassword);
router.post("/forgot-username", recoveryLimiter, auth.forgotUsername);
router.post("/reset/verify", resetLimiter, auth.verifyReset);
router.post("/reset", resetLimiter, auth.completeReset);

module.exports = router;
