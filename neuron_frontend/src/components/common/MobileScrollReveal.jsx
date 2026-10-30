import { useEffect } from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Blocks that fade up into place as they scroll into view on phones.
const TARGETS = "h2, h3, p, li, article, figure, blockquote, table, img, form, a[class*='rounded-full']";
const MAX_ELEMENTS = 500;

/**
 * Scroll reveal for CMS pages (phones only, or every screen with `allScreens`). Picks the outermost content blocks in every section
 * after the hero and fades them up as they enter the screen. Anything that already animates
 * itself (inline opacity/transform) or is sticky is left alone, as is content already on screen.
 * `watch` re-runs it when the page content changes.
 */
export default function MobileScrollReveal({ watch, allScreens = false }) {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const active = allScreens || isMobile;

  useEffect(() => {
    if (!active || reduce || typeof IntersectionObserver === "undefined") return undefined;

    let observer = null;
    const marked = [];

    const frame = window.requestAnimationFrame(() => {
      const main = document.getElementById("main-content");
      if (!main) return;
      const sections = [...main.querySelectorAll("[data-cms-section]")].slice(1);
      const viewportBottom = window.innerHeight;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("msr-in");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      // Items in a sideways-scrolling row sit off-screen to the right, so the whole row animates instead.
      const sidewaysRow = (el, section) => {
        for (let node = el.parentElement; node && node !== section; node = node.parentElement) {
          if (node.scrollWidth > node.clientWidth + 2 && /auto|scroll/.test(window.getComputedStyle(node).overflowX)) return node;
        }
        return null;
      };

      // Pinned / sticky effects (mostly on desktop) keep their own motion.
      const insideSticky = (el, section) => {
        for (let node = el.parentElement; node && node !== section; node = node.parentElement) {
          const position = window.getComputedStyle(node).position;
          if (position === "sticky" || position === "fixed") return true;
        }
        return false;
      };

      for (const section of sections) {
        for (const found of section.querySelectorAll(TARGETS)) {
          if (marked.length >= MAX_ELEMENTS) break;
          const el = sidewaysRow(found, section) || found;
          if (el.classList.contains("msr")) continue;
          if (el.parentElement?.closest(".msr")) continue; // an ancestor already animates
          if (el.closest("[style*='opacity'], [style*='transform']")) continue; // has its own animation
          if (!el.offsetParent) continue; // hidden on phones
          const style = window.getComputedStyle(el);
          if (style.position === "sticky" || style.position === "fixed" || insideSticky(el, section)) continue;
          if (el.getBoundingClientRect().top < viewportBottom) continue; // already on screen

          const siblingIndex = marked.filter((other) => other.parentElement === el.parentElement).length;
          el.style.transitionDelay = `${Math.min(siblingIndex, 3) * 70}ms`;
          el.classList.add("msr");
          if (el.tagName === "IMG" || el.tagName === "FIGURE") el.classList.add("msr-zoom");
          marked.push(el);
          observer.observe(el);
        }
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      for (const el of marked) {
        el.classList.remove("msr", "msr-in", "msr-zoom");
        el.style.transitionDelay = "";
      }
    };
  }, [active, reduce, watch]);

  return null;
}
