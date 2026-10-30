import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  ExternalLink,
  Eye,
  History,
  ImagePlus,
  Loader2,
  MessageSquareText,
  RotateCcw,
  Save,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import { Skeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { assetUrl, siteUrl } from "../../config/site";
import { createBlog, deleteBlog, fetchBlog, fetchBlogMeta, restoreBlog, saveBlog, uploadBlogImage } from "../../services/blogService";
import { formatDateTime, timeAgo } from "../../utils/format";
import RichTextEditor from "./RichTextEditor";
import TermsInput from "./TermsInput";
import { BlogStatusPill } from "./blogUi";

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverAlt: "",
  categories: [],
  tags: [],
  author: "",
  status: "draft",
  publishedAt: "",
  commentsEnabled: true,
  seo: { title: "", description: "" },
};

const FIELDS = Object.keys(EMPTY);
const pick = (post) => Object.fromEntries(FIELDS.map((key) => [key, post[key] ?? EMPTY[key]]));
const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160)
    .replace(/-+$/g, "");

const pad = (n) => String(n).padStart(2, "0");
function toLocalInput(iso) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
const fromLocalInput = (value) => (value ? new Date(value).toISOString() : "");

function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="panel rounded-2xl">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          {Icon ? <Icon className="h-4 w-4 text-accent" aria-hidden="true" /> : null}
          {title}
        </h2>
        {action}
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </section>
  );
}

function Counter({ value, max }) {
  const length = String(value || "").length;
  return <span className={`text-[0.6875rem] font-semibold ${length > max ? "text-red-600" : "text-soft"}`}>{`${length}/${max}`}</span>;
}

