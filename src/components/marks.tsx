/** Badgair Bros: two furrows over one wheat horizon. Same drawing as docs/brand in the Acrefile repo. */
export function BadgairMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#2f5d3a" />
      <path d="M6 21c3.5-7 7.5-7 11 0" stroke="#f7f3ea" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 21c3.5-8.5 8.5-8.5 13 0" stroke="#f7f3ea" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 24h22" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" />
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
