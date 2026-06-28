"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, TrendingDown, AlertTriangle, CheckCircle, Sparkles, DollarSign } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  savingsPercent: number;
  priority: "high" | "medium" | "low";
  effort: "easy" | "moderate" | "complex";
}

interface OptimizationResult {
  estimatedSavingsPercent: number;
  estimatedSavingsAmount: number;
  recommendations: Recommendation[];
  priorityActions: string[];
  summary: string;
}

const PROVIDERS = ["AWS", "Azure", "Google Cloud", "Multi-Cloud"];
const WORKLOAD_TYPES = ["Web Applications", "Data Processing", "Machine Learning", "Microservices", "Monolith", "Mixed"];

const DEMO_RESULT: OptimizationResult = {
  estimatedSavingsPercent: 32,
  estimatedSavingsAmount: 3200,
  recommendations: [
    {
      title: "Right-size EC2 Instances",
      description: "Several instances are running at less than 20% CPU utilization. Downsizing from m5.xlarge to m5.large could save significantly.",
      savingsPercent: 15,
      priority: "high",
      effort: "easy",
    },
    {
      title: "Use Reserved Instances",
      description: "Convert on-demand instances to 1-year reserved instances for predictable workloads to save up to 40% on compute costs.",
      savingsPercent: 12,
      priority: "high",
      effort: "moderate",
    },
    {
      title: "Optimize S3 Storage Classes",
      description: "Move infrequently accessed data to S3 Intelligent-Tiering or Glacier to reduce storage costs.",
      savingsPercent: 5,
      priority: "medium",
      effort: "easy",
    },
    {
      title: "Implement Auto-Scaling",
      description: "Configure auto-scaling groups to scale down during off-peak hours, reducing overnight compute costs by up to 60%.",
      savingsPercent: 8,
      priority: "medium",
      effort: "moderate",
    },
  ],
  priorityActions: [
    "Audit all running instances for utilization metrics",
    "Purchase reserved instances for stable workloads",
    "Enable S3 Intelligent-Tiering for all buckets",
  ],
  summary:
    "Your infrastructure shows significant optimization opportunities, primarily in compute right-sizing and commitment-based pricing. By implementing these recommendations, you could reduce your monthly cloud spend by approximately 32%, saving around $3,200/month.",
};

export default function AICostOptimizerDemo() {
  const [provider, setProvider] = useState("AWS");
  const [monthlySpend, setMonthlySpend] = useState("10000");
  const [serviceCount, setServiceCount] = useState("15");
  const [workloadType, setWorkloadType] = useState("Web Applications");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/products/cost-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          monthlySpend: Number(monthlySpend),
          serviceCount: Number(serviceCount),
          workloadType,
          description,
        }),
      });

      if (response.status === 429) {
        setError("Rate limit reached. Please try again later.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.demo || data.error === "API key not configured") {
        setIsDemoMode(true);
        const demoAmount = Math.round(Number(monthlySpend) * 0.32);
        setResult({ ...DEMO_RESULT, estimatedSavingsAmount: demoAmount });
      } else if (data.recommendations) {
        setResult(data);
      } else if (data.raw) {
        setError("Could not parse AI response. Please try again.");
      } else if (data.error) {
        setError(data.error);
      }
    } catch {
      setIsDemoMode(true);
      const demoAmount = Math.round(Number(monthlySpend) * 0.32);
      setResult({ ...DEMO_RESULT, estimatedSavingsAmount: demoAmount });
    }

    setIsLoading(false);
  };

  const priorityColor = (p: string) => {
    if (p === "high") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (p === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/ai-cost-optimizer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Cost Optimizer</h1>
              <p className="text-sm text-muted-foreground">
                Describe your cloud setup, get optimization suggestions
                {isDemoMode && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <Sparkles className="h-3 w-3" /> Demo Mode
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {!result ? (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Cloud Provider
                  </label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                  >
                    {PROVIDERS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Monthly Spend ($)
                  </label>
                  <input
                    type="number"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    placeholder="10000"
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Number of Services
                  </label>
                  <input
                    type="number"
                    value={serviceCount}
                    onChange={(e) => setServiceCount(e.target.value)}
                    placeholder="15"
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Main Workload Type
                  </label>
                  <select
                    value={workloadType}
                    onChange={(e) => setWorkloadType(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                  >
                    {WORKLOAD_TYPES.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Describe Your Infrastructure
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="e.g., We run 10 EC2 instances (m5.xlarge), 3 RDS databases (PostgreSQL), S3 for static assets (~2TB), CloudFront CDN, and Lambda functions for background processing..."
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 resize-none"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={analyze}
                disabled={!description.trim() || isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-medium text-white hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4" />
                    Find Savings
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
                <TrendingDown className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <p className="text-3xl font-bold text-green-600">{result.estimatedSavingsPercent}%</p>
                <p className="text-sm text-muted-foreground">Estimated Savings</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
                <DollarSign className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <p className="text-3xl font-bold text-blue-600">
                  ${result.estimatedSavingsAmount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Savings</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-violet-500 mb-2" />
                <p className="text-3xl font-bold text-violet-600">{result.recommendations.length}</p>
                <p className="text-sm text-muted-foreground">Recommendations</p>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="font-semibold text-foreground mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
              {result.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-card-border bg-card-bg p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <div className="flex gap-2 shrink-0">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {rec.effort}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                        style={{ width: `${Math.min(rec.savingsPercent * 3, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{rec.savingsPercent}% savings</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Priority Actions */}
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Priority Actions
              </h3>
              <ol className="space-y-2">
                {result.priorityActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                      {i + 1}
                    </span>
                    {action}
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setIsDemoMode(false);
                }}
                className="rounded-lg border border-card-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Analyze Another Setup
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2.5 text-sm font-medium text-white hover:from-orange-600 hover:to-red-700 transition-all"
              >
                Get Expert Help
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
