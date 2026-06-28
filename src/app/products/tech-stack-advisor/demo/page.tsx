"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface Question {
  title: string;
  subtitle: string;
  options: { label: string; value: string }[];
}

interface StackOption {
  label: string;
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  cicd: string;
  scores: Record<string, number>; // 0-100 for radar chart
}

const QUESTIONS: Question[] = [
  {
    title: "What are you building?",
    subtitle: "Select the type of product",
    options: [
      { label: "SaaS Platform", value: "saas" },
      { label: "E-commerce", value: "ecommerce" },
      { label: "Mobile App", value: "mobile" },
      { label: "API Platform", value: "api" },
      { label: "Internal Tool", value: "internal" },
    ],
  },
  {
    title: "Expected users in Year 1?",
    subtitle: "Helps determine scalability needs",
    options: [
      { label: "< 1,000", value: "small" },
      { label: "1K - 10K", value: "medium" },
      { label: "10K - 100K", value: "large" },
      { label: "100K+", value: "massive" },
    ],
  },
  {
    title: "Team experience?",
    subtitle: "We will recommend tools your team can adopt quickly",
    options: [
      { label: "JavaScript / TypeScript", value: "javascript" },
      { label: "Python", value: "python" },
      { label: "Java / Kotlin", value: "java" },
      { label: "Go", value: "go" },
      { label: "No preference", value: "any" },
    ],
  },
  {
    title: "Budget priority?",
    subtitle: "What matters most for your project",
    options: [
      { label: "Speed to market", value: "speed" },
      { label: "Scalability", value: "scale" },
      { label: "Low cost", value: "cost" },
      { label: "Enterprise features", value: "enterprise" },
    ],
  },
  {
    title: "Timeline?",
    subtitle: "How quickly do you need to launch",
    options: [
      { label: "< 1 month", value: "rush" },
      { label: "1 - 3 months", value: "normal" },
      { label: "3 - 6 months", value: "extended" },
      { label: "6+ months", value: "long" },
    ],
  },
];

function getRecommendations(answers: string[]): StackOption[] {
  const [type, scale, lang, priority] = answers;

  // Recommended stack based on answers
  const stacks: StackOption[] = [];

  if (lang === "javascript" || lang === "any") {
    stacks.push({
      label: "Recommended",
      frontend: type === "mobile" ? "React Native" : "Next.js (React)",
      backend: "Node.js + Express/Fastify",
      database: scale === "massive" ? "PostgreSQL + Redis" : "PostgreSQL",
      hosting: priority === "cost" ? "Railway / Render" : "Vercel + AWS",
      cicd: "GitHub Actions",
      scores: { Performance: 80, Scalability: scale === "massive" ? 85 : 70, "Dev Speed": 90, "Community": 95, Cost: priority === "cost" ? 90 : 65, Security: 75 },
    });
  }

  if (lang === "python" || lang === "any") {
    stacks.push({
      label: lang === "python" ? "Recommended" : "Alternative 1",
      frontend: type === "mobile" ? "Flutter" : "React + Vite",
      backend: type === "api" ? "FastAPI" : "Django",
      database: scale === "massive" ? "PostgreSQL + Elasticsearch" : "PostgreSQL",
      hosting: "AWS (ECS/Lambda)",
      cicd: "GitHub Actions + Docker",
      scores: { Performance: 75, Scalability: 80, "Dev Speed": 85, "Community": 90, Cost: 70, Security: 80 },
    });
  }

  if (lang === "java" || lang === "go" || stacks.length < 3) {
    stacks.push({
      label: stacks.length === 0 ? "Recommended" : `Alternative ${stacks.length}`,
      frontend: type === "mobile" ? "Kotlin Multiplatform" : "Angular",
      backend: lang === "go" ? "Go + Gin" : "Spring Boot",
      database: scale === "massive" ? "PostgreSQL + MongoDB" : "PostgreSQL",
      hosting: priority === "enterprise" ? "AWS (EKS)" : "Google Cloud Run",
      cicd: lang === "go" ? "GitHub Actions + GoReleaser" : "Jenkins / GitHub Actions",
      scores: { Performance: 90, Scalability: 95, "Dev Speed": 60, "Community": 75, Cost: 55, Security: 90 },
    });
  }

  // Ensure we always have 3
  if (stacks.length < 3) {
    stacks.push({
      label: `Alternative ${stacks.length}`,
      frontend: "Svelte + SvelteKit",
      backend: "Bun + Elysia",
      database: "Turso (SQLite edge)",
      hosting: "Cloudflare Workers",
      cicd: "GitHub Actions",
      scores: { Performance: 85, Scalability: 70, "Dev Speed": 80, "Community": 60, Cost: 95, Security: 70 },
    });
  }

  return stacks.slice(0, 3);
}

