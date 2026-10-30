import { Link, useLocation } from "react-router-dom";
import { Compass, Users, Handshake, Building2, ChevronRight, Home } from "lucide-react";
import { cx } from "../../utils/cx";

export const ABOUT_TABS = [
  {
    id: "vision-and-mission",
    label: "Vision And Mission",
    href: "/vision-and-mission",
    icon: Compass,
    description: "Our guiding vision, mission & 4 foundational pillars",
  },
  {
    id: "about-us",
    label: "Overview",
    href: "/about",
    icon: Building2,
    description: "SEBI Registered Investment Adviser & multi-family office",
  },
  {
    id: "why-associate",
    label: "Why Associate with Us",
    href: "/why-associate",
    icon: Handshake,
    description: "The transformative power of fiduciary partnership",
  },
  {
    id: "team",
    label: "Team",
    href: "/team",
    icon: Users,
    description: "Meet our multidisciplinary leadership & financial experts",
  },
];

export default function AboutNavTabs({ currentTabTitle }) {
  const { pathname } = useLocation();

  return (
    <div className="relative border-b border-slate-200/80 bg-slate-50/70 py-4 transition-colors duration-200 dark:border-white/10 dark:bg-[#071321]/60">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-[0.8125rem] font-medium text-slate-500 dark:text-slate-400">
            <li>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 hover:text-brand-blue dark:hover:text-sky-400 transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
            </li>
            <li>
              <span className="text-slate-600 dark:text-slate-300">About</span>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
            </li>
            <li className="font-semibold text-brand-blue dark:text-sky-300" aria-current="page">
              {currentTabTitle}
            </li>
          </ol>
        </nav>

        {/* ── Horizontal Navigation Tabs for the 4 About Dropdown Pages ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none sm:gap-3">
          {ABOUT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              pathname === tab.href ||
              (tab.href === "/about" && (pathname === "/about-us" || pathname === "/about")) ||
              (tab.href === "/vision-and-mission" &&
                (pathname === "/vision-and-mission" ||
                  pathname === "/vision-mission" ||
                  pathname === "/about/vision-and-mission" ||
                  pathname === "/about/vision-mission")) ||
              (tab.href === "/why-associate" &&
                (pathname === "/why-associate" ||
                  pathname === "/why-associate-with-us" ||
                  pathname === "/about/why-associate" ||
                  pathname === "/about/why-associate-with-us")) ||
              (tab.href === "/team" &&
                (pathname === "/team" ||
                  pathname === "/our-team" ||
                  pathname === "/about/team" ||
                  pathname === "/about/our-team"));

            return (
              <Link
                key={tab.id}
                to={tab.href}
                className={cx(
                  "group relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs",
                  isActive
                    ? "border border-brand-blue/30 bg-white text-brand-blue shadow-md dark:border-sky-400/40 dark:bg-sky-500/15 dark:text-sky-300"
                    : "border border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-brand-blue dark:border-white/10 dark:bg-[#0b1626] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cx(
                    "h-4 w-4 transition-transform group-hover:scale-110",
                    isActive
                      ? "text-emerald-800 dark:text-emerald-300"
                      : "text-slate-400 group-hover:text-brand-blue dark:text-slate-400 dark:group-hover:text-sky-400",
                  )}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[1px] left-4 right-4 h-0.5 rounded-full bg-brand-green"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
