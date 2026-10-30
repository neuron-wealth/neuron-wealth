import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function PrivacyPolicy() {
  const { page } = usePage("privacy-policy");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Privacy Policy | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "How Neuron Wealth Advisors LLP, a SEBI Registered Investment Adviser, collects, uses, shares and protects your personal information, and the rights you have."
        }
        canonical="https://neuronwealth.com/privacy-policy"
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
