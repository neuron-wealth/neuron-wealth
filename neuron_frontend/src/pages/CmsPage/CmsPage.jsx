import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { seo } from "../../config/site";
import Seo from "../../components/common/Seo";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import CmsSections from "../../components/cms/CmsSections";
import { usePage } from "../../hooks/usePage";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Old neuronwealth.com posts lived at /{slug}; send those visitors to /blog/{slug}, everyone else home. */
function LegacyBlogRedirect({ slug }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/blogs/public/${encodeURIComponent(slug)}`, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => active && setTarget(data ? `/blog/${data.redirect || slug}` : "/"))
      .catch(() => active && setTarget("/"));
    return () => {
      active = false;
    };
  }, [slug]);

  return target ? <Navigate to={target} replace /> : <div className="min-h-[60vh]" aria-busy="true" />;
}

function PageContent({ slug }) {
  const { page, status } = usePage(slug);
  if (status === "missing" || status === "error") {
    return (
      <>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <LegacyBlogRedirect slug={slug} />
        </main>
      </>
    );
  }

  return (
    <>
      <Seo title={page ? page.seo?.title || `${page.title} | Neuron Wealth Advisors` : seo.title} description={page?.seo?.description || seo.description} />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="scroll-mt-[var(--header-height,6rem)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21649A]"
      >
        {page ? (
          <div className="home-editorial bg-white font-manrope text-[#18324A] dark:bg-[#102A40] dark:text-slate-100">
            <CmsSections sections={page.sections} />
          </div>
        ) : (
          <div className="min-h-[60vh]" aria-busy="true" />
        )}
      </main>
      <Footer editorial topBg="bg-white dark:bg-[#0d2438]" />
    </>
  );
}

/** Serves pages created in the admin Website CMS at /{slug}; old blog addresses move to /blog/{slug}; anything else goes home. */
export default function CmsPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!SLUG_PATTERN.test(slug)) return <Navigate to="/" replace />;
  return <PageContent key={slug} slug={slug} />;
}
