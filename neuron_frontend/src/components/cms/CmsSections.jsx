import { Component, Suspense, lazy } from "react";
import { visibleItems } from "./primitives";

// Inner-page section designs load on demand; each family file is fetched once and shared.
const lazyNamed = (load, name) => lazy(() => load().then((module) => ({ default: module[name] })));
import Hero from "./sections/Hero";
import TableSection from "./sections/TableSection";
import ImageCards from "./sections/ImageCards";
import Callback from "./sections/Callback";
import WhyUs from "./sections/WhyUs";
import CardCarousel from "./sections/CardCarousel";
import IconCards from "./sections/IconCards";
import Team from "./sections/Team";
import RichText from "./sections/RichText";
import CardGrid from "./sections/CardGrid";
import ImageText from "./sections/ImageText";
import Cta from "./sections/Cta";
import Stats from "./sections/Stats";
const CalendlyBooking = lazy(() => import("./sections/CalendlyBooking"));
const DisclosureHero = lazy(() => import("./sections/DisclosureHero"));

const AboutHero = lazy(() => import("./sections/AboutHero"));
const WhyWeAre = lazy(() => import("./sections/WhyWeAre"));
const WhoWeAre = lazy(() => import("./sections/WhoWeAre"));
const WhatWeDo = lazy(() => import("./sections/WhatWeDo"));
const VisionMission = lazy(() => import("./sections/VisionMission"));
const Pillars = lazy(() => import("./sections/Pillars"));

const WhyAssociateHero = lazy(() => import("./sections/WhyAssociateHero"));
const AssociationPhilosophy = lazy(() => import("./sections/AssociationPhilosophy"));
const SevenReasons = lazy(() => import("./sections/SevenReasons"));
const PearlAssessment = lazy(() => import("./sections/PearlAssessment"));

const TeamHero = lazy(() => import("./sections/TeamHero"));
const Leadership = lazy(() => import("./sections/Leadership"));
const TeamEcosystem = lazy(() => import("./sections/TeamEcosystem"));
const TeamDisclaimer = lazy(() => import("./sections/TeamDisclaimer"));

const CareerHero = lazy(() => import("./sections/CareerHero"));
const CareerWhyWork = lazy(() => import("./sections/CareerWhyWork"));
const CareerEthos = lazy(() => import("./sections/CareerEthos"));

const ContactHero = lazy(() => import("./sections/ContactHero"));
const ContactHub = lazy(() => import("./sections/ContactHub"));
const ContactMap = lazy(() => import("./sections/ContactMap"));

const ComplianceHero = lazy(() => import("./sections/ComplianceHero"));
const ComplianceHub = lazy(() => import("./sections/ComplianceHub"));

const PolicyHero = lazy(() => import("./sections/PolicyHero"));
const PrivacyPolicyHub = lazy(() => import("./sections/PrivacyPolicyHub"));
const DisclaimerHub = lazy(() => import("./sections/DisclaimerHub"));
const RefundHub = lazy(() => import("./sections/RefundHub"));

const NriReturnHero = lazy(() => import("./sections/NriReturnHero"));
const NriReturnDrivers = lazy(() => import("./sections/NriReturnDrivers"));
const NriWhoWeHelp = lazy(() => import("./sections/NriWhoWeHelp"));
const NriFounderStory = lazy(() => import("./sections/NriFounderStory"));
const NriRnorWindow = lazy(() => import("./sections/NriRnorWindow"));
const NriFinancialDecisions = lazy(() => import("./sections/NriFinancialDecisions"));
const NriTimelineRoadmap = lazy(() => import("./sections/NriTimelineRoadmap"));
const NriValuePoints = lazy(() => import("./sections/NriValuePoints"));
const NriCrossBorderAssets = lazy(() => import("./sections/NriCrossBorderAssets"));
const NriDeliverables = lazy(() => import("./sections/NriDeliverables"));
const NriWhyChoose = lazy(() => import("./sections/NriWhyChoose"));
const NriFamilyStory = lazy(() => import("./sections/NriFamilyStory"));
const NriFaqsClosing = lazy(() => import("./sections/NriFaqsClosing"));

