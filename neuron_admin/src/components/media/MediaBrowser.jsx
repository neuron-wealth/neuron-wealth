import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  Copy,
  ExternalLink,
  File as FileIcon,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderInput,
  FolderPlus,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Loader2,
  Pencil,
  Presentation,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Dialog from "../ui/Dialog";
import { useToast } from "../../context/ToastContext";
import { assetUrl } from "../../config/site";
import { createFolder, deleteItem, listAllFolders, listFolder, moveItem, renameItem, searchLibrary, uploadFiles } from "../../services/libraryService";

const DEFAULT_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
const PICKER_FOLDER_KEY = "neuron_media_picker_folder";

export function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const FILE_STYLE = {
  pdf: { icon: FileText, color: "#C62828", label: "PDF" },
  doc: { icon: FileText, color: "#21649A", label: "Word" },
  docx: { icon: FileText, color: "#21649A", label: "Word" },
  xls: { icon: FileSpreadsheet, color: "#2E8A3C", label: "Excel" },
  xlsx: { icon: FileSpreadsheet, color: "#2E8A3C", label: "Excel" },
  ppt: { icon: Presentation, color: "#C2410C", label: "PowerPoint" },
  pptx: { icon: Presentation, color: "#C2410C", label: "PowerPoint" },
};

function FileThumb({ file, large }) {
  const [broken, setBroken] = useState(false);
  if (file.kind === "image" && !broken) {
    return <img src={assetUrl(file.url)} alt="" loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-cover" />;
  }
  const style = FILE_STYLE[file.ext] || { icon: file.kind === "image" ? ImageIcon : FileIcon, color: "#5E6D7B", label: file.ext.toUpperCase() };
  const Icon = style.icon;
  return (
    <span className="flex h-full w-full flex-col items-center justify-center gap-1.5" style={{ color: style.color }}>
      <Icon className={large ? "h-10 w-10" : "h-5 w-5"} aria-hidden="true" />
      {large ? <span className="text-[0.6875rem] font-bold uppercase tracking-wide">{style.label}</span> : null}
    </span>
  );
}

