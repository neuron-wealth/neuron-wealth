import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../../services/api";
import { fetchMe } from "../../services/authService";
import { setFlash } from "../../context/ToastContext";
import { NotificationsProvider } from "../../context/NotificationsContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("neuron_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("neuron_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-offset",
      collapsed ? "4.75rem" : "17rem"
    );
    return () => {
      document.documentElement.style.removeProperty("--sidebar-offset");
    };
  }, [collapsed]);

  useEffect(() => {
    let active = true;
    fetchMe()
      .then((data) => {
        if (active) setAdmin(data.admin);
      })
      .catch(() => {
        clearToken();
        navigate("/login", { replace: true });
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    // Keep the page behind the mobile menu still while it is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const logout = () => {
    setFlash("Signed out.", "success");
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <NotificationsProvider>
    <div className="page-bg min-h-screen">
      <Sidebar
        open={menuOpen}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        onNavigate={() => setMenuOpen(false)}
        onLogout={logout}
        admin={admin}
      />
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[#071321]/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div
        className={`transition-[padding] duration-300 ease-in-out ${
          collapsed ? "lg:pl-[4.75rem]" : "lg:pl-[17rem]"
        }`}
      >
        <Topbar
          admin={admin}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
          onMenu={() => setMenuOpen(true)}
          onLogout={logout}
        />
        <main className="w-full px-3 sm:px-5 lg:px-8 py-6 lg:py-8">
          <Outlet context={{ admin }} />
        </main>
      </div>
    </div>
    </NotificationsProvider>
  );
}
