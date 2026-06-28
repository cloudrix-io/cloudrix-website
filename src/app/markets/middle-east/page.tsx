import { Metadata } from "next";
import { MarketHubPage } from "@/components/pages/market-hub-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for the Middle East - Digital Transformation",
  description:
    "Enterprise cloud architecture, AI solutions, and digital transformation for the Middle East. DIFC compliance, Vision 2030, smart city infrastructure. AED, SAR, QAR pricing available.",
  openGraph: {
    title: "Cloud & AI Engineering for the Middle East",
    description:
      "Digital transformation, smart city infrastructure, and cloud engineering for the Middle East. DIFC, Vision 2030, and regulatory expertise.",
    url: "https://www.cloudrix.io/markets/middle-east",
    images: [
      {
        url: "/og?title=Middle%20East%20Cloud%20Engineering&subtitle=Digital%20Transformation%20%7C%20Smart%20City",
        width: 1200,
        height: 630,
        alt: "Cloudrix Middle East",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/middle-east",
  },
};

export default function MiddleEastMarketPage() {
  return (
    <MarketHubPage
      data={{
        title: "Cloud & AI Solutions for the Middle East",
        subtitle: "Powering the Region's Digital Transformation",
        description:
          "The Middle East is undergoing the most ambitious digital transformation in history. From the UAE's smart city initiatives to Saudi Arabia's Vision 2030 and Qatar's National Vision, Cloudrix delivers the enterprise-grade cloud architecture and AI solutions that power this revolution. Our European engineering heritage provides the quality, security, and data governance standards that the region's regulated industries demand.",
        basePath: "/markets",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Middle East", url: "/markets/middle-east" },
        ],
        regions: [
          {
            name: "United Arab Emirates",
            slug: "uae",
            highlight: "DIFC, Smart City, Fintech Hub",
            description:
              "Enterprise cloud solutions for the UAE's diverse economy. From DIFC-regulated financial services to Abu Dhabi's energy sector, we build infrastructure that meets UAE data sovereignty requirements and supports the nation's AI strategy.",
            countries: [
              { name: "Dubai", slug: "uae/dubai" },
            ],
          },
          {
            name: "Saudi Arabia",
            slug: "saudi-arabia",
            highlight: "Vision 2030, NEOM, Digital Government",
            description:
              "Supporting Saudi Arabia's Vision 2030 with cloud-native platforms, AI integration, and digital government solutions. NCA compliance, local data residency, and Saudization-ready technology partnerships.",
          },
          {
            name: "Qatar",
            slug: "qatar",
            highlight: "Qatar National Vision 2030, QFCA",
            description:
              "Cloud engineering for Qatar's smart nation ambitions. Financial sector compliance, energy analytics, and digital infrastructure for the Qatar National Vision 2030 programs.",
          },
        ],
      }}
    />
  );
}
