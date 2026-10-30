import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchSiteMeta, fetchSiteSettings, resetSiteSection, saveSiteSection } from "../services/siteService";
import { useToast } from "../context/ToastContext";
import { clone } from "../utils/list";

export default function useSiteSection(section) {
  const { push } = useToast();
  const [settings, setSettings] = useState(null);
  const [meta, setMeta] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const apply = useCallback(
    (next) => {
      setSettings(next);
      setDraft(clone(next[section]));
    },
    [section]
  );

  const load = useCallback(async () => {
    setError("");
    try {
      const [nextSettings, nextMeta] = await Promise.all([fetchSiteSettings(), fetchSiteMeta()]);
      setMeta(nextMeta);
      apply(nextSettings);
    } catch (err) {
      setError(err.message);
    }
  }, [apply]);

  useEffect(() => {
    load();
  }, [load]);

  const saved = settings?.[section];
  const dirty = useMemo(
    () => Boolean(draft && saved) && JSON.stringify(draft) !== JSON.stringify(saved),
    [draft, saved]
  );

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = useCallback((updater) => {
    setDraft((previous) => (typeof updater === "function" ? updater(previous) : updater));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const result = await saveSiteSection(section, draft);
      apply(result.settings);
      push(result.message, "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const discard = () => setDraft(clone(saved));

  const reset = async (confirmText) => {
    if (confirmText && !window.confirm(confirmText)) return;
    setSaving(true);
    try {
      const result = await resetSiteSection(section);
      apply(result.settings);
      push(result.message, "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return { settings, meta, draft, error, saving, dirty, update, save, discard, reset, apply, reload: load };
}
