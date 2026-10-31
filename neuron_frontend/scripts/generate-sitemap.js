// Writes public/sitemap.xml before each production build: every public page plus every published
// blog post. Blog posts come from the API (SITEMAP_API_URL, default http://localhost:5000); if it
// cannot be reached the sitemap still lists the main pages, so the build never fails because of it.
const fs = require("fs");
const path = require("path");

const SITE = (process.env.SITE_URL || "https://neuronwealth.com").replace(/\/$/, "");
const API = (process.env.SITEMAP_API_URL || "http://localhost:5000").replace(/\/$/, "");

const PAGES = [
  ["/", "1.0", "weekly"],
  ["/about", "0.8", "monthly"],
  ["/why-associate", "0.7", "monthly"],
  ["/team", "0.7", "monthly"],
  ["/contact", "0.8", "monthly"],
  ["/services/nri-returning-to-india", "0.9", "monthly"],
  ["/services/global-indians", "0.9", "monthly"],
  ["/services/global-citizens-in-india", "0.9", "monthly"],
  ["/services/global-investor", "0.9", "monthly"],
  ["/services/founders-and-entrepreneurs", "0.9", "monthly"],
  ["/services/professionals-and-cxos", "0.9", "monthly"],
  ["/insights", "0.7", "weekly"],
  ["/insights/media", "0.5", "monthly"],
  ["/insights/books", "0.5", "monthly"],
  ["/insights/video", "0.5", "monthly"],
  ["/insights/connect", "0.5", "monthly"],
  ["/blog", "0.8", "weekly"],
  ["/sebi-regulatory-compliance", "0.6", "monthly"],
  ["/material-information", "0.4", "yearly"],
  ["/sebi-investor-charter", "0.4", "yearly"],
  ["/code-of-conduct-sebi", "0.4", "yearly"],
  ["/grievance-redressal", "0.4", "yearly"],
  ["/functions-of-investment-adviser", "0.4", "yearly"],
  ["/risks", "0.4", "yearly"],
  ["/conflict-of-interest", "0.4", "yearly"],
  ["/cfa-code-of-conduct", "0.4", "yearly"],
  ["/privacy-policy", "0.3", "yearly"],
  ["/refund-policy", "0.3", "yearly"],
  ["/website-disclaimer", "0.3", "yearly"],
];

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

async function blogPosts() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`${API}/api/blogs/public`, { signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return (data.posts || []).filter((post) => post.slug);
  } catch (error) {
    console.warn(`[sitemap] Blog posts not included (${error.message}). Set SITEMAP_API_URL to the live API.`);
    return [];
  }
}

(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const posts = await blogPosts();
  const urls = [
    ...PAGES.map(([loc, priority, changefreq]) => ({ loc, priority, changefreq, lastmod: today })),
    ...posts.map((post) => ({
      loc: `/blog/${encodeURIComponent(post.slug)}`,
      priority: "0.6",
      changefreq: "monthly",
      lastmod: (post.publishedAt || today).slice(0, 10),
    })),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) => `  <url><loc>${escapeXml(SITE + u.loc)}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
      .join("\n") +
    "\n</urlset>\n";
  fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), xml);
  console.log(`[sitemap] Wrote ${urls.length} URLs (${posts.length} blog posts).`);
})();
