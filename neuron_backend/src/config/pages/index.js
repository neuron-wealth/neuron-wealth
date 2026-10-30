// Preloaded pages kept in their own modules. Each exports { page, sectionTypes, extraIcons? }.
// Mirrored by neuron_frontend/src/config/pages/index.js — keep the slug lists in sync.
const shared = require("./shared");

const PAGE_SLUGS = [
  "material-information",
  "code-of-conduct-sebi",
  "sebi-investor-charter",
  "grievance-redressal",
  "functions-of-investment-adviser",
  "risks",
  "conflict-of-interest",
  "cfa-code-of-conduct",
  "insights",
];

const pageModules = PAGE_SLUGS.map((slug) => require(`./${slug}`));

module.exports = {
  modules: [shared, ...pageModules],
  pages: pageModules.map((entry) => entry.page),
};
