import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { visibleItems } from "../primitives";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";
const H2_SIZE = "font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3rem]";

export default function NriFounderStory({ content, section }) {
  const [failed, setFailed] = useState(false);
  const founderImageUrl = content?.founderImage?.url || "/images/team/jigar-patel.jpg";
  const founderImageAlt = content?.founderImage?.alt || "Mr. Jigar Patel, Founder and Principal Officer";
  const founderName = content?.founderName || "Mr. Jigar Patel";
  const founderRole = content?.founderRole || "Founder & Principal Officer";
  const heading = content?.heading || "We Have Made This Journey Ourselves";
  const paragraphs = content?.paragraphs || [];
  const credentials = visibleItems(content?.credentials || []);
  const teamLink = content?.teamLink || { label: "Meet the team", href: "/team" };

  return (
    <section
      id={section?.design?.anchor || section?.id || "founder"}
      data-cms-section={section?.id}
      aria-labelledby="founder-heading"
      className="relative isolate scroll-mt-24 border-y border-white/10 bg-gradient-to-br from-[#061524] via-[#0b2034] to-[#061524] py-10 text-white shadow-xl sm:py-12 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#21649A]/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#54B848]/15 blur-3xl" />
      </div>

      <div className="site-frame relative z-10 grid gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12">
        <figure className="flex flex-col items-center text-center lg:col-span-4">
          <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ring-2 ring-[#54B848]/50 sm:h-52 sm:w-52 lg:h-56 lg:w-56">
            {failed ? (
              <span className="grid h-full w-full place-items-center font-display text-[5rem] font-medium text-white/90">
                JP
              </span>
            ) : (
              <img
                src={founderImageUrl}
                alt={founderImageAlt}
                className="h-full w-full object-cover object-[center_15%]"
                onError={() => setFailed(true)}
              />
            )}
          </div>
          <figcaption className="mt-3.5 text-center">
            <span className="block font-display text-lg font-semibold text-white sm:text-xl">
              {founderName}
            </span>
            <span className="mt-0.5 block text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#8FCB86]">
              {founderRole}
            </span>
          </figcaption>
        </figure>

        <div className="lg:col-span-8">
          <h2 id="founder-heading" className={`${H2_SIZE} text-white`}>
            {heading}
          </h2>

          {paragraphs.length > 0 ? (
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ) : null}

          {credentials.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-4">
              {credentials.map((cred, idx) => (
                <li
                  key={cred.id || cred.title || idx}
                  className="border-b border-r border-white/15 bg-white/[0.05] px-3.5 py-3 backdrop-blur-xs"
                >
                  <span className="block font-display text-[1.4rem] font-medium leading-none text-white">
                    {cred.title}
                  </span>
                  <span className="mt-1.5 block text-[0.75rem] font-medium text-slate-300">
                    {cred.detail}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {teamLink?.label && teamLink?.href ? (
            <Link
              to={teamLink.href}
              className={`mt-5 inline-flex items-center gap-2 text-[0.90625rem] font-semibold text-[#8FCB86] hover:text-white ${FOCUS}`}
            >
              {teamLink.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

