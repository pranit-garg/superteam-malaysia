import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Superteam Malaysia",
    "Solana Malaysia",
    "Web3 Malaysia",
    "Solana Builders",
    "Crypto Malaysia",
    "Blockchain Malaysia",
    "Solana Ecosystem",
  ],
  authors: [{ name: "Superteam Malaysia" }],
  creator: "Superteam Malaysia",
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SuperteamMY",
    creator: "@SuperteamMY",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://superteammy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-bg text-text`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-bg focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Superteam Malaysia",
              "url": "https://superteammy.com",
              "logo": "https://superteammy.com/opengraph-image",
              "description": "Superteam Malaysia is the local chapter of the global Superteam network, empowering builders, creators, and talent in the Solana ecosystem.",
              "sameAs": [
                "https://x.com/SuperteamMY",
                "https://t.me/SuperteamMY",
                "https://lu.ma/mysuperteam"
              ]
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
