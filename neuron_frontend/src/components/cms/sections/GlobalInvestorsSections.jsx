import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight, Check, CircleHelp, FileText, Globe, MapPin, Quote, Search } from "lucide-react";
import { cx } from "../../../utils/cx";
import { CmsLink, FOCUS, hasLink, strings, visibleItems } from "../primitives";
import {
  BODY,
  FaqBlock,
  H2,
  H2_SIZE,
  Ico,
  OutlineButton,
  PrimaryButton,
  imgProps,
  imgSrc,
  pad2,
  textBlocks,
  useReveal,
} from "./serviceKit";

const revealProps = (reduce, idx = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut", delay: reduce ? 0 : idx * 0.07 },
});


function useMinWidth(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

// Below 1200px `background-attachment: fixed` is unreliable (notably on iOS), so a viewport-fixed
// layer is clipped to the section's visible rect instead.
function useFixedBackground(reduce) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return undefined;

    const wide = window.matchMedia("(min-width: 1200px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (wide.matches) {
        bg.style.clipPath = "";
        return;
      }
      const rect = section.getBoundingClientRect();
      const top = Math.max(0, rect.top);
      const right = Math.max(0, window.innerWidth - rect.right);
      const bottom = Math.max(0, window.innerHeight - rect.bottom);
      const left = Math.max(0, rect.left);
      bg.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    };

    const requestUpdate = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    wide.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      wide.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return [sectionRef, bgRef];
}

