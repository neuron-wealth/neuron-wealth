import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import AuthLayout, { AuthHeading } from "../../layouts/AuthLayout/AuthLayout";
import Alert from "../../components/ui/Alert";
import { PasswordField, SubmitButton, TextField } from "../../components/ui/Field";
import { login } from "../../services/authService";
import { setToken } from "../../services/api";
import { setFlash } from "../../context/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("identifier"); // "identifier" | "password"
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  // Auto-focus the active step input
  useEffect(() => {
    if (step === "identifier") {
      identifierRef.current?.focus();
      identifierRef.current?.select();
    } else if (step === "password") {
      passwordRef.current?.focus();
    }
  }, [step]);

  // Handle Step 1: Username / Email submission
  const handleIdentifierSubmit = (event) => {
    event.preventDefault();
    setError("");

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your username or email.");
      identifierRef.current?.focus();
      return;
    }

    setStep("password");
  };

  // Handle Step 2: Password submission & login
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter your password.");
      passwordRef.current?.focus();
      return;
    }

    setBusy(true);
    try {
      const data = await login(identifier.trim(), password);
      setToken(data.token);
      setFlash(`Welcome back, ${data.admin?.name || "Admin"}.`, "success");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Sign in failed. Please check your password and try again.");
      passwordRef.current?.focus();
      passwordRef.current?.select();
    } finally {
      setBusy(false);
    }
  };

  const handleBackToIdentifier = () => {
    setStep("identifier");
    setPassword("");
    setError("");
  };

  return (
    <AuthLayout>
      {step === "identifier" ? (
        <form onSubmit={handleIdentifierSubmit} noValidate>
          <AuthHeading title="Admin Login" description="Welcome back. Please sign in to continue." />

          <TextField
            ref={identifierRef}
            id="identifier"
            label="Username or Email"
            icon={UserRound}
            autoComplete="username"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              if (error) setError("");
            }}
            placeholder="Enter your username or email"
            className="mt-8"
            autoFocus
          />

          <div className="mt-1.5 text-right">
            <Link to="/forgot-username" className="focus-ring rounded text-xs font-semibold text-accent hover:underline">
              Forgot username?
            </Link>
          </div>

          {error ? (
            <Alert tone="error" className="mt-4">
              {error}
            </Alert>
          ) : null}

          <SubmitButton className="mt-6 flex items-center justify-center gap-2">
            <span>Next</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SubmitButton>

          <p className="muted mt-6 text-center text-xs">Authorized personnel only.</p>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} noValidate>
          {/* Hidden username field for browser password managers */}
          <input type="hidden" name="username" value={identifier} autoComplete="username" />

          <AuthHeading title="Welcome back" description="Please enter your password to continue." />

          {/* Account chip showing who is logging in with Change button */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-line bg-surface-subtle px-3.5 py-2.5 transition-colors">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <UserRound className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="truncate text-sm font-semibold text-ink" title={identifier}>
                {identifier}
              </span>
            </div>
            <button
              type="button"
              onClick={handleBackToIdentifier}
              className="focus-ring shrink-0 rounded text-xs font-semibold text-accent hover:underline"
            >
              Change
            </button>
          </div>

          <PasswordField
            ref={passwordRef}
            id="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            placeholder="Enter your password"
            className="mt-4"
            autoFocus
          />

          <div className="mt-1.5 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToIdentifier}
              className="focus-ring inline-flex items-center gap-1 rounded text-xs font-medium text-soft hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back</span>
            </button>
            <Link to="/forgot-password" className="focus-ring rounded text-xs font-semibold text-accent hover:underline">
              Forgot password?
            </Link>
          </div>

          {error ? (
            <Alert tone="error" className="mt-4">
              {error}
            </Alert>
          ) : null}

          <SubmitButton busy={busy} busyLabel="Signing in…" className="mt-6">
            Sign In
          </SubmitButton>

          <p className="muted mt-6 text-center text-xs">Authorized personnel only.</p>
        </form>
      )}
    </AuthLayout>
  );
}
