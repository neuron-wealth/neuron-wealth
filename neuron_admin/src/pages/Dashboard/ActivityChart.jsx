import { BarChart3 } from "lucide-react";
import { RECORD_PAGE_BY_KEY } from "../../config/records";
import { formatDate, plural } from "../../utils/format";

function parseDay(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function ActivityChart({ trend = [], records = [] }) {
  const series = records.map((record) => ({ key: record.key, label: RECORD_PAGE_BY_KEY[record.key].label, color: RECORD_PAGE_BY_KEY[record.key].color }));
  const max = Math.max(1, ...trend.map((day) => day.total || 0));
  const total = trend.reduce((sum, day) => sum + (day.total || 0), 0);
  const ticks = [max, Math.round(max / 2), 0].filter((value, index, list) => list.indexOf(value) === index);
  const describe = (day) => series.map((entry) => `${day[entry.key] || 0} ${entry.label.toLowerCase()}`).join(", ");

  return (
    <section className="panel rounded-2xl p-5 sm:p-6" aria-labelledby="activity-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="activity-title" className="text-base font-bold">
            Activity, Last 14 Days
          </h2>
          <p className="muted mt-0.5 text-sm">{plural(total, "form submission")} received</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold">
          {series.map((entry) => (
            <span key={entry.key} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: entry.color }} aria-hidden="true" />
              {entry.label}
            </span>
          ))}
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-6 flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-line text-center">
          <BarChart3 className="h-6 w-6 text-soft" aria-hidden="true" />
          <p className="muted mt-2 text-sm">No activity in the last 14 days.</p>
        </div>
      ) : (
        <div className="mt-6 flex gap-3" aria-hidden="true">
          <div className="flex h-56 flex-col justify-between pb-6 text-right text-[0.6875rem] text-soft">
            {ticks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
              {ticks.map((tick) => (
                <span key={tick} className="h-px w-full bg-line" />
              ))}
            </div>
            <div className="relative grid h-56 grid-cols-[repeat(14,minmax(0,1fr))] gap-1 sm:gap-2">
              {trend.map((day, index) => {
                const date = parseDay(day.date);
                return (
                  <div key={day.date} className="group flex flex-col items-center">
                    <div
                      className="flex w-full flex-1 flex-col items-center justify-end rounded-md pb-px transition-colors group-hover:bg-subtle"
                      title={`${formatDate(date, { day: "numeric", month: "short" })}: ${describe(day)}`}
                    >
                      <div
                        className="flex w-full max-w-[18px] flex-col-reverse overflow-hidden rounded-t transition-[height] duration-500"
                        style={{ height: `${((day.total || 0) / max) * 100}%`, minHeight: day.total ? 4 : 0 }}
                      >
                        {series.map((entry) =>
                          day[entry.key] ? <span key={entry.key} style={{ flexGrow: day[entry.key], background: entry.color }} /> : null
                        )}
                      </div>
                    </div>
                    <span className={`mt-1.5 h-4 text-[0.6875rem] text-soft ${index % 2 ? "hidden sm:block" : ""}`}>{date.getDate()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <table className="sr-only">
        <caption>Daily form submissions for the last 14 days</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            {series.map((entry) => (
              <th key={entry.key} scope="col">
                {entry.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trend.map((day) => (
            <tr key={day.date}>
              <th scope="row">{formatDate(parseDay(day.date))}</th>
              {series.map((entry) => (
                <td key={entry.key}>{day[entry.key] || 0}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
