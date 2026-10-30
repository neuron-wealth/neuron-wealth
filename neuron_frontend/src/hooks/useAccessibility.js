import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MotionGlobalConfig } from "framer-motion";
import { setTheme } from "./useTheme";

const STORAGE_KEY = "neuron-a11y-suite";

export const defaultSettings = {
  // Vision
  textSize: "default", // default | large | larger
  zoom: "100", // 100 | 110 | 120
  highContrast: false,
  grayscale: false,
  colorFilter: "none", // none | invert | sepia | bluelight
  hideImages: false,

  // Reading
  textSpacing: false,
  lineHeight: false,
  letterSpacing: false,
  dyslexia: false,
  underlineLinks: false,

  // Navigation
  keyboardNav: false,
  focusHighlight: false,
  largeCursor: false,
  readingGuide: false,

  // Motion
  reduceMotion: false,
  stopAnimations: false,
  pauseMedia: false,

  // Voice control is session-only so the microphone never starts on its own after a reload.
  voiceNav: false,
};

const TEXT_SCALE = { default: 1, large: 1.125, larger: 1.25 };

const COLOR_FILTERS = {
  invert: "invert(1) hue-rotate(180deg)",
  sepia: "sepia(0.6) contrast(0.95)",
  bluelight: "sepia(0.35) saturate(0.9) hue-rotate(-15deg)",
};

function readSavedSettings() {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const saved = JSON.parse(raw);
    const merged = { ...defaultSettings };
    Object.keys(defaultSettings).forEach((key) => {
      if (key !== "voiceNav" && typeof saved[key] === typeof defaultSettings[key]) merged[key] = saved[key];
    });
    return merged;
  } catch (e) {
    return defaultSettings;
  }
}

/* ── Media ── */

export function pauseAllMedia() {
  if (typeof document === "undefined") return;
  document.querySelectorAll("video, audio").forEach((media) => {
    try {
      media.pause();
      media.autoplay = false;
    } catch (e) {}
  });
  document.querySelectorAll('iframe[src*="youtube"]').forEach((frame) => {
    try {
      frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
    } catch (e) {}
  });
}

/* ── Settings store ── */

let settingsState = readSavedSettings();
const settingsListeners = new Set();

// Features switched off by the site administrator. Saved visitor preferences are kept,
// but a disabled feature is applied with its default value.
let featureAccess = {};
let readAloudAllowed = true;

function effectiveSettings(settings) {
  let result = settings;
  Object.keys(defaultSettings).forEach((key) => {
    if (featureAccess[key] === false && result[key] !== defaultSettings[key]) {
      if (result === settings) result = { ...settings };
      result[key] = defaultSettings[key];
    }
  });
  return result;
}

let effectiveState = effectiveSettings(settingsState);

function applySettings(settings, previous) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (settings.textSize === "default") delete root.dataset.textSize;
  else root.dataset.textSize = settings.textSize;
  root.style.setProperty("--a11y-text-scale", String(TEXT_SCALE[settings.textSize] || 1));

  if (settings.zoom === "100") delete root.dataset.a11yZoom;
  else root.dataset.a11yZoom = settings.zoom;

  // One combined filter so High Contrast, Grayscale and a colour filter can all be on together.
  const filters = [];
  if (settings.highContrast) filters.push("contrast(1.4)");
  if (settings.grayscale) filters.push("grayscale(1)");
  if (COLOR_FILTERS[settings.colorFilter]) filters.push(COLOR_FILTERS[settings.colorFilter]);
  if (filters.length) root.style.setProperty("--a11y-filter", filters.join(" "));
  else root.style.removeProperty("--a11y-filter");
  root.classList.toggle("a11y-filtered", filters.length > 0);
  if (settings.colorFilter !== "none") root.dataset.colorFilter = settings.colorFilter;
  else delete root.dataset.colorFilter;

  const classes = {
    "a11y-high-contrast": settings.highContrast,
    "a11y-hide-images": settings.hideImages,
    "a11y-text-spacing": settings.textSpacing,
    "a11y-line-height": settings.lineHeight,
    "a11y-letter-spacing": settings.letterSpacing,
    "a11y-dyslexia": settings.dyslexia,
    "a11y-underline-links": settings.underlineLinks,
    "a11y-keyboard-nav": settings.keyboardNav,
    "a11y-focus-highlight": settings.focusHighlight,
    "a11y-large-cursor": settings.largeCursor,
    "a11y-reduce-motion": settings.reduceMotion || settings.stopAnimations,
    "a11y-stop-animations": settings.stopAnimations,
    "a11y-pause-media": settings.pauseMedia,
  };
  Object.entries(classes).forEach(([name, on]) => root.classList.toggle(name, Boolean(on)));

  MotionGlobalConfig.skipAnimations = Boolean(settings.stopAnimations);

  if (settings.pauseMedia && !previous?.pauseMedia) pauseAllMedia();
}

