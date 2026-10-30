import { useId, useState } from "react";
import { X } from "lucide-react";

/** Chip list editor for categories and tags, with suggestions from existing posts. */
export default function TermsInput({ label, values, onChange, suggestions = [], max = 30, placeholder, hint, quickAdd = true }) {
  const inputId = useId();
  const listId = useId();
  const [text, setText] = useState("");
  const lower = new Set(values.map((value) => value.toLowerCase()));

  const add = (raw) => {
    const additions = String(raw)
      .split(",")
      .map((value) => value.replace(/\s+/g, " ").trim().slice(0, 60))
      .filter((value) => value && !lower.has(value.toLowerCase()));
    if (additions.length) onChange([...values, ...additions].slice(0, max));
    setText("");
  };

  const remove = (value) => onChange(values.filter((entry) => entry !== value));

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (text.trim()) add(text);
    } else if (event.key === "Backspace" && !text && values.length) {
      remove(values[values.length - 1]);
    }
  };

  const unused = suggestions.filter((value) => !lower.has(value.toLowerCase()));

  return (
    <div>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <div className="field mt-1.5 flex h-auto min-h-[2.75rem] flex-wrap items-center gap-1.5 px-2 py-1.5 focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
        {values.map((value) => (
          <span key={value} className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-soft)] py-0.5 pl-2 pr-1 text-xs font-semibold text-accent">
            {value}
            <button type="button" onClick={() => remove(value)} className="focus-ring rounded p-0.5 hover:bg-accent/15" aria-label={`Remove ${value}`}>
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          list={listId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => text.trim() && add(text)}
          placeholder={values.length >= max ? "" : placeholder}
          disabled={values.length >= max}
          className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm outline-none"
        />
        <datalist id={listId}>
          {unused.map((value) => (
            <option key={value} value={value} />
          ))}
        </datalist>
      </div>
      {quickAdd && unused.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {unused.slice(0, 12).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => add(value)}
              disabled={values.length >= max}
              className="focus-ring rounded-lg border border-dashed border-line px-2 py-0.5 text-[0.6875rem] font-semibold text-soft transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
              + {value}
            </button>
          ))}
        </div>
      ) : null}
      {hint ? <p className="muted mt-1.5 text-xs">{hint}</p> : null}
    </div>
  );
}
