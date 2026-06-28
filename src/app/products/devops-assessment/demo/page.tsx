"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";

interface Question {
  category: string;
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    category: "CI/CD",
    question: "How do you deploy to production?",
    options: [
      "Manually via SSH / FTP",
      "Semi-automated scripts",
      "CI/CD pipeline with manual approval",
      "Fully automated with canary/blue-green deployments",
    ],
  },
  {
    category: "CI/CD",
    question: "How often do you deploy?",
    options: [
      "Monthly or less",
      "Every 1-2 weeks",
      "Multiple times per week",
      "Multiple times per day",
    ],
  },
  {
    category: "Monitoring",
    question: "How do you find out about production issues?",
    options: [
      "Users report them",
      "Basic uptime checks / ping",
      "APM and log aggregation (Datadog, New Relic)",
      "Full observability stack with traces, metrics, logs, and alerts",
    ],
  },
  {
    category: "Monitoring",
    question: "What is your mean time to recovery (MTTR)?",
    options: [
      "Hours to days",
      "1-4 hours",
      "15-60 minutes",
      "< 15 minutes with automated rollback",
    ],
  },
  {
    category: "Infrastructure as Code",
    question: "How do you manage infrastructure?",
    options: [
      "Manually through cloud console (ClickOps)",
      "Some scripts (bash, CLI)",
      "Terraform / Pulumi / CloudFormation for most resources",
      "100% IaC, GitOps, policy-as-code (OPA/Sentinel)",
    ],
  },
  {
    category: "Infrastructure as Code",
    question: "How do you manage configuration and secrets?",
    options: [
      "Hardcoded or in .env files",
      "Environment variables on servers",
      "Centralized config (AWS SSM, Vault) for most services",
      "Full secrets management with rotation and audit trails",
    ],
  },
  {
    category: "Security",
    question: "When does security testing happen?",
    options: [
      "Rarely or never",
      "Annual penetration tests",
      "SAST/DAST in CI pipeline",
      "Shift-left security with automated scanning, dependency audits, and security gates",
    ],
  },
  {
    category: "Security",
    question: "How do you manage access control?",
    options: [
      "Shared credentials / root access",
      "Individual accounts, basic roles",
      "RBAC with least-privilege, SSO",
      "Zero-trust, JIT access, full audit logging",
    ],
  },
  {
    category: "Testing",
    question: "What is your test coverage like?",
    options: [
      "Little to no automated tests",
      "Some unit tests (< 30% coverage)",
      "Unit + integration tests (50-80% coverage)",
      "Comprehensive: unit, integration, E2E, contract tests (> 80%)",
    ],
  },
  {
    category: "Testing",
    question: "How do you test in pre-production?",
    options: [
      "Test directly on production",
      "Single staging environment",
      "Staging + preview environments per PR",
      "Ephemeral environments, feature flags, and progressive rollouts",
    ],
  },
];

const CATEGORIES = ["CI/CD", "Monitoring", "Infrastructure as Code", "Security", "Testing"];

const MATURITY_LEVELS = [
  { label: "Beginner", range: [10, 17], color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", border: "border-red-200 dark:border-red-800" },
  { label: "Developing", range: [18, 25], color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", border: "border-amber-200 dark:border-amber-800" },
  { label: "Mature", range: [26, 33], color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800" },
  { label: "Elite", range: [34, 40], color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-200 dark:border-green-800" },
];

const RECOMMENDATIONS: Record<string, string[]> = {
  "CI/CD": [
    "Set up a basic CI pipeline (GitHub Actions / GitLab CI)",
    "Add automated deployments with staging environments",
    "Implement blue-green or canary deployments",
  ],
  Monitoring: [
    "Set up centralized logging (ELK / Datadog)",
    "Implement APM and distributed tracing",
    "Create runbooks and on-call rotations",
  ],
  "Infrastructure as Code": [
    "Start with Terraform for new infrastructure",
    "Migrate existing resources to IaC",
    "Implement GitOps with ArgoCD or Flux",
  ],
  Security: [
    "Add SAST scanning to your CI pipeline (Snyk / Semgrep)",
    "Implement SSO and RBAC across all services",
    "Adopt zero-trust architecture with JIT access",
  ],
  Testing: [
    "Establish a testing strategy and minimum coverage targets",
    "Add integration and E2E tests for critical paths",
    "Implement contract testing for microservices",
  ],
};

function RadarChart({ categoryScores }: { categoryScores: Record<string, number> }) {
  const cats = CATEGORIES;
  const n = cats.length;
  const cx = 130, cy = 130, r = 100;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const dist = (value / 8) * r; // max score per category is 8 (2 questions * 4)
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const dataPoints = cats.map((cat, i) => getPoint(i, categoryScores[cat] || 0));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 260 260" className="w-full max-w-[280px] mx-auto">
      {[2, 4, 6, 8].map((level) => {
        const points = cats.map((_, i) => {
          const p = getPoint(i, level);
          return `${p.x},${p.y}`;
        });
        return (
          <polygon
            key={level}
            points={points.join(" ")}
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
            strokeWidth="1"
          />
        );
      })}
      {cats.map((cat, i) => {
        const p = getPoint(i, 8);
        const labelP = getPoint(i, 9.5);
        return (
          <g key={cat}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" />
            <text x={labelP.x} y={labelP.y} textAnchor="middle" dominantBaseline="middle" className="fill-current text-muted-foreground" fontSize="8">
              {cat}
            </text>
          </g>
        );
      })}
      <path d={dataPath} fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#8b5cf6" />
      ))}
    </svg>
  );
}

