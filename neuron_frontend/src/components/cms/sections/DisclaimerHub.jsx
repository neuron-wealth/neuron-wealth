import { useReducedMotion } from "../../../hooks/useReducedMotion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Globe,
  Scale,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";

function Para({ children, className = "" }) {
  return (
    <p className={`mt-4 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base ${className}`}>
      {children}
    </p>
  );
}

export default function DisclaimerHub({ content, section }) {
  const reduce = useReducedMotion();

  const scrollToSection = (event, id) => {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const termsTitle = content?.termsTitle || "Terms of Use & Binding Agreement";
  const termsParagraphs = content?.termsParagraphs || [
    "By accessing or using the website of Neuron Wealth Advisors LLP (hereinafter referred to as “NWA”, “we”, “us”, or “our”), you acknowledge that you have read, understood, and agreed to be bound by the terms, conditions, disclaimers, and notices contained herein.",
    "If you do not agree to these terms, please refrain from using or accessing this website. Your continued use of the website signifies your acceptance of any revisions or modifications to these terms.",
  ];

  const educationalTitle = content?.educationalTitle || "Financial Literacy & Educational Purpose (No Offer)";
  const educationalParagraphs = content?.educationalParagraphs || [
    "All materials, commentary, analyses, data, charts, calculators, and content published on this website are intended solely for financial literacy, educational awareness, and general informational purposes.",
    "Nothing contained on this website constitutes, or should be construed as, an offer to sell, a solicitation of an offer to buy, or a recommendation to purchase, hold, or divest any security, mutual fund, derivative, or financial product.",
    "Accessing this website or reviewing its content does not establish an Investment Adviser-Client relationship between you and Neuron Wealth Advisors LLP. Such a fiduciary relationship is formed strictly upon execution of a formal, written Advisory Agreement and completion of mandatory Know Your Customer (KYC) and Risk Profiling procedures.",
  ];

  const accuracyTitle = content?.accuracyTitle || "Accuracy of Information & Professional Advice";
  const accuracyParagraphs = content?.accuracyParagraphs || [
    "While NWA exercises reasonable care and diligence in preparing and curating content on this website from sources believed to be authentic and reliable, we make no representations or warranties, express or implied, regarding the accuracy, completeness, timeliness, or suitability of the information.",
    "Tax laws, regulatory guidelines, and financial market dynamics are subject to change without notice. Visitors are strongly advised to seek independent legal, tax, accounting, and financial advice tailored to their specific circumstances before making any investment decisions.",
  ];

  const liabilityTitle = content?.liabilityTitle || "Limitation of Liability";
  const liabilityParagraphs = content?.liabilityParagraphs || [
    "To the fullest extent permitted by applicable Indian law, Neuron Wealth Advisors LLP, its designated partners, employees, advisors, affiliates, and representatives shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages or financial loss.",
    "This includes, but is not limited to, loss of profits, capital depreciation, loss of data, business interruption, or damages arising out of the use of, or inability to use, this website, even if NWA has been advised of the possibility of such damages.",
  ];

  const functionalityTitle = content?.functionalityTitle || "Website Functionality & Third-Party Links";
  const functionalityParagraphs = content?.functionalityParagraphs || [
    "NWA does not warrant that this website, its servers, or electronic communications sent from us will be uninterrupted, error-free, secure, or free from viruses, malware, or other potentially harmful components.",
    "This website may contain hyperlinks to external third-party websites (including SEBI, BSE, NSE, AMFI, or regulatory authorities) for reference convenience. NWA has no control over, and assumes no responsibility for, the content, privacy practices, accuracy, or availability of third-party platforms.",
  ];

  const risksTitle = content?.risksTitle || "Market & Investment Risks";
  const risksParagraphs = content?.risksParagraphs || [
    "Investments in securities markets are subject to market risks, including the potential loss of principal capital. Investors must read all relevant scheme documents, offer documents, risk disclosure documents, and investment mandates carefully before investing.",
    "Past performance of any investment strategy, asset class, index, or historical portfolio simulation is not an indicator, guarantee, or predictor of future returns. Asset allocation and diversification strategies do not ensure a profit or protect against loss in declining markets.",
  ];

  const statutoryTitle = content?.statutoryTitle || "SEBI & BASL Statutory Disclosures";
  const statutoryParagraphs = content?.statutoryParagraphs || [
    "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser with Registration No. INA000016481 (Validity: Perpetual, Date of Registration: Dec 20, 2021) and a member of BSE Administration & Supervision Ltd. (BASL Membership ID: 1697).",
    "Registration granted by SEBI, membership of BASL, and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
  ];

  const navItems = [
    { id: "terms-of-use", label: termsTitle },
    { id: "educational-purpose", label: educationalTitle },
    { id: "accuracy-of-info", label: accuracyTitle },
    { id: "limitation-of-liability", label: liabilityTitle },
    { id: "functionality-links", label: functionalityTitle },
    { id: "market-risks", label: risksTitle },
    { id: "regulatory-non-guarantee", label: statutoryTitle },
  ];

  return (
    <section
      id={section?.design?.anchor || section?.id || "disclaimer-hub"}
      data-cms-section={section?.id}
      className="bg-white py-12 dark:bg-[#07131e] sm:py-16 lg:py-20"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-8">
            {/* 1. Terms */}
            <article
              id="terms-of-use"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 01
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {termsTitle}
                  </h2>
                </div>
              </div>
              {termsParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 2. Educational */}
            <article
              id="educational-purpose"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 02
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {educationalTitle}
                  </h2>
                </div>
              </div>
              {educationalParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 3. Accuracy */}
            <article
              id="accuracy-of-info"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 03
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {accuracyTitle}
                  </h2>
                </div>
              </div>
              {accuracyParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 4. Liability */}
            <article
              id="limitation-of-liability"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 04
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {liabilityTitle}
                  </h2>
                </div>
              </div>
              {liabilityParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 5. Functionality */}
            <article
              id="functionality-links"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Globe className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 05
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {functionalityTitle}
                  </h2>
                </div>
              </div>
              {functionalityParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 6. Market Risks */}
            <article
              id="market-risks"
              className="scroll-mt-28 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm dark:border-amber-500/20 dark:bg-amber-950/20 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                  <TrendingDown className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
                    Section 06
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.8rem]">
                    {risksTitle}
                  </h2>
                </div>
              </div>
              {risksParagraphs.map((para, i) => (
                <Para key={i} className="text-[#6c584c] dark:text-amber-100/90">{para}</Para>
              ))}
            </article>

            {/* 7. Statutory */}
            <article
              id="regulatory-non-guarantee"
              className="scroll-mt-28 rounded-2xl bg-[#102A40] p-6 text-white shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8FCB86]">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86]">
                    Section 07
                  </p>
                  <h2 className="font-display text-[1.5rem] font-medium leading-tight tracking-tight sm:text-[1.8rem]">
                    {statutoryTitle}
                  </h2>
                </div>
              </div>
              {statutoryParagraphs.map((para, i) => (
                <p key={i} className="mt-4 text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">
                  {para}
                </p>
              ))}
            </article>
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="sticky top-28 hidden space-y-6 lg:col-span-4 lg:block">
            <div className="rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                Table of Contents
              </p>
              <nav aria-label="Disclaimer sections" className="mt-4">
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
                    SEBI RIA &amp; BASL
                  </p>
                  <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">
                    INA000016481 · BASL 1697
                  </p>
                </div>
              </div>
              <p className="mt-4 border-t border-[#DCE4E8] pt-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                100% Fee-Only Fiduciary. We do not distribute financial products or receive commissions.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

