import { useEffect, useMemo, useState } from "react";
import { ClipboardCheck, Image, Menu, Palette } from "lucide-react";
import SitePageShell from "../../components/site/SitePageShell";
import LivePreview from "../../components/cms/LivePreview";
import { SITE_CONTENT } from "../../config/siteContent";
import { AddButton, ColorField, Input, SettingsCard, confirmDelete } from "../../components/site/controls";
import useSiteSection from "../../hooks/useSiteSection";
import { moveItem, newId, patchAt, removeAt } from "../../utils/list";
import { saveSiteSection } from "../../services/siteService";
import { useToast } from "../../context/ToastContext";
import MenuItemEditor from "./MenuItemEditor";
import LogoCard from "../Branding/LogoCard";

const COLOR_FIELDS = [
  ["background", "Background (Light Mode)"],
  ["text", "Text (Light Mode)"],
  ["accent", "Active & Hover (Light Mode)"],
  ["backgroundDark", "Background (Dark Mode)"],
  ["textDark", "Text (Dark Mode)"],
  ["accentDark", "Active & Hover (Dark Mode)"],
];

const TABS = [
  { id: "all", label: "All Settings" },
  { id: "branding", label: "Logo & Branding" },
  { id: "colors", label: "Colours" },
  { id: "menu", label: "Menu Items" },
];

