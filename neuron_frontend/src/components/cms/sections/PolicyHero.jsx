import { Link } from "react-router-dom";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

export default function PolicyHero({ content, section }) {
  const breadcrumb = content?.breadcrumb || "Governance & Legal";
  const title = content?.title || "Website Policy";
  const highlight = content?.highlight || "";
  const text = content?.text || "";
  const badge = content?.badge || "";
  const imageUrl = content?.image?.url || "/images/about-what-we-do-banner.jpg";
  const imageAlt = content?.image?.alt || title;

  return (
    <section
      id={section?.design?.anchor || section?.id || "policy-hero"}
      data-cms-section={section?.id}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[38svh] md:min-h-[48svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        aria-hidden={!content?.image?.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#081724]/90 via-[#081724]/80 to-[#081724]/95"
      />

      <div className="site-frame relative flex min-h-[calc(38svh-var(--header-clearance,4.875rem))] md:min-h-[calc(48svh-var(--header-clearance,4.875rem))] flex-col px-4 sm:px-6">
        <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
          <Link to="/" className={`hover:text-white ${FOCUS}`}>
            Home
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span>Governance &amp; Legal</span>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="font-semibold text-[#8FCB86]">{breadcrumb}</span>
        </p>

        <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <h1 className="font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]">
            {title} {highlight ? <span className="italic text-[#F3E6D4]">{highlight}</span> : null}
          </h1>
          {text ? (
            <p className="mt-5 max-w-3xl text-sm leading-snug text-white/90 sm:text-base lg:text-[0.9375rem]">
              {text}
            </p>
          ) : null}
          {badge ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/85">
              {badge}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
