import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function RefundPolicy() {
  const { page } = usePage("refund-policy");

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Refund Policy | Statutory Terms & Retainer Guidance | Neuron Wealth Advisors"
        }
        description={
          page?.seo?.description ||
          "Official refund policy of Neuron Wealth Advisors LLP under SEBI IA Regulation 15A: advisory retainers, breakage deductions, and 5-day banking settlement procedure."
        }
        canonical="https://neuronwealth.com/refund-policy"
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
