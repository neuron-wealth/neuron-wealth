import { useEffect, useState } from "react";
import { Brain, ShieldCheck } from "lucide-react";
import { CMS_ICONS } from "../cmsIcons";

const DEFAULT_SLIDES = [
  {
    tabLabel: "What We Do",
    eyebrow: "The Neuron Philosophy",
    icon: "Brain",
    title: "What We Do",
    quote: "“Distilling multi-market complexity into unified signals of clarity, safety, and enduring generational wealth.”",
    subquote: "Fiduciary Intelligence in Action",
    text: "Just like Neurons in our brain collects the information, interprets them and give instructions to various parts of body to keep it safe and sound, we use our expert knowledge and experience in income tax, investment and wealth management, insurance, estate planning, interpreting domestic and international financial markets, local and global compliance requirement and provide holistic advice to better manage our clients wealth for multiple generations.",
    tags: ["Income Tax", "Investment & Wealth", "Insurance Planning", "Estate & Succession", "Global Compliance"],
  },
  {
    tabLabel: "How We Add Value",
    eyebrow: "Client Value Proposition",
    icon: "ShieldCheck",
    title: "How We Add Value",
    quote: "“One unified family advisor instead of fragmented voices—simplifying financial life and safeguarding generational legacy.”",
    subquote: "Unified Family CFO Governance",
    text: "We provide one stop shop for all of their financial needs so our clients will work with only 1 trusted advisor instead of multiple advisors. We provide holistic advice so our clients can simplify their financial life by making informed decisions, optimizing taxes, creating and sustaining wealth, and making smooth and efficient transfer of wealth to next generations while complying with applicable laws.",
    tags: ["Tax Optimization", "Generational Transfer", "Wealth Preservation", "Holistic Fiduciary", "Global Compliance"],
  },
];

export default function WhatWeDo({ id, content, design, root }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rawSlides =
    Array.isArray(content.slides) && content.slides.length > 0
      ? content.slides.filter((s) => s.visible !== false)
      : DEFAULT_SLIDES;
  const slides = rawSlides.length > 0 ? rawSlides : DEFAULT_SLIDES;
  const bannerUrl = content.image?.url || "/images/about-what-we-do-banner.jpg";

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeIndex = Math.min(currentSlide, slides.length - 1);

  return (
    <section
      id={id || "what-we-do"}
      {...root}
      className="relative isolate scroll-mt-[var(--header-height,4.875rem)] w-full overflow-hidden bg-[#0a2337] py-16 text-white sm:py-20 lg:py-24"
      aria-label="What We Do & How We Add Value - The Neuron Philosophy"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Static / Fixed Background Image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bannerUrl})` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/35" aria-hidden="true" />

      <div className="site-frame relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 [grid-template-areas:'slide']">
          {slides.map((slide, idx) => {
            const isActive = activeIndex === idx;
            const Icon =
              slide.icon && CMS_ICONS[slide.icon]
                ? CMS_ICONS[slide.icon]
                : idx === 0
                ? Brain
                : ShieldCheck;
            const tags = Array.isArray(slide.tags) ? slide.tags : [];

            return (
              <div
                key={slide.id || idx}
                className={`[grid-area:slide] grid items-start gap-8 transition-all duration-700 ease-in-out lg:grid-cols-12 lg:gap-16 ${
                  isActive
                    ? "pointer-events-auto translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-8 opacity-0"
                }`}
              >
                <div className="lg:col-span-5">
                  <p className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#8FCB86] drop-shadow-md">
                    <Icon className="h-4 w-4 shrink-0 text-[#8FCB86]" aria-hidden="true" />
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-[3rem] lg:text-[3.25rem]">
                    {slide.title}
                  </h2>

                  {slide.quote && (
                    <div className="mt-6 max-w-md">
                      <p className="font-serif text-[1.18rem] sm:text-[1.28rem] italic font-normal leading-[1.6] text-[#F3E6D4] drop-shadow-md">
                        {slide.quote}
                      </p>
                      {slide.subquote && (
                        <p className="mt-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#8FCB86]/90">
                          {slide.subquote}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-none bg-white p-7 shadow-2xl ring-1 ring-black/5 dark:bg-[#102A40] dark:ring-white/10 sm:p-9 lg:p-10">
                    <p className="text-base font-normal leading-[1.8] text-[#18324A] dark:text-slate-200 sm:text-[1.0625rem]">
                      {slide.text}
                    </p>
                    {tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2.5 pt-6">
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-[#F3F6F8] px-4 py-1.5 text-sm font-medium text-[#15344F] ring-1 ring-[#E2E8F0] transition-colors hover:bg-[#E8EEF2] dark:bg-white/10 dark:text-white dark:ring-white/20"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-Slider Indicators */}
        {slides.length > 1 && (
          <div className="relative z-20 mt-10 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-4">
              {slides.map((slide, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {idx > 0 && <span className="text-white/30">•</span>}
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                      activeIndex === idx ? "text-[#8FCB86]" : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    <span className="font-mono text-[0.6875rem]">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{slide.tabLabel || slide.title}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}: ${slide.title}`}
                  className="group relative flex h-4 cursor-pointer items-center p-1"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === idx
                        ? "w-16 bg-[#8FCB86] shadow-[0_0_12px_rgba(143,203,134,0.85)] sm:w-20"
                        : "w-10 bg-white/35 group-hover:bg-white/60 sm:w-12"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
