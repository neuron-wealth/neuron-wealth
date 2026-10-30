import Seo from "../../../components/common/Seo";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function TeamPage() {
  const { page } = usePage("team");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Stakeholders / Team Members | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Meet the multidisciplinary team of CFA, CA, CPA, MBA, and industry leaders at Neuron Wealth Advisors LLP."
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

      <Footer editorial topBg="bg-white dark:bg-[#071726]" />
    </>
  );
}
