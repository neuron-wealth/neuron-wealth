import { useEffect } from "react";
import { getFocusable } from "../utils/focusable";

function setInert(ids, inert) {
  ids.forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    if (inert) node.setAttribute("inert", "");
    else node.removeAttribute("inert");
  });
}

export function useModal({ open, onClose, panelRef, returnFocusRef, inertIds = [] }) {
  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const returnTarget = returnFocusRef?.current ?? null;
    setInert(inertIds, true);

    const frame = requestAnimationFrame(() => {
      const items = getFocusable(panel);
      (items[0] || panel)?.focus();
    });

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = getFocusable(panel);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      setInert(inertIds, false);
      returnTarget?.focus();
    };
  }, [open, onClose, panelRef, returnFocusRef, inertIds]);
}
