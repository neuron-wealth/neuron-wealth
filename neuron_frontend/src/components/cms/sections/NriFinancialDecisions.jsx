import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { CmsIcon, visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cx } from "../../../utils/cx";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";
const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriFinancialDecisions({ content, section }) {
  const reduce = useReducedMotion();
  const [activeDecision, setActiveDecision] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const decisionRef = useRef(null);

  const heading = content?.heading || "Ten Decisions That Shape Your Wealth for Years";
  const decisions = visibleItems(content?.decisions || []);

  const goToDecision = (idx) => {
    setActiveDecision(idx);
    const el = decisionRef.current;
    if (el && el.getBoundingClientRect().top < 160) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  if (!decisions.length) return null;

  const currentIdx = Math.min(activeDecision, decisions.length - 1);
  const decision = decisions[currentIdx] || decisions[0];
  const total = String(decisions.length).padStart(2, "0");

  return (
    <section
      id={section?.design?.anchor || section?.id || "financial-decisions"}
      data-cms-section={section?.id}
      aria-labelledby="decisions-heading"
      className="scroll-mt-24 bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-4xl">
          <h2 id="decisions-heading" className={H2}>
            {heading}
          </h2>
        </div>

        {/* Phones: every decision as a numbered accordion row. */}
        <ol className="mt-10 border-t border-[#DCE4E8] dark:border-white/10 lg:hidden">
          {decisions.map((item, idx) => {
            const open = mobileOpen === idx;
            const panelId = `decision-panel-${idx}`;
            return (
              <li key={item.id || item.num || idx} className="border-b border-[#DCE4E8] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setMobileOpen(open ? -1 : idx)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={cx("flex w-full items-center gap-3.5 py-4 text-left", FOCUS)}
                >
                  <span
                    className={cx(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition-colors",
                      open ? "border-[#54B848] bg-[#54B848] text-white" : "border-[#54B848]/50 text-[#21649A] dark:text-[#8FCB86]"
                    )}
                  >
                    <CmsIcon name={item.icon || "Compass"} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#5E6D7B] dark:text-slate-400">
                      Decision {item.num}
                    </span>
                    <span className="mt-0.5 block font-display text-[1.15rem] leading-snug text-[#15344F] dark:text-white">{item.title}</span>
                  </span>
                  <ChevronDown
                    className={cx("h-5 w-5 shrink-0 text-[#21649A] transition-transform duration-200 dark:text-[#8FCB86]", open && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-[3.6rem] pr-1 text-[0.9375rem] leading-[1.75] text-[#5E6D7B] dark:text-slate-300">{item.text}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="Financial decisions" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ol className="hidden border-t border-[#DCE4E8] dark:border-white/10 lg:block">
              {decisions.map((item, idx) => {
                const active = idx === currentIdx;
                return (
                  <li key={item.id || item.num || idx}>
                    <button
                      type="button"
                      onClick={() => setActiveDecision(idx)}
                      aria-current={active ? "true" : undefined}
                      className={cx(
                        "flex w-full items-start gap-4 border-b border-l-2 border-b-[#DCE4E8] py-4 pl-4 pr-2 text-left transition-colors dark:border-b-white/10",
                        FOCUS,
                        active
                          ? "border-l-[#54B848] bg-[#F7F8F5] dark:bg-white/5"
                          : "border-l-transparent hover:bg-[#F7F8F5] dark:hover:bg-white/5"
                      )}
                    >
                      <span
                        className={cx(
                          "pt-0.5 font-display text-sm tabular-nums",
                          active ? "text-[#21649A] dark:text-[#8FCB86]" : "text-[#5E6D7B] dark:text-slate-400"
                        )}
                      >
                        {item.num}
                      </span>
                      <span
                        className={cx(
                          "font-display text-[1.0625rem] leading-snug",
                          active ? "text-[#15344F] dark:text-white" : "text-[#5E6D7B] dark:text-slate-300"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div
            ref={decisionRef}
            className="min-w-0 scroll-mt-48 lg:scroll-mt-28 lg:sticky lg:top-28 lg:self-start"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={decision.id || decision.num || currentIdx}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
                className="scroll-mt-28 border-t border-[#DCE4E8] pt-8 dark:border-white/10"
              >
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#54B848] text-[#21649A] dark:text-[#8FCB86]">
                    <CmsIcon name={decision.icon || "Compass"} className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[#5E6D7B] dark:text-slate-400">
                      Decision {decision.num} of {total}
                    </p>
                    <h3 className="mt-2 font-display text-[1.75rem] font-medium leading-tight text-[#15344F] dark:text-white sm:text-[2.1rem]">
                      {decision.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-7 max-w-3xl text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                  {decision.text}
                </p>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#DCE4E8] pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => goToDecision(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                    className={cx(
                      "inline-flex items-center gap-2 text-sm font-semibold text-[#21649A] disabled:cursor-not-allowed disabled:text-[#5E6D7B]/50 dark:text-[#8FCB86]",
                      FOCUS
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Previous
                  </button>
                  {currentIdx < decisions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => goToDecision(currentIdx + 1)}
                      className={cx(
                        "inline-flex min-w-0 items-center gap-2 text-right text-sm font-semibold text-[#21649A] dark:text-[#8FCB86]",
                        FOCUS
                      )}
                    >
                      <span className="truncate">Next: {decisions[currentIdx + 1].title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

