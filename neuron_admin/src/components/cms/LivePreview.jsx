import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpToLine, ExternalLink, Monitor, Moon, RefreshCw, Smartphone, Sun, Tablet } from "lucide-react";
import { SITE_ORIGIN, SITE_URL, siteUrl } from "../../config/site";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: 1440, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 820, icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, icon: Smartphone },
];

function Segment({ options, value, onChange, label }) {
  return (
    <div className="flex rounded-lg border border-line bg-subtle p-0.5" role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.id)}
            className={`focus-ring inline-flex h-7 w-8 items-center justify-center rounded-md transition-colors ${
              active ? "bg-surface text-accent shadow-sm" : "text-soft hover:text-ink"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Shows unsaved admin drafts inside the real website (`/cms-preview`), scaled to fit the panel.
 * `page` previews a page draft; `settings` previews site-wide settings (header, footer, …) on the Home page.
 */
export default function LivePreview({ page, settings, path = "/", focus, onSelect, scrollTo, note }) {
  const frameRef = useRef(null);
  const boxRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const [device, setDevice] = useState("desktop");
  const [theme, setTheme] = useState("light");
  const [session, setSession] = useState(0);
  const [frameKey, setFrameKey] = useState(0);
  // A fresh URL per load so the browser never shows a cached copy of the website from before a deploy.
  const [openedAt] = useState(() => Date.now());
  const [slow, setSlow] = useState(false);
  const [box, setBox] = useState({ width: 0, height: 0 });

  onSelectRef.current = onSelect;

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) => setBox({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== SITE_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "nwa-cms:ready") setSession((count) => count + 1);
      if (data?.type === "nwa-cms:select" && typeof data.id === "string") onSelectRef.current?.(data.id);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    setSession(0);
    setSlow(false);
    const timer = window.setTimeout(() => setSlow(true), 10000);
    return () => window.clearTimeout(timer);
  }, [frameKey]);

  const post = (message) => frameRef.current?.contentWindow?.postMessage(message, SITE_ORIGIN);
  const scroll = (to) => post({ type: "nwa-cms:scroll", to });

  useEffect(() => {
    if (!session || !page) return undefined;
    const timer = window.setTimeout(() => post({ type: "nwa-cms:page", page, theme }), 200);
    return () => window.clearTimeout(timer);
  }, [session, page, theme]);

  useEffect(() => {
    if (!session || !settings) return undefined;
    const timer = window.setTimeout(() => post({ type: "nwa-cms:settings", settings, theme }), 200);
    return () => window.clearTimeout(timer);
  }, [session, settings, theme]);

  useEffect(() => {
    if (!session || !focus?.id) return undefined;
    const timer = window.setTimeout(() => post({ type: "nwa-cms:focus", id: focus.id }), 400);
    return () => window.clearTimeout(timer);
  }, [session, focus]);

  useEffect(() => {
    if (!session || !scrollTo) return undefined;
    const timer = window.setTimeout(() => scroll(scrollTo), 1200);
    return () => window.clearTimeout(timer);
  }, [session, scrollTo, device]);

  const width = DEVICES.find((entry) => entry.id === device).width;
  const scale = box.width ? Math.min(1, box.width / width) : 1;
  const offset = Math.max(0, (box.width - width * scale) / 2);

  return (
    <section className="panel flex flex-col overflow-hidden rounded-2xl" aria-label="Live preview">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2.5">
        <div className="mr-auto flex min-w-0 items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${session ? "bg-brand-green" : "animate-pulse bg-amber-500"}`} aria-hidden="true" />
          <span className="truncate text-sm font-bold">Live Preview</span>
          <span className="muted hidden truncate text-xs 2xl:inline">
            {width}px{scale < 1 ? ` · ${Math.round(scale * 100)}%` : ""}
          </span>
        </div>
        <Segment label="Preview size" options={DEVICES} value={device} onChange={setDevice} />
        <Segment
          label="Preview theme"
          options={[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
          ]}
          value={theme}
          onChange={setTheme}
        />
        {scrollTo ? (
          <div className="flex">
            <button type="button" onClick={() => scroll("top")} className="icon-btn focus-ring h-8 w-8" aria-label="Scroll preview to top" title="Scroll to top">
              <ArrowUpToLine className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scroll("bottom")} className="icon-btn focus-ring h-8 w-8" aria-label="Scroll preview to bottom" title="Scroll to bottom">
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
        <button type="button" onClick={() => setFrameKey((key) => key + 1)} className="icon-btn focus-ring h-8 w-8" aria-label="Reload preview" title="Reload preview">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </button>
        <a
          href={siteUrl(path)}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn focus-ring h-8 w-8"
          aria-label="Open the saved page on the website"
          title="Open the saved page on the website"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div ref={boxRef} className="relative h-[70vh] overflow-hidden bg-subtle xl:h-[calc(100vh-15.5rem)]">
        {box.width ? (
          <iframe
            key={frameKey}
            ref={frameRef}
            src={siteUrl(`/cms-preview?v=${openedAt}-${frameKey}`)}
            title="Website preview"
            className="absolute top-0 border-0 bg-white shadow-[0_0_0_1px_var(--line)]"
            style={{
              left: offset,
              width,
              height: box.height / scale,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        ) : null}
        {!session && slow ? (
          <div className="absolute inset-x-4 top-4 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900 shadow-sm dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-100">
            The preview couldn't reach the website at <span className="font-mono">{SITE_URL}</span>. Start the website (
            <span className="font-mono">neuron_frontend</span>, <span className="font-mono">npm start</span>), then press reload. Your edits are not affected.
          </div>
        ) : null}
      </div>
      <p className="muted border-t border-line px-3 py-2 text-[0.6875rem]">
        {note || "Shows your unsaved changes. Click a section in the preview to edit it. Links are disabled here."}
      </p>
    </section>
  );
}
