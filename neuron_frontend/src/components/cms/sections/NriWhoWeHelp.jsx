import { visibleItems } from "../primitives";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriWhoWeHelp({ content, section }) {
  const heading = content?.heading || "Built for Professionals at Leading US Companies";
  const description = content?.description || "";
  const cards = visibleItems(content?.cards || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "who-we-help"}
      data-cms-section={section?.id}
      aria-labelledby="who-we-help-heading"
      className="bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="who-we-help-heading" className={H2}>
            {heading}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {description}
            </p>
          ) : null}
        </div>

        {cards.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {cards.map((item, idx) => {
              const imageUrl = item.image?.url || "";
              return (
                <article
                  key={item.id || item.title || idx}
                  className="group flex flex-col overflow-hidden border border-[#DCE4E8] bg-white shadow-[0_18px_40px_-34px_rgba(16,42,64,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-[#54B848]/60 hover:shadow-[0_28px_50px_-30px_rgba(16,42,64,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-[#0B1E30] sm:flex-row"
                >
                  {imageUrl ? (
                    <div className="relative h-52 shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
                      <img
                        src={imageUrl}
                        alt={item.image?.alt || ""}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      />
                      <span className="absolute left-4 top-4 bg-[#15344F]/85 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-[#8FCB86] backdrop-blur-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
                    <span className="block h-0.5 w-10 bg-[#54B848] transition-all duration-500 ease-out group-hover:w-16" />
                    <h3 className="mt-4 font-display text-[1.4rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.5rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.75] text-[#5E6D7B] dark:text-slate-300">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

