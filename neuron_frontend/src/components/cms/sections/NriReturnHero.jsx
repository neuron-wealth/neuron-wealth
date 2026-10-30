import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Plane } from "lucide-react";
import { CmsIcon, visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cx } from "../../../utils/cx";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

export default function NriReturnHero({ content, section }) {
  const reduce = useReducedMotion();

  const eyebrow = content?.eyebrow || "For US NRIs and their families moving back to India";
  const title = content?.title || "You Are Coming Home.";
  const titleHighlight = content?.titleHighlight || "Your Wealth Does Not Have To.";
  const quote = content?.quote || "";
  const description = content?.description || "";
  const bgImageUrl = content?.bgImage?.url || "/images/home/nri-horizon.jpg";
  const bgImageAlt = content?.bgImage?.alt || "";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || {
    label: "See the 10 decisions that matter",
    href: "#financial-decisions",
  };
  const globalNote =
    content?.globalNote ||
    "Returning from the UK, Canada, Singapore, UAE or elsewhere? We advise families from every country.";
  const originLabel = content?.originLabel || "USA";
  const destinationLabel = content?.destinationLabel || "India";
  const statNumber = content?.statNumber || "12–36";
  const statUnit = content?.statUnit || "months";
  const statText = content?.statText || "will decide how much of that wealth you keep.";
  const planHeading = content?.planHeading || "One global plan";
  const planItems = visibleItems(content?.planItems || []);
  const trustItems = visibleItems(content?.trustItems || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "nri-return-hero"}
      data-cms-section={section?.id}
      aria-labelledby="nri-return-hero-heading"
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#071321] pt-[var(--header-clearance,4.875rem)] text-white"
    >
      <img
        src={bgImageUrl}
        alt={bgImageAlt}
        aria-hidden={!bgImageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,19,33,0.92)_0%,rgba(7,19,33,0.86)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,19,33,0.97)_0%,rgba(7,19,33,0.9)_42%,rgba(7,19,33,0.5)_75%,rgba(7,19,33,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#071321] to-transparent"
      />

      <div className="site-frame relative px-4 sm:px-6">
        <div className="grid gap-12 pb-12 pt-10 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16 lg:pt-14">
          <motion.div
            className="lg:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow ? (
              <p className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] sm:text-[0.8125rem]">
                <span aria-hidden="true" className="h-px w-8 bg-[#54B848]" />
                {eyebrow}
              </p>
            ) : null}

            <h1
              id="nri-return-hero-heading"
              className="mt-5 font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-white sm:text-[3.2rem] lg:text-[3.7rem] xl:text-[4.1rem]"
            >
              {title}{" "}
              {titleHighlight ? <span className="block italic text-[#F3E6D4]">{titleHighlight}</span> : null}
            </h1>

            {quote ? (
              <p className="mt-7 max-w-2xl border-l-2 border-[#54B848] pl-5 text-[1rem] leading-relaxed text-white/90 sm:text-[1.0625rem] lg:text-[1.125rem]">
                {quote}
              </p>
            ) : null}

            {description ? (
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.75] text-white/70 sm:text-[1rem]">
                {description}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {primaryButton?.label && primaryButton?.href ? (
                <Link
                  to={primaryButton.href}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-[#54B848] px-6 text-sm font-semibold text-[#102A40] shadow-md transition-colors hover:bg-[#6cc960] ${FOCUS}`}
                >
                  {primaryButton.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
              {secondaryButton?.label && secondaryButton?.href ? (
                <a
                  href={secondaryButton.href}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 ${FOCUS}`}
                >
                  {secondaryButton.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            {globalNote ? (
              <p className="mt-6 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-white/65">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                {globalNote}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0B1E30]/70 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#54B848]/20 blur-3xl"
              />

              <div className="relative flex items-center gap-4">
                <span className="font-display text-[1.6rem] font-medium leading-none text-white sm:text-[1.8rem]">
                  {originLabel}
                </span>
                <span className="relative h-8 flex-1">
                  <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/35" />
                  <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/70" />
                  <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#54B848]" />
                  <motion.span
                    className="absolute top-1/2 -ml-3 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#54B848] text-[#102A40]"
                    initial={{ left: reduce ? "50%" : "6%" }}
                    animate={reduce ? { left: "50%" } : { left: ["6%", "94%"] }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 3.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }
                    }
                  >
                    <Plane className="h-3.5 w-3.5 rotate-45" />
                  </motion.span>
                </span>
                <span className="font-display text-[1.6rem] font-medium leading-none text-[#8FCB86] sm:text-[1.8rem]">
                  {destinationLabel}
                </span>
              </div>

              <div className="relative mt-8 border-t border-white/10 pt-7">
                <p className="font-display text-[3.4rem] font-medium leading-none tracking-tight text-white sm:text-[4rem]">
                  {statNumber}
                  {statUnit ? (
                    <span className="ml-2 align-middle font-manrope text-base font-semibold tracking-normal text-white/70">
                      {statUnit}
                    </span>
                  ) : null}
                </p>
                {statText ? (
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{statText}</p>
                ) : null}
              </div>

              {planItems.length > 0 ? (
                <div className="relative mt-7 hidden border-t border-white/10 pt-7 sm:block">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86]">
                    {planHeading}
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-3">
                    {planItems.map((item, idx) => (
                      <li
                        key={item.id || item.label || idx}
                        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[0.8125rem] font-medium text-white/90"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#54B848]/15 text-[#8FCB86]">
                          <CmsIcon name={item.icon || "LineChart"} className="h-4 w-4" />
                        </span>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        {trustItems.length > 0 ? (
          <ul className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, idx) => (
              <li
                key={item.id || item.text || idx}
                className={cx(
                  "flex items-center gap-3 border-b border-white/10 py-5 text-[0.8125rem] font-medium leading-snug text-white/85 lg:border-b-0",
                  idx % 2 ? "sm:border-l sm:pl-5" : "sm:pr-5",
                  idx > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0",
                  idx < trustItems.length - 1 && "lg:pr-6"
                )}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#54B848]/40 bg-[#54B848]/10 text-[#8FCB86]">
                  <CmsIcon name={item.icon || "ShieldCheck"} className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

