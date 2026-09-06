import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getForecast } from "@/lib/weather";
import SiteNav from "@/components/nav";
import Reveal from "@/components/reveal";
import { Arrow } from "@/components/marks";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Grains and weather · ${site.name}`,
  description: `Where to see today's corn and soybean bids at ${site.grains.elevator} in ${site.grains.place}, and the ten-day forecast over the same ground.`,
};

const fmtDay = (d: string, i: number) => (i === 0 ? "Today" : i === 1 ? "Tomorrow" : new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
const n = (v: number | null, digits = 0) => (v == null ? "—" : v.toFixed(digits));

/**
 * Grains: the elevator's own bid page, one click away, and ten days of weather over Bloomer with
 * the rain and heat units added up. We do not copy anyone's prices; the source stays the source.
 */
export default async function Grains() {
  const wx = await getForecast(site.grains.lat, site.grains.lon);
  const mailto = site.email ? `mailto:${site.email}?subject=${encodeURIComponent("Flight quote")}` : "#contact";
  const g = site.grains;

  return (
    <main id="top" className="relative min-h-dvh bg-paper text-ink">
      <Reveal />
      <SiteNav name={site.name} mailto={mailto} />

      <section className="relative z-10 mx-auto grid max-w-[1280px] gap-10 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-12 lg:pt-24">
        <div className="reveal flex flex-col gap-5 lg:col-span-6">
          <p className="mono text-[12px] text-moss">Grains · {g.place}</p>
          <h1 className="font-serif text-[clamp(40px,5.4vw,68px)] font-semibold leading-[1.0] tracking-[-0.02em]">What the elevator is paying today.</h1>
          <p className="max-w-[520px] text-[17px] leading-[1.55] text-ink-muted">
            {g.elevator} posts corn and soybean bids by delivery month, with the futures and the basis behind each one. Those are their numbers, so we send you straight to them instead of copying a table that would be stale by the time you read it.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={g.bidsUrl} target="_blank" rel="noopener" className="group flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-paper transition-colors duration-300 hover:bg-moss">
              Open {g.elevator} cash bids <Arrow />
            </a>
            {g.phone && <a href={`tel:${g.phone.replace(/\D/g, "")}`} className="mono text-[12px] text-ink-muted hover:text-ink">{g.phone}</a>}
          </div>
          <p className="mono text-[11px] text-ink-faint">Their bids ride on futures delayed ten minutes. Call before you haul.</p>
        </div>
        <div className="reveal rounded-[20px] border border-line bg-surface p-6 lg:col-span-6" data-delay="1">
          <p className="mono text-[11px] text-ink-faint">How a cash bid is built</p>
          <dl className="mt-3 grid gap-3 text-[15px]">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3"><dt className="text-ink-muted">Futures</dt><dd className="text-right">The board price for the delivery month, Chicago.</dd></div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3"><dt className="text-ink-muted">Basis</dt><dd className="text-right">What the local elevator adds or takes off. Usually negative here.</dd></div>
            <div className="flex items-baseline justify-between gap-4"><dt className="font-medium">Cash</dt><dd className="text-right font-medium">Futures plus basis. The number on the check.</dd></div>
          </dl>
          <p className="mt-4 text-[13px] leading-[1.5] text-ink-muted">Acrefile&apos;s cost sheet takes futures and basis the same way, so a field&apos;s break-even sits next to the bid that has to beat it.</p>
        </div>
      </section>

      <section className="relative z-10 bg-night text-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono text-[12px] text-wheat">Ten days over {g.place}</p>
              <h2 className="mt-2 font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.02] tracking-[-0.02em]">Rain, wind, and heat units.</h2>
            </div>
            {wx && (
              <div className="flex gap-8">
                <div><p className="mono text-[10px] text-paper/60">Rain, next ten days</p><p className="font-serif text-[34px] font-semibold leading-none">{wx.rainTotal.toFixed(2)}<span className="ml-1 text-[14px] font-normal text-paper/60">in</span></p></div>
                <div><p className="mono text-[10px] text-paper/60">Corn heat units</p><p className="font-serif text-[34px] font-semibold leading-none">{Math.round(wx.gduTotal)}<span className="ml-1 text-[14px] font-normal text-paper/60">GDU</span></p></div>
              </div>
            )}
          </div>
          {!wx ? (
            <p className="reveal mt-8 rounded-[16px] border border-paper/15 p-5 text-paper/70">The forecast did not load. Try again in a minute.</p>
          ) : (
            <div className="reveal mt-8 overflow-x-auto" data-delay="1">
              <table className="w-full min-w-[640px] text-[15px]">
                <thead className="mono text-left text-[10px] text-paper/60">
                  <tr className="border-b border-paper/15">
                    <th className="py-2 pr-4 font-medium">Day</th><th className="py-2 pr-4 font-medium">Sky</th><th className="py-2 pr-4 text-right font-medium">High</th><th className="py-2 pr-4 text-right font-medium">Low</th><th className="py-2 pr-4 text-right font-medium">Rain</th><th className="py-2 pr-4 text-right font-medium">Chance</th><th className="py-2 pr-4 text-right font-medium">Wind</th><th className="py-2 text-right font-medium">GDU</th>
                  </tr>
                </thead>
                <tbody>
                  {wx.days.map((d, i) => (
                    <tr key={d.date} className={`border-b border-paper/10 ${i === 0 ? "text-paper" : "text-paper/85"}`}>
                      <td className="py-2.5 pr-4 font-medium">{fmtDay(d.date, i)}</td>
                      <td className="py-2.5 pr-4 text-paper/70">{d.sky}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{n(d.hi)}°</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{n(d.lo)}°</td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${d.rainIn && d.rainIn >= 0.25 ? "text-wheat" : ""}`}>{n(d.rainIn, 2)}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-paper/70">{d.rainChance != null ? `${d.rainChance}%` : "—"}</td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${d.windMph && d.windMph >= 15 ? "text-wheat" : ""}`}>{n(d.windMph)}</td>
                      <td className="py-2.5 text-right tabular-nums">{n(d.gdu)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mono mt-4 text-[10px] text-paper/50">Open-Meteo forecast for {g.lat.toFixed(2)}, {g.lon.toFixed(2)} · rain in inches, wind is the day&apos;s peak in mph · gold marks a quarter inch or a 15 mph day, the two numbers that ground a drone or a sprayer.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-8">
        <Link href="/" className="text-[14px] text-ink-muted hover:text-ink">← {site.name}</Link>
        <p className="mono text-[11px] text-ink-faint">{site.legal} · {site.place}</p>
      </footer>
    </main>
  );
}
