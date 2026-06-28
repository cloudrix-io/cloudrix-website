"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Server, Database, Shield, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface FormData {
  servers: number;
  databases: number;
  customApps: number;
  compliance: string;
  downtimeTolerance: string;
}

interface MigrationResult {
  complexityScore: number;
  complexityLabel: string;
  estimatedWeeks: number;
  estimatedCostMin: number;
  estimatedCostMax: number;
  phases: { name: string; weeks: number; description: string }[];
  riskFactors: { risk: string; severity: "high" | "medium" | "low"; mitigation: string }[];
}

const COMPLIANCE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "gdpr", label: "GDPR" },
  { value: "hipaa", label: "HIPAA" },
  { value: "pci", label: "PCI-DSS" },
  { value: "soc2", label: "SOC 2" },
  { value: "multiple", label: "Multiple frameworks" },
];

const DOWNTIME_OPTIONS = [
  { value: "zero", label: "Zero downtime (24/7 operations)" },
  { value: "minimal", label: "< 1 hour maintenance window" },
  { value: "moderate", label: "4-8 hour maintenance window" },
  { value: "flexible", label: "Weekend migration OK" },
];

function calculateMigration(data: FormData): MigrationResult {
  let score = 0;

  // Servers complexity
  score += Math.min(data.servers * 2, 30);

  // Database complexity (higher weight)
  score += Math.min(data.databases * 5, 25);

  // Custom apps complexity (highest weight)
  score += Math.min(data.customApps * 4, 20);

  // Compliance adds complexity
  const complianceScores: Record<string, number> = {
    none: 0,
    gdpr: 5,
    hipaa: 10,
    pci: 8,
    soc2: 7,
    multiple: 15,
  };
  score += complianceScores[data.compliance] || 0;

  // Downtime tolerance
  const downtimeScores: Record<string, number> = {
    zero: 15,
    minimal: 10,
    moderate: 5,
    flexible: 0,
  };
  score += downtimeScores[data.downtimeTolerance] || 0;

  // Normalize to 0-100
  score = Math.min(score, 100);

  let complexityLabel: string;
  if (score <= 25) complexityLabel = "Low";
  else if (score <= 50) complexityLabel = "Medium";
  else if (score <= 75) complexityLabel = "High";
  else complexityLabel = "Very High";

  // Estimate timeline
  const baseWeeks = 2 + Math.ceil(score / 10);
  const estimatedWeeks = Math.max(baseWeeks, 3);

  // Cost estimation
  const baseCost = 5000;
  const perServerCost = 1500;
  const perDbCost = 3000;
  const perAppCost = 5000;
  const complianceCost = complianceScores[data.compliance] * 1000;
  const downtimeCost = downtimeScores[data.downtimeTolerance] * 500;

  const estimatedCostMin =
    baseCost +
    data.servers * perServerCost +
    data.databases * perDbCost +
    data.customApps * perAppCost +
    complianceCost +
    downtimeCost;
  const estimatedCostMax = Math.round(estimatedCostMin * 1.5);

  // Phases
  const phases = [
    {
      name: "Discovery & Assessment",
      weeks: Math.max(1, Math.ceil(estimatedWeeks * 0.15)),
      description:
        "Inventory existing infrastructure, identify dependencies, assess application compatibility, and define success criteria.",
    },
    {
      name: "Architecture & Planning",
      weeks: Math.max(1, Math.ceil(estimatedWeeks * 0.2)),
      description:
        "Design target cloud architecture, create migration runbook, set up networking, and configure security controls.",
    },
    {
      name: "Pilot Migration",
      weeks: Math.max(1, Math.ceil(estimatedWeeks * 0.15)),
      description:
        "Migrate a non-critical workload to validate the approach, test rollback procedures, and refine the migration playbook.",
    },
    {
      name: "Full Migration",
      weeks: Math.max(1, Math.ceil(estimatedWeeks * 0.35)),
      description: `Migrate remaining ${data.servers} servers, ${data.databases} databases, and ${data.customApps} custom applications in planned waves.`,
    },
    {
      name: "Optimization & Handover",
      weeks: Math.max(1, Math.ceil(estimatedWeeks * 0.15)),
      description:
        "Performance tuning, cost optimization, documentation, team training, and decommission of legacy systems.",
    },
  ];

  // Risk factors
  const riskFactors: MigrationResult["riskFactors"] = [];

  if (data.customApps > 3) {
    riskFactors.push({
      risk: "High number of custom applications",
      severity: "high",
      mitigation: "Prioritize by business criticality and migrate in phases with thorough testing",
    });
  }
  if (data.downtimeTolerance === "zero") {
    riskFactors.push({
      risk: "Zero-downtime requirement",
      severity: "high",
      mitigation: "Implement blue-green deployment with real-time data replication and automated failover",
    });
  }
  if (data.databases > 2) {
    riskFactors.push({
      risk: "Multiple database migrations",
      severity: "medium",
      mitigation: "Use database migration services (DMS) with continuous replication and validation",
    });
  }
  if (data.compliance === "hipaa" || data.compliance === "multiple") {
    riskFactors.push({
      risk: "Strict compliance requirements",
      severity: "high",
      mitigation: "Engage compliance team early, use pre-certified cloud configurations, maintain audit trail",
    });
  }
  if (data.servers > 10) {
    riskFactors.push({
      risk: "Large server fleet",
      severity: "medium",
      mitigation: "Automate server migration with Infrastructure as Code and parallel migration waves",
    });
  }
  if (riskFactors.length === 0) {
    riskFactors.push({
      risk: "Standard migration complexity",
      severity: "low",
      mitigation: "Follow standard migration playbook with staged rollout",
    });
  }

  return {
    complexityScore: score,
    complexityLabel,
    estimatedWeeks,
    estimatedCostMin,
    estimatedCostMax,
    phases,
    riskFactors,
  };
}

