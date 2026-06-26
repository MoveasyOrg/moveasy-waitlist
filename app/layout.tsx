import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://moveasy.africa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Moveasy | Movement Made Easy",
  description:
    "WhatsApp-native ride-hailing for Nigeria. Book rides, plan trips, and split fares from a chat. Born in Akwa. Built for Africa.",
  keywords: [
    "Moveasy",
    "ride hailing Nigeria",
    "WhatsApp ride booking",
    "Anambra transport",
    "African mobility",
    "Awka rides",
  ],
  authors: [{ name: "Moveasy" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Moveasy",
    title: "Moveasy | Movement Made Easy",
    description:
      "Book a ride from WhatsApp. Built for how Africa actually moves.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moveasy | Movement Made Easy",
    description:
      "WhatsApp-native ride-hailing for Nigeria. Born in Akwa. Built for Africa.",
    creator: "@moveasyhq",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B123B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Moveasy",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.svg`,
    foundingLocation: "Awka, Anambra, Nigeria",
    sameAs: [
      "https://x.com/moveasyhq",
      "https://github.com/moveasyhq",
    ],
  };
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Moveasy",
    brand: { "@type": "Brand", name: "Moveasy" },
    description:
      "WhatsApp-native ride booking and mobility planning for Nigeria.",
    category: "Transportation",
    audience: {
      "@type": "Audience",
      geographicArea: { "@type": "Country", name: "Nigeria" },
    },
  };

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      </body>
    </html>
  );
}
