import { Link } from "react-router-dom";
import { ArrowRight, Database, HardDrive } from "lucide-react";
import { greeting, plural } from "../../utils/format";

export default function WelcomeBanner({ admin, data, records }) {
  const firstName = String(admin?.name || "Admin").split(" ")[0];
  const waiting = records
    .filter((record) => record.statuses.includes("New"))
    .reduce((sum, record) => sum + (record.byStatus.New || 0), 0);
  const weekTotal = records.reduce((sum, record) => sum + record.lastWeek, 0);
  const newCallbacks = records.find((record) => record.key === "callbacks")?.byStatus.New || 0;
  const isDatabase = data.storage === "database";
  const StorageIcon = isDatabase ? Database : HardDrive;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-deep via-[#0B1E30] to-[#071321] p-6 text-white shadow-lift sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-[#54B848]/20 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-white/60">
            {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-[2rem]">
            {greeting()}, {firstName}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            {plural(waiting, "new form submission")} waiting for review
            {newCallbacks ? `, including ${plural(newCallbacks, "call back request")}` : ""}.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link to="/enquiries" className="btn focus-ring h-11 bg-white px-4 text-brand-navy hover:bg-white/90">
              Review Enquiries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/callbacks" className="btn focus-ring h-11 border border-white/20 px-4 text-white hover:bg-white/10">
              Call Back Requests
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-[20rem]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <p className="text-xs font-medium text-white/60">Submissions, Last 7 Days</p>
            <p className="mt-1 text-2xl font-bold">{weekTotal}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <p className="text-xs font-medium text-white/60">Waiting for Review</p>
            <p className="mt-1 text-2xl font-bold">{waiting}</p>
          </div>
          <div className="col-span-2 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs text-white/75">
            <StorageIcon className={`h-3.5 w-3.5 ${isDatabase ? "text-brand-green" : "text-amber-300"}`} aria-hidden="true" />
            {isDatabase ? "Connected to MongoDB" : "Database offline, showing the local backup store"}
          </div>
        </div>
      </div>
    </section>
  );
}
