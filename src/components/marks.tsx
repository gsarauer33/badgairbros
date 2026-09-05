/**
 * Badgair Bros: a badger, front on. White face, two black eye bands, ears, sitting on a wheat
 * ground line. Badger for Wisconsin, ground under it, and the air is where it looks.
 * (Candidate G, provisional until Garrett picks.)
 */
export function BadgairMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#2f5d3a" />
      <path d="M8 12.8c0-4 2.7-5.9 8-5.9s8 1.9 8 5.9l-.5 7.2c-.5 3.5-3.5 5.4-7.5 5.4s-7-1.9-7.5-5.4Z" fill="#f7f3ea" />
      <path d="M9.3 8.3 8 5.9c-.3-.5.5-.8 1-.3l2.1 1.9Zm13.4 0 1.3-2.4c.3-.5-.5-.8-1-.3l-2.1 1.9Z" fill="#f7f3ea" />
      <path d="M10.4 9.3c1.6-.8 3.5-.5 4 1.4l-.3 10.6c-1.3 1-3.2 0-4-1.6Z" fill="#1f2a1f" />
      <path d="M21.6 9.3c-1.6-.8-3.5-.5-4 1.4l.3 10.6c1.3 1 3.2 0 4-1.6Z" fill="#1f2a1f" />
      <circle cx="12.3" cy="14.4" r=".8" fill="#f7f3ea" /><circle cx="19.7" cy="14.4" r=".8" fill="#f7f3ea" />
      <path d="M14.7 23.4c.5 1 2.1 1 2.6 0-.5-.5-2.1-.5-2.6 0Z" fill="#1f2a1f" />
      <path d="M5.5 27.5h21" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" />
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
