import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";
import SiteNav from "@/components/nav";
import CountUp from "@/components/count-up";
import Compare from "@/components/compare";
import Scrolly from "@/components/scrolly";
import { getEpisodes } from "@/lib/podcast";
import { BadgairMark, AcrefileMark, Arrow } from "@/components/marks";

export const revalidate = 3600;

const mailto = site.email ? `mailto:${site.email}?subject=${encodeURIComponent("Fly a field")}` : "#contact";
const tel = site.phone ? `tel:+1${site.phone.replace(/\D/g, "")}` : null;

const TICKER = ["Soil tests", "Tissue scans", "Orthomosaics", "Yield maps", "Planting passes", "Spray records", "Boundaries", "Obstacles", "Signed recommendations"];

const PIPELINE = ["35 photos", "matched", "meshed", "stitched", "tiled", "filed to H-3"];

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

      {/* ---------- hero ---------- */}
      <section className="relative z-10 mx-auto grid max-w-[1280px] items-end gap-12 px-5 pb-12 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-24">
        <div className="relative flex flex-col gap-7 lg:col-span-8 lg:gap-8">
          <p className="mono rise d1 flex items-center gap-3.5 text-[12px] text-moss">
            <span className="h-px w-7 bg-moss" />
            {site.legal} · {site.region}, Wisconsin
          </p>
          <h1 className="font-serif text-[clamp(56px,9.5vw,104px)] font-semibold leading-[0.96] tracking-[-0.025em] text-ink">
            <span className="mask"><span>Your ground.</span></span>
            <span className="mask"><span>Your data.</span></span>
            <span className="mask"><span className="font-normal italic text-moss">Your call.</span></span>
          </h1>
          <p className="rise d3 max-w-[620px] text-[19px] leading-[1.45] text-ink-muted sm:text-[21px]">
            Drone field mapping and a grower-owned record for the farms of {site.region}. We fly it, your agronomist signs it, and the file is yours for good.
          </p>
          <div className="rise d4 flex flex-wrap items-center gap-3.5">
            <a href={mailto} className="group flex h-[52px] items-center gap-2.5 rounded-full bg-moss px-6 text-[15px] font-medium text-paper transition-[background-color,box-shadow] duration-300 hover:bg-moss-deep hover:shadow-[0_14px_30px_-14px_rgba(47,93,58,0.7)]">
              Book a flight <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={site.acrefileUrl} className="flex h-[52px] items-center rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-paper-deep">See Acrefile</a>
          </div>
        </div>

        <ol className="rise d5 flex flex-col divide-y divide-line-strong border-y border-line-strong lg:col-span-4">
          {["The grower owns every file.", "A person signs every recommendation.", "Accuracy is recorded, never assumed."].map((t, i) => (
            <li key={t} className="flex items-baseline gap-4 py-5">
              <span className="mono text-[12px] text-moss">0{i + 1}</span>
              <span className="font-serif text-[22px] leading-[1.25]">{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- ticker: what gets filed ---------- */}
      <div className="ticker-wrap relative z-10 overflow-hidden border-b border-line-strong py-4" aria-hidden="true">
        <div className="ticker flex w-max gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mono flex items-center gap-10 text-[12px] text-ink-faint">
              {t}<span className="h-1.5 w-1.5 rounded-full bg-wheat" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- pinned: how a flight becomes a record ---------- */}
      <Scrolly
        image="/h3-ortho.jpg"
        steps={[
          { kicker: "01 · Fly", title: "We fly it in the right light.", body: "Wind, sun angle and shutter speed decide the day. The drone flies a lawnmower pattern and shoots a photo every couple of seconds. This flight: 35 photos, nine minutes." },
          { kicker: "02 · Stitch", title: "Our machine stitches it into one map.", body: "The photos are matched, meshed and blended into a single orthomosaic you can measure from. Fifty-three seconds for this field. No cloud, no monthly fee." },
          { kicker: "03 · Read", title: "Then you read the field, not a pixel.", body: "Wet corners, skips in the stand, the pasture your cattle actually use. Five centimetres per pixel is enough to count plants." },
          { kicker: "04 · File", title: "It lands on your record, signed.", body: "The map is filed to the field in Acrefile beside your soil numbers, in words, with your agronomist’s signed recommendation on top. Opened from a text." },
        ]}
      />

      {/* ---------- what we do ---------- */}
      <section className="relative z-10 mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-24 pt-20 sm:px-8 lg:pt-28">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
          <div className="reveal flex flex-col gap-3.5">
            <p className="mono text-[12px] text-moss">What we do</p>
            <h2 className="max-w-[720px] font-serif text-[clamp(40px,5.5vw,60px)] font-semibold leading-[1.02] tracking-[-0.02em]">Two things, done properly.</h2>
          </div>
          <p className="reveal max-w-[420px] text-[17px] leading-[1.5] text-ink-muted" data-delay="1">
            We fly the field. Acrefile keeps the record. Everything else, from soil labs to your planter monitor, gets filed into the same place and stays yours.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* mapping */}
          <article id="mapping" className="reveal group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-8 text-paper transition-transform duration-500 hover:-translate-y-1 sm:p-10 lg:col-span-7">
            <svg viewBox="0 0 760 460" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" stroke="#3f7e48" strokeWidth="1" strokeOpacity="0.5">
                {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M380 ${60 + i * 46} C 480 ${20 + i * 46}, 600 ${100 + i * 46}, 780 ${50 + i * 46}`} />)}
              </g>
            </svg>
            <div className="relative flex max-w-[360px] flex-col gap-3.5">
              <p className="mono text-[12px] text-wheat">01 · Field mapping</p>
              <h3 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[40px]">The field, at five centimetres.</h3>
              <p className="text-[16px] leading-[1.5] text-paper/80">A drone flight over your acres, stitched into a map you can measure from and filed to your record. Stand counts and gaps now. Plant-health layers next.</p>
              <p className="mono text-[11px] text-paper/55">{site.pricing}</p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-2.5">
              {["Orthomosaic", "Stand count", "Elevation"].map((t) => <span key={t} className="mono rounded-full border border-paper/30 px-3 py-2 text-[11px] transition-colors group-hover:border-paper/60">{t}</span>)}
              <span className="mono rounded-full border border-wheat/60 px-3 py-2 text-[11px] text-wheat">Multispectral · next</span>
            </div>
          </article>

          {/* acrefile */}
          <article id="acrefile" className="reveal relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-surface p-8 shadow-[0_2px_4px_rgba(31,42,31,0.04)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(31,42,31,0.5)] sm:p-10 lg:col-span-5" data-delay="1">
            <div className="flex flex-col gap-3.5">
              <p className="mono flex items-center gap-2 text-[12px] text-moss"><AcrefileMark size={18} /> 02 · Acrefile</p>
              <h3 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[40px]">One record. Yours.</h3>
              <p className="text-[16px] leading-[1.5] text-ink-muted">Soil, tissue, imagery and planter data in one place, with your agronomist’s signed recommendation on top. Opened from a text message. No login to remember.</p>
            </div>
            <div className="mt-8 flex items-end justify-between gap-5">
              {/* phone sketch */}
              <div className="flex w-[176px] flex-col gap-2 rounded-[18px] border border-line bg-paper p-3">
                <p className="mono text-[9px] text-ink-faint">H-3 · Oct 2025</p>
                <div className="grid grid-cols-3 gap-1">
                  {[["pH", "6.6", "in range", "bg-moss-soft text-moss-deep"], ["P", "38", "high", "bg-paper-deep text-ink-faint"], ["K", "97", "a little low", "bg-wheat-soft text-ink"]].map(([k, v, w, c]) => (
                    <div key={k} className="rounded-lg bg-surface p-1.5">
                      <p className="text-[8px] text-ink-faint">{k}</p>
                      <p className="font-serif text-[15px] font-semibold leading-none">{v}</p>
                      <p className={`mt-1 inline-block rounded-full px-1 text-[7px] font-medium ${c}`}>{w}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-wheat bg-wheat-soft p-2 text-[9px] leading-[1.3]"><span className="typed">Hold K. Retest in three.</span><br /><span className="font-serif italic">— your agronomist</span></div>
              </div>
              <a href={site.acrefileUrl} className="group flex items-center gap-2 text-[15px] font-medium text-moss hover:text-moss-deep">
                acrefile.com <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- same ground, two eyes ---------- */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-line-strong pb-24 pt-20 lg:grid-cols-12 lg:items-center">
          <div className="reveal flex flex-col gap-5 lg:col-span-4">
            <p className="mono text-[12px] text-moss">Same ground, two eyes</p>
            <h2 className="font-serif text-[clamp(34px,4.5vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em]">Satellite sees a field.<br />We see the rows.</h2>
            <p className="text-[17px] leading-[1.5] text-ink-muted">The public satellite image on the right is what every farm app shows you. The left half is H-3 from our first flight, the same ground at five centimetres: the wet corner, the skips, the cattle in the pasture. Drag the handle.</p>
            <p className="mono text-[11px] text-ink-faint">USGS imagery for the satellite half · our orthomosaic for the flight</p>
          </div>
          <div className="reveal lg:col-span-8" data-delay="1">
            <Compare before="/h3-satellite.jpg" after="/h3-drone.jpg" alt="H-3 from our flight at five centimetres per pixel" />
          </div>
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section id="how" className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-12 border-t border-line-strong pb-24 pt-20">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div className="reveal flex flex-col gap-3.5">
              <p className="mono text-[12px] text-moss">How a flight works</p>
              <h2 className="font-serif text-[clamp(34px,4.5vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em]">Ask. We fly. It lands on your record.</h2>
            </div>
            <p className="mono reveal text-[12px] text-ink-faint" data-delay="1">Most fields · within a day</p>
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            {[
              ["Text us a field.", "Or your agronomist does. A field name and a reason is enough: stand check, gap map, drainage, a spray plan."],
              ["We fly it in the right light.", "Wind, sun angle and shutter speed decide the day. If a product needs centimetre accuracy, we fly RTK and the record says so."],
              ["The map lands on your record.", "Stitched on our machine, filed to your field, opened from your link. The files are yours to keep or share."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal group flex flex-col gap-4 border-t-2 border-ink pt-6" data-delay={String(i)}>
                <span className="font-serif text-[56px] italic leading-none text-moss transition-transform duration-500 group-hover:translate-x-1">{i + 1}</span>
                <h3 className="font-serif text-[26px] font-semibold">{t}</h3>
                <p className="text-[16px] leading-[1.5] text-ink-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- the first flight, in numbers ---------- */}
      <section className="relative z-10 overflow-hidden bg-night text-paper">
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 h-[120px] w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="#2f5d3a" strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 72 }, (_, i) => { const h = 12 + ((i * 37) % 48); return <line key={i} x1={20 + i * 20} y1={65 - h / 2} x2={20 + i * 20} y2={65 + h / 2} />; })}
          </g>
        </svg>
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="reveal flex flex-col gap-5 lg:col-span-5">
            <p className="mono text-[12px] text-wheat">The first flight</p>
            <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.02em]">Thirty-five photos.<br />One field.<br />The same afternoon.</h2>
            <p className="max-w-[420px] text-[17px] leading-[1.5] text-paper/75">H-3 on the home farm, flown on the second of September. Stitched, filed, and opened on a phone before supper. That is the whole pitch.</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:col-span-7 lg:grid-cols-4">
            {[[35, "photos", "one pass at 120 ft"], [9, "minutes", "in the air"], [5, "cm / pixel", "ground resolution"], [53, "seconds", "to stitch on our machine"]].map(([n, u, d], i) => (
              <div key={String(u)} className="reveal rounded-[18px] border border-paper/15 bg-paper/[0.03] p-5 backdrop-blur-[2px] transition-colors duration-500 hover:border-wheat/50" data-delay={String(i % 3)}>
                <p className="font-serif text-[56px] font-semibold leading-none text-paper"><CountUp value={n as number} /></p>
                <p className="mono mt-2 text-[11px] text-wheat">{u}</p>
                <p className="mt-1 text-[13px] text-paper/60">{d}</p>
              </div>
            ))}
          </dl>
          <ol className="pipeline reveal mono flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-paper/60 lg:col-span-12" data-delay="2" aria-label="What happens to the photos">
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="step flex items-center gap-2 rounded-full border border-paper/20 px-3 py-1.5" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
                  <span className="dot h-1.5 w-1.5 rounded-full bg-paper/40" />{step}
                </span>
                {i < PIPELINE.length - 1 && <span className="h-px w-5 bg-paper/25" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- listen (appears once the feed exists) ---------- */}
      {site.podcast.feed && site.podcast.name && (
        <section id="listen" className="relative z-10 overflow-hidden bg-moss text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
            <div className="reveal flex flex-col gap-5 lg:col-span-5">
              <p className="mono text-[12px] text-wheat">Listen · the podcast</p>
              <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.02em]">{site.podcast.name}</h2>
              <p className="max-w-[420px] text-[17px] leading-[1.5] text-paper/80">{site.podcast.blurb}</p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[["Apple Podcasts", site.podcast.apple], ["Spotify", site.podcast.spotify], ["RSS", site.podcast.feed]].map(([l, u]) => u && <a key={l} href={u} className="mono rounded-full border border-paper/30 px-3.5 py-2 text-[11px] transition-colors hover:border-paper hover:bg-paper/10">{l}</a>)}
              </div>
            </div>
            <ol className="flex flex-col gap-3 lg:col-span-7">
              {episodes.length === 0 && <li className="reveal rounded-[16px] border border-paper/15 p-5 text-paper/70">First episode coming soon.</li>}
              {episodes.map((ep, i) => (
                <li key={ep.title} className={`reveal flex items-center justify-between gap-4 rounded-[16px] p-5 ${i === 0 ? "bg-night" : "border border-paper/15"}`} data-delay={String(i % 3)}>
                  <div className="min-w-0">
                    <p className="mono text-[10px] text-paper/60">{i === 0 ? "Latest" : ""} {ep.date ? new Date(ep.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : ""}</p>
                    <p className="font-serif text-[20px] font-semibold leading-[1.2]">{ep.url ? <a href={ep.url} className="hover:underline">{ep.title}</a> : ep.title}</p>
                    {i === 0 && ep.summary && <p className="mt-1 text-[14px] text-paper/70">{ep.summary}</p>}
                  </div>
                  <span className="mono shrink-0 text-[11px] text-paper/60">{ep.minutes ? `${ep.minutes} min` : ""}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

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

      {/* ---------- contact + footer ---------- */}
      <footer id="contact" className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-16 border-t border-line-strong pb-10 pt-16 lg:pt-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="reveal flex flex-col gap-4">
              <h2 className="max-w-[640px] font-serif text-[clamp(44px,6vw,72px)] font-semibold leading-[1.0] tracking-[-0.025em]">Fly a field<br />with us this fall.</h2>
              <p className="max-w-[520px] text-[16px] text-ink-muted">{site.pricing}</p>
            </div>
            <div className="reveal flex flex-col gap-3 lg:items-end" data-delay="1">
              {site.email && <a href={mailto} className="font-serif text-[24px] text-moss underline decoration-wheat/0 underline-offset-8 transition-[text-decoration-color] duration-300 hover:decoration-wheat sm:text-[26px]">{site.email}</a>}
              <p className="mono flex flex-wrap gap-x-3 text-[12px] text-ink-faint">
                {site.phone && tel && <a href={tel} className="hover:text-ink">{site.phone}</a>}
                {site.phone && <span>·</span>}
                <span>{site.place}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5">
              <BadgairMark size={22} />
              <span className="mono text-[11px] text-ink-faint">{site.legal} · © {new Date().getFullYear()}</span>
            </p>
            <nav className="mono flex gap-7 text-[11px] text-ink-faint" aria-label="Footer">
              <a href={site.acrefileUrl} className="hover:text-ink">Acrefile</a>
              <a href="#top" className="hover:text-ink">Top</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
