import Image from "next/image";
import { site } from "@/lib/site";
import { Arrow } from "@/components/marks";
import CountUp from "@/components/count-up";

/**
 * The close of the mapping chapter: a slow pass over H-3 with the latest flight's numbers and the
 * ask. The pan stands in for a fly-over video until the Part 107 certificate lets us film one for
 * the business. The image is the interior of the 6 Sep orthomosaic (public/h3-flyover.jpg); the
 * pan is CSS (globals.css, .flyover-pan) and holds still under reduced motion. Every number reads
 * from site.flight.
 */
export default function Flyover({ mailto }: { mailto: string }) {
  const F = site.flight;
  const tiles: [number, string, string][] = [
    [F.photos, "photos", `one every ${F.intervalSeconds} seconds`],
    [F.flightMinutes, "minutes", "in the air"],
    [F.gsdCm, "cm / pixel", "ground resolution"],
    [F.stitchMinutes, "minutes", "to stitch on our machine"],
  ];
  const pipeline = [`${F.photos} photos`, "matched", "meshed", "stitched", "tiled", `filed to ${F.field.split(" ·")[0]}`];
  return (
    <section id="fly" aria-labelledby="flyover-title" className="relative z-10 overflow-hidden bg-night text-paper">
      {/* The picture holds the right of the band at about its own size (the crop is 980 px wide),
          so it stays sharp; on a phone it runs full width behind a darker wash. */}
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[62%]" aria-hidden="true">
        <div className="flyover-pan absolute inset-0">
          <Image src="/h3-flyover.jpg" alt="" fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[rgba(19,28,22,0.6)] lg:bg-[linear-gradient(90deg,rgba(19,28,22,1)_0%,rgba(19,28,22,0.3)_26%,rgba(19,28,22,0)_50%)]" />
      </div>
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 px-5 py-20 sm:px-8 lg:py-24">
        <div className="reveal flex flex-col gap-5 lg:max-w-[46%]">
          <p className="data text-[12px] text-wheat">{F.field} · {F.altitudeMetres} m up · {F.flown}</p>
          <h2 id="flyover-title" className="font-serif text-[clamp(38px,5vw,60px)] font-bold leading-[1.02] tracking-[-0.015em]">
            Your field, from a hundred metres up.
          </h2>
          <p className="text-[17px] leading-[1.5] text-paper/85">
            {F.field}, {F.acres} acres, flown on {F.flownLong}. Two batteries, one swap, stitched on our own machine and opened on a phone the same day. Ask about a flight and yours is filed to your record the same way.
          </p>
          <a href={mailto} className="group flex h-[52px] w-fit items-center gap-2.5 rounded-full bg-paper px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-wheat-soft">
            Ask about a flight <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map(([n, u, d], i) => (
            <div key={u + i} className="reveal flex flex-col-reverse gap-2 rounded-[18px] border border-paper/15 bg-night/70 p-5 backdrop-blur-[3px] transition-colors duration-500 hover:border-wheat/50" data-delay={String(i % 3)}>
              <dt className="flex flex-col">
                <span className="mono text-[13px] text-wheat">{u}</span>
                <span className="text-[13px] text-paper/70">{d}</span>
              </dt>
              <dd className="font-serif text-[48px] font-bold leading-none text-paper sm:text-[56px]"><CountUp value={n} /></dd>
            </div>
          ))}
        </dl>
        <ol className="pipeline reveal data flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-paper/70" data-delay="2" aria-label="What happens to the photos">
          {pipeline.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="step flex items-center gap-2 whitespace-nowrap rounded-full border bg-night/60 px-3 py-1.5" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
                <span className="dot h-1.5 w-1.5 rounded-full" />{step}
              </span>
              {i < pipeline.length - 1 && <span className="h-px w-5 bg-paper/25" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
