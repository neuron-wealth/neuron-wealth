import { CheckCircle2 } from "lucide-react";

const highlights = ["Client enquiry tracking", "Career applications", "Dashboard and settings"];

export default function AuthLayout({ children }) {
  return (
    <main className="grid min-h-screen bg-surface md:grid-cols-[3fr_2fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-brand-navy text-white md:flex md:flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#21649A] via-[#15344F] to-[#071321]" aria-hidden="true" />
        <img
          src="/images/simplifying-financial-life.jpg"
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 h-[86%] w-[58%] object-contain object-right-bottom mix-blend-screen"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0B1E30] from-[22%] via-[#0B1E30]/90 via-[48%] to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-screen flex-col justify-between px-10 py-8 xl:px-14">
          <img src="/logo.png" alt="Neuron Wealth Advisors LLP" className="h-11 w-auto self-start rounded-lg bg-white px-3 py-1.5" />

          <div className="max-w-md pb-6">
            <h1 className="max-w-sm text-[2.125rem] font-bold leading-[1.15] tracking-tight xl:text-[2.5rem]">
              Welcome to Neuron Wealth Admin
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
              Your control center for client enquiries and career applications.
            </p>
            <ul className="mt-8 space-y-3.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#8EE07A]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/65">SEBI Registered Investment Adviser · INA000016481</p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="rise-in w-full max-w-[400px]">
          <img src="/logo.png" alt="Neuron Wealth Advisors LLP" className="mb-8 h-10 w-auto rounded-md bg-white px-2 py-1 md:hidden" />
          {children}
        </div>
      </section>
    </main>
  );
}

export function AuthHeading({ icon: Icon, title, description }) {
  return (
    <div>
      {Icon ? (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      ) : null}
      <h2 className="text-[1.75rem] font-bold tracking-tight">{title}</h2>
      {description ? <p className="muted mt-1.5 text-sm leading-relaxed">{description}</p> : null}
    </div>
  );
}
