const blogs = require("../services/blogService");
const { saveImage } = require("../services/pageService");

async function listPublic(req, res) {
  res.set("Cache-Control", "no-cache");
  res.json(await blogs.listPublic());
}

async function getPublic(req, res) {
  res.set("Cache-Control", "no-cache");
  res.json(await blogs.getPublic(req.params.slug));
}

async function listPublicComments(req, res) {
  res.set("Cache-Control", "no-cache");
  res.json(await blogs.listPublicComments(req.params.slug, req.query.page));
}

async function addPublicComment(req, res) {
  if (String(req.body?.company || "").trim()) return res.status(201).json({ message: "Thank you. Your comment is awaiting moderation." });
  await blogs.addPublicComment(req.params.slug, req.body);
  res.status(201).json({ message: "Thank you. Your comment is awaiting moderation." });
}

async function listAdmin(req, res) {
  res.json(await blogs.listAdmin());
}

async function getMeta(req, res) {
  res.json(await blogs.getMeta());
}

async function getAdmin(req, res) {
  res.json({ post: await blogs.getAdmin(req.params.id) });
}

async function createBlog(req, res) {
  const post = await blogs.createBlog(req.body);
  res.status(201).json({ post, message: `"${post.title}" created.` });
}

async function updateBlog(req, res) {
  const post = await blogs.updateBlogPost(req.params.id, req.body);
  res.json({ post, message: post.status === "published" ? "Blog post saved. The website now shows these changes." : "Blog post saved as a draft." });
}

async function setStatus(req, res) {
  const post = await blogs.setStatus(req.params.id, req.body?.status);
  res.json({ post, message: post.status === "published" ? `"${post.title}" is published.` : `"${post.title}" moved to drafts.` });
}

async function deleteBlog(req, res) {
  await blogs.deleteBlog(req.params.id);
  res.json({ message: "Blog post and its comments deleted." });
}

async function restoreOriginal(req, res) {
  const post = await blogs.restoreOriginal(req.params.id);
  res.json({ post, message: "Original content from neuronwealth.com restored." });
}

async function importOriginals(req, res) {
  const result = await blogs.importOriginals();
  res.json({
    ...result,
    message: result.posts
      ? `Imported ${result.posts} original post${result.posts === 1 ? "" : "s"} with ${result.comments} comment${result.comments === 1 ? "" : "s"}.`
      : "All original posts are already in the blog.",
  });
}

async function uploadImage(req, res) {
  const image = await saveImage(req.file);
  res.status(201).json({ image, message: "Image uploaded." });
}

async function listComments(req, res) {
  res.json(await blogs.listComments(req.query));
}

async function updateComment(req, res) {
  const comment = await blogs.updateComment(req.params.id, req.body);
  res.json({ comment, message: "Comment updated." });
}

async function deleteComment(req, res) {
  const removed = await blogs.deleteComment(req.params.id);
  res.json({ removed, message: removed > 1 ? `Comment and ${removed - 1} repl${removed === 2 ? "y" : "ies"} deleted.` : "Comment deleted." });
}

async function replyToComment(req, res) {
  const comment = await blogs.replyToComment(req.params.id, req.body);
  res.status(201).json({ comment, message: "Reply published." });
}

async function bulkComments(req, res) {
  const count = await blogs.bulkComments(req.body?.ids, req.body?.action);
  res.json({ count, message: `${count} comment${count === 1 ? "" : "s"} updated.` });
}

module.exports = {
  listPublic,
  getPublic,
  listPublicComments,
  addPublicComment,
  listAdmin,
  getMeta,
  getAdmin,
  createBlog,
  updateBlog,
  setStatus,
  deleteBlog,
  restoreOriginal,
  importOriginals,
  uploadImage,
  listComments,
  updateComment,
  deleteComment,
  replyToComment,
  bulkComments,
};
