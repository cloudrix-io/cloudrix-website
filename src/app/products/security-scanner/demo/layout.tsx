import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Scanner Simulator — Check Your URL Security",
  description: "Simulated security scan checking SSL, headers, OWASP top 10, and security best practices for any URL.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
