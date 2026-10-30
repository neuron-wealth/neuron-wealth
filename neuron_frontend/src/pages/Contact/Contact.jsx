import Seo from "../../components/common/Seo";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CmsSections from "../../components/cms/CmsSections";
import { usePage } from "../../hooks/usePage";

export default function Contact() {
  const { page } = usePage("contact");

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Contact Us | Executive Advisory Desk | Neuron Wealth Advisors"
        }
        description={
          page?.seo?.description ||
          "Connect with Neuron Wealth Advisors LLP in Satellite, Ahmedabad. SEBI Registered Investment Adviser INA000016481. Phone +91 90999 42563, email info@neuronwealth.com."
        }
      />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] dark:bg-[#0c1828]"
      >
        <CmsSections sections={page?.sections} />
      </main>

      {/* Editorial Footer */}
      <Footer editorial topBg="bg-white dark:bg-[#0c1828]" />
    </>
  );
}
