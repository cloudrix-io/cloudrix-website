import { Metadata } from "next";
import Link from "next/link";
import {
  Euro,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  CheckSquare,
  TrendingUp,
  Cpu,
  Cloud,
  BarChart3,
  Lightbulb,
  Layers,
  ChevronRight,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title:
    "How Much Does AI Cost? The Complete 2026 Guide for European Companies | Cloudrix",
  description:
    "Comprehensive AI cost guide for European businesses. PoC costs, production deployment pricing, monthly retainers, hidden costs, and build vs buy analysis. Get accurate estimates for RAG, agents, voice AI, and compliance projects.",
  openGraph: {
    title: "How Much Does AI Cost? Complete 2026 Guide",
    description:
      "AI project pricing for European companies. PoC, production, retainers, and hidden costs explained with real numbers.",
    url: "https://www.cloudrix.io/resources/ai-cost-guide",
    type: "article",
    images: [
      {
        url: "/og?title=How%20Much%20Does%20AI%20Cost%3F&subtitle=The%20Complete%202026%20Guide%20for%20European%20Companies&type=guide",
        width: 1200,
        height: 630,
        alt: "AI Cost Guide 2026",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/resources/ai-cost-guide",
  },
};

const tableOfContents = [
  { id: "overview", label: "AI Project Cost Overview" },
  { id: "poc-costs", label: "PoC Costs" },
  { id: "production-costs", label: "Production Deployment Costs" },
  { id: "retainer-costs", label: "Monthly Retainer Costs" },
  { id: "hidden-costs", label: "Hidden Costs People Forget" },
  { id: "build-vs-buy", label: "Build vs Buy Comparison" },
  { id: "reduce-costs", label: "How to Reduce AI Costs" },
  { id: "pricing-by-type", label: "Pricing by Project Type" },
  { id: "get-estimate", label: "Get a Custom Estimate" },
];

const projectTypes = [
  {
    type: "Proof of Concept (PoC)",
    range: "15,000 - 25,000",
    timeline: "2-4 weeks",
    description: "Validate feasibility and business value",
  },
  {
    type: "MVP / Pilot",
    range: "25,000 - 60,000",
    timeline: "4-8 weeks",
    description: "Working system for limited users",
  },
  {
    type: "Production Deployment",
    range: "30,000 - 200,000",
    timeline: "2-6 months",
    description: "Scalable, monitored, production-ready system",
  },
  {
    type: "Enterprise Platform",
    range: "100,000 - 500,000+",
    timeline: "6-12 months",
    description: "Multi-model, multi-department AI platform",
  },
  {
    type: "Monthly Retainer",
    range: "3,000 - 15,000/mo",
    timeline: "Ongoing",
    description: "Maintenance, optimization, and support",
  },
];

const pocIncludes = [
  "Problem definition and scoping workshop",
  "Data assessment and preparation",
  "Model selection and initial training/fine-tuning",
  "Basic integration with existing systems",
  "Performance evaluation and metrics",
  "Go/no-go recommendation with production cost estimate",
  "2-4 week timeline with weekly demos",
];

const productionBreakdown = [
  {
    component: "Architecture & Design",
    percentage: "10-15%",
    description: "System design, API contracts, infrastructure planning",
  },
  {
    component: "Data Pipeline",
    percentage: "20-30%",
    description: "ETL, data quality, preprocessing, embeddings",
  },
  {
    component: "Model Development",
    percentage: "15-25%",
    description: "Fine-tuning, prompt engineering, evaluation",
  },
  {
    component: "Integration",
    percentage: "15-20%",
    description: "API development, existing system connections",
  },
  {
    component: "Testing & QA",
    percentage: "10-15%",
    description: "Unit tests, integration tests, adversarial testing",
  },
  {
    component: "DevOps & Monitoring",
    percentage: "10-15%",
    description: "CI/CD, logging, alerting, model monitoring",
  },
  {
    component: "Documentation & Training",
    percentage: "5-10%",
    description: "Technical docs, user guides, team training",
  },
];

const retainerTiers = [
  {
    name: "Essential",
    price: "3,000 - 5,000",
    hours: "20-30 hrs/month",
    includes: [
      "Model performance monitoring",
      "Bug fixes and minor updates",
      "Monthly performance report",
      "Email support (next business day)",
    ],
  },
  {
    name: "Growth",
    price: "5,000 - 10,000",
    hours: "30-60 hrs/month",
    includes: [
      "Everything in Essential",
      "Prompt optimization and tuning",
      "New feature development",
      "A/B testing and experimentation",
      "Priority support (4-hour response)",
    ],
  },
  {
    name: "Enterprise",
    price: "10,000 - 15,000",
    hours: "60-100 hrs/month",
    includes: [
      "Everything in Growth",
      "Dedicated AI engineer",
      "Model retraining and updates",
      "Compliance monitoring (EU AI Act)",
      "24/7 on-call support",
      "Strategic AI roadmap advisory",
    ],
  },
];

const hiddenCosts = [
  {
    icon: Layers,
    title: "Data Preparation (30-50% of total budget)",
    description:
      "The unglamorous work: cleaning, labeling, deduplicating, and structuring your data. Most companies underestimate this by 2-3x.",
  },
  {
    icon: Cpu,
    title: "Compute Costs (Ongoing)",
    description:
      "GPU/TPU costs for training, inference API costs (OpenAI/Anthropic/Google), and cloud infrastructure. A busy production system can cost EUR 500-5,000/month in compute alone.",
  },
  {
    icon: TrendingUp,
    title: "Model Drift & Retraining",
    description:
      "AI models degrade over time as data distribution changes. Plan for quarterly retraining cycles and ongoing evaluation.",
  },
  {
    icon: BarChart3,
    title: "Monitoring & Observability",
    description:
      "Production AI needs monitoring that goes beyond traditional APM: output quality scoring, hallucination detection, bias tracking, and latency monitoring.",
  },
  {
    icon: AlertTriangle,
    title: "Compliance & Legal (EU AI Act)",
    description:
      "Documentation, risk assessments, conformity assessments, and ongoing compliance management. Budget EUR 10,000-60,000 depending on risk classification.",
  },
  {
    icon: Cloud,
    title: "Team Training & Change Management",
    description:
      "Your team needs to understand how to use, maintain, and govern AI systems. Budget for training programs and process changes.",
  },
];

const buildVsBuy = [
  {
    factor: "Time to Market",
    build: "3-12 months",
    buy: "1-4 weeks",
    winner: "buy",
  },
  {
    factor: "Upfront Cost",
    build: "EUR 50K-500K",
    buy: "EUR 1K-10K/month",
    winner: "buy",
  },
  {
    factor: "Customization",
    build: "Unlimited",
    buy: "Limited to vendor features",
    winner: "build",
  },
  {
    factor: "Data Privacy",
    build: "Full control",
    buy: "Depends on vendor",
    winner: "build",
  },
  {
    factor: "EU AI Act Compliance",
    build: "Your responsibility",
    buy: "Shared with vendor",
    winner: "neutral",
  },
  {
    factor: "Maintenance Burden",
    build: "High (your team)",
    buy: "Low (vendor handles)",
    winner: "buy",
  },
  {
    factor: "Scalability",
    build: "Architecture dependent",
    buy: "Usually built-in",
    winner: "buy",
  },
  {
    factor: "Vendor Lock-in Risk",
    build: "None",
    buy: "High",
    winner: "build",
  },
  {
    factor: "Competitive Advantage",
    build: "Unique IP",
    buy: "Same as competitors",
    winner: "build",
  },
  {
    factor: "Total Cost (3 years)",
    build: "EUR 150K-800K",
    buy: "EUR 36K-360K",
    winner: "depends",
  },
];

const pricingByType = [
  {
    type: "RAG System (Retrieval-Augmented Generation)",
    range: "20,000 - 80,000",
    description:
      "Document Q&A, knowledge base search, internal wiki assistant",
    includes: [
      "Document ingestion pipeline",
      "Vector database setup",
      "LLM integration (OpenAI/Anthropic/local)",
      "Search relevance tuning",
    ],
  },
  {
    type: "AI Agents / Workflows",
    range: "30,000 - 120,000",
    description:
      "Autonomous task execution, multi-step workflows, tool-using agents",
    includes: [
      "Agent architecture design",
      "Tool/API integration",
      "Safety guardrails and fallbacks",
      "Human-in-the-loop mechanisms",
    ],
  },
  {
    type: "Voice AI / Conversational",
    range: "40,000 - 150,000",
    description:
      "Voice assistants, phone bots, real-time transcription systems",
    includes: [
      "Speech-to-text / text-to-speech pipeline",
      "Natural language understanding",
      "Dialogue management",
      "Telephony integration",
    ],
  },
  {
    type: "Compliance Automation",
    range: "25,000 - 90,000",
    description:
      "Automated compliance checks, document review, risk classification",
    includes: [
      "Regulatory rule engine",
      "Document analysis pipeline",
      "Risk scoring models",
      "Audit trail and reporting",
    ],
  },
];

export default function AiCostGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          {
            name: "AI Cost Guide 2026",
            url: "/resources/ai-cost-guide",
          },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Resources", url: "/resources" },
              { name: "AI Cost Guide 2026", url: "/resources/ai-cost-guide" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Free Guide</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                How Much Does AI Cost?
              </h1>
              <p className="text-2xl text-gray-500 font-medium mb-4">
                The Complete 2026 Guide for European Companies
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Real pricing data from dozens of AI projects. No fluff, no
                &quot;it depends&quot; without context. Actual numbers you can
                use in your business case.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  20 min read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated June 2026
                </span>
                <span className="flex items-center gap-1">
                  <Euro className="w-4 h-4" />
                  All prices in EUR
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav>
                  <ol className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-start gap-2"
                        >
                          <span className="text-gray-400 font-mono text-xs mt-0.5">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                {/* Share Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Share this guide
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.cloudrix.io/resources/ai-cost-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0A66C2] text-white text-xs font-medium py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://www.cloudrix.io/resources/ai-cost-guide&text=How%20Much%20Does%20AI%20Cost%3F%20Complete%202026%20Guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 text-white text-xs font-medium py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-16">
              {/* Section 1: Overview */}
              <section id="overview">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI Project Cost Overview
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Before diving into details, here is the big picture. AI
                  project costs vary dramatically based on scope, complexity, and
                  whether you are building from scratch or integrating existing
                  models.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Project Type
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Cost Range (EUR)
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Timeline
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200 hidden sm:table-cell">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectTypes.map((project, index) => (
                        <tr
                          key={project.type}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }
                        >
                          <td className="p-4 text-sm font-medium text-gray-900 border-b border-gray-100">
                            {project.type}
                          </td>
                          <td className="p-4 text-sm text-blue-600 font-semibold border-b border-gray-100">
                            {project.range}
                          </td>
                          <td className="p-4 text-sm text-gray-600 border-b border-gray-100">
                            {project.timeline}
                          </td>
                          <td className="p-4 text-sm text-gray-500 border-b border-gray-100 hidden sm:table-cell">
                            {project.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 2: PoC Costs */}
              <section id="poc-costs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Proof of Concept Costs
                  </h2>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <Euro className="w-6 h-6 text-green-600" />
                    <span className="text-3xl font-bold text-gray-900">
                      15,000 - 25,000
                    </span>
                  </div>
                  <p className="text-green-800 text-sm">
                    Typical PoC cost for a well-scoped AI project. This validates
                    whether AI can solve your specific problem before you invest
                    in production.
                  </p>
                </div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  What you get for that investment:
                </h3>
                <div className="space-y-3">
                  {pocIncludes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-blue-900 text-sm">
                    <strong>Pro tip:</strong> A good PoC should answer one
                    question: &quot;Can AI solve this problem well enough to
                    justify production investment?&quot; If your vendor is
                    building a PoC that costs more than EUR 25K, they are
                    probably building an MVP.
                  </p>
                </div>
              </section>

              {/* Section 3: Production Costs */}
              <section id="production-costs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Production Deployment Costs
                  </h2>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <Euro className="w-6 h-6 text-indigo-600" />
                    <span className="text-3xl font-bold text-gray-900">
                      30,000 - 200,000
                    </span>
                  </div>
                  <p className="text-indigo-800 text-sm">
                    Production deployments require scalable infrastructure,
                    monitoring, security, and compliance — all of which add cost
                    beyond the core model work.
                  </p>
                </div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Where the money goes:
                </h3>
                <div className="space-y-3">
                  {productionBreakdown.map((item) => (
                    <div
                      key={item.component}
                      className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <div className="w-20 text-right flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-600">
                          {item.percentage}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {item.component}
                        </h4>
                        <p className="text-gray-500 text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Retainer Costs */}
              <section id="retainer-costs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Monthly Retainer Costs
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  AI systems are not &quot;set and forget.&quot; They need
                  ongoing maintenance, monitoring, and optimization. Here is what
                  typical retainer packages look like:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {retainerTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-1">
                        <Euro className="w-4 h-4 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">
                          {tier.price}
                        </span>
                        <span className="text-gray-500 text-sm">/month</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        {tier.hours}
                      </p>
                      <ul className="space-y-2">
                        {tier.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckSquare className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Hidden Costs */}
              <section id="hidden-costs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Hidden Costs People Forget
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  The project quote is never the full picture. Here are the costs
                  that consistently catch companies off guard:
                </p>
                <div className="space-y-4">
                  {hiddenCosts.map((cost) => {
                    const Icon = cost.icon;
                    return (
                      <div
                        key={cost.title}
                        className="flex items-start gap-4 bg-yellow-50 border border-yellow-100 rounded-xl p-5"
                      >
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                            {cost.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {cost.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 6: Build vs Buy */}
              <section id="build-vs-buy">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Build vs Buy Comparison Matrix
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  The eternal question. Here is a factor-by-factor comparison to
                  help you decide:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Factor
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-blue-700 border-b border-gray-200">
                          Build Custom
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-700 border-b border-gray-200">
                          Buy Off-the-Shelf
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildVsBuy.map((row, index) => (
                        <tr
                          key={row.factor}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }
                        >
                          <td className="p-4 text-sm font-medium text-gray-900 border-b border-gray-100">
                            {row.factor}
                          </td>
                          <td
                            className={`p-4 text-sm border-b border-gray-100 ${
                              row.winner === "build"
                                ? "text-blue-700 font-semibold"
                                : "text-gray-600"
                            }`}
                          >
                            {row.build}
                          </td>
                          <td
                            className={`p-4 text-sm border-b border-gray-100 ${
                              row.winner === "buy"
                                ? "text-purple-700 font-semibold"
                                : "text-gray-600"
                            }`}
                          >
                            {row.buy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-gray-700 text-sm">
                    <strong>Bottom line:</strong> Buy when the problem is
                    well-understood and commoditized. Build when AI is your
                    competitive advantage, you have strict data privacy
                    requirements, or off-the-shelf solutions do not fit your
                    workflow.
                  </p>
                </div>
              </section>

              {/* Section 7: Reduce Costs */}
              <section id="reduce-costs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    How to Reduce AI Costs
                  </h2>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      title: "Start with a PoC, not a platform",
                      description:
                        "Validate the business case with a EUR 15-25K proof of concept before committing to a EUR 100K+ production build. Most AI projects that fail do so because the problem was wrong, not the technology.",
                    },
                    {
                      title: "Use managed AI services over custom models",
                      description:
                        "GPT-4, Claude, and Gemini are good enough for 80% of use cases. Fine-tuning a custom model costs 3-5x more and rarely delivers proportional value improvement.",
                    },
                    {
                      title: "Choose the right model size",
                      description:
                        "Do not use GPT-4 when GPT-4o-mini works. Smaller models are 10-50x cheaper per token and often perform comparably for routine tasks. Use large models only for complex reasoning.",
                    },
                    {
                      title: "Implement aggressive caching",
                      description:
                        "Cache LLM responses for repeated queries. A good caching strategy can reduce API costs by 40-70% for systems with repetitive patterns.",
                    },
                    {
                      title: "Invest in data quality upfront",
                      description:
                        "Clean data reduces the iteration cycles needed. Every dollar spent on data preparation saves three to five dollars on model development and debugging.",
                    },
                    {
                      title: "Use open-source where possible",
                      description:
                        "Open-source models (Llama, Mistral, Qwen) eliminate per-token API costs. Combined with efficient serving frameworks (vLLM, TGI), you can cut inference costs by 70-90%.",
                    },
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {tip.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 8: Pricing by Type */}
              <section id="pricing-by-type">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                    08
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pricing by Project Type
                  </h2>
                </div>
                <div className="space-y-6">
                  {pricingByType.map((project) => (
                    <div
                      key={project.type}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {project.type}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <Euro className="w-4 h-4 text-blue-600" />
                          <span className="text-lg font-bold text-blue-600">
                            {project.range}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 9: CTA */}
              <section id="get-estimate">
                <div className="bg-gradient-to-br from-green-600 to-blue-700 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Get a Custom Estimate for Your AI Project
                  </h2>
                  <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                    Every project is different. Use our AI Scope Generator to get
                    a tailored estimate based on your specific requirements,
                    timeline, and budget constraints.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/ai-tools/scope-generator"
                      className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
                    >
                      Try the AI Scope Generator
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/contact?type=ai"
                      className="inline-flex items-center bg-green-500/20 text-white border border-white/30 px-8 py-4 rounded-lg hover:bg-green-500/30 transition-colors font-medium text-lg"
                    >
                      Talk to an Expert
                    </Link>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;
