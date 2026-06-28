import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle, Zap, Users, Building2, Scale, Bot, Wrench, Search } from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing — Engineering & AI Services",
  description:
    "Transparent pricing for cloud architecture, software development, AI services, and DevOps. Project-based, dedicated teams, AI deployments, or enterprise partnerships. EUR invoicing, no hidden fees.",
  openGraph: {
    title: "Pricing — Engineering & AI Services",
    description:
      "Transparent pricing for cloud architecture, software development, AI services, and DevOps. Project-based, dedicated teams, AI deployments, or enterprise partnerships.",
    url: "https://www.cloudrix.io/pricing",
    type: "website",
    images: [
      {
        url: "/og?title=Transparent%20Pricing&subtitle=No%20hidden%20fees.%20EUR%20invoicing.&type=pricing",
        width: 1200,
        height: 630,
        alt: "Cloudrix Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Engineering & AI Services",
    description:
      "Transparent pricing for cloud architecture, software development, AI services, and DevOps.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/pricing",
  },
};

// Entry-level engagements — low-risk first step
const entryTiers = [
  {
    name: "Quick Win Sprint",
    description: "One focused problem solved in one week. Low risk, high value.",
    icon: Wrench,
    price: "€2,500",
    priceDetail: "1-week sprint",
    highlight: false,
    features: [
      "One clearly defined problem",
      "5 days of focused engineering",
      "Working solution delivered",
      "Full source code ownership",
      "Summary report with recommendations",
    ],
    ideal: ["Bug fixing", "Performance bottleneck", "Security audit", "CI/CD setup"],
    cta: "Book a Quick Win",
    ctaLink: "/contact?type=quick-win",
  },
  {
    name: "Architecture Audit",
    description: "Deep technical review of your codebase, infrastructure, or AI systems",
    icon: Search,
    price: "€5,000",
    priceDetail: "2-week engagement",
    highlight: true,
    popular: true,
    features: [
      "Comprehensive code & architecture review",
      "Security vulnerability assessment",
      "Performance analysis",
      "Detailed report with actionable recommendations",
      "1-hour debrief & Q&A call",
      "90-day follow-up check-in",
    ],
    ideal: ["Pre-funding due diligence", "Pre-migration assessment", "Technical debt evaluation", "AI system audit"],
    cta: "Get an Audit",
    ctaLink: "/contact?type=audit",
  },
];

const pricingTiers = [
  {
    name: "Project-Based",
    description: "Perfect for defined scope projects with clear deliverables",
    icon: Zap,
    price: "From €15,000",
    priceDetail: "per project",
    highlight: false,
    features: [
      "Fixed scope & timeline",
      "Dedicated project manager",
      "Weekly progress reports",
      "Source code ownership",
      "30-day post-delivery support",
      "Documentation included",
    ],
    ideal: ["MVPs & Prototypes", "Cloud migrations", "System integrations", "Performance optimization"],
    cta: "Get a Quote",
    ctaLink: "/contact?type=project",
  },
  {
    name: "Dedicated Team",
    description: "Scale your engineering capacity with senior developers",
    icon: Users,
    price: "From €8,500",
    priceDetail: "per engineer/month",
    highlight: true,
    popular: true,
    features: [
      "Senior engineers (7+ years exp)",
      "Full-time dedication",
      "Direct Slack/Teams access",
      "EU timezone overlap",
      "Flexible team scaling",
      "No long-term commitment",
      "Weekly/daily standups",
      "Transparent time tracking",
    ],
    ideal: ["Ongoing development", "Team augmentation", "Long-term partnerships", "Product development"],
    cta: "Build Your Team",
    ctaLink: "/contact?type=team",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large-scale digital transformation",
    icon: Building2,
    price: "Custom",
    priceDetail: "tailored to your needs",
    highlight: false,
    features: [
      "Dedicated account manager",
      "Custom SLA agreements",
      "On-site workshops available",
      "Multi-team coordination",
      "24/7 support options",
      "Volume discounts",
      "Strategic consulting",
      "Executive reporting",
    ],
    ideal: ["Digital transformation", "Multi-year programs", "Enterprise migrations", "Technical due diligence"],
    cta: "Contact Sales",
    ctaLink: "/contact?type=enterprise",
  },
];

const aiPricingTiers = [
  {
    name: "AI Act Quick Scan",
    description: "1-day EU AI Act risk assessment for your AI systems",
    icon: Scale,
    price: "€2,500",
    priceDetail: "fixed price",
    highlight: false,
    features: [
      "AI system inventory",
      "Risk classification per system",
      "Priority action items",
      "Executive summary report",
      "1-hour debrief call",
    ],
    ideal: ["Companies using AI", "Pre-audit preparation", "Board reporting", "Quick compliance check"],
    cta: "Book Quick Scan",
    ctaLink: "/contact?type=ai-act-scan",
  },
  {
    name: "AI PoC Sprint",
    description: "Prove AI value with a focused 4-6 week prototype",
    icon: Zap,
    price: "From €15,000",
    priceDetail: "4-6 weeks",
    highlight: true,
    popular: true,
    features: [
      "Problem definition & data audit",
      "Architecture design",
      "Working prototype",
      "Performance benchmarks",
      "Production roadmap",
      "EU AI Act compliance review",
      "Knowledge transfer session",
    ],
    ideal: ["RAG system proof of concept", "AI agent prototype", "Chatbot MVP", "Voice AI pilot"],
    cta: "Start Your PoC",
    ctaLink: "/contact?type=ai-poc",
  },
  {
    name: "Full AI Deployment",
    description: "Production-grade AI system from design to deployment",
    icon: Bot,
    price: "From €30,000",
    priceDetail: "project-based",
    highlight: false,
    features: [
      "End-to-end AI system build",
      "Production infrastructure",
      "Monitoring & observability",
      "EU AI Act compliance built-in",
      "Multi-language support",
      "Human escalation flows",
      "Load testing & optimization",
      "3-month post-launch support",
    ],
    ideal: ["AI agent deployment", "Enterprise RAG systems", "Voice AI platforms", "AI-powered products"],
    cta: "Plan Your Deployment",
    ctaLink: "/contact?type=ai-deployment",
  },
];

const comparisonFeatures = [
  { feature: "Senior Engineers (7+ years)", project: true, team: true, enterprise: true },
  { feature: "Fixed Price Option", project: true, team: false, enterprise: true },
  { feature: "Flexible Scaling", project: false, team: true, enterprise: true },
  { feature: "Dedicated Project Manager", project: true, team: true, enterprise: true },
  { feature: "Source Code Ownership", project: true, team: true, enterprise: true },
  { feature: "EU Timezone Overlap", project: true, team: true, enterprise: true },
  { feature: "Direct Team Communication", project: "Limited", team: true, enterprise: true },
  { feature: "Custom SLA", project: false, team: "Optional", enterprise: true },
  { feature: "On-site Workshops", project: false, team: "Optional", enterprise: true },
  { feature: "24/7 Support", project: false, team: "Optional", enterprise: true },
  { feature: "Volume Discounts", project: false, team: "5+ engineers", enterprise: true },
  { feature: "Strategic Consulting", project: false, team: "Optional", enterprise: true },
];

const faqs = [
  {
    question: "How does your pricing work?",
    answer:
      "We offer three engagement models: Project-based for defined scope work, Dedicated Teams for ongoing development, and Enterprise for large-scale transformations. All prices are in EUR with transparent invoicing. No hidden fees, no surprises.",
  },
  {
    question: "What's included in the hourly/monthly rate?",
    answer:
      "Our rates include the engineer's time, project management overhead, communication tools, and standard support. We don't charge extra for meetings, code reviews, or documentation. Enterprise clients can customize SLAs and support levels.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No. For dedicated teams, we operate on a monthly basis with 30 days notice. We believe in earning your business through results, not contracts. Enterprise agreements can include longer terms with corresponding discounts.",
  },
  {
    question: "How do you handle payment?",
    answer:
      "We invoice in EUR via our Netherlands entity (Cloudrix). Project-based work typically uses milestone payments (30% upfront, 40% mid-project, 30% on delivery). Dedicated teams are invoiced monthly in advance. We accept bank transfer and major credit cards.",
  },
  {
    question: "What if the project scope changes?",
    answer:
      "We use agile methodologies and expect some scope evolution. Minor adjustments are handled within sprints. For significant scope changes, we'll provide a change order with updated timeline and cost before proceeding. Transparency is key.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes. We offer volume discounts for teams of 5+ engineers, long-term commitment discounts (6+ months), and startup-friendly rates for early-stage companies with equity consideration. Contact us to discuss your situation.",
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "MVPs typically take 8-12 weeks. Cloud migrations range from 2-6 months depending on complexity. Dedicated team engagements can start within 1-2 weeks of signing. We'll provide a detailed timeline during the proposal phase.",
  },
  {
    question: "How do you ensure quality?",
    answer:
      "All code goes through peer review, automated testing, and security scanning. We maintain 80%+ test coverage on critical paths. Our engineers average 8+ years of hands-on production experience.",
  },
  {
    question: "What AI services do you offer?",
    answer:
      "We offer AI agent development, RAG system implementation, EU AI Act compliance consulting, conversational AI & voice agents, MCP server development, LLM integration, and AI infrastructure setup. Every engagement includes EU AI Act compliance review.",
  },
  {
    question: "How much does an AI project cost?",
    answer:
      "AI projects range from €2,500 for a quick EU AI Act compliance scan to €200K+ for full enterprise AI agent deployments. Most mid-market projects fall in the €15K-€80K range. We always start with a free strategy call to scope your needs accurately.",
  },
  {
    question: "Do you help with EU AI Act compliance?",
    answer:
      "Yes, EU AI Act compliance is one of our core specialties. We offer quick scans (€2,500), full compliance audits (€8K-€15K), implementation programs (€25K-€60K), and ongoing governance retainers. The full compliance deadline is August 2, 2026 — we recommend starting now.",
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Pricing", url: "/pricing" }]} />
        </div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Transparent Pricing, No Surprises
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Senior engineers and AI specialists at fair rates. Start small with a €2,500 sprint
                or go deep with a dedicated team. EUR invoicing from a Dutch entity. No hidden fees.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  EUR Invoicing
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  No Hidden Fees
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  Flexible Terms
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Entry-Level Engagements */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Wrench className="w-4 h-4" />
                <span>Start Small, Zero Risk</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Not Ready for a Big Project? Start Here.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Try us with a low-risk engagement first. See the quality of our work before committing to a larger project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {entryTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-8 ${
                      tier.highlight
                        ? "bg-green-600 text-white ring-4 ring-green-600 ring-offset-2"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                          Recommended First Step
                        </span>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                      tier.highlight ? "bg-green-500" : "bg-green-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${tier.highlight ? "text-white" : "text-green-600"}`} />
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-6 ${tier.highlight ? "text-green-100" : "text-gray-600"}`}>
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ml-2 ${tier.highlight ? "text-green-100" : "text-gray-500"}`}>
                        {tier.priceDetail}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                            tier.highlight ? "text-green-200" : "text-green-500"
                          }`} />
                          <span className={tier.highlight ? "text-green-50" : "text-gray-700"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mb-6 p-4 rounded-lg ${
                      tier.highlight ? "bg-green-500/50" : "bg-gray-50"
                    }`}>
                      <p className={`text-xs font-semibold mb-2 ${
                        tier.highlight ? "text-green-200" : "text-gray-500"
                      }`}>
                        IDEAL FOR
                      </p>
                      <ul className="space-y-1">
                        {tier.ideal.map((item, idx) => (
                          <li key={idx} className={`text-sm ${
                            tier.highlight ? "text-green-100" : "text-gray-600"
                          }`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.ctaLink}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                        tier.highlight
                          ? "bg-white text-green-600 hover:bg-gray-100"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Full Engagement Models</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">For larger projects and ongoing partnerships</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-8 ${
                      tier.highlight
                        ? "bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                      tier.highlight ? "bg-blue-500" : "bg-blue-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${tier.highlight ? "text-white" : "text-blue-600"}`} />
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-6 ${tier.highlight ? "text-blue-100" : "text-gray-600"}`}>
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ml-2 ${tier.highlight ? "text-blue-100" : "text-gray-500"}`}>
                        {tier.priceDetail}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                            tier.highlight ? "text-blue-200" : "text-green-500"
                          }`} />
                          <span className={tier.highlight ? "text-blue-50" : "text-gray-700"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mb-6 p-4 rounded-lg ${
                      tier.highlight ? "bg-blue-500/50" : "bg-gray-50"
                    }`}>
                      <p className={`text-xs font-semibold mb-2 ${
                        tier.highlight ? "text-blue-200" : "text-gray-500"
                      }`}>
                        IDEAL FOR
                      </p>
                      <ul className="space-y-1">
                        {tier.ideal.map((item, idx) => (
                          <li key={idx} className={`text-sm ${
                            tier.highlight ? "text-blue-100" : "text-gray-600"
                          }`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.ctaLink}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                        tier.highlight
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Services Pricing */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>AI & Machine Learning</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Services Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From quick compliance scans to full AI deployments. Transparent pricing, no surprises.
                EU AI Act compliance included in every engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiPricingTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-8 ${
                      tier.highlight
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-600 ring-offset-2"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                      tier.highlight ? "bg-indigo-500" : "bg-indigo-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${tier.highlight ? "text-white" : "text-indigo-600"}`} />
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-6 ${tier.highlight ? "text-indigo-100" : "text-gray-600"}`}>
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ml-2 ${tier.highlight ? "text-indigo-100" : "text-gray-500"}`}>
                        {tier.priceDetail}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                            tier.highlight ? "text-indigo-200" : "text-green-500"
                          }`} />
                          <span className={tier.highlight ? "text-indigo-50" : "text-gray-700"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mb-6 p-4 rounded-lg ${
                      tier.highlight ? "bg-indigo-500/50" : "bg-gray-50"
                    }`}>
                      <p className={`text-xs font-semibold mb-2 ${
                        tier.highlight ? "text-indigo-200" : "text-gray-500"
                      }`}>
                        IDEAL FOR
                      </p>
                      <ul className="space-y-1">
                        {tier.ideal.map((item, idx) => (
                          <li key={idx} className={`text-sm ${
                            tier.highlight ? "text-indigo-100" : "text-gray-600"
                          }`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.ctaLink}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                        tier.highlight
                          ? "bg-white text-indigo-600 hover:bg-gray-100"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* AI Retainer Option */}
            <div className="mt-12 bg-white border-2 border-indigo-200 rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Governance Retainer</h3>
                  <p className="text-gray-600">Ongoing AI compliance monitoring, model updates, and optimization.</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-2">€3,000 - €8,000<span className="text-sm text-gray-500 font-normal">/month</span></p>
                </div>
                <Link
                  href="/contact?type=ai-retainer"
                  className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold whitespace-nowrap"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Compare Plans
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the right engagement model for your needs
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Project-Based</th>
                    <th className="px-6 py-4 text-center font-semibold bg-blue-600">Dedicated Team</th>
                    <th className="px-6 py-4 text-center font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-gray-900 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.project === "boolean" ? (
                          row.project ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )
                        ) : (
                          <span className="text-gray-600 text-sm">{row.project}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-blue-50">
                        {typeof row.team === "boolean" ? (
                          row.team ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )
                        ) : (
                          <span className="text-gray-600 text-sm">{row.team}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )
                        ) : (
                          <span className="text-gray-600 text-sm">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Hourly Rate Context */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our Rates Compare to Market
              </h2>
              <p className="text-lg text-gray-600">
                Our dedicated team rate of €8,500/month works out to ~€50/hour at 170 hours/month.
                For context, here&apos;s what senior talent costs across regions:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { region: "Netherlands freelancer", rate: "€80–€150/hr" },
                { region: "Germany", rate: "€85–€180/hr" },
                { region: "UK", rate: "£75–£175/hr" },
                { region: "US mid-tier", rate: "$100–$200/hr" },
                { region: "Cloudrix dedicated", rate: "~€50/hr", highlight: true },
              ].map((row, idx) => (
                <div key={idx} className={`flex justify-between items-center px-4 py-3 rounded-lg ${
                  row.highlight ? "bg-blue-600 text-white font-semibold" : "bg-white border border-gray-200"
                }`}>
                  <span>{row.region}</span>
                  <span className={row.highlight ? "text-white" : "text-gray-900 font-medium"}>{row.rate}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              Senior-level expertise at competitive rates — because you work directly with engineers, no agency overhead.
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Our Pricing Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Middlemen</h3>
                <p className="text-gray-600">
                  Work directly with senior engineers. No layers of management eating into your budget.
                  Every euro goes toward actual development work.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Senior-Only Team</h3>
                <p className="text-gray-600">
                  Average 7+ years experience. No juniors learning on your project.
                  Faster delivery, fewer bugs, better architecture decisions.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">EU Entity</h3>
                <p className="text-gray-600">
                  Cloudrix is registered in the Netherlands. Simple EUR invoicing,
                  proper contracts, and full GDPR compliance. No offshore complications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Compare */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How We Compare
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how Cloudrix stacks up against other options for scaling your engineering capacity.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 border-b-2 border-gray-200">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-600 border-b-2 border-blue-200 bg-blue-50">Cloudrix</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 border-b-2 border-gray-200">Toptal</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 border-b-2 border-gray-200">Freelancers</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 border-b-2 border-gray-200">Large Agencies</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Monthly Cost / Engineer", "€8,500", "€10-15K", "€5-12K", "€15-25K"],
                    ["Seniority Level", "Senior only (5+ yrs)", "Mixed", "Varies widely", "Mixed (junior-heavy)"],
                    ["EU Timezone", "✓ Full CET overlap", "Varies", "Varies", "Partial"],
                    ["Team Integration", "✓ Full (standups, Slack)", "✗ Independent", "✗ Independent", "✓ With overhead"],
                    ["Minimum Commitment", "Month-to-month", "Project-based", "None", "6-12 months"],
                    ["AI/ML Expertise", "✓ Deep", "Limited", "Rare", "Growing"],
                    ["GDPR Compliance", "✓ NL entity", "Freelancer's issue", "Freelancer's issue", "✓ Usually"],
                    ["EUR Invoicing", "✓", "✗ USD only", "Varies", "✓"],
                    ["Code Quality Standards", "✓ Enforced", "Freelancer discretion", "No guarantee", "✓ Process-heavy"],
                    ["Onboarding Speed", "1-2 weeks", "1-3 days", "Immediate", "4-8 weeks"],
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-3 px-4 font-medium text-gray-900 border-b border-gray-100">{row[0]}</td>
                      <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-100 bg-blue-50/30 font-medium">{row[1]}</td>
                      <td className="py-3 px-4 text-center text-gray-600 border-b border-gray-100">{row[2]}</td>
                      <td className="py-3 px-4 text-center text-gray-600 border-b border-gray-100">{row[3]}</td>
                      <td className="py-3 px-4 text-center text-gray-600 border-b border-gray-100">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-4">Want a detailed comparison?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/compare/toptal-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs Toptal →</Link>
                <Link href="/compare/thoughtworks-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs Thoughtworks →</Link>
                <Link href="/compare/epam-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs EPAM →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about working with us
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="flex items-start text-lg font-semibold text-gray-900 mb-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Talk?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Free 30-minute call — no sales pitch, just an honest conversation about
              your challenges and whether we&apos;re the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
