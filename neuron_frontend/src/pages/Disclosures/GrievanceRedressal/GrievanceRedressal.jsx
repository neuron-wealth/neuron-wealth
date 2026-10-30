import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function GrievanceRedressal() {
  const { page } = usePage("grievance-redressal");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Grievance Redressal | Investor Redressal Mechanism | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Investor grievance redressal mechanism and escalation matrix at Neuron Wealth Advisors LLP. Contact Customer Care, Compliance Officer, Principal Officer, SEBI SCORES, and Smart ODR."
        }
        canonical="https://neuronwealth.com/grievance-redressal"
      />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] dark:bg-[#07131e]"
      >
        <CmsSections sections={page?.sections} />
      </main>

      <Footer />
    </>
  );
}
