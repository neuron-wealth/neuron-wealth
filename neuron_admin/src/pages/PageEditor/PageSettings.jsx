import { Globe, RotateCcw, Search, Settings2, Trash2 } from "lucide-react";
import { Input, Select, SettingsCard, TextArea, Toggle } from "../../components/site/controls";
import IconPicker from "../../components/site/IconPicker";
import { CMS_ICONS } from "../../components/cms/cmsIcons";
import { siteUrl } from "../../config/site";

export default function PageSettings({ draft, page, meta, update, onReset, onRemove, saving }) {
  const core = page.core;
  const set = (changes) => update((previous) => ({ ...previous, ...changes }));
  const setSeo = (changes) => update((previous) => ({ ...previous, seo: { ...previous.seo, ...changes } }));
  const categories = (meta?.categories || []).filter((entry) => entry.value !== "core");
  const path = core ? page.path : `/${draft.slug || ""}`;

  return (
    <div className="space-y-4">
      <SettingsCard icon={Settings2} title="Page Details" description="Shown on the Website CMS page cards and used for the page address.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Page Title" value={draft.title} maxLength={80} onChange={(title) => set({ title })} />
          {core ? (
            <div>
              <span className="field-label">Page Address</span>
              <p className="field mt-1.5 flex items-center px-3.5 font-mono text-xs text-soft">{siteUrl(path)}</p>
            </div>
          ) : (
            <Input
              label="Page Address"
              value={draft.slug}
              maxLength={60}
              spellCheck={false}
              hint={`Live at ${siteUrl(path)}`}
              onChange={(slug) => set({ slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
            />
          )}
          <TextArea className="sm:col-span-2" label="Short Description" value={draft.description} maxLength={240} rows={2} onChange={(description) => set({ description })} />
          {core ? (
            <div>
              <span className="field-label">Category</span>
              <p className="field mt-1.5 flex items-center px-3.5 text-sm text-soft">Core</p>
            </div>
          ) : (
            <Select label="Category" value={draft.category} options={categories} onChange={(category) => set({ category })} />
          )}
          <IconPicker label="Card Icon" value={draft.icon} icons={CMS_ICONS} onChange={(icon) => set({ icon })} />
        </div>
        {core ? (
          <p className="muted mt-4 rounded-xl border border-line bg-subtle p-3 text-xs">
            This is a core page: it is always published and its address and category are fixed.
          </p>
        ) : (
          <div className="mt-4 rounded-xl border border-line bg-subtle p-3.5">
            <Toggle
              label="Published"
              description={draft.status === "published" ? "Visitors can open this page." : "Draft: only visible in the admin preview."}
              checked={draft.status === "published"}
              onChange={(on) => set({ status: on ? "published" : "draft" })}
            />
          </div>
        )}
      </SettingsCard>

      <SettingsCard icon={Search} title="Search Engine Listing" description="Optional. Leave empty to use the website's standard title and description.">
        <div className="grid gap-4">
          <Input label="SEO Title" value={draft.seo?.title} maxLength={100} hint={`${(draft.seo?.title || "").length}/100 characters`} onChange={(title) => setSeo({ title })} />
          <TextArea label="SEO Description" value={draft.seo?.description} maxLength={200} rows={2} onChange={(description) => setSeo({ description })} />
          <div className="rounded-xl border border-line bg-surface p-3.5">
            <p className="flex items-center gap-1.5 text-xs text-soft">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {siteUrl(path)}
            </p>
            <p className="mt-1 truncate text-base font-semibold text-[#1a0dab] dark:text-sky-300">{draft.seo?.title || draft.title}</p>
            <p className="muted mt-0.5 line-clamp-2 text-xs">{draft.seo?.description || draft.description || "The website's standard description is used."}</p>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={core ? RotateCcw : Trash2}
        title={core ? "Restore Preloaded Content" : "Delete Page"}
        description={core ? "Replace every section on this page with the original preloaded content." : "Remove this page and its address from the website."}
      >
        {core ? (
          <button type="button" onClick={onReset} disabled={saving} className="btn btn-secondary focus-ring h-10 px-4">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore Defaults
          </button>
        ) : (
          <button
            type="button"
            onClick={onRemove}
            disabled={saving}
            className="btn focus-ring h-10 border border-red-300 bg-red-50 px-4 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Page
          </button>
        )}
      </SettingsCard>
    </div>
  );
}
