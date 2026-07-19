import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Minus,
  Sparkles,
  Scale,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Product Comparison — Cloudrix vs Competitors | Cloudrix",
  description:
    "Compare Cloudrix products to Intercom, Snyk, HubSpot, Zendesk, and more. See feature-by-feature breakdowns, pricing, and why teams switch to Cloudrix.",
  openGraph: {
    title: "Product Comparison — Cloudrix vs Competitors",
    description:
      "Feature-by-feature comparison of Cloudrix products against market leaders. AI-powered, EU-compliant, and more affordable.",
    url: "https://www.cloudrix.io/products/compare",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Product Comparison")}&subtitle=${encodeURIComponent("Cloudrix vs the competition")}&type=compare`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Product Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Comparison — Cloudrix vs Competitors",
    description:
      "Feature-by-feature comparison of Cloudrix products against market leaders.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/compare",
  },
};

type FeatureSupport = "full" | "partial" | "none";

interface ComparisonProduct {
  name: string;
  isCloudrix?: boolean;
}

interface ComparisonFeature {
  feature: string;
  support: Record<string, FeatureSupport>;
}

interface ComparisonCategory {
  id: string;
  title: string;
  cloudrixProduct: string;
  competitors: ComparisonProduct[];
  features: ComparisonFeature[];
  pricing: { name: string; price: string }[];
  cloudrixAdvantages: string[];
}

