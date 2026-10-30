import { seo } from "../../config/site";
import Seo from "../../components/common/Seo";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { usePage } from "../../hooks/usePage";
import EditorialHome from "./EditorialHome";

export default function Home() {
  const { page } = usePage("home");

  return (
    <>
      <Seo
        title={page?.seo?.title || seo.title}
        description={page?.seo?.description || seo.description}
        canonical={seo.canonical}
        image={seo.image}
        imageAlt={seo.imageAlt}
      />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="scroll-mt-[var(--header-height,6rem)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21649A]"
      >
        <EditorialHome sections={page?.sections} />
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}
