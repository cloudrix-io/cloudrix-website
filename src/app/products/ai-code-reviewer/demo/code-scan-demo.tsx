"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ScanSearch,
  ArrowRight,
  RotateCcw,
  Cpu,
  Shield,
  Zap,
  Wrench,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

interface FormInputs {
  code: string;
  language: string;
}

interface Finding {
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  line: string;
  suggestion: string;
}

interface ScanResult {
  overallScore: number;
  securityScore: number;
  performanceScore: number;
  maintainabilityScore: number;
  bestPracticesScore: number;
  findings: Finding[];
  summary: string;
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript / TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" },
];

const PLACEHOLDER_CODE = `// Paste your code here, or try this example:
app.get('/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE name = '" + req.query.name + "'";
  const result = await db.query(query);

  const html = "<div>" + result[0].bio + "</div>";
  document.innerHTML = html;

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].orders.length; j++) {
      for (let k = 0; k < result[i].orders[j].items.length; k++) {
        processItem(result[i].orders[j].items[k]);
      }
    }
  }

  const password = "admin123";
  eval(req.query.callback);

  res.json(result);
});`;

function analyzeCode(code: string, language: string): ScanResult {
  const lower = code.toLowerCase();
  const findings: Finding[] = [];

  // Security checks
  if (/eval\s*\(/.test(code)) {
    findings.push({
      severity: "critical",
      category: "Security",
      title: "Use of eval() detected",
      line: code.split("\n").find((l) => /eval\s*\(/.test(l))?.trim() || "",
      suggestion:
        "Never use eval() with user input. Use JSON.parse() for data or a sandboxed execution environment for dynamic code.",
    });
  }

  if (/innerhtml/i.test(code) || /document\.write/i.test(code)) {
    findings.push({
      severity: "critical",
      category: "Security",
      title: "Potential XSS vulnerability (innerHTML / document.write)",
      line:
        code
          .split("\n")
          .find((l) => /innerhtml|document\.write/i.test(l))
          ?.trim() || "",
      suggestion:
        "Use textContent instead of innerHTML, or sanitize HTML with a library like DOMPurify before insertion.",
    });
  }

  if (/SELECT.*\+.*req|SELECT.*\$\{|SELECT.*\+.*\$/.test(code) || /['"]SELECT.*\+/.test(code)) {
    findings.push({
      severity: "critical",
      category: "Security",
      title: "SQL Injection vulnerability detected",
      line:
        code
          .split("\n")
          .find((l) => /SELECT.*\+|SELECT.*\$\{/.test(l))
          ?.trim() || "",
      suggestion:
        "Use parameterized queries or an ORM. Never concatenate user input into SQL strings.",
    });
  }

  if (/password\s*=\s*['"][^'"]+['"]|api_key\s*=\s*['"]|secret\s*=\s*['"]/i.test(code)) {
    findings.push({
      severity: "critical",
      category: "Security",
      title: "Hardcoded credential detected",
      line:
        code
          .split("\n")
          .find((l) => /password\s*=\s*['"]|api_key\s*=\s*['"]|secret\s*=\s*['"]/i.test(l))
          ?.trim() || "",
      suggestion:
        "Store credentials in environment variables or a secrets manager (e.g., AWS Secrets Manager, Vault). Never commit secrets to source code.",
    });
  }

  if (/exec\s*\(|child_process|shell_exec|system\s*\(/i.test(code)) {
    findings.push({
      severity: "critical",
      category: "Security",
      title: "Command injection risk",
      line:
        code
          .split("\n")
          .find((l) => /exec\s*\(|child_process|shell_exec|system\s*\(/i.test(l))
          ?.trim() || "",
      suggestion:
        "Avoid executing shell commands with user input. If necessary, use a whitelist of allowed commands and sanitize all inputs.",
    });
  }

  // Performance checks
  const nestedLoopMatch = code.match(
    /for\s*\(.*\{[\s\S]*?for\s*\(.*\{[\s\S]*?for\s*\(/
  );
  if (nestedLoopMatch) {
    findings.push({
      severity: "warning",
      category: "Performance",
      title: "Triple-nested loop detected (O(n^3) complexity)",
      line: "for ... for ... for ...",
      suggestion:
        "Refactor to reduce nesting. Use maps/dictionaries for lookups, batch processing, or restructure the data model to avoid deep iteration.",
    });
  } else if (/for\s*\(.*\{[\s\S]*?for\s*\(/.test(code)) {
    findings.push({
      severity: "warning",
      category: "Performance",
      title: "Nested loop detected (O(n^2) complexity)",
      line: "for ... for ...",
      suggestion:
        "Consider using a hash map for lookups to reduce from O(n^2) to O(n). Evaluate if the nested iteration is necessary.",
    });
  }

  if (/SELECT\s+\*\s+FROM/i.test(code)) {
    findings.push({
      severity: "warning",
      category: "Performance",
      title: "SELECT * query - fetching all columns",
      line:
        code
          .split("\n")
          .find((l) => /SELECT\s+\*\s+FROM/i.test(l))
          ?.trim() || "",
      suggestion:
        "Select only the columns you need. This reduces data transfer, memory usage, and improves query performance.",
    });
  }

  if (/await.*for\s|await.*\.forEach|for.*await\s/.test(code)) {
    findings.push({
      severity: "warning",
      category: "Performance",
      title: "Sequential async operations in loop",
      line: "await inside loop",
      suggestion:
        "Use Promise.all() or Promise.allSettled() to parallelize async operations instead of awaiting sequentially in a loop.",
    });
  }

  // Maintainability checks
  const lines = code.split("\n");
  if (lines.length > 50) {
    findings.push({
      severity: "info",
      category: "Maintainability",
      title: `Long function/file (${lines.length} lines)`,
      line: `${lines.length} lines of code`,
      suggestion:
        "Break this into smaller, focused functions following the Single Responsibility Principle. Aim for functions under 20-30 lines.",
    });
  }

  if (/console\.(log|warn|error|debug)\s*\(/.test(code)) {
    findings.push({
      severity: "info",
      category: "Maintainability",
      title: "Console logging in code",
      line:
        code
          .split("\n")
          .find((l) => /console\.(log|warn|error|debug)\s*\(/.test(l))
          ?.trim() || "",
      suggestion:
        "Use a structured logging library (e.g., Winston, Pino) instead of console.log. Remove debug logging before production deployment.",
    });
  }

  if (/\/\/\s*TODO|\/\/\s*FIXME|\/\/\s*HACK|#\s*TODO|#\s*FIXME/.test(code)) {
    findings.push({
      severity: "info",
      category: "Maintainability",
      title: "TODO/FIXME comment detected",
      line:
        code
          .split("\n")
          .find((l) => /\/\/\s*TODO|\/\/\s*FIXME|#\s*TODO|#\s*FIXME/.test(l))
          ?.trim() || "",
      suggestion:
        "Track TODOs in your issue tracker instead of code comments. Unresolved TODOs accumulate as technical debt.",
    });
  }

  // Best practices
  if (/var\s+/.test(code) && /javascript|typescript/i.test(language)) {
    findings.push({
      severity: "info",
      category: "Best Practices",
      title: "Use of 'var' instead of 'let' or 'const'",
      line:
        code
          .split("\n")
          .find((l) => /var\s+/.test(l))
          ?.trim() || "",
      suggestion:
        "Use 'const' for values that don't change and 'let' for variables that do. Avoid 'var' due to its function-scoped hoisting behavior.",
    });
  }

  if (/catch\s*\(\s*\w+\s*\)\s*\{\s*\}/.test(code) || /catch\s*\{\s*\}/.test(code)) {
    findings.push({
      severity: "warning",
      category: "Best Practices",
      title: "Empty catch block - swallowed exception",
      line: "catch { }",
      suggestion:
        "Never silently swallow exceptions. At minimum, log the error. Consider rethrowing or handling the error gracefully.",
    });
  }

  if (/\.then\s*\(/.test(code) && /async/.test(code)) {
    findings.push({
      severity: "info",
      category: "Best Practices",
      title: "Mixed async patterns (async/await + .then())",
      line:
        code
          .split("\n")
          .find((l) => /\.then\s*\(/.test(l))
          ?.trim() || "",
      suggestion:
        "Stick to one async pattern. Prefer async/await for readability over .then() chains.",
    });
  }

  // If no findings, add a positive note
  if (findings.length === 0) {
    findings.push({
      severity: "info",
      category: "Best Practices",
      title: "No major issues detected",
      line: "",
      suggestion:
        "Your code looks clean. Consider adding unit tests and running a comprehensive static analysis tool for deeper coverage.",
    });
  }

  // Calculate scores
  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const warningCount = findings.filter((f) => f.severity === "warning").length;
  const infoCount = findings.filter((f) => f.severity === "info").length;

  const securityFindings = findings.filter((f) => f.category === "Security");
  const performanceFindings = findings.filter((f) => f.category === "Performance");
  const maintainabilityFindings = findings.filter((f) => f.category === "Maintainability");
  const bestPracticeFindings = findings.filter((f) => f.category === "Best Practices");

  const calcScore = (categoryFindings: Finding[]) => {
    let score = 100;
    categoryFindings.forEach((f) => {
      if (f.severity === "critical") score -= 25;
      if (f.severity === "warning") score -= 15;
      if (f.severity === "info") score -= 5;
    });
    return Math.max(0, Math.min(100, score));
  };

  const securityScore = calcScore(securityFindings);
  const performanceScore = calcScore(performanceFindings);
  const maintainabilityScore = calcScore(maintainabilityFindings);
  const bestPracticesScore = calcScore(bestPracticeFindings);

  const overallScore = Math.round(
    (securityScore * 0.35 +
      performanceScore * 0.25 +
      maintainabilityScore * 0.2 +
      bestPracticesScore * 0.2)
  );

  const summary =
    criticalCount > 0
      ? `Found ${criticalCount} critical issue${criticalCount > 1 ? "s" : ""} that should be fixed immediately. ${warningCount > 0 ? `Plus ${warningCount} warning${warningCount > 1 ? "s" : ""} to review.` : ""}`
      : warningCount > 0
        ? `No critical issues found, but ${warningCount} warning${warningCount > 1 ? "s" : ""} should be addressed for better code quality.`
        : "Code looks good overall. Minor suggestions for improvement included below.";

  return {
    overallScore,
    securityScore,
    performanceScore,
    maintainabilityScore,
    bestPracticesScore,
    findings,
    summary,
  };
}

function ScoreCircle({
  score,
  label,
  size = "small",
}: {
  score: number;
  label: string;
  size?: "small" | "large";
}) {
  const color =
    score >= 80
      ? "text-emerald-500"
      : score >= 60
        ? "text-amber-500"
        : "text-red-500";
  const bgColor =
    score >= 80
      ? "bg-emerald-50 border-emerald-200"
      : score >= 60
        ? "bg-amber-50 border-amber-200"
        : "bg-red-50 border-red-200";
  const isLarge = size === "large";

  return (
    <div
      className={`flex flex-col items-center ${isLarge ? "p-6" : "p-4"} rounded-xl border ${bgColor}`}
    >
      <div
        className={`${isLarge ? "text-4xl" : "text-2xl"} font-bold ${color}`}
      >
        {score}
      </div>
      <div
        className={`${isLarge ? "text-sm" : "text-xs"} text-gray-600 mt-1 font-medium`}
      >
        {label}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: Finding["severity"] }) {
  const config = {
    critical: {
      label: "Critical",
      className: "bg-red-100 text-red-700 border-red-200",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
    warning: {
      label: "Warning",
      className: "bg-amber-100 text-amber-700 border-amber-200",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    info: {
      label: "Info",
      className: "bg-blue-100 text-blue-700 border-blue-200",
      icon: <Info className="w-3.5 h-3.5" />,
    },
  };
  const { label, className, icon } = config[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

export function CodeScanDemo() {
  const [inputs, setInputs] = useState<FormInputs>({
    code: "",
    language: "javascript",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.code.trim()) {
      setError("Please paste some code to analyze");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    setTimeout(() => {
      const scanResult = analyzeCode(inputs.code, inputs.language);
      setResult(scanResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setInputs({ code: "", language: "javascript" });
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/products/ai-code-reviewer"
            className="text-indigo-200 hover:text-white text-sm mb-4 inline-block"
          >
            &larr; Back to CodeScan AI
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ScanSearch className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">CodeScan AI Demo</h1>
          </div>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Paste your code and get an instant review covering security
            vulnerabilities, performance issues, and best practices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            {!result && !isAnalyzing ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Paste your code{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.language}
                      onChange={(e) =>
                        setInputs({ ...inputs, language: e.target.value })
                      }
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <textarea
                      value={inputs.code}
                      onChange={(e) =>
                        setInputs({ ...inputs, code: e.target.value })
                      }
                      placeholder={PLACEHOLDER_CODE}
                      rows={14}
                      spellCheck={false}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono text-sm bg-slate-950 text-slate-300 placeholder:text-slate-600 ${
                        error ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Analyze Code
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : isAnalyzing ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analyzing your code...
                </h3>
                <p className="text-gray-500 text-sm">
                  Scanning for security vulnerabilities, performance issues, and
                  code quality
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                    <ScanSearch className="w-4 h-4" />
                    Code Analysis Report
                  </div>
                  <ScoreCircle
                    score={result.overallScore}
                    label="Overall Score"
                    size="large"
                  />
                  <p className="text-gray-600 mt-3 text-sm max-w-lg mx-auto">
                    {result.summary}
                  </p>
                </div>

                {/* Category Scores */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ScoreCircle
                    score={result.securityScore}
                    label="Security"
                  />
                  <ScoreCircle
                    score={result.performanceScore}
                    label="Performance"
                  />
                  <ScoreCircle
                    score={result.maintainabilityScore}
                    label="Maintainability"
                  />
                  <ScoreCircle
                    score={result.bestPracticesScore}
                    label="Best Practices"
                  />
                </div>

                {/* Findings */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    Findings ({result.findings.length})
                  </h4>
                  <div className="space-y-3">
                    {result.findings.map((finding, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <SeverityBadge severity={finding.severity} />
                              <span className="text-xs text-gray-500 font-medium">
                                {finding.category}
                              </span>
                            </div>
                            <h5 className="text-sm font-semibold text-gray-900">
                              {finding.title}
                            </h5>
                          </div>
                        </div>
                        {finding.line && (
                          <div className="bg-slate-950 rounded-lg px-3 py-2 mb-3 overflow-x-auto">
                            <code className="text-xs text-red-400 font-mono">
                              {finding.line}
                            </code>
                          </div>
                        )}
                        <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-emerald-800 leading-relaxed">
                            {finding.suggestion}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <Link
                    href="/contact?type=code-audit"
                    className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
                  >
                    Get Full Codebase Audit
                  </Link>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors py-2 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Analyze Another Snippet
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          This is a simulated demo using keyword detection. The full CodeScan AI
          uses LLM-powered deep analysis for comprehensive code reviews.
        </p>
      </div>
    </div>
  );
}