const comparisons: ComparisonCategory[] = [
  {
    id: "ai-chat",
    title: "AI Customer Support",
    cloudrixProduct: "CloudrixAI Chat",
    competitors: [
      { name: "CloudrixAI Chat", isCloudrix: true },
      { name: "Intercom" },
      { name: "Drift" },
      { name: "Zendesk Chat" },
    ],
    features: [
      { feature: "AI-powered auto-responses", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "partial", "Zendesk Chat": "partial" } },
      { feature: "RAG pipeline (grounded answers)", support: { "CloudrixAI Chat": "full", Intercom: "partial", Drift: "none", "Zendesk Chat": "none" } },
      { feature: "Knowledge base ingestion", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "partial", "Zendesk Chat": "full" } },
      { feature: "Multi-language support", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "partial", "Zendesk Chat": "full" } },
      { feature: "Human escalation with context", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "full", "Zendesk Chat": "full" } },
      { feature: "Custom branding & widget", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "full", "Zendesk Chat": "partial" } },
      { feature: "Conversation analytics", support: { "CloudrixAI Chat": "full", Intercom: "full", Drift: "full", "Zendesk Chat": "full" } },
      { feature: "EU AI Act compliant", support: { "CloudrixAI Chat": "full", Intercom: "none", Drift: "none", "Zendesk Chat": "none" } },
      { feature: "GDPR compliant (EU hosting)", support: { "CloudrixAI Chat": "full", Intercom: "partial", Drift: "none", "Zendesk Chat": "partial" } },
      { feature: "No per-seat pricing", support: { "CloudrixAI Chat": "full", Intercom: "none", Drift: "none", "Zendesk Chat": "none" } },
      { feature: "Free tier available", support: { "CloudrixAI Chat": "full", Intercom: "none", Drift: "none", "Zendesk Chat": "none" } },
      { feature: "On-premise deployment", support: { "CloudrixAI Chat": "full", Intercom: "none", Drift: "none", "Zendesk Chat": "none" } },
    ],
    pricing: [
      { name: "CloudrixAI Chat", price: "From $0/mo" },
      { name: "Intercom", price: "From $39/seat/mo" },
      { name: "Drift", price: "From $2,500/mo" },
      { name: "Zendesk Chat", price: "From $55/agent/mo" },
    ],
    cloudrixAdvantages: [
      "RAG pipeline ensures answers are grounded in your actual docs, not hallucinated",
      "No per-seat pricing — pay by usage, not headcount",
      "EU AI Act compliant out of the box",
      "On-premise deployment available for data sovereignty",
    ],
  },
  {
    id: "code-review",
    title: "AI Code Review",
    cloudrixProduct: "CodeScan AI",
    competitors: [
      { name: "CodeScan AI", isCloudrix: true },
      { name: "Snyk" },
      { name: "SonarCloud" },
      { name: "CodeClimate" },
    ],
    features: [
      { feature: "AI-powered code analysis", support: { "CodeScan AI": "full", Snyk: "partial", SonarCloud: "partial", CodeClimate: "none" } },
      { feature: "Security vulnerability detection", support: { "CodeScan AI": "full", Snyk: "full", SonarCloud: "full", CodeClimate: "partial" } },
      { feature: "Performance bottleneck ID", support: { "CodeScan AI": "full", Snyk: "none", SonarCloud: "partial", CodeClimate: "partial" } },
      { feature: "Architecture review", support: { "CodeScan AI": "full", Snyk: "none", SonarCloud: "none", CodeClimate: "partial" } },
      { feature: "20+ language support", support: { "CodeScan AI": "full", Snyk: "full", SonarCloud: "full", CodeClimate: "partial" } },
      { feature: "GitHub/GitLab PR integration", support: { "CodeScan AI": "full", Snyk: "full", SonarCloud: "full", CodeClimate: "full" } },
      { feature: "Quality score & trend tracking", support: { "CodeScan AI": "full", Snyk: "none", SonarCloud: "full", CodeClimate: "full" } },
      { feature: "Paste-and-scan (no repo needed)", support: { "CodeScan AI": "full", Snyk: "none", SonarCloud: "none", CodeClimate: "none" } },
      { feature: "OWASP Top 10 coverage", support: { "CodeScan AI": "full", Snyk: "full", SonarCloud: "full", CodeClimate: "none" } },
      { feature: "Free tier with daily scans", support: { "CodeScan AI": "full", Snyk: "full", SonarCloud: "full", CodeClimate: "none" } },
      { feature: "Self-hosted option", support: { "CodeScan AI": "full", Snyk: "partial", SonarCloud: "none", CodeClimate: "none" } },
      { feature: "EU data residency", support: { "CodeScan AI": "full", Snyk: "none", SonarCloud: "none", CodeClimate: "none" } },
    ],
    pricing: [
      { name: "CodeScan AI", price: "From $0/mo" },
      { name: "Snyk", price: "From $0/mo (limited)" },
      { name: "SonarCloud", price: "From $0/mo (limited)" },
      { name: "CodeClimate", price: "From $49/mo" },
    ],
    cloudrixAdvantages: [
      "LLM-powered analysis catches architectural issues, not just syntax bugs",
      "Paste-and-scan mode — no repo connection needed for quick checks",
      "Architecture and design pattern review included",
      "EU data residency and GDPR compliance built in",
    ],
  },
  {
    id: "ai-act",
    title: "AI Compliance",
    cloudrixProduct: "AI Act Scanner",
    competitors: [
      { name: "AI Act Scanner", isCloudrix: true },
      { name: "OneTrust" },
      { name: "Vanta" },
    ],
    features: [
      { feature: "EU AI Act risk classification", support: { "AI Act Scanner": "full", OneTrust: "partial", Vanta: "none" } },
      { feature: "Automated gap analysis", support: { "AI Act Scanner": "full", OneTrust: "full", Vanta: "partial" } },
      { feature: "Remediation recommendations", support: { "AI Act Scanner": "full", OneTrust: "full", Vanta: "full" } },
      { feature: "PDF compliance report", support: { "AI Act Scanner": "full", OneTrust: "full", Vanta: "full" } },
      { feature: "Multi-system portfolio scan", support: { "AI Act Scanner": "full", OneTrust: "full", Vanta: "partial" } },
      { feature: "Regulatory update monitoring", support: { "AI Act Scanner": "full", OneTrust: "full", Vanta: "partial" } },
      { feature: "AI-specific focus (not general GRC)", support: { "AI Act Scanner": "full", OneTrust: "none", Vanta: "none" } },
      { feature: "Free tier available", support: { "AI Act Scanner": "full", OneTrust: "none", Vanta: "none" } },
      { feature: "No enterprise sales required", support: { "AI Act Scanner": "full", OneTrust: "none", Vanta: "none" } },
      { feature: "Self-serve onboarding", support: { "AI Act Scanner": "full", OneTrust: "none", Vanta: "partial" } },
    ],
    pricing: [
      { name: "AI Act Scanner", price: "From $0/mo" },
      { name: "OneTrust", price: "Custom (typically $50K+/yr)" },
      { name: "Vanta", price: "From $4,000/yr" },
    ],
    cloudrixAdvantages: [
      "Purpose-built for EU AI Act, not a bolt-on to a general GRC platform",
      "Self-serve — no enterprise sales process to get started",
      "Free tier lets you assess risk before committing",
      "Built by engineers who understand AI systems, not just compliance checklists",
    ],
  },
  {
    id: "crm",
    title: "AI-Powered CRM",
    cloudrixProduct: "SmartCRM",
    competitors: [
      { name: "SmartCRM", isCloudrix: true },
      { name: "HubSpot" },
      { name: "Salesforce" },
      { name: "Pipedrive" },
    ],
    features: [
      { feature: "AI lead scoring", support: { SmartCRM: "full", HubSpot: "partial", Salesforce: "partial", Pipedrive: "partial" } },
      { feature: "AI email drafting", support: { SmartCRM: "full", HubSpot: "partial", Salesforce: "none", Pipedrive: "none" } },
      { feature: "Deal outcome prediction", support: { SmartCRM: "full", HubSpot: "partial", Salesforce: "partial", Pipedrive: "none" } },
      { feature: "Pipeline analytics", support: { SmartCRM: "full", HubSpot: "full", Salesforce: "full", Pipedrive: "full" } },
      { feature: "Email & calendar integration", support: { SmartCRM: "full", HubSpot: "full", Salesforce: "full", Pipedrive: "full" } },
      { feature: "Custom fields & workflows", support: { SmartCRM: "full", HubSpot: "full", Salesforce: "full", Pipedrive: "partial" } },
      { feature: "No per-contact pricing", support: { SmartCRM: "full", HubSpot: "none", Salesforce: "none", Pipedrive: "none" } },
      { feature: "GDPR compliant (EU hosting)", support: { SmartCRM: "full", HubSpot: "partial", Salesforce: "partial", Pipedrive: "partial" } },
      { feature: "No vendor lock-in (export all data)", support: { SmartCRM: "full", HubSpot: "partial", Salesforce: "none", Pipedrive: "full" } },
      { feature: "Open API for custom integrations", support: { SmartCRM: "full", HubSpot: "full", Salesforce: "full", Pipedrive: "full" } },
      { feature: "Flat pricing (no hidden tiers)", support: { SmartCRM: "full", HubSpot: "none", Salesforce: "none", Pipedrive: "partial" } },
      { feature: "AI meeting prep summaries", support: { SmartCRM: "full", HubSpot: "none", Salesforce: "none", Pipedrive: "none" } },
    ],
    pricing: [
      { name: "SmartCRM", price: "From $39/mo (flat)" },
      { name: "HubSpot", price: "From $0/mo (limited)" },
      { name: "Salesforce", price: "From $25/user/mo" },
      { name: "Pipedrive", price: "From $14/user/mo" },
    ],
    cloudrixAdvantages: [
      "AI-native: lead scoring, email drafting, and deal prediction built in, not add-ons",
      "Flat pricing — no per-user or per-contact charges that scale unpredictably",
      "Full data export with no vendor lock-in",
      "EU-hosted with GDPR compliance by default",
    ],
  },
  {
    id: "helpdesk",
    title: "AI Helpdesk",
    cloudrixProduct: "HelpDesk AI",
    competitors: [
      { name: "HelpDesk AI", isCloudrix: true },
      { name: "Zendesk" },
      { name: "Freshdesk" },
      { name: "Intercom" },
    ],
    features: [
      { feature: "AI ticket routing & prioritization", support: { "HelpDesk AI": "full", Zendesk: "partial", Freshdesk: "partial", Intercom: "partial" } },
      { feature: "AI auto-draft responses", support: { "HelpDesk AI": "full", Zendesk: "partial", Freshdesk: "none", Intercom: "full" } },
      { feature: "Real-time sentiment analysis", support: { "HelpDesk AI": "full", Zendesk: "none", Freshdesk: "none", Intercom: "partial" } },
      { feature: "Knowledge base suggestions", support: { "HelpDesk AI": "full", Zendesk: "full", Freshdesk: "full", Intercom: "full" } },
      { feature: "SLA tracking & escalation", support: { "HelpDesk AI": "full", Zendesk: "full", Freshdesk: "full", Intercom: "partial" } },
      { feature: "Multi-channel (email, chat, social)", support: { "HelpDesk AI": "full", Zendesk: "full", Freshdesk: "full", Intercom: "full" } },
      { feature: "No per-agent pricing", support: { "HelpDesk AI": "full", Zendesk: "none", Freshdesk: "none", Intercom: "none" } },
      { feature: "EU AI Act compliant", support: { "HelpDesk AI": "full", Zendesk: "none", Freshdesk: "none", Intercom: "none" } },
      { feature: "On-premise deployment", support: { "HelpDesk AI": "full", Zendesk: "none", Freshdesk: "none", Intercom: "none" } },
      { feature: "Custom AI model tuning", support: { "HelpDesk AI": "full", Zendesk: "none", Freshdesk: "none", Intercom: "partial" } },
    ],
    pricing: [
      { name: "HelpDesk AI", price: "From $49/mo (flat)" },
      { name: "Zendesk", price: "From $55/agent/mo" },
      { name: "Freshdesk", price: "From $0/mo (limited)" },
      { name: "Intercom", price: "From $39/seat/mo" },
    ],
    cloudrixAdvantages: [
      "AI-native with sentiment analysis and auto-draft responses built in",
      "No per-agent pricing — scale your team without scaling costs",
      "EU AI Act compliant and available for on-premise deployment",
      "Custom AI model tuning to match your support tone and domain",
    ],
  },
];

