import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { visibleItems, strings } from "../primitives";

const EASE = [0.22, 1, 0.36, 1];

export default function TeamEcosystem({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const eyebrow = content.eyebrow || "Multidisciplinary Expertise";
  const title = content.title || "Team Members";
  const text =
    content.text ||
    "Specialized private equity structuring, income tax audit experts, SEBI compliance, and mission-critical digital architects.";

  const rawDepartments = visibleItems(content.departments);
  const rawMembers = visibleItems(content.members);

  const departments = useMemo(() => {
    return rawDepartments.length > 0
      ? rawDepartments
      : [
          {
            id: "dept-1",
            deptId: "advisory-taxation",
            eyebrow: "Specialized Advisory",
            title: "PE/VC, Taxation & Wealth Protection",
            desc: "Private equity structuring, cross-border DTAA taxation, income tax compliance, and multi-generational risk mitigation.",
          },
          {
            id: "dept-2",
            deptId: "operations-governance",
            eyebrow: "Firm Operations & Governance",
            title: "Compliance, Operations & Administration",
            desc: "SEBI regulatory oversight, back-office excellence, operational precision, and seamless client servicing.",
          },
          {
            id: "dept-3",
            deptId: "technology-partners",
            eyebrow: "Infrastructure & Technology",
            title: "Technology & Strategic Partners",
            desc: "Mission-critical hardware security, cyber infrastructure, e-commerce, and high-availability digital platforms.",
          },
        ];
  }, [rawDepartments]);

  const departmentMap = useMemo(() => {
    const map = new Map();
    departments.forEach((dept) => {
      map.set(dept.deptId, dept);
    });
    return map;
  }, [departments]);

  const allMembers = useMemo(() => {
    return rawMembers.map((m, idx) => {
      // Members with an unknown department ID fall back to the first department so nobody is hidden.
      const dept = departmentMap.get(m.deptId) || departments[0] || {};
      return {
        ...m,
        id: m.id || `member-${idx + 1}`,
        monogram: m.monogram || m.name?.slice(0, 2)?.toUpperCase() || "NW",
        deptId: dept.deptId,
        deptTitle: dept.title || "",
        deptEyebrow: dept.eyebrow || "",
        credentials: strings(m.credentials),
        bio: strings(m.bio),
      };
    });
  }, [rawMembers, departmentMap, departments]);

  // One flat list, kept in department order.
  const orderedMembers = departments.flatMap((dept) => allMembers.filter((m) => m.deptId === dept.deptId));

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
          <ul className="gap-6 lg:columns-2">
            {orderedMembers.map((member, idx) => (
              <motion.li
                key={member.id}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: EASE }}
                className="group mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-gradient-to-br from-[#15344F]/70 to-[#0B1E30]/80 p-6 transition-colors duration-300 hover:border-[#54B848]/50 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#1a3d5c] text-sm font-semibold text-white ring-2 ring-[#54B848]/40 transition-colors duration-300 group-hover:bg-[#21649A]">
                    {member.monogram}
                  </span>
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