function ActionButton({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      title={label}
      className={`icon-btn focus-ring h-8 w-8 border border-line bg-[var(--surface)] ${danger ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40" : ""}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}

/** A small form dialog used for new folder / rename. */
function NameDialog({ open, title, label, initial, submitLabel, onSubmit, onClose }) {
  const [value, setValue] = useState(initial || "");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (open) setValue(initial || "");
  }, [open, initial]);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      await onSubmit(value.trim());
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary focus-ring h-10 px-4">
            Cancel
          </button>
          <button type="submit" form="media-name-form" disabled={busy || !value.trim()} className="btn btn-primary focus-ring h-10 px-4">
            {busy ? "Saving…" : submitLabel}
          </button>
        </>
      }
    >
      <form id="media-name-form" onSubmit={submit}>
        <label htmlFor="media-name-input" className="field-label">
          {label}
        </label>
        <input id="media-name-input" autoFocus className="field mt-1.5 px-3.5" maxLength={80} value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="muted mt-1.5 text-xs">Letters, numbers, spaces and ( ) &amp; - _ are allowed.</p>
      </form>
    </Dialog>
  );
}

function MoveDialog({ open, item, onMove, onClose }) {
  const [folders, setFolders] = useState([]);
  const [target, setTarget] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!open) return;
    listAllFolders().then((list) => {
      const blocked = item?.folder ? item.path : null;
      setFolders(list.filter((f) => !blocked || (f.path !== blocked && !f.path.startsWith(`${blocked}/`))));
    });
    setTarget("");
  }, [open, item]);
  return (
    <Dialog
      open={open}
      title={`Move "${item?.name || ""}"`}
      description="Choose the folder to move it into."
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary focus-ring h-10 px-4">
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onMove(target);
              } finally {
                setBusy(false);
              }
            }}
            className="btn btn-primary focus-ring h-10 px-4"
          >
            {busy ? "Moving…" : "Move Here"}
          </button>
        </>
      }
    >
      <ul className="max-h-72 space-y-1 overflow-y-auto">
        {folders.map((folder) => {
          const depth = folder.path ? folder.path.split("/").length : 0;
          const selected = target === folder.path;
          return (
            <li key={folder.path || "root"}>
              <button
                type="button"
                onClick={() => setTarget(folder.path)}
                aria-pressed={selected}
                className={`focus-ring flex w-full items-center gap-2 rounded-lg py-2 pr-3 text-left text-sm font-semibold ${selected ? "bg-[var(--accent-soft)] text-accent" : "hover:bg-subtle"}`}
                style={{ paddingLeft: `${0.75 + depth * 1}rem` }}
              >
                {folder.path ? <Folder className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Home className="h-4 w-4 shrink-0" aria-hidden="true" />}
                <span className="truncate">{folder.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Dialog>
  );
}

/**
 * Browse, organise and upload library files. `mode="pick"` turns it into a chooser: clicking a
 * file calls onPick(file); `accept="image"` limits choices to images.
 */
export default function MediaBrowser({ mode = "manage", accept = "any", onPick }) {
  const { push } = useToast();
  const picking = mode === "pick";
  // The library page keeps the open folder in the URL (?folder=) so refresh/back work; the picker
  // remembers the last folder it used.
  const [params, setParams] = useSearchParams();
  const [pickerPath, setPickerPath] = useState(() => (picking ? sessionStorage.getItem(PICKER_FOLDER_KEY) || "" : ""));
  const path = picking ? pickerPath : params.get("folder") || "";
  const setPath = useCallback(
    (next) => {
      if (picking) {
        setPickerPath(next);
        sessionStorage.setItem(PICKER_FOLDER_KEY, next);
      } else setParams(next ? { folder: next } : {});
    },
    [picking, setParams]
  );
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(() => localStorage.getItem("neuron_media_view") || "grid");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [uploading, setUploading] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dialog, setDialog] = useState(null); // { type: "folder" | "rename" | "move" | "delete", item }
  const inputRef = useRef(null);

  const load = useCallback(async (target) => {
    setLoading(true);
    setError("");
    try {
      setData(await listFolder(target));
    } catch (err) {
      if (err.status === 404 && target) {
        setPath("");
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setPath]);

  useEffect(() => {
    load(path);
  }, [path, load]);

  useEffect(() => {
    localStorage.setItem("neuron_media_view", view);
  }, [view]);

  // Search across every folder (debounced).
  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults(null);
      return undefined;
    }
    const timer = setTimeout(() => {
      searchLibrary(term).then(setResults).catch(() => setResults([]));
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const extensions = data?.extensions || DEFAULT_EXTENSIONS;
  const acceptAttr = (accept === "image" ? IMAGE_EXTENSIONS : extensions).map((ext) => `.${ext}`).join(",");
  const canPick = (file) => accept !== "image" || file.kind === "image";
  const refresh = () => load(path);

  async function handleUpload(fileList) {
    const files = [...(fileList || [])];
    if (!files.length) return;
    const maxFiles = data?.maxFiles || 20;
    const maxBytes = data?.maxBytes || 25 * 1024 * 1024;
    if (files.length > maxFiles) {
      push(`Upload up to ${maxFiles} files at a time.`, "error");
      return;
    }
    const tooBig = files.find((f) => f.size > maxBytes);
    if (tooBig) {
      push(`"${tooBig.name}" is larger than ${formatBytes(maxBytes)}.`, "error");
      return;
    }
    setUploading(files.length);
    try {
      const result = await uploadFiles(path, files);
      if (result.saved?.length) push(result.message, "success");
      for (const rejected of result.rejected || []) push(`${rejected.name}: ${rejected.reason}`, "error");
      await refresh();
    } catch (err) {
      push(err.message, "error");
    } finally {
      setUploading(0);
    }
  }

  async function copyLink(file) {
    try {
      await navigator.clipboard.writeText(file.url);
      push("Link copied. Paste it into any image or link field.", "success");
    } catch {
      push(file.url, "info");
    }
  }

  async function run(action, success) {
    try {
      const result = await action();
      push(result?.message || success, "success");
      setDialog(null);
      await refresh();
    } catch (err) {
      push(err.message, "error");
    }
  }

  const folders = results ? [] : data?.folders || [];
  const files = results || data?.files || [];
  const empty = !loading && !error && !folders.length && !files.length;

  const openFile = (file) => {
    if (picking) {
      if (canPick(file)) onPick?.(file);
      else push("Choose an image file for this field.", "error");
    } else window.open(assetUrl(file.url), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative"
      onDragOver={(event) => {
        if (event.dataTransfer.types.includes("Files")) {
          event.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleUpload(event.dataTransfer.files);
      }}
    >
      {/* Toolbar */}
      <div className={`flex flex-col gap-3 ${picking ? "" : "xl:flex-row xl:items-center xl:justify-between"}`}>
        <nav aria-label="Folder path" className="min-w-0">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            <li>
              <button type="button" onClick={() => { setQuery(""); setPath(""); }} className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-semibold hover:bg-subtle">
                <Home className="h-4 w-4 text-accent" aria-hidden="true" />
                Library
              </button>
            </li>
            {(data?.breadcrumb || []).map((crumb) => (
              <li key={crumb.path} className="flex min-w-0 items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5 text-soft" aria-hidden="true" />
                <button type="button" onClick={() => { setQuery(""); setPath(crumb.path); }} className="focus-ring max-w-[12rem] truncate rounded-lg px-2 py-1 font-semibold hover:bg-subtle" aria-current={crumb.path === path ? "page" : undefined}>
                  {crumb.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`relative min-w-[12rem] flex-1 ${picking ? "" : "xl:w-60 xl:flex-none"}`}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all files…" aria-label="Search all files" className="field h-10 pl-9 pr-8" />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="icon-btn absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <div className="flex rounded-xl border border-line p-0.5" role="group" aria-label="View">
            <button type="button" onClick={() => setView("grid")} aria-pressed={view === "grid"} aria-label="Grid view" className={`icon-btn focus-ring h-9 w-9 ${view === "grid" ? "bg-[var(--accent-soft)] text-accent" : ""}`}>
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} aria-label="List view" className={`icon-btn focus-ring h-9 w-9 ${view === "list" ? "bg-[var(--accent-soft)] text-accent" : ""}`}>
              <List className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={() => setDialog({ type: "folder" })} className="btn btn-secondary focus-ring h-10 px-3.5">
            <FolderPlus className="h-4 w-4" aria-hidden="true" />
            New Folder
          </button>
          <button type="button" onClick={() => inputRef.current?.click()} disabled={Boolean(uploading)} className="btn btn-primary focus-ring h-10 px-3.5">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
            {uploading ? `Uploading ${uploading}…` : "Upload Files"}
          </button>
          <input ref={inputRef} type="file" multiple accept={acceptAttr} className="hidden" onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
        </div>
      </div>

      <p className="muted mt-2 text-xs">
        {results ? `${results.length} file${results.length === 1 ? "" : "s"} matching "${query.trim()}" across all folders.` : "Drag files here to upload them into this folder."} Images (JPG, PNG, WEBP, GIF) and documents (PDF, Word, Excel, PowerPoint), up to {formatBytes(data?.maxBytes || 25 * 1024 * 1024)} each.
      </p>

      {/* Content */}
      <div className="mt-4 min-h-[16rem]">
        {loading && !data ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-subtle" />
            ))}
          </div>
        ) : null}
        {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300">{error}</p> : null}

        {empty ? (
          <button type="button" onClick={() => inputRef.current?.click()} className="focus-ring flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-line px-6 py-14 text-center hover:border-accent hover:bg-subtle">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-accent">
              <Upload className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-bold">{results ? "No files match your search" : "This folder is empty"}</span>
            <span className="muted text-sm">{results ? "Try a different name." : "Upload files or create a folder to get started."}</span>
          </button>
        ) : null}

        {!error && (folders.length || files.length) ? (
          view === "grid" ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {folders.map((folder) => (
                <li key={folder.path} className="group relative">
                  <button type="button" onClick={() => setPath(folder.path)} className="focus-ring flex w-full flex-col items-start gap-3 rounded-xl border border-line bg-[var(--surface)] p-4 text-left transition-colors hover:border-accent hover:bg-subtle">
                    <Folder className="h-9 w-9 text-amber-500" fill="currentColor" fillOpacity={0.2} aria-hidden="true" />
                    <span className="w-full min-w-0">
                      <span className="block truncate text-sm font-bold">{folder.name}</span>
                      <span className="muted block text-xs">{folder.items} item{folder.items === 1 ? "" : "s"}</span>
                    </span>
                  </button>
                  {!picking ? (
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                      <ActionButton icon={Pencil} label={`Rename folder ${folder.name}`} onClick={() => setDialog({ type: "rename", item: { ...folder, folder: true } })} />
                      <ActionButton icon={FolderInput} label={`Move folder ${folder.name}`} onClick={() => setDialog({ type: "move", item: { ...folder, folder: true } })} />
                      <ActionButton icon={Trash2} danger label={`Delete folder ${folder.name}`} onClick={() => setDialog({ type: "delete", item: { ...folder, folder: true } })} />
                    </div>
                  ) : null}
                </li>
              ))}
              {files.map((file) => {
                const disabled = picking && !canPick(file);
                return (
                  <li key={file.path} className="group relative">
                    <button
                      type="button"
                      onClick={() => openFile(file)}
                      disabled={disabled}
                      title={file.path}
                      className={`focus-ring flex w-full flex-col overflow-hidden rounded-xl border border-line bg-[var(--surface)] text-left transition-colors hover:border-accent ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[repeating-conic-gradient(#eef2f5_0%_25%,#f8fafb_0%_50%)] bg-[length:14px_14px] dark:bg-[repeating-conic-gradient(#1a3146_0%_25%,#132739_0%_50%)]">
                        <FileThumb file={file} large />
                      </span>
                      <span className="w-full min-w-0 px-3 py-2.5">
                        <span className="block truncate text-sm font-semibold">{file.name}</span>
                        <span className="muted block truncate text-xs">
                          {formatBytes(file.bytes)}
                          {file.width ? ` · ${file.width}×${file.height}` : ""}
                          {results && file.path.includes("/") ? ` · ${file.path.split("/").slice(0, -1).join(" / ")}` : ""}
                        </span>
                      </span>
                    </button>
                    {!picking ? (
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                        <ActionButton icon={Copy} label={`Copy link to ${file.name}`} onClick={() => copyLink(file)} />
                        <ActionButton icon={Pencil} label={`Rename ${file.name}`} onClick={() => setDialog({ type: "rename", item: file })} />
                        <ActionButton icon={FolderInput} label={`Move ${file.name}`} onClick={() => setDialog({ type: "move", item: file })} />
                        <ActionButton icon={Trash2} danger label={`Delete ${file.name}`} onClick={() => setDialog({ type: "delete", item: file })} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[36rem] text-sm">
                <thead className="bg-subtle text-left text-xs font-bold uppercase tracking-wide text-soft">
                  <tr>
                    <th className="px-4 py-2.5">Name</th>
                    <th className="px-4 py-2.5">Size</th>
                    <th className="px-4 py-2.5">Modified</th>
                    <th className="px-4 py-2.5 text-right">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {folders.map((folder) => (
                    <tr key={folder.path} className="hover:bg-subtle">
                      <td className="px-4 py-2">
                        <button type="button" onClick={() => setPath(folder.path)} className="focus-ring flex items-center gap-2.5 rounded font-semibold">
                          <Folder className="h-5 w-5 shrink-0 text-amber-500" fill="currentColor" fillOpacity={0.2} aria-hidden="true" />
                          <span className="truncate">{folder.name}</span>
                        </button>
                      </td>
                      <td className="muted px-4 py-2">{folder.items} item{folder.items === 1 ? "" : "s"}</td>
                      <td className="muted px-4 py-2">{new Date(folder.modifiedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        {!picking ? (
                          <div className="flex justify-end gap-1">
                            <ActionButton icon={Pencil} label={`Rename folder ${folder.name}`} onClick={() => setDialog({ type: "rename", item: { ...folder, folder: true } })} />
                            <ActionButton icon={FolderInput} label={`Move folder ${folder.name}`} onClick={() => setDialog({ type: "move", item: { ...folder, folder: true } })} />
                            <ActionButton icon={Trash2} danger label={`Delete folder ${folder.name}`} onClick={() => setDialog({ type: "delete", item: { ...folder, folder: true } })} />
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                  {files.map((file) => {
                    const disabled = picking && !canPick(file);
                    return (
                      <tr key={file.path} className={`hover:bg-subtle ${disabled ? "opacity-40" : ""}`}>
                        <td className="px-4 py-2">
                          <button type="button" onClick={() => openFile(file)} disabled={disabled} className="focus-ring flex min-w-0 items-center gap-2.5 rounded text-left font-semibold">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-subtle">
                              <FileThumb file={file} />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate">{file.name}</span>
                              {results && file.path.includes("/") ? <span className="muted block truncate text-xs font-normal">{file.path.split("/").slice(0, -1).join(" / ")}</span> : null}
                            </span>
                          </button>
                        </td>
                        <td className="muted px-4 py-2 whitespace-nowrap">
                          {formatBytes(file.bytes)}
                          {file.width ? ` · ${file.width}×${file.height}` : ""}
                        </td>
                        <td className="muted px-4 py-2 whitespace-nowrap">{new Date(file.modifiedAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          {!picking ? (
                            <div className="flex justify-end gap-1">
                              <ActionButton icon={Copy} label={`Copy link to ${file.name}`} onClick={() => copyLink(file)} />
                              <ActionButton icon={ExternalLink} label={`Open ${file.name}`} onClick={() => window.open(assetUrl(file.url), "_blank", "noopener,noreferrer")} />
                              <ActionButton icon={Pencil} label={`Rename ${file.name}`} onClick={() => setDialog({ type: "rename", item: file })} />
                              <ActionButton icon={FolderInput} label={`Move ${file.name}`} onClick={() => setDialog({ type: "move", item: file })} />
                              <ActionButton icon={Trash2} danger label={`Delete ${file.name}`} onClick={() => setDialog({ type: "delete", item: file })} />
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : null}
      </div>

      {dragging ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-[var(--accent-soft)] backdrop-blur-[1px]">
          <span className="flex items-center gap-2 rounded-xl bg-[var(--surface)] px-4 py-3 text-sm font-bold shadow-lg">
            <Upload className="h-4 w-4 text-accent" aria-hidden="true" />
            Drop to upload into {data?.breadcrumb?.length ? data.breadcrumb[data.breadcrumb.length - 1].name : "Library"}
          </span>
        </div>
      ) : null}

      <NameDialog
        open={dialog?.type === "folder"}
        title="New Folder"
        label="Folder name"
        submitLabel="Create Folder"
        onClose={() => setDialog(null)}
        onSubmit={(name) => run(() => createFolder(path, name), "Folder created.")}
      />
      <NameDialog
        open={dialog?.type === "rename"}
        title={`Rename ${dialog?.item?.folder ? "folder" : "file"}`}
        label={dialog?.item?.folder ? "Folder name" : "File name (the extension stays the same)"}
        initial={dialog?.item ? (dialog.item.folder ? dialog.item.name : dialog.item.name.replace(/\.[^.]+$/, "")) : ""}
        submitLabel="Rename"
        onClose={() => setDialog(null)}
        onSubmit={(name) => run(() => renameItem(dialog.item.path, name, Boolean(dialog.item.folder)), "Renamed.")}
      />
      <MoveDialog open={dialog?.type === "move"} item={dialog?.item} onClose={() => setDialog(null)} onMove={(to) => run(() => moveItem(dialog.item.path, to), "Moved.")} />
      <Dialog
        open={dialog?.type === "delete"}
        title={`Delete ${dialog?.item?.folder ? "folder" : "file"}?`}
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" onClick={() => setDialog(null)} className="btn btn-secondary focus-ring h-10 px-4">
              Cancel
            </button>
            <button type="button" onClick={() => run(() => deleteItem(dialog.item.path, Boolean(dialog.item.folder)), "Deleted.")} className="btn focus-ring h-10 bg-red-600 px-4 text-white hover:bg-red-700">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm">
          <strong>{dialog?.item?.name}</strong>
          {dialog?.item?.folder ? ` and everything inside it (${dialog.item.items} item${dialog.item.items === 1 ? "" : "s"})` : ""} will be permanently deleted.
        </p>
        <p className="muted mt-2 text-sm">If this file is used on the website, links and images pointing to it will stop working.</p>
      </Dialog>
    </div>
  );
}
