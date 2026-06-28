import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cost Optimizer Demo — Find Cloud Savings",
  description: "Describe your cloud infrastructure and get AI-powered optimization recommendations with estimated savings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
