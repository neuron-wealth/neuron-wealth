import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs/AboutUs";
import WhyAssociate from "./pages/About/WhyAssociate/WhyAssociate";
import TeamPage from "./pages/About/Team/TeamPage";
import GlobalInvestors from "./pages/Services/GlobalInvestors/GlobalInvestors";
import FoundersAndEntrepreneurs from "./pages/Services/FoundersAndEntrepreneurs/FoundersAndEntrepreneurs";
import GlobalIndians from "./pages/Services/GlobalIndians/GlobalIndians";
import GlobalCitizensInIndia from "./pages/Services/GlobalCitizensInIndia/GlobalCitizensInIndia";
import ProfessionalsAndCxos from "./pages/Services/ProfessionalsAndCxos/ProfessionalsAndCxos";
import NrisReturningToIndia from "./pages/Services/NrisReturningToIndia/NrisReturningToIndia";
import Contact from "./pages/Contact/Contact";
import RefundPolicy from "./pages/Legal/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy/PrivacyPolicy";
import SebiRegulatoryCompliance from "./pages/Disclosures/SebiRegulatoryCompliance/SebiRegulatoryCompliance";
import MaterialInformation from "./pages/Disclosures/MaterialInformation/MaterialInformation";
import SebiInvestorCharter from "./pages/Disclosures/SebiInvestorCharter/SebiInvestorCharter";
import SebiCodeOfConduct from "./pages/Disclosures/SebiCodeOfConduct/SebiCodeOfConduct";
import GrievanceRedressal from "./pages/Disclosures/GrievanceRedressal/GrievanceRedressal";
import FunctionsOfInvestmentAdviser from "./pages/Disclosures/FunctionsOfInvestmentAdviser/FunctionsOfInvestmentAdviser";
import Risks from "./pages/Disclosures/Risks/Risks";
import ConflictOfInterest from "./pages/Disclosures/ConflictOfInterest/ConflictOfInterest";
import CfaCodeOfConduct from "./pages/Disclosures/CfaCodeOfConduct/CfaCodeOfConduct";
import Disclaimer from "./pages/Legal/Disclaimer/Disclaimer";
import InsightTopic from "./pages/Insights/InsightTopic";
import CmsPreview from "./pages/CmsPreview/CmsPreview";
import CmsPage from "./pages/CmsPage/CmsPage";
import BlogList from "./pages/Blog/BlogList";
import BlogPost from "./pages/Blog/BlogPost";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }
    // CMS sections load after the route renders, so wait briefly for the anchor to appear.
    let tries = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(id);
      if (target || ++tries > 40) {
        window.clearInterval(timer);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* About dropdown subpages & URL aliases */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/why-associate" element={<WhyAssociate />} />
          <Route path="/why-associate-with-us" element={<WhyAssociate />} />
          <Route path="/about/why-associate" element={<WhyAssociate />} />
          <Route path="/about/why-associate-with-us" element={<WhyAssociate />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/our-team" element={<TeamPage />} />
          <Route path="/about/team" element={<TeamPage />} />
          <Route path="/about/our-team" element={<TeamPage />} />
          <Route path="/about-us/team" element={<TeamPage />} />
          <Route path="/stakeholders" element={<TeamPage />} />
          <Route path="/stakeholders-team-members" element={<TeamPage />} />
          <Route path="/about/stakeholders" element={<TeamPage />} />
          <Route path="/about/stakeholders-team-members" element={<TeamPage />} />

          {/* Process dropdown subpages & URL aliases */}
          <Route path="/process" element={<Navigate to="/" replace />} />
          <Route path="/our-process" element={<Navigate to="/" replace />} />
          <Route path="/simplifying-financial-life" element={<Navigate to="/" replace />} />
          <Route path="/process/simplifying-financial-life" element={<Navigate to="/" replace />} />
          <Route path="/investment-advice" element={<Navigate to="/" replace />} />
          <Route path="/process/investment-advice" element={<Navigate to="/" replace />} />
          <Route path="/investment-advisor-process" element={<Navigate to="/" replace />} />
          <Route path="/process/investment-advisor-process" element={<Navigate to="/" replace />} />

          {/* Advisory dropdown subpages & URL aliases */}
          <Route path="/advisory" element={<FoundersAndEntrepreneurs />} />
          <Route path="/advisory/family-office" element={<FoundersAndEntrepreneurs />} />
          <Route path="/family-office" element={<FoundersAndEntrepreneurs />} />
          <Route path="/family-office-family-cfo" element={<FoundersAndEntrepreneurs />} />
          <Route path="/advisory/investment-advisory" element={<GlobalInvestors />} />
          <Route path="/investment-advisory" element={<GlobalInvestors />} />
          <Route path="/advisory/nri-advisory" element={<GlobalIndians />} />
          <Route path="/nri-advisory" element={<GlobalIndians />} />
          <Route path="/nri-oci-advisory" element={<GlobalIndians />} />

          {/* Services dropdown — 6 Client Solutions & Legacy Service routes */}
          <Route path="/services" element={<GlobalCitizensInIndia />} />
          <Route path="/services/nri-returning-to-india" element={<NrisReturningToIndia />} />
          <Route path="/services/nris-returning-to-india" element={<NrisReturningToIndia />} />
          <Route path="/nri-returning-to-india" element={<NrisReturningToIndia />} />
          <Route path="/nris-returning-to-india" element={<NrisReturningToIndia />} />
          <Route path="/services/global-indians" element={<GlobalIndians />} />
          <Route path="/global-indians" element={<GlobalIndians />} />
          <Route path="/services/global-citizens-in-india" element={<GlobalCitizensInIndia />} />
          <Route path="/global-citizens-in-india" element={<GlobalCitizensInIndia />} />
          <Route path="/services/global-investor" element={<GlobalInvestors />} />
          <Route path="/global-investor" element={<GlobalInvestors />} />
          <Route path="/services/founders-and-entrepreneurs" element={<FoundersAndEntrepreneurs />} />
          <Route path="/services/founders-and-enterpreneurs" element={<FoundersAndEntrepreneurs />} />
          <Route path="/founders-and-entrepreneurs" element={<FoundersAndEntrepreneurs />} />
          <Route path="/founders-and-enterpreneurs" element={<FoundersAndEntrepreneurs />} />
          <Route path="/services/professionals-and-cxos" element={<ProfessionalsAndCxos />} />
          <Route path="/professionals-and-cxos" element={<ProfessionalsAndCxos />} />

          {/* Legacy service routes for backward compatibility */}
          <Route path="/services/cross-country-planning" element={<GlobalCitizensInIndia />} />
          <Route path="/cross-country-planning" element={<GlobalCitizensInIndia />} />
          <Route path="/career" element={<Navigate to="/contact#careers" replace />} />
          <Route path="/careers" element={<Navigate to="/contact#careers" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/about/refund-policy" element={<RefundPolicy />} />
          <Route path="/sebi-ria-certificate" element={<Navigate to="/sebi-regulatory-compliance#sebi-ria-registration" replace />} />
          <Route path="/sebi-ria-registration-certificate" element={<Navigate to="/sebi-regulatory-compliance#sebi-ria-registration" replace />} />
          <Route path="/about/sebi-ria-certificate" element={<Navigate to="/sebi-regulatory-compliance#sebi-ria-registration" replace />} />
          <Route path="/bse-asl-membership" element={<Navigate to="/sebi-regulatory-compliance#bse-asl-membership" replace />} />
          <Route path="/bse-asl" element={<Navigate to="/sebi-regulatory-compliance#bse-asl-membership" replace />} />
          <Route path="/about/bse-asl-membership" element={<Navigate to="/sebi-regulatory-compliance#bse-asl-membership" replace />} />
          <Route path="/sebi-regulatory-compliance" element={<SebiRegulatoryCompliance />} />
          <Route path="/sebi-compliance-disclosure" element={<SebiRegulatoryCompliance />} />
          <Route path="/compliance-disclosure" element={<SebiRegulatoryCompliance />} />
          <Route path="/monthly-disclosure-of-investors-complaints" element={<SebiRegulatoryCompliance />} />
          <Route path="/contact/sebi-regulatory-compliance" element={<SebiRegulatoryCompliance />} />
          <Route path="/material-information" element={<MaterialInformation />} />
          <Route path="/material-information-about-nwa" element={<MaterialInformation />} />
          <Route path="/about/material-information" element={<MaterialInformation />} />
          <Route path="/sebi-investor-charter" element={<SebiInvestorCharter />} />
          <Route path="/investor-charter" element={<SebiInvestorCharter />} />
          <Route path="/about/investor-charter" element={<SebiInvestorCharter />} />
          <Route path="/code-of-conduct-sebi" element={<SebiCodeOfConduct />} />
          <Route path="/sebi-code-of-conduct" element={<SebiCodeOfConduct />} />
          <Route path="/about/code-of-conduct-sebi" element={<SebiCodeOfConduct />} />
          <Route path="/code-of-conduct" element={<SebiCodeOfConduct />} />
          <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
          <Route path="/investor-grievance" element={<GrievanceRedressal />} />
          <Route path="/about/grievance-redressal" element={<GrievanceRedressal />} />
          <Route path="/functions-of-investment-adviser" element={<FunctionsOfInvestmentAdviser />} />
          <Route path="/functions-of-ia" element={<FunctionsOfInvestmentAdviser />} />
          <Route path="/about/functions-of-investment-adviser" element={<FunctionsOfInvestmentAdviser />} />
          <Route path="/risks" element={<Risks />} />
          <Route path="/conflict-of-interest" element={<ConflictOfInterest />} />
          <Route path="/cfa-code-of-conduct" element={<CfaCodeOfConduct />} />
          <Route path="/cfa-code" element={<CfaCodeOfConduct />} />
          <Route path="/about/cfa-code-of-conduct" element={<CfaCodeOfConduct />} />
          <Route path="/website-disclaimer" element={<Disclaimer />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/legal/disclaimer" element={<Disclaimer />} />
          <Route path="/insights" element={<InsightTopic />} />
          <Route path="/insights/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/insights/:slug" element={<InsightTopic />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/cms-preview" element={<CmsPreview />} />

          {/* Pages created in the admin Website CMS; unknown addresses redirect home */}
          <Route path="*" element={<CmsPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
