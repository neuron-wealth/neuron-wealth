import { useMemo, useState } from "react";
import { Columns3, MapPin, Megaphone, Palette, PanelBottom, X } from "lucide-react";
import SitePageShell from "../../components/site/SitePageShell";
import LivePreview from "../../components/cms/LivePreview";
import { SITE_CONTENT } from "../../config/siteContent";
import IconPicker from "../../components/site/IconPicker";
import { AddButton, ColorField, Input, SettingsCard, TextArea, Toggle, confirmDelete } from "../../components/site/controls";
import useSiteSection from "../../hooks/useSiteSection";
import { moveItem, newId, patchAt, removeAt, replaceAt } from "../../utils/list";
import FooterColumnEditor from "./FooterColumnEditor";
import SocialLinksEditor from "./SocialLinksEditor";

const COLOR_FIELDS = [
  ["background", "Background"],
  ["bottomBar", "Bottom Bar Background"],
  ["text", "Text"],
  ["accent", "Accent (Headings & Button)"],
  ["accentSoft", "Soft Accent (Icons & Labels)"],
];

const TABS = [
  { id: "all", label: "All Settings" },
  { id: "social", label: "Social Media" },
  { id: "columns", label: "Link Columns" },
  { id: "address", label: "Address & Contact" },
  { id: "brand", label: "Brand & Newsletter" },
  { id: "colors", label: "Colours" },
];

