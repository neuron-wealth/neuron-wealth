import { Fragment } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { CmsIcon, CmsLink, CountUp, FOCUS, Reveal, hasImage, hasLink, imageStyle, strings, visibleItems } from "../primitives";

export default function Hero({ id, content, root }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 70]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });
  const imageX = useTransform(springX, (v) => v * -26);
  const imageY = useTransform([scrollShift, springY], ([s, m]) => s + m * -18);
  const orbitX = useTransform(springX, (v) => v * 24);
  const orbitY = useTransform(springY, (v) => v * 18);
  const orbitRotate = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const tags = strings(content.tags);
  const orbitLines = strings(content.orbitLines);
  const stats = visibleItems(content.stats);
  const { primaryButton: primary, secondaryButton: secondary, image } = content;
  const headingId = `${id}-heading`;

  function onMove(event) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      {...root}
      aria-labelledby={headingId}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate overflow-hidden bg-[#102A40] lg:bg-[#06121E] lg:-mt-[var(--header-clearance,4.875rem)] lg:min-h-[calc(100svh+5rem)] lg:pt-[var(--header-clearance,4.875rem)]"
    >
      {hasImage(image) ? (
        <motion.img
          style={{ ...(reduce ? {} : { x: imageX, y: imageY, scale: 1.035 }), ...imageStyle(image, { sizing: false }) }}
          src={image.url}
          alt={image.alt || ""}
          width="1600"
          height="900"
          className="absolute -inset-[3%] h-[106%] w-[106%] max-w-none object-cover object-[67%_center]"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#09263D]/80 via-[#0A263D]/72 to-[#071E30]/85 lg:bg-[linear-gradient(90deg,rgba(4,11,18,0.96)_0%,rgba(4,11,18,0.86)_36%,rgba(4,11,18,0.60)_55%,rgba(4,11,18,0.25)_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden opacity-10 lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(90deg, black 0%, transparent 58%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-[16rem] top-1/2 hidden h-[48rem] w-[48rem] -translate-y-1/2 rounded-full border border-white/10 lg:block"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        <span className="absolute right-[4.5rem] top-[5.7rem] h-3 w-3 rounded-full bg-[#54B848] shadow-[0_0_0_10px_rgba(84,184,72,0.12)]" />
      </motion.div>

      {content.showOrbit && orbitLines.length ? (
        <motion.div
          aria-hidden="true"
          className="absolute right-[4%] top-1/2 z-[2] hidden aspect-square w-[clamp(20rem,31vw,29rem)] -translate-y-1/2 items-center justify-center rounded-full lg:flex"
          style={reduce ? undefined : { x: orbitX, y: orbitY, rotate: orbitRotate }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-white/35"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 34, ease: "linear", repeat: Infinity }}
          >
            <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#54B848] shadow-[0_0_24px_rgba(84,184,72,0.9)]" />
          </motion.span>
          <motion.span
            className="absolute inset-[8%] rounded-full border border-dashed border-white/30"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 46, ease: "linear", repeat: Infinity }}
          />
          <span className="absolute inset-[18%] rounded-full border border-white/20 bg-[#06121E]/90 shadow-[0_32px_80px_rgba(3,22,37,0.35)] backdrop-blur-[2px]" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="relative max-w-[58%] text-center text-white">
            <span className="mx-auto mb-5 block h-px w-12 bg-[#54B848]" />
            <p className="font-display text-[clamp(1.5rem,calc(2.25vw*var(--a11y-text-scale,1)),2.25rem)] leading-[1.08]">
              {orbitLines.map((line, index) => (
                <span key={`${line}-${index}`} className={index === 0 ? undefined : "block"}>
                  {line}
                </span>
              ))}
            </p>
            <span className="mx-auto mt-5 block h-2 w-2 rounded-full border border-[#54B848] bg-[#54B848]/30" />
          </div>
        </motion.div>
      ) : null}

      <div className="site-frame relative z-10 flex flex-col px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:min-h-[calc(100svh+5rem-var(--header-clearance,4.875rem))] lg:justify-center lg:pb-16 lg:pt-10">
        <div className="max-w-[37rem] lg:w-[48vw]">
          <Reveal>
            {tags.length ? (
              <p className="flex flex-wrap items-center gap-x-2 text-[0.625rem] font-bold uppercase tracking-[0.24em] text-[#A9C7D9] sm:text-[0.6875rem]">
                {tags.map((tag, index) => (
                  <Fragment key={`${tag}-${index}`}>
                    {index > 0 ? <span className="text-[#54B848]">•</span> : null}
                    <span>{tag}</span>
                  </Fragment>
                ))}
              </p>
            ) : null}
            <h1
              id={headingId}
              className="mt-5 font-display text-[clamp(3rem,calc(5.4vw*var(--a11y-text-scale,1)),4.9rem)] font-medium leading-[0.98] tracking-[-0.025em] text-white"
            >
              {content.title}
              {content.highlight ? <span className="mt-2 block text-[#66C457]">{content.highlight}</span> : null}
            </h1>
          </Reveal>

          {content.text ? (
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[35rem] text-lg font-normal leading-[1.6] text-[#D6E2E9]">{content.text}</p>
            </Reveal>
          ) : null}

          {hasLink(primary) || hasLink(secondary) ? (
            <Reveal delay={0.14} className="mt-8 flex w-full flex-row items-center gap-2.5 sm:gap-3.5">
              {hasLink(primary) && primary.label ? (
                <CmsLink
                  link={primary}
                  className={`group/btn flex-1 sm:flex-initial inline-flex min-h-11 sm:min-h-12 cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#54B848] px-3.5 sm:px-6 text-[0.8125rem] sm:text-sm font-bold text-[#102A40] lg:text-[#06121E] shadow-[0_16px_36px_-18px_rgba(84,184,72,0.9)] transition-all duration-200 hover:bg-[#68C75B] hover:shadow-[0_18px_42px_-16px_rgba(84,184,72,0.95)] whitespace-nowrap ${FOCUS}`}
                >
                  <span className="sm:hidden">{primary.shortLabel || primary.label}</span>
                  <span className="hidden sm:inline">{primary.label}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transition-none sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                </CmsLink>
              ) : null}
              {hasLink(secondary) && secondary.label ? (
                <CmsLink
                  link={secondary}
                  className={`flex-1 sm:flex-initial inline-flex min-h-11 sm:min-h-12 cursor-pointer items-center justify-center rounded-full border border-white/45 bg-[#102A40]/30 lg:bg-[#06121E]/40 px-3.5 sm:px-6 text-[0.8125rem] sm:text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#102A40] lg:hover:text-[#06121E] whitespace-nowrap ${FOCUS}`}
                >
                  <span className="sm:hidden">{secondary.shortLabel || secondary.label}</span>
                  <span className="hidden sm:inline">{secondary.label}</span>
                </CmsLink>
              ) : null}
            </Reveal>
          ) : null}
        </div>

        {stats.length ? (
          <Reveal delay={0.2} className="mt-8 w-full max-w-[46rem] sm:mt-10 lg:mt-12 xl:max-w-[48rem]">
            <dl className="grid grid-cols-2 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/15 bg-[#0A2E49]/90 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)] backdrop-blur-md sm:grid-cols-4 sm:divide-x sm:divide-y-0 lg:bg-[#050E17]/90">
              {stats.map((item) => (
                <div key={item.id} className="flex flex-col justify-between p-3.5 sm:p-4">
                  <div className="flex items-center gap-2.5">
                    {item.icon ? (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#54B848]/30 bg-[#54B848]/15 text-[#54B848]">
                        <CmsIcon name={item.icon} className="h-4.5 w-4.5 text-[#54B848]" />
                      </span>
                    ) : null}
                    <dt className="whitespace-nowrap font-manrope text-[1.4rem] font-bold leading-none tracking-tight text-white sm:text-[1.6rem]">
                      <CountUp value={item.value} />
                    </dt>
                  </div>
                  <dd className="mt-2 text-[0.6875rem] font-medium leading-snug text-[#B7CCD8] sm:text-xs">
                    {item.leadWord ? <strong className="font-semibold text-white">{item.leadWord}</strong> : null} {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
