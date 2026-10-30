import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function SebiCodeOfConduct() {
  const { page } = usePage("code-of-conduct-sebi");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Code of Conduct – SEBI | Third Schedule | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Official Code of Conduct for Investment Advisers under the Third Schedule of SEBI IA Regulations, 2013 pursuant to Regulation 15(9): Honesty, diligence, fair charges, conflict management, and fiduciary governance."
        }
        canonical="https://neuronwealth.com/code-of-conduct-sebi"
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
