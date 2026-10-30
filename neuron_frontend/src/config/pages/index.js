// Preloaded pages kept in their own modules (mirrors neuron_backend/src/config/pages).
import { page as materialInformation } from "./material-information";
import { page as codeOfConductSebi } from "./code-of-conduct-sebi";
import { page as sebiInvestorCharter } from "./sebi-investor-charter";
import { page as grievanceRedressal } from "./grievance-redressal";
import { page as functionsOfInvestmentAdviser } from "./functions-of-investment-adviser";
import { page as risks } from "./risks";
import { page as conflictOfInterest } from "./conflict-of-interest";
import { page as cfaCodeOfConduct } from "./cfa-code-of-conduct";
import { page as insights } from "./insights";

const pageModules = [
  materialInformation,
  codeOfConductSebi,
  sebiInvestorCharter,
  grievanceRedressal,
  functionsOfInvestmentAdviser,
  risks,
  conflictOfInterest,
  cfaCodeOfConduct,
  insights,
];

export const extraPages = Object.fromEntries(pageModules.map((page) => [page.slug, page]));
