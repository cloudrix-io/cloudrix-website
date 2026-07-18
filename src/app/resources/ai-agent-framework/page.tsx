import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  CheckSquare,
  XCircle,
  Cpu,
  Shield,
  Euro,
  Users,
  Zap,
  AlertTriangle,
  ChevronRight,
  Settings,
  GitBranch,
  Target,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title:
    "Build vs Buy: AI Agent Decision Framework - Complete Guide | Cloudrix",
  description:
    "Decision framework for building vs buying AI agents. Compare LangChain, CrewAI, Anthropic SDK, and OpenAI. Total cost of ownership analysis, risk assessment, and implementation roadmap for European companies.",
  openGraph: {
    title: "Build vs Buy: AI Agent Decision Framework",
    description:
      "Compare agent frameworks, analyze total cost of ownership, and get an implementation roadmap for AI agents.",
    url: "https://www.cloudrix.io/resources/ai-agent-framework",
    type: "article",
    images: [
      {
        url: "/og?title=Build%20vs%20Buy%3A%20AI%20Agent%20Decision%20Framework&subtitle=The%20Complete%20Guide%20for%20Engineering%20Teams&type=guide",
        width: 1200,
        height: 630,
        alt: "AI Agent Decision Framework",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/resources/ai-agent-framework",
  },
};

const tableOfContents = [
  { id: "when-to-build", label: "When to Build Custom AI Agents" },
  { id: "when-to-buy", label: "When to Buy Off-the-Shelf" },
  { id: "decision-matrix", label: "Decision Matrix" },
  { id: "framework-comparison", label: "Agent Framework Comparison" },
  { id: "tco-analysis", label: "Total Cost of Ownership" },
  { id: "risk-assessment", label: "Risk Assessment Framework" },
  { id: "implementation-roadmap", label: "Implementation Roadmap" },
  { id: "get-guidance", label: "Get Expert Guidance" },
];

const buildReasons = [
  {
    title: "AI is your core competitive advantage",
    description:
      "If your AI agent IS the product or a key differentiator, building custom gives you full control over the experience, performance, and IP.",
  },
  {
    title: "Strict data sovereignty requirements",
    description:
      "GDPR, EU AI Act, or industry regulations that prevent data from leaving your infrastructure. Custom agents can run entirely on-premise or in your own cloud.",
  },
  {
    title: "Complex, domain-specific workflows",
    description:
      "When the agent needs deep knowledge of your business processes, integrates with proprietary systems, or handles edge cases that off-the-shelf tools cannot cover.",
  },
  {
    title: "High-volume, cost-sensitive use cases",
    description:
      "At scale (millions of interactions/month), per-seat SaaS pricing becomes prohibitive. Custom agents with open-source models can cut per-interaction costs by 10-50x.",
  },
  {
    title: "You have a strong engineering team",
    description:
      "Building and maintaining AI agents requires ML ops, prompt engineering, and infrastructure expertise. If your team already has these skills, building is viable.",
  },
];

const buyReasons = [
  {
    title: "Speed to market matters more than customization",
    description:
      "Off-the-shelf solutions can be deployed in days or weeks versus months for custom builds. Critical when you need to validate the use case quickly.",
  },
  {
    title: "The use case is well-understood and commoditized",
    description:
      "Customer support bots, document Q&A, and meeting summarizers are solved problems. Multiple vendors offer mature, battle-tested solutions.",
  },
  {
    title: "Limited AI/ML expertise on your team",
    description:
      "Building AI agents well requires specialized skills. If your team lacks these, you will spend more on learning, mistakes, and maintenance than buying.",
  },
  {
    title: "Compliance is handled by the vendor",
    description:
      "Good vendors provide SOC 2, GDPR, and (increasingly) EU AI Act compliance out of the box. This shifts significant compliance burden off your team.",
  },
  {
    title: "Budget constraints for upfront investment",
    description:
      "SaaS pricing (EUR 500-5,000/month) is easier to justify than a EUR 100K+ custom build, even if total cost over 3 years is higher.",
  },
];

const decisionFactors = [
  {
    factor: "Upfront Investment",
    build: "High (EUR 50K-300K)",
    buy: "Low (EUR 0-5K setup)",
    weight: "High",
  },
  {
    factor: "Time to Deploy",
    build: "3-9 months",
    buy: "1-4 weeks",
    weight: "High",
  },
  {
    factor: "Customization Depth",
    build: "Unlimited",
    buy: "Configuration only",
    weight: "Medium",
  },
  {
    factor: "Data Privacy Control",
    build: "Full (your infra)",
    buy: "Vendor-dependent",
    weight: "High",
  },
  {
    factor: "EU AI Act Compliance",
    build: "Your responsibility",
    buy: "Shared with vendor",
    weight: "High",
  },
  {
    factor: "Ongoing Maintenance",
    build: "1-3 FTEs needed",
    buy: "Vendor handles",
    weight: "Medium",
  },
  {
    factor: "Scalability",
    build: "Architecture-dependent",
    buy: "Usually built-in",
    weight: "Medium",
  },
  {
    factor: "Vendor Lock-in Risk",
    build: "None",
    buy: "Medium to High",
    weight: "Medium",
  },
  {
    factor: "IP Ownership",
    build: "You own everything",
    buy: "Vendor owns the tech",
    weight: "Low-Medium",
  },
  {
    factor: "Cost at Scale (3yr)",
    build: "EUR 200K-600K",
    buy: "EUR 100K-500K",
    weight: "High",
  },
];

const frameworks = [
  {
    name: "LangChain / LangGraph",
    language: "Python / TypeScript",
    bestFor: "Complex, multi-step workflows with state management",
    strengths: [
      "Largest ecosystem and community",
      "LangGraph for stateful, multi-agent workflows",
      "LangSmith for observability and tracing",
      "Extensive integration catalog (500+)",
    ],
    weaknesses: [
      "Steep learning curve, heavy abstractions",
      "Frequent breaking changes between versions",
      "Over-engineered for simple use cases",
      "Performance overhead from abstraction layers",
    ],
    maturity: "Mature",
    pricing: "Open-source (LangSmith paid: $39+/mo)",
  },
  {
    name: "CrewAI",
    language: "Python",
    bestFor: "Multi-agent collaboration with role-based design",
    strengths: [
      "Intuitive role/goal/task paradigm",
      "Built-in agent collaboration patterns",
      "Easy to prototype multi-agent systems",
      "Active community and regular updates",
    ],
    weaknesses: [
      "Less mature than LangChain",
      "Limited production tooling and observability",
      "Smaller integration ecosystem",
      "Can be opinionated about agent structure",
    ],
    maturity: "Growing",
    pricing: "Open-source (Enterprise plan available)",
  },
  {
    name: "Anthropic Agent SDK",
    language: "Python / TypeScript",
    bestFor: "Claude-powered agents with tool use and safety focus",
    strengths: [
      "First-class tool use and computer use",
      "Strong safety guardrails built-in",
      "Excellent for regulated industries",
      "Claude models consistently top benchmarks",
    ],
    weaknesses: [
      "Locked to Anthropic/Claude models",
      "Newer SDK, smaller community",
      "Higher per-token costs than alternatives",
      "Limited multi-agent orchestration patterns",
    ],
    maturity: "Early-mature",
    pricing: "Open-source (API usage: Claude pricing)",
  },
  {
    name: "OpenAI Agents SDK",
    language: "Python / TypeScript",
    bestFor: "GPT-powered agents, Assistants API, function calling",
    strengths: [
      "Seamless GPT model integration",
      "Assistants API with built-in RAG",
      "Strong function calling capabilities",
      "Massive developer community",
    ],
    weaknesses: [
      "Locked to OpenAI models",
      "Assistants API can be opaque and costly",
      "Data privacy concerns for EU companies",
      "Rate limiting at scale",
    ],
    maturity: "Mature",
    pricing: "Open-source (API usage: OpenAI pricing)",
  },
];

const tcoItems = [
  {
    category: "Year 1: Build Phase",
    build: [
      { item: "Architecture & design", cost: "15,000 - 30,000" },
      { item: "Development (3-6 months)", cost: "40,000 - 150,000" },
      { item: "Infrastructure setup", cost: "5,000 - 15,000" },
      { item: "Testing & QA", cost: "10,000 - 25,000" },
      { item: "LLM API costs", cost: "6,000 - 30,000" },
    ],
    buy: [
      { item: "Vendor evaluation", cost: "2,000 - 5,000" },
      { item: "License/subscription", cost: "12,000 - 60,000" },
      { item: "Integration & config", cost: "5,000 - 20,000" },
      { item: "Training", cost: "2,000 - 5,000" },
    ],
  },
  {
    category: "Year 2-3: Operations",
    build: [
      { item: "Maintenance (per year)", cost: "30,000 - 80,000" },
      { item: "Infrastructure (per year)", cost: "12,000 - 60,000" },
      { item: "LLM API costs (per year)", cost: "6,000 - 36,000" },
      { item: "Model updates & retraining", cost: "10,000 - 30,000" },
    ],
    buy: [
      { item: "Subscription (per year)", cost: "12,000 - 60,000" },
      { item: "Additional seats/usage", cost: "3,000 - 15,000" },
      { item: "Custom integrations", cost: "5,000 - 15,000" },
    ],
  },
];

const riskFactors = [
  {
    risk: "Model Dependency",
    impact: "High",
    probability: "Medium",
    mitigation:
      "Abstract model layer, support multiple providers, test with fallback models regularly",
  },
  {
    risk: "Data Quality Degradation",
    impact: "High",
    probability: "High",
    mitigation:
      "Automated data quality monitoring, regular evaluation benchmarks, human review sampling",
  },
  {
    risk: "Compliance Violations",
    impact: "Critical",
    probability: "Medium",
    mitigation:
      "EU AI Act compliance framework, regular audits, documentation automation, legal review cadence",
  },
  {
    risk: "Hallucination / Bad Outputs",
    impact: "High",
    probability: "High",
    mitigation:
      "Output validation layers, confidence scoring, human-in-the-loop for high-stakes decisions, guardrails",
  },
  {
    risk: "Cost Overruns",
    impact: "Medium",
    probability: "High",
    mitigation:
      "Usage monitoring and alerts, budget caps, model right-sizing, caching strategies",
  },
  {
    risk: "Vendor Lock-in (Buy)",
    impact: "Medium",
    probability: "High",
    mitigation:
      "Data export capabilities, abstraction layers, multi-vendor evaluation, contractual safeguards",
  },
  {
    risk: "Talent Dependency (Build)",
    impact: "High",
    probability: "Medium",
    mitigation:
      "Documentation, knowledge sharing, pair programming, avoid single-person dependencies",
  },
];

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Discovery & Scoping",
    duration: "2-3 weeks",
    activities: [
      "Define agent objectives and success metrics",
      "Map data sources and integration points",
      "Evaluate build vs buy based on decision matrix",
      "Select framework or vendor",
      "Define compliance requirements",
    ],
  },
  {
    phase: "Phase 2",
    title: "Prototype & Validate",
    duration: "2-4 weeks",
    activities: [
      "Build minimal viable agent (single use case)",
      "Test with real data in sandbox environment",
      "Evaluate output quality and latency",
      "Estimate production costs at target scale",
      "Stakeholder demo and feedback loop",
    ],
  },
  {
    phase: "Phase 3",
    title: "Production Build",
    duration: "4-12 weeks",
    activities: [
      "Implement full agent logic and tool integrations",
      "Build monitoring and observability stack",
      "Implement guardrails and safety mechanisms",
      "Create comprehensive test suite",
      "Set up CI/CD pipeline for agent deployments",
    ],
  },
  {
    phase: "Phase 4",
    title: "Launch & Scale",
    duration: "2-4 weeks",
    activities: [
      "Staged rollout (internal > beta > production)",
      "Performance optimization and cost tuning",
      "User training and documentation",
      "EU AI Act compliance documentation",
      "Establish ongoing monitoring and review cadence",
    ],
  },
];

