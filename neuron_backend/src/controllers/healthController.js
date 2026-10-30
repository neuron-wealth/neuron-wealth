const { hasDB } = require("../config/db");
const { isMailConfigured } = require("../services/mailService");

function health(_req, res) {
  res.json({
    ok: true,
    db: hasDB() ? "connected" : "offline_fallback",
    mail: isMailConfigured() ? "configured" : "not_configured",
    timestamp: new Date().toISOString(),
  });
}

module.exports = { health };
