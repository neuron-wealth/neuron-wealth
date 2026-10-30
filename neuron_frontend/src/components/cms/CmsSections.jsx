import { Component } from "react";
import { visibleItems } from "./primitives";
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
import CalendlyBooking from "./sections/CalendlyBooking";
import DisclosureHero from "./sections/DisclosureHero";

import AboutHero from "./sections/AboutHero";
import WhyWeAre from "./sections/WhyWeAre";
import WhoWeAre from "./sections/WhoWeAre";
import WhatWeDo from "./sections/WhatWeDo";
import VisionMission from "./sections/VisionMission";
import Pillars from "./sections/Pillars";

import WhyAssociateHero from "./sections/WhyAssociateHero";
import AssociationPhilosophy from "./sections/AssociationPhilosophy";
import SevenReasons from "./sections/SevenReasons";
import PearlAssessment from "./sections/PearlAssessment";

import TeamHero from "./sections/TeamHero";
import Leadership from "./sections/Leadership";
import TeamEcosystem from "./sections/TeamEcosystem";
import TeamDisclaimer from "./sections/TeamDisclaimer";

import CareerHero from "./sections/CareerHero";
import CareerWhyWork from "./sections/CareerWhyWork";
import CareerEthos from "./sections/CareerEthos";

import ContactHero from "./sections/ContactHero";
import ContactHub from "./sections/ContactHub";
import ContactMap from "./sections/ContactMap";

import ComplianceHero from "./sections/ComplianceHero";
import ComplianceHub from "./sections/ComplianceHub";

import PolicyHero from "./sections/PolicyHero";
import PrivacyPolicyHub from "./sections/PrivacyPolicyHub";
import DisclaimerHub from "./sections/DisclaimerHub";
import RefundHub from "./sections/RefundHub";

import NriReturnHero from "./sections/NriReturnHero";
import NriReturnDrivers from "./sections/NriReturnDrivers";
import NriWhoWeHelp from "./sections/NriWhoWeHelp";
import NriFounderStory from "./sections/NriFounderStory";
import NriRnorWindow from "./sections/NriRnorWindow";
import NriFinancialDecisions from "./sections/NriFinancialDecisions";
import NriTimelineRoadmap from "./sections/NriTimelineRoadmap";
import NriValuePoints from "./sections/NriValuePoints";
import NriCrossBorderAssets from "./sections/NriCrossBorderAssets";
import NriDeliverables from "./sections/NriDeliverables";
import NriWhyChoose from "./sections/NriWhyChoose";
import NriFamilyStory from "./sections/NriFamilyStory";
import NriFaqsClosing from "./sections/NriFaqsClosing";

import {
  GlobalIndiansHero,
  GlobalIndiansWhatYouKeep,
  GlobalIndiansApproach,
  GlobalIndiansFamiliar,
  GlobalIndiansWhoWeWorkWith,
  GlobalIndiansWhyDifferent,
  GlobalIndiansHowWeHelp,
  GlobalIndiansWhyChoose,
  GlobalIndiansHowWeWork,
  GlobalIndiansFamilyStory,
  GlobalIndiansFaqsClosing,
} from "./sections/GlobalIndiansSections";

import {
  GlobalCitizensHero,
  GlobalCitizensFamiliar,
  GlobalCitizensStatus,
  GlobalCitizensHomeTax,
  GlobalCitizensTaxFree,
  GlobalCitizensShareTax,
  GlobalCitizensReport,
  GlobalCitizensInvest,
  GlobalCitizensWhoWeHelp,
  GlobalCitizensHowWeHelp,
  GlobalCitizensPlan,
  GlobalCitizensWhyChoose,
  GlobalCitizensHowWeWork,
  GlobalCitizensStories,
  GlobalCitizensFaqsClosing,
} from "./sections/GlobalCitizensSections";

import {
  InvestorHero,
  InvestorReasons,
  InvestorFamiliar,
  InvestorRules,
  InvestorKeep,
  InvestorRoutes,
  InvestorIbkr,
  InvestorGift,
  InvestorGoals,
  InvestorWhoWeHelp,
  InvestorHowWeHelp,
  InvestorPlan,
  InvestorWhyChoose,
  InvestorHowWeWork,
  InvestorStories,
  InvestorFaqsClosing,
} from "./sections/GlobalInvestorsSections";

import {
  FoundersHero,
  FoundersFamiliar,
  FoundersExposed,
  FoundersBalanceSheets,
  FoundersWhoWeHelp,
  FoundersStages,
  FoundersLegacy,
  FoundersKeep,
  FoundersHowWeHelp,
  FoundersSoundingBoard,
  FoundersDeliverables,
  FoundersWhyChoose,
  FoundersHowWeWork,
  FoundersStories,
  FoundersFaqsClosing,
} from "./sections/FoundersSections";

import {
  CxoHero,
  CxoFamiliar,
  CxoDrift,
  CxoFamilyCfo,
  CxoWhoWeHelp,
  CxoEarning,
  CxoHowWeHelp,
  CxoSoundingBoard,
  CxoFreedom,
  CxoDeliverables,
  CxoWhyChoose,
  CxoHowWeWork,
  CxoStories,
  CxoFaqsClosing,
} from "./sections/ProfessionalsSections";

import { MaterialInfoBody, SebiCodeBody } from "./sections/MaterialCodeSections";
import { InvestorCharterBody } from "./sections/InvestorCharterSections";
import { GrievanceBody, IaFunctionsBody } from "./sections/GrievanceFunctionsSections";
import { CfaCodeBody } from "./sections/CfaCodeSections";
import {
  InsightsBanner,
  InsightsBlogs,
  InsightsBooks,
  InsightsConnect,
  InsightsMedia,
  InsightsTv,
  InsightsYoutube,
} from "./sections/InsightsSections";

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
