import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Code2,
  Eraser,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  ListTree,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Table,
  Underline,
  Undo2,
  Unlink,
} from "lucide-react";
import { SITE_URL } from "../../config/site";

const SITE_IMAGES = /(<img[^>]+src=")\/images\//g;
const toEditor = (html) => String(html || "").replace(SITE_IMAGES, `$1${SITE_URL}/images/`);
const fromEditor = (html) =>
  String(html || "")
    .split(`src="${SITE_URL}/images/`)
    .join('src="/images/')
    .replace(/<p><br><\/p>/g, "")
    .trim();

const KEEP_TAGS = new Set([
  "P", "BR", "H2", "H3", "H4", "H5", "H6", "STRONG", "B", "EM", "I", "U", "S", "SUP", "SUB", "A", "UL", "OL", "LI",
  "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "IMG", "HR", "FIGURE", "FIGCAPTION",
]);
const KEEP_ATTRS = { A: ["href"], IMG: ["src", "alt", "width", "height"], TD: ["colspan", "rowspan"], TH: ["colspan", "rowspan"] };

/** Strips pasted Word / web formatting down to plain structure. */
function cleanPasted(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style, meta, link, title, xml, o\\:p").forEach((node) => node.remove());
  const walk = (node) => {
    [...node.children].forEach((child) => {
      walk(child);
      if (!KEEP_TAGS.has(child.tagName)) {
        const block = /^(DIV|SECTION|ARTICLE|H1)$/.test(child.tagName);
        if (block && child.textContent.trim()) {
          const p = doc.createElement(child.tagName === "H1" ? "h2" : "p");
          p.append(...child.childNodes);
          child.replaceWith(p);
        } else child.replaceWith(...child.childNodes);
        return;
      }
      const allowed = KEEP_ATTRS[child.tagName] || [];
      [...child.attributes].forEach((attr) => {
        if (!allowed.includes(attr.name)) child.removeAttribute(attr.name);
      });
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

const slugId = (text, used) => {
  const base =
    String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";
  let id = base;
  for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
  used.add(id);
  return id;
};

function ToolButton({ icon: Icon, label, onClick, active = false, disabled = false }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active || undefined}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`focus-ring inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-40 ${
        active ? "bg-[var(--accent-soft)] text-accent" : "text-soft hover:bg-subtle hover:text-ink"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />;

export default function RichTextEditor({ id, value, onChange, onUploadImage, labelledBy }) {
  const editorRef = useRef(null);
  const lastHtml = useRef(null);
  const savedRange = useRef(null);
  const fileRef = useRef(null);
  const [source, setSource] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formats, setFormats] = useState({});

  useEffect(() => {
    if (source || !editorRef.current) return;
    if (value !== lastHtml.current) {
      editorRef.current.innerHTML = toEditor(value);
      lastHtml.current = value;
    }
  }, [value, source]);

  useEffect(() => {
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* not supported */
    }
  }, []);

  const emit = () => {
    const root = editorRef.current;
    if (root && [...root.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      document.execCommand("formatBlock", false, "<p>");
    }
    const html = fromEditor(root?.innerHTML || "");
    lastHtml.current = html;
    onChange(html);
  };

  const refreshFormats = () => {
    const query = (command) => {
      try {
        return document.queryCommandState(command);
      } catch {
        return false;
      }
    };
    let block = "";
    try {
      block = String(document.queryCommandValue("formatBlock") || "").toLowerCase();
    } catch {
      block = "";
    }
    setFormats({
      bold: query("bold"),
      italic: query("italic"),
      underline: query("underline"),
      strike: query("strikeThrough"),
      ul: query("insertUnorderedList"),
      ol: query("insertOrderedList"),
      block,
    });
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) savedRange.current = selection.getRangeAt(0).cloneRange();
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) return;
    editorRef.current?.focus();
    if (!savedRange.current) return;
    selection.removeAllRanges();
    selection.addRange(savedRange.current);
  };

  const exec = (command, argument = null) => {
    restoreSelection();
    document.execCommand(command, false, argument);
    emit();
    refreshFormats();
  };

  const block = (tag) => exec("formatBlock", formats.block === tag ? "<p>" : `<${tag}>`);

  const addLink = () => {
    saveSelection();
    const url = window.prompt("Link address (https://…, /blog/…, or #section-id)", "https://");
    if (!url || url === "https://") return;
    const safe = /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url.trim()) ? url.trim() : `https://${url.trim()}`;
    const selection = window.getSelection();
    restoreSelection();
    if (selection && selection.isCollapsed) document.execCommand("insertHTML", false, `<a href="${safe.replace(/"/g, "&quot;")}">${safe.replace(/</g, "&lt;")}</a>`);
    else document.execCommand("createLink", false, safe);
    emit();
  };

  const insertTable = () => {
    saveSelection();
    const answer = window.prompt("Table size as columns x rows", "3 x 4");
    if (!answer) return;
    const [cols, rows] = answer.split(/[x×,\s]+/).map((part) => Math.min(Math.max(Number(part) || 0, 1), 12));
    if (!cols || !rows) return;
    const head = `<tr>${Array.from({ length: cols }, (_, index) => `<td><strong>Heading ${index + 1}</strong></td>`).join("")}</tr>`;
    const body = Array.from({ length: rows - 1 }, () => `<tr>${"<td>&nbsp;</td>".repeat(cols)}</tr>`).join("");
    exec("insertHTML", `<table><tbody>${head}${body}</tbody></table><p><br></p>`);
  };

  const pickImage = () => {
    saveSelection();
    fileRef.current?.click();
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const image = await onUploadImage(file);
      const alt = window.prompt("Describe the image for screen readers (alt text)", "") || "";
      exec("insertHTML", `<p><img src="${image.url}" alt="${alt.replace(/"/g, "&quot;")}" width="${Math.min(image.width, 900)}"></p>`);
    } catch {
      // onUploadImage reports the error
    } finally {
      setUploading(false);
    }
  };

  const buildToc = () => {
    const root = editorRef.current;
    if (!root) return;
    const headings = [...root.querySelectorAll("h2")];
    if (!headings.length) {
      window.alert("Add some Heading 2 titles first. The Table Content box lists every Heading 2 in the post.");
      return;
    }
    const used = new Set();
    headings.forEach((heading) => {
      heading.id = heading.id && !used.has(heading.id) ? (used.add(heading.id), heading.id) : slugId(heading.textContent, used);
    });
    const toc = document.createElement("div");
    toc.className = "toc";
    const title = document.createElement("p");
    title.className = "toc-title";
    title.textContent = "Table Content";
    const list = document.createElement("ul");
    headings.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      item.append(link);
      list.append(item);
    });
    toc.append(title, list);
    const existing = root.querySelector(".toc");
    if (existing) existing.replaceWith(toc);
    else root.prepend(toc);
    emit();
  };

  const onPaste = (event) => {
    const html = event.clipboardData?.getData("text/html");
    if (!html) return;
    event.preventDefault();
    document.execCommand("insertHTML", false, cleanPasted(html));
    emit();
  };

  const toggleSource = () => {
    if (source) lastHtml.current = null;
    setSource((open) => !open);
  };

  const words = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface focus-within:border-accent">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-subtle/60 px-2 py-1.5" role="toolbar" aria-label="Formatting">
        <ToolButton icon={Undo2} label="Undo" onClick={() => exec("undo")} disabled={source} />
        <ToolButton icon={Redo2} label="Redo" onClick={() => exec("redo")} disabled={source} />
        <Divider />
        <ToolButton icon={Pilcrow} label="Paragraph" onClick={() => exec("formatBlock", "<p>")} active={formats.block === "p"} disabled={source} />
        <ToolButton icon={Heading2} label="Heading 2" onClick={() => block("h2")} active={formats.block === "h2"} disabled={source} />
        <ToolButton icon={Heading3} label="Heading 3" onClick={() => block("h3")} active={formats.block === "h3"} disabled={source} />
        <ToolButton icon={Heading4} label="Heading 4" onClick={() => block("h4")} active={formats.block === "h4"} disabled={source} />
        <Divider />
        <ToolButton icon={Bold} label="Bold" onClick={() => exec("bold")} active={formats.bold} disabled={source} />
        <ToolButton icon={Italic} label="Italic" onClick={() => exec("italic")} active={formats.italic} disabled={source} />
        <ToolButton icon={Underline} label="Underline" onClick={() => exec("underline")} active={formats.underline} disabled={source} />
        <ToolButton icon={Strikethrough} label="Strikethrough" onClick={() => exec("strikeThrough")} active={formats.strike} disabled={source} />
        <Divider />
        <ToolButton icon={List} label="Bulleted list" onClick={() => exec("insertUnorderedList")} active={formats.ul} disabled={source} />
        <ToolButton icon={ListOrdered} label="Numbered list" onClick={() => exec("insertOrderedList")} active={formats.ol} disabled={source} />
        <ToolButton icon={Quote} label="Quote" onClick={() => block("blockquote")} active={formats.block === "blockquote"} disabled={source} />
        <ToolButton icon={Minus} label="Divider line" onClick={() => exec("insertHorizontalRule")} disabled={source} />
        <Divider />
        <ToolButton icon={Link2} label="Add link" onClick={addLink} disabled={source} />
        <ToolButton icon={Unlink} label="Remove link" onClick={() => exec("unlink")} disabled={source} />
        <ToolButton icon={ImagePlus} label={uploading ? "Uploading image…" : "Insert image"} onClick={pickImage} disabled={source || uploading} />
        <ToolButton icon={Table} label="Insert table" onClick={insertTable} disabled={source} />
        <ToolButton icon={ListTree} label="Create or refresh Table Content from Heading 2 titles" onClick={buildToc} disabled={source} />
        <ToolButton icon={Eraser} label="Clear formatting" onClick={() => exec("removeFormat")} disabled={source} />
        <span className="ml-auto" />
        <button
          type="button"
          onClick={toggleSource}
          aria-pressed={source}
          className={`focus-ring inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-colors ${
            source ? "bg-[var(--accent-soft)] text-accent" : "text-soft hover:bg-subtle hover:text-ink"
          }`}
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          HTML
        </button>
      </div>

      {source ? (
        <textarea
          id={id}
          aria-labelledby={labelledBy}
          value={value}
          onChange={(event) => {
            lastHtml.current = null;
            onChange(event.target.value);
          }}
          spellCheck={false}
          className="block min-h-[32rem] w-full resize-y bg-transparent p-4 font-mono text-xs leading-relaxed text-ink outline-none"
        />
      ) : (
        <div
          id={id}
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          aria-labelledby={labelledBy}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Start writing your blog post here…"
          onInput={emit}
          onBlur={saveSelection}
          onKeyUp={() => {
            saveSelection();
            refreshFormats();
          }}
          onMouseUp={() => {
            saveSelection();
            refreshFormats();
          }}
          onPaste={onPaste}
          className="blog-editor-content min-h-[32rem] max-h-[75vh] overflow-y-auto px-5 py-4 outline-none sm:px-7"
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-subtle/60 px-3 py-2 text-[0.6875rem] font-semibold text-soft">
        <span>
          {words.toLocaleString()} words · about {Math.max(1, Math.round(words / 220))} min read
        </span>
        <span>Pasted text keeps headings, lists, links and tables; other formatting is removed.</span>
      </div>
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={uploadImage} />
    </div>
  );
}
