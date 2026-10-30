import { useReducedMotion } from "../../../hooks/useReducedMotion";
import {
  ArrowRight,
  Building2,
  Clock,
  Database,
  ExternalLink,
  FileText,
  Lock,
  Mail,
  RefreshCw,
  Share2,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { company } from "../../../config/site";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21649A]";
const LIST = "mt-4 space-y-2.5";

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base">
      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#54B848]" />
      <span>{children}</span>
    </li>
  );
}

function Para({ children, className = "" }) {
  return (
    <p className={`mt-4 text-[0.9375rem] leading-relaxed text-[#5E6D7B] dark:text-slate-300 sm:text-base ${className}`}>
      {children}
    </p>
  );
}

function SubHeading({ children }) {
  return (
    <h3 className="mt-6 font-display text-[1.2rem] font-medium text-[#15344F] dark:text-white">{children}</h3>
  );
}

export default function PrivacyPolicyHub({ content, section }) {
  const reduce = useReducedMotion();

  const scrollToSection = (event, id) => {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  // Section 1: Intro
  const introTitle = content?.introTitle || "Introduction";
  const introParagraphs = content?.introParagraphs || [
    "Neuron Wealth Advisors LLP (“Neuron Wealth”, “we”, “us” or “our”) is a SEBI Registered Investment Adviser, Registration No. INA000016481. We respect your privacy and treat the information you share with us with care and confidentiality.",
    "This Privacy Policy explains what personal information we collect when you visit our website or engage us as a client, how we use and protect it, who we may share it with, and the choices and rights you have.",
  ];

  // Section 2: Collect
  const collectTitle = content?.collectTitle || "Information We Collect";
  const collectWebsiteSubtitle = content?.collectWebsiteSubtitle || "When you visit our website";
  const collectWebsiteText =
    content?.collectWebsiteText ||
    "Our website does not use analytics or advertising cookies. It saves your display preferences, such as the light or dark theme, text size and accessibility settings, in your own browser's local storage so they are remembered on your next visit. This information stays on your device and is not sent to us. You can clear it at any time from your browser settings.";
  const collectContactSubtitle = content?.collectContactSubtitle || "When you contact us";
  const collectContactText =
    content?.collectContactText ||
    "The forms and contact buttons on our website open an email in your own email application, addressed to connect@neuronwealth.com. We receive only the information you choose to send, such as your name, email address, phone number and message.";
  const collectClientSubtitle = content?.collectClientSubtitle || "When you become a client";
  const collectClientText =
    content?.collectClientText ||
    "To provide investment advice in line with the SEBI (Investment Advisers) Regulations, 2013, we collect information that may include:";
  const collectClientBullets = content?.collectClientBullets || [
    "Your name, contact details, date of birth and address",
    "Identity and address proof, PAN and other KYC documents",
    "Residential status and, where relevant, tax residency in other countries",
    "Income, assets, liabilities, investments and insurance details",
    "Financial goals, family details relevant to your planning and your risk profile",
    "Bank details for fee payments",
  ];

  // Section 3: Use
  const useTitle = content?.useTitle || "How We Use Your Information";
  const useIntro =
    content?.useIntro || "We use your personal information only for purposes connected with our services, including to:";
  const useBullets = content?.useBullets || [
    "Respond to your enquiries and schedule calls",
    "Complete KYC, risk profiling and suitability assessment as required by SEBI",
    "Prepare and deliver investment advice, financial plans and reports",
    "Communicate with you about your engagement, fees and reviews",
    "Meet our legal, regulatory, tax and audit obligations",
  ];
  const useNotice =
    content?.useNotice ||
    "We do not sell or rent your personal information, and we do not share it with third parties for their marketing.";

  // Section 4: Share
  const shareTitle = content?.shareTitle || "When We Share Information";
  const shareIntro = content?.shareIntro || "We share personal information only when it is needed, and only with:";
  const shareBullets = content?.shareBullets || [
    "SEBI, KYC Registration Agencies, our supervisory body and other regulatory, tax or government authorities, where required by law or regulation",
    "Professionals and service providers who support our work, such as auditors and technology providers, under a duty of confidentiality",
    "Your chartered accountant, lawyer, bank or other advisers, only with your instruction or consent",
    "Courts or law enforcement agencies, where we are legally required to do so",
  ];

  // Section 5: Security
  const securityTitle = content?.securityTitle || "How We Protect Your Information";
  const securityText =
    content?.securityText ||
    "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, misuse or disclosure. Access is limited to people who need it to serve you. No method of transmission over the internet or electronic storage is completely secure, so while we work hard to protect your information, we cannot guarantee absolute security.";

  // Section 6: Retention
  const retentionTitle = content?.retentionTitle || "How Long We Keep Information";
  const retentionText =
    content?.retentionText ||
    "We keep personal information for as long as needed to provide our services and to meet our legal and regulatory obligations. The SEBI (Investment Advisers) Regulations, 2013 require us to maintain client records for a minimum period of five years. After this, information that is no longer needed is deleted or securely disposed of.";

  // Section 7: Rights
  const rightsTitle = content?.rightsTitle || "Your Rights";
  const rightsIntro =
    content?.rightsIntro || "Subject to the Digital Personal Data Protection Act, 2023 and other applicable laws, you may:";
  const rightsBullets = content?.rightsBullets || [
    "Ask for a summary of the personal information we hold about you",
    "Ask us to correct, complete or update your information",
    "Ask us to delete your information, except where we must keep it to meet legal or regulatory obligations",
    "Withdraw your consent, which may mean we are no longer able to provide some or all of our services",
    "Nominate another person to exercise these rights on your behalf in the event of death or incapacity",
    "Raise a grievance about how your information has been handled",
  ];
  const rightsOutro = content?.rightsOutro || "To make a request, please contact us using the details below.";

  // Section 8: Third Party
  const thirdPartyTitle = content?.thirdPartyTitle || "Third Party Websites";
  const thirdPartyText =
    content?.thirdPartyText ||
    "Our website may link to other websites, such as SEBI, BSE and our social media pages. We are not responsible for the privacy practices of those websites. Please read their privacy policies before sharing information with them.";

  // Section 9: Children
  const childrenTitle = content?.childrenTitle || "Children's Information";
  const childrenText =
    content?.childrenText ||
    "Our website and services are not directed at children. Where information about a minor is needed for family planning, such as a child's education goals, we collect it only from the parent or legal guardian.";

  // Section 10: Changes
  const changesTitle = content?.changesTitle || "Changes to This Policy";
  const changesText =
    content?.changesText ||
    "We may update this Privacy Policy from time to time to reflect changes in our practices or in the law. The updated version will be posted on this page with a revised “Last updated” date.";

  // Section 11: Contact
  const contactTitle = content?.contactTitle || "Contact Us";
  const contactText =
    content?.contactText ||
    "For any questions, requests or concerns about this Privacy Policy or your personal information, please contact us:";
  const contactEmail = content?.contactEmail || company.email;
  const contactAddress =
    content?.contactAddress ||
    "Neuron Wealth Advisors LLP\n803, Mauryansh Elanza, Nr. Shyamal Cross Roads,\nB/s. Parekhs Hospital, Satellite,\nAhmedabad-380015, Gujarat, India.";

  const navItems = [
    { id: "intro", title: introTitle },
    { id: "collect", title: collectTitle },
    { id: "use", title: useTitle },
    { id: "share", title: shareTitle },
    { id: "security", title: securityTitle },
    { id: "retention", title: retentionTitle },
    { id: "rights", title: rightsTitle },
    { id: "third-party", title: thirdPartyTitle },
    { id: "children", title: childrenTitle },
    { id: "changes", title: changesTitle },
    { id: "contact-us", title: contactTitle },
  ];

  return (
    <section
      id={section?.design?.anchor || section?.id || "privacy-hub"}
      data-cms-section={section?.id}
      className="bg-white py-12 dark:bg-[#07131e] sm:py-16 lg:py-20"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-8">
            {/* 1. Intro */}
            <article
              id="intro"
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
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {introTitle}
                  </h2>
                </div>
              </div>
              {introParagraphs.map((para, i) => (
                <Para key={i}>{para}</Para>
              ))}
            </article>

            {/* 2. Collect */}
            <article
              id="collect"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Database className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 02
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {collectTitle}
                  </h2>
                </div>
              </div>
              <SubHeading>{collectWebsiteSubtitle}</SubHeading>
              <Para>{collectWebsiteText}</Para>
              <SubHeading>{collectContactSubtitle}</SubHeading>
              <Para>{collectContactText}</Para>
              <SubHeading>{collectClientSubtitle}</SubHeading>
              <Para>{collectClientText}</Para>
              <ul className={LIST}>
                {collectClientBullets.map((bullet, i) => (
                  <Bullet key={i}>{bullet}</Bullet>
                ))}
              </ul>
            </article>

            {/* 3. Use */}
            <article
              id="use"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <UserCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 03
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {useTitle}
                  </h2>
                </div>
              </div>
              <Para>{useIntro}</Para>
              <ul className={LIST}>
                {useBullets.map((bullet, i) => (
                  <Bullet key={i}>{bullet}</Bullet>
                ))}
              </ul>
              {useNotice ? <Para className="font-medium text-[#15344F] dark:text-white">{useNotice}</Para> : null}
            </article>

            {/* 4. Share */}
            <article
              id="share"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 04
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {shareTitle}
                  </h2>
                </div>
              </div>
              <Para>{shareIntro}</Para>
              <ul className={LIST}>
                {shareBullets.map((bullet, i) => (
                  <Bullet key={i}>{bullet}</Bullet>
                ))}
              </ul>
            </article>

            {/* 5. Security */}
            <article
              id="security"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 05
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {securityTitle}
                  </h2>
                </div>
              </div>
              <Para>{securityText}</Para>
            </article>

            {/* 6. Retention */}
            <article
              id="retention"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 06
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {retentionTitle}
                  </h2>
                </div>
              </div>
              <Para>{retentionText}</Para>
            </article>

            {/* 7. Rights */}
            <article
              id="rights"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 07
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {rightsTitle}
                  </h2>
                </div>
              </div>
              <Para>{rightsIntro}</Para>
              <ul className={LIST}>
                {rightsBullets.map((bullet, i) => (
                  <Bullet key={i}>{bullet}</Bullet>
                ))}
              </ul>
              {rightsOutro ? <Para>{rightsOutro}</Para> : null}
            </article>

            {/* 8. Third Party */}
            <article
              id="third-party"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 08
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {thirdPartyTitle}
                  </h2>
                </div>
              </div>
              <Para>{thirdPartyText}</Para>
            </article>

            {/* 9. Children */}
            <article
              id="children"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 09
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {childrenTitle}
                  </h2>
                </div>
              </div>
              <Para>{childrenText}</Para>
            </article>

            {/* 10. Changes */}
            <article
              id="changes"
              className="scroll-mt-28 rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                  <RefreshCw className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#2f8a25] dark:text-[#8FCB86]">
                    Section 10
                  </p>
                  <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight text-[#15344F] dark:text-white sm:text-[1.9rem]">
                    {changesTitle}
                  </h2>
                </div>
              </div>
              <Para>{changesText}</Para>
            </article>

            {/* 11. Contact */}
            <article
              id="contact-us"
              className="scroll-mt-28 rounded-2xl bg-[#102A40] p-6 text-white shadow-sm sm:p-8"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86]">
                Section 11
              </p>
              <h2 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-[1.9rem]">
                {contactTitle}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">
                {contactText}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className={`flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10 ${FOCUS}`}
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                  <span className="text-[0.9375rem] font-semibold">{contactEmail}</span>
                </a>
                <div className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                  <address className="whitespace-pre-line text-[0.875rem] not-italic leading-relaxed text-white/85">
                    {contactAddress}
                  </address>
                </div>
              </div>
            </article>
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="sticky top-28 hidden space-y-6 lg:col-span-4 lg:block">
            <div className="rounded-2xl border border-[#DCE4E8] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                Table of Contents
              </p>
              <nav aria-label="Privacy policy sections" className="mt-4">
                <ol className="space-y-1">
                  {navItems.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => scrollToSection(event, item.id)}
                        className={`group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.8125rem] font-semibold text-[#5E6D7B] transition-colors hover:bg-[#F7F8F5] hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86] ${FOCUS}`}
                      >
                        <span>
                          <span className="mr-2 text-[#21649A]/60 dark:text-[#8FCB86]/60">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {item.title}
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
                    SEBI Registered IA
                  </p>
                  <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">INA000016481</p>
                </div>
              </div>
              <p className="mt-4 border-t border-[#DCE4E8] pt-4 text-[0.8125rem] leading-relaxed text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                We do not sell or rent your personal information.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