applySettings(effectiveState);

function setSettings(updater) {
  const previous = settingsState;
  const next = typeof updater === "function" ? updater(previous) : updater;
  if (next === previous) return;
  settingsState = next;
  const previousEffective = effectiveState;
  effectiveState = effectiveSettings(next);
  applySettings(effectiveState, previousEffective);
  try {
    const { voiceNav, ...persisted } = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch (e) {}
  settingsListeners.forEach((listener) => listener());
}

/** Applies the administrator's on/off switches for the accessibility widget. */
export function setFeatureAccess(enabled, features = {}) {
  const next = {};
  Object.keys(defaultSettings).forEach((key) => {
    if (!enabled || features[key] === false) next[key] = false;
  });
  const nextReadAloud = Boolean(enabled) && features.readAloud !== false;
  if (JSON.stringify(next) === JSON.stringify(featureAccess) && nextReadAloud === readAloudAllowed) return;

  featureAccess = next;
  readAloudAllowed = nextReadAloud;
  if (!readAloudAllowed && typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  const previousEffective = effectiveState;
  effectiveState = effectiveSettings(settingsState);
  if (effectiveState !== previousEffective) {
    applySettings(effectiveState, previousEffective);
    settingsListeners.forEach((listener) => listener());
  }
}

export function updateSetting(key, value) {
  setSettings((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));
}

export function toggleSetting(key) {
  setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
}

export function resetSettings() {
  setSettings(defaultSettings);
}

function subscribeSettings(listener) {
  settingsListeners.add(listener);
  return () => settingsListeners.delete(listener);
}

const getSettingsSnapshot = () => effectiveState;
const getServerSettingsSnapshot = () => defaultSettings;

export function useA11ySettings() {
  return useSyncExternalStore(subscribeSettings, getSettingsSnapshot, getServerSettingsSnapshot);
}

/** Subscribes to a single derived value so components only re-render when it changes. */
export function useA11ySetting(selector) {
  return useSyncExternalStore(
    subscribeSettings,
    () => selector(effectiveState),
    () => selector(defaultSettings),
  );
}

/* ── Page reader: builds the reading list from whatever page is open ── */

const SKIP_SELECTOR = [
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "canvas",
  "iframe",
  "video",
  "audio",
  "img",
  "nav",
  "input",
  "select",
  "textarea",
  "option",
  '[aria-hidden="true"]',
  "[hidden]",
  "[inert]",
  "[data-a11y-skip]",
  ".a11y-ui",
].join(",");

const UNIT_SELECTOR = "section, article, [data-a11y-section]";

function isRendered(el) {
  if (typeof el.checkVisibility === "function") {
    return el.checkVisibility({ checkVisibilityCSS: true });
  }
  const style = getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}

// Sentence breaks follow document structure, not CSS display, so styled line breaks inside a heading read as one phrase.
const BREAK_TAGS = new Set([
  "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "BUTTON", "CAPTION", "DD", "DETAILS", "DIV", "DL", "DT",
  "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "LABEL", "LI", "NAV",
  "OL", "P", "SECTION", "SUMMARY", "TABLE", "TD", "TH", "TR", "UL",
]);

function isBlockLevel(el) {
  return BREAK_TAGS.has(el.tagName);
}

function cleanText(text) {
  return text
    .replace(/\s*[•·|]\s*/g, ", ")
    .replace(/[←→↵↗↘»«]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[,\s]+|[,\s]+$/g, "")
    .trim();
}

function extractText(elements) {
  const chunks = [];
  let current = "";
  const flush = () => {
    const text = cleanText(current);
    if (text && /[\p{L}\p{N}]/u.test(text)) chunks.push(/[.!?:;]$/.test(text) ? text : `${text}.`);
    current = "";
  };

  const walk = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        current += child.nodeValue;
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      if (child.matches(SKIP_SELECTOR) || !isRendered(child)) {
        current += " ";
        return;
      }
      const block = isBlockLevel(child);
      const spaced = !block && !getComputedStyle(child).display.startsWith("inline");
      if (block) flush();
      if (spaced) current += " ";
      walk(child);
      if (spaced) current += " ";
      if (block) flush();
    });
  };

  elements.forEach((el) => {
    if (!el.matches(SKIP_SELECTOR) && isRendered(el)) walk(el);
    flush();
  });

  // Drop consecutive repeats (e.g. a heading echoed in a caption right below it).
  return chunks.filter((chunk, i) => chunk !== chunks[i - 1]).join(" ");
}

