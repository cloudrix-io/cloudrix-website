"use client";

import { cn } from "@/lib/utils";

interface BillingToggleProps {
  billingPeriod: "monthly" | "annual";
  onBillingPeriodChange: (period: "monthly" | "annual") => void;
  currency: "usd" | "eur";
  onCurrencyChange: (currency: "usd" | "eur") => void;
}

export function BillingToggle({
  billingPeriod,
  onBillingPeriodChange,
  currency,
  onCurrencyChange,
}: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      {/* Billing period toggle */}
      <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
        <button
          onClick={() => onBillingPeriodChange("monthly")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            billingPeriod === "monthly"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => onBillingPeriodChange("annual")}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            billingPeriod === "annual"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          Annual
          <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            Save 20%
          </span>
        </button>
      </div>

      {/* Currency toggle */}
      <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
        <button
          onClick={() => onCurrencyChange("usd")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            currency === "usd"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          USD ($)
        </button>
        <button
          onClick={() => onCurrencyChange("eur")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            currency === "eur"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          EUR
        </button>
      </div>
    </div>
  );
}
