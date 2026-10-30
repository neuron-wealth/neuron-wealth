const sanitizeHtml = require("sanitize-html");

const ALIGN_CLASSES = ["alignleft", "alignright", "aligncenter", "alignnone"];
const TEXT_ALIGN = [/^(left|right|center|justify)$/];

/** Keeps a div only when it is the "Table Content" box; every other div is unwrapped. */
function transformDiv(tagName, attribs) {
  const classes = String(attribs.class || "").split(/\s+/);
  if (classes.includes("table-content") || classes.includes("toc")) return { tagName: "div", attribs: { class: "toc" } };
  return { tagName: "unwrap", attribs: {} };
}

function transformParagraph(tagName, attribs) {
  const classes = String(attribs.class || "").split(/\s+/);
  const next = {};
  if (classes.includes("table-title") || classes.includes("toc-title")) next.class = "toc-title";
  if (attribs.style) next.style = attribs.style;
  if (!next.style && /^(center|right)$/i.test(attribs.align || "")) next.style = `text-align: ${attribs.align.toLowerCase()}`;
  return { tagName: "p", attribs: next };
}

function transformLink(tagName, attribs) {
  const href = String(attribs.href || "").trim();
  const next = { href };
  if (attribs.id) next.id = attribs.id;
  if (attribs.title) next.title = attribs.title;
  if (/^https?:\/\//i.test(href)) {
    next.target = "_blank";
    next.rel = "noopener noreferrer";
  }
  return { tagName: "a", attribs: next };
}

function transformImage(tagName, attribs) {
  const classes = String(attribs.class || "")
    .split(/\s+/)
    .filter((name) => ALIGN_CLASSES.includes(name));
  const next = { src: attribs.src || "", alt: attribs.alt || "", loading: "lazy" };
  if (/^\d+$/.test(attribs.width || "")) next.width = attribs.width;
  if (/^\d+$/.test(attribs.height || "")) next.height = attribs.height;
  if (classes.length) next.class = classes.join(" ");
  return { tagName: "img", attribs: next };
}

const OPTIONS = {
  allowedTags: [
    "p", "br", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "sup", "sub", "a",
    "ul", "ol", "li", "blockquote", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    "img", "figure", "figcaption", "hr", "div", "code", "pre",
  ],
  allowedAttributes: {
    a: ["href", "id", "title", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading", "class"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"],
    ol: ["start"],
    td: ["colspan", "rowspan", "style"],
    th: ["colspan", "rowspan", "style"],
    p: ["class", "style"],
    div: ["class"],
  },
  allowedClasses: { div: ["toc"], p: ["toc-title"], img: ALIGN_CLASSES },
  allowedStyles: {
    p: { "text-align": TEXT_ALIGN },
    td: { "text-align": TEXT_ALIGN },
    th: { "text-align": TEXT_ALIGN },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: { div: transformDiv, p: transformParagraph, a: transformLink, img: transformImage, b: "strong", i: "em" },
  exclusiveFilter: (frame) => {
    if (frame.tag === "img") return !frame.attribs.src;
    if (frame.tag === "a") return !frame.attribs.href && !frame.attribs.id && !frame.text.trim();
    if (frame.tag === "p") return !frame.text.replace(/\u00a0/g, " ").trim() && !frame.mediaChildren?.length;
    return false;
  },
};

/** Cleans blog post HTML down to the formatting the website renders. */
function sanitizeContent(html) {
  return sanitizeHtml(String(html || ""), OPTIONS)
    .replace(/(&nbsp;|\u00a0)+/g, (match) => (match.length > 6 ? " " : match))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", rsaquo: "›", laquo: "«", raquo: "»", copy: "©", reg: "®", trade: "™", times: "×", euro: "€", pound: "£", rupee: "₹" };

function decodeEntities(value) {
  return String(value || "").replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const number = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return NAMED[code.toLowerCase()] ?? match;
  });
}

/** Plain text from HTML, keeping paragraph and line breaks. */
function htmlToText(html) {
  const text = String(html || "")
    .replace(/<br\s*\/?>\s*/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>\s*/gi, "\n\n")
    .replace(/<[^>]+>/g, "");
  return decodeEntities(text)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function excerptFrom(html, max = 220) {
  const withoutToc = String(html || "").replace(/<div class="toc">[\s\S]*?<\/div>/i, "");
  const text = htmlToText(withoutToc).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 30)).replace(/[,;:.\s]+$/, "")}…`;
}

module.exports = { sanitizeContent, htmlToText, decodeEntities, excerptFrom };
