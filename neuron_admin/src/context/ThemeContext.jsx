import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const ACCENTS = [
  { id: "blue", label: "Blue", color: "#21649A" },
  { id: "green", label: "Green", color: "#2E8A3C" },
  { id: "red", label: "Red", color: "#C62828" },
  { id: "navy", label: "Navy", color: "#15344F" },
  { id: "teal", label: "Teal", color: "#0F766E" },
  { id: "purple", label: "Purple", color: "#6D28D9" },
  { id: "orange", label: "Orange", color: "#C2410C" },
  { id: "pink", label: "Pink", color: "#BE185D" },
  { id: "gold", label: "Gold", color: "#A16207" },
];

const MODE_KEY = "neuron_admin_mode";
const ACCENT_KEY = "neuron_admin_accent";
const ThemeContext = createContext(null);

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore private-mode storage failures */
  }
}

function readMode() {
  return readStorage(MODE_KEY) === "dark" ? "dark" : "light";
}

function readAccent() {
  const saved = readStorage(ACCENT_KEY);
  return ACCENTS.some((item) => item.id === saved) ? saved : "blue";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(readMode);
  const [accent, setAccent] = useState(readAccent);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.dataset.accent = accent;
    writeStorage(MODE_KEY, mode);
    writeStorage(ACCENT_KEY, accent);
  }, [mode, accent]);

  const value = useMemo(
    () => ({
      mode,
      accent,
      setMode,
      setAccent,
      toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode, accent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
