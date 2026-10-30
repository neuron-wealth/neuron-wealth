import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Input, Select, TextArea, Toggle } from "../../site/controls";
import IconPicker from "../../site/IconPicker";
import { CMS_ICONS } from "../cmsIcons";
import { assetUrl } from "../../../config/site";
import { WIDE_KINDS, blankItem, getPath, withNewIds } from "../../../utils/cms";
import { moveItem, patchAt, removeAt } from "../../../utils/list";
import ImageField from "./ImageField";
import LinkField from "./LinkField";
import RowActions from "./RowActions";
import StringListField from "./StringListField";
import TableField from "./TableField";

function ItemPreview({ item, fields }) {
  const imageField = fields.find((field) => field.kind === "image");
  const iconField = fields.find((field) => field.kind === "icon");
  const url = imageField ? item[imageField.key]?.url : "";
  const Icon = iconField ? CMS_ICONS[item[iconField.key]] : null;
  if (url) return <img src={assetUrl(url)} alt="" className="h-9 w-9 shrink-0 rounded-lg border border-line object-cover" />;
  if (Icon)
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-accent">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  return null;
}

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(() => new Set());
  const maxLimit = typeof field.max === "number" ? field.max : 20;
  const itemLabel = typeof field.itemLabel === "string" ? field.itemLabel : "Item";
  const full = items.length >= maxLimit;

  const toggle = (id) =>
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = () => {
    const item = blankItem(field);
    onChange([...items, item]);
    setOpen((previous) => new Set(previous).add(item.id));
  };

  const duplicate = (index) => {
    const copy = withNewIds(items[index]);
    onChange([...items.slice(0, index + 1), copy, ...items.slice(index + 1)]);
    setOpen((previous) => new Set(previous).add(copy.id));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold">{field.label}</span>
        <span className="muted text-xs">
          {items.length}/{maxLimit}
        </span>
      </div>
      {items.length ? (
        <ul className="mt-2 space-y-2">
          {items.map((item, index) => {
            const title = getPath(item, field.titleKey) || `${itemLabel} ${index + 1}`;
            const expanded = open.has(item.id);
            const hidden = item.visible === false;
            return (
              <li key={item.id} className={`rounded-xl border border-line bg-surface ${hidden ? "opacity-70" : ""}`}>
                <div className="flex items-center gap-2 py-1.5 pl-2 pr-1.5">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={expanded}
                    className="focus-ring flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-1 py-1 text-left"
                  >
                    <span className="muted w-5 shrink-0 text-right text-[0.6875rem] font-bold">{index + 1}</span>
                    <ItemPreview item={item} fields={Array.isArray(field.fields) ? field.fields : []} />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</span>
                    {hidden ? <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.625rem] font-bold text-amber-700 dark:text-amber-300">Hidden</span> : null}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-soft transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <RowActions
                    index={index}
                    count={items.length}
                    visible={!hidden}
                    label={title}
                    onMove={(direction) => onChange(moveItem(items, index, direction))}
                    onToggle={() => onChange(patchAt(items, index, { visible: hidden }))}
                    onDuplicate={() => duplicate(index)}
                    duplicateDisabled={full}
                    onRemove={() => window.confirm(`Delete "${title}"?`) && onChange(removeAt(items, index))}
                  />
                </div>
                {expanded ? (
                  <div className="border-t border-line p-3.5">
                    <FieldGrid fields={Array.isArray(field.fields) ? field.fields : []} values={item} onChange={(key, next) => onChange(patchAt(items, index, { [key]: next }))} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="muted mt-2 rounded-xl border border-dashed border-line p-4 text-center text-xs">No {field.label.toLowerCase()} yet.</p>
      )}
      <button
        type="button"
        onClick={add}
        disabled={full}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line px-3 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add {itemLabel}
      </button>
    </div>
  );
}

export function FieldRenderer({ field, value, onChange }) {
  switch (field.kind) {
    case "text":
      return <Input label={field.label} value={value} maxLength={field.max} hint={field.hint} onChange={onChange} />;
    case "textarea":
      return <TextArea label={field.label} value={value} maxLength={field.max} hint={field.hint} rows={field.max > 500 ? 4 : 3} onChange={onChange} />;
    case "link":
      return <LinkField field={field} value={value} onChange={onChange} />;
    case "image":
      return <ImageField field={field} value={value} onChange={onChange} />;
    case "icon":
      return <IconPicker label={field.label} value={value} icons={CMS_ICONS} onChange={onChange} />;
    case "tags":
      return <StringListField field={field} value={value} onChange={onChange} />;
    case "paragraphs":
      return <StringListField field={field} value={value} onChange={onChange} multiline />;
    case "toggle":
      return (
        <div className="flex h-full items-center rounded-xl border border-line bg-subtle px-3.5 py-3">
          <Toggle className="w-full" label={field.label} description={field.hint} checked={Boolean(value)} onChange={onChange} />
        </div>
      );
    case "select":
      return <Select label={field.label} value={value} options={field.options} onChange={onChange} />;
    case "table":
      return <TableField field={field} value={value} onChange={onChange} />;
    case "list":
      return <ListField field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

export function FieldGrid({ fields, values, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key} className={WIDE_KINDS.has(field.kind) ? "sm:col-span-2" : ""}>
          <FieldRenderer field={field} value={values?.[field.key]} onChange={(next) => onChange(field.key, next)} />
        </div>
      ))}
    </div>
  );
}

/** Splits a section's fields into titled groups ("Content" first) for easier scanning. */
export function GroupedFields({ fields, values, onChange }) {
  const groups = [];
  for (const field of fields) {
    const name = field.group || "Content";
    let group = groups.find((entry) => entry.name === name);
    if (!group) {
      group = { name, fields: [] };
      groups.push(group);
    }
    group.fields.push(field);
  }
  if (groups.length === 1) return <FieldGrid fields={fields} values={values} onChange={onChange} />;
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.name}>
          <h4 className="mb-3 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-soft">
            <span className="h-px w-4 bg-accent" aria-hidden="true" />
            {group.name}
          </h4>
          <FieldGrid fields={group.fields} values={values} onChange={onChange} />
        </section>
      ))}
    </div>
  );
}
