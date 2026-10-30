import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "../../../config/site";
import { safeHref } from "../primitives";

const DEFAULT_PARAGRAPHS = [
  "We are always looking forward to associate with great human beings with integrity who are smart and passionate about helping clients better protect and manage their family wealth, increase their risk adjusted after-tax return, sustain wealth for multiple generations while complying with applicable laws.",
  "Please answer following 4 questions for us to better understand if we can be the best fit for your career advancements and if we can have a long lasting mutually beneficial association.",
];

const DEFAULT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf4W007DEPVhQBMXKAynMhM5bmgEJGDD-_CXG9XcU_GI11VCA/viewform";

export default function CareerWhyWork({ id, content, design, root }) {
  const eyebrow = content?.eyebrow || "Careers & Opportunities";
  const title = content?.title || "Why Associate and Work with Us?";
  const imageUrl = content?.image?.url || "/images/career-team-collaborate.jpg";
  const imageAlt = content?.image?.alt || "Careers & Professional Association at Neuron Wealth Advisors";
  const paragraphs = Array.isArray(content?.paragraphs) && content.paragraphs.length > 0
    ? content.paragraphs
    : DEFAULT_PARAGRAPHS;

  const formButton = content?.formButton || {};
  const buttonLabel = formButton.label || "Fill out form";
  const buttonHref = safeHref(formButton.href || DEFAULT_FORM_URL);
  const formNote = content?.formNote || "* Standard 4-question candidate questionnaire • Opens in new tab";

  const contactTitle = content?.contactTitle || "Confidential CV Submission & Inquiries";
  const email = content?.contactEmail || company.email || "contact@neuronwealth.com";
  const phone = content?.contactPhone || company.phoneFormatted || "+91 99252 44688";
  const location = content?.contactLocation || "Satellite, Ahmedabad";

  return (
    <section
      id={id || "why-associate-work"}
      {...root}
      className="scroll-mt-[var(--header-height,4.875rem)] bg-white py-12 dark:bg-[#102A40] sm:py-16 lg:py-20"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
          {/* Left Column: Proper Square Image (5 cols) */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-none border border-slate-200 shadow-[0_16px_40px_-16px_rgba(16,42,64,0.18)] dark:border-white/10 dark:shadow-none">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-full w-full rounded-none object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: Clean Editorial Content (7 cols) */}
          <div className="flex flex-col lg:col-span-7">
            {eyebrow ? (
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#21649A] dark:text-[#8FCB86]">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="mt-3 font-display text-[2.2rem] font-medium leading-[1.1] tracking-tight text-[#15344F] dark:text-white sm:text-[2.75rem] lg:text-[3rem]">
              {title}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-[1.8] text-[#5E6D7B] dark:text-slate-300 sm:text-[1.0625rem]">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Fill out form button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={buttonHref}
                target={formButton.newTab !== false ? "_blank" : undefined}
                rel={formButton.newTab !== false ? "noopener noreferrer" : undefined}
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#1B6198] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#154e7a] shadow-sm cursor-pointer"
              >
                <span>{buttonLabel}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                {formButton.newTab !== false ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
              {formNote ? (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {formNote}
                </span>
              ) : null}
            </div>

            {/* Direct CV Submission Details */}
            <div className="mt-8 border-t border-slate-200/80 pt-5 dark:border-white/10">
              {contactTitle ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {contactTitle}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#15344F] dark:text-white">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 font-medium hover:text-[#21649A] dark:hover:text-sky-300"
                  >
                    <Mail className="h-4 w-4 text-[#21649A] dark:text-sky-300 shrink-0" />
                    <span>{email}</span>
                  </a>
                ) : null}
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 font-medium hover:text-[#21649A] dark:hover:text-sky-300"
                  >
                    <Phone className="h-4 w-4 text-[#21649A] dark:text-sky-300 shrink-0" />
                    <span>{phone}</span>
                  </a>
                ) : null}
                {location ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-[#21649A] dark:text-sky-300 shrink-0" />
                    <span>{location}</span>
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
