import { Navigate, useParams } from "react-router-dom";
import Seo from "../../components/common/Seo";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import CmsSections from "../../components/cms/CmsSections";
import { INSIGHTS_TAB_KEYS, activeInsightsTab } from "../../components/cms/sections/InsightsSections";
import { usePage } from "../../hooks/usePage";

const TAB_LABELS = { media: "Media", books: "Books", blogs: "Blogs", video: "Video", connect: "Connect" };

export default function InsightTopic() {
  const { slug } = useParams();
  const { page } = usePage("insights");
  const tab = activeInsightsTab(slug);
  if (!INSIGHTS_TAB_KEYS.includes(tab)) return <Navigate to="/insights" replace />;

  const tabs = page?.sections?.find((entry) => entry.type === "insightsBanner")?.content?.tabs;
  const tabLabel = (Array.isArray(tabs) && tabs.find((item) => item?.key === tab)?.label) || TAB_LABELS[tab];
  const title =
    tab === "all" ? page?.seo?.title || "Knowledge Hub | Neuron Wealth Advisors" : `${tabLabel} | Neuron Wealth Advisors`;

  return (
    <>
      <Seo
        title={title}
        description={
          page?.seo?.description ||
          "Print media, books, blogs, television, YouTube and Neuron Wealth Connect from Neuron Wealth Advisors."
        }
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="home-editorial min-h-screen bg-white font-manrope text-[#18324A] focus:outline-none dark:bg-[#0d2438]">
        <CmsSections sections={page?.sections} />
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}
