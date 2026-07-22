import { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Users,
  DollarSign,
  MessageSquareText,
  ScanSearch,
  FileText,
  Activity,
  CheckCircle as StatusIcon,
  Star,
  Zap,
  BadgePercent,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Startup Program — 60% Off All Products | Cloudrix",
  description:
    "Get CloudrixAI Chat, CodeScan AI, ScopeAI, StatusPage, and API Monitor for €299/month. 60% discount for startups under €1M revenue.",
  openGraph: {
    title: "Startup Program — 60% Off All Products | Cloudrix",
    description:
      "The complete startup stack for €299/month. Apply in 2 minutes, get approved in 24 hours, start building immediately.",
    url: "https://www.cloudrix.io/products/startups",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Startup Program")}&subtitle=${encodeURIComponent("60% off — everything for €299/mo")}&type=startups`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Startup Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Program — 60% Off All Products",
    description:
      "CloudrixAI Chat + CodeScan AI + ScopeAI + StatusPage + API Monitor for €299/month.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products/startups",
  },
};

const bundleProducts = [
  {
    name: "CloudrixAI Chat",
    description: "AI-powered customer support agent with RAG pipeline",
    normalPrice: "€149/mo",
    icon: MessageSquareText,
    tier: "Pro",
  },
  {
    name: "CodeScan AI",
    description: "AI code review with security, performance, and architecture analysis",
    normalPrice: "€79/mo",
    icon: ScanSearch,
    tier: "Team",
  },
  {
    name: "ScopeAI",
    description: "AI project scoping with timeline, cost, and tech stack recommendations",
    normalPrice: "€99/mo",
    icon: FileText,
    tier: "Team",
  },
  {
    name: "StatusPage",
    description: "Professional status page with custom branding and subscriber alerts",
    normalPrice: "€49/mo",
    icon: StatusIcon,
    tier: "Pro",
  },
  {
    name: "API Monitor",
    description: "Uptime monitoring from 12 global locations with 30-second checks",
    normalPrice: "€49/mo",
    icon: Activity,
    tier: "Pro",
  },
];

const totalNormalPrice = 425;
const startupPrice = 299;
const savingsPercent = Math.round(
  ((totalNormalPrice - startupPrice) / totalNormalPrice) * 100
);

const eligibilityCriteria = [
  { text: "Under €1M in annual revenue", icon: DollarSign },
  { text: "Under 20 full-time employees", icon: Users },
  { text: "Founded less than 5 years ago", icon: Clock },
  { text: "Building a technology product", icon: Rocket },
];

const howItWorks = [
  {
    step: "1",
    title: "Apply in 2 Minutes",
    description:
      "Fill out a short form with your company details, revenue, team size, and what you are building. No pitch deck required.",
  },
  {
    step: "2",
    title: "Get Approved in 24 Hours",
    description:
      "Our team reviews your application and sends approval within one business day. Most startups qualify.",
  },
  {
    step: "3",
    title: "Start Building Immediately",
    description:
      "Get instant access to all five products at startup pricing. No contracts, cancel anytime.",
  },
];

const testimonials = [
  {
    quote:
      "We replaced three separate tools with the Cloudrix startup bundle. Our monthly tooling cost dropped from €800 to €299 and everything works better together.",
    name: "Sarah Chen",
    title: "CTO, PayTrack (YC W24)",
    avatar: "SC",
  },
  {
    quote:
      "The CodeScan AI integration alone saved us 10 hours per week on code reviews. As a 6-person team, that is a game changer.",
    name: "Marcus Adeyemi",
    title: "Co-founder, LogiStack",
    avatar: "MA",
  },
  {
    quote:
      "We needed GDPR compliance from day one since we sell to EU enterprises. Cloudrix was the only startup-friendly option that had it built in.",
    name: "Lena Hofmann",
    title: "CEO, DataBridge",
    avatar: "LH",
  },
];

export default function StartupsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "https://www.cloudrix.io/products" },
          { name: "Startups", url: "https://www.cloudrix.io/products/startups" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", url: "/products" },
              { name: "Startups", url: "/products/startups" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 border border-orange-500/20 mb-6">
              <Rocket className="h-4 w-4" />
              Startup Program
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Startup Stack:
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                Everything for €299/month
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Get five essential products in one bundle with a {savingsPercent}% startup
              discount. AI-powered support, code review, project scoping, status pages,
              and monitoring — everything a growing startup needs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=startup-program"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110"
              >
                Apply for Startup Program
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

      {/* Pricing Breakdown */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 border border-emerald-500/20 mb-4">
              <BadgePercent className="h-4 w-4" />
              {savingsPercent}% Startup Discount
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What&apos;s in the Bundle
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Five products that normally cost ${totalNormalPrice}/month, yours for ${startupPrice}/month.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {bundleProducts.map((product) => (
              <div
                key={product.name}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                  <product.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-xs text-slate-400 flex-1">
                  {product.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-500 line-through">
                    {product.normalPrice}
                  </span>
                  <span className="ml-2 text-xs text-emerald-400 font-medium">
                    {product.tier} tier included
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Pricing */}
          <div className="mt-12 mx-auto max-w-lg rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl text-slate-500 line-through">
                ${totalNormalPrice}/mo
              </span>
              <ArrowRight className="h-5 w-5 text-slate-600" />
              <span className="text-4xl font-bold text-white">
                ${startupPrice}/mo
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Save ${totalNormalPrice - startupPrice}/month with the startup bundle
            </p>
            <Link
              href="/contact?type=startup-program"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Who Qualifies?
              </h2>
              <p className="mt-4 text-slate-400">
                The startup program is designed for early-stage companies building
                technology products. Meet all four criteria to qualify.
              </p>

              <ul className="mt-8 space-y-4">
                {eligibilityCriteria.map((criteria) => (
                  <li key={criteria.text} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20 shrink-0">
                      <criteria.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <span className="text-slate-300 font-medium">
                      {criteria.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                How It Works
              </h3>
              <div className="space-y-8">
                {howItWorks.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 text-sm font-bold text-orange-400 shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What Startup Founders Say
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-amber-600 text-sm font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="bg-slate-950 py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              More Than Just a Discount
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "No Contracts",
                description: "Month-to-month billing. Cancel anytime, no questions asked.",
                icon: Zap,
              },
              {
                title: "Priority Support",
                description: "Startup program members get priority email support with 4-hour response time.",
                icon: Sparkles,
              },
              {
                title: "Community Access",
                description: "Join our Slack community of 200+ startup founders using Cloudrix tools.",
                icon: Users,
              },
              {
                title: "Growth Path",
                description: "Seamless upgrade to standard or enterprise plans as you scale.",
                icon: Rocket,
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center"
              >
                <benefit.icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Rocket className="h-8 w-8 text-orange-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Building Today
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Apply in 2 minutes, get approved in 24 hours, and start building with
            five professional-grade tools for just ${startupPrice}/month.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=startup-program"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110"
            >
              Apply for Startup Program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
