const { Router } = require("express");
const { requireAuth } = require("../middleware/auth");
const notifications = require("../services/notificationService");
const emailSettings = require("../services/emailSettingsService");
const notify = require("../services/notifyService");
const { isMailConfigured } = require("../services/mailService");

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  res.json(await notifications.list({ limit: req.query.limit }));
});

// Body: { ids: [...] } | { kind: "enquiries" } | { all: true }
router.post("/read", async (req, res) => {
  const changed = await notifications.markRead(req.body || {});
  res.json({ ok: true, changed, ...(await notifications.list()) });
});

// Body: { ids: [...] } | { kind: "enquiries" } | { all: true }
router.post("/clear", async (req, res) => {
  const removed = await notifications.clear(req.body || {});
  res.json({ ok: true, removed, ...(await notifications.list()) });
});

async function settingsPayload(settings) {
  return {
    settings,
    events: emailSettings.eventCatalog(),
    limits: emailSettings.LIMITS,
    mailConfigured: isMailConfigured(),
  };
}

router.get("/email-settings", async (_req, res) => {
  res.json(await settingsPayload(await emailSettings.getSettings()));
});

router.put("/email-settings", async (req, res) => {
  const settings = await emailSettings.updateSettings(req.body || {});
  res.json({ ...(await settingsPayload(settings)), message: "Email settings saved." });
});

router.post("/email-settings/:event/reset", async (req, res) => {
  const settings = await emailSettings.resetEvent(req.params.event);
  res.json({ ...(await settingsPayload(settings)), message: "Email restored to the default wording." });
});

router.post("/email-settings/:event/test", async (req, res) => {
  const recipients = await notify.sendTest(req.params.event, req.body?.template);
  res.json({ ok: true, message: `Test email sent to the notification inbox (${recipients.length} address${recipients.length === 1 ? "" : "es"}).` });
});

module.exports = router;
