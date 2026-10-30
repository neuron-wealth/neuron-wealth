import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  Globe,
  HeartHandshake,
  House,
  Landmark,
  Layers,
  LineChart,
  Plane,
  Plus,
  Quote,
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

const LUCIDE_ICONS = {
  ArrowLeftRight,
  BadgeCheck,
  Briefcase,
  Globe,
  HeartHandshake,
  House,
  Landmark,
  Layers,
  LineChart,
  Plane,
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
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: "easeOut", delay: reduce ? 0 : idx * 0.08 },
});

// ==========================================
// 1. Global Indians Hero Banner
// ==========================================
export function GlobalIndiansHero({ content, section }) {
  const eyebrow = content?.eyebrow || "Investment advice for NRIs, OCI cardholders and Persons of Indian Origin";
  const title = content?.title || "Your Money in India Should Work for You";
  const titleHighlight = content?.titleHighlight || "in Both Countries.";
  const description =
    content?.description ||
    "Many Global Indians earn good returns in India, then lose a large part of it to tax in India and again where they live. We are a SEBI Registered Investment Adviser with one clear focus: helping you earn better returns after tax in both countries, for the risk you are comfortable with, while staying fully within Indian tax law, FEMA and the rules of your home country.";
  const bgImageUrl = content?.bgImage?.url || "/images/home/hero-window.jpg";
  const bgImageAlt = content?.bgImage?.alt || "Global Indians Hero Horizon";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || { label: "See how we invest", href: "#how-we-help" };
  const trustItems = visibleItems(content?.trustItems || [
    { text: "SEBI Registered Investment Adviser INA000016481" },
    { text: "Fee only, no commissions" },
    { text: "CA, CPA and CFA team" },
    { text: "India and US tax built into every investment decision" },
  ]);

  return (
    <section
      id={section?.design?.anchor || section?.id || "global-indians-hero"}
      data-cms-section={section?.id}
      aria-labelledby="global-indians-hero-heading"
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img
        src={bgImageUrl}
        alt={bgImageAlt}
        aria-hidden={!bgImageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081724]/95 via-[#081724]/85 to-[#081724]/60" />

      <div className="site-frame relative px-4 pb-16 sm:px-6 lg:pb-20">
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            {eyebrow ? (
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] sm:text-[0.8125rem]">
                {eyebrow}
              </p>
            ) : null}
            <h1
              id="global-indians-hero-heading"
              className="mt-4 font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]"
            >
              {title} {titleHighlight ? <span className="italic text-[#F3E6D4]">{titleHighlight}</span> : null}
            </h1>
            {description ? (
              <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-white/90 sm:text-[1rem] lg:text-[1.0625rem]">
                {description}
              </p>
            ) : null}
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
                  href={secondaryButton.href || "#how-we-help"}
                  target={secondaryButton.newTab ? "_blank" : undefined}
                  rel={secondaryButton.newTab ? "noreferrer noopener" : undefined}
                  className={cx(
                    "inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10",
                    FOCUS
                  )}
                >
                  {secondaryButton.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>

          {trustItems.length > 0 ? (
            <ul className="border border-white/15 bg-white/[0.06] backdrop-blur-md lg:col-span-5">
              {trustItems.map((item, idx) => (
                <li
                  key={item.id || item.text || idx}
                  className="flex items-start gap-3.5 border-b border-white/10 px-6 py-4 text-[0.9375rem] font-medium leading-snug text-white last:border-b-0"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. What Matters Is What You Keep
// ==========================================
export function GlobalIndiansWhatYouKeep({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "What Matters Is What You Keep";
  const sideImageUrl = content?.sideImage?.url || "/images/home/family-shore.jpg";
  const sideImageAlt = content?.sideImage?.alt || "A family walking together along the shore";
  const calloutBadge =
    content?.calloutBadge || "A good return on paper is not the same as a good return in your pocket.";
  const introText =
    content?.introText ||
    "Two families can hold similar investments in India and keep very different amounts. The difference comes from a few quiet choices:";
  const choices = visibleItems(content?.choices || [
    { num: "01", text: "Which investment you choose, based on where you pay tax" },
    { num: "02", text: "Which account it sits in: NRE, NRO, FCNR or abroad" },
    { num: "03", text: "In whose name you invest" },
    { num: "04", text: "When you buy, when you sell and when you bring the money out" },
    { num: "05", text: "How the tax paid in India is used in your home country" },
  ]);
  const conclusionText =
    content?.conclusionText ||
    "Get these right and every rupee works harder. Get them wrong and returns leak away year after year, often without anyone noticing.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "what-you-keep"}
      data-cms-section={section?.id}
      aria-labelledby="what-you-keep-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={sideImageUrl}
                alt={sideImageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {calloutBadge ? (
              <div className="absolute -bottom-6 -right-4 hidden max-w-[17rem] bg-[#15344F] p-6 text-white shadow-2xl sm:block lg:-right-10">
                <p className="font-display text-[1.2rem] leading-snug">{calloutBadge}</p>
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-6">
            <h2 id="what-you-keep-heading" className={H2}>
              {heading}
            </h2>
            {calloutBadge ? (
              <p className="mt-5 font-display text-[1.3rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:hidden">
                {calloutBadge}
              </p>
            ) : null}
            {introText ? (
              <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {introText}
              </p>
            ) : null}

            {choices.length > 0 ? (
              <ol className="mt-8 border-t border-[#DCE4E8] dark:border-white/10">
                {choices.map((choice, idx) => (
                  <motion.li
                    key={choice.id || choice.text || idx}
                    {...reveal(reduce, idx)}
                    className="group flex items-center gap-5 border-b border-[#DCE4E8] py-4 dark:border-white/10"
                  >
                    <span className="w-10 shrink-0 font-display text-[1.6rem] leading-none text-[#54B848]">
                      {choice.num || String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.15rem] leading-snug text-[#15344F] transition-transform duration-300 group-hover:translate-x-1 dark:text-white sm:text-[1.25rem]">
                      {choice.text}
                    </span>
                  </motion.li>
                ))}
              </ol>
            ) : null}

            {conclusionText ? (
              <p className="mt-8 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {conclusionText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. Three Guiding Questions (Approach)
// ==========================================
const APPROACH_INTERVAL_MS = 4500;

export function GlobalIndiansApproach({ content, section }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const heading = content?.heading || "Three Questions Guide Every Recommendation";
  const bgImageUrl = content?.bgImage?.url || "/images/global-approach-bg.jpg";
  const pillars = visibleItems(content?.pillars || [
    {
      icon: "LineChart",
      title: "Better returns after tax.",
      text: "We judge every investment by what you keep after tax in India and in your home country.",
    },
    {
      icon: "Scale",
      title: "The right level of risk.",
      text: "Your portfolio matches your goals and your comfort, not the market mood.",
    },
    {
      icon: "ShieldCheck",
      title: "Fully compliant.",
      text: "Every decision follows Indian income tax law, FEMA and the reporting rules where you live. No shortcuts, no surprises later.",
    },
  ]);

  const autoPlay = !reduce && !paused && pillars.length > 1;

  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = setTimeout(() => setActive((current) => (current + 1) % pillars.length), APPROACH_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, autoPlay, pillars.length]);

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

  return (
    <section
      ref={sectionRef}
      id={section?.design?.anchor || section?.id || "approach"}
      data-cms-section={section?.id}
      aria-label="Our approach"
      className="relative isolate overflow-hidden bg-[#071321] py-14 text-white sm:py-16 lg:py-20"
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
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat min-[1200px]:hidden"
          style={{ backgroundImage: `url(${bgImageUrl})`, clipPath: "inset(100%)" }}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#061524]/85 via-[#081b2e]/60 to-[#061524]/75"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#21649A]/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#54B848]/15 blur-3xl" />
      </div>

      <div className="site-frame relative z-10 grid gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12">
        <p className="font-display text-[1.9rem] font-medium leading-tight tracking-tight sm:text-[2.3rem] lg:col-span-4 lg:text-[2.6rem]">
          {heading}
        </p>

        <div
          className="lg:col-span-8"
          aria-roledescription="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid" aria-live={autoPlay ? "off" : "polite"}>
            {pillars.map((item, idx) => {
              const isActive = idx === active;
              return (
                <motion.article
                  key={item.id || item.title || idx}
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${pillars.length}`}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive || reduce ? 0 : 24 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
                  className={cx(
                    "col-start-1 row-start-1 flex items-start gap-5 border border-white/15 bg-[#0B1E30]/80 p-6 backdrop-blur-md sm:items-center sm:gap-7 sm:p-8",
                    !isActive && "pointer-events-none"
                  )}
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-[#54B848]/40 bg-[#54B848]/10 text-[#8FCB86]">
                    <ResolveIcon name={item.icon || "LineChart"} className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.45rem] font-medium leading-snug sm:text-[1.65rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">{item.text}</p>
                  </div>
                  <span aria-hidden="true" className="hidden font-display text-5xl text-white/15 sm:block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.article>
              );
            })}
          </div>

          {pillars.length > 1 ? (
            <div className="mt-5 flex items-center gap-5">
              <div className="flex gap-2">
                {pillars.map((item, idx) => (
                  <button
                    key={item.id || item.title || idx}
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-label={`Show ${idx + 1}: ${item.title}`}
                    aria-current={idx === active ? "true" : undefined}
                    className={cx(
                      "h-2.5 rounded-full transition-all duration-300",
                      idx === active ? "w-8 bg-[#54B848]" : "w-2.5 bg-white/30 hover:bg-white/60",
                      FOCUS
                    )}
                  />
                ))}
              </div>
              <div className="h-0.5 flex-1 overflow-hidden bg-white/15" aria-hidden="true">
                {autoPlay ? (
                  <motion.div
                    key={active}
                    className="h-full origin-left bg-[#54B848]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: APPROACH_INTERVAL_MS / 1000, ease: "linear" }}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. Does This Sound Familiar?
// ==========================================
export function GlobalIndiansFamiliar({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Does This Sound Familiar?";
  const quotes = visibleItems(content?.quotes || [
    { quote: "My Indian mutual funds have done well, but my CPA says the US tax on them is very high." },
    { quote: "My money sits in fixed deposits because I never found time to plan it properly." },
    { quote: "I invest in India through a relative's name. I am not sure it is right." },
    { quote: "I seem to pay tax in India and again abroad." },
    { quote: "I have accounts and investments everywhere and no single view of how they are doing." },
    { quote: "If something happens to me, my family will not know what we own in India." },
  ]);
  const bannerText =
    content?.bannerText ||
    "If even one of these sounds like you, your money in India is probably working harder for the tax authorities than for you.";
  const bannerHighlight = content?.bannerHighlight || "We can help.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "familiar"}
      data-cms-section={section?.id}
      aria-labelledby="familiar-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-height,4.875rem)+2rem)]">
              <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center bg-[#54B848]/10 text-[#54B848]">
                <Quote className="h-7 w-7" />
              </span>
              <h2 id="familiar-heading" className={cx(H2, "mt-6")}>
                {heading}
              </h2>
              {bannerText ? (
                <div className="relative mt-8 overflow-hidden bg-[#15344F] p-7 text-white sm:p-8">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[#54B848]" />
                  <p className="text-[0.9375rem] leading-[1.8] text-white/85 sm:text-base">{bannerText}</p>
                  {bannerHighlight ? (
                    <p className="mt-4 font-display text-[1.6rem] font-medium leading-tight text-[#8FCB86]">{bannerHighlight}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {quotes.length > 0 ? (
            <ul className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-7">
              {quotes.map((item, idx) => (
                <motion.li
                  key={item.id || item.quote || idx}
                  {...reveal(reduce, idx)}
                  className="group relative flex gap-5 border-b border-[#DCE4E8] px-2 py-6 transition-colors duration-300 hover:bg-white dark:border-white/10 dark:hover:bg-white/[0.04] sm:gap-7 sm:px-5 sm:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-[#54B848] transition-transform duration-500 group-hover:scale-y-100"
                  />
                  <span className="mt-1 shrink-0 font-mono text-sm font-bold tracking-widest text-[#54B848]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[1.2rem] italic leading-snug text-[#15344F] dark:text-white sm:text-[1.35rem]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. Who We Work With
// ==========================================
export function GlobalIndiansWhoWeWorkWith({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Who We Work With";
  const subtitleNote =
    content?.subtitleNote ||
    "Most of our clients live in the United States, so we know the rules of India and the US especially well.";
  const profiles = visibleItems(content?.profiles || [
    {
      icon: "Briefcase",
      text: "NRIs working abroad on H1B, L1 and other work visas",
      image: { url: "/images/who-nri-h1b.jpg" },
    },
    {
      icon: "BadgeCheck",
      text: "Green Card holders and US citizens of Indian origin",
      image: { url: "/images/who-greencard.jpg" },
    },
    {
      icon: "Globe",
      text: "OCI cardholders and Persons of Indian Origin in the US, UK, Canada, UAE, Singapore and beyond",
      image: { url: "/images/who-oci-global.jpg" },
    },
    {
      icon: "Users",
      text: "Families with members living in two or more countries",
      image: { url: "/images/who-global-families.jpg" },
    },
    {
      icon: "Landmark",
      text: "Families with investable wealth of USD 1 million or more who want one trusted investment adviser for India",
      image: { url: "/images/who-wealthy-families.jpg" },
    },
  ]);

  return (
    <section
      id={section?.design?.anchor || section?.id || "who-we-work-with"}
      data-cms-section={section?.id}
      aria-labelledby="who-we-work-with-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 id="who-we-work-with-heading" className={H2}>
            {heading}
          </h2>
          {subtitleNote ? (
            <p className="flex max-w-md items-start gap-3 border-l-2 border-[#54B848] pl-4 text-base leading-[1.7] text-[#5E6D7B] dark:text-slate-300">
              <Globe className="mt-1 h-5 w-5 shrink-0 text-[#54B848]" aria-hidden="true" />
              {subtitleNote}
            </p>
          ) : null}
        </div>

        {profiles.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {profiles.map((item, idx) => {
              const isWide = idx < 2;
              const imgUrl = item.image?.url || item.image || "";
              const imgAlt = item.image?.alt || item.text || "";
              return (
                <motion.li
                  key={item.id || item.text || idx}
                  {...reveal(reduce, idx)}
                  className={cx(
                    "group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden bg-[#071321] p-6 text-white sm:p-7",
                    isWide ? "lg:col-span-3 lg:min-h-[22rem]" : "lg:col-span-2",
                    idx === profiles.length - 1 && "sm:col-span-2 lg:col-span-2"
                  )}
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={imgAlt}
                      aria-hidden={!imgAlt}
                      loading="lazy"
                      className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321]/95 via-[#071321]/45 to-transparent"
                  />
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                    <ResolveIcon name={item.icon || "Users"} className="h-5 w-5" />
                  </span>
                  <p className="mt-4 max-w-md font-display text-[1.25rem] font-medium leading-snug sm:text-[1.35rem]">
                    {item.text}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 6. Why Investing in India Is Different
// ==========================================
export function GlobalIndiansWhyDifferent({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Why Investing in India Is Different for You";
  const subheading = content?.subheading || "You live under two sets of rules.";
  const box1Text =
    content?.box1Text || "India decides what you can buy, how you must hold it and how much you can take out.";
  const box2Text =
    content?.box2Text || "Your home country decides how all of it is taxed and reported.";
  const bannerBgImageUrl = content?.bannerBgImage?.url || "/images/us-tax-airport.jpg";
  const bannerHeading =
    content?.bannerHeading || "So an investment that is perfect for someone living in India can be costly for you:";
  const points = visibleItems(content?.points || [
    {
      point:
        "Indian mutual funds work well for residents. For US taxpayers they are usually treated as PFIC, which can take away a large part of the gain in US tax.",
    },
    {
      point: "NRE deposit interest is tax free in India. If you are a US tax resident, it is still taxed in the US.",
    },
    {
      point: "Selling property or shares at the wrong time, or from the wrong account, can mean higher tax in both countries.",
    },
  ]);
  const footerNote =
    content?.footerNote ||
    "This is why investment advice made for resident Indians often goes wrong for NRIs. We always look at both countries before we recommend anything.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "why-different"}
      data-cms-section={section?.id}
      aria-labelledby="different-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="different-heading" className={H2}>
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-5 font-display text-[1.35rem] leading-snug text-[#21649A] dark:text-[#8FCB86] sm:text-[1.5rem]">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="relative mt-10 grid gap-5 md:grid-cols-2">
          <div className="bg-white p-8 shadow-sm dark:bg-white/[0.05] sm:p-10">
            <Landmark className="h-8 w-8 text-[#21649A] dark:text-[#8FCB86]" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-5 font-display text-[1.35rem] leading-snug text-[#15344F] dark:text-white sm:text-[1.5rem]">
              {box1Text}
            </p>
          </div>
          <div className="bg-[#15344F] p-8 text-white shadow-sm sm:p-10">
            <Globe className="h-8 w-8 text-[#8FCB86]" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-5 font-display text-[1.35rem] leading-snug sm:text-[1.5rem]">
              {box2Text}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#F7F8F5] bg-[#54B848] text-[#102A40] dark:border-[#0a1524] md:grid"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </span>
        </div>

        <div className="relative isolate mt-12 overflow-hidden bg-[#071321] p-6 text-white sm:p-10 lg:p-12">
          {bannerBgImageUrl ? (
            <img
              src={bannerBgImageUrl}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />
          ) : null}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071321]/90 via-[#0B1E30]/65 to-[#071321]/50"
          />
          {bannerHeading ? (
            <p className="max-w-2xl font-display text-[1.45rem] leading-snug sm:text-[1.7rem]">
              {bannerHeading}
            </p>
          ) : null}
          {points.length > 0 ? (
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {points.map((item, idx) => (
                <motion.li
                  key={item.id || item.point || idx}
                  {...reveal(reduce, idx)}
                  className="flex flex-col border border-white/15 border-t-4 border-t-[#54B848] bg-[#0B1E30]/70 p-7 backdrop-blur-md"
                >
                  <TriangleAlert className="h-6 w-6 text-[#8FCB86]" aria-hidden="true" />
                  <p className="mt-4 text-base leading-relaxed text-white/90">{item.point}</p>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </div>

        {footerNote ? (
          <p className="mt-10 max-w-3xl border-l-2 border-[#54B848] pl-5 text-base leading-[1.8] text-[#15344F] dark:text-white sm:text-[1.0625rem]">
            {footerNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 7. How We Help (Stacking Cards)
// ==========================================
const HELP_IMAGES = [
  "/images/pillar-capability.jpg",
  "/images/home/investment-still.jpg",
  "/images/reasons-dark-bg.jpg",
  "/images/home/nri-horizon.jpg",
  "/images/pillar-results.jpg",
  "/images/mission-dark-bg.jpg",
];

const HELP_THEMES = [
  {
    card: "bg-[#15344F] text-white",
    icon: "bg-[#54B848] text-[#102A40]",
    num: "text-[#8FCB86]",
    title: "text-white",
    text: "text-white/80",
  },
  {
    card: "border border-[#DCE4E8] bg-[#F7F8F5] dark:border-white/10 dark:bg-[#0B1E30]",
    icon: "bg-[#15344F] text-white",
    num: "text-[#21649A] dark:text-[#8FCB86]",
    title: "text-[#15344F] dark:text-white",
    text: "text-[#5E6D7B] dark:text-slate-300",
  },
  {
    card: "bg-[#EAF1F7] dark:bg-[#102A40]",
    icon: "bg-[#21649A] text-white",
    num: "text-[#21649A] dark:text-[#8FCB86]",
    title: "text-[#15344F] dark:text-white",
    text: "text-[#5E6D7B] dark:text-slate-300",
  },
];

export function GlobalIndiansHowWeHelp({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "How We Help";
  const services = visibleItems(content?.services || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "how-we-help"}
      data-cms-section={section?.id}
      aria-labelledby="how-we-help-heading"
      className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-help-heading" className={cx(H2, "max-w-3xl")}>
          {heading}
        </h2>

        {services.length > 0 ? (
          <ol className="mt-12 space-y-6 lg:mt-14 lg:space-y-10">
            {services.map((item, idx) => {
              const theme = HELP_THEMES[idx % HELP_THEMES.length];
              const imgUrl = item.image?.url || HELP_IMAGES[idx % HELP_IMAGES.length];
              const imgAlt = item.image?.alt || item.title || "";
              const paras = Array.isArray(item.text)
                ? item.text
                : typeof item.text === "string"
                ? item.text.split("\n\n").filter(Boolean)
                : [];

              return (
                <li
                  key={item.id || item.title || idx}
                  className="lg:sticky"
                  style={{ top: `calc(var(--header-height, 4.875rem) + 1.5rem + ${idx * 1.25}rem)` }}
                >
                  <motion.article
                    {...reveal(reduce, 0)}
                    className={cx(
                      "grid overflow-hidden rounded-3xl shadow-[0_-18px_50px_-28px_rgba(16,42,64,0.45)] lg:min-h-[24rem] lg:grid-cols-12",
                      theme.card
                    )}
                  >
                    <div className="flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-12">
                      <div className="flex items-center gap-4">
                        <span className={cx("grid h-12 w-12 place-items-center rounded-2xl", theme.icon)}>
                          <ResolveIcon name={item.icon || "LineChart"} className="h-5 w-5" />
                        </span>
                        <span className={cx("font-display text-lg", theme.num)}>
                          {item.num || String(idx + 1).padStart(2, "0")}
                          <span className="opacity-50"> / {String(services.length).padStart(2, "0")}</span>
                        </span>
                      </div>
                      <h3
                        className={cx(
                          "mt-6 max-w-xl font-display text-[1.65rem] font-medium leading-tight tracking-tight sm:text-[2.1rem]",
                          theme.title
                        )}
                      >
                        {item.title}
                      </h3>
                      <div className={cx("mt-4 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed sm:text-base", theme.text)}>
                        {paras.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    </div>
                    <div className="relative order-first h-52 sm:h-64 lg:order-none lg:col-span-5 lg:h-auto">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={imgAlt}
                          aria-hidden={!imgAlt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                      ) : null}
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 8. Why Families Choose Neuron Wealth
// ==========================================
const WHY_TILES = [
  { tone: "blue", wide: true, span: "sm:col-span-2 lg:col-start-2 lg:row-start-1" },
  {
    tone: "image",
    wide: true,
    image: "/images/nri-relocation-advisory.jpg",
    position: "object-[center_35%]",
    span: "sm:col-span-2 lg:col-start-2 lg:row-start-3",
  },
  {
    tone: "image",
    image: "/images/home/hero-residence.jpg",
    position: "object-[64%_center]",
    span: "sm:min-h-[22rem] lg:col-start-1 lg:row-span-2 lg:row-start-1",
  },
  { tone: "green", span: "lg:col-start-2 lg:row-start-2" },
  { tone: "white", span: "lg:col-start-3 lg:row-start-2" },
  { tone: "dark", span: "lg:col-start-1 lg:row-start-3" },
];

const WHY_TONES = {
  blue: {
    box: "bg-gradient-to-br from-[#21649A] to-[#15344F]",
    icon: "bg-white/15 text-white ring-1 ring-white/25",
    ghost: "text-white/10",
    title: "text-white",
    text: "text-white/85",
  },
  image: {
    box: "bg-[#0B1E30]",
    icon: "bg-[#54B848] text-[#102A40]",
    ghost: "",
    title: "text-white",
    text: "text-white/85",
  },
  green: {
    box: "bg-[#54B848]",
    icon: "bg-[#102A40] text-[#8FCB86]",
    ghost: "text-[#102A40]/10",
    title: "text-[#102A40]",
    text: "text-[#102A40]/85",
  },
  white: {
    box: "bg-[#F7F8F5]",
    icon: "bg-[#EAF1F7] text-[#21649A]",
    ghost: "text-[#21649A]/[0.07]",
    title: "text-[#15344F]",
    text: "text-[#5E6D7B]",
  },
  dark: {
    box: "border border-white/10 bg-[#0B1E30]",
    icon: "bg-[#54B848]/15 text-[#8FCB86] ring-1 ring-[#54B848]/40",
    ghost: "text-white/[0.05]",
    title: "text-white",
    text: "text-slate-300",
  },
};

export function GlobalIndiansWhyChoose({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "Why Families Choose Neuron Wealth";
  const tiles = visibleItems(content?.tiles || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "why-choose"}
      data-cms-section={section?.id}
      aria-labelledby="why-choose-heading"
      className="relative isolate overflow-hidden bg-[#071321] py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,rgba(33,100,154,0.32),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(84,184,72,0.12),transparent_50%)]"
      />

      <div className="site-frame px-4 sm:px-6">
        <h2 id="why-choose-heading" className={`${H2_SIZE} max-w-3xl text-white`}>
          {heading}
        </h2>

        {tiles.length > 0 ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:auto-rows-[minmax(15.5rem,auto)]">
            {tiles.map((item, idx) => {
              const tile = WHY_TILES[idx % WHY_TILES.length];
              const tone = WHY_TONES[tile.tone];
              const imgUrl = item.image?.url || tile.image || "";
              const imgAlt = item.image?.alt || "";

              return (
                <motion.li
                  key={item.id || item.title || idx}
                  {...reveal(reduce, idx)}
                  className={cx(
                    "group relative isolate flex min-h-[15.5rem] flex-col overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-8",
                    tile.span,
                    tone.box
                  )}
                >
                  {imgUrl ? (
                    <>
                      <img
                        src={imgUrl}
                        alt={imgAlt}
                        loading="lazy"
                        decoding="async"
                        className={cx(
                          "absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                          tile.position || "object-center"
                        )}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071321] via-[#071321]/75 to-[#071321]/5"
                      />
                    </>
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cx(
                        "pointer-events-none absolute -bottom-8 -right-8 -z-10 h-44 w-44 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                        tone.ghost
                      )}
                    >
                      <ResolveIcon name={item.icon || "LineChart"} className="h-full w-full" strokeWidth={1} />
                    </span>
                  )}

                  <span className={cx("grid h-12 w-12 place-items-center rounded-2xl", tone.icon)}>
                    <ResolveIcon name={item.icon || "LineChart"} className="h-6 w-6" strokeWidth={1.6} />
                  </span>

                  <div className={cx("mt-auto pt-10", tile.wide && "max-w-xl")}>
                    <h3
                      className={cx(
                        "font-display font-medium leading-[1.1] tracking-tight",
                        tile.wide ? "text-[1.85rem] sm:text-[2.25rem]" : "text-[1.5rem] sm:text-[1.65rem]",
                        tone.title
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className={cx("mt-3 text-[0.9375rem] leading-relaxed sm:text-base", tone.text)}>{item.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 9. How We Work (Process Steps)
// ==========================================
export function GlobalIndiansHowWeWork({ content, section }) {
  const reduce = useReducedMotion();
  const heading = content?.heading || "How We Work";
  const steps = visibleItems(content?.steps || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "how-we-work"}
      data-cms-section={section?.id}
      aria-labelledby="how-we-work-heading"
      className="scroll-mt-24 bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <h2 id="how-we-work-heading" className={cx(H2, "max-w-3xl")}>
          {heading}
        </h2>

        {steps.length > 0 ? (
          <ol className="relative mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-6">
            {/* Phones: a vertical line joins the step numbers. */}
            <span aria-hidden="true" className="absolute bottom-8 left-[1.375rem] top-8 w-px bg-[#21649A]/25 md:hidden" />
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-px bg-[#21649A]/25 lg:block"
            />
            {steps.map((step, idx) => {
              const imgUrl = step.image?.url || step.image || "";
              const imgAlt = step.image?.alt || step.title || "";
              return (
                <motion.li key={step.id || step.title || idx} {...reveal(reduce, idx)} className="relative flex gap-4 md:flex-col md:gap-0">
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#15344F] font-display text-base text-white ring-4 ring-[#F7F8F5] dark:ring-[#0a1524] md:h-14 md:w-14 md:text-lg md:ring-8">
                    {step.num || String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="group min-w-0 flex-1 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-white/[0.05] md:mt-6 md:rounded-none">
                    {imgUrl ? (
                      <div className="h-32 overflow-hidden md:h-44">
                        <img
                          src={imgUrl}
                          alt={imgAlt}
                          aria-hidden={!imgAlt}
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="p-4 md:p-6">
                      <h3 className="font-display text-[1.2rem] md:text-[1.35rem] font-medium leading-snug text-[#15344F] dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{step.text}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

// ==========================================
// 10. Family Journey Case Study
// ==========================================
export function GlobalIndiansFamilyStory({ content, section }) {
  const heading = content?.heading || "A Family We Helped";
  const disclaimerBadge =
    content?.disclaimerBadge || "An example for illustration. Names and details are changed.";
  const sideImageUrl = content?.sideImage?.url || "/images/mission-bg.jpg";
  const sideImageAlt = content?.sideImage?.alt || "A family meeting with their adviser at home";
  const paragraphs = Array.isArray(content?.paragraphs)
    ? content.paragraphs
    : typeof content?.paragraphs === "string"
    ? content.paragraphs.split("\n\n").filter(Boolean)
    : [
        "Rahul and Priya are US citizens living in California and hold OCI cards. Their money in India was spread across NRO deposits, Indian mutual funds bought years ago and a flat left by Rahul's father. Their US CPA had warned that the mutual funds were creating a heavy US tax bill.",
        "We planned the exit from the mutual funds in a sensible order across both countries, then rebuilt their India portfolio with investments that suit US taxpayers. We planned the flat sale and the move of money to the US, closed accounts they no longer needed and put a written Investment Policy Statement in place.",
      ];
  const highlightText =
    content?.highlightText ||
    "Today the family has a portfolio designed for after tax returns in both countries, fewer accounts and one clear report they understand.";
  const footnote =
    content?.footnote || "Every family is different. Results depend on individual circumstances and markets.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "family-story"}
      data-cms-section={section?.id}
      aria-labelledby="family-story-heading"
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-14">
        <div className="relative min-h-[300px] lg:order-last lg:col-span-5 lg:min-h-0">
          {sideImageUrl ? (
            <img
              src={sideImageUrl}
              alt={sideImageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : null}
        </div>

        <div className="bg-white dark:bg-transparent lg:col-span-7 lg:py-6">
          <h2 id="family-story-heading" className={H2}>
            {heading}
          </h2>
          {disclaimerBadge ? (
            <p className="mt-4 text-[0.875rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400">
              {disclaimerBadge}
            </p>
          ) : null}
          <div className="mt-8 space-y-5 text-base leading-[1.85] text-[#18324A] dark:text-slate-200 sm:text-[1.0625rem]">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {highlightText ? (
              <p className="border-l-2 border-[#54B848] pl-5 font-medium text-[#15344F] dark:text-white">
                {highlightText}
              </p>
            ) : null}
          </div>
          {footnote ? (
            <p className="mt-6 text-[0.875rem] italic leading-relaxed text-[#5E6D7B] dark:text-slate-400">
              {footnote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 11. FAQs & Closing CTA
// ==========================================
export function GlobalIndiansFaqsClosing({ content, section }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqHeading = content?.faqHeading || "Frequently Asked Questions";
  const contactLink = content?.contactLink || { label: "Contact Us", href: "/contact" };
  const faqs = visibleItems(content?.faqs || []);
  const closingHeading = content?.closingHeading || "Earn Well. Keep More. Stay Compliant.";
  const closingText =
    content?.closingText ||
    "Tell us about your investments in India in a 30 minute call. No obligation and nothing to sell. Just clear answers from investment advisers who understand both countries.";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || {
    label: "See how we invest",
    href: "#how-we-help",
  };
  const disclaimer =
    content?.disclaimer ||
    "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.";

  return (
    <div id={section?.design?.anchor || section?.id || "faqs"} data-cms-section={section?.id}>
      {/* FAQ Accordion */}
      <section
        aria-labelledby="faq-heading"
        className="scroll-mt-32 border-t border-[#DCE4E8] bg-white py-16 dark:border-white/10 dark:bg-[#071321] sm:py-20 lg:py-24"
      >
        <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <h2 id="faq-heading" className={H2}>
              {faqHeading}
            </h2>
            {contactLink?.label ? (
              <Link
                to={contactLink.href || "/contact"}
                target={contactLink.newTab ? "_blank" : undefined}
                rel={contactLink.newTab ? "noreferrer noopener" : undefined}
                className={cx(
                  "mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[#21649A] hover:text-[#15344F] dark:text-[#8FCB86] dark:hover:text-white",
                  FOCUS
                )}
              >
                {contactLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>

          <div className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-8">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              const panelId = `global-indians-faq-${index}`;
              return (
                <div key={item.id || item.q || index} className="border-b border-[#DCE4E8] dark:border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className={cx(
                        "flex w-full items-center justify-between gap-6 py-3.5 text-left font-display text-lg font-medium leading-snug text-[#15344F] transition-colors hover:text-[#21649A] dark:text-white dark:hover:text-[#8FCB86] sm:py-4 sm:text-[1.25rem]",
                        FOCUS
                      )}
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors sm:h-9 sm:w-9",
                          isOpen
                            ? "border-[#21649A] bg-[#21649A] text-white"
                            : "border-[#DCE4E8] text-[#21649A] dark:border-white/20 dark:text-[#8FCB86]"
                        )}
                      >
                        <Plus className={cx("h-4 w-4 transition-transform duration-200", isOpen && "rotate-45")} />
                      </span>
                    </button>
                  </h3>
                  {isOpen ? (
                    <p id={panelId} className="pb-4 pr-12 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
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
                href={secondaryButton.href || "#how-we-help"}
                target={secondaryButton.newTab ? "_blank" : undefined}
                rel={secondaryButton.newTab ? "noreferrer noopener" : undefined}
                className={cx(
                  "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#21649A]/40 px-6 text-sm font-semibold text-[#21649A] transition-colors hover:border-[#21649A] hover:bg-[#EAF1F7] dark:border-white/40 dark:text-white dark:hover:bg-white/10",
                  FOCUS
                )}
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

