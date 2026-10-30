import { useCallback, useRef, useState } from "react";
import { Ban, ChevronDown, Search } from "lucide-react";
import useDismiss from "../../hooks/useDismiss";
import { NAV_ICONS } from "./icons";

export default function IconPicker({ value, onChange, label = "Icon", icons = NAV_ICONS }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, ref, close);
  const Current = icons[value];
  const entries = Object.entries(icons);
  const searchable = entries.length > 30;
  const term = query.trim().toLowerCase();
  const shown = term ? entries.filter(([name]) => name.toLowerCase().includes(term)) : entries;

  const choose = (name) => {
    onChange(name);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative">
      <span className="field-label">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="field mt-1.5 flex items-center justify-between gap-2 px-3"
        title={value || "No icon"}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-accent">
            {Current ? <Current className="h-4 w-4" aria-hidden="true" /> : <Ban className="h-4 w-4 text-soft" aria-hidden="true" />}
          </span>
          <span className="truncate text-xs">{value || "None"}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-soft" aria-hidden="true" />
      </button>

      {open ? (
        <div className="menu-panel absolute left-0 z-30 mt-2 w-[19rem] rounded-xl p-2" role="listbox" aria-label="Choose an icon">
          {searchable ? (
            <label className="relative mb-2 block">
              <span className="sr-only">Search icons</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search icons…"
                className="field h-9 pl-9 pr-3"
              />
            </label>
          ) : null}
          <div className="grid max-h-64 grid-cols-6 gap-1 overflow-y-auto">
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => choose("")}
              className={`focus-ring flex h-10 items-center justify-center rounded-lg ${!value ? "bg-accent text-white" : "hover:bg-subtle"}`}
              title="No icon"
            >
              <Ban className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">No icon</span>
            </button>
            {shown.map(([name, Icon]) => (
              <button
                key={name}
                type="button"
                role="option"
                aria-selected={value === name}
                onClick={() => choose(name)}
                className={`focus-ring flex h-10 items-center justify-center rounded-lg ${value === name ? "bg-accent text-white" : "hover:bg-subtle"}`}
                title={name}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{name}</span>
              </button>
            ))}
          </div>
          {term && !shown.length ? <p className="muted px-2 py-3 text-center text-xs">No icons match “{query}”.</p> : null}
        </div>
      ) : null}
    </div>
  );
}
