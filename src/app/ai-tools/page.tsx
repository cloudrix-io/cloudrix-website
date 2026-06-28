import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  FileText,
  BarChart3,
  Download,
  BookOpen,
  Sparkles,
  ChevronRight,
  Mail,
  Bot,
  Target,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Free AI Tools & Resources for European Companies",
  description:
    "Try free AI tools: EU AI Act Compliance Scanner, AI Project Scope Generator, and AI Readiness Assessment. Plus downloadable guides for CTOs navigating AI in 2026.",
  openGraph: {
    title: "Free AI Tools & Resources | Cloudrix",
    description:
      "Try free AI tools: EU AI Act Compliance Scanner, AI Project Scope Generator, and AI Readiness Assessment.",
    url: "https://www.cloudrix.io/ai-tools",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Free AI Tools for European Companies")}&subtitle=${encodeURIComponent("Try our AI expertise before you commit")}&type=services`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Free AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tools & Resources | Cloudrix",
    description:
      "Free AI tools: EU AI Act Compliance Scanner, AI Project Scope Generator, and AI Readiness Assessment.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/ai-tools",
  },
};

const tools = [
  {
    icon: Shield,
    title: "EU AI Act Compliance Scanner",
    description:
      "Upload your AI system description and get instant risk classification, a compliance checklist, and priority actions. Know your AI Act exposure in minutes.",
    features: [
      "Instant risk level classification",
      "Compliance checklist per system",
      "Priority action recommendations",
      "Exportable PDF report",
    ],
    cta: "Try Compliance Scanner",
    link: "/ai-tools/compliance-scanner",
    color: "bg-red-100 text-red-600",
    borderColor: "border-red-200 hover:border-red-300",
  },
  {
    icon: Target,
    title: "AI Project Scope Generator",
    description:
      "Describe your AI project in plain English and get a tech stack recommendation, realistic timeline, cost estimate, and team composition. No sales call required.",
    features: [
      "Tech stack recommendation",
      "Timeline and milestone plan",
      "Cost range estimate",
      "Team composition suggestion",
    ],
    cta: "Try Scope Generator",
    link: "/ai-tools/scope-generator",
    color: "bg-indigo-100 text-indigo-600",
    borderColor: "border-indigo-200 hover:border-indigo-300",
  },
  {
    icon: BarChart3,
    title: "AI Readiness Assessment",
    description:
      "Answer 10 questions about your organization and get a detailed AI readiness score with personalized recommendations. Understand where you stand before investing.",
    features: [
      "10-question assessment",
      "AI readiness score (0\u2013100)",
      "Personalized recommendations",
      "Benchmark against your industry",
    ],
    cta: "Take Assessment",
    link: "/ai-tools/readiness-assessment",
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-purple-200 hover:border-purple-300",
  },
];

const leadMagnets = [
  {
    icon: BookOpen,
    title: "European CTO\u2019s Guide to AI in 2026",
    description:
      "A comprehensive guide covering the AI landscape, EU regulations, build vs buy decisions, and practical implementation strategies for European companies.",
    pages: "42 pages",
    format: "PDF",
  },
  {
    icon: FileText,
    title: "EU AI Act Compliance Playbook",
    description:
      "Step-by-step compliance checklist, risk classification matrix, documentation templates, and timeline planner. Everything you need to prepare for the deadline.",
    pages: "28 pages",
    format: "PDF + Templates",
  },
  {
    icon: BarChart3,
    title: "Build vs Buy: AI Agent Decision Framework",
    description:
      "A structured comparison matrix to help you decide whether to build custom AI agents or buy off-the-shelf solutions. Includes cost models and vendor evaluation criteria.",
    pages: "18 pages",
    format: "PDF + Spreadsheet",
  },
];

const blogTopics = [
  {
    title: "How much does AI integration cost for a European mid-market company",
    category: "Cost Guide",
  },
  {
    title: "EU AI Act compliance checklist: what you must do before the deadline",
    category: "Compliance",
  },
  {
    title: "RAG vs fine-tuning: which approach is right for your business data",
    category: "Technical",
  },
  {
    title: "Building your first AI agent: CTO\u2019s guide from pilot to production",
    category: "Strategy",
  },
  {
    title: "From 88% failure rate to production: why most AI agent projects fail",
    category: "Industry",
  },
];

export default function AIToolsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "AI Tools", url: "/ai-tools" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                100% Free \u2014 No Credit Card Required
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Free AI Tools for European Companies
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Try our AI expertise before you commit. These tools demonstrate what we build
                for clients \u2014 and help you make better AI decisions today.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Tools */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Interactive AI Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get instant insights about your AI strategy, compliance, and project planning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white border-2 ${tool.borderColor} rounded-xl p-8 transition-all duration-300 hover:shadow-xl flex flex-col`}
                  >
                    <div className={`w-14 h-14 ${tool.color} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Link
                        href={tool.link}
                        className="inline-flex items-center justify-center w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold group"
                      >
                        {tool.cta}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lead Magnets */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Free Downloadable Guides
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In-depth resources to help you navigate AI strategy, compliance, and implementation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadMagnets.map((magnet, index) => {
                const Icon = magnet.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {magnet.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {magnet.description}
                    </p>
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {magnet.pages}
                      </span>
                      <span className="inline-flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {magnet.format}
                      </span>
                    </div>

                    {/* Email capture form UI */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            readOnly
                          />
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="block w-full text-center bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                      >
                        Download Free Guide
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Insights for European Leaders
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Practical, no-fluff content to help you make better AI decisions.
              </p>
            </div>

            <div className="space-y-4">
              {blogTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {topic.category}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-indigo-600 font-medium flex-shrink-0 ml-4">
                    <span className="hidden sm:inline">Coming Soon</span>
                    <Bot className="w-4 h-4 ml-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors group"
              >
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Go Beyond Free Tools?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Our free tools give you a taste of what we build. When you&apos;re ready to
              turn insights into production AI, we&apos;re here. Free 30-minute strategy call \u2014
              no pitch, just practical advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?type=ai"
                className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book AI Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ai-services"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View AI Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
