import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { faqJsonLd } from "../../../components/cms/sections/serviceKit";
import { usePage } from "../../../hooks/usePage";

export default function ProfessionalsAndCxos() {
  const { page } = usePage("professionals-and-cxos");
  const pageSchema = useMemo(() => faqJsonLd(page, "cxoFaqsClosing"), [page]);

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Family CFO for Professionals and CXOs | Wealth Management and ESOP Advice | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "Busy doctor, lawyer, CA or CXO? We act as your Family CFO: investments, ESOPs, tax, insurance, will and early retirement planning, in one place. Fee only SEBI RIA."
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
