import { ArrowRight } from "lucide-react";
import { GRID_COLUMNS, sectionDesign } from "../design";
import { CmsIcon, CmsLink, FOCUS, Reveal, SectionHead, hasImage, hasLink, imageStyle, visibleItems } from "../primitives";

const CARD_STYLES = {
  bordered: "rounded-2xl border border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#102A40]",
  shadow: "rounded-2xl bg-white shadow-[0_18px_40px_-28px_rgba(16,42,64,0.55)] dark:bg-[#102A40]",
  filled: "rounded-2xl bg-[#EAF1F7] dark:bg-[#15344F]",
  plain: "",
};

export default function CardGrid({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", columns: 3, cardStyle: "bordered" });
  const cards = visibleItems(content.items);
  const plain = look.cardStyle === "plain";
  const center = look.align === "center";
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        <SectionHead eyebrow={content.eyebrow} id={headingId} title={content.title} text={content.text} light={look.light} align={look.align} />
        {cards.length ? (
          <ul className={`mt-10 grid gap-6 ${GRID_COLUMNS[look.columns] || GRID_COLUMNS[3]}`}>
            {cards.map((item, index) => {
              const linked = hasLink(item.link);
              const sized = item.image?.height > 0 || item.image?.width > 0;
              const textTone = plain && look.light;
              return (
                <Reveal as="li" key={item.id} delay={index * 0.05} className="h-full">
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ${
                      linked ? "hover:-translate-y-1 motion-reduce:hover:translate-y-0" : ""
                    } ${CARD_STYLES[look.cardStyle] || CARD_STYLES.bordered} ${center ? "items-center text-center" : ""}`}
                  >
                    {hasImage(item.image) ? (
                      <img
                        src={item.image.url}
                        alt={item.image.alt || ""}
                        loading="lazy"
                        style={imageStyle(item.image)}
                        className={`block ${sized ? "object-cover" : "h-auto w-full"} ${plain ? "rounded-2xl" : ""} ${center && sized ? "mx-auto" : ""}`}
                      />
                    ) : null}
                    <div className={`flex flex-1 flex-col ${plain ? "pt-5" : "p-6"} ${center ? "items-center" : ""}`}>
                      {item.icon ? (
                        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#54B848]/15 text-[#2E933C] dark:text-[#8FCB86]">
                          <CmsIcon name={item.icon} className="h-6 w-6" />
                        </span>
                      ) : null}
                      <h3 className={`font-display text-[1.35rem] font-semibold leading-tight ${textTone ? "text-white" : "text-[#15344F] dark:text-white"}`}>
                        {linked ? (
                          <CmsLink link={item.link} className={`after:absolute after:inset-0 after:content-[''] ${FOCUS}`}>
                            {item.title}
                          </CmsLink>
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.text ? (
                        <p className={`mt-2.5 flex-1 text-[0.9375rem] leading-[1.65] ${textTone ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>{item.text}</p>
                      ) : null}
                      {linked && item.link.label ? (
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#21649A] transition-colors group-hover:text-[#2E933C] dark:text-[#8FCB86]">
                          {item.link.label}
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