export default function FooterSettings() {
  const footerState = useSiteSection("footer");
  const socialState = useSiteSection("social");

  const [activeTab, setActiveTab] = useState("all");

  const { draft, update, meta, settings } = footerState;
  const limits = meta?.limits || { footerColumns: 5, footerLinks: 15, addressLines: 6 };

  const isDirty = footerState.dirty || socialState.dirty;
  const isSaving = footerState.saving || socialState.saving;

  const combinedState = {
    draft: footerState.draft && socialState.draft ? { ...footerState.draft, _social: socialState.draft } : null,
    error: footerState.error || socialState.error,
    saving: isSaving,
    dirty: isDirty,
    save: async () => {
      const promises = [];
      if (footerState.dirty) promises.push(footerState.save());
      if (socialState.dirty) promises.push(socialState.save());
      await Promise.all(promises);
    },
    discard: () => {
      if (footerState.dirty) footerState.discard();
      if (socialState.dirty) socialState.discard();
    },
    reset: async (confirmText) => {
      if (!window.confirm(confirmText)) return;
      await Promise.all([footerState.reset(null), socialState.reset(null)]);
    },
    reload: () => {
      footerState.reload();
      socialState.reload();
    },
  };

  const set = (key, value) => update((previous) => ({ ...previous, [key]: value }));
  const setNested = (key, changes) => update((previous) => ({ ...previous, [key]: { ...previous[key], ...changes } }));

  const savedBranding = settings?.branding;
  const previewSettings = useMemo(
    () => (draft && socialState.draft ? { footer: draft, social: socialState.draft, branding: savedBranding } : null),
    [draft, socialState.draft, savedBranding]
  );
  const shell = {
    title: "Footer & Social",
    description: "Text, contact details, link columns, social media profiles and colours of the website footer.",
    icon: SITE_CONTENT.footer.icon,
    tone: SITE_CONTENT.footer.tone,
    state: combinedState,
  };

  if (!draft) {
    return <SitePageShell {...shell} />;
  }

  const { address, contact, subscribe, bottom, columns } = draft;
  const setColumns = (next) => set("columns", next);
  const setLines = (lines) => setNested("address", { lines });

  const showColors = activeTab === "all" || activeTab === "colors";
  const showBrand = activeTab === "all" || activeTab === "brand";
  const showAddress = activeTab === "all" || activeTab === "address";
  const showColumns = activeTab === "all" || activeTab === "columns";
  const showSocial = activeTab === "all" || activeTab === "social";

  return (
    <SitePageShell
      {...shell}
      resetConfirm="Restore the original footer content, social links and colours? Your changes will be replaced."
      preview={
        <LivePreview
          settings={previewSettings}
          scrollTo="bottom"
          note="Shows your unsaved footer and social links at the bottom of the Home page. Links are disabled here."
        />
      }
    >
      {/* Quick Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-line bg-subtle p-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-accent text-white shadow-sm"
                : "text-soft hover:bg-card hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Colours Card */}
      {showColors ? (
        <SettingsCard icon={Palette} title="Colours" description="Background, text and accent colours of the footer.">
          <div className="grid gap-4 sm:grid-cols-2">
            {COLOR_FIELDS.map(([key, label]) => (
              <ColorField key={key} label={label} value={draft.colors[key]} onChange={(value) => setNested("colors", { [key]: value })} />
            ))}
          </div>
        </SettingsCard>
      ) : null}

      {/* Brand Text & Newsletter */}
      {showBrand ? (
        <SettingsCard icon={Megaphone} title="Brand Text & Newsletter" description="Shown next to the logo at the top of the footer.">
          <TextArea label="Description Under the Logo" value={draft.description} maxLength={400} onChange={(value) => set("description", value)} />
          <div className="mt-5 rounded-xl bg-subtle p-4">
            <Toggle
              checked={subscribe.enabled}
              onChange={(enabled) => setNested("subscribe", { enabled })}
              label="Show Newsletter Sign-Up"
              description="Opens an email draft to the footer email address. No data is stored."
            />
            {subscribe.enabled ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                <Input label="Heading" value={subscribe.heading} maxLength={80} onChange={(heading) => setNested("subscribe", { heading })} />
                <Input label="Supporting Text" value={subscribe.text} maxLength={160} onChange={(text) => setNested("subscribe", { text })} />
                <Input label="Button Label" value={subscribe.buttonLabel} maxLength={24} onChange={(buttonLabel) => setNested("subscribe", { buttonLabel })} />
              </div>
            ) : null}
          </div>
        </SettingsCard>
      ) : null}

      {/* Address & Contact Details */}
      {showAddress ? (
        <SettingsCard icon={MapPin} title="Address & Contact" description="The first address line is shown in bold. Customize icons and text.">
          <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] items-end gap-3">
            <IconPicker
              label="Address Icon"
              value={address.icon || "MapPin"}
              onChange={(icon) => setNested("address", { icon })}
            />
            <Input label="Address Heading" value={address.heading} maxLength={40} onChange={(heading) => setNested("address", { heading })} />
          </div>
          <div className="mt-4 space-y-2">
            <span className="field-label">Address Lines</span>
            {address.lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  className="field px-3.5"
                  aria-label={`Address line ${index + 1}`}
                  value={line}
                  maxLength={100}
                  onChange={(event) => setLines(replaceAt(address.lines, index, event.target.value))}
                />
                <button
                  type="button"
                  className="icon-btn focus-ring h-10 w-10 shrink-0 text-red-600 dark:text-red-400"
                  onClick={() => setLines(removeAt(address.lines, index))}
                  aria-label={`Remove address line ${index + 1}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
            <AddButton onClick={() => setLines([...address.lines, ""])} disabled={address.lines.length >= limits.addressLines}>
              Add Address Line
            </AddButton>
          </div>
          <div className="mt-5 grid gap-3 2xl:grid-cols-2">
            <div className="grid grid-cols-[8.5rem_1fr] items-end gap-2.5">
              <IconPicker
                label="Phone Icon"
                value={contact.phoneIcon || "Phone"}
                onChange={(phoneIcon) => setNested("contact", { phoneIcon })}
              />
              <Input
                label="Phone Number"
                value={contact.phone}
                maxLength={30}
                placeholder="+91 90000 00000"
                onChange={(phone) => setNested("contact", { phone })}
              />
            </div>

            <div className="grid grid-cols-[8.5rem_1fr] items-end gap-2.5">
              <IconPicker
                label="Email Icon"
                value={contact.emailIcon || "Mail"}
                onChange={(emailIcon) => setNested("contact", { emailIcon })}
              />
              <Input
                label="Email Address"
                type="email"
                value={contact.email}
                maxLength={120}
                hint="Also used by the newsletter sign-up."
                onChange={(email) => setNested("contact", { email })}
              />
            </div>
          </div>
        </SettingsCard>
      ) : null}

      {/* Link Columns */}
      {showColumns ? (
        <SettingsCard
          icon={Columns3}
          title="Link Columns"
          description={`${columns.length} of ${limits.footerColumns} columns. Columns with no visible links are not shown.`}
          actions={
            <AddButton
              onClick={() => setColumns([...columns, { id: newId(), heading: "New Column", links: [] }])}
              disabled={columns.length >= limits.footerColumns}
            >
              Add Column
            </AddButton>
          }
        >
          <ul className="space-y-3">
            {columns.map((column, index) => (
              <FooterColumnEditor
                key={column.id}
                column={column}
                index={index}
                count={columns.length}
                maxLinks={limits.footerLinks}
                onChange={(changes) => setColumns(patchAt(columns, index, changes))}
                onMove={(direction) => setColumns(moveItem(columns, index, direction))}
                onRemove={() => confirmDelete(column.heading) && setColumns(removeAt(columns, index))}
              />
            ))}
          </ul>
        </SettingsCard>
      ) : null}

      {/* Bottom Bar Settings */}
      {showSocial ? (
        <SettingsCard icon={PanelBottom} title="Bottom Bar" description="Copyright line and social media icons toggle.">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Copyright Name"
              value={bottom.copyright}
              maxLength={80}
              hint={`Shown as "© ${new Date().getFullYear()} ${bottom.copyright || "…"}. All rights reserved."`}
              onChange={(copyright) => setNested("bottom", { copyright })}
            />
            <Input label="Social Icons Label" value={bottom.socialLabel} maxLength={40} onChange={(socialLabel) => setNested("bottom", { socialLabel })} />
          </div>
          <Toggle
            className="mt-4"
            checked={bottom.showSocial}
            onChange={(showSocial) => setNested("bottom", { showSocial })}
            label="Show Social Media Icons"
            description="Toggle whether social media icons are displayed in the footer bar."
          />
        </SettingsCard>
      ) : null}

      {/* Social Media Links Editor */}
      {showSocial ? (
        <SocialLinksEditor socialState={socialState} />
      ) : null}
    </SitePageShell>
  );
}
