import { useEffect } from "react";
import { company } from "../../config/site";
import CmsSections from "../../components/cms/CmsSections";

export default function EditorialHome({ sections }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "home-organization-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: company.name,
      url: company.url,
      description: company.description,
      telephone: "+91-90999-42563",
      email: company.email,
      identifier: "INA000016481",
      address: {
        "@type": "PostalAddress",
        streetAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, B/s. Parekhs Hospital",
        addressLocality: "Ahmedabad",
        postalCode: "380015",
        addressCountry: "IN",
      },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="home-editorial bg-white font-manrope text-[#18324A] dark:bg-[#102A40] dark:text-slate-100">
      <CmsSections sections={sections} />
    </div>
  );
}
