import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company, seo as defaultSeo } from "../../config/site";

function setMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function Seo({ title, description, canonical, image, imageAlt, jsonLd }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url =
      canonical ||
      `https://neuronwealth.com${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    const shareImage = image || defaultSeo.image;
    const shareAlt = imageAlt || defaultSeo.imageAlt;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", company.name);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", shareImage);
    setMeta("property", "og:image:alt", shareAlt);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", shareImage);
    setMeta("name", "twitter:image:alt", shareAlt);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    let script = document.getElementById("page-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    const webPage = {
      "@type": "WebPage",
      name: title,
      description,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: company.name,
        url: company.url,
      },
    };
    script.textContent = JSON.stringify(
      jsonLd && jsonLd.length
        ? { "@context": "https://schema.org", "@graph": [webPage, ...jsonLd] }
        : { "@context": "https://schema.org", ...webPage },
    );
  }, [title, description, canonical, image, imageAlt, jsonLd, pathname]);

  return null;
}
