import { useState } from "react";
import { AtSign, Check, Info, KeyRound, Moon, Palette, Send, Settings as SettingsIcon, ShieldCheck, Sun } from "lucide-react";
import Alert from "../../components/ui/Alert";
import { ACCENTS, useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { requestPasswordReset, requestUsernameReminder } from "../../services/authService";
import EmailNotifications from "./EmailNotifications";

function PanelHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-line px-5 py-4 sm:px-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="muted mt-0.5 text-sm">{description}</p>
      </div>
    </div>
  );
}

// A miniature console so each mode can be judged at a glance.
function ModePreview({ dark }) {
  const shell = dark ? "bg-[#0B1724]" : "bg-[#F1F4F7]";
  const card = dark ? "bg-[#132739]" : "bg-white";
  const line = dark ? "bg-white/15" : "bg-[#DCE4E8]";
  return (
    <span aria-hidden="true" className={`flex h-24 w-full overflow-hidden rounded-lg ${shell}`}>
      <span className="w-1/4 bg-[#102A40] p-2">
        <span className="block h-1.5 w-3/4 rounded-full bg-white/40" />
        <span className="mt-2 block h-1.5 w-1/2 rounded-full bg-white/20" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-white/20" />
      </span>
      <span className="flex-1 space-y-1.5 p-2.5">
        <span className={`block h-2 w-1/3 rounded-full ${line}`} />
        <span className={`block h-10 rounded-md ${card} p-1.5`}>
          <span className="block h-1.5 w-1/2 rounded-full bg-accent" />
          <span className={`mt-1.5 block h-1.5 w-3/4 rounded-full ${line}`} />
        </span>
        <span className={`block h-1.5 w-2/3 rounded-full ${line}`} />
      </span>
    </span>
  );
}

function Appearance() {
  const { mode, accent, setMode, setAccent } = useTheme();
  const { push } = useToast();

  const chooseMode = (next) => {
    setMode(next);
    push(next === "dark" ? "Dark mode on." : "Light mode on.", "success");
  };
  const chooseAccent = (item) => {
    setAccent(item.id);
    push(`${item.label} theme applied.`, "success");
  };

  return (
    <section className="panel overflow-hidden rounded-2xl" aria-labelledby="appearance-heading">
      <PanelHeader icon={Palette} title={<span id="appearance-heading">Appearance</span>} description="How this console looks on this device." />
      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <p className="field-label">Mode</p>
          <div className="mt-2.5 grid grid-cols-2 gap-3" role="group" aria-label="Mode">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
            ].map(({ id, label, icon: Icon }) => {
              const active = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseMode(id)}
                  className={`focus-ring rounded-xl border-2 p-2 text-left transition-colors ${active ? "border-accent" : "border-line hover:border-[var(--accent-soft)]"}`}
                >
                  <ModePreview dark={id === "dark"} />
                  <span className="mt-2 flex items-center justify-between px-1 pb-0.5 text-sm font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </span>
                    {active ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="field-label">Accent Colour</p>
          <div className="mt-2.5 grid grid-cols-3 gap-3" role="group" aria-label="Accent colour">
            {ACCENTS.map((item) => {
              const active = accent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseAccent(item)}
                  className={`focus-ring flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-3.5 text-sm font-bold transition-colors ${
                    active ? "border-accent bg-[var(--accent-soft)]" : "border-line hover:bg-subtle"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm" style={{ background: item.color }}>
                    {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecoveryAction({ id, icon: Icon, title, description, label, onRequest, onResult, busy, setBusy }) {
  const send = async () => {
    setBusy(id);
    try {
      onResult({ tone: "success", text: (await onRequest()).message });
    } catch (err) {
      onResult({ tone: "error", text: err.message });
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="rounded-xl border border-line p-4 transition-colors hover:bg-subtle">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-subtle text-accent">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold">{title}</p>
          <p className="muted mt-0.5 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
      <button type="button" onClick={send} disabled={Boolean(busy)} className="btn btn-secondary focus-ring mt-3.5 h-10 w-full justify-center px-4">
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        {busy === id ? "Sending…" : label}
      </button>
    </div>
  );
}

function AccountSecurity() {
  const { push } = useToast();
  const [busy, setBusy] = useState("");
  const [result, setResult] = useState(null);

  const handleResult = (next) => {
    setResult(next);
    push(next.text, next.tone);
  };

  return (
    <section className="panel overflow-hidden rounded-2xl" aria-labelledby="security-heading">
      <PanelHeader
        icon={ShieldCheck}
        title={<span id="security-heading">Account Security</span>}
        description="Changes are made through a single-use link emailed to the recovery inbox."
      />
      <div className="space-y-3 p-5 sm:p-6">
        <RecoveryAction
          id="password"
          icon={KeyRound}
          title="Change Password"
          description="Email a password reset link. The link expires in 30 minutes."
          label="Email Reset Link"
          onRequest={requestPasswordReset}
          onResult={handleResult}
          busy={busy}
          setBusy={setBusy}
        />
        <RecoveryAction
          id="username"
          icon={AtSign}
          title="Change Username"
          description="Email the current username with a link to change it."
          label="Email Username Link"
          onRequest={requestUsernameReminder}
          onResult={handleResult}
          busy={busy}
          setBusy={setBusy}
        />
        {result ? <Alert tone={result.tone}>{result.text}</Alert> : null}
        <p className="muted flex items-start gap-2 pt-1 text-xs leading-relaxed">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Completing a change signs out every active session.
        </p>
      </div>
    </section>
  );
}

export default function Settings() {
  return (
    <div className="max-w-6xl">
      <section className="panel relative overflow-hidden rounded-2xl">
        <div className="relative overflow-hidden bg-gradient-to-r from-accent-deep via-accent to-accent-deep px-5 py-6 text-white sm:px-7 sm:py-7">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute right-24 top-8 h-20 w-20 rounded-full bg-[#54B848]/25" aria-hidden="true" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <SettingsIcon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="mt-0.5 text-sm text-white/80">Appearance and account security for this console.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Appearance />
        </div>
        <div className="lg:col-span-2">
          <AccountSecurity />
        </div>
      </div>

      <div className="mt-5">
        <EmailNotifications />
      </div>
    </div>
  );
}
