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

