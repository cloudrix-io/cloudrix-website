import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Server,
  Code,
  Layout,
  Globe,
  FileCode,
  Database,
  Brain,
  Container,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { technologies } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Technologies We Work With - Expert Engineering Teams",
  description:
    "From AWS and Kubernetes to React and LangChain, our senior engineers bring deep expertise in the technologies that power modern cloud applications.",
  openGraph: {
    title: "Technologies We Work With",
    description:
      "From AWS and Kubernetes to React and LangChain, our senior engineers bring deep expertise in the technologies that power modern cloud applications.",
    url: "https://www.cloudrix.io/technologies",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/technologies",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Server,
  Code,
  Layout,
  Globe,
  FileCode,
  Database,
  Brain,
  Container,
};

const categoryGroups = [
  {
    label: "Cloud Platforms",
    slugs: ["aws", "azure", "google-cloud"],
    color: "blue",
  },
  {
    label: "Infrastructure & DevOps",
    slugs: ["kubernetes", "terraform", "docker"],
    color: "green",
  },
  {
    label: "Languages & Frameworks",
    slugs: ["nodejs", "python", "react", "nextjs", "angular", "typescript"],
    color: "purple",
  },
  {
    label: "Data & AI",
    slugs: ["postgresql", "mongodb", "langchain"],
    color: "orange",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
};

export default function TechnologiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Technologies", url: "/technologies" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Technologies We Work With
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our senior engineers bring deep, production-tested expertise across
                the modern cloud stack. We do not just know these technologies — we
                have shipped them at scale.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categoryGroups.map((group) => {
          const colors = colorClasses[group.color];
          const groupTechnologies = group.slugs
            .map((slug) => technologies.find((t) => t.slug === slug))
            .filter(Boolean);

          return (
            <section key={group.label} className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {group.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupTechnologies.map((tech) => {
                    if (!tech) return null;
                    const Icon = iconMap[tech.iconDescription] || Code;
                    return (
                      <Link
                        key={tech.slug}
                        href={`/technologies/${tech.slug}`}
                        className={`group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:${colors.border}`}
                      >
                        <div
                          className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center mb-6`}
                        >
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {tech.tagline}
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
              Need Expertise in a Specific Technology?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Our senior engineers pick up new stacks fast. If you do not see your
              technology listed, ask us — we probably have experience with it.
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
