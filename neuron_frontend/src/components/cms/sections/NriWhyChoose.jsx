import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CmsIcon, visibleItems } from "../primitives";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useHomeLeader } from "../../../hooks/useHomeTeam";
import { cx } from "../../../utils/cx";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriWhyChoose({ content, section }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const whyRef = useRef(null);

  const { scrollYProgress: whyProgress } = useScroll({
    target: whyRef,
    offset: ["start 75%", "end 60%"],
  });
  const whyLine = useTransform(whyProgress, [0, 1], [0, 1]);

  const heading = content?.heading || "One Trusted Adviser for Both Sides of Your Life";
  // The founder photo is edited in Home › Team Showcase › Featured Leader.
  const leader = useHomeLeader();
  const founderImageUrl = leader.image?.url || "/images/team/jigar-patel.jpg";
  const founderImageAlt = leader.image?.alt || leader.name || "Mr. Jigar Patel";
  const leadCardNum = content?.leadCardNum || "01";
  const leadCardTitle = content?.leadCardTitle || "We have lived it.";
  const leadCardText = content?.leadCardText || "Our founder returned from the USA himself.";
  const reasons = visibleItems(content?.reasons || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "why-choose"}
      data-cms-section={section?.id}
      aria-labelledby="why-choose-heading"
      className="relative isolate overflow-hidden bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(33,100,154,0.07),transparent_65%)] lg:block"
      />
      <div className="site-frame px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden="true" className="mx-auto block h-1 w-12 rounded-full bg-[#54B848]" />
          <h2 id="why-choose-heading" className={cx(H2, "mt-5")}>
            {heading}
          </h2>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#15344F] via-[#102A40] to-[#071321] p-7 text-white shadow-[0_30px_70px_-35px_rgba(16,42,64,0.7)] sm:p-9 lg:mt-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#54B848]/20 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#21649A] ring-4 ring-[#54B848]/50 ring-offset-4 ring-offset-[#102A40]">
              {failed ? (
                <span className="grid h-full w-full place-items-center font-display text-[2.5rem] font-medium text-white/90">
                  JP
                </span>
              ) : (
                <img
                  src={founderImageUrl}
                  alt={founderImageAlt}
                  className="h-full w-full object-cover object-[center_15%]"
                  onError={() => setFailed(true)}
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-display text-[1rem] font-medium tracking-[0.2em] text-[#8FCB86]">
                {leadCardNum}
              </p>
              <h3 className="mt-1 font-display text-[2rem] font-medium leading-tight tracking-tight sm:text-[2.4rem]">
                {leadCardTitle}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-white/80 sm:text-[1.0625rem]">
                {leadCardText}
              </p>
            </div>
          </div>
        </motion.div>

        {reasons.length > 0 ? (
          <div ref={whyRef} className="relative mx-auto max-w-5xl pt-12 lg:pt-16">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-6 top-0 w-px bg-[#DCE4E8] dark:bg-white/10 lg:left-1/2"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: reduce ? 1 : whyLine }}
              className="absolute bottom-0 left-6 top-0 w-[2px] origin-top bg-gradient-to-b from-[#54B848] to-[#21649A] lg:left-1/2"
            />

            <ol className="relative space-y-6 lg:space-y-0">
              {reasons.map((item, idx) => {
                const onRight = idx % 2 === 1;
                return (
                  <li
                    key={item.id || item.title || idx}
                    className={cx(
                      "relative pl-16 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0",
                      idx > 0 && "lg:-mt-10"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-7 z-10 h-12 w-12 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                    >
                      <motion.span
                        initial={
                          reduce
                            ? false
                            : { scale: 0.6, backgroundColor: "#15344F", color: "#FFFFFF" }
                        }
                        whileInView={{ scale: 1, backgroundColor: "#54B848", color: "#102A40" }}
                        viewport={{ once: true, amount: 1, margin: "0px 0px -25% 0px" }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="grid h-full w-full place-items-center rounded-full border-4 border-white bg-[#54B848] text-[#102A40] shadow-md dark:border-[#071321]"
                      >
                        <CmsIcon name={item.icon || "Compass"} className="h-5 w-5" />
                      </motion.span>
                    </span>

                    <motion.article
                      initial={reduce ? false : { opacity: 0, x: onRight ? 48 : -48 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className={cx(
                        "group relative rounded-2xl border border-[#DCE4E8] bg-[#F7F8F5] p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#54B848]/60 hover:bg-white hover:shadow-[0_20px_45px_-25px_rgba(16,42,64,0.35)] dark:border-white/10 dark:bg-[#0B1E30] dark:hover:bg-[#102A40] sm:p-7",
                        onRight ? "lg:col-start-2" : "lg:col-start-1 lg:text-right"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cx(
                          "absolute top-1/2 hidden h-px w-10 bg-[#DCE4E8] transition-colors duration-300 group-hover:bg-[#54B848] dark:bg-white/15 lg:block",
                          onRight ? "-left-10" : "-right-10"
                        )}
                      />
                      <p
                        aria-hidden="true"
                        className="font-display text-[0.95rem] font-medium tracking-[0.2em] text-[#21649A] dark:text-[#8FCB86]"
                      >
                        {String(idx + 2).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-[1.4rem] font-medium leading-snug tracking-tight text-[#15344F] dark:text-white sm:text-[1.55rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                        {item.text}
                      </p>
                    </motion.article>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}