const loadGlobalIndiansSections = () => import("./sections/GlobalIndiansSections");
const GlobalIndiansHero = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansHero");
const GlobalIndiansWhatYouKeep = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansWhatYouKeep");
const GlobalIndiansApproach = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansApproach");
const GlobalIndiansFamiliar = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansFamiliar");
const GlobalIndiansWhoWeWorkWith = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansWhoWeWorkWith");
const GlobalIndiansWhyDifferent = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansWhyDifferent");
const GlobalIndiansHowWeHelp = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansHowWeHelp");
const GlobalIndiansWhyChoose = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansWhyChoose");
const GlobalIndiansHowWeWork = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansHowWeWork");
const GlobalIndiansFamilyStory = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansFamilyStory");
const GlobalIndiansFaqsClosing = lazyNamed(loadGlobalIndiansSections, "GlobalIndiansFaqsClosing");

const loadGlobalCitizensSections = () => import("./sections/GlobalCitizensSections");
const GlobalCitizensHero = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensHero");
const GlobalCitizensFamiliar = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensFamiliar");
const GlobalCitizensStatus = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensStatus");
const GlobalCitizensHomeTax = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensHomeTax");
const GlobalCitizensTaxFree = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensTaxFree");
const GlobalCitizensShareTax = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensShareTax");
const GlobalCitizensReport = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensReport");
const GlobalCitizensInvest = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensInvest");
const GlobalCitizensWhoWeHelp = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensWhoWeHelp");
const GlobalCitizensHowWeHelp = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensHowWeHelp");
const GlobalCitizensPlan = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensPlan");
const GlobalCitizensWhyChoose = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensWhyChoose");
const GlobalCitizensHowWeWork = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensHowWeWork");
const GlobalCitizensStories = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensStories");
const GlobalCitizensFaqsClosing = lazyNamed(loadGlobalCitizensSections, "GlobalCitizensFaqsClosing");

const loadGlobalInvestorsSections = () => import("./sections/GlobalInvestorsSections");
const InvestorHero = lazyNamed(loadGlobalInvestorsSections, "InvestorHero");
const InvestorReasons = lazyNamed(loadGlobalInvestorsSections, "InvestorReasons");
const InvestorFamiliar = lazyNamed(loadGlobalInvestorsSections, "InvestorFamiliar");
const InvestorRules = lazyNamed(loadGlobalInvestorsSections, "InvestorRules");
const InvestorKeep = lazyNamed(loadGlobalInvestorsSections, "InvestorKeep");
const InvestorRoutes = lazyNamed(loadGlobalInvestorsSections, "InvestorRoutes");
const InvestorIbkr = lazyNamed(loadGlobalInvestorsSections, "InvestorIbkr");
const InvestorGift = lazyNamed(loadGlobalInvestorsSections, "InvestorGift");
const InvestorGoals = lazyNamed(loadGlobalInvestorsSections, "InvestorGoals");
const InvestorWhoWeHelp = lazyNamed(loadGlobalInvestorsSections, "InvestorWhoWeHelp");
const InvestorHowWeHelp = lazyNamed(loadGlobalInvestorsSections, "InvestorHowWeHelp");
const InvestorPlan = lazyNamed(loadGlobalInvestorsSections, "InvestorPlan");
const InvestorWhyChoose = lazyNamed(loadGlobalInvestorsSections, "InvestorWhyChoose");
const InvestorHowWeWork = lazyNamed(loadGlobalInvestorsSections, "InvestorHowWeWork");
const InvestorStories = lazyNamed(loadGlobalInvestorsSections, "InvestorStories");
const InvestorFaqsClosing = lazyNamed(loadGlobalInvestorsSections, "InvestorFaqsClosing");

