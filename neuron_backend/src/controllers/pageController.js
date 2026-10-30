const pages = require("../services/pageService");

async function getPublicPage(req, res) {
  res.set("Cache-Control", "no-cache");
  res.json({ page: await pages.getPublicPage(req.params.slug) });
}

async function listPages(req, res) {
  res.json(await pages.listPages());
}

function getMeta(req, res) {
  res.json(pages.getMeta());
}

async function getPage(req, res) {
  res.json({ page: await pages.getPage(req.params.slug) });
}

async function createPage(req, res) {
  const page = await pages.createPage(req.body);
  res.status(201).json({ page, message: `"${page.title}" created.` });
}

async function updatePage(req, res) {
  const page = await pages.updatePage(req.params.slug, req.body);
  res.json({ page, message: "Page saved. The website now shows these changes." });
}

async function deletePage(req, res) {
  await pages.deletePage(req.params.slug);
  res.json({ message: "Page deleted." });
}

async function resetPage(req, res) {
  const page = await pages.resetPage(req.params.slug);
  res.json({ page, message: "Page restored to the preloaded content." });
}

async function seedMissing(req, res) {
  const created = await pages.seedMissing();
  res.json({
    created,
    message: created.length ? `Seeded ${created.length} missing page${created.length === 1 ? "" : "s"}.` : "All preloaded pages are already seeded.",
  });
}

async function reloadDefaults(req, res) {
  const reloaded = await pages.reloadDefaults();
  res.json({ reloaded, message: "All preloaded pages were restored to their default content." });
}

async function uploadImage(req, res) {
  const image = await pages.saveImage(req.file);
  res.status(201).json({ image, message: "Image uploaded." });
}

async function uploadDocument(req, res) {
  const file = await pages.saveDocument(req.file);
  res.status(201).json({ file, message: "File uploaded." });
}

module.exports = {
  getPublicPage,
  listPages,
  getMeta,
  getPage,
  createPage,
  updatePage,
  deletePage,
  resetPage,
  seedMissing,
  reloadDefaults,
  uploadImage,
  uploadDocument,
};
