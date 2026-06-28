import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Heart,
  ShoppingCart,
  Cpu,
  Factory,
  Truck,
  ArrowRight,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Industries We Serve - Specialized Cloud Solutions",
  description:
    "Industry-specific cloud and software engineering solutions for FinTech, Healthcare, E-commerce, SaaS, Manufacturing, and Logistics companies worldwide.",
  openGraph: {
    title: "Industries We Serve",
    description:
      "Industry-specific cloud and software engineering solutions for companies worldwide.",
    url: "https://www.cloudrix.io/industries",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/industries",
  },
};

const industries = [
  {
    name: "FinTech & Financial Services",
    slug: "fintech",
    icon: Building2,
    description:
      "PCI-DSS compliant solutions for payment processors, banks, and financial platforms. High-availability systems that handle millions in transactions.",
    stats: ["99.99% Uptime", "PCI-DSS Compliant", "€2.3M+ Transactions"],
    color: "blue",
  },
  {
    name: "Healthcare & Digital Health",
    slug: "healthcare",
    icon: Heart,
    description:
      "GDPR and HIPAA-ready platforms for telemedicine, patient management, and healthcare data. Security and privacy built from the ground up.",
    stats: ["GDPR Compliant", "15K+ Daily Consultations", "99.8% Reliability"],
    color: "red",
  },
  {
    name: "E-commerce & Retail",
    slug: "ecommerce",
    icon: ShoppingCart,
    description:
      "Scalable platforms that handle flash sales and peak traffic. Performance optimization that drives conversions and reduces cart abandonment.",
    stats: ["10K+ Concurrent Users", "1.4s Load Time", "+89% Conversion"],
    color: "green",
  },
  {
    name: "SaaS & Technology",
    slug: "saas",
    icon: Cpu,
    description:
      "From MVP to scale, we build SaaS products that pass investor due diligence. Multi-tenant architectures, API-first design, and rapid iteration.",
    stats: ["14-Week MVPs", "€3.2M Raised", "2.1M Events/Day"],
    color: "purple",
  },
  {
    name: "Manufacturing & Industrial",
    slug: "manufacturing",
    icon: Factory,
    description:
      "Modernize legacy ERP systems without disrupting operations. Real-time inventory, IoT integration, and supply chain optimization.",
    stats: ["73% Modernized", "99.2% Accuracy", "Zero Downtime"],
    color: "orange",
  },
  {
    name: "Logistics & Supply Chain",
    slug: "logistics",
    icon: Truck,
    description:
      "Route optimization, fleet management, and warehouse systems. Real-time tracking and analytics for operational excellence.",
    stats: ["3x Volume Growth", "99.7% Uptime", "€1.8M Saved"],
    color: "teal",
  },
];

const colorClasses: Record<string, { bg: string; text: string; icon: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", icon: "text-blue-600" },
  red: { bg: "bg-red-100", text: "text-red-600", icon: "text-red-600" },
  green: { bg: "bg-green-100", text: "text-green-600", icon: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", icon: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", icon: "text-orange-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", icon: "text-teal-600" },
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                We Speak Your Industry&apos;s Language
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Generic agencies waste your time asking basic questions. We already know
                PCI-DSS, GDPR, HIPAA, and the operational realities of your business.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => {
                const Icon = industry.icon;
                const colors = colorClasses[industry.color];
                return (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:border-blue-200"
                  >
                    <div
                      className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center mb-6`}
                    >
                      <Icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {industry.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {industry.stats.map((stat, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                    <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Different Industry? We Adapt Fast.
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Senior engineers learn quickly. Tell us your unique requirements
              and we&apos;ll show you exactly how we&apos;d approach your challenges.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
