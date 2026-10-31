import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_ICONS } from "../../config/navIcons";
import { cx } from "../../utils/cx";
import AccessibilityPopup from "../common/AccessibilityPopup";
import Logo from "../common/Logo";
import PendingLink from "../common/PendingLink";
import SkipLink from "../common/SkipLink";
import { useTheme } from "../../hooks/useTheme";
import { useSiteSettings, visibleOnly } from "../../hooks/useSiteSettings";
import MobileMenu from "./MobileMenu";

export function headerPalette(colors, isDark) {
  return {
    "--hdr-bg": isDark ? colors.backgroundDark : colors.background,
    "--hdr-text": isDark ? colors.textDark : colors.text,
    "--hdr-accent": isDark ? colors.accentDark : colors.accent,
  };
}

// Legacy and alternate URLs that should highlight the same menu entry.
const ROUTE_ALIASES = [
  ["/about", "/about-us"],
  ["/why-associate", "/why-associate-with-us", "/about/why-associate"],
  ["/team", "/about/team", "/our-team", "/about-us/team", "/stakeholders"],
  ["/insights/video", "/insights/tv-media", "/insights/youtube"],
  ["/advisory/investment-advisory", "/investment-advisory"],
  ["/advisory/family-office", "/family-office", "/family-office-family-cfo"],
  ["/advisory/nri-advisory", "/nri-advisory", "/nri-oci-advisory"],
  ["/services/nri-returning-to-india", "/services/nris-returning-to-india", "/nri-returning-to-india", "/nris-returning-to-india"],
  ["/services/global-indians", "/global-indians"],
  ["/services/global-citizens-in-india", "/global-citizens-in-india"],
  ["/services/global-investor", "/global-investor"],
  ["/services/founders-and-entrepreneurs", "/services/founders-and-enterpreneurs", "/founders-and-entrepreneurs", "/founders-and-enterpreneurs"],
  ["/services/professionals-and-cxos", "/professionals-and-cxos"],
];

function isPathWithin(href, path) {
  return Boolean(href) && href.startsWith("/") && (href === path || (href !== "/" && path.startsWith(`${href}/`)));
}

function isSubmenuChildActive(href, path) {
  if (href === path) return true;
  const group = ROUTE_ALIASES.find((aliases) => aliases.includes(href));
  if (group) {
    const exactOnly = group[0] === "/about";
    return group.some((alias) => alias === path || (!exactOnly && path.startsWith(`${alias}/`)));
  }
  return isPathWithin(href, path);
}

function isTopLevelActive(href, path) {
  if (isPathWithin(href, path)) return true;
  if (href === "/about") {
    return ["/about-us", "/why-associate", "/team"].some((root) => isSubmenuChildActive(root, path));
  }
  return false;
}

function dropdownPosition(item, index, count) {
  if (item.layout === "grid") {
    return "w-[min(46rem,calc(100vw-2rem))] xl:w-[720px] -right-[140px] xl:-right-[180px] 2xl:-right-[140px]";
  }
  return index < count / 2
    ? "w-[min(24rem,calc(100vw-2rem))] sm:w-[380px] left-0"
    : "w-[min(26rem,calc(100vw-2rem))] sm:w-[380px] right-0 xl:-right-[30px]";
}

function DropdownPanel({ item, onSelect }) {
  const isGrid = item.layout === "grid";
  const hasPlaque = Boolean(item.menuTitle || item.menuSubtitle);

  return (
    <div className="overflow-hidden rounded-md border border-[#DCE4E8] bg-[color:var(--hdr-bg)] shadow-[0_20px_50px_-12px_rgba(16,42,64,0.22)] dark:border-white/15 whitespace-normal">
      {hasPlaque ? (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 px-4 py-2.5 bg-slate-50/70 dark:bg-white/[0.02]">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {item.menuTitle}
          </span>
          <span className="text-[0.6875rem] font-semibold text-brand-blue dark:text-sky-400">{item.menuSubtitle}</span>
        </div>
      ) : null}

      <div className={isGrid ? "grid grid-cols-1 sm:grid-cols-2 gap-2 p-3" : "flex flex-col gap-1 p-2"}>
        {item.children.map((subItem) => {
          const Icon = NAV_ICONS[subItem.icon];
          return (
            <PendingLink
              key={subItem.id}
              item={subItem}
              onClick={onSelect}
              className={cx(
                "group/item flex min-w-0 w-full items-center gap-3 rounded-xl p-2.5 transition-all cursor-pointer",
                subItem.current
                  ? "bg-blue-50/90 text-brand-blue dark:bg-sky-500/20 dark:text-sky-300 font-semibold"
                  : "text-slate-800 hover:bg-slate-100/80 hover:text-brand-blue dark:text-slate-100 dark:hover:bg-white/[0.08] dark:hover:text-sky-300",
              )}
            >
              {Icon ? (
                <div
                  className={cx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                    subItem.current
                      ? "bg-brand-blue text-white shadow-xs dark:bg-sky-500"
                      : "bg-slate-100 text-slate-600 group-hover/item:bg-brand-blue group-hover/item:text-white dark:bg-white/10 dark:text-slate-300 dark:group-hover/item:bg-sky-500 dark:group-hover/item:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
              ) : null}

              <div className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cx(
                    "font-bold leading-snug tracking-tight transition-colors",
                    isGrid ? "text-[0.875rem]" : "text-[0.84375rem]",
                    subItem.current
                      ? "text-brand-blue dark:text-sky-300"
                      : "text-[color:var(--hdr-text)] group-hover/item:text-brand-blue dark:group-hover/item:text-sky-300",
                  )}
                >
                  {subItem.label}
                </span>
              </div>

              {!isGrid && subItem.current ? (
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-brand-green shadow-[0_0_8px_rgba(90,186,71,0.6)]"
                  aria-hidden="true"
                />
              ) : null}
            </PendingLink>
          );
        })}
      </div>
    </div>
  );
}

