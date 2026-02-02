import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle, Zap, Users, Building2 } from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Pricing - Transparent Engineering Rates",
  description:
    "Transparent pricing for cloud architecture, software development, and DevOps services. Project-based, dedicated teams, or enterprise partnerships. EUR invoicing, no hidden fees.",
  openGraph: {
    title: "Pricing - Transparent Engineering Rates",
    description:
      "Transparent pricing for cloud architecture, software development, and DevOps services. Project-based, dedicated teams, or enterprise partnerships.",
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
    title: "Pricing - Transparent Engineering Rates",
    description:
      "Transparent pricing for cloud architecture, software development, and DevOps services.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/pricing",
  },
};

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
      "All code goes through peer review, automated testing, and security scanning. We maintain 80%+ test coverage on critical paths. Our engineers average 7+ years of experience and have delivered 47+ successful projects.",
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Stop Overpaying for Mediocre Code
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Agencies charge €150K and deliver junior work. Freelancers disappear mid-project.
                We offer senior engineers at fair rates with zero BS. EUR invoicing. No hidden fees.
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

        {/* Pricing Tiers */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Your Competitors Just Hired Us Last Week
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              While you&apos;re comparing options, they&apos;re shipping features.
              Free 30-minute strategy call - we&apos;ll tell you exactly what it takes to win.
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
