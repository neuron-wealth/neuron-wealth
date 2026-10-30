import { Accessibility, PanelBottom, PanelTop } from "lucide-react";

/** Site-wide content areas, shown as boxes in the Website CMS next to the pages. */
export const SITE_CONTENT = {
  header: {
    to: "/website/header",
    title: "Header & Branding",
    description: "Logos, menu items, dropdown links and header colours, shown at the top of every page.",
    icon: PanelTop,
    tone: "from-[#6366F1] to-[#21649A]",
    badge: "Header",
  },
  footer: {
    to: "/website/footer",
    title: "Footer & Social",
    description: "Footer text, address, contact details, link columns, newsletter, social media and colours.",
    icon: PanelBottom,
    tone: "from-[#0EA5A4] to-[#15344F]",
    badge: "Footer",
  },
  accessibility: {
    to: "/website/accessibility",
    title: "Accessibility",
    description: "The floating accessibility button and the tools visitors can switch on.",
    icon: Accessibility,
    tone: "from-[#8B5CF6] to-[#EC4899]",
    badge: "Widget",
  },
};

export const PAGE_TONES = {
  core: "from-[#21649A] to-[#54B848]",
  general: "from-[#475569] to-[#21649A]",
  services: "from-[#54B848] to-[#0EA5A4]",
  support: "from-[#8B5CF6] to-[#21649A]",
  events: "from-[#F59E0B] to-[#EF4444]",
};
