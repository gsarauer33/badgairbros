import "server-only";

export type Episode = { title: string; date: string; minutes: number | null; url: string | null; audio: string | null; summary: string };

/** Read an RSS 2.0 podcast feed (RSS.com, Spotify, Transistor all emit it). Returns [] on any failure. */
export async function getEpisodes(feedUrl: string | null, limit = 4): Promise<Episode[]> {
  if (!feedUrl) return [];
  try {
    // Never let a slow feed hang a build: give up after 6 seconds and render "coming soon".
    const res = await fetch(feedUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split(/<item[\s>]/).slice(1, limit + 1);
    const pick = (s: string, tag: string) => {
      const m = s.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m ? m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim() : "";
    };
    return items.map((it) => {
      const dur = pick(it, "itunes:duration");
      const parts = dur.split(":").map(Number);
      const secs = parts.length === 1 ? parts[0] : parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0] * 3600 + parts[1] * 60 + parts[2];
      const enc = it.match(/<enclosure[^>]*url="([^"]+)"/i)?.[1] ?? null;
      return {
        title: pick(it, "title"),
        date: pick(it, "pubDate"),
        minutes: Number.isFinite(secs) && secs > 0 ? Math.round(secs / 60) : null,
        url: pick(it, "link") || null,
        audio: enc,
        summary: (pick(it, "itunes:summary") || pick(it, "description")).slice(0, 220),
      };
    });
  } catch {
    return [];
  }
}
