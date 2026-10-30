export const company = {
  name: "Neuron Wealth Advisors LLP",
  tagline: "Simplifying Financial Life",
  role: "Financial Advisor",
  phoneDisplay: "+91 90999 42563",
  phoneHref: "tel:+919099942563",
  email: "info@neuronwealth.com",
  emailHref: "mailto:info@neuronwealth.com",
  url: "https://neuronwealth.com/",
  description:
    "Neuron Wealth Advisors LLP provides financial guidance that simplifies complex decisions and helps you plan with clarity and confidence.",
  registration: "SEBI Registered Investment Adviser. Registration No. INA000016481.",
};

export const seo = {
  title: "Neuron Wealth Advisors LLP | Simplifying Financial Life",
  description: company.description,
  canonical: company.url,
  image: "https://neuronwealth.com/logo.png",
  imageAlt: "Neuron Wealth Advisors LLP logo",
};

/**
 * Pages other than Home are not built in this phase.
 * Set available: true when the route exists.
 */
export const navigation = [
  { label: "Home", href: "/", available: true },
  {
    label: "About",
    href: "/about",
    available: true,
    children: [
      {
        label: "Vision & Mission",
        href: "/vision-and-mission",
        available: true,
        description: "Our vision, mission & 4 pillars",
      },
      {
        label: "Overview",
        href: "/about",
        available: true,
        description: "SEBI Registered RIA & family CFO",
      },
      {
        label: "Why Associate with Us",
        href: "/why-associate",
        available: true,
        description: "Pure fiduciary oath & comparison",
      },
      {
        label: "Team",
        href: "/team",
        available: true,
        description: "Stakeholders / Team Members",
      },
    ],
  },
  {
    label: "Advisory",
    href: "/advisory",
    available: true,
    children: [
      {
        label: "Family Office / Family CFO",
        href: "/advisory/family-office",
        available: true,
        description: "Multi-generational wealth management, growth and preservation",
      },
      {
        label: "Investment Advisory",
        href: "/advisory/investment-advisory",
        available: true,
        description: "Disciplined investment approach for increasing risk-adjusted returns",
      },
      {
        label: "NRI / OCI Advisory",
        href: "/advisory/nri-advisory",
        available: true,
        description: "Tax efficiency, global compliance and wealth management for NRIs & OCIs",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    available: true,
    children: [
      {
        label: "NRIs Returning to India",
        href: "/services/nri-returning-to-india",
        available: true,
        description: "Pre-return residency, asset repatriation & transition planning",
      },
      {
        label: "Global Indians",
        href: "/services/global-indians",
        available: true,
        description: "Cross-border wealth, dual taxation & overseas asset structuring",
      },
      {
        label: "Global Citizens in India",
        href: "/services/global-citizens-in-india",
        available: true,
        description: "Expatriate advisory, foreign income compliance & residency",
      },
      {
        label: "Global Investor",
        href: "/services/global-investor",
        available: true,
        description: "Multi-asset international portfolios & global capital allocation",
      },
      {
        label: "Founders & Enterpreneurs",
        href: "/services/founders-and-entrepreneurs",
        available: true,
        description: "Liquidity events, business equity & treasury wealth management",
      },
      {
        label: "Professionals & CXOs",
        href: "/services/professionals-and-cxos",
        available: true,
        description: "ESOP optimization, high-compensation planning & retirement",
      },
    ],
  },
  {
    label: "Knowledge Hub",
    href: "/insights",
    available: true,
    children: [
      {
        label: "Media",
        href: "/insights/media",
        available: true,
        description: "Cover stories, magazine features & press publications",
      },
      {
        label: "Books",
        href: "/insights/books",
        available: true,
        description: "Published books on NRI investments & taxation on Amazon",
      },
      {
        label: "Blogs",
        href: "/insights/blogs",
        available: true,
        description: "Expert articles, wealth strategies & fiduciary analysis",
      },
      {
        label: "Video",
        href: "/insights/video",
        available: true,
        description: "TV interviews, special budget talks & video explainers",
      },
      {
        label: "Connect",
        href: "/insights/connect",
        available: true,
        description: "Neuron Wealth Connect newsletters & periodic updates",
      },
    ],
  },
  { label: "Contact", href: "/contact", available: true },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy", available: true },
  { label: "Disclaimer", href: "/website-disclaimer", available: true },
  { label: "Refund Policy", href: "/refund-policy", available: true },
];

/** URLs confirmed on https://neuronwealth.com/ */
export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/neuronwealth/" },
  { label: "X", href: "https://x.com/neuronwealth" },
  { label: "YouTube", href: "https://www.youtube.com/@nriinvestmenthni" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/neuron-wealth-advisors/" },
  { label: "Instagram", href: "https://www.instagram.com/neuronwealth/" },
];

export const footerSections = {
  address: {
    heading: "Address",
    lines: [
      "Neuron Wealth Advisors LLP",
      "803, Mauryansh Elanza, Nr. Shyamal Cross Roads,",
      "B/s. Parekhs Hospital, Satellite,",
      "Ahmedabad-380015, Gujarat, India.",
    ],
  },
  aboutUs: {
    heading: "Company",
    links: [
      { label: "Overview", href: "/about", available: true },
      { label: "Why Associate with Us", href: "/why-associate", available: true },
      { label: "Team", href: "/team", available: true },
      { label: "Knowledge Hub", href: "/insights", available: true },
      { label: "Contact Us", href: "/contact", available: true },
    ],
  },
  services: {
    heading: "Services",
    links: [
      { label: "NRIs Returning to India", href: "/services/nri-returning-to-india", available: true },
      { label: "Global Indians", href: "/services/global-indians", available: true },
      { label: "Global Citizens in India", href: "/services/global-citizens-in-india", available: true },
      { label: "Global Investor", href: "/services/global-investor", available: true },
      { label: "Founders & Enterpreneurs", href: "/services/founders-and-entrepreneurs", available: true },
      { label: "Professionals & CXOs", href: "/services/professionals-and-cxos", available: true },
    ],
  },
  disclosures: {
    heading: "Legal & Disclosures",
    links: [
      { label: "SEBI Regulatory Compliance Disclosure", href: "/sebi-regulatory-compliance", available: true },
      ...legalLinks,
    ],
  },
};

