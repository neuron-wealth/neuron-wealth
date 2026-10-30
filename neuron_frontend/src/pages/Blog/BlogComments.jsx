import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CornerDownRight, Loader2, MessageCircle, Reply } from "lucide-react";
import { fetchBlogComments, formatCommentDate, postBlogComment } from "./blogApi";
import { FOCUS } from "./blogShared";

const SAVED_KEY = "neuron-blog-commenter";

function readSaved() {
  try {
    return JSON.parse(window.localStorage.getItem(SAVED_KEY) || "null");
  } catch {
    return null;
  }
}

const initial = (name) => String(name || "?").trim().charAt(0).toUpperCase() || "?";

function Comment({ comment, depth, onReply, canReply }) {
  return (
    <li id={`comment-${comment.id}`} className="scroll-mt-32">
      <article className={`rounded-xl border p-4 sm:p-5 ${comment.byAdmin ? "border-[#21649A]/30 bg-[#EAF1F7]/60 dark:border-[#21649A]/50 dark:bg-[#21649A]/10" : "border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#102A40]"}`}>
        <header className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${comment.byAdmin ? "bg-[#21649A] text-white" : "bg-[#F7F8F5] text-[#15344F] dark:bg-white/10 dark:text-white"}`}
            aria-hidden="true"
          >
            {initial(comment.authorName)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-[#15344F] dark:text-white">
              <span className="break-words">{comment.authorName}</span>
              {comment.byAdmin ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#21649A] px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-white">
                  <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                  Author
                </span>
              ) : null}
            </p>
            <time dateTime={comment.createdAt} className="text-xs text-[#5E6D7B] dark:text-slate-400">
              {formatCommentDate(comment.createdAt)}
            </time>
          </div>
        </header>
        <p className="mt-3 whitespace-pre-line break-words text-[0.9375rem] leading-relaxed text-[#30475A] dark:text-slate-200">{comment.content}</p>
        {canReply ? (
          <button
            type="button"
            onClick={() => onReply(comment)}
            className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#21649A] hover:text-[#15344F] dark:text-[#7fb6e3] dark:hover:text-white ${FOCUS}`}
          >
            <Reply className="h-3.5 w-3.5" aria-hidden="true" />
            Reply
          </button>
        ) : null}
      </article>
      {comment.replies.length ? (
        <ol className={`mt-3 space-y-3 ${depth < 4 ? "border-l-2 border-[#DCE4E8] pl-3 dark:border-white/10 sm:pl-6" : ""}`}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} canReply={canReply} />
          ))}
        </ol>
      ) : null}
    </li>
  );
}

