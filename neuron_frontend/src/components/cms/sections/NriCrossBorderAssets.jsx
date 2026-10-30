import { Check } from "lucide-react";
import { visibleItems } from "../primitives";

const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";
const H2 = `${H2_SIZE} text-[#15344F] dark:text-white`;

export default function NriCrossBorderAssets({ content, section }) {
  const block1Heading = content?.block1Heading || "What Happens to Everything You Leave in the US?";
  const block1Intro = content?.block1Intro || "";
  const block1Items = visibleItems(content?.block1Items || []);
  const block1Conclusion = content?.block1Conclusion || "";
  const block1ImageUrl = content?.block1Image?.url || "/images/us-assets-planning.jpg";
  const block1ImageAlt = content?.block1Image?.alt || "US assets planning";

  const block2Heading = content?.block2Heading || "Your US Tax Life Does Not End at the Airport";
  const block2Items = content?.block2Items || [];
  const block2Conclusion = content?.block2Conclusion || "";
  const block2ImageUrl = content?.block2Image?.url || "/images/us-tax-airport.jpg";
  const block2ImageAlt = content?.block2Image?.alt || "US tax life after airport";

  const block3Heading = content?.block3Heading || "A New Country Means a New Financial Plan";
  const block3Paragraphs = content?.block3Paragraphs || [];
  const block3ImageUrl = content?.block3Image?.url || "/images/nri-relocation-advisory.jpg";
  const block3ImageAlt = content?.block3Image?.alt || "New financial plan in India";

  return (
    <section
      id={section?.design?.anchor || section?.id || "us-assets"}
      data-cms-section={section?.id}
      className="bg-white py-16 dark:bg-[#071321] sm:py-20 lg:py-24"
    >
      <div className="site-frame space-y-20 px-4 sm:px-6 lg:space-y-28">
        {/* Block 1: What Happens to Everything You Leave in the US? */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
          <article className="flex flex-col justify-center lg:col-span-7">
            <h2 className={H2}>{block1Heading}</h2>
            {block1Intro ? (
              <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
                {block1Intro}
              </p>
            ) : null}

            {block1Items.length > 0 ? (
              <ul className="mt-4 divide-y divide-[#DCE4E8] border-y border-[#DCE4E8] dark:divide-white/10 dark:border-white/10">
                {block1Items.map((item, idx) => (
                  <li
                    key={item.id || item.label || idx}
                    className="flex items-start gap-3 py-3.5 text-[0.9375rem] leading-relaxed text-[#18324A] dark:text-slate-200"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#2E933C] dark:text-[#8FCB86]"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-[#15344F] dark:text-white">
                        {item.label}:
                      </strong>{" "}
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {block1Conclusion ? (
              <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
                {block1Conclusion}
              </p>
            ) : null}
          </article>

          <div className="relative min-h-[360px] sm:min-h-[420px] lg:col-span-5 lg:min-h-0">
            <div className="relative h-[360px] w-full overflow-hidden rounded-none border border-slate-200/90 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:shadow-none sm:h-[420px] lg:absolute lg:inset-0 lg:h-full">
              <img
                src={block1ImageUrl}
                alt={block1ImageAlt}
                loading="lazy"
                className="h-full w-full rounded-none object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10" />
            </div>
          </div>
        </div>

        {/* Block 2: Your US Tax Life Does Not End at the Airport */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
          <div className="order-2 relative min-h-[360px] sm:min-h-[420px] lg:order-1 lg:col-span-5 lg:min-h-0">
            <div className="relative h-[360px] w-full overflow-hidden rounded-none border border-slate-200/90 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:shadow-none sm:h-[420px] lg:absolute lg:inset-0 lg:h-full">
              <img
                src={block2ImageUrl}
                alt={block2ImageAlt}
                loading="lazy"
                className="h-full w-full rounded-none object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10" />
            </div>
          </div>

          <article className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-7">
            <h2 className={H2}>{block2Heading}</h2>
            {block2Items.length > 0 ? (
              <ul className="mt-5 divide-y divide-[#DCE4E8] border-y border-[#DCE4E8] dark:divide-white/10 dark:border-white/10">
                {block2Items.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 py-3.5 text-[0.9375rem] leading-relaxed text-[#18324A] dark:text-slate-200"
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

            {block2Conclusion ? (
              <p className="mt-5 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300">
                {block2Conclusion}
              </p>
            ) : null}
          </article>
        </div>

        {/* Block 3: A New Country Means a New Financial Plan */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <h2 id="new-plan-heading" className={H2}>
              {block3Heading}
            </h2>
            {block3Paragraphs.length > 0 ? (
              <div className="mt-6 space-y-4 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
                {block3Paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <div className="relative h-[300px] w-full overflow-hidden rounded-none border border-slate-200/90 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:shadow-none sm:h-[350px] lg:h-[370px]">
              <img
                src={block3ImageUrl}
                alt={block3ImageAlt}
                loading="lazy"
                className="h-full w-full rounded-none object-cover object-[center_35%] transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

