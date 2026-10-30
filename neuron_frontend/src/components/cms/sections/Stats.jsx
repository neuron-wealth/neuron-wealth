import { GRID_COLUMNS, sectionDesign } from "../design";
import { CmsIcon, CountUp, Reveal, SectionHead, visibleItems } from "../primitives";

export default function Stats({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "ivory", columns: 4 });
  const stats = visibleItems(content.items);
  const center = look.align === "center";
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        <SectionHead eyebrow={content.eyebrow} id={headingId} title={content.title} light={look.light} align={look.align} />
        {stats.length ? (
          <Reveal className={content.title || content.eyebrow ? "mt-10" : ""}>
            <dl className={`grid gap-4 ${GRID_COLUMNS[look.columns] || GRID_COLUMNS[4]}`}>
              {stats.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-3 rounded-2xl border p-6 ${center ? "items-center text-center" : ""} ${
                    look.light ? "border-white/15 bg-white/5" : "border-[#DCE4E8] bg-white dark:border-white/10 dark:bg-[#102A40]"
                  }`}
                >
                  {item.icon ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#54B848]/15 text-[#54B848]">
                      <CmsIcon name={item.icon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <dt className={`order-2 text-sm font-medium ${look.light ? "text-white/75" : "text-[#5E6D7B] dark:text-slate-300"}`}>{item.label}</dt>
                  <dd className={`order-1 font-display text-[2.4rem] leading-none ${look.light ? "text-white" : "text-[#15344F] dark:text-white"}`}>
                    <CountUp value={item.value} />
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
