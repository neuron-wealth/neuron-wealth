import { useMemo } from "react";
import Seo from "../../../components/common/Seo";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CmsSections from "../../../components/cms/CmsSections";
import MobileScrollReveal from "../../../components/common/MobileScrollReveal";
import { usePage } from "../../../hooks/usePage";

export default function NrisReturningToIndia() {
  const { page } = usePage("nri-returning-to-india");

  const pageSchema = useMemo(() => {
    const faqSection = page?.sections?.find((s) => s.type === "nriFaqsClosing");
    const faqs = faqSection?.content?.faqs || [];
    const roadmapSection = page?.sections?.find((s) => s.type === "nriTimelineRoadmap");
    const steps = roadmapSection?.content?.steps || [];

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
    if (steps.length > 0) {
      schema.push({
        "@type": "HowTo",
        name: roadmapSection?.content?.stepsHeading || "Your Return, Step by Step",
        step: steps.map((item, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: item.stage,
          text: item.text,
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
          "Returning to India from the USA | RSU, 401(k) and RNOR Planning | Neuron Wealth"
        }
        description={
          page?.seo?.description ||
          "Moving back to India from the US? Plan your RSUs, 401(k), US stocks, RNOR years and money transfers before you move. Fee only SEBI RIA founded by a US returnee."
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
