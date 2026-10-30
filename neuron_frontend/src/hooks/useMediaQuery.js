import { useEffect, useState } from "react";

/** True while the CSS media query matches, e.g. useMediaQuery("(max-width: 767px)"). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && Boolean(window.matchMedia?.(query).matches));

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Phones (below Tailwind's md breakpoint). */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
