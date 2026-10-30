import { company, footerSections, socialLinks } from "./site";

const child = (id, label, href, description, icon) => ({ id, label, href, description, icon, visible: true });
const toLinks = (prefix, links) =>
  links.map((item, index) => ({ id: `${prefix}-${index}`, label: item.label, href: item.href, visible: true }));

export const siteDefaults = {
  branding: {
    logoLight: { url: "/logo.png", alt: company.name, width: 800, height: 216 },
    logoDark: { url: "/Dark%20Mode%20logo.png", alt: company.name, width: 2170, height: 725 },
  },

  header: {
    colors: {
      background: "#FFFFFF",
      backgroundDark: "#102A40",
      text: "#15344F",
      textDark: "#FFFFFF",
      accent: "#2E933C",
      accentDark: "#54B848",
    },
    items: [
      { id: "home", label: "Home", href: "/", visible: true, menuTitle: "", menuSubtitle: "", layout: "list", children: [] },
      {
        id: "about",
        label: "About Us",
        href: "/about",
        visible: true,
        menuTitle: "Who We Are",
        menuSubtitle: "Fiduciary RIA",
        layout: "list",
        children: [
          child("about-overview", "Overview", "/about", "", "Building2"),
          child("about-why", "Why Associate with Us", "/why-associate", "", "Handshake"),
          child("about-team", "Team", "/team", "", "Users"),
        ],
      },
      {
        id: "services",
        label: "Our Services",
        href: "/services",
        visible: true,
        menuTitle: "Core & Specialized Services",
        menuSubtitle: "6 Fiduciary Solutions",
        layout: "grid",
        children: [
          child("svc-nri", "NRIs Returning to India", "/services/nri-returning-to-india", "", "Plane"),
          child("svc-global-indians", "Global Indians", "/services/global-indians", "", "Globe"),
          child("svc-global-citizens", "Global Citizens in India", "/services/global-citizens-in-india", "", "Landmark"),
          child("svc-global-investor", "Global Investor", "/services/global-investor", "", "TrendingUp"),
          child("svc-founders", "Founders & Enterpreneurs", "/services/founders-and-entrepreneurs", "", "Briefcase"),
          child("svc-professionals", "Professionals & CXOs", "/services/professionals-and-cxos", "", "Users"),
        ],
      },
      {
        id: "insights",
        label: "Knowledge Hub",
        href: "/insights",
        visible: true,
        menuTitle: "Knowledge & Thought Leadership",
        menuSubtitle: "5 Media Formats",
        layout: "list",
        children: [
          child("ins-media", "Media", "/insights/media", "", "Newspaper"),
          child("ins-books", "Books", "/insights/books", "", "BookOpen"),
          child("ins-blogs", "Blogs", "/insights/blogs", "", "PenLine"),
          child("ins-video", "Video", "/insights/video", "", "Play"),
          child("ins-connect", "Connect", "/insights/connect", "", "Mail"),
        ],
      },
      { id: "contact", label: "Contact", href: "/contact", visible: true, menuTitle: "", menuSubtitle: "", layout: "list", children: [] },
    ],
  },

  footer: {
    colors: {
      background: "#102A40",
      bottomBar: "#0D2438",
      text: "#FFFFFF",
      accent: "#54B848",
      accentSoft: "#8FCB86",
    },
    description: company.description,
    subscribe: {
      enabled: true,
      heading: "Subscribe to Neuron Wealth Connect",
      text: "Our newsletters and periodic updates.",
      buttonLabel: "Subscribe",
    },
    address: { heading: footerSections.address.heading, lines: footerSections.address.lines },
    contact: { phone: company.phoneDisplay, email: company.email },
    columns: [
      { id: "company", heading: footerSections.aboutUs.heading, links: toLinks("co", footerSections.aboutUs.links) },
      { id: "services", heading: footerSections.services.heading, links: toLinks("fs", footerSections.services.links) },
      { id: "legal", heading: footerSections.disclosures.heading, links: toLinks("lg", footerSections.disclosures.links) },
    ],
    bottom: { copyright: company.name, socialLabel: "Connect With Us", showSocial: true },
  },

  social: socialLinks.map((item) => {
    const platform = item.label.toLowerCase();
    return { id: platform, platform, label: item.label, url: item.href, visible: true };
  }),

  accessibility: {
    enabled: true,
    position: "right",
    offset: 32,
    buttonLabel: "Settings",
    buttonColor: "#21649A",
    features: {
      theme: true,
      textSize: true,
      zoom: true,
      colorFilter: true,
      highContrast: true,
      grayscale: true,
      hideImages: true,
      textSpacing: true,
      lineHeight: true,
      letterSpacing: true,
      underlineLinks: true,
      dyslexia: true,
      keyboardNav: true,
      focusHighlight: true,
      largeCursor: true,
      readingGuide: true,
      reduceMotion: true,
      stopAnimations: true,
      pauseMedia: true,
      readAloud: true,
      voiceNav: true,
    },
  },
};