export default function AiAgentFrameworkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          {
            name: "AI Agent Decision Framework",
            url: "/resources/ai-agent-framework",
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
              {
                name: "AI Agent Decision Framework",
                url: "/resources/ai-agent-framework",
              },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Free Guide</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Build vs Buy: AI Agent Decision Framework
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                A structured framework for deciding whether to build custom AI
                agents or buy off-the-shelf solutions. Includes framework
                comparisons, TCO analysis, and an implementation roadmap.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  22 min read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated June 2026
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
                      href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.cloudrix.io/resources/ai-agent-framework"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0A66C2] text-white text-xs font-medium py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://www.cloudrix.io/resources/ai-agent-framework&text=Build%20vs%20Buy%3A%20AI%20Agent%20Decision%20Framework"
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
              {/* Section 1: When to Build */}
              <section id="when-to-build">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    When to Build Custom AI Agents
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Building custom AI agents makes sense when the use case is
                  unique enough that off-the-shelf solutions fall short.
                  Here are the five strongest signals:
                </p>
                <div className="space-y-4">
                  {buildReasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-xl p-5"
                    >
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                          {reason.title}
                        </h4>
                        <p className="text-blue-800 text-sm">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2: When to Buy */}
              <section id="when-to-buy">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    When to Buy Off-the-Shelf Solutions
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Buying makes sense more often than most engineering teams want
                  to admit. Here is when it is the smarter choice:
                </p>
                <div className="space-y-4">
                  {buyReasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-purple-50 border border-purple-100 rounded-xl p-5"
                    >
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">
                          {reason.title}
                        </h4>
                        <p className="text-purple-800 text-sm">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Decision Matrix */}
              <section id="decision-matrix">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Decision Matrix: 10 Key Factors
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Score each factor for your specific situation. This matrix
                  helps structure the conversation with stakeholders and ensures
                  you are not making an emotional decision.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Factor
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-blue-700 border-b border-gray-200">
                          Build
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-700 border-b border-gray-200">
                          Buy
                        </th>
                        <th className="text-center p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Weight
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {decisionFactors.map((row, index) => (
                        <tr
                          key={row.factor}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }
                        >
                          <td className="p-4 text-sm font-medium text-gray-900 border-b border-gray-100">
                            {row.factor}
                          </td>
                          <td className="p-4 text-sm text-gray-600 border-b border-gray-100">
                            {row.build}
                          </td>
                          <td className="p-4 text-sm text-gray-600 border-b border-gray-100">
                            {row.buy}
                          </td>
                          <td className="p-4 text-sm text-center border-b border-gray-100">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                row.weight === "High"
                                  ? "bg-red-100 text-red-700"
                                  : row.weight === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {row.weight}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Framework Comparison */}
              <section id="framework-comparison">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comparison of Agent Frameworks
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  If you decide to build, choosing the right framework matters.
                  Here is a head-to-head comparison of the four leading options
                  in 2026:
                </p>
                <div className="space-y-6">
                  {frameworks.map((fw) => (
                    <div
                      key={fw.name}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {fw.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {fw.language}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                              {fw.maturity}
                            </span>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {fw.pricing}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          <strong>Best for:</strong> {fw.bestFor}
                        </p>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-1">
                            <CheckSquare className="w-4 h-4" />
                            Strengths
                          </h4>
                          <ul className="space-y-2">
                            {fw.strengths.map((s) => (
                              <li
                                key={s}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <CheckSquare className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            Weaknesses
                          </h4>
                          <ul className="space-y-2">
                            {fw.weaknesses.map((w) => (
                              <li
                                key={w}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: TCO Analysis */}
              <section id="tco-analysis">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Total Cost of Ownership Analysis
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  The real cost of AI agents extends far beyond the initial
                  build or license fee. Here is a 3-year TCO comparison:
                </p>
                {tcoItems.map((period) => (
                  <div key={period.category} className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                      {period.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Build Custom
                        </h4>
                        <div className="space-y-2">
                          {period.build.map((item) => (
                            <div
                              key={item.item}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-blue-800">
                                {item.item}
                              </span>
                              <span className="font-medium text-blue-900">
                                EUR {item.cost}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Buy Off-the-Shelf
                        </h4>
                        <div className="space-y-2">
                          {period.buy.map((item) => (
                            <div
                              key={item.item}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-purple-800">
                                {item.item}
                              </span>
                              <span className="font-medium text-purple-900">
                                EUR {item.cost}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    3-Year TCO Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Build Custom
                      </span>
                      <span className="text-blue-600 font-bold text-lg">
                        EUR 150K - 600K
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Buy Off-the-Shelf
                      </span>
                      <span className="text-purple-600 font-bold text-lg">
                        EUR 50K - 250K
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">
                    Note: Build costs include engineering salaries allocated to
                    the project. Buy costs can escalate quickly with per-seat or
                    per-interaction pricing at scale.
                  </p>
                </div>
              </section>

              {/* Section 6: Risk Assessment */}
              <section id="risk-assessment">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Risk Assessment Framework
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Every AI agent project carries risk. Use this framework to
                  identify, score, and mitigate the most common risks:
                </p>
                <div className="space-y-4">
                  {riskFactors.map((risk) => (
                    <div
                      key={risk.risk}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={`w-4 h-4 ${
                              risk.impact === "Critical"
                                ? "text-red-500"
                                : risk.impact === "High"
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          />
                          <h4 className="font-semibold text-gray-900">
                            {risk.risk}
                          </h4>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                              risk.impact === "Critical"
                                ? "bg-red-100 text-red-700"
                                : risk.impact === "High"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            Impact: {risk.impact}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                              risk.probability === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            Probability: {risk.probability}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">
                          <strong className="text-gray-900">Mitigation:</strong>{" "}
                          {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Implementation Roadmap */}
              <section id="implementation-roadmap">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Implementation Roadmap Template
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you build or buy, follow this phased approach to
                  minimize risk and maximize learning:
                </p>
                <div className="space-y-6">
                  {roadmapPhases.map((phase, index) => (
                    <div
                      key={phase.phase}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {phase.phase.replace("Phase ", "")}
                        </div>
                        {index < roadmapPhases.length - 1 && (
                          <div className="w-0.5 h-full bg-purple-200 mt-2 min-h-[40px]" />
                        )}
                      </div>
                      <div className="pb-6 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {phase.title}
                          </h3>
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded font-medium">
                            {phase.duration}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {phase.activities.map((activity) => (
                            <div
                              key={activity}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-400" />
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 8: CTA */}
              <section id="get-guidance">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Get Expert Guidance on Your AI Agent Strategy
                  </h2>
                  <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                    This framework gives you the structure. We can help you fill
                    in the details. Our team has built and deployed AI agents for
                    companies across Europe — from PoC to production.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact?type=ai"
                      className="inline-flex items-center bg-white text-purple-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
                    >
                      Book a Strategy Session
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/ai-services"
                      className="inline-flex items-center bg-purple-500/20 text-white border border-white/30 px-8 py-4 rounded-lg hover:bg-purple-500/30 transition-colors font-medium text-lg"
                    >
                      Explore AI Services
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
