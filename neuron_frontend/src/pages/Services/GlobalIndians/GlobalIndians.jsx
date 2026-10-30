import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { usePage } from "../../../hooks/usePage";

const DEFAULT_FAQS = [
  {
    q: "What do you mean by better returns after tax?",
    a: "It is what you actually keep after paying tax in India and in your home country. We compare investments on this basis, adjusted for the risk you take, instead of looking only at the headline return.",
  },
  {
    q: "Can I invest in Indian mutual funds while living in the US?",
    a: "Yes, but only some fund houses accept investors living in the US and Canada. More important, for US taxpayers Indian mutual funds are usually treated as PFIC, which can mean higher tax and extra filing in the US. Shares, bonds and some other options may suit you better. We look at both countries before you invest.",
  },
  {
    q: "Do you manage my money?",
    a: "We advise. Your money stays in your own name and your own accounts. We recommend what to do, help you carry it out and keep reviewing it.",
  },
  {
    q: "Is interest on my NRE account tax free?",
    a: "In India, yes, as long as you are a non resident. If you are a US tax resident, the interest is taxed in the US and must be reported there.",
  },
  {
    q: "How much money can I take out of my NRO account?",
    a: "Up to USD 1 million in each financial year, after paying the tax due and with the required forms. Money in NRE accounts can be taken out in full.",
  },
  {
    q: "I hold an OCI card. What can I invest in?",
    a: "Mostly the same as NRIs: shares, mutual funds, bonds, deposits and residential or commercial property. You cannot buy agricultural land, farmhouses or plantations, though you can inherit them.",
  },
  {
    q: "Will I pay tax twice on my Indian income?",
    a: "Usually not. Under DTAA, the tax paid in India can generally be claimed as a credit in the country you live in. This needs planning and correct filing in both countries.",
  },
  {
    q: "Can you work with my CPA in the US?",
    a: "Yes. We regularly work with CPAs and tax advisers abroad so that your investment decisions and tax returns in both countries match.",
  },
];

export default function GlobalIndians() {
  const { page } = usePage("global-indians");

  const pageSchema = useMemo(() => {
    const faqSection = page?.sections?.find((s) => s.type === "globalIndiansFaqsClosing");
    const faqs = faqSection?.content?.faqs?.length ? faqSection.content.faqs : DEFAULT_FAQS;

    const schema = [];
    if (faqs.length > 0) {
      schema.push({
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    }
    return schema;
  }, [page]);

  return (
    <>
      <Seo
        title={
          page?.seo?.title ||
          "Investment Adviser for NRIs and OCIs | After Tax Returns | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "SEBI registered, fee only investment adviser for NRIs and OCIs. Better returns after tax in India and your home country, with the right risk and full compliance."
        }
        jsonLd={pageSchema.length > 0 ? pageSchema : undefined}
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
