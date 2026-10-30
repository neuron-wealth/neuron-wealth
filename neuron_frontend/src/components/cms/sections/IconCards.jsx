import { sectionDesign } from "../design";
import { CmsIcon, CmsLink, Eyebrow, FOCUS, hasLink, visibleItems } from "../primitives";
import DoodlePattern from "./DoodlePattern";

const SPLIT_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const ICON_BADGE =
  "absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#54B848] bg-white shadow-[0_8px_20px_-4px_rgba(84,184,72,0.3)] ring-4 ring-[#54B848]/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-[#21649A] group-hover:shadow-[0_12px_24px_-4px_rgba(33,100,154,0.35)] dark:bg-[#15344F] dark:border-[#54B848] dark:group-hover:border-sky-400";

function CardBody({ item }) {
  return (
    <>
      {item.icon ? (
        <span className={ICON_BADGE}>
          <CmsIcon
            name={item.icon}
            className="h-6 w-6 text-[#54B848] transition-colors duration-200 group-hover:text-[#21649A] dark:group-hover:text-sky-300"
          />
        </span>
      ) : null}
      <span className="font-display text-lg font-semibold leading-tight text-[#15344F] transition-colors duration-200 group-hover:text-[#21649A] dark:text-white dark:group-hover:text-emerald-300">
        {item.title}
      </span>
      {item.text ? <span className="mt-2 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{item.text}</span> : null}
      {hasLink(item.link) && item.link.label ? (
        <span className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#21649A] dark:text-[#8FCB86]">{item.link.label}</span>
      ) : null}
    </>
  );
}

export default function IconCards({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "navy", spacing: "py-16 sm:py-20 lg:py-24", columns: 6 });
  const cards = visibleItems(content.items);
  const joined = look.columns === 6;
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`relative overflow-hidden ${look.background} ${look.spacing}`} style={look.style}>
      {content.showPattern ? <DoodlePattern light={look.light} /> : null}
      <div className="site-frame relative z-10 px-4 sm:px-6">
        <Eyebrow light={look.light}>{content.eyebrow}</Eyebrow>
        {content.title ? (
          <h2
            id={headingId}
            className={`${content.eyebrow ? "mt-3" : ""} font-display text-[2.4rem] leading-[1.08] xl:text-[2.9rem] ${
              look.light ? "text-white" : "text-[#15344F] dark:text-white"
            }`}
          >
            {content.title}
          </h2>
        ) : null}
        {content.text ? (
          <p className={`mt-3 max-w-xl text-base leading-[1.6] sm:text-lg ${look.light ? "text-blue-50/90" : "text-[#5E6D7B] dark:text-slate-300"}`}>
            {content.text}
          </p>
        ) : null}

        {cards.length ? (
          <ul
            className={`mt-14 grid gap-x-3 gap-y-12 lg:mt-16 ${
              joined
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:overflow-visible lg:rounded-[1.75rem] lg:bg-white lg:shadow-[0_22px_50px_rgba(10,32,54,0.35)] dark:lg:bg-[#102A40]"
                : `${SPLIT_COLUMNS[look.columns] || SPLIT_COLUMNS[3]} lg:gap-x-5`
            }`}
          >
            {cards.map((item, index) => {
              const cardClass = `group flex h-full flex-col items-center justify-start rounded-2xl bg-white px-3.5 pb-7 pt-11 text-center shadow-[0_12px_28px_rgba(16,42,64,0.08)] transition-all duration-300 hover:bg-[#F4FAF3] dark:bg-[#102A40] dark:hover:bg-[#15344F] ${
                joined
                  ? `lg:rounded-none lg:bg-transparent lg:px-4 lg:pb-8 lg:pt-12 lg:shadow-none lg:hover:bg-[#F4FAF3] dark:lg:hover:bg-[#15344F] ${
                      index > 0 ? "lg:border-l lg:border-[#DCE4E8] dark:lg:border-white/10" : ""
                    }`
                  : "border border-[#DCE4E8] dark:border-white/10"
              } ${FOCUS}`;
              return (
                <li key={item.id} className="relative">
                  {hasLink(item.link) ? (
                    <CmsLink link={item.link} className={cardClass}>
                      <CardBody item={item} />
                    </CmsLink>
                  ) : (
                    <div className={cardClass}>
                      <CardBody item={item} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
