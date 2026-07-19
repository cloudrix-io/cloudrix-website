import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Pricing - All Plans & Tiers",
  description:
    "Explore transparent pricing for all 24 Cloudrix products. Start free, scale as you grow. Monthly and annual billing with 20% annual discount. 14-day money-back guarantee.",
  openGraph: {
    title: "Product Pricing - All Plans & Tiers",
    description:
      "Transparent pricing for 24 AI-powered and engineering products. Free tiers available. Annual billing saves 20%.",
    url: "https://www.cloudrix.io/products/pricing",
    type: "website",
    images: [
      {
        url: "/og?title=Product%20Pricing&subtitle=Start%20free%2C%20scale%20as%20you%20grow&type=pricing",
        width: 1200,
        height: 630,
        alt: "Cloudrix Product Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Pricing - All Plans & Tiers",
    description:
      "Transparent pricing for 24 AI-powered and engineering products. Free tiers available.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/pricing",
  },
};

export default function ProductPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
