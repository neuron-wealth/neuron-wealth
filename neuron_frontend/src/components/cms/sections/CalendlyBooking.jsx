import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { sectionDesign } from "../design";
import { Eyebrow, FOCUS, PillLink, Reveal } from "../primitives";

const HEIGHTS = { compact: 620, standard: 700, tall: 820 };

/** Only scheduling pages on calendly.com may be embedded. */
export function calendlyPage(href) {
  try {
    const url = new URL(String(href || "").trim());
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || (host !== "calendly.com" && !host.endsWith(".calendly.com"))) return null;
    if (url.pathname.replace(/\/+$/, "") === "") return null;
    return url;
  } catch {
    return null;
  }
}

function useDarkMode() {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

function useNearViewport(ref, active) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!active || !node || near) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, near, active]);
  return near;
}

function embedSrc(page, { dark, hideDetails, hideCookieBanner }) {
  const url = new URL(page.href);
  url.searchParams.set("embed_domain", window.location.hostname);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("primary_color", dark ? "8fcb86" : "21649a");
  url.searchParams.set("text_color", dark ? "ffffff" : "15344f");
  url.searchParams.set("background_color", dark ? "0b1e30" : "ffffff");
  if (hideDetails) url.searchParams.set("hide_event_type_details", "1");
  if (hideCookieBanner) url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
}

export default function CalendlyBooking({ id, content, design, root, section }) {
  if (section?.visible === false || content?.visible === false) return null;
  const look = sectionDesign(design, { background: "ivory", align: "center" });
  const center = look.align === "center";
  const light = look.light;
  const headingId = `${id}-heading`;
  const frameRef = useRef(null);
  const page = calendlyPage(content.calendly?.href);
  const near = useNearViewport(frameRef, Boolean(page));
  const dark = useDarkMode();
  const [loaded, setLoaded] = useState(false);

  const height = HEIGHTS[content.height] || HEIGHTS.standard;
  const src = page && near ? embedSrc(page, { dark, hideDetails: content.hideDetails, hideCookieBanner: content.hideCookieBanner }) : "";

  useEffect(() => setLoaded(false), [src]);

  return (
    <section
      {...root}
      aria-labelledby={content.title ? headingId : undefined}
      className={`relative isolate overflow-hidden ${look.background} ${look.spacing}`}
      style={look.style}
    >
      <div className="site-frame px-4 sm:px-6">
        <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
          <Eyebrow light={light} center={center}>
            {content.eyebrow}
          </Eyebrow>
          {content.title ? (
            <h2
              id={headingId}
              className={`${content.eyebrow ? "mt-3" : ""} font-display text-[2.1rem] leading-[1.1] sm:text-[2.6rem] ${
                light ? "text-white" : "text-[#15344F] dark:text-white"
              }`}
            >
              {content.title}{" "}
              {content.highlight ? (
                <span className={`italic ${light ? "text-[#8FCB86]" : "text-[#21649A] dark:text-[#8FCB86]"}`}>{content.highlight}</span>
              ) : null}
            </h2>
          ) : null}
          {content.text ? (
            <p className={`mt-4 text-lg leading-[1.6] ${light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>{content.text}</p>
          ) : null}
        </Reveal>

        {page ? (
          <div className="mx-auto mt-10 max-w-5xl">
            <div
              ref={frameRef}
              className="relative overflow-hidden rounded-3xl border border-[#DCE4E8] bg-white shadow-[0_24px_60px_-30px_rgba(16,42,64,0.35)] dark:border-white/10 dark:bg-[#0B1E30]"
              style={{ height }}
            >
              {!loaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#5E6D7B] dark:text-slate-300" aria-hidden="true">
                  <CalendarCheck className="h-8 w-8 animate-pulse text-[#21649A] dark:text-[#8FCB86]" />
                  <span className="text-sm font-medium">Loading the booking calendar…</span>
                </div>
              ) : null}
              {src ? (
                <iframe
                  key={src}
                  src={src}
                  title={content.title ? `${content.title} ${content.highlight || ""}`.trim() : "Book a meeting"}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  className={`relative h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
              ) : null}
            </div>
            <p className="mt-4 text-center">
              <a
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full text-sm font-semibold underline-offset-4 hover:underline ${
                  light ? "text-white" : "text-[#21649A] dark:text-[#8FCB86]"
                } ${FOCUS}`}
              >
                {content.calendly?.label || "Open the booking page in a new tab"}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </div>
        ) : content.fallbackText || content.fallbackButton?.label ? (
          <div
            className={`mt-10 max-w-2xl rounded-3xl border p-8 ${center ? "mx-auto text-center" : ""} ${
              light ? "border-white/15 bg-white/5" : "border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#102A40]"
            }`}
          >
            <CalendarCheck className={`h-8 w-8 ${center ? "mx-auto" : ""} ${light ? "text-[#8FCB86]" : "text-[#21649A] dark:text-[#8FCB86]"}`} aria-hidden="true" />
            {content.fallbackText ? (
              <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>
                {content.fallbackText}
              </p>
            ) : null}
            <div className={`mt-6 flex ${center ? "justify-center" : ""}`}>
              <PillLink link={content.fallbackButton} variant="blue" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
