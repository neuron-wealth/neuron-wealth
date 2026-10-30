const { randomBytes } = require("crypto");
const { hasDB } = require("../config/db");
const Blog = require("../models/Blog");
const BlogComment = require("../models/BlogComment");
const AppMeta = require("../models/AppMeta");
const validate = require("../utils/blogValidation");
const { htmlToText } = require("../utils/blogHtml");
const { readJson, writeJson } = require("../utils/fileStore");
const { HttpError } = require("../utils/http");
const notify = require("./notifyService");

const BLOG_FILE = "blogs.json";
const COMMENT_FILE = "blogComments.json";
const SEED_KEY = "blog-seed";
const COMMENT_STATUSES = ["approved", "pending", "spam"];
const PUBLIC_THREADS_PER_PAGE = 10;
const ADMIN_COMMENTS_PER_PAGE = 25;

const newId = () => randomBytes(8).toString("hex");
const blogLegacyId = (legacyId) => `wp-${legacyId}`;
const commentLegacyId = (legacyId) => `wpc-${legacyId}`;
const iso = (value) => (value ? new Date(value).toISOString() : null);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let seedCache = null;
function seedData() {
  if (!seedCache) {
    seedCache = {
      blogs: require("../seed/blogs.json"),
      comments: require("../seed/blogComments.json"),
    };
  }
  return seedCache;
}

/* ----------------------------- storage ----------------------------- */

let fileCache = null;

function fileStore() {
  if (!fileCache) {
    const blogs = readJson(BLOG_FILE, {});
    const comments = readJson(COMMENT_FILE, {});
    fileCache = {
      seeded: Boolean(blogs.seeded),
      blogs: Array.isArray(blogs.blogs) ? blogs.blogs : [],
      comments: Array.isArray(comments.comments) ? comments.comments : [],
    };
  }
  return fileCache;
}

function saveBlogsFile() {
  const store = fileStore();
  writeJson(BLOG_FILE, { seeded: store.seeded, blogs: store.blogs });
}

function saveCommentsFile() {
  writeJson(COMMENT_FILE, { comments: fileStore().comments });
}

function shapeBlog(doc) {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    coverImage: doc.coverImage || "",
    coverAlt: doc.coverAlt || "",
    categories: doc.categories || [],
    tags: doc.tags || [],
    author: doc.author || "",
    status: doc.status === "published" ? "published" : "draft",
    publishedAt: iso(doc.publishedAt),
    commentsEnabled: doc.commentsEnabled !== false,
    seo: { title: doc.seo?.title || "", description: doc.seo?.description || "" },
    previousSlugs: doc.previousSlugs || [],
    legacyId: doc.legacyId || null,
    legacyUrl: doc.legacyUrl || "",
    createdAt: iso(doc.createdAt),
    updatedAt: iso(doc.updatedAt),
  };
}

function shapeComment(doc) {
  return {
    id: doc.id,
    blogId: doc.blogId,
    parentId: doc.parentId || "",
    authorName: doc.authorName,
    authorEmail: doc.authorEmail || "",
    authorWebsite: doc.authorWebsite || "",
    content: doc.content,
    status: doc.status,
    byAdmin: Boolean(doc.byAdmin),
    legacyId: doc.legacyId || null,
    createdAt: iso(doc.createdAt),
    updatedAt: iso(doc.updatedAt),
  };
}

async function allBlogs({ withContent = true } = {}) {
  if (hasDB()) {
    const query = Blog.find();
    if (!withContent) query.select("-content");
    return (await query.lean()).map(shapeBlog);
  }
  return fileStore().blogs.map(shapeBlog);
}

async function blogById(id) {
  if (hasDB()) {
    const doc = await Blog.findOne({ id }).lean();
    return doc ? shapeBlog(doc) : null;
  }
  const doc = fileStore().blogs.find((entry) => entry.id === id);
  return doc ? shapeBlog(doc) : null;
}

async function blogBySlug(slug) {
  if (hasDB()) {
    const doc = (await Blog.findOne({ slug }).lean()) || (await Blog.findOne({ previousSlugs: slug }).lean());
    return doc ? shapeBlog(doc) : null;
  }
  const { blogs } = fileStore();
  const doc = blogs.find((entry) => entry.slug === slug) || blogs.find((entry) => (entry.previousSlugs || []).includes(slug));
  return doc ? shapeBlog(doc) : null;
}

