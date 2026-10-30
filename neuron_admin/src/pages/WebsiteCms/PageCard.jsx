import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, ExternalLink, FileText, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import useDismiss from "../../hooks/useDismiss";
import { CMS_ICONS } from "../../components/cms/cmsIcons";
import { siteUrl } from "../../config/site";

const CATEGORY_STYLES = {
  core: "bg-[#2563EB] text-white",
  general: "bg-[#2563EB] text-white",
  services: "bg-[#0D9488] text-white",
  support: "bg-[#7C3AED] text-white",
  events: "bg-[#EA580C] text-white",
  header: "bg-[#1E293B] text-white",
  footer: "bg-[#0F172A] text-white",
  widget: "bg-[#4F46E5] text-white",
};

function PageMenu({ page, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, ref, close);
  const item = "focus-ring flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-subtle transition-colors";

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((value) => !value);
        }}
        className="icon-btn focus-ring h-7 w-7 text-soft hover:text-ink hover:bg-white/80 dark:hover:bg-slate-800"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`More actions for ${page.title}`}
        title="More actions"
      >
        <MoreVertical className="h-4 w-4" aria-hidden="true" />
      </button>
      {open ? (
        <div
          className="menu-panel absolute bottom-full right-0 z-30 mb-2 w-48 rounded-xl p-1.5 shadow-xl border border-line"
          role="menu"
          onClick={(e) => e.stopPropagation()}
        >
          {page.status === "published" ? (
            <a
              href={siteUrl(page.path)}
              target="_blank"
              rel="noopener noreferrer"
              className={item}
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <ExternalLink className="h-4 w-4 text-soft" aria-hidden="true" />
              View Live
            </a>
          ) : null}
          <button
            type="button"
            className={item}
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              close();
              onDuplicate(page);
            }}
          >
            <Copy className="h-4 w-4 text-soft" aria-hidden="true" />
            Duplicate
          </button>
          {!page.core ? (
            <button
              type="button"
              className={`${item} text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40`}
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                close();
                onDelete(page);
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Shared modern card matching the requested design exactly. */
export function ContentCard({
  index = 0,
  to,
  icon: Icon,
  category = "core",
  badge = "CORE",
  title,
  description,
  status = { label: "PUBLISHED", positive: true },
  actions,
  editLabel = "Edit Page",
}) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // If clicking inside interactive elements, don't trigger card navigation
    if (e.target.closest("button, a, [role='menuitem'], input, select")) return;
    navigate(to);
  };

  const iconBg = CATEGORY_STYLES[category?.toLowerCase()] || CATEGORY_STYLES.core;

  return (
    <article
      onClick={handleCardClick}
      className="cms-card-in panel group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-line/60 hover:border-accent/40"
      style={{ "--i": index }}
    >
      {/* Top-Right Decorative Soft Arc Shape (matches screenshot) */}
      <div
        className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 rounded-bl-[3.5rem] bg-[#EEF2F9] dark:bg-slate-800/60"
        aria-hidden="true"
      />

      <div className="relative">
        {/* Top Header: Icon on Left, Category Badge + Actions on Right */}
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-105 ${iconBg}`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <span className="rounded-lg bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shadow-2xs">
              {badge}
            </span>
            {actions}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
          {title}
        </h3>

        {/* Description */}
        <p className="muted mt-2 min-h-[3rem] text-xs leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Footer: STATUS on Left, Edit Page on Right */}
      <div className="relative mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs">
        <span className="text-[0.6875rem] font-bold tracking-wider text-soft/80 uppercase">
          STATUS: {status.label}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-accent transition-colors">
          <span>{editLabel}</span>
          <SquarePen className="h-3.5 w-3.5 text-soft group-hover:text-accent transition-colors" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export default function PageCard({ page, index, categoryLabel, onDuplicate, onDelete }) {
  return (
    <ContentCard
      index={index}
      to={`/website/cms/${page.slug}`}
      icon={CMS_ICONS[page.icon] || FileText}
      category={page.category || "core"}
      badge={categoryLabel || page.category?.toUpperCase() || "CORE"}
      title={page.title}
      description={page.description || "No description yet."}
      status={{ label: page.status === "published" ? "PUBLISHED" : "DRAFT", positive: page.status === "published" }}
      actions={<PageMenu page={page} onDuplicate={onDuplicate} onDelete={onDelete} />}
    />
  );
}

export function SiteContentCard({ area, index }) {
  return (
    <ContentCard
      index={index}
      to={area.to}
      icon={area.icon}
      category={area.badge?.toLowerCase() || "header"}
      badge={area.badge?.toUpperCase() || "HEADER"}
      title={area.title}
      description={area.description}
      status={{ label: "PUBLISHED", positive: true }}
      editLabel="Edit Page"
      actions={
        <a
          href={siteUrl("/")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="icon-btn focus-ring h-7 w-7 text-soft hover:text-ink hover:bg-white/80 dark:hover:bg-slate-800"
          aria-label={`View ${area.title} on the website`}
          title="View on the website"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      }
    />
  );
}
