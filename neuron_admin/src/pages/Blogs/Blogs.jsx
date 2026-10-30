import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  DownloadCloud,
  Eye,
  EyeOff,
  FileText,
  MessageSquareText,
  Newspaper,
  Pencil,
  Plus,
  Search,
  SearchX,
  Send,
  Trash2,
} from "lucide-react";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import { TableSkeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { siteUrl } from "../../config/site";
import { deleteBlog, importOriginalBlogs, listBlogs, setBlogStatus } from "../../services/blogService";
import { timeAgo } from "../../utils/format";
import { BlogStatusPill, BlogThumb, blogDate, blogTime } from "./blogUi";

const PER_PAGE = 15;
const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
];
const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "updated", label: "Recently updated" },
  { id: "title", label: "Title A–Z" },
  { id: "comments", label: "Most comments" },
];

const countLabel = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;
const totalComments = (post) => post.comments.approved + post.comments.pending + post.comments.spam;

function StatCard({ icon: Icon, label, value, tone, to }) {
  const body = (
    <>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-2xl font-bold leading-none tracking-tight">{value}</span>
        <span className="muted mt-1 block text-xs font-semibold">{label}</span>
      </span>
    </>
  );
  const className = "panel flex items-center gap-3 rounded-2xl p-4";
  return to ? (
    <Link to={to} className={`${className} focus-ring transition-colors hover:border-accent`}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

export default function Blogs() {
  const { push } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      setData(await listBlogs());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const posts = data?.posts || [];
  const stats = data?.stats;
  const categories = useMemo(() => [...new Set(posts.flatMap((post) => post.categories))].sort((a, b) => a.localeCompare(b)), [posts]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = posts.filter((post) => {
      if (status === "published" && (post.status !== "published" || post.scheduled)) return false;
      if (status === "draft" && post.status !== "draft") return false;
      if (status === "scheduled" && !post.scheduled) return false;
      if (category && !post.categories.includes(category)) return false;
      if (!term) return true;
      return [post.title, post.slug, post.excerpt, post.author, ...post.categories, ...post.tags].some((value) => String(value || "").toLowerCase().includes(term));
    });
    const sorters = {
      newest: (a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)),
      oldest: (a, b) => String(a.publishedAt).localeCompare(String(b.publishedAt)),
      updated: (a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)),
      title: (a, b) => a.title.localeCompare(b.title),
      comments: (a, b) => b.comments.approved + b.comments.pending - (a.comments.approved + a.comments.pending),
    };
    return list.sort(sorters[sort]);
  }, [posts, query, status, category, sort]);

  useEffect(() => setPage(1), [query, status, category, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const missingOriginals = data ? Math.max(0, data.originals - posts.filter((post) => post.legacy).length) : 0;

  const run = async (key, action) => {
    setBusy(key);
    try {
      const result = await action();
      if (result?.message) push(result.message, "success");
      await load();
      return result;
    } catch (err) {
      push(err.message, "error");
      return null;
    } finally {
      setBusy("");
    }
  };

  const toggleStatus = (post) => run(`status-${post.id}`, () => setBlogStatus(post.id, post.status === "published" ? "draft" : "published"));

  const remove = async () => {
    const post = confirmDelete;
    const result = await run(`delete-${post.id}`, () => deleteBlog(post.id));
    if (result) setConfirmDelete(null);
  };

  const importOriginals = () => run("import", importOriginalBlogs);

  const tabCount = (id) => {
    if (!stats) return "";
    if (id === "all") return stats.total;
    if (id === "draft") return stats.draft;
    return stats[id];
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-deep text-white shadow-sm">
            <Newspaper className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">Blog Management</h1>
            <p className="muted mt-1 max-w-xl text-xs leading-relaxed sm:text-sm">
              Add, edit, publish, unpublish or delete blog posts. Published posts appear on the website at /blog.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {missingOriginals ? (
            <button type="button" onClick={importOriginals} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-10 px-4 text-xs font-semibold sm:text-sm">
              <DownloadCloud className={`h-4 w-4 ${busy === "import" ? "animate-pulse" : ""}`} aria-hidden="true" />
              Restore {missingOriginals} Original Post{missingOriginals === 1 ? "" : "s"}
            </button>
          ) : null}
          <Link to="/blogs/new" className="btn btn-primary focus-ring h-10 px-4 text-xs font-semibold sm:text-sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add New Blog
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Newspaper} label="Total posts" value={stats ? stats.total : "—"} tone="bg-[var(--accent-soft)] text-accent" />
        <StatCard icon={Send} label="Published" value={stats ? stats.published : "—"} tone="bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" />
        <StatCard icon={FileText} label="Drafts" value={stats ? stats.draft : "—"} tone="bg-amber-500/15 text-amber-600 dark:text-amber-300" />
        <StatCard icon={CalendarClock} label="Scheduled" value={stats ? stats.scheduled : "—"} tone="bg-sky-500/15 text-sky-600 dark:text-sky-300" />
        <StatCard
          icon={MessageSquareText}
          label="Comments awaiting review"
          value={stats ? stats.pendingComments : "—"}
          tone="bg-rose-500/15 text-rose-600 dark:text-rose-300"
          to="/blogs/comments?status=pending"
        />
      </div>

      {error ? (
        <Alert tone="error">
          {error}{" "}
          <button type="button" onClick={load} className="font-bold underline">
            Try again
          </button>
        </Alert>
      ) : null}

      <div className="panel overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-3 border-b border-line p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by status">
            {STATUS_TABS.map((tab) => {
              const active = status === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStatus(tab.id)}
                  className={`focus-ring inline-flex h-8 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors ${
                    active ? "bg-accent text-white shadow-xs" : "bg-subtle text-soft hover:bg-line/60 hover:text-ink"
                  }`}
                >
                  {tab.label}
                  <span className={`rounded-full px-1.5 text-[0.625rem] ${active ? "bg-white/20" : "bg-line/70"}`}>{tabCount(tab.id)}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative block sm:w-72">
              <span className="sr-only">Search blog posts</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, slug, tag…"
                className="field h-10 rounded-xl pl-10 pr-3 text-sm"
              />
            </label>
            <label className="sr-only" htmlFor="blog-category">
              Category
            </label>
            <select id="blog-category" value={category} onChange={(event) => setCategory(event.target.value)} className="field h-10 rounded-xl px-3 text-sm sm:w-52">
              <option value="">All categories</option>
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="blog-sort">
              Sort
            </label>
            <select id="blog-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="field h-10 rounded-xl px-3 text-sm sm:w-44">
              {SORTS.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!data && !error ? <TableSkeleton /> : null}

        {data && !filtered.length ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <SearchX className="h-8 w-8 text-soft" aria-hidden="true" />
            <p className="mt-3 font-bold">{posts.length ? "No blog posts match these filters" : "No blog posts yet"}</p>
            <p className="muted mt-1 text-sm">{posts.length ? "Try another search, status or category." : "Write your first post with Add New Blog."}</p>
          </div>
        ) : null}

        {visible.length ? (
          <>
            <table className="hidden w-full text-left text-sm lg:table">
              <thead className="bg-subtle/70 text-[0.6875rem] font-bold uppercase tracking-wide text-soft">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Post
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Categories
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Published
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Comments
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {visible.map((post) => (
                  <tr key={post.id} className="align-middle transition-colors hover:bg-subtle/50">
                    <td className="max-w-[26rem] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <BlogThumb src={post.coverImage} />
                        <div className="min-w-0">
                          <Link to={`/blogs/${post.id}`} className="focus-ring line-clamp-2 rounded font-bold leading-snug text-ink hover:text-accent">
                            {post.title}
                          </Link>
                          <p className="muted mt-0.5 truncate font-mono text-[0.6875rem]">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[14rem] px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 3).map((name) => (
                          <span key={name} className="rounded-md bg-subtle px-1.5 py-0.5 text-[0.6875rem] font-semibold text-soft">
                            {name}
                          </span>
                        ))}
                        {post.categories.length > 3 ? <span className="text-[0.6875rem] font-semibold text-soft">+{post.categories.length - 3}</span> : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <BlogStatusPill status={post.status} scheduled={post.scheduled} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <p className="font-semibold">{blogDate(post.publishedAt)}</p>
                      <p className="muted text-xs">
                        {blogTime(post.publishedAt)} · edited {timeAgo(post.updatedAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/blogs/comments?blogId=${post.id}`} className="focus-ring inline-flex items-center gap-1 rounded-md font-semibold hover:text-accent">
                        {post.comments.approved}
                        {post.comments.pending ? (
                          <span className="rounded-full bg-rose-500/15 px-1.5 text-[0.625rem] font-bold text-rose-600 dark:text-rose-300" title="Awaiting review">
                            +{post.comments.pending}
                          </span>
                        ) : null}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <RowActions post={post} busy={busy} onEdit={() => navigate(`/blogs/${post.id}`)} onToggle={() => toggleStatus(post)} onDelete={() => setConfirmDelete(post)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-[var(--line)] lg:hidden">
              {visible.map((post) => (
                <li key={post.id} className="p-4">
                  <div className="flex gap-3">
                    <BlogThumb src={post.coverImage} className="h-16 w-20" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/blogs/${post.id}`} className="focus-ring line-clamp-2 rounded font-bold leading-snug hover:text-accent">
                        {post.title}
                      </Link>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                        <BlogStatusPill status={post.status} scheduled={post.scheduled} />
                        <span className="muted">{blogDate(post.publishedAt)}</span>
                        <span className="muted">· {countLabel(post.comments.approved, "comment")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <RowActions post={post} busy={busy} onEdit={() => navigate(`/blogs/${post.id}`)} onToggle={() => toggleStatus(post)} onDelete={() => setConfirmDelete(post)} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm sm:flex-row">
              <p className="muted text-xs">
                Showing {(current - 1) * PER_PAGE + 1}–{Math.min(current * PER_PAGE, filtered.length)} of {filtered.length} posts
              </p>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setPage(current - 1)} disabled={current <= 1} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Previous page">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="px-2 text-xs font-semibold">
                  Page {current} of {pages}
                </span>
                <button type="button" onClick={() => setPage(current + 1)} disabled={current >= pages} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Next page">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <Dialog
        open={Boolean(confirmDelete)}
        title="Delete this blog post?"
        description="The post and all of its comments are removed from the website and the admin. This cannot be undone."
        onClose={() => setConfirmDelete(null)}
        footer={
          <>
            <button type="button" onClick={() => setConfirmDelete(null)} className="btn btn-secondary focus-ring h-10 px-4">
              Cancel
            </button>
            <button type="button" onClick={remove} disabled={Boolean(busy)} className="btn focus-ring h-10 bg-red-600 px-4 text-white hover:bg-red-700">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {busy.startsWith("delete") ? "Deleting…" : "Delete Post"}
            </button>
          </>
        }
      >
        {confirmDelete ? (
          <div className="flex items-center gap-3 rounded-xl border border-line p-3">
            <BlogThumb src={confirmDelete.coverImage} />
            <div className="min-w-0">
              <p className="line-clamp-2 font-bold">{confirmDelete.title}</p>
              <p className="muted mt-0.5 text-xs">
                {totalComments(confirmDelete) ? `${countLabel(totalComments(confirmDelete), "comment")} will also be deleted.` : "This post has no comments."}
                {confirmDelete.legacy ? " Original posts can be brought back later with Restore Original Posts." : ""}
              </p>
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}

function RowActions({ post, busy, onEdit, onToggle, onDelete }) {
  const published = post.status === "published";
  return (
    <div className="flex items-center justify-end gap-1">
      <button type="button" onClick={onEdit} className="icon-btn focus-ring h-9 w-9" title="Edit" aria-label={`Edit ${post.title}`}>
        <Pencil className="h-4 w-4" aria-hidden="true" />
      </button>
      {published && !post.scheduled ? (
        <a href={siteUrl(`/blog/${post.slug}`)} target="_blank" rel="noreferrer" className="icon-btn focus-ring h-9 w-9" title="View on website" aria-label={`View ${post.title} on the website`}>
          <Eye className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
      <button
        type="button"
        onClick={onToggle}
        disabled={Boolean(busy)}
        className="icon-btn focus-ring h-9 w-9 disabled:opacity-40"
        title={published ? "Unpublish (move to drafts)" : "Publish"}
        aria-label={published ? `Unpublish ${post.title}` : `Publish ${post.title}`}
      >
        {published ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={Boolean(busy)}
        className="icon-btn focus-ring h-9 w-9 text-red-600 hover:bg-red-500/10 disabled:opacity-40 dark:text-red-400"
        title="Delete"
        aria-label={`Delete ${post.title}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
