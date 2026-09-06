# badgairbros.com

Company site for Badgair Bros LLC: drone field mapping, the front door to Acrefile, the Road to 400 podcast, and a grains-and-weather page for Bloomer. Next.js 16 + Tailwind 4 on Vercel, two hourly fetches (podcast feed, Open-Meteo), no database.

```bash
npm install
npm run dev -- --port 3001   # http://localhost:3001
npm run lint
npm run build
```

Facts and links live in `src/lib/site.ts`. See `CLAUDE.md` for how the pages are built and `docs/audit-2026-09-06.md` for the last sweep.
