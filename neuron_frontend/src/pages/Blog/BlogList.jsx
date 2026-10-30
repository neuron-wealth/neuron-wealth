import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Search, X } from "lucide-react";
import Seo from "../../components/common/Seo";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { fetchBlogList, formatBlogDate, useBlogRequest } from "./blogApi";
import { BlogCover, FOCUS, InsightsTabs, blogPath } from "./blogShared";

const PER_PAGE = 10;

function ListSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <p className="sr-only">Loading blog posts</p>
      {[0, 1, 2, 3].map((key) => (
        <div key={key} className="flex animate-pulse gap-5 rounded-xl border border-[#DCE4E8] p-5 dark:border-white/10">
          <div className="hidden h-32 w-48 shrink-0 rounded-lg bg-slate-100 dark:bg-white/5 sm:block" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-32 rounded bg-slate-100 dark:bg-white/5" />
            <div className="h-5 w-4/5 rounded bg-slate-100 dark:bg-white/5" />
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-white/5" />
            <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PostRow({ post }) {
  return (
    <article className="group relative flex flex-col gap-5 rounded-xl border border-[#DCE4E8] bg-white p-4 transition-all duration-300 hover:border-[#21649A] hover:shadow-md dark:border-white/10 dark:bg-[#102A40] sm:flex-row sm:p-5">
      <Link to={blogPath(post.slug)} tabIndex={-1} aria-hidden="true" className="block aspect-[16/9] shrink-0 overflow-hidden rounded-lg bg-[#102A40] sm:aspect-auto sm:h-36 sm:w-52">
        <BlogCover post={post} imgClassName="transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#21649A] dark:text-[#7fb6e3]">{post.categories.join(", ") || "Blog"}</p>
        <h2 className="mt-2 font-display text-[1.2rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.35rem]">
          <Link to={blogPath(post.slug)} className={`font-display hover:text-[#21649A] dark:hover:text-[#7fb6e3] ${FOCUS}`}>
            {post.title}
          </Link>
        </h2>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-[#5E6D7B] dark:text-slate-400">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          {post.commentCount ? (
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
            </span>
          ) : null}
        </p>
        {post.excerpt ? <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#4B6172] dark:text-slate-300">{post.excerpt}</p> : null}
        <Link
          to={blogPath(post.slug)}
          className={`mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#21649A] hover:text-[#15344F] dark:text-[#7fb6e3] dark:hover:text-white ${FOCUS}`}
          aria-label={`Read more: ${post.title}`}
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function pageNumbers(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const list = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const result = [];
  list.forEach((n, index) => {
    if (index && n - list[index - 1] > 1) result.push("…");
    result.push(n);
  });
  return result;
}

export default function BlogList() {
  const [params, setParams] = useSearchParams();
  const { data, error, loading, reload } = useBlogRequest("list", fetchBlogList);
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const requestedPage = Number(params.get("page")) || 1;

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!("page" in changes)) next.delete("page");
    setParams(next);
    if ("page" in changes) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const posts = data?.posts || [];
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (!category || post.categories.includes(category)) &&
        (!term || [post.title, post.excerpt, ...post.categories, ...post.tags].some((value) => String(value || "").toLowerCase().includes(term)))
    );
  }, [posts, q, category]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(Math.max(1, requestedPage), pages);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Seo
        title={category ? `${category} | Blogs | Neuron Wealth Advisors` : "Blogs | Neuron Wealth Advisors"}
        description="Articles from Neuron Wealth Advisors on NRI investments, taxation, wealth management and important regulatory updates."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] focus:outline-none dark:bg-[#0d2438]">
        <section className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[44svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]">
          <img src="/images/insights/books.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,42,64,0.66) 0%, rgba(16,42,64,0.6) 55%, rgba(16,42,64,0.78) 100%)" }} />
          <div className="site-frame relative flex min-h-[calc(44svh-var(--header-clearance,4.875rem))] flex-col px-4 sm:px-6">
            <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
              <Link to="/" className={`hover:text-white ${FOCUS}`}>
                Home
              </Link>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              <Link to="/insights" className={`hover:text-white ${FOCUS}`}>
                Knowledge Hub
              </Link>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              Blogs
            </p>
            <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
              <h1 className="font-display text-[2.6rem] font-medium leading-none tracking-tight text-white sm:text-[3.6rem] lg:text-[4.4rem]">
                <span className="italic text-[#F3E6D4]">Blogs</span>
              </h1>
              <p className="mt-5 text-sm leading-snug text-white/90 lg:text-[0.9375rem]">News and inspiration</p>
            </div>
          </div>
        </section>

        <InsightsTabs active="blogs" />

        <div className="site-frame grid gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0">
            {category || q ? (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-[#5E6D7B] dark:text-slate-300">
                  {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                  {category ? (
                    <>
                      {" "}
                      in <strong className="text-[#15344F] dark:text-white">{category}</strong>
                    </>
                  ) : null}
                  {q ? (
                    <>
                      {" "}
                      matching <strong className="text-[#15344F] dark:text-white">“{q}”</strong>
                    </>
                  ) : null}
                </span>
                <button
                  type="button"
                  onClick={() => update({ q: "", category: "" })}
                  className={`inline-flex items-center gap-1 rounded-full border border-[#DCE4E8] px-2.5 py-0.5 text-xs font-semibold text-[#21649A] hover:border-[#21649A] dark:border-white/15 dark:text-[#7fb6e3] ${FOCUS}`}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  Clear filters
                </button>
              </div>
            ) : null}

            {loading && !data ? <ListSkeleton /> : null}

            {error ? (
              <div className="rounded-xl border border-[#DCE4E8] p-8 text-center dark:border-white/10">
                <p className="font-display text-xl text-[#15344F] dark:text-white">The blog could not be loaded right now.</p>
                <button
                  type="button"
                  onClick={reload}
                  className={`mt-4 inline-flex items-center rounded-full bg-[#21649A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15344F] ${FOCUS}`}
                >
                  Try again
                </button>
              </div>
            ) : null}

            {data && !filtered.length ? (
              <div className="rounded-xl border border-dashed border-[#DCE4E8] p-10 text-center dark:border-white/15">
                <p className="font-display text-xl text-[#15344F] dark:text-white">No posts found</p>
                <p className="mt-1 text-sm text-[#5E6D7B] dark:text-slate-300">Try a different search or category.</p>
              </div>
            ) : null}

            <div className="space-y-5">
              {visible.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </div>

            {pages > 1 ? (
              <nav aria-label="Blog pages" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => update({ page: String(page - 1) })}
                  disabled={page <= 1}
                  className={`inline-flex h-10 items-center gap-1 rounded-full border border-[#DCE4E8] px-3.5 text-sm font-semibold text-[#15344F] hover:border-[#21649A] disabled:pointer-events-none disabled:opacity-40 dark:border-white/15 dark:text-white ${FOCUS}`}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                {pageNumbers(page, pages).map((entry, index) =>
                  entry === "…" ? (
                    <span key={`gap-${index}`} className="px-1 text-[#5E6D7B]">
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      onClick={() => update({ page: String(entry) })}
                      aria-current={entry === page ? "page" : undefined}
                      className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold ${FOCUS} ${
                        entry === page ? "bg-[#21649A] text-white" : "border border-[#DCE4E8] text-[#15344F] hover:border-[#21649A] dark:border-white/15 dark:text-white"
                      }`}
                    >
                      {entry}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => update({ page: String(page + 1) })}
                  disabled={page >= pages}
                  className={`inline-flex h-10 items-center gap-1 rounded-full border border-[#DCE4E8] px-3.5 text-sm font-semibold text-[#15344F] hover:border-[#21649A] disabled:pointer-events-none disabled:opacity-40 dark:border-white/15 dark:text-white ${FOCUS}`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            ) : null}
          </div>

          {/* On phones the sidebar dissolves into the grid so the search box can sit above the posts. */}
          <aside className="contents lg:sticky lg:top-28 lg:block lg:space-y-8 lg:self-start">
            <form
              role="search"
              className="order-first lg:order-none"
              onSubmit={(event) => {
                event.preventDefault();
                update({ q: new FormData(event.currentTarget).get("q")?.toString().trim() || "" });
              }}
            >
              <label htmlFor="blog-search" className="mb-2 block font-display text-lg font-medium text-[#15344F] dark:text-white">
                Search
              </label>
              <div className="relative">
                <input
                  key={q}
                  id="blog-search"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Search articles…"
                  className="h-11 w-full rounded-full border border-[#DCE4E8] bg-white pl-4 pr-11 text-sm text-[#15344F] outline-none focus:border-[#21649A] dark:border-white/15 dark:bg-[#102A40] dark:text-white"
                />
                <button type="submit" aria-label="Search" className={`absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#21649A] text-white hover:bg-[#15344F] ${FOCUS}`}>
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {data?.categories?.length ? (
              <section>
                <h2 className="mb-3 font-display text-lg font-medium text-[#15344F] dark:text-white">Categories</h2>
                <ul className="divide-y divide-[#DCE4E8] rounded-xl border border-[#DCE4E8] dark:divide-white/10 dark:border-white/10">
                  {data.categories.map((entry) => {
                    const active = entry.name === category;
                    return (
                      <li key={entry.name}>
                        <button
                          type="button"
                          onClick={() => update({ category: active ? "" : entry.name })}
                          aria-pressed={active}
                          className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${FOCUS} ${
                            active ? "bg-[#EAF1F7] font-semibold text-[#21649A] dark:bg-white/10 dark:text-white" : "text-[#15344F] hover:text-[#21649A] dark:text-slate-200 dark:hover:text-white"
                          }`}
                        >
                          {entry.name}
                          <span className="rounded-full bg-[#F7F8F5] px-2 text-xs text-[#5E6D7B] dark:bg-white/10 dark:text-slate-300">{entry.count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            {posts.length ? (
              <section>
                <h2 className="mb-3 font-display text-lg font-medium text-[#15344F] dark:text-white">Recent Posts</h2>
                <ul className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <li key={post.slug}>
                      <Link to={blogPath(post.slug)} className={`group block ${FOCUS}`}>
                        <span className="line-clamp-2 text-sm font-medium leading-snug text-[#15344F] group-hover:text-[#21649A] dark:text-slate-200 dark:group-hover:text-white">{post.title}</span>
                        <span className="mt-0.5 block text-xs text-[#5E6D7B] dark:text-slate-400">{formatBlogDate(post.publishedAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-xl bg-[#102A40] p-5 text-white">
              <h2 className="font-display text-lg font-medium">Have a question?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">Talk to our team about your investments, taxation or cross-border planning.</p>
              <Link to="/contact" className={`mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#54B848] px-4 py-2 text-sm font-semibold text-[#102A40] hover:bg-white ${FOCUS}`}>
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          </aside>
        </div>
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}
