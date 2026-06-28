"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ShieldAlert, Loader2, Globe, Lock, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

type Grade = "A" | "B" | "C" | "D" | "F";
type CheckStatus = "pass" | "warning" | "fail" | "info";

interface ScanCheck {
  category: string;
  name: string;
  status: CheckStatus;
  description: string;
}

interface ScanResult {
  url: string;
  grade: Grade;
  score: number;
  checks: ScanCheck[];
  scanTime: string;
}

const gradeColors: Record<Grade, string> = {
  A: "text-green-500",
  B: "text-blue-500",
  C: "text-amber-500",
  D: "text-orange-500",
  F: "text-red-500",
};

const gradeBg: Record<Grade, string> = {
  A: "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-800",
  B: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-800",
  C: "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-800",
  D: "bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-800",
  F: "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-800",
};

const statusIcons: Record<CheckStatus, React.ReactNode> = {
  pass: <CheckCircle className="h-5 w-5 text-green-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  fail: <XCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

function generateScanResults(url: string): ScanResult {
  const isHttps = url.startsWith("https://");
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const isWellKnown = ["google.com", "github.com", "cloudflare.com", "vercel.com", "cloudrix.io", "www.cloudrix.io"].some(
    (d) => domain.includes(d)
  );

  // Deterministic "random" based on domain string
  const hash = domain.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const checks: ScanCheck[] = [
    {
      category: "SSL/TLS",
      name: "HTTPS Enabled",
      status: isHttps ? "pass" : "fail",
      description: isHttps
        ? "Connection is encrypted with TLS"
        : "Site does not use HTTPS. All traffic is unencrypted.",
    },
    {
      category: "SSL/TLS",
      name: "Certificate Validity",
      status: isHttps ? "pass" : "fail",
      description: isHttps
        ? "SSL certificate is valid and not expired"
        : "No SSL certificate detected",
    },
    {
      category: "SSL/TLS",
      name: "TLS Version",
      status: isHttps ? (isWellKnown ? "pass" : "warning") : "fail",
      description: isHttps
        ? isWellKnown
          ? "Using TLS 1.3 (recommended)"
          : "Using TLS 1.2 (consider upgrading to TLS 1.3)"
        : "No TLS detected",
    },
    {
      category: "Headers",
      name: "Strict-Transport-Security (HSTS)",
      status: isWellKnown ? "pass" : hash % 3 === 0 ? "pass" : "warning",
      description: isWellKnown
        ? "HSTS header present with max-age > 1 year"
        : "HSTS header missing or max-age too short",
    },
    {
      category: "Headers",
      name: "Content-Security-Policy",
      status: isWellKnown ? "pass" : hash % 4 === 0 ? "pass" : "warning",
      description: isWellKnown
        ? "CSP header configured"
        : "Content-Security-Policy header not detected",
    },
    {
      category: "Headers",
      name: "X-Frame-Options",
      status: isWellKnown || hash % 2 === 0 ? "pass" : "warning",
      description: isWellKnown
        ? "X-Frame-Options: DENY — clickjacking protection active"
        : "X-Frame-Options header missing",
    },
    {
      category: "Headers",
      name: "X-Content-Type-Options",
      status: isWellKnown || hash % 3 !== 1 ? "pass" : "fail",
      description: "Prevents MIME type sniffing",
    },
    {
      category: "OWASP",
      name: "SQL Injection Indicators",
      status: hash % 7 === 0 ? "warning" : "pass",
      description: hash % 7 === 0
        ? "Potential SQL injection vectors detected in query parameters"
        : "No obvious SQL injection indicators found",
    },
    {
      category: "OWASP",
      name: "Cross-Site Scripting (XSS)",
      status: isWellKnown ? "pass" : hash % 5 === 0 ? "warning" : "pass",
      description: "Checked for reflected XSS in common input fields",
    },
    {
      category: "OWASP",
      name: "Sensitive Data Exposure",
      status: isHttps ? "pass" : "fail",
      description: isHttps
        ? "Data in transit is encrypted"
        : "Sensitive data may be exposed over unencrypted connection",
    },
    {
      category: "OWASP",
      name: "Security Misconfiguration",
      status: isWellKnown ? "pass" : hash % 4 === 1 ? "warning" : "pass",
      description: "Checked for default configurations and exposed error pages",
    },
    {
      category: "OWASP",
      name: "Server Information Disclosure",
      status: hash % 3 === 2 ? "warning" : "pass",
      description: hash % 3 === 2
        ? "Server header reveals software version"
        : "Server header properly masked",
    },
    {
      category: "Best Practices",
      name: "Cookie Security",
      status: isWellKnown ? "pass" : hash % 2 === 1 ? "warning" : "pass",
      description: "Checked for Secure, HttpOnly, and SameSite cookie flags",
    },
    {
      category: "Best Practices",
      name: "Subresource Integrity",
      status: isWellKnown ? "pass" : hash % 5 !== 0 ? "info" : "warning",
      description: "SRI hashes for external scripts and stylesheets",
    },
  ];

  const passed = checks.filter((c) => c.status === "pass").length;
  const score = Math.round((passed / checks.length) * 100);
  let grade: Grade = "F";
  if (score >= 90) grade = "A";
  else if (score >= 75) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 40) grade = "D";

  return {
    url,
    grade,
    score,
    checks,
    scanTime: new Date().toLocaleString(),
  };
}

