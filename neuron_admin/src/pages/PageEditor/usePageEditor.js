import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePage, fetchPage, fetchPageMeta, resetPage, savePage } from "../../services/pageService";
import { setFlash, useToast } from "../../context/ToastContext";
import { clone } from "../../utils/list";
import { pagePayload } from "../../utils/cms";

export default function usePageEditor(slug) {
  const { push } = useToast();
  const navigate = useNavigate();
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const apply = useCallback((next) => {
    setPage(next);
    setDraft(clone(pagePayload(next)));
  }, []);

  const load = useCallback(async () => {
    setError("");
    try {
      const [nextMeta, nextPage] = await Promise.all([fetchPageMeta(), fetchPage(slug)]);
      setMeta(nextMeta);
      apply(nextPage);
    } catch (err) {
      setError(err.message);
    }
  }, [slug, apply]);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = useMemo(() => Boolean(draft && page) && JSON.stringify(draft) !== JSON.stringify(pagePayload(page)), [draft, page]);

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
      const result = await savePage(slug, draft);
      apply(result.page);
      push(result.message, "success");
      if (result.page.slug !== slug) navigate(`/website/cms/${result.page.slug}`, { replace: true });
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const discard = () => setDraft(clone(pagePayload(page)));

  const reset = async () => {
    if (!window.confirm(`Restore "${page.title}" to its preloaded content? All sections, text, images and designs on this page will be replaced.`)) return;
    setSaving(true);
    try {
      const result = await resetPage(slug);
      apply(result.page);
      push(result.message, "success");
    } catch (err) {
      push(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete the page "${page.title}"? It will be removed from the website immediately.`)) return;
    setSaving(true);
    try {
      const result = await deletePage(slug);
      setFlash(result.message, "success");
      navigate("/website/cms", { replace: true });
    } catch (err) {
      push(err.message, "error");
      setSaving(false);
    }
  };

  return { meta, page, draft, error, saving, dirty, update, save, discard, reset, remove, reload: load };
}
