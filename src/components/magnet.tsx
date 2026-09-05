"use client";

import { useRef, type ReactNode } from "react";

/** A button that leans toward the pointer and springs back. */
export default function Magnet({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x * 0.18).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <a ref={ref} href={href} onPointerMove={onMove} onPointerLeave={reset} className={`will-change-transform transition-transform duration-300 ease-out ${className}`}>
      {children}
    </a>
  );
}
