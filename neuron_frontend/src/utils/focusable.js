const SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function getFocusable(container) {
  if (!container) return [];
  return [...container.querySelectorAll(SELECTOR)].filter((element) => {
    if (element.closest("[hidden]")) return false;
    if (element.tabIndex < 0) return false;
    return element.getClientRects().length > 0;
  });
}
