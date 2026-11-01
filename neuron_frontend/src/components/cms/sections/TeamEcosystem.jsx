import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useHomeTeam, isMentor } from "../../../hooks/useHomeTeam";
import { visibleItems, strings, hasImage } from "../primitives";

const EASE = [0.22, 1, 0.36, 1];

function MemberPhoto({ member, large }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative shrink-0 rounded-full border border-[#54B848] p-1 ${large ? "h-24 w-24 sm:h-32 sm:w-32" : "h-20 w-20"}`}
    >
      <span aria-hidden="true" className="absolute right-1 top-0.5 z-10 h-2.5 w-2.5 rounded-full bg-[#54B848]" />
      <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-[#15344F] via-[#1b4a6e] to-[#21649A]">
        {member.image && !failed ? (
          <img
            src={member.image.url}
            alt={member.image.alt || member.name}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className={`flex h-full w-full items-center justify-center font-display tracking-wide text-white ${large ? "text-[2rem]" : "text-[1.4rem]"}`}>
            {member.monogram}
          </span>
        )}
      </div>
    </div>
  );
}

const bioLength = (member) => member.bio.join(" ").length;

/**
 * Bento layout on a 3-column grid, keeping the Home order: rows alternate between a pair
 * (one large card spanning two columns + one small card) and a trio of small cards. In each
 * pair the member with the longer bio gets the large card. Every row is filled completely.
 */
function bentoLayout(members) {
  const sized = [];
  let index = 0;
  let pairRow = true;
  while (index < members.length) {
    const left = members.length - index;
    if (left === 1) {
      sized.push({ member: members[index], size: "full" });
      index += 1;
    } else if (pairRow || left === 2 || left === 4) {
      const [a, b] = [members[index], members[index + 1]];
      const aLarge = bioLength(a) >= bioLength(b);
      sized.push({ member: a, size: aLarge ? "large" : "small" }, { member: b, size: aLarge ? "small" : "large" });
      index += 2;
      pairRow = false;
    } else {
      for (const member of members.slice(index, index + 3)) sized.push({ member, size: "small" });
      index += 3;
      pairRow = true;
    }
  }
  return sized;
}

const SPAN = { small: "lg:col-span-1", large: "lg:col-span-2", full: "lg:col-span-3" };

function MemberCard({ member, size }) {
  const large = size !== "small";
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300 hover:border-[#54B848]/50 sm:p-8 ${
        large
          ? "border-[#54B848]/25 bg-gradient-to-br from-[#1b4a6e]/60 via-[#15344F]/70 to-[#0B1E30]/90"
          : "border-white/10 bg-gradient-to-br from-[#15344F]/70 to-[#0B1E30]/80"
      }`}
    >
      <div className={`flex items-center ${large ? "gap-6" : "gap-4"}`}>
        <MemberPhoto member={member} large={large} />
        <div className="min-w-0">
          {member.role && (
            <p className="text-[0.6875rem] font-bold uppercase leading-snug tracking-[0.16em] text-[#8FCB86]">{member.role}</p>
          )}
          <h3
            className={`mt-1.5 font-display font-medium leading-tight text-white ${
              large ? "text-[1.65rem] sm:text-[2rem]" : "text-[1.4rem]"
            }`}
          >
            {member.name}
          </h3>
        </div>
      </div>

      {member.credentials.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {member.credentials.map((cred) => (
            <li key={cred} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[0.6875rem] font-medium text-white/85">
              {cred}
            </li>
          ))}
        </ul>
      )}

      {member.bio.length > 0 && (
        <div
          className={`mt-5 border-t border-white/10 pt-5 text-sm leading-[1.8] text-white/75 ${
            large ? "sm:text-[0.9375rem] lg:columns-2 lg:gap-10 [&>p]:break-inside-avoid [&>p+p]:mt-3.5" : "space-y-3.5"
          }`}
        >
          {member.bio.map((para, pIdx) => (
            <p key={pIdx}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamEcosystem({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const eyebrow = content.eyebrow || "Multidisciplinary Expertise";
  const title = content.title || "Team Members";
  const text =
    content.text ||
    "Specialized private equity structuring, income tax audit experts, SEBI compliance, and mission-critical digital architects.";

  // Members are edited in Home › Team Showcase and shown here in the same order. Mentors
  // already have their own card in Leadership & Mentorship, so they are not repeated here.
  const homeTeam = useHomeTeam();
  const members = useMemo(
    () =>
      visibleItems(homeTeam.members)
        .filter((m) => m.name && !isMentor(m.name))
        .map((m, idx) => ({
          id: m.id || `member-${idx + 1}`,
          name: m.name,
          role: m.role,
          credentials: strings(m.credentials),
          monogram: m.initials || m.name.slice(0, 2).toUpperCase(),
          image: hasImage(m.image) ? m.image : null,
          // Full profile shown directly on the card; falls back to the short bio.
          bio: strings(m.fullBio).length ? strings(m.fullBio) : strings([m.bio]),
        })),
    [homeTeam]
  );
  const cards = useMemo(() => bentoLayout(members), [members]);

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

        <ul id="team-members-panel" className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3">
          {cards.map(({ member, size }, idx) => (
            <motion.li
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: EASE }}
              className={SPAN[size]}
            >
              <MemberCard member={member} size={size} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
