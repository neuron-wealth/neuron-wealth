import { forwardRef, useState } from "react";
import { ChevronDown, Crosshair, FileText, Paintbrush } from "lucide-react";
import { Input } from "../../components/site/controls";
import { GroupedFields } from "../../components/cms/fields/FieldRenderer";
import RowActions from "../../components/cms/fields/RowActions";
import DesignPanel from "../../components/cms/DesignPanel";
import { sectionIcon } from "../../components/cms/sectionIcons";

const TABS = [
  { id: "content", label: "Content", icon: FileText },
  { id: "design", label: "Design & Layout", icon: Paintbrush },
];

const SectionCard = forwardRef(function SectionCard(
  { section, index, count, type, expanded, canDuplicate, onToggle, onChange, onMove, onDuplicate, onRemove, onLocate },
  ref
) {
  const [tab, setTab] = useState("content");
  const Icon = sectionIcon(type?.icon);
  const hidden = section.visible === false;
  const headline = section.content?.title || section.content?.leaderName || "";

  if (!type) {
    return (
      <li ref={ref} className="panel rounded-2xl p-4 text-sm">
        Unknown section type “{section.type}”. It is skipped on the website.
      </li>
    );
  }

  const setContent = (key, value) => onChange({ ...section, content: { ...section.content, [key]: value } });

  return (
    <li ref={ref} className={`panel scroll-mt-24 overflow-hidden rounded-2xl transition-shadow ${expanded ? "ring-2 ring-[var(--accent-soft)]" : ""}`}>
      <div className={`flex items-center gap-2 py-2 pl-2 pr-2 sm:pl-3 ${hidden ? "opacity-70" : ""}`}>
        <button type="button" onClick={onToggle} aria-expanded={expanded} className="focus-ring flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-1.5 text-left">
          <span className="muted w-5 shrink-0 text-right text-xs font-bold">{index + 1}</span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${expanded ? "bg-accent text-white" : "bg-[var(--accent-soft)] text-accent"}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-bold">{section.label || type.label}</span>
              {hidden ? (
                <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.625rem] font-bold text-amber-700 dark:text-amber-300">Hidden</span>
              ) : null}
            </span>
            <span className="muted block truncate text-xs">
              {type.label}
              {headline && headline !== section.label ? ` · ${headline}` : ""}
            </span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-soft transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <button type="button" onClick={onLocate} className="icon-btn focus-ring hidden h-8 w-8 sm:inline-flex" aria-label={`Show ${section.label} in preview`} title="Show in preview">
          <Crosshair className="h-4 w-4" aria-hidden="true" />
        </button>
        <RowActions
          index={index}
          count={count}
          visible={!hidden}
          label={section.label || type.label}
          onMove={onMove}
          onToggle={() => onChange({ ...section, visible: hidden })}
          onDuplicate={onDuplicate}
          duplicateDisabled={!canDuplicate}
          onRemove={onRemove}
        />
      </div>

      {expanded ? (
        <div className="border-t border-line">
          <div className="flex gap-1 border-b border-line bg-subtle px-3 pt-2" role="tablist" aria-label={`${section.label} editor`}>
            {TABS.map((entry) => {
              const TabIcon = entry.icon;
              const active = tab === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(entry.id)}
                  className={`-mb-px inline-flex items-center gap-1.5 rounded-t-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                    active ? "border-line border-b-[var(--surface)] bg-surface text-ink" : "border-transparent text-soft hover:text-ink"
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {entry.label}
                </button>
              );
            })}
          </div>
          <div className="p-4 sm:p-5" role="tabpanel">
            {tab === "content" ? (
              <GroupedFields fields={type.fields} values={section.content} onChange={setContent} />
            ) : (
              <div className="space-y-5">
                <Input
                  label="Section Name (Admin Only)"
                  value={section.label}
                  maxLength={60}
                  hint="Helps you find this section in the list. Not shown on the website."
                  onChange={(label) => onChange({ ...section, label })}
                />
                <DesignPanel type={type} design={section.design || {}} onChange={(design) => onChange({ ...section, design })} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </li>
  );
});

export default SectionCard;
