import { motion } from "framer-motion";
import { visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cx } from "../../../utils/cx";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriTimelineRoadmap({ content, section }) {
  const reduce = useReducedMotion();

  const stagesHeading = content?.stagesHeading || "Start 6 to 12 Months Before You Move";
  const bgImageUrl = content?.bgImage?.url || "/images/reasons-dark-bg.jpg";
  const stages = visibleItems(content?.stages || []);
  const stagesFootnote =
    content?.stagesFootnote ||
    "Moving between two calendar years and two Indian tax years can change your tax status. We help you pick the date that works best for your family.";

  const stepsHeading = content?.stepsHeading || "Your Return, Step by Step";
  const steps = visibleItems(content?.steps || []);

  return (
    <>
      <section
        id={section?.design?.anchor || section?.id || "plan-early"}
        data-cms-section={section?.id}
        aria-labelledby="plan-early-heading"
        className="relative isolate scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 [clip-path:inset(0)]">
          <img src={bgImageUrl} alt="" className="fixed inset-0 h-screen w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071321]/75 via-[#071321]/80 to-[#071321]/90" />
        </div>

        <div className="site-frame">
          <motion.div
            className="max-w-3xl"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 id="plan-early-heading" className={`${H2_SIZE} text-white`}>
              {stagesHeading}
            </h2>
          </motion.div>
        </div>

        {stages.length > 0 ? (
          <ol className="site-frame mt-12 grid gap-10 md:grid-cols-3 md:gap-0 lg:mt-16">
            {stages.map((stage, idx) => {
              const isLast = idx === stages.length - 1;
              return (
                <motion.li
                  key={stage.id || stage.period || idx}
                  className="min-w-0"
                  initial={reduce ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: reduce ? 0 : idx * 0.18 }}
                >
                  <div className="flex items-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#54B848] bg-[#071321]/60 font-display text-base text-white">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className={cx(
                        "ml-4 hidden h-px flex-1 origin-left md:block",
                        isLast ? "bg-gradient-to-r from-white/30 to-transparent" : "bg-white/30"
                      )}
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: reduce ? 0 : 0.3 + idx * 0.18 }}
                    />
                  </div>
                  <div className="mt-6 md:pr-10">
                    <h3 className="font-display text-[1.6rem] font-medium leading-tight text-white sm:text-[1.8rem]">
                      {stage.period}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">{stage.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        ) : null}

        {stagesFootnote ? (
          <p className="site-frame mt-12 border-t border-white/15 pt-6 text-[0.875rem] leading-relaxed text-white/75 lg:mt-16">
            {stagesFootnote}
          </p>
        ) : null}
      </section>

      {steps.length > 0 ? (
        <section
          id="return-steps"
          aria-labelledby="return-steps-heading"
          className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
        >
          <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 id="return-steps-heading" className={cx(H2, "lg:sticky lg:top-32")}>
                {stepsHeading}
              </h2>
            </div>

            <ol className="relative lg:col-span-8">
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-6 top-6 w-px bg-[#DCE4E8] dark:bg-white/15"
              />
              {steps.map((step, idx) => (
                <li key={step.id || step.stage || idx} className="relative pb-10 pl-20 last:pb-0">
                  <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-2 border-[#54B848] bg-white font-display text-base text-[#15344F] dark:bg-[#071321] dark:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="pt-2 font-display text-[1.45rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.6rem]">
                    {step.stage}
                  </h3>
                  <p className="mt-3 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </>
  );
}

