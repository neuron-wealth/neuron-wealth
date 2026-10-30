import { STATUS_STYLES } from "../../components/ui/StatusBadge";
import { RECORD_PAGE_BY_KEY } from "../../config/records";

const styleFor = (status) => STATUS_STYLES[status] || STATUS_STYLES.New;

function Breakdown({ title, statuses, counts = {} }) {
  const total = statuses.reduce((sum, status) => sum + (counts[status] || 0), 0);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="muted text-xs">{total} total</span>
      </div>
      <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-subtle" aria-hidden="true">
        {total
          ? statuses.map((status) =>
              counts[status] ? (
                <span
                  key={status}
                  className="h-full transition-[width] duration-500"
                  style={{ width: `${(counts[status] / total) * 100}%`, background: styleFor(status).color }}
                />
              ) : null
            )
          : null}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {statuses.map((status) => (
          <li key={status} className="flex items-center gap-1.5 text-xs">
            <span className={`h-2 w-2 rounded-full ${styleFor(status).dot}`} aria-hidden="true" />
            <span className="muted">{status}</span>
            <span className="font-bold">{counts[status] || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StatusBreakdown({ records = [] }) {
  return (
    <section className="panel rounded-2xl p-5 sm:p-6" aria-labelledby="status-title">
      <h2 id="status-title" className="text-base font-bold">
        Status Overview
      </h2>
      <p className="muted mt-0.5 text-sm">Where every submission stands right now</p>
      <div className="mt-5 space-y-5">
        {records.map((record) => (
          <Breakdown key={record.key} title={RECORD_PAGE_BY_KEY[record.key].label} statuses={record.statuses} counts={record.byStatus} />
        ))}
      </div>
    </section>
  );
}
