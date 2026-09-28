import Image from "next/image";
import { site } from "@/lib/site";
import { Arrow } from "@/components/marks";

/**
 * A slow pass over H-3, standing in for a fly-over video until the Part 107 certificate lets us
 * film one for the business. The image is the interior of the 6 Sep orthomosaic
 * (public/h3-flyover.jpg); the pan is CSS (globals.css, .flyover-pan) and holds still under
 * reduced motion.
 */
export default function Flyover({ mailto }: { mailto: string }) {
  const F = site.flight;
  return (
    <section aria-labelledby="flyover-title" className="relative z-10 overflow-hidden bg-night text-paper">
      {/* The picture holds the right of the band at about its own size (the crop is 980 px wide),
          so it stays sharp; on a phone it runs full width behind a darker wash. */}
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[62%]" aria-hidden="true">
        <div className="flyover-pan absolute inset-0">
          <Image src="/h3-flyover.jpg" alt="" fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[rgba(19,28,22,0.55)] lg:bg-[linear-gradient(90deg,rgba(19,28,22,1)_0%,rgba(19,28,22,0.35)_28%,rgba(19,28,22,0)_60%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[460px] max-w-[1280px] flex-col justify-center gap-5 px-5 py-16 sm:px-8 lg:min-h-[540px] lg:py-20 lg:[&>*]:max-w-[44%]">
        <p className="data text-[12px] text-wheat">{F.field} · {F.altitudeMetres} m up · {F.flown}</p>
        <h2 id="flyover-title" className="max-w-[640px] font-serif text-[clamp(38px,5vw,60px)] font-bold leading-[1.02] tracking-[-0.015em]">
          Your field, from a hundred metres up.
        </h2>
        <p className="max-w-[480px] text-[17px] leading-[1.5] text-paper/85">
          A slow pass over {F.field.split(" ·")[0]} from our {F.flown} flight: the contour strips, the brown patches worth walking, the lane. Ask about a flight and yours is filed to your record the same way.
        </p>
        <a href={mailto} className="group flex h-[52px] w-fit items-center gap-2.5 rounded-full bg-paper px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-wheat-soft">
          Ask about a flight <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
