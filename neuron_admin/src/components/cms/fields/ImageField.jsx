import { useEffect, useId, useRef, useState } from "react";
import { FolderOpen, ImageOff, ImagePlus, Maximize2, Trash2, Upload } from "lucide-react";
import { Input, Select } from "../../site/controls";
import { useToast } from "../../../context/ToastContext";
import { uploadImage } from "../../../services/pageService";
import { assetUrl } from "../../../config/site";
import { emptyImage, isSafeHref } from "../../../utils/cms";
import { useCmsMeta } from "../CmsMetaContext";
import MediaPickerDialog from "../../media/MediaPickerDialog";

const FIT_OPTIONS = [
  { value: "", label: "Section Default" },
  { value: "cover", label: "Cover (Fill & Crop)" },
  { value: "contain", label: "Contain (Show Whole Image)" },
];

const POSITION_OPTIONS = [
  { value: "", label: "Section Default" },
  { value: "center", label: "Centre" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

function SizeInput({ label, value, onChange, limits }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={limits.max}
          step={1}
          className="field pl-3.5 pr-10"
          value={value || ""}
          placeholder="Auto"
          onChange={(event) => onChange(Math.max(0, Math.min(limits.max, Math.round(Number(event.target.value) || 0))))}
        />
        <span className="muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">px</span>
      </div>
    </div>
  );
}

export default function ImageField({ field, value, onChange }) {
  const meta = useCmsMeta();
  const { push } = useToast();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [natural, setNatural] = useState(null);
  const [broken, setBroken] = useState(false);
  const [picking, setPicking] = useState(false);
  const image = { ...emptyImage(), ...(value || {}) };
  const rules = meta?.image;
  const limits = meta?.limits?.imageSize || { min: 16, max: 2400 };
  const set = (changes) => onChange({ ...image, ...changes });
  const preview = assetUrl(image.url);
  const validUrl = isSafeHref(image.url) && !image.url.startsWith("#") && !/^(mailto|tel):/i.test(image.url);
  const tooSmall = (size) => size > 0 && size < limits.min;

  useEffect(() => {
    setBroken(false);
    setNatural(null);
  }, [image.url]);

  async function onFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (rules && !rules.types.includes(file.type)) {
      push("Choose a PNG, JPG, WEBP or GIF image.", "error");
      return;
    }
    if (rules && file.size > rules.maxBytes) {
      push(`Image must be ${rules.maxBytes / (1024 * 1024)} MB or smaller (this one is ${(file.size / (1024 * 1024)).toFixed(1)} MB).`, "error");
      return;
    }
    setUploading(true);
    try {
      const uploaded = await uploadImage(file);
      set({ url: uploaded.url, alt: image.alt || file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ") });
      push("Image uploaded. Save the page to publish it.", "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <fieldset className="rounded-xl border border-line bg-subtle p-3.5">
      <legend className="flex items-center gap-1.5 px-1 text-xs font-bold text-soft">
        <ImagePlus className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        {field.label}
      </legend>

      <div className="space-y-3">
        <div className="flex items-start gap-3.5">
          <div className="relative flex aspect-[4/3] w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-[repeating-conic-gradient(#e6ebef_0%_25%,#f7f9fa_0%_50%)] bg-[length:16px_16px] dark:bg-[repeating-conic-gradient(#1a3146_0%_25%,#132739_0%_50%)] sm:w-44">
            {preview && !broken ? (
              <img
                src={preview}
                alt=""
                className="h-full w-full object-contain"
                onLoad={(event) => setNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
                onError={() => setBroken(true)}
              />
            ) : (
              <span className="flex flex-col items-center gap-1 text-soft">
                <ImageOff className="h-6 w-6" aria-hidden="true" />
                <span className="text-[0.6875rem] font-semibold">{broken ? "Image not found" : "No image"}</span>
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="btn btn-secondary focus-ring h-9 px-3 text-xs">
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                {uploading ? "Uploading…" : image.url ? "Replace Image" : "Upload Image"}
              </button>
              <button type="button" onClick={() => setPicking(true)} className="btn btn-secondary focus-ring h-9 px-3 text-xs">
                <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Choose from Library
              </button>
              {image.url ? (
                <button
                  type="button"
                  onClick={() => set({ url: "", alt: "" })}
                  className="icon-btn focus-ring h-9 w-9 border border-line text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  aria-label={`Remove ${field.label}`}
                  title="Remove image"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
            {natural ? <p className="mt-2 text-xs font-semibold">Original size: {natural.width} × {natural.height} px</p> : null}
            {rules ? (
              <p className="muted mt-1 text-xs leading-relaxed">PNG, JPG, WEBP or GIF, up to {rules.maxBytes / (1024 * 1024)} MB.</p>
            ) : null}
          </div>
          <input ref={inputRef} type="file" accept={(rules?.types || ["image/png", "image/jpeg", "image/webp", "image/gif"]).join(",")} hidden onChange={onFile} />
        </div>

        <div className="min-w-0 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Image Address"
              value={image.url}
              maxLength={500}
              placeholder="/images/… or https://…"
              spellCheck={false}
              aria-invalid={!validUrl}
              onChange={(url) => set({ url: url.trim() })}
            />
            <Input label="Alt Text (Describe the Image)" value={image.alt} maxLength={200} onChange={(alt) => set({ alt })} />
          </div>
          {!validUrl ? <p className="text-xs font-semibold text-red-600 dark:text-red-400">Image address must start with "/" or "https://".</p> : null}

          {field.sizing ? (
            <div className="grid grid-cols-2 gap-3">
              <SizeInput label="Width" value={image.width} limits={limits} onChange={(width) => set({ width })} />
              <SizeInput label="Height" value={image.height} limits={limits} onChange={(height) => set({ height })} />
              <Select label="Fit" value={image.fit} options={FIT_OPTIONS} onChange={(fit) => set({ fit })} />
              <Select label="Focus Point" value={image.position} options={POSITION_OPTIONS} onChange={(position) => set({ position })} />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <Select label="Fit" value={image.fit} options={FIT_OPTIONS} onChange={(fit) => set({ fit })} />
              <Select label="Focus Point" value={image.position} options={POSITION_OPTIONS} onChange={(position) => set({ position })} />
            </div>
          )}

          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="muted text-xs leading-relaxed">
              {field.sizing
                ? image.width || image.height
                  ? `Fixed size: ${image.width ? `${image.width}px wide` : "automatic width"} × ${image.height ? `${image.height}px tall` : "automatic height"}.`
                  : "Width and height are automatic — the image adjusts to the layout on every screen."
                : field.hint || "This image fills its area automatically."}
            </p>
            {field.sizing && (image.width || image.height) ? (
              <button type="button" onClick={() => set({ width: 0, height: 0 })} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                Reset to Auto
              </button>
            ) : null}
          </div>
          {tooSmall(image.width) || tooSmall(image.height) ? (
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">Sizes must be 0 (auto) or at least {limits.min}px.</p>
          ) : null}
          {field.sizing && field.hint ? <p className="muted text-xs">{field.hint}</p> : null}
        </div>
      </div>
      <MediaPickerDialog
        open={picking}
        accept="image"
        onClose={() => setPicking(false)}
        onPick={(file) => set({ url: file.url, alt: image.alt || file.name.replace(/.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ") })}
      />
    </fieldset>
  );
}
