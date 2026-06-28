import { Metadata } from "next";
import { MarketHubPage } from "@/components/pages/market-hub-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Asia-Pacific - Smart Nation & Industry 4.0",
  description:
    "Enterprise cloud architecture, AI solutions, and digital transformation for Asia-Pacific markets. Singapore PDPA, Japan APPI, Australia Privacy Act compliance. Regional pricing available.",
  openGraph: {
    title: "Cloud & AI Engineering for Asia-Pacific",
    description:
      "Cloud and AI solutions for APAC's fastest-growing economies. Smart Nation, Industry 4.0, and regulatory compliance expertise.",
    url: "https://www.cloudrix.io/markets/asia-pacific",
    images: [
      {
        url: "/og?title=Asia-Pacific%20Cloud%20Engineering&subtitle=Smart%20Nation%20%7C%20Industry%204.0",
        width: 1200,
        height: 630,
        alt: "Cloudrix Asia-Pacific",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/asia-pacific",
  },
};

export default function AsiaPacificMarketPage() {
  return (
    <MarketHubPage
      data={{
        title: "Cloud & AI Solutions for Asia-Pacific",
        subtitle: "Serving APAC's Fastest-Growing Tech Markets",
        description:
          "The Asia-Pacific region represents the world's most dynamic technology landscape, from Singapore's Smart Nation initiative to Japan's Society 5.0, South Korea's Digital New Deal, and Australia's resource sector digitization. Cloudrix delivers enterprise-grade cloud engineering and AI solutions tailored to each market's unique regulatory, cultural, and business requirements.",
        basePath: "/markets",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Asia-Pacific", url: "/markets/asia-pacific" },
        ],
        regions: [
          {
            name: "Singapore",
            slug: "singapore",
            highlight: "Smart Nation, PDPA, MAS Regulations",
            description:
              "Cloud solutions for Singapore's position as Asia's technology hub. PDPA compliance, MAS-regulated fintech platforms, and Smart Nation digital infrastructure.",
          },
          {
            name: "Australia",
            slug: "australia",
            highlight: "Mining Tech, Fintech, Healthcare",
            description:
              "Enterprise cloud engineering for Australia's mining, financial services, and healthcare sectors. Privacy Act compliance and AUD pricing.",
          },
          {
            name: "Japan",
            slug: "japan",
            highlight: "Manufacturing, Society 5.0, Automotive",
            description:
              "Cloud and AI solutions for Japan's manufacturing, automotive, and technology sectors. APPI compliance and Industry 4.0 integration.",
          },
          {
            name: "South Korea",
            slug: "south-korea",
            highlight: "Electronics, Gaming, Digital New Deal",
            description:
              "Cloud engineering for South Korea's electronics, gaming, and digital transformation initiatives. PIPA compliance and KRW pricing.",
          },
        ],
      }}
    />
  );
}
