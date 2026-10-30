const siteSettings = require("../services/siteSettingsService");

async function getPublicSettings(req, res) {
  res.set("Cache-Control", "no-cache");
  res.json({ settings: await siteSettings.getSettings() });
}

function getMeta(req, res) {
  res.json(siteSettings.getMeta());
}

async function updateSection(req, res) {
  const settings = await siteSettings.updateSection(req.params.section, req.body);
  res.json({ settings, message: "Changes saved." });
}

async function resetSection(req, res) {
  const settings = await siteSettings.resetSection(req.params.section);
  res.json({ settings, message: "Section restored to the original content." });
}

async function uploadLogo(req, res) {
  const settings = await siteSettings.setLogo(req.params.variant, req.file);
  res.status(201).json({ settings, message: "Logo updated." });
}

async function removeLogo(req, res) {
  const settings = await siteSettings.removeLogo(req.params.variant);
  res.json({ settings, message: "Original logo restored." });
}

module.exports = { getPublicSettings, getMeta, updateSection, resetSection, uploadLogo, removeLogo };
