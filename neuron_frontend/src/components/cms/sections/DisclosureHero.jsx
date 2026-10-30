import { Link } from "react-router-dom";

const FOCUS = "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue";

export default function DisclosureHero({ content, section, root }) {
  const parent = content?.parent || "";
  const breadcrumb = content?.breadcrumb || content?.title || "";
  const title = content?.title || "";
  const highlight = content?.highlight || "";
  const text = content?.text || "";
  const imageUrl = content?.image?.url || "/images/why-us-fiduciary.jpg";
  const imageAlt = content?.image?.alt || "";

  return (
    <section
      {...root}
      id={root?.id || section?.id}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[38svh] md:min-h-[48svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img src={imageUrl} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,23,36,0.86) 0%, rgba(8,23,36,0.80) 55%, rgba(8,23,36,0.92) 100%)",
        }}
      />

      <div className="site-frame relative flex min-h-[calc(38svh-var(--header-clearance,4.875rem))] md:min-h-[calc(48svh-var(--header-clearance,4.875rem))] flex-col px-4 sm:px-6">
        <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
          <Link to="/" className={`hover:text-white ${FOCUS}`}>
            Home
          </Link>
          {parent ? (
            <>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              <span>{parent}</span>
            </>
          ) : null}
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span>{breadcrumb}</span>
        </p>

        <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <h1 className="font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]">
            {title} {highlight ? <span className="italic text-[#F3E6D4]">{highlight}</span> : null}
          </h1>

          {text ? (
            <p className="mt-5 max-w-3xl text-sm leading-snug text-white/90 sm:text-base lg:text-[0.9375rem]">{text}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
