import { Share2 } from "lucide-react";
import { AddButton, HiddenBadge, Input, ItemActions, Select, SettingsCard, confirmDelete } from "../../components/site/controls";
import { SOCIAL_PLATFORMS, SocialIcon } from "../../components/site/icons";
import { moveItem, newId, patchAt, removeAt } from "../../utils/list";

const PLATFORM_OPTIONS = Object.entries(SOCIAL_PLATFORMS).map(([value, { label }]) => ({ value, label }));

export default function SocialLinksEditor({ socialState }) {
  const { draft, update, meta } = socialState;
  const max = meta?.limits?.socialLinks || 12;
  const links = draft || [];

  const changePlatform = (index, platform) => {
    const current = links[index];
    const keepLabel = current.label && current.label !== SOCIAL_PLATFORMS[current.platform]?.label;
    update(patchAt(links, index, { platform, label: keepLabel ? current.label : SOCIAL_PLATFORMS[platform].label }));
  };

  const addLink = () => {
    const used = new Set(links.map((link) => link.platform));
    const platform = Object.keys(SOCIAL_PLATFORMS).find((key) => !used.has(key)) || "website";
    update([...links, { id: newId(), platform, label: SOCIAL_PLATFORMS[platform].label, url: "", visible: true }]);
  };

  return (
    <SettingsCard
      icon={Share2}
      title="Social Media Links"
      description={`${links.length} of ${max} profiles. Shown in the footer bottom bar and contact sections.`}
      actions={
        <AddButton onClick={addLink} disabled={links.length >= max}>
          Add Social Link
        </AddButton>
      }
    >
      {links.length ? (
        <ul className="space-y-3">
          {links.map((link, index) => (
            <li key={link.id} className={`rounded-2xl border border-line p-4 ${link.visible ? "" : "bg-subtle"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="flex min-w-0 items-center gap-3">
                  <SocialIcon platform={link.platform} className="h-8 w-8 shrink-0" />
                  <span className="truncate text-sm font-bold">{link.label || SOCIAL_PLATFORMS[link.platform]?.label}</span>
                  {link.visible ? null : <HiddenBadge />}
                </p>
                <ItemActions
                  index={index}
                  count={links.length}
                  visible={link.visible}
                  label={link.label || "link"}
                  onMove={(direction) => update(moveItem(links, index, direction))}
                  onToggle={() => update(patchAt(links, index, { visible: !link.visible }))}
                  onRemove={() => confirmDelete(link.label) && update(removeAt(links, index))}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[11rem_12rem_1fr]">
                <Select
                  label="Platform"
                  value={link.platform}
                  options={PLATFORM_OPTIONS}
                  onChange={(platform) => changePlatform(index, platform)}
                />
                <Input
                  label="Name"
                  value={link.label}
                  maxLength={40}
                  onChange={(label) => update(patchAt(links, index, { label }))}
                />
                <Input
                  label={link.platform === "email" ? "Email Address" : "Profile URL"}
                  type={link.platform === "email" ? "email" : "url"}
                  value={link.platform === "email" ? link.url.replace(/^mailto:/i, "") : link.url}
                  placeholder={SOCIAL_PLATFORMS[link.platform]?.placeholder}
                  maxLength={300}
                  onChange={(url) => update(patchAt(links, index, { url }))}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted rounded-xl border border-dashed border-line p-6 text-center text-sm">
          No social links yet. Click "Add Social Link" to add your social profiles.
        </p>
      )}
    </SettingsCard>
  );
}
