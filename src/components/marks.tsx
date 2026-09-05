/**
 * Badgair Bros: the one-line badger, low and long, nose to the ground, with the drone over it.
 * Drawn in ink on the page's own paper (no box), so it sits like a signature next to the name.
 */
export function BadgairMark({ size = 30, className = "", color = "#1f2a1f", accent = "#a8442c" }: { size?: number; className?: string; color?: string; accent?: string }) {
  const h = Math.round(size * 0.62);
  return (
    <svg width={size} height={h} viewBox="0 0 260 160" fill="none" aria-hidden="true" className={className}>
      <g stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 120 C 60 98, 76 92, 100 92 C 130 92, 150 98, 176 88 C 190 83, 206 88, 214 102 L 220 116 C 214 120, 200 118, 192 112 L 186 120 M100 92 L 96 120 M150 94 L 148 120 M176 88 L 182 120" />
        <path d="M176 88 C 186 80, 200 82, 210 92" />
        <path d="M24 146 C 60 134, 90 154, 130 142 C 170 130, 200 150, 236 138" strokeWidth="4" strokeOpacity="0.45" />
      </g>
      <circle cx="220" cy="116" r="6" fill={accent} />
      <circle cx="130" cy="30" r="8" fill={color} /><path d="M112 30 h-14 M148 30 h14" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Acrefile: a file with a wheat fold and the ground inside. */
export function AcrefileMark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#2f5d3a" />
      <path d="M9 5.5h10.5L25 11v14.5a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 25.5V7a1.5 1.5 0 0 1 1-1.5Z" stroke="#f7f3ea" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19.5 5.5V11H25" fill="#c9a227" stroke="#c9a227" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M11 17.5c2-1.4 4.2-1.4 6.2 0s4 1.4 5.8 0" stroke="#f7f3ea" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 20.5c2-1.4 4.2-1.4 6.2 0s4 1.4 5.8 0" stroke="#f7f3ea" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 23.5c2-1.4 4.2-1.4 6.2 0s4 1.4 5.8 0" stroke="#f7f3ea" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}
