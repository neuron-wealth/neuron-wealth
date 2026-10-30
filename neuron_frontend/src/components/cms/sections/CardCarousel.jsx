import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useIsMobile } from "../../../hooks/useMediaQuery";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { sectionDesign } from "../design";
import { CmsIcon, CmsLink, FOCUS, SectionHead, Spotlight, boxHeight, hasImage, hasLink, imageStyle, visibleItems } from "../primitives";

/* Animated right-arrow connector shown between and after every card */
function ArrowConnector({ index, reduce }) {
  return (
    <li className="flex shrink-0 items-center self-center px-1" aria-hidden="true">
      <motion.span
        className="flex items-center justify-center rounded-full bg-[#54B848]/10 p-2 text-[#54B848]"
        animate={reduce ? {} : { x: [0, 7, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.18,
        }}
      >
        <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
      </motion.span>
    </li>
  );
}

function WealthCard({ item, fit = false, grid = false }) {
  const linked = hasLink(item.link);
  return (
    <li className={`${grid ? "" : "w-[min(88vw,26.5rem)] shrink-0 snap-start"} ${fit || grid ? "h-full" : ""}`}>
      <Spotlight className="flex h-full flex-col rounded-2xl border border-[#DCE4E8] bg-white shadow-[0_18px_40px_-34px_rgba(16,42,64,0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(16,42,64,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-[#102A40]">
        {linked ? (
          <CmsLink link={item.link} aria-label={item.link.label ? `${item.title}: ${item.link.label}` : item.title} className={`absolute inset-0 z-30 rounded-2xl ${FOCUS}`} />
        ) : null}
        {hasImage(item.image) ? (
          <div
            className={`relative w-full shrink-0 overflow-hidden ${fit ? "h-[clamp(12rem,30svh,26rem)]" : "h-48 sm:h-52 lg:h-56"}`}
            style={boxHeight(item.image)}
          >
            <img
              src={item.image.url}
              alt={item.image.alt || ""}
              loading="lazy"
              style={imageStyle(item.image, { sizing: false })}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        ) : null}
        <div className={`relative z-10 flex flex-1 flex-col px-5 pb-6 sm:px-6 ${hasImage(item.image) ? "pt-1" : "pt-6"}`}>
          {item.icon ? (
            <span
              className={`relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#15344F] text-white shadow-md transition-colors duration-300 group-hover:bg-[#21649A] dark:border-[#102A40] ${
                hasImage(item.image) ? "-mt-7" : ""
              }`}
            >
              <CmsIcon name={item.icon} className="h-6 w-6" />
            </span>
          ) : null}
          <h3 className="mt-3 font-display text-[1.35rem] font-semibold leading-tight text-[#15344F] dark:text-white sm:text-[1.45rem]">{item.title}</h3>
          {item.text ? (
            <p className="mt-2.5 flex-1 text-[0.84375rem] font-normal leading-[1.65] text-[#5E6D7B] dark:text-slate-300 sm:text-[0.875rem]">{item.text}</p>
          ) : null}
          {linked && item.link.label ? (
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#21649A] transition-colors group-hover:text-[#54B848] dark:text-[#8FCB86]">
              {item.link.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          ) : null}
        </div>
      </Spotlight>
    </li>
  );
}

function PinnedScroll({ content, look, headingId, root, cards, reduce }) {
  const wrapRef = useRef(null);
  const viewportRef = useRef(null);
  const listRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return undefined;
    const measure = () => setDistance(Math.max(0, list.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      {...root}
      ref={wrapRef}
      aria-labelledby={headingId}
      className={`relative ${look.background}`}
      style={{ ...look.style, height: `calc(100svh - var(--header-height, 4.875rem) + ${distance}px)` }}
    >
      <div className="sticky top-[var(--header-height,4.875rem)] flex h-[calc(100svh-var(--header-height,4.875rem))] flex-col justify-center pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-10 lg:pb-8">
        <div className="site-frame shrink-0 px-4 sm:px-6">
          <SectionHead eyebrow={content.eyebrow} id={headingId} title={content.title} text={content.text} light={look.light} />
          <div aria-hidden="true" className="mt-4 h-px bg-[#DCE4E8] dark:bg-white/10">
            <motion.span className="block h-px origin-left bg-[#54B848]" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
        <div ref={viewportRef} className="mt-4 flex min-h-0 flex-col overflow-hidden">
          <motion.ul ref={listRef} style={{ x }} className="site-gutter-x flex min-h-0 w-max items-stretch gap-4">
            {cards.map((item, index) => (
              <>
                <WealthCard key={item.id} item={item} fit />
                {index < cards.length - 1 && (
                  <ArrowConnector key={`arrow-${item.id}`} index={index} reduce={reduce} />
                )}
              </>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default function CardCarousel({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const look = sectionDesign(design, { background: "white", spacing: "py-14 sm:py-16", layout: "scroll" });
  const cards = visibleItems(content.items);
  const headingId = `${id}-heading`;
  const isMobile = useIsMobile();
  // Phones get a plain vertical list instead of the pinned sideways scroll.
  const layout = look.layout === "scroll" && (reduce || isMobile) ? (isMobile ? "stack" : "row") : look.layout;

  if (layout === "scroll") return <PinnedScroll content={content} look={look} headingId={headingId} root={root} cards={cards} reduce={reduce} />;

  return (
    <section {...root} aria-labelledby={headingId} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        <SectionHead eyebrow={content.eyebrow} id={headingId} title={content.title} text={content.text} light={look.light} />
        {layout === "stack" ? (
          <ul className="mt-8 flex flex-col items-stretch">
            {cards.map((item, index) => (
              <Fragment key={item.id}>
                <WealthCard item={item} grid />
                {index < cards.length - 1 ? (
                  <li className="flex justify-center py-3" aria-hidden="true">
                    <span className="flex items-center justify-center rounded-full bg-[#54B848]/10 p-2 text-[#54B848]">
                      <ArrowDown className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>
        ) : layout === "grid" ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((item) => (
              <WealthCard key={item.id} item={item} grid />
            ))}
          </ul>
        ) : (
          <ul className="mt-8 flex snap-x items-stretch gap-4 overflow-x-auto pb-2">
            {cards.map((item, index) => (
              <>
                <WealthCard key={item.id} item={item} />
                {index < cards.length - 1 && (
                  <ArrowConnector key={`arrow-${item.id}`} index={index} reduce={reduce} />
                )}
              </>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
