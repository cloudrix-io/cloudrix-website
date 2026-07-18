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
  Lock,
  Brain,
  Wrench,
  BookMarked,
  Layout,
  Globe,
  Cpu,
  Lightbulb,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Free Resources - Guides, Whitepapers, Templates & AI Use Cases",
  description:
    "Download free guides, whitepapers, templates, and AI use case libraries for cloud migration, DevOps, and software development. Practical resources from senior engineers.",
  openGraph: {
    title: "Free Resources - Guides, Whitepapers & Templates",
    description:
      "Download free guides, whitepapers, and templates for cloud migration, DevOps, and AI integration.",
    url: "https://www.cloudrix.io/resources",
    type: "website",
    images: [
      {
        url: "/og?title=Free%20Engineering%20Resources&subtitle=Guides,%20Whitepapers%20%26%20Templates&type=resources",
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

const whitepapers = [
  {
    title: "The True Cost of Technical Debt",
    description: "A data-driven analysis of how technical debt impacts velocity, retention, and revenue. Includes a framework for quantifying debt in your organization.",
    pages: 28,
    readTime: "15 min",
  },
  {
    title: "EU AI Act Compliance for Engineering Teams",
    description: "Practical guide to building AI systems that comply with the EU AI Act. Risk classification, documentation requirements, and implementation patterns.",
    pages: 22,
    readTime: "12 min",
  },
  {
    title: "Cloud Migration ROI: Beyond Cost Savings",
    description: "Why cloud migration delivers more than infrastructure savings. Speed, security, scalability, and talent acquisition benefits quantified.",
    pages: 18,
    readTime: "10 min",
  },
];

const webinars = [
  {
    title: "Scaling Node.js to 1M Requests/Second",
    description: "Live walkthrough of techniques for horizontal scaling, connection pooling, and performance optimization in production Node.js applications.",
    duration: "45 min",
    status: "Recording Available",
  },
  {
    title: "From Monolith to Microservices: A Real-World Journey",
    description: "How we helped a FinTech company decompose a monolith into 12 microservices without downtime. Lessons learned and patterns that worked.",
    duration: "60 min",
    status: "Recording Available",
  },
  {
    title: "AI-First Development: Practical Patterns for 2025",
    description: "How to integrate LLMs into production workflows without creating a maintenance nightmare. Includes prompt engineering, caching, and fallback strategies.",
    duration: "45 min",
    status: "Coming Soon",
  },
];

const aiUseCases = [
  {
    title: "Document Processing & Extraction",
    description: "Automated extraction of structured data from invoices, contracts, and legal documents using LLMs.",
    industry: "Financial Services",
  },
  {
    title: "Customer Support Automation",
    description: "AI-powered support agents that handle 60% of tier-1 tickets with human-quality responses.",
    industry: "SaaS",
  },
  {
    title: "Code Review Assistant",
    description: "Automated code review that catches bugs, security issues, and style violations before human review.",
    industry: "Technology",
  },
  {
    title: "Predictive Maintenance",
    description: "ML models that predict equipment failures 72 hours in advance using IoT sensor data.",
    industry: "Manufacturing",
  },
  {
    title: "Content Generation Pipeline",
    description: "Multi-stage content generation with quality checks, fact-verification, and brand voice consistency.",
    industry: "E-Commerce",
  },
  {
    title: "Fraud Detection System",
    description: "Real-time transaction scoring using ensemble models to detect fraudulent patterns with 99.7% accuracy.",
    industry: "FinTech",
  },
];

const templates = [
  {
    title: "Architecture Decision Record (ADR)",
    description: "Document and track architecture decisions with context, consequences, and alternatives.",
    format: "Markdown",
  },
  {
    title: "Sprint Retrospective Template",
    description: "Structured retro format with actions, owners, and follow-up tracking.",
    format: "Notion",
  },
  {
    title: "Incident Response Runbook",
    description: "Step-by-step guide for handling production incidents, from detection to post-mortem.",
    format: "Markdown",
  },
  {
    title: "Technical Proposal Template",
    description: "Professional proposal template for engineering projects, including scope, timeline, and pricing.",
    format: "Google Docs",
  },
];

const categories = [
  { name: "All", count: resources.length + whitepapers.length + templates.length },
  { name: "Checklist", count: resources.filter((r) => r.category === "Checklist").length },
  { name: "Guide", count: resources.filter((r) => r.category === "Guide").length },
  { name: "Assessment", count: resources.filter((r) => r.category === "Assessment").length },
  { name: "Template", count: resources.filter((r) => r.category === "Template").length + templates.length },
  { name: "Playbook", count: resources.filter((r) => r.category === "Playbook").length },
  { name: "Whitepaper", count: whitepapers.length },
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
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Resources", url: "/resources" },
            ]}
          />
        </div>

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
                already know? These are the exact frameworks and checklists we use on projects.
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

        {/* AI Guides - Lead Magnets */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Guides</h2>
                <p className="text-gray-500 text-sm">In-depth guides for AI strategy, compliance, and implementation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Link href="/resources/eu-ai-act-playbook" className="group bg-white border border-indigo-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <Shield className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-bold text-white">EU AI Act Compliance Playbook</h3>
                  <p className="text-blue-100 text-sm mt-2">Risk classification, 20-item checklist, governance templates, and cost estimates</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Guide</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">25 min read</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">10 sections</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    Read the Playbook
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/resources/ai-cost-guide" className="group bg-white border border-green-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                  <BookMarked className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-bold text-white">How Much Does AI Cost? 2026 Guide</h3>
                  <p className="text-green-100 text-sm mt-2">Real pricing data: PoC, production, retainers, hidden costs, and build vs buy</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">Guide</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">20 min read</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">9 sections</span>
                  </div>
                  <span className="text-green-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    Read the Cost Guide
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link href="/resources/ai-agent-framework" className="group bg-white border border-purple-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6">
                  <Cpu className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-bold text-white">Build vs Buy: AI Agent Framework</h3>
                  <p className="text-purple-100 text-sm mt-2">Decision matrix, framework comparison, TCO analysis, and implementation roadmap</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-medium">Guide</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">22 min read</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">8 sections</span>
                  </div>
                  <span className="text-purple-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    Read the Framework
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>
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

        {/* Whitepapers Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Whitepapers</h2>
                <p className="text-gray-500 text-sm">In-depth research and analysis (email required)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {whitepapers.map((paper) => (
                <div key={paper.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-medium">Whitepaper</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{paper.pages} pages</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{paper.readTime} read</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{paper.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{paper.description}</p>
                  <button className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Download (Free with Email)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Webinars Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Webinars</h2>
                <p className="text-gray-500 text-sm">Live sessions and recorded talks from our engineers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <div key={webinar.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      webinar.status === "Coming Soon"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {webinar.status}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{webinar.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{webinar.description}</p>
                  <button className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center">
                    <Video className="w-4 h-4 mr-2" />
                    {webinar.status === "Coming Soon" ? "Register for Notification" : "Watch Recording"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Use Cases Library */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Use Cases Library</h2>
                <p className="text-gray-500 text-sm">Real-world AI implementations across industries</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiUseCases.map((useCase) => (
                <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">
                    {useCase.industry}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/ai-services"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group"
              >
                Explore Our AI Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Templates</h2>
                <p className="text-gray-500 text-sm">Ready-to-use templates for engineering teams</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <div key={template.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                    {template.format}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 mt-3 mb-2">{template.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{template.description}</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links: Glossary & Tools */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/ai-tools"
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Wrench className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Tools</h3>
                <p className="text-gray-600 mb-4">
                  Free interactive tools: compliance scanner, scope generator, and readiness assessment
                </p>
                <span className="text-blue-600 font-medium flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  Try Tools
                  <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/blog"
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-green-600" />
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
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Studies</h3>
                <p className="text-gray-600 mb-4">
                  Real-world examples of how we&apos;ve helped companies succeed
                </p>
                <span className="text-blue-600 font-medium flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  View Case Studies
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
