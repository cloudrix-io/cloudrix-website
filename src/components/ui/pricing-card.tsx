"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface PricingCardProps {
  name: string;
  price: string;
  priceMonthly?: number;
  priceYearly?: number;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  billingPeriod: "monthly" | "annual";
  currency: "usd" | "eur";
  productSlug: string;
  tierName: string;
}

export function PricingCard({
  name,
  price,
  priceMonthly,
  priceYearly,
  features,
  cta,
  ctaLink,
  popular = false,
  billingPeriod,
  currency,
  productSlug,
  tierName,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const isFree = priceMonthly === 0 || price === "$0";
  const isEnterprise = price === "Custom" || !priceMonthly;
  const isPaid = !isFree && !isEnterprise;

  const currencySymbol = currency === "eur" ? "\u20AC" : "$";

  // Calculate displayed price based on billing period
  function getDisplayPrice(): string {
    if (isFree) return `${currencySymbol}0`;
    if (isEnterprise) return "Custom";

    if (billingPeriod === "annual" && priceYearly) {
      const monthlyEquivalent = Math.round(priceYearly / 12);
      return `${currencySymbol}${monthlyEquivalent}`;
    }
    return `${currencySymbol}${priceMonthly}`;
  }

  // Calculate annual savings
  function getAnnualSavings(): number | null {
    if (!isPaid || billingPeriod !== "annual" || !priceMonthly) return null;
    const fullAnnual = priceMonthly * 12;
    const discountedAnnual = priceYearly ?? Math.round(fullAnnual * 0.8);
    return fullAnnual - discountedAnnual;
  }

  async function handleCheckout() {
    if (isFree || isEnterprise) {
      window.location.href = ctaLink;
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          tierName,
          billingPeriod,
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Fallback to contact page on error
      window.location.href = `/contact?type=purchase&product=${productSlug}&tier=${tierName}`;
    } finally {
      setIsLoading(false);
    }
  }

  const displayPrice = getDisplayPrice();
  const annualSavings = getAnnualSavings();

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md",
        popular
          ? "border-blue-600 ring-2 ring-blue-600"
          : "border-slate-200"
      )}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
          Most Popular
        </span>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">
            {displayPrice}
          </span>
          {!isFree && !isEnterprise && (
            <span className="text-sm text-slate-500">/mo</span>
          )}
        </div>
        {billingPeriod === "annual" && !isFree && !isEnterprise && (
          <p className="mt-1 text-sm text-slate-500">
            billed annually
          </p>
        )}
        {annualSavings !== null && annualSavings > 0 && (
          <p className="mt-1 text-sm font-medium text-green-600">
            Save {currencySymbol}{annualSavings}/year
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center rounded-lg px-6 text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          popular
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm"
            : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500"
        )}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
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
          cta
        )}
      </button>
    </div>
  );
}
