import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_ICONS } from "../../config/navIcons";
import { useModal } from "../../hooks/useModal";
import Logo from "../common/Logo";
import PendingLink from "../common/PendingLink";
import { cx } from "../../utils/cx";

const INERT_IDS = [
  "skip-link",
  "site-top-bar",
  "site-header-bar",
  "main-content",
  "site-footer",
  "accessibility-preferences",
];

function initialExpanded(items) {
  const withChildren = items.filter((item) => item.children);
  return (withChildren.find((item) => item.current) || withChildren[0])?.key ?? null;
}

const ROW =
  "relative flex w-full min-h-14 items-center justify-between gap-3 rounded-2xl px-4 text-[1.0625rem] font-semibold transition-colors focus-ring";

function rowClass(active) {
  return cx(
    ROW,
    active
      ? "bg-[#54B848]/10 text-[color:var(--hdr-accent)]"
      : "text-[color:var(--hdr-text)] hover:bg-slate-100 dark:hover:bg-white/[0.06]",
  );
}

function ActiveBar({ active }) {
  return active ? <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-full bg-[#54B848]" /> : null;
}

export default function MobileMenu({ open, onClose, items, palette, returnFocusRef }) {
  const panelRef = useRef(null);
  const { pathname } = useLocation();
  const [expandedItem, setExpandedItem] = useState(() => initialExpanded(items));

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname]);

  useModal({
    open,
    onClose,
    panelRef,
    returnFocusRef,
    inertIds: INERT_IDS,
  });

  if (!open) return <div id="mobile-navigation" hidden />;

  return (
    <div ref={panelRef} className="fixed inset-0 z-[60]" style={palette}>
      <div className="mm-fade absolute inset-0 bg-[#071321]/60 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1}
        className="mm-slide absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto overscroll-contain bg-[color:var(--hdr-bg)] text-[color:var(--hdr-text)] shadow-2xl outline-none sm:rounded-l-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-brand-line bg-[color:var(--hdr-bg)] px-5 py-3 dark:border-white/10">
          <Logo className="shrink-0" imgClassName="!h-[46px]" />
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-[color:var(--hdr-text)] shadow-sm transition-colors hover:border-[#54B848] hover:bg-[#54B848] hover:text-white focus-ring dark:border-white/15 dark:bg-white/5"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="px-3 pt-4">
          <ul className="space-y-1">
            {items.map((item) =>
              item.children ? (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setExpandedItem((prev) => (prev === item.key ? null : item.key))}
                    className={cx(rowClass(item.current), "cursor-pointer")}
                    aria-expanded={expandedItem === item.key}
                  >
                    <ActiveBar active={item.current} />
                    {item.label}
                    <span
                      className={cx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        expandedItem === item.key ? "bg-[#54B848] text-white" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300",
                      )}
                    >
                      <ChevronDown className={cx("h-4 w-4 transition-transform duration-200", expandedItem === item.key && "rotate-180")} aria-hidden="true" />
                    </span>
                  </button>

                  {expandedItem === item.key ? (
                    <ul className="mb-2 mt-1 space-y-1 pl-4">
                      {item.children.map((subItem) => {
                        const Icon = NAV_ICONS[subItem.icon];
                        return (
                          <li key={subItem.id}>
                            <PendingLink
                              item={subItem}
                              className={cx(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium transition-colors focus-ring",
                                subItem.current
                                  ? "bg-blue-50/90 font-semibold text-brand-blue dark:bg-sky-500/20 dark:text-sky-300"
                                  : "hover:bg-slate-100 hover:text-brand-blue dark:hover:bg-white/[0.08] dark:hover:text-sky-300",
                              )}
                            >
                              {Icon ? (
                                <span
                                  className={cx(
                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                    subItem.current ? "bg-brand-blue text-white dark:bg-sky-500" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
                                  )}
                                >
                                  <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                              ) : null}
                              <span className="min-w-0 flex-1 leading-snug">{subItem.label}</span>
                              {subItem.current ? (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-green shadow-[0_0_8px_rgba(90,186,71,0.6)]" aria-hidden="true" />
                              ) : null}
                            </PendingLink>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.key}>
                  <PendingLink item={item} className={rowClass(item.current)}>
                    <ActiveBar active={item.current} />
                    {item.label}
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
                  </PendingLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="pb-6" aria-hidden="true" />
      </div>
    </div>
  );
}
