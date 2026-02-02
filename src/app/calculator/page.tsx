import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { ROICalculator, TrustBadgeStrip } from "@/components/ui";
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "ROI Calculator - How Much Is Bad Software Costing You?",
  description:
    "Calculate the true cost of technical debt, slow deployments, and system downtime. Free ROI calculator for engineering leaders.",
  openGraph: {
    title: "ROI Calculator - How Much Is Bad Software Costing You?",
    description:
      "Calculate the true cost of technical debt, slow deployments, and system downtime.",
    url: "https://www.cloudrix.io/calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "ROI Calculator", url: "/calculator" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Software Cost Calculator"
        description="Calculate the true cost of technical debt, slow deployments, and system downtime. Free ROI calculator for engineering leaders."
        url="/calculator"
        category="BusinessApplication"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Free Assessment Tool</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                How Much Is Bad Software Costing Your Business?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Most companies underestimate their software costs by 3-5x. This calculator
                reveals the true cost of technical debt, slow deployments, and system downtime.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badge Strip */}
        <TrustBadgeStrip />

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <ROICalculator />
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why This Matters
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every day you ignore these costs, your competitors are pulling ahead.
                Here&apos;s what the data shows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">40%</div>
                <p className="text-gray-600">
                  of engineering time spent on maintenance instead of features (industry average)
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">€150K+</div>
                <p className="text-gray-600">
                  average annual cost of system downtime for mid-size companies
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">6-12 mo</div>
                <p className="text-gray-600">
                  feature delivery delay due to accumulated technical debt
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Average vs. High-Performing Teams
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-red-50 rounded-xl p-8 border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Average Teams
                </h3>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    Deploy monthly (or less)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    40%+ time on maintenance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    Hours to recover from incidents
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    Fear deploying on Fridays
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  High-Performing Teams
                </h3>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Deploy multiple times per day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Less than 15% on maintenance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Minutes to recover from incidents
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Deploy anytime with confidence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Stop the Bleeding?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              We&apos;ve helped 47+ companies recover millions in lost productivity.
              Book a free strategy call and get a custom recovery plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Get Your Free Recovery Plan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
