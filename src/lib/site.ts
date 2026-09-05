/**
 * The few facts the site needs. Contact values are shown only when set; fill them in
 * before the domain is attached. Photos: drop files into /public/people and set the paths.
 */
export const site = {
  name: "Badgair Bros",
  legal: "Badgair Bros LLC",
  tagline: "Your ground. Your data. Your call.",
  place: "Chippewa Falls, Wisconsin",
  region: "the Chippewa Valley",
  /** Proposed: hello@badgairbros.com forwarded through Cloudflare Email Routing (free). Set null to hide. */
  email: "hello@badgairbros.com" as string | null,
  /** Shown as typed. Set null to hide until decided. */
  phone: null as string | null,
  acrefileUrl: "https://acrefile.com",
  people: [
    { initial: "G", name: "Garrett Sarauer", role: "Builds Acrefile. Flies the drone. Remote pilot, Part 107 in progress.", photo: null as string | null },
    { initial: "J", name: "Justin Sarauer", role: "Farms the ground. Runs Sarauer Farms. The one who tells us when a map is wrong.", photo: null as string | null },
  ],
  /** The hero flight: real numbers from the first capture. */
  flight: { field: "H-3 · Home Farm", flown: "2 Sep 2026", gsd: "5 cm / pixel", photos: 35, minutes: 9 },
};
