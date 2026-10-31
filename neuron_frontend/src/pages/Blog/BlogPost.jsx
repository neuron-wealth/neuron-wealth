import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, Clock3, Copy, ListOrdered, MessageCircle, Share2, Tag } from "lucide-react";
import Seo from "../../components/common/Seo";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { company } from "../../config/site";
import { fetchBlogPost, formatBlogDate, useBlogRequest } from "./blogApi";
import { BlogCard, FOCUS, blogPath } from "./blogShared";
import BlogComments from "./BlogComments";

const SITE = "https://neuronwealth.com";

const initials = (name) =>
  String(name || "NW")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

function PostSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only">Loading blog post</p>
      <div className="animate-pulse bg-[#0B1E30] px-4 pb-16 pt-10 sm:px-6">
        <div className="site-frame space-y-4">
          <div className="h-3 w-48 rounded bg-white/10" />
          <div className="h-10 w-full max-w-3xl rounded bg-white/10" />
          <div className="h-10 w-2/3 max-w-2xl rounded bg-white/10" />
          <div className="h-3 w-64 rounded bg-white/10" />
        </div>
      </div>
      <div className="site-frame animate-pulse px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className={`h-3.5 rounded bg-slate-100 dark:bg-white/5 ${index % 4 === 3 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotFound({ reload, failed }) {
  return (
    <div className="site-frame px-4 py-24 text-center sm:px-6">
      <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#21649A]">Blog</p>
      <h1 className="mt-3 font-display text-[2.2rem] font-medium text-[#15344F] dark:text-white">{failed ? "This post could not be loaded" : "Post not found"}</h1>
      <p className="mx-auto mt-3 max-w-md text-[#5E6D7B] dark:text-slate-300">
        {failed ? "Please check your connection and try again." : "The article you are looking for may have moved or is no longer available."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        {failed ? (
          <button type="button" onClick={reload} className={`rounded-full bg-[#21649A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15344F] ${FOCUS}`}>
            Try again
          </button>
        ) : null}
        <Link to="/blog" className={`rounded-full border border-[#21649A] px-5 py-2.5 text-sm font-semibold text-[#21649A] hover:bg-[#21649A] hover:text-white ${FOCUS}`}>
          All Blogs
        </Link>
      </div>
    </div>
  );
}

function shareTargets(url, title) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  return [
    { label: "LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
    { label: "X", short: "X", href: `https://x.com/intent/post?url=${encoded}&text=${text}` },
    { label: "Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "WhatsApp", short: "WA", href: `https://wa.me/?text=${text}%20${encoded}` },
  ];
}

function useCopy(url) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return [copied, copy];
}

/** Round share buttons for the sidebar. */
function ShareIcons({ url, title }) {
  const [copied, copy] = useCopy(url);
  const round = `flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE4E8] bg-white text-xs font-bold text-[#15344F] transition-colors hover:border-[#21649A] hover:bg-[#21649A] hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white ${FOCUS}`;
  return (
    <div className="flex flex-wrap gap-2">
      {shareTargets(url, title).map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={round} aria-label={`Share on ${link.label}`} title={`Share on ${link.label}`}>
          {link.short}
        </a>
      ))}
      <button type="button" onClick={copy} className={round} aria-label={copied ? "Link copied" : "Copy link"} title={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}

/** Labelled share buttons shown under the article (all screen sizes). */
function ShareLinks({ url, title }) {
  const [copied, copy] = useCopy(url);
  const pill = `inline-flex items-center gap-1.5 rounded-full border border-[#DCE4E8] px-3.5 py-1.5 text-xs font-semibold text-[#15344F] transition-colors hover:border-[#21649A] hover:text-[#21649A] dark:border-white/15 dark:text-slate-200 ${FOCUS}`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#15344F] dark:text-white">
        <Share2 className="h-4 w-4 text-[#54B848]" aria-hidden="true" />
        Share this article
      </span>
      {shareTargets(url, title).map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={pill}>
          {link.label}
        </a>
      ))}
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}