const loadFoundersSections = () => import("./sections/FoundersSections");
const FoundersHero = lazyNamed(loadFoundersSections, "FoundersHero");
const FoundersFamiliar = lazyNamed(loadFoundersSections, "FoundersFamiliar");
const FoundersExposed = lazyNamed(loadFoundersSections, "FoundersExposed");
const FoundersBalanceSheets = lazyNamed(loadFoundersSections, "FoundersBalanceSheets");
const FoundersWhoWeHelp = lazyNamed(loadFoundersSections, "FoundersWhoWeHelp");
const FoundersStages = lazyNamed(loadFoundersSections, "FoundersStages");
const FoundersLegacy = lazyNamed(loadFoundersSections, "FoundersLegacy");
const FoundersKeep = lazyNamed(loadFoundersSections, "FoundersKeep");
const FoundersHowWeHelp = lazyNamed(loadFoundersSections, "FoundersHowWeHelp");
const FoundersSoundingBoard = lazyNamed(loadFoundersSections, "FoundersSoundingBoard");
const FoundersDeliverables = lazyNamed(loadFoundersSections, "FoundersDeliverables");
const FoundersWhyChoose = lazyNamed(loadFoundersSections, "FoundersWhyChoose");
const FoundersHowWeWork = lazyNamed(loadFoundersSections, "FoundersHowWeWork");
const FoundersStories = lazyNamed(loadFoundersSections, "FoundersStories");
const FoundersFaqsClosing = lazyNamed(loadFoundersSections, "FoundersFaqsClosing");

const loadProfessionalsSections = () => import("./sections/ProfessionalsSections");
const CxoHero = lazyNamed(loadProfessionalsSections, "CxoHero");
const CxoFamiliar = lazyNamed(loadProfessionalsSections, "CxoFamiliar");
const CxoDrift = lazyNamed(loadProfessionalsSections, "CxoDrift");
const CxoFamilyCfo = lazyNamed(loadProfessionalsSections, "CxoFamilyCfo");
const CxoWhoWeHelp = lazyNamed(loadProfessionalsSections, "CxoWhoWeHelp");
const CxoEarning = lazyNamed(loadProfessionalsSections, "CxoEarning");
const CxoHowWeHelp = lazyNamed(loadProfessionalsSections, "CxoHowWeHelp");
const CxoSoundingBoard = lazyNamed(loadProfessionalsSections, "CxoSoundingBoard");
const CxoFreedom = lazyNamed(loadProfessionalsSections, "CxoFreedom");
const CxoDeliverables = lazyNamed(loadProfessionalsSections, "CxoDeliverables");
const CxoWhyChoose = lazyNamed(loadProfessionalsSections, "CxoWhyChoose");
const CxoHowWeWork = lazyNamed(loadProfessionalsSections, "CxoHowWeWork");
const CxoStories = lazyNamed(loadProfessionalsSections, "CxoStories");
const CxoFaqsClosing = lazyNamed(loadProfessionalsSections, "CxoFaqsClosing");

const loadMaterialCodeSections = () => import("./sections/MaterialCodeSections");
const MaterialInfoBody = lazyNamed(loadMaterialCodeSections, "MaterialInfoBody");
const SebiCodeBody = lazyNamed(loadMaterialCodeSections, "SebiCodeBody");
const loadInvestorCharterSections = () => import("./sections/InvestorCharterSections");
const InvestorCharterBody = lazyNamed(loadInvestorCharterSections, "InvestorCharterBody");
const loadGrievanceFunctionsSections = () => import("./sections/GrievanceFunctionsSections");
const GrievanceBody = lazyNamed(loadGrievanceFunctionsSections, "GrievanceBody");
const IaFunctionsBody = lazyNamed(loadGrievanceFunctionsSections, "IaFunctionsBody");
const loadCfaCodeSections = () => import("./sections/CfaCodeSections");
const CfaCodeBody = lazyNamed(loadCfaCodeSections, "CfaCodeBody");
const loadInsightsSections = () => import("./sections/InsightsSections");
const InsightsBanner = lazyNamed(loadInsightsSections, "InsightsBanner");
const InsightsBlogs = lazyNamed(loadInsightsSections, "InsightsBlogs");
const InsightsBooks = lazyNamed(loadInsightsSections, "InsightsBooks");
const InsightsConnect = lazyNamed(loadInsightsSections, "InsightsConnect");
const InsightsMedia = lazyNamed(loadInsightsSections, "InsightsMedia");
const InsightsTv = lazyNamed(loadInsightsSections, "InsightsTv");
const InsightsYoutube = lazyNamed(loadInsightsSections, "InsightsYoutube");

