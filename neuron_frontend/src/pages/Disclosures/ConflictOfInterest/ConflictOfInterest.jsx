import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function ConflictOfInterest() {
  const { page } = usePage("conflict-of-interest");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Conflict of Interest Disclosures | Neuron Wealth Advisors"}
        description={page?.seo?.description || "How Neuron Wealth Advisors LLP identifies, discloses and manages potential conflicts of interest so that every client is treated fairly."}
        canonical="https://neuronwealth.com/conflict-of-interest"
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
