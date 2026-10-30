import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function MaterialInformation() {
  const { page } = usePage("material-information");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Material Information about NWA | Regulation 18(1) | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Official material information disclosed by Neuron Wealth Advisors LLP in accordance with para 18(1) of the SEBI IA Regulations: Statutory registration, services, team composition, fee models, and principal officer credentials."
        }
        canonical="https://neuronwealth.com/material-information"
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
