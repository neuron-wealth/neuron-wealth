import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AtSign, Check, KeyRound, Link2Off, X } from "lucide-react";
import AuthLayout, { AuthHeading } from "../../layouts/AuthLayout/AuthLayout";
import Alert from "../../components/ui/Alert";
import { Skeleton } from "../../components/ui/Skeleton";
import { PasswordField, SubmitButton, TextField } from "../../components/ui/Field";
import { completeReset, verifyResetToken } from "../../services/authService";
import { clearToken } from "../../services/api";
import { setFlash } from "../../context/ToastContext";

function Requirement({ met, children }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${met ? "text-emerald-700 dark:text-emerald-300" : "muted"}`}>
      {met ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </li>
  );
}

function PasswordForm({ busy, onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const rules = [
    { met: password.length >= 10, label: "At least 10 characters" },
    { met: /[A-Za-z]/.test(password) && /\d/.test(password), label: "At least one letter and one number" },
    { met: password.length > 0 && password === confirm, label: "Both passwords match" },
  ];
  const valid = rules.every((rule) => rule.met);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (valid) onSubmit({ password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8">
      <PasswordField id="new-password" label="New Password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <PasswordField id="confirm-password" label="Confirm New Password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="mt-4" />
      <ul className="mt-4 space-y-1.5" aria-label="Password requirements">
        {rules.map((rule) => (
          <Requirement key={rule.label} met={rule.met}>
            {rule.label}
          </Requirement>
        ))}
      </ul>
      <SubmitButton busy={busy} disabled={!valid} busyLabel="Saving…" className="mt-6">
        Set New Password
      </SubmitButton>
    </form>
  );
}

function UsernameForm({ current, busy, onSubmit }) {
  const [username, setUsername] = useState("");
  const value = username.trim().toLowerCase();
  const valid = /^[a-z0-9._-]{3,32}$/.test(value) && value !== current;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (valid) onSubmit({ username: value });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8">
      <div className="rounded-xl border border-line bg-subtle px-4 py-3 text-sm">
        <span className="muted">Current username: </span>
        <strong>{current}</strong>
      </div>
      <TextField
        id="new-username"
        label="New Username"
        icon={AtSign}
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        hint="3 to 32 characters: lowercase letters, numbers, dots, dashes or underscores."
        className="mt-5"
      />
      <SubmitButton busy={busy} disabled={!valid} busyLabel="Saving…" className="mt-6">
        Set New Username
      </SubmitButton>
    </form>
  );
}

export default function ResetCredentials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, setState] = useState({ status: token ? "checking" : "invalid", purpose: "", username: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return undefined;
    let active = true;
    verifyResetToken(token)
      .then((data) => active && setState({ status: "ready", purpose: data.purpose, username: data.username }))
      .catch((err) => active && setState({ status: "invalid", purpose: "", username: "", message: err.message }));
    return () => {
      active = false;
    };
  }, [token]);

  const submit = async (values) => {
    setError("");
    setBusy(true);
    try {
      const result = await completeReset({ token, ...values });
      clearToken();
      setFlash(result.message, "success");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "The change could not be saved.");
      setBusy(false);
    }
  };

  return (
    <AuthLayout>
      {state.status === "checking" ? (
        <div>
          <p className="sr-only">Checking reset link</p>
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <Skeleton className="mt-4 h-8 w-56" />
          <Skeleton className="mt-3 h-4 w-72 max-w-full" />
          <Skeleton className="mt-8 h-12 w-full" />
        </div>
      ) : null}

      {state.status === "invalid" ? (
        <div>
          <AuthHeading icon={Link2Off} title="Link Not Valid" description={state.message || "This reset link is missing, invalid or has expired."} />
          <div className="mt-8 grid gap-3">
            <Link to="/forgot-password" className="btn btn-primary focus-ring h-12">
              Request a New Password Link
            </Link>
            <Link to="/forgot-username" className="btn btn-secondary focus-ring h-11">
              Request a New Username Link
            </Link>
            <Link to="/login" className="focus-ring muted mt-2 rounded text-center text-xs font-bold hover:text-ink">
              Back to Sign In
            </Link>
          </div>
        </div>
      ) : null}

      {state.status === "ready" ? (
        <div>
          <AuthHeading
            icon={state.purpose === "password" ? KeyRound : AtSign}
            title={state.purpose === "password" ? "Set a New Password" : "Change Username"}
            description="After saving, every signed-in session is signed out and a confirmation email is sent to the recovery inbox."
          />
          {error ? (
            <Alert tone="error" className="mt-5">
              {error}
            </Alert>
          ) : null}
          {state.purpose === "password" ? (
            <PasswordForm busy={busy} onSubmit={submit} />
          ) : (
            <UsernameForm current={state.username} busy={busy} onSubmit={submit} />
          )}
        </div>
      ) : null}
    </AuthLayout>
  );
}
