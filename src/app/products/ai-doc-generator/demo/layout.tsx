import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Doc Generator Demo — Generate API Documentation Instantly",
  description: "Paste your code and get instant JSDoc, Python docstring, OpenAPI, or Markdown documentation powered by AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
