import { Link } from "react-router-dom";
import { FOCUS } from "../primitives";

export default function ContactHero({ id, content, design, root }) {
  const imageUrl = content?.image?.url || "/images/about-room.jpg";
  const imageAlt = content?.image?.alt || "Neuron Wealth Consultation Meeting Room";
  const breadcrumb = content?.breadcrumb || "Contact";
  const title = content?.title || "Contact";
  const highlight = content?.highlight || "Us";
  const text =
    content?.text ||
    "We welcome dialogue with families, professionals, and institutions seeking objective, conflict-free fiduciary wealth advisory.";

  return (
    <section
      id={id || "contact-hero"}
      {...root}
      className="relative isolate -mt-[var(--header-clearance,4.875rem)] min-h-[38svh] md:min-h-[46svh] overflow-hidden bg-[#102A40] pt-[var(--header-clearance,4.875rem)]"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,23,36,0.90) 0%, rgba(10,32,50,0.85) 60%, rgba(8,23,36,0.95) 100%)",
        }}
      />
      <div className="site-frame relative flex min-h-[calc(38svh-var(--header-clearance,4.875rem))] md:min-h-[calc(46svh-var(--header-clearance,4.875rem))] flex-col justify-between px-4 sm:px-6">
        <p className="pt-4 text-left text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
          <Link to="/" className={`hover:text-white ${FOCUS}`}>
            Home
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          {breadcrumb}
        </p>

        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <h1 className="font-display text-[2.25rem] font-medium leading-tight tracking-tight text-white sm:text-[3rem] lg:text-[3.5rem]">
            {title} <span className="italic text-[#F3E6D4]">{highlight}</span>
          </h1>

          <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-[1rem]">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
