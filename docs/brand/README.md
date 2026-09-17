# Badgair Bros marks, print set (2026-09-17)

The mark is the one-line badger: low and long, nose to the ground, the drone over it. It lives in
code at `src/components/marks.tsx` (nav, footer, favicon) and on the Road to 400 cover. The files here
are the same drawing prepared for a print or embroidery shop. Nothing depends on a font: the wordmark is
Source Serif 4 Semibold outlined to paths (tracking -0.01em, no kerning pairs applied).

Every file comes as `.svg` (master), `.pdf` (vector, same size in px), and `.png` (3000 px wide,
transparent). `proof-sheet-2026-09-17.png` shows all of them on paper, night, and moss.

## Colours

| Name | Hex | Used for |
|---|---|---|
| Ink | `#1f2a1f` | the badger and the name on light garments |
| Paper | `#f7f3ea` | the badger and the name on dark garments |
| Rust | `#a8442c` | the nose, always, in both versions |
| Night | `#131c16` | the dark garment colour that matches the site |
| Moss | `#2f5d3a` | Acrefile's green; the one-colour paper mark sits on it |

Let the shop match thread and ink to the hex; do not accept "close to black" for Ink, it is a green-black.

## Files and where each goes

| File | Use |
|---|---|
| `badgair-mark-ink` / `-paper` | the full mark with the faint ground line; screen, paper print, stickers |
| `badgair-mark-embroidery-ink` / `-paper` | **hat front, polo left chest.** No ground line (too thin and semi-transparent to stitch), drone bars and nose thickened. Two threads: ink or paper, plus rust for the nose |
| `badgair-mark-one-color-ink` / `-paper` | one thread or one ink: no rust nose, no ground line |
| `badgair-lockup-horizontal-ink` / `-paper` | mark beside the name, as the site nav sets it; **t-shirt left chest** (print), hat back or sleeve at small size |
| `badgair-lockup-stacked-ink` / `-paper` | mark over the name, centred; **t-shirt front or back** (print) |

## Sizes that work

- **Hat, front:** embroidery mark alone, 2.75 in wide (about 1.7 in tall). Body stroke stitches at
  about 3 mm, drone bars at 1.9 mm, nose 3.8 mm across. Wordmark on the back arch, 2.5 in wide, if wanted:
  the letters stitch at about 7 mm cap height, which is the floor for a serif.
- **Polo, left chest:** embroidery mark alone, 3 in wide. The horizontal lockup at chest size puts
  the drone bars under 1 mm, which no digitizer will hold; keep the name off the chest or on the sleeve.
- **T-shirt, screen print:** stacked lockup 10 to 11 in wide on the front or back, horizontal lockup
  3.5 to 4 in wide at the left chest. Two colours (ink + rust) or one (the one-colour files).

## What to send the shop

The `.svg` or `.pdf` of the variant above, the hex table, and the size. If they ask for EPS or AI, the PDF
opens in Illustrator as vectors. For embroidery they will digitize from the vector; ask to see the
stitch-out on the actual hat before the run, and check the nose dot is a separate thread stop.

## Regenerating

`scripts/` has nothing for this on purpose: the drawing is in `marks.tsx`, the outlining needs
fontTools and the Source Serif 4 desktop OTF (Adobe, OFL), and the PDFs and PNGs come from Playwright.
Change the mark in `marks.tsx` first, then rebuild the set so the site and the print files never drift.
