import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cx } from "../../../utils/cx";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";
const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";

const CARD_TINTS = [
  "bg-[#0B1E30]/95 border border-white/85 hover:border-white shadow-xl",
  "bg-[#0A241C]/95 border border-white/85 hover:border-white shadow-xl",
  "bg-[#0F2942]/95 border border-white/85 hover:border-white shadow-xl",
  "bg-[#081E2F]/95 border border-white/85 hover:border-white shadow-xl",
  "bg-[#071927]/95 border border-white/85 hover:border-white shadow-xl",
];

export default function NriDeliverables({ content, section }) {
  const reduce = useReducedMotion();
  const [activeDeliverableIdx, setActiveDeliverableIdx] = useState(0);
  const [deliverablesHeld, setDeliverablesHeld] = useState(false);
  const [receiveInView, setReceiveInView] = useState(false);

  const receiveRef = useRef(null);
  const deliverablesScrollRef = useRef(null);

  const heading = content?.heading || "What You Receive";
  const subtitle = content?.subtitle || "A complete, written plan prepared by our CA, CPA and CFA team:";
  const bgImageUrl = content?.bgImage?.url || "/images/home/hero-residence.jpg";
  const deliverables = visibleItems(content?.deliverables || []);
  const footerText =
    content?.footerText ||
    "We then help you put the plan in place and stay with you through your RNOR years and beyond.";
  const button = content?.button || { label: "Book a 30 minute call", href: "/contact" };

  const scrollToDeliverable = (idx) => {
    setActiveDeliverableIdx(idx);
    const container = deliverablesScrollRef.current;
    const card = container?.children[idx];
    if (!container || !card) return;
    const left =
      container.scrollLeft + card.getBoundingClientRect().left - container.getBoundingClientRect().left;
    container.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = receiveRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setReceiveInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || deliverablesHeld || !receiveInView || deliverables.length === 0) return undefined;
    const timer = setTimeout(() => {
      const container = deliverablesScrollRef.current;
      if (!container) return;
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 8;
      const last = deliverables.length - 1;
      scrollToDeliverable(atEnd || activeDeliverableIdx >= last ? 0 : activeDeliverableIdx + 1);
    }, 3500);
    return () => clearTimeout(timer);
  }, [reduce, deliverablesHeld, receiveInView, activeDeliverableIdx, deliverables.length]);

  const handleDeliverablesScroll = () => {
    const container = deliverablesScrollRef.current;
    if (!container) return;
    const firstChild = container.children[0];
    const cardWidth = firstChild ? firstChild.offsetWidth : 360;
    const newIdx = Math.round(container.scrollLeft / (cardWidth + 24));
    if (newIdx >= 0 && newIdx < deliverables.length && newIdx !== activeDeliverableIdx) {
      setActiveDeliverableIdx(newIdx);
    }
  };

  return (
    <section
      ref={receiveRef}
      id={section?.design?.anchor || section?.id || "what-you-receive"}
      data-cms-section={section?.id}
      aria-labelledby="receive-heading"
      className="relative isolate overflow-hidden bg-[#071321] py-20 text-white shadow-2xl sm:py-24 lg:py-28"
    >
      <img
        src={bgImageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/82 to-black/88" />
      <div className="absolute inset-0 bg-[#061524]/60 mix-blend-multiply" />

      <div
        className="site-frame relative z-10 items-start px-4 sm:px-6 lg:grid lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[24rem_minmax(0,1fr)] xl:gap-16"
        onFocus={(event) => event.target.matches?.(":focus-visible") && setDeliverablesHeld(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setDeliverablesHeld(false);
        }}
      >
        <div className="lg:sticky lg:top-36 lg:self-start">
          <h2 id="receive-heading" className={`${H2_SIZE} text-white`}>
            {heading}
          </h2>
          {subtitle ? (
            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-200 sm:text-[1.03125rem]">
              {subtitle}
            </p>
          ) : null}

          {deliverables.length > 0 ? (
            <>
              <div className="mt-8 flex items-center gap-2.5">
                {deliverables.map((item, idx) => (
                  <button
                    key={item.id || item.num || idx}
                    type="button"
                    onClick={() => scrollToDeliverable(idx)}
                    aria-label={`Go to ${idx + 1}: ${item.title}`}
                    className={cx(
                      "h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#54B848]",
                      activeDeliverableIdx === idx
                        ? "w-10 bg-[#54B848] shadow-sm shadow-[#54B848]/30"
                        : "w-5 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToDeliverable(Math.max(0, activeDeliverableIdx - 1))}
                  disabled={activeDeliverableIdx === 0}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-[#54B848] hover:bg-white/20 hover:text-[#8FCB86] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    scrollToDeliverable(Math.min(deliverables.length - 1, activeDeliverableIdx + 1))
                  }
                  disabled={activeDeliverableIdx === deliverables.length - 1}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-[#54B848] hover:bg-white/20 hover:text-[#8FCB86] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="ml-2 font-mono text-xs font-semibold tracking-wider text-slate-300">
                  {String(activeDeliverableIdx + 1).padStart(2, "0")} /{" "}
                  {String(deliverables.length).padStart(2, "0")}
                </span>
              </div>
            </>
          ) : null}

          {footerText ? (
            <p className="mt-8 max-w-sm text-base leading-relaxed text-slate-200">{footerText}</p>
          ) : null}

          {button?.label && button?.href ? (
            <Link
              to={button.href}
              className={`mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#54B848] px-6 text-sm font-semibold text-[#102A40] shadow-md transition-colors hover:bg-[#6cc960] ${FOCUS}`}
            >
              {button.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        {deliverables.length > 0 ? (
          <ol
            ref={deliverablesScrollRef}
            onScroll={handleDeliverablesScroll}
            onPointerEnter={(event) => event.pointerType === "mouse" && setDeliverablesHeld(true)}
            onPointerLeave={(event) => event.pointerType === "mouse" && setDeliverablesHeld(false)}
            onPointerDown={(event) => event.pointerType !== "mouse" && setDeliverablesHeld(true)}
            onPointerUp={(event) => event.pointerType !== "mouse" && setDeliverablesHeld(false)}
            onPointerCancel={() => setDeliverablesHeld(false)}
            className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-1 lg:mt-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {deliverables.map((item, idx) => (
              <li
                key={item.id || item.num || idx}
                className={cx(
                  "group relative flex min-h-[300px] w-[290px] shrink-0 snap-start flex-col justify-between rounded-xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 sm:min-h-[320px] sm:w-[330px] sm:p-9 md:w-[360px]",
                  CARD_TINTS[idx % CARD_TINTS.length]
                )}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="rounded-lg border border-emerald-400/40 bg-black/60 px-3 py-1 font-mono text-sm font-bold text-[#8FCB86] backdrop-blur-md sm:text-base">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.375rem] font-medium leading-snug tracking-tight text-white sm:text-[1.5625rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-slate-200 sm:text-[0.9375rem]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="h-1 w-12 bg-[#54B848] transition-all duration-500 ease-out group-hover:w-full" />
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

