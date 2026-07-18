import { Metadata } from "next";
import { CodeScanDemo } from "./code-scan-demo";

export const metadata: Metadata = {
  title: "CodeScan AI Demo — Instant Code Review & Security Analysis",
  description:
    "Paste your code and get an instant AI-powered review covering security vulnerabilities, performance bottlenecks, maintainability issues, and best practices.",
  openGraph: {
    title: "CodeScan AI Demo — Instant Code Review & Security Analysis",
    description:
      "Paste code and get an instant AI-powered review with security, performance, and quality scores.",
    url: "https://www.cloudrix.io/products/ai-code-reviewer/demo",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("CodeScan AI Demo")}&subtitle=${encodeURIComponent("Instant code review & security analysis")}&type=product`,
        width: 1200,
        height: 630,
        alt: "CodeScan AI Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeScan AI Demo",
    description:
      "Paste code and get an instant AI-powered review with security and quality scores.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/ai-code-reviewer/demo",
  },
};

export default function CodeScanDemoPage() {
  return <CodeScanDemo />;
}
