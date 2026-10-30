import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accessibility,
  Eye,
  BookOpen,
  Compass,
  Play,
  Square,
  Volume2,
  Mic,
  Sun,
  Moon,
  RotateCcw,
  X,
  Type,
  Maximize2,
  Contrast,
  ImageOff,
  MoveHorizontal,
  AlignJustify,
  MousePointer,
  Target,
  CircleDot,
  Link as LinkIcon,
  PauseCircle,
  Keyboard,
  Film,
  Subtitles,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { setFeatureAccess, useAccessibility } from "../../hooks/useAccessibility";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { useTheme } from "../../hooks/useTheme";
import { cx } from "../../utils/cx";

const TAB_FEATURES = {
  vision: ["theme", "textSize", "zoom", "colorFilter", "highContrast", "grayscale", "hideImages"],
  reading: ["textSpacing", "lineHeight", "letterSpacing", "underlineLinks", "dyslexia"],
  navigation: null,
  motion: ["reduceMotion", "stopAnimations", "pauseMedia"],
  speech: ["readAloud", "voiceNav"],
};

const ALL_TABS = [
  { id: "all", label: "All" },
  { id: "vision", label: "Vision" },
  { id: "reading", label: "Reading" },
  { id: "navigation", label: "Navigation" },
  { id: "motion", label: "Motion" },
  { id: "speech", label: "Speech" },
];

