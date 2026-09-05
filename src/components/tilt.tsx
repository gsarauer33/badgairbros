"use client";

import { useRef, type ReactNode } from "react";

/** Gentle 3D tilt toward the pointer, with a light sheen that follows it. Touch devices just get the card. */
export default function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
    el.style.setProperty("--sx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--sy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt ${className}`} style={{ perspective: "1200px" }}>
      {children}
    </div>
  );
}
