import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function SebiRegulatoryCompliance() {
  const { page } = usePage("sebi-regulatory-compliance");

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "SEBI Regulatory Compliance Disclosure | Neuron Wealth Advisors"
        }
        description={
          page?.seo?.description ||
          "Official SEBI Regulatory Compliance Disclosure for Neuron Wealth Advisors LLP (SEBI RIA INA000016481, BASL 1697): Annual audit status, monthly complaints disposal, code of conduct, and compliance officer details."
        }
        canonical="https://neuronwealth.com/sebi-regulatory-compliance"
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
