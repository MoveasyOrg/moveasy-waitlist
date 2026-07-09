import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trymoveasy.vercel.app";

const TITLE = "Moveasy | Move anywhere, from WhatsApp";
const DESCRIPTION =
  "WhatsApp-native ride hailing for Nigeria. Book rides, plan trips, and split fares from a chat. No app to install, no data plan to burn.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Moveasy",
  keywords: [
    "Moveasy",
    "ride hailing Nigeria",
    "WhatsApp ride booking",
    "Anambra transport",
    "African mobility",
    "Awka rides",
  ],
  authors: [{ name: "Moveasy" }],
  creator: "Moveasy",
  publisher: "Moveasy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Moveasy",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    site: "@moveasyhq",
    creator: "@moveasyhq",
    title: TITLE,
    description: DESCRIPTION,
  },
  // Icons picked up automatically from app/icon.png + app/apple-icon.png
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
    <html lang="en" className={sans.variable}>
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
