import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Check, House, MapPin } from "lucide-react";
import { visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriFamilyStory({ content, section }) {
  const reduce = useReducedMotion();

  const heading = content?.heading || "A Family We Helped";
  const disclaimerBadge =
    content?.disclaimerBadge || "An example for illustration. Names and details are changed.";
  const phases = visibleItems(content?.phases || []);
  const footNote =
    content?.footNote || "Every family is different. Results depend on individual circumstances and markets.";

  return (
    <section
      id={section?.design?.anchor || section?.id || "family-story"}
      data-cms-section={section?.id}
      aria-labelledby="family-story-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="family-story-heading" className={H2}>
            {heading}
          </h2>
          {disclaimerBadge ? (
            <p className="inline-flex items-center gap-2 self-start rounded-full border border-[#DCE4E8] bg-white px-4 py-2 text-[0.8125rem] text-[#5E6D7B] dark:border-white/10 dark:bg-[#0B1E30] dark:text-slate-400 md:self-auto">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#54B848]" />
              {disclaimerBadge}
            </p>
          ) : null}
        </div>

        {phases.length > 0 ? (
          <ol className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
            {phases.map((phase, idx) => {
              const isMiddle = idx === 1;
              const imageUrl = phase.image?.url || "";

              if (isMiddle) {
                return (
                  <motion.li
                    key={phase.id || idx}
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: reduce ? 0 : 0.12, ease: "easeOut" }}
                    className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#15344F] via-[#102A40] to-[#071321] p-6 text-white shadow-[0_30px_60px_-30px_rgba(16,42,64,0.75)] sm:p-8 lg:col-span-4"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-[#54B848]/20 blur-3xl"
                    />
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#54B848]/40 bg-[#54B848]/15 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-[#8FCB86]">
                      <CalendarClock className="h-4 w-4" aria-hidden="true" />
                      {phase.badge || phase.title || "Nine months ahead"}
                    </span>
                    <p className="mt-5 text-[0.9375rem] leading-[1.75] text-white/90 sm:text-base">
                      {phase.text}
                    </p>
                    {phase.bulletPoints?.length > 0 ? (
                      <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                        {phase.bulletPoints.map((step, sIdx) => (
                          <li
                            key={sIdx}
                            className="flex gap-3 text-[0.875rem] leading-relaxed text-white/80"
                          >
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#54B848] text-[#102A40]">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.li>
                );
              }

              const isFirst = idx === 0;
              return (
                <motion.li
                  key={phase.id || idx}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: reduce ? 0 : isFirst ? 0 : 0.24,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col rounded-2xl border border-[#DCE4E8] bg-white shadow-[0_18px_40px_-30px_rgba(16,42,64,0.4)] dark:border-white/10 dark:bg-[#0B1E30] lg:col-span-4"
                >
                  <div className="relative h-56 overflow-hidden rounded-t-2xl sm:h-60">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={phase.image?.alt || phase.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-[65%_center] transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#071321]/75 via-transparent to-transparent"
                    />
                    <span
                      className={`absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold shadow-md ${
                        isFirst
                          ? "bg-white/95 text-[#15344F]"
                          : "bg-[#54B848] text-[#102A40]"
                      }`}
                    >
                      {isFirst ? (
                        <MapPin className="h-4 w-4 text-[#21649A]" aria-hidden="true" />
                      ) : (
                        <House className="h-4 w-4" aria-hidden="true" />
                      )}
                      {phase.badge || phase.title}
                    </span>
                  </div>
                  <p className="flex-1 p-6 text-[0.9375rem] leading-[1.8] text-[#18324A] dark:text-slate-200 sm:p-7 sm:text-base">
                    {phase.text}
                  </p>
                  {isFirst ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-[34px] top-[7.5rem] z-10 hidden h-9 w-9 place-items-center rounded-full border-4 border-[#F7F8F5] bg-[#54B848] text-[#102A40] dark:border-[#0a1524] lg:grid"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[34px] top-[7.5rem] z-10 hidden h-9 w-9 place-items-center rounded-full border-4 border-[#F7F8F5] bg-[#54B848] text-[#102A40] dark:border-[#0a1524] lg:grid"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </motion.li>
              );
            })}
          </ol>
        ) : null}

        {footNote ? (
          <p className="mt-8 text-center text-[0.875rem] italic leading-relaxed text-[#5E6D7B] dark:text-slate-400">
            {footNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

