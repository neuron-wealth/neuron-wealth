import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import { NAV_GROUPS } from "./navigation";
import UserMenu from "./UserMenu";
import { KIND_PATHS, badgeText, useNotifications } from "../../context/NotificationsContext";

const KIND_BY_PATH = Object.fromEntries(Object.entries(KIND_PATHS).map(([kind, path]) => [path, kind]));

/** Unread notifications for a menu entry (and, when asked, for its sub-pages). */
function useUnread(item, { includeChildren = false } = {}) {
  const { byKind } = useNotifications();
  const own = byKind[KIND_BY_PATH[item.to]] || 0;
  if (!includeChildren) return own;
  return own + (item.children || []).reduce((sum, child) => sum + (byKind[KIND_BY_PATH[child.to]] || 0), 0);
}

function CountBadge({ count, collapsed }) {
  if (!count) return null;
  if (collapsed) {
    return <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#102A40]" aria-hidden="true" />;
  }
  return (
    <span className="ml-auto inline-flex h-5 min-w-[1.25rem] shrink-0 items-center justify-center rounded-full bg-brand-green px-1.5 text-[0.6875rem] font-bold leading-none text-[#0B1E30]" aria-hidden="true">
      {badgeText(count)}
    </span>
  );
}

const matchesItem = (item, pathname, isActive) =>
  isActive || Boolean(item.matchPrefix && pathname.startsWith(item.matchPrefix)) || Boolean(item.matchPattern?.test(pathname));

function NavItem({ item, pathname, collapsed = false, nested = false, highlight = false, includeChildren = false, onNavigate }) {
  const Icon = item.icon;
  const unread = useUnread(item, { includeChildren });
  const matches = (isActive) => highlight || matchesItem(item, pathname, isActive);
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={collapsed ? (unread ? `${item.label} (${unread} new)` : item.label) : undefined}
      className={({ isActive }) =>
        `focus-ring group relative flex items-center rounded-xl text-sm font-semibold transition-all ${
          collapsed ? "mx-auto h-11 w-11 justify-center px-0" : `w-full gap-3 ${nested ? "min-h-10 px-3" : "min-h-11 px-3"}`
        } ${
          matches(isActive)
            ? "bg-white/[0.12] text-white shadow-sm"
            : "text-white/65 hover:bg-white/[0.06] hover:text-white"
        }`
      }
    >
      {({ isActive: exact }) => {
        const isActive = matches(exact);
        return (
          <>
            <span
              className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-green transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
            <Icon className={`${nested ? "h-4 w-4" : "h-[18px] w-[18px]"} shrink-0 ${isActive ? "text-brand-green" : ""}`} aria-hidden="true" />
            {!collapsed && <span className="truncate">{item.label}</span>}
            {unread ? <span className="sr-only">, {unread} new</span> : null}
            <CountBadge count={unread} collapsed={collapsed} />
          </>
        );
      }}
    </NavLink>
  );
}

function NavDropdown({ item, pathname, onNavigate }) {
  const inSection = pathname === item.to || pathname.startsWith(`${item.to}/`);
  const [open, setOpen] = useState(inSection);
  const listId = `nav-sub-${item.to.replace(/\W+/g, "")}`;

  useEffect(() => {
    if (inSection) setOpen(true);
  }, [inSection]);

  return (
    <li>
      <div className="flex items-center gap-1">
        <div className="min-w-0 flex-1">
          <NavItem item={item} pathname={pathname} highlight={!open && inSection} includeChildren={!open} onNavigate={onNavigate} />
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${open ? "Hide" : "Show"} ${item.label} options`}
          className="focus-ring inline-flex h-11 w-9 shrink-0 items-center justify-center rounded-xl text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <ul id={listId} className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavItem item={child} pathname={pathname} nested onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function Sidebar({ open, collapsed, onToggleCollapse, onNavigate, admin, onLogout }) {
  const { pathname } = useLocation();
  const asideRef = useRef(null);
  const navRef = useRef(null);

  // The wheel over the sidebar only ever scrolls the menu, never the page behind it.
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return undefined;
    const onWheel = (event) => {
      const nav = navRef.current;
      if (nav && nav.contains(event.target)) {
        const atTop = nav.scrollTop <= 0 && event.deltaY < 0;
        const atBottom = nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 1 && event.deltaY > 0;
        if (!atTop && !atBottom) return;
      }
      event.preventDefault();
    };
    aside.addEventListener("wheel", onWheel, { passive: false });
    return () => aside.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <aside
      ref={asideRef}
      className={`sidebar-bg fixed inset-y-0 left-0 z-40 flex flex-col transition-[width,transform] duration-300 ease-in-out ${
        collapsed ? "lg:w-[4.75rem]" : "lg:w-[17rem]"
      } w-[min(17rem,88vw)] ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      aria-label="Sidebar"
    >
      <div
        className={`flex h-16 shrink-0 items-center border-b-2 border-brand-green overflow-hidden transition-all duration-300 ${
          collapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <div
          className={`flex items-center gap-3 min-w-0 ${collapsed ? "cursor-pointer" : ""}`}
          onClick={collapsed ? onToggleCollapse : undefined}
          title={collapsed ? "Click to expand sidebar" : undefined}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
            <img src="/logo-mark.png" alt="" className="h-full w-full object-contain" />
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-bold leading-tight">Neuron Wealth</p>
              <p className="truncate text-xs text-white/55">Admin Console</p>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle in Sidebar Header */}
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="focus-ring hidden h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white lg:inline-flex shrink-0 transition-colors"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Mobile close button */}
        <button
          type="button"
          className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 lg:hidden shrink-0"
          onClick={onNavigate}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation Groups */}
      <nav
        ref={navRef}
        className={`flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-4 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          collapsed ? "px-2" : "px-3"
        }`}
        aria-label="Admin"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed ? (
              <p className="px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                {group.label}
              </p>
            ) : (
              <div className="mx-auto my-2.5 h-px w-6 bg-white/10" aria-hidden="true" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) =>
                item.children && !collapsed ? (
                  <NavDropdown key={item.to} item={item} pathname={pathname} onNavigate={onNavigate} />
                ) : (
                  <Fragment key={item.to}>
                    <li>
                      <NavItem item={item} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
                    </li>
                    {(item.children || []).map((child) => (
                      <li key={child.to}>
                        <NavItem item={child} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
                      </li>
                    ))}
                  </Fragment>
                )
              )}
            </ul>
          </div>
        ))}
      </nav>

      <div className={`shrink-0 border-t border-white/10 py-3 ${collapsed ? "px-2" : "px-3"}`}>
        <UserMenu admin={admin} onLogout={onLogout} collapsed={collapsed} onNavigate={onNavigate} />
      </div>
    </aside>
  );
}
