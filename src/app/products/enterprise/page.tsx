import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Server,
  Cloud,
  Building2,
  Users,
  HeadphonesIcon,
  FileCheck,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  KeyRound,
  ClipboardList,
  Clock,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Enterprise AI & Engineering Products | Cloudrix",
  description:
    "Enterprise-grade AI and engineering products trusted by companies in 50+ countries. Self-serve or custom deployment with GDPR, SOC 2, ISO 27001, and EU AI Act compliance.",
  openGraph: {
    title: "Enterprise AI & Engineering Products | Cloudrix",
    description:
      "Enterprise-grade deployment with SSO, audit logs, SLA guarantees, and dedicated support. Cloud, on-premise, or hybrid.",
    url: "https://www.cloudrix.io/products/enterprise",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Enterprise Products")}&subtitle=${encodeURIComponent("Trusted by companies in 50+ countries")}&type=enterprise`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Enterprise Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI & Engineering Products",
    description:
      "Enterprise-grade AI products with GDPR, SOC 2, ISO 27001, and EU AI Act compliance.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/enterprise",
  },
};

const complianceBadges = [
  {
    name: "GDPR",
    description: "EU General Data Protection Regulation",
    icon: ShieldCheck,
  },
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control",
    icon: Lock,
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    icon: FileCheck,
  },
  {
    name: "EU AI Act",
    description: "European AI Regulation Compliant",
    icon: ClipboardList,
  },
];

const deploymentOptions = [
  {
    name: "Cloud",
    description:
      "Fully managed on our infrastructure. Zero maintenance, automatic updates, and 99.99% uptime SLA.",
    icon: Cloud,
    features: [
      "Multi-region deployment (EU, US, APAC)",
      "Automatic scaling and load balancing",
      "Daily backups with 30-day retention",
      "SOC 2 compliant data centers",
    ],
  },
  {
    name: "On-Premise",
    description:
      "Deploy on your own infrastructure. Full data sovereignty, air-gapped support, and custom integrations.",
    icon: Server,
    features: [
      "Docker/Kubernetes deployment packages",
      "Air-gapped environment support",
      "Full data sovereignty",
      "Custom hardware requirements consulting",
    ],
  },
  {
    name: "Hybrid",
    description:
      "Sensitive data stays on-premise while compute runs in the cloud. The best of both worlds.",
    icon: Building2,
    features: [
      "Data residency controls",
      "Cloud compute with on-prem storage",
      "VPN/VPC peering support",
      "Custom networking configuration",
    ],
  },
];

const enterpriseFeatures = [
  {
    name: "Single Sign-On (SSO)",
    description:
      "SAML 2.0 and OIDC support for seamless authentication with Okta, Azure AD, Google Workspace, and more.",
    icon: KeyRound,
  },
  {
    name: "Audit Logs",
    description:
      "Comprehensive audit trail for every action. Export to SIEM tools, set retention policies, and meet compliance requirements.",
    icon: ClipboardList,
  },
  {
    name: "SLA Guarantee",
    description:
      "99.99% uptime SLA with financial credits. Dedicated incident response team with 15-minute acknowledgment.",
    icon: Clock,
  },
  {
    name: "Dedicated Support",
    description:
      "Named account manager, priority Slack channel, quarterly business reviews, and 24/7 engineering escalation.",
    icon: HeadphonesIcon,
  },
  {
    name: "Team Management",
    description:
      "Role-based access control, team workspaces, usage quotas, and centralized billing for unlimited seats.",
    icon: Users,
  },
  {
    name: "Custom Integrations",
    description:
      "REST and GraphQL APIs, webhooks, custom connectors for Salesforce, SAP, ServiceNow, and your internal tools.",
    icon: Zap,
  },
];

