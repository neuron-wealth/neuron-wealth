import { sectionDesign } from "../design";
import { CmsLink, Eyebrow, FOCUS, hasLink, strings } from "../primitives";

export default function TableSection({ id, content, design, root }) {
  const look = sectionDesign(design, { background: "white", spacing: "pt-14 pb-0 sm:pt-16 lg:pt-20" });
  const columns = strings(content.table?.columns);
  const rows = Array.isArray(content.table?.rows) ? content.table.rows.filter(Array.isArray) : [];
  const center = true;
  const headingId = `${id}-heading`;
  const minWidth = columns.length >= 5 ? "min-w-[700px]" : columns.length >= 3 ? "min-w-[480px]" : "";
  const cellBorder = (index) => (index !== columns.length - 1 ? "border-r border-[#d7e3ee] dark:border-white/10" : "");

  return (
    <section
      {...root}
      aria-labelledby={content.title ? headingId : undefined}
      className={`${look.background} ${look.spacing} ${look.light ? "text-white" : "text-[#18324A] dark:text-slate-100"}`}
      style={look.style}
    >
      <div className={`site-frame px-4 sm:px-6 ${center ? "text-center" : "text-left"}`}>
        <Eyebrow light={look.light} center={center}>
          {content.eyebrow}
        </Eyebrow>
        {content.title ? (
          <h2
            id={headingId}
            className={`${content.eyebrow ? "mt-3" : ""} font-display text-[2.1rem] font-medium leading-[1.1] sm:text-[2.6rem] ${
              look.light ? "text-white" : "text-[#15344F] dark:text-white"
            }`}
          >
            {content.title}
          </h2>
        ) : null}

        {content.lead || content.text || hasLink(content.link) ? (
          <p className={`mt-3 text-base font-normal leading-[1.6] sm:text-lg ${look.light ? "text-white/80" : "text-[#5E6D7B] dark:text-slate-300"}`}>
            {content.lead ? (
              <span className={`font-semibold ${look.light ? "text-white" : "text-[#18324A] dark:text-white"}`}>{content.lead}</span>
            ) : null}
            {content.text ? <> {content.text}</> : null}
            {hasLink(content.link) && content.link.label ? (
              <>
                {" "}
                <CmsLink
                  link={content.link}
                  className={`font-medium underline underline-offset-4 ${FOCUS} ${
                    look.light
                      ? "text-[#8FCB86] decoration-[#8FCB86]/40 hover:decoration-[#8FCB86]"
                      : "text-[#21649A] decoration-[#21649A]/40 hover:decoration-[#21649A] dark:text-sky-300"
                  }`}
                >
                  {content.link.label}
                </CmsLink>
              </>
            ) : null}
          </p>
        ) : null}

        {columns.length ? (
          <div className="mt-8 mx-auto max-w-4xl overflow-hidden rounded-none border border-[#d7e3ee] bg-white shadow-sm dark:border-white/10 dark:bg-[#102A40]">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${content.title || "Data"} table. Scroll horizontally to see all columns.`}>
              <table className={`w-full border-collapse text-center ${minWidth}`}>
                <caption className="sr-only">{content.caption || content.title}</caption>
                <thead>
                  <tr className="border-b border-[#d7e3ee] bg-white dark:border-white/10 dark:bg-[#102A40]">
                    {columns.map((column, index) => (
                      <th
                        key={`${column}-${index}`}
                        scope="col"
                        className={`px-3 py-3.5 text-center text-xs font-normal text-[#21649A] dark:text-sky-300 sm:text-sm ${cellBorder(index)}`}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex !== rows.length - 1 ? "border-b border-[#d7e3ee] dark:border-white/10" : ""}>
                      {columns.map((column, index) => (
                        <td
                          key={`${column}-${index}`}
                          className={`px-3 py-4 text-center text-sm font-normal text-[#21649A] dark:text-slate-200 sm:text-base ${cellBorder(index)}`}
                        >
                          {row[index] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {content.showDivider ? <div className="mt-12 h-0.5 w-full bg-[#54B848] sm:mt-14 lg:mt-16" aria-hidden="true" /> : null}
      </div>
    </section>
  );
}
