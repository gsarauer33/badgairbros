"use client";

import { useEffect, useState } from "react";
import { BadgairMark } from "./marks";

/* Four entries. "How it works" is the scroll scene you meet anyway; "Contact" is the button. */
const SECTIONS = [
  ["mapping", "Mapping"],
  ["acrefile", "Acrefile"],
  ["listen", "Listen"],
  ["about", "About"],
] as const;

/** Sticky nav: turns to frosted paper once you scroll, underlines the section in view, and draws a
 *  thin moss progress line along the top edge. */
export default function SiteNav({ name, mailto }: { name: string; mailto: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${scrolled ? "border-b border-line bg-paper/80 shadow-[0_10px_30px_-24px_rgba(31,42,31,0.5)] backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}>
      <span className="absolute left-0 top-0 h-[2px] bg-moss transition-[width] duration-150" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="transition-transform duration-500 group-hover:-translate-y-0.5"><BadgairMark size={44} /></span>
          <span className="font-serif text-[22px] font-semibold tracking-[-0.01em]">{name}</span>
        </a>
        <nav className="hidden items-center gap-7 text-[14px] text-ink-muted md:flex" aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`relative py-1 transition-colors hover:text-ink ${active === id ? "text-ink" : ""}`}>
              {label}
              <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-wheat transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
            </a>
          ))}
        </nav>
        <a href={mailto} className="flex h-10 items-center rounded-full bg-ink px-4 text-[14px] font-medium text-paper transition-colors duration-300 hover:bg-moss">Book a flight</a>
      </div>
    </header>
  );
}
