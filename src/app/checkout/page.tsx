"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  RotateCcw,
  Shield,
  Mail,
} from "lucide-react";
import { products, type PricingTier } from "@/data/products";

const countries = [
  "United States",
  "Netherlands",
  "Germany",
  "France",
  "United Kingdom",
  "Belgium",
  "Spain",
  "Italy",
  "Sweden",
  "Norway",
  "Denmark",
  "Austria",
  "Switzerland",
  "Ireland",
  "Portugal",
  "Canada",
  "Australia",
  "Japan",
  "Other",
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const tierName = searchParams.get("tier");

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<"usd" | "eur">("usd");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const product = products.find((p) => p.slug === productSlug);
  const tier = product?.pricingTiers?.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "") === tierName?.toLowerCase().replace(/\s+/g, "")
  );

  // Format card number with spaces
  function handleCardNumberChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  }

  // Format expiry as MM/YY
  function handleExpiryChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      setCardExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setCardExpiry(digits);
    }
  }

  function handleCvcChange(value: string) {
    setCardCvc(value.replace(/\D/g, "").slice(0, 4));
  }

  const currencySymbol = currency === "eur" ? "\u20AC" : "$";
  const isFree = tier?.priceMonthly === 0 || tier?.price === "$0";
  const isEnterprise = tier?.price === "Custom" || (!tier?.priceMonthly && tier?.price !== "$0");

  function getDisplayPrice(): string {
    if (!tier) return "--";
    if (isFree) return `${currencySymbol}0`;
    if (isEnterprise) return "Custom";
    if (billingPeriod === "annual" && tier.priceYearly) {
      return `${currencySymbol}${Math.round(tier.priceYearly / 12)}`;
    }
    return `${currencySymbol}${tier.priceMonthly}`;
  }

  function getTotalPrice(): string {
    if (!tier) return "--";
    if (isFree) return `${currencySymbol}0.00`;
    if (isEnterprise) return "Custom";
    if (billingPeriod === "annual" && tier.priceYearly) {
      return `${currencySymbol}${tier.priceYearly.toFixed(2)}`;
    }
    return `${currencySymbol}${tier.priceMonthly?.toFixed(2)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    // Visual only -- no actual Stripe integration
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        "This is a demo checkout. In production, this would connect to Stripe for secure payment processing."
      );
    }, 2000);
  }

  if (!product || !tier) {
    return (
      <section className="bg-slate-950 min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-slate-400 mb-8">
            The product or pricing tier you are looking for does not exist.
          </p>
          <Link
            href="/products/pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/products/pricing"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to pricing
        </Link>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

            {/* Billing toggle */}
            {!isFree && !isEnterprise && (
              <div className="mb-8">
                <label className="text-sm font-medium text-slate-300 mb-3 block">
                  Billing Period
                </label>
                <div className="flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 p-1 w-fit">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      billingPeriod === "monthly"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("annual")}
                    className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      billingPeriod === "annual"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Annual
                    <span className="ml-1.5 text-xs text-emerald-400">-20%</span>
                  </button>
                </div>
              </div>
            )}

            {/* Payment Section */}
            {!isFree && !isEnterprise && (
              <form onSubmit={handleSubmit}>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-indigo-400" />
                    <h2 className="text-lg font-semibold text-white">Payment Details</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                          required
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                      </div>
                    </div>

                    {/* Expiry + CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => handleCvcChange(e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Name on Card */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-6">Billing Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                        required
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="Amsterdam"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          placeholder="1012 AB"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Subscribe {getDisplayPrice()}/mo
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-slate-500">
                  VAT/tax calculated at checkout. By subscribing, you agree to our{" "}
                  <Link href="/terms" className="text-indigo-400 hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </form>
            )}

            {/* Free tier CTA */}
            {isFree && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-3">Start Free</h2>
                <p className="text-slate-400 mb-6">
                  No credit card required. Get started with {product.name} instantly.
                </p>
                <Link
                  href={product.productUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700"
                >
                  Start Free Trial
                </Link>
              </div>
            )}

            {/* Enterprise CTA */}
            {isEnterprise && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-3">Enterprise Plan</h2>
                <p className="text-slate-400 mb-6">
                  Contact our sales team for a custom quote tailored to your organization.
                </p>
                <Link
                  href={`/contact?type=enterprise&product=${productSlug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700"
                >
                  Contact Sales
                </Link>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-6">
              {/* Order summary card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Product</span>
                    <span className="text-white font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Plan</span>
                    <span className="text-white font-medium">{tier.name}</span>
                  </div>
                  {!isFree && !isEnterprise && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Billing</span>
                      <span className="text-white font-medium capitalize">
                        {billingPeriod}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features included */}
                <div className="border-t border-slate-800 pt-4 mb-6">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Includes:</h3>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total */}
                <div className="border-t border-slate-800 pt-4">
                  {!isEnterprise && (
                    <>
                      <div className="flex justify-between items-baseline">
                        <span className="text-base font-medium text-white">
                          {billingPeriod === "annual" ? "Annual Total" : "Monthly Total"}
                        </span>
                        <span className="text-2xl font-bold text-white">{getTotalPrice()}</span>
                      </div>
                      {billingPeriod === "annual" && tier.priceMonthly && tier.priceMonthly > 0 && (
                        <p className="mt-1 text-right text-xs text-emerald-400">
                          Save {currencySymbol}
                          {(tier.priceMonthly * 12 - (tier.priceYearly ?? Math.round(tier.priceMonthly * 12 * 0.8))).toFixed(0)}
                          /year vs. monthly
                        </p>
                      )}
                      <p className="mt-2 text-xs text-slate-500">
                        VAT/tax calculated at checkout
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Lock className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <RotateCcw className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>14-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Shield className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Cancel anytime, no penalties</span>
                </div>
              </div>

              {/* Help */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400">
                    Need help?{" "}
                    <a
                      href="mailto:sales@cloudrix.io"
                      className="text-indigo-400 hover:underline"
                    >
                      sales@cloudrix.io
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-slate-950 min-h-screen pt-32 pb-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="h-8 w-48 mx-auto bg-slate-800 rounded animate-pulse mb-4" />
            <div className="h-4 w-64 mx-auto bg-slate-800 rounded animate-pulse" />
          </div>
        </section>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
