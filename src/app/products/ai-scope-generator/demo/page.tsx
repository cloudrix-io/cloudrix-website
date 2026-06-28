"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Users,
  Layers,
  Zap,
  Shield,
  ArrowLeft,
} from "lucide-react";

interface TechItem {
  technology: string;
  reason: string;
}

interface Phase {
  name: string;
  duration: string;
  features: string[];
}

interface Risk {
  risk: string;
  mitigation: string;
}

interface TeamMember {
  role: string;
  count: number;
  allocation: string;
}

interface ScopeResult {
  projectSummary: string;
  techStack: TechItem[];
  phases: Phase[];
  timeline: {
    total: string;
    mvpLaunch: string;
    fullLaunch: string;
  };
  costEstimate: {
    low: string;
    mid: string;
    high: string;
    notes: string;
  };
  riskFactors: Risk[];
  teamComposition: TeamMember[];
  demoMode?: boolean;
}

export default function AiScopeGeneratorDemo() {
  const [formData, setFormData] = useState({
    projectDescription: "",
    budgetRange: "",
    timeline: "",
    teamSize: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScopeResult | null>(null);
  const [error, setError] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([0]));
  const [expandedRisks, setExpandedRisks] = useState<Set<number>>(new Set());

  const togglePhase = (i: number) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleRisk = (i: number) => {
    setExpandedRisks((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/products/ai-scope-generator", {
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

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-teal-600/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/products/ai-scope-generator"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                AI Project Scope Generator
              </h1>
              <p className="text-slate-400 mt-1">
                Turn a project idea into a detailed scope with tech stack, timeline, and cost estimates
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
                    Describe Your Project *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.projectDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, projectDescription: e.target.value })
                    }
                    placeholder="e.g., I need a marketplace app like Etsy for vintage furniture. Users should be able to list items, browse by category, make payments, and leave reviews..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    >
                      <option value="">Not sure yet</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-250k">$100,000 - $250,000</option>
                      <option value="250k-plus">$250,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Timeline Preference
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    >
                      <option value="">Flexible</option>
                      <option value="asap">ASAP (1-3 months)</option>
                      <option value="standard">Standard (3-6 months)</option>
                      <option value="relaxed">Relaxed (6-12 months)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    >
                      <option value="">Let AI decide</option>
                      <option value="solo">Solo developer</option>
                      <option value="small">Small (2-4 people)</option>
                      <option value="medium">Medium (5-10 people)</option>
                      <option value="large">Large (10+ people)</option>
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
                disabled={loading || !formData.projectDescription.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Scope...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    Generate Scope
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

              {/* Summary */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-400" />
                  Project Summary
                </h3>
                <p className="text-slate-300 leading-relaxed">{result.projectSummary}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                  <Clock className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{result.timeline.total}</p>
                  <p className="text-xs text-slate-400">Total Timeline</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                  <Zap className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{result.timeline.mvpLaunch}</p>
                  <p className="text-xs text-slate-400">MVP Launch</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                  <DollarSign className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{result.costEstimate.mid}</p>
                  <p className="text-xs text-slate-400">Est. Cost (Mid)</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                  <Users className="h-5 w-5 text-violet-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{result.teamComposition.length}</p>
                  <p className="text-xs text-slate-400">Team Roles</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Recommended Tech Stack
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.techStack.map((tech, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                    >
                      <p className="font-semibold text-white mb-1">{tech.technology}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{tech.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phases */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-violet-400" />
                  Phase Breakdown
                </h3>
                <div className="space-y-3">
                  {result.phases.map((phase, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 overflow-hidden"
                    >
                      <button
                        onClick={() => togglePhase(i)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-sm font-bold">
                            {i + 1}
                          </span>
                          <div className="text-left">
                            <span className="font-semibold text-white">{phase.name}</span>
                            <span className="text-sm text-slate-400 ml-2">({phase.duration})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 hidden sm:inline">
                            {phase.features.length} features
                          </span>
                          {expandedPhases.has(i) ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </button>
                      {expandedPhases.has(i) && (
                        <div className="px-4 pb-4 border-t border-slate-800 pt-3">
                          <ul className="space-y-2">
                            {phase.features.map((feature, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  Cost Estimate
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Low", value: result.costEstimate.low, color: "text-emerald-400" },
                    { label: "Mid", value: result.costEstimate.mid, color: "text-blue-400" },
                    { label: "High", value: result.costEstimate.high, color: "text-violet-400" },
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center"
                    >
                      <p className="text-sm text-slate-400 mb-1">{tier.label}</p>
                      <p className={`text-xl sm:text-2xl font-bold ${tier.color}`}>{tier.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{result.costEstimate.notes}</p>
              </div>

              {/* Risk Factors */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Risk Factors & Mitigations
                </h3>
                <div className="space-y-3">
                  {result.riskFactors.map((risk, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-800/30 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleRisk(i)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                          <span className="text-white font-medium text-left">{risk.risk}</span>
                        </div>
                        {expandedRisks.has(i) ? (
                          <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {expandedRisks.has(i) && (
                        <div className="px-4 pb-4 border-t border-slate-800 pt-3">
                          <p className="text-sm text-emerald-400 font-medium mb-1">Mitigation:</p>
                          <p className="text-sm text-slate-400 leading-relaxed">{risk.mitigation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Composition */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-violet-400" />
                  Team Composition
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.teamComposition.map((member, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/30 p-4"
                    >
                      <div>
                        <p className="font-medium text-white">{member.role}</p>
                        <p className="text-sm text-slate-400">
                          {member.count} person{member.count > 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="text-sm font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                        {member.allocation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 p-6 sm:p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Want a Detailed Proposal?
                </h3>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  This AI-generated scope is a starting point. Our team can refine it into a detailed, actionable proposal tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 transition-all"
                  >
                    Book a Free Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setResult(null);
                      setExpandedPhases(new Set([0]));
                      setExpandedRisks(new Set());
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-900 transition-all"
                  >
                    Generate Another Scope
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