const SECTION_COMPONENTS = {
  hero: Hero,
  table: TableSection,
  imageCards: ImageCards,
  callback: Callback,
  whyUs: WhyUs,
  cardCarousel: CardCarousel,
  iconCards: IconCards,
  team: Team,
  richText: RichText,
  cards: CardGrid,
  imageText: ImageText,
  cta: Cta,
  stats: Stats,
  calendly: CalendlyBooking,
  disclosureHero: DisclosureHero,
  aboutHero: AboutHero,
  whyWeAre: WhyWeAre,
  whoWeAre: WhoWeAre,
  whatWeDo: WhatWeDo,
  visionMission: VisionMission,
  pillars: Pillars,
  whyAssociateHero: WhyAssociateHero,
  associationPhilosophy: AssociationPhilosophy,
  sevenReasons: SevenReasons,
  pearlAssessment: PearlAssessment,
  teamHero: TeamHero,
  leadership: Leadership,
  teamEcosystem: TeamEcosystem,
  teamDisclaimer: TeamDisclaimer,
  careerHero: CareerHero,
  careerWhyWork: CareerWhyWork,
  careerEthos: CareerEthos,
  contactHero: ContactHero,
  contactHub: ContactHub,
  contactMap: ContactMap,
  complianceHero: ComplianceHero,
  complianceHub: ComplianceHub,
  policyHero: PolicyHero,
  privacyHero: PolicyHero,
  disclaimerHero: PolicyHero,
  refundHero: PolicyHero,
  privacyPolicyHub: PrivacyPolicyHub,
  disclaimerHub: DisclaimerHub,
  refundHub: RefundHub,
  nriReturnHero: NriReturnHero,
  nriReturnDrivers: NriReturnDrivers,
  nriWhoWeHelp: NriWhoWeHelp,
  nriFounderStory: NriFounderStory,
  nriRnorWindow: NriRnorWindow,
  nriFinancialDecisions: NriFinancialDecisions,
  nriTimelineRoadmap: NriTimelineRoadmap,
  nriValuePoints: NriValuePoints,
  nriCrossBorderAssets: NriCrossBorderAssets,
  nriDeliverables: NriDeliverables,
  nriWhyChoose: NriWhyChoose,
  nriFamilyStory: NriFamilyStory,
  nriFaqsClosing: NriFaqsClosing,
  globalIndiansHero: GlobalIndiansHero,
  globalIndiansWhatYouKeep: GlobalIndiansWhatYouKeep,
  globalIndiansApproach: GlobalIndiansApproach,
  globalIndiansFamiliar: GlobalIndiansFamiliar,
  globalIndiansWhoWeWorkWith: GlobalIndiansWhoWeWorkWith,
  globalIndiansWhyDifferent: GlobalIndiansWhyDifferent,
  globalIndiansHowWeHelp: GlobalIndiansHowWeHelp,
  globalIndiansWhyChoose: GlobalIndiansWhyChoose,
  globalIndiansHowWeWork: GlobalIndiansHowWeWork,
  globalIndiansFamilyStory: GlobalIndiansFamilyStory,
  globalIndiansFaqsClosing: GlobalIndiansFaqsClosing,
  globalCitizensHero: GlobalCitizensHero,
  globalCitizensFamiliar: GlobalCitizensFamiliar,
  globalCitizensStatus: GlobalCitizensStatus,
  globalCitizensHomeTax: GlobalCitizensHomeTax,
  globalCitizensTaxFree: GlobalCitizensTaxFree,
  globalCitizensShareTax: GlobalCitizensShareTax,
  globalCitizensReport: GlobalCitizensReport,
  globalCitizensInvest: GlobalCitizensInvest,
  globalCitizensWhoWeHelp: GlobalCitizensWhoWeHelp,
  globalCitizensHowWeHelp: GlobalCitizensHowWeHelp,
  globalCitizensPlan: GlobalCitizensPlan,
  globalCitizensWhyChoose: GlobalCitizensWhyChoose,
  globalCitizensHowWeWork: GlobalCitizensHowWeWork,
  globalCitizensStories: GlobalCitizensStories,
  globalCitizensFaqsClosing: GlobalCitizensFaqsClosing,
  investorHero: InvestorHero,
  investorReasons: InvestorReasons,
  investorFamiliar: InvestorFamiliar,
  investorRules: InvestorRules,
  investorKeep: InvestorKeep,
  investorRoutes: InvestorRoutes,
  investorIbkr: InvestorIbkr,
  investorGift: InvestorGift,
  investorGoals: InvestorGoals,
  investorWhoWeHelp: InvestorWhoWeHelp,
  investorHowWeHelp: InvestorHowWeHelp,
  investorPlan: InvestorPlan,
  investorWhyChoose: InvestorWhyChoose,
  investorHowWeWork: InvestorHowWeWork,
  investorStories: InvestorStories,
  investorFaqsClosing: InvestorFaqsClosing,
  foundersHero: FoundersHero,
  foundersFamiliar: FoundersFamiliar,
  foundersExposed: FoundersExposed,
  foundersBalanceSheets: FoundersBalanceSheets,
  foundersWhoWeHelp: FoundersWhoWeHelp,
  foundersStages: FoundersStages,
  foundersLegacy: FoundersLegacy,
  foundersKeep: FoundersKeep,
  foundersHowWeHelp: FoundersHowWeHelp,
  foundersSoundingBoard: FoundersSoundingBoard,
  foundersDeliverables: FoundersDeliverables,
  foundersWhyChoose: FoundersWhyChoose,
  foundersHowWeWork: FoundersHowWeWork,
  foundersStories: FoundersStories,
  foundersFaqsClosing: FoundersFaqsClosing,
  cxoHero: CxoHero,
  cxoFamiliar: CxoFamiliar,
  cxoDrift: CxoDrift,
  cxoFamilyCfo: CxoFamilyCfo,
  cxoWhoWeHelp: CxoWhoWeHelp,
  cxoEarning: CxoEarning,
  cxoHowWeHelp: CxoHowWeHelp,
  cxoSoundingBoard: CxoSoundingBoard,
  cxoFreedom: CxoFreedom,
  cxoDeliverables: CxoDeliverables,
  cxoWhyChoose: CxoWhyChoose,
  cxoHowWeWork: CxoHowWeWork,
  cxoStories: CxoStories,
  cxoFaqsClosing: CxoFaqsClosing,
  materialInfoBody: MaterialInfoBody,
  sebiCodeBody: SebiCodeBody,
  investorCharterBody: InvestorCharterBody,
  grievanceBody: GrievanceBody,
  iaFunctionsBody: IaFunctionsBody,
  cfaCodeBody: CfaCodeBody,
  insightsBanner: InsightsBanner,
  insightsMedia: InsightsMedia,
  insightsBooks: InsightsBooks,
  insightsBlogs: InsightsBlogs,
  insightsTv: InsightsTv,
  insightsYoutube: InsightsYoutube,
  insightsConnect: InsightsConnect,
};

class SectionBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(previous) {
    if (this.state.failed && previous.section !== this.props.section) this.setState({ failed: false });
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function CmsSections({ sections }) {
  // One boundary for the whole page: sections whose design is still loading appear together. The
  // placeholder sits under the floating header like the page banners do, so nothing jumps on arrival.
  return <Suspense fallback={<div className="-mt-[var(--header-clearance,4.875rem)] min-h-screen" aria-busy="true" />}>{renderSections(sections)}</Suspense>;
}

function renderSections(sections) {
  return visibleItems(sections).map((section) => {
    const Section = SECTION_COMPONENTS[section.type];
    if (!Section) return null;
    const root = { id: section.design?.anchor || undefined, "data-cms-section": section.id };
    return (
      <SectionBoundary key={section.id} section={section}>
        <Section id={section.id} section={section} content={section.content || {}} design={section.design || {}} root={root} />
      </SectionBoundary>
    );
  });
}
