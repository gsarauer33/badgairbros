import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"], weight: "variable", axes: ["opsz"] });

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${serif.variable}`}>
      <body>
        <noscript><style>{`.reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
