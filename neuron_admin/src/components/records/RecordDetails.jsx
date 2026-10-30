import { Calendar, Globe2, History, StickyNote } from "lucide-react";
import { siteUrl } from "../../config/site";
import { formatDateTime } from "../../utils/format";
import StatusBadge from "../ui/StatusBadge";

const LINK = "focus-ring rounded font-semibold text-accent underline underline-offset-2 hover:text-ink";

function FieldValue({ field, value }) {
  if (!value) return <span className="muted italic">Not provided</span>;
  if (field.kind === "email") {
    return (
      <a href={`mailto:${value}`} className={`${LINK} break-all`}>
        {value}
      </a>
    );
  }
  if (field.kind === "phone") {
    return (
      <a href={`tel:${value.replace(/[^\d+]/g, "")}`} className={LINK}>
        {value}
      </a>
    );
  }
  if (field.kind === "url" && /^https?:\/\//i.test(value)) {
    return (
      <a href={value} target="_blank" rel="noreferrer noopener" className={`${LINK} break-all`}>
        {value}
      </a>
    );
  }
  if (field.kind === "textarea") {
    return <span className="block whitespace-pre-line rounded-lg bg-subtle p-3 leading-relaxed">{value}</span>;
  }
  return <span className="break-words">{value}</span>;
}

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
      <span className="min-w-0 break-words">{children}</span>
    </span>
  );
}

export default function RecordDetails({ item, type }) {
  const short = type.fields.filter((field) => field.kind !== "textarea");
  const long = type.fields.filter((field) => field.kind === "textarea");
  const edited = item.updatedAt && item.createdAt && new Date(item.updatedAt) - new Date(item.createdAt) > 60000;

  return (
    <div className="space-y-5">
      <div className="muted flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <StatusBadge status={item.status} />
        <Meta icon={Calendar}>Received {formatDateTime(item.createdAt)}</Meta>
        {edited ? <Meta icon={History}>Updated {formatDateTime(item.updatedAt)}</Meta> : null}
        {item.sourcePage ? (
          <Meta icon={Globe2}>
            Sent from{" "}
            <a href={siteUrl(item.sourcePage)} target="_blank" rel="noreferrer" className={LINK}>
              {item.sourcePage}
            </a>
          </Meta>
        ) : null}
      </div>

      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {short.map((field) => (
          <div key={field.key} className="min-w-0">
            <dt className="field-label">{field.label}</dt>
            <dd className="mt-1 text-sm">
              <FieldValue field={field} value={item[field.key]} />
            </dd>
          </div>
        ))}
        {long.map((field) => (
          <div key={field.key} className="min-w-0 sm:col-span-2">
            <dt className="field-label">{field.label}</dt>
            <dd className="mt-1 text-sm">
              <FieldValue field={field} value={item[field.key]} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-dashed border-line p-3.5">
        <p className="field-label inline-flex items-center gap-1.5">
          <StickyNote className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Internal Notes
        </p>
        <p className={`mt-1 whitespace-pre-line text-sm leading-relaxed ${item.notes ? "" : "muted italic"}`}>
          {item.notes || "No notes yet. Use Edit to add follow-up notes; they are only visible in the admin."}
        </p>
      </div>
    </div>
  );
}
