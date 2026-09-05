# The podcast on RSS.com (groundwork, 2026-09-05)

Garrett chose to explore RSS.com's free "Local & Niche" plan. Claude cannot create the account; this is what the sign-up asks for and what is ready.

## What RSS.com asks at sign-up
1. **Account**: email (use office@badgairbros.com once the forwarder is verified, otherwise badgairbros@gmail.com) and a password. Free plan: one show, unlimited episodes, no inserted ads, 90 days of analytics, one-click submission to Apple Podcasts, Spotify, Amazon, and the rest.
2. **Show name** (pick one; candidates below), **description** (≤ 4,000 characters; the blurb in `src/lib/site.ts` is a start), **category** (Science → Earth Sciences, or Business → Entrepreneurship; most farm shows sit under "Science"), **language** English, **explicit** no.
3. **Cover art**: square PNG or JPEG, 3000 × 3000 px, under 512 KB, RGB. Draft at `public/podcast-cover.png` (the Badgair mark on paper with the show name to be added once chosen).
4. **First episode**: MP3, mono is fine, 96–128 kbps. Recording on two phones in the truck is enough for episode one; buy nothing until three episodes exist.

## Name candidates (three beats, like the motto)
- **The Home Farm** — plain, ownable, ties to the site copy ("two brothers, one farm").
- **Ground Truth** — the mapping term for checking a map against the field; says what the show does.
- **Your Call** — the last beat of the motto; each episode ends with what the grower decides.
- **Bloomer Ground** — local first; ages well if the show stays regional.

## Wiring it into the site
Set `site.podcast.name`, `feed` (RSS.com gives `https://media.rss.com/<slug>/feed.xml`), `apple`, `spotify`, and `rsscom` in `src/lib/site.ts`. The Listen band appears on the next deploy and lists the four latest episodes from the feed, refreshed hourly. Acrefile stays out of it (Garrett, 2026-09-05).

## Later
- The free plan's own show page (`rss.com/podcasts/<slug>`) is fine as the canonical player; embed on the site only if wanted.
- If downloads ever pass what a free plan should carry, RSS.com's All-in-One is $11.99/mo; Transistor ($19/mo) is the step up after that.
