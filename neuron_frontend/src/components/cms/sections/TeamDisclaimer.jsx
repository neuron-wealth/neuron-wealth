import { CmsIcon } from "../primitives";

export default function TeamDisclaimer({ id, content, design, root }) {
  const iconName = content.icon || "ShieldCheck";
  const title =
    content.title ||
    "Disclaimer about the relationship with Stakeholders / Team members:";
  const text =
    content.text ||
    "Please note that the stakeholders except Mr. Jigar Patel, are not the persons associated with the investment advice. They are experts in their respective field like taxation, compliance, private equity, venture capital, insurance, law, research, back office, Information Technology, administration, etc. and includes support team. They may not be an employee of the firm. They may be self-employed, employed by other organization or retired. They have agreed to provide their services on a consulting basis as a value addition service to the clients as and when required for fees or on pro bono basis, depending on the nature and complexity of the work.";

  return (
    <section
      id={id || "team-disclaimer"}
      {...root}
      className="border-y border-[#E8EBE6] bg-white py-12 dark:border-white/10 dark:bg-[#071726] sm:py-14"
    >
      <div className="site-frame px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs dark:border-white/10 dark:bg-[#0c1828] sm:p-9 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21649A]/10 text-[#21649A] dark:bg-white/10 dark:text-[#8FCB86]">
              <CmsIcon name={iconName} className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-[#15344F] dark:text-white">
                {title}
              </h3>

              <p className="mt-3.5 text-xs sm:text-sm leading-[1.85] text-[#5E6D7B] dark:text-slate-300">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
