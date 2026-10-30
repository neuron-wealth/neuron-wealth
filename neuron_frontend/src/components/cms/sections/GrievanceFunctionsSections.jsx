import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight, Building2, Clock, ExternalLink, Mail, Phone, Smartphone, UserCheck } from "lucide-react";
import { company } from "../../../config/site";
import { CmsIcon, CmsLink, hasLink, strings, visibleItems } from "../primitives";

const CARD =
  "scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]";
const ICON_BOX =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]";
const INLINE_LINK = "font-bold text-[#21649A] hover:underline dark:text-[#8FCB86]";
const ADDRESS_BOX =
  "rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-4 sm:p-5 text-xs sm:text-sm text-[#15344F] dark:border-white/5 dark:bg-[#071321] dark:text-white";
const NAV_LINK =
  "group flex items-center justify-between rounded-xl text-xs font-semibold text-[#5E6D7B] transition-all hover:bg-slate-50 hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86]";
const SIDE_CARD = "rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]";
const SIDE_EYEBROW = "text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]";
const SIDE_TITLE = "mt-1 font-display text-base font-bold text-[#15344F] dark:text-white";
const GRADIENT_CARD =
  "rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-sm dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]";
const OUTLINE_BUTTON =
  "inline-flex w-full min-h-9 items-center rounded-xl border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white";
const PRIMARY_BUTTON =
  "inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#21649A] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#184a73] dark:bg-[#8FCB86] dark:text-[#061524]";

const linkOk = (link) => hasLink(link) && Boolean(link.label);