function splitIntoUtterances(text) {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [];
  const pieces = [];
  let buffer = "";
  sentences.forEach((raw) => {
    const sentence = raw.trim();
    if (!sentence) return;
    if (sentence.length > 260) {
      if (buffer) pieces.push(buffer);
      buffer = "";
      let rest = sentence;
      while (rest.length > 260) {
        let cut = rest.lastIndexOf(", ", 240);
        if (cut < 80) cut = rest.lastIndexOf(" ", 240);
        if (cut < 80) cut = 240;
        pieces.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(cut + 1).trim();
      }
      if (rest) pieces.push(rest);
      return;
    }
    if (buffer && buffer.length + sentence.length > 220) {
      pieces.push(buffer);
      buffer = sentence;
    } else {
      buffer = buffer ? `${buffer} ${sentence}` : sentence;
    }
  });
  if (buffer) pieces.push(buffer);
  return pieces;
}

function unitName(elements, index) {
  const first = elements[0];
  const label = first.getAttribute("aria-label");
  if (label) return cleanText(label);
  const labelledBy = first.getAttribute("aria-labelledby");
  if (labelledBy) {
    const text = cleanText(
      labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.innerText || "")
        .join(" "),
    );
    if (text) return text;
  }
  for (const el of elements) {
    const heading = [...el.querySelectorAll("h1, h2, h3")].find((h) => isRendered(h) && h.textContent.trim());
    if (heading) return cleanText(heading.innerText || heading.textContent);
  }
  return `Section ${index + 1}`;
}

// A section made of two or more headed sub-sections (e.g. a disclosure page) is read sub-section by sub-section.
function hasSubsections(el) {
  const inner = [...el.querySelectorAll(UNIT_SELECTOR)].filter(
    (sub) => sub.parentElement.closest(UNIT_SELECTOR) === el && sub.querySelector("h2"),
  );
  return inner.length >= 2;
}

function groupUnits(container, out) {
  let loose = [];
  const flushLoose = () => {
    if (loose.length) out.push(loose);
    loose = [];
  };
  [...container.children].forEach((child) => {
    if (child.matches(SKIP_SELECTOR)) return;
    if (child.matches(UNIT_SELECTOR) && !hasSubsections(child)) {
      flushLoose();
      out.push([child]);
    } else if (child.querySelector(UNIT_SELECTOR)) {
      flushLoose();
      groupUnits(child, out);
    } else {
      loose.push(child);
    }
  });
  flushLoose();
}

export function collectReadingUnits() {
  if (typeof document === "undefined") return [];
  const groups = [];
  const main = document.querySelector("main") || document.getElementById("main-content");
  if (main) groupUnits(main, groups);
  const footer = document.getElementById("site-footer") || document.querySelector("body > footer, #root footer");
  if (footer && !main?.contains(footer)) groups.push([footer]);

  return groups
    .map((elements, index) => {
      const text = extractText(elements);
      if (!text) return null;
      const isFooter = elements[0] === footer;
      return {
        elements,
        name: isFooter ? "Footer" : unitName(elements, index),
        utterances: splitIntoUtterances(text),
      };
    })
    .filter((unit) => unit && unit.utterances.length)
    .map((unit, index) => (unit.name.startsWith("Section ") ? { ...unit, name: `Section ${index + 1}` } : unit));
}

function headerOffset() {
  const header = document.querySelector("header");
  if (!header) return 16;
  const style = getComputedStyle(header);
  return style.position === "fixed" || style.position === "sticky" ? header.getBoundingClientRect().height + 16 : 16;
}

function scrollToElement(el) {
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: settingsState.reduceMotion || settingsState.stopAnimations ? "auto" : "smooth" });
}

let cachedVoice = null;

