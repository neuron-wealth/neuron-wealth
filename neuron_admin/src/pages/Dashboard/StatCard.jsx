import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const TONE_CLASSES = {
  accent: "bg-[var(--accent-soft)] text-accent",
  green: "bg-[#54B848]/15 text-[#2C7A23] dark:text-[#8FDB84]",
  amber: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  sky: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
};

export default function StatCard({ icon: Icon, label, value, detail, to, tone = "accent" }) {
  return (
    <Link
      to={to}
      className="panel focus-ring group relative flex flex-col rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONE_CLASSES[tone] || TONE_CLASSES.accent}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-soft opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </div>
      <p className="muted mt-4 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
      {detail ? <p className="muted mt-2 text-xs">{detail}</p> : null}
    </Link>
  );
}
