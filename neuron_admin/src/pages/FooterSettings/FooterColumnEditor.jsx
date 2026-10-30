import IconPicker from "../../components/site/IconPicker";
import { AddButton, HiddenBadge, Input, ItemActions, confirmDelete } from "../../components/site/controls";
import { moveItem, newId, patchAt, removeAt } from "../../utils/list";

export default function FooterColumnEditor({ column, index, count, maxLinks, onChange, onMove, onRemove }) {
  const links = column.links;
  const setLinks = (next) => onChange({ links: next });

  return (
    <li className="rounded-2xl border border-line p-4">
      <div className="flex items-end gap-3">
        <Input className="flex-1" label={`Column ${index + 1} Heading`} value={column.heading} maxLength={40} onChange={(heading) => onChange({ heading })} />
        <ItemActions index={index} count={count} label={column.heading || "column"} onMove={onMove} onRemove={onRemove} />
      </div>

      <ul className="mt-4 space-y-2">
        {links.map((link, linkIndex) => (
          <li key={link.id} className={`rounded-xl border border-line p-3 ${link.visible ? "" : "bg-subtle"}`}>
            <div className="grid items-end gap-3 sm:grid-cols-[7.5rem_1fr_1fr_auto]">
              <IconPicker
                label="Icon"
                value={link.icon || ""}
                onChange={(icon) => setLinks(patchAt(links, linkIndex, { icon }))}
              />
              <Input
                label="Label"
                value={link.label}
                maxLength={60}
                onChange={(label) => setLinks(patchAt(links, linkIndex, { label }))}
              />
              <Input
                label="Link"
                value={link.href}
                maxLength={300}
                placeholder="/page"
                onChange={(href) => setLinks(patchAt(links, linkIndex, { href }))}
              />
              <div className="flex items-center gap-2 pb-1.5">
                {link.visible ? null : <HiddenBadge />}
                <ItemActions
                  index={linkIndex}
                  count={links.length}
                  visible={link.visible}
                  label={link.label || "link"}
                  onMove={(direction) => setLinks(moveItem(links, linkIndex, direction))}
                  onToggle={() => setLinks(patchAt(links, linkIndex, { visible: !link.visible }))}
                  onRemove={() => confirmDelete(link.label) && setLinks(removeAt(links, linkIndex))}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <AddButton
          onClick={() => setLinks([...links, { id: newId(), label: "New Link", href: "/", icon: "", visible: true }])}
          disabled={links.length >= maxLinks}
          title={`Up to ${maxLinks} links per column`}
        >
          Add Link
        </AddButton>
      </div>
    </li>
  );
}
