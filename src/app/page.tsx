import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";
import { BadgairMark, AcrefileMark, Arrow } from "@/components/marks";

const mailto = site.email ? `mailto:${site.email}?subject=${encodeURIComponent("Fly a field")}` : "#contact";

/* Lawnmower flight lines over the orthomosaic, in the image's own coordinate space. */
const FLIGHT = "M40 330 L 110 40 L 180 330 L 250 40 L 320 330 L 390 40 L 460 330 L 530 40 L 600 330";
const WAYPOINTS: [number, number][] = [[40, 330], [110, 40], [180, 330], [250, 40], [320, 330], [390, 40], [460, 330], [530, 40], [600, 330]];

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Reveal />

      {/* contour backdrop */}
      <svg viewBox="0 0 1440 900" className="pointer-events-none absolute left-0 top-0 h-[900px] w-full opacity-40" preserveAspectRatio="none" aria-hidden="true">
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

      {/* ---------- nav ---------- */}
      <header className="relative z-10 border-b border-line">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <BadgairMark size={30} />
            <span className="font-serif text-[22px] font-semibold tracking-[-0.01em]">{site.name}</span>
          </a>
          <nav className="mono hidden items-center gap-9 text-[12px] text-ink-muted md:flex" aria-label="Sections">
            <a href="#mapping" className="hover:text-ink">Mapping</a>
            <a href="#acrefile" className="hover:text-ink">Acrefile</a>
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#about" className="hover:text-ink">About</a>
            <a href="#contact" className="hover:text-ink">Contact</a>
          </nav>
          <a href={mailto} className="flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-paper transition-colors hover:bg-moss">Book a flight</a>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section id="top" className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-24">
        <div className="flex flex-col gap-7 lg:col-span-7 lg:gap-8">
          <p className="mono rise d1 flex items-center gap-3.5 text-[12px] text-moss">
            <span className="h-px w-7 bg-moss" />
            {site.legal} · {site.region}, Wisconsin
          </p>
          <h1 className="rise d2 font-serif text-[clamp(56px,9.5vw,104px)] font-semibold leading-[0.96] tracking-[-0.025em] text-ink">
            Your ground.<br />Your data.<br /><span className="font-normal italic text-moss">Your call.</span>
          </h1>
          <p className="rise d3 max-w-[560px] text-[19px] leading-[1.45] text-ink-muted sm:text-[21px]">
            Drone field mapping and a grower-owned record for the farms of {site.region}. We fly it, your agronomist signs it, and the file is yours for good.
          </p>
          <div className="rise d4 flex flex-wrap items-center gap-3.5">
            <a href={mailto} className="flex h-[52px] items-center gap-2.5 rounded-full bg-moss px-6 text-[15px] font-medium text-paper transition-colors hover:bg-moss-deep">
              Book a flight <Arrow />
            </a>
            <a href={site.acrefileUrl} className="flex h-[52px] items-center rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-colors hover:bg-paper-deep">See Acrefile</a>
          </div>
        </div>

        {/* the real field */}
        <div className="rise d3 lg:col-span-5">
          <div className="drift overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(31,42,31,0.45),0_2px_4px_rgba(31,42,31,0.06)]">
            <div className="relative aspect-[520/380] overflow-hidden bg-paper-deep">
              <Image src="/h3-ortho.jpg" alt="Orthomosaic of field H-3, flown 2 September 2026" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
              <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-transparent via-paper/25 to-transparent" />
              <svg viewBox="0 0 640 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <path d={FLIGHT} className="flight-path" fill="none" stroke="#f7f3ea" strokeWidth="1.6" strokeDasharray="6 6" strokeOpacity="0.95" />
                <g fill="#c9a227" stroke="#1f2a1f" strokeWidth="1">
                  {WAYPOINTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" className="waypoint" style={{ animationDelay: `${0.9 + i * 0.42}s` }} />)}
                </g>
              </svg>
              <span className="mono absolute left-3.5 top-3.5 rounded-full bg-ink/75 px-2.5 py-1.5 text-[10px] text-paper">Flown by us</span>
            </div>
            <dl className="grid grid-cols-3 border-t border-line">
              {[["Field", site.flight.field], ["Flown", site.flight.flown], ["Resolution", site.flight.gsd]].map(([k, v], i) => (
                <div key={k} className={`flex flex-col gap-0.5 px-4 py-3.5 ${i < 2 ? "border-r border-line" : ""}`}>
                  <dt className="mono text-[10px] text-ink-faint">{k}</dt>
                  <dd className="text-[14px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- principles ---------- */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <ol className="grid gap-6 border-y border-line-strong py-9 md:grid-cols-3 md:gap-8">
          {["The grower owns every file.", "A person signs every recommendation.", "Accuracy is recorded, never assumed."].map((t, i) => (
            <li key={t} className="reveal flex items-baseline gap-4" data-delay={String(i)}>
              <span className="mono text-[12px] text-moss">0{i + 1}</span>
              <span className="font-serif text-[22px] leading-[1.25] sm:text-[24px]">{t}</span>
            </li>
          ))}
        </ol>
      </section>

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
          <article id="mapping" className="reveal relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-8 text-paper sm:p-10 lg:col-span-7">
            <svg viewBox="0 0 760 460" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="none" aria-hidden="true">
              <defs><clipPath id="fld"><path d="M420 70 C 520 40, 660 60, 720 110 L 730 330 C 640 380, 520 400, 440 370 Z" /></clipPath></defs>
              <g clipPath="url(#fld)">
                <rect x="400" y="30" width="360" height="400" fill="#2f5d3a" />
                <g stroke="#3f7e48" strokeWidth="10" strokeLinecap="round" fill="none" strokeOpacity="0.9">
                  {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M410 ${100 + i * 24} L 740 ${100 + i * 24}`} />)}
                </g>
                <g fill="#c9a227" fillOpacity="0.55"><rect x="560" y="140" width="70" height="40" /><rect x="640" y="230" width="50" height="60" /></g>
              </g>
              <path d="M420 70 C 520 40, 660 60, 720 110 L 730 330 C 640 380, 520 400, 440 370 Z" fill="none" stroke="#f7f3ea" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d="M440 380 L 470 80 L 500 380 L 530 80 L 560 380 L 590 80 L 620 380 L 650 80 L 680 380 L 710 80" fill="none" stroke="#f7f3ea" strokeWidth="1" strokeDasharray="5 6" strokeOpacity="0.6" />
            </svg>
            <div className="relative flex max-w-[360px] flex-col gap-3.5">
              <p className="mono text-[12px] text-wheat">01 · Field mapping</p>
              <h3 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[40px]">The field, at five centimetres.</h3>
              <p className="text-[16px] leading-[1.5] text-paper/80">A drone flight over your acres, stitched into a map you can measure from and filed to your record. Stand counts and gaps now. Plant-health layers next.</p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-2.5">
              {["Orthomosaic", "Stand count", "Elevation"].map((t) => <span key={t} className="mono rounded-full border border-paper/30 px-3 py-2 text-[11px]">{t}</span>)}
              <span className="mono rounded-full border border-wheat/60 px-3 py-2 text-[11px] text-wheat">Multispectral · next</span>
            </div>
          </article>

          {/* acrefile */}
          <article id="acrefile" className="reveal relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-surface p-8 shadow-[0_2px_4px_rgba(31,42,31,0.04)] sm:p-10 lg:col-span-5" data-delay="1">
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
                <div className="rounded-lg border border-wheat bg-wheat-soft p-2 text-[9px] leading-[1.3]">Hold K this year. Retest in three. <span className="font-serif italic">— your agronomist</span></div>
              </div>
              <a href={site.acrefileUrl} className="flex items-center gap-2 text-[15px] font-medium text-moss hover:text-moss-deep">
                acrefile.com <Arrow className="-rotate-45" />
              </a>
            </div>
          </article>
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
              <li key={t} className="reveal flex flex-col gap-4 border-t-2 border-ink pt-6" data-delay={String(i)}>
                <span className="font-serif text-[56px] italic leading-none text-moss">{i + 1}</span>
                <h3 className="font-serif text-[26px] font-semibold">{t}</h3>
                <p className="text-[16px] leading-[1.5] text-ink-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- the ground, in numbers ---------- */}
      <section className="relative z-10 overflow-hidden bg-night text-paper">
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 h-[120px] w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="#2f5d3a" strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 72 }, (_, i) => { const h = 12 + ((i * 37) % 48); return <line key={i} x1={20 + i * 20} y1={65 - h / 2} x2={20 + i * 20} y2={65 + h / 2} />; })}
          </g>
        </svg>
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="reveal flex flex-col gap-5 lg:col-span-5">
            <p className="mono text-[12px] text-wheat">The first flight</p>
            <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.02em]">Thirty-five photos.<br />One field.<br />The same afternoon.</h2>
            <p className="max-w-[420px] text-[17px] leading-[1.5] text-paper/75">H-3 on the home farm, flown on the second of September. Stitched, filed, and opened on a phone before supper. That is the whole pitch.</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:col-span-7 lg:grid-cols-4">
            {[["35", "photos", "one pass at 120 ft"], ["9", "minutes", "in the air"], ["5", "cm / pixel", "ground resolution"], ["53", "seconds", "to stitch on our machine"]].map(([n, u, d], i) => (
              <div key={u} className="reveal rounded-[18px] border border-paper/15 p-5" data-delay={String(i % 3)}>
                <p className="font-serif text-[56px] font-semibold leading-none text-paper">{n}</p>
                <p className="mono mt-2 text-[11px] text-wheat">{u}</p>
                <p className="mt-1 text-[13px] text-paper/60">{d}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section id="about" className="relative z-10 mx-auto grid max-w-[1280px] gap-10 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28">
        <div className="reveal flex flex-col gap-5 lg:col-span-5">
          <p className="mono text-[12px] text-moss">About</p>
          <h2 className="font-serif text-[clamp(36px,4.8vw,52px)] font-semibold leading-[1.02] tracking-[-0.02em]">Two brothers,<br />one farm.</h2>
          <p className="text-[17px] leading-[1.55] text-ink-muted">
            Badgair Bros started on the home farm outside Chippewa Falls. One of us farms it. The other builds the tools and flies the drone. We built Acrefile because every report we got came in a different app, on someone else’s account, and none of it added up to a record of the ground.
          </p>
          <p className="mono flex items-center gap-2.5 text-[12px] text-ink-faint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            {site.place}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {site.people.map((p, i) => (
            <figure key={p.name} className={`reveal flex flex-col gap-3.5 ${i === 1 ? "sm:pt-12" : ""}`} data-delay={String(i)}>
              <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-[20px] border border-line bg-paper-deep">
                {p.photo ? (
                  <Image src={p.photo} alt={p.name} fill sizes="(min-width: 640px) 320px, 100vw" className="object-cover" />
                ) : (
                  <>
                    <span className="font-serif text-[72px] font-semibold text-ink/25">{p.initial}</span>
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
            <h2 className="reveal max-w-[640px] font-serif text-[clamp(44px,6vw,72px)] font-semibold leading-[1.0] tracking-[-0.025em]">Fly a field<br />with us this fall.</h2>
            <div className="reveal flex flex-col gap-3 lg:items-end" data-delay="1">
              {site.email && <a href={mailto} className="font-serif text-[24px] text-moss hover:text-moss-deep sm:text-[26px]">{site.email}</a>}
              <p className="mono text-[12px] text-ink-faint">{[site.phone, site.place].filter(Boolean).join(" · ")}</p>
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
