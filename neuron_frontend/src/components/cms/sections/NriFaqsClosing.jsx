import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { visibleItems } from "../primitives";
import { cx } from "../../../utils/cx";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";
const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriFaqsClosing({ content, section }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqHeading = content?.faqHeading || "Frequently Asked Questions";
  const contactLink = content?.contactLink || { label: "Contact Us", href: "/contact" };
  const faqs = visibleItems(content?.faqs || []);

  const closingHeading = content?.closingHeading || "Come Home with a Plan, Not with Questions.";
  const closingText =
    content?.closingText ||
    "Tell us about your move in a 30 minute call. No obligation and nothing to sell. Just clear answers from people who have made the same journey from the US to India.";
  const primaryButton = content?.primaryButton || { label: "Book a 30 minute call", href: "/contact" };
  const secondaryButton = content?.secondaryButton || {
    label: "See the 10 decisions that matter",
    href: "#financial-decisions",
  };
  const disclaimer =
    content?.disclaimer ||
    "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.";

  return (
    <>
      <section
        id={section?.design?.anchor || section?.id || "faqs"}
        data-cms-section={section?.id}
        aria-labelledby="faq-heading"
        className="scroll-mt-32 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
      >
        <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <h2 id="faq-heading" className={H2}>
              {faqHeading}
            </h2>
            {contactLink?.label && contactLink?.href ? (
              <Link
                to={contactLink.href}
                className={`mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[#21649A] hover:text-[#15344F] dark:text-[#8FCB86] dark:hover:text-white ${FOCUS}`}
              >
                {contactLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>

          <div className="border-t border-[#DCE4E8] dark:border-white/10 lg:col-span-8">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              const panelId = `nri-faq-${index}`;
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
                        <Plus
                          className={cx(
                            "h-4 w-4 transition-transform duration-200",
                            isOpen && "rotate-45"
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  {isOpen ? (
                    <p
                      id={panelId}
                      className="pb-4 pr-12 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300"
                    >
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
                className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-[#15344F]/30 px-6 text-sm font-semibold text-[#15344F] transition-colors hover:border-[#15344F] dark:border-white/30 dark:text-white ${FOCUS}`}
              >
                {secondaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {disclaimer ? (
        <section
          aria-label="Disclaimer"
          className="border-t border-[#DCE4E8] bg-white py-8 dark:border-white/10 dark:bg-[#071321]"
        >
          <p className="site-frame px-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:text-slate-400 sm:px-6">
            {disclaimer}
          </p>
        </section>
      ) : null}
    </>
  );
}