function LeaveReply({ slug, replyTo, onCancelReply }) {
  const saved = typeof window === "undefined" ? null : readSaved();
  const [form, setForm] = useState({ comment: "", name: saved?.name || "", email: saved?.email || "", website: saved?.website || "", company: "" });
  const [remember, setRemember] = useState(Boolean(saved));
  const [state, setState] = useState({ sending: false, error: "", done: "" });
  const textRef = useRef(null);

  useEffect(() => {
    if (replyTo) textRef.current?.focus();
  }, [replyTo]);

  const set = (key) => (event) => setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setState({ sending: true, error: "", done: "" });
    try {
      const result = await postBlogComment(slug, { ...form, parentId: replyTo?.id || "" });
      try {
        if (remember) window.localStorage.setItem(SAVED_KEY, JSON.stringify({ name: form.name, email: form.email, website: form.website }));
        else window.localStorage.removeItem(SAVED_KEY);
      } catch {
        // storage unavailable
      }
      setForm((previous) => ({ ...previous, comment: "" }));
      setState({ sending: false, error: "", done: result?.message || "Thank you. Your comment is awaiting moderation." });
      onCancelReply();
    } catch (error) {
      setState({ sending: false, error: error.message, done: "" });
    }
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-[#DCE4E8] bg-white px-3.5 py-2.5 text-[0.9375rem] text-[#15344F] outline-none transition-colors focus:border-[#21649A] focus:ring-2 focus:ring-[#21649A]/15 dark:border-white/15 dark:bg-[#0d2438] dark:text-white";
  const label = "text-sm font-semibold text-[#15344F] dark:text-white";

  return (
    <section id="respond" aria-labelledby="reply-title" className="scroll-mt-32 rounded-2xl border border-[#DCE4E8] bg-[#F7F8F5] p-5 dark:border-white/10 dark:bg-[#102A40] sm:p-8">
      <h3 id="reply-title" className="font-display text-[1.6rem] font-medium text-[#15344F] dark:text-white">
        {replyTo ? `Reply to ${replyTo.authorName}` : "Leave a Reply"}
      </h3>
      {replyTo ? (
        <button type="button" onClick={onCancelReply} className={`mt-1 text-sm font-semibold text-[#21649A] underline-offset-2 hover:underline dark:text-[#7fb6e3] ${FOCUS}`}>
          Cancel reply
        </button>
      ) : null}
      <p className="mt-2 text-sm text-[#5E6D7B] dark:text-slate-300">
        Your email address will not be published. Required fields are marked <span className="text-red-600">*</span>
      </p>

      {state.done ? (
        <p role="status" className="mt-4 rounded-lg border border-[#54B848]/40 bg-[#54B848]/10 px-4 py-3 text-sm font-semibold text-[#2f7a26] dark:text-[#8fdc7f]">
          {state.done}
        </p>
      ) : null}
      {state.error ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {state.error}
        </p>
      ) : null}

      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="comment-text" className={label}>
            Comment <span className="text-red-600">*</span>
          </label>
          <textarea id="comment-text" ref={textRef} required minLength={2} maxLength={3000} rows={7} value={form.comment} onChange={set("comment")} className={`${field} resize-y leading-relaxed`} />
        </div>
        <div>
          <label htmlFor="comment-name" className={label}>
            Name <span className="text-red-600">*</span>
          </label>
          <input id="comment-name" required maxLength={80} autoComplete="name" value={form.name} onChange={set("name")} className={field} />
        </div>
        <div>
          <label htmlFor="comment-email" className={label}>
            Email <span className="text-red-600">*</span>
          </label>
          <input id="comment-email" type="email" required maxLength={160} autoComplete="email" value={form.email} onChange={set("email")} className={field} />
        </div>
        <div>
          <label htmlFor="comment-website" className={label}>
            Website
          </label>
          <input id="comment-website" type="url" maxLength={200} autoComplete="url" placeholder="https://" value={form.website} onChange={set("website")} className={field} />
        </div>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="comment-company">Company</label>
          <input id="comment-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
        </div>
        <label className="flex items-start gap-2.5 text-sm text-[#4B6172] dark:text-slate-300 sm:col-span-3">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#21649A]" />
          Save my name, email, and website in this browser for the next time I comment.
        </label>
        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={state.sending}
            className={`inline-flex items-center gap-2 rounded-full bg-[#21649A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15344F] disabled:opacity-60 ${FOCUS}`}
          >
            {state.sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {state.sending ? "Posting…" : "Post Comment"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function BlogComments({ slug, count, commentsEnabled }) {
  const [state, setState] = useState({ comments: [], page: 0, pages: 1, total: count, loading: Boolean(count), error: "" });
  const [replyTo, setReplyTo] = useState(null);

  const load = async (page) => {
    setState((previous) => ({ ...previous, loading: true, error: "" }));
    try {
      const data = await fetchBlogComments(slug, page);
      setState((previous) => ({
        comments: page === 1 ? data.comments : [...previous.comments, ...data.comments],
        page: data.page,
        pages: data.pages,
        total: data.total,
        loading: false,
        error: "",
      }));
    } catch (error) {
      setState((previous) => ({ ...previous, loading: false, error: error.message }));
    }
  };

  useEffect(() => {
    setReplyTo(null);
    if (count) load(1);
    else setState({ comments: [], page: 0, pages: 1, total: 0, loading: false, error: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, count]);

  const firstPageShown = state.page === 1;
  useEffect(() => {
    if (!firstPageShown) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id === "comments" || id === "respond" || id.startsWith("comment-")) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [firstPageShown]);

  const startReply = (comment) => {
    setReplyTo(comment);
    document.getElementById("respond")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-10">
      {state.total ? (
        <section id="comments" aria-labelledby="comments-title" className="scroll-mt-32">
          <h2 id="comments-title" className="flex items-center gap-2.5 font-display text-[1.75rem] font-medium text-[#15344F] dark:text-white">
            <MessageCircle className="h-6 w-6 text-[#21649A] dark:text-[#7fb6e3]" aria-hidden="true" />
            {state.total} {state.total === 1 ? "Comment" : "Comments"}
          </h2>
          <ol className="mt-6 space-y-4">
            {state.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} depth={0} onReply={startReply} canReply={commentsEnabled} />
            ))}
          </ol>
          {state.error ? <p className="mt-4 text-sm text-red-600">{state.error}</p> : null}
          {state.loading ? (
            <p className="mt-4 flex items-center gap-2 text-sm text-[#5E6D7B]">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Loading comments…
            </p>
          ) : null}
          {!state.loading && state.page < state.pages ? (
            <button
              type="button"
              onClick={() => load(state.page + 1)}
              className={`mt-6 inline-flex items-center gap-2 rounded-full border border-[#21649A] px-5 py-2.5 text-sm font-semibold text-[#21649A] transition-colors hover:bg-[#21649A] hover:text-white dark:text-[#7fb6e3] ${FOCUS}`}
            >
              <CornerDownRight className="h-4 w-4" aria-hidden="true" />
              Load older comments
            </button>
          ) : null}
        </section>
      ) : null}

      {commentsEnabled ? (
        <LeaveReply slug={slug} replyTo={replyTo} onCancelReply={() => setReplyTo(null)} />
      ) : (
        <p className="rounded-xl border border-[#DCE4E8] px-5 py-4 text-sm text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">Comments are closed for this post.</p>
      )}
    </div>
  );
}
