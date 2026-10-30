import Dialog from "../../components/ui/Dialog";
import { sectionIcon } from "../../components/cms/sectionIcons";

const SHOWCASE_TYPES = new Set([
  "hero",
  "table",
  "imageCards",
  "callback",
  "whyUs",
  "cardCarousel",
  "iconCards",
  "team",
  "aboutHero",
  "whyWeAre",
  "whoWeAre",
  "whatWeDo",
  "visionMission",
  "pillars",
  "whyAssociateHero",
  "associationPhilosophy",
  "sevenReasons",
  "pearlAssessment",
  "teamHero",
  "leadership",
  "teamEcosystem",
  "teamDisclaimer",
  "careerHero",
  "careerWhyWork",
  "careerEthos",
  "contactHero",
  "contactHub",
  "contactMap",
  "complianceHero",
  "complianceHub",
]);

function TypeButton({ type, onPick }) {
  const Icon = sectionIcon(type.icon);
  return (
    <button
      type="button"
      onClick={() => onPick(type)}
      className="focus-ring group flex h-full items-start gap-3 rounded-xl border border-line bg-surface p-3.5 text-left transition-colors hover:border-accent hover:bg-[var(--accent-soft)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{type.label}</span>
        <span className="muted mt-0.5 block text-xs leading-relaxed">{type.description}</span>
      </span>
    </button>
  );
}

export default function AddSectionDialog({ open, types, afterLabel, onPick, onClose }) {
  const general = types.filter((type) => !SHOWCASE_TYPES.has(type.type));
  const showcase = types.filter((type) => SHOWCASE_TYPES.has(type.type));

  return (
    <Dialog
      open={open}
      size="lg"
      title="Add a Section"
      description={afterLabel ? `The new section is placed after “${afterLabel}”.` : "The new section is added at the end of the page."}
      onClose={onClose}
    >
      <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-soft">Building Blocks</h3>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {general.map((type) => (
          <TypeButton key={type.type} type={type} onPick={onPick} />
        ))}
      </div>
      <h3 className="mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-soft">Pre-built Page Designs (Start With Preloaded Content)</h3>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {showcase.map((type) => (
          <TypeButton key={type.type} type={type} onPick={onPick} />
        ))}
      </div>
    </Dialog>
  );
}
