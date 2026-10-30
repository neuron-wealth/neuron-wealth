import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

const FLASH_KEY = "neuron_admin_flash";
const ToastContext = createContext(null);

export function setFlash(message, type = "info") {
  sessionStorage.setItem(FLASH_KEY, JSON.stringify({ message, type }));
}

export function consumeFlash() {
  const raw = sessionStorage.getItem(FLASH_KEY);
  sessionStorage.removeItem(FLASH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((item) => item.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((list) => [...list.slice(-3), { id, message, type }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {/* Toast Notification Container: Fixed at Bottom-Right */}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[99] flex flex-col-reverse items-end gap-3 sm:bottom-6 sm:right-6 w-[min(400px,calc(100vw-2.5rem))]"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(4200);
  const startTimestampRef = useRef(Date.now());

  const triggerClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss();
    }, 220);
  }, [onDismiss]);

  useEffect(() => {
    startTimestampRef.current = Date.now();
    timerRef.current = setTimeout(triggerClose, remainingTimeRef.current);
    return () => clearTimeout(timerRef.current);
  }, [triggerClose]);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimestampRef.current;
    remainingTimeRef.current = Math.max(800, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    startTimestampRef.current = Date.now();
    timerRef.current = setTimeout(triggerClose, remainingTimeRef.current);
  };

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";
  const isWarning = toast.type === "warning";

  const Icon = isSuccess ? CheckCircle2 : isError ? XCircle : Info;

  const themes = {
    success: {
      badgeBg: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400 border-emerald-500/30",
      pillBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      progressBar: "bg-gradient-to-r from-emerald-500 to-teal-400",
      border: "border-emerald-500/35 dark:border-emerald-500/40",
      glow: "shadow-[0_16px_36px_-8px_rgba(16,185,129,0.22)]",
      title: "Success",
    },
    error: {
      badgeBg: "bg-red-500/15 text-red-600 dark:bg-red-400/20 dark:text-red-400 border-red-500/30",
      pillBg: "bg-red-500/10 text-red-700 dark:text-red-300",
      progressBar: "bg-gradient-to-r from-red-500 to-rose-400",
      border: "border-red-500/35 dark:border-red-500/40",
      glow: "shadow-[0_16px_36px_-8px_rgba(239,68,68,0.22)]",
      title: "Error",
    },
    warning: {
      badgeBg: "bg-amber-500/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400 border-amber-500/30",
      pillBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      progressBar: "bg-gradient-to-r from-amber-500 to-orange-400",
      border: "border-amber-500/35 dark:border-amber-500/40",
      glow: "shadow-[0_16px_36px_-8px_rgba(245,158,11,0.22)]",
      title: "Notice",
    },
    info: {
      badgeBg: "bg-accent/15 text-accent border-accent/30",
      pillBg: "bg-accent/10 text-accent",
      progressBar: "bg-gradient-to-r from-accent to-accent/60",
      border: "border-accent/35",
      glow: "shadow-[0_16px_36px_-8px_rgb(var(--accent-rgb)/0.22)]",
      title: "Notification",
    },
  };

  const style = themes[toast.type] || themes.info;

  return (
    <div
      role="status"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group pointer-events-auto relative flex w-full max-w-[390px] overflow-hidden rounded-2xl border bg-white/95 dark:bg-[#0c1828]/95 p-4 backdrop-blur-xl transition-all duration-200 ${
        isExiting ? "toast-exit" : "toast-enter"
      } ${style.border} ${style.glow}`}
    >
      {/* Top subtle specular gloss highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="flex w-full items-start gap-3.5">
        {/* Left Glowing Icon Badge */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.badgeBg} transition-transform group-hover:scale-105 duration-200 shadow-sm`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        {/* Content details */}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block rounded-md px-1.5 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-wider ${style.pillBg}`}
            >
              {style.title}
            </span>
            <span className="text-[0.625rem] font-medium text-slate-400 dark:text-slate-500">
              Just now
            </span>
          </div>
          <p className="mt-1 text-[0.8125rem] font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
            {toast.message}
          </p>
        </div>

        {/* Close Button with micro-interaction */}
        <button
          type="button"
          onClick={triggerClose}
          className="focus-ring -mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-slate-200 transition-all cursor-pointer"
          aria-label="Dismiss notification"
          title="Dismiss"
        >
          <X className="h-4 w-4 transition-transform group-hover:rotate-90 duration-200" aria-hidden="true" />
        </button>
      </div>

      {/* Auto-dismiss countdown progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 dark:bg-white/5">
        <div className={`h-full toast-progress-bar ${style.progressBar}`} />
      </div>
    </div>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}

export function FlashToasts() {
  const { push } = useToast();
  const location = useLocation();

  useEffect(() => {
    const flash = consumeFlash();
    if (flash?.message) push(flash.message, flash.type || "info");
  }, [location.pathname, push]);

  return null;
}
