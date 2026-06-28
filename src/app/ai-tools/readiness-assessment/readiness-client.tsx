"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  RefreshCw,
} from "lucide-react";

interface Question {
  id: number;
  category: string;
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Data Quality & Availability",
    question:
      "How would you describe your organization's data quality and accessibility?",
    options: [
      { label: "We have limited, mostly unstructured data with no central repository", score: 0 },
      { label: "Some structured data exists but it's siloed across departments", score: 1 },
      { label: "We have a centralized data warehouse with mostly clean, structured data", score: 2 },
      { label: "We have high-quality, well-governed data pipelines with real-time access", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Technical Infrastructure",
    question: "What best describes your current technical infrastructure?",
    options: [
      { label: "Primarily legacy on-premise systems with limited scalability", score: 0 },
      { label: "Mix of on-premise and cloud, with some modernization underway", score: 1 },
      { label: "Cloud-native architecture with containerization and CI/CD pipelines", score: 2 },
      { label: "Fully cloud-native with GPU/TPU access, MLOps tooling, and auto-scaling", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Team AI Skills",
    question:
      "What level of AI and machine learning expertise does your team have?",
    options: [
      { label: "No dedicated AI/ML expertise on the team", score: 0 },
      { label: "Some team members have basic understanding but no hands-on experience", score: 1 },
      { label: "We have data scientists or ML engineers with production experience", score: 2 },
      { label: "Dedicated AI team with deep expertise across multiple AI domains", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Leadership Buy-in",
    question:
      "How committed is your leadership to AI investment and adoption?",
    options: [
      { label: "Leadership is skeptical or unaware of AI's potential value", score: 0 },
      { label: "Some interest but no formal commitment or strategy", score: 1 },
      { label: "Leadership has approved AI initiatives with dedicated sponsorship", score: 2 },
      { label: "AI is a core pillar of the company's strategic roadmap with C-level championing", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Use Case Clarity",
    question:
      "How well-defined are your AI use cases?",
    options: [
      { label: "We haven't identified specific use cases for AI", score: 0 },
      { label: "We have vague ideas but nothing concrete or validated", score: 1 },
      { label: "We have 2-3 well-defined use cases with clear business value", score: 2 },
      { label: "We have a prioritized backlog of validated use cases with ROI projections", score: 3 },
    ],
  },
  {
    id: 6,
    category: "Budget Allocation",
    question: "Is there budget allocated specifically for AI initiatives?",
    options: [
      { label: "No budget has been allocated for AI", score: 0 },
      { label: "We could redirect some existing IT budget but nothing is earmarked", score: 1 },
      { label: "A specific budget has been set aside for initial AI projects", score: 2 },
      { label: "Significant multi-year AI budget with room for experimentation and scaling", score: 3 },
    ],
  },
  {
    id: 7,
    category: "Data Governance",
    question:
      "What is the state of your data governance and privacy policies?",
    options: [
      { label: "No formal data governance policies in place", score: 0 },
      { label: "Basic policies exist but are inconsistently enforced", score: 1 },
      { label: "Comprehensive data governance framework with regular audits", score: 2 },
      { label: "Mature governance with automated compliance, lineage tracking, and DPO oversight", score: 3 },
    ],
  },
  {
    id: 8,
    category: "Integration Readiness",
    question:
      "How ready are your existing systems for AI integration?",
    options: [
      { label: "Most systems are closed with no API access or integration points", score: 0 },
      { label: "Some systems have APIs but integration would require significant work", score: 1 },
      { label: "Core systems are API-ready with documented integration patterns", score: 2 },
      { label: "Fully API-driven architecture with event streaming and microservices", score: 3 },
    ],
  },
  {
    id: 9,
    category: "Change Management",
    question:
      "How open is your organization to AI-driven changes in workflows?",
    options: [
      { label: "Strong resistance to change; employees fear AI replacing their roles", score: 0 },
      { label: "Mixed feelings; some teams are open while others resist", score: 1 },
      { label: "Generally positive with change management programs in place", score: 2 },
      { label: "Culture of innovation; teams actively seek AI-augmented workflows", score: 3 },
    ],
  },
  {
    id: 10,
    category: "Regulatory Awareness",
    question:
      "How aware is your organization of AI regulations like the EU AI Act?",
    options: [
      { label: "We are not aware of any AI-specific regulations", score: 0 },
      { label: "We know regulations exist but haven't assessed their impact", score: 1 },
      { label: "We've reviewed relevant regulations and identified compliance gaps", score: 2 },
      { label: "We have a compliance strategy with legal review and ongoing monitoring", score: 3 },
    ],
  },
];

interface Rating {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

function getRating(score: number): Rating {
  if (score <= 10) {
    return {
      label: "Early Stage",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description:
        "Your organization needs significant preparation before pursuing AI initiatives. Focus on building foundational data capabilities, upskilling your team, and developing a clear AI strategy.",
    };
  }
  if (score <= 17) {
    return {
      label: "Developing",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description:
        "You have a good foundation but key gaps need addressing. Prioritize the areas where you scored lowest and consider starting with a focused pilot project to build momentum.",
    };
  }
  if (score <= 24) {
    return {
      label: "Ready",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description:
        "Your organization is well positioned for AI adoption. You can confidently pursue AI projects and should focus on scaling capabilities and optimizing your AI operations.",
    };
  }
  return {
    label: "Advanced",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description:
      "Your organization is ready for complex, enterprise-scale AI deployments. Consider advanced AI strategies including custom model training, AI-driven product innovation, and cross-functional AI integration.",
  };
}

function getRecommendations(answers: number[]): string[] {
  const recs: string[] = [];
  const categoryScores = answers.map((score, i) => ({
    category: questions[i].category,
    score,
    index: i,
  }));
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);
  const weakest = sorted.filter((c) => c.score <= 1).slice(0, 3);

  for (const area of weakest) {
    switch (area.index) {
      case 0:
        recs.push(
          "Invest in data infrastructure: centralize your data, implement quality checks, and create a data catalog to make information accessible."
        );
        break;
      case 1:
        recs.push(
          "Modernize your tech stack: migrate critical workloads to the cloud and adopt containerization to enable scalable AI deployments."
        );
        break;
      case 2:
        recs.push(
          "Build AI talent: hire or upskill team members in ML/AI, consider partnerships with AI consultancies for knowledge transfer."
        );
        break;
      case 3:
        recs.push(
          "Secure leadership support: prepare an AI business case with ROI projections and competitive analysis to gain executive sponsorship."
        );
        break;
      case 4:
        recs.push(
          "Define clear use cases: run discovery workshops to identify high-impact, feasible AI applications tied to business outcomes."
        );
        break;
      case 5:
        recs.push(
          "Allocate dedicated AI budget: even a small initial investment for a pilot project can demonstrate value and unlock further funding."
        );
        break;
      case 6:
        recs.push(
          "Strengthen data governance: establish clear policies for data access, privacy, and quality before deploying AI systems."
        );
        break;
      case 7:
        recs.push(
          "Improve integration readiness: invest in APIs and middleware to connect your systems and enable seamless AI integration."
        );
        break;
      case 8:
        recs.push(
          "Address change management: communicate AI benefits clearly, involve employees early, and provide training to reduce resistance."
        );
        break;
      case 9:
        recs.push(
          "Prioritize regulatory awareness: review the EU AI Act and assess how it applies to your planned AI systems to avoid compliance risks."
        );
        break;
    }
  }

  if (recs.length === 0) {
    recs.push(
      "Continue refining your AI strategy and consider tackling more ambitious, cross-functional AI projects."
    );
  }

  return recs;
}

function getStrengths(answers: number[]): string[] {
  const strengths: string[] = [];
  const categoryScores = answers.map((score, i) => ({
    category: questions[i].category,
    score,
    index: i,
  }));
  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const strongest = sorted.filter((c) => c.score >= 2).slice(0, 3);

  for (const area of strongest) {
    strengths.push(area.category);
  }

  return strengths;
}

export function AiReadinessAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers(Array(10).fill(-1));
    setShowResults(false);
  };

  const totalScore = answers.reduce((sum, a) => sum + Math.max(a, 0), 0);
  const allAnswered = answers.every((a) => a >= 0);
  const isLastQuestion = currentQuestion === questions.length - 1;
  const question = questions[currentQuestion];

  if (showResults) {
    const rating = getRating(totalScore);
    const recommendations = getRecommendations(answers);
    const strengths = getStrengths(answers);
    const scorePercent = Math.round((totalScore / 30) * 100);

    return (
      <div className="space-y-8">
        {/* Score Overview */}
        <div
          className={`rounded-2xl border-2 ${rating.borderColor} ${rating.bgColor} p-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className={`h-8 w-8 ${rating.color}`} />
            <h2 className={`text-2xl font-bold ${rating.color}`}>
              Your AI Readiness Score
            </h2>
          </div>

          <div className="mb-4">
            <div className="flex items-end gap-2 mb-2">
              <span className={`text-5xl font-bold ${rating.color}`}>
                {totalScore}
              </span>
              <span className="text-2xl text-gray-400 mb-1">/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  totalScore <= 10
                    ? "bg-red-500"
                    : totalScore <= 17
                      ? "bg-yellow-500"
                      : totalScore <= 24
                        ? "bg-green-500"
                        : "bg-indigo-500"
                }`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${rating.color} ${rating.bgColor} border ${rating.borderColor}`}
            >
              {rating.label}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{rating.description}</p>
        </div>

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">
                Your Strengths
              </h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-yellow-800">
              Recommended Next Steps
            </h3>
          </div>
          <ul className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-yellow-800">
                <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact?type=ai-readiness"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Get Expert Assessment
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button
            onClick={handleRetake}
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-indigo-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
        <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4">
          {question.category}
        </span>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = answers[currentQuestion] === option.score;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(option.score)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors ${
            currentQuestion === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${
              allAnswered
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            View Results
            <BarChart3 className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] < 0}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${
              answers[currentQuestion] >= 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
