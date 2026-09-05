@AGENTS.md

# badgairbros.com

The company site for **Badgair Bros LLC** (Garrett and Justin Sarauer, Chippewa Falls, Wisconsin): drone field mapping and the front door to Acrefile (separate repo, https://acrefile.com). Static Next.js 16 App Router site, Tailwind 4, no database, deployed on Vercel (team `badgair-bros`, project `badgairbros`).

- All copy and contact facts live in `src/lib/site.ts`. Fill `email` / `phone` and the two `photo` paths there; nothing else needs touching for those.
- Design: same tokens as Acrefile pushed harder (paper, ink, moss, wheat as the single accent, `night` for the dark band); Source Serif 4 display, Geist body, Geist Mono labels. Motion is CSS only and respects `prefers-reduced-motion`.
- Hero image `public/h3-ortho.jpg` is the real H-3 orthomosaic (2 Sep 2026) rendered from the Acrefile worker run; the flight path drawn over it is illustrative.
- Podcast section deliberately not built yet (Garrett, 2026-09-05): it lands here later, not in Acrefile.
- Domain `badgairbros.com` is in Cloudflare; attach it to the Vercel project only when Garrett says go.

`npm run dev -- --port 3001` · `npm run build` · `npm run lint`.
