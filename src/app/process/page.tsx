import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Lightbulb,
  Code2,
  TestTube2,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Shield,
  Wrench,
  Users,
  BarChart3,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Our Process - 6-Step Engineering Methodology",
  description:
    "From discovery to ongoing support, our proven 6-step engineering methodology ensures transparency, quality, and on-time delivery. See exactly what happens at each stage.",
  openGraph: {
    title: "Our Process - Engineering Methodology | Cloudrix",
    description:
      "Proven 6-step methodology: discovery, architecture, development, testing, launch, and support. Full transparency at every stage.",
    url: "https://www.cloudrix.io/process",
    type: "website",
    images: [
      {
        url: "/og?title=Our%20Process&subtitle=6-Step%20Engineering%20Methodology&type=process",
        width: 1200,
        height: 630,
        alt: "Cloudrix Engineering Process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | Cloudrix",
    description:
      "Proven 6-step engineering methodology with full transparency at every stage.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/process",
  },
};

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Discovery & Research",
    timeline: "Week 1-2",
    description:
      "We start by understanding your business deeply. Not just the technical requirements, but the business context, user needs, and constraints that shape the right solution.",
    activities: [
      "Stakeholder interviews and goal alignment",
      "Current system audit and technical assessment",
      "User journey mapping",
      "Competitive and market analysis",
      "Risk identification and mitigation planning",
    ],
    deliverables: [
      "Discovery Report",
      "Technical Assessment Document",
      "Project Risk Matrix",
      "Preliminary Timeline",
    ],
    communication: "Daily async updates, end-of-week summary call",
    color: "blue",
  },
  {
    step: 2,
    icon: Lightbulb,
    title: "Architecture & Planning",
    timeline: "Week 2-3",
    description:
      "We design the technical architecture and project plan. Every decision is documented with rationale, so you understand not just what we're building, but why.",
    activities: [
      "System architecture design",
      "Technology stack selection with trade-off analysis",
      "Database schema and data flow design",
      "API contract definition",
      "Infrastructure and deployment strategy",
      "Security and compliance planning",
    ],
    deliverables: [
      "Architecture Decision Records (ADRs)",
      "System Design Document",
      "API Specifications",
      "Detailed Sprint Plan",
      "Cost Estimate (infrastructure + development)",
    ],
    communication: "Architecture review session, stakeholder sign-off",
    color: "purple",
  },
  {
    step: 3,
    icon: Code2,
    title: "Development",
    timeline: "Week 3-12+",
    description:
      "Iterative development in 2-week sprints. You see working software every two weeks, not just at the end. Every sprint delivers shippable increments.",
    activities: [
      "Feature development in 2-week sprints",
      "Code reviews on every pull request",
      "Automated testing (unit, integration, e2e)",
      "CI/CD pipeline setup and maintenance",
      "Regular refactoring to prevent tech debt",
      "Documentation written alongside code",
    ],
    deliverables: [
      "Working Software (every sprint)",
      "Sprint Demo Recordings",
      "Updated Documentation",
      "Test Coverage Reports",
      "Velocity and Burn-down Charts",
    ],
    communication: "Daily standups, sprint reviews, weekly burn report",
    color: "green",
  },
  {
    step: 4,
    icon: TestTube2,
    title: "Quality Assurance",
    timeline: "Continuous + Week 10-12",
    description:
      "QA isn't a phase — it's built into every sprint. But before launch, we run a dedicated hardening period to catch edge cases and performance issues.",
    activities: [
      "Automated test suite execution",
      "Performance and load testing",
      "Security audit and penetration testing",
      "Accessibility compliance check (WCAG 2.1)",
      "Cross-browser and device testing",
      "User acceptance testing (UAT) support",
    ],
    deliverables: [
      "QA Report",
      "Performance Benchmarks",
      "Security Audit Report",
      "UAT Sign-off Document",
      "Bug Resolution Summary",
    ],
    communication: "Daily QA status, issue triage meetings",
    color: "orange",
  },
  {
    step: 5,
    icon: Rocket,
    title: "Launch & Deployment",
    timeline: "Week 12-13",
    description:
      "Zero-downtime deployment with rollback capabilities. We don't just throw code over the wall — we manage the entire launch process.",
    activities: [
      "Production environment setup and hardening",
      "Blue-green or canary deployment",
      "DNS and CDN configuration",
      "Monitoring and alerting setup",
      "Launch checklist verification",
      "Go-live support with on-call availability",
    ],
    deliverables: [
      "Deployment Runbook",
      "Monitoring Dashboard",
      "Incident Response Plan",
      "Launch Retrospective",
      "Production Health Report",
    ],
    communication: "War room during launch, hourly status updates",
    color: "red",
  },
  {
    step: 6,
    icon: HeadphonesIcon,
    title: "Support & Evolution",
    timeline: "Ongoing",
    description:
      "Post-launch isn't an afterthought. We provide ongoing support, monitoring, and continuous improvement to keep your system performing at its best.",
    activities: [
      "24/7 monitoring and incident response",
      "Performance optimization",
      "Security patching and updates",
      "Feature enhancements and iterations",
      "Cost optimization reviews",
      "Knowledge transfer and team training",
    ],
    deliverables: [
      "Monthly Performance Report",
      "Quarterly Architecture Review",
      "Cost Optimization Recommendations",
      "Updated Documentation",
      "Complete Handover Package (if transitioning)",
    ],
    communication: "Weekly sync, monthly business review, SLA-backed response times",
    color: "teal",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string; dot: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", light: "bg-blue-50", dot: "bg-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", light: "bg-purple-50", dot: "bg-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200", light: "bg-green-50", dot: "bg-green-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200", light: "bg-orange-50", dot: "bg-orange-600" },
  red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200", light: "bg-red-50", dot: "bg-red-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-200", light: "bg-teal-50", dot: "bg-teal-600" },
};

