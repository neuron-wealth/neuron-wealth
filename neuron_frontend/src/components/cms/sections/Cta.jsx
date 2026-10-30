import { sectionDesign } from "../design";
import { Eyebrow, PillLink, Reveal, hasImage, imageStyle } from "../primitives";

export default function Cta({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "navy", align: "center" });
  const center = look.align === "center";
  const withImage = hasImage(content.image);
  const light = withImage || look.light;
  const headingId = `${id}-heading`;

  return (
    <section
      {...root}
      aria-labelledby={content.title ? headingId : undefined}
      className={`relative isolate overflow-hidden ${look.background} ${look.spacing}`}
      style={look.style}
    >
      {withImage ? (
        <>
          <img
            src={content.image.url}
            alt=""
            loading="lazy"
            style={imageStyle(content.image, { sizing: false })}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#071321]/75" />
        </>
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full border border-white/10" />
      <Reveal className={`site-frame px-4 sm:px-6 ${center ? "text-center" : ""}`}>
        <div className={`max-w-3xl ${center ? "mx-auto" : ""}`}>
          <Eyebrow light={light} center={center}>
            {content.eyebrow}
          </Eyebrow>
          {content.title ? (
            <h2
              id={headingId}
              className={`${content.eyebrow ? "mt-3" : ""} font-display text-[2.1rem] leading-[1.1] sm:text-[2.8rem] ${
                light ? "text-white" : "text-[#15344F] dark:text-white"
              }`}
            >
              {content.title}
            </h2>
          ) : null}
          {content.text ? (
            <p className={`mt-4 text-lg leading-[1.6] ${light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>{content.text}</p>
          ) : null}
          <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
            <PillLink link={content.primaryButton} variant="solid" />
            <PillLink link={content.secondaryButton} variant={light ? "light" : "outline"} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
