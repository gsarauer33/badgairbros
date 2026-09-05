"use client";

import { useRef, type ReactNode } from "react";

/** A soft moss glow follows the pointer across the dark band. */
export default function Spotlight({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section id={id} ref={ref} onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </section>
  );
}
