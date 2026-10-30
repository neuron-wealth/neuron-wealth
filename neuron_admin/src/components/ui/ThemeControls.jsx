import { useRef, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { ACCENTS, useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import useDismiss from "../../hooks/useDismiss";

function OptionButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`focus-ring inline-flex h-11 items-center gap-2 rounded-xl border px-3.5 text-sm font-semibold transition-colors ${
        active ? "border-accent bg-[var(--accent-soft)] text-accent" : "border-line hover:bg-subtle"
      }`}
    >
      {children}
    </button>
  );
}

export default function ThemeControls({ variant = "icons" }) {
  const { mode, accent, setMode, setAccent } = useTheme();
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useDismiss(open, menuRef, () => setOpen(false));

  const chooseMode = (next) => {
    setMode(next);
    push(next === "dark" ? "Dark mode on." : "Light mode on.", "success");
  };

  const chooseAccent = (item) => {
    setAccent(item.id);
    push(`${item.label} theme applied.`, "success");
    setOpen(false);
  };

  const currentAccent = ACCENTS.find((a) => a.id === accent) || ACCENTS[0];

  // Settings Panel Layout
  if (variant === "panel") {
    return (
      <div className="space-y-5">
        <div>
          <p className="field-label">Mode</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <OptionButton active={mode === "light"} onClick={() => chooseMode("light")}>
              <Sun className="h-4 w-4" aria-hidden="true" />
              Light
            </OptionButton>
            <OptionButton active={mode === "dark"} onClick={() => chooseMode("dark")}>
              <Moon className="h-4 w-4" aria-hidden="true" />
              Dark
            </OptionButton>
          </div>
        </div>
        <div>
          <p className="field-label">Accent Colour</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Accent colour">
            {ACCENTS.map((item) => (
              <OptionButton key={item.id} active={accent === item.id} onClick={() => chooseAccent(item)}>
                <span
                  className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-transparent"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
                {item.label}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Unified Single Control in Topbar (Combined Dark Mode + Theme Accent)
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="icon-btn focus-ring relative"
        aria-label="Theme & Appearance"
        title="Theme & Appearance Settings"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {mode === "dark" ? (
          <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
        <span
          className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full ring-1 ring-white dark:ring-surface"
          style={{ background: currentAccent.color }}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="menu-panel absolute right-0 z-50 mt-2 w-60 rounded-2xl p-2.5 shadow-lift"
        >
          {/* Section 1: Appearance Mode (Light / Dark) */}
          <div className="px-1 pt-1 pb-2">
            <p className="muted pb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider">
              Mode
            </p>
            <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-subtle p-1">
              <button
                type="button"
                onClick={() => chooseMode("light")}
                className={`focus-ring flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  mode === "light"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-soft hover:text-ink"
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => chooseMode("dark")}
                className={`focus-ring flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  mode === "dark"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-soft hover:text-ink"
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="my-1 h-px bg-line" aria-hidden="true" />

          {/* Section 2: Accent Theme Colors */}
          <div className="px-1 pt-1.5 pb-1">
            <p className="muted pb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider">
              Theme Colour
            </p>
            <div className="space-y-0.5">
              {ACCENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={accent === item.id}
                  onClick={() => chooseAccent(item)}
                  className={`focus-ring flex h-9 w-full items-center gap-2.5 rounded-xl px-2.5 text-xs font-semibold transition-colors ${
                    accent === item.id
                      ? "bg-[var(--accent-soft)] text-accent font-bold"
                      : "text-ink hover:bg-subtle"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/10 shrink-0"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {accent === item.id ? (
                    <Check className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
