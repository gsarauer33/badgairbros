/**
 * The few facts the site needs. Contact values are shown only when set; fill them in
 * before the domain is attached. Photos: drop files into /public/people and set the paths.
 */
export const site = {
  name: "Badgair Bros",
  legal: "Badgair Bros LLC",
  tagline: "Your ground. Your data. Your call.",
  place: "Bloomer, Wisconsin",
  region: "the Chippewa Valley",
  /** Set null to hide. office@badgairbros.com can forward here through Cloudflare Email Routing. */
  email: "badgairbros@gmail.com" as string | null,
  /** Shown as typed. Set null to hide. */
  phone: "(715) 933-2112" as string | null,
  acrefileUrl: "https://acrefile.com",
  people: [
    { initial: "G", name: "Garrett Sarauer", role: "Builds Acrefile. Flies the drone. Remote pilot, Part 107 in progress.", photo: null as string | null },
    { initial: "J", name: "Justin Sarauer", role: "Farms the ground. Runs Sarauer Farms. The one who tells us when a map is wrong.", photo: null as string | null },
  ],
  /** Pricing wording (Garrett, 2026-09-05): no numbers; ask for a quote. */
  pricing: "Priced per acre, one number, the map is yours to keep. Ask us for a quote.",
  /** Podcast: fill in once the RSS.com show exists. The Listen section stays hidden while feed is null. */
  podcast: {
    /** Working title (Garrett, 2026-09-05): the road to 400-bushel corn on a small farm. */
    name: "Road to 400" as string | null,
    blurb: "Two brothers chasing 400-bushel corn on a small Wisconsin farm. Timing, plant biology, and what a dollar an acre actually buys in bushels. No sales pitch.",
    feed: "https://media.rss.com/road-to-400/feed.xml" as string | null,
    apple: null as string | null,
    spotify: null as string | null,
    rsscom: "https://rss.com/podcasts/road-to-400/" as string | null,
  },
  /** The hero flight: real numbers from the first capture. */
  flight: { field: "H-3 · Home Farm", flown: "2 Sep 2026", gsd: "5 cm / pixel", photos: 35, minutes: 9 },
};
