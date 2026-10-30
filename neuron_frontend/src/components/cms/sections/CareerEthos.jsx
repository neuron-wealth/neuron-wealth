import { CmsIcon, visibleItems } from "../primitives";

export default function CareerEthos({ id, content, design, root }) {
  const eyebrow = content?.eyebrow || "Why Associate With Us";
  const title = content?.title || "Four Foundations of Our Work Ethos";
  const text =
    content?.text ||
    "Built on genuine fiduciary integrity, multidisciplinary mentorship, and sustainable professional pacing.";
  const pillars = visibleItems(content?.pillars);

  return (
    <section
      id={id || "association-pillars"}
      {...root}
      className="bg-white pt-4 pb-14 sm:pt-6 sm:pb-18 lg:pt-8 lg:pb-24 dark:bg-[#102A40]"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#21649A] dark:text-[#8FCB86]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-display text-[2.2rem] font-medium leading-[1.1] tracking-tight text-[#15344F] dark:text-white sm:text-[2.75rem] lg:text-[3rem]">
            {title}
          </h2>
          {text ? (
            <p className="mt-3.5 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {text}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const imageUrl = pillar.image?.url || "";
            const imageAlt = pillar.image?.alt || pillar.title || "Foundation Pillar";

            return (
              <div
                key={pillar.id || pillar.title || index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-none border border-slate-700/60 bg-[#07192b] p-5 sm:p-6 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#8FCB86]/60"
              >
                {/* Box Background Image */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : null}

                {/* Dark Editorial Gradient Scrim for Complete Text Contrast */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7, 25, 43, 0.72) 0%, rgba(7, 25, 43, 0.88) 50%, rgba(5, 18, 32, 0.96) 100%)",
                  }}
                />

                {/* Content on top of the image */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-none bg-white/15 backdrop-blur-md border border-white/20 text-[#8FCB86] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-white">
                      <CmsIcon name={pillar.icon} className="h-4.5 w-4.5" />
                    </div>
                    {pillar.tag ? (
                      <span className="rounded-none bg-[#07192b]/80 backdrop-blur-xs px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-[#8FCB86] border border-white/15">
                        {pillar.tag}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold leading-tight text-white group-hover:text-[#8FCB86] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[0.8125rem] leading-relaxed text-slate-200">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
