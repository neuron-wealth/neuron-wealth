import { ClipboardCheck, Type } from "lucide-react";
import SitePageShell from "../../components/site/SitePageShell";
import { Input, SettingsCard } from "../../components/site/controls";
import useSiteSection from "../../hooks/useSiteSection";
import LogoCard from "./LogoCard";

function Requirements({ rules }) {
  const megabytes = rules.maxBytes / (1024 * 1024);
  const items = [
    "PNG, JPG or WEBP (PNG or WEBP with a transparent background works best)",
    `${megabytes} MB maximum file size`,
    `${rules.minWidth}–${rules.maxWidth} px wide and ${rules.minHeight}–${rules.maxHeight} px tall`,
    `Horizontal shape between ${rules.minRatio}:1 and ${rules.maxRatio}:1 (width to height)`,
    `Displayed at a fixed height of ${rules.displayHeight.header} px in the header and ${rules.displayHeight.footer} px in the footer; width scales automatically`,
  ];
  return (
    <ul className="grid gap-2 text-sm sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Branding() {
  const state = useSiteSection("branding");
  const { draft, update, meta, settings, apply } = state;
  const rules = meta?.logo;
  const saved = settings?.branding;

  return (
    <SitePageShell title="Logo & Branding" description="Website logos for light and dark backgrounds." state={state}>
      {draft && rules && saved ? (
        <>
          <SettingsCard icon={ClipboardCheck} title="Logo Requirements" description="Uploads that do not meet these rules are rejected before saving.">
            <Requirements rules={rules} />
          </SettingsCard>

          <div className="grid gap-4 xl:grid-cols-2">
            <LogoCard
              variant="light"
              title="Light Logo"
              description="Used in the header in light mode."
              logo={saved.logoLight}
              background="#FFFFFF"
              displayHeight={rules.displayHeight.header}
              rules={rules}
              onSaved={apply}
            />
            <LogoCard
              variant="dark"
              title="Dark Logo"
              description="Used in the header in dark mode and always in the footer."
              logo={saved.logoDark}
              background="#102A40"
              displayHeight={rules.displayHeight.footer}
              rules={rules}
              onSaved={apply}
            />
          </div>

          <SettingsCard icon={Type} title="Logo Alt Text" description="Read out by screen readers and shown if the image cannot load.">
            <Input
              label="Alt Text"
              value={draft.logoLight.alt}
              maxLength={120}
              onChange={(alt) =>
                update((previous) => ({ ...previous, logoLight: { ...previous.logoLight, alt }, logoDark: { ...previous.logoDark, alt } }))
              }
            />
          </SettingsCard>
        </>
      ) : null}
    </SitePageShell>
  );
}
