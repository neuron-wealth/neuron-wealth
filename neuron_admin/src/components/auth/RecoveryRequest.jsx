import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MailCheck } from "lucide-react";
import { AuthHeading } from "../../layouts/AuthLayout/AuthLayout";
import Alert from "../ui/Alert";

const RESEND_SECONDS = 60;

export default function RecoveryRequest({ icon, title, description, steps, actionLabel, onRequest }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!cooldown) return undefined;
    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const send = async () => {
    setError("");
    setBusy(true);
    try {
      setResult(await onRequest());
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      setError(err.message || "The request could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Link to="/login" className="focus-ring muted mb-6 inline-flex items-center gap-1.5 rounded text-xs font-bold hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to Sign In
      </Link>

      <AuthHeading icon={result ? MailCheck : icon} title={result ? "Check the Recovery Inbox" : title} description={result ? null : description} />

      {result ? (
        <Alert tone="success" className="mt-6">
          A link was sent to <strong>{result.sentTo}</strong>. It expires in {result.expiresInMinutes} minutes and can be used once.
        </Alert>
      ) : (
        <ol className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-subtle text-xs font-bold text-accent ring-1 ring-line">
                {index + 1}
              </span>
              <span className="muted pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      )}

      {error ? (
        <Alert tone="error" className="mt-5">
          {error}
        </Alert>
      ) : null}

      <button type="button" onClick={send} disabled={busy || cooldown > 0} className="btn btn-primary focus-ring mt-6 h-12 w-full">
        {busy ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
            Sending…
          </>
        ) : cooldown > 0 ? (
          `Resend in ${cooldown}s`
        ) : result ? (
          "Resend Link"
        ) : (
          actionLabel
        )}
      </button>

      {result ? (
        <Link to="/login" className="btn btn-secondary focus-ring mt-3 h-11 w-full">
          Return to Sign In
        </Link>
      ) : null}
    </div>
  );
}
