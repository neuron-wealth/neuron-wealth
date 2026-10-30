import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogList, useBlogRequest } from "../../../pages/Blog/blogApi";
import { BlogCard as LiveBlogCard } from "../../../pages/Blog/blogShared";
import { CmsLink, FOCUS, imageStyle, safeHref, visibleItems } from "../primitives";

export const INSIGHTS_TAB_KEYS = ["all", "media", "books", "blogs", "video", "connect"];

export function activeInsightsTab(slug) {
  if (!slug) return "all";
  if (slug === "tv-media" || slug === "youtube") return "video";
  return slug;
}

function CoverCard({ item }) {
  const src = safeHref(item.image?.url);
  const href = safeHref(item.link?.href);
  const body = (
    <>
      <span className="flex aspect-[3/4] items-center justify-center bg-slate-50 p-2.5 sm:p-3 dark:bg-[#0c1828]">
        {src ? (
          <img
            src={src}
            alt={item.image.alt || ""}
            style={imageStyle(item.image, { sizing: false })}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </span>
      {item.title ? (
        <span className="block px-3.5 py-3">
          <span className="block font-display text-sm font-medium leading-snug text-[#15344F] line-clamp-2 dark:text-white sm:text-[0.9375rem]">
            {item.title}
          </span>
        </span>
      ) : null}
    </>
  );
  const className = "group flex h-full flex-col overflow-hidden rounded-xl border border-[#DCE4E8] bg-white transition-all duration-300 hover:border-[#21649A] hover:shadow-md dark:border-white/10 dark:bg-[#102A40]";
  if (!href) return <article className={className}>{body}</article>;
  const tabProps = item.link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...tabProps} className={className}>
      {body}
    </a>
  );
}

function CoverGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <CoverCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LatestBlogs({ content: c }) {
  const { data, error, loading, reload } = useBlogRequest("list", fetchBlogList);
  if (error) {
    return (
      <p className="text-sm text-[#5E6D7B] dark:text-slate-300">
        {c.errorText}
        {c.errorText && c.retryLabel ? " " : null}
        {c.retryLabel ? (
          <button type="button" onClick={reload} className={`font-semibold text-[#21649A] underline ${FOCUS}`}>
            {c.retryLabel}
          </button>
        ) : null}
      </p>
    );
  }
  if (loading && !data) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((key) => (
          <div key={key} className="h-72 animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
        ))}
      </div>
    );
  }
  const posts = data?.posts || [];
  const viewAllLabel = (c.link?.label || "").split("{count}").join(String(posts.length));
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <LiveBlogCard key={post.slug} post={post} />
        ))}
      </div>
      {viewAllLabel && safeHref(c.link?.href) ? (
        <div className="mt-6 text-center">
          <CmsLink
            link={c.link}
            className={`inline-flex items-center gap-1.5 rounded-full border border-[#21649A] px-5 py-2.5 text-sm font-semibold text-[#21649A] transition-colors hover:bg-[#21649A] hover:text-white dark:text-[#7fb6e3] ${FOCUS}`}
          >
            {viewAllLabel}
          </CmsLink>
        </div>
      ) : null}
    </>
  );
}

let youtubeWarmed = false;

function warmYouTube() {
  if (youtubeWarmed || typeof document === "undefined") return;
  youtubeWarmed = true;
  ["https://www.youtube-nocookie.com", "https://www.google.com", "https://i.ytimg.com"].forEach((href) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
  });
}

// Each YouTube iframe pulls ~1 MB of player script, so the player is only created on click.
function VideoPlayer({ video }) {
  const videoId = video.youtubeId;
  const [playing, setPlaying] = useState(
    () => typeof window !== "undefined" && window.location.hash === `#${videoId}`
  );
  return (
    <article id={videoId} className="scroll-mt-28">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#102A40] shadow-xs">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            onPointerEnter={warmYouTube}
            onFocus={warmYouTube}
            aria-label={`Play video: ${video.title}`}
            className={`group absolute inset-0 h-full w-full cursor-pointer ${FOCUS}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[#071321]/25 transition-colors duration-300 group-hover:bg-[#071321]/10" />
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5">
                  <polygon points="8,5 19,12 8,19" fill="currentColor" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {video.title ? (
        <h3 className="mt-2.5 font-display text-sm font-medium leading-snug text-[#15344F] line-clamp-2 dark:text-white sm:text-base">{video.title}</h3>
      ) : null}
    </article>
  );
}

function VideoThumb({ video }) {
  const videoId = video.youtubeId;
  return (
    <Link to={`/insights/video#${videoId}`} className="group block">
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-[#102A40] shadow-xs">
        <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-md transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" aria-hidden="true">
              <polygon points="8,5 19,12 8,19" fill="currentColor" />
            </svg>
          </span>
        </span>
      </span>
      {video.title ? (
        <span className="mt-2.5 block font-display text-sm font-medium leading-snug text-[#15344F] line-clamp-2 group-hover:text-[#21649A] dark:text-white sm:text-base">{video.title}</span>
      ) : null}
    </Link>
  );
}

function VideoGrid({ videos, embed }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (embed ? <VideoPlayer key={video.id} video={video} /> : <VideoThumb key={video.id} video={video} />))}
    </div>
  );
}

