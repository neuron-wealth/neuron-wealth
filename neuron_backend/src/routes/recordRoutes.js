const { Router } = require("express");
const { requireAuth } = require("../middleware/auth");
const { rateLimit } = require("../middleware/rateLimit");
const { recordServices } = require("../services/recordService");
const { publicDefinition } = require("../config/recordTypes");
const { cleanRecord } = require("../utils/recordValidation");
const notify = require("../services/notifyService");

const FIFTEEN_MINUTES = 15 * 60 * 1000;
// Hidden form field that people never see; automated spam fills it in.
const HONEYPOT = "website";

function createRecordRouter(key) {
  const service = recordServices[key];
  const { def } = service;
  const router = Router();

  if (def.publicForm) {
    const limiter = rateLimit({
      windowMs: FIFTEEN_MINUTES,
      max: 8,
      message: "Too many submissions from this connection. Please try again in 15 minutes.",
    });

    router.post("/", limiter, async (req, res) => {
      if (String(req.body?.[HONEYPOT] || "").trim()) {
        return res.status(201).json({ ok: true, message: def.successMessage });
      }
      const data = cleanRecord(def, req.body);
      const { item, duplicate } = await service.create(data);
      if (!duplicate) notify.submission(key, item);
      return res.status(201).json({ ok: true, message: def.successMessage });
    });
  }

  router.use(requireAuth);

  router.get("/", async (_req, res) => {
    res.json({ items: await service.list(), type: publicDefinition(key) });
  });

  router.post("/manual", async (req, res) => {
    const data = cleanRecord(def, req.body, { admin: true });
    const { item } = await service.create(data, { rejectDuplicate: true });
    res.status(201).json({ item });
  });

  router.post("/bulk", async (req, res) => {
    const count = await service.bulk(req.body?.ids, String(req.body?.action || ""), String(req.body?.status || ""));
    res.json({ ok: true, count });
  });

  router.get("/:id", async (req, res) => {
    res.json({ item: await service.get(req.params.id) });
  });

  router.patch("/:id", async (req, res) => {
    const patch = cleanRecord(def, req.body, { partial: true, admin: true });
    delete patch.sourcePage;
    res.json({ item: await service.update(req.params.id, patch) });
  });

  router.delete("/:id", async (req, res) => {
    await service.remove(req.params.id);
    res.json({ ok: true });
  });

  return router;
}

module.exports = { createRecordRouter };
