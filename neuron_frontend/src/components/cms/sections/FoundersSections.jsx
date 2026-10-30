import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, HeartHandshake, House, Landmark, PhoneCall, Scale, ShieldCheck } from "lucide-react";
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

const NOTE_TILTS = [-1.5, 1, -0.5, 1.5, -1, 0.75];

const EQ_BARS = [
  { height: 45, delay: 0 },
  { height: 85, delay: 0.2 },
  { height: 60, delay: 0.4 },
  { height: 100, delay: 0.1 },
];

const LEDGER_LINES = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, rgba(33,100,154,0.12) 35px, rgba(33,100,154,0.12) 36px)",
};

const STACK_SURFACES = ["bg-white dark:bg-[#0B1E30]", "bg-[#F7F8F5] dark:bg-[#102A40]", "bg-[#EAF1F7] dark:bg-[#15344F]"];

export function FoundersHero({ content: c, root }) {
  return (
    <section
      {...root}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#071321] pt-[var(--header-clearance,4.875rem)]"
    >
      {imgSrc(c.backgroundImage) ? (
        <img {...imgProps(c.backgroundImage)} className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321] via-[#071321]/90 to-[#071321]/30" />

      <div className="site-frame px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="mt-10 max-w-3xl lg:mt-16">
          {c.eyebrow ? (
            <p className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] sm:text-[13px]">
              <span aria-hidden="true" className="h-px w-8 bg-[#8FCB86]" />
              {c.eyebrow}
            </p>
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
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/90 sm:text-[16px] lg:text-[17px]">
            {textBlocks(c.paragraphs).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton link={c.primaryButton} />
            <OutlineButton link={c.secondaryButton} light trailingArrow />
          </div>

          {strings(c.trustItems).length ? (
            <ul className="mt-10 grid gap-x-6 gap-y-3 border-t border-white/15 pt-6 sm:grid-cols-2">
              {strings(c.trustItems).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] font-medium leading-snug text-white/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function FoundersFamiliar({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="familiar-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="familiar-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {strings(c.quotes).map((quote, idx) => (
            <motion.li
              key={quote}
              {...reveal(idx % 3, NOTE_TILTS[idx % NOTE_TILTS.length])}
              className={cx("relative p-7 pt-9 shadow-md", idx % 3 === 1 ? "bg-[#EAF1F7] dark:bg-[#21649A]/20" : "bg-white dark:bg-white/[0.06]")}
            >
              <span aria-hidden="true" className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 bg-[#54B848]/60" />
              <p className="font-display text-[1.2rem] italic leading-snug text-[#15344F] dark:text-white sm:text-[1.3rem]">
                &ldquo;{quote}&rdquo;
              </p>
            </motion.li>
          ))}
        </ul>

        {c.lead || c.text ? (
          <div className="mt-12 grid gap-6 border-t border-[#DCE4E8] pt-8 dark:border-white/10 lg:grid-cols-12">
            <p className="font-display text-[1.35rem] leading-snug text-[#15344F] dark:text-white sm:text-[1.5rem] lg:col-span-5">{c.lead}</p>
            <p className={cx(BODY, "lg:col-span-7")}>{c.text}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function FoundersExposed({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="exposed-heading" className="relative isolate overflow-hidden bg-[#102A40] py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#21649A]/30 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="exposed-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
            {c.headingHighlight ? (
              <>
                {" "}
                <span className="text-[#8FCB86]">{c.headingHighlight}</span>
              </>
            ) : null}
          </h2>
          {c.intro ? <p className="mt-6 text-base leading-[1.8] text-white/75 sm:text-[17px]">{c.intro}</p> : null}
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-12">
          <motion.div
            {...reveal(0)}
            style={LEDGER_LINES}
            className="relative flex min-h-[20rem] flex-col justify-between overflow-hidden bg-[#F7F8F5] p-8 text-[#15344F] sm:p-10 lg:col-span-5"
          >
            <span className="absolute inset-y-0 left-12 w-px bg-[#54B848]/40" aria-hidden="true" />
            <p className="relative pl-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#21649A]">{c.paperLabel}</p>
            <div aria-hidden="true" className="relative mt-10 flex h-36 items-end gap-3 pl-8">
              {[30, 45, 62, 80, 100].map((height) => (
                <span key={height} style={{ height: `${height}%` }} className="w-8 bg-gradient-to-t from-[#21649A] to-[#54B848] sm:w-10" />
              ))}
            </div>
            <p className="relative mt-8 pl-8 font-display text-[3rem] font-medium leading-none sm:text-[3.75rem]">{c.paperValue}</p>
          </motion.div>

          <span
            aria-hidden="true"
            className="absolute top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#102A40] bg-[#54B848] font-display text-[1.2rem] italic text-[#102A40] shadow-xl lg:grid"
            style={{ left: "41.666%" }}
          >
            vs
          </span>

          <motion.div {...reveal(1)} className="relative isolate overflow-hidden p-8 sm:p-10 lg:col-span-7 lg:pl-14">
            {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#071321]/95 via-[#0B1E30]/88 to-[#15344F]/80" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8FCB86]">{c.realLabel}</p>
            <ul className="mt-6 divide-y divide-white/15">
              {visibleItems(c.items).map((item) => (
                <li key={item.id || item.text} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-white/20 bg-white/10 text-[#8FCB86] backdrop-blur-sm">
                    <Ico name={item.icon} className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-base leading-relaxed text-white/90 sm:text-[17px]">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {c.closingLead || c.closingText ? (
        <div className="site-frame mt-14 px-4 sm:px-6">
          <div className="grid gap-6 border-t border-white/15 pt-10 lg:grid-cols-2 lg:items-center">
            <p className="font-display text-[1.6rem] leading-snug sm:text-[2rem]">
              {c.closingLead}
              {c.closingHighlight ? (
                <>
                  {" "}
                  <span className="text-[#8FCB86]">{c.closingHighlight}</span>
                </>
              ) : null}
            </p>
            <p className="text-base leading-[1.8] text-white/75 sm:text-[17px]">{c.closingText}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function FoundersBalanceSheets({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="balance-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="balance-heading" className={H2}>
            {c.heading}
          </h2>
          {c.intro ? <p className={cx(BODY, "mt-6")}>{c.intro}</p> : null}
        </div>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
          <motion.div {...reveal(0)} className="flex flex-col bg-[#15344F] p-8 text-white sm:p-10">
            <Building2 className="h-10 w-10 text-[#8FCB86]" strokeWidth={1.25} aria-hidden="true" />
            <p className="mt-6 font-display text-[1.35rem] leading-snug sm:text-[1.5rem]">{c.businessText}</p>
          </motion.div>

          <div aria-hidden="true" className="flex items-center justify-center md:flex-col">
            <span className="h-px flex-1 bg-[#54B848] md:h-auto md:w-1" />
            <span className="mx-3 grid h-14 w-14 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-lg md:mx-0 md:my-3">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <span className="h-px flex-1 bg-[#54B848] md:h-auto md:w-1" />
          </div>

          <motion.div
            {...reveal(1)}
            className="flex flex-col border-2 border-dashed border-[#21649A]/40 bg-[#F7F8F5] p-8 dark:bg-white/[0.04] sm:p-10"
          >
            <House className="h-10 w-10 text-[#21649A] dark:text-[#8FCB86]" strokeWidth={1.25} aria-hidden="true" />
            <p className="mt-6 font-display text-[1.35rem] leading-snug text-[#15344F] dark:text-white sm:text-[1.5rem]">{c.familyText}</p>
          </motion.div>
        </div>

        {c.summaryLead || c.summaryText ? (
          <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-[1.85] text-[#18324A] dark:text-slate-200 sm:text-[17px]">
            {c.summaryLead ? <strong className="font-semibold text-[#15344F] dark:text-white">{c.summaryLead}</strong> : null} {c.summaryText}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function PersonaAccordion({ items }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:flex lg:h-[30rem] lg:flex-row lg:gap-3">
      {items.map((item, idx) => {
        const isActive = idx === active;
        return (
          <li
            key={item.id || item.title}
            onMouseEnter={() => setActive(idx)}
            className={cx(
              "group relative isolate flex min-h-[19rem] overflow-hidden bg-[#15344F] text-white transition-[flex-grow] duration-500 ease-out lg:min-h-0",
              isActive ? "lg:flex-[3.4]" : "lg:flex-1",
              idx === items.length - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            {imgSrc(item.image) ? (
              <img
                src={imgSrc(item.image)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div
              aria-hidden="true"
              className={cx(
                "absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/65 to-[#071321]/15 transition-opacity duration-500",
                !isActive && "lg:bg-[#071321]/55",
              )}
            />
            <span aria-hidden="true" className="absolute right-5 top-5 font-display text-[1.1rem] text-white/70">
              {pad2(idx + 1)}
            </span>

            <div className="mt-auto w-full p-6 sm:p-7">
              <span
                className={cx(
                  "grid h-12 w-12 place-items-center rounded-full transition-colors duration-300",
                  isActive ? "bg-[#54B848] text-[#102A40]" : "bg-white/15 text-white backdrop-blur-sm",
                )}
              >
                <Ico name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.35rem] font-medium leading-snug sm:text-[1.45rem]">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={cx("text-left font-display", FOCUS)}
                >
                  {item.title}
                </button>
              </h3>
              <div
                className={cx(
                  "overflow-hidden transition-[max-height,opacity] duration-500",
                  isActive ? "lg:max-h-48 lg:opacity-100" : "lg:max-h-0 lg:opacity-0",
                )}
              >
                <p className="mt-3 text-[15px] leading-relaxed text-white/85 lg:w-[24rem] xl:w-[28rem]">{item.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function FoundersWhoWeHelp({ content: c, root }) {
  return (
    <section {...root} aria-labelledby="who-we-help-heading" className="bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="who-we-help-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <PersonaAccordion items={visibleItems(c.personas)} />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          {c.note ? <p className={cx(BODY, "text-[#18324A] lg:col-span-7")}>{c.note}</p> : null}
          {hasLink(c.link) && c.link.label ? (
            <CmsLink
              link={c.link}
              className={cx(
                "group flex items-center justify-between gap-6 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:bg-white/[0.05] lg:col-span-5",
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

export function FoundersStages({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section
      {...root}
      aria-labelledby="stages-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#15344F] via-[#102A40] to-[#071321] py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#54B848]/10 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="stages-heading" className={`${H2_SIZE} mx-auto max-w-3xl text-center text-white`}>
          {c.heading}
        </h2>

        <ol className="relative mx-auto mt-14 max-w-6xl">
          <span
            aria-hidden="true"
            className="absolute bottom-7 left-7 top-7 w-0.5 bg-gradient-to-b from-[#21649A] via-[#54B848] to-[#8FCB86] lg:left-1/2 lg:-translate-x-1/2"
          />
          {visibleItems(c.stages).map((stage, idx) => {
            const onLeft = idx % 2 === 0;
            return (
              <motion.li
                key={stage.id || stage.title}
                {...reveal(0)}
                className={cx("relative grid pb-8 last:pb-0 lg:grid-cols-2 lg:pb-4", idx > 0 && "lg:-mt-16")}
              >
                <span className="absolute left-0 top-0 z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-[#54B848] bg-[#102A40] text-[#8FCB86] shadow-[0_0_0_8px_rgba(84,184,72,0.12)] lg:left-1/2 lg:top-6 lg:-translate-x-1/2">
                  <Ico name={stage.icon} className="h-6 w-6" />
                </span>
                <div className={cx("pl-20 lg:pl-0", onLeft ? "lg:pr-16" : "lg:col-start-2 lg:pl-16")}>
                  <div
                    className={cx(
                      "group relative border border-white/15 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#54B848]/50 hover:bg-white/[0.08] sm:p-7",
                      onLeft && "lg:text-right",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx("absolute top-10 hidden h-px w-8 bg-[#54B848]/60 lg:block", onLeft ? "-right-8" : "-left-8")}
                    />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8FCB86]">
                      {c.stageLabel || "Stage"} {pad2(idx + 1)}
                    </span>
                    <h3 className="mt-2 font-display text-[1.4rem] font-medium leading-snug">{stage.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">{stage.text}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function FoundersLegacy({ content: c, root }) {
  const reveal = useReveal();
  const items = visibleItems(c.items);
  const split = Math.ceil(items.length / 2);

  return (
    <section {...root} aria-labelledby="legacy-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {imgSrc(c.image) ? (
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img {...imgProps(c.image)} loading="lazy" className="h-full w-full object-cover object-center" />
              </div>
              <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-0 hidden h-24 w-24 border-b-4 border-l-4 border-[#54B848] sm:block" />
            </div>
          ) : null}

          <div className="lg:col-span-6">
            <h2 id="legacy-heading" className={H2}>
              {c.heading}
            </h2>
            {c.subheading ? (
              <p className="mt-6 font-display text-[1.3rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:text-[1.45rem]">{c.subheading}</p>
            ) : null}
            {c.text ? <p className={cx(BODY, "mt-6")}>{c.text}</p> : null}
          </div>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_16rem_1fr] lg:gap-10 xl:grid-cols-[1fr_19rem_1fr]">
          <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-72 sm:w-72 lg:order-2 lg:h-64 lg:w-64 xl:h-[19rem] xl:w-[19rem]">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#21649A]/30 motion-safe:animate-[spin_60s_linear_infinite] dark:border-white/20"
            />
            <span aria-hidden="true" className="absolute inset-5 rounded-full border border-[#54B848]/40" />
            <div className="relative grid h-[76%] w-[76%] place-items-center rounded-full bg-gradient-to-br from-[#21649A] to-[#102A40] p-6 text-center text-white shadow-2xl">
              <div>
                <Landmark className="mx-auto h-8 w-8 text-[#8FCB86]" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-3 font-display text-[1.2rem] font-medium leading-snug sm:text-[1.35rem] lg:text-[1.2rem] xl:text-[1.35rem]">
                  {c.centerText}
                </p>
              </div>
            </div>
          </div>

          {[items.slice(0, split), items.slice(split)].map((group, side) => (
            <ul key={side} className={cx("space-y-4", side === 0 ? "lg:order-1" : "lg:order-3")}>
              {group.map((item, pos) => {
                const idx = side * split + pos;
                const isMiddle = pos === 1;
                return (
                  <motion.li
                    key={item.id || item.title}
                    {...reveal(pos)}
                    className={cx(
                      "group relative flex items-start gap-4 border border-[#DCE4E8] bg-white p-5 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-[#54B848]/60 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.05] sm:p-6",
                      side === 0 && "lg:flex-row-reverse lg:text-right",
                    )}
                  >
                    {isMiddle ? (
                      <span
                        aria-hidden="true"
                        className={cx("absolute top-1/2 hidden h-px w-10 bg-[#54B848]/60 lg:block", side === 0 ? "-right-10" : "-left-10")}
                      />
                    ) : null}
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#15344F] text-[#8FCB86] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                      <Ico name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.2rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.25rem]">
                        <span className="mr-2 text-[0.9rem] text-[#21649A]/60 dark:text-[#8FCB86]/70">{pad2(idx + 1)}</span>
                        {String(item.title || "").replace(/,$/, "")}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{upperFirst(item.text)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          ))}
        </div>

        {c.note ? (
          <div className="mt-10 flex flex-col gap-5 bg-[#15344F] p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
              <Scale className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-base leading-[1.8] text-white/90 sm:text-[17px]">{c.note}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function FoundersKeep({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="keep-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <div className="relative isolate overflow-hidden px-6 pb-36 pt-12 text-white sm:px-10 sm:pt-14 lg:px-14 lg:pb-44 lg:pt-20">
          {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321]/95 via-[#102A40]/85 to-[#102A40]/45" />
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <h2 id="keep-heading" className={`${H2_SIZE} text-white lg:col-span-5`}>
              {c.heading}
            </h2>
            <div className="lg:col-span-7">
              <p className="font-display text-[1.35rem] leading-snug text-white sm:text-[1.55rem]">
                {c.lead}
                {c.leadHighlight ? (
                  <>
                    {" "}
                    <span className="text-[#8FCB86]">{c.leadHighlight}</span>
                  </>
                ) : null}
              </p>
              {c.text ? <p className="mt-5 text-base leading-[1.8] text-white/80 sm:text-[17px]">{c.text}</p> : null}
            </div>
          </div>
          {c.approachHeading ? (
            <p className="mt-12 inline-flex items-center gap-3 font-display text-[1.25rem] text-white sm:text-[1.35rem]">
              <span aria-hidden="true" className="h-px w-10 bg-[#54B848]" />
              {c.approachHeading}
            </p>
          ) : null}
        </div>

        <ul className="relative z-10 -mt-24 grid gap-5 px-4 sm:px-8 md:grid-cols-3 lg:-mt-28 lg:px-12">
          {visibleItems(c.items).map((item, idx) => (
            <motion.li
              key={item.id || item.title}
              {...reveal(idx)}
              className={cx(
                "group relative flex flex-col overflow-hidden border-t-4 bg-white p-7 shadow-[0_20px_50px_rgba(7,19,33,0.18)] dark:bg-[#0B1E30] sm:p-8",
                ["border-[#21649A]", "border-[#54B848]", "border-[#15344F] dark:border-[#8FCB86]"][idx % 3],
              )}
            >
              <span aria-hidden="true" className="absolute -right-2 -top-4 font-display text-[5.5rem] leading-none text-[#EAF1F7] dark:text-white/[0.06]">
                {pad2(idx + 1)}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#EAF1F7] text-[#21649A] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40] dark:bg-white/10 dark:text-[#8FCB86]">
                <Ico name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white">{item.title}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FoundersHowWeHelp({ content: c, root }) {
  const items = visibleItems(c.items);
  const total = pad2(items.length);

  return (
    <section
      {...root}
      aria-labelledby="how-we-help-heading"
      className="relative isolate scroll-mt-24 overflow-clip bg-gradient-to-b from-[#071321] via-[#102A40] to-[#15344F] py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#21649A]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#54B848]/10 blur-3xl" />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-help-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {c.heading}
        </h2>

        <ol className="mt-12 space-y-6 lg:space-y-10">
          {items.map((item, idx) => {
            const number = pad2(idx + 1);
            return (
              <li key={item.id || item.title} className="lg:sticky" style={{ top: `calc(var(--header-height, 4.875rem) + 1.5rem + ${idx * 1.1}rem)` }}>
                <article
                  className={cx(
                    "group grid overflow-hidden text-[#18324A] shadow-[0_-10px_30px_rgba(7,19,33,0.22)] md:grid-cols-12 lg:h-[23rem]",
                    STACK_SURFACES[idx % STACK_SURFACES.length],
                  )}
                >
                  <div className="flex flex-col p-7 sm:p-9 md:col-span-7 lg:p-11">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[3.25rem] leading-none text-[#21649A]/25 dark:text-white/20">{number}</span>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                        <Ico name={item.icon} className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-auto pt-8 font-display text-[1.6rem] font-medium leading-tight text-[#15344F] dark:text-white sm:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[17px]">{item.text}</p>
                  </div>
                  <div className="relative h-56 overflow-hidden md:col-span-5 md:h-auto">
                    {imgSrc(item.image) ? (
                      <img
                        src={imgSrc(item.image)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 font-display text-[13px] text-[#15344F] backdrop-blur-sm"
                    >
                      {number} / {total}
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function FoundersSoundingBoard({ content: c, root }) {
  const reduce = useReducedMotion();
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="sounding-heading" className="overflow-clip bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden p-8 text-white sm:p-10 lg:sticky lg:top-28 lg:col-span-5 lg:h-[36rem] lg:self-start">
          {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#102A40]/80 to-[#102A40]/15" />
          <h2 id="sounding-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
          </h2>
          {c.text ? <p className="mt-5 text-base leading-[1.8] text-white/85 sm:text-[17px]">{c.text}</p> : null}
          {c.callout ? (
            <div className="mt-7 flex items-center gap-4 border-t border-white/20 pt-6">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                {!reduce ? <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#54B848]/40" /> : null}
                <PhoneCall className="relative h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-display text-[1.2rem] leading-snug sm:text-[1.3rem]">{c.callout}</p>
            </div>
          ) : null}
        </div>

        <ol className="flex flex-col gap-3 lg:col-span-7">
          {strings(c.decisions).map((item, idx) => (
            <motion.li
              key={item}
              {...reveal(idx % 4)}
              className="group flex items-center gap-4 border border-[#DCE4E8] bg-white px-5 py-5 transition-[border-color,box-shadow] duration-300 hover:border-[#54B848] hover:shadow-lg dark:border-white/10 dark:bg-white/[0.05] sm:gap-5 sm:px-6 sm:py-6"
            >
              <span className="w-9 shrink-0 font-display text-[1.6rem] leading-none text-[#21649A]/30 transition-colors duration-300 group-hover:text-[#21649A] dark:text-white/30 dark:group-hover:text-[#8FCB86]">
                {pad2(idx + 1)}
              </span>
              <span aria-hidden="true" className="flex h-6 shrink-0 items-end gap-[3px]">
                {EQ_BARS.map((bar) => (
                  <span
                    key={bar.delay}
                    className="nw-eq-bar w-[3px] rounded-full bg-[#54B848]"
                    style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }}
                  />
                ))}
              </span>
              <span className="flex-1 text-[15px] font-medium leading-snug text-[#18324A] dark:text-slate-200 sm:text-[17px]">{item}</span>
              <PhoneCall
                className="h-4 w-4 shrink-0 text-[#21649A]/35 transition-colors duration-300 group-hover:text-[#54B848] dark:text-white/35"
                aria-hidden="true"
              />
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="site-frame mt-12 px-4 sm:px-6">
        <ul className="grid bg-[#15344F] text-white md:grid-cols-3">
          {visibleItems(c.modes).map((mode) => (
            <li
              key={mode.id || mode.text}
              className="flex flex-col gap-5 border-b border-white/15 p-7 last:border-b-0 sm:p-8 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-[#8FCB86]">
                <Ico name={mode.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-[1.3rem] leading-snug sm:text-[1.45rem]">{mode.text}</p>
            </li>
          ))}
        </ul>
        {c.closing ? (
          <p className="flex items-center gap-3 bg-[#54B848] px-7 py-4 font-display text-[1.15rem] font-medium text-[#102A40] sm:px-8 sm:text-[1.25rem]">
            <HeartHandshake className="h-5 w-5 shrink-0" aria-hidden="true" />
            {c.closing}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function FoundersDeliverables({ content: c, root }) {
  const reveal = useReveal();
  const stayBg = imgSrc(c.stayImage);

  return (
    <section {...root} aria-labelledby="service-heading" className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="service-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        {c.receiveHeading ? (
          <h3 className="mt-12 font-display text-[1.5rem] font-medium text-[#15344F] dark:text-white">{c.receiveHeading}</h3>
        ) : null}
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems(c.items).map((item, idx) => (
            <motion.li
              key={item.id || item.title}
              {...reveal(idx % 4)}
              className={cx(
                "group flex flex-col overflow-hidden border border-[#DCE4E8] bg-white transition-shadow duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]",
                idx === 0 && "sm:col-span-2",
              )}
            >
              <div className={cx("relative overflow-hidden", idx === 0 ? "h-44 sm:h-52" : "h-40")}>
                {imgSrc(item.image) ? (
                  <img
                    src={imgSrc(item.image)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1E30]/55 to-transparent" />
                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white font-display text-[1rem] text-[#15344F] shadow-md transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                  {pad2(idx + 1)}
                </span>
              </div>
              <div className="flex flex-1 flex-col border-t-2 border-[#21649A] p-6">
                <h4 className="font-display text-[1.25rem] font-medium leading-snug text-[#15344F] dark:text-white">
                  {String(item.title || "").replace(/:$/, "")}
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{upperFirst(item.text)}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {visibleItems(c.stayItems).length ? (
          <div className="relative isolate mt-10 overflow-hidden p-8 text-white sm:p-10 lg:p-12">
            {stayBg ? <img {...imgProps(c.stayImage)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321]/95 via-[#102A40]/90 to-[#15344F]/80" />
            {c.stayHeading ? <h3 className="font-display text-[1.6rem] font-medium sm:text-[1.8rem]">{c.stayHeading}</h3> : null}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleItems(c.stayItems).map((item, idx) => (
                <motion.li
                  key={item.id || item.text}
                  {...reveal(idx)}
                  className="flex flex-col gap-4 border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                    <Ico name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/90">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function FoundersWhyChoose({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="why-choose-heading" className="overflow-clip bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
        <div className="relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden p-8 sm:p-10 lg:sticky lg:top-28 lg:col-span-5 lg:h-[34rem] lg:self-start">
          {imgSrc(c.image) ? <img {...imgProps(c.image)} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#102A40]/70 to-[#102A40]/10" />
          <span aria-hidden="true" className="mb-6 block h-1 w-16 bg-[#54B848]" />
          <h2 id="why-choose-heading" className={`${H2_SIZE} text-white`}>
            {c.heading}
          </h2>
        </div>

        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
          {visibleItems(c.items).map((item, idx) => (
            <motion.li
              key={item.id || item.title}
              {...reveal(idx % 2)}
              className="group border-t-2 border-[#15344F]/15 py-8 transition-colors duration-300 hover:border-[#54B848] dark:border-white/15"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center bg-white text-[#21649A] shadow-sm transition-colors duration-300 group-hover:bg-[#15344F] group-hover:text-[#8FCB86] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Ico name={item.icon} className="h-5 w-5" />
                </span>
                <span aria-hidden="true" className="font-display text-[1.6rem] text-[#15344F]/20 dark:text-white/20">
                  {pad2(idx + 1)}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[1.3rem] font-medium leading-snug text-[#15344F] dark:text-white">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STAIR_HEIGHTS = ["lg:min-h-[15rem]", "lg:min-h-[17.5rem]", "lg:min-h-[20rem]", "lg:min-h-[22.5rem]"];
const STAIR_SURFACES = ["bg-[#EAF1F7] text-[#15344F] dark:bg-[#21649A]/15 dark:text-white", "bg-[#21649A] text-white", "bg-[#15344F] text-white"];

export function FoundersHowWeWork({ content: c, root }) {
  const reveal = useReveal();
  const steps = visibleItems(c.steps);

  return (
    <section {...root} aria-labelledby="how-we-work-heading" className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-work-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {steps.map((step, idx) => (
            <motion.li
              key={step.id || step.title}
              {...reveal(idx)}
              className={cx(
                "flex flex-col p-7",
                STAIR_HEIGHTS[Math.min(idx, STAIR_HEIGHTS.length - 1)],
                idx === steps.length - 1 ? "bg-[#54B848] text-[#102A40]" : STAIR_SURFACES[idx % STAIR_SURFACES.length],
              )}
            >
              <span className="font-display text-[2.4rem] leading-none opacity-50">{idx + 1}</span>
              <h3 className="mt-auto pt-8 font-display text-[1.3rem] font-medium leading-snug">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed opacity-85">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FoundersStories({ content: c, root }) {
  const reveal = useReveal();

  return (
    <section {...root} aria-labelledby="stories-heading" className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24">
      <div className="site-frame px-4 sm:px-6">
        <h2 id="stories-heading" className={cx(H2, "max-w-3xl")}>
          {c.heading}
        </h2>
        {c.note ? <p className="mt-4 text-[14px] leading-relaxed text-[#5E6D7B] dark:text-slate-400">{c.note}</p> : null}

        <div className="mt-10 space-y-6">
          {visibleItems(c.stories).map((story, idx) => (
            <motion.article
              key={story.id || story.title}
              {...reveal(idx)}
              className="grid overflow-hidden bg-white shadow-sm dark:bg-white/[0.05] md:grid-cols-12"
            >
              <div className="relative isolate flex min-h-[15rem] flex-col items-start justify-between gap-6 overflow-hidden bg-[#15344F] p-8 text-white md:col-span-4">
                {imgSrc(story.image) ? (
                  <img src={imgSrc(story.image)} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                ) : null}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1E30] via-[#15344F]/75 to-[#15344F]/35" />
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                  <Ico name={story.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-[1.5rem] font-medium leading-snug">{story.title}</h3>
              </div>
              <p className="p-8 text-base leading-[1.85] text-[#18324A] dark:text-slate-200 md:col-span-8 sm:p-10">{story.text}</p>
            </motion.article>
          ))}
        </div>

        {c.disclaimer ? <p className="mt-8 text-[14px] italic leading-relaxed text-[#5E6D7B] dark:text-slate-400">{c.disclaimer}</p> : null}
      </div>
    </section>
  );
}

export function FoundersFaqsClosing({ content: c, root }) {
  const disclaimer = textBlocks(c.disclaimerText);

  return (
    <div data-cms-section={root?.["data-cms-section"]}>
      <FaqBlock anchor={root?.id} heading={c.faqHeading} contactLink={c.contactLink} faqs={c.faqs} panelPrefix="founders" />

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
          {disclaimer.map((paragraph) => (
            <p key={paragraph} className="site-frame px-4 text-[13px] leading-relaxed text-[#5E6D7B] dark:text-slate-400 sm:px-6">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}
    </div>
  );
}
