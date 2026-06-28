import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CloudrixAI Chat Demo — Try Our AI Assistant",
  description: "Chat with CloudrixAI to learn about Cloudrix cloud and software engineering services, pricing, and capabilities.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
