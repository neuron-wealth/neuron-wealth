import Seo from "../../../components/common/Seo";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function AboutUs() {
  const { page } = usePage("about");

  return (
    <>
      <Seo
        title={page?.seo?.title || "About Us | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser (RIA) INA000016481 providing holistic investment advisory and multi-family office services."
        }
      />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] dark:bg-[#0d2438]"
      >
        <CmsSections sections={page?.sections} />
      </main>

      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}
