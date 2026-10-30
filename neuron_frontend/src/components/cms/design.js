const BACKGROUNDS = {
  white: "bg-white dark:bg-[#0d2438]",
  ivory: "bg-[#F7F8F5] dark:bg-[#0d2438]",
  light: "bg-[#EAF1F7] dark:bg-[#102A40]",
  navy: "bg-[#102A40] dark:bg-[#091a27]",
  deep: "bg-[#071321]",
};

const DARK_BACKGROUNDS = new Set(["navy", "deep"]);

export const SPACING = {
  none: "py-0",
  compact: "py-10 sm:py-12",
  normal: "py-14 sm:py-16 lg:py-20",
  spacious: "py-20 sm:py-24 lg:py-28",
};

const chosen = (value) => (value && value !== "default" ? value : "");

function isDarkColor(hex) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
}

/**
 * Resolves a section's saved design against the defaults that reproduce its original look.
 * `defaults.spacing` is a full class string so each section keeps its own rhythm until overridden.
 */
export function sectionDesign(design = {}, defaults = {}) {
  const key = chosen(design.background) || defaults.background || "white";
  const custom = key === "custom" && /^#[0-9a-f]{6}$/i.test(design.backgroundColor || "") ? design.backgroundColor : "";
  const fallbackKey = BACKGROUNDS[key] ? key : defaults.background || "white";
  const darkBackground = custom ? isDarkColor(custom) : DARK_BACKGROUNDS.has(fallbackKey);

  return {
    background: custom ? "" : BACKGROUNDS[fallbackKey],
    style: custom ? { backgroundColor: custom } : undefined,
    spacing: SPACING[chosen(design.spacing)] || defaults.spacing || SPACING.normal,
    light: design.tone === "light" || (design.tone !== "dark" && darkBackground),
    align: chosen(design.align) || defaults.align || "left",
    columns: Number(chosen(design.columns)) || defaults.columns || 3,
    imageSide: chosen(design.imageSide) || defaults.imageSide || "left",
    cardStyle: chosen(design.cardStyle) || defaults.cardStyle || "bordered",
    layout: chosen(design.layout) || defaults.layout || "grid",
    width: chosen(design.width) || defaults.width || "narrow",
  };
}

export const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
};
