import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HireAI Demo - AI-Powered Candidate Screening & Resume Analysis",
  description:
    "Screen candidates with AI-powered resume matching. See skill breakdowns, match scores, and AI-generated interview questions. Free interactive demo by Cloudrix.",
  openGraph: {
    title: "HireAI Demo - AI Candidate Screening",
    description:
      "AI-powered hiring assistant that ranks candidates, analyzes skill matches, and generates interview questions. Try the free demo.",
    url: "https://www.cloudrix.io/products/ai-hiring-assistant/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("HireAI Demo")}&subtitle=${encodeURIComponent("AI-Powered Candidate Screening & Resume Analysis")}&type=product`,
        width: 1200,
        height: 630,
        alt: "HireAI Demo by Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HireAI Demo",
    description:
      "AI-powered resume screening with skill matching, candidate ranking, and interview question generation.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/ai-hiring-assistant/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
