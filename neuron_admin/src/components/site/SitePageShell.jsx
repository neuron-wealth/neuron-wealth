import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Globe2, RotateCcw, Save } from "lucide-react";
import Alert from "../ui/Alert";
import { Skeleton } from "../ui/Skeleton";

export default function SitePageShell({ title, description, icon: Icon = Globe2, tone, state, resetLabel, resetConfirm, preview, children }) {
  const { draft, error, saving, dirty, save, discard, reset, reload } = state;
  const [showPreview, setShowPreview] = useState(true);
  const withPreview = Boolean(preview) && showPreview;

  return (
    <div className="pb-24">
      <header className="panel rise-in rounded-2xl p-5 sm:p-6">
        <Link to="/website/cms" className="focus-ring muted inline-flex items-center gap-1.5 rounded-md text-xs font-bold hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All Pages
        </Link>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${
                tone || "from-accent to-accent-deep"
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">
                  Every Page
                </span>
              </div>
              <p className="muted mt-1 text-sm">{description}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {preview ? (
              <button
                type="button"
                onClick={() => setShowPreview((value) => !value)}
                className="btn btn-secondary focus-ring hidden h-10 px-4 xl:inline-flex"
                aria-pressed={showPreview}
              >
                {showPreview ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            ) : null}
            {draft && resetConfirm ? (
              <button type="button" onClick={() => reset(resetConfirm)} disabled={saving} className="btn btn-secondary focus-ring h-10 px-4">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {resetLabel || "Restore Original"}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {error ? (
        <Alert tone="error" className="mt-5">
          {error}{" "}
          <button type="button" onClick={reload} className="font-bold underline">
            Try again
          </button>
        </Alert>
      ) : null}

      {!draft && !error ? (
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <p className="sr-only">Loading settings</p>
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-72 rounded-2xl" />
          </div>
          <Skeleton className="hidden h-[60vh] rounded-2xl xl:block" />
        </div>
      ) : null}

      {draft ? (
        <div className={`mt-5 grid items-start gap-5 ${withPreview ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" : ""}`}>
          <div className="min-w-0 space-y-4">{children}</div>
          {withPreview ? <div className="min-w-0 xl:sticky xl:top-20">{preview}</div> : null}
        </div>
      ) : null}

      {dirty ? (
        <div className="sticky bottom-4 z-20 mt-6">
          <div className="menu-panel rise-in flex flex-col gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle" aria-hidden="true" />
              Unsaved changes. The website updates after you save.
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={discard} disabled={saving} className="btn btn-secondary focus-ring h-10 px-4">
                Discard
              </button>
              <button type="button" onClick={save} disabled={saving} className="btn btn-primary focus-ring h-10 px-5">
                <Save className="h-4 w-4" aria-hidden="true" />
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
