import { useState } from "react";
import { ChevronRight } from "lucide-react";
import IconPicker from "../../components/site/IconPicker";
import { AddButton, HiddenBadge, Input, ItemActions, Select, Toggle, confirmDelete } from "../../components/site/controls";
import { moveItem, newId, patchAt, removeAt } from "../../utils/list";

const LINK_HINT = 'Use a page path such as "/about", or a full https:// address.';

function SubmenuLink({ child, index, count, onChange, onMove, onRemove }) {
  return (
    <li className={`rounded-xl border border-line p-3 ${child.visible ? "bg-surface" : "bg-subtle"}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <span className="truncate">{child.label || "Untitled link"}</span>
          {child.visible ? null : <HiddenBadge />}
        </p>
        <ItemActions
          index={index}
          count={count}
          visible={child.visible}
          label={child.label || "link"}
          onMove={onMove}
          onToggle={() => onChange({ visible: !child.visible })}
          onRemove={onRemove}
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[9rem_1fr_1fr]">
        <IconPicker value={child.icon} onChange={(icon) => onChange({ icon })} />
        <Input label="Label" value={child.label} maxLength={60} onChange={(label) => onChange({ label })} />
        <Input label="Link" value={child.href} maxLength={300} onChange={(href) => onChange({ href })} placeholder="/page" />
      </div>
    </li>
  );
}

export default function MenuItemEditor({ item, index, count, maxChildren, onChange, onMove, onRemove }) {
  const [open, setOpen] = useState(false);
  const children = item.children;
  const visibleChildren = children.filter((child) => child.visible).length;
  const setChildren = (next) => onChange({ children: next });

  const addChild = () => {
    setChildren([...children, { id: newId(), label: "New Link", href: "/", description: "", icon: "", visible: true }]);
    setOpen(true);
  };

  return (
    <li className={`rounded-2xl border border-line ${item.visible ? "" : "opacity-80"}`}>
      <div className="flex items-center gap-2 p-3 sm:p-4">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="focus-ring flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
        >
          <ChevronRight className={`h-4 w-4 shrink-0 text-soft transition-transform ${open ? "rotate-90" : ""}`} aria-hidden="true" />
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-bold">{item.label || "Untitled item"}</span>
              {item.visible ? null : <HiddenBadge />}
            </span>
            <span className="muted block truncate text-xs">
              {item.href}
              {children.length ? ` · Dropdown with ${visibleChildren} of ${children.length} links shown` : " · Plain link"}
            </span>
          </span>
        </button>
        <ItemActions
          index={index}
          count={count}
          visible={item.visible}
          label={item.label || "menu item"}
          onMove={onMove}
          onToggle={() => onChange({ visible: !item.visible })}
          onRemove={onRemove}
        />
      </div>

      {open ? (
        <div className="space-y-5 border-t border-line p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Menu Label" value={item.label} maxLength={40} onChange={(label) => onChange({ label })} />
            <Input label="Link" value={item.href} maxLength={300} hint={LINK_HINT} onChange={(href) => onChange({ href })} />
          </div>

          <div className="rounded-xl bg-subtle p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold">Dropdown Links</h3>
                <p className="muted text-xs">
                  {children.length ? "Shown when a visitor hovers or taps this item." : "No dropdown. Add a link to turn this item into a dropdown."}
                </p>
              </div>
              <AddButton onClick={addChild} disabled={children.length >= maxChildren} title={`Up to ${maxChildren} links`}>
                Add Dropdown Link
              </AddButton>
            </div>

            {children.length ? (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Input label="Dropdown Title (optional)" value={item.menuTitle} maxLength={60} onChange={(menuTitle) => onChange({ menuTitle })} />
                  <Input
                    label="Dropdown Subtitle (optional)"
                    value={item.menuSubtitle}
                    maxLength={60}
                    onChange={(menuSubtitle) => onChange({ menuSubtitle })}
                  />
                  <Select
                    label="Layout"
                    value={item.layout}
                    onChange={(layout) => onChange({ layout })}
                    options={[
                      { value: "list", label: "Single column list" },
                      { value: "grid", label: "Wide two-column grid" },
                    ]}
                  />
                </div>
                <ul className="mt-4 space-y-3">
                  {children.map((child, childIndex) => (
                    <SubmenuLink
                      key={child.id}
                      child={child}
                      index={childIndex}
                      count={children.length}
                      onChange={(changes) => setChildren(patchAt(children, childIndex, changes))}
                      onMove={(direction) => setChildren(moveItem(children, childIndex, direction))}
                      onRemove={() => confirmDelete(child.label) && setChildren(removeAt(children, childIndex))}
                    />
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <Toggle
            checked={item.visible}
            onChange={(visible) => onChange({ visible })}
            label="Show in Website Header"
            description="Hidden items stay saved here and can be shown again at any time."
          />
        </div>
      ) : null}
    </li>
  );
}
