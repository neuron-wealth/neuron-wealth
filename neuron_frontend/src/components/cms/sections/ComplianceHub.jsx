import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import {
  ShieldCheck,
  ExternalLink,
  Building2,
  Scale,
  UserCheck,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const SECTIONS_NAV = [
  { id: "about-nwa", label: "1. About Neuron Wealth Advisors" },
  { id: "sebi-ria-registration", label: "2. SEBI RIA Registration" },
  { id: "bse-asl-membership", label: "3. BSE ASL Membership" },
  { id: "disclaimer", label: "4. Disclaimer" },
  { id: "investor-charter", label: "5. Investor Charter" },
  { id: "code-of-conduct", label: "6. Code of Conduct" },
  { id: "functions-of-ia", label: "7. Functions of Investment Adviser" },
  { id: "risks", label: "8. Risks" },
  { id: "conflict-of-interest", label: "9. Conflict of Interest" },
  { id: "annual-audit", label: "10. Annual Audit" },
  { id: "grievance-redressal", label: "11. Grievance Redressal" },
  { id: "complaints-status", label: "12. Disciplinary & Complaints" },
  { id: "holdings-disclosure", label: "13. Disclosure of Holdings" },
  { id: "officers-details", label: "14. Key Officers & Contact" },
];

function SmartLink({ link, fallbackLabel, fallbackHref, className }) {
  const label = link?.label || fallbackLabel;
  const href = link?.href || fallbackHref;
  if (!label || !href) return null;

  const isExternal = href.startsWith("http://") || href.startsWith("https://") || link?.newTab;

  if (isExternal) {
    return (
      <a
        href={href}
        target={link?.newTab ? "_blank" : undefined}
        rel={link?.newTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        <span className="italic">{label}</span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      <span className="italic">{label}</span>
      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
    </Link>
  );
}

function CertificateModal({ image, onClose }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    imageRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Certificate"}
      className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-[#07131F]/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <img
        ref={imageRef}
        tabIndex={-1}
        src={image.url}
        alt={image.alt || ""}
        className="max-h-full max-w-full cursor-default rounded-lg bg-white object-contain shadow-2xl outline-none sm:max-w-[min(92vw,960px)]"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

export default function ComplianceHub({ id, content, design, root }) {
  const reduce = useReducedMotion();
  const [certificate, setCertificate] = useState(null);
  const closeCertificate = useCallback(() => setCertificate(null), []);

  const scrollToSection = (e, targetId) => {
    e?.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  // 1. About
  const aboutTitle = content?.aboutTitle || "About Neuron Wealth Advisors LLP";
  const aboutText =
    content?.aboutText ||
    "Neuron Wealth Advisors LLP (NWA) is a SEBI Registered Investment Adviser (RIA) with registration number INA000016481. We are located at 803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad 380015, Gujarat, India. We are a team of experts in the finance and investments and we provide holistic investment and wealth management advisory services.";
  const aboutLink = content?.aboutLink;

  // 2. SEBI RIA Registration
  const riaTitle = content?.riaTitle || "SEBI RIA Registration Certificate";
  const riaText =
    content?.riaText ||
    "Neuron Wealth Advisors LLP holds the Certificate of Registration as Investment Adviser issued by the Securities and Exchange Board of India (SEBI), Registration No. INA000016481. The registration was granted on Dec 20, 2021 and has perpetual validity.";
  const riaLinkLabel = content?.riaLinkLabel || "Please click here to view the SEBI RIA Registration Certificate.";
  const riaCertificate = content?.riaCertificate?.url
    ? content.riaCertificate
    : { url: "/images/SEBI RIA Registration Certificate.jpg", alt: "SEBI RIA Registration Certificate - Neuron Wealth Advisors LLP" };

  // 3. BSE ASL Membership
  const bseTitle = content?.bseTitle || "BSE ASL Membership";
  const bseText =
    content?.bseText ||
    "Neuron Wealth Advisors LLP holds the Certificate of Membership as Investment Adviser issued by BSE Administration & Supervision Ltd. (BASL), Membership ID 1697.";
  const bseLinkLabel = content?.bseLinkLabel || "Please click here to view the BSE ASL Membership Certificate.";
  const bseCertificate = content?.bseCertificate?.url
    ? content.bseCertificate
    : { url: "/images/BSE ASL Membership.jpg", alt: "BSE ASL Membership Certificate - Neuron Wealth Advisors LLP" };

  // 4. Disclaimer
  const disclaimerTitle = content?.disclaimerTitle || "Disclaimer:";
  const disclaimerParagraphs = Array.isArray(content?.disclaimerParagraphs) && content.disclaimerParagraphs.length > 0
    ? content.disclaimerParagraphs
    : [
        "All the information is for the consumption by the clients of NWA only and such material should not be redistributed.",
        "Investments in securities market, are subject to market risks. Investors are advised to read all scheme related documents and other relevant information carefully before making any investment.",
        "Registration granted by SEBI (INA000016481), membership of BASL (1697) and certification from NISM in no way guarantee performance of Neuron Wealth Advisors LLP or provide any assurance of returns to investors.",
      ];
  const disclaimerLink = content?.disclaimerLink;

  // 5. Investor Charter
  const charterTitle = content?.charterTitle || "Investor Charter";
  const charterText =
    content?.charterText ||
    "The Investor Charter, inter alia, includes the vision and mission statement, rights and responsibilities of investors, investor grievance redressal mechanism and Do’s and Don'ts for investing in securities market. The Investor Charter also gives a broader perspective of various rights and responsibilities of investors.";
  const charterLink = content?.charterLink;

  // 6. Code of Conduct
  const codeTitle = content?.codeTitle || "Code of Conduct";
  const sebiCodeText =
    content?.sebiCodeText ||
    "NWA follows the code of conduct in accordance with the third schedule of IA Regulations 15(9) of the IA Regulations which covers the Code of conduct for investment adviser.";
  const sebiCodeLink = content?.sebiCodeLink;
  const cfaCodeText =
    content?.cfaCodeText ||
    "NWA also follows the CFA Code of Ethics and Professional Conduct.";
  const cfaCodeLink = content?.cfaCodeLink;

  // 7. Functions of Investment Adviser
  const functionsTitle = content?.functionsTitle || "Functions of Investment Adviser";
  const functionsText =
    content?.functionsText ||
    "As an Investment Adviser, NWA carries out its functions, obligations, duties and responsibilities in accordance with the SEBI (Investment Advisers) Regulations, 2013.";
  const functionsLink = content?.functionsLink;

  // 8. Risks
  const risksTitle = content?.risksTitle || "Risks";
  const risksText =
    content?.risksText ||
    "The value of the investments and the expected returns affected generally by various risk factors that affect financial and securities market, such as price and volume, volatility in interest rates, currency exchange rates, changes in regulatory and administrative policies of the Government or any other appropriate authority (including tax laws) or other political, economic, and other developments.";
  const risksLink = content?.risksLink;

  // 9. Conflict of Interest
  const conflictTitle = content?.conflictTitle || "Conflict of Interest";
  const conflictText =
    content?.conflictText ||
    "NWA shall try to avoid conflicts of interest as far as possible and when they cannot be avoided, it shall ensure that appropriate disclosures are made to the clients and that the clients are fairly treated.";
  const conflictLink = content?.conflictLink;

  // 10. Annual Audit
  const auditTitle = content?.auditTitle || "Annual Audit";
  const auditNote =
    content?.auditNote ||
    "Please contact us if you like to view the detailed Audit report with Annexures.";
  const auditRecords = Array.isArray(content?.auditRecords) ? content.auditRecords : [];

  // 11. Grievance Redressal
  const grievanceTitle = content?.grievanceTitle || "Grievance Redressal";
  const grievanceText =
    content?.grievanceText ||
    "Client’s queries / complaints may arise due to lack of understanding or a deficiency of service experienced by clients. Deficiency of service may include lack of explanation, clarifications, understanding which escalates into shortfalls in the expected delivery standards, either due to inadequacy of facilities available or through the attitude of staff towards the client.";
  const grievanceLink = content?.grievanceLink;

  // 12. Disciplinary & Complaints
  const complaintsTitle =
    content?.complaintsTitle || "Disciplinary History and Complaints Status";
  const complaintsText =
    content?.complaintsText ||
    "No penalties / directions have been issued by SEBI under the SEBI Act or Regulations made there under against NWA or its Partners, or employees relating to Investment Advisory services. There are no pending material litigations or legal proceedings, findings of inspections or investigations for which action has been taken or initiated by any regulatory authority against the NWA or its Partners, or employees. The status of complaint, if any, as required by SEBI is disclosed below:";
  const currentMonthTitle =
    content?.currentMonthTitle || "Data for the month ending September 30, 2026";
  const monthlyCurrent = Array.isArray(content?.monthlyCurrent) ? content.monthlyCurrent : [];
  const monthlyTrend = Array.isArray(content?.monthlyTrend) ? content.monthlyTrend : [];
  const annualTrend = Array.isArray(content?.annualTrend) ? content.annualTrend : [];

  // 13. Disclosure of Holdings
  const list = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);
  const holdingsTitle = content?.holdingsTitle || "Disclosure of Holdings of the Investment Adviser";
  const holdingsParagraphs = list(content?.holdingsParagraphs);
  const holdingsFunds = list(content?.holdingsFunds);
  const holdingsNotes = list(content?.holdingsNotes);
  const clientAdviceTitle = content?.clientAdviceTitle || "";
  const clientAdviceParagraphs = list(content?.clientAdviceParagraphs);

  // 14. Details of Principal & Compliance Officers
  const officersTitle =
    content?.officersTitle || "Details of Principal Officer and Compliance Officer";
  const principalName = content?.principalName || "Jigar Patel";
  const principalRole = content?.principalRole || "Principal Officer";
  const principalEmail = content?.principalEmail || "jigar@neuronwealth.com";
  const principalPhone = content?.principalPhone || "+91 90999 42563";
  const complianceName = content?.complianceName || "Ruchita Thakor";
  const complianceRole = content?.complianceRole || "Compliance Officer";
  const complianceEmail = content?.complianceEmail || "ruchita@neuronwealth.com";
  const compliancePhone = content?.compliancePhone || "+91 90999 42576";

  // Sidebar
  const sidebarTitle = content?.sidebarTitle || "Compliance Sections";
  const sidebarSebiReg = content?.sidebarSebiReg || "INA000016481";
  const sidebarBaslId = content?.sidebarBaslId || "1697";
  const sidebarStatus = content?.sidebarStatus || "Perpetual Registration";
  const sidebarModel = content?.sidebarModel || "100% Fee-Only Fiduciary";
  const sidebarTrackRecord = content?.sidebarTrackRecord || "100% Track Record";
  const sidebarInquiryTitle = content?.sidebarInquiryTitle || "Compliance Inquiries";
  const sidebarInquirySubtitle = content?.sidebarInquirySubtitle || "Official Assistance";
  const sidebarEmail = content?.sidebarEmail || "ruchita@neuronwealth.com";
  const sidebarPhone = content?.sidebarPhone || "+91 90999 42576";
  const sidebarAddress =
    content?.sidebarAddress ||
    "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015";

  return (
    <>
      <section
        id={id || "compliance-hub"}
        {...root}
        className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]"
      >
        <div className="site-frame px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
            {/* ── Left Column: All Core Content Sections (1 to 14) ── */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* ── 1. About Neuron Wealth Advisors LLP ── */}
              <article
                id="about-nwa"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    1
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {aboutTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {aboutText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={aboutLink}
                        fallbackLabel="Please click here to know Material Information about Neuron Wealth Advisors LLP"
                        fallbackHref="/material-information"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 2. SEBI RIA Registration Certificate ── */}
              <article
                id="sebi-ria-registration"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    2
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {riaTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {riaText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setCertificate(riaCertificate)}
                        aria-haspopup="dialog"
                        className="inline-flex cursor-pointer items-center gap-1.5 text-left text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      >
                        {riaLinkLabel}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 3. BSE ASL Membership ── */}
              <article
                id="bse-asl-membership"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    3
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {bseTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {bseText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setCertificate(bseCertificate)}
                        aria-haspopup="dialog"
                        className="inline-flex cursor-pointer items-center gap-1.5 text-left text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      >
                        {bseLinkLabel}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 4. Disclaimer ── */}
              <article
                id="disclaimer"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    4
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {disclaimerTitle}
                    </h2>
                    <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {disclaimerParagraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={disclaimerLink}
                        fallbackLabel="Please click here to read the Disclaimers."
                        fallbackHref="/website-disclaimer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 5. Investor Charter ── */}
              <article
                id="investor-charter"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    5
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {charterTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {charterText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={charterLink}
                        fallbackLabel="Please click here to read more about Investor Charter."
                        fallbackHref="/sebi-investor-charter"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 6. Code of Conduct ── */}
              <article
                id="code-of-conduct"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    6
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {codeTitle}
                    </h2>
                    <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      <p>
                        {sebiCodeText}{" "}
                        <SmartLink
                          link={sebiCodeLink}
                          fallbackLabel="Please refer to the SEBI Code of Conduct."
                          fallbackHref="/code-of-conduct-sebi"
                          className="inline-flex items-center gap-1 font-semibold text-[#21649A] underline hover:text-[#54B848] dark:text-[#8FCB86]"
                        />
                      </p>
                      <p>
                        {cfaCodeText}{" "}
                        <SmartLink
                          link={cfaCodeLink}
                          fallbackLabel="Please click here to read more about CFA Code of Conduct."
                          fallbackHref="/cfa-code-of-conduct"
                          className="inline-flex items-center gap-1 font-semibold text-[#21649A] underline hover:text-[#54B848] dark:text-[#8FCB86]"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 7. Functions of Investment Adviser ── */}
              <article
                id="functions-of-ia"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    7
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {functionsTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {functionsText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={functionsLink}
                        fallbackLabel="Please click here to read more about Functions of Investment Adviser."
                        fallbackHref="/functions-of-investment-adviser"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 8. Risks ── */}
              <article
                id="risks"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    8
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {risksTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {risksText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={risksLink}
                        fallbackLabel="Please click here to read more about various Risks."
                        fallbackHref="/risks"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 9. Conflict of Interest ── */}
              <article
                id="conflict-of-interest"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    9
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {conflictTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {conflictText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={conflictLink}
                        fallbackLabel="Please click here to read more about disclosures related to conflict of interest."
                        fallbackHref="/conflict-of-interest"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 10. Annual Audit ── */}
              <article
                id="annual-audit"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    10
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {auditTitle}
                    </h2>

                    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-[#071321]">
                      <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-[#F4F8FC] text-[#21649A] dark:border-white/10 dark:bg-white/5 dark:text-[#8FCB86]">
                            <th className="py-3.5 px-4 font-bold text-center w-16">Sr. No.</th>
                            <th className="py-3.5 px-4 font-bold">Financial Year</th>
                            <th className="py-3.5 px-4 font-bold">Compliance Audit Status</th>
                            <th className="py-3.5 px-4 font-bold">Remarks, if any</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-[#18324A] dark:text-slate-200">
                          {auditRecords.map((item, idx) => (
                            <tr key={item.id || item.fy || idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                              <td className="py-3.5 px-4 text-center font-medium text-slate-500 dark:text-slate-400">
                                {item.sr || `${idx + 1}.`}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-[#15344F] dark:text-white">
                                {item.fy}
                              </td>
                              <td className="py-3.5 px-4">
                                {item.url ? (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                                  >
                                    <span>{item.status}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : item.status === "Conducted" ? (
                                  <span className="font-semibold text-[#21649A] dark:text-[#8FCB86]">
                                    {item.status}
                                  </span>
                                ) : (
                                  <span className="text-slate-500 dark:text-slate-400">
                                    {item.status}
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                                {item.remarks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {auditNote && (
                      <p className="mt-3.5 text-xs sm:text-[0.8125rem] italic text-[#5E6D7B] dark:text-slate-400">
                        {auditNote}
                      </p>
                    )}
                  </div>
                </div>
              </article>

              {/* ── 11. Grievance Redressal ── */}
              <article
                id="grievance-redressal"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    11
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {grievanceTitle}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {grievanceText}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      <SmartLink
                        link={grievanceLink}
                        fallbackLabel="Please click here to read more about Grievance Redressal Process."
                        fallbackHref="/grievance-redressal"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* ── 12. Disciplinary History and Complaints Status ── */}
              <article
                id="complaints-status"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    12
                  </span>
                  <div className="min-w-0 flex-1 space-y-8">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                        {complaintsTitle}
                      </h2>
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                        {complaintsText}
                      </p>
                    </div>

                    {/* Sub-table 1: Data for the current month */}
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#15344F] dark:text-white">
                        {currentMonthTitle}
                      </h3>

                      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-[#071321]">
                        <table className="w-full min-w-[760px] border-collapse text-xs sm:text-[0.8125rem]">
                          <thead>
                            <tr className="border-b border-slate-200 bg-[#F4F8FC] text-[#21649A] dark:border-white/10 dark:bg-white/5 dark:text-[#8FCB86]">
                              <th className="py-3 px-3 font-bold text-center w-14">Sr.No.</th>
                              <th className="py-3 px-3 font-bold text-left">Received from</th>
                              <th className="py-3 px-3 font-bold text-center">Pending at the end of last month</th>
                              <th className="py-3 px-3 font-bold text-center">Received</th>
                              <th className="py-3 px-3 font-bold text-center">Resolved*</th>
                              <th className="py-3 px-3 font-bold text-center">Total Pending#</th>
                              <th className="py-3 px-3 font-bold text-center">Pending complaints &gt; 3 months</th>
                              <th className="py-3 px-3 font-bold text-center">Average Resolution time^ (in days)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-[#18324A] dark:text-slate-200">
                            {monthlyCurrent.map((row, idx) => (
                              <tr key={row.id || row.sr || idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                                <td className="py-3 px-3 text-center text-slate-500 dark:text-slate-400">{row.sr || `${idx + 1}.`}</td>
                                <td className="py-3 px-3 font-medium text-left">{row.source}</td>
                                <td className="py-3 px-3 text-center">{row.pendingLast}</td>
                                <td className="py-3 px-3 text-center">{row.received}</td>
                                <td className="py-3 px-3 text-center">{row.resolved}</td>
                                <td className="py-3 px-3 text-center">{row.totalPending}</td>
                                <td className="py-3 px-3 text-center">{row.pendingOver3M}</td>
                                <td className="py-3 px-3 text-center">{row.avgTime}</td>
                              </tr>
                            ))}
                            <tr className="bg-slate-100/90 font-bold text-[#15344F] dark:bg-white/10 dark:text-white">
                              <td colSpan={2} className="py-3 px-4 text-left">Grand Total</td>
                              <td className="py-3 px-3 text-center">0</td>
                              <td className="py-3 px-3 text-center">0</td>
                              <td className="py-3 px-3 text-center">0</td>
                              <td className="py-3 px-3 text-center">0</td>
                              <td className="py-3 px-3 text-center">0</td>
                              <td className="py-3 px-3 text-center">0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
                      </p>
                    </div>

                    {/* Sub-table 2: Trend of monthly disposal of complaints */}
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#15344F] dark:text-white">
                        Trend of monthly disposal of complaints:
                      </h3>

                      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-[#071321]">
                        <table className="w-full min-w-[620px] border-collapse text-xs sm:text-[0.8125rem]">
                          <thead>
                            <tr className="border-b border-slate-200 bg-[#F4F8FC] text-[#21649A] dark:border-white/10 dark:bg-white/5 dark:text-[#8FCB86]">
                              <th className="py-3 px-3 font-bold text-center w-14">Sr.No.</th>
                              <th className="py-3 px-3 font-bold text-left">Month</th>
                              <th className="py-3 px-3 font-bold text-center">Carriedforward from previous month</th>
                              <th className="py-3 px-3 font-bold text-center">Received</th>
                              <th className="py-3 px-3 font-bold text-center">Resolved*</th>
                              <th className="py-3 px-3 font-bold text-center">Pending#</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-[#18324A] dark:text-slate-200">
                            {monthlyTrend.map((row, idx) => (
                              <tr key={row.id || row.month || idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                                <td className="py-2.5 px-3 text-center text-slate-500 dark:text-slate-400">{row.sr || `${idx + 1}.`}</td>
                                <td className="py-2.5 px-3 font-medium text-left">{row.month}</td>
                                <td className="py-2.5 px-3 text-center">{row.carried}</td>
                                <td className="py-2.5 px-3 text-center">{row.received}</td>
                                <td className="py-2.5 px-3 text-center">{row.resolved}</td>
                                <td className="py-2.5 px-3 text-center">{row.pending}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                        <p>*Inclusive of complaints of previous months resolved in the current month.</p>
                        <p>#Inclusive of complaints pending as on the last day of the month.</p>
                      </div>
                    </div>

                    {/* Sub-table 3: Trend of Annual disposal of complaints */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#15344F] dark:text-white">
                          Trend of Annual disposal of complaints:
                        </h3>
                        <span className="text-xs font-bold text-[#21649A] dark:text-[#8FCB86]">Grand Total:</span>
                      </div>

                      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-[#071321]">
                        <table className="w-full min-w-[620px] border-collapse text-xs sm:text-[0.8125rem]">
                          <thead>
                            <tr className="border-b border-slate-200 bg-[#F4F8FC] text-[#21649A] dark:border-white/10 dark:bg-white/5 dark:text-[#8FCB86]">
                              <th className="py-3 px-3 font-bold text-center w-14">Sr. No.</th>
                              <th className="py-3 px-3 font-bold text-left">Year</th>
                              <th className="py-3 px-3 font-bold text-center">Carried forward from last year</th>
                              <th className="py-3 px-3 font-bold text-center">Received</th>
                              <th className="py-3 px-3 font-bold text-center">Resolved*</th>
                              <th className="py-3 px-3 font-bold text-center">Pending#</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-[#18324A] dark:text-slate-200">
                            {annualTrend.map((row, idx) => (
                              <tr key={row.id || row.year || idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                                <td className="py-2.5 px-3 text-center text-slate-500 dark:text-slate-400">{row.sr || `${idx + 1}.`}</td>
                                <td className="py-2.5 px-3 font-medium text-left">{row.year}</td>
                                <td className="py-2.5 px-3 text-center">{row.carried}</td>
                                <td className="py-2.5 px-3 text-center">{row.received}</td>
                                <td className="py-2.5 px-3 text-center">{row.resolved}</td>
                                <td className="py-2.5 px-3 text-center">{row.pending}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                        <p>*Inclusive of complaints of previous years resolved in the current year.</p>
                        <p>#Inclusive of complaints pending as on the last day of the year.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </article>

              {/* ── 13. Disclosure of Holdings ── */}
              <article
                id="holdings-disclosure"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    13
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {holdingsTitle}
                    </h2>
                    <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                      {holdingsParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                      {holdingsFunds.length ? (
                        <ul className="list-disc space-y-1.5 pl-5 marker:text-[#54B848]">
                          {holdingsFunds.map((fund, index) => (
                            <li key={index} className="font-medium text-[#15344F] dark:text-white">
                              {fund}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {holdingsNotes.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>

                    {clientAdviceTitle || clientAdviceParagraphs.length ? (
                      <div className="mt-6 border-t border-slate-100 pt-6 dark:border-white/10">
                        {clientAdviceTitle ? (
                          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#15344F] dark:text-white">
                            {clientAdviceTitle}
                          </h3>
                        ) : null}
                        <div className="mt-3 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                          {clientAdviceParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>

              {/* ── 14. Details of Principal Officer and Compliance Officer ── */}
              <article
                id="officers-details"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="m-badge-row flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-sm font-bold text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                    14
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {officersTitle}
                    </h2>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {/* Principal Officer */}
                      <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-5 sm:p-6 dark:border-white/10 dark:bg-[#071321]">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                            <UserCheck className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-bold text-[#15344F] dark:text-white">
                              {principalName}
                            </h3>
                            <p className="text-xs font-semibold text-[#21649A] dark:text-[#8FCB86]">
                              {principalRole}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300 border-t border-slate-200/80 pt-4 dark:border-white/10">
                          <div>
                            <span className="text-slate-400">Principal Officer Name: </span>
                            <span className="font-semibold text-[#15344F] dark:text-white">{principalName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Email: </span>
                            <Mail className="h-3.5 w-3.5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" />
                            <a
                              href={`mailto:${principalEmail}`}
                              className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                            >
                              {principalEmail}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Mobile: </span>
                            <Phone className="h-3.5 w-3.5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" />
                            <a
                              href={`tel:${principalPhone.replace(/\s+/g, "")}`}
                              className="font-semibold text-[#15344F] hover:text-[#21649A] dark:text-white dark:hover:text-[#8FCB86]"
                            >
                              {principalPhone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Compliance Officer */}
                      <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-5 sm:p-6 dark:border-white/10 dark:bg-[#071321]">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#54B848] text-white shadow-2xs dark:bg-[#8FCB86] dark:text-[#061524]">
                            <ShieldCheck className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-bold text-[#15344F] dark:text-white">
                              {complianceName}
                            </h3>
                            <p className="text-xs font-semibold text-[#54B848] dark:text-[#8FCB86]">
                              {complianceRole}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300 border-t border-slate-200/80 pt-4 dark:border-white/10">
                          <div>
                            <span className="text-slate-400">Compliance Officer Name: </span>
                            <span className="font-semibold text-[#15344F] dark:text-white">{complianceName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Email: </span>
                            <Mail className="h-3.5 w-3.5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" />
                            <a
                              href={`mailto:${complianceEmail}`}
                              className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                            >
                              {complianceEmail}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Mobile: </span>
                            <Phone className="h-3.5 w-3.5 shrink-0 text-[#21649A] dark:text-[#8FCB86]" />
                            <a
                              href={`tel:${compliancePhone.replace(/\s+/g, "")}`}
                              className="font-semibold text-[#15344F] hover:text-[#21649A] dark:text-white dark:hover:text-[#8FCB86]"
                            >
                              {compliancePhone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* ── Right Column: Sticky Navigation & Authority Sidebar ── */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
              {/* Table of Contents Nav Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-[#102A40]">
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                  On This Page
                </p>
                <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">
                  {sidebarTitle}
                </p>

                <nav aria-label="Compliance sections" className="mt-4">
                  <ul className="space-y-1">
                    {SECTIONS_NAV.map((sec) => (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          onClick={(e) => scrollToSection(e, sec.id)}
                          className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#5E6D7B] transition-all hover:bg-slate-50 hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86]"
                        >
                          <span className="truncate">{sec.label}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-[#21649A] dark:text-[#8FCB86]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* SEBI Compliance Card */}
              <div className="rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-xs dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
                    <Scale className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                      SEBI Registered IA
                    </p>
                    <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">
                      {sidebarSebiReg}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 text-xs text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">BASL Member ID:</span>
                    <span className="font-semibold text-[#15344F] dark:text-white">{sidebarBaslId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-[#54B848]">{sidebarStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model:</span>
                    <span className="font-semibold text-[#15344F] dark:text-white">{sidebarModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Complaints Resolved:</span>
                    <span className="font-semibold text-[#54B848]">{sidebarTrackRecord}</span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-[#102A40]">
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                  {sidebarInquiryTitle}
                </p>
                <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">
                  {sidebarInquirySubtitle}
                </p>

                <div className="mt-4 space-y-3 text-xs text-[#5E6D7B] dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <a
                      href={`mailto:${sidebarEmail}`}
                      className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                    >
                      {sidebarEmail}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <a
                      href={`tel:${sidebarPhone.replace(/\s+/g, "")}`}
                      className="font-medium hover:text-[#21649A] dark:hover:text-[#8FCB86]"
                    >
                      {sidebarPhone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Building2 className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <span>{sidebarAddress}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {certificate ? <CertificateModal image={certificate} onClose={closeCertificate} /> : null}
    </>
  );
}
