import { ArrowRight } from "lucide-react";
import { sectionDesign } from "../design";
import { CmsIcon, CmsLink, Reveal, SectionHead, hasImage, hasLink, imageStyle, visibleItems } from "../primitives";

const COLUMNS = {
  1: "",
  2: "lg:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
  6: "md:grid-cols-3 xl:grid-cols-6",
};

const CARD_CLASS =
  "group relative block h-full min-h-[260px] overflow-hidden rounded-none border border-[#1b3d5b]/70 bg-[#102A40] shadow-sm transition-all duration-300 hover:border-[#54B848] dark:border-white/15 sm:min-h-[280px] lg:min-h-[290px]";

export default function ImageCards({ id, content, design, root }) {
  const look = sectionDesign(design, {
    background: "white",
    spacing: "pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24",
    columns: 2,
  });
  const cards = visibleItems(content.items);
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        <SectionHead eyebrow={content.eyebrow} id={headingId} title={content.title} text={content.text} light={look.light} align={look.align} />
        {cards.length ? (
          <ul className={`mt-10 grid auto-rows-fr gap-5 ${COLUMNS[look.columns] ?? COLUMNS[2]}`}>
            {cards.map((item, index) => {
              const linked = hasLink(item.link);
              const minHeight = item.image?.height > 0 ? { minHeight: `${item.image.height}px` } : undefined;
              const body = (
                <>
                  {hasImage(item.image) ? (
                    <img
                      src={item.image.url}
                      alt={item.image.alt || ""}
                      loading="lazy"
                      style={imageStyle(item.image, { sizing: false })}
                      className="absolute inset-0 h-full w-full object-cover object-[78%_center] transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(9,28,46,0.92) 0%, rgba(9,28,46,0.84) 50%, rgba(9,28,46,0.45) 76%, rgba(9,28,46,0.08) 94%)",
                    }}
                  />
                  <div
                    className="relative flex h-full min-h-[260px] w-[min(100%,28rem)] flex-col justify-between px-6 py-6 sm:min-h-[280px] sm:w-[min(100%,32rem)] sm:px-8 lg:min-h-[290px]"
                    style={minHeight}
                  >
                    <div>
                      {item.icon ? (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#54B848]/20 text-[#54B848]">
                          <CmsIcon name={item.icon} className="h-4 w-4" />
                        </span>
                      ) : null}
                      <h3 className="mt-3 font-display text-[1.55rem] leading-[1.15] text-white sm:text-[1.85rem]">{item.title}</h3>
                      {item.subtitle ? <p className="mt-2 text-sm font-semibold leading-snug text-[#8FCB86] sm:text-[0.95rem]">{item.subtitle}</p> : null}
                      {item.text ? <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-[0.90625rem]">{item.text}</p> : null}
                    </div>
                    {linked && item.link.label ? (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8FCB86] transition-colors group-hover:text-white">
                        {item.link.label}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                </>
              );

              return (
                <Reveal as="li" key={item.id} delay={index * 0.06} className="h-full">
                  {linked ? (
                    <CmsLink
                      link={item.link}
                      aria-label={[item.title, item.subtitle, item.text].filter(Boolean).join(" - ")}
                      className={`${CARD_CLASS} cursor-pointer`}
                      style={minHeight}
                    >
                      {body}
                    </CmsLink>
                  ) : (
                    <article className={CARD_CLASS} style={minHeight}>
                      {body}
                    </article>
                  )}
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
