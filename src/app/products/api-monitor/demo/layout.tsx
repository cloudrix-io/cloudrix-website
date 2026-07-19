import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Monitor Demo - Real-Time Endpoint Monitoring Dashboard",
  description:
    "Monitor your API endpoints in real-time with uptime tracking, response time charts, and instant alerting. Free interactive demo by Cloudrix.",
  openGraph: {
    title: "API Monitor Demo - Real-Time Monitoring",
    description:
      "Interactive API monitoring dashboard with live status indicators, response time trends, uptime percentages, and alert configuration. Try it free.",
    url: "https://www.cloudrix.io/products/api-monitor/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("API Monitor Demo")}&subtitle=${encodeURIComponent("Real-Time Endpoint Monitoring Dashboard")}&type=product`,
        width: 1200,
        height: 630,
        alt: "API Monitor Demo by Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "API Monitor Demo",
    description:
      "Real-time API monitoring with uptime tracking, response time charts, and instant alerts.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/api-monitor/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
