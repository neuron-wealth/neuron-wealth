const { text, textarea, image } = require("../cmsFields");

// Section types reused by several preloaded pages.
const sectionTypes = {
  disclosureHero: {
    label: "Disclosure Hero Banner",
    description: "Full-width banner with breadcrumb, heading with italic accent, intro line and background photo.",
    icon: "ShieldCheck",
    design: ["anchor"],
    fields: [
      text("parent", "Breadcrumb Group", 40, { hint: 'Shown between "Home" and the page name, e.g. Disclosures.' }),
      text("breadcrumb", "Breadcrumb Page Name", 80),
      text("title", "Heading", 80),
      text("highlight", "Heading Accent (Italic)", 80),
      textarea("text", "Intro Line", 400),
      image("image", "Background Image", { sizing: false, hint: "A wide photo, at least 1600 px across." }),
    ],
  },
};

module.exports = { sectionTypes };
