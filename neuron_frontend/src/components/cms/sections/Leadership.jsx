import { CheckCircle2 } from "lucide-react";
import { visibleItems, strings } from "../primitives";

export default function Leadership({ id, content, design, root }) {
  const eyebrow = content.eyebrow || "Institutional Stewardship";
  const title = content.title || "Leadership & Mentorship";
  const text =
    content.text ||
    "Pioneering patented global innovation, corporate engineering, and cross-border fiduciary wealth stewardship.";

  const leaders = visibleItems(content.leaders);

  return (
    <section
      id={id || "leadership"}
      {...root}
      className="scroll-mt-[var(--header-height,4.875rem)] border-b border-[#E8EBE6] bg-white pt-8 pb-16 dark:border-white/10 dark:bg-[#102A40] sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#21649A] dark:text-[#8FCB86]">
              <span aria-hidden="true" className="h-px w-8 bg-[#54B848]" />
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-[#15344F] dark:text-white sm:text-[3rem]">
            {title}
          </h2>
          {text && (
            <p className="mt-4 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {text}
            </p>
          )}
        </div>

        <div className="mt-14 space-y-20 sm:space-y-24 lg:space-y-28">
          {leaders.map((leader, idx) => {
            const isImageLeft = idx % 2 === 0;
            const imageUrl = leader.image?.url || "";
            const imageAlt = leader.image?.alt || leader.name || "Leader Profile";
            const bioParas = strings(leader.bio);
            const credentials = strings(leader.credentials);
            const badge = leader.badge || "Fiduciary Leadership";

            return (
              <div
                key={leader.id || idx}
                className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16 lg:items-stretch"
              >
                {/* Image Column */}
                <div
                  className={`relative min-h-[340px] sm:min-h-[420px] lg:col-span-5 lg:min-h-0 ${
                    isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden rounded-none shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:shadow-none lg:absolute lg:inset-0 lg:h-full">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="h-full w-full rounded-none object-cover object-top"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-3xl font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                        {leader.monogram || leader.name?.slice(0, 2)?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`flex flex-col justify-between lg:col-span-7 ${
                    isImageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"
                  }`}
                >
                  <div>
                    {/* Header: Role Badge */}
                    <div>
                      {leader.role && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3F8] px-3.5 py-1 text-xs font-semibold text-[#21649A] dark:bg-[#183955] dark:text-[#8FCB86]">
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {leader.role}
                        </span>
                      )}
                      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-[#15344F] dark:text-white sm:text-3xl lg:text-[2.2rem]">
                        {leader.name}
                      </h3>
                    </div>

                    {/* Credentials Pills */}
                    {credentials.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {credentials.map((cred) => (
                          <span
                            key={cred}
                            className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300"
                          >
                            {cred}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Verbatim Biography */}
                    {bioParas.length > 0 && (
                      <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm sm:text-[0.9375rem] leading-[1.8] text-[#5E6D7B] dark:border-white/5 dark:text-slate-300">
                        {bioParas.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  {badge && (
                    <div className="mt-8 border-t border-slate-100 pt-4 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#21649A] dark:text-[#8FCB86]">
                      <span>{badge}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#54B848]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