const qualityGuarantees = [
  {
    icon: Shield,
    title: "Satisfaction Guarantee",
    description: "Not happy with the first two weeks? You pay nothing. No questions asked.",
  },
  {
    icon: FileText,
    title: "Full Documentation",
    description: "Every line of code is documented. Every decision has a rationale. No tribal knowledge.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description: "Weekly burn reports, sprint velocity, and real-time project dashboards you can access anytime.",
  },
  {
    icon: Wrench,
    title: "90-Day Warranty",
    description: "Any bugs found within 90 days of launch are fixed at no additional cost.",
  },
];

const tools = [
  { category: "Project Management", tools: "Linear, Jira, Notion" },
  { category: "Communication", tools: "Slack, Microsoft Teams" },
  { category: "Version Control", tools: "GitHub, GitLab" },
  { category: "CI/CD", tools: "GitHub Actions, GitLab CI" },
  { category: "Monitoring", tools: "Datadog, Grafana, Sentry" },
  { category: "Infrastructure", tools: "Terraform, Pulumi" },
  { category: "Design", tools: "Figma, Storybook" },
  { category: "Documentation", tools: "Notion, Confluence, ADRs" },
];

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Our Process", url: "/process" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Our Process", url: "/process" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                <span>Proven Methodology</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Our Engineering Process
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Six stages, full transparency, and a deliverable at every milestone.
                You always know exactly where your project stands and what comes next.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const colors = colorMap[step.color];
                return (
                  <div key={step.step} className={`${colors.light} border ${colors.border} rounded-2xl p-8 lg:p-10`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${colors.text}`}>Step {step.step}</div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                          </div>
                          <span className={`ml-auto ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium hidden sm:block`}>
                            {step.timeline}
                          </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Key Activities
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.activities.map((activity) => (
                              <li key={activity} className="flex items-start gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                                <span className="text-gray-700 text-sm">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MessageSquare className="w-4 h-4" />
                          <span>{step.communication}</span>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="bg-white rounded-xl p-6 border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Deliverables
                        </h3>
                        <ul className="space-y-3">
                          {step.deliverables.map((deliverable) => (
                            <li key={deliverable} className="flex items-start gap-2">
                              <div className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`} />
                              <span className="text-gray-700 text-sm">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quality Guarantees */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quality Guarantees
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We put our money where our mouth is. These aren&apos;t aspirations — they&apos;re commitments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityGuarantees.map((guarantee) => {
                const Icon = guarantee.icon;
                return (
                  <div
                    key={guarantee.title}
                    className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{guarantee.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{guarantee.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools We Use */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tools We Use
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We adapt to your existing toolchain or bring our proven stack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <div key={tool.category} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{tool.category}</h3>
                  <p className="text-gray-600 text-sm">{tool.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free discovery call and we&apos;ll walk you through how our process
              applies to your specific project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-white/60 transition-colors font-medium text-lg"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
