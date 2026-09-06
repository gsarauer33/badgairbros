"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Satellite versus our flight, same ground, one handle. Drag, or use arrow keys on the handle. */
export default function Compare({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(58);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const set = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(97, Math.max(3, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="relative aspect-[1600/953] w-full cursor-col-resize touch-none select-none overflow-hidden rounded-[20px] border border-line bg-paper-deep"
      onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); set(e.clientX); }}
      onPointerMove={(e) => { if (dragging.current) set(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      <Image src={before} alt="Satellite view of the same ground at about sixty centimetres per pixel" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={after} alt={alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      </div>
      <span className="mono pointer-events-none absolute left-3.5 top-3.5 rounded-full bg-ink/75 px-2.5 py-1.5 text-[10px] text-paper">Our flight · 5 cm</span>
      <span className="mono pointer-events-none absolute right-3.5 top-3.5 rounded-full bg-paper/85 px-2.5 py-1.5 text-[10px] text-ink">Satellite · ~60 cm</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-paper shadow-[0_0_0_1px_rgba(31,42,31,0.25)]" style={{ left: `${pos}%` }} />
      <button
        type="button"
        aria-label="Compare slider"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} percent drone image, ${100 - Math.round(pos)} percent satellite`}
        aria-orientation="horizontal"
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 3;
          const map: Record<string, () => void> = { ArrowLeft: () => setPos((p) => Math.max(3, p - step)), ArrowDown: () => setPos((p) => Math.max(3, p - step)), ArrowRight: () => setPos((p) => Math.min(97, p + step)), ArrowUp: () => setPos((p) => Math.min(97, p + step)), Home: () => setPos(3), End: () => setPos(97) };
          if (map[e.key]) { e.preventDefault(); map[e.key](); }
        }}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper text-ink shadow-[0_8px_24px_-8px_rgba(31,42,31,0.6)] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-wheat"
        style={{ left: `${pos}%` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6-5 6 5 6" /><path d="m15 6 5 6-5 6" /></svg>
      </button>
    </div>
  );
}
