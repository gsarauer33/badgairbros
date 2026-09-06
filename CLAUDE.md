@AGENTS.md

# badgairbros.com

The company site for **Badgair Bros LLC** (Garrett and Justin Sarauer, Bloomer, Wisconsin): drone field mapping, the front door to Acrefile (separate repo, https://acrefile.com), the Road to 400 podcast, and a grains-and-weather page. Next.js 16 App Router, Tailwind 4, no database. Live at https://badgairbros.com on Vercel (team `badgair-bros`, project `badgairbros`); `main` auto-deploys.

- **Two live upstreams, both hourly ISR with a 6 s timeout and a rendered fallback:** the podcast RSS feed (`src/lib/podcast.ts`) and Open-Meteo for the ten-day Bloomer forecast (`src/lib/weather.ts`). The build never fails on either.
- **Facts live in `src/lib/site.ts`:** contact, podcast links, the elevator and the forecast point (`site.grains`), and the latest flight's numbers (`site.flight`). Every number the site states about the flight reads from there; do not hardcode a second copy.
- **Routes:** `/` (hero, pinned scroll scene, Acrefile, slider, how it works, latest flight in numbers, Listen, About, contact) and `/grains` (link to CDR Farms' own bid page, which is Barchart-hosted and cannot be embedded or scraped; the forecast with rain and corn heat units). `sitemap.ts`, `robots.ts`, `opengraph-image.jpg` (cut from the H-3 ortho).
- **The scroll scene** (`src/components/scrolly.tsx`) uses `public/h3-field.jpg`: the full H-3 orthomosaic of 6 Sep 2026 clipped to the AgFiniti boundary with soft edges. The flight path is the real one from the photo GPS and the planned waypoints; the hotspots sit on real patches. Regenerate the image and constants with the Acrefile scratch scripts when a better flight exists. Under `prefers-reduced-motion` the scene is not pinned and shows its finished state.
- **The slider** still compares the 2 Sep corner test against satellite on purpose (Garrett, 2026-09-06); swap when the Mavic 3M arrives.
- Design: paper, ink, moss, wheat as the single accent, `night` for the dark bands; Source Serif 4 display, Geist body, Geist Mono labels. `--ink-faint` is 0.68 alpha for contrast; keep small labels at or above that.
- Pricing wording: no numbers, "ask us for a quote" (Garrett, 2026-09-05). Part 107 is still in progress; the About line says so.
- Open on Garrett: soften "Book a flight" until Part 107; shrink the empty Listen band; people photos; Apple/Spotify links once an episode exists.

`npm run dev -- --port 3001` · `npm run build` · `npm run lint`. Sweep record: `docs/audit-2026-09-06.md`.