export default function DevOpsAssessmentDemo() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>(new Array(10).fill(0));
  const [showResults, setShowResults] = useState(false);

  const totalScore = useMemo(() => scores.reduce((a, b) => a + b, 0), [scores]);

  const categoryScores = useMemo(() => {
    const result: Record<string, number> = {};
    QUESTIONS.forEach((q, i) => {
      result[q.category] = (result[q.category] || 0) + scores[i];
    });
    return result;
  }, [scores]);

  const maturityLevel = useMemo(() => {
    return MATURITY_LEVELS.find((l) => totalScore >= l.range[0] && totalScore <= l.range[1]) || MATURITY_LEVELS[0];
  }, [totalScore]);

  const weakCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => (categoryScores[cat] || 0) <= 4).sort(
      (a, b) => (categoryScores[a] || 0) - (categoryScores[b] || 0)
    );
  }, [categoryScores]);

  const selectOption = (optionIndex: number) => {
    const newScores = [...scores];
    newScores[step] = optionIndex + 1; // 1-4 scoring
    setScores(newScores);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setStep(0);
    setScores(new Array(10).fill(0));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/devops-dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">DevOps Maturity Assessment</h1>
              <p className="text-sm text-muted-foreground">10 questions to evaluate your DevOps practices</p>
            </div>
          </div>
        </div>

        {!showResults ? (
          <div className="mx-auto max-w-xl">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {QUESTIONS[step].category}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-8 shadow-lg">
              <h2 className="text-lg font-bold text-foreground mb-6">
                {QUESTIONS[step].question}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    className={`w-full rounded-xl border px-5 py-4 text-left text-sm transition-all flex items-center gap-3 group ${
                      scores[step] === i + 1
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300"
                        : "border-card-border bg-card-bg text-foreground hover:border-cyan-300"
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      scores[step] === i + 1
                        ? "border-cyan-500 bg-cyan-500 text-white"
                        : "border-card-border text-muted-foreground group-hover:border-cyan-300"
                    }`}>
                      {i + 1}
                    </span>
                    {opt}
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Header */}
            <div className={`rounded-2xl border ${maturityLevel.border} ${maturityLevel.bg} p-8 text-center`}>
              <p className="text-sm font-medium text-muted-foreground mb-2">Your DevOps Maturity Level</p>
              <h2 className={`text-4xl font-bold ${maturityLevel.color} mb-1`}>
                {maturityLevel.label}
              </h2>
              <p className="text-lg text-foreground font-semibold">
                {totalScore} / 40 points
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {MATURITY_LEVELS.map((level) => (
                  <div
                    key={level.label}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      level.label === maturityLevel.label
                        ? `${level.bg} ${level.color} ring-2 ring-current`
                        : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                    }`}
                  >
                    {level.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Radar Chart */}
              <div className="rounded-2xl border border-card-border bg-card-bg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Score by Category
                </h3>
                <RadarChart categoryScores={categoryScores} />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-semibold text-foreground">
                        {categoryScores[cat] || 0}/8
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="rounded-2xl border border-card-border bg-card-bg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recommended Improvements
                </h3>
                <div className="space-y-4">
                  {(weakCategories.length > 0 ? weakCategories : CATEGORIES.slice(0, 3)).map((cat) => {
                    const score = categoryScores[cat] || 0;
                    const recIndex = score <= 2 ? 0 : score <= 4 ? 1 : 2;
                    return (
                      <div key={cat} className="rounded-lg border border-card-border p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-foreground">{cat}</h4>
                          <span className={`text-xs font-medium ${score <= 4 ? "text-red-500" : "text-amber-500"}`}>
                            {score}/8
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {RECOMMENDATIONS[cat][recIndex]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-lg border border-card-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Retake Assessment
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                Get expert help improving your DevOps
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
