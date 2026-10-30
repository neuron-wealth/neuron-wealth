import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { SPACING, sectionDesign } from "../design";
import { Eyebrow, PillLink, Reveal, hasImage, imageStyle, visibleItems } from "../primitives";

function Visual({ image, badgeTitle, credentials, onRight }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const showBadge = badgeTitle || credentials.length;

  return (
    <div ref={ref} className={`relative min-h-[420px] overflow-hidden lg:h-full lg:min-h-0 ${onRight ? "lg:order-2" : ""}`}>
      <motion.img
        style={{ y: imageY, ...imageStyle(image, { sizing: false }) }}
        src={image.url}
        alt={image.alt || ""}
        loading="lazy"
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
      />
      {showBadge ? (
        <Reveal
          y={24}
          className={`absolute bottom-6 left-4 right-4 max-w-xs rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(16,42,64,0.6)] sm:bottom-10 sm:left-10 ${
            onRight ? "lg:left-10 lg:right-auto" : "lg:left-auto lg:right-10"
          }`}
        >
          {badgeTitle ? <p className="font-display text-2xl leading-tight text-[#15344F]">{badgeTitle}</p> : null}
          {credentials.length ? (
            <ul className={`${badgeTitle ? "mt-4" : ""} space-y-2.5`}>
              {credentials.map((entry) => (
                <li key={entry.id} className="flex items-start gap-2.5 text-sm text-[#18324A]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#54B848] text-[#102A40]">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    {entry.name ? <strong className="font-semibold">{entry.name}</strong> : null} {entry.detail}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ) : null}
    </div>
  );
}

export default function WhyUs({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", spacing: "pt-16 pb-12 lg:pt-20 lg:pb-16", imageSide: "left" });
  const reasons = visibleItems(content.items);
  const credentials = visibleItems(content.credentials);
  const withImage = hasImage(content.image);
  const headingId = `${id}-heading`;
  const padding = look.spacing === SPACING.none ? "py-0" : look.spacing;

  return (
    <section
      {...root}
      aria-labelledby={headingId}
      className={`border-b border-[#DCE4E8] dark:border-white/10 ${look.background}`}
      style={look.style}
    >
      <div className={withImage ? "grid lg:grid-cols-2" : "site-frame"}>
        {withImage ? (
          <Visual image={content.image} badgeTitle={content.badgeTitle} credentials={credentials} onRight={look.imageSide === "right"} />
        ) : null}
        <div className={`flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-20 ${padding}`}>
          <Reveal>
            <Eyebrow light={look.light}>{content.eyebrow}</Eyebrow>
            <h2
              id={headingId}
              className={`mt-3 font-display text-[2.1rem] leading-[1.1] sm:text-[2.6rem] ${look.light ? "text-white" : "text-[#15344F] dark:text-white"}`}
            >
              {content.title}
            </h2>
            {content.text ? (
              <p className={`mt-4 max-w-xl text-lg font-normal leading-[1.6] ${look.light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>
                {content.text}
              </p>
            ) : null}
          </Reveal>
          {reasons.length ? (
            <ol className="relative mt-8 space-y-3">
              {reasons.map((reason, index) => (
                <Reveal as="li" key={reason.id} delay={index * 0.05}>
                  <div className="flex items-center gap-4 rounded-xl border border-[#DCE4E8] bg-white px-5 py-3.5 shadow-sm transition-all duration-300 hover:border-[#54B848]/60 hover:shadow-md dark:border-white/10 dark:bg-[#102A40]">
                    <span aria-hidden="true" className="h-7 w-1 shrink-0 rounded-full bg-[#54B848]" />
                    <span className="w-8 shrink-0 font-display text-[1.35rem] leading-none text-[#15344F] dark:text-white" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54B848] text-[#102A40]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 font-display text-base font-medium leading-snug text-[#15344F] dark:text-white sm:text-lg">{reason.title}</h3>
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : null}
          {content.button?.label ? (
            <Reveal className="mt-8">
              <PillLink link={content.button} variant="solid" />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
