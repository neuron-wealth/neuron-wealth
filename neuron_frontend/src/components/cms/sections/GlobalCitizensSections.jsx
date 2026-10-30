import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Flag,
  Globe,
  HeartHandshake,
  House,
  Landmark,
  LineChart,
  MapPin,
  PiggyBank,
  Plane,
  Plus,
  Receipt,
  RefreshCw,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import { CmsIcon, visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cx } from "../../../utils/cx";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;
const BODY = "text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]";

const OUTLINE_LIGHT =
  "inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10";
const OUTLINE_ON_LIGHT =
  "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#21649A]/40 px-6 text-sm font-semibold text-[#21649A] transition-colors hover:border-[#21649A] hover:bg-[#EAF1F7] dark:border-white/40 dark:text-white dark:hover:bg-white/10";

const LUCIDE_ICONS = {
  ArrowLeftRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CircleHelp,
  FileText,
  Flag,
  Globe,
  HeartHandshake,
  House,
  Landmark,
  LineChart,
  MapPin,
  PiggyBank,
  Plane,
  Receipt,
  RefreshCw,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
  Wallet,
};

function ResolveIcon({ name, className = "h-5 w-5", strokeWidth }) {
  if (!name) return null;
  const DirectIcon = LUCIDE_ICONS[name];
  if (DirectIcon) return <DirectIcon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
  return <CmsIcon name={name} className={className} />;
}

const reveal = (reduce, idx = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut", delay: reduce ? 0 : idx * 0.08 },
});

