import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StatusPage Demo - Professional Status Page for Your Services",
  description:
    "Create beautiful, customizable status pages with real-time monitoring, incident timelines, and subscriber notifications. Free interactive demo by Cloudrix.",
  openGraph: {
    title: "StatusPage Demo - Professional Status Pages",
    description:
      "Interactive status page demo with service monitoring, 90-day uptime graphs, incident timeline, and subscriber notifications. Try it free.",
    url: "https://www.cloudrix.io/products/status-page/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("StatusPage Demo")}&subtitle=${encodeURIComponent("Professional Status Pages for Your Services")}&type=product`,
        width: 1200,
        height: 630,
        alt: "StatusPage Demo by Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPage Demo",
    description:
      "Professional status pages with real-time monitoring, incident timelines, and uptime graphs.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/status-page/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
