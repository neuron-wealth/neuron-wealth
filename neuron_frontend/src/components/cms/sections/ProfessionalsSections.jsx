import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight, Check, Clock, Compass, FileCheck, Handshake, Sprout, Users, Wallet } from "lucide-react";
import { cx } from "../../../utils/cx";
import { CmsLink, hasLink, strings, visibleItems } from "../primitives";
import {
  BODY,
  FOCUS,
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
  upperFirst,
  useReveal,
} from "./serviceKit";

const DOC_CORNER = "[clip-path:polygon(0_0,calc(100%_-_28px)_0,100%_28px,100%_100%,0_100%)]";
const DRIFT_OFFSETS = ["", "sm:ml-[6%]", "sm:ml-[12%]", "sm:ml-[18%]", "sm:ml-[24%]"];

export function CxoHero({ content: c, root }) {
  const trust = strings(c.trustItems);

  return (
    <section
      {...root}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)] text-white lg:min-h-[46rem]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#21649A]/25 blur-3xl" />

      <div className="site-frame relative px-4 pb-14 sm:px-6 lg:pb-24">
        <div className="mt-10 lg:mt-14 lg:w-[52%] lg:pr-6">
          {c.eyebrow ? (
            <p className="inline-flex items-center rounded-2xl border border-[#8FCB86]/40 bg-[#8FCB86]/10 px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#8FCB86] sm:rounded-full sm:text-[0.75rem]">
              {c.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]">
            {c.title}
            {c.titleHighlight ? (
              <>
                {" "}
                <span className="block italic text-[#8FCB86]">{c.titleHighlight}</span>
              </>
            ) : null}
          </h1>
          <span aria-hidden="true" className="mt-6 block h-1 w-16 bg-[#54B848]" />
          <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-white/85 sm:text-[1rem] lg:text-[1.0625rem]">
            {textBlocks(c.paragraphs).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton link={c.primaryButton} />
            <OutlineButton link={c.secondaryButton} light trailingArrow />
          </div>
        </div>
      </div>

      <div className="relative pb-10 sm:h-[28rem] sm:pb-0 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%]">
        {imgSrc(c.image) ? <img {...imgProps(c.image)} className="h-[20rem] w-full object-cover object-center sm:h-full" /> : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#102A40] via-[#102A40]/10 to-[#102A40]/60 lg:bg-gradient-to-r lg:from-[#102A40] lg:via-[#102A40]/15 lg:to-[#102A40]/25"
        />
        {trust.length ? (
          <ul className="relative z-10 mx-4 -mt-16 grid gap-x-5 gap-y-3 border border-white/20 bg-[#102A40]/85 p-5 backdrop-blur-md sm:absolute sm:bottom-8 sm:left-6 sm:right-6 sm:mx-0 sm:mt-0 sm:grid-cols-2 lg:bottom-12 lg:left-12 lg:right-10">
            {trust.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.8125rem] font-medium leading-snug text-white sm:text-[0.875rem]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function CxoFamiliar({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="familiar-heading" className="bg-[#F7F8F5] py-14 dark:bg-[#0a1524] sm:py-16 lg:py-20">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="familiar-heading" className={cx(H2, "lg:col-span-5")}>
            {c.heading}
          </h2>
          {c.text ? <p className={cx(BODY, "lg:col-span-7")}>{c.text}</p> : null}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {imgSrc(c.image) ? (
            <motion.div {...reveal(0)} className="relative min-h-[14rem] overflow-hidden lg:col-span-4">
              <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 to-transparent" />
              <span aria-hidden="true" className="absolute bottom-5 left-5 block h-1 w-14 bg-[#54B848]" />
            </motion.div>
          ) : null}

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {strings(c.quotes).map((quote, idx) => (
              <motion.li
                key={quote}
                {...reveal(idx % 2)}
                className={cx(
                  "flex items-start gap-3 border-l-[3px] bg-white px-5 py-4 dark:bg-white/[0.05]",
                  idx % 2 === 0 ? "border-[#54B848]" : "border-[#21649A] dark:border-[#8FCB86]",
                )}
              >
                <span aria-hidden="true" className="mt-1 font-display text-[2rem] leading-[0.7] text-[#54B848]">
                  &ldquo;
                </span>
                <p className="font-display text-[1.05rem] italic leading-snug text-[#15344F] dark:text-white sm:text-[1.1rem]">{quote}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CxoDrift({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="busy-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="busy-heading" className={H2}>
            {c.heading}
          </h2>
          {c.subheading ? (
            <p className="mt-5 font-display text-[1.4rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:text-[1.6rem]">{c.subheading}</p>
          ) : null}
          {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}
        </div>

        <div className="lg:col-span-7">
          <ul className="relative space-y-3">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 hidden border-l-2 border-dashed border-[#DCE4E8] dark:border-white/15 sm:block"
            />
            {strings(c.items).map((item, idx) => (
              <motion.li
                key={item}
                {...reveal(idx)}
                className={cx(
                  "relative flex items-center gap-4 border border-[#DCE4E8] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]",
                  DRIFT_OFFSETS[Math.min(idx, DRIFT_OFFSETS.length - 1)],
                )}
              >
                <Clock className="h-5 w-5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" aria-hidden="true" />
                <span className="text-[0.9375rem] leading-snug text-[#18324A] dark:text-slate-200 sm:text-base">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {c.banner ? (
        <div className="site-frame mt-14 px-4 sm:px-6">
          <p className="bg-[#54B848] px-8 py-7 text-center font-display text-[1.35rem] font-medium leading-snug text-[#102A40] sm:text-[1.6rem]">
            {c.banner}
          </p>
        </div>
      ) : null}
    </section>
  );
}

export function CxoFamilyCfo({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="cfo-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cfo-heading" className={H2}>
            {c.heading}
          </h2>
          {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}
          {c.lead ? <p className="mt-4 text-base font-medium leading-[1.8] text-[#15344F] dark:text-white sm:text-[1.0625rem]">{c.lead}</p> : null}
        </div>

        <div className="mt-12">
          {c.teamLine || c.teamLineHighlight || c.teamLineEnd ? (
            <motion.div
              {...reveal(0)}
              className="relative z-10 mx-auto flex max-w-md items-center gap-5 bg-[#15344F] px-7 py-6 text-white shadow-[0_18px_40px_rgba(7,19,33,0.18)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                <Users className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-display text-[1.3rem] font-medium leading-snug sm:text-[1.45rem]">
                {c.teamLine} {c.teamLineHighlight ? <span className="text-[#8FCB86]">{c.teamLineHighlight}</span> : null} {c.teamLineEnd}
              </p>
            </motion.div>
          ) : null}

          <span aria-hidden="true" className="mx-auto hidden h-10 w-px bg-[#21649A]/40 lg:block" />

          <div className="relative mt-8 lg:mt-0 lg:pt-10">
            <span
              aria-hidden="true"
              className="absolute left-[calc(12.5%_-_0.5625rem)] right-[calc(12.5%_-_0.5625rem)] top-0 hidden h-px bg-[#21649A]/40 lg:block"
            />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {visibleItems(c.roles).map((role, idx) => (
                <motion.li
                  key={role.id || role.title}
                  {...reveal(idx % 4)}
                  className="group relative flex flex-col border border-[#DCE4E8] bg-white transition-colors duration-300 hover:border-[#21649A] dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span aria-hidden="true" className="absolute -top-10 left-1/2 hidden h-10 w-px bg-[#21649A]/40 lg:block" />
                  <span aria-hidden="true" className="absolute -top-[5px] left-1/2 z-10 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#54B848] lg:block" />
                  <div className="relative h-32 overflow-hidden">
                    {imgSrc(role.image) ? (
                      <img
                        src={imgSrc(role.image)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071321]/50 to-transparent" />
                    <span aria-hidden="true" className="absolute right-3 top-3 bg-white/90 px-2 py-0.5 text-xs font-semibold tabular-nums text-[#15344F]">
                      {pad2(idx + 1)}
                    </span>
                  </div>
                  <div className="relative flex-1 px-5 pb-6 pt-9">
                    <span className="absolute -top-5 left-5 grid h-10 w-10 place-items-center bg-[#15344F] text-white transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                      <Ico name={role.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-[1.2rem] font-medium leading-snug text-[#15344F] dark:text-white">{role.title}</h3>
                    <p className="mt-2 text-[0.9063rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{upperFirst(role.text)}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CxoWhoWeHelp({ content: c, root }) {
  const personas = visibleItems(c.personas);
  const [persona, setPersona] = useState(0);
  const personaTabs = useRef([]);
  const current = Math.min(persona, Math.max(personas.length - 1, 0));

  const onPersonaKey = (event, index) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + personas.length) % personas.length;
    setPersona(next);
    personaTabs.current[next]?.focus();
  };

  return (
    <section {...root} aria-labelledby="who-we-help-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="who-we-help-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        {personas.length ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div role="tablist" aria-label={c.heading || "Who we help"} aria-orientation="vertical" className="grid gap-2 lg:col-span-5">
              {personas.map((item, idx) => {
                const active = current === idx;
                return (
                  <button
                    key={item.id || item.title}
                    ref={(el) => {
                      personaTabs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`persona-tab-${idx}`}
                    aria-selected={active}
                    aria-controls={`persona-panel-${idx}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setPersona(idx)}
                    onKeyDown={(event) => onPersonaKey(event, idx)}
                    className={cx(
                      "flex items-center gap-4 border-l-4 px-5 py-4 text-left transition-colors lg:py-6",
                      active
                        ? "border-[#54B848] bg-[#15344F] text-white"
                        : "border-transparent bg-[#F7F8F5] text-[#15344F] hover:bg-[#EAF1F7] dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]",
                      FOCUS,
                    )}
                  >
                    <Ico name={item.icon} className={cx("h-5 w-5 shrink-0", active ? "text-[#8FCB86]" : "text-[#21649A] dark:text-[#8FCB86]")} />
                    <span className="font-display text-[1.15rem] font-medium leading-snug sm:text-[1.25rem]">{item.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              {personas.map((item, idx) => (
                <div
                  key={item.id || item.title}
                  role="tabpanel"
                  id={`persona-panel-${idx}`}
                  aria-labelledby={`persona-tab-${idx}`}
                  hidden={current !== idx}
                  className="relative isolate h-full min-h-[24rem] overflow-hidden bg-[#071321]"
                >
                  {imgSrc(item.image) ? (
                    <img src={imgSrc(item.image)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                  ) : null}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/75 to-[#071321]/10" />
                  <div className="flex h-full min-h-[24rem] flex-col justify-end p-8 sm:p-10">
                    <span className="grid h-12 w-12 place-items-center bg-[#54B848] text-[#102A40]">
                      <Ico name={item.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.8rem] font-medium leading-tight text-white sm:text-[2.1rem]">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-[1.85] text-white/85 sm:text-[1.0625rem]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {c.note ? <p className={BODY}>{c.note}</p> : null}
            {c.quote ? (
              <p className="mt-5 border-l-2 border-[#54B848] pl-5 font-display text-[1.25rem] leading-snug text-[#15344F] dark:text-white sm:text-[1.4rem]">
                {c.quote}
              </p>
            ) : null}
          </div>
          {hasLink(c.link) && c.link.label ? (
            <CmsLink
              link={c.link}
              className={cx(
                "group flex items-center justify-between gap-6 self-end border border-[#DCE4E8] p-6 transition-colors hover:border-[#21649A] dark:border-white/10 lg:col-span-5",
                FOCUS,
              )}
            >
              <span className="text-base font-medium leading-snug text-[#15344F] dark:text-white">{c.link.label}</span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-[#21649A] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#8FCB86]"
                aria-hidden="true"
              />
            </CmsLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function CxoEarning({ content: c, root }) {
  const reduce = useReducedMotion();
  const earningRef = useRef(null);
  const { scrollYProgress: earningProgress } = useScroll({ target: earningRef, offset: ["start end", "end start"] });
  const still = (from, to) => (reduce ? [to, to] : [from, to]);
  const earnX = useTransform(earningProgress, [0.05, 0.38], still(-90, 0));
  const createX = useTransform(earningProgress, [0.05, 0.38], still(90, 0));
  const signScale = useTransform(earningProgress, [0.2, 0.4], still(0.4, 1));
  const lineScale = useTransform(earningProgress, [0.3, 0.6], still(0, 1));
  const approachY = [
    useTransform(earningProgress, [0.3, 0.55], still(40, 0)),
    useTransform(earningProgress, [0.33, 0.58], still(70, 0)),
    useTransform(earningProgress, [0.36, 0.61], still(100, 0)),
  ];
  const bg = imgSrc(c.backgroundImage);

  return (
    <section
      ref={earningRef}
      {...root}
      aria-labelledby="earning-heading"
      className="relative isolate overflow-clip bg-[#071321] bg-cover bg-center py-20 text-white sm:py-24 lg:bg-fixed lg:py-28"
      style={bg ? { backgroundImage: `url('${bg}')` } : undefined}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071321]/90 via-[#071321]/70 to-[#071321]/95" />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="earning-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {c.heading}
        </h2>

        <div className="relative mt-12 grid gap-5 md:grid-cols-2 md:gap-16">
          <motion.div style={{ x: earnX }} className="flex flex-col border border-white/15 bg-white/[0.06] p-8 backdrop-blur-md sm:p-10">
            <Wallet className="h-9 w-9 text-white/60" strokeWidth={1.25} aria-hidden="true" />
            <p className="mt-6 text-base leading-[1.85] text-white/75 sm:text-[1.0625rem]">
              {c.earnTitle ? <strong className="font-display text-[1.45rem] font-medium text-white">{c.earnTitle}</strong> : null} {c.earnText}
            </p>
          </motion.div>

          <motion.span
            aria-hidden="true"
            style={{ scale: signScale }}
            className="absolute left-1/2 top-1/2 z-10 -ml-7 -mt-7 hidden h-14 w-14 place-items-center rounded-full bg-white font-display text-3xl text-[#15344F] shadow-xl md:grid"
          >
            &ne;
          </motion.span>

          <motion.div style={{ x: createX }} className="flex flex-col bg-[#54B848] p-8 text-[#102A40] shadow-[0_20px_50px_rgba(84,184,72,0.25)] sm:p-10">
            <Sprout className="h-9 w-9" strokeWidth={1.25} aria-hidden="true" />
            <p className="mt-6 text-base leading-[1.85] text-[#102A40]/90 sm:text-[1.0625rem]">
              {c.createTitle ? <strong className="font-display text-[1.45rem] font-medium text-[#102A40]">{c.createTitle}</strong> : null}{" "}
              {c.createText}
            </p>
          </motion.div>
        </div>

        {c.summary ? <p className="mt-10 max-w-4xl text-base leading-[1.8] text-white/85 sm:text-[1.0625rem]">{c.summary}</p> : null}

        <div aria-hidden="true" className="mt-12 h-px bg-white/15">
          <motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-[#54B848]" />
        </div>

        {c.approachHeading ? (
          <p className="mt-10 font-display text-[1.6rem] font-medium leading-tight text-white sm:text-[1.9rem]">{c.approachHeading}</p>
        ) : null}
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {visibleItems(c.approach).map((item, idx) => (
            <motion.li
              key={item.id || item.title}
              style={{ y: approachY[idx % approachY.length] }}
              className="relative border-t-2 border-[#54B848] bg-[#0B1E30]/75 p-7 backdrop-blur-md"
            >
              <span aria-hidden="true" className="font-display text-[2.5rem] leading-none text-[#8FCB86]">
                {pad2(idx + 1)}
              </span>
              <h3 className="mt-4 font-display text-[1.35rem] font-medium leading-snug text-white">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CxoHowWeHelp({ content: c, root }) {
  const reveal = useReveal();
  const [featured, ...others] = visibleItems(c.services);

  return (
    <section {...root} aria-labelledby="how-we-help-heading" className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-help-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured ? (
            <motion.article
              {...reveal(0)}
              className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden bg-[#071321] p-8 text-white sm:col-span-2 sm:p-10"
            >
              {imgSrc(featured.image) ? (
                <img
                  src={imgSrc(featured.image)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321]/95 via-[#071321]/70 to-[#071321]/10" />
              <span className="absolute left-8 top-8 font-display text-lg text-[#8FCB86] sm:left-10 sm:top-10">01</span>
              <span className="grid h-12 w-12 place-items-center bg-[#54B848] text-[#102A40]">
                <Ico name={featured.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 max-w-lg font-display text-[1.8rem] font-medium leading-tight sm:text-[2.1rem]">{featured.title}</h3>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">{featured.text}</p>
            </motion.article>
          ) : null}

          {others.map((item, idx) => {
            const isLast = idx === others.length - 1;
            return (
              <motion.article
                key={item.id || item.title}
                {...reveal((idx % 3) + 1)}
                className={cx(
                  "group flex flex-col overflow-hidden border border-[#DCE4E8] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#54B848] hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]",
                  isLast && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <div className="relative h-44 overflow-hidden">
                  {imgSrc(item.image) ? (
                    <img
                      src={imgSrc(item.image)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071321]/55 to-transparent" />
                  <span className="absolute right-4 top-4 bg-white/90 px-2.5 py-1 font-display text-sm text-[#15344F]">{pad2(idx + 2)}</span>
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-10">
                  <span className="absolute -top-6 left-6 grid h-12 w-12 place-items-center bg-[#15344F] text-white transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                    <Ico name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[1.25rem] font-medium leading-snug text-[#15344F] dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-[0.9063rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CxoSoundingBoard({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="sounding-heading" className="bg-[#071321] text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-full">
          {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" /> : null}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071321]/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#071321]/40"
          />
        </div>

        <div className="px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
          <h2 id="sounding-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
          </h2>
          {c.text ? <p className="mt-6 text-base leading-[1.8] text-white/75 sm:text-[1.0625rem]">{c.text}</p> : null}
          {c.callout ? (
            <p className="mt-6 flex items-center gap-3 font-display text-[1.25rem] text-[#8FCB86]">
              <Compass className="h-5 w-5" aria-hidden="true" />
              {c.callout}
            </p>
          ) : null}
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {strings(c.decisions).map((item, idx) => (
              <motion.li
                key={item}
                {...reveal(idx % 3)}
                className="border border-white/15 bg-white/[0.05] px-4 py-2.5 text-[0.875rem] leading-snug text-white/90 transition-colors duration-300 hover:border-[#54B848]/70"
              >
                {item}
              </motion.li>
            ))}
          </ul>
          {c.closing ? <p className="mt-8 border-t border-white/15 pt-6 text-base italic leading-[1.8] text-white/75">{c.closing}</p> : null}
        </div>
      </div>
    </section>
  );
}

export function CxoFreedom({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="freedom-heading" className="scroll-mt-24 bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.figure
            {...reveal(0)}
            className="relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden bg-[#071321] p-8 sm:p-10 lg:col-span-5"
          >
            {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/50 to-transparent" />
            <span aria-hidden="true" className="block h-1 w-14 bg-[#54B848]" />
            {c.quote ? <p className="mt-6 font-display text-[1.5rem] leading-snug text-white sm:text-[1.75rem]">{c.quote}</p> : null}
          </motion.figure>

          <div className="lg:col-span-7">
            <h2 id="freedom-heading" className={H2}>
              {c.heading}
            </h2>
            {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}

            <div className="relative mt-10">
              <span aria-hidden="true" className="absolute bottom-8 left-6 top-8 w-px bg-[#21649A]/30 dark:bg-white/20" />
              <ol className="space-y-5">
                {visibleItems(c.questions).map((item, idx) => (
                  <motion.li key={item.id || item.title} {...reveal(idx)} className="relative flex gap-5">
                    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#15344F] font-display text-lg text-white ring-4 ring-[#F7F8F5] dark:ring-[#0a1524]">
                      {idx + 1}
                    </span>
                    <div className="flex flex-1 items-start gap-4 border border-[#DCE4E8] bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
                      <div className="flex-1">
                        <h3 className="font-display text-[1.35rem] font-medium leading-snug text-[#15344F] dark:text-white">{item.title}</h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">{item.text}</p>
                      </div>
                      <Ico name={item.icon} className="h-6 w-6 shrink-0 text-[#54B848]" />
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {c.note || c.legacy ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {c.note ? <p className="bg-[#15344F] p-8 text-base leading-[1.8] text-white/90 sm:p-10 sm:text-[1.0625rem]">{c.note}</p> : null}
            {c.legacy ? (
              <p className="bg-[#54B848] p-8 font-display text-[1.2rem] leading-snug text-[#102A40] sm:p-10 sm:text-[1.3rem]">{c.legacy}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CxoDeliverables({ content: c, root }) {
  const reveal = useReveal();
  const items = visibleItems(c.items);
  const stayItems = visibleItems(c.stayItems);

  return (
    <section {...root} aria-labelledby="service-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 id="service-heading" className={H2}>
                {c.heading}
              </h2>
              {c.receiveHeading ? (
                <h3 className="mt-8 flex items-center gap-3 font-display text-[1.5rem] font-medium text-[#15344F] dark:text-white">
                  <span className="grid h-11 w-11 place-items-center bg-[#54B848] text-[#102A40]">
                    <FileCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {c.receiveHeading}
                </h3>
              ) : null}
            </div>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {items.map((item, idx) => (
              <motion.li
                key={item.id || item.title}
                {...reveal(idx % 2)}
                className={cx("relative bg-[#F7F8F5] p-7 dark:bg-white/[0.05]", DOC_CORNER, idx === items.length - 1 && "sm:col-span-2")}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-7 w-7 bg-gradient-to-bl from-transparent from-50% to-[#DCE4E8] to-50% dark:to-white/20"
                />
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm tabular-nums text-[#21649A] dark:text-[#8FCB86]">{pad2(idx + 1)}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-[#DCE4E8] dark:bg-white/10" />
                </div>
                <h4 className="mt-5 font-display text-[1.25rem] font-medium leading-snug text-[#15344F] dark:text-white">
                  {String(item.title || "").replace(/:$/, "")}
                </h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{upperFirst(item.text)}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {stayItems.length ? (
          <div className="relative isolate mt-14 overflow-hidden bg-[#071321] text-white">
            {imgSrc(c.stayImage) ? <img {...imgProps(c.stayImage)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#071321]/80" />
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
              <h3 className="flex items-center gap-4 font-display text-[1.8rem] font-medium leading-tight sm:text-[2.1rem] lg:col-span-4">
                <Handshake className="h-8 w-8 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                {c.stayHeading}
              </h3>
              <ul className="grid gap-px bg-white/15 sm:grid-cols-2 lg:col-span-8">
                {stayItems.map((item, idx) => (
                  <motion.li key={item.id || item.text} {...reveal(idx % 2)} className="flex items-start gap-4 bg-[#0B1E30]/85 p-6 backdrop-blur-sm">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                      <Ico name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="pt-1.5 text-base leading-snug text-white/90">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function WhyRow({ item, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 45%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-28, 0]);

  return (
    <li ref={ref} className="group relative grid gap-5 border-b border-white/10 py-8 md:grid-cols-12 md:items-center md:gap-8 lg:py-10">
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { scaleX: scrollYProgress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-[#54B848]"
      />
      <span aria-hidden="true" className="font-display text-sm tracking-[0.2em] text-[#8FCB86] md:col-span-1">
        {pad2(index + 1)}
      </span>
      <motion.h3
        style={reduce ? undefined : { opacity, x }}
        className="font-display text-[1.9rem] font-medium leading-[1.08] tracking-tight text-white transition-colors duration-300 group-hover:text-[#8FCB86] sm:text-[2.4rem] md:col-span-6 lg:text-[2.75rem]"
      >
        {item.title}
      </motion.h3>
      <motion.div style={reduce ? undefined : { opacity }} className="flex items-start gap-4 md:col-span-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#54B848]/15 text-[#8FCB86] ring-1 ring-[#54B848]/30 transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
          <Ico name={item.icon} className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <p className="pt-1 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">{item.text}</p>
      </motion.div>
    </li>
  );
}

export function CxoWhyChoose({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="why-choose-heading" className="relative isolate overflow-hidden bg-[#071321] py-20 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#21649A]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-[#54B848]/10 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <motion.div {...reveal(0)} className="flex items-center gap-5">
          <span aria-hidden="true" className="h-1 w-14 shrink-0 bg-[#54B848]" />
          <h2 id="why-choose-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
          </h2>
        </motion.div>

        <ol className="mt-12 border-t border-white/10 lg:mt-16">
          {visibleItems(c.items).map((item, idx) => (
            <WhyRow key={item.id || item.title} item={item} index={idx} />
          ))}
        </ol>
      </div>
    </section>
  );
}

const CHEVRON_SURFACES = ["bg-[#15344F] text-white", "bg-[#1C4A72] text-white", "bg-[#21649A] text-white"];

export function CxoHowWeWork({ content: c, root }) {
  const reveal = useReveal();
  const steps = visibleItems(c.steps);

  return (
    <section {...root} aria-labelledby="how-we-work-heading" className="scroll-mt-24 bg-white pb-16 pt-24 dark:bg-[#071321] sm:pb-20 lg:pb-24 lg:pt-28">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-work-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <ol className="mt-12 grid gap-3 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <motion.li
                key={step.id || step.title}
                {...reveal(idx)}
                className={cx(
                  "flex flex-col p-7 lg:py-8 lg:pr-10",
                  idx === 0
                    ? "lg:pl-8 lg:[clip-path:polygon(0_0,calc(100%_-_28px)_0,100%_50%,calc(100%_-_28px)_100%,0_100%)]"
                    : "lg:pl-12 lg:[clip-path:polygon(0_0,calc(100%_-_28px)_0,100%_50%,calc(100%_-_28px)_100%,0_100%,28px_50%)]",
                  isLast ? "bg-[#54B848] text-[#102A40]" : CHEVRON_SURFACES[idx % CHEVRON_SURFACES.length],
                )}
              >
                <span className={cx("font-display text-[2rem] leading-none", isLast ? "text-[#102A40]/60" : "text-white/40")}>{pad2(idx + 1)}</span>
                <h3 className="mt-4 font-display text-[1.3rem] font-medium leading-snug">{step.title}</h3>
                <p className={cx("mt-2 text-[0.9375rem] leading-relaxed", isLast ? "text-[#102A40]/85" : "text-white/80")}>{step.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function CxoStories({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="stories-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="stories-heading" className={H2}>
            {c.heading}
          </h2>
          {c.note ? <p className="text-[0.875rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400">{c.note}</p> : null}
        </div>

        <div className="mt-12 space-y-8">
          {visibleItems(c.stories).map((story, idx) => {
            const flip = idx % 2 === 1;
            return (
              <motion.article key={story.id || story.title} {...reveal(0)} className="grid overflow-hidden bg-white dark:bg-white/[0.05] lg:grid-cols-12">
                <div className={cx("relative isolate flex min-h-[18rem] flex-col justify-end p-8 sm:p-10 lg:col-span-5", flip && "lg:order-2")}>
                  {imgSrc(story.image) ? (
                    <img src={imgSrc(story.image)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                  ) : null}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321]/90 via-[#071321]/40 to-transparent" />
                  <span className="grid h-12 w-12 place-items-center bg-[#54B848] text-[#102A40]">
                    <Ico name={story.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.6rem] font-medium leading-snug text-white sm:text-[1.8rem]">{story.title}</h3>
                </div>
                <div className="flex items-center p-8 sm:p-10 lg:col-span-7 lg:p-14">
                  <p className="border-l-2 border-[#54B848] pl-6 text-base leading-[1.9] text-[#18324A] dark:text-slate-200 sm:text-[1.0625rem]">{story.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {c.disclaimer ? <p className="mt-8 text-[0.875rem] italic leading-relaxed text-[#5E6D7B] dark:text-slate-400">{c.disclaimer}</p> : null}
      </div>
    </section>
  );
}

export function CxoFaqsClosing({ content: c, root }) {
  const disclaimer = textBlocks(c.disclaimerText);

  return (
    <div data-cms-section={root?.["data-cms-section"]}>
      <FaqBlock anchor={root?.id} heading={c.faqHeading} contactLink={c.contactLink} faqs={c.faqs} panelPrefix="professionals" />

      {c.closingTitle || c.closingText ? (
        <section
          aria-labelledby="closing-heading"
          className="border-t border-[#DCE4E8] bg-white px-4 py-16 text-center dark:border-white/10 dark:bg-[#071321] sm:px-6 sm:py-20 lg:py-24"
        >
          <div className="site-frame">
            <h2 id="closing-heading" className={cx(H2, "mx-auto max-w-3xl")}>
              {c.closingTitle}
              {c.closingHighlight ? (
                <>
                  {" "}
                  <span className="text-[#21649A] dark:text-[#8FCB86]">{c.closingHighlight}</span>
                </>
              ) : null}
            </h2>
            <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-16 bg-[#54B848]" />
            {c.closingText ? <p className={cx(BODY, "mx-auto mt-6 max-w-3xl")}>{c.closingText}</p> : null}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton link={c.primaryButton} />
              <OutlineButton link={c.secondaryButton} trailingArrow />
            </div>
          </div>
        </section>
      ) : null}

      {disclaimer.length ? (
        <section aria-label="Disclaimer" className="border-t border-[#DCE4E8] bg-white py-8 dark:border-white/10 dark:bg-[#071321]">
          {disclaimer.map((paragraph) => (
            <p key={paragraph} className="site-frame px-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400 sm:px-6">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}
    </div>
  );
}
