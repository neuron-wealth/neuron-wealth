import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { RECORD_PAGE_BY_KEY } from "../../config/records";
import { initialOf, timeAgo } from "../../utils/format";

export default function RecentList({ items = [], records = [] }) {
  const columnsFor = Object.fromEntries(records.map((record) => [record.key, record.columns]));
  const shown = items.filter((item) => RECORD_PAGE_BY_KEY[item.type]);

  return (
    <section className="panel flex flex-col overflow-hidden rounded-2xl" aria-labelledby="recent-submissions">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <h2 id="recent-submissions" className="text-base font-bold">
          Latest Form Submissions
        </h2>
        <p className="muted mt-0.5 text-sm">The newest entries from every website form</p>
      </div>

      {shown.length === 0 ? (
        <EmptyState icon={Inbox} title="Nothing here yet" description="Contact enquiries, call back requests, Pearl assessments and newsletter sign-ups will appear here." />
      ) : (
        <ul className="divide-y divide-line">
          {shown.map((item) => {
            const page = RECORD_PAGE_BY_KEY[item.type];
            const columns = columnsFor[item.type] || { primary: "name", secondary: "email" };
            const name = item[columns.primary] || item.email || "Untitled record";
            const topic = (columns.topic && item[columns.topic]) || item[columns.secondary] || "";
            const Icon = page.icon;
            return (
              <li key={`${item.type}-${item.id}`}>
                <Link to={page.to} className="focus-ring flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-subtle sm:px-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm font-bold text-accent">
                    {initialOf(name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{name}</span>
                    <span className="muted flex min-w-0 items-center gap-1.5 text-xs">
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: page.color }} aria-hidden="true" />
                      <span className="shrink-0 font-semibold">{page.label}</span>
                      {topic ? <span className="truncate">· {topic}</span> : null}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <StatusBadge status={item.status} />
                    <span className="muted mt-1 hidden text-[0.6875rem] sm:block">{timeAgo(item.createdAt)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
