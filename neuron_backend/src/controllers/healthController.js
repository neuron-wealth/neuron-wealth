
// Public uptime check: says only whether the API is up. Database and email status are not exposed.
function health(_req, res) {
  res.json({ ok: true, timestamp: new Date().toISOString() });
}

module.exports = { health };
