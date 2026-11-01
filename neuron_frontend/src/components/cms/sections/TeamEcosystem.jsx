import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useHomeTeam } from "../../../hooks/useHomeTeam";
import { visibleItems, strings, hasImage } from "../primitives";

const EASE = [0.22, 1, 0.36, 1];

export default function TeamEcosystem({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const eyebrow = content.eyebrow || "Multidisciplinary Expertise";
  const title = content.title || "Team Members";
  const text =
    content.text ||
    "Specialized private equity structuring, income tax audit experts, SEBI compliance, and mission-critical digital architects.";

  // Members are edited in Home › Team Showcase and shown here in the same order.
  const homeTeam = useHomeTeam();
  const members = useMemo(
    () =>
      visibleItems(homeTeam.members)
        .filter((m) => m.name)
        .map((m, idx) => {
          const fullBio = strings(m.fullBio);
          return {
            id: m.id || `member-${idx + 1}`,
            name: m.name,
            role: m.role,
            credentials: strings(m.credentials),
            monogram: m.initials || m.name.slice(0, 2).toUpperCase(),
            image: hasImage(m.image) ? m.image : null,
            bio: fullBio.length ? fullBio : strings([m.bio]),
          };
        }),
    [homeTeam]
  );

  return (
    <section
      id={id || "team-ecosystem"}
      {...root}
      aria-labelledby="team-members-heading"
      className="relative scroll-mt-[var(--header-height,4.875rem)] overflow-hidden border-b border-[#E8EBE6] bg-[#07141f] py-16 text-white dark:border-white/10 dark:bg-[#061018] sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 72% 0%, rgba(84,184,72,0.16), transparent 68%)",
        }}
      />
      <div className="site-frame relative px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl text-left">
            {eyebrow && (
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.28em] text-white/70">
                {eyebrow}
              </p>
            )}
            <h2
              id="team-members-heading"
              className="mt-4 font-display text-[2.15rem] font-medium leading-[1.05] tracking-tight text-white sm:text-[2.85rem] lg:text-[3.15rem]"
            >
              {title}
            </h2>
            {text && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                {text}
              </p>
            )}
          </div>
        </div>

        <div id="team-members-panel" className="mt-12 lg:mt-14">
          <ul className="grid items-start gap-6 lg:grid-cols-2">
            {members.map((member, idx) => (
              <motion.li
                key={member.id}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: EASE }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[#15344F]/70 to-[#0B1E30]/80 p-6 transition-colors duration-300 hover:border-[#54B848]/50 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  {member.image ? (
                    <img
                      src={member.image.url}
                      alt={member.image.alt || member.name}
                      className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-2 ring-[#54B848]/40"
                      loading="lazy"
                    />
                  ) : (
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#1a3d5c] text-sm font-semibold text-white ring-2 ring-[#54B848]/40 transition-colors duration-300 group-hover:bg-[#21649A]">
                      {member.monogram}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h4 aria-level={3} className="font-display text-[1.3rem] font-medium leading-tight text-white">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-[0.8125rem] font-medium text-[#8FCB86]">
                      {member.role}
                    </p>
                  </div>
                </div>
                {member.credentials?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {member.credentials.map((cred) => (
                      <li
                        key={cred}
                        className="rounded-full bg-white/10 px-3 py-1 text-[0.6875rem] font-medium text-white/80"
                      >
                        {cred}
                      </li>
                    ))}
                  </ul>
                )}
                {member.bio?.length > 0 && (
                  <div className="mt-5 space-y-3.5 border-t border-white/10 pt-5 text-sm leading-[1.75] text-white/80">
                    {member.bio.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
