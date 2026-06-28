import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Cost Calculator — Compare AWS, Azure & GCP Pricing",
  description: "Interactive calculator comparing AWS, Azure, and Google Cloud costs side-by-side for compute, storage, database, CDN, and serverless.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
