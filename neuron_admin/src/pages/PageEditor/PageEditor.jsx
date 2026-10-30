import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LayoutList, Plus, RotateCcw, Save, Settings2 } from "lucide-react";
import Alert from "../../components/ui/Alert";
import { Skeleton } from "../../components/ui/Skeleton";
import { CMS_ICONS } from "../../components/cms/cmsIcons";
import { CmsMetaContext } from "../../components/cms/CmsMetaContext";
import { moveItem } from "../../utils/list";
import { newSection, withNewIds } from "../../utils/cms";
import { plural, timeAgo } from "../../utils/format";
import usePageEditor from "./usePageEditor";
import SectionCard from "./SectionCard";
import AddSectionDialog from "./AddSectionDialog";
import PageSettings from "./PageSettings";
import LivePreview from "../../components/cms/LivePreview";

function StatusPill({ status }) {
  const published = status === "published";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide ${
        published ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function EditorSkeleton() {
  return (
    <div className="space-y-5">
      <p className="sr-only">Loading page</p>
      <Skeleton className="h-36 rounded-2xl" />
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="space-y-3">
          {[0, 1, 2, 3].map((key) => (
            <Skeleton key={key} className="h-16 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[60vh] rounded-2xl" />
      </div>
    </div>
  );
}

export default function PageEditor() {
  const { slug } = useParams();
  const { meta, page, draft, error, saving, dirty, update, save, discard, reset, remove, reload } = usePageEditor(slug);
  const [tab, setTab] = useState("sections");
  const [expanded, setExpanded] = useState(null);
  const [adding, setAdding] = useState(false);
  const [focus, setFocus] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [scrollTo, setScrollTo] = useState(null);
  const cardRefs = useRef(new Map());

  const types = useMemo(() => new Map((meta?.sectionTypes || []).map((type) => [type.type, type])), [meta]);

  useEffect(() => {
    if (!scrollTo) return;
    cardRefs.current.get(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setScrollTo(null);
  }, [scrollTo]);

  if (error && !draft) {
    return (
      <div className="max-w-3xl">
        <Link to="/website/cms" className="muted inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All Pages
        </Link>
        <Alert tone="error" className="mt-4">
          {error}{" "}
          <button type="button" onClick={reload} className="font-bold underline">
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  if (!draft || !meta) return <EditorSkeleton />;

  const sections = draft.sections;
  const maxSections = meta.limits.sections;
  const full = sections.length >= maxSections;
  const path = page.core ? page.path : `/${page.slug}`;
  const PageIcon = CMS_ICONS[draft.icon] || LayoutList;
  const hiddenCount = sections.filter((section) => section.visible === false).length;

  const setSections = (change) => update((previous) => ({ ...previous, sections: change(previous.sections) }));
  const locate = (id) => setFocus({ id, at: Date.now() });

  const toggleSection = (id) => {
    const opening = expanded !== id;
    setExpanded(opening ? id : null);
    if (opening) locate(id);
  };

  const selectFromPreview = (id) => {
    setTab("sections");
    setExpanded(id);
    setScrollTo(id);
  };

  const addSection = (type) => {
    const section = newSection(type, meta.designDefaults);
    const index = sections.findIndex((entry) => entry.id === expanded);
    setSections((list) => (index < 0 ? [...list, section] : [...list.slice(0, index + 1), section, ...list.slice(index + 1)]));
    setAdding(false);
    setTab("sections");
    setExpanded(section.id);
    setScrollTo(section.id);
    locate(section.id);
  };

  const duplicateSection = (index) => {
    const copy = withNewIds(sections[index]);
    copy.label = `${copy.label} (Copy)`.slice(0, 60);
    copy.design = { ...copy.design, anchor: "" };
    setSections((list) => [...list.slice(0, index + 1), copy, ...list.slice(index + 1)]);
    setExpanded(copy.id);
    setScrollTo(copy.id);
  };

  const removeSection = (index) => {
    const section = sections[index];
    if (!window.confirm(`Delete the section "${section.label}"? It is removed from the website when you save.`)) return;
    setSections((list) => list.filter((_, position) => position !== index));
    if (expanded === section.id) setExpanded(null);
  };

  const afterLabel = sections.find((entry) => entry.id === expanded)?.label;

  return (
    <CmsMetaContext.Provider value={meta}>
      <div className="pb-24">
        <header className="panel rise-in rounded-2xl p-5 sm:p-6">
          <Link to="/website/cms" className="focus-ring muted inline-flex items-center gap-1.5 rounded-md text-xs font-bold hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All Pages
          </Link>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-deep text-white shadow-sm">
                <PageIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{draft.title || "Untitled Page"}</h1>
                  <StatusPill status={draft.status} />
                  {page.core ? (
                    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">Core</span>
                  ) : null}
                </div>
                <p className="muted mt-1 flex flex-wrap items-center gap-x-2 text-xs">
                  <span className="font-mono">{path}</span>
                  <span aria-hidden="true">·</span>
                  <span>{plural(sections.length, "section")}</span>
                  {hiddenCount ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{hiddenCount} hidden</span>
                    </>
                  ) : null}
                  <span aria-hidden="true">·</span>
                  <span>{page.seeded === false ? "Preloaded content (not yet saved)" : `Updated ${timeAgo(page.updatedAt)}`}</span>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {page.core ? (
                <button
                  type="button"
                  onClick={reset}
                  disabled={saving}
                  className="btn btn-secondary focus-ring h-10 px-3.5 text-xs font-semibold"
                  title="Reload original preloaded content for this page"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Restore Defaults
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setShowPreview((value) => !value)}
                className="btn btn-secondary focus-ring hidden h-10 px-4 xl:inline-flex"
                aria-pressed={showPreview}
              >
                {showPreview ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button type="button" onClick={() => setAdding(true)} disabled={full} className="btn btn-primary focus-ring h-10 px-4" title={full ? `A page can have up to ${maxSections} sections` : undefined}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add Section
              </button>
            </div>
          </div>

          <div className="-mb-5 mt-5 flex gap-1 border-t border-line pt-2 sm:-mb-6" role="tablist" aria-label="Page editor">
            {[
              { id: "sections", label: `Sections (${sections.length})`, icon: LayoutList },
              { id: "settings", label: "Page Settings", icon: Settings2 },
            ].map((entry) => {
              const Icon = entry.icon;
              const active = tab === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(entry.id)}
                  className={`focus-ring inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-bold transition-colors ${
                    active ? "border-accent text-ink" : "border-transparent text-soft hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {entry.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className={`mt-5 grid items-start gap-5 ${showPreview ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : ""}`}>
          <div className="min-w-0" role="tabpanel">
            {tab === "sections" ? (
              <>
                {sections.length ? (
                  <ol className="space-y-3">
                    {sections.map((section, index) => (
                      <SectionCard
                        key={section.id}
                        ref={(node) => (node ? cardRefs.current.set(section.id, node) : cardRefs.current.delete(section.id))}
                        section={section}
                        index={index}
                        count={sections.length}
                        type={types.get(section.type)}
                        expanded={expanded === section.id}
                        canDuplicate={!full}
                        onToggle={() => toggleSection(section.id)}
                        onLocate={() => locate(section.id)}
                        onChange={(next) => setSections((list) => list.map((entry) => (entry.id === section.id ? next : entry)))}
                        onMove={(direction) => setSections((list) => moveItem(list, index, direction))}
                        onDuplicate={() => duplicateSection(index)}
                        onRemove={() => removeSection(index)}
                      />
                    ))}
                  </ol>
                ) : (
                  <div className="panel rounded-2xl p-10 text-center">
                    <p className="font-bold">This page has no sections yet</p>
                    <p className="muted mt-1 text-sm">Add a hero, text, cards, a table or any other section to start building it.</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setAdding(true)}
                  disabled={full}
                  className="focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line px-4 py-4 text-sm font-bold text-accent transition-colors hover:border-accent hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {full ? `Section limit reached (${maxSections})` : afterLabel ? `Add Section After “${afterLabel}”` : "Add Section"}
                </button>
              </>
            ) : (
              <PageSettings draft={draft} page={page} meta={meta} update={update} onReset={reset} onRemove={remove} saving={saving} />
            )}
          </div>

          {showPreview ? (
            <div className="min-w-0 xl:sticky xl:top-20">
              <LivePreview page={draft} path={path} focus={focus} onSelect={selectFromPreview} />
            </div>
          ) : null}
        </div>

        {dirty ? (
          <div className="sticky bottom-4 z-20 mt-6">
            <div className="menu-panel rise-in flex flex-col gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle" aria-hidden="true" />
                Unsaved changes. The website updates after you save.
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={discard} disabled={saving} className="btn btn-secondary focus-ring h-10 px-4">
                  Discard
                </button>
                <button type="button" onClick={save} disabled={saving} className="btn btn-primary focus-ring h-10 px-5">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <AddSectionDialog
          open={adding}
          types={meta.sectionTypes}
          afterLabel={afterLabel}
          onPick={addSection}
          onClose={() => setAdding(false)}
        />
      </div>
    </CmsMetaContext.Provider>
  );
}