function EditorSkeleton() {
  return (
    <div className="space-y-5">
      <p className="sr-only">Loading blog post</p>
      <Skeleton className="h-28 rounded-2xl" />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Skeleton className="h-[70vh] rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function BlogEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { push } = useToast();
  const [meta, setMeta] = useState(null);
  const [post, setPost] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const coverInput = useRef(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const [nextMeta, nextPost] = await Promise.all([fetchBlogMeta(), isNew ? Promise.resolve(null) : fetchBlog(id)]);
      setMeta(nextMeta);
      const base = nextPost
        ? pick(nextPost)
        : { ...EMPTY, author: nextMeta.authors.includes("Jigar Patel") ? "Jigar Patel" : nextMeta.authors[0] || "", publishedAt: new Date().toISOString() };
      setPost(nextPost);
      setDraft(base);
      setSaved(JSON.stringify(base));
      setSlugTouched(!isNew);
    } catch (err) {
      setError(err.message);
    }
  }, [id, isNew]);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = draft ? JSON.stringify(draft) !== saved : false;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (changes) => setDraft((previous) => ({ ...previous, ...changes }));
  const updateSeo = (changes) => setDraft((previous) => ({ ...previous, seo: { ...previous.seo, ...changes } }));

  const setTitle = (title) => update(slugTouched ? { title } : { title, slug: slugify(title) });

  const limits = meta?.limits || {};
  const scheduled = draft?.status === "published" && draft.publishedAt && new Date(draft.publishedAt).getTime() > Date.now();
  const publicPath = `/blog/${draft?.slug || ""}`;
  const liveOnSite = post?.status === "published" && post.publishedAt && new Date(post.publishedAt).getTime() <= Date.now();

  const save = async (status = draft.status) => {
    const body = { ...draft, status };
    setSaving(status);
    try {
      if (isNew) {
        const result = await createBlog(body);
        push(result.message, "success");
        setSaved(JSON.stringify(pick(result.post)));
        navigate(`/blogs/${result.post.id}`, { replace: true });
      } else {
        const result = await saveBlog(id, body);
        push(result.message, "success");
        const next = pick(result.post);
        setPost(result.post);
        setDraft(next);
        setSaved(JSON.stringify(next));
      }
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving("");
    }
  };

  const uploadImage = async (file) => {
    try {
      return await uploadBlogImage(file);
    } catch (err) {
      push(err.message, "error");
      throw err;
    }
  };

  const uploadCover = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const image = await uploadImage(file);
      update({ coverImage: image.url, coverAlt: draft.coverAlt || draft.title });
      push("Cover image uploaded. Save the post to keep it.", "success");
    } catch {
      // reported by uploadImage
    } finally {
      setUploading(false);
    }
  };

  const runConfirmed = async () => {
    const action = confirm;
    setSaving(action);
    try {
      if (action === "delete") {
        const result = await deleteBlog(id);
        push(result.message, "success");
        setSaved(JSON.stringify(draft));
        navigate("/blogs", { replace: true });
        return;
      }
      if (action === "restore") {
        const result = await restoreBlog(id);
        push(result.message, "success");
        const next = pick(result.post);
        setPost(result.post);
        setDraft(next);
        setSaved(JSON.stringify(next));
      }
      setConfirm("");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving("");
    }
  };

  const googleTitle = useMemo(() => draft?.seo.title || (draft?.title ? `${draft.title} | Neuron Wealth Advisors` : "Blog post title"), [draft]);
  const googleDescription = draft?.seo.description || draft?.excerpt || "The short description appears here in search results.";

  if (error && !draft) {
    return (
      <div className="max-w-3xl">
        <Link to="/blogs" className="muted inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All Blogs
        </Link>
        <Alert tone="error" className="mt-4">
          {error}{" "}
          <button type="button" onClick={load} className="font-bold underline">
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  if (!draft || !meta) return <EditorSkeleton />;

  return (
    <div className="pb-24">
      <header className="panel rise-in rounded-2xl p-5 sm:p-6">
        <Link to="/blogs" className="focus-ring muted inline-flex items-center gap-1.5 rounded-md text-xs font-bold hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All Blogs
        </Link>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{isNew ? "Add New Blog" : draft.title || "Untitled post"}</h1>
              {!isNew ? <BlogStatusPill status={post?.status} scheduled={post?.status === "published" && !liveOnSite} /> : null}
              {post?.legacyId ? (
                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">Original post</span>
              ) : null}
            </div>
            <p className="muted mt-1 flex flex-wrap items-center gap-x-2 text-xs">
              <span className="font-mono">{publicPath}</span>
              {!isNew ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {timeAgo(post?.updatedAt)}</span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {liveOnSite ? (
              <a href={siteUrl(`/blog/${post.slug}`)} target="_blank" rel="noreferrer" className="btn btn-secondary focus-ring h-10 px-4">
                <Eye className="h-4 w-4" aria-hidden="true" />
                View on Website
              </a>
            ) : null}
            <button type="button" onClick={() => save("draft")} disabled={Boolean(saving)} className="btn btn-secondary focus-ring h-10 px-4">
              {saving === "draft" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              {draft.status === "published" && !isNew ? "Save as Draft" : "Save Draft"}
            </button>
            <button type="button" onClick={() => save("published")} disabled={Boolean(saving)} className="btn btn-primary focus-ring h-10 px-5">
              {saving === "published" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {post?.status === "published" ? "Update" : scheduled ? "Schedule" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-5">
          <section className="panel space-y-4 rounded-2xl p-4 sm:p-5">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="blog-title" className="field-label">
                  Title
                </label>
                <Counter value={draft.title} max={limits.title} />
              </div>
              <input
                id="blog-title"
                value={draft.title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Blog post title"
                className="field mt-1.5 h-12 px-3.5 text-lg font-bold"
              />
            </div>
            <div>
              <label htmlFor="blog-slug" className="field-label">
                URL slug
              </label>
              <div className="field mt-1.5 flex items-center gap-1 px-3.5">
                <span className="shrink-0 font-mono text-xs text-soft">/blog/</span>
                <input
                  id="blog-slug"
                  value={draft.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    update({ slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-") });
                  }}
                  onBlur={() => update({ slug: slugify(draft.slug) || slugify(draft.title) })}
                  className="h-10 min-w-0 flex-1 bg-transparent font-mono text-sm outline-none"
                />
              </div>
              <p className="muted mt-1.5 text-xs">
                Lowercase letters, numbers and dashes. If you change the slug of a published post, the old address keeps working and redirects here.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="blog-excerpt" className="field-label">
                  Short description
                </label>
                <Counter value={draft.excerpt} max={limits.excerpt} />
              </div>
              <textarea
                id="blog-excerpt"
                rows={3}
                value={draft.excerpt}
                onChange={(event) => update({ excerpt: event.target.value })}
                placeholder="Shown on the blog listing cards. Leave empty to use the first lines of the post."
                className="field mt-1.5 h-auto resize-y px-3.5 py-2.5 text-sm leading-relaxed"
              />
            </div>
          </section>

          <section>
            <p id="blog-content-label" className="field-label mb-1.5">
              Blog content
            </p>
            <RichTextEditor id="blog-content" labelledBy="blog-content-label" value={draft.content} onChange={(content) => update({ content })} onUploadImage={uploadImage} />
          </section>

          <Panel title="Search Engine (SEO)" icon={Search}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="blog-seo-title" className="field-label">
                  SEO title
                </label>
                <Counter value={draft.seo.title} max={limits.seoTitle} />
              </div>
              <input
                id="blog-seo-title"
                value={draft.seo.title}
                onChange={(event) => updateSeo({ title: event.target.value })}
                placeholder={`${draft.title || "Post title"} | Neuron Wealth Advisors`}
                className="field mt-1.5 h-11 px-3.5 text-sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="blog-seo-description" className="field-label">
                  SEO description
                </label>
                <Counter value={draft.seo.description} max={limits.seoDescription} />
              </div>
              <textarea
                id="blog-seo-description"
                rows={3}
                value={draft.seo.description}
                onChange={(event) => updateSeo({ description: event.target.value })}
                placeholder="Leave empty to use the short description."
                className="field mt-1.5 h-auto resize-y px-3.5 py-2.5 text-sm leading-relaxed"
              />
            </div>
            <div className="rounded-xl border border-line bg-white p-4 dark:bg-slate-900">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-soft">Search result preview</p>
              <p className="mt-2 truncate text-xs text-emerald-700 dark:text-emerald-400">neuronwealth.com › blog › {draft.slug || "post-address"}</p>
              <p className="mt-0.5 line-clamp-1 text-lg leading-snug text-[#1a0dab] dark:text-sky-300">{googleTitle}</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-[#4d5156] dark:text-slate-300">{googleDescription}</p>
            </div>
          </Panel>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-20">
          <Panel title="Publish" icon={CalendarClock}>
            <div>
              <label htmlFor="blog-status" className="field-label">
                Status
              </label>
              <select id="blog-status" value={draft.status} onChange={(event) => update({ status: event.target.value })} className="field mt-1.5 h-11 px-3 text-sm">
                <option value="published">Published (visible on website)</option>
                <option value="draft">Draft (hidden)</option>
              </select>
            </div>
            <div>
              <label htmlFor="blog-date" className="field-label">
                Publish date &amp; time
              </label>
              <input
                id="blog-date"
                type="datetime-local"
                value={toLocalInput(draft.publishedAt)}
                onChange={(event) => update({ publishedAt: fromLocalInput(event.target.value) })}
                className="field mt-1.5 h-11 px-3 text-sm"
              />
              <p className="muted mt-1.5 text-xs">
                {scheduled ? "This date is in the future, so the post goes live automatically at that time." : "Shown on the post and used to order the blog list."}
              </p>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3">
              <input
                type="checkbox"
                checked={draft.commentsEnabled}
                onChange={(event) => update({ commentsEnabled: event.target.checked })}
                className="mt-0.5 h-4 w-4 accent-accent"
              />
              <span>
                <span className="block text-sm font-semibold">Allow comments</span>
                <span className="muted block text-xs">Shows the “Leave a Reply” form. New comments wait for your approval.</span>
              </span>
            </label>
            {!isNew ? (
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-line pt-3 text-xs">
                <dt className="text-soft">Created</dt>
                <dd className="font-semibold">{formatDateTime(post?.createdAt)}</dd>
                <dt className="text-soft">Last saved</dt>
                <dd className="font-semibold">{formatDateTime(post?.updatedAt)}</dd>
                {post?.legacyUrl ? (
                  <>
                    <dt className="text-soft">Old address</dt>
                    <dd className="min-w-0">
                      <a href={post.legacyUrl} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 font-semibold text-accent hover:underline">
                        <span className="truncate">{post.legacyUrl.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </>
                ) : null}
              </dl>
            ) : null}
            {!isNew ? (
              <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                <Link to={`/blogs/comments?blogId=${id}`} className="btn btn-secondary focus-ring h-9 flex-1 px-3 text-xs">
                  <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                  Comments
                </Link>
                {post?.legacyId ? (
                  <button type="button" onClick={() => setConfirm("restore")} className="btn btn-secondary focus-ring h-9 flex-1 px-3 text-xs" title="Bring back the content imported from neuronwealth.com">
                    <History className="h-3.5 w-3.5" aria-hidden="true" />
                    Restore Original
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setConfirm("delete")}
                  className="btn focus-ring h-9 w-full border border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Delete Post
                </button>
              </div>
            ) : null}
          </Panel>

          <Panel
            title="Cover Image"
            icon={ImagePlus}
            action={
              draft.coverImage ? (
                <button type="button" onClick={() => update({ coverImage: "", coverAlt: "" })} className="focus-ring inline-flex items-center gap-1 rounded-md text-xs font-bold text-red-600 hover:underline">
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              ) : null
            }
          >
            <button
              type="button"
              onClick={() => coverInput.current?.click()}
              disabled={uploading}
              className="focus-ring group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-line bg-subtle transition-colors hover:border-accent"
            >
              {draft.coverImage ? (
                <>
                  <img src={assetUrl(draft.coverImage)} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#071321]/55 text-sm font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Replace image
                  </span>
                </>
              ) : (
                <span className="flex flex-col items-center gap-1.5 text-sm font-semibold text-soft">
                  {uploading ? <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> : <ImagePlus className="h-6 w-6" aria-hidden="true" />}
                  {uploading ? "Uploading…" : "Upload cover image"}
                  <span className="text-[0.6875rem] font-normal">PNG, JPG, WEBP or GIF up to 5 MB</span>
                </span>
              )}
            </button>
            <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={uploadCover} />
            {draft.coverImage ? (
              <div>
                <label htmlFor="blog-cover-alt" className="field-label">
                  Image description (alt text)
                </label>
                <input id="blog-cover-alt" value={draft.coverAlt} onChange={(event) => update({ coverAlt: event.target.value })} className="field mt-1.5 h-10 px-3 text-sm" />
              </div>
            ) : (
              <p className="muted text-xs">Without a cover image, the blog list shows a branded card with the post category.</p>
            )}
          </Panel>

          <Panel title="Categories & Tags">
            <TermsInput
              label="Categories"
              values={draft.categories}
              onChange={(categories) => update({ categories })}
              suggestions={meta.categories}
              max={limits.categories}
              placeholder="Add a category…"
            />
            <TermsInput
              label="Tags"
              values={draft.tags}
              onChange={(tags) => update({ tags })}
              suggestions={meta.tags}
              max={limits.tags}
              placeholder="Type a tag and press Enter"
              quickAdd={false}
            />
            <div>
              <label htmlFor="blog-author" className="field-label">
                Author
              </label>
              <input id="blog-author" list="blog-authors" value={draft.author} onChange={(event) => update({ author: event.target.value })} className="field mt-1.5 h-10 px-3 text-sm" />
              <datalist id="blog-authors">
                {meta.authors.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>
          </Panel>
        </aside>
      </div>

      {dirty ? (
        <div className="sticky bottom-4 z-20 mt-6">
          <div className="menu-panel rise-in flex flex-col gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle" aria-hidden="true" />
              Unsaved changes.{" "}
              {draft.status === "published" ? "The website updates after you save." : "This post stays hidden until you publish it."}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDraft(JSON.parse(saved))}
                disabled={Boolean(saving)}
                className="btn btn-secondary focus-ring h-10 px-4"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Discard
              </button>
              <button type="button" onClick={() => save()} disabled={Boolean(saving)} className="btn btn-primary focus-ring h-10 px-5">
                <Save className="h-4 w-4" aria-hidden="true" />
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog
        open={Boolean(confirm)}
        title={confirm === "delete" ? "Delete this blog post?" : "Restore the original content?"}
        description={
          confirm === "delete"
            ? "The post and all of its comments are removed from the website. This cannot be undone."
            : "Title, content, images, categories, tags, date and SEO are replaced with the version imported from neuronwealth.com. Comments are not affected."
        }
        onClose={() => setConfirm("")}
        footer={
          <>
            <button type="button" onClick={() => setConfirm("")} className="btn btn-secondary focus-ring h-10 px-4">
              Cancel
            </button>
            <button
              type="button"
              onClick={runConfirmed}
              disabled={Boolean(saving)}
              className={`btn focus-ring h-10 px-4 ${confirm === "delete" ? "bg-red-600 text-white hover:bg-red-700" : "btn-primary"}`}
            >
              {confirm === "delete" ? <Trash2 className="h-4 w-4" aria-hidden="true" /> : <History className="h-4 w-4" aria-hidden="true" />}
              {saving ? "Working…" : confirm === "delete" ? "Delete Post" : "Restore Original"}
            </button>
          </>
        }
      >
        <p className="text-sm font-semibold">{draft.title}</p>
      </Dialog>
    </div>
  );
}
