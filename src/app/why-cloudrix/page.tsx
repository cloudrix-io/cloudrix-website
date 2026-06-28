import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Users,
  Globe,
  Brain,
  Code2,
  Eye,
  CreditCard,
  Clock,
  CheckCircle2,
  Star,
  Award,
  Play,
  ChevronDown,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Why Choose Cloudrix - Senior Engineering, No Lock-In, EU-Based",
  description:
    "Not another outsourcing agency. Cloudrix delivers senior-only engineers, transparent pricing, EU data residency, and full source code ownership. See how we compare to Big 4, freelancers, and offshore teams.",
  openGraph: {
    title: "Why Choose Cloudrix | Cloudrix",
    description:
      "Senior-only engineers, transparent pricing, EU data residency, and full source code ownership. See why companies worldwide choose Cloudrix.",
    url: "https://www.cloudrix.io/why-cloudrix",
    type: "website",
    images: [
      {
        url: "/og?title=Why%20Choose%20Cloudrix&subtitle=Not%20Another%20Outsourcing%20Agency&type=why-cloudrix",
        width: 1200,
        height: 630,
        alt: "Why Choose Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Cloudrix | Cloudrix",
    description:
      "Senior-only engineers, transparent pricing, EU data residency, and full source code ownership.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/why-cloudrix",
  },
};

const differentiators = [
  {
    icon: Users,
    title: "Senior-Only Engineers",
    description:
      "Every engineer has 8+ years of experience. No juniors learning on your project, no bait-and-switch after the sales call.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "No Lock-In",
    description:
      "Month-to-month contracts. Full documentation handover. You can walk away any time — but you won't want to.",
    color: "green",
  },
  {
    icon: Globe,
    title: "EU Data Residency",
    description:
      "KVK-registered in the Netherlands. GDPR-compliant by default. Your data stays in Europe, period.",
    color: "purple",
  },
  {
    icon: CreditCard,
    title: "Multi-Currency Billing",
    description:
      "Pay in EUR, USD, or GBP. No hidden currency conversion fees. Clean invoices your finance team will appreciate.",
    color: "orange",
  },
  {
    icon: Clock,
    title: "Global Timezone Coverage",
    description:
      "CET-based with overlap across US and APAC timezones. Real-time collaboration, not async-only communication.",
    color: "teal",
  },
  {
    icon: Brain,
    title: "AI-First Approach",
    description:
      "We use AI tools to accelerate delivery — not as a gimmick, but as a force multiplier that saves you time and money.",
    color: "pink",
  },
  {
    icon: Code2,
    title: "Source Code Ownership",
    description:
      "You own 100% of the code from day one. Full Git history, documentation, and deployment scripts included.",
    color: "indigo",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description:
      "Fixed-price or time-and-materials — your choice. Detailed estimates, weekly burn reports, no surprises on the invoice.",
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
  green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
  teal: { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-200" },
  pink: { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-200" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200" },
};

interface ComparisonRow {
  feature: string;
  cloudrix: string;
  big4: string;
  freelancers: string;
  offshore: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Engineer Seniority",
    cloudrix: "8+ years minimum",
    big4: "Mixed (mostly junior)",
    freelancers: "Varies widely",
    offshore: "Mostly junior/mid",
  },
  {
    feature: "Hourly Rate",
    cloudrix: "Competitive",
    big4: "2-3x premium",
    freelancers: "Low but risky",
    offshore: "Lowest upfront",
  },
  {
    feature: "Code Ownership",
    cloudrix: "100% yours",
    big4: "Negotiable (extra cost)",
    freelancers: "Usually yours",
    offshore: "Often restricted",
  },
  {
    feature: "Communication",
    cloudrix: "Daily standups, CET",
    big4: "Account managers",
    freelancers: "Direct but limited",
    offshore: "Timezone gaps",
  },
  {
    feature: "GDPR Compliance",
    cloudrix: "Built-in (EU entity)",
    big4: "Available (extra cost)",
    freelancers: "Your responsibility",
    offshore: "Complex/risky",
  },
  {
    feature: "Lock-In",
    cloudrix: "None (month-to-month)",
    big4: "12-24 month contracts",
    freelancers: "None",
    offshore: "6-12 months typical",
  },
  {
    feature: "Scalability",
    cloudrix: "Flex up/down monthly",
    big4: "Slow to change",
    freelancers: "Limited",
    offshore: "Bench available",
  },
  {
    feature: "Quality Assurance",
    cloudrix: "Code reviews, CI/CD",
    big4: "Process-heavy",
    freelancers: "Self-reviewed",
    offshore: "Varies greatly",
  },
];

const clientResults = [
  { metric: "55%", label: "Average infrastructure cost reduction", icon: CreditCard },
  { metric: "99.99%", label: "Uptime achieved for critical systems", icon: Shield },
  { metric: "14 weeks", label: "Average MVP delivery time", icon: Clock },
  { metric: "12x/day", label: "Deployment frequency improvement", icon: Code2 },
];

const trustSignals = [
  "KVK-Registered Netherlands Entity",
  "GDPR & EU AI Act Compliant",
  "AWS Advanced Partner",
  "Google Cloud Partner",
  "ISO 27001 Aligned Practices",
  "SOC 2 Type II Compatible",
];

const faqs = [
  {
    question: "How do you ensure all engineers are truly senior?",
    answer:
      "Every engineer goes through a rigorous vetting process including technical interviews, system design exercises, and reference checks. We require a minimum of 8 years of professional experience, with demonstrated expertise in production-scale systems. We regularly turn down talented engineers who don't meet our seniority bar.",
  },
  {
    question: "What happens if I'm not satisfied with the work?",
    answer:
      "We offer a satisfaction guarantee on the first two weeks of any engagement. If the fit isn't right, you pay nothing. After that, our month-to-month contracts mean you're never locked in. We also conduct weekly retrospectives to catch and address issues early.",
  },
  {
    question: "How does the no lock-in policy work?",
    answer:
      "All our contracts are month-to-month with a 30-day notice period. When you decide to move on, we provide a complete handover package including documentation, deployment guides, architecture diagrams, and knowledge transfer sessions with your team.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Absolutely. We frequently embed engineers into existing teams. We adapt to your workflows, tools, and processes. Our engineers join your Slack, attend your standups, and use your ticketing system. It feels like hiring a senior engineer, not working with an agency.",
  },
  {
    question: "What's your approach to AI and automation?",
    answer:
      "We use AI as a force multiplier — code generation, testing, documentation, and code review assistance. This isn't about replacing engineers; it's about making senior engineers even more productive. We estimate AI tools save 20-30% on development time across our projects.",
  },
  {
    question: "How do you handle data privacy for EU clients?",
    answer:
      "We're a KVK-registered entity in the Netherlands and GDPR-compliant by default. All data processing happens within the EU. We use EU-region cloud services, sign DPAs with all clients, and maintain strict data handling procedures that meet both GDPR and industry-specific requirements.",
  },
];

export default function WhyCloudrixPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Why Cloudrix", url: "/why-cloudrix" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Why Cloudrix", url: "/why-cloudrix" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Trusted by companies across Europe</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Not Another <span className="text-blue-600">Outsourcing Agency</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                We&apos;re a senior engineering partner. No juniors, no lock-in, no surprises.
                Just experienced engineers who ship production-quality software and treat your
                business like their own.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Differentiators */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                8 Reasons Companies Choose Cloudrix
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We built Cloudrix around the frustrations companies have with traditional
                outsourcing. Here&apos;s what makes us different.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((item) => {
                const Icon = item.icon;
                const colors = colorMap[item.color];
                return (
                  <div
                    key={item.title}
                    className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:shadow-lg transition-shadow`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How We Compare
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                An honest comparison so you can make the right choice for your project.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Feature</th>
                    <th className="text-left py-4 px-6 text-blue-600 font-semibold bg-blue-50 rounded-tl-none">
                      Cloudrix
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-medium text-sm">
                      Big 4 / Consultancies
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-medium text-sm">Freelancers</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-medium text-sm">
                      Offshore Agencies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={index < comparisonData.length - 1 ? "border-b border-gray-100" : ""}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium text-sm">{row.feature}</td>
                      <td className="py-4 px-6 bg-blue-50 text-blue-900 font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          {row.cloudrix}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{row.big4}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{row.freelancers}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{row.offshore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Client Results */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Results That Speak for Themselves
              </h2>
              <p className="text-xl text-gray-600">
                Real metrics from real projects. No vanity numbers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {clientResults.map((result) => {
                const Icon = result.icon;
                return (
                  <div key={result.label} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{result.metric}</div>
                    <p className="text-gray-600 text-sm">{result.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Certifications &amp; Compliance
              </h2>
              <p className="text-xl text-gray-600">
                We take security and compliance seriously — it&apos;s built into how we work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonial Placeholder */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Hear It From Our Clients
              </h2>
            </div>

            <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-gray-900/90" />
              <div className="relative text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <p className="text-white text-xl font-medium mb-2">Client Testimonial</p>
                <p className="text-blue-200 text-sm">Video coming soon</p>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
              <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-4">
                &ldquo;The migration transformed how we operate. We went from dreading high-traffic
                periods to confidently scaling for them. The team understood our compliance
                requirements without lengthy explanations.&rdquo;
              </blockquote>
              <div className="text-gray-900 font-semibold">VP of Engineering</div>
              <div className="text-gray-500 text-sm">European FinTech Company</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors list-none">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work With Senior Engineers?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              No sales pitch, no pressure. Just a conversation about your project
              and whether we&apos;re the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-white/60 transition-colors font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
