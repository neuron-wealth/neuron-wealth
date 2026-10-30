import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, AtSign, BadgeCheck, Building2, Check, Copy, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { initialOf } from "../../utils/format";

const FIRM = { name: "Neuron Wealth Advisors LLP", registration: "INA000016481", type: "SEBI Registered Investment Adviser" };

function CopyButton({ value, label }) {
  const { push } = useToast();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      push("Copy is not available in this browser.", "error");
    }
  }

  return (
    <button type="button" onClick={copy} className="icon-btn focus-ring h-8 w-8 shrink-0 border border-line" aria-label={`Copy ${label}`} title={`Copy ${label}`}>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
    </button>
  );
}

function DetailRow({ icon: Icon, label, value, copy }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="muted text-xs font-semibold uppercase tracking-wide">{label}</dt>
        <dd className="mt-0.5 break-all text-sm font-bold">{value || "—"}</dd>
      </div>
      {copy && value ? <CopyButton value={value} label={label.toLowerCase()} /> : null}
    </div>
  );
}

function ProfileHeader({ admin }) {
  return (
    <section className="panel overflow-hidden rounded-2xl">
      <div className="relative h-28 overflow-hidden bg-gradient-to-r from-accent-deep via-accent to-accent-deep sm:h-32" aria-hidden="true">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute right-24 top-10 h-24 w-24 rounded-full bg-[#54B848]/25" />
      </div>
      <div className="relative px-5 pb-6 sm:px-7">
        {admin ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <span className="relative z-10 -mt-12 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-[var(--surface)] bg-accent text-4xl font-bold text-white shadow-lg">
                {initialOf(admin.name)}
              </span>
              <div className="min-w-0 sm:pb-1">
                <h2 className="truncate text-2xl font-bold tracking-tight">{admin.name}</h2>
                <p className="muted mt-0.5 text-sm">@{admin.username}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:pb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Administrator
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Active
              </span>
            </div>
          </div>
        ) : (
          <div>
            <p className="sr-only">Loading profile</p>
            <Skeleton className="relative z-10 -mt-12 h-24 w-24 rounded-2xl" />
            <Skeleton className="mt-4 h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>
        )}
      </div>
    </section>
  );
}

export default function Profile() {
  const { admin } = useOutletContext();

  return (
    <div className="max-w-6xl">
      <h1 className="sr-only">My Profile</h1>
      <ProfileHeader admin={admin} />

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="panel overflow-hidden rounded-2xl lg:col-span-2 lg:self-start" aria-labelledby="account-details-heading">
          <div className="flex items-center gap-2 border-b border-line px-5 py-4 sm:px-6">
            <UserRound className="h-4 w-4 text-accent" aria-hidden="true" />
            <h2 id="account-details-heading" className="font-bold">
              Account Details
            </h2>
          </div>
          {admin ? (
            <dl className="divide-y divide-line">
              <DetailRow icon={UserRound} label="Full Name" value={admin.name} />
              <DetailRow icon={AtSign} label="Username" value={admin.username} copy />
              <DetailRow icon={Mail} label="Email" value={admin.email} copy />
            </dl>
          ) : (
            <div className="space-y-4 p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
        </section>

        <div className="flex flex-col gap-5">
          <section className="panel rounded-2xl p-5 sm:p-6" aria-labelledby="security-heading">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
              <KeyRound className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 id="security-heading" className="mt-4 font-bold">
              Password and Username
            </h2>
            <p className="muted mt-1 text-sm">Changes are made through a secure link emailed to the recovery inbox.</p>
            <Link to="/settings" className="btn btn-primary focus-ring mt-5 h-10 w-full justify-center px-4">
              Account Security
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="panel rounded-2xl p-5 sm:p-6" aria-labelledby="firm-heading">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" aria-hidden="true" />
              <h2 id="firm-heading" className="font-bold">
                Firm Registration
              </h2>
            </div>
            <p className="mt-4 text-sm font-bold">{FIRM.name}</p>
            <p className="muted text-xs">{FIRM.type}</p>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-subtle px-4 py-3">
              <div className="min-w-0">
                <p className="muted text-xs font-semibold uppercase tracking-wide">SEBI Registration</p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-sm font-bold">
                  <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {FIRM.registration}
                </p>
              </div>
              <CopyButton value={FIRM.registration} label="registration number" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
