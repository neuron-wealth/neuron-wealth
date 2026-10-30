import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { faqJsonLd } from "../../../components/cms/sections/serviceKit";
import { usePage } from "../../../hooks/usePage";

export default function FoundersAndEntrepreneurs() {
  const { page } = usePage("founders-and-entrepreneurs");
  const pageSchema = useMemo(() => faqJsonLd(page, "foundersFaqsClosing"), [page]);

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Family Office for Founders and Business Owners | Wealth After Exit | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "Founder or business owner? Separate business and family wealth, plan for funding rounds and exits, diversify and plan succession. Fee only SEBI RIA acting as your Family CFO."
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