function useScrollTo() {
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

function ArticleHead({ icon, eyebrow, title }) {
  return (
    <div className="m-badge-row flex items-start gap-4">
      {icon ? (
        <span className={ICON_BOX}>
          <CmsIcon name={icon} className="h-5 w-5" />
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

/** Paragraph text with an inline link between a lead-in and a trailing part. */
function LinkedText({ before, link, after, spaceAfter = false }) {
  const showLink = linkOk(link);
  if (!before && !showLink && !after) return null;
  return (
    <p>
      {before}
      {before && showLink ? " " : null}
      {showLink ? (
        <CmsLink link={link} className={INLINE_LINK}>
          {link.label}
        </CmsLink>
      ) : null}
      {spaceAfter && after && (before || showLink) ? " " : null}
      {after}
    </p>
  );
}

function AddressBox({ name, lines }) {
  const rows = strings(lines);
  if (!name && !rows.length) return null;
  return (
    <div className={`${ADDRESS_BOX} space-y-1`}>
      {name ? <p className="font-bold text-[#21649A] dark:text-[#8FCB86]">{name}</p> : null}
      {rows.map((line, index) => (
        <p key={`${index}-${line}`} className={index === rows.length - 1 ? "font-semibold" : undefined}>
          {line}
        </p>
      ))}
    </div>
  );
}

function NavCard({ eyebrow, title, label, items, scrollTo, listClassName = "mt-4", linkPadding = "px-3 py-2" }) {
  return (
    <div className={SIDE_CARD}>
      {eyebrow ? <p className={SIDE_EYEBROW}>{eyebrow}</p> : null}
      {title ? <p className={SIDE_TITLE}>{title}</p> : null}

      {items.length ? (
        <nav aria-label={label} className={listClassName}>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.key}>
                <a href={`#${item.id}`} onClick={(e) => scrollTo(e, item.id)} className={`${NAV_LINK} ${linkPadding}`}>
                  <span className="truncate">{item.label}</span>
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

function GradientCardHead({ icon, eyebrow, title }) {
  return (
    <div className="flex items-center gap-3">
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
          <CmsIcon name={icon} className="h-5 w-5" />
        </span>
      ) : null}
      <div>
        {eyebrow ? (
          <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{eyebrow}</p>
        ) : null}
        {title ? <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">{title}</p> : null}
      </div>
    </div>
  );
}

export function GrievanceBody({ content, root }) {
  const c = content || {};
  const scrollTo = useScrollTo();
  const levels = visibleItems(c.levels);
  const portals = visibleItems(c.portals).filter((entry) => linkOk(entry.link));

  const ids = {
    process: c.processId || "redressal-process",
    matrix: c.matrixId || "escalation-matrix",
    timeline: c.timelineId || "turnaround-timeline",
    scores: c.scoresId || "sebi-scores",
    wro: c.wroId || "sebi-regional-office",
    odr: c.odrId || "smart-odr",
    physical: c.physicalId || "physical-complaints",
  };
  const nav = [
    { key: "process", id: ids.process, label: c.processNavLabel },
    { key: "matrix", id: ids.matrix, label: c.matrixNavLabel },
    { key: "timeline", id: ids.timeline, label: c.timelineNavLabel },
    { key: "scores", id: ids.scores, label: c.scoresNavLabel },
    { key: "wro", id: ids.wro, label: c.wroNavLabel },
    { key: "odr", id: ids.odr, label: c.odrNavLabel },
    { key: "physical", id: ids.physical, label: c.physicalNavLabel },
  ].filter((item) => item.label);

  const emailOk = linkOk(c.processEmail);
  const phoneOk = linkOk(c.processPhone);
  const showContact = c.processContactText || emailOk || c.processContactMiddle || phoneOk || c.processContactEnd;

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* Redressal Process */}
            <article id={ids.process} className={CARD}>
              <ArticleHead icon={c.processIcon} eyebrow={c.processEyebrow} title={c.processTitle} />

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                {c.processText ? <p>{c.processText}</p> : null}
                {c.processLead ? <p className="font-semibold text-[#15344F] dark:text-white">{c.processLead}</p> : null}
                {showContact ? (
                  <p>
                    {c.processContactText}
                    {c.processContactText && emailOk ? " " : null}
                    {emailOk ? (
                      <CmsLink link={c.processEmail} className={INLINE_LINK}>
                        {c.processEmail.label}
                      </CmsLink>
                    ) : null}
                    {c.processContactMiddle}
                    {c.processContactMiddle && phoneOk ? " " : null}
                    {phoneOk ? (
                      <CmsLink link={c.processPhone} className={INLINE_LINK}>
                        {c.processPhone.label}
                      </CmsLink>
                    ) : null}
                    {c.processContactEnd}
                  </p>
                ) : null}
                {c.processPostText ? <p>{c.processPostText}</p> : null}

                {c.processAddressName || c.processAddress ? (
                  <div className={ADDRESS_BOX}>
                    {c.processAddressName ? (
                      <p className="font-bold text-[#21649A] dark:text-[#8FCB86]">{c.processAddressName}</p>
                    ) : null}
                    {c.processAddress ? <p className="mt-1 text-[#5E6D7B] dark:text-slate-300">{c.processAddress}</p> : null}
                  </div>
                ) : null}

                {c.processNote ? (
                  <p className="text-xs sm:text-sm font-medium text-[#18324A] dark:text-slate-200">{c.processNote}</p>
                ) : null}
              </div>
            </article>

            {/* Escalation Matrix */}
            <article id={ids.matrix} className={CARD}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  {c.matrixEyebrow ? (
                    <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.matrixEyebrow}</p>
                  ) : null}
                  {c.matrixTitle ? (
                    <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {c.matrixTitle}
                    </h2>
                  ) : null}
                </div>
                {c.matrixBadge ? (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.matrixBadge}</span>
                ) : null}
              </div>

              {levels.length ? (
                <>
                  <div className="mt-6 hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-[#071321]">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-[#F4F8FC] text-[#21649A] dark:border-white/10 dark:bg-white/5 dark:text-[#8FCB86]">
                          <th className="py-3.5 px-3 font-bold">{c.colDesignation}</th>
                          <th className="py-3.5 px-3 font-bold">{c.colName}</th>
                          <th className="py-3.5 px-3 font-bold">{c.colAddress}</th>
                          <th className="py-3.5 px-3 font-bold">{c.colMobile}</th>
                          <th className="py-3.5 px-3 font-bold">{c.colEmail}</th>
                          <th className="py-3.5 px-3 font-bold">{c.colHours}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-[#18324A] dark:text-slate-200">
                        {levels.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3.5 px-3">
                              <span className="font-bold text-[#15344F] dark:text-white">{item.designation}</span>
                              <span className="block text-[0.625rem] font-semibold text-[#21649A] dark:text-[#8FCB86]">{item.level}</span>
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-[#15344F] dark:text-white">{item.name}</td>
                            <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 max-w-[200px] leading-relaxed">{item.address}</td>
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              {item.phone?.label ? (
                                <CmsLink link={item.phone} className="font-medium text-[#21649A] hover:underline dark:text-[#8FCB86]">
                                  {item.phone.label}
                                </CmsLink>
                              ) : null}
                            </td>
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              {item.email?.label ? (
                                <CmsLink link={item.email} className="font-medium text-[#21649A] hover:underline dark:text-[#8FCB86]">
                                  {item.email.label}
                                </CmsLink>
                              ) : null}
                            </td>
                            <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">{item.workingHours}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 md:hidden space-y-4">
                    {levels.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-xl border p-4 ${
                          item.highlight
                            ? "border-[#21649A]/30 bg-[#F4F8FC] dark:border-white/10 dark:bg-[#071321]"
                            : "border-slate-200/90 bg-[#F8FAFC] dark:border-white/5 dark:bg-[#071321]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#21649A] dark:text-[#8FCB86]">
                            {item.level && item.designation ? `${item.level} • ${item.designation}` : item.level || item.designation}
                          </span>
                          {item.workingHours ? (
                            <span className="text-[0.625rem] font-medium text-slate-500 dark:text-slate-400">{item.workingHours}</span>
                          ) : null}
                        </div>
                        {item.name ? (
                          <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">{item.name}</p>
                        ) : null}
                        {item.address ? (
                          <p className="mt-2 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{item.address}</p>
                        ) : null}

                        {item.phone?.label || item.email?.label ? (
                          <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-200/60 pt-3 text-xs dark:border-white/10">
                            {item.phone?.label ? (
                              <CmsLink
                                link={item.phone}
                                className="flex items-center gap-1.5 font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                              >
                                <Phone className="h-3.5 w-3.5" />
                                <span>{item.phone.label}</span>
                              </CmsLink>
                            ) : null}
                            {item.email?.label ? (
                              <CmsLink
                                link={item.email}
                                className="flex items-center gap-1.5 font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]"
                              >
                                <Mail className="h-3.5 w-3.5" />
                                <span>{item.email.label}</span>
                              </CmsLink>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </article>

            {/* Turnaround Timeline */}
            <article
              id={ids.timeline}
              className="scroll-mt-28 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-8 dark:border-amber-500/20 dark:bg-amber-950/20"
            >
              <div className="m-badge-row flex items-start gap-4">
                {c.timelineIcon ? (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs dark:bg-amber-500 dark:text-[#061524]">
                    <CmsIcon name={c.timelineIcon} className="h-5 w-5" />
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  {c.timelineTitle ? (
                    <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#15344F] dark:text-white">
                      {c.timelineTitle}
                    </h2>
                  ) : null}
                  {c.timelineTextStart || c.timelineHighlight || c.timelineTextEnd ? (
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-amber-950 dark:text-amber-100 font-medium">
                      {c.timelineTextStart}
                      {c.timelineTextStart && c.timelineHighlight ? " " : null}
                      {c.timelineHighlight ? <strong>{c.timelineHighlight}</strong> : null}
                      {(c.timelineTextStart || c.timelineHighlight) && c.timelineTextEnd ? " " : null}
                      {c.timelineTextEnd}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>

            {/* SEBI SCORES Platform */}
            <article id={ids.scores} className={CARD}>
              <ArticleHead icon={c.scoresIcon} eyebrow={c.scoresEyebrow} title={c.scoresTitle} />

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                <LinkedText before={c.scoresText} link={c.scoresLink} after={c.scoresTextEnd} spaceAfter />
                {c.scoresAppText ? <p>{c.scoresAppText}</p> : null}

                {linkOk(c.scoresWebButton) || linkOk(c.scoresAppButton) ? (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {linkOk(c.scoresWebButton) ? (
                      <CmsLink link={c.scoresWebButton} className={PRIMARY_BUTTON}>
                        <span>{c.scoresWebButton.label}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </CmsLink>
                    ) : null}
                    {linkOk(c.scoresAppButton) ? (
                      <CmsLink
                        link={c.scoresAppButton}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      >
                        <Smartphone className="h-3.5 w-3.5 text-[#54B848]" />
                        <span>{c.scoresAppButton.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </CmsLink>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

            {/* SEBI Regional Office (WRO) */}
            <article id={ids.wro} className={CARD}>
              <ArticleHead icon={c.wroIcon} eyebrow={c.wroEyebrow} title={c.wroTitle} />

              <div className="mt-6 space-y-3 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                {c.wroText ? <p>{c.wroText}</p> : null}
                <AddressBox name={c.wroAddressName} lines={c.wroAddressLines} />
              </div>
            </article>

            {/* Smart ODR Portal */}
            <article id={ids.odr} className={CARD}>
              <ArticleHead icon={c.odrIcon} eyebrow={c.odrEyebrow} title={c.odrTitle} />

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                <LinkedText before={c.odrText} link={c.odrLink} after={c.odrTextEnd} />

                {linkOk(c.odrButton) ? (
                  <div className="pt-2">
                    <CmsLink link={c.odrButton} className={PRIMARY_BUTTON}>
                      <span>{c.odrButton.label}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </CmsLink>
                  </div>
                ) : null}
              </div>
            </article>

            {/* Physical Complaints to SEBI */}
            <article id={ids.physical} className={CARD}>
              <ArticleHead icon={c.physicalIcon} eyebrow={c.physicalEyebrow} title={c.physicalTitle} />

              <div className="mt-6 space-y-3 text-sm sm:text-base leading-relaxed text-[#5E6D7B] dark:text-slate-300">
                {c.physicalText ? <p>{c.physicalText}</p> : null}
                <AddressBox name={c.physicalAddressName} lines={c.physicalAddressLines} />
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            <NavCard
              eyebrow={c.navEyebrow}
              title={c.navTitle}
              label="Grievance navigation stages"
              items={nav}
              scrollTo={scrollTo}
            />

            <div className={GRADIENT_CARD}>
              <GradientCardHead icon={c.portalsIcon} eyebrow={c.portalsEyebrow} title={c.portalsTitle} />

              {portals.length ? (
                <div className="mt-4 space-y-2.5">
                  {portals.map((entry) => (
                    <CmsLink key={entry.id} link={entry.link} className={`${OUTLINE_BUTTON} justify-between`}>
                      <span>{entry.link.label}</span>
                      {entry.iconStyle === "app" ? (
                        <Smartphone className="h-3 w-3 text-[#54B848]" />
                      ) : (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </CmsLink>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={SIDE_CARD}>
              {c.contactEyebrow ? <p className={SIDE_EYEBROW}>{c.contactEyebrow}</p> : null}
              {c.contactTitle ? <p className={SIDE_TITLE}>{c.contactTitle}</p> : null}

              <div className="mt-4 space-y-3 text-xs text-[#5E6D7B] dark:text-slate-300">
                {c.contactName ? (
                  <div className="flex items-start gap-2.5">
                    <UserCheck className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <span className="font-semibold text-[#15344F] dark:text-white">{c.contactName}</span>
                  </div>
                ) : null}
                {linkOk(c.contactEmail) ? (
                  <div className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <CmsLink link={c.contactEmail} className="font-semibold text-[#21649A] hover:underline dark:text-[#8FCB86]">
                      {c.contactEmail.label}
                    </CmsLink>
                  </div>
                ) : null}
                {linkOk(c.contactPhone) ? (
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <CmsLink link={c.contactPhone} className="font-medium hover:text-[#21649A] dark:hover:text-[#8FCB86]">
                      {c.contactPhone.label}
                    </CmsLink>
                  </div>
                ) : null}
                {c.contactHours ? (
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-[#21649A] dark:text-[#8FCB86] mt-0.5" />
                    <span>{c.contactHours}</span>
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

export function IaFunctionsBody({ content, root }) {
  const c = content || {};
  const scrollTo = useScrollTo();
  const functions = visibleItems(c.functions).map((item) => ({ ...item, anchor: item.anchor || item.id }));
  const rows = visibleItems(c.frameworkRows);
  const nav = functions.map((item) => ({
    key: item.id,
    id: item.anchor,
    label: `${item.number ? `${item.number}. ` : ""}${item.title || ""}`,
  }));

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {c.preambleEyebrow || c.preambleTitle ? (
              <article
                id="statutory-preamble"
                className="scroll-mt-28 rounded-2xl border border-[#21649A]/20 bg-[#F4F8FC] p-5 sm:p-8 dark:border-white/10 dark:bg-[#102A40]/70"
              >
                <div className="m-badge-row flex items-start gap-4">
                  {c.preambleIcon ? (
                    <span className={ICON_BOX}>
                      <CmsIcon name={c.preambleIcon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    {c.preambleEyebrow ? (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">{c.preambleEyebrow}</p>
                    ) : null}
                    {c.preambleTitle ? (
                      <h2 className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-[#15344F] dark:text-white leading-snug">
                        {c.preambleTitle}
                      </h2>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}

            <div className="space-y-5">
              {functions.map((item) => {
                const paras = strings(item.paragraphs);
                return (
                  <article
                    key={item.id}
                    id={item.anchor}
                    className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all hover:border-[#21649A]/30 dark:border-white/10 dark:bg-[#102A40]"
                  >
                    <div className="m-badge-row flex items-start gap-4 sm:gap-5">
                      {item.number ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] font-display text-sm font-bold text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                          {item.number}
                        </span>
                      ) : null}

                      <div className="min-w-0 flex-1">
                        {item.title ? (
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[#15344F] dark:text-white">{item.title}</h3>
                        ) : null}

                        {paras.length ? (
                          <div className="mt-3 text-sm sm:text-base leading-relaxed text-[#18324A] dark:text-slate-200">
                            {paras.length === 1 ? (
                              <p>{paras[0]}</p>
                            ) : (
                              <div className="space-y-3">
                                {paras.map((para, index) => (
                                  <p key={index}>{para}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            <NavCard
              eyebrow={c.navEyebrow}
              title={c.navTitle}
              label="Functions navigation"
              items={nav}
              scrollTo={scrollTo}
              listClassName="mt-4 max-h-[380px] overflow-y-auto pr-1"
              linkPadding="px-3 py-1.5"
            />

            <div className={GRADIENT_CARD}>
              <GradientCardHead icon={c.frameworkIcon} eyebrow={c.frameworkEyebrow} title={c.frameworkTitle} />

              {rows.length ? (
                <div className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 text-xs text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                  {rows.map((row) => (
                    <div key={row.id} className="flex justify-between">
                      <span className="text-slate-400">{row.label}</span>
                      <span className={row.highlight ? "font-semibold text-[#54B848]" : "font-semibold text-[#15344F] dark:text-white"}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              {linkOk(c.frameworkLink) ? (
                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                  <CmsLink link={c.frameworkLink} className={`${OUTLINE_BUTTON} justify-center gap-1.5`}>
                    <span>{c.frameworkLink.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </CmsLink>
                </div>
              ) : null}
            </div>

            <div className={SIDE_CARD}>
              {c.contactEyebrow ? <p className={SIDE_EYEBROW}>{c.contactEyebrow}</p> : null}
              {c.contactTitle ? <p className={SIDE_TITLE}>{c.contactTitle}</p> : null}

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
          </aside>
        </div>
      </div>
    </section>
  );
}
