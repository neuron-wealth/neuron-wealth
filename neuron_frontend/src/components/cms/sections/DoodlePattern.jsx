import { useId } from "react";

export default function DoodlePattern({ light = true }) {
  const patternId = `doodle-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${
        light ? "text-white opacity-[0.09] dark:opacity-[0.06]" : "text-[#15344F] opacity-[0.07] dark:text-white dark:opacity-[0.06]"
      }`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="320" height="320" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(25, 22) rotate(-10 10 10)">
              <rect x="2" y="3" width="16" height="15" rx="2" />
              <line x1="5" y1="7" x2="14" y2="7" />
              <line x1="5" y1="11" x2="10" y2="11" />
              <line x1="5" y1="14" x2="12" y2="14" />
            </g>
            <g transform="translate(105, 28) rotate(8 9 9)">
              <path d="M3 5h10v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5Z" />
              <path d="M13 7h2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 15 10h-2" />
              <path d="M5 2v2M8 2v2" />
            </g>
            <g transform="translate(185, 22) rotate(15 9 10)">
              <path d="M7 14h4M6 9a4.5 4.5 0 1 1 7 3.5c-.5.5-.8 1-.8 1.5H7.8c0-.5-.3-1-.8-1.5A4.5 4.5 0 0 1 6 9Z" />
              <line x1="8" y1="16" x2="10" y2="16" />
            </g>
            <g transform="translate(265, 28) rotate(-6 10 10)">
              <polyline points="2 15 7 10 11 14 17 6" />
              <polyline points="13 6 17 6 17 10" />
            </g>
            <g transform="translate(42, 92) rotate(12 10 9)">
              <path d="M3 12V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7l-4 3Z" />
              <line x1="6" y1="6" x2="12" y2="6" />
              <line x1="6" y1="9" x2="10" y2="9" />
            </g>
            <g transform="translate(130, 98) rotate(-8 8 8)">
              <polygon points="8 1 10 5 15 6 11 10 12 15 8 12 4 15 5 10 1 6 6 5 8 1" />
            </g>
            <g transform="translate(210, 92) rotate(-10 11 7)">
              <circle cx="5" cy="10" r="4" />
              <circle cx="16" cy="10" r="4" />
              <path d="M9 10a2 2 0 0 1 3 0" />
              <line x1="2" y1="8" x2="0" y2="5" />
              <line x1="19" y1="8" x2="21" y2="5" />
            </g>
            <g transform="translate(282, 108) rotate(22 9 9)">
              <path d="m2 9 15-7-7 15-2-5-6-3Z" />
            </g>
            <g transform="translate(20, 168) rotate(-12 10 10)">
              <path d="M2 4a2 2 0 0 1 2-2h11v14a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2V4Z" />
              <line x1="5" y1="6" x2="11" y2="6" />
              <line x1="5" y1="9" x2="9" y2="9" />
            </g>
            <g transform="translate(98, 170) rotate(5 9 9)">
              <circle cx="9" cy="9" r="7.5" />
              <circle cx="9" cy="9" r="4" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
            </g>
            <g transform="translate(170, 162) rotate(-8 8 8)">
              <path d="M8 14s-5.5-4-5.5-7.5a3.5 3.5 0 0 1 5.5-2.8 3.5 3.5 0 0 1 5.5 2.8C13.5 10 8 14 8 14Z" />
            </g>
            <g transform="translate(242, 168) rotate(12 10 8)">
              <rect x="2" y="3" width="16" height="12" rx="2.5" />
              <polygon points="8 6 13 9 8 12 8 6" fill="currentColor" />
            </g>
            <g transform="translate(298, 196) rotate(-6 9 9)">
              <circle cx="9" cy="9" r="7.5" />
              <path d="M6 6h6M6 9h4M6 6v7M10 9l-4 4" />
            </g>
            <g transform="translate(50, 238) rotate(32 8 8)">
              <path d="M10 2l4 4L5 15l-4 1 1-4L10 2z" />
            </g>
            <g transform="translate(128, 234) rotate(-10 9 10)">
              <path d="M9 2a4 4 0 0 0-4 4v4l-2 2h12l-2-2V6a4 4 0 0 0-4-4Z" />
              <path d="M7.5 15a1.5 1.5 0 0 0 3 0" />
            </g>
            <g transform="translate(202, 238) rotate(8 9 9)">
              <circle cx="9" cy="9" r="7.5" />
              <circle cx="6.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="11.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
              <path d="M6 11a3.5 3.5 0 0 0 6 0" />
            </g>
            <g transform="translate(275, 250) rotate(-5 8 8)">
              <circle cx="8" cy="8" r="6.5" />
              <polyline points="8 4 8 8 11 9.5" />
            </g>
            <g transform="translate(24, 288) rotate(8 9 9)">
              <path d="M4 3h9v4a4.5 4.5 0 0 1-9 0V3Z" />
              <path d="M4 5H2a1.5 1.5 0 0 0 1.5 1.5h.5M13 5h2a1.5 1.5 0 0 1-1.5 1.5H13" />
              <line x1="8.5" y1="11.5" x2="8.5" y2="14" />
              <line x1="6" y1="14" x2="11" y2="14" />
            </g>
            <g transform="translate(168, 288) rotate(-14 9 9)">
              <circle cx="9" cy="9" r="7.5" />
              <line x1="2" y1="9" x2="16" y2="9" />
              <path d="M9 1.5a10 10 0 0 0 0 15 10 10 0 0 0 0-15Z" />
            </g>
            <g transform="translate(240, 292) rotate(18 8 8)">
              <circle cx="6.5" cy="6.5" r="4.5" />
              <line x1="10" y1="10" x2="14" y2="14" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