const productCategories = [
  {
    name: "AI-Powered Suite",
    description: "LLM-powered tools for code review, compliance, content, and customer support.",
    products: products.filter((p) => p.category === "ai-powered"),
    gradient: "from-violet-600 to-purple-600",
    enterprisePrice: "From $2,500/mo",
  },
  {
    name: "AI-Enhanced Business Suite",
    description: "CRM, analytics, helpdesk, and invoicing with built-in AI intelligence.",
    products: products.filter((p) => p.category === "ai-enhanced"),
    gradient: "from-blue-600 to-cyan-600",
    enterprisePrice: "From $3,000/mo",
  },
  {
    name: "Engineering & DevOps Suite",
    description: "Monitoring, deployment, security scanning, and infrastructure management.",
    products: products.filter((p) => p.category === "engineering-tools"),
    gradient: "from-emerald-600 to-teal-600",
    enterprisePrice: "From $1,500/mo",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "https://www.cloudrix.io/products" },
          { name: "Enterprise", url: "https://www.cloudrix.io/products/enterprise" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.05),transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", url: "/products" },
              { name: "Enterprise", url: "/products/enterprise" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 border border-violet-500/20 mb-6">
              <Building2 className="h-4 w-4" />
              Enterprise Grade
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Enterprise AI &amp; Engineering
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                Products
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Trusted by companies in 50+ countries. Self-serve or enterprise-grade
              deployment with the compliance, security, and support your organization demands.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=enterprise"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
              >
                Talk to Enterprise Sales
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="bg-slate-950 py-16 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Compliance & Certifications
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Every Cloudrix product meets the highest standards for data protection,
              security, and regulatory compliance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {complianceBadges.map((badge) => (
              <div
                key={badge.name}
                className="group relative flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center transition-all duration-300 hover:border-violet-500/30 hover:bg-slate-900/80"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
                  <badge.icon className="h-8 w-8 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{badge.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories with Enterprise Pricing */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Product Suites with Enterprise Pricing
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Bundle products for maximum value or pick individual tools.
              All enterprise plans include SSO, audit logs, and dedicated support.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {productCategories.map((cat) => (
              <div
                key={cat.name}
                className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${cat.gradient}`} />
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{cat.description}</p>

                  <div className="mt-6">
                    <span className="text-2xl font-bold text-white">{cat.enterprisePrice}</span>
                    <span className="text-slate-500 text-sm ml-1">per suite</span>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {cat.products.map((product) => (
                      <li key={product.slug} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-300">{product.name}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact?type=enterprise"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${cat.gradient} px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity`}
                  >
                    Get Enterprise Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Custom Deployment Options
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Deploy Cloudrix products wherever your security and compliance requirements demand.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {deploymentOptions.map((option) => (
              <div
                key={option.name}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                  <option.icon className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{option.name}</h3>
                <p className="mt-3 text-sm text-slate-400">{option.description}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Enterprise Features
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Every enterprise plan includes security, compliance, and support features
              your team expects.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {enterpriseFeatures.map((feature) => (
              <div
                key={feature.name}
                className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  <feature.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 border border-emerald-500/20 mb-6">
              <Globe className="h-4 w-4" />
              Global Presence
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Trusted Worldwide
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Serving enterprise customers across every major market with local compliance expertise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { region: "North America", markets: "US, Canada" },
              { region: "Europe", markets: "Netherlands, Germany, UK" },
              { region: "Middle East", markets: "UAE, Saudi Arabia, Qatar" },
              { region: "Asia Pacific", markets: "Singapore, Japan, Australia" },
              { region: "Africa", markets: "Nigeria, Kenya, South Africa" },
            ].map((region) => (
              <div
                key={region.region}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-center"
              >
                <h3 className="font-semibold text-white">{region.region}</h3>
                <p className="mt-1 text-xs text-slate-400">{region.markets}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Deploy at Enterprise Scale?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Get a custom quote, security review, and pilot program tailored to your
            organization. Our enterprise team responds within 24 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=enterprise"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Talk to Enterprise Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
