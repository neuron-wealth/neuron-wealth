export const STATUS_STYLES = {
  New: {
    dot: "bg-[#21649A] dark:bg-[#4A8FCB]",
    badge: "bg-[#21649A]/10 text-[#1B5482] dark:bg-[#4A8FCB]/15 dark:text-[#8EC1EC]",
    color: "#21649A",
  },
  "In review": {
    dot: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
    color: "#E0A21B",
  },
  Closed: {
    dot: "bg-[#54B848]",
    badge: "bg-[#54B848]/15 text-[#2C7A23] dark:text-[#8FDB84]",
    color: "#54B848",
  },
  Subscribed: {
    dot: "bg-[#54B848]",
    badge: "bg-[#54B848]/15 text-[#2C7A23] dark:text-[#8FDB84]",
    color: "#54B848",
  },
  Unsubscribed: {
    dot: "bg-slate-400",
    badge: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
    color: "#94A3B8",
  },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.New;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {status || "New"}
    </span>
  );
}
