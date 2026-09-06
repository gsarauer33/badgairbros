import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://badgairbros.com";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/grains`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ];
}
