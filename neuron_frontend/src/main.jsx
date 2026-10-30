import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./styles/index.css";
import "./hooks/useAccessibility";
import { useReducedMotion } from "./hooks/useReducedMotion";
import App from "./App";

function MotionPreferences({ children }) {
  const reduce = useReducedMotion();
  return <MotionConfig reducedMotion={reduce ? "always" : "user"}>{children}</MotionConfig>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionPreferences>
      <App />
    </MotionPreferences>
  </StrictMode>,
);
