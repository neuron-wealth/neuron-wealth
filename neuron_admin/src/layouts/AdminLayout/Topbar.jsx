import { ChevronLeft, ChevronRight, ExternalLink, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeControls from "../../components/ui/ThemeControls";
import NotificationBell from "./NotificationBell";
import { SITE_URL } from "../../config/site";
import { pageTitleFor } from "./navigation";

export default function Topbar({ admin, collapsed, onToggleCollapse, onMenu, onLogout }) {
  const { pathname } = useLocation();
  const page = pageTitleFor(pathname);

  return (
    <header className="topbar sticky top-0 z-20">
      <div className="flex h-16 items-center gap-3 px-3 sm:px-5 lg:px-8">
        {/* Mobile menu trigger */}
        <button type="button" className="icon-btn focus-ring lg:hidden" onClick={onMenu} aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop sidebar collapse/expand toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="icon-btn focus-ring hidden lg:inline-flex text-soft hover:text-ink transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>

        <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm">
            <li className="hidden shrink-0 sm:block">
              <Link to="/" className="focus-ring muted rounded-md hover:text-ink">
                Admin
              </Link>
            </li>
            <li aria-hidden="true" className="hidden text-soft sm:block">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="muted hidden shrink-0 sm:block">
              {page.groupTo && page.groupTo !== pathname ? (
                <Link to={page.groupTo} className="focus-ring rounded-md hover:text-ink">
                  {page.group}
                </Link>
              ) : (
                page.group
              )}
            </li>
            <li aria-hidden="true" className="hidden text-soft sm:block">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="min-w-0 truncate font-bold" aria-current="page">
              {page.title}
            </li>
          </ol>
        </nav>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-line bg-subtle px-3 py-1.5 text-xs font-semibold text-ink hover:bg-card hover:border-accent transition-colors focus-ring"
          title="Open live website in a new tab"
        >
          <ExternalLink className="h-3.5 w-3.5 text-accent" />
          <span>Live Site</span>
        </a>

        <NotificationBell />
        <ThemeControls />
      </div>
    </header>
  );
}
