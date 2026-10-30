import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { moveItem, removeAt, replaceAt } from "../../../utils/list";

export default function StringListField({ field, value, onChange, multiline = false }) {
  const entries = Array.isArray(value) ? value : [];
  const full = entries.length >= field.max;
  const noun = multiline ? "Paragraph" : "Entry";

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="field-label">{field.label}</span>
        <span className="muted text-[0.6875rem]">
          {entries.length}/{field.max}
        </span>
      </div>
      <ul className="mt-1.5 space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="flex items-start gap-1.5">
            <span className="muted mt-3 w-5 shrink-0 text-right text-[0.6875rem] font-bold">{index + 1}</span>
            {multiline ? (
              <textarea
                rows={3}
                className="field h-auto min-w-0 flex-1 px-3 py-2 leading-relaxed"
                value={entry}
                maxLength={field.itemMax}
                aria-label={`${field.label} ${index + 1}`}
                onChange={(event) => onChange(replaceAt(entries, index, event.target.value))}
              />
            ) : (
              <input
                className="field h-10 min-w-0 flex-1 px-3"
                value={entry}
                maxLength={field.itemMax}
                aria-label={`${field.label} ${index + 1}`}
                onChange={(event) => onChange(replaceAt(entries, index, event.target.value))}
              />
            )}
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                className="icon-btn focus-ring h-10 w-8 disabled:opacity-30"
                disabled={index === 0}
                onClick={() => onChange(moveItem(entries, index, -1))}
                aria-label={`Move ${noun.toLowerCase()} ${index + 1} up`}
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-btn focus-ring h-10 w-8 disabled:opacity-30"
                disabled={index === entries.length - 1}
                onClick={() => onChange(moveItem(entries, index, 1))}
                aria-label={`Move ${noun.toLowerCase()} ${index + 1} down`}
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-btn focus-ring h-10 w-8 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                onClick={() => onChange(removeAt(entries, index))}
                aria-label={`Remove ${noun.toLowerCase()} ${index + 1}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          disabled={full}
          onClick={() => onChange([...entries, ""])}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-accent hover:bg-[var(--accent-soft)] disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add {noun}
        </button>
        {field.hint ? <p className="muted text-xs">{field.hint}</p> : null}
      </div>
    </div>
  );
}