function pickVoice() {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;
  cachedVoice =
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => /^en[-_]IN/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang) && /natural|google/i.test(v.name)) ||
    voices.find((v) => /^en[-_]GB/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    null;
  return cachedVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
  });
}

/* ── Voice commands ── */

const PAGE_ROUTES = [
  { pattern: /\bhome( page)?\b/, path: "/" },
  { pattern: /\babout( us)?\b/, path: "/about" },
  { pattern: /\bteam\b/, path: "/team" },
  { pattern: /\bcontact( us)?\b/, path: "/contact" },
  { pattern: /\bcareers?\b/, path: "/contact#careers" },
  { pattern: /\binsights?\b/, path: "/insights" },
];

const COMMANDS = [
  { id: "voice-off", pattern: /\b(stop|turn off|disable) (listening|voice( control| navigation)?)\b/ },
  { id: "stop", pattern: /\b(stop|pause)\b|\bbe quiet\b|\bsilence\b/ },
  { id: "next", pattern: /\b(next|skip)( section)?\b/ },
  { id: "prev", pattern: /\b(previous|last) section\b|^previous$/ },
  { id: "read", pattern: /\b(read|speak)\b|\bstart reading\b/ },
  { id: "go-back", pattern: /\bgo back\b/ },
  { id: "top", pattern: /\b(top|beginning)\b/ },
  { id: "bottom", pattern: /\b(bottom|end of (the )?page)\b/ },
  { id: "down", pattern: /\b(down|page down)\b/ },
  { id: "up", pattern: /\bup\b/ },
  { id: "dark", pattern: /\bdark (mode|theme)\b/ },
  { id: "light", pattern: /\blight (mode|theme)\b/ },
  { id: "open-panel", pattern: /\b(open|show) (the )?(settings|accessibility)\b/ },
  { id: "close-panel", pattern: /\bclose (the )?(settings|accessibility|panel)\b/ },
  { id: "reset", pattern: /\breset (all )?settings\b/ },
  { id: "navigate", pattern: /\b(go to|open|show)\b/ },
];

const MAX_COMMAND_WORDS = 6;

