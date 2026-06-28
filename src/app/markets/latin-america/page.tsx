import { Metadata } from "next";
import { MarketHubPage } from "@/components/pages/market-hub-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Latin America - Fintech, Nearshore & LGPD",
  description:
    "Enterprise cloud architecture, fintech platforms, and AI solutions for Latin American companies. Brazil LGPD compliance, nearshore collaboration, regional pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Latin America",
    description:
      "Cloud and AI solutions for Latin America. Fintech, nearshore development, and LGPD compliance for Brazil and Mexico.",
    url: "https://www.cloudrix.io/markets/latin-america",
    images: [
      {
        url: "/og?title=Latin%20America%20Cloud%20Engineering&subtitle=Fintech%20%7C%20Nearshore%20%7C%20LGPD",
        width: 1200,
        height: 630,
        alt: "Cloudrix Latin America",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/latin-america",
  },
};

export default function LatinAmericaMarketPage() {
  return (
    <MarketHubPage
      data={{
        title: "Cloud & AI Solutions for Latin America",
        subtitle: "Powering LATAM's Digital Transformation",
        description:
          "Latin America is experiencing a fintech revolution, manufacturing renaissance, and digital transformation that requires world-class engineering. From Brazil's booming startup ecosystem to Mexico's nearshore manufacturing powerhouse, Cloudrix delivers enterprise-grade cloud architecture, AI integration, and regulatory-compliant platforms tailored to each market.",
        basePath: "/markets",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Latin America", url: "/markets/latin-america" },
        ],
        regions: [
          {
            name: "Brazil",
            slug: "brazil",
            highlight: "LGPD, Fintech Boom, Pix Payments",
            description:
              "Cloud solutions for Brazil's massive fintech and technology ecosystem. LGPD compliance, Pix payment integration, and scalable platforms for Latin America's largest economy.",
          },
          {
            name: "Mexico",
            slug: "mexico",
            highlight: "Manufacturing, Nearshore, LFPDPPP",
            description:
              "Cloud engineering for Mexico's manufacturing sector, nearshore technology operations, and growing startup ecosystem. LFPDPPP compliance and CST overlap.",
          },
        ],
      }}
    />
  );
}
