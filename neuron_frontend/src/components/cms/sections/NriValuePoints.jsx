import { CmsIcon, visibleItems } from "../primitives";
import { cx } from "../../../utils/cx";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriValuePoints({ content, section }) {
  const heading = content?.heading || "Small Decisions. Big Difference.";
  const description = content?.description || "";
  const points = visibleItems(content?.points || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "value-points"}
      data-cms-section={section?.id}
      aria-labelledby="value-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="value-heading" className={H2}>
            {heading}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {description}
            </p>
          ) : null}
        </div>

        {points.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((item, idx) => {
              const imageUrl = item.image?.url || "";
              return (
                <li
                  key={item.id || item.text || idx}
                  className={cx(
                    "group relative min-h-[250px] overflow-hidden rounded-none border border-slate-300/80 bg-[#0B1E30] shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#54B848] hover:shadow-2xl dark:border-white/15",
                    idx === 0 && "sm:col-span-2"
                  )}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.image?.alt || item.text}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 via-50% to-black/15" />
                  <div className="pointer-events-none absolute inset-0 rounded-none ring-1 ring-inset ring-white/10 transition-all group-hover:ring-[#54B848]/60" />

                  <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-between p-5 text-white sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-black/65 text-[#8FCB86] shadow-md backdrop-blur-md">
                        <CmsIcon name={item.icon || "Calendar"} className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="rounded-lg border border-emerald-400/50 bg-black/65 px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-[#8FCB86] shadow-md backdrop-blur-md sm:text-[0.8125rem]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="pt-6">
                      <p className="font-display text-[1.125rem] font-medium leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] sm:text-[1.1875rem]">
                        {item.text}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1 w-12 bg-[#54B848] transition-all duration-500 ease-out group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

