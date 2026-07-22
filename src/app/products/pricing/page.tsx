"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Shield,
  CreditCard,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import {
  visibleProducts,
  categoryInfo,
  type ProductCategory,
  type PricingTier,
} from "@/data/products";

const categories: { key: ProductCategory; label: string; gradient: string }[] = [
  { key: "ai-powered", label: "AI-Powered Products", gradient: "from-violet-600 to-purple-600" },
  { key: "ai-enhanced", label: "AI-Enhanced Solutions", gradient: "from-blue-600 to-cyan-600" },
  { key: "engineering-tools", label: "Engineering & Business Tools", gradient: "from-emerald-600 to-teal-600" },
];

const faqs = [
  {
    q: "Can I switch between plans?",
    a: "Yes. You can upgrade or downgrade your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and SEPA direct debit for EU customers. All payments are processed securely through Stripe.",
  },
  {
    q: "Is there a free trial?",
    a: "Most of our products offer a generous free tier so you can evaluate them before committing to a paid plan. No credit card required to start.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you are not satisfied, contact us within 14 days of your purchase for a full refund.",
  },
  {
    q: "Do you offer discounts for startups or non-profits?",
    a: "Yes. We offer 50% off for qualifying startups (under 2 years old, under €1M ARR) and 30% off for registered non-profit organizations. Contact sales@cloudrix.io with your details.",
  },
  {
    q: "How does enterprise pricing work?",
    a: "Enterprise plans are custom-quoted based on your team size, usage volume, and specific requirements. Contact our sales team for a personalized quote, typically within 24 hours.",
  },
  {
    q: "Can I pay annually?",
    a: "Yes. Annual billing gives you a 20% discount compared to monthly billing. You can switch between monthly and annual billing at any time.",
  },
];

function formatPrice(
  tier: PricingTier,
  billingPeriod: "monthly" | "annual",
  currency: "usd" | "eur"
): string {
  const sym = currency === "eur" ? "\u20AC" : "$";
  if (tier.priceMonthly === 0 || tier.price === "\u20AC0") return `${sym}0`;
  if (tier.price === "Custom" || !tier.priceMonthly) return "Custom";
  if (billingPeriod === "annual" && tier.priceYearly) {
    return `${sym}${Math.round(tier.priceYearly / 12)}`;
  }
  return `${sym}${tier.priceMonthly}`;
}

function getPerUnit(tier: PricingTier): string {
  if (tier.priceMonthly === 0 || tier.price === "\u20AC0") return "";
  if (tier.price === "Custom" || !tier.priceMonthly) return "";
  if (tier.price.includes("/candidate")) return "/candidate";
  return "/mo";
}

