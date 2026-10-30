import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function FunctionsOfInvestmentAdviser() {
  const { page } = usePage("functions-of-investment-adviser");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Functions of Investment Adviser | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Statutory functions, obligations, duties, and responsibilities of Neuron Wealth Advisors LLP under the SEBI (Investment Advisers) Regulations, 2013."
        }
        canonical="https://neuronwealth.com/functions-of-investment-adviser"
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
