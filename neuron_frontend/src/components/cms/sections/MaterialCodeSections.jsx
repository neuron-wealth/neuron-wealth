import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight, Building2, CheckCircle2, ExternalLink, Mail, Phone } from "lucide-react";
import { company } from "../../../config/site";
import { CmsIcon, CmsLink, hasLink, strings, visibleItems } from "../primitives";

function useScrollToSection() {
  const reduce = useReducedMotion();
  return (e, id) => {
    e?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  };
}

function SidebarNav({ eyebrow, title, ariaLabel, entries, onNavigate }) {
  if (!eyebrow && !title && !entries.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
      {eyebrow ? (
        <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">{eyebrow}</p>
      ) : null}
      {title ? <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">{title}</p> : null}

      {entries.length ? (
        <nav aria-label={ariaLabel} className="mt-4">
          <ul className="space-y-1">
            {entries.map((entry) => (
              <li key={entry.key}>
                <a
                  href={`#${entry.target}`}
                  onClick={(e) => onNavigate(e, entry.target)}
                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#5E6D7B] transition-all hover:bg-slate-50 hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86]"
                >
                  <span className="truncate">{entry.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-[#21649A] dark:text-[#8FCB86]" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

function CredentialCard({ c }) {
  const facts = visibleItems(c.credentialFacts);
  const showLink = hasLink(c.credentialLink) && c.credentialLink.label;
  if (!c.credentialIcon && !c.credentialLabel && !c.credentialValue && !facts.length && !showLink) return null;
  return (
    <div className="rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-sm dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]">
      {c.credentialIcon || c.credentialLabel || c.credentialValue ? (
        <div className="flex items-center gap-3">
          {c.credentialIcon ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
              <CmsIcon name={c.credentialIcon} className="h-5 w-5" />
            </span>
          ) : null}
          <div>
            {c.credentialLabel ? (
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                {c.credentialLabel}
              </p>
            ) : null}
            {c.credentialValue ? (
              <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">{c.credentialValue}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {facts.length ? (
        <div className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 text-xs text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
          {facts.map((fact) => (
            <div key={fact.id} className="flex justify-between">
              <span className="text-slate-400">{fact.label}</span>
              <span className={fact.highlight ? "font-semibold text-[#54B848]" : "font-semibold text-[#15344F] dark:text-white"}>
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {showLink ? (
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10">
          <CmsLink
            link={c.credentialLink}
            className="inline-flex w-full min-h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            <span>{c.credentialLink.label}</span>
            <ExternalLink className="h-3 w-3" />
          </CmsLink>
        </div>
      ) : null}
    </div>
  );
}

function ContactCard({ c }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
      {c.contactEyebrow ? (
        <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">{c.contactEyebrow}</p>
      ) : null}
      {c.contactTitle ? (
        <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">{c.contactTitle}</p>
      ) : null}

      <div className="mt-4 space-y-3 text-xs text-[#5E6D7B] dark:text-slate-300">
        <div className="flex items-start gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
          <a href={company.emailHref} className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]">
            {company.email}
          </a>
        </div>
        <div className="flex items-start gap-2.5">
          <Phone className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
          <a href={company.phoneHref} className="font-medium hover:text-[#21649A] dark:hover:text-[#8FCB86]">
            {company.phoneDisplay}
          </a>
        </div>
        {c.contactAddress ? (
          <div className="flex items-start gap-2.5">
            <Building2 className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
            <span>{c.contactAddress}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MaterialInfoBody({ content: c, root }) {
  const scrollToSection = useScrollToSection();

  const entityItems = visibleItems(c.entityItems);
  const showVerifyLink = hasLink(c.verifyLink) && c.verifyLink.label;
  const showVerify = Boolean(c.verifyEyebrow || c.verifyText || showVerifyLink);
  const services = strings(c.servicesParagraphs);
  const teamMembers = visibleItems(c.teamMembers);
  const principal = strings(c.principalParagraphs);
  const aspects = visibleItems(c.aspects);
  const showFees = Boolean(c.feesTitle || c.feesModel || c.feesText);
  const showTerms = Boolean(c.termsTitle || c.termsText);

  const articles = [
    { target: "statutory-directive", label: c.directiveNav, show: Boolean(c.directiveEyebrow || c.directiveTitle || c.directiveText) },
    { target: "entity-particulars", label: c.entityNav, show: Boolean(c.entityTitle || c.entityText || entityItems.length || showVerify) },
    { target: "services-brief", label: c.servicesNav, show: Boolean(c.servicesTitle || services.length) },
    { target: "team-roster", label: c.teamNav, show: Boolean(c.teamTitle || c.teamBadge || teamMembers.length) },
    { target: "principal-officer", label: c.principalNav, show: Boolean(c.principalEyebrow || c.principalTitle || principal.length) },
    { target: "team-relations", label: c.relationsNav, show: Boolean(c.relationsTitle || c.relationsText) },
    { target: "disciplinary-record", label: c.disciplinaryNav, show: Boolean(c.disciplinaryTitle || c.disciplinaryText) },
    { target: "fiduciary-aspects", label: c.aspectsNav, show: Boolean(c.aspectsTitle || aspects.length) },
    { target: "fees-terms", label: c.feesNav, show: showFees || showTerms },
  ];
  const show = Object.fromEntries(articles.map((article) => [article.target, article.show]));
  const navEntries = articles
    .filter((article) => article.show && article.label)
    .map((article) => ({ key: article.target, target: article.target, label: article.label }));

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {show["statutory-directive"] ? (
              <article
                id="statutory-directive"
                className="scroll-mt-28 rounded-2xl border border-[#21649A]/20 bg-[#F4F8FC] p-5 sm:p-8 dark:border-white/10 dark:bg-[#102A40]/70"
              >
                <div className="m-badge-row flex items-start gap-4">
                  {c.directiveIcon ? (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                      <CmsIcon name={c.directiveIcon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    {c.directiveEyebrow ? (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.directiveEyebrow}</p>
                    ) : null}
                    {c.directiveTitle ? (
                      <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                        {c.directiveTitle}
                      </h2>
                    ) : null}
                    {c.directiveText ? (
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#18324A] dark:text-slate-200 font-medium">
                        {c.directiveText}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}

            {show["entity-particulars"] ? (
              <article
                id="entity-particulars"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.entityTitle ? (
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                    {c.entityTitle}
                  </h2>
                ) : null}
                {c.entityText ? <p className="mt-2 text-sm text-[#5E6D7B] dark:text-slate-300">{c.entityText}</p> : null}

                {entityItems.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {entityItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-4 sm:p-5 dark:border-white/5 dark:bg-[#071321]"
                      >
                        {item.icon ? (
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs ${
                              item.highlight
                                ? "bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]"
                                : "bg-white text-[#21649A] border border-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-[#8FCB86]"
                            }`}
                          >
                            <CmsIcon name={item.icon} className="h-5 w-5" />
                          </span>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          {item.label ? (
                            <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#5E6D7B] dark:text-slate-400">
                              {item.label}
                            </p>
                          ) : null}
                          {item.value ? (
                            <p
                              className={`mt-1 font-display text-sm sm:text-base tracking-tight ${
                                item.highlight
                                  ? "font-bold text-[#21649A] dark:text-[#8FCB86]"
                                  : "font-semibold text-[#15344F] dark:text-white"
                              }`}
                            >
                              {item.value}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {showVerify ? (
                  <div className="mt-6 rounded-xl border border-[#21649A]/30 bg-[#21649A]/5 p-4 sm:p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {c.verifyEyebrow || c.verifyText ? (
                        <div>
                          {c.verifyEyebrow ? (
                            <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                              {c.verifyEyebrow}
                            </p>
                          ) : null}
                          {c.verifyText ? (
                            <p className="mt-1 text-xs sm:text-sm text-[#15344F] dark:text-white">{c.verifyText}</p>
                          ) : null}
                        </div>
                      ) : null}
                      {showVerifyLink ? (
                        <CmsLink
                          link={c.verifyLink}
                          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#21649A] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#184a73] dark:bg-[#8FCB86] dark:text-[#061524]"
                        >
                          <span>{c.verifyLink.label}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </CmsLink>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </article>
            ) : null}

            {show["services-brief"] ? (
              <article
                id="services-brief"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.servicesTitle ? (
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                    {c.servicesTitle}
                  </h2>
                ) : null}

                {services.length ? (
                  <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                    {services.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </article>
            ) : null}

            {show["team-roster"] ? (
              <article
                id="team-roster"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.teamTitle || c.teamBadge ? (
                  <div className="flex items-center justify-between gap-4">
                    {c.teamTitle ? (
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                        {c.teamTitle}
                      </h2>
                    ) : null}
                    {c.teamBadge ? (
                      <span className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.teamBadge}</span>
                    ) : null}
                  </div>
                ) : null}

                {teamMembers.length ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`rounded-xl border p-4 transition-colors ${
                          member.highlight
                            ? "border-[#21649A]/30 bg-[#F4F8FC] dark:border-white/15 dark:bg-white/5"
                            : "border-slate-200/80 bg-[#F8FAFC] dark:border-white/5 dark:bg-[#071321]"
                        }`}
                      >
                        {member.name || member.category ? (
                          <div className="flex items-baseline justify-between gap-2">
                            {member.name ? (
                              <p className="font-display text-sm sm:text-base font-bold text-[#15344F] dark:text-white">{member.name}</p>
                            ) : null}
                            {member.category ? (
                              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                                {member.category}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                        {member.role ? (
                          <p className="mt-1 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{member.role}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ) : null}

            {show["principal-officer"] ? (
              <article
                id="principal-officer"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.principalIcon || c.principalEyebrow || c.principalTitle ? (
                  <div className="flex items-center gap-3">
                    {c.principalIcon ? (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                        <CmsIcon name={c.principalIcon} className="h-5 w-5" />
                      </span>
                    ) : null}
                    <div>
                      {c.principalEyebrow ? (
                        <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.principalEyebrow}</p>
                      ) : null}
                      {c.principalTitle ? (
                        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                          {c.principalTitle}
                        </h2>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {principal.length ? (
                  <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                    {principal.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </article>
            ) : null}

            {show["team-relations"] ? (
              <article
                id="team-relations"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.relationsTitle ? (
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                    {c.relationsTitle}
                  </h2>
                ) : null}

                {c.relationsText ? (
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">{c.relationsText}</p>
                ) : null}
              </article>
            ) : null}

            {show["disciplinary-record"] ? (
              <article
                id="disciplinary-record"
                className="scroll-mt-28 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-8 dark:border-emerald-500/20 dark:bg-emerald-950/20"
              >
                <div className="m-badge-row flex items-start gap-4">
                  {c.disciplinaryIcon ? (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#54B848] text-white shadow-xs dark:bg-emerald-500 dark:text-[#061524]">
                      <CmsIcon name={c.disciplinaryIcon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    {c.disciplinaryTitle ? (
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                        {c.disciplinaryTitle}
                      </h2>
                    ) : null}
                    {c.disciplinaryText ? (
                      <p className="mt-2 text-sm sm:text-base leading-relaxed font-medium text-emerald-950 dark:text-emerald-100">
                        {c.disciplinaryText}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}

            {show["fiduciary-aspects"] ? (
              <article
                id="fiduciary-aspects"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                {c.aspectsTitle ? (
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                    {c.aspectsTitle}
                  </h2>
                ) : null}

                {aspects.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {aspects.map((aspect) => (
                      <div
                        key={aspect.id}
                        className="rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 sm:p-5 dark:border-white/5 dark:bg-[#071321]"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#54B848] mt-0.5" />
                          <div>
                            {aspect.title ? (
                              <h3 className="font-display text-sm font-bold text-[#15344F] dark:text-white">{aspect.title}</h3>
                            ) : null}
                            {aspect.detail ? (
                              <p className="mt-1 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{aspect.detail}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ) : null}

            {show["fees-terms"] ? (
              <article
                id="fees-terms"
                className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
              >
                <div className="space-y-6">
                  {showFees ? (
                    <div>
                      {c.feesTitle ? (
                        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                          {c.feesTitle}
                        </h2>
                      ) : null}
                      {c.feesModel || c.feesText ? (
                        <div className="mt-3 rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-4 sm:p-5 dark:border-white/5 dark:bg-[#071321]">
                          {c.feesModel ? <p className="text-sm font-semibold text-[#15344F] dark:text-white">{c.feesModel}</p> : null}
                          {c.feesText ? (
                            <p className="mt-1 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{c.feesText}</p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {showTerms ? (
                    <div className="border-t border-slate-100 pt-5 dark:border-white/10">
                      {c.termsTitle ? (
                        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#15344F] dark:text-white">
                          {c.termsTitle}
                        </h2>
                      ) : null}
                      {c.termsText ? <p className="mt-2 text-sm text-[#5E6D7B] dark:text-slate-300">{c.termsText}</p> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            <SidebarNav
              eyebrow={c.navEyebrow}
              title={c.navTitle}
              ariaLabel="Material information sections"
              entries={navEntries}
              onNavigate={scrollToSection}
            />
            <CredentialCard c={c} />
            <ContactCard c={c} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export function SebiCodeBody({ content: c, root }) {
  const scrollToSection = useScrollToSection();

  const principles = visibleItems(c.principles);
  const showDirective = Boolean(c.directiveEyebrow || c.directiveTitle || c.directiveText);
  const navEntries = principles
    .filter((p) => p.number || p.title)
    .map((p) => ({
      key: p.id,
      target: p.anchor || p.id,
      label: (
        <>
          {p.number ? `${p.number}. ` : null}
          {p.title}
        </>
      ),
    }));

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {showDirective ? (
              <article
                id="statutory-directive"
                className="scroll-mt-28 rounded-2xl border border-[#21649A]/20 bg-[#F4F8FC] p-5 sm:p-8 dark:border-white/10 dark:bg-[#102A40]/70"
              >
                <div className="m-badge-row flex items-start gap-4">
                  {c.directiveIcon ? (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                      <CmsIcon name={c.directiveIcon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    {c.directiveEyebrow ? (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.directiveEyebrow}</p>
                    ) : null}
                    {c.directiveTitle ? (
                      <h2 className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-[#15344F] dark:text-white">
                        {c.directiveTitle}
                      </h2>
                    ) : null}
                    {c.directiveText ? (
                      <p className="mt-3 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{c.directiveText}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}

            {principles.length ? (
              <div className="space-y-5">
                {principles.map((p) => (
                  <article
                    key={p.id}
                    id={p.anchor || p.id}
                    className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all hover:border-[#21649A]/30 dark:border-white/10 dark:bg-[#102A40]"
                  >
                    <div className="m-badge-row flex items-start gap-4 sm:gap-5">
                      {p.number ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] font-display text-sm font-bold text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                          {p.number}
                        </span>
                      ) : null}

                      <div className="min-w-0 flex-1">
                        {p.title ? (
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-lg sm:text-xl font-bold text-[#15344F] dark:text-white">{p.title}</h3>
                          </div>
                        ) : null}

                        {p.statement ? (
                          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#18324A] dark:text-slate-200 font-normal">
                            {p.statement}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            <SidebarNav
              eyebrow={c.navEyebrow}
              title={c.navTitle}
              ariaLabel="Code principles navigation"
              entries={navEntries}
              onNavigate={scrollToSection}
            />
            <CredentialCard c={c} />
            <ContactCard c={c} />
          </aside>
        </div>
      </div>
    </section>
  );
}
