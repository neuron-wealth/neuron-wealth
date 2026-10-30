import { CheckCircle2 } from "lucide-react";
import { sectionDesign } from "../design";

export default function WhyWeAre({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", imageSide: "right" });
  const onRight = look.imageSide !== "left";
  const eyebrow = content.eyebrow || "The Industry Reality";
  const title = content.title || "Why We Are";
  const paragraphs =
    Array.isArray(content.paragraphs) && content.paragraphs.length > 0
      ? content.paragraphs
      : [
          "Currently, investments are being pushed i.e. sold to investors instead of pulled i.e. investors asking for the investment advisors services. As a result, the products are being sold instead of solutions are offered to the investors. And, investor ends up investing in various products / schemes / plans/ options that he or she may not need or want.",
          "Also, in current times, the financial market has become very complex with complicated investment products, structured products, Algo/AI based investments, various PMS strategies, AIF investments, Crypto currencies on one hand and complicated laws, ever changing taxation and compliance requirements, ignorance or lack of awareness, ambiguity and subjectivity in interpretation on other hand, resulting in complicated financial life of any family that has many members having different income or expense requirements and have varied needs, wants, goals, hopes, aspirations in life affecting financial decision making.",
        ];
  const badgeText = content.badgeText || "Solutions-First Fiduciary Advisory • Zero Product Pushing";
  const imageUrl = content.image?.url || "/images/about-why-we-are.jpg";
  const imageAlt = content.image?.alt || "Neuron Wealth Financial Analysis & Research";

  return (
    <section
      id={id || "why-we-are"}
      {...root}
      className={`scroll-mt-[var(--header-height,4.875rem)] ${
        look.background || "bg-white dark:bg-[#102A40]"
      } pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16`}
      style={look.style}
    >
      <div className="site-frame grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
        <div className={`flex flex-col lg:col-span-7 ${onRight ? "" : "lg:order-2"}`}>
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
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {badgeText && (
              <p className="flex items-start gap-2.5 pt-2 text-sm font-medium text-[#18324A] dark:text-white sm:text-[0.9375rem]">
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#54B848]" aria-hidden="true" />
                <span>{badgeText}</span>
              </p>
            )}
          </div>
        </div>

        <div className={`relative min-h-[320px] sm:min-h-[380px] lg:col-span-5 lg:min-h-0 ${onRight ? "" : "lg:order-1"}`}>
          <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden rounded-none shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:shadow-none lg:absolute lg:inset-0 lg:h-full">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full rounded-none object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
