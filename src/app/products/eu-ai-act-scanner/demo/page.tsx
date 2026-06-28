"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Mail,
  ArrowLeft,
} from "lucide-react";

interface Requirement {
  title: string;
  description: string;
  priority: string;
}

interface ScanResult {
  riskLevel: string;
  riskColor: string;
  summary: string;
  requirements: Requirement[];
  actionItems: string[];
  timeline: {
    immediate: string;
    threeMonths: string;
    sixMonths: string;
    twelveMonths: string;
  };
  demoMode?: boolean;
}

const RISK_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
    glow: "shadow-red-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    glow: "shadow-orange-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    glow: "shadow-yellow-500/20",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
};

const PRIORITY_STYLES: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/30",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

export default function EuAiActScannerDemo() {
  const [formData, setFormData] = useState({
    systemName: "",
    description: "",
    purpose: "",
    dataTypes: "",
    decisionImpact: "",
    sector: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [expandedReqs, setExpandedReqs] = useState<Set<number>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setShowEmail(false);
    setEmailSubmitted(false);

    try {
      const res = await fetch("/api/products/eu-ai-act-scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Scan failed");
      }

      const data = await res.json();
      setResult(data);
      setShowEmail(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleReq = (i: number) => {
    setExpandedReqs((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const riskStyle = result ? RISK_STYLES[result.riskColor] || RISK_STYLES.orange : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-600/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <Link
            href="/products/eu-ai-act-scanner"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                EU AI Act Compliance Scanner
              </h1>
              <p className="text-slate-400 mt-1">
                Instant risk classification and compliance roadmap for your AI system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-slate-950 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Form */}
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    AI System Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.systemName}
                    onChange={(e) => setFormData({ ...formData, systemName: e.target.value })}
                    placeholder="e.g., ResumeRanker Pro"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    System Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what your AI system does, how it works, and what decisions it makes..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Primary Purpose *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g., Automated screening and ranking of job applicants"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Data Types Used
                    </label>
                    <input
                      type="text"
                      value={formData.dataTypes}
                      onChange={(e) => setFormData({ ...formData, dataTypes: e.target.value })}
                      placeholder="e.g., Resumes, personal data, work history"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Decision-Making Impact
                    </label>
                    <select
                      value={formData.decisionImpact}
                      onChange={(e) => setFormData({ ...formData, decisionImpact: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                    >
                      <option value="">Select impact level</option>
                      <option value="advisory">Advisory (suggests, human decides)</option>
                      <option value="semi-automated">Semi-automated (filters, human reviews)</option>
                      <option value="fully-automated">Fully automated (no human in loop)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Sector / Industry
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  >
                    <option value="">Select sector</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="education">Education</option>
                    <option value="employment">Employment & HR</option>
                    <option value="law-enforcement">Law Enforcement</option>
                    <option value="critical-infrastructure">Critical Infrastructure</option>
                    <option value="public-services">Public Services</option>
                    <option value="transportation">Transportation</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="marketing">Marketing & Advertising</option>
                    <option value="other">Other</option>
                  </select>
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
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Scanning for Compliance...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    Scan for Compliance
                  </>
                )}
              </button>
            </form>
          )}

          {/* Results */}
          {result && riskStyle && (
            <div className="space-y-6">
              {result.demoMode && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-400 text-sm">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Demo Mode: Showing sample results. Live AI analysis coming soon.
                </div>
              )}

              {/* Risk Level Card */}
              <div
                className={`rounded-2xl border ${riskStyle.border} ${riskStyle.bg} p-6 sm:p-8 shadow-xl ${riskStyle.glow}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Risk Classification
                    </p>
                    <p className={`text-3xl sm:text-4xl font-bold ${riskStyle.text}`}>
                      {result.riskLevel}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border ${riskStyle.border} ${riskStyle.bg} px-4 py-2 ${riskStyle.text} font-semibold`}
                  >
                    <ShieldCheck className="h-5 w-5" />
                    EU AI Act Assessment
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{result.summary}</p>
              </div>

              {/* Email gate */}
              {showEmail && !emailSubmitted && (
                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/30 shrink-0">
                      <Mail className="h-6 w-6 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Get Your Detailed PDF Report
                      </h3>
                      <p className="text-slate-400 text-sm mb-4">
                        Enter your email to unlock the full compliance report with detailed requirements, timeline, and action plan.
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                        />
                        <button
                          onClick={() => setEmailSubmitted(true)}
                          disabled={!email.includes("@")}
                          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-50"
                        >
                          Send Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {emailSubmitted && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-400 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  Report will be sent to {email}. Check your inbox shortly.
                </div>
              )}

              {/* Requirements */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-violet-400" />
                  Compliance Requirements ({result.requirements.length})
                </h3>
                <div className="space-y-3">
                  {result.requirements.map((req, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleReq(i)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_STYLES[req.priority] || PRIORITY_STYLES.Medium}`}
                          >
                            {req.priority}
                          </span>
                          <span className="text-white font-medium">{req.title}</span>
                        </div>
                        {expandedReqs.has(i) ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                      {expandedReqs.has(i) && (
                        <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                          {req.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  Action Items
                </h3>
                <div className="space-y-3">
                  {result.actionItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-violet-400 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Compliance Timeline
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Immediate", value: result.timeline.immediate, color: "from-red-600 to-orange-600" },
                    { label: "3 Months", value: result.timeline.threeMonths, color: "from-orange-600 to-amber-600" },
                    { label: "6 Months", value: result.timeline.sixMonths, color: "from-amber-600 to-yellow-600" },
                    { label: "12 Months", value: result.timeline.twelveMonths, color: "from-emerald-600 to-teal-600" },
                  ].map((phase) => (
                    <div
                      key={phase.label}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${phase.color}`} />
                        <span className="text-sm font-semibold text-white">{phase.label}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{phase.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Need Help With Compliance?
                </h3>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  Our team of AI governance experts can guide you through the full compliance process, from gap analysis to certification.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110 transition-all"
                  >
                    Book a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setResult(null);
                      setShowEmail(false);
                      setEmailSubmitted(false);
                      setExpandedReqs(new Set());
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-900 transition-all"
                  >
                    Scan Another System
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
