import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps Maturity Assessment — Evaluate Your Practices",
  description: "Take a 10-question self-assessment to evaluate your CI/CD, monitoring, IaC, security, and testing practices.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
