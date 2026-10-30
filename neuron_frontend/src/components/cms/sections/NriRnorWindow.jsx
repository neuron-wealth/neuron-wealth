import { Check } from "lucide-react";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriRnorWindow({ content, section }) {
  const heading = content?.heading || "Your RNOR Years Are a Golden Window";
  const leadText = content?.leadText || "";
  const sideImageUrl = content?.sideImage?.url || "/images/rnor-golden-window.jpg";
  const sideImageAlt =
    content?.sideImage?.alt ||
    "Neuron Wealth Advisor discussing RNOR golden window transition with returning NRI client";
  const points = content?.points || [];
  const paragraphs = content?.paragraphs || [];
  const focusLabel = content?.focusLabel || "Our focus:";
  const focusText = content?.focusText || "";

  return (
    <section
      id={section?.design?.anchor || section?.id || "rnor-window"}
      data-cms-section={section?.id}
      aria-labelledby="rnor-heading"
      className="scroll-mt-24 bg-[#F7F8F5] py-16 dark:bg-[#0a1524] sm:py-20 lg:py-24"
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-5">
          <div>
            <h2 id="rnor-heading" className={H2}>
              {heading}
            </h2>
            {leadText ? (
              <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {leadText}
              </p>
            ) : null}
          </div>

          <div className="relative mt-8 w-full flex-1 min-h-[220px] aspect-[16/10] lg:aspect-auto lg:min-h-0">
            <div className="h-full w-full overflow-hidden rounded-none border border-[#DCE4E8] bg-white shadow-sm dark:border-white/10 dark:bg-[#0e1e32] lg:absolute lg:inset-0">
              <img
                src={sideImageUrl}
                alt={sideImageAlt}
                loading="lazy"
                className="h-full w-full rounded-none object-cover object-[center_35%] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {points.length > 0 ? (
            <ul className="divide-y divide-[#DCE4E8] border-y border-[#DCE4E8] dark:divide-white/10 dark:border-white/10">
              {points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 py-4 text-base leading-relaxed text-[#18324A] dark:text-slate-200"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[#2E933C] dark:text-[#8FCB86]"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {paragraphs.length > 0 ? (
            <div className="mt-7 space-y-4 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          ) : null}

          {focusText ? (
            <p className="mt-7 border-l-2 border-[#54B848] pl-5 text-base leading-[1.8] text-[#15344F] dark:text-white sm:text-[1.0625rem]">
              <strong className="font-semibold">{focusLabel} </strong>
              {focusText}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