export default function MigrationCalculatorDemo() {
  const [form, setForm] = useState<FormData>({
    servers: 5,
    databases: 2,
    customApps: 3,
    compliance: "gdpr",
    downtimeTolerance: "minimal",
  });
  const [showResults, setShowResults] = useState(false);

  const result = useMemo(
    () => (showResults ? calculateMigration(form) : null),
    [showResults, form]
  );

  const severityColor = (s: string) => {
    if (s === "high") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (s === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  };

  const complexityColor = (label: string) => {
    if (label === "Low") return "text-green-500";
    if (label === "Medium") return "text-amber-500";
    if (label === "High") return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/cloud-migration-planner"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Server className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Migration Complexity Calculator</h1>
              <p className="text-sm text-muted-foreground">Estimate your cloud migration scope and timeline</p>
            </div>
          </div>
        </div>

        {!showResults ? (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg space-y-6">
              {/* Number inputs */}
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <Server className="inline h-4 w-4 mr-1" />
                    Servers
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={form.servers}
                    onChange={(e) => setForm({ ...form, servers: Number(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <Database className="inline h-4 w-4 mr-1" />
                    Databases
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={form.databases}
                    onChange={(e) => setForm({ ...form, databases: Number(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Custom Apps
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={form.customApps}
                    onChange={(e) => setForm({ ...form, customApps: Number(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>
              </div>

              {/* Compliance */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  <Shield className="inline h-4 w-4 mr-1" />
                  Compliance Requirements
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {COMPLIANCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, compliance: opt.value })}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        form.compliance === opt.value
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                          : "border-card-border text-muted-foreground hover:border-indigo-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Downtime */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Downtime Tolerance
                </label>
                <div className="space-y-2">
                  {DOWNTIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, downtimeTolerance: opt.value })}
                      className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                        form.downtimeTolerance === opt.value
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                          : "border-card-border text-muted-foreground hover:border-indigo-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowResults(true)}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-medium text-white hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                Calculate Migration Complexity
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Complexity</p>
                <p className={`text-2xl font-bold ${complexityColor(result.complexityLabel)}`}>
                  {result.complexityLabel}
                </p>
                <p className="text-xs text-muted-foreground">{result.complexityScore}/100</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                <p className="text-2xl font-bold text-foreground">{result.estimatedWeeks} weeks</p>
                <p className="text-xs text-muted-foreground">estimated</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center sm:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Estimated Cost Range</p>
                <p className="text-2xl font-bold text-foreground">
                  ${result.estimatedCostMin.toLocaleString()} - ${result.estimatedCostMax.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">EUR equivalent available on request</p>
              </div>
            </div>

            {/* Phased Plan */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-5">Phased Migration Plan</h3>
              <div className="space-y-0">
                {result.phases.map((phase, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {i + 1}
                      </div>
                      {i < result.phases.length - 1 && (
                        <div className="w-0.5 flex-1 bg-indigo-200 dark:bg-indigo-800" />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{phase.name}</h4>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          {phase.weeks} week{phase.weeks > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Timeline Overview</h3>
              <div className="flex rounded-lg overflow-hidden h-8">
                {result.phases.map((phase, i) => {
                  const colors = [
                    "bg-indigo-300 dark:bg-indigo-700",
                    "bg-blue-300 dark:bg-blue-700",
                    "bg-cyan-300 dark:bg-cyan-700",
                    "bg-violet-300 dark:bg-violet-700",
                    "bg-purple-300 dark:bg-purple-700",
                  ];
                  const pct = (phase.weeks / result.estimatedWeeks) * 100;
                  return (
                    <div
                      key={i}
                      className={`${colors[i]} flex items-center justify-center text-xs font-medium text-white`}
                      style={{ width: `${pct}%` }}
                      title={`${phase.name}: ${phase.weeks}w`}
                    >
                      {pct > 15 ? `${phase.weeks}w` : ""}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {result.phases.map((phase, i) => {
                  const dotColors = [
                    "bg-indigo-400",
                    "bg-blue-400",
                    "bg-cyan-400",
                    "bg-violet-400",
                    "bg-purple-400",
                  ];
                  return (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className={`h-2.5 w-2.5 rounded-full ${dotColors[i]}`} />
                      {phase.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Risk Factors
              </h3>
              <div className="space-y-3">
                {result.riskFactors.map((rf, i) => (
                  <div key={i} className="rounded-lg border border-card-border p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${severityColor(rf.severity)}`}>
                        {rf.severity}
                      </span>
                      <h4 className="text-sm font-medium text-foreground">{rf.risk}</h4>
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{rf.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowResults(false)}
                className="rounded-lg border border-card-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Recalculate
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                Get a detailed migration assessment
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
