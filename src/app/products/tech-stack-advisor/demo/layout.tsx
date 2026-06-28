import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack Advisor — Get Personalized Stack Recommendations",
  description: "Answer 5 questions and get a personalized tech stack recommendation with comparison radar charts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
