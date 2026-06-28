import { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Brain,
  Database,
  Scale,
  MessageSquare,
  Network,
  Workflow,
  Cpu,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "AI Services — Agent Development, RAG Systems & EU AI Act Compliance",
  description:
    "AI agent development, RAG systems, EU AI Act compliance, and conversational AI for European companies. Production-first approach, 50-70% lower cost than Big Four rates.",
  openGraph: {
    title: "AI Services — Agent Development, RAG Systems & EU AI Act Compliance | Cloudrix",
    description:
      "AI agent development, RAG systems, EU AI Act compliance, and conversational AI for European companies. Production-first approach.",
    url: "https://www.cloudrix.io/ai-services",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("AI That Actually Ships to Production")}&subtitle=${encodeURIComponent("Agents, RAG, EU AI Act Compliance")}&type=services`,
        width: 1200,
        height: 630,
        alt: "Cloudrix AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services — Agent Development, RAG Systems & EU AI Act Compliance | Cloudrix",
    description:
      "AI agent development, RAG systems, EU AI Act compliance, and conversational AI for European companies.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/ai-services",
  },
};

const marketStats = [
  { value: "$539B", label: "Global AI Market 2026" },
  { value: "88%", label: "AI Projects That Fail to Ship" },
  { value: "\u20AC35M", label: "Max EU AI Act Fine" },
  { value: "12%", label: "Orgs With Deployed AI Agents" },
];

const tier1Services = [
  {
    icon: Bot,
    title: "AI Agent Development",
    price: "\u20AC30K\u2013\u20AC200K",
    description:
      "Custom autonomous agents that handle complex workflows, make decisions, and integrate with your existing systems. From customer service to internal operations.",
    features: [
      "Multi-step reasoning and tool use",
      "Memory and context management",
      "Human-in-the-loop safeguards",
      "Enterprise-grade error handling",
      "Observability and monitoring built in",
    ],
  },
  {
    icon: Database,
    title: "RAG System Development",
    price: "\u20AC20K\u2013\u20AC80K PoC, \u20AC60K\u2013\u20AC200K production",
    description:
      "Retrieval-Augmented Generation systems that give your AI accurate, up-to-date answers from your own data. No hallucinations, no stale information.",
    features: [
      "Custom embedding pipelines",
      "Hybrid search (semantic + keyword)",
      "Document chunking strategies",
      "Citation and source tracking",
      "Continuous data ingestion",
    ],
  },
  {
    icon: Scale,
    title: "EU AI Act Compliance",
    price: "\u20AC2,500 quick scan to \u20AC60K full program",
    description:
      "Get compliant before the August 2, 2026 deadline. Risk classification, conformity assessments, technical documentation, and governance frameworks.",
    features: [
      "AI system risk classification",
      "Fundamental Rights Impact Assessment",
      "Technical documentation generation",
      "Governance framework setup",
      "Ongoing compliance monitoring",
    ],
  },
  {
    icon: MessageSquare,
    title: "Conversational AI & Voice",
    price: "\u20AC15K\u2013\u20AC200K",
    description:
      "Intelligent chatbots and voice assistants that actually understand your customers. Multi-language, multi-channel, with seamless human handoff.",
    features: [
      "Natural language understanding",
      "Multi-language support (EU focus)",
      "Voice-to-text and text-to-voice",
      "CRM and ticketing integration",
      "Sentiment analysis and escalation",
    ],
  },
];

const tier2Services = [
  {
    icon: Network,
    title: "MCP Server Development",
    price: "Early monetization opportunity",
    description:
      "Build Model Context Protocol servers that let AI agents securely access your tools and data. First-mover advantage in the emerging MCP ecosystem.",
    features: [
      "Custom MCP server architecture",
      "Secure tool exposure",
      "Authentication and authorization",
      "Rate limiting and monitoring",
    ],
  },
  {
    icon: Workflow,
    title: "LLM Integration & API Orchestration",
    price: "\u20AC15K\u2013\u20AC50K",
    description:
      "Connect large language models to your existing systems with robust API orchestration, fallback strategies, and cost optimization.",
    features: [
      "Multi-provider LLM routing",
      "Cost optimization strategies",
      "Fallback and retry logic",
      "Prompt management systems",
    ],
  },
  {
    icon: Cpu,
    title: "AI Infrastructure & MLOps",
    price: "\u20AC20K\u2013\u20AC80K setup + retainer",
    description:
      "Production-grade AI infrastructure with monitoring, versioning, and automated pipelines. Run models at scale without the operational headache.",
    features: [
      "Model serving infrastructure",
      "CI/CD for ML pipelines",
      "Cost monitoring and optimization",
      "Auto-scaling and load balancing",
    ],
  },
];

const techStack = [
  {
    category: "LLM Providers",
    items: ["Claude (Anthropic)", "GPT-4o (OpenAI)", "Gemini (Google)", "Mistral", "Llama 3"],
  },
  {
    category: "Agent Frameworks",
    items: ["LangChain", "LlamaIndex", "CrewAI", "Autogen", "Custom frameworks"],
  },
  {
    category: "Infrastructure",
    items: ["AWS Bedrock", "Azure OpenAI", "vLLM", "Kubernetes", "Docker"],
  },
  {
    category: "Vector DBs",
    items: ["Pinecone", "Weaviate", "Qdrant", "pgvector", "ChromaDB"],
  },
  {
    category: "Monitoring",
    items: ["LangFuse", "LangSmith", "Helicone", "Custom dashboards", "OpenTelemetry"],
  },
  {
    category: "Integration",
    items: ["MCP Servers", "REST / GraphQL", "Webhooks", "Message queues", "gRPC"],
  },
];

const differentiators = [
  {
    icon: Shield,
    title: "EU-Native Compliance",
    description:
      "GDPR + AI Act expertise baked into every project. Netherlands-based, EU jurisdiction. No offshore compliance gaps.",
  },
  {
    icon: Zap,
    title: "Production-First",
    description:
      "We ship to production, not just PoCs. Every project is built with monitoring, error handling, and scalability from day one.",
  },
  {
    icon: Brain,
    title: "Full Stack AI",
    description:
      "From infrastructure to UI, one team handles it all. No handoffs between vendors, no integration nightmares.",
  },
  {
    icon: TrendingUp,
    title: "50-70% Lower Cost",
    description:
      "Boutique pricing vs Big Four rates. Senior engineers without the agency overhead. Every euro goes to engineering, not PowerPoints.",
  },
];

const funnelSteps = [
  { stage: "Free AI Tool", description: "Try our compliance scanner or readiness assessment", color: "bg-indigo-100 text-indigo-700" },
  { stage: "Strategy Call", description: "30-minute free consultation to map your AI opportunity", color: "bg-indigo-200 text-indigo-800" },
  { stage: "Readiness Assessment", description: "\u20AC5\u2013\u20AC8K \u2014 1\u20132 week deep dive into your AI readiness", color: "bg-indigo-300 text-indigo-900" },
  { stage: "PoC Sprint", description: "\u20AC15\u2013\u20AC25K \u2014 4\u20136 week proof of concept with real data", color: "bg-purple-300 text-purple-900" },
  { stage: "Full Deployment", description: "\u20AC30\u2013\u20AC100K \u2014 Production system with monitoring and support", color: "bg-purple-400 text-white" },
  { stage: "Monthly Retainer", description: "\u20AC8\u2013\u20AC20K/mo \u2014 Continuous improvement and operations", color: "bg-purple-600 text-white" },
];

export default function AIServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "AI Services", url: "/ai-services" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-6">
                <AlertTriangle className="w-4 h-4 mr-2" />
                EU AI Act Deadline: August 2, 2026
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                AI That Actually Ships to Production
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                88% of AI agent projects fail. We&apos;re in the 12% that don&apos;t.
                From RAG systems to EU AI Act compliance, we build AI that works in the real world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact?type=ai"
                  className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg group"
                >
                  Book AI Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-lg"
                >
                  See AI Case Studies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Market Urgency Stats */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {marketStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tier 1 Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Tier 1 \u2014 Highest Demand
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Core AI Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The services European companies need most right now. Battle-tested approaches with proven ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tier1Services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-indigo-100 rounded-xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm mb-4">
                      {service.price}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tier 2 Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                Tier 2 \u2014 Strategic Growth
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Emerging AI Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                First-mover advantage in rapidly growing AI capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tier2Services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-purple-600 font-medium text-sm mb-4">
                      {service.price}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Tech Stack */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our AI Tech Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work with the best tools in the ecosystem \u2014 and know when to use each one.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((category, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    {category.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EU AI Act Urgency Banner */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-red-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                EU AI Act Deadline: August 2, 2026
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Non-compliance means fines up to &euro;35M or 7% of global turnover.
              Most companies need 6\u201312 months to get compliant. The clock is ticking.
            </p>
            <Link
              href="/eu-ai-act"
              className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg group"
            >
              Check Your AI Act Compliance
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Why Cloudrix for AI */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Cloudrix for AI
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re not another AI consultancy with a pitch deck. We&apos;re engineers who ship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center p-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upsell Funnel */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Journey to Production AI
              </h2>
              <p className="text-xl text-gray-600">
                Start small, prove value, then scale. No big-bang commitments.
              </p>
            </div>

            <div className="space-y-4">
              {funnelSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.color}`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 rounded-lg px-6 py-4 ${step.color}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-semibold">{step.stage}</span>
                      <span className="text-sm opacity-90">{step.description}</span>
                    </div>
                  </div>
                  {index < funnelSteps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Competitors Are Already Building AI
            </h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Every month you wait, the gap widens. The EU AI Act deadline is approaching.
              Your competitors are automating. The question isn&apos;t whether to adopt AI \u2014
              it&apos;s whether you&apos;ll lead or follow.
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
                href="/ai-tools"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                Try Free AI Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
