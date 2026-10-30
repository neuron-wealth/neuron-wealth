const { HttpError } = require("./http");
const { isEmail } = require("./validators");
const { sanitizeContent, excerptFrom } = require("./blogHtml");

const LIMITS = {
  title: 200,
  slug: 160,
  excerpt: 400,
  content: 250000,
  image: 500,
  alt: 200,
  term: 60,
  categories: 10,
  tags: 30,
  author: 120,
  seoTitle: 100,
  seoDescription: 200,
  commentName: 80,
  commentEmail: 160,
  commentWebsite: 200,
  comment: 3000,
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_PATTERN = /^(\/images\/|\/api\/uploads\/media\/|https:\/\/)[^\s"'<>]*$/;
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

function str(value, label, max, { required = false } = {}) {
  const result = text(value);
  if (required && !result) throw new HttpError(400, `${label} is required.`);
  if (result.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`);
  return result;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.slug)
    .replace(/-+$/g, "");
}

function slug(value) {
  const result = String(value ?? "").trim().toLowerCase();
  if (!result) throw new HttpError(400, "Blog URL slug is required.");
  if (result.length > LIMITS.slug) throw new HttpError(400, `Blog URL slug must be ${LIMITS.slug} characters or fewer.`);
  if (!SLUG_PATTERN.test(result)) throw new HttpError(400, "Blog URL slug can use lowercase letters, numbers and single dashes only.");
  return result;
}

function terms(value, label, max) {
  const list = Array.isArray(value) ? value : String(value ?? "").split(",");
  const seen = new Set();
  const result = [];
  for (const entry of list) {
    const term = str(entry, label, LIMITS.term);
    const key = term.toLowerCase();
    if (!term || seen.has(key)) continue;
    seen.add(key);
    result.push(term);
  }
  if (result.length > max) throw new HttpError(400, `Use at most ${max} ${label.toLowerCase()}.`);
  return result;
}

function image(value) {
  const result = String(value ?? "").trim();
  if (!result) return "";
  if (result.length > LIMITS.image || !IMAGE_PATTERN.test(result)) throw new HttpError(400, "Cover image must be an uploaded image or an https:// image address.");
  return result;
}

function date(value) {
  if (value === undefined || value === null || value === "") return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new HttpError(400, "Publish date is not a valid date.");
  const year = parsed.getUTCFullYear();
  if (year < 2000 || year > 2100) throw new HttpError(400, "Publish date must be between 2000 and 2100.");
  return parsed.toISOString();
}

/** Validates and cleans a blog post sent by the admin. */
function blogInput(input) {
  if (!isObject(input)) throw new HttpError(400, "Blog details are missing.");
  const title = str(input.title, "Title", LIMITS.title, { required: true });
  const rawContent = String(input.content ?? "");
  if (rawContent.length > LIMITS.content) throw new HttpError(400, "Blog content is too long.");
  const content = sanitizeContent(rawContent);
  const status = input.status === "published" ? "published" : "draft";
  if (status === "published" && !content) throw new HttpError(400, "Add some blog content before publishing.");
  const seo = isObject(input.seo) ? input.seo : {};
  return {
    title,
    slug: input.slug ? slug(input.slug) : slugify(title),
    excerpt: str(input.excerpt, "Short description", LIMITS.excerpt) || excerptFrom(content),
    content,
    coverImage: image(input.coverImage),
    coverAlt: str(input.coverAlt, "Cover image alt text", LIMITS.alt),
    categories: terms(input.categories, "Categories", LIMITS.categories),
    tags: terms(input.tags, "Tags", LIMITS.tags),
    author: str(input.author, "Author", LIMITS.author),
    status,
    publishedAt: date(input.publishedAt),
    commentsEnabled: input.commentsEnabled !== false,
    seo: {
      title: str(seo.title, "SEO title", LIMITS.seoTitle),
      description: str(seo.description, "SEO description", LIMITS.seoDescription),
    },
  };
}

function commentText(value) {
  const result = String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (result.length < 2) throw new HttpError(400, "Please write your comment.");
  if (result.length > LIMITS.comment) throw new HttpError(400, `Comments must be ${LIMITS.comment} characters or fewer.`);
  return result;
}

/** Validates a comment posted from the website "Leave a Reply" form. */
function publicComment(input) {
  if (!isObject(input)) throw new HttpError(400, "Comment details are missing.");
  const authorName = str(input.name, "Name", LIMITS.commentName, { required: true });
  const authorEmail = str(input.email, "Email", LIMITS.commentEmail, { required: true }).toLowerCase();
  if (!isEmail(authorEmail)) throw new HttpError(400, "Enter a valid email address.");
  let authorWebsite = str(input.website, "Website", LIMITS.commentWebsite);
  if (authorWebsite && !/^https?:\/\//i.test(authorWebsite)) authorWebsite = `https://${authorWebsite}`;
  if (authorWebsite && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(authorWebsite)) throw new HttpError(400, "Enter a valid website address.");
  return {
    authorName,
    authorEmail,
    authorWebsite,
    content: commentText(input.comment),
    parentId: text(input.parentId).slice(0, 40),
  };
}

module.exports = { LIMITS, slug, slugify, blogInput, publicComment, commentText, str };