export function useAccessibility({ navigate, onOpenPanel, onClosePanel } = {}) {
  const settings = useA11ySettings();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenCaption, setSpokenCaption] = useState("");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSectionName, setCurrentSectionName] = useState("");
  const [totalSections, setTotalSections] = useState(0);
  const [readerMessage, setReaderMessage] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);

  const unitsRef = useRef([]);
  const positionRef = useRef({ unit: 0, utterance: 0 });
  const generationRef = useRef(0);
  const timerRef = useRef(null);
  const highlightedRef = useRef([]);
  const speakingRef = useRef(false);

  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const clearHighlight = useCallback(() => {
    highlightedRef.current.forEach((el) => el.removeAttribute("data-a11y-reading"));
    highlightedRef.current = [];
  }, []);

  const stopSpeech = useCallback(() => {
    generationRef.current += 1;
    speakingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (speechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    clearHighlight();
    setIsSpeaking(false);
    setSpokenCaption("");
  }, [clearHighlight, speechSupported]);

  const speakFrom = useCallback(
    (unitIndex, utteranceIndex = 0) => {
      if (!speechSupported) return;
      const units = unitsRef.current;
      if (unitIndex >= units.length) {
        stopSpeech();
        setReaderMessage("Finished reading this page.");
        return;
      }
      const target = Math.max(0, unitIndex);
      const unit = units[target];
      const isNewUnit = positionRef.current.unit !== target || utteranceIndex === 0;
      positionRef.current = { unit: target, utterance: utteranceIndex };

      if (isNewUnit) {
        clearHighlight();
        unit.elements.forEach((el) => el.setAttribute("data-a11y-reading", ""));
        highlightedRef.current = unit.elements;
        if (unit.elements[0]?.isConnected) scrollToElement(unit.elements[0]);
        setCurrentSectionIndex(target);
        setCurrentSectionName(unit.name);
      }

      const generation = ++generationRef.current;
      const text = unit.utterances[utteranceIndex];
      setSpokenCaption(text);
      speakingRef.current = true;
      setIsSpeaking(true);

      try {
        window.speechSynthesis.cancel();
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      const voice = pickVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "en-IN";
      }

      const advance = () => {
        if (generation !== generationRef.current) return;
        const lastInUnit = utteranceIndex + 1 >= unit.utterances.length;
        timerRef.current = setTimeout(
          () => {
            if (generation !== generationRef.current) return;
            if (lastInUnit) speakFrom(target + 1, 0);
            else speakFrom(target, utteranceIndex + 1);
          },
          lastInUnit ? 600 : 120,
        );
      };

      utterance.onend = advance;
      utterance.onerror = (event) => {
        if (event.error === "interrupted" || event.error === "canceled") return;
        if (event.error === "not-allowed") {
          stopSpeech();
          setReaderMessage("The browser blocked speech. Click Read Page Aloud again to start.");
          return;
        }
        advance();
      };

      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        stopSpeech();
        setReaderMessage("Speech could not start in this browser.");
      }
    },
    [clearHighlight, speechSupported, stopSpeech],
  );

  const startReading = useCallback(
    (fromUnit = 0) => {
      if (!readAloudAllowed) return;
      if (!speechSupported) {
        setReaderMessage("Read aloud is not supported in this browser.");
        return;
      }
      const units = collectReadingUnits();
      unitsRef.current = units;
      setTotalSections(units.length);
      if (!units.length) {
        setReaderMessage("There is no readable content on this page.");
        return;
      }
      setReaderMessage("");
      positionRef.current = { unit: -1, utterance: 0 };
      speakFrom(Math.min(fromUnit, units.length - 1), 0);
    },
    [speakFrom, speechSupported],
  );

  const readAloud = useCallback(() => {
    if (speakingRef.current) stopSpeech();
    else startReading(0);
  }, [startReading, stopSpeech]);

  const nextSection = useCallback(() => {
    if (!speakingRef.current) return startReading(0);
    speakFrom(positionRef.current.unit + 1, 0);
  }, [speakFrom, startReading]);

  const prevSection = useCallback(() => {
    if (!speakingRef.current) return startReading(0);
    speakFrom(Math.max(0, positionRef.current.unit - 1), 0);
  }, [speakFrom, startReading]);

  const resetAll = useCallback(() => {
    stopSpeech();
    resetSettings();
    setReaderMessage("");
    setVoiceTranscript("");
  }, [stopSpeech]);

  // Stop speech and clear highlights when the page unmounts (route change).
  useEffect(
    () => () => {
      generationRef.current += 1;
      if (timerRef.current) clearTimeout(timerRef.current);
      highlightedRef.current.forEach((el) => el.removeAttribute("data-a11y-reading"));
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
    },
    [],
  );

  // Escape stops reading from anywhere on the page.
  useEffect(() => {
    if (!isSpeaking) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !e.defaultPrevented) stopSpeech();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isSpeaking, stopSpeech]);

  // Keyboard shortcuts: H / Shift+H move between headings, M jumps to main content.
  useEffect(() => {
    if (!settings.keyboardNav) return undefined;
    const onKeyDown = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;
      const key = e.key.toLowerCase();
      if (key !== "h" && key !== "m") return;

      const focusEl = (el) => {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
        scrollToElement(el);
      };

      if (key === "m") {
        const main = document.getElementById("main-content") || document.querySelector("main");
        if (main) {
          e.preventDefault();
          focusEl(main);
        }
        return;
      }

      const headings = [...document.querySelectorAll("main h1, main h2, main h3, #site-footer h2, #site-footer h3")].filter(
        (h) => isRendered(h) && h.textContent.trim(),
      );
      if (!headings.length) return;
      e.preventDefault();
      const active = document.activeElement;
      const hasAnchor = active && active !== document.body && active !== document.documentElement;
      let next;
      if (e.shiftKey) {
        next = hasAnchor
          ? [...headings].reverse().find((h) => h !== active && h.compareDocumentPosition(active) & Node.DOCUMENT_POSITION_FOLLOWING)
          : [...headings].reverse().find((h) => h.getBoundingClientRect().top < 0);
      } else {
        next = hasAnchor
          ? headings.find((h) => h !== active && h.compareDocumentPosition(active) & Node.DOCUMENT_POSITION_PRECEDING)
          : headings.find((h) => h.getBoundingClientRect().top > headerOffset());
      }
      if (next) focusEl(next);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [settings.keyboardNav]);

  // Keep paused media paused when new content appears.
  useEffect(() => {
    if (!settings.pauseMedia) return undefined;
    const observer = new MutationObserver(() => {
      document.querySelectorAll("video[autoplay], audio[autoplay]").forEach((media) => {
        media.autoplay = false;
        try {
          media.pause();
        } catch (e) {}
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [settings.pauseMedia]);

  // Latest handlers for the long-lived speech recognition session.
  const handlersRef = useRef({});
  handlersRef.current = { readAloud, startReading, stopSpeech, nextSection, prevSection, resetAll, navigate, onOpenPanel, onClosePanel };

  useEffect(() => {
    if (!settings.voiceNav) {
      setVoiceActive(false);
      return undefined;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceTranscript("Voice control is not supported in this browser. Try Chrome or Edge.");
      updateSetting("voiceNav", false);
      return undefined;
    }

    let listening = true;
    let restartTimer = null;
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    const runCommand = (raw) => {
      const cmd = raw.toLowerCase().replace(/[^\w\s']/g, " ").replace(/\s+/g, " ").trim();
      if (!cmd || cmd.split(" ").length > MAX_COMMAND_WORDS) return;
      const h = handlersRef.current;
      const match = COMMANDS.find((c) => c.pattern.test(cmd));
      if (!match) {
        setVoiceTranscript(`Heard "${cmd}". Command not recognised.`);
        return;
      }
      const reduce = effectiveState.reduceMotion || effectiveState.stopAnimations;
      const behavior = reduce ? "auto" : "smooth";
      let done = `Heard "${cmd}".`;
      switch (match.id) {
        case "voice-off":
          updateSetting("voiceNav", false);
          done = "Voice control turned off.";
          break;
        case "stop":
          h.stopSpeech();
          break;
        case "next":
          h.nextSection();
          break;
        case "prev":
          h.prevSection();
          break;
        case "read":
          h.startReading(0);
          break;
        case "go-back":
          window.history.back();
          break;
        case "top":
          window.scrollTo({ top: 0, behavior });
          break;
        case "bottom":
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
          break;
        case "down":
          window.scrollBy({ top: window.innerHeight * 0.7, behavior });
          break;
        case "up":
          window.scrollBy({ top: -window.innerHeight * 0.7, behavior });
          break;
        case "dark":
          setTheme("dark");
          break;
        case "light":
          setTheme("light");
          break;
        case "open-panel":
          h.onOpenPanel?.();
          break;
        case "close-panel":
          h.onClosePanel?.();
          break;
        case "reset":
          h.resetAll();
          break;
        case "navigate": {
          const route = PAGE_ROUTES.find((r) => r.pattern.test(cmd));
          if (route && h.navigate) h.navigate(route.path);
          else done = `Heard "${cmd}". Page not recognised.`;
          break;
        }
        default:
          break;
      }
      setVoiceTranscript(done);
    };

    recognition.onstart = () => {
      setVoiceActive(true);
      setVoiceTranscript((prev) => (prev && !prev.startsWith("Listening") ? prev : "Listening for commands…"));
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) runCommand(event.results[i][0].transcript);
      }
    };

    recognition.onerror = (event) => {
      const fatal = {
        "not-allowed": "Microphone access is blocked. Allow it in the browser's site settings, then turn Voice Control on again.",
        "service-not-allowed": "Microphone access is blocked. Allow it in the browser's site settings, then turn Voice Control on again.",
        "audio-capture": "No microphone was found.",
        network: "The browser's speech service is unavailable. Check your connection and try again.",
        "language-not-supported": "Voice control is not available for this language in this browser.",
      }[event.error];
      if (fatal) {
        listening = false;
        setVoiceTranscript(fatal);
        updateSetting("voiceNav", false);
      }
    };

    recognition.onend = () => {
      setVoiceActive(false);
      if (!listening) return;
      restartTimer = setTimeout(() => {
        if (!listening) return;
        try {
          recognition.start();
        } catch (e) {}
      }, 300);
    };

    try {
      recognition.start();
    } catch (e) {
      setVoiceTranscript("Voice control could not start.");
    }

    return () => {
      listening = false;
      if (restartTimer) clearTimeout(restartTimer);
      try {
        recognition.abort();
      } catch (e) {}
      setVoiceActive(false);
    };
  }, [settings.voiceNav]);

  return {
    settings,
    updateSetting,
    toggleSetting,
    resetAll,
    readAloud,
    stopSpeech,
    nextSection,
    prevSection,
    currentSectionIndex,
    currentSectionName,
    totalSections,
    isSpeaking,
    spokenCaption,
    readerMessage,
    speechSupported,
    voiceActive,
    voiceTranscript,
  };
}
