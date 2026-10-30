import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Globe2,
  Plus,
  RotateCcw,
  Search,
  SearchX,
} from "lucide-react";
import Alert from "../../components/ui/Alert";
import { Skeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { createPage, deletePage, fetchPageMeta, listPages, reloadDefaultPages, seedPages } from "../../services/pageService";
import { SITE_CONTENT } from "../../config/siteContent";
import { slugify } from "../../utils/cms";
import PageCard, { SiteContentCard } from "./PageCard";
import CreatePageDialog from "./CreatePageDialog";

const CATEGORIES = ["All", "General", "Services", "Core", "Support", "Events"];

export default function WebsiteCms() {
  const { push } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const [list, nextMeta] = await Promise.all([listPages(), fetchPageMeta()]);
      setData(list);
      setMeta(nextMeta);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pages = data?.pages || [];
  const categories = meta?.categories || [];
  const labelFor = (value) => categories.find((entry) => entry.value === value)?.label || value;
  const full = pages.length >= (meta?.limits?.pages || Infinity);

  const items = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = (...values) => !term || values.some((value) => String(value || "").toLowerCase().includes(term));
    const corePages = pages.filter((page) => page.core).map((page) => ({ kind: "page", key: page.slug, page }));
    const areas = Object.entries(SITE_CONTENT).map(([key, area]) => ({ kind: "area", key, area }));
    const customPages = pages.filter((page) => !page.core).map((page) => ({ kind: "page", key: page.slug, page }));
    const all = [...corePages, ...areas, ...customPages];

    return all.filter((item) => {
      // Category filter matching screenshot
      if (selectedCategory !== "All") {
        const itemCat =
          item.kind === "page"
            ? item.page.category
            : item.area.badge?.toLowerCase() === "widget"
              ? "support"
              : item.area.badge?.toLowerCase() || "core";
        if (itemCat?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }
      // Search query filter
      return item.kind === "page"
        ? matches(item.page.title, item.page.description, item.page.path)
        : matches(item.area.title, item.area.description);
    });
  }, [pages, query, selectedCategory]);

  const run = async (key, action) => {
    setBusy(key);
    try {
      const result = await action();
      if (result?.message) push(result.message, "success");
      await load();
      return result;
    } catch (err) {
      push(err.message, "error");
      return null;
    } finally {
      setBusy("");
    }
  };

  const seed = () => run("seed", seedPages);

  const reloadAll = () => {
    if (!window.confirm("Reload all preloaded pages? All changes made to core pages will be replaced with their original preloaded content.")) return;
    run("reload", reloadDefaultPages);
  };

  const uniqueSlug = (base) => {
    const taken = new Set([...pages.map((page) => page.slug), ...(meta?.reservedSlugs || [])]);
    let slug = base.slice(0, 55) || "page";
    for (let count = 2; taken.has(slug); count += 1) slug = `${base.slice(0, 55)}-${count}`;
    return slug;
  };

  const duplicate = async (page) => {
    const result = await run(`copy-${page.slug}`, () =>
      createPage({
        title: `${page.title} (Copy)`.slice(0, 80),
        slug: uniqueSlug(slugify(`${page.title} copy`)),
        description: page.description,
        category: page.category === "core" ? "general" : page.category,
        icon: page.icon,
        status: "draft",
        copyFrom: page.slug,
      })
    );
    if (result?.page) navigate(`/website/cms/${result.page.slug}`);
  };

  const remove = (page) => {
    if (!window.confirm(`Delete the page "${page.title}"? It will be removed from the website immediately.`)) return;
    run(`delete-${page.slug}`, () => deletePage(page.slug));
  };

  const create = async (form) => {
    setBusy("create");
    try {
      const result = await createPage(form);
      push(result.message, "success");
      setCreating(false);
      navigate(`/website/cms/${result.page.slug}`);
    } catch (err) {
      push(err.message, "error");
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Header: Globe Icon + Title + Short Description + Create Page Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#374151] text-white shadow-sm">
            <Globe2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
              Website Pages CMS
            </h1>
            <p className="muted mt-1 text-xs sm:text-sm max-w-xl leading-relaxed">
              Select any page to customize content or restore defaults.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCreating(true)}
            disabled={!meta || full}
            className="btn btn-primary focus-ring h-10 px-4 text-xs sm:text-sm font-semibold"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Create Page</span>
          </button>
        </div>
      </div>

      {/* 2. Preloaded Content Banner (Buttons on the Right Side) */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9]/80 dark:bg-slate-800/40 dark:border-slate-700/60 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-ink">Preloaded Content</h2>
          <p className="muted mt-0.5 text-xs leading-relaxed max-w-3xl">
            Every main website page has preloaded content in the CMS — headings, body text, icons, images, and sections. Admins can edit fields, add or remove items, or use Reload Defaults.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={seed}
            disabled={Boolean(busy) || !data}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-800 shadow-xs transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-200"
          >
            <Database className={`h-3.5 w-3.5 text-gray-700 dark:text-gray-300 ${busy === "seed" ? "animate-pulse" : ""}`} aria-hidden="true" />
            <span>{busy === "seed" ? "Seeding…" : "Seed Missing Pages"}</span>
          </button>
          <button
            type="button"
            onClick={reloadAll}
            disabled={Boolean(busy) || !data}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-xl border border-amber-300 bg-white px-3.5 text-xs font-semibold text-[#92400E] shadow-xs transition-all hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-500/40 dark:bg-slate-900 dark:text-amber-300"
          >
            <RotateCcw className={`h-3.5 w-3.5 text-amber-600 dark:text-amber-400 ${busy === "reload" ? "animate-spin" : ""}`} aria-hidden="true" />
            <span>{busy === "reload" ? "Reloading…" : "Reload All Defaults"}</span>
          </button>
        </div>
      </div>

      {error ? (
        <Alert tone="error">
          {error}{" "}
          <button type="button" onClick={load} className="font-bold underline">
            Try again
          </button>
        </Alert>
      ) : null}

      {/* 3. Search and Category Filter Bar (Matches screenshot) */}
      <div className="panel rounded-2xl p-2.5 sm:p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <label className="relative block sm:w-96">
          <span className="sr-only">Search pages by name or content</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages by name or content..."
            className="field h-10 pl-10 pr-3 rounded-xl text-sm"
          />
        </label>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(cat)}
                className={`focus-ring inline-flex h-8 items-center rounded-xl px-3.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#374151] text-white shadow-xs"
                    : "bg-subtle text-soft hover:bg-line/60 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. 3-Column Card Grid (Matches screenshot) */}
      {!data && !error ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <p className="sr-only">Loading pages</p>
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} className="h-72 rounded-[1.75rem]" />
          ))}
        </div>
      ) : null}

      {data ? (
        items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) =>
              item.kind === "page" ? (
                <PageCard
                  key={item.key}
                  index={index}
                  page={item.page}
                  categoryLabel={labelFor(item.page.category)}
                  onDuplicate={duplicate}
                  onDelete={remove}
                />
              ) : (
                <SiteContentCard key={item.key} index={index} area={item.area} />
              )
            )}
          </div>
        ) : (
          <div className="panel flex flex-col items-center rounded-2xl px-6 py-12 text-center">
            <SearchX className="h-8 w-8 text-soft" aria-hidden="true" />
            <p className="mt-3 font-bold">Nothing matches “{query}”</p>
            <p className="muted mt-1 text-sm">Try another search or select another category filter.</p>
          </div>
        )
      ) : null}

      <CreatePageDialog
        open={creating}
        categories={categories}
        reserved={meta?.reservedSlugs || []}
        existing={pages.map((page) => page.slug)}
        creating={busy === "create"}
        onCreate={create}
        onClose={() => setCreating(false)}
      />
    </div>
  );
}
