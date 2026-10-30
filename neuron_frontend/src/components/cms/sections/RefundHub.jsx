import { useReducedMotion } from "../../../hooks/useReducedMotion";
import {
  ArrowRight,
  Banknote,
  BellRing,
  Building2,
  CheckCircle2,
  CircleHelp,
  CreditCard,
  Mail,
  Phone,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

const STEP_ICONS = {
  Mail,
  UserCheck,
  BellRing,
  Scale,
  CreditCard,
  Banknote,
  CircleHelp,
};

function Para({ children, className = "" }) {
  return (
    <p className={`mt-4 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base ${className}`}>
      {children}
    </p>
  );
}

export default function RefundHub({ content, section }) {
  const reduce = useReducedMotion();

  const scrollToSection = (event, id) => {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const sebiTitle = content?.sebiTitle || "SEBI IA Regulation 15A Statutory Framework";
  const sebiParagraphs = content?.sebiParagraphs || [
    "Neuron Wealth Advisors LLP (hereinafter referred to as “NWA”, “we”, “us”, or “our”) is a SEBI Registered Investment Adviser (Registration No. INA000016481, BASL Membership ID: 1697). We operate strictly under the regulatory framework established by the Securities and Exchange Board of India (Investment Advisers) Regulations, 2013.",
    "Regulation 15A of the SEBI (Investment Advisers) Regulations, 2013 governs fees and charging mechanisms, establishing fiduciary standards that protect both clients and advisers. NWA charges fees strictly on an advisory retainer or hourly basis, free of any product commissions, distribution incentives, or third-party kickbacks.",
  ];

  const noLiabilityTitle = content?.noLiabilityTitle || "No Liability for Market Losses";
  const noLiabilityParagraphs = content?.noLiabilityParagraphs || [
    "Investment advisory services provided by NWA represent professional guidance and financial stewardship based on asset allocation, research, and client risk tolerance.",
    "Securities markets are subject to inherent market volatility, interest rate fluctuations, macroeconomic risks, and capital fluctuations. NWA does not guarantee any specific returns, capital preservation, or investment performance.",
    "Accordingly, fees paid for advisory services are non-refundable on the grounds of investment portfolio performance, asset depreciation, or market downturns.",
  ];

  const policyTitle = content?.policyTitle || "Standard Refund Policy & Advisory Retainer";
  const policyParagraphs = content?.policyParagraphs || [
    "Advisory retainers are billed in advance on a quarterly, half-yearly, or annual basis as mutually agreed in the written Investment Advisory Agreement.",
    "In the event of premature termination of advisory services by either the Client or the Investment Adviser, refunds shall be processed on a pro-rata basis for the unexpired portion of the billing period.",
    "All refunds are calculated after deducting applicable statutory taxes, payment gateway or banking transaction charges, and statutory breakage fees for advisory work, onboarding, and comprehensive financial planning already executed.",
  ];

  const procedureTitle = content?.procedureTitle || "Step-by-Step Refund Procedure";
  const procedureIntro =
    content?.procedureIntro ||
    "Our transparent 7-step procedure ensures compliant, auditable, and prompt processing of all eligible refund requests:";
  const steps = content?.steps || [
    {
      id: "step-1",
      step: "1",
      title: "Acknowledgment & Request Assessment",
      description:
        "Once a refund request is received and assessed, the Investment Adviser will send an email to notify the Client that the Investment Adviser has received the request.",
      tag: "Email Notification",
      icon: "Mail",
    },
    {
      id: "step-2",
      step: "2",
      title: "Direct Client Verification",
      description:
        "The Investment Adviser support team will contact the Client to confirm request or to ask for additional information if needed.",
      tag: "Support Review",
      icon: "UserCheck",
    },
    {
      id: "step-3",
      step: "3",
      title: "Formal Determination",
      description: "The Investment Adviser shall notify the Client of the approval or rejection.",
      tag: "Written Decision",
      icon: "BellRing",
    },
    {
      id: "step-4",
      step: "4",
      title: "Statutory Deductions & Breakage",
      description:
        "Refunds shall be made after deducting a cancellation fee for services already rendered or a breakage fee.",
      tag: "Statutory Breakage",
      icon: "Scale",
    },
    {
      id: "step-5",
      step: "5",
      title: "Banking Channel Disbursement",
      description:
        "If the refund request is approved, the refund will be processed through banking channel either through cheque or through IMPS/NEFT/RTGS within 5 days.",
      tag: "5-Day Window",
      icon: "CreditCard",
    },
    {
      id: "step-6",
      step: "6",
      title: "Bank Account Verification",
      description:
        "If the Client has not received a refund within 5 days of approval of refund, the Client is requested to check the bank account as it may take some time before the funds are available in the account.",
      tag: "Settlement Check",
      icon: "Banknote",
    },
    {
      id: "step-7",
      step: "7",
      title: "Escalation & Direct Assistance",
      description:
        "If the Client has followed all the instructions given, and yet to receive the refund, please contact the Investment Adviser.",
      tag: "Immediate Follow-Up",
      icon: "CircleHelp",
    },
  ];

  const timelineTitle = content?.timelineTitle || "Settlement & Processing Timeline (5 Business Days)";
  const timelineParagraphs = content?.timelineParagraphs || [
    "Approved refunds are disbursed within five (5) business days from the date of formal written approval.",
    "Disbursements are made strictly to the Client's verified primary bank account via NEFT, RTGS, or IMPS banking channels to comply with PMLA (Prevention of Money Laundering Act) and SEBI anti-money laundering guidelines. Cash refunds or third-party bank disbursements are strictly prohibited.",
  ];

  const supportTitle = content?.supportTitle || "Support, Inquiries & Escalations";
  const supportText =
    content?.supportText ||
    "For any questions regarding advisory fees, billing reconciliations, or refund status, clients may reach our dedicated compliance and support desk:";
  const supportEmail = content?.supportEmail || "connect@neuronwealth.com";
  const supportPhone = content?.supportPhone || "+91 90999 42576";
  const supportAddress =
    content?.supportAddress ||
    "Neuron Wealth Advisors LLP\n803, Mauryansh Elanza, Nr. Shyamal Cross Roads,\nSatellite, Ahmedabad-380015, Gujarat, India.";

  const navItems = [
    { id: "sebi-regulation", label: sebiTitle },
    { id: "no-liability-loss", label: noLiabilityTitle },
    { id: "standard-policy", label: policyTitle },
    { id: "refund-procedure", label: procedureTitle },
    { id: "processing-timeline", label: timelineTitle },
    { id: "contact-support", label: supportTitle },
  ];

  return (
    <section
      id={section?.design?.anchor || section?.id || "refund-hub"}
      data-cms-section={section?.id}
      className="bg-white py-12 dark:bg-[#07131e] sm:py-16 lg:py-20"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-8">
            {/* 1. SEBI 15A */}
            <article
              id="sebi-regulation"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 01
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {sebiTitle}
                  </h2>
                </div>
              </div>
              {sebiParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 2. No Liability */}
            <article
              id="no-liability-loss"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 02
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {noLiabilityTitle}
                  </h2>
                </div>
              </div>
              {noLiabilityParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 3. Standard Policy */}
            <article
              id="standard-policy"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 03
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {policyTitle}
                  </h2>
                </div>
              </div>
              {policyParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 4. Procedure Steps */}
            <article
              id="refund-procedure"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Banknote className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 04
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {procedureTitle}
                  </h2>
                </div>
              </div>
              <Para>{procedureIntro}</Para>

              <div className="mt-8 space-y-4">
                {steps.map((st) => {
                  const Icon = STEP_ICONS[st.icon] || CheckCircle2;
                  return (
                    <div
                      key={st.id || st.step}
                      className="group flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all hover:border-[#21649A]/40 hover:bg-white hover:shadow-xs dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:flex-row sm:items-start"
                    >
                      <div className="flex items-center gap-3 sm:block sm:shrink-0">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#21649A] text-xs font-bold text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                          {st.step}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-display text-base font-bold text-[#15344F] dark:text-white">
                            {st.title}
                          </h3>
                          {st.tag ? (
                            <span className="rounded-full bg-[#21649A]/10 px-2.5 py-0.5 text-[0.6875rem] font-bold text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                              {st.tag}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                          {st.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* 5. Settlement Timeline */}
            <article
              id="processing-timeline"
              className="scroll-mt-28 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-950/20 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
                    Section 05
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {timelineTitle}
                  </h2>
                </div>
              </div>
              {timelineParagraphs.map((para, i) => (
                <Para key={i} className="text-[#2d5a3f] dark:text-emerald-100/90">{para}</Para>
              ))}
            </article>

            {/* 6. Support */}
            <article
              id="contact-support"
              className="scroll-mt-28 rounded-2xl bg-[#102A40] p-6 text-white shadow-sm sm:p-8"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86]">
                Section 06
              </p>
              <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight sm:text-[1.8rem]">
                {supportTitle}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">
                {supportText}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href={`mailto:${supportEmail}`}
                  className={`flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10 ${FOCUS}`}
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60">Email Support</span>
                    <span className="text-[0.9375rem] font-semibold">{supportEmail}</span>
                  </div>
                </a>
                <a
                  href={`tel:${supportPhone.replace(/\s+/g, "")}`}
                  className={`flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10 ${FOCUS}`}
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60">Compliance Direct</span>
                    <span className="text-[0.9375rem] font-semibold">{supportPhone}</span>
                  </div>
                </a>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                <address className="whitespace-pre-line text-[0.875rem] not-italic leading-relaxed text-white/85">
                  {supportAddress}
                </address>
              </div>
            </article>
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="sticky top-28 hidden space-y-6 lg:col-span-4 lg:block">
            <div className="rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                Table of Contents
              </p>
              <nav aria-label="Refund policy sections" className="mt-4">
                <ol className="space-y-1">
                  {navItems.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => scrollToSection(event, item.id)}
                        className={`group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.8125rem] font-semibold text-[#5E6D7B] transition-colors hover:bg-[#F7F8F5] hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86] ${FOCUS}`}
                      >
                        <span className="line-clamp-1">
                          <span className="mr-2 text-[#21649A]/60 dark:text-[#8FCB86]/60">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-sm dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                    SEBI IA Regulation 15A
                  </p>
                  <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">
                    5-Day Settlement Guarantee
                  </p>
                </div>
              </div>
              <p className="mt-4 border-t border-[#DCE4E8] pt-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                Direct NEFT/RTGS banking channel disbursements under SEBI fiduciary standards.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

