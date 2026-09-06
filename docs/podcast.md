# The podcast on RSS.com (groundwork, 2026-09-05)

Garrett chose to explore RSS.com's free "Local & Niche" plan. Claude cannot create the account; this is what the sign-up asks for and what is ready.

## What RSS.com asks at sign-up
1. **Account**: sign up at https://dashboard.rss.com/auth/sign-up/ with office@badgairbros.com (live since 2026-09-05, forwards to badgairbros@gmail.com) and a password. Free plan: one show, unlimited episodes, no inserted ads, 90 days of analytics, one-click submission to Apple Podcasts, Spotify, Amazon, and the rest.
2. **Show name** (pick one; candidates below), **description** (≤ 4,000 characters; the blurb in `src/lib/site.ts` is a start), **category** (Science → Earth Sciences, or Business → Entrepreneurship; most farm shows sit under "Science"), **language** English, **explicit** no.
3. **Cover art**: square PNG or JPEG, 3000 × 3000 px, under 512 KB, RGB. Draft at `docs/brand/podcast-cover.png` ("Road to 400" with the mark on paper, 311 KB); already uploaded to RSS.com. Redo the mark if Garrett picks a different candidate.
4. **First episode**: MP3, mono is fine, 96–128 kbps. Recording on two phones in the truck is enough for episode one; buy nothing until three episodes exist.

## Name: **Road to 400** (working title, Garrett 2026-09-05)
Justin's goal is 400-bushel corn on a small farm. The show is the road there: timing, plant biology and chemistry, nutrients at the critical moments, and the acre math (what a pass costs per acre against the bushels it returns). Alternates kept in case: Ground Truth, The Home Farm, Your Call, The Acre Math.

### Descriptions (pick a length; RSS.com shows the short one in lists)
- **One line:** Two brothers chasing 400-bushel corn on a small Wisconsin farm. Timing, plant biology, and what a dollar an acre actually buys in bushels.
- **Short (≈ 60 words):** Road to 400 is two brothers on the home farm outside Bloomer, Wisconsin, working toward 400-bushel corn without the biggest equipment on the road. Each month: what the crop is doing right now, which nutrient matters this week and why, and the acre math on every pass, herbicide, fungicide or foliar, in dollars per acre against bushels per acre. No sales pitch.
- **Long (≈ 140 words):** Most farms in the Chippewa Valley are not big. Road to 400 starts from that: you cannot buy your way to yield, but you can out-think the calendar. Justin farms the ground and keeps the books; Garrett flies the drone and builds Acrefile, the grower-owned field record. Twenty minutes a month on what the plant needs at each stage, the soil and tissue numbers behind it, when a pass pays and when it does not, and what the two of them actually did on H-3 that week. Guests when it helps: the agronomist who signs the plan, the lab, the neighbor who tried it first. Numbers, not slogans; a spreadsheet, not a sponsor. The goal is 400 bushels. The point is every acre a small farmer already has.

### Recurring segments (so episodes write themselves)
- **The Acre Math**: one pass, its cost per acre, the bushels it needs to return, and whether it did. Justin's price-per-acre habit as a segment.
- **What the plant wants this week**: growth stage, the nutrient that matters, the window to apply it.
- **From the file**: one number from H-3's record (soil, tissue, yield) and what it changed.
- **Your call**: the decision the listener faces next; ends the episode.

### First three episodes
1. Why 400, and why a small farm can get there (the thesis; the equipment myth; the calendar).
2. The six numbers on a soil test that matter, in words (pH, OM, P, K, CEC, S; what H-3 says).
3. A pass that paid and one that didn't: the acre math on last season's herbicide and fungicide.

## Wiring it into the site (state on 2026-09-06)
`site.podcast.name`, `feed` and `rsscom` are set; the Listen band is live and reads the feed hourly. With no episodes yet it shows one "first episode coming soon" box. `apple` and `spotify` stay null until an episode exists: RSS.com's one-click distribution cannot submit an empty show. Once the first MP3 is up, submit through RSS.com, paste the two URLs into `site.ts`, and the chips appear.

## Later
- The free plan's own show page (`rss.com/podcasts/<slug>`) is fine as the canonical player; embed on the site only if wanted.
- If downloads ever pass what a free plan should carry, RSS.com's All-in-One is $11.99/mo; Transistor ($19/mo) is the step up after that.
