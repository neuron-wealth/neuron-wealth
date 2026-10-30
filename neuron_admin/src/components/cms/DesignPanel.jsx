import { Check, Palette } from "lucide-react";
import { ColorField, Input, Select } from "../site/controls";
import { useCmsMeta } from "./CmsMetaContext";

const SWATCHES = {
  default: "linear-gradient(135deg, #ffffff 0 50%, #102A40 50% 100%)",
  white: "#FFFFFF",
  ivory: "#F7F8F5",
  light: "#EAF1F7",
  navy: "#102A40",
  deep: "#071321",
};

function BackgroundPicker({ field, value, customColor, onChange }) {
  return (
    <div>
      <span className="field-label">{field.label}</span>
      <div className="mt-1.5 flex flex-wrap gap-2" role="radiogroup" aria-label={field.label}>
        {field.options.map((option) => {
          const active = value === option.value;
          const background = option.value === "custom" ? customColor || "#F7F8F5" : SWATCHES[option.value];
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={`focus-ring flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                active ? "border-accent bg-[var(--accent-soft)] text-ink" : "border-line bg-surface text-soft hover:border-accent hover:text-ink"
              }`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-black/10" style={{ background }}>
                {option.value === "custom" && !customColor ? <Palette className="h-3 w-3 text-[#15344F]" aria-hidden="true" /> : null}
                {active ? (
                  <Check
                    className={`h-3 w-3 ${["navy", "deep"].includes(option.value) ? "text-white" : "text-[#15344F]"}`}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                ) : null}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DesignPanel({ type, design, onChange }) {
  const meta = useCmsMeta();
  const fields = meta?.designFields || {};
  const keys = (type.design || []).filter((key) => fields[key]);
  const set = (key, value) => onChange({ ...design, [key]: value });

  if (!keys.length) return <p className="muted text-sm">This section uses a fixed design.</p>;

  return (
    <div className="space-y-4">
      {keys.includes("background") ? (
        <BackgroundPicker
          field={fields.background}
          value={design.background}
          customColor={design.background === "custom" ? design.backgroundColor : ""}
          onChange={(value) => set("background", value)}
        />
      ) : null}
      {keys.includes("backgroundColor") && design.background === "custom" ? (
        <div className="max-w-xs">
          <ColorField label={fields.backgroundColor.label} value={design.backgroundColor} onChange={(value) => set("backgroundColor", value)} />
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {keys
          .filter((key) => !["background", "backgroundColor", "anchor"].includes(key))
          .map((key) => (
            <Select key={key} label={fields[key].label} value={design[key]} options={fields[key].options} onChange={(value) => set(key, value)} />
          ))}
      </div>
      {keys.includes("anchor") ? (
        <Input
          label={fields.anchor.label}
          value={design.anchor}
          maxLength={fields.anchor.max}
          hint={fields.anchor.hint}
          spellCheck={false}
          onChange={(value) => set("anchor", value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
        />
      ) : null}
    </div>
  );
}
