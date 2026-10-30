import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { CheckCircle2, XCircle, ExternalLink, Building2, Mail, Phone, ArrowRight } from "lucide-react";
import { company } from "../../../config/site";
import { CmsIcon, CmsLink, hasLink, visibleItems } from "../primitives";

const ARTICLE =
  "scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]";

const ADDRESS_STYLES = {
  accent: "font-bold text-[#21649A] dark:text-[#8FCB86]",
  bold: "font-semibold",
};

function ArticleHead({ iconName, eyebrow, title }) {
  if (!iconName && !eyebrow && !title) return null;
  return (
    <div className="m-badge-row flex items-start gap-4">
      {iconName ? (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
          <CmsIcon name={iconName} className="h-5 w-5" />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
            {title}
          </h2>
        ) : null}
      </div>
    </div>
  );
}

function ExternalTextLink({ link, className }) {
  if (!hasLink(link) || !link.label) return null;
  return (
    <CmsLink link={link} className={className}>
      <span>{link.label}</span>
      <ExternalLink className="h-3 w-3" />
    </CmsLink>
  );
}

export function InvestorCharterBody({ content = {}, root }) {
  const reduce = useReducedMotion();

  const scrollToSection = (e, id) => {
    e?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const bPoints = visibleItems(content.bPoints);
  const onboardingItems = visibleItems(content.onboardingItems);
  const disclosureItems = visibleItems(content.disclosureItems);
  const reviewItems = visibleItems(content.reviewItems);
  const addressLines = visibleItems(content.addressLines).filter((line) => line.text);
  const rights = visibleItems(content.rights);
  const vulnerableItems = visibleItems(content.vulnerableItems);
  const dosItems = visibleItems(content.dosItems);
  const dontsItems = visibleItems(content.dontsItems);
  const navItems = visibleItems(content.navItems).filter((item) => item.label && item.target);
  const portals = visibleItems(content.portals).filter((item) => hasLink(item.link) && item.link.label);

  const hasVision = content.visionIcon || content.visionTitle || content.visionQuote || content.visionText;
  const hasMission = content.missionIcon || content.missionTitle || content.missionText;
  const hasAdviserMode =
    content.adviserModeLabel || content.adviserModeBefore || content.adviserModeHighlight || content.adviserModeAfter;
  const hasScoresLink = hasLink(content.scoresLink) && content.scoresLink.label;
  const hasScoresMode =
    content.scoresModeLabel || content.scoresLead || content.scoresText || hasScoresLink || content.reviewTitle || reviewItems.length || content.emailLead;
  const hasOdrLink = hasLink(content.odrLink) && content.odrLink.label;

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* ── Left Column: All Core Sections A to F ── */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">

            {/* ── Section A: Vision and Mission Statements for Investors ── */}
            <article id="vision-mission" className={ARTICLE}>
              <ArticleHead iconName={content.aIcon} eyebrow={content.aEyebrow} title={content.aTitle} />

              {hasVision || hasMission ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {/* Vision Card */}
                  {hasVision ? (
                    <div className="rounded-xl border border-[#21649A]/20 bg-[#F4F8FC] p-5 sm:p-6 dark:border-white/10 dark:bg-[#071321]">
                      <div className="flex items-center gap-2.5 text-[#21649A] dark:text-[#8FCB86]">
                        <CmsIcon name={content.visionIcon} className="h-5 w-5" />
                        {content.visionTitle ? (
                          <h3 className="font-display text-lg font-bold text-[#15344F] dark:text-white">
                            {content.visionTitle}
                          </h3>
                        ) : null}
                      </div>
                      {content.visionQuote ? (
                        <p className="mt-3 font-display text-base sm:text-lg font-semibold leading-snug text-[#21649A] dark:text-[#8FCB86]">
                          {content.visionQuote}
                        </p>
                      ) : null}
                      {content.visionText ? (
                        <p className="mt-2 text-xs text-[#5E6D7B] dark:text-slate-400">
                          {content.visionText}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Mission Card */}
                  {hasMission ? (
                    <div className="rounded-xl border border-[#54B848]/20 bg-emerald-50/50 p-5 sm:p-6 dark:border-white/10 dark:bg-[#071321]">
                      <div className="flex items-center gap-2.5 text-[#54B848] dark:text-emerald-400">
                        <CmsIcon name={content.missionIcon} className="h-5 w-5" />
                        {content.missionTitle ? (
                          <h3 className="font-display text-lg font-bold text-[#15344F] dark:text-white">
                            {content.missionTitle}
                          </h3>
                        ) : null}
                      </div>
                      {content.missionText ? (
                        <p className="mt-3 text-sm sm:text-[0.9375rem] leading-relaxed text-[#15344F] dark:text-slate-200">
                          {content.missionText}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>

            {/* ── Section B: Details of Business Transacted ── */}
            <article id="business-transacted" className={ARTICLE}>
              <ArticleHead iconName={content.bIcon} eyebrow={content.bEyebrow} title={content.bTitle} />

              {bPoints.length ? (
                <div className="mt-6 space-y-3">
                  {bPoints.map((point, index) => (
                    <div
                      key={point.id || index}
                      className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 text-xs sm:text-sm text-[#18324A] dark:border-white/5 dark:bg-[#071321] dark:text-slate-200"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#21649A]/10 text-xs font-bold text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                        {index + 1}
                      </span>
                      <p className="leading-relaxed flex-1">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>

            {/* ── Section C: Details of Services Provided to Investors ── */}
            <article id="services-provided" className={ARTICLE}>
              <ArticleHead iconName={content.cIcon} eyebrow={content.cEyebrow} title={content.cTitle} />

              <div className="mt-6 space-y-6">
                {/* Onboarding of Clients */}
                {content.onboardingTitle || onboardingItems.length ? (
                  <div className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5 dark:border-white/5 dark:bg-[#071321]">
                    {content.onboardingTitle ? (
                      <h3 className="font-display text-base font-bold text-[#15344F] dark:text-white flex items-center gap-2">
                        <CmsIcon name={content.onboardingIcon} className="h-4 w-4 text-[#54B848]" />
                        <span>{content.onboardingTitle}</span>
                      </h3>
                    ) : null}
                    {onboardingItems.length ? (
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300">
                        {onboardingItems.map((item, index) => (
                          <li
                            key={item.id || index}
                            className="flex items-center gap-2 rounded-lg bg-white p-3 border border-slate-200/70 dark:border-white/5 dark:bg-white/5"
                          >
                            <CheckCircle2 className="h-4 w-4 text-[#21649A] dark:text-[#8FCB86] shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}

                {/* Disclosure to Clients */}
                {content.disclosureTitle || disclosureItems.length ? (
                  <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-white/5 dark:bg-[#071321]">
                    {content.disclosureTitle ? (
                      <h3 className="font-display text-base font-bold text-[#15344F] dark:text-white flex items-center gap-2">
                        <CmsIcon name={content.disclosureIcon} className="h-4 w-4 text-[#21649A] dark:text-[#8FCB86]" />
                        <span>{content.disclosureTitle}</span>
                      </h3>
                    ) : null}

                    {disclosureItems.length ? (
                      <div className="mt-4 space-y-2.5">
                        {disclosureItems.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#F8FAFC] p-3 text-xs sm:text-sm text-[#18324A] dark:border-white/5 dark:bg-white/5 dark:text-slate-200"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#21649A]/10 text-[0.6875rem] font-bold text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86] mt-0.5">
                              •
                            </span>
                            <span className="leading-relaxed">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

            {/* ── Section D: Grievance Redressal Mechanism ── */}
            <article id="grievance-redressal" className={ARTICLE}>
              <ArticleHead iconName={content.dIcon} eyebrow={content.dEyebrow} title={content.dTitle} />

              <div className="mt-6 space-y-6">
                {/* Item 1 */}
                {content.lodgeTitle || hasAdviserMode || hasScoresMode ? (
                  <div className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5 sm:p-6 dark:border-white/5 dark:bg-[#071321]">
                    {content.lodgeTitle ? (
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#15344F] dark:text-white">
                        {content.lodgeTitle}
                      </h3>
                    ) : null}

                    <div className="mt-4 space-y-4">
                      {/* Mode 1: With IA */}
                      {hasAdviserMode ? (
                        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/5 dark:bg-white/5">
                          {content.adviserModeLabel ? (
                            <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                              {content.adviserModeLabel}
                            </p>
                          ) : null}
                          {content.adviserModeBefore || content.adviserModeHighlight || content.adviserModeAfter ? (
                            <p className="mt-2 text-xs sm:text-sm text-[#18324A] dark:text-slate-200 leading-relaxed">
                              {content.adviserModeBefore}
                              {content.adviserModeBefore && content.adviserModeHighlight ? " " : null}
                              {content.adviserModeHighlight ? (
                                <strong className="font-bold text-[#21649A] dark:text-[#8FCB86]">{content.adviserModeHighlight}</strong>
                              ) : null}
                              {content.adviserModeAfter && (content.adviserModeBefore || content.adviserModeHighlight) ? " " : null}
                              {content.adviserModeAfter}
                            </p>
                          ) : null}
                        </div>
                      ) : null}

                      {/* Mode 2: SCORES 2.0 & IAASB */}
                      {hasScoresMode ? (
                        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/5 dark:bg-white/5 space-y-3">
                          {content.scoresModeLabel ? (
                            <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                              {content.scoresModeLabel}
                            </p>
                          ) : null}
                          {content.scoresLead || content.scoresText || hasScoresLink ? (
                            <p className="text-xs sm:text-sm text-[#18324A] dark:text-slate-200 leading-relaxed">
                              {content.scoresLead ? <strong>{content.scoresLead}</strong> : null}
                              {content.scoresLead && content.scoresText ? " " : null}
                              {content.scoresText}
                              {hasScoresLink ? (
                                <>
                                  {content.scoresLead || content.scoresText ? " (" : "("}
                                  <CmsLink
                                    link={content.scoresLink}
                                    className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                                  >
                                    {content.scoresLink.label}
                                  </CmsLink>
                                  )
                                </>
                              ) : null}
                            </p>
                          ) : null}

                          {content.reviewTitle || reviewItems.length ? (
                            <div className="rounded-lg bg-slate-50 p-3 text-xs sm:text-sm text-[#18324A] dark:bg-white/5 dark:text-slate-200">
                              {content.reviewTitle ? (
                                <p className="font-semibold text-[#15344F] dark:text-white">
                                  {content.reviewTitle}
                                </p>
                              ) : null}
                              {reviewItems.length ? (
                                <ul className="mt-2 space-y-1 list-disc pl-5 text-slate-600 dark:text-slate-300">
                                  {reviewItems.map((item, index) => (
                                    <li key={item.id || index}>{item.text}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          ) : null}

                          {content.emailLead ? (
                            <p className="text-xs sm:text-sm text-[#18324A] dark:text-slate-200 leading-relaxed">
                              <strong>{content.emailLead}</strong>
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {/* Item 2: SMARTODR */}
                {content.odrTitle || content.odrText || hasOdrLink ? (
                  <div className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5 sm:p-6 dark:border-white/5 dark:bg-[#071321]">
                    {content.odrTitle ? (
                      <h3 className="font-display text-base font-bold text-[#15344F] dark:text-white">
                        {content.odrTitle}
                      </h3>
                    ) : null}
                    {content.odrText ? (
                      <p className="mt-2 text-xs sm:text-sm text-[#18324A] dark:text-slate-200 leading-relaxed">
                        {content.odrText}
                      </p>
                    ) : null}
                    {hasOdrLink ? (
                      <div className="mt-3">
                        <ExternalTextLink
                          link={content.odrLink}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Item 3: Physical Complaints */}
                {content.physicalTitle || content.physicalText || addressLines.length ? (
                  <div className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5 sm:p-6 dark:border-white/5 dark:bg-[#071321]">
                    {content.physicalTitle ? (
                      <h3 className="font-display text-base font-bold text-[#15344F] dark:text-white">
                        {content.physicalTitle}
                      </h3>
                    ) : null}
                    {content.physicalText ? (
                      <p className="mt-2 text-xs sm:text-sm text-[#18324A] dark:text-slate-200 leading-relaxed">
                        {content.physicalText}
                      </p>
                    ) : null}

                    {addressLines.length ? (
                      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 text-xs sm:text-sm text-[#15344F] dark:border-white/5 dark:bg-white/5 dark:text-white space-y-1">
                        {addressLines.map((line, index) => (
                          <p key={line.id || index} className={ADDRESS_STYLES[line.style]}>
                            {line.text}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

            {/* ── Section E: Rights of Investors ── */}
            <article id="rights-of-investors" className={ARTICLE}>
              <ArticleHead iconName={content.eIcon} eyebrow={content.eEyebrow} title={content.eTitle} />

              {rights.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {rights.map((right, index) => (
                    <div
                      key={right.id || index}
                      className="rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 dark:border-white/5 dark:bg-[#071321]"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#54B848] mt-0.5" />
                        <div>
                          {right.title ? (
                            <h3 className="font-display text-sm font-bold text-[#15344F] dark:text-white">
                              {right.title}
                            </h3>
                          ) : null}
                          {right.text ? (
                            <p className="mt-1 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">
                              {right.text}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Additional Rights to Vulnerable Consumers */}
              {content.vulnerableTitle || vulnerableItems.length ? (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-500/20 dark:bg-amber-950/20">
                  {content.vulnerableTitle ? (
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      {content.vulnerableTitle}
                    </p>
                  ) : null}
                  {vulnerableItems.length ? (
                    <ul className="mt-3 space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                      {vulnerableItems.map((item, index) => (
                        <li key={item.id || index} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <span className="leading-relaxed">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </article>

            {/* ── Section F: Expectations from the Investors (Do’s & Don’ts) ── */}
            <article id="investor-responsibilities" className={ARTICLE}>
              <ArticleHead iconName={content.fIcon} eyebrow={content.fEyebrow} title={content.fTitle} />

              <div className="mt-8 space-y-8">
                {/* Do's Container */}
                {content.dosTitle || dosItems.length ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 dark:border-emerald-500/20 dark:bg-emerald-950/10">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      {content.dosTitle ? (
                        <h3 className="font-display text-lg font-bold">
                          {content.dosTitle}
                        </h3>
                      ) : null}
                    </div>

                    {dosItems.length ? (
                      <div className="mt-4 space-y-3">
                        {dosItems.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="flex items-start gap-3 rounded-lg border border-emerald-100 bg-white p-3.5 text-xs sm:text-sm text-[#18324A] dark:border-white/5 dark:bg-[#071321] dark:text-slate-200 shadow-2xs"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <div className="flex-1 leading-relaxed">
                              <span>{item.text}</span>
                              {hasLink(item.link) && item.link.label ? (
                                <div className="mt-2">
                                  <CmsLink
                                    link={item.link}
                                    className="inline-flex items-center gap-1 font-bold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                                  >
                                    <span>{item.link.label}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </CmsLink>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Don'ts Container */}
                {content.dontsTitle || dontsItems.length ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6 dark:border-rose-500/20 dark:bg-rose-950/10">
                    <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400">
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      {content.dontsTitle ? (
                        <h3 className="font-display text-lg font-bold">
                          {content.dontsTitle}
                        </h3>
                      ) : null}
                    </div>

                    {dontsItems.length ? (
                      <div className="mt-4 space-y-3">
                        {dontsItems.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="flex items-start gap-3 rounded-lg border border-rose-100 bg-white p-3.5 text-xs sm:text-sm text-[#18324A] dark:border-white/5 dark:bg-[#071321] dark:text-slate-200 shadow-2xs"
                          >
                            <XCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                            <span className="flex-1 leading-relaxed">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

          </div>

          {/* ── Right Column: Sticky Navigation & Authority Sidebar ── */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            {/* Table of Contents Nav Card */}
            {content.navEyebrow || content.navTitle || navItems.length ? (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
                {content.navEyebrow ? (
                  <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                    {content.navEyebrow}
                  </p>
                ) : null}
                {content.navTitle ? (
                  <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">
                    {content.navTitle}
                  </p>
                ) : null}

                {navItems.length ? (
                  <nav aria-label="Charter navigation sections" className="mt-4">
                    <ul className="space-y-1">
                      {navItems.map((sec) => (
                        <li key={sec.id || sec.target}>
                          <a
                            href={`#${sec.target}`}
                            onClick={(e) => scrollToSection(e, sec.target)}
                            className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#5E6D7B] transition-all hover:bg-slate-50 hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86]"
                          >
                            <span className="truncate">{sec.label}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-[#21649A] dark:text-[#8FCB86]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}
              </div>
            ) : null}

            {/* Grievance Quick Links Card */}
            {content.portalsEyebrow || content.portalsTitle || portals.length ? (
              <div className="rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-sm dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]">
                <div className="flex items-center gap-3">
                  {content.portalsIcon ? (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
                      <CmsIcon name={content.portalsIcon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div>
                    {content.portalsEyebrow ? (
                      <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                        {content.portalsEyebrow}
                      </p>
                    ) : null}
                    {content.portalsTitle ? (
                      <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">
                        {content.portalsTitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                {portals.length ? (
                  <div className="mt-4 space-y-2.5">
                    {portals.map((item, index) => (
                      <CmsLink
                        key={item.id || index}
                        link={item.link}
                        className="inline-flex w-full min-h-9 items-center justify-between rounded-xl border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      >
                        <span>{item.link.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </CmsLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              {content.contactEyebrow ? (
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                  {content.contactEyebrow}
                </p>
              ) : null}
              {content.contactTitle ? (
                <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">
                  {content.contactTitle}
                </p>
              ) : null}

              <div className="mt-4 space-y-3 text-xs text-[#5E6D7B] dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                  <a
                    href={company.emailHref}
                    className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                  >
                    {company.email}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                  <a href={company.phoneHref} className="font-medium hover:text-[#21649A] dark:hover:text-[#8FCB86]">
                    {company.phoneDisplay}
                  </a>
                </div>
                {content.contactAddress ? (
                  <div className="flex items-start gap-2.5">
                    <Building2 className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <span>{content.contactAddress}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
