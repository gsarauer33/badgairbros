"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Pinned scene. The page keeps you here while you scroll, and the field card changes
 * through four stages: fly, stitch, read, file. Scroll progress drives every animation,
 * so scrolling back rewinds it. No pointer tricks.
 */

export type Step = { kicker: string; title: string; body: string };

const FLIGHT = "M577.9 29.0 L573.0 29.2 L524.0 28.6 L475.2 24.7 L426.4 19.0 L377.8 12.8 L329.6 7.4 L281.2 4.0 L232.5 4.1 L184.4 9.6 L137.5 22.0 L94.8 42.8 L100.0 69.7 L119.5 85.5 L153.6 101.6 L201.7 101.9 L247.9 93.1 L294.4 80.1 L340.6 65.6 L387.3 51.8 L434.7 40.1 L483.4 33.5 L532.2 36.4 L575.2 54.4 L566.9 82.2 L531.5 107.3 L483.0 112.8 L434.4 105.9 L386.6 93.8 L340.0 79.7 L293.5 65.5 L246.6 52.9 L199.0 43.9 L150.5 42.4 L104.3 54.1 L74.6 79.9 L98.5 108.7 L143.3 125.8 L191.8 128.1 L240.2 121.3 L287.4 109.9 L335.0 96.6 L381.8 83.7 L429.4 73.1 L478.2 67.4 L526.8 70.7 L572.1 87.0 L570.2 115.5 L533.1 143.2 L484.3 149.1 L435.3 142.3 L387.5 130.1 L340.9 116.1 L294.5 101.9 L247.7 89.3 L200.0 80.2 L151.1 78.7 L104.7 91.1 L75.2 116.6 L97.8 144.3 L142.9 161.9 L191.4 164.5 L239.5 157.8 L287.0 146.5 L333.8 133.4 L381.1 120.3 L428.7 109.6 L477.5 103.8 L525.9 106.7 L572.0 123.3 L570.0 153.7 L532.1 183.1 L484.0 191.3 L435.0 186.8 L386.8 176.6 L340.0 164.1 L293.1 151.4 L246.0 140.0 L198.2 131.7 L149.4 129.3 L101.8 137.2 L65.4 161.7 L87.8 192.9 L131.6 213.0 L180.2 214.0 L227.9 205.6 L274.9 192.8 L321.2 178.4 L368.1 164.1 L415.4 151.6 L463.8 143.1 L512.6 141.9 L559.4 152.7 L579.9 175.4 L560.0 200.8 L518.6 221.6 L470.3 223.4 L422.4 215.5 L375.5 203.2 L329.0 189.1 L282.7 175.0 L235.9 162.1 L188.2 152.6 L139.8 149.5 L92.4 158.4 L57.4 178.5 L55.4 203.0 L90.4 226.4 L137.3 238.9 L185.8 238.4 L233.8 230.3 L280.7 218.4 L327.8 205.1 L374.6 192.4 L421.9 181.7 L470.6 175.6 L520.2 177.8 L566.2 191.2 L578.4 215.0 L558.8 238.6 L517.3 258.3 L468.9 259.4 L421.1 251.3 L374.0 238.8 L326.9 224.5 L280.2 210.3 L233.9 197.8 L185.8 188.5 L137.9 185.9 L90.1 195.8 L53.3 221.5 L69.0 250.0 L112.6 270.6 L55.4 238.3 L55.4 238.9 L89.8 262.3 L137.1 275.0 L185.9 274.7 L234.3 266.6 L282.2 254.6 L329.5 241.2 L377.3 228.1 L425.4 217.5 L474.2 211.7 L523.3 214.5 L570.1 229.6 L576.4 254.6 L552.8 277.1 L508.1 291.1 L459.1 288.8 L410.7 279.0 L363.2 265.6 L316.0 250.5 L269.1 235.1 L222.1 220.8 L174.2 209.1 L125.5 204.0 L78.5 216.8 L57.8 244.3 L64.3 267.7 L105.4 275.3 L154.6 279.6 L203.7 276.9 L252.6 270.3 L301.1 261.7 L349.6 252.7 L398.4 245.3 L447.7 241.5 L496.7 243.8 L543.8 254.4 L581.0 274.8 L571.5 295.8 L540.7 313.5 L491.7 311.2 L444.0 298.9 L396.5 284.4 L348.7 272.0 L299.5 267.6 L254.2 283.2 L250.5 308.8 L292.3 324.8 L341.4 320.5 L388.7 307.7 L435.5 292.0 L482.3 276.8 L530.3 267.8 L565.4 282.6 L570.1 300.8 L556.4 323.9 L507.9 327.3 L458.9 322.7 L409.9 321.9 L361.5 312.9 L313.3 302.4 L265.1 304.8 L248.7 327.5 L283.1 344.8 L332.2 337.7 L379.3 325.8 L415.7 338.4 L392.5 363.0 L343.8 361.2 L564.1 0.1 L564.8 -21.1 L534.2 -23.7 L506.1 -18.6 L514.4 -4.1 L552.9 -0.2";
const WAYPOINTS: [number, number][] = [[577.9, 29.1], [565.0, 29.4], [102.5, 37.6], [90.0, 56.0], [565.3, 47.5], [578.5, 65.4], [77.4, 74.4], [77.8, 92.5], [566.0, 83.8], [579.2, 101.7], [78.1, 110.6], [78.4, 128.8], [566.7, 120.1], [579.8, 138.0], [78.7, 146.9], [66.2, 165.3], [567.3, 156.3], [580.5, 174.3], [53.7, 183.7], [54.0, 201.8], [568.0, 192.6], [581.1, 210.5], [54.3, 219.9], [54.7, 238.1], [568.6, 228.9], [581.8, 246.8], [55.0, 256.2], [93.9, 273.7], [569.3, 265.2], [582.4, 283.1], [248.4, 289.1], [248.7, 307.2], [569.9, 301.5], [428.9, 322.1], [249.0, 325.4], [275.0, 343.0], [416.4, 340.5], [403.8, 358.9], [326.7, 360.3]];
const HOTSPOTS: { x: number; y: number; label: string }[] = [
  { x: 29.5, y: 66.7, label: "Brown patch · walk it" },
  { x: 38.3, y: 49.6, label: "Waterway · not in the acres" },
  { x: 75.5, y: 23.5, label: "Thin corner" },
];
const NUMBERS = [["pH", "6.2", "in range"], ["OM", "2.4%", "in range"], ["P", "34", "high"], ["K", "115", "in range"], ["CEC", "7.1", "lighter"], ["S", "14", "low"]];
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
  // Stages finish at 85% of the pinned distance; the last 15% holds the filed card on screen.
  const stageF = Math.min(1, p / 0.85) * n;
  const stage = Math.min(n - 1, Math.floor(stageF));
  const local = Math.min(1, stageF - stage); // 0..1 within the stage
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const fly = stage === 0 ? ease(local) : 1;
  const stitch = stage < 1 ? 0 : stage === 1 ? local : 1;
  const read = stage < 2 ? 0 : stage === 2 ? ease(local) : 1;
  const file = stage < 3 ? 0 : ease(local);
  const PATH_LEN = 9681;

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
                <Image src={image} alt="Orthomosaic of field H-3, 65 acres, flown 6 September 2026" fill sizes="(min-width: 1024px) 840px, 100vw" className="object-contain" style={{ opacity: 0.35 + 0.65 * stitch, filter: `saturate(${0.6 + 0.4 * stitch})`, transition: "opacity 0.2s, filter 0.2s" }} />

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
                  const flip = h.x > 55; // labels on the right half hang to the left so they never leave the card
                  return (
                    <div key={h.label} className={`absolute flex items-center gap-2 whitespace-nowrap ${flip ? "flex-row-reverse" : ""}`} style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `translate(${flip ? "calc(-100% + 6px)" : "-6px"}, -6px) scale(${0.6 + 0.4 * t})`, transformOrigin: flip ? "right center" : "left center", opacity: t, transition: "opacity 0.2s, transform 0.2s" }}>
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
                  <div className="rounded-lg border border-wheat bg-wheat-soft p-2 text-[10px] leading-[1.35]" style={{ opacity: file > 0.85 ? 1 : 0, transition: "opacity 0.3s" }}>Sulfur with the nitrogen. Skip the P this year. <span className="font-serif italic">— signed, your agronomist</span></div>
                </div>

                <span className="mono absolute left-3.5 top-3.5 rounded-full bg-ink/75 px-2.5 py-1.5 text-[10px] text-paper">{["Flying", "Stitching", "Reading", "Filed"][stage]}</span>
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="mono text-[10px] text-ink-faint">H-3 · Home Farm · 6 Sep 2026</span>
                <span className="mono text-[10px] text-ink-faint">{Math.round(p * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
