import { sectionDesign } from "../design";

export default function WhoWeAre({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", imageSide: "left" });
  const onLeft = look.imageSide !== "right";
  const eyebrow = content.eyebrow || "SEBI RIA Validated";
  const title = content.title || "Who We Are";
  const highlight =
    content.highlight ||
    "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser (RIA) with registration number INA000016481 with perpetual validity until cancelled.";
  const paragraphs =
    Array.isArray(content.paragraphs) && content.paragraphs.length > 0
      ? content.paragraphs
      : [
          "We are a team of experts in the finance and investments and we provide holistic investment and wealth management advisory services.",
          "We as a trusted adviser to the family, with our education and experience work as a family CFO and provide multi-family office services. We provide the truthful, complete and accurate information transparently and enable our clients to make quality informed decisions to achieve their financial / wealth goals.",
        ];
  const tags =
    Array.isArray(content.tags) && content.tags.length > 0
      ? content.tags
      : ["Family CFO", "Multi-Family Office", "Fee-Only Fiduciary"];
  const imageUrl = content.image?.url || "/images/about-who-we-are.jpg";
  const imageAlt = content.image?.alt || "Neuron Wealth Advisors Team & Executive Family Office Advisory";

  return (
    <section
      id={id || "who-we-are"}
      {...root}
      className={`scroll-mt-[var(--header-height,4.875rem)] border-b border-[#E8EBE6] ${
        look.background || "bg-white dark:bg-[#102A40]"
      } pt-12 pb-16 dark:border-white/10 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24`}
      style={look.style}
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
        <div className={`relative min-h-[320px] sm:min-h-[380px] lg:col-span-5 lg:min-h-0 ${onLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
          <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden rounded-none shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:shadow-none lg:absolute lg:inset-0 lg:h-full">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full rounded-none object-cover object-center"
            />
          </div>
        </div>

        <div className={`flex flex-col lg:col-span-7 ${onLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}>
          {eyebrow && (
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#21649A] dark:text-[#8FCB86]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-3 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-[#15344F] dark:text-white sm:text-[3rem]">
              {title}
            </h2>
          )}
          <div className="mt-6 space-y-4 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
            {highlight && (
              <p className="font-medium text-[#18324A] dark:text-white">
                {highlight}
              </p>
            )}
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-2">
                {tags.map((label) => (
                  <li
                    key={label}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-[#15344F] ring-1 ring-[#E8EBE6] dark:bg-[#102A40] dark:text-white dark:ring-white/15"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