export default function ProductPricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<"usd" | "eur">("eur");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const filteredProducts =
    activeCategory === "all"
      ? visibleProducts
      : visibleProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-6">
            <Sparkles className="h-4 w-4" />
            Transparent Pricing, No Surprises
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Choose the Right Plan for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
              Your Needs
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day money-back guarantee.
            No hidden fees, no lock-in contracts.
          </p>

          {/* Billing + Currency Toggles */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billingPeriod === "annual"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Annual
                <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  -20%
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 p-1">
              <button
                onClick={() => setCurrency("usd")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  currency === "usd"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("eur")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  currency === "eur"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EUR
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
                activeCategory === "all"
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                  : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
                  activeCategory === cat.key
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Pricing Cards */}
      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {categories
            .filter((cat) => activeCategory === "all" || activeCategory === cat.key)
            .map((cat) => {
              const catProducts = filteredProducts.filter((p) => p.category === cat.key);
              if (catProducts.length === 0) return null;
              return (
                <div key={cat.key} className="mb-20 last:mb-0">
                  <div className="mb-10">
                    <h2
                      className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.gradient} sm:text-3xl`}
                    >
                      {cat.label}
                    </h2>
                    <p className="mt-2 text-slate-400">
                      {categoryInfo[cat.key].description}
                    </p>
                  </div>

                  <div className="space-y-12">
                    {catProducts.map((product) => {
                      const tiers = product.pricingTiers;
                      if (!tiers || tiers.length === 0) return null;

                      return (
                        <div
                          key={product.slug}
                          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:p-8"
                        >
                          {/* Product header */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                            <div>
                              <Link
                                href={`/products/${product.slug}`}
                                className="text-xl font-bold text-white hover:text-indigo-400 transition-colors"
                              >
                                {product.name}
                              </Link>
                              <p className="mt-1 text-sm text-slate-400">
                                {product.tagline}
                              </p>
                            </div>
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors shrink-0"
                            >
                              View product
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>

                          {/* Tier cards */}
                          <div
                            className={`grid gap-6 ${
                              tiers.length === 1
                                ? "grid-cols-1 max-w-md"
                                : tiers.length === 2
                                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                                  : tiers.length === 3
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            }`}
                          >
                            {tiers.map((tier) => {
                              const displayPrice = formatPrice(tier, billingPeriod, currency);
                              const perUnit = getPerUnit(tier);
                              const isFree = tier.priceMonthly === 0 || tier.price === "\u20AC0";
                              const isEnterprise = tier.price === "Custom" || !tier.priceMonthly;
                              const isPaid = !isFree && !isEnterprise;
                              const currencySymbol = currency === "eur" ? "\u20AC" : "$";
                              const annualSavings =
                                isPaid &&
                                billingPeriod === "annual" &&
                                tier.priceMonthly
                                  ? tier.priceMonthly * 12 -
                                    (tier.priceYearly ?? Math.round(tier.priceMonthly * 12 * 0.8))
                                  : null;

                              return (
                                <div
                                  key={tier.name}
                                  className={`relative flex flex-col rounded-xl border p-6 transition-all hover:border-slate-600 ${
                                    tier.popular
                                      ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/50"
                                      : "border-slate-700 bg-slate-800/50"
                                  }`}
                                >
                                  {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-medium text-white">
                                      Most Popular
                                    </span>
                                  )}

                                  <h4 className="text-base font-semibold text-white">
                                    {tier.name}
                                  </h4>

                                  <div className="mt-3 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">
                                      {displayPrice}
                                    </span>
                                    {perUnit && (
                                      <span className="text-sm text-slate-400">{perUnit}</span>
                                    )}
                                  </div>

                                  {billingPeriod === "annual" && isPaid && (
                                    <p className="mt-1 text-xs text-slate-500">billed annually</p>
                                  )}
                                  {annualSavings && annualSavings > 0 && (
                                    <p className="mt-1 text-xs font-medium text-emerald-400">
                                      Save {currencySymbol}
                                      {annualSavings}/year
                                    </p>
                                  )}

                                  <ul className="mt-5 mb-6 flex-1 space-y-2.5">
                                    {tier.features.map((f) => (
                                      <li
                                        key={f}
                                        className="flex items-start gap-2 text-sm text-slate-300"
                                      >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                                        <span>{f}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  <Link
                                    href={tier.ctaLink}
                                    className={`inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                      tier.popular
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                                        : "border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                                    }`}
                                  >
                                    {tier.cta}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-slate-950 py-16 border-t border-slate-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <CreditCard className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Secured by Stripe</h3>
              <p className="text-sm text-slate-400">
                All payments processed securely through Stripe. PCI DSS Level 1 compliant.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <RotateCcw className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">14-Day Money Back</h3>
              <p className="text-sm text-slate-400">
                Not satisfied? Get a full refund within 14 days. No questions asked.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Shield className="h-7 w-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Cancel Anytime</h3>
              <p className="text-sm text-slate-400">
                No lock-in contracts. Cancel your subscription at any time with no penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-base font-medium text-white pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need a Custom Enterprise Plan?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Get volume discounts, custom SLAs, dedicated support, SSO, and on-premise deployment options.
            Our team will create a plan tailored to your organization.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=enterprise"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
