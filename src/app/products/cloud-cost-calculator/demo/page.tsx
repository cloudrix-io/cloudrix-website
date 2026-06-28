"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Mail, X, Check } from "lucide-react";

interface ServiceConfig {
  compute: number;
  storage: number;
  database: number;
  cdn: number;
  serverless: number;
}

interface ServiceMeta {
  label: string;
  unit: string;
  max: number;
  step: number;
}

const SERVICE_META: Record<keyof ServiceConfig, ServiceMeta> = {
  compute: { label: "Compute Instances", unit: "instances", max: 50, step: 1 },
  storage: { label: "Storage", unit: "TB", max: 100, step: 1 },
  database: { label: "Database", unit: "instances", max: 10, step: 1 },
  cdn: { label: "CDN Data Transfer", unit: "TB/mo", max: 50, step: 1 },
  serverless: { label: "Serverless Requests", unit: "M/mo", max: 100, step: 1 },
};

// Realistic approximate pricing per unit/month in USD
const PRICING: Record<string, Record<keyof ServiceConfig, number>> = {
  AWS: { compute: 125, storage: 23, database: 350, cdn: 85, serverless: 0.2 },
  Azure: { compute: 120, storage: 21, database: 340, cdn: 87, serverless: 0.18 },
  GCP: { compute: 110, storage: 20, database: 330, cdn: 80, serverless: 0.16 },
};

const PROVIDER_COLORS: Record<string, string> = {
  AWS: "bg-orange-500",
  Azure: "bg-blue-500",
  GCP: "bg-green-500",
};

export default function CloudCostCalculatorDemo() {
  const [config, setConfig] = useState<ServiceConfig>({
    compute: 5,
    storage: 10,
    database: 2,
    cdn: 5,
    serverless: 10,
  });
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const costs = useMemo(() => {
    const result: Record<string, { total: number; breakdown: Record<string, number> }> = {};
    for (const [provider, prices] of Object.entries(PRICING)) {
      const breakdown: Record<string, number> = {};
      let total = 0;
      for (const [key, value] of Object.entries(config)) {
        const cost = value * prices[key as keyof ServiceConfig];
        breakdown[key] = cost;
        total += cost;
      }
      result[provider] = { total, breakdown };
    }
    return result;
  }, [config]);

  const maxCost = Math.max(...Object.values(costs).map((c) => c.total));
  const cheapest = Object.entries(costs).sort((a, b) => a[1].total - b[1].total)[0][0];

  const updateConfig = (key: keyof ServiceConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/cost-calculator"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cloud Cost Calculator</h1>
              <p className="text-sm text-muted-foreground">
                Compare AWS, Azure, and GCP costs side-by-side
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Sliders */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-foreground mb-5">Configure Services</h2>
              <div className="space-y-6">
                {(Object.entries(SERVICE_META) as [keyof ServiceConfig, ServiceMeta][]).map(
                  ([key, meta]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-foreground">{meta.label}</label>
                        <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
                          {config[key]} {meta.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={meta.max}
                        step={meta.step}
                        value={config[key]}
                        onChange={(e) => updateConfig(key, Number(e.target.value))}
                        className="w-full accent-blue-500 h-2 rounded-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{meta.max} {meta.unit}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Bar Chart */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-foreground mb-5">
                Monthly Cost Comparison
              </h2>
              <div className="space-y-4">
                {Object.entries(costs).map(([provider, { total }]) => (
                  <div key={provider}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{provider}</span>
                        {provider === cheapest && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Cheapest
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                      </span>
                    </div>
                    <div className="h-8 w-full rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${PROVIDER_COLORS[provider]} transition-all duration-500`}
                        style={{ width: `${maxCost > 0 ? (total / maxCost) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg overflow-x-auto">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Cost Breakdown
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Service</th>
                    {Object.keys(PRICING).map((p) => (
                      <th key={p} className="text-right py-2 font-medium text-muted-foreground">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(SERVICE_META) as (keyof ServiceConfig)[]).map((key) => (
                    <tr key={key} className="border-b border-card-border/50">
                      <td className="py-2.5 text-foreground">{SERVICE_META[key].label}</td>
                      {Object.entries(costs).map(([provider, { breakdown }]) => (
                        <td key={provider} className="py-2.5 text-right font-mono text-foreground">
                          ${breakdown[key].toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="py-2.5 text-foreground">Total</td>
                    {Object.entries(costs).map(([provider, { total }]) => (
                      <td
                        key={provider}
                        className={`py-2.5 text-right font-mono ${
                          provider === cheapest ? "text-green-600" : "text-foreground"
                        }`}
                      >
                        ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Email Capture */}
            {!showEmail && !emailSent && (
              <button
                onClick={() => setShowEmail(true)}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Get a detailed breakdown sent to your email
              </button>
            )}

            {showEmail && !emailSent && (
              <div className="rounded-xl border border-card-border bg-card-bg p-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (email) setEmailSent(true);
                  }}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Send
                </button>
                <button onClick={() => setShowEmail(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {emailSent && (
              <div className="rounded-xl bg-green-50 p-4 text-center text-sm text-green-700 dark:bg-green-900/20 dark:text-green-300 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Detailed breakdown sent to {email}!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
