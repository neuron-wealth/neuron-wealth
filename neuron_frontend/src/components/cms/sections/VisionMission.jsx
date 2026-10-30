import { Compass, TrendingUp } from "lucide-react";
import { CMS_ICONS } from "../cmsIcons";
import { sectionDesign } from "../design";

export default function VisionMission({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white" });

  const visionEyebrow = content.visionEyebrow || "Our Purpose";
  const visionTitle = content.visionTitle || "Our Vision";
  const visionText =
    content.visionText ||
    "Our vision is to become one of the most TRUSTED investment advisor (Multi Family Office or Family CFO) in India.";
  const VisionIcon =
    content.visionIcon && CMS_ICONS[content.visionIcon]
      ? CMS_ICONS[content.visionIcon]
      : Compass;
  const visionImageUrl = content.visionImage?.url || "/images/vision-dark-bg.jpg";

  const missionEyebrow = content.missionEyebrow || "Our Commitment";
  const missionTitle = content.missionTitle || "Our Mission";
  const missionText =
    content.missionText ||
    "Our mission is to Simplify Financial Life of our clients by providing the suitable financial or investment solution for multi generation wealth management.";
  const MissionIcon =
    content.missionIcon && CMS_ICONS[content.missionIcon]
      ? CMS_ICONS[content.missionIcon]
      : TrendingUp;
  const missionImageUrl = content.missionImage?.url || "/images/mission-dark-bg.jpg";

  return (
    <section
      id={id || "vision-mission"}
      {...root}
      className={`scroll-mt-[var(--header-height,4.875rem)] ${
        look.background || "bg-white dark:bg-[#102A40]"
      } pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16`}
      style={look.style}
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {/* Our Vision */}
          <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-none border border-[#1A3855]/60 bg-[#061524] p-8 shadow-[0_20px_50px_-15px_rgba(6,21,36,0.35)] transition-all duration-500 hover:border-[#8FCB86]/60 hover:shadow-[0_25px_60px_-15px_rgba(6,21,36,0.5)] sm:min-h-[340px] sm:p-10">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
              <img
                src={visionImageUrl}
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061524]/95 via-[#061524]/80 to-[#061524]/55 sm:bg-gradient-to-r sm:from-[#061524]/95 sm:via-[#061524]/80 sm:to-[#061524]/45" />
            </div>
            <div className="relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-none bg-white/10 text-[#8FCB86] shadow-sm ring-1 ring-white/20 backdrop-blur-md">
                <VisionIcon className="h-5.5 w-5.5" />
              </div>
              <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8FCB86]">
                {visionEyebrow}
              </p>
              <h3 className="mt-1 font-display text-[2rem] font-medium leading-tight text-white sm:text-[2.25rem]">
                {visionTitle}
              </h3>
              <p className="mt-4 text-base font-normal leading-[1.8] text-slate-200 sm:text-[1.0625rem]">
                {visionText}
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-none border border-[#1A3855]/60 bg-[#061524] p-8 shadow-[0_20px_50px_-15px_rgba(6,21,36,0.35)] transition-all duration-500 hover:border-[#8FCB86]/60 hover:shadow-[0_25px_60px_-15px_rgba(6,21,36,0.5)] sm:min-h-[340px] sm:p-10">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
              <img
                src={missionImageUrl}
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061524]/95 via-[#061524]/80 to-[#061524]/55 sm:bg-gradient-to-r sm:from-[#061524]/95 sm:via-[#061524]/80 sm:to-[#061524]/45" />
            </div>
            <div className="relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-none bg-white/10 text-[#8FCB86] shadow-sm ring-1 ring-white/20 backdrop-blur-md">
                <MissionIcon className="h-5.5 w-5.5" />
              </div>
              <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8FCB86]">
                {missionEyebrow}
              </p>
              <h3 className="mt-1 font-display text-[2rem] font-medium leading-tight text-white sm:text-[2.25rem]">
                {missionTitle}
              </h3>
              <p className="mt-4 text-base font-normal leading-[1.8] text-slate-200 sm:text-[1.0625rem]">
                {missionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
