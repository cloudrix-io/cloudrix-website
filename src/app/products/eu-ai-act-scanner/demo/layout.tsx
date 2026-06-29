import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Compliance Scanner Demo - Free Risk Assessment Tool",
  description:
    "Instantly assess your AI system's EU AI Act compliance. Get risk classification, requirements, action items, and a compliance timeline. Free tool by Cloudrix.",
  openGraph: {
    title: "EU AI Act Compliance Scanner",
    description:
      "Free AI-powered tool to assess EU AI Act compliance. Get instant risk classification and a detailed compliance roadmap.",
    url: "https://www.cloudrix.io/products/eu-ai-act-scanner/demo",
    type: "website",
    images: [
      {
        url: "/og?title=EU%20AI%20Act%20Compliance%20Scanner&subtitle=Free%20Risk%20Assessment%20Tool&type=product",
        width: 1200,
        height: 630,
        alt: "EU AI Act Compliance Scanner by Cloudrix",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/eu-ai-act-scanner/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