// One page section per block. Each block reads the current tab from the URL and only shows on
// the All tab and on its own tab; the Video tab plays videos inline instead of linking to it.
function useInsightsTab() {
  const { slug } = useParams();
  return { slug, tab: activeInsightsTab(slug) };
}

function Block({ root, title, children }) {
  return (
    <section {...root} className="site-frame scroll-mt-28 px-4 py-5 sm:px-6 sm:py-7">
      {title ? <h2 className="mb-5 font-display text-[1.75rem] font-medium leading-none tracking-tight text-[#15344F] dark:text-white sm:text-[2.1rem]">{title}</h2> : null}
      {children}
    </section>
  );
}

const youtubeItems = (list) => visibleItems(list).filter((video) => typeof video.youtubeId === "string" && video.youtubeId.trim());

export function InsightsBanner({ content: c, root }) {
  const { tab } = useInsightsTab();
  const tabs = visibleItems(c.tabs);
  const crumb = (Array.isArray(c.tabs) ? c.tabs : []).find((item) => item && item.key === tab);

  const heroSrc = safeHref(c.heroImage?.url);
  const linkClass = `hover:text-white ${FOCUS}`;
  const crumbs = [
    c.homeLink?.label ? (
      <CmsLink link={c.homeLink} className={linkClass}>
        {c.homeLink.label}
      </CmsLink>
    ) : null,
    c.insightsLink?.label ? (
      tab === "all" ? (
        c.insightsLink.label
      ) : (
        <CmsLink link={c.insightsLink} className={linkClass}>
          {c.insightsLink.label}
        </CmsLink>
      )
    ) : null,
    tab !== "all" ? crumb?.label : null,
  ].filter(Boolean);

  return (
    <div {...root} className="mb-5 sm:mb-7">
      <section className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[38svh] md:min-h-[48svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]">
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={c.heroImage.alt || ""}
            style={imageStyle(c.heroImage, { sizing: false })}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,42,64,0.62) 0%, rgba(16,42,64,0.55) 55%, rgba(16,42,64,0.72) 100%)" }} />
        <div className="site-frame relative flex min-h-[calc(38svh-var(--header-clearance,4.875rem))] md:min-h-[calc(48svh-var(--header-clearance,4.875rem))] flex-col px-4 sm:px-6">
          {crumbs.length ? (
            <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
              {crumbs.map((part, index) => (
                <Fragment key={index}>
                  {index ? <span aria-hidden="true" className="px-2">/</span> : null}
                  {part}
                </Fragment>
              ))}
            </p>
          ) : null}
          <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
            {c.heading ? (
              <h1 className="font-display text-[2.6rem] font-medium leading-none tracking-tight text-white sm:text-[3.6rem] lg:text-[4.4rem]">
                <span className="italic text-[#F3E6D4]">{c.heading}</span>
              </h1>
            ) : null}
            {c.intro ? (
              <p className="mt-5 max-w-full text-sm leading-snug text-white/90 lg:whitespace-nowrap lg:text-[0.9375rem]">{c.intro}</p>
            ) : null}
          </div>
        </div>
      </section>

      {tabs.length ? (
        <nav aria-label="Knowledge Hub sections" className="border-b border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#0d2438]">
          <div className="site-frame flex gap-1 overflow-x-auto px-4 sm:px-6">
            {tabs.map((item) => {
              const current = item.key === tab;
              return (
                <CmsLink
                  key={item.id}
                  link={item.link}
                  aria-current={current ? "page" : undefined}
                  className={`shrink-0 border-b-2 px-3 py-4 text-[0.9375rem] font-medium ${FOCUS} ${
                    current ? "border-[#21649A] text-[#15344F] dark:text-white" : "border-transparent text-[#5E6D7B] hover:text-[#15344F] dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </CmsLink>
              );
            })}
          </div>
        </nav>
      ) : null}
    </div>
  );
}

function makeCoverSection(tabKey) {
  return function CoverSection({ content: c, root }) {
    const { tab } = useInsightsTab();
    const items = visibleItems(c.items);
    if ((tab !== "all" && tab !== tabKey) || !items.length) return null;
    return (
      <Block root={root} title={c.title}>
        <CoverGrid items={items} />
      </Block>
    );
  };
}

export const InsightsMedia = makeCoverSection("media");
export const InsightsBooks = makeCoverSection("books");
export const InsightsConnect = makeCoverSection("connect");

export function InsightsBlogs({ content: c, root }) {
  const { tab } = useInsightsTab();
  if (tab !== "all" && tab !== "blogs") return null;
  return (
    <Block root={root} title={c.title}>
      <LatestBlogs content={c} />
    </Block>
  );
}

function makeVideoSection(ownSlug) {
  return function VideoSection({ content: c, root }) {
    const { slug, tab } = useInsightsTab();
    const videos = youtubeItems(c.videos);
    if ((tab !== "all" && slug !== "video" && slug !== ownSlug) || !videos.length) return null;
    const embed = slug === "video" || slug === "tv-media" || slug === "youtube";
    return (
      <Block root={root} title={c.title}>
        <VideoGrid videos={videos} embed={embed} />
      </Block>
    );
  };
}

export const InsightsTv = makeVideoSection("tv-media");
export const InsightsYoutube = makeVideoSection("youtube");
