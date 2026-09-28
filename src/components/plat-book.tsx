import { PLAT_BOOK, PLAT_FIELDS } from "@/lib/plat-book";

/**
 * The farm as a county plat book: outlines tinted by farm on a quarter-mile grid, with a scale
 * bar and north arrow. Server-rendered SVG. When its section is revealed the outlines draw in
 * (globals.css, .plat-line); under reduced motion they are simply there.
 */
export default function PlatBook() {
  const { width: W, height: H, metersPerUnit } = PLAT_BOOK;
  const quarterMile = 402.336 / metersPerUnit;
  const gridX = Array.from({ length: Math.ceil(W / quarterMile) + 1 }, (_, i) => i * quarterMile);
  const gridY = Array.from({ length: Math.ceil(H / quarterMile) + 1 }, (_, i) => i * quarterMile);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="plat-title plat-desc">
      <title id="plat-title">Sarauer Farms, plat book</title>
      <desc id="plat-desc">
        {PLAT_FIELDS.map((f) => `${f.field}, ${f.farm}, ${f.acres} acres`).join("; ")}. Grid lines every quarter mile.
      </desc>
      <g stroke="#1f2a1f" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {gridX.map((x) => <line key={`x${x}`} x1={x} y1={0} x2={x} y2={H} />)}
        {gridY.map((y) => <line key={`y${y}`} x1={0} y1={y} x2={W} y2={y} />)}
      </g>
      {PLAT_FIELDS.map((f, i) => (
        <g key={f.field}>
          <path d={f.d} fill={f.color} fillRule="evenodd" className="plat-fill" style={{ transitionDelay: `${0.9 + i * 0.25}s` }} />
          <path d={f.d} fill="none" stroke={f.color} strokeWidth="3" strokeLinejoin="round" pathLength={1} className="plat-line" style={{ transitionDelay: `${i * 0.25}s` }} />
        </g>
      ))}
      {PLAT_FIELDS.map((f) => (
        <g key={`${f.field}-label`} transform={`translate(${f.lx} ${f.ly})`}>
          <text textAnchor={f.anchor ?? "middle"} className="font-serif" fontSize="40" fontWeight="700" fill="#1f2a1f">{f.field}</text>
          {/* acres repeat the list beside the map; on a phone the drawing is too small to carry them */}
          <text y="28" textAnchor={f.anchor ?? "middle"} className="data max-sm:hidden" fontSize="18" fill="#1f2a1f" fillOpacity="0.72">{f.acres.toFixed(1)} ac</text>
        </g>
      ))}
      {/* north arrow */}
      <g transform={`translate(${W - 50} 60)`} fill="#1f2a1f">
        <path d="M0 -30 L11 8 L0 1 L-11 8 Z" />
        <text y="32" textAnchor="middle" className="font-serif" fontSize="22" fontWeight="700">N</text>
      </g>
      {/* scale bar: one quarter mile */}
      <g transform={`translate(40 ${H - 36})`}>
        <rect width={quarterMile / 2} height="7" fill="#1f2a1f" />
        <rect x={quarterMile / 2} width={quarterMile / 2} height="7" fill="none" stroke="#1f2a1f" strokeWidth="1.5" />
        <text y="-10" className="data" fontSize="16" fill="#1f2a1f" fillOpacity="0.72">0</text>
        <text x={quarterMile} y="-10" textAnchor="end" className="data" fontSize="16" fill="#1f2a1f" fillOpacity="0.72">¼ mile</text>
      </g>
    </svg>
  );
}
