import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cx } from "../../utils/cx";

export default function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={cx(
        "group relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-300 focus-ring cursor-pointer select-none",
        isDark
          ? "bg-[#0b1c2e] border border-sky-400/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
          : "bg-slate-200/90 border border-slate-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] hover:bg-slate-300/60",
        className,
      )}
      aria-label={isDark ? "Dark mode ON. Click to switch to light mode." : "Light mode ON. Click to switch to dark mode."}
      title={isDark ? "Dark mode ON (click to switch to Light)" : "Light mode ON (click to switch to Dark)"}
    >
      {/* Background Track Indicators (Sun on left, Moon on right) */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-[0.625rem]" aria-hidden="true">
        <Sun
          className={cx(
            "h-3.5 w-3.5 transition-opacity duration-200",
            isDark ? "opacity-35 text-amber-400" : "opacity-0",
          )}
        />
        <Moon
          className={cx(
            "h-3.5 w-3.5 transition-opacity duration-200",
            isDark ? "opacity-0" : "opacity-40 text-slate-600",
          )}
        />
      </span>

      {/* Sliding Knob with Active State Icon */}
      <span
        className={cx(
          "pointer-events-none flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-out",
          isDark
            ? "translate-x-6 bg-sky-400 text-[#071320] shadow-[0_0_12px_rgba(56,189,248,0.5)]"
            : "translate-x-0 bg-white text-amber-500 shadow-sm",
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        ) : (
          <Sun className="h-3.5 w-3.5 fill-current text-amber-500" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