export default function SecurityScannerDemo() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanPhase, setScanPhase] = useState("");

  const phases = [
    "Resolving DNS...",
    "Checking SSL/TLS...",
    "Analyzing headers...",
    "Running OWASP checks...",
    "Checking best practices...",
    "Generating report...",
  ];

  const startScan = useCallback(() => {
    let input = url.trim();
    if (!input) return;
    if (!input.startsWith("http")) input = "https://" + input;

    setIsScanning(true);
    setProgress(0);
    setResult(null);
    setScanPhase(phases[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newProgress = Math.min((step / 30) * 100, 100);
      setProgress(newProgress);
      const phaseIndex = Math.min(Math.floor(step / 5), phases.length - 1);
      setScanPhase(phases[phaseIndex]);

      if (step >= 30) {
        clearInterval(interval);
        setIsScanning(false);
        setResult(generateScanResults(input));
      }
    }, 170);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const categoryGroups = result
    ? result.checks.reduce(
        (acc, check) => {
          if (!acc[check.category]) acc[check.category] = [];
          acc[check.category].push(check);
          return acc;
        },
        {} as Record<string, ScanCheck[]>
      )
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/security-scanner"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Security Scanner</h1>
              <p className="text-sm text-muted-foreground">Quick security assessment for any URL</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startScan();
            }}
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to scan (e.g., example.com)"
                disabled={isScanning}
                className="w-full rounded-xl border border-card-border bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!url.trim() || isScanning}
              className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 text-sm font-medium text-white hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scanning
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Scan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Progress */}
        {isScanning && (
          <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">{scanPhase}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <Lock className="h-4 w-4 animate-pulse" />
              Running simulated security checks...
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Grade */}
            <div className={`rounded-2xl border ${gradeBg[result.grade]} p-8 text-center`}>
              <p className="text-sm font-medium text-muted-foreground mb-1">Security Score</p>
              <div className={`text-7xl font-black ${gradeColors[result.grade]}`}>
                {result.grade}
              </div>
              <p className="text-lg font-semibold text-foreground mt-1">{result.score}/100</p>
              <p className="text-xs text-muted-foreground mt-2">
                Scanned {result.url} at {result.scanTime}
              </p>
            </div>

            {/* Summary Bar */}
            <div className="grid grid-cols-4 gap-3">
              {(["pass", "warning", "fail", "info"] as CheckStatus[]).map((status) => {
                const count = result.checks.filter((c) => c.status === status).length;
                const labels: Record<CheckStatus, string> = {
                  pass: "Passed",
                  warning: "Warnings",
                  fail: "Failed",
                  info: "Info",
                };
                return (
                  <div key={status} className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
                    <div className="flex justify-center mb-1">{statusIcons[status]}</div>
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{labels[status]}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Checks */}
            {Object.entries(categoryGroups).map(([category, checks]) => (
              <div key={category} className="rounded-2xl border border-card-border bg-card-bg overflow-hidden">
                <div className="border-b border-card-border bg-muted px-5 py-3">
                  <h3 className="text-sm font-semibold text-foreground">{category}</h3>
                </div>
                <div className="divide-y divide-card-border">
                  {checks.map((check, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3">
                      <div className="mt-0.5 shrink-0">{statusIcons[check.status]}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{check.name}</p>
                        <p className="text-xs text-muted-foreground">{check.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Disclaimer + CTA */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    This is a simulated scan for demonstration purposes
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                    For a comprehensive security assessment with real penetration testing, vulnerability scanning, and compliance checks, contact our security team.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setUrl("");
                }}
                className="rounded-lg border border-card-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Scan Another URL
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-6 py-2.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-700 transition-all"
              >
                Want a real penetration test? Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
