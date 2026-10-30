import { useEffect, useRef, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import CmsSections from "../../components/cms/CmsSections";
import { setTheme } from "../../hooks/useTheme";
import { setPreviewSettings } from "../../hooks/useSiteSettings";
import { usePage } from "../../hooks/usePage";

const ADMIN_ORIGINS = String(process.env.ADMIN_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

function trustedOrigin(origin) {
  return (
    ADMIN_ORIGINS.includes(origin) ||
    (process.env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
  );
}

function headerOffset() {
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"));
  return Number.isFinite(value) ? value : 80;
}

function focusSection(id) {
  const node = document.querySelector(`[data-cms-section="${CSS.escape(String(id))}"]`);
  if (!node) return;
  window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - headerOffset(), behavior: "smooth" });
  node.style.outline = "3px solid #54B848";
  node.style.outlineOffset = "-3px";
  window.setTimeout(() => {
    node.style.outline = "";
    node.style.outlineOffset = "";
  }, 1600);
}

function scrollPreview(to) {
  const target = () => (to === "bottom" ? document.documentElement.scrollHeight : 0);
  window.scrollTo({ top: target(), behavior: "smooth" });
  // Images and lazy sections can grow the page while scrolling; settle on the real bottom.
  if (to === "bottom") window.setTimeout(() => window.scrollTo({ top: target(), behavior: "auto" }), 900);
}

/**
 * Renders unsaved admin drafts (embedded in an iframe): a page draft, and/or site-wide
 * settings such as the header, footer and accessibility button on top of the Home page.
 */
export default function CmsPreview() {
  const [page, setPage] = useState(null);
  const home = usePage("home");
  const shown = page || home.page;
  const parentOrigin = useRef("");
  const embedded = typeof window !== "undefined" && window.parent !== window;

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    document.title = "Page Preview";
    return () => robots.remove();
  }, []);

  useEffect(() => {
    if (!embedded) return undefined;
    function onMessage(event) {
      if (event.source !== window.parent || !trustedOrigin(event.origin)) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      parentOrigin.current = event.origin;
      if (data.type === "nwa-cms:page" && data.page && Array.isArray(data.page.sections)) {
        setPage(data.page);
        if (data.theme) setTheme(data.theme, { persist: false });
      }
      if (data.type === "nwa-cms:settings") {
        setPreviewSettings(data.settings);
        if (data.theme) setTheme(data.theme, { persist: false });
      }
      if (data.type === "nwa-cms:focus" && data.id) focusSection(data.id);
      if (data.type === "nwa-cms:scroll") scrollPreview(data.to);
    }
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "nwa-cms:ready" }, "*");
    return () => {
      window.removeEventListener("message", onMessage);
      setPreviewSettings(null);
    };
  }, [embedded]);

  function onClickCapture(event) {
    if (event.target.closest("a[href]")) event.preventDefault();
    const section = event.target.closest("[data-cms-section]");
    if (section && parentOrigin.current) {
      window.parent.postMessage({ type: "nwa-cms:select", id: section.getAttribute("data-cms-section") }, parentOrigin.current);
    }
  }

  if (!embedded) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F7F8F5] p-6 text-center text-[#18324A]">
        <p className="max-w-md text-sm">This address is used by the admin page editor to show a live preview.</p>
      </main>
    );
  }

  return (
    <div onClickCapture={onClickCapture}>
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {shown ? (
          <div className="home-editorial bg-white font-manrope text-[#18324A] dark:bg-[#102A40] dark:text-slate-100">
            <CmsSections sections={shown.sections} />
          </div>
        ) : (
          <div className="grid min-h-[60vh] place-items-center text-sm text-[#5E6D7B]">Loading preview…</div>
        )}
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </div>
  );
}
