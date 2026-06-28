import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle, Zap, Users, Building2, Scale, Bot, Wrench, Search, Shield, Gift, Clock, FileCode, Brain, Server, Sparkles } from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing — Engineering & AI Services",
  description:
    "Transparent pricing for cloud architecture, software development, AI services, and DevOps. Project-based, dedicated teams, AI deployments, or enterprise partnerships. Multi-currency invoicing, no hidden fees.",
  openGraph: {
    title: "Pricing — Engineering & AI Services",
    description:
      "Transparent pricing for cloud architecture, software development, AI services, and DevOps. Project-based, dedicated teams, AI deployments, or enterprise partnerships.",
    url: "https://www.cloudrix.io/pricing",
    type: "website",
    images: [
      {
        url: "/og?title=Transparent%20Pricing&subtitle=No%20hidden%20fees.%20Multi-currency%20invoicing.&type=pricing",
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

// Free & digital toolkit items
const freeItems = [
  {
    name: "Cloud Readiness Assessment",
    price: "FREE",
    description: "Quick self-assessment to evaluate your cloud migration readiness",
    cta: "Get Assessment",
    ctaLink: "/contact?type=cloud-assessment",
  },
  {
    name: "EU AI Act Risk Check",
    price: "FREE",
    description: "Determine your AI system's risk classification under the EU AI Act",
    cta: "Check Your Risk",
    ctaLink: "/contact?type=ai-act-check",
  },
];

const digitalToolkits = [
  {
    name: "Architecture Review Kit",
    price: "\u20ac99",
    description: "Templates and checklists for evaluating your system architecture",
  },
  {
    name: "AI Act Starter Kit",
    price: "\u20ac249",
    description: "Complete documentation templates for EU AI Act compliance",
  },
  {
    name: "DevOps Blueprint",
    price: "\u20ac499",
    description: "Production-ready CI/CD pipeline templates and infrastructure-as-code starter",
  },
];

// Quick wins
const quickWins = [
  {
    name: "Cloud Cost Optimizer",
    price: "\u20ac2,000",
    description: "Deep analysis of your cloud spend with actionable savings recommendations",
    badge: "2x ROI Guarantee",
    badgeColor: "bg-green-100 text-green-800",
    icon: Sparkles,
    cta: "Save on Cloud",
    ctaLink: "/contact?type=cloud-optimizer",
  },
  {
    name: "CTO-for-a-Day",
    price: "\u20ac1,800",
    description: "A full day with a senior architect to solve your biggest technical challenge",
    badge: null,
    badgeColor: "",
    icon: Brain,
    cta: "Book a Day",
    ctaLink: "/contact?type=cto-day",
  },
  {
    name: "DevOps Health Check",
    price: "\u20ac2,000",
    description: "Full audit of your CI/CD, infrastructure, and deployment practices",
    badge: null,
    badgeColor: "",
    icon: Server,
    cta: "Get Health Check",
    ctaLink: "/contact?type=devops-health",
  },
  {
    name: "AI Act Quick Scan",
    price: "\u20ac2,500",
    description: "1-day EU AI Act risk assessment for your AI systems",
    badge: null,
    badgeColor: "",
    icon: Scale,
    cta: "Book Quick Scan",
    ctaLink: "/contact?type=ai-act-scan",
  },
  {
    name: "Security Assessment",
    price: "\u20ac2,500",
    description: "Vulnerability assessment, dependency audit, and security recommendations",
    badge: null,
    badgeColor: "",
    icon: Shield,
    cta: "Get Assessment",
    ctaLink: "/contact?type=security-assessment",
  },
];

const pricingTiers = [
  {
    name: "Project-Based",
    description: "Perfect for defined scope projects with clear deliverables",
    icon: Zap,
    price: "From \u20ac15,000",
    priceAlt: "(or $17,000)",
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
    price: "\u20ac7,500",
    priceAlt: "trial month",
    priceDetail: "\u20ac8,500/mo standard | \u20ac5,000/mo part-time",
    highlight: true,
    popular: true,
    features: [
      "Senior engineers (7+ years exp)",
      "Full-time or part-time options",
      "Direct Slack/Teams access",
      "Global timezone flexibility",
      "Flexible team scaling",
      "No long-term commitment",
      "Weekly/daily standups",
      "Transparent time tracking",
      "\u20ac7,500 trial month to evaluate fit",
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
    priceAlt: "",
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

const aiPricingItems = [
  {
    name: "AI PoC Sprint",
    price: "From \u20ac15,000",
    description: "Prove AI value with a focused 4-6 week prototype",
    icon: Zap,
  },
  {
    name: "AI Agent Development",
    price: "From \u20ac30,000",
    description: "Production-grade AI agents that automate complex workflows",
    icon: Bot,
  },
  {
    name: "RAG System",
    price: "From \u20ac40,000",
    description: "Connect LLMs to your proprietary data with production infrastructure",
    icon: FileCode,
  },
  {
    name: "EU AI Act Compliance",
    price: "From \u20ac2,500",
    description: "Risk assessment, documentation, and implementation program",
    icon: Scale,
  },
];

const guarantees = [
  {
    title: "No-Risk First Sprint",
    description: "If you are not satisfied with the first sprint delivery, we will refund your payment in full. No questions asked.",
    icon: Shield,
  },
  {
    title: "Cloud Savings 2x ROI",
    description: "Our Cloud Cost Optimizer engagement guarantees at least 2x return on your investment in identified savings, or the engagement is free.",
    icon: Sparkles,
  },
  {
    title: "80%+ Test Coverage",
    description: "All code we deliver comes with 80%+ test coverage on critical paths. Quality is non-negotiable.",
    icon: Check,
  },
  {
    title: "Source Code Is Always Yours",
    description: "You own 100% of the source code from day one. No lock-in, no proprietary frameworks, no surprises.",
    icon: FileCode,
  },
];

const comparisonFeatures = [
  { feature: "Senior Engineers (7+ years)", project: true, team: true, enterprise: true },
  { feature: "Fixed Price Option", project: true, team: false, enterprise: true },
  { feature: "Flexible Scaling", project: false, team: true, enterprise: true },
  { feature: "Dedicated Project Manager", project: true, team: true, enterprise: true },
  { feature: "Source Code Ownership", project: true, team: true, enterprise: true },
  { feature: "Global Timezone Flexibility", project: true, team: true, enterprise: true },
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
      "We offer three engagement models: Project-based for defined scope work, Dedicated Teams for ongoing development, and Enterprise for large-scale transformations. All prices are in EUR with multi-currency invoicing available (USD, GBP, AED). No hidden fees, no surprises.",
  },
  {
    question: "What's included in the hourly/monthly rate?",
    answer:
      "Our rates include the engineer's time, project management overhead, communication tools, and standard support. We don't charge extra for meetings, code reviews, or documentation. Enterprise clients can customize SLAs and support levels.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No. For dedicated teams, we operate on a monthly basis with 30 days notice. We even offer a discounted trial month at \u20ac7,500 so you can evaluate the fit before committing. Enterprise agreements can include longer terms with corresponding discounts.",
  },
  {
    question: "How do you handle payment?",
    answer:
      "We invoice via our Netherlands entity (Cloudrix) in EUR, USD, GBP, or AED depending on your preference. Project-based work typically uses milestone payments (30% upfront, 40% mid-project, 30% on delivery). Dedicated teams are invoiced monthly in advance. We accept bank transfer and major credit cards.",
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
      "All code goes through peer review, automated testing, and security scanning. We guarantee 80%+ test coverage on critical paths. Our engineers average 8+ years of hands-on production experience.",
  },
  {
    question: "What AI services do you offer?",
    answer:
      "We offer AI agent development, RAG system implementation, EU AI Act compliance consulting, conversational AI & voice agents, MCP server development, LLM integration, and AI infrastructure setup. Every engagement includes EU AI Act compliance review.",
  },
  {
    question: "How much does an AI project cost?",
    answer:
      "AI projects range from \u20ac2,500 for a quick EU AI Act compliance scan to \u20ac200K+ for full enterprise AI agent deployments. Most mid-market projects fall in the \u20ac15K-\u20ac80K range. We always start with a free strategy call to scope your needs accurately.",
  },
  {
    question: "Do you work with clients outside Europe?",
    answer:
      "Yes, we serve clients worldwide including the US, Middle East, Asia-Pacific, and Africa. We use async-first workflows and flexible scheduling to ensure smooth collaboration across timezones. We invoice in your preferred currency (EUR, USD, GBP, AED).",
  },
  {
    question: "What guarantees do you offer?",
    answer:
      "We offer a No-Risk First Sprint guarantee (full refund if not satisfied), 2x ROI guarantee on Cloud Cost Optimizer engagements, 80%+ test coverage on all deliveries, and full source code ownership from day one.",
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
                Senior engineers and AI specialists at fair rates. Start free with an assessment,
                or go deep with a dedicated team. Multi-currency invoicing from a Dutch entity. No hidden fees.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  EUR / USD / GBP / AED
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  No Hidden Fees
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  No-Risk First Sprint
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Start in Minutes - Free & Digital Toolkits */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Gift className="w-4 h-4" />
                <span>Start in Minutes</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Free Tools & Digital Toolkits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started immediately with free assessments or grab a toolkit to level up your engineering practices.
              </p>
            </div>

            {/* Free Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {freeItems.map((item, index) => (
                <div key={index} className="bg-white border-2 border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">{item.price}</span>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Link
                    href={item.ctaLink}
                    className="inline-flex items-center bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {item.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Digital Toolkits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {digitalToolkits.map((kit, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{kit.name}</h3>
                    <span className="text-2xl font-bold text-gray-900">{kit.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{kit.description}</p>
                  <Link
                    href="/contact?type=toolkit"
                    className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
                  >
                    Get This Kit &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Wins Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Quick Wins</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                High-Impact Engagements, Fixed Price
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Solve a specific problem in days, not months. Each delivers measurable results with a clear scope.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickWins.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow relative">
                    {item.badge && (
                      <div className="absolute -top-3 right-4">
                        <span className={`${item.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-3">{item.price}</p>
                    <p className="text-sm text-gray-600 mb-6">{item.description}</p>
                    <Link
                      href={item.ctaLink}
                      className="inline-flex items-center text-amber-600 font-semibold text-sm hover:text-amber-700 group"
                    >
                      {item.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Pricing Tiers */}
        <section className="py-20 bg-gray-50">
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

                    <div className="mb-2">
                      <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                        {tier.price}
                      </span>
                      {tier.priceAlt && (
                        <span className={`text-sm ml-2 ${tier.highlight ? "text-blue-200" : "text-gray-500"}`}>
                          {tier.priceAlt}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mb-6 ${tier.highlight ? "text-blue-200" : "text-gray-500"}`}>
                      {tier.priceDetail}
                    </p>

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
                From quick compliance scans to full AI deployments. EU AI Act compliance included in every engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiPricingItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 mb-3">{item.price}</p>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <Link
                      href="/contact?type=ai-services"
                      className="text-sm text-indigo-600 font-semibold hover:text-indigo-700"
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* AI Retainer Option */}
            <div className="mt-10 bg-white border-2 border-indigo-200 rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Governance Retainer</h3>
                  <p className="text-gray-600">Ongoing AI compliance monitoring, model updates, and optimization.</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-2">&euro;3,000 - &euro;8,000<span className="text-sm text-gray-500 font-normal">/month</span></p>
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

        {/* Guarantees Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Our Guarantees</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                We Put Our Money Where Our Mouth Is
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every engagement comes with real guarantees, not just promises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Multi-Currency Note */}
        <section className="py-8 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white text-lg font-medium">
              Pricing shown in EUR. We also invoice in <span className="font-bold">USD</span>, <span className="font-bold">GBP</span>, and <span className="font-bold">AED</span>.
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Invoiced via our Netherlands entity (KVK: 97732699). All major payment methods accepted.
            </p>
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
                            <span className="text-gray-300">&mdash;</span>
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
                            <span className="text-gray-300">&mdash;</span>
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
                            <span className="text-gray-300">&mdash;</span>
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
                Our dedicated team rate of &euro;8,500/month works out to ~&euro;50/hour at 170 hours/month.
                For context, here&apos;s what senior talent costs across regions:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { region: "Netherlands freelancer", rate: "\u20ac80\u2013\u20ac150/hr" },
                { region: "Germany", rate: "\u20ac85\u2013\u20ac180/hr" },
                { region: "UK", rate: "\u00a375\u2013\u00a3175/hr" },
                { region: "US mid-tier", rate: "$100\u2013$200/hr" },
                { region: "Cloudrix dedicated", rate: "~\u20ac50/hr", highlight: true },
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
                    ["Monthly Cost / Engineer", "\u20ac8,500", "\u20ac10-15K", "\u20ac5-12K", "\u20ac15-25K"],
                    ["Seniority Level", "Senior only (5+ yrs)", "Mixed", "Varies widely", "Mixed (junior-heavy)"],
                    ["Global Timezone Support", "\u2713 Async-first, flexible", "Varies", "Varies", "Partial"],
                    ["Team Integration", "\u2713 Full (standups, Slack)", "\u2717 Independent", "\u2717 Independent", "\u2713 With overhead"],
                    ["Minimum Commitment", "Month-to-month", "Project-based", "None", "6-12 months"],
                    ["AI/ML Expertise", "\u2713 Deep", "Limited", "Rare", "Growing"],
                    ["Multi-Currency Invoicing", "\u2713 EUR/USD/GBP/AED", "\u2717 USD only", "Varies", "\u2713 Usually"],
                    ["Code Quality Standards", "\u2713 80%+ coverage guaranteed", "Freelancer discretion", "No guarantee", "\u2713 Process-heavy"],
                    ["Onboarding Speed", "1-2 weeks", "1-3 days", "Immediate", "4-8 weeks"],
                    ["No-Risk Guarantee", "\u2713 First sprint guarantee", "\u2717", "\u2717", "\u2717"],
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
                <Link href="/compare/toptal-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs Toptal &rarr;</Link>
                <Link href="/compare/thoughtworks-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs Thoughtworks &rarr;</Link>
                <Link href="/compare/epam-alternative" className="text-sm text-blue-600 hover:underline">Cloudrix vs EPAM &rarr;</Link>
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
              your challenges and whether we&apos;re the right fit. Available in your timezone.
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
