import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Architecture Generator Demo - Free Cloud Architecture Tool",
  description:
    "Describe your system requirements and get an AI-generated cloud architecture with components, cost estimates, scaling strategies, and security recommendations. Free tool by Cloudrix.",
  openGraph: {
    title: "AI Architecture Generator | Cloudrix",
    description:
      "Generate cloud architecture recommendations with cost estimates and scaling strategies. Supports AWS, GCP, and Azure. Free AI tool.",
    url: "https://www.cloudrix.io/products/ai-architecture-generator/demo",
    type: "website",
    images: [
      {
        url: "/og?title=AI%20Architecture%20Generator&subtitle=Free%20Cloud%20Architecture%20Tool&type=product",
        width: 1200,
        height: 630,
        alt: "AI Architecture Generator by Cloudrix",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/ai-architecture-generator/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