// SVG Radar Chart Component
function RadarChart({ scores, color }: { scores: Record<string, number>; color: string }) {
  const categories = Object.keys(scores);
  const n = categories.length;
  const cx = 120, cy = 120, r = 90;
  const levels = [25, 50, 75, 100];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const dist = (value / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const dataPoints = categories.map((_, i) => getPoint(i, scores[categories[i]]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[240px] mx-auto">
      {/* Grid levels */}
      {levels.map((level) => {
        const points = categories.map((_, i) => {
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
      {/* Axes */}
      {categories.map((cat, i) => {
        const p = getPoint(i, 100);
        return (
          <g key={cat}>
            <line
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth="1"
            />
            <text
              x={getPoint(i, 115).x}
              y={getPoint(i, 115).y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-muted-foreground"
              fontSize="9"
            >
              {cat}
            </text>
          </g>
        );
      })}
      {/* Data */}
      <path d={dataPath} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
    </svg>
  );
}

const STACK_COLORS = ["#8b5cf6", "#3b82f6", "#10b981"];

export default function TechStackAdvisorDemo() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const recommendations = useMemo(() => {
    if (!showResults) return [];
    return getRecommendations(answers);
  }, [showResults, answers]);

  const selectOption = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/tech-stack-advisor"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tech Stack Advisor</h1>
              <p className="text-sm text-muted-foreground">Answer 5 questions, get a personalized stack recommendation</p>
            </div>
          </div>
        </div>

        {!showResults ? (
          <div className="mx-auto max-w-xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-8 shadow-lg">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {QUESTIONS[step].title}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {QUESTIONS[step].subtitle}
              </p>

              <div className="space-y-3">
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className={`w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all flex items-center justify-between group ${
                      answers[step] === opt.value
                        ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300"
                        : "border-card-border bg-card-bg text-foreground hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10"
                    }`}
                  >
                    {opt.label}
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 transition-colors" />
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
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              <h2 className="text-xl font-bold text-foreground">Your Recommended Stacks</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {recommendations.map((stack, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border bg-card-bg p-6 shadow-lg ${
                    i === 0
                      ? "border-violet-300 ring-2 ring-violet-200 dark:border-violet-700 dark:ring-violet-900/50"
                      : "border-card-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        i === 0
                          ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {stack.label}
                    </span>
                  </div>

                  <RadarChart scores={stack.scores} color={STACK_COLORS[i]} />

                  <div className="mt-4 space-y-3 text-sm">
                    {[
                      { label: "Frontend", value: stack.frontend },
                      { label: "Backend", value: stack.backend },
                      { label: "Database", value: stack.database },
                      { label: "Hosting", value: stack.hosting },
                      { label: "CI/CD", value: stack.cicd },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-2">
                        <span className="font-medium text-muted-foreground w-20 shrink-0">
                          {item.label}
                        </span>
                        <span className="text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={restart}
                className="rounded-lg border border-card-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Start Over
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:from-violet-600 hover:to-indigo-700 transition-all"
              >
                Want us to build this? Book a call
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
