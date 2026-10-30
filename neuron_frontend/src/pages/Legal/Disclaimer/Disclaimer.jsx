import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function Disclaimer() {
  const { page } = usePage("website-disclaimer");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Disclaimer | Terms of Use & Legal Disclosures | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Official website disclaimer, terms of use, limitation of liability, financial literacy scope, and market risk disclosures of Neuron Wealth Advisors LLP."
        }
        canonical="https://neuronwealth.com/website-disclaimer"
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
