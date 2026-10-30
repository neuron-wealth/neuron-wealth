import { CmsIcon, visibleItems } from "../primitives";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriReturnDrivers({ content, section }) {
  const heading = content?.heading || "The Reasons Are Personal. The Planning Is Financial.";
  const paragraph1 = content?.paragraph1 || "";
  const paragraph2 = content?.paragraph2 || "";
  const sideImageUrl = content?.sideImage?.url || "/images/about-who-we-are.jpg";
  const sideImageAlt = content?.sideImage?.alt || "Neuron Wealth advisory consultation";
  const drivers = visibleItems(content?.drivers || []);

  return (
    <section
      id={section?.design?.anchor || section?.id || "personal-reasons"}
      data-cms-section={section?.id}
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className={H2}>{heading}</h2>
            {paragraph1 ? (
              <p className="mt-5 text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {paragraph1}
              </p>
            ) : null}
            {paragraph2 ? (
              <p className="mt-4 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {paragraph2}
              </p>
            ) : null}
          </div>

          <div className="relative min-h-[320px] sm:min-h-[380px] lg:col-span-5 lg:min-h-0">
            <div className="relative h-[320px] w-full overflow-hidden rounded-none border border-slate-200/90 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:shadow-none sm:h-[380px] lg:absolute lg:inset-0 lg:h-full">
              <img
                src={sideImageUrl}
                alt={sideImageAlt}
                className="h-full w-full rounded-none object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {drivers.length > 0 ? (
          <ul className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {drivers.map((item, idx) => (
              <li
                key={item.id || item.title || idx}
                className="group relative overflow-hidden border border-[#E3E8EC] bg-[#F7F8F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#54B848]/50 hover:bg-white hover:shadow-[0_24px_48px_-30px_rgba(16,42,64,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-[#0B1E30] dark:hover:bg-[#102A40] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[#54B848] transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#15344F] text-[#8FCB86] transition-colors duration-300 group-hover:bg-[#54B848] group-hover:text-white">
                    <CmsIcon name={item.icon || "Users"} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.3rem] font-medium leading-snug text-[#15344F] dark:text-white sm:text-[1.4rem]">
                        {item.title}
                      </h3>
                      <span aria-hidden="true" className="font-mono text-xs font-bold tracking-widest text-[#54B848]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {item.text ? (
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300">{item.text}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

