import type { Metadata } from "next";
import { Besley, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Type (Garrett, 2026-09-28): Besley for headings and headline numbers, Public Sans for body and UI,
// IBM Plex Mono only for real data (field labels, source and resolution). All three are SIL OFL.
const serif = Besley({ variable: "--font-besley", subsets: ["latin"], style: ["normal", "italic"], weight: "variable" });
const sans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin"], style: ["normal", "italic"], weight: "variable" });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: `${site.name} · ${site.tagline}`,
  description: `Drone field mapping and Acrefile, the grower-owned field record, for the farms of ${site.region}. We fly it, your agronomist signs it, and the file is yours for good.`,
  metadataBase: new URL("https://badgairbros.com"),
  alternates: { canonical: "/" },
  openGraph: { title: `${site.name} · ${site.tagline}`, description: `Drone field mapping and a grower-owned field record for ${site.region}.`, type: "website", locale: "en_US", url: "/" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <noscript><style>{`.reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
