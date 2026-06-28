"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Network,
  ArrowRight,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Shield,
  ArrowLeft,
  Scaling,
  Server,
  Database,
  Globe,
  Link2,
  Wrench,
} from "lucide-react";

interface Component {
  name: string;
  service: string;
  purpose: string;
  tier: string;
}

interface CostBreakdown {
  service: string;
  cost: string;
}

interface ArchResult {
  architectureDescription: string;
  components: Component[];
  estimatedMonthlyCost: {
    low: string;
    mid: string;
    high: string;
    breakdown: CostBreakdown[];
    notes: string;
  };
  scalingStrategy: {
    horizontal: string;
    vertical: string;
    database: string;
    caching: string;
  };
  securityConsiderations: string[];
  demoMode?: boolean;
}

const TIER_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  Networking: {
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  Application: {
    icon: Server,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  Data: {
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  Integration: {
    icon: Link2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  Operations: {
    icon: Wrench,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
};

const CLOUD_PROVIDERS = [
  { value: "AWS", label: "Amazon Web Services (AWS)" },
  { value: "GCP", label: "Google Cloud Platform (GCP)" },
  { value: "Azure", label: "Microsoft Azure" },
  { value: "Any", label: "Any / Best Fit" },
];

const SCALES = [
  { value: "Startup", label: "Startup (0-10K users)" },
  { value: "Growth", label: "Growth (10K-100K users)" },
  { value: "Enterprise", label: "Enterprise (100K+ users)" },
];

export default function AiArchitectureGeneratorDemo() {
  const [formData, setFormData] = useState({
    requirements: "",
    cloudProvider: "AWS",
    scale: "Startup",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArchResult | null>(null);
  const [error, setError] = useState("");
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [expandedScaling, setExpandedScaling] = useState<Set<string>>(new Set());

  const toggleScaling = (key: string) => {
    setExpandedScaling((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/products/ai-architecture-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Group components by tier
  const groupedComponents = result
    ? result.components.reduce(
        (acc, comp) => {
          const tier = comp.tier || "Other";
          if (!acc[tier]) acc[tier] = [];
          acc[tier].push(comp);
          return acc;
        },
        {} as Record<string, Component[]>
      )
    : {};

  const tierOrder = ["Networking", "Application", "Data", "Integration", "Operations"];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-600/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/products/ai-architecture-generator"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-rose-600 shadow-lg shadow-orange-500/20">
              <Network className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                AI Architecture Generator
              </h1>
              <p className="text-slate-400 mt-1">
                Generate cloud architecture recommendations with cost estimates and scaling strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-slate-950 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    System Requirements *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    placeholder="e.g., E-commerce platform with real-time inventory, user accounts, payment processing, product search, order tracking, and admin dashboard. Expected to handle 50K concurrent users at peak..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cloud Provider
                    </label>
                    <select
                      value={formData.cloudProvider}
                      onChange={(e) =>
                        setFormData({ ...formData, cloudProvider: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                    >
                      {CLOUD_PROVIDERS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Scale
                    </label>
                    <select
                      value={formData.scale}
                      onChange={(e) =>
                        setFormData({ ...formData, scale: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                    >
                      {SCALES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.requirements.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Architecture...
                  </>
                ) : (
                  <>
                    <Network className="h-5 w-5" />
                    Generate Architecture
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {result.demoMode && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-400 text-sm">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Demo Mode: Showing sample results. Live AI analysis coming soon.
                </div>
              )}

              {/* Architecture Overview */}
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Network className="h-5 w-5 text-orange-400" />
                  Architecture Overview
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {result.architectureDescription}
                </p>
              </div>

              {/* Architecture Diagram (CSS-based) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Server className="h-5 w-5 text-violet-400" />
                  Architecture Components
                </h3>

                <div className="space-y-8">
                  {tierOrder
                    .filter((tier) => groupedComponents[tier])
                    .map((tier, tierIdx) => {
                      const config = TIER_CONFIG[tier] || TIER_CONFIG.Operations;
                      const TierIcon = config.icon;
                      const components = groupedComponents[tier];

                      return (
                        <div key={tier}>
                          {/* Tier header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg} border ${config.border}`}
                            >
                              <TierIcon className={`h-4 w-4 ${config.color}`} />
                            </div>
                            <h4 className={`text-sm font-semibold uppercase tracking-wider ${config.color}`}>
                              {tier} Layer
                            </h4>
                            <div className="flex-1 h-px bg-slate-800" />
                          </div>

                          {/* Components in this tier */}
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {components.map((comp, i) => (
                              <div
                                key={i}
                                className={`rounded-xl border ${config.border} ${config.bg} p-4 transition-all hover:brightness-110`}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800/50 ${config.color} text-xs font-bold`}
                                  >
                                    {comp.name
                                      .split(" ")
                                      .map((w) => w[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-semibold text-white text-sm truncate">
                                      {comp.name}
                                    </p>
                                    <p className={`text-xs ${config.color} font-mono mb-1.5`}>
                                      {comp.service}
                                    </p>
                                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                      {comp.purpose}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Connection arrows between tiers */}
                          {tierIdx < tierOrder.filter((t) => groupedComponents[t]).length - 1 && (
                            <div className="flex justify-center my-3">
                              <div className="flex flex-col items-center">
                                <div className="w-px h-4 bg-slate-700" />
                                <ChevronDown className="h-4 w-4 text-slate-600" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  Estimated Monthly Cost
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Low Traffic", value: result.estimatedMonthlyCost.low, color: "text-emerald-400" },
                    { label: "Medium Traffic", value: result.estimatedMonthlyCost.mid, color: "text-blue-400" },
                    { label: "High Traffic", value: result.estimatedMonthlyCost.high, color: "text-violet-400" },
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center"
                    >
                      <p className="text-xs text-slate-400 mb-1">{tier.label}</p>
                      <p className={`text-xl sm:text-2xl font-bold ${tier.color}`}>
                        {tier.value}
                      </p>
                      <p className="text-xs text-slate-500">/ month</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/30 p-3 hover:bg-slate-800/50 transition-colors text-sm"
                >
                  <span className="text-slate-300 font-medium">
                    Cost Breakdown by Service
                  </span>
                  {showCostBreakdown ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                {showCostBreakdown && (
                  <div className="mt-3 space-y-2">
                    {result.estimatedMonthlyCost.breakdown.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-slate-800/30 px-4 py-2.5"
                      >
                        <span className="text-sm text-slate-300">{item.service}</span>
                        <span className="text-sm font-mono text-slate-400">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  {result.estimatedMonthlyCost.notes}
                </p>
              </div>

              {/* Scaling Strategy */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Scaling className="h-5 w-5 text-blue-400" />
                  Scaling Strategy
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "horizontal", label: "Horizontal Scaling", value: result.scalingStrategy.horizontal },
                    { key: "vertical", label: "Vertical Scaling", value: result.scalingStrategy.vertical },
                    { key: "database", label: "Database Scaling", value: result.scalingStrategy.database },
                    { key: "caching", label: "Caching Strategy", value: result.scalingStrategy.caching },
                  ].map(({ key, label, value }) => (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleScaling(key)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="text-white font-medium">{label}</span>
                        {expandedScaling.has(key) ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                      {expandedScaling.has(key) && (
                        <div className="px-4 pb-4 border-t border-slate-800 pt-3">
                          <p className="text-sm text-slate-400 leading-relaxed">{value}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  Security Considerations
                </h3>
                <div className="space-y-2">
                  {result.securityConsiderations.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                    >
                      <Shield className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-600/10 to-rose-600/10 p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Need This Implemented?
                </h3>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  Our cloud architects can take this recommendation and build it into a production-ready infrastructure for your team.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110 transition-all"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setResult(null);
                      setShowCostBreakdown(false);
                      setExpandedScaling(new Set());
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-900 transition-all"
                  >
                    Generate Another Architecture
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
