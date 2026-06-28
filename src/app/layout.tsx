import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Header, Footer } from "@/components/layout";
import { ExitIntentPopup, SocialProofNotification } from "@/components/ui";
import { LanguageProvider } from "@/contexts/language-context";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cloudrix.io"),
  title: {
    default: "Cloudrix | Cloud & Software Engineering for EU Companies",
    template: "%s | Cloudrix",
  },
  description:
    "Senior engineering teams for European companies. Cloud architecture, product development, and DevOps. 47 projects delivered, 94% client retention. Book a free consultation.",
  keywords: [
    // Primary keywords
    "cloud architecture",
    "software engineering",
    "DevOps consulting",
    "AWS consulting",
    "full-stack development",
    // Location-based
    "software development EU",
    "cloud services Europe",
    "engineering team Netherlands",
    // Service-specific
    "Kubernetes consulting",
    "cloud migration services",
    "technical due diligence",
    "legacy modernization",
    // Technology
    "React development",
    "Node.js development",
    "Next.js agency",
    "Python development",
    // Industry
    "FinTech development",
    "healthcare software",
    "SaaS development",
    "e-commerce development",
  ],
  authors: [{ name: "Cloudrix", url: "https://www.cloudrix.io" }],
  creator: "Cloudrix",
  publisher: "Cloudrix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: [],
    url: "https://www.cloudrix.io",
    siteName: "Cloudrix",
    title: "Cloudrix | Cloud & Software Engineering for EU Companies",
    description:
      "Senior engineering teams for European companies. Cloud architecture, product development, and DevOps. 47 projects delivered. Book a free consultation.",
    images: [
      {
        url: "/og?title=Cloud%20%26%20Software%20Engineering&subtitle=Senior%20engineering%20teams%20for%20European%20companies",
        width: 1200,
        height: 630,
        alt: "Cloudrix - Cloud & Software Engineering for EU Companies",
      },
    ],
    countryName: "Netherlands",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cloudrix",
    creator: "@cloudrix",
    title: "Cloudrix | Cloud & Software Engineering for EU Companies",
    description:
      "Senior engineering teams for European companies. Cloud architecture, product development, and DevOps. 47 projects delivered.",
    images: {
      url: "/og?title=Cloud%20%26%20Software%20Engineering&subtitle=Senior%20engineering%20teams%20for%20European%20companies",
      alt: "Cloudrix - Cloud & Software Engineering",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.cloudrix.io",
    languages: {
      "en-US": "https://www.cloudrix.io",
    },
  },
  verification: {
    google: "yLFs8c8ih-DGSoMVIyIIQqRzopdgH2GbTZM9OF1V1wg",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  appleWebApp: {
    capable: true,
    title: "Cloudrix",
    statusBarStyle: "default",
  },
  appLinks: {
    web: {
      url: "https://www.cloudrix.io",
      should_fallback: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3WL9275XNR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3WL9275XNR');
          `}
        </Script>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ExitIntentPopup />
          <SocialProofNotification />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
