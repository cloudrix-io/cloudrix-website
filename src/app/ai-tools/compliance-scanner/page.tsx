import { Metadata } from "next";
import { EuAiActScanner } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "EU AI Act Compliance Scanner — Free Risk Assessment Tool",
  description:
    "Instantly classify your AI system's risk level under the EU AI Act. Get compliance obligations, priority actions, and next steps. Free, no sign-up required.",
  openGraph: {
    title: "EU AI Act Compliance Scanner | Cloudrix",
    description: "Instantly classify your AI system's risk level under the EU AI Act.",
    url: "https://www.cloudrix.io/ai-tools/compliance-scanner",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/ai-tools/compliance-scanner",
  },
};

export default function ComplianceScannerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "AI Tools", url: "/ai-tools" },
          { name: "Compliance Scanner", url: "/ai-tools/compliance-scanner" },
        ]}
      />
      <div className="bg-white">
        <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              EU AI Act Compliance Scanner
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your AI system and get an instant risk classification under the EU AI Act.
              Know your compliance obligations in minutes.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <EuAiActScanner />
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
