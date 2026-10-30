import { useState } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { Mail, Phone, ArrowRight, ExternalLink, Building2 } from "lucide-react";
import { company } from "../../../config/site";
import { visibleItems, safeHref, hasLink, CmsIcon, CmsLink } from "../primitives";

const ALL_PAGES = "all";
const TAB_ACTIVE = "bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]";
const TAB_IDLE = "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300";
const EYEBROW = "text-xs font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]";
const H2 = "mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15344F] dark:text-white";

const anchorId = (value) => (typeof value === "string" ? value.trim().replace(/^#/, "") : "");

function DocumentPage({ doc, caption, openLabel }) {
  const url = safeHref(doc.image?.url);
  return (
    <>
      {url ? <img src={url} alt={doc.image?.alt || ""} className="w-full rounded-lg shadow-sm" loading="lazy" /> : null}
      <div className="flex justify-between items-center text-xs text-slate-500 pt-2 px-1">
        <span>{caption}</span>
        {url && openLabel ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#21649A] hover:underline dark:text-[#8FCB86]"
          >
            <span>{openLabel}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </>
  );
}

function IconBadge({ name }) {
  if (!name) return null;
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
      <CmsIcon name={name} className="h-5 w-5" />
    </span>
  );
}

export function CfaCodeBody({ content: c, root }) {
  const reduce = useReducedMotion();
  const documents = visibleItems(c.documents);
  const ethics = visibleItems(c.ethics);
  const standards = visibleItems(c.standards);
  const navItems = visibleItems(c.navItems).filter((item) => anchorId(item.target));
  const facts = visibleItems(c.credentialFacts);
  const [selectedTab, setSelectedTab] = useState(null);
  const activeTab =
    selectedTab === ALL_PAGES || documents.some((doc) => doc.id === selectedTab) ? selectedTab : documents[0]?.id;
  const activeDoc = documents.find((doc) => doc.id === activeTab);
  const afterName = c.preambleText || "";
  const nameGap = c.preambleName && afterName && !/^[,.;:!?)]/.test(afterName) ? " " : null;

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

  const tabClass = (key) => `rounded-xl px-4 py-2 text-xs font-bold transition-all ${activeTab === key ? TAB_ACTIVE : TAB_IDLE}`;

  return (
    <section {...root} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#07131e]">
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* ── Left Column: All Core Content Sections ── */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* ── Section 1: Official Document Repository ── */}
            <article
              id="document-view"
              className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
            >
              <div className="m-badge-row flex items-start gap-4">
                <IconBadge name={c.docIcon} />
                <div className="min-w-0 flex-1">
                  {c.docEyebrow ? <p className={EYEBROW}>{c.docEyebrow}</p> : null}
                  {c.docTitle ? <h2 className={H2}>{c.docTitle}</h2> : null}
                  {c.docText ? <p className="mt-2 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300">{c.docText}</p> : null}
                </div>
              </div>

              {documents.length ? (
                <>
                  {/* Document Switcher Tabs */}
                  <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
                    {documents.map((doc) => (
                      <button key={doc.id} type="button" onClick={() => setSelectedTab(doc.id)} className={tabClass(doc.id)}>
                        {doc.label}
                      </button>
                    ))}
                    {c.allTabLabel ? (
                      <button type="button" onClick={() => setSelectedTab(ALL_PAGES)} className={tabClass(ALL_PAGES)}>
                        {c.allTabLabel}
                      </button>
                    ) : null}
                  </div>

                  {/* Document Images Viewer */}
                  <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-4 dark:border-white/10 dark:bg-[#071321]">
                    {activeDoc ? (
                      <div className="space-y-3">
                        <DocumentPage doc={activeDoc} caption={activeDoc.caption} openLabel={c.openLabel} />
                      </div>
                    ) : null}

                    {activeTab === ALL_PAGES && (
                      <div className="space-y-6">
                        {documents.map((doc, index) => (
                          <div
                            key={doc.id}
                            className={index === 0 ? "space-y-3" : "border-t border-slate-200 pt-6 dark:border-white/10 space-y-3"}
                          >
                            <DocumentPage doc={doc} caption={doc.allCaption} openLabel={c.openLabel} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </article>

            {/* ── Section 2: CFA Charterholder Preamble ── */}
            <article
              id="cfa-preamble"
              className="scroll-mt-28 rounded-2xl border border-[#21649A]/20 bg-[#F4F8FC] p-5 sm:p-8 dark:border-white/10 dark:bg-[#102A40]/70"
            >
              <div className="m-badge-row flex items-start gap-4">
                <IconBadge name={c.preambleIcon} />
                <div className="min-w-0 flex-1">
                  {c.preambleEyebrow ? <p className={EYEBROW}>{c.preambleEyebrow}</p> : null}
                  {c.preambleTitle ? <h2 className={H2}>{c.preambleTitle}</h2> : null}
                  {c.preambleLead || c.preambleName || afterName ? (
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#18324A] dark:text-slate-200">
                      {c.preambleLead}
                      {c.preambleLead && c.preambleName ? " " : null}
                      {c.preambleName ? <strong>{c.preambleName}</strong> : null}
                      {nameGap}
                      {afterName}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>

            {/* ── Section 3: The Code of Ethics ── */}
            <article
              id="code-of-ethics"
              className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#102A40]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  {c.ethicsEyebrow ? <p className={EYEBROW}>{c.ethicsEyebrow}</p> : null}
                  {c.ethicsTitle ? <h2 className={H2}>{c.ethicsTitle}</h2> : null}
                </div>
                {c.ethicsBadge ? <span className={EYEBROW}>{c.ethicsBadge}</span> : null}
              </div>

              {c.ethicsIntro ? <p className="mt-3 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300">{c.ethicsIntro}</p> : null}

              {ethics.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {ethics.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 text-xs sm:text-sm dark:border-white/5 dark:bg-[#071321]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#21649A]/10 text-xs font-bold text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
                        {index + 1}
                      </span>
                      <div>
                        {item.title ? <h3 className="font-display font-bold text-[#15344F] dark:text-white">{item.title}</h3> : null}
                        {item.desc ? <p className="mt-1 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{item.desc}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>

            {/* ── Section 4: Standards of Professional Conduct ── */}
            <div id="standards-conduct" className="space-y-6">
              <div>
                {c.standardsEyebrow ? <p className={EYEBROW}>{c.standardsEyebrow}</p> : null}
                {c.standardsTitle ? <h2 className={H2}>{c.standardsTitle}</h2> : null}
                {c.standardsText ? <p className="mt-2 text-xs sm:text-sm text-[#5E6D7B] dark:text-slate-300">{c.standardsText}</p> : null}
              </div>

              {standards.length ? (
                <div className="space-y-6">
                  {standards.map((sec) => {
                    const subs = visibleItems(sec.substandards);
                    return (
                      <article
                        key={sec.id}
                        id={anchorId(sec.anchor) || sec.id}
                        className={`scroll-mt-28 rounded-2xl border p-6 sm:p-7 shadow-sm transition-colors ${
                          sec.highlight
                            ? "border-[#21649A]/30 bg-[#F4F8FC] dark:border-white/15 dark:bg-[#102A40]"
                            : "border-slate-200/90 bg-white dark:border-white/10 dark:bg-[#102A40]"
                        }`}
                      >
                        <div className="m-badge-row flex items-start gap-4">
                          {sec.roman ? (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] font-display text-sm font-bold text-white shadow-xs dark:bg-[#8FCB86] dark:text-[#061524]">
                              {sec.roman}
                            </span>
                          ) : null}
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-lg sm:text-xl font-bold text-[#15344F] dark:text-white">
                              {sec.roman ? `${sec.roman}. ` : null}
                              {sec.title}
                            </h3>

                            {subs.length ? (
                              <div className="mt-4 space-y-3.5">
                                {subs.map((sub) => (
                                  <div
                                    key={sub.id || sub.code}
                                    className="rounded-xl border border-slate-200/80 bg-white p-4 text-xs sm:text-sm dark:border-white/5 dark:bg-[#071321]"
                                  >
                                    <div className="flex items-baseline gap-2">
                                      {sub.code ? <span className="font-bold text-[#21649A] dark:text-[#8FCB86]">{sub.code}</span> : null}
                                      {sub.name ? <h4 className="font-display font-bold text-[#15344F] dark:text-white">{sub.name}</h4> : null}
                                    </div>
                                    {sub.desc ? (
                                      <p className="mt-1.5 text-xs text-[#5E6D7B] dark:text-slate-300 leading-relaxed">{sub.desc}</p>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* ── Right Column: Sticky Navigation & Authority Sidebar ── */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
            {/* Table of Contents Nav Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              {c.navEyebrow ? (
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">{c.navEyebrow}</p>
              ) : null}
              {c.navTitle ? <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">{c.navTitle}</p> : null}

              {navItems.length ? (
                <nav aria-label="CFA Code navigation" className="mt-4 max-h-[380px] overflow-y-auto pr-1">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      const target = anchorId(item.target);
                      return (
                        <li key={item.id || target}>
                          <a
                            href={`#${target}`}
                            onClick={(e) => scrollToSection(e, target)}
                            className="group flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold text-[#5E6D7B] transition-all hover:bg-slate-50 hover:text-[#21649A] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8FCB86]"
                          >
                            <span className="truncate">{item.label}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-[#21649A] dark:text-[#8FCB86]" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ) : null}
            </div>

            {/* CFA Institute Credential Card */}
            <div className="rounded-2xl border border-[#21649A]/20 bg-gradient-to-br from-[#F4F8FC] to-white p-6 shadow-sm dark:border-white/10 dark:from-[#102A40] dark:to-[#0c1828]">
              <div className="flex items-center gap-3">
                {c.credentialIcon ? (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21649A] text-white dark:bg-[#8FCB86] dark:text-[#061524]">
                    <CmsIcon name={c.credentialIcon} className="h-5 w-5" />
                  </span>
                ) : null}
                <div>
                  {c.credentialEyebrow ? (
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#21649A] dark:text-[#8FCB86]">
                      {c.credentialEyebrow}
                    </p>
                  ) : null}
                  {c.credentialTitle ? (
                    <p className="font-display text-sm font-bold text-[#15344F] dark:text-white">{c.credentialTitle}</p>
                  ) : null}
                </div>
              </div>

              {facts.length ? (
                <div className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 text-xs text-[#5E6D7B] dark:border-white/10 dark:text-slate-300">
                  {facts.map((fact) => (
                    <div key={fact.id} className="flex justify-between">
                      <span className="text-slate-400">{fact.label}</span>
                      <span className={fact.accent ? "font-semibold text-[#54B848]" : "font-semibold text-[#15344F] dark:text-white"}>
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              {hasLink(c.credentialLink) && c.credentialLink.label ? (
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

            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102A40]">
              {c.contactEyebrow ? (
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#21649A] dark:text-[#8FCB86]">
                  {c.contactEyebrow}
                </p>
              ) : null}
              {c.contactTitle ? <p className="mt-1 font-display text-base font-bold text-[#15344F] dark:text-white">{c.contactTitle}</p> : null}

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
