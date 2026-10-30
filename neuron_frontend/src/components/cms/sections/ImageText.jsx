import { Check } from "lucide-react";
import { sectionDesign } from "../design";
import { Eyebrow, PillLink, Reveal, hasImage, imageStyle, strings } from "../primitives";

export default function ImageText({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", imageSide: "left" });
  const paragraphs = strings(content.body);
  const bullets = strings(content.bullets);
  const image = content.image;
  const sized = image?.width > 0 || image?.height > 0;
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className={`site-frame grid items-center gap-10 px-4 sm:px-6 lg:gap-16 ${hasImage(image) ? "lg:grid-cols-2" : ""}`}>
        {hasImage(image) ? (
          <Reveal className={`${look.imageSide === "right" ? "lg:order-2" : ""} ${sized ? "flex justify-center" : ""}`}>
            <img
              src={image.url}
              alt={image.alt || ""}
              loading="lazy"
              style={imageStyle(image)}
              className={`block rounded-2xl shadow-[0_24px_50px_-30px_rgba(16,42,64,0.6)] ${sized ? "object-cover" : "h-auto w-full"}`}
            />
          </Reveal>
        ) : null}
        <Reveal delay={0.08} className={hasImage(image) ? "" : "max-w-3xl"}>
          <Eyebrow light={look.light}>{content.eyebrow}</Eyebrow>
          {content.title ? (
            <h2
              id={headingId}
              className={`${content.eyebrow ? "mt-3" : ""} font-display text-[2.1rem] leading-[1.1] sm:text-[2.6rem] ${
                look.light ? "text-white" : "text-[#15344F] dark:text-white"
              }`}
            >
              {content.title}
            </h2>
          ) : null}
          {paragraphs.length ? (
            <div className={`mt-5 space-y-4 text-lg leading-[1.7] ${look.light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {bullets.length ? (
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet, index) => (
                <li key={index} className={`flex items-start gap-3 text-base ${look.light ? "text-white" : "text-[#18324A] dark:text-slate-100"}`}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54B848] text-[#102A40]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {content.button?.label ? (
            <div className="mt-8">
              <PillLink link={content.button} variant="solid" />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
