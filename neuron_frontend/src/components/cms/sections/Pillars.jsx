import { Award, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import { CMS_ICONS } from "../cmsIcons";
import { sectionDesign } from "../design";

const DEFAULT_PILLARS = [
  {
    num: "01",
    title: "1. Integrity :",
    icon: "ShieldCheck",
    image: { url: "/images/pillar-integrity.jpg", alt: "1. Integrity" },
    text: "Instilling the highest set of values and beliefs in the organization, and having the courage to consistently act in accordance with them.",
  },
  {
    num: "02",
    title: "2. Intention :",
    icon: "HeartHandshake",
    image: { url: "/images/pillar-intention.jpg", alt: "2. Intention" },
    text: "Working as a Fiduciary, where client’s interest is ahead of everyone else’s and Being a Go Giver – Give more in value than fees.",
  },
  {
    num: "03",
    title: "3. Capability :",
    icon: "Award",
    image: { url: "/images/pillar-capability.jpg", alt: "3. Capability" },
    text: "Having an expert knowledge in investments and perfect mix of technical and soft (leadership, communication, presentation, etc, skills); continuously learning, updating, and educating ourselves and clients; and having positive and humble attitude with empathy.",
  },
  {
    num: "04",
    title: "4. Deliver Results :",
    icon: "TrendingUp",
    image: { url: "/images/pillar-results.jpg", alt: "4. Deliver Results" },
    text: "Genuinely simplify clients financial Life and giving peace of mind about growing, sustaining and managing wealth for multiple generations.",
  },
];

const FALLBACK_ICONS = {
  "01": ShieldCheck,
  "02": HeartHandshake,
  "03": Award,
  "04": TrendingUp,
};

export default function Pillars({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white" });
  const eyebrow = content.eyebrow || "Foundational Pillars";
  const title = content.title || "How to be the most trusted?";
  const text = content.text || "Cultivating enduring fiduciary trust through four core pillars:";
  const rawItems =
    Array.isArray(content.items) && content.items.length > 0
      ? content.items.filter((i) => i.visible !== false)
      : DEFAULT_PILLARS;
  const items = rawItems.length > 0 ? rawItems : DEFAULT_PILLARS;

  return (
    <section
      id={id || "how-to-be-most-trusted"}
      {...root}
      className={`scroll-mt-[var(--header-height,4.875rem)] border-b border-[#E8EBE6] ${
        look.background || "bg-white dark:bg-[#102A40]"
      } pt-8 pb-16 dark:border-white/10 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24`}
      style={look.style}
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="max-w-2xl">
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
          {text && (
            <p className="mt-4 text-base leading-[1.75] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {text}
            </p>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((pillar, idx) => {
            const Icon =
              pillar.icon && CMS_ICONS[pillar.icon]
                ? CMS_ICONS[pillar.icon]
                : FALLBACK_ICONS[pillar.num] || ShieldCheck;
            const imageUrl = pillar.image?.url || `/images/pillar-${idx + 1}.jpg`;
            const imageAlt = pillar.image?.alt || pillar.title;

            return (
              <div
                key={pillar.id || pillar.num || idx}
                className="group relative flex flex-col overflow-hidden rounded-none border border-[#E8EBE6] bg-white shadow-[0_12px_32px_-16px_rgba(16,42,64,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#21649A]/40 hover:shadow-[0_20px_40px_-16px_rgba(16,42,64,0.15)] dark:border-white/10 dark:bg-[#0c1828]"
              >
                {/* Pillar Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {pillar.num && (
                    <span className="absolute top-3 right-3 rounded-none bg-black/60 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold tracking-wider text-white">
                      {pillar.num}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" />
                    <h3 className="font-display text-lg font-medium tracking-tight text-[#15344F] dark:text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3.5 flex-1 text-sm leading-[1.7] text-[#5E6D7B] dark:text-slate-300">
                    {pillar.text || pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
