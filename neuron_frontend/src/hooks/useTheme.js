import { useSyncExternalStore } from "react";

const STORAGE_KEY = "neuron-theme";
const listeners = new Set();

function readInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let currentTheme = readInitialTheme();

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

applyTheme(currentTheme);

export function setTheme(next, { persist = true } = {}) {
  if (next !== "dark" && next !== "light") return;
  if (next === currentTheme) return;
  currentTheme = next;
  applyTheme(next);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
      setTheme(e.newValue);
    }
  });
}

const getSnapshot = () => currentTheme;
const getServerSnapshot = () => "light";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme: () => setTheme(currentTheme === "dark" ? "light" : "dark"),
  };
}
