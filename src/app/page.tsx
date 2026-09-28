import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";
import SiteNav from "@/components/nav";
import Compare from "@/components/compare";
import Scrolly from "@/components/scrolly";
import CountUp from "@/components/count-up";
import PlatBook from "@/components/plat-book";
import { PLAT_FIELDS } from "@/lib/plat-book";
import { getEpisodes } from "@/lib/podcast";
import { BadgairMark, AcrefileMark, Arrow } from "@/components/marks";

export const revalidate = 3600;

const mailto = site.email ? `mailto:${site.email}?subject=${encodeURIComponent("Fly a field")}` : "#contact";
const tel = site.phone ? `tel:+1${site.phone.replace(/\D/g, "")}` : null;

const F = site.flight;

export default async function Home() {
  const episodes = await getEpisodes(site.podcast.feed);
  return (
    <main id="top" className="relative overflow-x-clip">
      <Reveal />
      <div className="grain" aria-hidden="true" />

      {/* contour backdrop */}
      <svg viewBox="0 0 1440 900" className="contours pointer-events-none absolute left-0 top-0 h-[900px] w-full opacity-40" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#2f5d3a" strokeWidth="1" strokeOpacity="0.22">
          <path d="M-40 620 C 200 560, 380 700, 620 640 S 1000 520, 1240 600 S 1480 700, 1520 660" />
          <path d="M-40 680 C 220 610, 400 760, 640 700 S 1020 580, 1260 660 S 1480 760, 1520 720" />
          <path d="M-40 740 C 240 660, 420 820, 660 760 S 1040 640, 1280 720 S 1480 820, 1520 780" />
          <path d="M-40 800 C 260 710, 440 880, 680 820 S 1060 700, 1300 780 S 1480 880, 1520 840" />
          <path d="M-40 860 C 280 760, 460 940, 700 880 S 1080 760, 1320 840 S 1480 940, 1520 900" />
          <path d="M700 -20 C 760 120, 900 160, 1000 60 S 1200 -40, 1300 80 S 1420 200, 1520 120" />
          <path d="M660 -20 C 740 160, 900 220, 1020 120 S 1220 20, 1320 140 S 1440 260, 1520 180" />
        </g>
      </svg>

      <SiteNav name={site.name} mailto={mailto} />

      {/* ---------- hero: the motto over a slow pass across H-3 ----------
          Stand-in for an aerial video until the Part 107 certificate: our own 2 Sep test flight
          (corn rows and the lane) on wide screens, the full H-3 map on phones. The pan is CSS
          (.flyover-pan) and holds still under reduced motion. */}
      <section className="relative z-10 overflow-hidden bg-night text-paper">
        <div className="absolute inset-0" aria-hidden="true">
          {/* H-3 from the 6 Sep flight fills the band, close enough to see the contour strips, and the
              view flies passes across it, pausing at each stop like the drone taking a photo
              (globals.css, .hero-survey). The box keeps the image's own shape at any screen size. */}
          <div className="hero-stage absolute inset-0">
            <div className="hero-survey absolute left-1/2 top-1/2">
              <Image src="/hero-h3-full.webp" alt="" fill sizes="(min-width: 1024px) 260vw, 400vw" fetchPriority="high" loading="eager" className="object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,28,22,0.86)_0%,rgba(19,28,22,0.6)_45%,rgba(19,28,22,0.25)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,rgba(19,28,22,0.85),rgba(19,28,22,0))]" />
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-end gap-12 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-24">
          <div className="relative flex flex-col gap-7 lg:col-span-8 lg:gap-8">
            <h1 className="font-serif text-[clamp(56px,9.5vw,104px)] font-semibold leading-[1.02] tracking-[-0.025em] text-paper">
              <span className="rise d1 block">Your ground.</span>
              <span className="rise d2 block">Your data.</span>
              <span className="rise d3 block font-normal italic text-[#b9d4bd]">Your call.</span>
            </h1>
            <p className="rise d3 max-w-[620px] text-[19px] leading-[1.45] text-paper sm:text-[21px]">
              Drone maps of your fields, filed in a record you own. We fly it, your agronomist signs it, you keep it.
            </p>
            <div className="rise d4 flex flex-wrap items-center gap-3.5">
              <a href={mailto} className="group flex h-[52px] items-center gap-2.5 rounded-full bg-paper px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-wheat-soft">
                Ask about a flight <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={site.acrefileUrl} className="flex h-[52px] items-center rounded-full border border-paper/40 px-6 text-[15px] font-medium text-paper transition-colors duration-300 hover:bg-paper/10">See Acrefile</a>
              {site.podcast.name && site.podcast.feed && (
                <a href="#listen" className="group flex h-[52px] items-center gap-2 px-2 text-[15px] font-medium text-paper/80 transition-colors hover:text-paper">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg></span>
                  Listen to {site.podcast.name}
                </a>
              )}
            </div>
          </div>

          <div className="rise d5 flex flex-col gap-4 lg:col-span-4">
            <ol className="flex flex-col divide-y divide-paper/25 border-y border-paper/25">
              {["The grower owns every file.", "A person signs every recommendation."].map((t) => (
                <li key={t} className="py-5">
                  <span className="font-serif text-[22px] leading-[1.25] text-paper">{t}</span>
                </li>
              ))}
            </ol>
            <p className="data text-[11px] text-paper/70">Behind: H-3, 65.3 acres, from our 6 Sep 2026 flight</p>
          </div>
        </div>
      </section>

      {/* ===== chapter 1, mapping: proof, how, the ask ===== */}

      {/* ---------- same ground, two eyes ---------- */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-line-strong pb-24 pt-20 lg:grid-cols-12 lg:items-center">
          <div className="reveal flex flex-col gap-5 lg:col-span-4">
            <h2 className="font-serif text-[clamp(34px,4.5vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em]">The satellite shows a field.<br />Our flight shows the rows.</h2>
            <p className="text-[17px] leading-[1.5] text-ink-muted">Right: the free satellite picture most farm apps use, about 60 cm a pixel. Left: our 2 September test flight over the southwest corner of H-3, 5 cm a pixel. Drag the handle.</p>
            <p className="data text-[11px] text-ink-faint">USGS imagery for the satellite half · our map for the flight</p>
          </div>
          <div className="reveal lg:col-span-8" data-delay="1">
            <Compare before="/h3-satellite.jpg" after="/h3-drone.jpg" alt="The southwest corner of H-3 from our test flight, five centimetres per pixel" />
          </div>
        </div>
      </section>

      {/* ---------- pinned: how a flight becomes a record ---------- */}
      <Scrolly
        id="mapping"
        image="/h3-field.jpg"
        steps={[
          { kicker: "01 · Fly", title: "We fly it in the right light.", body: `Wind, sun angle and shutter speed decide the day. The drone flies a lawnmower pattern and shoots a photo every ${F.intervalSeconds} seconds. This flight: ${F.photos} photos in ${F.flightMinutes} minutes of flying, ${F.batteries === 2 ? "one battery swap" : `${F.batteries} batteries`}.` },
          { kicker: "02 · Stitch", title: "Our machine stitches it into one map.", body: `The photos are matched and blended into one map you can measure from: ${F.stitchMinutes} minutes for these ${F.acres} acres, on our own computer. Nothing to subscribe to.` },
          { kicker: "03 · Read", title: "", body: "The brown patches worth walking, the corner that always comes up thin. Five centimetres per pixel is enough to count plants." },
          { kicker: "04 · File", title: "It lands on your record, signed.", body: "The map is filed to the field in Acrefile beside your soil numbers, with your agronomist’s signed recommendation on top. You open it from a link on your phone; nothing to install." },
        ]}
      />

      {/* ---------- how a flight works, and the flight that proves it ----------
          One dark band closes the mapping chapter (Garrett, 2026-09-28): the steps, the price and
          the ask on the left, the 6 Sep flight's numbers on the right. Every number reads from
          site.flight. The hero carries the moving picture now. */}
      <section id="how" className="relative z-10 overflow-hidden bg-night text-paper">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 pb-14 pt-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-16 lg:pt-24">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <div className="reveal flex flex-col gap-3.5">
              <p className="mono text-[13px] text-wheat">How a flight works</p>
              <h2 className="font-serif text-[clamp(34px,4.5vw,50px)] font-bold leading-[1.05] tracking-[-0.015em]">You name the field. We fly it and file it.</h2>
            </div>
            <ol className="flex flex-col divide-y divide-paper/15 border-y border-paper/15">
              {[
                ["Text us a field.", "Or your agronomist does. A field name and a reason is enough: stand check, gap map, drainage, a spray plan."],
                ["We fly RTK when it counts.", "If a product needs centimetre accuracy, a spray boundary for one, we fly RTK and the record says so."],
                ["The files are yours to keep.", "Stitched on our machine, filed to your field, opened from your link. Keep them or share them."],
              ].map(([t, d], i) => (
                <li key={t} className="reveal grid grid-cols-[3rem_1fr] gap-x-4 py-6" data-delay={String(i)}>
                  <span className="font-serif text-[40px] italic leading-none text-wheat">{i + 1}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-[24px] font-semibold leading-[1.2]">{t}</h3>
                    <p className="text-[16px] leading-[1.5] text-paper/80">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="reveal flex flex-col gap-4" data-delay="1">
              <p className="text-[15px] text-paper/80">{site.pricing}</p>
              <a href={mailto} className="group flex h-[52px] w-fit items-center gap-2.5 rounded-full bg-paper px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-wheat-soft">
                Ask about a flight <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6 lg:justify-center">
            <p className="reveal data text-[12px] text-wheat">{F.field} · {F.altitudeMetres} m up · {F.flown}</p>
            <dl className="grid grid-cols-2 gap-3">
              {([
                [F.photos, "photos", `one every ${F.intervalSeconds} seconds`],
                [F.flightMinutes, "minutes", "in the air"],
                [F.gsdCm, "cm / pixel", "ground resolution"],
                [F.stitchMinutes, "minutes", "to stitch"],
              ] as [number, string, string][]).map(([n, u, d], i) => (
                <div key={u + i} className="reveal flex flex-col-reverse gap-2 rounded-[18px] border border-paper/15 bg-paper/[0.03] p-5 transition-colors duration-500 hover:border-wheat/50" data-delay={String(i % 3)}>
                  <dt className="flex flex-col">
                    <span className="mono text-[13px] text-wheat">{u}</span>
                    <span className="text-[13px] text-paper/70">{d}</span>
                  </dt>
                  <dd className="font-serif text-[48px] font-bold leading-none text-paper sm:text-[60px]"><CountUp value={n} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ===== chapter 2, Acrefile: the field record, then the farm on one map ===== */}

      {/* ---------- acrefile ---------- */}
      <section id="acrefile" className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid items-center gap-10 border-t border-line-strong pb-24 pt-20 lg:grid-cols-12">
          <div className="reveal flex flex-col gap-5 lg:col-span-6">
            <p className="mono flex items-center gap-2 text-[12px] text-moss"><AcrefileMark size={18} /> Acrefile</p>
            <h2 className="font-serif text-[clamp(32px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.015em]">Every field’s records in one place, and they’re yours.</h2>
            <p className="max-w-[520px] text-[17px] leading-[1.55] text-ink-muted">
              Every flight we make is filed in Acrefile, the field record you own: soil tests, tissue scans, maps and planter data, with your agronomist’s signed recommendation on top, and your own costs per field, budget beside actual. You sign in with your email; nobody else controls the account.
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {["Soil test in plain words", "Signed recommendations", "Machine data filed by location", "Cost of production per field", "One-page PDF", "Share links you can turn off"].map((t) => (
                <li key={t} className="mono rounded-full border border-line-strong px-3 py-2 text-[11px] text-ink-muted">{t}</li>
              ))}
            </ul>
            <a href={site.acrefileUrl} className="group inline-flex w-fit items-center gap-2 text-[15px] font-medium text-moss hover:text-moss-deep">
              acrefile.com <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className="reveal lg:col-span-6" data-delay="1">
            {/* the record as the grower sees it on a phone. H-3's real numbers, as Acrefile headlines
                them: EarthOptics soil test, October 2024 (Bray P and K), and the 2025 corn average,
                233.4 bu/ac (Justin's OK, 2026-09-28) */}
            <div className="mx-auto w-[min(360px,100%)] rounded-[28px] border border-line bg-surface p-4 shadow-[0_30px_60px_-30px_rgba(31,42,31,0.45)]">
              <div className="flex items-center justify-between px-1">
                <span className="data text-[10px] text-ink-faint">H-3 · Home Farm · 65.3 ac</span>
                <span className="mono rounded-full bg-moss-soft px-2 py-0.5 text-[9px] text-moss-deep">your link</span>
              </div>
              <div className="mt-3 rounded-2xl border-l-4 border-wheat bg-wheat-soft/70 p-3">
                {/* an example, labelled as one: no agronomist signed these words (audit 2026-09-26) */}
                <p className="mono text-[9px] text-ink-faint">Recommendation · example</p>
                <p className="mt-1 font-serif text-[15px] leading-snug">Potash where K runs low. Retest in three years.</p>
                <p className="mt-1.5 font-serif text-[13px] italic text-ink-muted">— your agronomist signs here</p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {[["pH", "6.2", "in range", "bg-moss-soft text-moss-deep"], ["OM", "2.4%", "in range", "bg-moss-soft text-moss-deep"], ["P", "34", "high", "bg-paper-deep text-ink-faint"], ["K", "115", "in range", "bg-moss-soft text-moss-deep"], ["CEC", "7.1", "lighter", "bg-wheat-soft text-ink"], ["S", "14", "low", "bg-[#f6e3dc] text-[#a8442c]"]].map(([k, v, w, c]) => (
                  <div key={k} className="rounded-xl bg-paper p-2">
                    <p className="text-[9px] text-ink-faint">{k}</p>
                    <p className="font-serif text-[18px] font-semibold leading-none">{v}</p>
                    <p className={`mt-1 inline-block rounded-full px-1.5 text-[8px] font-medium ${c}`}>{w}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-paper px-3 py-2">
                <span className="data text-[9px] text-ink-faint">Yield 2025 · Corn</span>
                <span className="font-serif text-[15px] font-semibold">233.4 <span className="text-[10px] font-normal text-ink-faint">bu/ac</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- plat book: the farm on one map, as Acrefile shows it ---------- */}
      <section id="plat-book" className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-line-strong pb-24 pt-20 lg:grid-cols-12 lg:items-center">
          <div className="reveal flex flex-col gap-5 lg:col-span-4">
            <p className="mono text-[13px] text-moss">The plat book</p>
            <h2 className="font-serif text-[clamp(34px,4.5vw,48px)] font-bold leading-[1.05] tracking-[-0.015em]">Every field on one page.</h2>
            <p className="text-[17px] leading-[1.5] text-ink-muted">In Acrefile the farm opens on one map: every field outlined and tinted by farm, like the county plat book on the kitchen table. This is Sarauer Farms, drawn from the boundaries in its record. Tap a field and its record opens.</p>
            <dl className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-line pt-4">
              {PLAT_FIELDS.map((f) => (
                <div key={f.field} className="contents">
                  <dt className="flex items-center gap-2 font-serif text-[18px] font-bold"><span className="h-3 w-3 rounded-[3px]" style={{ background: f.color }} aria-hidden="true" />{f.field}</dt>
                  <dd className="text-[14px] text-ink-muted">{f.farm}</dd>
                  <dd className="data text-right text-[14px]">{f.acres.toFixed(1)} ac</dd>
                </div>
              ))}
              <div className="contents">
                <dt className="col-span-2 border-t border-line pt-2 text-[14px] font-semibold">{PLAT_FIELDS.length} fields, {new Set(PLAT_FIELDS.map((f) => f.farm)).size} farms</dt>
                <dd className="data border-t border-line pt-2 text-right text-[14px] font-medium">{PLAT_FIELDS.reduce((n, f) => n + f.acres, 0).toFixed(1)} ac</dd>
              </div>
            </dl>
          </div>
          <div className="reveal rounded-[20px] border border-line bg-surface p-3 sm:p-5 lg:col-span-8" data-delay="1">
            <PlatBook />
          </div>
        </div>
      </section>

      {/* ===== chapter 3, the people ===== */}

      {/* ---------- about ---------- */}
      <section id="about" className="relative z-10 mx-auto grid max-w-[1280px] gap-10 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28">
        <div className="reveal flex flex-col gap-5 lg:col-span-5">
          <p className="mono text-[12px] text-moss">About</p>
          <h2 className="font-serif text-[clamp(36px,4.8vw,52px)] font-semibold leading-[1.02] tracking-[-0.02em]">Two brothers,<br />one farm.</h2>
          <p className="text-[17px] leading-[1.55] text-ink-muted">
            Badgair Bros started on the home farm outside Bloomer. One of us farms it. The other builds the tools and flies the drone. We built Acrefile because every report we got came in a different app, on someone else’s account, and none of it added up to a record of the ground.
          </p>
          <p className="mono flex items-center gap-2.5 text-[12px] text-ink-faint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            {site.place}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {site.people.map((p, i) => (
            <figure key={p.name} className={`reveal group flex flex-col gap-3.5 ${i === 1 ? "sm:pt-12" : ""}`} data-delay={String(i)}>
              <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-[20px] border border-line bg-paper-deep transition-transform duration-500 group-hover:-translate-y-1">
                {p.photo ? (
                  <Image src={p.photo} alt={p.name} fill sizes="(min-width: 640px) 320px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                ) : (
                  <>
                    <svg viewBox="0 0 320 300" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none" aria-hidden="true">
                      <g fill="none" stroke="#2f5d3a" strokeWidth="1" strokeOpacity="0.25">
                        <path d="M-10 200 C 60 170, 120 230, 190 200 S 300 160, 330 190" /><path d="M-10 230 C 60 200, 120 260, 190 230 S 300 190, 330 220" /><path d="M-10 260 C 60 230, 120 290, 190 260 S 300 220, 330 250" />
                      </g>
                    </svg>
                    <span className="relative font-serif text-[72px] font-semibold text-ink/25">{p.initial}</span>
                    <span className="mono absolute bottom-3 right-3 text-[10px] text-ink-faint">photo soon</span>
                  </>
                )}
              </div>
              <figcaption className="flex flex-col gap-0.5">
                <span className="font-serif text-[22px] font-semibold">{p.name}</span>
                <span className="text-[14px] text-ink-muted">{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- listen (appears once the feed exists) ---------- */}
      {site.podcast.feed && site.podcast.name && (
        <section id="listen" className="relative z-10 overflow-hidden bg-moss text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
            <div className="reveal flex flex-col gap-5 lg:col-span-5">
              <p className="mono text-[12px] text-wheat-soft">Listen · the podcast</p>
              <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.02em]">{site.podcast.name}</h2>
              <p className="max-w-[420px] text-[17px] leading-[1.5] text-paper/85">{site.podcast.blurb}</p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[["Apple Podcasts", site.podcast.apple], ["Spotify", site.podcast.spotify], ["Show page", site.podcast.rsscom], ["RSS", site.podcast.feed]].map(([l, u]) => u && <a key={l} href={u} className="mono rounded-full border border-paper/30 px-3.5 py-2 text-[11px] transition-colors hover:border-paper hover:bg-paper/10">{l}</a>)}
              </div>
            </div>
            <ol className="flex flex-col gap-3 lg:col-span-7">
              {episodes.length === 0 && <li className="reveal rounded-[16px] border border-paper/15 p-5 text-paper/85">First episode coming soon. The feed is live; the first recording is being made.</li>}
              {episodes.map((ep, i) => (
                <li key={(ep.url ?? ep.title) + i} className={`reveal flex items-center justify-between gap-4 rounded-[16px] p-5 ${i === 0 ? "bg-night" : "border border-paper/15"}`} data-delay={String(i % 3)}>
                  <div className="min-w-0">
                    <p className="mono text-[10px] text-paper/80">{i === 0 ? "Latest" : ""} {ep.date ? new Date(ep.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : ""}</p>
                    <p className="font-serif text-[20px] font-semibold leading-[1.2]">{ep.url ? <a href={ep.url} className="hover:underline">{ep.title}</a> : ep.title}</p>
                    {i === 0 && ep.summary && <p className="mt-1 text-[14px] text-paper/85">{ep.summary}</p>}
                  </div>
                  <span className="data shrink-0 text-[11px] text-paper/80">{ep.minutes ? `${ep.minutes} min` : ""}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---------- contact + footer ---------- */}
      <footer id="contact" className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-16 border-t border-line-strong pb-10 pt-16 lg:pt-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="reveal flex flex-col gap-4">
              <h2 className="max-w-[640px] font-serif text-[clamp(44px,6vw,72px)] font-semibold leading-[1.0] tracking-[-0.025em]">Ask us about<br />a field this fall.</h2>
              <p className="max-w-[520px] text-[16px] text-ink-muted">{site.pricing}</p>
            </div>
            <div className="reveal flex flex-col gap-3 lg:items-end" data-delay="1">
              {site.email && <a href={mailto} className="font-serif text-[24px] text-moss underline decoration-wheat/0 underline-offset-8 transition-[text-decoration-color] duration-300 hover:decoration-wheat sm:text-[26px]">{site.email}</a>}
              <p className="data flex flex-wrap gap-x-3 text-[12px] text-ink-faint">
                {site.phone && tel && <a href={tel} className="hover:text-ink">{site.phone}</a>}
                {site.phone && <span>·</span>}
                <span>{site.place}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5">
              <BadgairMark size={34} />
              <span className="mono text-[11px] text-ink-faint">{site.legal} · © {new Date().getFullYear()}</span>
            </p>
            <nav className="mono flex gap-7 text-[11px] text-ink-faint" aria-label="Footer">
              <Link href="/#mapping" className="hover:text-ink">Mapping</Link>
              <a href={site.acrefileUrl} className="hover:text-ink">Acrefile</a>
              <Link href="/#about" className="hover:text-ink">About</Link>
              {site.podcast.rsscom && <a href={site.podcast.rsscom} className="hover:text-ink">Podcast</a>}
              <a href="/grains" className="hover:text-ink">Grains</a>
              <a href="#top" className="hover:text-ink">Top</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
