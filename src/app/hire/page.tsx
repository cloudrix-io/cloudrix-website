import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Clock,
  Shield,
  Euro,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { roles } from "@/data/roles";

export const metadata: Metadata = {
  title: "Hire Senior Engineers - EU Timezone, No Lock-in",
  description:
    "Hire senior developers, DevOps engineers, cloud architects, and AI engineers from Cloudrix. EU timezone, EUR 8,500/mo, trial month available. No lock-in contracts.",
  openGraph: {
    title: "Hire Senior Engineers",
    description:
      "Hire senior developers, DevOps engineers, cloud architects, and AI engineers. EU timezone, EUR 8,500/mo, no lock-in.",
    url: "https://www.cloudrix.io/hire",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/hire",
  },
};

const highlights = [
  {
    icon: Users,
    title: "Senior Talent Only",
    description: "5+ years of production experience. No juniors, no ramp-up time.",
  },
  {
    icon: Clock,
    title: "EU Timezone",
    description: "CET/CEST working hours. Full overlap with European business.",
  },
  {
    icon: Shield,
    title: "No Lock-in",
    description: "Month-to-month engagement. Cancel anytime with 30 days notice.",
  },
  {
    icon: Euro,
    title: "Transparent Pricing",
    description: "EUR 8,500/mo. Trial month at EUR 7,500. No hidden fees.",
  },
];

export default function HirePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Hire", url: "/hire" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Hire Senior Engineers
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Embedded engineers who join your team, learn your codebase, and
                start delivering from week one. EU timezone, no lock-in, transparent
                pricing.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
              >
                Tell Us What You Need
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Roles Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Available Roles
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Select a role to see skills, technologies, and how the engagement works.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/hire/${role.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:border-blue-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {role.whatTheyDo.slice(0, 150)}...
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {role.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {role.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                        +{role.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From EUR 7,500/mo</span>
                    <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Details
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure Which Role You Need?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Tell us your challenge and we will recommend the right engineer profile.
              No commitment required.
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