function SideArrow({ entry, direction }) {
  if (!entry) return null;
  const older = direction === "older";
  const Icon = older ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={blogPath(entry.slug)}
      className={`group fixed top-1/2 z-30 hidden -translate-y-1/2 items-center 2xl:flex ${older ? "left-4" : "right-4 flex-row-reverse"} ${FOCUS}`}
      aria-label={`${older ? "Previous" : "Next"} post: ${entry.title}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE4E8] bg-white text-[#15344F] shadow-md transition-colors group-hover:border-[#21649A] group-hover:bg-[#21649A] group-hover:text-white dark:border-white/15 dark:bg-[#102A40] dark:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span
        className={`pointer-events-none mx-2 max-w-[14rem] rounded-lg bg-[#102A40] px-3 py-2 text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${
          older ? "" : "text-right"
        }`}
      >
        {entry.title}
      </span>
    </Link>
  );
}

function hasImage(html, src) {
  return Boolean(src) && String(html).includes(src);
}

/**
 * Builds the sidebar contents from the article's h2 headings and tracks reading progress and the
 * section currently being read.
 */
function useArticleOutline(contentRef, articleRef, contentKey) {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return undefined;
    // Wide tables scroll sideways on small screens; make them reachable by keyboard.
    root.querySelectorAll("table").forEach((table, index) => {
      if (table.scrollWidth > table.clientWidth + 1 && window.getComputedStyle(table).overflowX !== "visible") {
        table.tabIndex = 0;
        if (!table.getAttribute("aria-label")) table.setAttribute("aria-label", `Table ${index + 1}, scroll sideways`);
      }
    });
    const used = new Set();
    const list = [...root.querySelectorAll("h2")]
      .map((el, index) => {
        if (!el.id) el.id = `section-${index + 1}`;
        if (used.has(el.id)) return null;
        used.add(el.id);
        const text = el.textContent.replace(/\s+/g, " ").trim().replace(/^\d+[.)]\s*/, "");
        return text ? { id: el.id, text } : null;
      })
      .filter(Boolean);
    setHeadings(list);

    let frame = 0;
    const update = () => {
      frame = 0;
      const article = articleRef.current;
      if (article) {
        const rect = article.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(100, Math.max(0, Math.round((-rect.top / total) * 100))) : rect.top < 0 ? 100 : 0);
      }
      let current = list[0]?.id || "";
      for (const item of list) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 160) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [contentRef, articleRef, contentKey]);

  return { headings, active, progress };
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, error, loading, reload } = useBlogRequest(`post:${slug}`, () => fetchBlogPost(slug));
  const contentRef = useRef(null);
  const articleRef = useRef(null);

  const post = data?.post;
  const url = `${SITE}${blogPath(slug)}`;
  const { headings, active, progress } = useArticleOutline(contentRef, articleRef, post?.slug);

  const jsonLd = useMemo(
    () =>
      post
        ? [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.seo?.description || post.excerpt,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt || post.publishedAt,
              author: { "@type": post.author && post.author !== company.name ? "Person" : "Organization", name: post.author || company.name },
              publisher: { "@type": "Organization", name: company.name, url: company.url },
              mainEntityOfPage: url,
              ...(post.coverImage ? { image: `${SITE}${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}` } : {}),
              keywords: post.tags.join(", "),
              articleSection: post.categories.join(", "),
            },
          ]
        : undefined,
    [post, url]
  );

  if (data?.redirect) return <Navigate to={blogPath(data.redirect)} replace />;

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    return true;
  };

  const onContentClick = (event) => {
    const link = event.target.closest("a");
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || link.target === "_blank") return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#")) {
      if (scrollToId(decodeURIComponent(href.slice(1)))) event.preventDefault();
    } else if (href.startsWith("/") && !href.startsWith("//") && !/\.(pdf|jpe?g|png|gif|webp|zip)$/i.test(href)) {
      event.preventDefault();
      navigate(href);
    }
  };

  const showCover = post && post.coverImage && !hasImage(post.content, post.coverImage);
  const author = post?.author || company.name;

  return (
    <>
      <Seo
        title={post ? post.seo?.title || `${post.title} | Neuron Wealth Advisors` : "Blog | Neuron Wealth Advisors"}
        description={post ? post.seo?.description || post.excerpt : "Articles from Neuron Wealth Advisors."}
        image={post?.coverImage ? `${SITE}${post.coverImage}` : undefined}
        imageAlt={post?.coverAlt || undefined}
        jsonLd={jsonLd}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] focus:outline-none dark:bg-[#0d2438]">
        {loading && !data ? <PostSkeleton /> : null}
        {error ? <NotFound reload={reload} failed={error.status !== 404} /> : null}

        {post ? (
          <>
            <SideArrow entry={data.older} direction="older" />
            <SideArrow entry={data.newer} direction="newer" />

            <header className="relative isolate overflow-hidden bg-[#0B1E30] text-white">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 85% 0%, rgba(84,184,72,0.18), transparent 60%), radial-gradient(ellipse 50% 70% at 0% 100%, rgba(33,100,154,0.35), transparent 65%)",
                }}
              />
              <div className={`site-frame px-4 pt-8 sm:px-6 ${showCover ? "pb-28 sm:pb-36" : "pb-14 sm:pb-16"}`}>
                <nav aria-label="Breadcrumb" className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-white/60">
                  <Link to="/" className={`hover:text-white ${FOCUS}`}>
                    Home
                  </Link>
                  <span aria-hidden="true" className="px-2">/</span>
                  <Link to="/insights" className={`hover:text-white ${FOCUS}`}>
                    Knowledge Hub
                  </Link>
                  <span aria-hidden="true" className="px-2">/</span>
                  <Link to="/blog" className={`hover:text-white ${FOCUS}`}>
                    Blogs
                  </Link>
                </nav>

                <div className="mt-10 max-w-4xl sm:mt-12">
                  {post.categories.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {post.categories.map((name) => (
                        <li key={name}>
                          <Link
                            to={`/blog?category=${encodeURIComponent(name)}`}
                            className={`inline-block rounded-full border border-[#54B848]/40 bg-[#54B848]/10 px-3 py-1 text-xs font-semibold text-[#8FCB86] transition-colors hover:bg-[#54B848] hover:text-[#0B1E30] ${FOCUS}`}
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <h1 className="mt-5 font-display text-[2.1rem] font-medium leading-[1.12] tracking-tight text-white sm:text-[2.8rem] lg:text-[3.35rem]">{post.title}</h1>
                  {post.excerpt ? <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:text-[1.0625rem]">{post.excerpt}</p> : null}

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/75">
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#54B848] font-bold text-[#0B1E30]" aria-hidden="true">
                        {initials(author)}
                      </span>
                      <span>
                        <span className="block font-semibold text-white">{author}</span>
                        <span className="block text-xs text-white/55">Author</span>
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-[#8FCB86]" aria-hidden="true" />
                      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4 text-[#8FCB86]" aria-hidden="true" />
                      {post.readingMinutes} min read
                    </span>
                    {post.commentCount ? (
                      <a href="#comments" className={`inline-flex items-center gap-1.5 hover:text-white ${FOCUS}`}>
                        <MessageCircle className="h-4 w-4 text-[#8FCB86]" aria-hidden="true" />
                        {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </header>

            {showCover ? (
              <div className="site-frame relative z-10 -mt-20 px-4 sm:-mt-28 sm:px-6">
                <figure className="overflow-hidden rounded-3xl border border-[#DCE4E8] bg-white shadow-[0_30px_70px_-40px_rgba(7,19,33,0.6)] dark:border-white/10">
                  <img src={post.coverImage} alt={post.coverAlt || ""} className="max-h-[32rem] w-full object-cover" />
                </figure>
              </div>
            ) : null}

            <div className="site-frame px-4 py-12 sm:px-6 sm:py-16">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <aside className="hidden lg:col-span-3 lg:block" aria-label="Article tools">
                  <div className="sticky top-[calc(var(--header-height,5rem)+1.5rem)] space-y-6">
                    {headings.length ? (
                      <nav aria-labelledby="toc-title" className="rounded-2xl border border-[#DCE4E8] bg-[#F7F8F5] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                        <p id="toc-title" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#15344F] dark:text-white">
                          <ListOrdered className="h-4 w-4 text-[#54B848]" aria-hidden="true" />
                          On this page
                        </p>
                        <ol className="mt-4 max-h-[50vh] space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
                          {headings.map((item, index) => {
                            const current = item.id === active;
                            return (
                              <li key={item.id}>
                                <a
                                  href={`#${item.id}`}
                                  onClick={(event) => {
                                    if (scrollToId(item.id)) event.preventDefault();
                                  }}
                                  aria-current={current ? "location" : undefined}
                                  className={`flex gap-2.5 rounded-lg border-l-2 py-1.5 pl-3 pr-2 text-[0.8125rem] leading-snug transition-colors ${FOCUS} ${
                                    current
                                      ? "border-[#54B848] bg-white font-semibold text-[#15344F] dark:bg-white/10 dark:text-white"
                                      : "border-transparent text-[#5E6D7B] hover:text-[#15344F] dark:text-slate-300 dark:hover:text-white"
                                  }`}
                                >
                                  <span className={`font-mono text-[0.6875rem] font-bold ${current ? "text-[#54B848]" : "text-[#5E6D7B]/70 dark:text-slate-400"}`}>{String(index + 1).padStart(2, "0")}</span>
                                  {item.text}
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                        <div className="mt-4 border-t border-[#DCE4E8] pt-4 dark:border-white/10">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#5E6D7B] dark:text-slate-300">
                            <span className="inline-flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                              Reading progress
                            </span>
                            <span>{progress}%</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#DCE4E8] dark:bg-white/10">
                            <div className="h-full rounded-full bg-[#54B848] transition-[width] duration-150" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </nav>
                    ) : null}
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#15344F] dark:text-white">Share</p>
                      <ShareIcons url={url} title={post.title} />
                    </div>
                  </div>
                </aside>

                <article ref={articleRef} className="min-w-0 lg:col-span-9">
                  <div className="max-w-[48rem]">
                    {/* Content is sanitized by the API before it is stored. The sidebar replaces the
                        in-article contents box on large screens. */}
                    <div ref={contentRef} className="blog-prose lg:[&_.toc]:hidden" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: post.content }} />

                    {post.tags.length ? (
                      <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-[#DCE4E8] pt-6 dark:border-white/10">
                        <Tag className="h-4 w-4 text-[#54B848]" aria-hidden="true" />
                        <span className="mr-1 text-sm font-semibold text-[#15344F] dark:text-white">Tags</span>
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            to={`/blog?q=${encodeURIComponent(tag)}`}
                            className={`rounded-full bg-[#EAF1F7] px-3 py-1 text-xs font-semibold text-[#21649A] hover:bg-[#21649A] hover:text-white dark:bg-white/10 dark:text-[#7fb6e3] ${FOCUS}`}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    ) : null}

                    <div className={post.tags.length ? "mt-5" : "mt-12 border-t border-[#DCE4E8] pt-6 dark:border-white/10"}>
                      <ShareLinks url={url} title={post.title} />
                    </div>

                    {data.older || data.newer ? (
                      <nav aria-label="More posts" className="mt-10 grid gap-4 sm:grid-cols-2">
                        {data.older ? (
                          <Link to={blogPath(data.older.slug)} className={`group rounded-2xl border border-[#DCE4E8] p-5 transition-all hover:-translate-y-0.5 hover:border-[#21649A] hover:shadow-md dark:border-white/10 ${FOCUS}`}>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#54B848]">
                              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                              Previous Post
                            </span>
                            <span className="mt-2 line-clamp-2 block font-display text-[1.1rem] font-medium leading-snug text-[#15344F] dark:text-white">{data.older.title}</span>
                          </Link>
                        ) : (
                          <span className="hidden sm:block" />
                        )}
                        {data.newer ? (
                          <Link to={blogPath(data.newer.slug)} className={`group rounded-2xl border border-[#DCE4E8] p-5 text-right transition-all hover:-translate-y-0.5 hover:border-[#21649A] hover:shadow-md dark:border-white/10 ${FOCUS}`}>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#54B848]">
                              Next Post
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </span>
                            <span className="mt-2 line-clamp-2 block font-display text-[1.1rem] font-medium leading-snug text-[#15344F] dark:text-white">{data.newer.title}</span>
                          </Link>
                        ) : null}
                      </nav>
                    ) : null}
                  </div>
                </article>
              </div>
            </div>

            {data.related.length ? (
              <section aria-labelledby="related-title" className="border-y border-[#DCE4E8] bg-[#F7F8F5] py-12 dark:border-white/10 dark:bg-[#102A40]/60 sm:py-14">
                <div className="site-frame px-4 sm:px-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#54B848]">Keep reading</p>
                      <h2 id="related-title" className="mt-2 font-display text-[1.9rem] font-medium leading-none text-[#15344F] dark:text-white">
                        Related Stories
                      </h2>
                    </div>
                    <Link to="/blog" className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#21649A] hover:text-[#15344F] dark:text-[#7fb6e3] ${FOCUS}`}>
                      All Blogs
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {data.related.map((entry) => (
                      <BlogCard key={entry.slug} post={entry} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            <div className="site-frame px-4 py-12 sm:px-6 sm:py-14">
              <div className="mx-auto max-w-[50rem]">
                <BlogComments slug={post.slug} count={post.commentCount} commentsEnabled={post.commentsEnabled} />
              </div>
            </div>
          </>
        ) : null}
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}
