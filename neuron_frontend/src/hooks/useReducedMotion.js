import { useReducedMotion as useSystemReducedMotion } from "framer-motion";
import { useA11ySetting } from "./useAccessibility";

/** True when the OS asks for reduced motion or the Accessibility panel's motion settings are on. */
export function useReducedMotion() {
  const system = useSystemReducedMotion();
  const panel = useA11ySetting((s) => s.reduceMotion || s.stopAnimations);
  return Boolean(system || panel);
}
