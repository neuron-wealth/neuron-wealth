const link = (id, label, href) => ({ id, label, href, visible: true });
const child = (id, label, href, description, icon) => ({ id, label, href, description, icon, visible: true });

const siteDefaults = {
  branding: {
    logoLight: { url: "/logo.png", alt: "Neuron Wealth Advisors LLP" },
    logoDark: { url: "/Dark%20Mode%20logo.png", alt: "Neuron Wealth Advisors LLP" },
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
    description:
      "Neuron Wealth Advisors LLP provides financial guidance that simplifies complex decisions and helps you plan with clarity and confidence.",
    subscribe: {
      enabled: true,
      heading: "Subscribe to Neuron Wealth Connect",
      text: "Our newsletters and periodic updates.",
      buttonLabel: "Subscribe",
    },
    address: {
      heading: "Address",
      icon: "MapPin",
      lines: [
        "Neuron Wealth Advisors LLP",
        "803, Mauryansh Elanza, Nr. Shyamal Cross Roads,",
        "B/s. Parekhs Hospital, Satellite,",
        "Ahmedabad-380015, Gujarat, India.",
      ],
    },
    contact: {
      phone: "+91 90999 42563",
      phoneIcon: "Phone",
      email: "info@neuronwealth.com",
      emailIcon: "Mail",
    },
    columns: [
      {
        id: "company",
        heading: "Company",
        links: [
          link("co-overview", "Overview", "/about"),
          link("co-why", "Why Associate with Us", "/why-associate"),
          link("co-team", "Team", "/team"),
          link("co-insights", "Knowledge Hub", "/insights"),
          link("co-contact", "Contact Us", "/contact"),
        ],
      },
      {
        id: "services",
        heading: "Services",
        links: [
          link("fs-nri", "NRIs Returning to India", "/services/nri-returning-to-india"),
          link("fs-global-indians", "Global Indians", "/services/global-indians"),
          link("fs-global-citizens", "Global Citizens in India", "/services/global-citizens-in-india"),
          link("fs-global-investor", "Global Investor", "/services/global-investor"),
          link("fs-founders", "Founders & Enterpreneurs", "/services/founders-and-entrepreneurs"),
          link("fs-professionals", "Professionals & CXOs", "/services/professionals-and-cxos"),
        ],
      },
      {
        id: "legal",
        heading: "Legal & Disclosures",
        links: [
          link("lg-sebi", "SEBI Regulatory Compliance Disclosure", "/sebi-regulatory-compliance"),
          link("lg-privacy", "Privacy Policy", "/privacy-policy"),
          link("lg-disclaimer", "Disclaimer", "/website-disclaimer"),
          link("lg-refund", "Refund Policy", "/refund-policy"),
        ],
      },
    ],
    bottom: {
      copyright: "Neuron Wealth Advisors LLP",
      socialLabel: "Connect With Us",
      showSocial: true,
    },
  },

  social: [
    { id: "facebook", platform: "facebook", label: "Facebook", url: "https://www.facebook.com/neuronwealth/", visible: true },
    { id: "x", platform: "x", label: "X", url: "https://x.com/neuronwealth", visible: true },
    { id: "youtube", platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@nriinvestmenthni", visible: true },
    { id: "linkedin", platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/neuron-wealth-advisors/", visible: true },
    { id: "instagram", platform: "instagram", label: "Instagram", url: "https://www.instagram.com/neuronwealth/", visible: true },
  ],

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

const NAV_ICONS = [
  "Compass", "Building2", "Handshake", "Users", "Workflow", "TrendingUp", "Landmark", "Globe", "Plane", "Briefcase",
  "Newspaper", "BookOpen", "PenLine", "Play", "Mail", "ShieldCheck", "Scale", "FileCheck", "Phone", "House",
  "Info", "Star", "Award", "Target", "ChartPie", "Wallet", "Calculator", "GraduationCap", "Lightbulb", "MapPin",
  "Calendar", "MessageCircle", "CircleHelp", "Heart",
];

const SOCIAL_PLATFORMS = ["facebook", "x", "youtube", "linkedin", "instagram", "whatsapp", "telegram", "email", "website"];

module.exports = { siteDefaults, NAV_ICONS, SOCIAL_PLATFORMS, SECTIONS: Object.keys(siteDefaults) };