function withFullWidthLast(toggles) {
  return toggles.map((toggle, index) =>
    index === toggles.length - 1 && toggles.length % 2 === 1 ? { ...toggle, fullWidth: true } : toggle,
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const OPTION_ON =
  "border-brand-blue bg-blue-50 text-brand-blue font-bold dark:border-sky-400 dark:bg-sky-500/20 dark:text-sky-300";
const OPTION_OFF =
  "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300";

export default function AccessibilityPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const closeRef = useRef(null);
  const tabRefs = useRef({});
  const panelId = useId();
  const titleId = useId();
  const tabPanelId = useId();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    settings,
    updateSetting,
    toggleSetting,
    resetAll,
    readAloud,
    stopSpeech,
    nextSection,
    prevSection,
    currentSectionIndex,
    currentSectionName,
    totalSections,
    isSpeaking,
    spokenCaption,
    readerMessage,
    speechSupported,
    voiceActive,
    voiceTranscript,
  } = useAccessibility({
    navigate,
    onOpenPanel: () => setOpen(true),
    onClosePanel: () => setOpen(false),
  });

  const { isDark, setTheme } = useTheme();
  const widget = useSiteSettings("accessibility");
  const features = widget.features;
  const isOn = (key) => features[key] !== false;
  const TABS = ALL_TABS.filter(
    (tab) => tab.id === "all" || !TAB_FEATURES[tab.id] || TAB_FEATURES[tab.id].some(isOn),
  );
  const currentTab = TABS.some((tab) => tab.id === activeTab) ? activeTab : "all";
  const onLeft = widget.position === "left";

  useEffect(() => {
    setFeatureAccess(widget.enabled, widget.features);
  }, [widget.enabled, widget.features]);

  useEffect(() => {
    if (!widget.enabled) setOpen(false);
  }, [widget.enabled]);

  // Reading stops when the visitor moves to another page.
  useEffect(() => {
    stopSpeech();
  }, [pathname, stopSpeech]);

  // Escape, click-outside and focus trap while the panel is open.
  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(e) {
      if (panelRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    const focusTimer = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    if (!open) return undefined;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  const activeCount = Object.entries(settings).filter(([key, val]) => {
    if (typeof val === "boolean") return val;
    if (key === "textSize") return val !== "default";
    if (key === "zoom") return val !== "100";
    if (key === "colorFilter") return val !== "none";
    return false;
  }).length;

  const onTabKeyDown = (e) => {
    const index = TABS.findIndex((t) => t.id === currentTab);
    let next = null;
    if (e.key === "ArrowRight") next = TABS[(index + 1) % TABS.length];
    else if (e.key === "ArrowLeft") next = TABS[(index - 1 + TABS.length) % TABS.length];
    else if (e.key === "Home") next = TABS[0];
    else if (e.key === "End") next = TABS[TABS.length - 1];
    if (!next) return;
    e.preventDefault();
    setActiveTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const show = (tab) =>
    (currentTab === "all" || currentTab === tab) && (!TAB_FEATURES[tab] || TAB_FEATURES[tab].some(isOn));

  if (!widget.enabled) return null;

  const visionToggles = withFullWidthLast(
    [
      { key: "highContrast", icon: Contrast, label: "High Contrast" },
      { key: "grayscale", icon: CircleDot, label: "Grayscale" },
      { key: "hideImages", icon: ImageOff, label: "Hide Images" },
    ].filter((toggle) => isOn(toggle.key)),
  );
  const readingToggles = withFullWidthLast(
    [
      { key: "textSpacing", icon: MoveHorizontal, label: "Text Spacing" },
      { key: "lineHeight", icon: AlignJustify, label: "Line Height" },
      { key: "letterSpacing", icon: Type, label: "Letter Spacing" },
      { key: "underlineLinks", icon: LinkIcon, label: "Underline Links" },
      { key: "dyslexia", icon: Type, label: "Dyslexia Font" },
    ].filter((toggle) => isOn(toggle.key)),
  );
  const navigationToggles = [
    { key: "keyboardNav", icon: Keyboard, label: "Keyboard Nav" },
    { key: "focusHighlight", icon: Target, label: "Focus Highlight" },
    { key: "largeCursor", icon: MousePointer, label: "Large Cursor" },
    { key: "readingGuide", icon: AlignJustify, label: "Reading Guide" },
  ].filter((toggle) => isOn(toggle.key));
  const motionToggles = [
    { key: "reduceMotion", icon: PauseCircle, label: "Reduce Motion", hint: "No scroll, slide or parallax effects" },
    { key: "stopAnimations", icon: Square, label: "Stop Animations", hint: "Everything static, auto-play slides paused" },
    { key: "pauseMedia", icon: Film, label: "Pause Videos & Audio" },
  ].filter((toggle) => isOn(toggle.key));
  const hasVisionSizing = ["textSize", "zoom", "colorFilter", "highContrast", "grayscale", "hideImages"].some(isOn);

  const renderToggles = (toggles) =>
    toggles.map((toggle) => (
      <FeatureToggle
        key={toggle.key}
        icon={toggle.icon}
        label={toggle.label}
        hint={toggle.hint}
        active={settings[toggle.key]}
        onClick={() => toggleSetting(toggle.key)}
        fullWidth={toggle.fullWidth}
      />
    ));

  return (
    <>
      {open && <div className="a11y-ui fixed inset-0 z-[60] bg-black/20" aria-hidden="true" />}

      {settings.readingGuide && <ReadingGuide />}

      {settings.voiceNav && (
        <div
          className={cx(
            "a11y-ui fixed bottom-6 z-50 flex max-w-[calc(100vw-3rem)] items-center gap-2.5 rounded-full border border-brand-blue/30 bg-white/95 px-4 py-2 text-xs font-semibold text-brand-ink shadow-2xl backdrop-blur-md dark:border-sky-500/30 dark:bg-[#0b131e]/95 dark:text-white",
            onLeft ? "right-6" : "left-6",
          )}
          role="status"
        >
          <span className="relative flex h-3 w-3" aria-hidden="true">
            {voiceActive && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
            <span className={cx("relative inline-flex h-3 w-3 rounded-full", voiceActive ? "bg-emerald-500" : "bg-slate-400")} />
          </span>
          <Mic className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          <span className="max-w-xs truncate">{voiceTranscript || "Listening for commands…"}</span>
        </div>
      )}

      {isSpeaking && (
        <aside
          aria-label="Read aloud captions"
          className="a11y-ui pointer-events-auto fixed bottom-5 left-1/2 z-[110] w-[95vw] max-w-3xl -translate-x-1/2 rounded-2xl border border-sky-400/30 bg-[#071321]/95 p-4 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10 backdrop-blur-xl sm:bottom-7 sm:p-5"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/40 bg-emerald-500/25 px-2 py-0.5 text-[0.6875rem] font-black uppercase tracking-wider text-emerald-300">
                <Subtitles className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                CC &bull; Reading Aloud
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-400/30 bg-sky-500/20 px-2.5 py-0.5 text-[0.71875rem] font-bold text-sky-200">
                Section {currentSectionIndex + 1}/{totalSections} &bull; {currentSectionName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSection}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-slate-200 transition-colors hover:bg-white/20 hover:text-white focus-ring-inverse"
                aria-label="Previous section"
              >
                <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nextSection}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-slate-200 transition-colors hover:bg-white/20 hover:text-white focus-ring-inverse"
                aria-label="Next section"
              >
                <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={stopSpeech}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/40 bg-red-500/25 px-3 py-1.5 text-xs font-bold text-red-200 transition-colors hover:bg-red-500 hover:text-white focus-ring-inverse"
              >
                <Square className="h-3 w-3 fill-current" aria-hidden="true" />
                <span>Stop</span>
              </button>
            </div>
          </div>

          <p className="border-l-2 border-emerald-400 pl-3.5 text-sm font-semibold leading-relaxed text-slate-100 sm:text-base">
            {spokenCaption}
          </p>
          <p className="mt-2.5 text-[0.65625rem] text-slate-400">Press Esc to stop reading.</p>
        </aside>
      )}

      <div
        className={cx("a11y-ui fixed z-40 flex items-start", onLeft ? "left-0" : "right-0")}
        style={{ bottom: `${widget.offset}px`, "--a11y-btn": widget.buttonColor }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={cx(
            "group flex items-center gap-2 border-y px-3.5 py-3 shadow-xl transition-all duration-200 focus-ring",
            onLeft ? "rounded-r-2xl border-r" : "rounded-l-2xl border-l",
            "hover:border-[color:var(--a11y-btn)] hover:bg-[color:var(--a11y-btn)] hover:text-white",
            open
              ? "border-[color:var(--a11y-btn)] bg-[color:var(--a11y-btn)] text-white"
              : "border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white",
          )}
          aria-label="Accessibility & Display settings"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          title="Accessibility & Display Settings"
        >
          <div className="relative">
            <Accessibility className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            {activeCount > 0 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[0.625rem] font-bold text-white shadow-xs"
                aria-hidden="true"
              >
                {activeCount}
              </span>
            )}
          </div>
          <span className="hidden text-xs font-bold tracking-wide sm:inline">{widget.buttonLabel}</span>
          {activeCount > 0 && <span className="sr-only">{`, ${activeCount} active`}</span>}
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cx(
            onLeft ? "left-3" : "right-3",
            "a11y-ui fixed bottom-4 top-4 z-[70] my-auto h-fit max-h-[calc(100dvh-2rem)] w-[440px] max-w-[calc(100vw-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]",
            "border-slate-200 bg-white text-slate-800",
            "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:shadow-black/80",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-brand-blue dark:bg-sky-500/20 dark:text-sky-300">
                <Accessibility className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id={titleId} className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
                  Accessibility & Display
                </h2>
                <p className="text-[0.6875rem] text-slate-500 dark:text-slate-400">Inclusive browsing, vision, audio & motion suite</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                title="Reset all settings to default"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                aria-label="Close accessibility settings"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Setting categories"
            className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none"
            onKeyDown={onTabKeyDown}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                id={`${tabPanelId}-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={currentTab === tab.id}
                aria-controls={tabPanelId}
                tabIndex={currentTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={cx(
                  "shrink-0 rounded-full border px-3 py-1 font-semibold transition-all focus-ring",
                  currentTab === tab.id
                    ? "border-brand-blue bg-brand-blue text-white shadow-xs dark:border-sky-500 dark:bg-sky-500"
                    : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div id={tabPanelId} role="tabpanel" aria-labelledby={`${tabPanelId}-${currentTab}`}>
            {show("vision") && isOn("theme") && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                <GroupTitle icon={Sun} iconClass="text-amber-500">
                  Display Theme
                </GroupTitle>
                <div className="mt-2.5 grid grid-cols-2 gap-2" role="group" aria-label="Display theme">
                  <button
                    type="button"
                    aria-pressed={!isDark}
                    onClick={() => setTheme("light")}
                    className={cx(
                      "flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold shadow-xs transition-all focus-ring",
                      !isDark
                        ? "border-brand-blue bg-white font-bold text-brand-blue"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                    )}
                  >
                    <Sun className={cx("h-4 w-4", !isDark ? "text-amber-500" : "text-slate-400")} aria-hidden="true" />
                    <span>Light Mode</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={isDark}
                    onClick={() => setTheme("dark")}
                    className={cx(
                      "flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold shadow-xs transition-all focus-ring",
                      isDark
                        ? "border-sky-400 bg-sky-500/20 font-bold text-sky-300"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                    )}
                  >
                    <Moon className={cx("h-4 w-4", isDark ? "text-sky-300" : "text-slate-400")} aria-hidden="true" />
                    <span>Dark Mode</span>
                  </button>
                </div>
              </div>
            )}

            {show("vision") && hasVisionSizing && (
              <div className="mt-4 space-y-3">
                <GroupTitle icon={Eye} iconClass="text-brand-blue dark:text-sky-400">
                  Vision & Sizing
                </GroupTitle>

                {isOn("textSize") && (
                <OptionGroup label="Text Size">
                  {[
                    { id: "default", label: "Default", pct: "100%" },
                    { id: "large", label: "Large", pct: "+12%" },
                    { id: "larger", label: "X-Large", pct: "+25%" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={settings.textSize === item.id}
                      onClick={() => updateSetting("textSize", item.id)}
                      className={cx(
                        "flex flex-col items-center justify-center rounded-lg border py-2 text-xs shadow-xs transition-all focus-ring",
                        settings.textSize === item.id ? OPTION_ON : OPTION_OFF,
                      )}
                    >
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-[0.625rem] opacity-75">{item.pct}</span>
                    </button>
                  ))}
                </OptionGroup>
                )}

                {isOn("zoom") && (
                <OptionGroup label="Page Zoom">
                  {["100", "110", "120"].map((zoomVal) => (
                    <button
                      key={zoomVal}
                      type="button"
                      aria-pressed={settings.zoom === zoomVal}
                      onClick={() => updateSetting("zoom", zoomVal)}
                      className={cx(
                        "flex items-center justify-center gap-1 rounded-lg border py-2 text-xs font-semibold shadow-xs transition-all focus-ring",
                        settings.zoom === zoomVal ? OPTION_ON : OPTION_OFF,
                      )}
                    >
                      <Maximize2 className="h-3 w-3" aria-hidden="true" />
                      <span>{zoomVal}%</span>
                    </button>
                  ))}
                </OptionGroup>
                )}

                {isOn("colorFilter") && (
                <OptionGroup label="Color Filters" columns="grid-cols-4" aside="Palette & Shield">
                  {[
                    { id: "none", label: "None" },
                    { id: "invert", label: "Invert" },
                    { id: "sepia", label: "Warm" },
                    { id: "bluelight", label: "Shield" },
                  ].map((cf) => (
                    <button
                      key={cf.id}
                      type="button"
                      aria-pressed={settings.colorFilter === cf.id}
                      onClick={() => updateSetting("colorFilter", cf.id)}
                      className={cx(
                        "rounded-lg border py-1.5 text-center text-xs font-semibold shadow-xs transition-all focus-ring",
                        settings.colorFilter === cf.id ? OPTION_ON : OPTION_OFF,
                      )}
                    >
                      {cf.label}
                    </button>
                  ))}
                </OptionGroup>
                )}

                {visionToggles.length > 0 && <div className="grid grid-cols-2 gap-2">{renderToggles(visionToggles)}</div>}
              </div>
            )}

            {show("reading") && (
              <div className="mt-4 space-y-2.5">
                <GroupTitle icon={BookOpen} iconClass="text-brand-green">
                  Reading & Typography
                </GroupTitle>
                <div className="grid grid-cols-2 gap-2">{renderToggles(readingToggles)}</div>
              </div>
            )}

            {show("navigation") && (
              <div className="mt-4 space-y-2.5">
                <GroupTitle icon={Compass} iconClass="text-brand-blue dark:text-sky-400">
                  Navigation & Assist
                </GroupTitle>
                <div className="grid grid-cols-2 gap-2">
                  {renderToggles(withFullWidthLast(navigationToggles))}
                  {settings.keyboardNav && (
                    <p className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[0.6875rem] leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      Press <Kbd>H</Kbd> for the next heading, <Kbd>Shift</Kbd> + <Kbd>H</Kbd> for the previous heading and <Kbd>M</Kbd> to jump to the main content.
                    </p>
                  )}
                  <a
                    href="#main-content"
                    onClick={() => setOpen(false)}
                    className="col-span-2 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xs transition-all hover:border-brand-blue hover:text-brand-blue focus-ring dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-400"
                  >
                    <div>
                      <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">Skip to Content</span>
                      <span className="text-[0.625rem] text-slate-500 dark:text-slate-400">Jump directly to main content area</span>
                    </div>
                    <span className="text-xs font-bold text-brand-blue dark:text-sky-400" aria-hidden="true">
                      Jump ↵
                    </span>
                  </a>
                </div>
              </div>
            )}

            {show("motion") && (
              <div className="mt-4 space-y-2.5">
                <GroupTitle icon={PauseCircle} iconClass="text-amber-500">
                  Motion & Media
                </GroupTitle>
                <div className="space-y-2">{renderToggles(motionToggles.map((toggle) => ({ ...toggle, fullWidth: true })))}</div>
              </div>
            )}

            {show("speech") && (
              <div className="mt-4 space-y-3">
                <GroupTitle icon={Volume2} iconClass="text-brand-green">
                  Speech & Voice Control
                </GroupTitle>

                {isOn("readAloud") && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white">Read Page Aloud</h3>
                    {isSpeaking && (
                      <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold text-emerald-600 dark:text-emerald-400">
                        ● Reading
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[0.6875rem] text-slate-600 dark:text-slate-400">
                    Reads every section of this page in order, with captions, and scrolls to each section as it goes.
                  </p>

                  <button
                    type="button"
                    onClick={readAloud}
                    disabled={!speechSupported}
                    className={cx(
                      "mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-xs transition-all focus-ring disabled:cursor-not-allowed disabled:opacity-50",
                      isSpeaking
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-brand-blue text-white hover:bg-brand-dark dark:bg-sky-500 dark:hover:bg-sky-600",
                    )}
                  >
                    {isSpeaking ? (
                      <>
                        <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                        <span>Stop Reading</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                        <span>Read This Page Aloud</span>
                      </>
                    )}
                  </button>

                  {isSpeaking && (
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="truncate text-[0.6875rem] font-semibold text-slate-600 dark:text-slate-300">
                        {currentSectionIndex + 1}/{totalSections}:{" "}
                        <span className="font-bold text-slate-900 dark:text-white">{currentSectionName}</span>
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={prevSection}
                          className="inline-flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[0.65625rem] font-semibold text-slate-700 hover:bg-slate-100 focus-ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <SkipBack className="h-3 w-3" aria-hidden="true" />
                          <span>Prev</span>
                        </button>
                        <button
                          type="button"
                          onClick={nextSection}
                          className="inline-flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[0.65625rem] font-semibold text-slate-700 hover:bg-slate-100 focus-ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <span>Next</span>
                          <SkipForward className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )}

                  {(readerMessage || !speechSupported) && !isSpeaking && (
                    <p className="mt-2 text-[0.6875rem] font-medium text-slate-600 dark:text-slate-300" role="status">
                      {speechSupported ? readerMessage : "Read aloud is not supported in this browser."}
                    </p>
                  )}
                </div>
                )}

                {isOn("voiceNav") && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white">Voice Control</h3>
                    <button
                      type="button"
                      aria-pressed={settings.voiceNav}
                      onClick={() => toggleSetting("voiceNav")}
                      className={cx(
                        "rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold shadow-xs transition-colors focus-ring",
                        settings.voiceNav
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
                      )}
                    >
                      {settings.voiceNav ? "On" : "Turn On"}
                    </button>
                  </div>
                  <p className="mt-1 text-[0.6875rem] leading-relaxed text-slate-600 dark:text-slate-400">
                    Say &quot;read page&quot;, &quot;stop&quot;, &quot;next&quot;, &quot;previous section&quot;, &quot;scroll down&quot;,
                    &quot;scroll up&quot;, &quot;go to top&quot;, &quot;go to contact&quot;, &quot;dark mode&quot; or &quot;stop
                    listening&quot;. Needs microphone access.
                  </p>
                  {voiceTranscript && (
                    <p
                      className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-[0.6875rem] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                      role="status"
                    >
                      {voiceTranscript}
                    </p>
                  )}
                </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-3.5 dark:border-slate-700">
            <button
              type="button"
              onClick={resetAll}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-red-500/20 dark:hover:text-red-300"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset All Settings to Default</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function GroupTitle({ icon: Icon, iconClass, children }) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
      <Icon className={cx("h-3.5 w-3.5", iconClass)} aria-hidden="true" />
      <span>{children}</span>
    </h3>
  );
}

function OptionGroup({ label, aside, columns = "grid-cols-3", children }) {
  const id = useId();
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <span id={id} className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </span>
        {aside && <span className="text-[0.625rem] text-slate-500 dark:text-slate-400">{aside}</span>}
      </div>
      <div className={cx("mt-2 grid gap-1.5", columns)} role="group" aria-labelledby={id}>
        {children}
      </div>
    </div>
  );
}

function Kbd({ children }) {
  return (
    <kbd className="rounded border border-slate-300 bg-white px-1 font-sans text-[0.625rem] font-bold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
      {children}
    </kbd>
  );
}

/** Horizontal reading ruler that follows the mouse, touch and keyboard focus. */
function ReadingGuide() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    let y = window.innerHeight / 2;
    const place = () => {
      frame = 0;
      if (ref.current) ref.current.style.transform = `translateY(${y}px)`;
    };
    const setY = (value) => {
      y = value;
      if (!frame) frame = requestAnimationFrame(place);
    };
    const onMouse = (e) => setY(e.clientY);
    const onTouch = (e) => {
      const touch = e.touches[0];
      if (touch) setY(touch.clientY);
    };
    const onFocus = (e) => {
      const el = e.target;
      if (!(el instanceof Element) || el.closest(".a11y-ui")) return;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        setY(rect.top + rect.height / 2);
      });
    };
    place();
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="a11y-ui pointer-events-none fixed inset-x-0 top-0 z-[100] -mt-5 h-10 border-y-2 border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
      aria-hidden="true"
    />
  );
}

function FeatureToggle({ icon: Icon, label, hint, active, onClick, fullWidth = false }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        "flex items-center gap-2.5 rounded-xl border p-2.5 text-left shadow-xs transition-all focus-ring",
        fullWidth ? "col-span-2 w-full" : "",
        active
          ? "border-brand-blue bg-blue-50 font-semibold text-brand-blue dark:border-sky-400 dark:bg-sky-950/40 dark:text-sky-300"
          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
      )}
    >
      <span
        className={cx(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
          active ? "bg-brand-blue text-white dark:bg-sky-400 dark:text-slate-900" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
        )}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium leading-tight">{label}</span>
        <span className="block text-[0.625rem] text-slate-500 dark:text-slate-400" aria-hidden="true">
          {hint ? `${active ? "On" : "Off"} · ${hint}` : active ? "On" : "Off"}
        </span>
      </span>
      <span className={cx("h-2 w-2 rounded-full", active ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600")} aria-hidden="true" />
    </button>
  );
}
