import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { cx } from "../../../utils/cx";
import { CMS_ICONS } from "../cmsIcons";
import { CmsLink, FOCUS, hasLink, imageStyle, safeHref, visibleItems } from "../primitives";

export { FOCUS };

export const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
export const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;
export const BODY = "text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[17px]";
export const OUTLINE_LIGHT =
  "inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10";
export const OUTLINE_ON_LIGHT =
  "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#21649A]/40 px-6 text-sm font-semibold text-[#21649A] transition-colors hover:border-[#21649A] hover:bg-[#EAF1F7] dark:border-white/40 dark:text-white dark:hover:bg-white/10";
const PRIMARY =
  "inline-flex min-h-12 items-center gap-2 rounded-full bg-[#54B848] px-6 text-sm font-semibold text-[#102A40] shadow-md transition-colors hover:bg-[#6cc960]";

export const pad2 = (value) => String(value).padStart(2, "0");
export const upperFirst = (value = "") => value.charAt(0).toUpperCase() + value.slice(1);

/** Lucide component for a stored icon name, or the fallback when the name is empty or unknown. */
export const iconFor = (name, fallback) => CMS_ICONS[name] || fallback;

export function Ico({ name, className, strokeWidth }) {
  const Icon = CMS_ICONS[name];
  return Icon ? <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" /> : null;
}

export const imgSrc = (image) => safeHref(image?.url);

/** Props for a CMS image; images without alt text are treated as decorative. */
export function imgProps(image) {
  const alt = image?.alt || "";
  return {
    src: imgSrc(image),
    alt,
    ...(alt ? {} : { "aria-hidden": "true" }),
    style: imageStyle(image, { sizing: false }),
  };
}

export function useReveal() {
  const reduce = useReducedMotion();
  return (idx = 0, rotate) => {
    if (rotate === undefined) {
      return {
        initial: reduce ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: "easeOut", delay: reduce ? 0 : idx * 0.07 },
      };
    }
    return {
      initial: reduce ? { rotate } : { opacity: 0, y: 24, rotate },
      whileInView: { opacity: 1, y: 0, rotate },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.5, ease: "easeOut", delay: reduce ? 0 : idx * 0.07 },
    };
  };
}

export function PrimaryButton({ link, className }) {
  if (!hasLink(link) || !link.label) return null;
  return (
    <CmsLink link={link} className={cx(PRIMARY, FOCUS, className)}>
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </CmsLink>
  );
}

export function OutlineButton({ link, light = false, icon: Icon, trailingArrow = false }) {
  if (!hasLink(link) || !link.label) return null;
  return (
    <CmsLink link={link} className={cx(light ? OUTLINE_LIGHT : OUTLINE_ON_LIGHT, FOCUS)}>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      {link.label}
      {trailingArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </CmsLink>
  );
}

/** Splits stored paragraph text on blank lines. */
export const textBlocks = (value) =>
  (Array.isArray(value) ? value : String(value || "").split(/\n\s*\n/))
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);

export function FaqBlock({ anchor, heading, contactLink, faqs, panelPrefix }) {
  const [openFaq, setOpenFaq] = useState(0);
  const list = visibleItems(faqs).filter((item) => item.q);
  if (!heading && !list.length) return null;

  return (
    <section
      id={anchor}
      aria-labelledby="faq-heading"
      className="scroll-mt-32 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <h2 id="faq-heading" className={H2}>
            {heading}
          </h2>
          {hasLink(contactLink) && contactLink.label ? (
            <CmsLink
              link={contactLink}
              className={cx(
                "mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#21649A] hover:text-[#15344F] dark:text-[#8FCB86] dark:hover:text-white",
                FOCUS,
              )}
            >
              {contactLink.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CmsLink>
          ) : null}
        </div>

        <div className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-8">
          {list.map((item, index) => {
            const isOpen = openFaq === index;
            const panelId = `${panelPrefix}-faq-${index}`;
            return (
              <div key={item.id || item.q} className="border-b border-[#DCE4E8] dark:border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className={cx(
                      "flex w-full items-center justify-between gap-6 py-3.5 text-left font-display text-lg font-medium leading-snug text-[#15344F] transition-colors hover:text-[#21649A] dark:text-white dark:hover:text-[#8FCB86] sm:py-4 sm:text-[1.25rem]",
                      FOCUS,
                    )}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors sm:h-9 sm:w-9",
                        isOpen
                          ? "border-[#21649A] bg-[#21649A] text-white"
                          : "border-[#DCE4E8] text-[#21649A] dark:border-white/20 dark:text-[#8FCB86]",
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
  );
}

/** FAQPage JSON-LD built from a page's FAQ section. */
export function faqJsonLd(page, type) {
  const section = (page?.sections || []).find((entry) => entry.type === type && entry.visible !== false);
  const faqs = visibleItems(section?.content?.faqs).filter((item) => item.q && item.a);
  if (!faqs.length) return undefined;
  return [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
