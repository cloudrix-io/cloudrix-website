import { Metadata } from "next";
import { AiScopeGenerator } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "AI Project Scope Generator — Free Estimate Tool",
  description:
    "Describe your AI project and get an instant scope estimate with tech stack, timeline, budget range, and deliverables. Free, no sign-up required.",
  openGraph: {
    title: "AI Project Scope Generator | Cloudrix",
    description: "Get an instant AI project scope estimate with tech stack, timeline, and budget.",
    url: "https://www.cloudrix.io/ai-tools/scope-generator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/ai-tools/scope-generator",
  },
};

export default function ScopeGeneratorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "AI Tools", url: "/ai-tools" },
          { name: "Scope Generator", url: "/ai-tools/scope-generator" },
        ]}
      />
      <div className="bg-white">
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Project Scope Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your AI project in plain English and get a detailed scope estimate
              with tech stack, timeline, and budget range.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AiScopeGenerator />
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