async function insertBlogs(list) {
  if (!list.length) return;
  const now = new Date().toISOString();
  const docs = list.map((entry) => ({ createdAt: now, updatedAt: now, ...entry }));
  if (hasDB()) {
    await Blog.insertMany(docs, { ordered: false, timestamps: false });
    return;
  }
  fileStore().blogs.push(...docs);
  saveBlogsFile();
}

async function updateBlog(id, data) {
  if (hasDB()) {
    await Blog.updateOne({ id }, { $set: data });
    return blogById(id);
  }
  const store = fileStore();
  const index = store.blogs.findIndex((entry) => entry.id === id);
  if (index < 0) return null;
  store.blogs[index] = { ...store.blogs[index], ...data, updatedAt: new Date().toISOString() };
  saveBlogsFile();
  return blogById(id);
}

async function deleteBlogDoc(id) {
  if (hasDB()) {
    await Blog.deleteOne({ id });
    await BlogComment.deleteMany({ blogId: id });
    return;
  }
  const store = fileStore();
  store.blogs = store.blogs.filter((entry) => entry.id !== id);
  store.comments = store.comments.filter((entry) => entry.blogId !== id);
  saveBlogsFile();
  saveCommentsFile();
}

async function commentsFor(blogId, status) {
  if (hasDB()) {
    const filter = { blogId };
    if (status) filter.status = status;
    return (await BlogComment.find(filter).sort({ createdAt: 1 }).lean()).map(shapeComment);
  }
  return fileStore()
    .comments.filter((entry) => entry.blogId === blogId && (!status || entry.status === status))
    .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
    .map(shapeComment);
}

async function commentById(id) {
  if (hasDB()) {
    const doc = await BlogComment.findOne({ id }).lean();
    return doc ? shapeComment(doc) : null;
  }
  const doc = fileStore().comments.find((entry) => entry.id === id);
  return doc ? shapeComment(doc) : null;
}

async function insertComments(list) {
  if (!list.length) return;
  const now = new Date().toISOString();
  const docs = list.map((entry) => ({ createdAt: now, updatedAt: now, ...entry }));
  if (hasDB()) {
    await BlogComment.insertMany(docs, { ordered: false, timestamps: false });
    return;
  }
  fileStore().comments.push(...docs);
  saveCommentsFile();
}

async function updateComments(ids, data) {
  if (!ids.length) return;
  if (hasDB()) {
    await BlogComment.updateMany({ id: { $in: ids } }, { $set: data });
    return;
  }
  const set = new Set(ids);
  const now = new Date().toISOString();
  const store = fileStore();
  store.comments = store.comments.map((entry) => (set.has(entry.id) ? { ...entry, ...data, updatedAt: now } : entry));
  saveCommentsFile();
}

async function deleteComments(ids) {
  if (!ids.length) return;
  if (hasDB()) {
    await BlogComment.deleteMany({ id: { $in: ids } });
    return;
  }
  const set = new Set(ids);
  const store = fileStore();
  store.comments = store.comments.filter((entry) => !set.has(entry.id));
  saveCommentsFile();
}

/** Comment ids together with every reply nested beneath them. */
async function withDescendants(ids) {
  const result = new Set(ids);
  let frontier = [...ids];
  while (frontier.length) {
    let children;
    if (hasDB()) children = (await BlogComment.find({ parentId: { $in: frontier } }).select("id").lean()).map((doc) => doc.id);
    else {
      const parents = new Set(frontier);
      children = fileStore().comments.filter((entry) => parents.has(entry.parentId)).map((entry) => entry.id);
    }
    frontier = children.filter((id) => !result.has(id));
    frontier.forEach((id) => result.add(id));
  }
  return [...result];
}

