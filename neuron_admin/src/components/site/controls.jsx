import { useId } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

export function SettingsCard({ icon: Icon, title, description, actions, children, className = "" }) {
  return (
    <section className={`panel rounded-2xl p-5 sm:p-6 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
          <div>
            <h2 className="text-base font-bold">{title}</h2>
            {description ? <p className="muted mt-0.5 text-sm">{description}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Input({ label, hint, value, onChange, className = "", maxLength = 120, ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        className="field mt-1.5 px-3.5"
        value={value ?? ""}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...props}
      />
      {hint ? (
        <p id={`${id}-hint`} className="muted mt-1 text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({ label, hint, value, onChange, className = "", maxLength = 400, rows = 3 }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="field mt-1.5 h-auto px-3.5 py-2.5 leading-relaxed"
        value={value ?? ""}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="muted mt-1 flex justify-between gap-2 text-xs">
        <span>{hint}</span>
        <span>
          {(value || "").length}/{maxLength}
        </span>
      </p>
    </div>
  );
}

export function Select({ label, value, onChange, options, className = "" }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} className="field mt-1.5 px-3" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Toggle({ checked, onChange, label, description, className = "" }) {
  const id = useId();
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold">
          {label}
        </label>
        {description ? <p className="muted mt-0.5 text-xs">{description}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`focus-ring relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-line"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export function ColorField({ label, value, onChange }) {
  const id = useId();
  const valid = /^#[0-9a-f]{6}$/i.test(value || "");
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} picker`}
          value={valid ? value : "#000000"}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="h-11 w-12 shrink-0 cursor-pointer rounded-xl border border-line bg-surface p-1"
        />
        <input
          id={id}
          className={`field px-3 font-mono uppercase ${valid ? "" : "border-red-400 focus:border-red-500"}`}
          value={value || ""}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => {
            const raw = event.target.value.trim();
            onChange(raw.startsWith("#") ? raw : `#${raw}`);
          }}
          aria-invalid={!valid}
        />
      </div>
    </div>
  );
}

export function ItemActions({ index, count, visible, onMove, onToggle, onRemove, label }) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button
        type="button"
        className="icon-btn focus-ring h-8 w-8 disabled:opacity-30"
        disabled={index === 0}
        onClick={() => onMove(-1)}
        aria-label={`Move ${label} up`}
        title="Move up"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="icon-btn focus-ring h-8 w-8 disabled:opacity-30"
        disabled={index === count - 1}
        onClick={() => onMove(1)}
        aria-label={`Move ${label} down`}
        title="Move down"
      >
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {onToggle ? (
        <button
          type="button"
          className="icon-btn focus-ring h-8 w-8"
          onClick={onToggle}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          aria-pressed={!visible}
          title={visible ? "Visible on website (click to hide)" : "Hidden from website (click to show)"}
        >
          {visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4 text-soft" aria-hidden="true" />}
        </button>
      ) : null}
      <button
        type="button"
        className="icon-btn focus-ring h-8 w-8 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
        onClick={onRemove}
        aria-label={`Delete ${label}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function AddButton({ children, onClick, disabled, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="btn btn-secondary focus-ring h-10 px-4"
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  );
}

export function HiddenBadge() {
  return (
    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.6875rem] font-semibold text-amber-700 dark:text-amber-300">
      Hidden
    </span>
  );
}

export function confirmDelete(name) {
  return window.confirm(`Delete "${name || "this entry"}"? It is removed from the website when you save.`);
}
