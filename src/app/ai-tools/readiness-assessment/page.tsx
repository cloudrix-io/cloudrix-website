import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo";
import { AiReadinessAssessment } from "./readiness-client";

export const metadata: Metadata = {
  title: "AI Readiness Assessment — Score Your Organization",
  description:
    "Answer 10 questions and get a detailed AI readiness score with personalized recommendations. Understand where your organization stands before investing in AI.",
  openGraph: {
    title: "AI Readiness Assessment | Cloudrix",
    description: "Score your organization's AI readiness with our free 10-question assessment.",
    url: "https://www.cloudrix.io/ai-tools/readiness-assessment",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/ai-tools/readiness-assessment",
  },
};

export default function ReadinessAssessmentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "AI Tools", url: "/ai-tools" },
          { name: "Readiness Assessment", url: "/ai-tools/readiness-assessment" },
        ]}
      />
      <div className="bg-white">
        <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Readiness Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Answer 10 questions about your organization and get a personalized AI readiness
              score with actionable recommendations.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AiReadinessAssessment />
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
