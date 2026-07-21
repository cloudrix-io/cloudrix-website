import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Header, Footer } from "@/components/layout";
import { ExitIntentPopup, SocialProofNotification, AiChatWidget, ToolsBanner } from "@/components/ui";
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
    default: "Cloudrix | AI & IT Products for Modern Businesses",
    template: "%s | Cloudrix",
  },
  description:
    "24 AI-powered SaaS products for monitoring, security, compliance, and automation. API Monitor, CodeScan AI, EU AI Act Scanner, StatusPage, and more. Free tiers available.",
  keywords: [
    // Product keywords
    "AI SaaS products",
    "API monitoring tool",
    "AI code review",
    "EU AI Act scanner",
    "status page tool",
    "cloud cost calculator",
    "SaaS platform",
    "AI-powered tools",
    "IT products",
    "business automation tools",
    // AI keywords
    "AI agent development",
    "RAG system development",
    "EU AI Act compliance",
    "LLM integration",
    "AI infrastructure",
    // Primary keywords
    "cloud architecture",
    "software engineering",
    "DevOps consulting",
    "full-stack development",
    // Location-based
    "AI products Netherlands",
    "SaaS tools Europe",
    "cloud services Europe",
    // Technology
    "LangChain development",
    "Claude API integration",
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
    title: "Cloudrix | AI & IT Products for Modern Businesses",
    description:
      "24 AI-powered SaaS products for monitoring, security, compliance, and automation. Free tiers available. Enterprise services by request.",
    images: [
      {
        url: "/og?title=AI%20%26%20IT%20Products&subtitle=24%20production-ready%20tools%20for%20modern%20businesses",
        width: 1200,
        height: 630,
        alt: "Cloudrix - AI & IT Products for Modern Businesses",
      },
    ],
    countryName: "Netherlands",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cloudrix",
    creator: "@cloudrix",
    title: "Cloudrix | AI & IT Products for Modern Businesses",
    description:
      "24 AI-powered SaaS products for monitoring, security, compliance, and automation. Free tiers available. Enterprise services by request.",
    images: {
      url: "/og?title=AI%20%26%20IT%20Products&subtitle=24%20production-ready%20tools%20for%20modern%20businesses",
      alt: "Cloudrix - AI & IT Products",
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
      "fr-FR": "https://www.cloudrix.io",
    },
  },
  verification: {
    google: "yLFs8c8ih-DGSoMVIyIIQqRzopdgH2GbTZM9OF1V1wg",
    // yandex: "your-yandex-verification-code",
    // TODO: Configure Bing Webmaster Tools verification at https://www.bing.com/webmasters
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
        {/* Cloudrix Analytics — custom tracking across all products */}
        <script
          src="https://analytics.cloudrix.io/sdk.js"
          data-product="website"
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <ToolsBanner />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ExitIntentPopup />
          <SocialProofNotification />
          <AiChatWidget />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
