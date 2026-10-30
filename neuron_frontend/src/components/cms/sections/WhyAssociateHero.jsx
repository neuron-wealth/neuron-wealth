import { Link } from "react-router-dom";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

export default function WhyAssociateHero({ id, content, design, root }) {
  const imageUrl = content.image?.url || "/images/why-us-fiduciary.jpg";
  const imageAlt = content.image?.alt || "Neuron Wealth Fiduciary Advisory Office";
  const title = content.title || "Why Associate";
  const highlight = content.highlight || "with Us";
  const text =
    content.text ||
    "Building enduring, mutually beneficial fiduciary partnerships anchored in unwavering ethics, multidisciplinary expertise, and shared values.";

  return (
    <section
      id={id || "why-associate-hero"}
      {...root}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[38svh] md:min-h-[48svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,23,36,0.86) 0%, rgba(8,23,36,0.80) 55%, rgba(8,23,36,0.92) 100%)",
        }}
      />
      <div className="site-frame relative flex min-h-[calc(38svh-var(--header-clearance,4.875rem))] md:min-h-[calc(48svh-var(--header-clearance,4.875rem))] flex-col px-4 sm:px-6">
        <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
          <Link to="/" className={`hover:text-white ${FOCUS}`}>
            Home
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <Link to="/about" className={`hover:text-white ${FOCUS}`}>
            About
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          Why Associate with Us
        </p>
        <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
          <h1 className="font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3.1rem] lg:text-[3.6rem]">
            {title} <span className="italic text-[#F3E6D4]">{highlight}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-snug text-white/90 sm:text-base lg:whitespace-nowrap lg:text-[0.9375rem]">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
