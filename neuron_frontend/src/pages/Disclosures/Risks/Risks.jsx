import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function Risks() {
  const { page } = usePage("risks");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Investment Risks | Neuron Wealth Advisors"}
        description={page?.seo?.description || "Major risk factors that can affect the value of investments and expected returns, and how Neuron Wealth Advisors LLP endeavours to manage them."}
        canonical="https://neuronwealth.com/risks"
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
