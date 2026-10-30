import { ArrowRight } from "lucide-react";
import { strings, safeHref, FOCUS } from "../primitives";

export default function AssociationPhilosophy({ id, content, design, root }) {
  const imageUrl = content.image?.url || "/images/Swami_Vivekananda.jpg";
  const imageAlt = content.image?.alt || "Swami Vivekananda";
  const eyebrow = content.eyebrow || "Philosophical Principle";
  const title = content.title || "Association";
  const intro =
    content.intro ||
    "Explaining the meaning of 'Association', one of the greatest Hindu monk, Swami Vivekananda ji said:";
  const quoteTitle = content.quoteTitle || "“The rain drop from the sky:";
  const quoteLines = strings(content.quoteLines).length
    ? content.quoteLines
    : [
        "If it is caught in hands, it is pure enough for drinking.",
        "If it falls in a gutter, its value drops so much that it can't be used even for washing the feet.",
        "If it falls on a hot surface, it perishes.",
        "If it falls on lotus leaf, it shines like a pearl and",
        "finally, if it falls on an oyster, it becomes a pearl.",
      ];
  const quoteConclusion =
    content.quoteConclusion ||
    "The drop is the same, but its existence & worth depend on with whom it associates.” Always be associated with people who are good at heart.";
  const text =
    content.text ||
    "Embodying the same spirit, we strongly believe that an association with Neuron Wealth Advisers (NWA) can work wonders for everyone - clients, team members, service providers, and other stakeholders because of the following reasons.";

  const buttonLabel = content.button?.label || "Become a Pearl Assessment";
  const buttonHref = safeHref(content.button?.href || "#pearl-form");

  return (
    <section
      id={id || "association"}
      {...root}
      className="scroll-mt-[var(--header-height,4.875rem)] border-b border-[#E8EBE6] bg-white pt-8 pb-16 dark:border-white/10 dark:bg-[#102A40] sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
        {/* Left Column: Image of Swami Vivekananda matching full height of right content */}
        <div className="flex h-full flex-col lg:col-span-5">
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-none border border-[#E8EBE6] bg-slate-100 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:bg-[#0c1828] dark:shadow-none">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full rounded-none object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column: Philosophical Text & Parable */}
        <div className="flex flex-col lg:col-span-7">
          {eyebrow && (
            <p className="flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#21649A] dark:text-[#8FCB86]">
              <span aria-hidden="true" className="h-px w-8 bg-[#54B848]" />
              {eyebrow}
            </p>
          )}

          <h2 className="mt-3 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-[#15344F] dark:text-white sm:text-[3rem]">
            {title}
          </h2>

          {intro && (
            <p className="mt-6 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {intro}
            </p>
          )}

          {/* Styled Quote Box */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#21649A]/20 bg-[#F4F8FA] p-6 text-[#15344F] shadow-sm dark:border-white/10 dark:bg-[#0c1828] dark:text-slate-200 sm:p-8">
            <span className="pointer-events-none absolute right-4 -top-6 select-none font-serif text-[7rem] leading-none text-[#21649A]/10 dark:text-white/5">
              &ldquo;
            </span>
            <div className="relative z-10 space-y-2 text-[0.9375rem] sm:text-[1rem] leading-[1.7] italic">
              {quoteTitle && (
                <p className="font-semibold not-italic text-[#21649A] dark:text-[#8FCB86]">
                  {quoteTitle}
                </p>
              )}
              {quoteLines.map((line, idx) => {
                const isLast = idx === quoteLines.length - 1;
                return (
                  <p
                    key={idx}
                    className={isLast ? "font-medium text-[#21649A] dark:text-[#8FCB86]" : ""}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {quoteConclusion && (
              <div className="relative z-10 mt-5 border-t border-[#21649A]/15 pt-4 dark:border-white/10">
                <p className="font-display text-[1.1rem] sm:text-[1.2rem] font-semibold leading-snug text-[#15344F] dark:text-white">
                  {quoteConclusion}
                </p>
              </div>
            )}
          </div>

          {text && (
            <p className="mt-6 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {text}
            </p>
          )}

          {buttonLabel && buttonHref && (
            <div className="pt-4">
              <a
                href={buttonHref}
                className={`inline-flex items-center gap-2 rounded-full border border-[#21649A] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#15344F] transition-all hover:bg-[#15344F] hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-[#102A40] ${FOCUS}`}
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
