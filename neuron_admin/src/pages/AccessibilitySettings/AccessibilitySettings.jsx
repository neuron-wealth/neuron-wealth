import { useId, useMemo } from "react";
import { ListChecks, SlidersHorizontal } from "lucide-react";
import SitePageShell from "../../components/site/SitePageShell";
import LivePreview from "../../components/cms/LivePreview";
import { SITE_CONTENT } from "../../config/siteContent";
import { ColorField, Input, SettingsCard, Toggle } from "../../components/site/controls";
import useSiteSection from "../../hooks/useSiteSection";

const FEATURE_GROUPS = [
  {
    title: "Vision",
    features: [
      ["theme", "Display Theme", "Light and dark mode switch"],
      ["textSize", "Text Size", "Default, large and extra large text"],
      ["zoom", "Page Zoom", "100%, 110% and 120% zoom"],
      ["colorFilter", "Colour Filters", "Invert, warm and blue-light shield"],
      ["highContrast", "High Contrast", "Stronger contrast across the page"],
      ["grayscale", "Grayscale", "Removes colour from the page"],
      ["hideImages", "Hide Images", "Hides decorative and content images"],
    ],
  },
  {
    title: "Reading",
    features: [
      ["textSpacing", "Text Spacing", "Wider word and paragraph spacing"],
      ["lineHeight", "Line Height", "Taller lines of text"],
      ["letterSpacing", "Letter Spacing", "Wider spacing between letters"],
      ["underlineLinks", "Underline Links", "Underlines every link"],
      ["dyslexia", "Dyslexia-Friendly Font", "Switches to an easier-to-read font"],
    ],
  },
  {
    title: "Navigation",
    features: [
      ["keyboardNav", "Keyboard Navigation", "H, Shift + H and M shortcuts"],
      ["focusHighlight", "Focus Highlight", "Bold outline on the focused element"],
      ["largeCursor", "Large Cursor", "Bigger mouse pointer"],
      ["readingGuide", "Reading Guide", "Horizontal ruler that follows the pointer"],
    ],
  },
  {
    title: "Motion",
    features: [
      ["reduceMotion", "Reduce Motion", "Turns off scroll and slide effects"],
      ["stopAnimations", "Stop Animations", "Makes everything static"],
      ["pauseMedia", "Pause Videos & Audio", "Pauses media and blocks autoplay"],
    ],
  },
  {
    title: "Speech",
    features: [
      ["readAloud", "Read Page Aloud", "Reads the page with captions"],
      ["voiceNav", "Voice Control", "Spoken commands (needs microphone access)"],
    ],
  },
];

function OffsetField({ value, onChange }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        Distance From Bottom: {value} px
      </label>
      <input
        id={id}
        type="range"
        min={8}
        max={240}
        step={4}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

export default function AccessibilitySettings() {
  const state = useSiteSection("accessibility");
  const { draft, update } = state;
  const set = (changes) => update((previous) => ({ ...previous, ...changes }));
  const setFeature = (key, value) => update((previous) => ({ ...previous, features: { ...previous.features, [key]: value } }));
  const setAll = (value) =>
    update((previous) => ({ ...previous, features: Object.fromEntries(Object.keys(previous.features).map((key) => [key, value])) }));

  const enabledCount = draft ? Object.values(draft.features).filter(Boolean).length : 0;
  const totalCount = draft ? Object.keys(draft.features).length : 0;
  const previewSettings = useMemo(() => (draft ? { accessibility: draft } : null), [draft]);

  return (
    <SitePageShell
      title="Accessibility"
      description="The floating accessibility button and the tools visitors can use on the website."
      icon={SITE_CONTENT.accessibility.icon}
      tone={SITE_CONTENT.accessibility.tone}
      state={state}
      resetConfirm="Restore the original accessibility settings? Every feature will be turned back on."
      preview={
        <LivePreview
          settings={previewSettings}
          note="Shows your unsaved accessibility button. Click it in the preview to open the panel and check which tools visitors see."
        />
      }
    >
      {draft ? (
        <>
          <SettingsCard icon={SlidersHorizontal} title="Accessibility Button" description="Position and appearance of the floating button.">
            <div>
              <div className="space-y-5">
                <Toggle
                  checked={draft.enabled}
                  onChange={(enabled) => set({ enabled })}
                  label="Show Accessibility Button"
                  description="When off, the button is hidden and every visitor tool is switched off."
                />
                <div>
                  <span className="field-label">Screen Side</span>
                  <div className="mt-1.5 inline-flex rounded-xl border border-line p-1" role="radiogroup" aria-label="Screen side">
                    {["left", "right"].map((side) => (
                      <button
                        key={side}
                        type="button"
                        role="radio"
                        aria-checked={draft.position === side}
                        onClick={() => set({ position: side })}
                        className={`focus-ring rounded-lg px-4 py-1.5 text-sm font-semibold capitalize ${
                          draft.position === side ? "bg-accent text-white" : "text-soft hover:text-ink"
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>
                <OffsetField value={draft.offset} onChange={(offset) => set({ offset })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Button Label" value={draft.buttonLabel} maxLength={24} onChange={(buttonLabel) => set({ buttonLabel })} />
                  <ColorField label="Hover & Active Colour" value={draft.buttonColor} onChange={(buttonColor) => set({ buttonColor })} />
                </div>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            icon={ListChecks}
            title="Visitor Tools"
            description={`${enabledCount} of ${totalCount} tools available. Visitors who had a tool on are switched back to normal when you turn it off.`}
            actions={
              <>
                <button type="button" onClick={() => setAll(true)} className="btn btn-secondary focus-ring h-9 px-3 text-xs">
                  Turn All On
                </button>
                <button type="button" onClick={() => setAll(false)} className="btn btn-secondary focus-ring h-9 px-3 text-xs">
                  Turn All Off
                </button>
              </>
            }
          >
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {FEATURE_GROUPS.map((group) => (
                <div key={group.title} className="rounded-xl border border-line p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-soft">{group.title}</h3>
                  <div className="mt-3 space-y-3.5">
                    {group.features.map(([key, label, description]) => (
                      <Toggle
                        key={key}
                        checked={draft.features[key] !== false}
                        onChange={(value) => setFeature(key, value)}
                        label={label}
                        description={description}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SettingsCard>
        </>
      ) : null}
    </SitePageShell>
  );
}
