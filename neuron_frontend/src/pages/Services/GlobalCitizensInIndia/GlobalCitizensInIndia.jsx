import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { usePage } from "../../../hooks/usePage";

const DEFAULT_FAQS = [
  {
    q: "I am a foreign citizen living in India. Am I an NRI?",
    a: "Usually not. If you have lived in India long enough, you are a resident under Indian income tax and under FEMA. Your citizenship does not change that. Your accounts, investments and tax returns should reflect your resident status.",
  },
  {
    q: "Do I have to report my foreign assets in India?",
    a: "If you are a resident and ordinarily resident in India, yes. Bank accounts, investments, pensions, retirement accounts and property abroad must be reported in your Indian tax return, even if they earn no income.",
  },
  {
    q: "Will my home country still tax me after I move to India?",
    a: "It depends on your citizenship. US citizens are taxed by the US on worldwide income wherever they live. Most other countries tax you mainly on income from that country once you are no longer resident there.",
  },
  {
    q: "How do I avoid paying tax twice?",
    a: "Through the tax treaty between India and your home country and foreign tax credits. It works only when the right country taxes first, the tax years are matched and the correct forms are filed in both countries.",
  },
  {
    q: "Should a foreign citizen invest in Indian mutual funds?",
    a: "It depends on your citizenship. For US citizens, Indian mutual funds are usually treated as PFIC and can be very costly. For some other countries they may be fine. We check before you invest.",
  },
  {
    q: "What happens to my pension or retirement account back home?",
    a: "You can usually keep it, but India and your home country may tax it differently, and it must be reported in India. We plan how and when to use it for the lowest total tax.",
  },
  {
    q: "I hold an OCI card. What can I invest in?",
    a: "OCI cardholders can invest in Indian shares, bonds, mutual funds and residential or commercial property much like NRIs, but cannot buy agricultural land, farmhouses or plantations. Foreign citizens without OCI face more restrictions.",
  },
  {
    q: "Can you work with my tax adviser abroad?",
    a: "Yes. We regularly work with CPAs, chartered accountants and tax advisers in other countries to coordinate investments and tax filing across borders.",
  },
];

export default function GlobalCitizensInIndia() {
  const { page } = usePage("global-citizens-in-india");

  const pageSchema = useMemo(() => {
    const faqSection = page?.sections?.find((s) => s.type === "globalCitizensFaqsClosing");
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
          "Global Citizens in India | Investment & Cross Border Wealth Advisory | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "Fee only SEBI registered investment adviser for foreign citizens and OCI cardholders living in India. Cross border tax, investments, and global reporting."
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
