import { useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import useDismiss from "../../hooks/useDismiss";
import { initialOf } from "../../utils/format";

// Lives at the bottom of the sidebar: the menu opens upwards, or to the side when the sidebar is collapsed.
export default function UserMenu({ admin, onLogout, collapsed = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useDismiss(open, menuRef, () => setOpen(false));
  const name = admin?.name || "Admin";

  const links = [
    { to: "/profile", label: "My Profile", icon: UserRound },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        title={collapsed ? name : undefined}
        className={`focus-ring flex items-center rounded-xl text-white transition-colors hover:bg-white/[0.08] ${
          collapsed ? "mx-auto h-11 w-11 justify-center" : "h-14 w-full gap-2.5 px-2"
        } ${open ? "bg-white/[0.08]" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
          {initialOf(name)}
        </span>
        {!collapsed ? (
          <>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-bold leading-tight">{name}</span>
              <span className="block truncate text-xs leading-tight text-white/55">{admin?.username ? `@${admin.username}` : "Administrator"}</span>
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-white/60 transition-transform ${open ? "" : "rotate-180"}`} aria-hidden="true" />
          </>
        ) : null}
      </button>
      {open ? (
        <div
          role="menu"
          className={`menu-panel absolute z-50 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl p-2 text-ink ${
            collapsed ? "bottom-0 left-full ml-3" : "bottom-full left-0 mb-2"
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl bg-subtle px-3 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent font-bold text-white">{initialOf(name)}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{name}</p>
              <p className="muted truncate text-xs">{admin?.email}</p>
            </div>
          </div>
          <div className="mt-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="focus-ring flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-semibold hover:bg-subtle"
              >
                <Icon className="h-4 w-4 text-soft" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
          <div className="my-1 h-px bg-line" />
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className="focus-ring flex h-11 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
