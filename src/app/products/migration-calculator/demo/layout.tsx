import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migration Complexity Calculator — Estimate Your Cloud Migration",
  description: "Interactive tool estimating cloud migration complexity, timeline, cost range, and phased migration plan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
