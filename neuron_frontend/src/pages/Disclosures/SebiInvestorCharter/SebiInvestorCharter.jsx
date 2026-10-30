import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import { usePage } from "../../../hooks/usePage";

export default function SebiInvestorCharter() {
  const { page } = usePage("sebi-investor-charter");

  return (
    <>
      <Seo
        title={page?.seo?.title || "SEBI Investor Charter | Neuron Wealth Advisors"}
        description={
          page?.seo?.description ||
          "Official SEBI Investor Charter for Investment Advisers: Vision, Mission, business transacted, investor rights, grievance redressal mechanism, and essential Do's and Don'ts."
        }
        canonical="https://neuronwealth.com/sebi-investor-charter"
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
