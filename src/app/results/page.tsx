import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  BarChart3,
  Globe,
  Building2,
  ShoppingCart,
  Landmark,
  Factory,
  Star,
  Quote,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Client Results - Measurable Impact Across Industries",
  description:
    "See the real impact we've delivered: 55% average cost reduction, 99.99% uptime, 14-week MVP delivery. Aggregated metrics, industry-specific results, and client testimonials.",
  openGraph: {
    title: "Client Results - Measurable Impact | Cloudrix",
    description:
      "55% average cost reduction, 99.99% uptime, 14-week MVP delivery. Real results from real projects.",
    url: "https://www.cloudrix.io/results",
    type: "website",
    images: [
      {
        url: "/og?title=Client%20Results&subtitle=Measurable%20Impact%20Across%20Industries&type=results",
        width: 1200,
        height: 630,
        alt: "Cloudrix Client Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Results | Cloudrix",
    description:
      "55% cost reduction, 99.99% uptime, 14-week MVP delivery. See our impact.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/results",
  },
};

const impactMetrics = [
  { value: "55%", label: "Average Infrastructure Cost Reduction", icon: DollarSign, color: "green" },
  { value: "99.99%", label: "Uptime Achieved for Critical Systems", icon: Shield, color: "blue" },
  { value: "14 wks", label: "Average MVP Delivery Time", icon: Clock, color: "purple" },
  { value: "12x/day", label: "Deployment Frequency Improvement", icon: Zap, color: "orange" },
  { value: "10x", label: "Peak Capacity Increase", icon: TrendingUp, color: "teal" },
  { value: "30+", label: "Projects Delivered Across Europe", icon: Globe, color: "indigo" },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
};

const caseStudySnippets = [
  {
    title: "FinTech Payment Processor",
    industry: "Financial Services",
    icon: Landmark,
    before: [
      "On-premise infrastructure struggling at peak",
      "99.2% uptime with frequent slowdowns",
      "Bi-weekly deployments",
      "Rising infrastructure costs",
    ],
    after: [
      "Auto-scaling Kubernetes on AWS",
      "99.99% uptime with multi-region failover",
      "12x daily deployments",
      "55% infrastructure cost reduction",
    ],
    highlight: "55% cost reduction",
  },
  {
    title: "B2B SaaS Platform",
    industry: "Enterprise SaaS",
    icon: Building2,
    before: [
      "Figma mockups only, no code",
      "No engineering team",
      "Funding deadline approaching",
      "No scalability plan",
    ],
    after: [
      "Production MVP in 14 weeks",
      "Secured VC funding",
      "First paying enterprise customers",
      "Handles millions of events daily",
    ],
    highlight: "MVP to funding in 14 weeks",
  },
  {
    title: "E-Commerce Platform",
    industry: "Retail / E-Commerce",
    icon: ShoppingCart,
    before: [
      "Monolithic legacy system",
      "4-hour deployment windows",
      "No horizontal scaling",
      "High maintenance burden",
    ],
    after: [
      "Microservices architecture",
      "Zero-downtime deployments",
      "Auto-scaling for peak traffic",
      "70% reduction in maintenance time",
    ],
    highlight: "70% less maintenance",
  },
];

const industryResults = [
  {
    industry: "Financial Services",
    icon: Landmark,
    results: [
      "PCI-DSS compliant infrastructure-as-code",
      "Multi-region failover with < 30s recovery",
      "Real-time fraud detection pipelines",
      "SOX-compliant audit trails",
    ],
  },
  {
    industry: "SaaS & Technology",
    icon: Building2,
    results: [
      "14-week average MVP delivery",
      "Scalable multi-tenant architectures",
      "CI/CD pipelines with 99% pass rates",
      "Technical due diligence ready codebases",
    ],
  },
  {
    industry: "E-Commerce & Retail",
    icon: ShoppingCart,
    results: [
      "Black Friday-ready auto-scaling",
      "Sub-200ms API response times",
      "Headless commerce implementations",
      "Real-time inventory and pricing systems",
    ],
  },
  {
    industry: "Manufacturing & Logistics",
    icon: Factory,
    results: [
      "IoT data processing pipelines",
      "Real-time supply chain visibility",
      "Legacy system modernization",
      "Cloud migration with zero downtime",
    ],
  },
];

const testimonials = [
  {
    quote:
      "The migration transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them.",
    author: "VP of Engineering",
    company: "European FinTech Company",
    metric: "99.99% uptime",
  },
  {
    quote:
      "They didn't just build our MVP — they built it right. The codebase passed due diligence from three different VC firms.",
    author: "Co-Founder & CEO",
    company: "B2B SaaS Startup",
    metric: "Funded in 14 weeks",
  },
  {
    quote:
      "For the first time, we can deploy during business hours without fear. That alone was worth the investment.",
    author: "CTO",
    company: "E-Commerce Platform",
    metric: "Zero-downtime deploys",
  },
];

export default function ResultsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Client Results", url: "/results" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Client Results", url: "/results" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Proven Track Record</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Client Results
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Real metrics from real projects. No vanity numbers, no inflated claims.
                These are the outcomes our clients have achieved working with Cloudrix.
              </p>
            </div>
          </div>
        </section>

        {/* Aggregated Impact Metrics */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Aggregated Impact</h2>
              <p className="text-blue-100 text-lg">Across all projects and industries</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {impactMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="text-center">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{metric.value}</div>
                    <p className="text-blue-100 text-sm">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Before/After Case Study Snippets */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Before &amp; After
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The transformation our clients experience, in concrete terms.
              </p>
            </div>

            <div className="space-y-12">
              {caseStudySnippets.map((study) => {
                const Icon = study.icon;
                return (
                  <div
                    key={study.title}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="p-6 lg:p-8 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                          <p className="text-gray-500 text-sm">{study.industry}</p>
                        </div>
                        <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hidden sm:block">
                          {study.highlight}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Before */}
                      <div className="p-6 lg:p-8 bg-red-50/50">
                        <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4">
                          Before
                        </h4>
                        <ul className="space-y-2">
                          {study.before.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* After */}
                      <div className="p-6 lg:p-8 bg-green-50/50 border-t lg:border-t-0 lg:border-l border-gray-100">
                        <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">
                          After
                        </h4>
                        <ul className="space-y-2">
                          {study.after.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/case-studies"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group text-lg"
              >
                View Full Case Studies
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Industry-Specific Results */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Results by Industry
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-specific outcomes and capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industryResults.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.industry}
                    className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{industry.industry}</h3>
                    </div>
                    <ul className="space-y-2">
                      {industry.results.map((result) => (
                        <li key={result} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-blue-50 border border-blue-100 rounded-xl p-8"
                >
                  <Quote className="w-8 h-8 text-blue-300 mb-4" />
                  <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-blue-200 pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                    <div className="mt-2 inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      {testimonial.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator Link */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Calculate Your ROI
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Use our interactive calculator to estimate the cost savings, time-to-market
                  improvement, and ROI you could achieve with Cloudrix.
                </p>
              </div>
              <Link
                href="/calculator"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group whitespace-nowrap"
              >
                Try ROI Calculator
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Let&apos;s discuss your project and how we can deliver measurable impact
              for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-white/60 transition-colors font-medium text-lg"
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
