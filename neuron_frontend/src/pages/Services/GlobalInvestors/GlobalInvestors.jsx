import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { faqJsonLd } from "../../../components/cms/sections/serviceKit";
import { usePage } from "../../../hooks/usePage";

export default function GlobalInvestors() {
  const { page } = usePage("global-investor");
  const pageSchema = useMemo(() => faqJsonLd(page, "investorFaqsClosing"), [page]);

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Invest Abroad from India | LRS, GIFT City and Global Investing Adviser | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "Investing abroad from India? Fee only SEBI RIA guiding HNI families on LRS, TCS, GIFT IFSC funds, Interactive Brokers, foreign tax credit, US estate tax and FEMA, for better returns after tax."
        }
        jsonLd={pageSchema}
      />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] dark:bg-[#071321]"
      >
        <CmsSections sections={page?.sections} />
        <MobileScrollReveal watch={page?.sections} allScreens />
      </main>

      <Footer editorial topBg="bg-white dark:bg-[#071321]" />
    </>
  );
}
