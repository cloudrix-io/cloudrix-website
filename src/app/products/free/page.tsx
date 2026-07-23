"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Gift,
  Users,
  CreditCard,
  ArrowRightLeft,
  Compass,
  Calculator,
  ShieldCheck,
  ScanSearch,
  FileText,
  Network,
  BookOpen,
  MessageSquareText,
  Rocket,
  Activity,
  CheckCircle as StatusIcon,
  LayoutDashboard,
  ShieldAlert,
  Gauge,
  PenTool,
  Languages,
  Mail,
} from "lucide-react";

const freeProducts = [
  {
    name: "Cloud Cost Calculator",
    description:
      "Compare infrastructure costs across AWS, Azure, and GCP side by side. No signup required.",
    icon: Calculator,
    href: "/products/cloud-cost-calculator",
    demoHref: "/products/cloud-cost-calculator/demo",
    tier: "100% Free",
  },
  {
    name: "StackPilot",
    description:
      "Answer 5 questions, get a battle-tested tech stack recommendation with pros, cons, and alternatives.",
    icon: Compass,
    href: "/products/tech-stack-advisor",
    demoHref: "/products/tech-stack-advisor/demo",
    tier: "100% Free",
  },
  {
    name: "MigrateIQ",
    description:
      "Interactive cloud migration planning tool with dependency graphs, timeline, and cost calculator.",
    icon: ArrowRightLeft,
    href: "/products/cloud-migration-planner",
    demoHref: "/products/cloud-migration-planner/demo",
    tier: "100% Free",
  },
  {
    name: "SaaS Starter Kit",
    description:
      "Production-ready NestJS + Angular boilerplate with auth, payments, and multi-tenancy. Open source.",
    icon: Rocket,
    href: "/products/saas-starter",
    demoHref: "/products/saas-starter/demo",
    tier: "Open Source",
  },
];

const freemiumProducts = [
  {
    name: "CloudrixAI Chat",
    description:
      "AI-powered customer support agent with RAG pipeline. 100 messages/month free.",
    icon: MessageSquareText,
    href: "/products/cloudrix-ai-chat",
    demoHref: "/products/cloudrix-ai-chat/demo",
    freeLimit: "100 messages/month",
  },
  {
    name: "CodeScan AI",
    description:
      "AI code review for security, performance, and architecture. 5 scans/day free.",
    icon: ScanSearch,
    href: "/products/ai-code-reviewer",
    demoHref: "/products/ai-code-reviewer/demo",
    freeLimit: "5 scans/day",
  },
  {
    name: "ScopeAI",
    description:
      "Turn project ideas into detailed scope documents with AI. 3 scopes/month free.",
    icon: FileText,
    href: "/products/ai-scope-generator",
    demoHref: "/products/ai-scope-generator/demo",
    freeLimit: "3 scopes/month",
  },
  {
    name: "AI Act Compliance Scanner",
    description:
      "Check if your AI system complies with EU AI Act regulations. Free risk assessment.",
    icon: ShieldCheck,
    href: "/products/eu-ai-act-scanner",
    demoHref: "/products/eu-ai-act-scanner/demo",
    freeLimit: "Free risk assessment",
  },
  {
    name: "StatusPage",
    description:
      "Professional status page with custom branding. Free for up to 3 components.",
    icon: StatusIcon,
    href: "/products/status-page",
    demoHref: "/products/status-page/demo",
    freeLimit: "3 components",
  },
  {
    name: "API Monitor",
    description:
      "Uptime monitoring from 12 global locations. Free for up to 5 endpoints.",
    icon: Activity,
    href: "/products/api-monitor",
    demoHref: "/products/api-monitor/demo",
    freeLimit: "5 endpoints",
  },
  {
    name: "DevOps Dashboard",
    description:
      "CI/CD pipeline monitoring and DORA metrics tracking. Free for 1 team.",
    icon: LayoutDashboard,
    href: "/products/devops-dashboard",
    demoHref: "/products/devops-dashboard/demo",
    freeLimit: "1 team",
  },
  {
    name: "SecureScan",
    description:
      "Automated OWASP Top 10 security scanning for web applications. 3 scans/month free.",
    icon: ShieldAlert,
    href: "/products/security-scanner",
    demoHref: "/products/security-scanner/demo",
    freeLimit: "3 scans/month",
  },
  {
    name: "PerfProfiler",
    description:
      "Core Web Vitals monitoring with real user data. Free for 1 site.",
    icon: Gauge,
    href: "/products/performance-profiler",
    demoHref: "/products/performance-profiler/demo",
    freeLimit: "1 site",
  },
  {
    name: "ContentAI Studio",
    description:
      "AI content generation for marketing teams. 5 pieces/month free.",
    icon: PenTool,
    href: "/products/ai-content-studio",
    demoHref: "/products/ai-content-studio/demo",
    freeLimit: "5 pieces/month",
  },
  {
    name: "TranslateAI",
    description:
      "LLM-powered document and website translation. 5,000 words/month free.",
    icon: Languages,
    href: "/products/ai-translation",
    demoHref: "/products/ai-translation/demo",
    freeLimit: "5,000 words/month",
  },
];

export default function FreeToolsPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.cloudrix.io",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://www.cloudrix.io/products",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Free Tools",
                item: "https://www.cloudrix.io/products/free",
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-white">Free Tools</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 border border-emerald-500/20 mb-6">
              <Gift className="h-4 w-4" />
              No Credit Card Required
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              100% Free Tools
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                No Credit Card Required
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Try all our tools without signing up or entering payment details.
              From cloud cost calculators to AI code review — start using them right now.
            </p>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-slate-300 font-medium">
                  Free forever — no signup required
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-slate-300 font-medium">
                  No credit card ever
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completely Free Products */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Completely Free
            </h2>
            <p className="mt-2 text-slate-400">
              No limits, no paywalls, no signup. These tools are 100% free forever.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {freeProducts.map((product) => (
              <div
                key={product.name}
                className="group relative flex flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <product.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.tier}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-sm text-slate-400 flex-1">
                  {product.description}
                </p>

                <div className="mt-6 flex gap-2">
                  <Link
                    href={product.demoHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try Now
                  </Link>
                  <Link
                    href={product.href}
                    className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-slate-400 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freemium Products */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Free to Start
            </h2>
            <p className="mt-2 text-slate-400">
              Generous free tiers to get you started. Upgrade only when you need more.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freemiumProducts.map((product) => (
              <div
                key={product.name}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <product.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Freemium
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-xs text-slate-400 flex-1">
                  {product.description}
                </p>

                <div className="mt-4 text-xs text-emerald-400 font-medium">
                  Free: {product.freeLimit}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={product.demoHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try Free
                  </Link>
                  <Link
                    href={product.href}
                    className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-slate-400 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture / Newsletter */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <Mail className="h-8 w-8 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Get Notified When We Launch New Tools
          </h2>
          <p className="mt-4 text-slate-400">
            We ship new free tools every month. Join 5,000+ developers who get early
            access and product updates.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <Sparkles className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-semibold">
                You&apos;re on the list!
              </p>
              <p className="text-sm text-slate-400 mt-1">
                We&apos;ll notify you when new tools launch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110 whitespace-nowrap"
              >
                Notify Me
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need More Power?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Our free tools are fully functional. When you need more, check out our
            startup bundle or enterprise plans.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products/startups"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110"
            >
              Startup Bundle — $299/mo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products/enterprise"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Enterprise Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
