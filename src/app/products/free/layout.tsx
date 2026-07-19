import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools — No Credit Card Required | Cloudrix",
  description:
    "Try 15+ free AI and engineering tools with no signup required. Cloud cost calculators, AI code review, security scanning, and more. Used by 10,000+ developers worldwide.",
  openGraph: {
    title: "Free Tools — No Credit Card Required | Cloudrix",
    description:
      "15+ free tools for developers and engineering teams. No signup, no credit card, no limits on free tiers.",
    url: "https://www.cloudrix.io/products/free",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Free Tools")}&subtitle=${encodeURIComponent("No credit card required")}&type=free`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Free Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tools — No Credit Card Required",
    description:
      "15+ free AI and engineering tools. No signup, no credit card.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/free",
  },
};

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