function SupportIcon({ support }: { support: FeatureSupport }) {
  switch (support) {
    case "full":
      return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    case "partial":
      return <Minus className="h-5 w-5 text-amber-400" />;
    case "none":
      return <XCircle className="h-5 w-5 text-slate-600" />;
  }
}

function ComparisonTable({ comparison }: { comparison: ComparisonCategory }) {
  const allProducts = comparison.competitors;

  return (
    <section id={comparison.id} className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {comparison.title}
        </h2>
        <p className="mt-2 text-slate-400">
          {comparison.cloudrixProduct} vs {comparison.competitors.filter((c) => !c.isCloudrix).map((c) => c.name).join(" vs ")}
        </p>
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300">
                Feature
              </th>
              {allProducts.map((product) => (
                <th
                  key={product.name}
                  className={`py-4 px-4 text-center text-sm font-semibold ${
                    product.isCloudrix
                      ? "text-violet-400 bg-violet-500/5"
                      : "text-slate-300"
                  }`}
                >
                  {product.name}
                  {product.isCloudrix && (
                    <span className="block text-[10px] text-violet-500 font-normal mt-0.5">
                      Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.features.map((row, idx) => (
              <tr
                key={row.feature}
                className={`border-b border-slate-800/50 ${
                  idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"
                }`}
              >
                <td className="py-3.5 px-6 text-sm text-slate-300">
                  {row.feature}
                </td>
                {allProducts.map((product) => (
                  <td
                    key={product.name}
                    className={`py-3.5 px-4 text-center ${
                      product.isCloudrix ? "bg-violet-500/5" : ""
                    }`}
                  >
                    <span className="inline-flex justify-center">
                      <SupportIcon support={row.support[product.name]} />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {comparison.pricing.map((item) => {
          const isCloudrix = comparison.competitors.find(
            (c) => c.name === item.name
          )?.isCloudrix;
          return (
            <div
              key={item.name}
              className={`rounded-xl border p-4 text-center ${
                isCloudrix
                  ? "border-violet-500/30 bg-violet-500/5"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <p className={`text-sm font-medium ${isCloudrix ? "text-violet-400" : "text-slate-400"}`}>
                {item.name}
              </p>
              <p className={`mt-1 text-lg font-bold ${isCloudrix ? "text-white" : "text-slate-300"}`}>
                {item.price}
              </p>
            </div>
          );
        })}
      </div>

      {/* Cloudrix Advantages */}
      <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
          Cloudrix Advantage
        </h3>
        <ul className="space-y-2">
          {comparison.cloudrixAdvantages.map((advantage) => (
            <li key={advantage} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ProductComparePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "https://www.cloudrix.io/products" },
          { name: "Compare", url: "https://www.cloudrix.io/products/compare" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", url: "/products" },
              { name: "Compare", url: "/products/compare" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 border border-violet-500/20 mb-6">
              <Scale className="h-4 w-4" />
              Product Comparison
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              How Cloudrix Compares
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                to the Competition
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Feature-by-feature comparison against market leaders. See why teams
              worldwide choose Cloudrix for AI-powered, EU-compliant, and cost-effective solutions.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="mt-10 flex flex-wrap gap-3">
            {comparisons.map((comp) => (
              <a
                key={comp.id}
                href={`#${comp.id}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                {comp.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="bg-slate-950 pt-12 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="font-medium text-slate-300">Legend:</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Full support
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Minus className="h-4 w-4 text-amber-400" /> Partial / add-on
            </span>
            <span className="inline-flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-slate-600" /> Not available
            </span>
          </div>
        </div>
      </section>

      {/* Comparison Tables */}
      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {comparisons.map((comparison) => (
            <ComparisonTable key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Switch?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Try any Cloudrix product free, no credit card required. Or talk to our team
            about migrating from your current tools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?type=migration"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Talk to Migration Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
