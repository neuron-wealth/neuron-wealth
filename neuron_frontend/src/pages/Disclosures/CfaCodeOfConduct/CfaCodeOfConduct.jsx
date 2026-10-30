import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function CfaCodeOfConduct() {
  const { page } = usePage("cfa-code-of-conduct");

  return (
    <>
      <Seo
        title={page?.seo?.title || "CFA Code of Conduct | Ethics & Professional Standards | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Official CFA Institute Code of Ethics and Standards of Professional Conduct followed by Neuron Wealth Advisors LLP. Leadership under CFA Charterholder Jigar Patel since 2011."
        }
        canonical="https://neuronwealth.com/cfa-code-of-conduct"
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