// ==========================================
// 1. Global Citizens Hero Banner
// ==========================================
export function GlobalCitizensHero({ content, section }) {
  const eyebrow = content?.eyebrow || "For foreign citizens and OCI cardholders who call India home";
  const title = content?.title || "You Live in India. Your Passport Is From Another Country.";
  const titleHighlight = content?.titleHighlight || "Your Money Answers to Both.";
  const paras = Array.isArray(content?.paragraphs)
    ? content.paragraphs
    : typeof content?.paragraphs === "string"
    ? content.paragraphs.split("\n\n").filter(Boolean)
    : [
        "You may have lived in India for years. Your work, family and future are here. But your home country may still tax some or all of your income, and India now taxes you as a resident on your income from around the world.",
        "Two countries, two tax years, two sets of rules and one family trying to make sense of it all. We are a SEBI Registered Investment Adviser. We bring Indian tax, your home country's tax, the tax treaty between them and FEMA into one simple plan, and invest your money for better returns after tax in both countries.",
      ];
  const bgImageUrl = content?.bgImage?.url || "/images/home/hero-residence.jpg";
  const bgImageAlt = content?.bgImage?.alt || "Global Citizens Hero Horizon";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || {
    label: "Check your residential status",
    href: "#status",
  };
  const trustItems = visibleItems(content?.trustItems || [
    { text: "SEBI Registered Investment Adviser INA000016481" },
    { text: "Fee only, no commissions" },
    { text: "CA, US CPA and CFA team" },
    { text: "Cross border tax built into every investment decision" },
  ]);

  return (
    <section
      id={section?.design?.anchor || section?.id || "global-citizens-hero"}
      data-cms-section={section?.id}
      aria-labelledby="global-citizens-hero-heading"
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img
        src={bgImageUrl}
        alt={bgImageAlt}
        aria-hidden={!bgImageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081724]/95 via-[#081724]/85 to-[#081724]/45"
      />

      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-4xl pb-14 pt-10 lg:pb-16 lg:pt-14">
          {eyebrow ? (
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] sm:text-[0.8125rem]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="global-citizens-hero-heading"
            className="mt-4 font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]"
          >
            {title} {titleHighlight ? <span className="italic text-[#F3E6D4]">{titleHighlight}</span> : null}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-[0.9375rem] leading-relaxed text-white/90 sm:text-[1rem] lg:text-[1.0625rem]">
            {paras.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryButton?.label ? (
              <Link
                to={primaryButton.href || "/contact"}
                target={primaryButton.newTab ? "_blank" : undefined}
                rel={primaryButton.newTab ? "noreferrer noopener" : undefined}
                className={cx(
                  "inline-flex min-h-12 items-center gap-2 rounded-full bg-[#54B848] px-6 text-sm font-semibold text-[#102A40] shadow-md transition-colors hover:bg-[#6cc960]",
                  FOCUS
                )}
              >
                {primaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryButton?.label ? (
              <a
                href={secondaryButton.href || "#status"}
                target={secondaryButton.newTab ? "_blank" : undefined}
                rel={secondaryButton.newTab ? "noreferrer noopener" : undefined}
                className={cx(OUTLINE_LIGHT, FOCUS)}
              >
                {secondaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {trustItems.length > 0 ? (
        <div className="border-t border-white/15 bg-[#081724]/60 backdrop-blur-sm">
          <ul className="site-frame grid px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {trustItems.map((item, idx) => (
              <li
                key={item.id || item.text || idx}
                className="flex items-start gap-3 border-b border-white/10 py-5 text-[0.875rem] font-medium leading-snug text-white last:border-b-0 sm:px-4 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

// ==========================================
// 2. Does This Sound Familiar? (Dilemmas)
// ==========================================
export function GlobalCitizensFamiliar({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Does This Sound Familiar?";
  const subtitle =
    content?.subtitle ||
    "If this sounds like you, you are not alone. These are some of the most common and most costly mix ups we see.";
  const quotes = visibleItems(content?.quotes || [
    { quote: "I have lived in India for years, but I still think of myself as an NRI." },
    { quote: "My PPF interest is tax free in India. Why is my tax adviser back home asking about it?" },
    { quote: "I pay tax in India. Why do I still owe tax in my home country?" },
    { quote: "I still have a pension, a house and bank accounts back home. I am not sure how India sees them." },
    { quote: "My adviser in India and my adviser abroad do not talk to each other, and I am stuck in the middle." },
    { quote: "I am not sure what I am allowed to invest in, as a foreign citizen in India." },
  ]);

  return (
    <section
      id={section?.design?.anchor || section?.id || "familiar"}
      data-cms-section={section?.id}
      aria-labelledby="familiar-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="familiar-heading" className={H2}>
              {heading}
            </h2>
            {subtitle ? (
              <p className={cx(BODY, "mt-6 border-l-2 border-[#54B848] pl-5")}>
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {quotes.length > 0 ? (
          <ul className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-7">
            {quotes.map((item, idx) => (
              <motion.li
                key={item.id || item.quote || idx}
                {...reveal(reduce, idx)}
                className="group flex gap-5 border-b border-[#DCE4E8] py-6 dark:border-white/10"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[3rem] leading-[0.8] text-[#54B848] transition-transform duration-300 group-hover:-translate-y-1"
                >
                  &ldquo;
                </span>
                <p className="font-display text-[1.2rem] italic leading-snug text-[#15344F] transition-colors duration-300 group-hover:text-[#21649A] dark:text-white dark:group-hover:text-[#8FCB86] sm:text-[1.35rem]">
                  {item.quote}&rdquo;
                </p>
              </motion.li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 3. You May Not Be an NRI Anymore (Status)
// ==========================================
export function GlobalCitizensStatus({ content, section }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 40%", "start -40%"] });
  const { scrollYProgress: railProgress } = useScroll({ target: railRef, offset: ["start 75%", "end 60%"] });
  const strike = useTransform(scrollYProgress, [0.28, 0.55], [0, 1]);
  const nriOpacity = useTransform(scrollYProgress, [0.28, 0.55], [1, 0.4]);
  const residentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const residentY = useTransform(scrollYProgress, [0.5, 0.8], [28, 0]);

  const heading = content?.heading || "You May Not Be an NRI Anymore";
  const description =
    content?.description ||
    "Many foreign citizens and OCI cardholders who have lived in India for years still think of themselves as NRIs. Under Indian law, they usually are not.";
  const strikeFrom = content?.strikeFrom || "NRI";
  const strikeTo = content?.strikeTo || "Resident";
  const calloutQuote = content?.calloutQuote || "Your passport does not decide your status. Where you live does.";
  const laws = visibleItems(content?.laws || [
    {
      icon: "Landmark",
      title: "Under Indian income tax",
      text: "If you have lived in India long enough, you are a resident and usually an ordinary resident. India then taxes your global income, and you must report your foreign assets in your Indian tax return: bank accounts, investments, pensions, retirement accounts and property abroad.",
    },
    {
      icon: "ShieldCheck",
      title: "Under FEMA",
      text: "If you live in India to work or settle here, you are a resident. Your bank accounts, KYC and investments should reflect that. Holding NRE accounts or investing as an NRI when you are not one can create problems later.",
    },
  ]);
  const warningBox =
    content?.warningBox ||
    "Missing this is common. The penalties for not reporting foreign assets in India can be heavy. The fix is simple once you know your status, and we help you get there quietly and correctly.";

  return (
    <section
      ref={sectionRef}
      id={section?.design?.anchor || section?.id || "status"}
      data-cms-section={section?.id}
      aria-labelledby="status-heading"
      className="relative isolate overflow-clip bg-gradient-to-br from-[#15344F] via-[#102A40] to-[#0B1F31] py-16 text-white sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-20 -z-10 h-96 w-96 rounded-full bg-[#21649A]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-80 w-80 rounded-full bg-[#54B848]/10 blur-3xl"
      />

      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height,4.875rem)+2.5rem)]">
            <h2 id="status-heading" className={`${H2_SIZE} text-white`}>
              {heading}
            </h2>
            {description ? (
              <p className="mt-6 text-base leading-[1.8] text-white/80 sm:text-[1.0625rem]">
                {description}
              </p>
            ) : null}

            <div
              aria-hidden="true"
              className="mt-10 rounded-3xl border border-white/15 bg-white/[0.05] p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-3 text-white/60">
                <Plane className="h-5 w-5" />
                <span className="h-px flex-1 border-t border-dashed border-white/25" />
                <MapPin className="h-5 w-5 text-[#8FCB86]" />
              </div>
              <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
                <motion.span
                  style={reduce ? { opacity: 0.4 } : { opacity: nriOpacity }}
                  className="relative inline-block font-display text-[3.5rem] leading-none sm:text-[4.25rem]"
                >
                  {strikeFrom}
                  <motion.span
                    style={reduce ? undefined : { scaleX: strike }}
                    className="absolute -inset-x-2 top-1/2 h-[3px] origin-left rounded-full bg-[#54B848]"
                  />
                </motion.span>
                <motion.span
                  style={reduce ? undefined : { opacity: residentOpacity, y: residentY }}
                  className="inline-block font-display text-[3.5rem] italic leading-none text-[#8FCB86] sm:text-[4.25rem]"
                >
                  {strikeTo}
                </motion.span>
              </div>
            </div>

            {calloutQuote ? (
              <p className="mt-8 border-l-2 border-[#54B848] pl-5 font-display text-[1.45rem] leading-snug text-[#8FCB86] sm:text-[1.7rem]">
                {calloutQuote}
              </p>
            ) : null}
          </div>
        </div>

        <ol ref={railRef} className="relative space-y-8 pl-12 sm:pl-16 lg:col-span-7 lg:space-y-10 lg:pt-4">
          <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-6 w-px bg-white/15 sm:left-[19px]" />
          <motion.span
            aria-hidden="true"
            style={reduce ? undefined : { scaleY: railProgress }}
            className="absolute bottom-6 left-[15px] top-6 w-px origin-top bg-[#54B848] sm:left-[19px]"
          />

          {laws.map((law, idx) => (
            <motion.li key={law.id || law.title || idx} {...reveal(reduce, idx)} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-12 top-8 grid h-8 w-8 place-items-center rounded-full border-2 border-[#54B848] bg-[#102A40] font-display text-sm text-[#8FCB86] sm:-left-16 sm:h-10 sm:w-10"
              >
                {idx + 1}
              </span>
              <article className="group rounded-3xl border border-white/15 bg-white/[0.05] p-7 transition-colors duration-300 hover:border-[#8FCB86]/50 hover:bg-white/[0.08] sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#54B848]/15 text-[#8FCB86] ring-1 ring-[#54B848]/30 transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                    <ResolveIcon name={law.icon || "Landmark"} className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <h3 className="font-display text-[1.5rem] font-medium leading-snug sm:text-[1.75rem]">{law.title}</h3>
                </div>
                <p className="mt-6 text-base leading-[1.8] text-white/80 sm:text-[1.0625rem]">{law.text}</p>
              </article>
            </motion.li>
          ))}

          {warningBox ? (
            <motion.li {...reveal(reduce, laws.length)} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-12 top-8 grid h-8 w-8 place-items-center rounded-full bg-[#54B848] text-[#102A40] sm:-left-16 sm:h-10 sm:w-10"
              >
                <TriangleAlert className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="rounded-3xl bg-[#54B848] p-7 text-[#102A40] shadow-[0_24px_60px_-30px_rgba(84,184,72,0.6)] sm:p-10">
                <p className="text-base font-medium leading-[1.75] sm:text-[1.0625rem]">{warningBox}</p>
              </div>
            </motion.li>
          ) : null}
        </ol>
      </div>
    </section>
  );
}

// ==========================================
// 4. Does Your Home Country Still Tax You?
// ==========================================
export function GlobalCitizensHomeTax({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Does Your Home Country Still Tax You?";
  const subheading = content?.subheading || "It depends on your passport.";
  const cards = visibleItems(content?.cards || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "home-tax"}
      data-cms-section={section?.id}
      aria-labelledby="home-tax-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="home-tax-heading" className={H2}>
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-5 font-display text-[1.35rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:text-[1.5rem]">
              {subheading}
            </p>
          ) : null}
        </div>

        {cards.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {cards.map((item, idx) => {
              const isLast = idx === cards.length - 1;
              return (
                <motion.article
                  key={item.id || item.title || idx}
                  {...reveal(reduce, idx)}
                  className={cx(
                    "flex flex-col overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl",
                    isLast ? "bg-[#15344F] text-white" : "bg-white dark:bg-white/[0.05]"
                  )}
                >
                  <div
                    className={cx(
                      "flex items-center gap-4 px-7 py-5 lg:min-h-[5.5rem]",
                      isLast ? "bg-[#54B848] text-[#102A40]" : "bg-[#15344F] text-white"
                    )}
                  >
                    <ResolveIcon name={item.icon || "Flag"} className="h-6 w-6 shrink-0" />
                    <h3 className="font-display text-[1.3rem] font-medium leading-snug">{item.title}</h3>
                  </div>
                  <p
                    className={cx(
                      "p-7 text-[0.9375rem] leading-[1.8] sm:text-base",
                      isLast ? "text-white/85" : "text-[#5E6D7B] dark:text-slate-300"
                    )}
                  >
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 5. Tax Free in India Trap
// ==========================================
function KeepAfterTaxCard({ image, text, highlight, className = "" }) {
  const imgUrl = image?.url || "/images/home/investment-still.jpg";
  return (
    <div className={cx("relative isolate flex flex-col justify-end overflow-hidden bg-[#15344F] p-8 text-white", className)}>
      <img
        src={imgUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1E30] via-[#15344F]/85 to-[#15344F]/25"
      />
      <p className="text-base leading-[1.8] text-white/90">{text}</p>
      {highlight ? (
        <p className="mt-4 font-display text-[1.45rem] leading-snug text-[#8FCB86]">{highlight}</p>
      ) : null}
    </div>
  );
}

export function GlobalCitizensTaxFree({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Tax Free in India Does Not Mean Tax Free at Home";
  const introText =
    content?.introText || "India and your home country can see the same income very differently. A few common examples:";
  const examples = visibleItems(content?.examples || []);
  const conclusionText =
    content?.conclusionText ||
    "The result is simple. An investment that looks perfect in India can be a poor choice for a foreign citizen. Tax saving in India alone is not the goal.";
  const conclusionHighlight =
    content?.conclusionHighlight || "What matters is what you keep after tax in both countries.";
  const conclusionImage = content?.conclusionImage;

  return (
    <section
      id={section?.design?.anchor || section?.id || "tax-free"}
      data-cms-section={section?.id}
      aria-labelledby="tax-free-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <h2 id="tax-free-heading" className={H2}>
            {heading}
          </h2>
          {introText ? <p className={cx(BODY, "mt-6")}>{introText}</p> : null}

          <KeepAfterTaxCard
            image={conclusionImage}
            text={conclusionText}
            highlight={conclusionHighlight}
            className="mt-10 hidden min-h-[22rem] lg:flex lg:flex-1"
          />
        </div>

        <div className="lg:col-span-7">
          {examples.length > 0 ? (
            <ul className="grid gap-4">
              {examples.map((item, idx) => (
                <motion.li
                  key={item.id || item.text || idx}
                  {...reveal(reduce, idx)}
                  className="group flex items-start gap-5 border border-[#DCE4E8] p-6 transition-colors duration-300 hover:border-[#21649A] dark:border-white/10"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EAF1F7] text-[#21649A] transition-colors duration-300 group-hover:bg-[#21649A] group-hover:text-white dark:bg-white/10 dark:text-[#8FCB86]">
                    <ResolveIcon name={item.icon || "PiggyBank"} className="h-5 w-5" />
                  </span>
                  <p className="pt-1 text-base leading-[1.75] text-[#18324A] dark:text-slate-200">{item.text}</p>
                </motion.li>
              ))}
            </ul>
          ) : null}

          <KeepAfterTaxCard
            image={conclusionImage}
            text={conclusionText}
            highlight={conclusionHighlight}
            className="mt-8 min-h-[22rem] lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. How Two Countries Share Your Tax
// ==========================================
const SHARE_TAX_INTERVAL_MS = 4500;

function ShareTaxCarousel({ items }) {
  const reduce = useReducedMotion();
  const [perView, setPerView] = useState(1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastStart = Math.max(0, items.length - perView);
  const autoPlay = !reduce && !paused && items.length > perView;

  useEffect(() => {
    const twoUp = window.matchMedia("(min-width: 768px)");
    const sync = () => setPerView(twoUp.matches ? 2 : 1);
    sync();
    twoUp.addEventListener("change", sync);
    return () => twoUp.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setActive((current) => Math.min(current, lastStart));
  }, [lastStart]);

  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = setTimeout(() => setActive((current) => (current >= lastStart ? 0 : current + 1)), SHARE_TAX_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, autoPlay, lastStart]);

  const go = (step) => setActive((current) => (current + step + lastStart + 1) % (lastStart + 1));

  if (!items.length) return null;

  return (
    <div
      className="mt-12"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.ol
          className="-mx-2 flex"
          aria-live={autoPlay ? "off" : "polite"}
          initial={false}
          animate={{ x: `-${(active * 100) / perView}%` }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {items.map((item, idx) => {
            const visible = idx >= active && idx < active + perView;
            const imgUrl = item.image?.url || item.image || "";
            return (
              <li
                key={item.id || item.title || idx}
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${items.length}`}
                aria-hidden={!visible}
                className="w-full shrink-0 px-2 md:w-1/2"
              >
                <article className="group relative isolate flex h-full min-h-[13rem] flex-col justify-end overflow-hidden bg-[#0B1E30] p-6 text-white sm:min-h-[14rem] sm:p-7">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#0B1E30]/75 to-[#0B1E30]/45"
                  />
                  <span className="absolute right-6 top-5 font-display text-[2.2rem] leading-none text-[#8FCB86] sm:right-7 sm:top-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-xl pr-12">
                    <h3 className="font-display text-[1.35rem] font-medium leading-snug sm:text-[1.5rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/85">{item.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </motion.ol>
      </div>

      {items.length > perView ? (
        <div className="mt-6 flex items-center gap-5">
          <div className="flex items-center gap-2">
            {Array.from({ length: lastStart + 1 }, (_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show ${items[idx]?.title ? items[idx].title.replace(/\.$/, "") : idx + 1}`}
                aria-current={idx === active ? "true" : undefined}
                onClick={() => setActive(idx)}
                className={cx(
                  "h-2 rounded-full transition-all duration-300",
                  idx === active ? "w-8 bg-[#54B848]" : "w-2 bg-[#15344F]/25 hover:bg-[#15344F]/50 dark:bg-white/30",
                  FOCUS
                )}
              />
            ))}
          </div>
          <div aria-hidden="true" className="h-0.5 flex-1 overflow-hidden bg-[#15344F]/10 dark:bg-white/15">
            {autoPlay ? (
              <motion.div
                key={active}
                className="h-full origin-left bg-[#54B848]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SHARE_TAX_INTERVAL_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className={cx(
                "grid h-11 w-11 place-items-center rounded-full border border-[#15344F]/20 text-[#15344F] transition-colors hover:border-[#21649A] hover:bg-[#21649A] hover:text-white dark:border-white/25 dark:text-white",
                FOCUS
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className={cx(
                "grid h-11 w-11 place-items-center rounded-full border border-[#15344F]/20 text-[#15344F] transition-colors hover:border-[#21649A] hover:bg-[#21649A] hover:text-white dark:border-white/25 dark:text-white",
                FOCUS
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GlobalCitizensShareTax({ content, section }) {
  const heading = content?.heading || "How Two Countries Share Your Tax";
  const description =
    content?.description ||
    "India has tax treaties (DTAA) with most countries. Together with foreign tax credits, they are there to stop you paying tax twice. But they only work if you plan and file correctly.";
  const rules = visibleItems(content?.rules || []);
  const footnote =
    content?.footnote ||
    "Every treaty is different. This is where most families lose money without realising it, and where careful planning makes the biggest difference.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "share-tax"}
      data-cms-section={section?.id}
      aria-labelledby="share-tax-heading"
      className="bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="share-tax-heading" className={H2}>
              {heading}
            </h2>
            {description ? <p className={cx(BODY, "mt-6 max-w-2xl")}>{description}</p> : null}
          </div>
          <div aria-hidden="true" className="hidden items-center justify-center gap-4 lg:col-span-5 lg:flex">
            <span className="grid h-28 w-28 place-items-center rounded-full bg-[#15344F] text-white shadow-lg">
              <Landmark className="h-10 w-10" strokeWidth={1.25} />
            </span>
            <span className="relative flex w-28 items-center justify-center">
              <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-[#21649A]/40" />
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-md">
                <ArrowLeftRight className="h-5 w-5" />
              </span>
            </span>
            <span className="grid h-28 w-28 place-items-center rounded-full bg-white text-[#21649A] shadow-lg dark:bg-white/10 dark:text-[#8FCB86]">
              <Globe className="h-10 w-10" strokeWidth={1.25} />
            </span>
          </div>
        </div>

        <ShareTaxCarousel items={rules} />

        {footnote ? (
          <p className="mt-10 max-w-4xl border-l-2 border-[#54B848] pl-5 text-base leading-[1.8] text-[#15344F] dark:text-white sm:text-[1.0625rem]">
            {footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 7. What You Report, and Where
// ==========================================
export function GlobalCitizensReport({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "What You Report, and Where";
  const indiaHeading = content?.indiaHeading || "In India, as a resident";
  const indiaItems = visibleItems(content?.indiaItems || []);
  const centerImageUrl = content?.centerImage?.url || "/images/who-greencard.jpg";
  const centerText =
    content?.centerText ||
    "We build your investments and records so that every report, in both countries, is simple, consistent and on time.";
  const homeHeading = content?.homeHeading || "In your home country";
  const homeSubheading = content?.homeSubheading || "Depends on your citizenship and residence";
  const usLabel = content?.usLabel || "US citizens";
  const usText =
    content?.usText ||
    "A full US tax return, FBAR for Indian accounts, FATCA reporting, PFIC forms for Indian mutual funds, large gifts or inheritances from India and stakes in Indian companies";
  const otherLabel = content?.otherLabel || "Other citizens";
  const otherText =
    content?.otherText ||
    "Usually income from your home country, plus any return or form needed to show you are no longer resident there";

  return (
    <section
      id={section?.design?.anchor || section?.id || "report"}
      data-cms-section={section?.id}
      aria-labelledby="reporting-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <h2 id="reporting-heading" className={cx(H2, "max-w-3xl")}>
          {heading}
        </h2>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-0">
          <motion.article
            {...reveal(reduce, 0)}
            className="flex flex-col rounded-3xl bg-[#F7F8F5] p-7 dark:bg-white/[0.06] sm:p-9 lg:col-span-4 lg:rounded-r-none lg:pr-12"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#EAF1F7] text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                <Landmark className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.55rem]">
                {indiaHeading}
              </h3>
            </div>
            {indiaItems.length > 0 ? (
              <ul className="mt-8 space-y-5">
                {indiaItems.map((item, idx) => (
                  <li
                    key={item.id || item.text || idx}
                    className="flex items-start gap-4 border-t border-[#DCE4E8] pt-5 first:border-t-0 first:pt-0 dark:border-white/10"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-base leading-[1.7] text-[#18324A] dark:text-slate-200">{item.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.article>

          <motion.div {...reveal(reduce, 1)} className="relative lg:col-span-4 lg:-my-6">
            <div className="group relative isolate h-full min-h-[22rem] overflow-hidden rounded-3xl shadow-[0_30px_70px_-35px_rgba(16,42,64,0.6)]">
              {centerImageUrl ? (
                <img
                  src={centerImageUrl}
                  alt="A couple reviewing their tax papers together at home"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-20 h-full w-full object-cover object-[45%_center] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : null}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/40 to-transparent"
              />
              <div className="flex h-full flex-col justify-end p-7 sm:p-8">
                <FileText className="h-7 w-7 text-[#8FCB86]" aria-hidden="true" />
                <p className="mt-4 font-display text-[1.3rem] leading-snug text-white sm:text-[1.45rem]">
                  {centerText}
                </p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-[0_0_0_6px_#fff] dark:shadow-[0_0_0_6px_#071321] lg:grid"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-[0_0_0_6px_#fff] dark:shadow-[0_0_0_6px_#071321] lg:grid"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </span>
          </motion.div>

          <motion.article
            {...reveal(reduce, 2)}
            className="flex flex-col rounded-3xl bg-[#15344F] p-7 text-white sm:p-9 lg:col-span-4 lg:rounded-l-none lg:pl-12"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#8FCB86] ring-1 ring-white/20">
                <Globe className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="font-display text-[1.4rem] font-medium leading-snug sm:text-[1.55rem]">{homeHeading}</h3>
            </div>
            {homeSubheading ? (
              <p className="mt-6 font-display text-[1.15rem] leading-snug text-[#8FCB86]">
                {homeSubheading}
              </p>
            ) : null}
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{usLabel}</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.75] text-white/80 sm:text-base">{usText}</p>
            </div>
            <div className="mt-5 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{otherLabel}</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.75] text-white/80 sm:text-base">{otherText}</p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. What You Can Invest In, and What You Should
// ==========================================
export function GlobalCitizensInvest({ content, section }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress: entry } = useScroll({ target: sectionRef, offset: ["start end", "start 30%"] });
  const { scrollYProgress: track } = useScroll({ target: trackRef, offset: ["start 80%", "end 55%"] });
  const leftX = useTransform(entry, [0, 1], [-90, 0]);
  const rightX = useTransform(entry, [0, 1], [90, 0]);
  const sideOpacity = useTransform(entry, [0.2, 0.9], [0, 1]);

  useMotionValueEvent(track, "change", setProgress);

  const heading = content?.heading || "What You Can Invest In, and What You Should";
  const femaTitle = content?.femaTitle || "What FEMA allows";
  const femaText =
    content?.femaText ||
    "OCI cardholders can invest in India much like NRIs and residents, with some limits, such as on agricultural land, farmhouses and plantations. Foreign citizens without an OCI card face more restrictions, especially on property. Some fund houses do not accept investors with certain citizenships, such as US citizens.";
  const worksTitle = content?.worksTitle || "What works for you";
  const worksText =
    content?.worksText ||
    "The right investments are those that are efficient in both India and your home country. Depending on your citizenship, that may mean direct Indian shares, bonds, government securities and deposits, a planned approach to assets held abroad, and care with mutual funds, ULIPs and some insurance products.";
  const checkTitle = content?.checkTitle || "What we do";
  const checkSubtitle = content?.checkSubtitle || "We check every investment three ways before we recommend it:";
  const questions = visibleItems(content?.questions || [
    { question: "Is it allowed under FEMA?" },
    { question: "What is the tax in India?" },
    { question: "What is the tax in your home country?" },
  ]);
  const conclusionNote =
    content?.conclusionNote || "Only then do we ask whether it fits your goals and risk.";

  const fill = reduce ? 1 : progress;
  const isChecked = (idx) => fill > 0.02 + idx * 0.48;
  const allChecked = fill > 0.97;
  const lineStyle = reduce ? undefined : { scaleX: track };
  const lineStyleY = reduce ? undefined : { scaleY: track };

  return (
    <section
      ref={sectionRef}
      id={section?.design?.anchor || section?.id || "invest"}
      data-cms-section={section?.id}
      aria-labelledby="invest-heading"
      className="relative isolate overflow-hidden bg-[#071321] py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-[#21649A]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#54B848]/10 blur-3xl"
      />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="invest-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {heading}
        </h2>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2">
          <motion.article
            style={reduce ? undefined : { x: leftX, opacity: sideOpacity }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#21649A]/30 text-white ring-1 ring-[#21649A]/60">
              <Landmark className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-[1.5rem] font-medium sm:text-[1.65rem]">{femaTitle}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.8] text-slate-300 sm:text-base">{femaText}</p>
          </motion.article>

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#54B848] text-[#102A40] shadow-[0_0_0_8px_#071321] md:grid"
          >
            <ArrowRight className="h-6 w-6" />
          </span>

          <motion.article
            style={reduce ? undefined : { x: rightX, opacity: sideOpacity }}
            className="rounded-3xl border border-[#54B848]/30 bg-gradient-to-br from-[#54B848]/15 to-transparent p-7 sm:p-9"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#54B848] text-[#102A40]">
              <BadgeCheck className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-[1.5rem] font-medium sm:text-[1.65rem]">{worksTitle}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.8] text-slate-300 sm:text-base">{worksText}</p>
          </motion.article>
        </div>

        <motion.div {...reveal(reduce, 0)} className="mt-6 rounded-3xl bg-white p-7 text-[#18324A] sm:p-10 lg:p-12">
          <div className="md:flex md:items-end md:justify-between md:gap-10">
            <h3 className="font-display text-[1.75rem] font-medium text-[#15344F] sm:text-[2rem]">{checkTitle}</h3>
            {checkSubtitle ? (
              <p className="mt-2 text-base leading-[1.8] text-[#5E6D7B] md:mt-0">{checkSubtitle}</p>
            ) : null}
          </div>

          {questions.length > 0 ? (
            <ol ref={trackRef} className="relative mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 bg-[#DCE4E8] lg:hidden" />
              <motion.span
                aria-hidden="true"
                style={lineStyleY}
                className="absolute bottom-6 left-6 top-6 w-0.5 origin-top bg-[#54B848] lg:hidden"
              />
              <span
                aria-hidden="true"
                className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-0.5 bg-[#DCE4E8] lg:block"
              />
              <motion.span
                aria-hidden="true"
                style={lineStyle}
                className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-0.5 origin-left bg-[#54B848] lg:block"
              />

              {questions.map((item, idx) => {
                const checked = isChecked(idx);
                return (
                  <li key={item.id || item.question || idx} className="relative flex items-center gap-5 lg:flex-col lg:gap-5 lg:text-center">
                    <span
                      className={cx(
                        "relative grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-lg transition-all duration-500",
                        checked
                          ? "bg-[#54B848] text-[#102A40] shadow-[0_0_0_6px_rgba(84,184,72,0.18)]"
                          : "bg-[#15344F] text-white"
                      )}
                    >
                      {checked ? <Check className="h-5 w-5" aria-hidden="true" /> : idx + 1}
                    </span>
                    <span
                      className={cx(
                        "font-display text-[1.2rem] leading-snug transition-colors duration-500 sm:text-[1.35rem]",
                        checked ? "text-[#15344F]" : "text-[#15344F]/55"
                      )}
                    >
                      {item.question}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : null}

          {conclusionNote ? (
            <p
              className={cx(
                "mt-10 flex items-start gap-3 rounded-2xl p-5 text-base font-medium leading-[1.7] transition-colors duration-500 sm:items-center sm:justify-center sm:text-[1.0625rem]",
                allChecked ? "bg-[#54B848] text-[#102A40]" : "bg-[#54B848]/15 text-[#15344F]"
              )}
            >
              <ArrowRight
                className={cx("mt-1 h-4 w-4 shrink-0 sm:mt-0", allChecked ? "text-[#102A40]" : "text-[#2f8a25]")}
                aria-hidden="true"
              />
              {conclusionNote}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 9. Who We Help (Global Citizens)
// ==========================================
export function GlobalCitizensWhoWeHelp({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Who We Help";
  const sideImageUrl = content?.sideImage?.url || "/images/nri-relocation-advisory.jpg";
  const profiles = visibleItems(content?.profiles || []);
  const footnote =
    content?.footnote ||
    "Many of our clients in this group are US citizens, and our team includes a US CPA, so we know the India and US rules especially well. For other countries, we work closely with your tax adviser at home so both sides are planned together.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "who-we-help"}
      data-cms-section={section?.id}
      aria-labelledby="who-we-help-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
        <div className="relative min-h-[320px] overflow-hidden lg:col-span-5 lg:min-h-0">
          {sideImageUrl ? (
            <img
              src={sideImageUrl}
              alt="A couple in a planning meeting with their adviser"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <h2 id="who-we-help-heading" className={H2}>
            {heading}
          </h2>
          {profiles.length > 0 ? (
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {profiles.map((item, idx) => (
                <motion.li
                  key={item.id || item.text || idx}
                  {...reveal(reduce, idx)}
                  className="flex items-start gap-4 border-t border-[#DCE4E8] py-5 dark:border-white/10"
                >
                  <span className="mt-0.5 shrink-0 text-[#54B848]">
                    <ResolveIcon name={item.icon || "Flag"} className="h-5 w-5" />
                  </span>
                  <span className="text-base font-medium leading-snug text-[#15344F] dark:text-white">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : null}
          {footnote ? (
            <p className="mt-6 bg-[#F7F8F5] p-6 text-base leading-[1.8] text-[#18324A] dark:bg-white/[0.05] dark:text-slate-200">
              {footnote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. How We Help (6 Advisory Areas)
// ==========================================
export function GlobalCitizensHowWeHelp({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "How We Help";
  const services = visibleItems(content?.services || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "how-we-help"}
      data-cms-section={section?.id}
      aria-labelledby="how-we-help-heading"
      className="scroll-mt-24 bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-help-heading" className={cx(H2, "max-w-3xl")}>
          {heading}
        </h2>

        {services.length > 0 ? (
          <ol className="mt-12 border-t border-[#15344F]/20 dark:border-white/15">
            {services.map((item, idx) => (
              <motion.li
                key={item.id || item.title || idx}
                {...reveal(reduce, idx)}
                className="group grid gap-4 border-b border-[#15344F]/20 py-8 transition-colors duration-300 hover:bg-white dark:border-white/15 dark:hover:bg-white/[0.04] md:grid-cols-12 md:gap-8 md:px-6"
              >
                <div className="flex items-center gap-4 md:col-span-1 md:block">
                  <span className="font-display text-[2rem] leading-none text-[#21649A] transition-colors duration-300 group-hover:text-[#54B848] dark:text-[#8FCB86]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="mt-1 shrink-0 text-[#54B848]">
                    <ResolveIcon name={item.icon || "LineChart"} className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.55rem]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[0.9375rem] leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-base md:col-span-7">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 11. Your Global Citizen Plan (Tiles)
// ==========================================
export function GlobalCitizensPlan({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Your Global Citizen Plan";
  const subtitle = content?.subtitle || "When you work with us, you receive a written plan covering:";
  const planItems = visibleItems(content?.planItems || []);
  const closingTileText =
    content?.closingTileText ||
    "We then help you put the plan in place and review it every year, or whenever your life or the rules change.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "plan"}
      data-cms-section={section?.id}
      aria-labelledby="plan-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 id="plan-heading" className={H2}>
            {heading}
          </h2>
          {subtitle ? <p className={cx(BODY, "max-w-md md:pb-2")}>{subtitle}</p> : null}
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planItems.map((item, idx) => {
            const imgUrl = item.image?.url || item.image || "";
            return (
              <motion.li
                key={item.id || item.title || idx}
                {...reveal(reduce, idx)}
                className="group relative isolate flex min-h-[18rem] flex-col justify-between overflow-hidden bg-[#0B1E30] p-6 text-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : null}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#0B1E30]/80 to-[#0B1E30]/35 transition-colors duration-500 group-hover:via-[#0B1E30]/90"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#54B848] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-[#8FCB86] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#54B848] group-hover:bg-[#54B848] group-hover:text-[#102A40]">
                    <ResolveIcon name={item.icon || "BadgeCheck"} className="h-5 w-5" />
                  </span>
                  <span aria-hidden="true" className="font-display text-[1.8rem] leading-none text-white/45">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-[1.3rem] font-medium leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80">{item.text}</p>
                </div>
              </motion.li>
            );
          })}

          {closingTileText ? (
            <motion.li
              {...reveal(reduce, planItems.length)}
              className="flex min-h-[18rem] flex-col justify-between gap-6 bg-[#54B848] p-6 text-[#102A40]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#102A40] text-[#8FCB86]">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-display text-[1.3rem] leading-snug">{closingTileText}</p>
            </motion.li>
          ) : null}
        </ol>
      </div>
    </section>
  );
}

// ==========================================
// 12. Why Choose Neuron Wealth (Citizens)
// ==========================================
export function GlobalCitizensWhyChoose({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Why Choose Neuron Wealth";
  const tiles = visibleItems(content?.tiles || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "why-choose"}
      data-cms-section={section?.id}
      aria-labelledby="why-choose-heading"
      className="bg-[#EAF1F7] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="why-choose-heading" className={cx(H2, "lg:sticky lg:top-32")}>
            {heading}
          </h2>
        </div>

        {tiles.length > 0 ? (
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {tiles.map((item, idx) => (
              <motion.li
                key={item.id || item.title || idx}
                {...reveal(reduce, idx)}
                className="group border-t-2 border-[#15344F]/15 pt-6 dark:border-white/15"
              >
                <span className="grid h-12 w-12 place-items-center bg-white text-[#21649A] shadow-sm transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-[#102A40] dark:bg-white/10 dark:text-[#8FCB86]">
                  <ResolveIcon name={item.icon || "LineChart"} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.35rem] font-medium leading-snug text-[#15344F] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 13. How We Work (4 Outline Steps)
// ==========================================
function useFixedBackground(reduce, bgImageUrl) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const secEl = sectionRef.current;
    const bg = bgRef.current;
    if (!secEl || !bg) return undefined;

    const wide = window.matchMedia("(min-width: 1200px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (wide.matches) {
        bg.style.clipPath = "";
        return;
      }
      const rect = secEl.getBoundingClientRect();
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

export function GlobalCitizensHowWeWork({ content, section }) {
  const reduce = useReducedMotion();
  const bgImageUrl = content?.bgImage?.url || "/images/mission-dark-bg.jpg";
  const [howWeWorkRef, howWeWorkBgRef] = useFixedBackground(reduce, bgImageUrl);

  const heading = content?.heading || "How We Work";
  const steps = visibleItems(content?.steps || []);

  return (
    <section
      ref={howWeWorkRef}
      id={section?.design?.anchor || section?.id || "how-we-work"}
      data-cms-section={section?.id}
      aria-labelledby="how-we-work-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#15344F] py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat",
          !reduce && "max-[1199px]:hidden min-[1200px]:bg-fixed"
        )}
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />
      {reduce ? null : (
        <div
          ref={howWeWorkBgRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat min-[1200px]:hidden"
          style={{ backgroundImage: `url(${bgImageUrl})`, clipPath: "inset(100%)" }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#0B1E30]/90 via-[#15344F]/80 to-[#0B1E30]/85"
      />

      <div className="site-frame relative z-10 px-4 sm:px-6">
        <h2 id="how-we-work-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {heading}
        </h2>

        {steps.length > 0 ? (
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <motion.li key={step.id || step.title || idx} {...reveal(reduce, idx)} className="group border-t border-white/20 pt-6">
                <span
                  aria-hidden="true"
                  className="block font-display text-[4.5rem] leading-none text-transparent transition-colors duration-500 group-hover:text-[#54B848]/20"
                  style={{ WebkitTextStroke: "1px rgba(143, 203, 134, 0.8)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.35rem] font-medium leading-snug">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 14. Families We Helped (Client Stories)
// ==========================================
export function GlobalCitizensStories({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Families We Helped";
  const disclaimerBadge =
    content?.disclaimerBadge || "Examples for illustration. Names and details are changed.";
  const stories = visibleItems(content?.stories || []);
  const footnote =
    content?.footnote || "Every family is different. Results depend on individual circumstances and markets.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "stories"}
      data-cms-section={section?.id}
      aria-labelledby="stories-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <h2 id="stories-heading" className={cx(H2, "max-w-3xl")}>
          {heading}
        </h2>
        {disclaimerBadge ? (
          <p className="mt-4 text-[0.875rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400">
            {disclaimerBadge}
          </p>
        ) : null}

        {stories.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stories.map((story, idx) => (
              <motion.article
                key={story.id || story.title || idx}
                {...reveal(reduce, idx)}
                className="flex flex-col border-t-4 border-[#21649A] bg-white p-8 shadow-sm dark:bg-white/[0.05] sm:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#EAF1F7] text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white">
                    {story.title}
                  </h3>
                </div>
                <p className="mt-6 text-base leading-[1.85] text-[#18324A] dark:text-slate-200">{story.text}</p>
              </motion.article>
            ))}
          </div>
        ) : null}

        {footnote ? (
          <p className="mt-8 text-[0.875rem] italic leading-relaxed text-[#5E6D7B] dark:text-slate-400">
            {footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 15. Citizens FAQs & Closing CTA
// ==========================================
export function GlobalCitizensFaqsClosing({ content, section }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqHeading = content?.faqHeading || "Frequently Asked Questions";
  const faqs = visibleItems(content?.faqs || []);
  const closingHeading = content?.closingHeading || "One Family. Two Countries. One Clear Plan.";
  const closingText =
    content?.closingText ||
    "Tell us about your situation in a 30 minute call. No obligation and nothing to sell. Just clear answers from investment advisers who understand life across borders.";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || {
    label: "Check your residential status",
    href: "#status",
  };
  const disclaimer =
    content?.disclaimer ||
    "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.";

  return (
    <div id={section?.design?.anchor || section?.id || "faqs"} data-cms-section={section?.id}>
      {/* FAQ Accordion */}
      <section
        aria-labelledby="faq-heading"
        className="scroll-mt-32 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
      >
        <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="faq-heading" className={cx(H2, "lg:sticky lg:top-32")}>
              {faqHeading}
            </h2>
          </div>

          <div className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-8">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              const panelId = `global-citizens-faq-${index}`;
              return (
                <div key={item.id || item.q || index} className="border-b border-[#DCE4E8] dark:border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className={cx(
                        "flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium leading-snug transition-colors sm:text-[1.25rem]",
                        isOpen
                          ? "text-[#21649A] dark:text-[#8FCB86]"
                          : "text-[#15344F] hover:text-[#21649A] dark:text-white dark:hover:text-[#8FCB86]",
                        FOCUS
                      )}
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors",
                          isOpen
                            ? "border-[#54B848] bg-[#54B848] text-[#102A40]"
                            : "border-[#DCE4E8] text-[#21649A] dark:border-white/20 dark:text-[#8FCB86]"
                        )}
                      >
                        <Plus className={cx("h-4 w-4 transition-transform duration-200", isOpen && "rotate-45")} />
                      </span>
                    </button>
                  </h3>
                  {isOpen ? (
                    <p id={panelId} className="pb-6 pr-14 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="closing-heading"
        className="border-t border-[#DCE4E8] bg-white px-4 py-16 text-center dark:border-white/10 dark:bg-[#071321] sm:px-6 sm:py-20 lg:py-24"
      >
        <div className="site-frame">
          <h2 id="closing-heading" className={`mx-auto max-w-3xl ${H2}`}>
            {closingHeading}
          </h2>
          {closingText ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {closingText}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {primaryButton?.label ? (
              <Link
                to={primaryButton.href || "/contact"}
                target={primaryButton.newTab ? "_blank" : undefined}
                rel={primaryButton.newTab ? "noreferrer noopener" : undefined}
                className={cx(
                  "inline-flex min-h-12 items-center gap-2 rounded-full bg-[#54B848] px-6 text-sm font-semibold text-[#102A40] shadow-md transition-colors hover:bg-[#6cc960]",
                  FOCUS
                )}
              >
                {primaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryButton?.label ? (
              <a
                href={secondaryButton.href || "#status"}
                target={secondaryButton.newTab ? "_blank" : undefined}
                rel={secondaryButton.newTab ? "noreferrer noopener" : undefined}
                className={cx(OUTLINE_ON_LIGHT, FOCUS)}
              >
                {secondaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* SEBI Regulatory Disclaimer */}
      {disclaimer ? (
        <section aria-label="Disclaimer" className="border-t border-[#DCE4E8] bg-white py-8 dark:border-white/10 dark:bg-[#071321]">
          <p className="site-frame px-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400 sm:px-6">
            {disclaimer}
          </p>
        </section>
      ) : null}
    </div>
  );
}

