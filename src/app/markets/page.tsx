import { Metadata } from "next";
import { MarketHubPage } from "@/components/pages/market-hub-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Global Markets - Cloud & AI Solutions Worldwide",
  description:
    "Cloudrix delivers cloud architecture, AI integration, and software engineering across the US, Middle East, Asia-Pacific, Africa, Latin America, and Europe. Find solutions tailored to your region.",
  openGraph: {
    title: "Global Markets - Cloud & AI Solutions Worldwide",
    description:
      "Cloudrix delivers cloud architecture, AI integration, and software engineering across the US, Middle East, Asia-Pacific, Africa, Latin America, and Europe.",
    url: "https://www.cloudrix.io/markets",
    images: [
      {
        url: "/og?title=Global%20Markets&subtitle=Cloud%20%26%20AI%20Solutions%20Worldwide",
        width: 1200,
        height: 630,
        alt: "Cloudrix Global Markets",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets",
  },
};

export default function MarketsPage() {
  return (
    <MarketHubPage
      data={{
        title: "Cloud & AI Solutions for Every Market",
        subtitle: "Global Reach, Local Expertise",
        description:
          "From Silicon Valley to Dubai, Singapore to Sao Paulo, we deliver enterprise-grade cloud architecture, AI integration, and full-stack engineering tailored to your region's regulatory landscape, business culture, and technical requirements.",
        basePath: "/markets",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
        ],
        regions: [
          {
            name: "United States",
            slug: "us",
            highlight: "SOC 2, HIPAA, FedRAMP Expertise",
            description:
              "Full-service cloud engineering for US companies. USD pricing, EST/PST overlap hours, and deep compliance expertise across SOC 2, HIPAA, and FedRAMP frameworks.",
            countries: [
              { name: "New York", slug: "us/new-york" },
              { name: "San Francisco", slug: "us/san-francisco" },
              { name: "Austin", slug: "us/austin" },
              { name: "Boston", slug: "us/boston" },
            ],
          },
          {
            name: "Middle East",
            slug: "middle-east",
            highlight: "DIFC, Vision 2030, Smart City",
            description:
              "Supporting the Middle East's digital transformation with cloud-native solutions. From Dubai's fintech hubs to Saudi Arabia's giga-projects, we build infrastructure for the future.",
            countries: [
              { name: "UAE", slug: "uae" },
              { name: "Saudi Arabia", slug: "saudi-arabia" },
              { name: "Qatar", slug: "qatar" },
            ],
          },
          {
            name: "Asia-Pacific",
            slug: "asia-pacific",
            highlight: "PDPA, Smart Nation, Industry 4.0",
            description:
              "Scalable solutions for Asia-Pacific's fastest-growing economies. From Singapore's Smart Nation initiative to Japan's manufacturing innovation and Australia's resource sector.",
            countries: [
              { name: "Singapore", slug: "singapore" },
              { name: "Australia", slug: "australia" },
              { name: "Japan", slug: "japan" },
              { name: "South Korea", slug: "south-korea" },
            ],
          },
          {
            name: "Africa",
            slug: "africa",
            highlight: "Fintech, Mobile-First, Silicon Savannah",
            description:
              "Powering Africa's technology revolution with mobile-first architectures, fintech platforms, and scalable cloud infrastructure designed for high-growth markets.",
            countries: [
              { name: "Nigeria", slug: "nigeria" },
              { name: "Kenya", slug: "kenya" },
              { name: "South Africa", slug: "south-africa" },
            ],
          },
          {
            name: "Latin America",
            slug: "latin-america",
            highlight: "LGPD, Nearshore, Fintech Boom",
            description:
              "Cloud solutions for Latin America's booming tech ecosystem. LGPD compliance, nearshore development support, and fintech infrastructure for the region's digital revolution.",
            countries: [
              { name: "Brazil", slug: "brazil" },
              { name: "Mexico", slug: "mexico" },
            ],
          },
          {
            name: "United Kingdom",
            slug: "uk",
            highlight: "Post-Brexit, FCA, London Tech",
            description:
              "Enterprise cloud solutions for the UK market. Deep understanding of post-Brexit regulatory requirements, FCA compliance, and London's thriving tech ecosystem.",
          },
          {
            name: "Germany",
            slug: "germany",
            highlight: "DSGVO, Industry 4.0, Mittelstand",
            description:
              "Cloud modernization for Germany's Mittelstand and enterprise sector. Full DSGVO compliance, Industry 4.0 integration, and infrastructure built on European data sovereignty principles.",
          },
        ],
      }}
    />
  );
}