/** { [blogId]: { approved, pending, spam } } */
async function commentCounts() {
  const counts = {};
  const add = (blogId, status, n) => {
    counts[blogId] = counts[blogId] || { approved: 0, pending: 0, spam: 0 };
    counts[blogId][status] = (counts[blogId][status] || 0) + n;
  };
  if (hasDB()) {
    const rows = await BlogComment.aggregate([{ $group: { _id: { blogId: "$blogId", status: "$status" }, n: { $sum: 1 } } }]);
    rows.forEach((row) => add(row._id.blogId, row._id.status, row.n));
  } else {
    fileStore().comments.forEach((entry) => add(entry.blogId, entry.status, 1));
  }
  return counts;
}

/* ------------------------------ seeding ------------------------------ */

function seedBlogDoc(entry) {
  const { legacyId, modifiedAt, ...rest } = entry;
  return {
    ...rest,
    id: blogLegacyId(legacyId),
    legacyId,
    previousSlugs: [],
    createdAt: entry.publishedAt,
    updatedAt: modifiedAt || entry.publishedAt,
  };
}

function seedCommentDocs(postLegacyIds) {
  const wanted = new Set(postLegacyIds);
  return seedData()
    .comments.filter((entry) => wanted.has(entry.postLegacyId))
    .map((entry) => ({
      id: commentLegacyId(entry.legacyId),
      blogId: blogLegacyId(entry.postLegacyId),
      parentId: entry.parentLegacyId ? commentLegacyId(entry.parentLegacyId) : "",
      authorName: entry.authorName,
      authorEmail: "",
      authorWebsite: "",
      content: entry.content || "(no text)",
      status: "approved",
      byAdmin: entry.byAdmin,
      legacyId: entry.legacyId,
      createdAt: entry.createdAt,
      updatedAt: entry.createdAt,
    }));
}

async function isSeeded() {
  if (hasDB()) return Boolean(await AppMeta.findOne({ key: SEED_KEY }).lean());
  return fileStore().seeded;
}

async function markSeeded() {
  if (hasDB()) {
    await AppMeta.updateOne({ key: SEED_KEY }, { $set: { value: { at: new Date().toISOString() } } }, { upsert: true });
    return;
  }
  fileStore().seeded = true;
  saveBlogsFile();
}

/** Adds original neuronwealth.com posts (and their comments) that are not in the store yet. */
async function importOriginals() {
  const existing = await allBlogs({ withContent: false });
  const ids = new Set(existing.map((entry) => entry.id));
  const slugs = new Set(existing.map((entry) => entry.slug));
  const missing = seedData().blogs.filter((entry) => !ids.has(blogLegacyId(entry.legacyId)) && !slugs.has(entry.slug));
  await insertBlogs(missing.map(seedBlogDoc));

  const comments = seedCommentDocs(missing.map((entry) => entry.legacyId));
  if (hasDB()) {
    const present = new Set((await BlogComment.find({ id: { $in: comments.map((c) => c.id) } }).select("id").lean()).map((doc) => doc.id));
    await insertComments(comments.filter((entry) => !present.has(entry.id)));
  } else {
    const present = new Set(fileStore().comments.map((entry) => entry.id));
    await insertComments(comments.filter((entry) => !present.has(entry.id)));
  }
  return { posts: missing.length, comments: comments.length };
}

/** Loads the original blog on first start only, so deleted posts never come back on their own. */
async function seedBlogs() {
  if (await isSeeded()) return null;
  const result = await importOriginals();
  await markSeeded();
  return result;
}

/* ------------------------------ helpers ------------------------------ */

function readingMinutes(html) {
  const words = htmlToText(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const isLive = (blog, now = Date.now()) => blog.status === "published" && new Date(blog.publishedAt).getTime() <= now;
const byNewest = (a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt));

function publicSummary(blog, counts) {
  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    coverAlt: blog.coverAlt,
    categories: blog.categories,
    tags: blog.tags,
    author: blog.author,
    publishedAt: blog.publishedAt,
    commentCount: counts?.[blog.id]?.approved || 0,
  };
}

function adminSummary(blog, counts) {
  const now = Date.now();
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    categories: blog.categories,
    tags: blog.tags,
    author: blog.author,
    status: blog.status,
    scheduled: blog.status === "published" && new Date(blog.publishedAt).getTime() > now,
    publishedAt: blog.publishedAt,
    updatedAt: blog.updatedAt,
    legacy: Boolean(blog.legacyId),
    commentsEnabled: blog.commentsEnabled,
    comments: counts?.[blog.id] || { approved: 0, pending: 0, spam: 0 },
  };
}

