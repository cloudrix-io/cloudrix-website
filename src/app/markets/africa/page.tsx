import { Metadata } from "next";
import { MarketHubPage } from "@/components/pages/market-hub-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Africa - Fintech, Mobile-First & Innovation",
  description:
    "Enterprise cloud architecture, fintech platforms, and mobile-first solutions for Africa's fastest-growing tech markets. Nigeria, Kenya, South Africa. Regional pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Africa",
    description:
      "Cloud and AI solutions for Africa's tech revolution. Fintech, mobile-first, and scalable platforms for Nigeria, Kenya, and South Africa.",
    url: "https://www.cloudrix.io/markets/africa",
    images: [
      {
        url: "/og?title=Africa%20Cloud%20Engineering&subtitle=Fintech%20%7C%20Mobile-First%20%7C%20Innovation",
        width: 1200,
        height: 630,
        alt: "Cloudrix Africa",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/africa",
  },
};

export default function AfricaMarketPage() {
  return (
    <MarketHubPage
      data={{
        title: "Cloud & AI Solutions for Africa's Tech Revolution",
        subtitle: "Powering Africa's Digital Transformation",
        description:
          "Africa is the world's fastest-growing technology market. With over 700 million mobile internet users, the continent is leapfrogging traditional infrastructure to build mobile-first fintech, agritech, and healthtech platforms. Cloudrix delivers the scalable cloud architecture, AI capabilities, and mobile-first engineering that African tech companies need to serve hundreds of millions of users across diverse networks and devices.",
        basePath: "/markets",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Africa", url: "/markets/africa" },
        ],
        regions: [
          {
            name: "Nigeria",
            slug: "nigeria",
            highlight: "Fintech Capital, Payments, NDPR",
            description:
              "Cloud solutions for Nigeria's booming fintech and payments ecosystem. NDPR compliance, mobile-first architecture, and platforms designed for Africa's largest economy.",
          },
          {
            name: "Kenya",
            slug: "kenya",
            highlight: "M-Pesa, Silicon Savannah, AgriTech",
            description:
              "Cloud engineering for Nairobi's Silicon Savannah. M-Pesa integration, mobile money platforms, and scalable infrastructure for East Africa's technology hub.",
          },
          {
            name: "South Africa",
            slug: "south-africa",
            highlight: "Enterprise, Mining, POPIA",
            description:
              "Enterprise cloud solutions for South Africa's established corporate sector. POPIA compliance, mining technology, and financial services platforms.",
          },
        ],
      }}
    />
  );
}
