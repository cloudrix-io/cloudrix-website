import { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  FileText,
  CheckSquare,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  BookOpen,
  Video,
  Code,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Free Resources - Cloud & DevOps Guides",
  description:
    "Download free guides, checklists, and templates for cloud migration, DevOps, and software development. Practical resources from senior engineers.",
  openGraph: {
    title: "Free Resources - Cloud & DevOps Guides",
    description:
      "Download free guides, checklists, and templates for cloud migration, DevOps, and software development.",
    url: "https://www.cloudrix.io/resources",
    type: "website",
    images: [
      {
        url: "/og?title=Free%20Engineering%20Resources&subtitle=Guides,%20Checklists%20%26%20Templates&type=resources",
        width: 1200,
        height: 630,
        alt: "Cloudrix Resources",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/resources",
  },
};

const resources = [
  {
    title: "Cloud Migration Checklist",
    description:
      "15-step checklist for planning and executing a successful AWS migration. Covers assessment, security, and optimization.",
    icon: CheckSquare,
    category: "Checklist",
    format: "PDF",
    pages: 8,
    popular: true,
    slug: "cloud-migration-checklist",
  },
  {
    title: "DevOps Readiness Assessment",
    description:
      "Evaluate your organization's DevOps maturity across 5 key dimensions. Includes scoring guide and improvement roadmap.",
    icon: BarChart3,
    category: "Assessment",
    format: "PDF + Excel",
    pages: 12,
    popular: true,
    slug: "devops-readiness-assessment",
  },
  {
    title: "Kubernetes Security Hardening Guide",
    description:
      "Comprehensive guide to securing your Kubernetes clusters. RBAC, network policies, secrets management, and more.",
    icon: Shield,
    category: "Guide",
    format: "PDF",
    pages: 24,
    popular: false,
    slug: "kubernetes-security-guide",
  },
  {
    title: "API Design Best Practices",
    description:
      "Design REST and GraphQL APIs that developers love. Covers versioning, authentication, error handling, and documentation.",
    icon: Code,
    category: "Guide",
    format: "PDF",
    pages: 18,
    popular: false,
    slug: "api-design-best-practices",
  },
  {
    title: "Cloud Cost Optimization Playbook",
    description:
      "Practical strategies to reduce your AWS/GCP/Azure spend by 30-50%. Reserved instances, right-sizing, and automation.",
    icon: Zap,
    category: "Playbook",
    format: "PDF",
    pages: 16,
    popular: true,
    slug: "cloud-cost-optimization",
  },
  {
    title: "Technical Due Diligence Template",
    description:
      "The template we use for M&A technical assessments. Covers code quality, architecture, security, and team evaluation.",
    icon: FileText,
    category: "Template",
    format: "PDF + Notion",
    pages: 20,
    popular: false,
    slug: "technical-due-diligence-template",
  },
];

const categories = [
  { name: "All", count: resources.length },
  { name: "Checklist", count: resources.filter((r) => r.category === "Checklist").length },
  { name: "Guide", count: resources.filter((r) => r.category === "Guide").length },
  { name: "Assessment", count: resources.filter((r) => r.category === "Assessment").length },
  { name: "Template", count: resources.filter((r) => r.category === "Template").length },
  { name: "Playbook", count: resources.filter((r) => r.category === "Playbook").length },
];

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Download className="w-4 h-4" />
                <span>100% Free Resources</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Skip the Learning Curve
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Why spend months figuring it out when you can download what senior engineers
                already know? These are the exact frameworks and checklists we use on €500K+ projects.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-gray-200 sticky top-16 bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category.name === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Popular Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                Most Popular
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources
                  .filter((r) => r.popular)
                  .map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <ResourceCard key={resource.slug} resource={resource} Icon={Icon} featured />
                    );
                  })}
              </div>
            </div>

            {/* All Resources */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => {
                  const Icon = resource.icon;
                  return <ResourceCard key={resource.slug} resource={resource} Icon={Icon} />;
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">More Ways to Learn</h2>
              <p className="text-xl text-gray-600">
                Explore our blog and case studies for more insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/blog"
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Engineering Blog</h3>
                <p className="text-gray-600 mb-4">
                  In-depth articles on cloud architecture, DevOps, and best practices
                </p>
                <span className="text-blue-600 font-medium flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  Read Articles
                  <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/case-studies"
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Studies</h3>
                <p className="text-gray-600 mb-4">
                  Real-world examples of how we've helped companies succeed
                </p>
                <span className="text-blue-600 font-medium flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  View Case Studies
                  <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/how-we-work"
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Video className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Process</h3>
                <p className="text-gray-600 mb-4">
                  Learn how we deliver successful projects for our clients
                </p>
                <span className="text-blue-600 font-medium flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Templates Are Nice. Results Are Better.
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Downloaded everything but still stuck? Sometimes you need an expert, not another PDF.
              Let&apos;s talk about what&apos;s actually blocking you.
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

interface ResourceCardProps {
  resource: (typeof resources)[0];
  Icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}

function ResourceCard({ resource, Icon, featured }: ResourceCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow ${
        featured ? "border-blue-200" : "border-gray-200"
      }`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-4 py-1 text-center">
          Popular Download
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              featured ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <Icon className={`w-6 h-6 ${featured ? "text-blue-600" : "text-gray-600"}`} />
          </div>
          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {resource.format}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {resource.pages} pages
            </span>
          </div>
        </div>

        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {resource.category}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

        <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
          <Download className="w-4 h-4 mr-2" />
          Download Free
        </button>
      </div>
    </div>
  );
}

export const revalidate = 3600;
