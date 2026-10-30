import { ImageOff } from "lucide-react";
import { assetUrl } from "../../config/site";

export function BlogStatusPill({ status, scheduled }) {
  const tone = scheduled
    ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
    : status === "published"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : "bg-amber-500/15 text-amber-700 dark:text-amber-300";
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide ${tone}`}>
      {scheduled ? "Scheduled" : status === "published" ? "Published" : "Draft"}
    </span>
  );
}

export function BlogThumb({ src, className = "h-12 w-16" }) {
  if (!src) {
    return (
      <span className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-deep text-white/70 ${className}`}>
        <ImageOff className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  return <img src={assetUrl(src)} alt="" loading="lazy" className={`shrink-0 rounded-lg border border-line object-cover ${className}`} />;
}

export const blogDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "—";

export const blogTime = (value) => (value ? new Date(value).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) : "");