const NAV_ITEM_CLASS =
  "relative inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-[0.875rem] font-medium tracking-normal transition-colors focus-ring 2xl:px-3 2xl:text-[0.9375rem]";
const NAV_ITEM_ACTIVE = "text-[color:var(--hdr-accent)] font-bold";
const NAV_ITEM_IDLE = "text-[color:var(--hdr-text)] hover:text-[color:var(--hdr-accent)]";

function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-2.5 bottom-0.5 h-[2.5px] rounded-full bg-[color:var(--hdr-accent)]" />;
}

export default function Header() {
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();
  const headerSettings = useSiteSettings("header");
  const palette = headerPalette(headerSettings.colors, isDark);

  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const headerBarRef = useRef(null);
  const [barDimensions, setBarDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = headerBarRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w > 0 && h > 0) {
        setBarDimensions((prev) =>
          Math.abs(prev.width - w) < 0.5 && Math.abs(prev.height - h) < 0.5
            ? prev
            : { width: w, height: h }
        );
      }
    };

    measure();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });
    ro.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrolled]);

  const strokeW = 2;
  const pad = strokeW / 2;
  const W = barDimensions.width;
  const H = barDimensions.height;
  const r = Math.max(0, (H - strokeW) / 2);
  const capCenter = H / 2;

  const pillPathD =
    W > H && H > 0
      ? `M ${capCenter} ${pad} L ${W - capCenter} ${pad} A ${r} ${r} 0 0 1 ${W - capCenter} ${H - pad} L ${capCenter} ${H - pad} A ${r} ${r} 0 0 1 ${capCenter} ${pad} Z`
      : "";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleDropdownEnter = useCallback((key) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  }, []);

  const handleDropdownLeave = useCallback((key) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((prev) => (prev === key ? null : prev));
    }, 120);
  }, []);

  const closeDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = visibleOnly(headerSettings.items).map((item) => {
    const children = visibleOnly(item.children).map((child) => ({
      ...child,
      available: true,
      current: isSubmenuChildActive(child.href, pathname),
    }));
    return {
      ...item,
      key: item.id || item.label,
      available: true,
      current: isTopLevelActive(item.href, pathname) || children.some((child) => child.current),
      children: children.length ? children : undefined,
    };
  });

  useEffect(() => {
    closeDropdown();
  }, [pathname, closeDropdown]);

  useEffect(() => {
    if (!openDropdown) return undefined;
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) {
        closeDropdown();
      }
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      // If focus is on a link inside the open dropdown, hand it back to that dropdown's button.
      const wrapper = document.activeElement?.closest?.("[data-nav-dropdown]");
      closeDropdown();
      wrapper?.querySelector("button")?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown, closeDropdown]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const update = () => {
      const height = header.offsetHeight;
      const root = document.documentElement;
      root.style.setProperty("--header-height", `${height}px`);
      const stored = parseFloat(root.style.getPropertyValue("--header-clearance")) || 0;
      if (height >= stored) {
        root.style.setProperty("--header-clearance", `${height}px`);
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SkipLink />
      <header
        id="site-header"
        ref={headerRef}
        style={palette}
        className={cx(
          "sticky top-0 z-50 font-manrope transition-all duration-300",
          scrolled
            ? "pointer-events-none bg-transparent pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 border-b-0 shadow-none"
            : "pointer-events-auto bg-[color:var(--hdr-bg)] border-b border-[#DCE4E8] dark:border-white/10 pt-0 px-0 shadow-none",
        )}
      >
        <div
          ref={headerBarRef}
          id="site-header-bar"
          className={cx(
            "pointer-events-auto relative z-40 mx-auto transition-all duration-300",
            scrolled
              ? "w-full rounded-full border-0 shadow-[0_16px_38px_-10px_rgba(16,42,64,0.16)] dark:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.6)]"
              : "w-full rounded-none border-0 bg-transparent shadow-none",
          )}
          style={{
            maxWidth: "var(--site-bar)",
            backgroundColor: scrolled ? "var(--hdr-bg)" : undefined,
          }}
        >
          {scrolled && W > 0 && H > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="pill-progress-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={palette["--hdr-accent"]} floodOpacity="0.45" />
                </filter>
              </defs>
              <path
                d={pillPathD}
                stroke={isDark ? "rgba(255,255,255,0.14)" : "rgba(220,228,232,0.95)"}
                strokeWidth={1.5}
                fill="none"
              />
              <motion.path
                d={pillPathD}
                fill="none"
                stroke={palette["--hdr-accent"]}
                strokeWidth={strokeW}
                strokeLinecap="round"
                filter="url(#pill-progress-glow)"
                style={{ pathLength }}
                className="transition-colors duration-200"
              />
            </svg>
          )}

          <div
            className={cx(
              "relative z-10 flex items-center gap-4 transition-all duration-300",
              scrolled
                ? "h-[62px] sm:h-[66px] px-4 sm:px-6 xl:px-8"
                : "h-[72px] sm:h-[78px] px-4 sm:px-6",
            )}
          >
            <Logo
              priority
              className="shrink-0"
              imgClassName={
                scrolled
                  ? "!h-[44px] sm:!h-[48px] lg:!h-[52px] xl:!h-[54px] transition-all duration-300"
                  : "!h-[50px] sm:!h-[56px] lg:!h-[60px] xl:!h-[62px] transition-all duration-300"
              }
            />
            <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 xl:flex items-center justify-end">
              <ul className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2.5 whitespace-nowrap">
                {items.map((item, index) => {
                  const isOpen = openDropdown === item.key;

                  return (
                    <li key={item.key} className="relative">
                      {item.children ? (
                        <div
                          className="relative"
                          data-nav-dropdown
                          onMouseEnter={() => handleDropdownEnter(item.key)}
                          onMouseLeave={() => handleDropdownLeave(item.key)}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              handleDropdownLeave(item.key);
                            }
                          }}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (dropdownTimeoutRef.current) {
                                clearTimeout(dropdownTimeoutRef.current);
                                dropdownTimeoutRef.current = null;
                              }
                              setOpenDropdown((prev) => (prev === item.key ? null : item.key));
                            }}
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            className={cx(NAV_ITEM_CLASS, "gap-1 cursor-pointer", item.current || isOpen ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE)}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cx(
                                "h-4 w-4 transition-transform duration-200 opacity-80",
                                isOpen && "rotate-180 opacity-100",
                              )}
                              aria-hidden="true"
                            />
                            {item.current ? <ActiveBar /> : null}
                          </button>

                          <div
                            className={cx(
                              "absolute top-full z-50 pt-2 transition-all duration-200 whitespace-normal",
                              dropdownPosition(item, index, items.length),
                              isOpen
                                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                                : "invisible -translate-y-2 opacity-0 pointer-events-none",
                            )}
                          >
                            {/* Hover bridge so moving the pointer into the panel keeps it open */}
                            <div className="absolute -top-3 inset-x-0 h-3 pointer-events-auto" aria-hidden="true" />
                            <DropdownPanel item={item} onSelect={closeDropdown} />
                          </div>
                        </div>
                      ) : (
                        <PendingLink item={item} className={cx(NAV_ITEM_CLASS, item.current ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE)}>
                          {item.label}
                          {item.current ? <ActiveBar /> : null}
                        </PendingLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="ml-auto xl:hidden flex shrink-0 items-center pl-2">
              <button
                ref={menuButtonRef}
                type="button"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-[color:var(--hdr-text)] shadow-sm transition-colors hover:border-[#54B848] hover:bg-[#54B848] hover:text-white focus-ring dark:border-white/15 dark:bg-white/5"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[5px]">
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-3.5 rounded-full bg-current transition-all duration-200 group-hover:w-5" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <AccessibilityPopup />
      <MobileMenu open={menuOpen} onClose={closeMenu} items={items} palette={palette} returnFocusRef={menuButtonRef} />
    </>
  );
}
