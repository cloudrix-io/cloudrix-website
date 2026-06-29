import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Reviewer Demo - Free Security & Performance Analysis",
  description:
    "Paste your code and get an instant AI-powered review covering security, performance, architecture, and code quality. Free tool by Cloudrix.",
  openGraph: {
    title: "AI Code Reviewer",
    description:
      "Free AI-powered code review tool. Get security analysis, performance insights, and architecture recommendations instantly.",
    url: "https://www.cloudrix.io/products/ai-code-reviewer/demo",
    type: "website",
    images: [
      {
        url: "/og?title=AI%20Code%20Reviewer&subtitle=Free%20Security%20%26%20Performance%20Analysis&type=product",
        width: 1200,
        height: 630,
        alt: "AI Code Reviewer by Cloudrix",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/ai-code-reviewer/demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
