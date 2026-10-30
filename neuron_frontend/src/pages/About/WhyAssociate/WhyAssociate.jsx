import Seo from "../../../components/common/Seo";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function WhyAssociate() {
  const { page } = usePage("why-associate");

  return (
    <>
      <Seo
        title={page?.seo?.title || "Why Associate with Us | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Explaining Association through Swami Vivekananda's pearl parable. Learn why high-net-worth families, NRIs, and business owners partner with Neuron Wealth Advisors."
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
