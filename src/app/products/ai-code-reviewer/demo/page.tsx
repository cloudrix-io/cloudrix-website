"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  ArrowRight,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Shield,
  Zap,
  Layers,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";

interface Issue {
  severity: string;
  title: string;
  line: string;
  description: string;
  suggestion: string;
}

interface ReviewResult {
  overallScore: number;
  summary: string;
  issues: Issue[];
  fixedCode: string;
  categories: {
    security: number;
    performance: number;
    architecture: number;
    codeQuality: number;
  };
  demoMode?: boolean;
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Java",
  "PHP",
  "Rust",
];

const SEVERITY_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  Critical: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  Warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  Info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  Good: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
};

function ScoreRing({ score, label, size = "lg" }: { score: number; label: string; size?: "lg" | "sm" }) {
  const radius = size === "lg" ? 50 : 28;
  const stroke = size === "lg" ? 8 : 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "text-emerald-400"
      : score >= 60
        ? "text-amber-400"
        : "text-red-400";
  const strokeColor =
    score >= 80
      ? "stroke-emerald-400"
      : score >= 60
        ? "stroke-amber-400"
        : "stroke-red-400";
  const dim = (radius + stroke) * 2;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            className="text-slate-800"
          />
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${strokeColor} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${size === "lg" ? "text-2xl" : "text-sm"} font-bold ${color}`}>
            {score}
          </span>
        </div>
      </div>
      <span className={`${size === "lg" ? "text-sm" : "text-xs"} text-slate-400 font-medium`}>
        {label}
      </span>
    </div>
  );
}

export default function AiCodeReviewerDemo() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState("");
  const [showFixed, setShowFixed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setShowFixed(false);

    try {
      const res = await fetch("/api/products/ai-code-reviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Review failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyFixed = () => {
    if (result?.fixedCode) {
      navigator.clipboard.writeText(result.fixedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-600/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/products/ai-code-reviewer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/20">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                AI Code Reviewer
              </h1>
              <p className="text-slate-400 mt-1">
                Security, performance, and architecture analysis powered by AI
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
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-300">
                    Paste Your Code *
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  required
                  rows={16}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your ${language} code here...\n// Maximum 10,000 characters for the free tool`}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 font-mono text-sm text-emerald-300 placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none leading-relaxed"
                  spellCheck={false}
                />
                <p className="text-xs text-slate-500 text-right">
                  {code.length.toLocaleString()} / 10,000 characters
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Reviewing Code...
                  </>
                ) : (
                  <>
                    <Code2 className="h-5 w-5" />
                    Review My Code
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

              {/* Score Overview */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <ScoreRing score={result.overallScore} label="Overall Score" size="lg" />
                  <div className="flex-1">
                    <p className="text-slate-300 leading-relaxed mb-4">{result.summary}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <ScoreRing score={result.categories.security} label="Security" size="sm" />
                      <ScoreRing score={result.categories.performance} label="Performance" size="sm" />
                      <ScoreRing score={result.categories.architecture} label="Architecture" size="sm" />
                      <ScoreRing score={result.categories.codeQuality} label="Quality" size="sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue counts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Critical", "Warning", "Info", "Good"] as const).map((sev) => {
                  const config = SEVERITY_CONFIG[sev];
                  const Icon = config.icon;
                  const count = result.issues.filter((i) => i.severity === sev).length;
                  return (
                    <div
                      key={sev}
                      className={`rounded-xl border ${config.border} ${config.bg} p-4 flex items-center gap-3`}
                    >
                      <Icon className={`h-5 w-5 ${config.color}`} />
                      <div>
                        <p className={`text-lg font-bold ${config.color}`}>{count}</p>
                        <p className="text-xs text-slate-400">{sev}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Issues */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5">
                  Issues Found ({result.issues.length})
                </h3>
                <div className="space-y-3">
                  {result.issues.map((issue, i) => {
                    const config = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.Info;
                    const Icon = config.icon;
                    return (
                      <div
                        key={i}
                        className={`rounded-xl border ${config.border} ${config.bg} p-4`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`h-5 w-5 ${config.color} mt-0.5 shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-semibold text-white">{issue.title}</span>
                              {issue.line && (
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                  Line {issue.line}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                              {issue.description}
                            </p>
                            {issue.suggestion && (
                              <p className="text-sm text-slate-300 mt-2 pl-3 border-l-2 border-slate-700">
                                {issue.suggestion}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fixed Code */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <button
                  onClick={() => setShowFixed(!showFixed)}
                  className="w-full flex items-center justify-between p-6 hover:bg-slate-900/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <span className="text-lg font-semibold text-white">
                      Fixed Code
                    </span>
                  </div>
                  <span className="text-sm text-slate-400">
                    {showFixed ? "Hide" : "Show"} corrected version
                  </span>
                </button>
                {showFixed && (
                  <div className="border-t border-slate-800">
                    <div className="flex items-center justify-end px-4 py-2 bg-slate-800/50">
                      <button
                        onClick={copyFixed}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
                      {result.fixedCode}
                    </pre>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Want a Full Codebase Audit?
                </h3>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  Our senior engineers can review your entire codebase for security vulnerabilities, performance bottlenecks, and architectural improvements.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setResult(null);
                      setShowFixed(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-900 transition-all"
                  >
                    Review More Code
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
