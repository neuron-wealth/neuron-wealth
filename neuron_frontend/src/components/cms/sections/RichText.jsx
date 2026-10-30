import { sectionDesign } from "../design";
import { Eyebrow, PillLink, Reveal, strings, visibleItems } from "../primitives";

export default function RichText({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white" });
  const center = look.align === "center";
  const paragraphs = strings(content.body);
  const buttons = visibleItems(content.buttons);
  const headingId = `${id}-heading`;

  return (
    <section {...root} aria-labelledby={content.title ? headingId : undefined} className={`${look.background} ${look.spacing}`} style={look.style}>
      <div className="site-frame px-4 sm:px-6">
        <Reveal className={`${look.width === "wide" ? "max-w-5xl" : "max-w-3xl"} ${center ? "mx-auto text-center" : ""}`}>
          <Eyebrow light={look.light} center={center}>
            {content.eyebrow}
          </Eyebrow>
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
            <div className={`${content.title ? "mt-5" : ""} space-y-4 text-lg leading-[1.7] ${look.light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {buttons.length ? (
            <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
              {buttons.map((button) => (
                <PillLink
                  key={button.id}
                  link={button.link}
                  variant={button.style === "outline" && look.light ? "light" : button.style || "solid"}
                />
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
