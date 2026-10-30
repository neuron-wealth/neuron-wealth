import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  ExternalLink,
  Inbox,
  Loader2,
  Mail,
  MessageSquareText,
  Pencil,
  Reply,
  Search,
  ShieldAlert,
  Trash2,
  Undo2,
} from "lucide-react";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { TableSkeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { siteUrl } from "../../config/site";
import { bulkComments, deleteComment, listBlogs, listComments, replyToComment, updateComment } from "../../services/blogService";
import { formatDateTime, initialOf, timeAgo } from "../../utils/format";

const TABS = [
  { id: "", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "spam", label: "Spam" },
];
const STATUS_TONE = {
  approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  spam: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};
const REPLY_NAME_KEY = "neuron_blog_reply_name";

function readReplyName(fallback) {
  try {
    return localStorage.getItem(REPLY_NAME_KEY) || fallback;
  } catch {
    return fallback;
  }
}

export default function BlogComments() {
  const { push } = useToast();
  const outlet = useOutletContext();
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "";
  const blogId = params.get("blogId") || "";
  const page = Number(params.get("page")) || 1;
  const q = params.get("q") || "";

  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [search, setSearch] = useState(q);
  const [selected, setSelected] = useState(() => new Set());
  const [replying, setReplying] = useState(null);
  const [editing, setEditing] = useState(null);

  const setParam = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!("page" in changes)) next.delete("page");
    setParams(next, { replace: true });
  };

  const load = useCallback(async () => {
    setError("");
    try {
      setData(await listComments({ status, blogId, page, q }));
      setSelected(new Set());
    } catch (err) {
      setError(err.message);
    }
  }, [status, blogId, page, q]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    listBlogs()
      .then((result) => setBlogs(result.posts))
      .catch(() => setBlogs([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() !== q) setParam({ q: search.trim() });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const comments = data?.comments || [];
  const counts = data?.counts;
  const blogTitle = useMemo(() => blogs.find((blog) => blog.id === blogId)?.title, [blogs, blogId]);

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

  const setStatusFor = (comment, next) => run(`status-${comment.id}`, () => updateComment(comment.id, { status: next }));

  const remove = (comment) => {
    if (!window.confirm(`Delete this comment by ${comment.authorName}? Replies to it are deleted too.`)) return;
    run(`delete-${comment.id}`, () => deleteComment(comment.id));
  };

  const bulk = (action) => {
    const ids = [...selected];
    if (!ids.length) return;
    if (action === "delete" && !window.confirm(`Delete ${ids.length} selected comment${ids.length === 1 ? "" : "s"} and their replies?`)) return;
    run(`bulk-${action}`, () => bulkComments(ids, action));
  };

  const toggle = (id) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allSelected = comments.length > 0 && comments.every((comment) => selected.has(comment.id));

  const sendReply = async () => {
    const { comment, authorName, content } = replying;
    try {
      localStorage.setItem(REPLY_NAME_KEY, authorName);
    } catch {
      // storage unavailable
    }
    const result = await run(`reply-${comment.id}`, () => replyToComment(comment.id, { authorName, content }));
    if (result) setReplying(null);
  };

  const saveEdit = async () => {
    const { comment, authorName, content } = editing;
    const result = await run(`edit-${comment.id}`, () => updateComment(comment.id, { authorName, content }));
    if (result) setEditing(null);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-deep text-white shadow-sm">
            <MessageSquareText className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">Blog Comments</h1>
            <p className="muted mt-1 max-w-xl text-xs leading-relaxed sm:text-sm">
              Comments sent from “Leave a Reply” wait here as Pending. Approve them to show them under the post, or reply as the author.
            </p>
          </div>
        </div>
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
            {TABS.map((tab) => {
              const active = status === tab.id;
              const count = counts ? counts[tab.id || "all"] : "";
              return (
                <button
                  key={tab.id || "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setParam({ status: tab.id })}
                  className={`focus-ring inline-flex h-8 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors ${
                    active ? "bg-accent text-white shadow-xs" : "bg-subtle text-soft hover:bg-line/60 hover:text-ink"
                  }`}
                >
                  {tab.label}
                  <span className={`rounded-full px-1.5 text-[0.625rem] ${active ? "bg-white/20" : tab.id === "pending" && count ? "bg-amber-500/25 text-amber-700 dark:text-amber-300" : "bg-line/70"}`}>
                    {count?.toLocaleString?.() ?? count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative block sm:w-64">
              <span className="sr-only">Search comments</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, text…" className="field h-10 rounded-xl pl-10 pr-3 text-sm" />
            </label>
            <label className="sr-only" htmlFor="comment-blog">
              Blog post
            </label>
            <select id="comment-blog" value={blogId} onChange={(event) => setParam({ blogId: event.target.value })} className="field h-10 max-w-full rounded-xl px-3 text-sm sm:w-72">
              <option value="">All blog posts</option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.title.length > 70 ? `${blog.title.slice(0, 70)}…` : blog.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {blogId && blogTitle ? (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-subtle/60 px-4 py-2 text-xs">
            <span>
              Showing comments on <strong>{blogTitle}</strong>
            </span>
            <span className="flex gap-3">
              <Link to={`/blogs/${blogId}`} className="font-bold text-accent hover:underline">
                Edit post
              </Link>
              <button type="button" onClick={() => setParam({ blogId: "" })} className="font-bold text-accent hover:underline">
                Show all posts
              </button>
            </span>
          </div>
        ) : null}

        {comments.length ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2.5">
            <label className="mr-2 flex items-center gap-2 text-xs font-semibold">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelected(allSelected ? new Set() : new Set(comments.map((comment) => comment.id)))}
                className="h-4 w-4 accent-accent"
              />
              {selected.size ? `${selected.size} selected` : "Select all on this page"}
            </label>
            {selected.size ? (
              <>
                <button type="button" onClick={() => bulk("approved")} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Approve
                </button>
                <button type="button" onClick={() => bulk("pending")} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                  <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Unapprove
                </button>
                <button type="button" onClick={() => bulk("spam")} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                  <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Spam
                </button>
                <button type="button" onClick={() => bulk("delete")} disabled={Boolean(busy)} className="btn focus-ring h-8 border border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-300">
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Delete
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        {!data && !error ? <TableSkeleton /> : null}

        {data && !comments.length ? (
          <EmptyState
            icon={Inbox}
            title={status === "pending" ? "No comments waiting for review" : "No comments found"}
            description={q ? "Try another search term." : "New comments from the website appear here."}
          />
        ) : null}

        <ul className="divide-y divide-[var(--line)]">
          {comments.map((comment) => {
            const isReplying = replying?.comment.id === comment.id;
            const isEditing = editing?.comment.id === comment.id;
            return (
              <li key={comment.id} className={`flex gap-3 p-4 ${comment.status === "pending" ? "bg-amber-500/[0.04]" : ""}`}>
                <input
                  type="checkbox"
                  checked={selected.has(comment.id)}
                  onChange={() => toggle(comment.id)}
                  className="mt-3 h-4 w-4 shrink-0 accent-accent"
                  aria-label={`Select comment by ${comment.authorName}`}
                />
                <span
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    comment.byAdmin ? "bg-accent text-white" : "bg-subtle text-soft"
                  }`}
                  aria-hidden="true"
                >
                  {initialOf(comment.authorName)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-bold">{comment.authorName}</p>
                    {comment.byAdmin ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[0.625rem] font-bold uppercase text-accent">
                        <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                        Author
                      </span>
                    ) : null}
                    <span className={`rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase ${STATUS_TONE[comment.status]}`}>{comment.status}</span>
                    <span className="muted text-xs" title={formatDateTime(comment.createdAt)}>
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  {comment.authorEmail || comment.authorWebsite ? (
                    <p className="muted mt-0.5 flex flex-wrap gap-x-3 text-xs">
                      {comment.authorEmail ? (
                        <a href={`mailto:${comment.authorEmail}`} className="inline-flex items-center gap-1 hover:text-accent">
                          <Mail className="h-3 w-3" aria-hidden="true" />
                          {comment.authorEmail}
                        </a>
                      ) : null}
                      {comment.authorWebsite ? (
                        <a href={comment.authorWebsite} target="_blank" rel="noreferrer nofollow" className="inline-flex items-center gap-1 hover:text-accent">
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          {comment.authorWebsite.replace(/^https?:\/\//, "")}
                        </a>
                      ) : null}
                    </p>
                  ) : null}
                  {comment.blog ? (
                    <p className="mt-1 text-xs">
                      <span className="text-soft">On </span>
                      <button type="button" onClick={() => setParam({ blogId: comment.blog.id })} className="inline text-left font-semibold text-accent hover:underline">
                        {comment.blog.title}
                      </button>
                    </p>
                  ) : null}
                  {comment.parent ? (
                    <p className="muted mt-1.5 flex gap-1.5 border-l-2 border-line pl-2 text-xs">
                      <CornerDownRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="line-clamp-2">
                        In reply to <strong>{comment.parent.authorName}</strong>: {comment.parent.content}
                      </span>
                    </p>
                  ) : null}

                  {isEditing ? (
                    <div className="mt-3 space-y-2">
                      <input
                        value={editing.authorName}
                        onChange={(event) => setEditing({ ...editing, authorName: event.target.value })}
                        className="field h-9 px-3 text-sm"
                        aria-label="Name"
                      />
                      <textarea
                        rows={4}
                        value={editing.content}
                        onChange={(event) => setEditing({ ...editing, content: event.target.value })}
                        className="field h-auto resize-y px-3 py-2 text-sm leading-relaxed"
                        aria-label="Comment text"
                      />
                      <div className="flex gap-2">
                        <button type="button" onClick={saveEdit} disabled={Boolean(busy)} className="btn btn-primary focus-ring h-9 px-4 text-xs">
                          {busy === `edit-${comment.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                          Save
                        </button>
                        <button type="button" onClick={() => setEditing(null)} className="btn btn-secondary focus-ring h-9 px-4 text-xs">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-ink">{comment.content}</p>
                  )}

                  {isReplying ? (
                    <div className="mt-3 space-y-2 rounded-xl border border-line bg-subtle/60 p-3">
                      <label className="field-label" htmlFor={`reply-name-${comment.id}`}>
                        Reply as
                      </label>
                      <input
                        id={`reply-name-${comment.id}`}
                        value={replying.authorName}
                        onChange={(event) => setReplying({ ...replying, authorName: event.target.value })}
                        className="field h-9 px-3 text-sm"
                      />
                      <textarea
                        rows={4}
                        autoFocus
                        value={replying.content}
                        onChange={(event) => setReplying({ ...replying, content: event.target.value })}
                        placeholder={`Reply to ${comment.authorName}…`}
                        className="field h-auto resize-y px-3 py-2 text-sm leading-relaxed"
                        aria-label="Reply text"
                      />
                      <p className="muted text-xs">The reply is published immediately{comment.status !== "approved" ? " and this comment is approved too" : ""}.</p>
                      <div className="flex gap-2">
                        <button type="button" onClick={sendReply} disabled={Boolean(busy) || !replying.content.trim()} className="btn btn-primary focus-ring h-9 px-4 text-xs">
                          {busy === `reply-${comment.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <Reply className="h-3.5 w-3.5" aria-hidden="true" />}
                          Publish Reply
                        </button>
                        <button type="button" onClick={() => setReplying(null)} className="btn btn-secondary focus-ring h-9 px-4 text-xs">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {!isEditing && !isReplying ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {comment.status !== "approved" ? (
                        <button type="button" onClick={() => setStatusFor(comment, "approved")} disabled={Boolean(busy)} className="btn focus-ring h-8 bg-emerald-600 px-3 text-xs text-white hover:bg-emerald-700">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Approve
                        </button>
                      ) : (
                        <button type="button" onClick={() => setStatusFor(comment, "pending")} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                          <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                          Unapprove
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setReplying({ comment, authorName: readReplyName(outlet?.admin?.name || ""), content: "" })}
                        className="btn btn-secondary focus-ring h-8 px-3 text-xs"
                      >
                        <Reply className="h-3.5 w-3.5" aria-hidden="true" />
                        Reply
                      </button>
                      <button type="button" onClick={() => setEditing({ comment, authorName: comment.authorName, content: comment.content })} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        Edit
                      </button>
                      {comment.status !== "spam" ? (
                        <button type="button" onClick={() => setStatusFor(comment, "spam")} disabled={Boolean(busy)} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                          <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                          Spam
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => remove(comment)}
                        disabled={Boolean(busy)}
                        className="btn focus-ring h-8 border border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Delete
                      </button>
                      {comment.blog?.status === "published" ? (
                        <a
                          href={siteUrl(`/blog/${comment.blog.slug}#comments`)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary focus-ring h-8 px-3 text-xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          View Post
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {data && data.pages > 1 ? (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm sm:flex-row">
            <p className="muted text-xs">
              {data.total.toLocaleString()} comments · page {data.page} of {data.pages}
            </p>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => setParam({ page: String(data.page - 1) })} disabled={data.page <= 1} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Previous page">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => setParam({ page: String(data.page + 1) })} disabled={data.page >= data.pages} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Next page">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