export function InvestorHero({ content: c, root }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const trust = strings(c.trustItems);

  return (
    <section
      ref={ref}
      {...root}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#071321] pt-[var(--header-clearance,4.875rem)]"
    >
      {imgSrc(c.backgroundImage) ? (
        <motion.img
          {...imgProps(c.backgroundImage)}
          style={reduce ? undefined : { y: bgY }}
          className="absolute inset-x-0 -top-[10%] -z-20 h-[120%] w-full object-cover object-center"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321]/95 via-[#071321]/80 to-[#071321]/40"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#071321] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#21649A]/25 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <motion.div
          style={reduce ? undefined : { y: contentY }}
          className="grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-24 lg:pt-14"
        >
          <div className="lg:col-span-7">
            {c.eyebrow ? (
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] sm:text-[0.8125rem]">{c.eyebrow}</p>
            ) : null}
            <h1 className="mt-4 font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]">
              {c.title}
              {c.titleHighlight ? (
                <>
                  {" "}
                  <span className="italic text-[#F3E6D4]">{c.titleHighlight}</span>
                </>
              ) : null}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-white/90 sm:text-[1rem] lg:text-[1.0625rem]">
              {textBlocks(c.paragraphs).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton link={c.primaryButton} />
              <OutlineButton link={c.secondaryButton} light trailingArrow />
            </div>
          </div>

          {trust.length ? (
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-7 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#54B848]/20 blur-3xl" />
                <div aria-hidden="true" className="relative mx-auto grid h-36 w-36 place-items-center">
                  <motion.span
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-[#8FCB86]/50"
                  >
                    <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#54B848]" />
                  </motion.span>
                  <span className="absolute inset-5 rounded-full border border-white/15" />
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#21649A] to-[#15344F] text-white shadow-lg">
                    <Globe className="h-10 w-10" strokeWidth={1.25} />
                  </span>
                </div>
                <ul className="relative mt-7 divide-y divide-white/10 border-t border-white/10">
                  {trust.map((item) => (
                    <li key={item} className="flex items-center gap-3 py-3.5 text-[0.875rem] font-medium text-white sm:text-[0.9375rem]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export function InvestorReasons({ content: c, root }) {
  const reveal = useReveal();
  const reasons = visibleItems(c.reasons);

  return (
    <section {...root} aria-labelledby="reasons-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden p-8 text-white sm:p-10 md:row-span-2">
            {imgSrc(c.image) ? (
              <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
            ) : null}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321]/95 via-[#071321]/60 to-transparent" />
            <h2 id="reasons-heading" className={`${H2_SIZE} text-white`}>
              {c.heading}
            </h2>
            {c.text ? <p className="mt-4 text-base leading-[1.8] text-white/85 sm:text-[1.0625rem]">{c.text}</p> : null}
          </div>

          {reasons.map((item, idx) => {
            const isLast = idx === reasons.length - 1;
            return (
              <motion.article
                key={item.id || item.title}
                {...reveal(idx)}
                className={cx(
                  "group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8",
                  isLast
                    ? "bg-[#15344F] text-white md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-8"
                    : "border border-[#DCE4E8] bg-[#F7F8F5] dark:border-white/10 dark:bg-white/[0.05]",
                )}
              >
                <span
                  className={cx(
                    "grid h-12 w-12 place-items-center rounded-full transition-colors duration-300",
                    isLast
                      ? "bg-[#54B848] text-[#102A40]"
                      : "bg-white text-[#21649A] group-hover:bg-[#54B848] group-hover:text-[#102A40] dark:bg-white/10 dark:text-[#8FCB86]",
                  )}
                >
                  <Ico name={item.icon} className="h-5 w-5" />
                </span>
                <h3
                  className={cx(
                    "mt-6 font-display text-[1.35rem] font-medium leading-snug sm:text-[1.45rem]",
                    isLast ? "text-white lg:mt-0 lg:w-72 lg:shrink-0" : "text-[#15344F] dark:text-white",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cx(
                    "mt-3 text-[0.9375rem] leading-relaxed sm:text-base",
                    isLast ? "text-white/80 lg:mt-0" : "text-[#5E6D7B] dark:text-slate-300",
                  )}
                >
                  {item.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function InvestorFamiliar({ content: c, root }) {
  const reduce = useReducedMotion();
  const quotes = strings(c.quotes);
  const showCta = hasLink(c.ctaLink) && c.ctaLink.label;

  return (
    <section {...root} aria-labelledby="familiar-heading" className="relative isolate overflow-hidden bg-[#0B1E30] py-16 text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(84,184,72,0.14), transparent 65%)" }}
      />
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl bg-[#54B848]/15 text-[#8FCB86]">
              <Quote className="h-6 w-6" />
            </span>
            <h2 id="familiar-heading" className={cx(H2_SIZE, "mt-6 text-white")}>
              {c.heading}
            </h2>
          </div>
          {c.text ? (
            <p className="text-base leading-[1.8] text-white/75 sm:text-[1.0625rem] lg:col-span-5 lg:border-l-2 lg:border-[#54B848] lg:pl-6">{c.text}</p>
          ) : null}
        </div>

        {quotes.length || showCta ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
            {quotes.map((quote, idx) => (
              <motion.li
                key={quote}
                {...revealProps(reduce, idx)}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#54B848]/50 hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#8FCB86] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-white">
                    <CircleHelp className="h-5 w-5" />
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs font-bold tracking-widest text-white/40">
                    {pad2(idx + 1)}
                  </span>
                </div>
                <p className="mt-5 font-display text-[1.15rem] leading-snug text-white sm:text-[1.2rem]">&ldquo;{quote}&rdquo;</p>
              </motion.li>
            ))}
            {showCta ? (
              <motion.li {...revealProps(reduce, quotes.length)} className="flex">
                <CmsLink
                  link={c.ctaLink}
                  className={cx(
                    "group flex w-full flex-col justify-between rounded-2xl bg-[#54B848] p-6 text-[#0B1E30] transition-colors duration-300 hover:bg-[#6cc960]",
                    FOCUS,
                  )}
                >
                  {c.ctaText ? <span className="font-display text-[1.3rem] font-medium leading-snug">{c.ctaText}</span> : null}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    {c.ctaLink.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </CmsLink>
              </motion.li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function RulesShowcase({ rules }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [rules.length]);

  const current = rules[Math.min(active, rules.length - 1)];
  if (!current) return null;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ol className="lg:col-span-6">
        {rules.map((item, idx) => {
          const isActive = idx === active;
          return (
            <li
              key={item.id || item.title}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              data-index={idx}
              onMouseEnter={() => setActive(idx)}
              className={cx(
                "border-b border-white/10 py-7 transition-opacity duration-300 first:pt-0 last:border-b-0",
                isActive ? "lg:opacity-100" : "lg:opacity-45",
              )}
            >
              {imgSrc(item.image) ? (
                <div className="relative mb-5 h-44 overflow-hidden lg:hidden">
                  <img {...imgProps(item.image)} loading="lazy" className="h-full w-full object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071321]/70 to-transparent" />
                </div>
              ) : null}
              <div className="flex gap-5">
                <span
                  className={cx(
                    "grid h-11 w-11 shrink-0 place-items-center transition-colors duration-300",
                    isActive ? "bg-[#54B848] text-[#102A40]" : "bg-white/[0.08] text-[#8FCB86]",
                  )}
                >
                  <Ico name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="flex items-baseline gap-3 font-display text-[1.3rem] font-medium leading-snug">
                    <span className="text-[0.95rem] text-white/40">{pad2(idx + 1)}</span>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-300">{item.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div aria-hidden="true" className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-32 h-[min(36rem,calc(100vh-10rem))] overflow-hidden">
          {rules.map((item, idx) =>
            imgSrc(item.image) ? (
              <img
                key={item.id || item.title}
                src={imgSrc(item.image)}
                alt=""
                loading="lazy"
                className={cx(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                  idx === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                )}
              />
            ) : null,
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-[#071321]/40 to-transparent" />
          <div className="absolute inset-x-8 top-8 flex gap-1.5">
            {rules.map((item, idx) => (
              <span
                key={item.id || item.title}
                className={cx("h-1 flex-1 transition-colors duration-500", idx <= active ? "bg-[#54B848]" : "bg-white/25")}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="font-display leading-none text-[#8FCB86]">
              <span className="text-[4.5rem]">{pad2(active + 1)}</span>
              <span className="ml-2 text-2xl text-white/40">/ {pad2(rules.length)}</span>
            </p>
            <p className="mt-3 font-display text-[1.7rem] leading-snug text-white">{current.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvestorRules({ content: c, root }) {
  return (
    <section
      {...root}
      aria-labelledby="rules-heading"
      className="relative isolate overflow-clip bg-[#071321] py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-[#21649A]/20 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="rules-heading" className={`${H2_SIZE} text-white lg:col-span-7`}>
            {c.heading}
          </h2>
          {c.text ? <p className="text-base leading-[1.8] text-white/75 sm:text-[1.0625rem] lg:col-span-5">{c.text}</p> : null}
        </div>

        <RulesShowcase rules={visibleItems(c.rules)} />
      </div>
    </section>
  );
}

export function InvestorKeep({ content: c, root }) {
  const reveal = useReveal();
  const choices = strings(c.choices);

  return (
    <section {...root} aria-labelledby="keep-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="keep-heading" className={H2}>
            {c.heading}
          </h2>
          {c.subheading ? (
            <p className="mt-5 font-display text-[1.35rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:text-[1.55rem]">
              {c.subheading}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            {c.intro ? <p className={BODY}>{c.intro}</p> : null}
            {c.outro ? <p className={cx(BODY, "mt-6")}>{c.outro}</p> : null}
            {c.focusText ? (
              <div className="mt-8 border-l-4 border-[#54B848] bg-[#F7F8F5] p-6 dark:bg-white/[0.05]">
                <p className="text-base leading-[1.8] text-[#15344F] dark:text-white sm:text-[1.0625rem]">
                  {c.focusLabel ? <strong className="font-semibold">{c.focusLabel}</strong> : null} {c.focusText}
                </p>
              </div>
            ) : null}
          </div>

          <ol className="space-y-3 lg:col-span-7">
            {choices.map((choice, idx) => (
              <motion.li
                key={choice}
                {...reveal(idx)}
                style={{ width: `${100 - idx * 5}%` }}
                className="mx-auto flex min-w-[85%] items-center gap-4 bg-gradient-to-r from-[#15344F] to-[#21649A] px-6 py-4 text-white shadow-sm lg:min-w-0"
              >
                <span className="font-display text-[1.4rem] leading-none text-[#8FCB86]">{idx + 1}</span>
                <span className="text-[0.9375rem] leading-snug sm:text-base">{choice}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function InvestorRoutes({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="routes-heading" className="scroll-mt-24 bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="routes-heading" className={H2}>
            {c.heading}
          </h2>
          {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visibleItems(c.routes).map((route, idx) => (
            <motion.article
              key={route.id || route.title}
              {...reveal(idx)}
              className="group relative isolate flex min-h-[30rem] flex-col justify-between overflow-hidden bg-[#0B1E30] text-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
            >
              {imgSrc(route.image) ? (
                <img
                  {...imgProps(route.image)}
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#0B1E30]/80 to-[#0B1E30]/30" />
              <div className="flex items-start justify-between p-8 pb-0">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/10 text-[#8FCB86] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#54B848] group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                  <Ico name={route.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-[2.5rem] leading-none text-white/45">{idx + 1}</span>
              </div>
              <div>
                <div className="px-8 pb-6">
                  <h3 className="font-display text-[1.5rem] font-medium leading-snug">{route.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">{route.text}</p>
                </div>
                {route.suits ? (
                  <p className="border-t border-white/15 bg-white/[0.08] px-8 py-5 text-[0.9375rem] leading-relaxed text-white/90 backdrop-blur-sm">
                    {c.suitsLabel ? <strong className="font-semibold text-[#8FCB86]">{c.suitsLabel}</strong> : null} {route.suits}
                  </p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>

        {c.note ? (
          <p className="mt-10 font-display text-[1.3rem] leading-snug text-[#15344F] dark:text-white sm:text-[1.45rem]">{c.note}</p>
        ) : null}
      </div>
    </section>
  );
}

export function InvestorIbkr({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="ibkr-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-0 px-4 sm:px-6 lg:grid-cols-12">
        <div className="relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden bg-[#15344F] p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
          {imgSrc(c.image) ? (
            <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          ) : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1E30]/90 via-[#15344F]/80 to-[#071321]/95" />
          <div>
            <h2 id="ibkr-heading" className={`${H2_SIZE} text-white`}>
              {c.heading}
            </h2>
            {c.text ? <p className="mt-6 text-base leading-[1.8] text-white/80 sm:text-[1.0625rem]">{c.text}</p> : null}
          </div>
          {c.statement ? (
            <p className="mt-10 border-t border-white/15 pt-6 font-display text-[1.25rem] leading-snug text-[#8FCB86] sm:text-[1.35rem]">
              {c.statement}
            </p>
          ) : null}
        </div>

        <div className="border border-[#DCE4E8] p-8 dark:border-white/10 sm:p-10 lg:col-span-7 lg:border-l-0 lg:p-12">
          {c.pointsHeading ? (
            <h3 className="font-display text-[1.5rem] font-medium text-[#15344F] dark:text-white">{c.pointsHeading}</h3>
          ) : null}
          <ul className="mt-6 divide-y divide-[#DCE4E8] dark:divide-white/10">
            {strings(c.points).map((point, idx) => (
              <motion.li key={point} {...reveal(idx)} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#54B848]/15 text-[#2f8a25] dark:text-[#8FCB86]">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-base leading-[1.7] text-[#18324A] dark:text-slate-200">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function InvestorGift({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="gift-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
        <motion.div
          {...reveal(0)}
          className="relative isolate order-last flex min-h-[30rem] flex-col justify-end overflow-hidden p-8 text-white sm:p-10 lg:order-first lg:col-span-5"
        >
          {imgSrc(c.image) ? (
            <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          ) : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/75 to-[#071321]/10" />
          {c.badge ? (
            <span className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[#15344F] shadow-md sm:left-10 sm:top-10">
              <MapPin className="h-4 w-4 text-[#54B848]" aria-hidden="true" />
              {c.badge}
            </span>
          ) : null}
          {c.panelTitle ? <h3 className="font-display text-[1.6rem] font-medium leading-snug">{c.panelTitle}</h3> : null}
          {c.panelText ? <p className="mt-3 text-[0.9375rem] leading-[1.8] text-white/85 sm:text-base">{c.panelText}</p> : null}
        </motion.div>

        <div className="lg:col-span-7">
          <h2 id="gift-heading" className={H2}>
            {c.heading}
          </h2>
          {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}

          {c.pointsHeading ? (
            <h3 className="mt-10 font-display text-[1.35rem] font-medium text-[#15344F] dark:text-white">{c.pointsHeading}</h3>
          ) : null}
          <ol className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {strings(c.points).map((point, idx) => (
              <motion.li key={point} {...reveal(idx)} className="flex gap-4 border-t border-[#15344F]/15 py-5 dark:border-white/15">
                <span className="font-display text-[1.8rem] leading-none text-[#54B848]">{pad2(idx + 1)}</span>
                <span className="text-[0.9375rem] leading-relaxed text-[#18324A] dark:text-slate-200 sm:text-base">{point}</span>
              </motion.li>
            ))}
          </ol>

          {c.checkTitle || c.checkText ? (
            <motion.div
              {...reveal(1)}
              className="mt-6 flex gap-5 border-l-4 border-[#21649A] bg-white p-6 shadow-sm dark:bg-white/[0.05] sm:p-8"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EAF1F7] text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-[1.3rem] font-medium text-[#15344F] dark:text-white">{c.checkTitle}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-base">{c.checkText}</p>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const GOAL_INTERVAL_MS = 5000;

function GoalsAccordion({ goals }) {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const running = !reduce && !held && inView;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !goals.length) return undefined;
    const timer = setTimeout(() => setActive((current) => (current + 1) % goals.length), GOAL_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, running, goals.length]);

  const onFocus = (event) => {
    if (event.target.matches(":focus-visible")) setHeld(true);
  };

  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
  };

  return (
    <>
      <ul
        ref={listRef}
        onPointerEnter={(event) => event.pointerType === "mouse" && setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="mt-12 hidden h-[32rem] gap-3 lg:flex"
      >
        {goals.map((goal, idx) => {
          const isActive = idx === active;
          return (
            <li
              key={goal.id || goal.title}
              onMouseEnter={() => setActive(idx)}
              className={cx(
                "relative isolate min-w-0 basis-0 overflow-hidden rounded-3xl bg-[#0B1E30] text-white transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive ? "grow-[5]" : "grow",
              )}
            >
              {imgSrc(goal.image) ? (
                <img
                  src={imgSrc(goal.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={cx(
                    "absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ease-out",
                    isActive ? "scale-100" : "scale-110",
                  )}
                />
              ) : null}
              <div
                aria-hidden="true"
                className={cx(
                  "absolute inset-0 -z-10 transition-colors duration-500",
                  isActive ? "bg-gradient-to-t from-[#071321] via-[#071321]/55 to-[#071321]/5" : "bg-[#071321]/70",
                )}
              />

              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-expanded={isActive}
                aria-controls={`goal-panel-${idx}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]"
              >
                <span className="sr-only">{goal.title}</span>
              </button>

              <div
                aria-hidden="true"
                className={cx(
                  "pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100 delay-200",
                )}
              >
                <span className="font-display text-sm tracking-[0.2em] text-white/60">0{idx + 1}</span>
                <span className="rotate-180 whitespace-nowrap font-display text-[1.25rem] text-white [writing-mode:vertical-rl]">
                  {goal.title}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[#8FCB86] ring-1 ring-white/20">
                  <Ico name={goal.icon} className="h-5 w-5" />
                </span>
              </div>

              <div
                id={`goal-panel-${idx}`}
                className={cx(
                  "pointer-events-none absolute inset-x-0 bottom-0 p-8 transition-all duration-500 xl:p-10",
                  isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-6 opacity-0",
                )}
              >
                <div className="max-w-[30rem]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#54B848] text-[#102A40]">
                    <Ico name={goal.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-[1.75rem] font-medium leading-tight">{goal.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">{goal.text}</p>
                </div>
              </div>

              {isActive && running ? (
                <motion.span
                  key={`goal-bar-${active}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-20 h-1 origin-left bg-[#54B848]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: GOAL_INTERVAL_MS / 1000, ease: "linear" }}
                />
              ) : null}
            </li>
          );
        })}
      </ul>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
        {goals.map((goal, idx) => (
          <motion.li
            key={goal.id || goal.title}
            {...revealProps(reduce, idx % 2)}
            className={cx(
              "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#DCE4E8] dark:bg-white/[0.05] dark:ring-white/10",
              idx === goals.length - 1 && "sm:col-span-2",
            )}
          >
            <div className="relative h-48">
              {imgSrc(goal.image) ? (
                <img src={imgSrc(goal.image)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : null}
              <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#54B848] text-[#102A40]">
                <Ico name={goal.icon} className="h-5 w-5" />
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white">{goal.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{goal.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

export function InvestorGoals({ content: c, root }) {
  return (
    <section {...root} aria-labelledby="goals-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="goals-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <GoalsAccordion goals={visibleItems(c.goals)} />
      </div>
    </section>
  );
}

export function InvestorWhoWeHelp({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="who-we-help-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 id="who-we-help-heading" className={H2}>
            {c.heading}
          </h2>
          <ul className="mt-10 space-y-3">
            {visibleItems(c.items).map((item, idx) => (
              <motion.li
                key={item.id || item.text}
                {...reveal(idx)}
                className="group flex items-center gap-5 bg-white p-5 shadow-sm transition-transform duration-300 hover:translate-x-1 dark:bg-white/[0.05]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#EAF1F7] text-[#21649A] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Ico name={item.icon} className="h-5 w-5" />
                </span>
                <span className="text-base font-medium leading-snug text-[#15344F] dark:text-white">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        {imgSrc(c.image) ? (
          <div className="relative min-h-[320px] overflow-hidden lg:col-span-5 lg:min-h-0">
            <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function HelpCard({ item, index }) {
  return (
    <li className="flex w-[min(85vw,25rem)] shrink-0 snap-start">
      <article className="group flex w-full flex-col border border-white/15 bg-white/[0.07] p-8 backdrop-blur-md transition-colors duration-300 hover:border-[#54B848]/60 hover:bg-white/[0.12]">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
            <Ico name={item.icon} className="h-5 w-5" />
          </span>
          <span className="font-display text-[1.6rem] leading-none text-white/30">{pad2(index + 1)}</span>
        </div>
        <h3 className="mt-6 font-display text-[1.35rem] font-medium leading-snug">{item.title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-200">{item.text}</p>
      </article>
    </li>
  );
}

function HelpBackground({ image }) {
  return (
    <>
      {imgSrc(image) ? (
        <img {...imgProps(image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071321]/85 via-[#0B1E30]/75 to-[#071321]/90" />
    </>
  );
}

export function InvestorHowWeHelp({ content: c, root }) {
  const reduce = useReducedMotion();
  const items = visibleItems(c.items);
  const wrapRef = useRef(null);
  const viewportRef = useRef(null);
  const listRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return undefined;
    const measure = () => setDistance(Math.max(0, list.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(list);
    return () => observer.disconnect();
  }, [reduce, items.length]);

  const heading = (
    <h2 id="how-we-help-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
      {c.heading}
    </h2>
  );

  if (reduce) {
    return (
      <section
        {...root}
        aria-labelledby="how-we-help-heading"
        className="relative isolate scroll-mt-24 overflow-hidden bg-[#071321] py-16 text-white sm:py-20 lg:py-24"
      >
        <HelpBackground image={c.backgroundImage} />
        <div className="site-frame px-4 sm:px-6">
          {heading}
          <ul className="mt-12 flex snap-x gap-5 overflow-x-auto pb-2">
            {items.map((item, idx) => (
              <HelpCard key={item.id || item.title} item={item} index={idx} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      {...root}
      aria-labelledby="how-we-help-heading"
      className="relative scroll-mt-24 bg-[#071321] text-white"
      style={{ height: `calc(100svh - var(--header-height, 4.875rem) + ${distance}px)` }}
    >
      <div className="sticky top-[var(--header-height,4.875rem)] isolate flex h-[calc(100svh-var(--header-height,4.875rem))] flex-col overflow-hidden py-10 sm:py-12">
        <HelpBackground image={c.backgroundImage} />
        <div className="site-frame w-full shrink-0 px-4 sm:px-6">
          {heading}
          <div aria-hidden="true" className="mt-6 h-px bg-white/15">
            <motion.span className="block h-px origin-left bg-[#54B848]" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
        <div ref={viewportRef} className="mt-8 flex min-h-0 flex-1 items-center overflow-hidden">
          <motion.ul ref={listRef} style={{ x }} className="site-gutter-x flex w-max items-stretch gap-5">
            {items.map((item, idx) => (
              <HelpCard key={item.id || item.title} item={item} index={idx} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export function InvestorPlan({ content: c, root }) {
  const reduce = useReducedMotion();
  const items = visibleItems(c.items);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const setItemRef = (idx) => (el) => {
    itemRefs.current[idx] = el;
  };

  return (
    <section {...root} aria-labelledby="plan-heading" className="bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height,4.875rem)+2rem)]">
            <h2 id="plan-heading" className={H2}>
              {c.heading}
            </h2>
            {c.intro ? <p className={cx(BODY, "mt-6")}>{c.intro}</p> : null}

            <div
              aria-hidden="true"
              className="relative mt-10 hidden -rotate-[1.5deg] overflow-hidden rounded-2xl bg-white p-7 shadow-[0_40px_80px_-40px_rgba(16,42,64,0.45)] ring-1 ring-[#DCE4E8] dark:bg-[#0B1E30] dark:ring-white/10 lg:block"
            >
              <span className="absolute right-0 top-0 h-10 w-10 rounded-bl-2xl bg-[#EAF1F7] shadow-[-4px_4px_10px_rgba(16,42,64,0.08)] dark:bg-[#0a1524]" />
              <div className="flex items-center gap-3 border-b border-[#DCE4E8] pb-4 pr-10 dark:border-white/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#15344F] text-[#8FCB86]">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="font-display text-[1.1rem] text-[#15344F] dark:text-white">{c.cardTitle || c.heading}</span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {items.map((item, idx) => {
                  const done = idx < active || active >= items.length;
                  const current = idx === active;
                  return (
                    <li
                      key={item.id || item.title}
                      className={cx(
                        "flex items-center gap-3 rounded-lg px-2 py-1.5 text-[0.875rem] transition-colors duration-300",
                        current && "bg-[#54B848]/15 font-semibold text-[#15344F] dark:text-white",
                        !current && done && "text-[#15344F] dark:text-white",
                        !current && !done && "text-[#5E6D7B]/70 dark:text-slate-500",
                      )}
                    >
                      <span
                        className={cx(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors duration-300",
                          done || current ? "border-[#54B848] bg-[#54B848] text-[#102A40]" : "border-[#DCE4E8] dark:border-white/20",
                        )}
                      >
                        {done || current ? <Check className="h-3 w-3" /> : null}
                      </span>
                      {item.title}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#EAF1F7] dark:bg-white/10">
                <motion.span
                  style={reduce ? undefined : { scaleX: scrollYProgress }}
                  className="block h-full origin-left rounded-full bg-[#54B848]"
                />
              </div>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="space-y-5 lg:col-span-7">
          {items.map((item, idx) => {
            const isActive = idx === active;
            return (
              <li
                key={item.id || item.title}
                ref={setItemRef(idx)}
                data-index={idx}
                className={cx(
                  "relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 dark:bg-white/[0.05] sm:p-9",
                  isActive ? "lg:shadow-[0_30px_60px_-30px_rgba(16,42,64,0.45)] lg:ring-2 lg:ring-[#54B848]" : "lg:opacity-55",
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-[#15344F]/[0.05] dark:text-white/[0.05]"
                >
                  {pad2(idx + 1)}
                </span>
                <span
                  className={cx(
                    "grid h-11 w-11 place-items-center rounded-full font-display transition-colors duration-500",
                    isActive ? "bg-[#54B848] text-[#102A40]" : "bg-[#15344F] text-white",
                  )}
                >
                  {idx + 1}
                </span>
                <h3 className="mt-5 font-display text-[1.45rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.6rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] first-letter:uppercase dark:text-slate-300 sm:text-base">
                  {item.text}
                </p>
              </li>
            );
          })}
          {c.closing ? (
            <li ref={setItemRef(items.length)} data-index={items.length} className="rounded-3xl bg-[#54B848] p-7 text-[#102A40] sm:p-9">
              <Check className="h-8 w-8" aria-hidden="true" />
              <p className="mt-4 font-display text-[1.35rem] leading-snug sm:text-[1.5rem]">{c.closing}</p>
            </li>
          ) : null}
        </ol>
      </div>
    </section>
  );
}

export function InvestorWhyChoose({ content: c, root }) {
  const reduce = useReducedMotion();
  const wide = useMinWidth("(min-width: 1024px)");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const colA = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const colB = useTransform(scrollYProgress, [0, 1], [130, -130]);
  const colC = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const columnY = [colA, colB, colC];
  const parallax = wide && !reduce;

  const columns = [[], [], []];
  visibleItems(c.items).forEach((item, idx) => columns[idx % 3].push({ item, idx }));

  return (
    <section
      ref={ref}
      {...root}
      aria-labelledby="why-choose-heading"
      className="relative isolate overflow-hidden bg-[#071321] py-16 text-white sm:py-20 lg:pb-32 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(rgba(143,203,134,0.25)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#21649A]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#54B848]/10 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="why-choose-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {c.heading}
        </h2>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {columns.map((column, col) => (
            <motion.ul
              key={col}
              style={parallax ? { y: columnY[col] } : undefined}
              className={cx("grid content-start gap-5 lg:gap-6", col === 1 && "lg:mt-16")}
            >
              {column.map(({ item, idx }) => {
                const green = idx === 0;
                const blue = idx === 4;
                return (
                  <motion.li
                    key={item.id || item.title}
                    {...revealProps(reduce, col)}
                    className={cx(
                      "group relative overflow-hidden rounded-3xl p-7 transition-colors duration-300 sm:p-8",
                      green && "bg-[#54B848] text-[#102A40]",
                      blue && "bg-gradient-to-br from-[#21649A] to-[#15344F]",
                      !green && !blue && "border border-white/10 bg-white/[0.04] hover:border-[#54B848]/50 hover:bg-white/[0.07]",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cx(
                          "grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                          green && "bg-[#102A40] text-[#8FCB86]",
                          blue && "bg-white/15 text-white ring-1 ring-white/25",
                          !green && !blue && "bg-[#54B848]/15 text-[#8FCB86] ring-1 ring-[#54B848]/30",
                        )}
                      >
                        <Ico name={item.icon} className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx("font-display text-[2rem] leading-none", green ? "text-[#102A40]/40" : "text-white/20")}
                      >
                        {pad2(idx + 1)}
                      </span>
                    </div>
                    <h3
                      className={cx(
                        "mt-8 font-display text-[1.45rem] font-medium leading-snug sm:text-[1.6rem]",
                        green ? "text-[#102A40]" : "text-white",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cx(
                        "mt-3 text-[0.9375rem] leading-relaxed sm:text-base",
                        green ? "text-[#102A40]/85" : blue ? "text-white/85" : "text-slate-300",
                      )}
                    >
                      {item.text}
                    </p>
                  </motion.li>
                );
              })}
            </motion.ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvestorHowWeWork({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="how-we-work-heading" className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="how-we-work-heading" className={cx(H2, "lg:sticky lg:top-32")}>
            {c.heading}
          </h2>
        </div>

        <ol className="relative lg:col-span-8">
          <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-[#21649A]/25" />
          {visibleItems(c.steps).map((step, idx) => (
            <motion.li key={step.id || step.title} {...reveal(idx)} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#54B848] font-display text-lg text-[#102A40] ring-8 ring-white dark:ring-[#071321]">
                {idx + 1}
              </span>
              <div className="flex-1 border-b border-[#DCE4E8] pb-8 pt-2 dark:border-white/10">
                <h3 className="font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function InvestorStories({ content: c, root }) {
  const reduce = useReducedMotion();
  const [sectionRef, bgRef] = useFixedBackground(reduce);
  const bg = imgSrc(c.backgroundImage);

  return (
    <section
      ref={sectionRef}
      {...root}
      aria-labelledby="stories-heading"
      className="relative isolate overflow-hidden bg-[#15344F] py-20 text-white sm:py-24 lg:py-32"
    >
      {bg ? (
        <div
          aria-hidden="true"
          className={cx("pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat", !reduce && "max-[1199px]:hidden min-[1200px]:bg-fixed")}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ) : null}
      {bg && !reduce ? (
        <div
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat min-[1200px]:hidden"
          style={{ backgroundImage: `url(${bg})`, clipPath: "inset(100%)" }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#071321]/85 via-[#0B1E30]/65 to-[#071321]/90"
      />

      <div className="site-frame relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="stories-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
          </h2>
          {c.note ? <p className="mt-4 text-[0.875rem] leading-relaxed text-white/70">{c.note}</p> : null}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {visibleItems(c.stories).map((story, idx) => (
            <motion.article
              key={story.id || story.title}
              {...revealProps(reduce, idx)}
              className={cx(
                "rounded-3xl border border-white/20 bg-[#071321]/55 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-10",
                idx === 1 && "md:mt-24",
              )}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#54B848] text-[#102A40]">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-[1.6rem] font-medium leading-snug">{story.title}</h3>
              <p className="mt-4 text-base leading-[1.85] text-white/85">{story.text}</p>
            </motion.article>
          ))}
        </div>

        {c.disclaimer ? (
          <p className="mx-auto mt-12 max-w-3xl text-center text-[0.875rem] italic leading-relaxed text-white/70">{c.disclaimer}</p>
        ) : null}
      </div>
    </section>
  );
}

export function InvestorFaqsClosing({ content: c, root }) {
  const disclaimer = textBlocks(c.disclaimerText);

  return (
    <div data-cms-section={root?.["data-cms-section"]}>
      <FaqBlock anchor={root?.id} heading={c.faqHeading} contactLink={c.contactLink} faqs={c.faqs} panelPrefix="global-investors" />

      {c.closingTitle || c.closingText ? (
        <section
          aria-labelledby="closing-heading"
          className="border-t border-[#DCE4E8] bg-white py-16 text-center dark:border-white/10 dark:bg-[#071321] sm:py-20 lg:py-24"
        >
          <div className="site-frame px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 id="closing-heading" className={H2}>
                {c.closingTitle}
              </h2>
              {c.closingText ? <p className={cx(BODY, "mx-auto mt-5 max-w-2xl")}>{c.closingText}</p> : null}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton link={c.primaryButton} />
                <OutlineButton link={c.secondaryButton} trailingArrow />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {disclaimer.length ? (
        <section aria-label="Disclaimer" className="border-t border-[#DCE4E8] bg-white py-8 dark:border-white/10 dark:bg-[#071321]">
          <div className="site-frame space-y-3 px-4 sm:px-6">
            {disclaimer.map((paragraph, idx) => (
              <p
                key={paragraph}
                className={cx(idx === 0 ? "text-[0.8125rem]" : "text-[0.75rem]", "leading-relaxed text-[#5E6D7B] dark:text-slate-400")}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
