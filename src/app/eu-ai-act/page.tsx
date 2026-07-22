import { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Shield,
  Scale,
  FileText,
  Eye,
  Ban,
  HelpCircle,
  Building2,
  Wrench,
  Users,
} from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "EU AI Act Implementation Engineering — High-Risk Deadline: Dec 2, 2027",
  description:
    "The EU AI Act high-risk deadline moved to December 2, 2027. Use the window to implement compliance properly and affordably — Quick Scan from EUR 2,500, implementation programs from EUR 25K. Engineers, not lawyers.",
  openGraph: {
    title: "EU AI Act Implementation Engineering | Cloudrix",
    description:
      "Risk classification, conformity assessments, and technical implementation. High-risk (Annex III) deadline: December 2, 2027. Start now at planning prices, not panic prices.",
    url: "https://www.cloudrix.io/eu-ai-act",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("EU AI Act Compliance")}&subtitle=${encodeURIComponent("High-risk deadline: Dec 2, 2027 — your window to do it right")}&type=services`,
        width: 1200,
        height: 630,
        alt: "Cloudrix EU AI Act Compliance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU AI Act Implementation Engineering | Cloudrix",
    description:
      "Risk classification, conformity assessments, and technical implementation. High-risk deadline: December 2, 2027.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/eu-ai-act",
  },
};

const stakes = [
  {
    icon: AlertTriangle,
    title: "Fines",
    description: "Up to \u20AC35M or 7% of global annual turnover \u2014 whichever is higher.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Ban,
    title: "Prohibited Systems",
    description: "AI systems classified as unacceptable risk must be discontinued immediately.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: FileText,
    title: "High-Risk Obligations",
    description: "Conformity assessments, technical documentation, human oversight, and data governance.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Eye,
    title: "Transparency Requirements",
    description: "All AI systems must disclose they are AI. Deepfakes, chatbots, and generative AI have specific rules.",
    color: "bg-orange-100 text-orange-600",
  },
];

const packages = [
  {
    name: "AI Act Quick Scan",
    price: "\u20AC2,500",
    priceDetail: "fixed price",
    duration: "1 day",
    highlight: false,
    description: "Fast assessment to understand your exposure and immediate priorities.",
    features: [
      "AI system inventory review",
      "Risk classification per system",
      "Priority action list",
      "Executive summary report",
      "30-minute debrief call",
    ],
    ideal: "Companies unsure if the AI Act applies to them",
    cta: "Book Quick Scan",
    ctaLink: "/book",
  },
  {
    name: "AI Act Compliance Audit",
    price: "\u20AC8,000\u2013\u20AC15,000",
    priceDetail: "based on complexity",
    duration: "2\u20133 weeks",
    highlight: false,
    description: "Deep dive into all your AI systems with detailed compliance gap analysis.",
    features: [
      "Complete AI system inventory",
      "Detailed risk classification",
      "Fundamental Rights Impact Assessment (FRIA)",
      "Gap analysis per system",
      "Remediation roadmap with priorities",
      "Technical documentation review",
      "Stakeholder interviews",
    ],
    ideal: "Companies that know they use AI and need a compliance roadmap",
    cta: "Start Audit",
    ctaLink: "/book",
  },
  {
    name: "AI Act Implementation Program",
    price: "\u20AC25,000\u2013\u20AC60,000",
    priceDetail: "based on scope",
    duration: "3\u20136 months",
    highlight: true,
    popular: true,
    description: "End-to-end compliance implementation with technical controls and governance.",
    features: [
      "Everything in the Audit package",
      "Technical control implementation",
      "AI governance framework setup",
      "Risk management system",
      "Conformity assessment preparation",
      "Staff training program",
      "Documentation templates and systems",
      "Quarterly compliance reviews",
    ],
    ideal: "Companies with high-risk AI systems needing full compliance",
    cta: "Start Program",
    ctaLink: "/book",
  },
  {
    name: "AI Governance Retainer",
    price: "\u20AC3,000\u2013\u20AC8,000",
    priceDetail: "per month",
    duration: "Ongoing",
    highlight: false,
    description: "Continuous compliance monitoring, updates, and governance support.",
    features: [
      "Monthly compliance monitoring",
      "Regulatory update briefings",
      "New AI system assessments",
      "Incident response support",
      "Annual compliance review",
      "Staff training updates",
    ],
    ideal: "Companies that need ongoing compliance assurance",
    cta: "Start Retainer",
    ctaLink: "/book",
  },
];

const riskLevels = [
  {
    level: "Unacceptable Risk",
    color: "bg-red-600",
    textColor: "text-white",
    borderColor: "border-red-600",
    status: "BANNED",
    examples: ["Social scoring by governments", "Real-time biometric surveillance", "Manipulative AI targeting vulnerabilities", "Emotion recognition in workplaces/schools"],
    obligation: "Must be discontinued. No exceptions.",
  },
  {
    level: "High Risk",
    color: "bg-orange-500",
    textColor: "text-white",
    borderColor: "border-orange-500",
    status: "HEAVY REGULATION",
    examples: ["Credit scoring and lending", "Hiring and recruitment AI", "Medical diagnostic AI", "Critical infrastructure management"],
    obligation: "Conformity assessments, technical documentation, human oversight, data governance, logging.",
  },
  {
    level: "Limited Risk",
    color: "bg-yellow-400",
    textColor: "text-gray-900",
    borderColor: "border-yellow-400",
    status: "TRANSPARENCY REQUIRED",
    examples: ["Customer service chatbots", "AI-generated content / deepfakes", "Emotion recognition systems", "Generative AI outputs"],
    obligation: "Must inform users they are interacting with AI. Label AI-generated content.",
  },
  {
    level: "Minimal Risk",
    color: "bg-green-500",
    textColor: "text-white",
    borderColor: "border-green-500",
    status: "NO OBLIGATIONS",
    examples: ["Spam filters", "AI-powered games", "Inventory management", "Search result ranking"],
    obligation: "No specific obligations. Voluntary codes of conduct encouraged.",
  },
];

const whyCloudrix = [
  {
    icon: Building2,
    title: "Netherlands-Based, EU Jurisdiction",
    description: "We operate under the same regulations you do. No offshore compliance gaps or jurisdictional ambiguity.",
  },
  {
    icon: Wrench,
    title: "Technical AND Legal Understanding",
    description: "We understand the code behind AI systems AND the legal framework. Most consultants only know one side.",
  },
  {
    icon: Scale,
    title: "Hands-On Implementation",
    description: "We don\u2019t just deliver PowerPoints. We implement technical controls, build governance systems, and write the documentation.",
  },
  {
    icon: Users,
    title: "Founder-Level Attention",
    description: "You work directly with a senior engineer with 10+ years of production experience \u2014 no juniors, no handoffs, no account managers.",
  },
];

const faqs = [
  {
    question: "Does the EU AI Act apply to my company?",
    answer:
      "If you develop, deploy, or use AI systems within the EU, the AI Act likely applies to you \u2014 regardless of where your company is headquartered. This includes companies outside the EU whose AI systems affect EU citizens.",
  },
  {
    question: "What is the deadline for EU AI Act compliance?",
    answer:
      "Following the EU Digital Omnibus (endorsed by Parliament on June 16, 2026, and given final Council approval on June 29, 2026), high-risk (Annex III) obligations now apply from December 2, 2027, and Annex I embedded-AI obligations from August 2028. Prohibited AI practices have been banned since February 2, 2025, and GPAI model obligations have applied since August 2, 2025.",
  },
  {
    question: "The deadline moved to December 2027 — should I wait?",
    answer:
      "No, and here's why: the extended window is your opportunity to implement compliance properly and affordably. Companies that start now spread the cost over normal development cycles and can ship AI features competitors won't touch. Companies that wait will compete for scarce implementation capacity at panic prices in late 2027. Compliance for high-risk systems typically takes 3\u20136 months — the window closes faster than it looks.",
  },
  {
    question: "What are the fines for non-compliance?",
    answer:
      "Fines range from \u20AC7.5M to \u20AC35M, or 1% to 7% of global annual turnover \u2014 whichever is higher. Prohibited AI practices carry the highest fines (\u20AC35M / 7%), while other violations range from \u20AC7.5M to \u20AC15M.",
  },
  {
    question: "How do I know if my AI system is high-risk?",
    answer:
      "High-risk AI systems are listed in Annex III of the AI Act. They include AI used in critical infrastructure, education, employment, law enforcement, and other sensitive areas. Our Quick Scan can classify your systems in just one day.",
  },
  {
    question: "Do chatbots and generative AI fall under the AI Act?",
    answer:
      "Yes. Chatbots are classified as limited risk and must inform users they are interacting with AI. Generative AI (like content creation tools) must label their outputs as AI-generated and comply with transparency requirements.",
  },
  {
    question: "How long does it take to become compliant?",
    answer:
      "It depends on your AI portfolio. A simple assessment takes 1 day. Full compliance for companies with high-risk systems typically takes 3\u20136 months. We recommend starting at least 6\u201312 months before the deadline.",
  },
  {
    question: "Can you help with the technical implementation?",
    answer:
      "Yes \u2014 that's the point of Cloudrix. Unlike pure legal consultancies, we are engineers: we implement technical controls, monitoring systems, and documentation pipelines directly in your codebase. We handle both the compliance strategy and the technical execution.",
  },
  {
    question: "Do you work with companies outside the Netherlands?",
    answer:
      "Absolutely. We work with companies across the EU and beyond. The AI Act applies to any company whose AI systems are used in the EU, so our services are relevant across borders.",
  },
];

export default function EUAIActPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "EU AI Act Compliance", url: "/eu-ai-act" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 via-orange-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-6">
                <Clock className="w-4 h-4 mr-2" />
                High-Risk Deadline: December 2, 2027
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                The Deadline Moved. Your Window Just Opened.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                The EU Digital Omnibus pushed high-risk obligations to December 2, 2027 &mdash; that&apos;s
                your window to implement compliance properly and affordably, instead of paying panic
                prices in late 2027. Fines remain up to &euro;35M or 7% of global turnover. We&apos;re the
                technical implementation partner: engineers, not lawyers.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg group"
              >
                Get Your AI Act Quick Scan \u2014 &euro;2,500
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* What's at Stake */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What&apos;s at Stake
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The EU AI Act is the world&apos;s first comprehensive AI regulation. Ignoring it is not an option.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stakes.map((stake, index) => {
                const Icon = stake.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-14 h-14 ${stake.color} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {stake.title}
                    </h3>
                    <p className="text-gray-600">{stake.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compliance Packages */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Compliance Packages
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a quick risk scan to full compliance programs. Start wherever makes sense for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 ${
                    pkg.highlight
                      ? "bg-red-600 text-white ring-4 ring-red-600 ring-offset-2"
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Complete
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className={`text-xs font-semibold ${pkg.highlight ? "text-red-200" : "text-gray-500"}`}>
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                    {pkg.name}
                  </h3>

                  <div className="mb-4">
                    <span className={`text-3xl font-bold ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm ml-2 ${pkg.highlight ? "text-red-100" : "text-gray-500"}`}>
                      {pkg.priceDetail}
                    </span>
                  </div>

                  <p className={`text-sm mb-6 ${pkg.highlight ? "text-red-100" : "text-gray-600"}`}>
                    {pkg.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${
                          pkg.highlight ? "text-red-200" : "text-green-500"
                        }`} />
                        <span className={`text-sm ${pkg.highlight ? "text-red-50" : "text-gray-700"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mb-6 p-3 rounded-lg ${
                    pkg.highlight ? "bg-red-500/50" : "bg-gray-50"
                  }`}>
                    <p className={`text-xs font-semibold mb-1 ${
                      pkg.highlight ? "text-red-200" : "text-gray-500"
                    }`}>
                      IDEAL FOR
                    </p>
                    <p className={`text-sm ${pkg.highlight ? "text-red-100" : "text-gray-600"}`}>
                      {pkg.ideal}
                    </p>
                  </div>

                  <Link
                    href={pkg.ctaLink}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all text-sm ${
                      pkg.highlight
                        ? "bg-white text-red-600 hover:bg-gray-100"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Classification */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Act Risk Classification
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The EU AI Act categorizes AI systems into four risk levels. Your obligations depend on where your systems fall.
              </p>
            </div>

            <div className="space-y-6">
              {riskLevels.map((risk, index) => (
                <div
                  key={index}
                  className={`border-l-4 ${risk.borderColor} bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-4 py-2 ${risk.color} ${risk.textColor} rounded-lg text-sm font-bold`}>
                        {risk.status}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-3">
                        {risk.level}
                      </h3>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">EXAMPLES</h4>
                        <ul className="space-y-1">
                          {risk.examples.map((example, idx) => (
                            <li key={idx} className="text-gray-700 text-sm flex items-start">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">OBLIGATIONS</h4>
                        <p className="text-gray-700 text-sm">{risk.obligation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Cloudrix */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Cloudrix for AI Act Compliance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Technical depth meets regulatory expertise. We don&apos;t just advise \u2014 we implement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyCloudrix.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about the EU AI Act and compliance
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="flex items-start text-lg font-semibold text-gray-900 mb-3">
                    <HelpCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-red-200 mr-3" />
              <span className="text-red-200 font-semibold text-lg">
                High-Risk Deadline: December 2, 2027
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Now at Planning Prices, Not Panic Prices
            </h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed">
              Most companies need 6&ndash;12 months to achieve compliance. Companies that start now
              spread the cost over normal sprints and ship AI features competitors can&apos;t.
              Start with a &euro;2,500 Quick Scan and know exactly where you stand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Your Quick Scan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ai-services"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View All AI Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
