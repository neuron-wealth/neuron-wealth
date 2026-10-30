import { useId, useRef, useState } from "react";
import { ExternalLink, FileText, Link2, Trash2, Upload } from "lucide-react";
import { Input } from "../../site/controls";
import { useToast } from "../../../context/ToastContext";
import { uploadDocument } from "../../../services/pageService";
import { assetUrl } from "../../../config/site";
import { emptyLink, isSafeHref } from "../../../utils/cms";
import { useCmsMeta } from "../CmsMetaContext";

const COMMON_PATHS = [
  "/",
  "/contact",
  "/about",
  "/services",
  "/team",
  "/why-associate",
  "/insights",
  "/contact#careers",
  "/sebi-regulatory-compliance",
  "/#request-callback",
  "/#why-us",
];

const DOCUMENT_PREFIX = "/api/uploads/documents/";
const DEFAULT_DOCUMENTS = { maxBytes: 25 * 1024 * 1024, extensions: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"] };

const extensionOf = (name) => (name.match(/\.([a-z0-9]+)$/i)?.[1] || "").toLowerCase();

// Readable name for a stored file: "moneylife-cover-story-lx2k3a9f.pdf" -> "moneylife-cover-story.pdf".
function fileLabel(href) {
  const name = decodeURIComponent(href.split("/").pop() || "");
  return name.replace(/-[a-z0-9]{8,14}(\.[a-z0-9]+)$/i, "$1");
}

function FileUpload({ link, set }) {
  const meta = useCmsMeta();
  const { push } = useToast();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const rules = meta?.document || DEFAULT_DOCUMENTS;
  const isUploaded = link.href.startsWith(DOCUMENT_PREFIX);

  async function onFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!rules.extensions.includes(extensionOf(file.name))) {
      push("Choose a PDF, Word, Excel or PowerPoint file.", "error");
      return;
    }
    if (file.size > rules.maxBytes) {
      push(`Files must be ${rules.maxBytes / (1024 * 1024)} MB or smaller (this one is ${(file.size / (1024 * 1024)).toFixed(1)} MB).`, "error");
      return;
    }
    setUploading(true);
    try {
      const uploaded = await uploadDocument(file);
      set({ href: uploaded.url, newTab: true });
      push("File uploaded. Save the page to publish it.", "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-line bg-surface p-2.5">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={rules.extensions.map((ext) => `.${ext}`).join(",")}
        onChange={onFile}
      />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="btn btn-secondary focus-ring h-9 px-3 text-xs">
        <Upload className="h-3.5 w-3.5" aria-hidden="true" />
        {uploading ? "Uploading…" : isUploaded ? "Replace File" : "Upload File"}
      </button>
      {isUploaded ? (
        <>
          <span className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-xs font-semibold">
            <FileText className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="truncate" title={fileLabel(link.href)}>
              {fileLabel(link.href)}
            </span>
          </span>
          <a
            href={assetUrl(link.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn focus-ring h-9 w-9 border border-line"
            aria-label="Open the uploaded file"
            title="Open file"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => set({ href: "" })}
            className="icon-btn focus-ring h-9 w-9 border border-line text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            aria-label="Remove the file"
            title="Remove file"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </>
      ) : (
        <span className="muted text-xs">PDF, Word, Excel or PowerPoint · up to {rules.maxBytes / (1024 * 1024)} MB</span>
      )}
    </div>
  );
}

export default function LinkField({ field, value, onChange }) {
  const link = { ...emptyLink(), ...(value || {}) };
  const listId = useId();
  const set = (changes) => onChange({ ...link, ...changes });
  const valid = isSafeHref(link.href);

  return (
    <fieldset className="rounded-xl border border-line bg-subtle p-3.5">
      <legend className="flex items-center gap-1.5 px-1 text-xs font-bold text-soft">
        <Link2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        {field.label}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Label" value={link.label} maxLength={120} onChange={(label) => set({ label })} />
        {field.short ? (
          <Input label="Mobile Label (Optional)" value={link.shortLabel} maxLength={60} onChange={(shortLabel) => set({ shortLabel })} />
        ) : null}
        <div className={field.short ? "sm:col-span-2" : ""}>
          <Input
            label="Link Address"
            value={link.href}
            maxLength={500}
            placeholder={field.upload ? "Upload a file below, or /page or https://…" : "/contact or https://…"}
            list={listId}
            spellCheck={false}
            aria-invalid={!valid}
            onChange={(href) => set({ href: href.trim() })}
          />
          <datalist id={listId}>
            {COMMON_PATHS.map((path) => (
              <option key={path} value={path} />
            ))}
          </datalist>
        </div>
      </div>
      {field.upload ? <FileUpload link={link} set={set} /> : null}
      {!valid ? (
        <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">Start the address with "/", "#", "https://", "mailto:" or "tel:".</p>
      ) : null}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold">
          <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={link.newTab} onChange={(event) => set({ newTab: event.target.checked })} />
          Open in a new tab
        </label>
        {field.hint ? <p className="muted text-xs">{field.hint}</p> : null}
      </div>
    </fieldset>
  );
}
