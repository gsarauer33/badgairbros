"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Pinned scene. The page keeps you here while you scroll, and the field card changes
 * through four stages: fly, stitch, read, file. Scroll progress drives every animation,
 * so scrolling back rewinds it. No pointer tricks.
 */

export type Step = { kicker: string; title: string; body: string };

const FLIGHT = "M40 330 L 110 40 L 180 330 L 250 40 L 320 330 L 390 40 L 460 330 L 530 40 L 600 330";
const WAYPOINTS: [number, number][] = [[40, 330], [110, 40], [180, 330], [250, 40], [320, 330], [390, 40], [460, 330], [530, 40], [600, 330]];
const HOTSPOTS: { x: number; y: number; label: string }[] = [
  { x: 24, y: 62, label: "Wet corner" },
  { x: 55, y: 30, label: "Skips in the stand" },
  { x: 74, y: 78, label: "Cattle on the pasture" },
];
const NUMBERS = [["pH", "6.6", "in range"], ["OM", "2.4%", "in range"], ["P", "38", "high"], ["K", "97", "a little low"], ["CEC", "7.4", "lighter"], ["S", "6", "low"]];
const COLS = 6, ROWS = 4;

export default function Scrolly({ steps, image }: { steps: Step[]; image: string }) {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const n = steps.length;
  const stageF = p * n;
  const stage = Math.min(n - 1, Math.floor(stageF));
  const local = Math.min(1, stageF - stage); // 0..1 within the stage
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const fly = stage === 0 ? ease(local) : 1;
  const stitch = stage < 1 ? 0 : stage === 1 ? local : 1;
  const read = stage < 2 ? 0 : stage === 2 ? ease(local) : 1;
  const file = stage < 3 ? 0 : ease(local);
  const PATH_LEN = 2600;

  return (
    <section ref={ref} className="relative" style={{ height: `${(n + 0.6) * 100}vh` }} aria-label="How a flight becomes a record">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-12">
          {/* words */}
          <div className="relative min-h-[200px] lg:col-span-4">
            {steps.map((s, i) => (
              <div key={s.title} className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-[opacity,transform] duration-500" style={{ opacity: i === stage ? 1 : 0, transform: `translateY(${i === stage ? 0 : i < stage ? -16 : 16}px)`, pointerEvents: i === stage ? "auto" : "none" }}>
                <p className="mono text-[12px] text-moss">{s.kicker}</p>
                <h3 className="font-serif text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[16px] leading-[1.5] text-ink-muted sm:text-[17px]">{s.body}</p>
              </div>
            ))}
            <ol className="absolute -bottom-10 left-0 flex gap-2" aria-hidden="true">
              {steps.map((s, i) => <li key={s.title} className={`h-1 rounded-full transition-[width,background-color] duration-500 ${i === stage ? "w-8 bg-moss" : "w-3 bg-line-strong"}`} />)}
            </ol>
          </div>

          {/* scene */}
          <div className="relative lg:col-span-8">
            <div className="relative overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(31,42,31,0.45)]">
              <div className="relative aspect-[640/380] overflow-hidden bg-paper-deep">
                <Image src={image} alt="Orthomosaic of field H-3" fill sizes="(min-width: 1024px) 840px, 100vw" className="object-cover" style={{ opacity: 0.35 + 0.65 * stitch, filter: `saturate(${0.6 + 0.4 * stitch})`, transition: "opacity 0.2s, filter 0.2s" }} />

                {/* stitch tiles */}
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }} aria-hidden="true">
                  {Array.from({ length: COLS * ROWS }, (_, i) => {
                    const order = ((i % COLS) * 7 + Math.floor(i / COLS) * 3) % (COLS * ROWS);
                    const on = stitch * (COLS * ROWS) > order;
                    return <div key={i} className="border border-paper/40 transition-[opacity,background-color] duration-300" style={{ background: on ? "transparent" : "rgba(239,233,219,0.9)", opacity: stage >= 2 ? 0 : 1 }} />;
                  })}
                </div>

                {/* flight path + drone */}
                <svg viewBox="0 0 640 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true" style={{ opacity: stage >= 2 ? 0.25 : 1, transition: "opacity 0.4s" }}>
                  <path d={FLIGHT} fill="none" stroke="#f7f3ea" strokeWidth="1.6" strokeDasharray="6 6" strokeOpacity="0.95" style={{ strokeDasharray: `${PATH_LEN}`, strokeDashoffset: PATH_LEN * (1 - fly) }} />
                  {WAYPOINTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" fill="#c9a227" stroke="#1f2a1f" strokeWidth="1" style={{ opacity: fly * WAYPOINTS.length > i ? 1 : 0, transition: "opacity 0.2s" }} />)}
                  <g style={{ offsetPath: `path("${FLIGHT}")`, offsetDistance: `${fly * 100}%`, offsetRotate: "0deg", opacity: stage === 0 ? 1 : 0, transition: "opacity 0.3s" }}>
                    <circle r="10" fill="rgba(247,243,234,0.18)" />
                    <circle r="4.5" fill="#f7f3ea" stroke="#1f2a1f" strokeWidth="1" />
                    <path d="M-8 -8 L8 8 M-8 8 L8 -8" stroke="#f7f3ea" strokeWidth="1.3" />
                  </g>
                </svg>

                {/* hotspots */}
                {HOTSPOTS.map((h, i) => {
                  const t = Math.min(1, Math.max(0, read * 3 - i));
                  return (
                    <div key={h.label} className="absolute flex items-center gap-2" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `translate(-6px, -6px) scale(${0.6 + 0.4 * t})`, opacity: t, transition: "opacity 0.2s, transform 0.2s" }}>
                      <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wheat opacity-60" /><span className="relative inline-flex h-3 w-3 rounded-full border-2 border-paper bg-wheat" /></span>
                      <span className="mono rounded-full bg-ink/80 px-2.5 py-1 text-[10px] text-paper">{h.label}</span>
                    </div>
                  );
                })}

                {/* the record slides in */}
                <div className="absolute inset-y-4 right-4 flex w-[min(300px,60%)] flex-col gap-2.5 rounded-[18px] border border-line bg-paper/95 p-4 shadow-[0_20px_50px_-20px_rgba(31,42,31,0.6)] backdrop-blur" style={{ transform: `translateX(${(1 - file) * 120}%)`, opacity: file, transition: "transform 0.25s, opacity 0.25s" }}>
                  <p className="mono text-[10px] text-ink-faint">H-3 · Home Farm · filed</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {NUMBERS.map(([k, v, w], i) => (
                      <div key={k} className="rounded-lg bg-surface p-2" style={{ opacity: file * 6 > i ? 1 : 0, transition: "opacity 0.2s" }}>
                        <p className="text-[9px] text-ink-faint">{k}</p>
                        <p className="font-serif text-[17px] font-semibold leading-none">{v}</p>
                        <p className={`mt-1 inline-block rounded-full px-1 text-[8px] font-medium ${w === "low" ? "bg-[#f6e3dc] text-[#a8442c]" : w.includes("little") ? "bg-wheat-soft text-ink" : w === "in range" ? "bg-moss-soft text-moss-deep" : "bg-paper-deep text-ink-faint"}`}>{w}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-wheat bg-wheat-soft p-2 text-[10px] leading-[1.35]" style={{ opacity: file > 0.85 ? 1 : 0, transition: "opacity 0.3s" }}>Hold K this year. Retest in three. <span className="font-serif italic">— signed, your agronomist</span></div>
                </div>

                <span className="mono absolute left-3.5 top-3.5 rounded-full bg-ink/75 px-2.5 py-1.5 text-[10px] text-paper">{["Flying", "Stitching", "Reading", "Filed"][stage]}</span>
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="mono text-[10px] text-ink-faint">H-3 · Home Farm · 2 Sep 2026</span>
                <span className="mono text-[10px] text-ink-faint">{Math.round(p * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
