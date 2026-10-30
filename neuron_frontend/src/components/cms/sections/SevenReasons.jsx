import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { CmsIcon, visibleItems, safeHref } from "../primitives";

function ReasonCardItem({ r, index, isActive }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const buttonHref = safeHref(r.button?.href || "#pearl-form");
  const buttonLabel = r.button?.label || "Answer 5 Questions Now";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
        isActive
          ? "border-[#54B848] bg-[#0c243a] shadow-[0_-12px_36px_-6px_rgba(84,184,72,0.25),0_24px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#54B848]/50"
          : "border-white/15 bg-[#091d30] shadow-[0_-12px_32px_-8px_rgba(0,0,0,0.7),0_20px_45px_-12px_rgba(0,0,0,0.6)] hover:border-[#54B848]/40 hover:bg-[#0c243a]"
      } p-6 sm:p-8`}
    >
      {/* Mouse hover radial spotlight glow (Emerald/Cyan) */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(84,184,72,0.14), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Giant Architectural Numeral Watermark */}
      <span className="pointer-events-none absolute -bottom-4 right-4 select-none font-display text-[5.5rem] font-bold leading-none text-white/[0.04] transition-transform duration-500 group-hover:scale-105 sm:text-[7rem]">
        {r.num}
      </span>

      <div className="relative z-10">
        {/* Top Header: Number Pill, Icon Badge & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#163857] font-mono text-sm font-bold text-[#8FCB86] border border-white/15 shadow-sm transition-transform duration-300 group-hover:scale-110">
              {r.num}
            </span>
            {r.tag && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#8FCB86] transition-colors group-hover:bg-[#54B848] group-hover:text-[#061524]">
                <CmsIcon name={r.icon || "Scale"} className="h-3.5 w-3.5 shrink-0" />
                <span>{r.tag}</span>
              </div>
            )}
          </div>

          {/* Active indicator badge */}
          {isActive && (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#54B848]/30 bg-[#54B848]/20 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-[#8FCB86]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#54B848] animate-pulse" />
              In View
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-white transition-colors group-hover:text-[#8FCB86] sm:text-2xl">
          {r.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-base leading-[1.8] text-slate-300">
          {r.text || r.desc}
        </p>

        {/* Special Assessment Callout */}
        {r.hasLink && (
          <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#54B848]" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#8FCB86]">
                Mutually Beneficial Fitment
              </p>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
              {r.calloutText ||
                "Please answer 5 questions to understand if our association could become pearl by clicking below:"}
            </p>
            {buttonHref && (
              <div className="mt-4">
                <a
                  href={buttonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#54B848] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#061524] shadow-md transition-all hover:bg-[#8FCB86] hover:shadow-lg"
                >
                  <span>{buttonLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SevenReasons({ id, content, design, root }) {
  const eyebrow = content.eyebrow || "Core Foundations";
  const title = content.title || "7 Reasons to Associate";
  const highlight = content.highlight || "with NWA";
  const text =
    content.text ||
    "Every advisory relationship at Neuron Wealth Advisors is anchored in statutory fiduciary alignment, deep technical mastery, and authentic transparency.";
  const bgImage = content.image?.url || "/images/reasons-dark-bg.jpg";

  const rawReasons = visibleItems(content.items);
  const reasons = rawReasons.length > 0 ? rawReasons : [];

  const [activeReasonIndex, setActiveReasonIndex] = useState(0);
  const reasonsContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: reasonsContainerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      let current = 0;

      // A card is current once it reaches its sticky (stacked) position.
      for (let i = 0; i < reasons.length; i++) {
        const el = document.getElementById(`reason-${reasons[i].num || i + 1}`);
        if (el) {
          const stickTop = parseFloat(window.getComputedStyle(el).top) || 0;
          if (el.getBoundingClientRect().top <= stickTop + 24) {
            current = i;
          }
        }
      }
      setActiveReasonIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reasons]);

  const scrollToReason = (num) => {
    const el = document.getElementById(`reason-${num}`);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const activeReason = reasons[activeReasonIndex] || reasons[0];
  const totalCount = reasons.length || 7;

  return (
    <section
      id={id || "seven-reasons"}
      ref={reasonsContainerRef}
      {...root}
      className="relative isolate scroll-mt-[var(--header-height,4.875rem)] border-b border-white/10 bg-[#061524] py-16 text-white sm:py-20 lg:py-28"
    >
      {/* Background Image & Contained Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061524]/95 via-[#081e33]/90 to-[#061524]/98" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#21649A]/20 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#54B848]/15 blur-3xl" />
      </div>

      <div className="site-frame relative z-10 px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Sticky Control Panel & Progress HUD */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 lg:self-start">
              {eyebrow && (
                <p className="flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#8FCB86]">
                  <span aria-hidden="true" className="h-px w-8 bg-[#54B848]" />
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-3 font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[2.8rem]">
                {title} <span className="italic text-[#8FCB86]">{highlight}</span>
              </h2>
              {text && (
                <p className="mt-4 text-base leading-[1.7] text-slate-300">
                  {text}
                </p>
              )}

              {/* Active Step HUD / Status Tracker */}
              {activeReason && (
                <div className="mt-6 hidden rounded-2xl border border-white/10 bg-[#0c2237]/80 p-5 shadow-2xl backdrop-blur-md lg:block">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8FCB86]">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#54B848] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#54B848]" />
                      </span>
                      <span>Active Foundation</span>
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {String(activeReasonIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-semibold text-white font-display truncate">
                    {activeReason.title}
                  </p>
                  {activeReason.tag && (
                    <p className="text-xs text-[#8FCB86] font-medium">
                      {activeReason.tag}
                    </p>
                  )}

                  {/* Animated Progress Bar */}
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#21649A] via-[#54B848] to-[#8FCB86] transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${((activeReasonIndex + 1) / totalCount) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Clickable Quick-Jump Rail */}
              <div className="mt-5 hidden space-y-1 lg:block">
                {reasons.map((r, i) => (
                  <button
                    key={r.id || r.num || i}
                    type="button"
                    onClick={() => scrollToReason(r.num || i + 1)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-200 ${
                      activeReasonIndex === i
                        ? "bg-[#183d5d] text-white shadow-lg ring-1 ring-[#54B848]/50"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          activeReasonIndex === i ? "text-[#8FCB86]" : "text-slate-400 group-hover:text-white"
                        }`}
                      >
                        {r.num || String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium truncate max-w-[210px]">{r.title}</span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeReasonIndex === i
                          ? "translate-x-0.5 text-[#8FCB86]"
                          : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Animated Interactive Cards with Scroll Timeline */}
          <div className="relative lg:col-span-7 xl:col-span-8">
            {/* Dynamic Scroll-Progress Timeline Line (Desktop) */}
            <div
              className="pointer-events-none absolute left-3 top-8 bottom-8 hidden w-0.5 bg-white/15 lg:block"
              aria-hidden="true"
            >
              <motion.div
                className="w-full origin-top bg-gradient-to-b from-[#21649A] via-[#54B848] to-[#8FCB86]"
                style={{ scaleY, height: "100%" }}
              />
            </div>

            {activeReason ? (
              <div className="sticky top-[calc(var(--header-height,4.875rem)+0.5rem)] z-40 mb-4 rounded-xl border border-white/10 bg-[#0c2237]/95 px-4 py-3 shadow-2xl backdrop-blur-md lg:hidden">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#54B848] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#54B848]" />
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8FCB86]">
                    {String(activeReasonIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 truncate font-display text-[0.9375rem] font-semibold text-white">{activeReason.title}</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#21649A] via-[#54B848] to-[#8FCB86] transition-all duration-300 ease-out"
                    style={{ width: `${((activeReasonIndex + 1) / totalCount) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-6 lg:space-y-10 lg:pl-10">
              {reasons.map((r, index) => {
                const isActive = activeReasonIndex === index;
                const reasonNum = r.num || String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={r.id || reasonNum}
                    id={`reason-${reasonNum}`}
                    className="sticky top-[var(--stack-top-m)] pb-4 transition-all duration-300 lg:top-[var(--stack-top)] lg:pb-8"
                    style={{
                      "--stack-top": `calc(7rem + ${index * 16}px)`,
                      "--stack-top-m": `calc(var(--header-height, 4.875rem) + 5.25rem + ${index * 10}px)`,
                      zIndex: 10 + index,
                    }}
                  >
                    <ReasonCardItem
                      r={{ ...r, num: reasonNum }}
                      index={index}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
