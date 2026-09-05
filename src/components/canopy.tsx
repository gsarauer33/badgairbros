"use client";

import { useEffect, useRef } from "react";

/**
 * A field of points behind the hero that sways like a crop canopy in wind and parts around the
 * pointer. Canvas, ~1,500 points, cheap. Stops when off screen; static when motion is reduced.
 */
export default function Canopy({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, w = 0, h = 0, t = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const step = 26;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          const dx = x - mouse.x, dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const push = d2 < 22000 ? (1 - d2 / 22000) * 14 : 0;
          const sway = Math.sin(t * 0.9 + x * 0.012 + y * 0.02) * 4 + Math.cos(t * 0.6 + y * 0.015) * 2;
          const px = x + sway + (push ? (dx / Math.sqrt(d2 || 1)) * push : 0);
          const py = y + Math.cos(t * 0.7 + x * 0.01) * 2 + (push ? (dy / Math.sqrt(d2 || 1)) * push : 0);
          const a = 0.10 + 0.10 * (0.5 + 0.5 * Math.sin(t * 0.8 + x * 0.02 + y * 0.01)) + (push ? 0.25 : 0);
          ctx.fillStyle = `rgba(47,93,58,${a.toFixed(3)})`;
          ctx.beginPath(); ctx.arc(px, py, 1.4 + (push ? 0.8 : 0), 0, Math.PI * 2); ctx.fill();
        }
      }
    };
    const loop = () => { if (visible) { t += 0.016; draw(); } raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; });
    io.observe(c);
    window.addEventListener("resize", resize);
    const parent = c.parentElement ?? c;
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    if (reduced) draw(); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); parent.removeEventListener("pointermove", onMove); parent.removeEventListener("pointerleave", onLeave); };
  }, []);
  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
