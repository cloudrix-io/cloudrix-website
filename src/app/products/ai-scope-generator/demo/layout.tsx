import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Project Scope Generator Demo - Free Project Planning Tool",
  description:
    "Describe your project idea and get an AI-generated scope with tech stack, timeline, cost estimates, and team composition. Free tool by Cloudrix.",
  openGraph: {
    title: "AI Project Scope Generator | Cloudrix",
    description:
      "Turn any project idea into a detailed scope document with tech stack, phases, cost estimates, and risk analysis. Free AI tool.",
    url: "https://www.cloudrix.io/products/ai-scope-generator/demo",
    type: "website",
    images: [
      {
        url: "/og?title=AI%20Project%20Scope%20Generator&subtitle=Free%20Project%20Planning%20Tool&type=product",
        width: 1200,
        height: 630,
        alt: "AI Project Scope Generator by Cloudrix",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/ai-scope-generator/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