function Requirements({ rules }) {
  if (!rules) return null;
  const megabytes = rules.maxBytes / (1024 * 1024);
  const items = [
    "PNG, JPG or WEBP (PNG or WEBP with transparent background recommended)",
    `${megabytes} MB maximum file size`,
    `${rules.minWidth}–${rules.maxWidth} px wide & ${rules.minHeight}–${rules.maxHeight} px tall`,
    `Horizontal shape between ${rules.minRatio}:1 and ${rules.maxRatio}:1`,
    `Displayed at ${rules.displayHeight?.header || 76} px in header & ${rules.displayHeight?.footer || 64} px in footer`,
  ];
  return (
    <div className="rounded-xl border border-line bg-subtle p-3.5 mb-4 text-xs">
      <div className="flex items-center gap-1.5 font-semibold text-soft mb-2">
        <ClipboardCheck className="h-4 w-4 text-accent" />
        <span>Logo Upload Guidelines</span>
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2 text-soft">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeaderSettings() {
  const { push } = useToast();
  const state = useSiteSection("header");
  const { draft, update, meta, settings, apply } = state;
  const limits = meta?.limits || { headerItems: 10, headerChildren: 12 };
  const items = draft?.items || [];
  const setItems = (next) => update((previous) => ({ ...previous, items: next }));

  const [activeTab, setActiveTab] = useState("all");

  const rules = meta?.logo;
  const savedBranding = settings?.branding;

  const [altText, setAltText] = useState("");
  const [altTextDirty, setAltTextDirty] = useState(false);
  const [savingAlt, setSavingAlt] = useState(false);

  useEffect(() => {
    if (savedBranding?.logoLight?.alt && !altTextDirty) {
      setAltText(savedBranding.logoLight.alt);
    }
  }, [savedBranding?.logoLight?.alt, altTextDirty]);

  const handleAltChange = (value) => {
    setAltText(value);
    setAltTextDirty(true);
  };

  const handleSaveAltText = async () => {
    setSavingAlt(true);
    try {
      const result = await saveSiteSection("branding", {
        logoLight: { alt: altText },
        logoDark: { alt: altText },
      });
      apply(result.settings);
      setAltTextDirty(false);
      push("Logo alt text updated successfully.", "success");
    } catch (err) {
      push(err.message || "Failed to update alt text.", "error");
    } finally {
      setSavingAlt(false);
    }
  };

  const addItem = () =>
    setItems([
      ...items,
      { id: newId(), label: "New Item", href: "/", visible: true, menuTitle: "", menuSubtitle: "", layout: "list", children: [] },
    ]);

  const showBranding = activeTab === "all" || activeTab === "branding";
  const showColors = activeTab === "all" || activeTab === "colors";
  const showMenu = activeTab === "all" || activeTab === "menu";
  const previewSettings = useMemo(
    () => (draft ? { header: draft, branding: savedBranding } : null),
    [draft, savedBranding]
  );

  return (
    <SitePageShell
      title="Header & Branding"
      description="Manage website logos, navigation items, dropdown links and header colours."
      icon={SITE_CONTENT.header.icon}
      tone={SITE_CONTENT.header.tone}
      state={state}
      resetConfirm="Restore the original header menu and colours? Your header changes will be replaced."
      preview={
        <LivePreview
          settings={previewSettings}
          scrollTo="top"
          note="Shows your unsaved header on the Home page. Hover the menu to see dropdowns. Logos update as soon as they are uploaded."
        />
      }
    >
      {draft ? (
        <>
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

          {/* Logo & Branding Card */}
          {showBranding ? (
            <SettingsCard
              icon={Image}
              title="Logo & Branding"
              description="Upload official website logos for light and dark backgrounds. Shown across the header and footer."
            >
              {rules && savedBranding ? (
                <>
                  <Requirements rules={rules} />

                  <div className="grid gap-4">
                    <LogoCard
                      variant="light"
                      title="Light Mode Logo"
                      description="Used in the header when light mode is active."
                      logo={savedBranding.logoLight}
                      background="#FFFFFF"
                      displayHeight={rules.displayHeight.header}
                      rules={rules}
                      onSaved={apply}
                    />
                    <LogoCard
                      variant="dark"
                      title="Dark Mode Logo"
                      description="Used in the header when dark mode is active and always in the footer."
                      logo={savedBranding.logoDark}
                      background="#102A40"
                      displayHeight={rules.displayHeight.footer}
                      rules={rules}
                      onSaved={apply}
                    />
                  </div>

                  <div className="mt-4 rounded-xl border border-line bg-subtle p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                      <div className="flex-1">
                        <Input
                          label="Logo Alt Text"
                          value={altText}
                          maxLength={120}
                          hint="Read out by screen readers and shown if the image cannot load."
                          onChange={handleAltChange}
                        />
                      </div>
                      <button
                        type="button"
                        disabled={savingAlt || !altTextDirty}
                        onClick={handleSaveAltText}
                        className="btn btn-primary focus-ring h-10 px-5 shrink-0"
                      >
                        {savingAlt ? "Saving…" : "Save Alt Text"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-soft">Loading logo settings…</p>
              )}
            </SettingsCard>
          ) : null}

          {/* Colours Card */}
          {showColors ? (
            <SettingsCard icon={Palette} title="Colours" description="The website switches between these automatically with light and dark mode.">
              <div className="grid gap-4 sm:grid-cols-2">
                {COLOR_FIELDS.map(([key, label]) => (
                  <ColorField
                    key={key}
                    label={label}
                    value={draft.colors[key]}
                    onChange={(value) => update((previous) => ({ ...previous, colors: { ...previous.colors, [key]: value } }))}
                  />
                ))}
              </div>
            </SettingsCard>
          ) : null}

          {/* Menu Items Card */}
          {showMenu ? (
            <SettingsCard
              icon={Menu}
              title="Menu Items"
              description={`${items.length} of ${limits.headerItems} items. Click an item to edit its label, link and dropdown links.`}
              actions={
                <AddButton onClick={addItem} disabled={items.length >= limits.headerItems}>
                  Add Menu Item
                </AddButton>
              }
            >
              {items.length ? (
                <ul className="space-y-3">
                  {items.map((item, index) => (
                    <MenuItemEditor
                      key={item.id}
                      item={item}
                      index={index}
                      count={items.length}
                      maxChildren={limits.headerChildren}
                      onChange={(changes) => setItems(patchAt(items, index, changes))}
                      onMove={(direction) => setItems(moveItem(items, index, direction))}
                      onRemove={() => confirmDelete(item.label) && setItems(removeAt(items, index))}
                    />
                  ))}
                </ul>
              ) : (
                <p className="muted rounded-xl border border-dashed border-line p-6 text-center text-sm">
                  The header has no menu items. Add one to show navigation on the website.
                </p>
              )}
            </SettingsCard>
          ) : null}
        </>
      ) : null}
    </SitePageShell>
  );
}
