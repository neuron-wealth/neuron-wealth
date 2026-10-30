import { useEffect, useRef, useState } from "react";
import { ImageUp, RotateCcw } from "lucide-react";
import Alert from "../../components/ui/Alert";
import { removeLogo, uploadLogo } from "../../services/siteService";
import { useToast } from "../../context/ToastContext";

const DEFAULT_PREFIX = "/api/uploads/";
const formatSize = (bytes) => (bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${Math.round(bytes / 1024)} KB`);

function readDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight, url });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("The file could not be read as an image."));
    };
    image.src = url;
  });
}

function checkRules(file, size, rules) {
  if (!rules.types.includes(file.type)) return "Logo must be a PNG, JPG or WEBP image.";
  if (file.size > rules.maxBytes) return `This file is ${formatSize(file.size)}. Logos must be ${formatSize(rules.maxBytes)} or smaller.`;
  const { width, height } = size;
  if (width < rules.minWidth || height < rules.minHeight) {
    return `This image is ${width}×${height} px. Use at least ${rules.minWidth}×${rules.minHeight} px.`;
  }
  if (width > rules.maxWidth || height > rules.maxHeight) {
    return `This image is ${width}×${height} px. Keep it within ${rules.maxWidth}×${rules.maxHeight} px.`;
  }
  const ratio = width / height;
  if (ratio < rules.minRatio || ratio > rules.maxRatio) {
    return `This image is ${ratio.toFixed(2)}:1. Use a horizontal logo between ${rules.minRatio}:1 and ${rules.maxRatio}:1.`;
  }
  return "";
}

export default function LogoCard({ variant, title, description, logo, background, displayHeight, rules, onSaved }) {
  const { push } = useToast();
  const inputRef = useRef(null);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isCustom = logo.url.startsWith(DEFAULT_PREFIX);

  useEffect(() => () => pending && URL.revokeObjectURL(pending.url), [pending]);

  const choose = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    try {
      const size = await readDimensions(file);
      const problem = checkRules(file, size, rules);
      if (problem) {
        URL.revokeObjectURL(size.url);
        setError(problem);
        return;
      }
      setPending({ file, ...size });
    } catch (err) {
      setError(err.message);
    }
  };

  const run = async (action, successMessage) => {
    setBusy(true);
    setError("");
    try {
      const result = await action();
      onSaved(result.settings);
      setPending(null);
      push(successMessage || result.message, "success");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const shown = pending ? pending.url : logo.url;

  return (
    <section className="panel rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          <p className="muted mt-0.5 text-sm">{description}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-subtle px-2.5 py-1 text-xs font-semibold text-soft">
          {isCustom ? "Custom logo" : "Original logo"}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-line">
        <div className="flex min-h-[7.5rem] items-center justify-center px-6 py-6" style={{ background }}>
          <img
            src={shown}
            alt={pending ? "New logo preview" : `${title} preview`}
            className="w-auto max-w-full object-contain"
            style={{ height: `${displayHeight}px` }}
          />
        </div>
        <p className="border-t border-line bg-subtle px-3 py-2 text-xs text-soft">
          {pending
            ? `New file: ${pending.file.name} · ${pending.width}×${pending.height} px · ${formatSize(pending.file.size)} — preview at the real display height of ${displayHeight} px`
            : `Shown at a fixed height of ${displayHeight} px${logo.width ? ` · source ${logo.width}×${logo.height} px` : ""}`}
        </p>
      </div>

      {error ? (
        <Alert tone="error" className="mt-4">
          {error}
        </Alert>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={rules.types.join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={choose}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {pending ? (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => uploadLogo(variant, pending.file))}
              className="btn btn-primary focus-ring h-10 px-4"
            >
              {busy ? "Uploading…" : "Save New Logo"}
            </button>
            <button type="button" disabled={busy} onClick={() => setPending(null)} className="btn btn-secondary focus-ring h-10 px-4">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className="btn btn-primary focus-ring h-10 px-4">
              <ImageUp className="h-4 w-4" aria-hidden="true" />
              Choose New Logo
            </button>
            {isCustom ? (
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  window.confirm(`Remove the custom ${title.toLowerCase()} and go back to the original logo?`) && run(() => removeLogo(variant))
                }
                className="btn btn-secondary focus-ring h-10 px-4"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Restore Original
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