function buildThreads(comments) {
  const nodes = new Map(comments.map((entry) => [entry.id, { ...entry, replies: [] }]));
  const roots = [];
  for (const node of nodes.values()) {
    const parent = node.parentId && nodes.get(node.parentId);
    if (parent) parent.replies.push(node);
    else roots.push(node);
  }
  return roots;
}

function publicComment(node) {
  return {
    id: node.id,
    parentId: node.parentId,
    authorName: node.authorName,
    content: node.content,
    byAdmin: node.byAdmin,
    createdAt: node.createdAt,
    replies: node.replies.map(publicComment),
  };
}

async function liveBlogBySlug(slug) {
  const blog = await blogBySlug(slug);
  if (!blog || !isLive(blog)) throw new HttpError(404, "Blog post not found.");
  return blog;
}

/* ------------------------------ public API ------------------------------ */

async function listPublic() {
  const [blogs, counts] = await Promise.all([allBlogs({ withContent: false }), commentCounts()]);
  const now = Date.now();
  const posts = blogs.filter((blog) => isLive(blog, now)).sort(byNewest).map((blog) => publicSummary(blog, counts));
  const categories = {};
  posts.forEach((post) => post.categories.forEach((name) => (categories[name] = (categories[name] || 0) + 1)));
  return {
    posts,
    categories: Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

async function getPublic(slug) {
  const blog = await liveBlogBySlug(slug);
  if (blog.slug !== slug) return { redirect: blog.slug };

  const [blogs, counts] = await Promise.all([allBlogs({ withContent: false }), commentCounts()]);
  const live = blogs.filter((entry) => isLive(entry)).sort(byNewest);
  const index = live.findIndex((entry) => entry.id === blog.id);
  const link = (entry) => (entry ? { slug: entry.slug, title: entry.title } : null);
  const shared = new Set(blog.categories);
  const related = live
    .filter((entry) => entry.id !== blog.id)
    .map((entry) => ({ entry, score: entry.categories.filter((name) => shared.has(name)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byNewest(a.entry, b.entry))
    .slice(0, 3)
    .map(({ entry }) => publicSummary(entry, counts));

  return {
    post: {
      ...publicSummary(blog, counts),
      content: blog.content,
      commentsEnabled: blog.commentsEnabled,
      seo: blog.seo,
      updatedAt: blog.updatedAt,
      readingMinutes: readingMinutes(blog.content),
    },
    newer: link(live[index - 1]),
    older: link(live[index + 1]),
    related,
  };
}

async function listPublicComments(slug, page = 1) {
  const blog = await liveBlogBySlug(slug);
  const comments = await commentsFor(blog.id, "approved");
  const threads = buildThreads(comments).reverse();
  const pages = Math.max(1, Math.ceil(threads.length / PUBLIC_THREADS_PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), pages);
  return {
    total: comments.length,
    threads: threads.length,
    page: current,
    pages,
    comments: threads.slice((current - 1) * PUBLIC_THREADS_PER_PAGE, current * PUBLIC_THREADS_PER_PAGE).map(publicComment),
  };
}

async function addPublicComment(slug, input) {
  const blog = await liveBlogBySlug(slug);
  if (!blog.commentsEnabled) throw new HttpError(403, "Comments are closed for this post.");
  const data = validate.publicComment(input);
  if (data.parentId) {
    const parent = await commentById(data.parentId);
    if (!parent || parent.blogId !== blog.id || parent.status !== "approved") data.parentId = "";
  }
  const comment = { id: newId(), blogId: blog.id, ...data, status: "pending", byAdmin: false };
  await insertComments([comment]);
  notify.comment(blog, comment);
  return { id: comment.id };
}

/* ------------------------------ admin API ------------------------------ */

async function listAdmin() {
  const [blogs, counts] = await Promise.all([allBlogs({ withContent: false }), commentCounts()]);
  const posts = blogs.sort(byNewest).map((blog) => adminSummary(blog, counts));
  const pendingComments = Object.values(counts).reduce((n, entry) => n + (entry.pending || 0), 0);
  return {
    posts,
    stats: {
      total: posts.length,
      published: posts.filter((post) => post.status === "published" && !post.scheduled).length,
      scheduled: posts.filter((post) => post.scheduled).length,
      draft: posts.filter((post) => post.status === "draft").length,
      pendingComments,
    },
    originals: seedData().blogs.length,
  };
}

async function getMeta() {
  const blogs = await allBlogs({ withContent: false });
  const collect = (key) => [...new Set(blogs.flatMap((blog) => blog[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  return {
    categories: collect("categories"),
    tags: collect("tags"),
    authors: [...new Set(blogs.map((blog) => blog.author).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    limits: validate.LIMITS,
  };
}

async function getAdmin(id) {
  const blog = await blogById(id);
  if (!blog) throw new HttpError(404, "Blog post not found.");
  return blog;
}

async function assertSlugFree(slug, exceptId) {
  const blogs = await allBlogs({ withContent: false });
  if (blogs.some((blog) => blog.slug === slug && blog.id !== exceptId)) {
    throw new HttpError(409, `Another blog post already uses the address "/blog/${slug}".`);
  }
}

async function createBlog(input) {
  const data = validate.blogInput(input);
  if (!data.slug) throw new HttpError(400, "Add a title or URL slug for this post.");
  await assertSlugFree(data.slug);
  const id = newId();
  await insertBlogs([{ ...data, id, previousSlugs: [], legacyId: null, legacyUrl: "" }]);
  return blogById(id);
}

async function updateBlogPost(id, input) {
  const existing = await getAdmin(id);
  const data = validate.blogInput(input);
  if (!data.slug) data.slug = existing.slug;
  await assertSlugFree(data.slug, id);
  const previousSlugs = new Set(existing.previousSlugs);
  if (data.slug !== existing.slug) previousSlugs.add(existing.slug);
  previousSlugs.delete(data.slug);
  return updateBlog(id, { ...data, previousSlugs: [...previousSlugs].slice(-20) });
}

async function setStatus(id, status) {
  const existing = await getAdmin(id);
  const next = status === "published" ? "published" : "draft";
  if (next === "published" && !existing.content) throw new HttpError(400, "Add some blog content before publishing.");
  return updateBlog(id, { status: next });
}

async function deleteBlog(id) {
  await getAdmin(id);
  await deleteBlogDoc(id);
}

async function restoreOriginal(id) {
  const existing = await getAdmin(id);
  const original = seedData().blogs.find((entry) => blogLegacyId(entry.legacyId) === id);
  if (!original) throw new HttpError(400, "Only posts imported from the original website can be restored.");
  const { id: _id, legacyId, previousSlugs, createdAt, updatedAt, ...data } = seedBlogDoc(original);
  await assertSlugFree(data.slug, id);
  const slugs = new Set(existing.previousSlugs);
  if (existing.slug !== data.slug) slugs.add(existing.slug);
  slugs.delete(data.slug);
  return updateBlog(id, { ...data, previousSlugs: [...slugs] });
}

/* --------------------------- admin comments --------------------------- */

async function listComments({ status = "", blogId = "", q = "", page = 1 } = {}) {
  const search = String(q || "").trim().slice(0, 100);
  const current = Math.max(1, Number(page) || 1);
  let items;
  let total;
  const counts = { all: 0, approved: 0, pending: 0, spam: 0 };

  if (hasDB()) {
    const base = {};
    if (blogId) base.blogId = blogId;
    if (search) {
      const pattern = new RegExp(escapeRegex(search), "i");
      base.$or = [{ authorName: pattern }, { authorEmail: pattern }, { content: pattern }];
    }
    const rows = await BlogComment.aggregate([{ $match: base }, { $group: { _id: "$status", n: { $sum: 1 } } }]);
    rows.forEach((row) => {
      counts[row._id] = row.n;
      counts.all += row.n;
    });
    const filter = COMMENT_STATUSES.includes(status) ? { ...base, status } : base;
    total = COMMENT_STATUSES.includes(status) ? counts[status] : counts.all;
    items = (
      await BlogComment.find(filter)
        .sort({ createdAt: -1 })
        .skip((current - 1) * ADMIN_COMMENTS_PER_PAGE)
        .limit(ADMIN_COMMENTS_PER_PAGE)
        .lean()
    ).map(shapeComment);
  } else {
    const needle = search.toLowerCase();
    const matching = fileStore().comments.filter(
      (entry) =>
        (!blogId || entry.blogId === blogId) &&
        (!needle || [entry.authorName, entry.authorEmail, entry.content].some((value) => String(value || "").toLowerCase().includes(needle)))
    );
    matching.forEach((entry) => {
      counts[entry.status] = (counts[entry.status] || 0) + 1;
      counts.all += 1;
    });
    const filtered = (COMMENT_STATUSES.includes(status) ? matching.filter((entry) => entry.status === status) : matching).sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt))
    );
    total = filtered.length;
    items = filtered.slice((current - 1) * ADMIN_COMMENTS_PER_PAGE, current * ADMIN_COMMENTS_PER_PAGE).map(shapeComment);
  }

  const blogs = new Map((await allBlogs({ withContent: false })).map((blog) => [blog.id, blog]));
  const parentIds = [...new Set(items.map((item) => item.parentId).filter(Boolean))];
  const parents = new Map();
  for (const parentId of parentIds) {
    const parent = await commentById(parentId);
    if (parent) parents.set(parentId, parent);
  }

  return {
    comments: items.map((item) => {
      const blog = blogs.get(item.blogId);
      const parent = parents.get(item.parentId);
      return {
        ...item,
        blog: blog ? { id: blog.id, slug: blog.slug, title: blog.title, status: blog.status } : null,
        parent: parent ? { id: parent.id, authorName: parent.authorName, content: parent.content.slice(0, 160) } : null,
      };
    }),
    counts,
    total,
    page: current,
    pages: Math.max(1, Math.ceil(total / ADMIN_COMMENTS_PER_PAGE)),
  };
}

async function getComment(id) {
  const comment = await commentById(id);
  if (!comment) throw new HttpError(404, "Comment not found.");
  return comment;
}

async function updateComment(id, input) {
  await getComment(id);
  const data = {};
  if (input?.status !== undefined) {
    if (!COMMENT_STATUSES.includes(input.status)) throw new HttpError(400, "Unknown comment status.");
    data.status = input.status;
  }
  if (input?.content !== undefined) data.content = validate.commentText(input.content);
  if (input?.authorName !== undefined) data.authorName = validate.str(input.authorName, "Name", validate.LIMITS.commentName, { required: true });
  await updateComments([id], data);
  return getComment(id);
}

async function deleteComment(id) {
  await getComment(id);
  const ids = await withDescendants([id]);
  await deleteComments(ids);
  return ids.length;
}

async function replyToComment(id, input) {
  const parent = await getComment(id);
  const authorName = validate.str(input?.authorName, "Name", validate.LIMITS.commentName, { required: true });
  const comment = {
    id: newId(),
    blogId: parent.blogId,
    parentId: parent.id,
    authorName,
    authorEmail: "",
    authorWebsite: "",
    content: validate.commentText(input?.content),
    status: "approved",
    byAdmin: true,
  };
  await insertComments([comment]);
  if (parent.status !== "approved") await updateComments([parent.id], { status: "approved" });
  const blog = await blogById(parent.blogId);
  if (blog) notify.reply(blog, parent, comment);
  return getComment(comment.id);
}

async function bulkComments(ids, action) {
  const list = (Array.isArray(ids) ? ids : []).map(String).slice(0, 200);
  if (!list.length) throw new HttpError(400, "Select at least one comment.");
  if (action === "delete") {
    const all = await withDescendants(list);
    await deleteComments(all);
    return all.length;
  }
  if (!COMMENT_STATUSES.includes(action)) throw new HttpError(400, "Unknown bulk action.");
  await updateComments(list, { status: action });
  return list.length;
}

module.exports = {
  seedBlogs,
  importOriginals,
  listPublic,
  getPublic,
  listPublicComments,
  addPublicComment,
  listAdmin,
  getMeta,
  getAdmin,
  createBlog,
  updateBlogPost,
  setStatus,
  deleteBlog,
  restoreOriginal,
  listComments,
  updateComment,
  deleteComment,
  replyToComment,
  bulkComments,
};
