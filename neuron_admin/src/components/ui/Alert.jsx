import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const TONES = {
  error: { icon: AlertCircle, className: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200" },
  success: { icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200" },
  info: { icon: Info, className: "border-line bg-subtle text-ink" },
};

export default function Alert({ tone = "info", title, children, className = "" }) {
  const { icon: Icon, className: toneClass } = TONES[tone] || TONES.info;
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm leading-relaxed ${toneClass} ${className}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title ? <p className="font-bold">{title}</p> : null}
        <div className={title ? "mt-0.5" : ""}>{children}</div>
      </div>
    </div>
  );
}
