import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartCRM Demo - AI-Powered Sales Pipeline & Lead Management",
  description:
    "Experience SmartCRM's AI-powered pipeline dashboard with lead scoring, deal tracking, and automated follow-up email drafting. Free interactive demo by Cloudrix.",
  openGraph: {
    title: "SmartCRM Demo - AI-Powered Sales Pipeline",
    description:
      "Interactive CRM dashboard demo with AI lead scoring, pipeline analytics, and automated email drafting. See how AI transforms your sales process.",
    url: "https://www.cloudrix.io/products/smart-crm/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("SmartCRM Demo")}&subtitle=${encodeURIComponent("AI-Powered Sales Pipeline & Lead Management")}&type=product`,
        width: 1200,
        height: 630,
        alt: "SmartCRM Demo by Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartCRM Demo",
    description:
      "AI-powered CRM dashboard with pipeline view, lead scoring, and automated follow-ups.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/smart-crm/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
