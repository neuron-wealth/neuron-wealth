import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatBlogDate } from "./blogApi";

export const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

export const INSIGHT_TABS = [
  { key: "all", label: "All", href: "/insights" },
  { key: "media", label: "Media", href: "/insights/media" },
  { key: "books", label: "Books", href: "/insights/books" },
  { key: "blogs", label: "Blogs", href: "/blog" },
  { key: "video", label: "Video", href: "/insights/video" },
  { key: "connect", label: "Connect", href: "/insights/connect" },
];

export const blogPath = (slug) => `/blog/${slug}`;

/** Navy placeholder used when a post has no cover image. */
export function CoverFallback({ post, className = "" }) {
  return (
    <span className={`relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#102A40] p-4 ${className}`} aria-hidden="true">
      <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-[#21649A]/40" />
      <span className="absolute -bottom-12 right-10 h-28 w-28 rounded-full bg-[#54B848]/20" />
      <span className="relative text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#54B848]">{post.categories?.[0] || "Blog"}</span>
      <span className="relative mt-1.5 line-clamp-3 font-display text-base font-medium leading-snug text-white">{post.title}</span>
    </span>
  );
}

export function BlogCover({ post, className = "", imgClassName = "" }) {
  return post.coverImage ? (
    <img src={post.coverImage} alt={post.coverAlt || ""} loading="lazy" decoding="async" className={`h-full w-full object-cover ${imgClassName}`} />
  ) : (
    <CoverFallback post={post} className={className} />
  );
}

/** Compact card used for related stories and the Knowledge Hub page. */
export function BlogCard({ post }) {
  return (
    <Link
      to={blogPath(post.slug)}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-[#DCE4E8] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#21649A] hover:shadow-md dark:border-white/10 dark:bg-[#102A40] ${FOCUS}`}
    >
      <span className="block aspect-[16/9] overflow-hidden bg-[#102A40]">
        <BlogCover post={post} imgClassName="transition-transform duration-500 group-hover:scale-105" />
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#21649A] dark:text-[#7fb6e3]">{post.categories.slice(0, 2).join(", ") || "Blog"}</span>
        <span className="mt-2 line-clamp-3 font-display text-base font-medium leading-snug text-[#15344F] group-hover:text-[#21649A] dark:text-white sm:text-lg">{post.title}</span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.75rem] text-[#5E6D7B] dark:text-slate-400">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1 font-semibold text-[#21649A] dark:text-[#7fb6e3]">
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </span>
    </Link>
  );
}

export function InsightsTabs({ active = "blogs" }) {
  return (
    <nav aria-label="Knowledge Hub sections" className="border-b border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#0d2438]">
      <div className="site-frame flex gap-1 overflow-x-auto px-4 sm:px-6">
        {INSIGHT_TABS.map((item) => {
          const current = item.key === active;
          return (
            <Link
              key={item.key}
              to={item.href}
              aria-current={current ? "page" : undefined}
              className={`shrink-0 border-b-2 px-3 py-4 text-[0.9375rem] font-medium ${FOCUS} ${
                current ? "border-[#21649A] text-[#15344F] dark:text-white" : "border-transparent text-[#5E6D7B] hover:text-[#15344F] dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
