import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Lock,
  FileCheck,
  Globe,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { complianceFrameworks } from "@/data/compliance";

export const metadata: Metadata = {
  title: "Compliance Engineering - SOC 2, HIPAA, GDPR, PCI DSS, ISO 27001",
  description:
    "Compliance engineering for cloud applications. SOC 2, HIPAA, GDPR, PCI DSS, ISO 27001, and more. We implement the technical controls, not just the paperwork.",
  openGraph: {
    title: "Compliance Engineering",
    description:
      "Compliance engineering for cloud applications. We implement the technical controls, not just the paperwork.",
    url: "https://www.cloudrix.io/compliance",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/compliance",
  },
};

const regionGroups = [
  {
    label: "Global Standards",
    slugs: ["soc2", "iso-27001", "pci-dss"],
    icon: Globe,
    color: "blue",
  },
  {
    label: "Regional Regulations",
    slugs: ["gdpr", "hipaa", "pdpa", "lgpd"],
    icon: Lock,
    color: "green",
  },
  {
    label: "Emerging Regulation",
    slugs: ["eu-ai-act"],
    icon: FileCheck,
    color: "purple",
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
};

export default function CompliancePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compliance", url: "/compliance" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Compliance Engineering</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Compliance That Goes Beyond Paperwork
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We implement the technical controls that auditors actually check.
                Infrastructure hardening, access management, encryption, monitoring,
                and audit-ready evidence collection.
              </p>
            </div>
          </div>
        </section>

        {/* Framework Groups */}
        {regionGroups.map((group) => {
          const colors = colorClasses[group.color];
          const GroupIcon = group.icon;
          const groupFrameworks = group.slugs
            .map((slug) => complianceFrameworks.find((f) => f.slug === slug))
            .filter(Boolean);

          return (
            <section key={group.label} className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <GroupIcon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {group.label}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupFrameworks.map((framework) => {
                    if (!framework) return null;
                    return (
                      <Link
                        key={framework.slug}
                        href={framework.externalLink || `/compliance/${framework.slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:border-blue-200"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className={`w-6 h-6 ${colors.text}`} />
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {framework.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{framework.fullName}</p>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {framework.whatItIs.slice(0, 180)}...
                        </p>
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
          );
        })}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help With Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              We have guided startups and enterprises through SOC 2, GDPR, HIPAA,
              and more. Book a free call to discuss your compliance requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Book Free Compliance Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
