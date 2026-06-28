"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Metric {
  name: string;
  abbreviation: string;
  value: number;
  unit: string;
  rating: "good" | "needs-improvement" | "poor";
  benchmark: number;
  description: string;
}

interface Recommendation {
  title: string;
  impact: "high" | "medium" | "low";
  description: string;
}

function generateMetrics(): Metric[] {
  const lcp = 1200 + Math.random() * 3000;
  const fid = 20 + Math.random() * 280;
  const cls = Math.random() * 0.5;
  const inp = 50 + Math.random() * 450;
  const ttfb = 100 + Math.random() * 700;

  function rate(val: number, good: number, poor: number): "good" | "needs-improvement" | "poor" {
    if (val <= good) return "good";
    if (val <= poor) return "needs-improvement";
    return "poor";
  }

  return [
    {
      name: "Largest Contentful Paint",
      abbreviation: "LCP",
      value: Math.round(lcp),
      unit: "ms",
      rating: rate(lcp, 2500, 4000),
      benchmark: 2500,
      description: "Measures loading performance. LCP should occur within 2.5 seconds of page load.",
    },
    {
      name: "First Input Delay",
      abbreviation: "FID",
      value: Math.round(fid),
      unit: "ms",
      rating: rate(fid, 100, 300),
      benchmark: 100,
      description: "Measures interactivity. Pages should have an FID of 100 milliseconds or less.",
    },
    {
      name: "Cumulative Layout Shift",
      abbreviation: "CLS",
      value: parseFloat(cls.toFixed(3)),
      unit: "",
      rating: rate(cls, 0.1, 0.25),
      benchmark: 0.1,
      description: "Measures visual stability. Pages should maintain a CLS of 0.1 or less.",
    },
    {
      name: "Interaction to Next Paint",
      abbreviation: "INP",
      value: Math.round(inp),
      unit: "ms",
      rating: rate(inp, 200, 500),
      benchmark: 200,
      description: "Measures responsiveness. INP should be 200 milliseconds or less.",
    },
    {
      name: "Time to First Byte",
      abbreviation: "TTFB",
      value: Math.round(ttfb),
      unit: "ms",
      rating: rate(ttfb, 200, 600),
      benchmark: 200,
      description: "Measures server response time. TTFB should be 200 milliseconds or less.",
    },
  ];
}

function generateRecommendations(metrics: Metric[]): Recommendation[] {
  const recs: Recommendation[] = [];

  const lcp = metrics.find((m) => m.abbreviation === "LCP");
  if (lcp && lcp.rating !== "good") {
    recs.push(
      { title: "Optimize largest image/video", impact: "high", description: "Compress and serve your LCP element in modern formats (WebP/AVIF). Use responsive images with srcset and preload the LCP image." },
      { title: "Implement server-side rendering", impact: "high", description: "Use SSR or static generation to reduce client-side rendering time and deliver content faster." },
    );
  }

  const fid = metrics.find((m) => m.abbreviation === "FID");
  if (fid && fid.rating !== "good") {
    recs.push(
      { title: "Break up long tasks", impact: "high", description: "Split JavaScript execution into smaller tasks using requestIdleCallback or web workers to reduce main thread blocking." },
      { title: "Reduce JavaScript bundle size", impact: "medium", description: "Use code splitting, tree shaking, and dynamic imports to reduce the amount of JavaScript parsed on page load." },
    );
  }

  const cls = metrics.find((m) => m.abbreviation === "CLS");
  if (cls && cls.rating !== "good") {
    recs.push(
      { title: "Set explicit dimensions on media", impact: "high", description: "Always include width and height attributes on images and videos to reserve space before loading." },
      { title: "Avoid inserting content above existing content", impact: "medium", description: "Reserve space for dynamic content like ads, banners, and cookie notices to prevent layout shifts." },
    );
  }

  const inp = metrics.find((m) => m.abbreviation === "INP");
  if (inp && inp.rating !== "good") {
    recs.push(
      { title: "Optimize event handlers", impact: "high", description: "Debounce input handlers, use CSS transitions instead of JavaScript animations, and avoid synchronous layout operations in callbacks." },
    );
  }

  const ttfb = metrics.find((m) => m.abbreviation === "TTFB");
  if (ttfb && ttfb.rating !== "good") {
    recs.push(
      { title: "Use a CDN", impact: "high", description: "Deploy a Content Delivery Network to serve content from edge locations closer to your users." },
      { title: "Optimize server response time", impact: "medium", description: "Review database queries, implement caching (Redis/Memcached), and optimize API response payloads." },
    );
  }

  if (recs.length === 0) {
    recs.push(
      { title: "Enable HTTP/3", impact: "low", description: "Upgrade to HTTP/3 for even faster connection establishment and improved performance on unreliable networks." },
      { title: "Implement resource hints", impact: "low", description: "Use dns-prefetch, preconnect, and prefetch for critical third-party resources." },
    );
  }

  return recs;
}

const ratingConfig = {
  good: { label: "Good", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-100" },
  "needs-improvement": { label: "Needs Improvement", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-100" },
  poor: { label: "Poor", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-100" },
};

const impactColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-blue-100 text-blue-700",
};

export default function PerfProfilerDemo() {
  const [url, setUrl] = useState("https://example.com");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  useEffect(() => {
    if (progress >= 100 && analyzing) {
      const m = generateMetrics();
      setMetrics(m);
      setRecommendations(generateRecommendations(m));
      const goodCount = m.filter((x) => x.rating === "good").length;
      const niCount = m.filter((x) => x.rating === "needs-improvement").length;
      setOverallScore(Math.round((goodCount * 20 + niCount * 10) + Math.random() * 10));
      setAnalyzing(false);
    }
  }, [progress, analyzing]);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    setProgress(0);
    setMetrics(null);
    setRecommendations([]);
  };

  const scoreColor = overallScore >= 90 ? "text-green-500" : overallScore >= 50 ? "text-yellow-500" : "text-red-500";
  const scoreStroke = overallScore >= 90 ? "#22c55e" : overallScore >= 50 ? "#eab308" : "#ef4444";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/performance-profiler" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to PerfProfiler</Link>
          <h1 className="text-3xl font-bold">Performance Profiler</h1>
          <p className="text-orange-100 mt-1">Analyze Core Web Vitals and get actionable performance recommendations</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">Enter URL to analyze</label>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yoursite.com"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
            />
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !url.trim()}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-50 shadow-lg shadow-orange-200"
            >
              {analyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {/* Progress */}
        {analyzing && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
            <div className="text-center mb-4">
              <svg className="animate-spin h-10 w-10 text-orange-500 mx-auto mb-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              <p className="text-slate-700 font-medium">Analyzing {url}...</p>
              <p className="text-sm text-slate-500 mt-1">Measuring Core Web Vitals and performance metrics</p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">{Math.round(Math.min(progress, 100))}%</p>
          </div>
        )}

        {/* Results */}
        {metrics && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-500 mb-3">Overall Performance Score</p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={scoreStroke}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 100) * 327} 327`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <span className={`absolute text-4xl font-bold ${scoreColor}`}>{overallScore}</span>
              </div>
              <p className="text-sm text-slate-500 mt-3">{url}</p>
            </div>

            {/* Core Web Vitals */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Core Web Vitals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric) => {
                  const config = ratingConfig[metric.rating];
                  return (
                    <div key={metric.abbreviation} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-500">{metric.abbreviation}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bgColor} ${config.textColor}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className={`text-2xl font-bold ${config.textColor}`}>
                        {metric.value}{metric.unit}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{metric.name}</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>0</span>
                          <span>Benchmark: {metric.benchmark}{metric.unit}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 relative">
                          <div
                            className={`${config.color} h-full rounded-full transition-all duration-700`}
                            style={{ width: `${Math.min((metric.value / (metric.benchmark * 3)) * 100, 100)}%` }}
                          />
                          <div
                            className="absolute top-0 w-0.5 h-full bg-slate-400"
                            style={{ left: `${(1/3) * 100}%` }}
                            title={`Benchmark: ${metric.benchmark}${metric.unit}`}
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">{metric.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industry Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Industry Benchmarks</h2>
              <div className="space-y-3">
                {metrics.map((metric) => {
                  const config = ratingConfig[metric.rating];
                  const pct = Math.min((metric.value / (metric.benchmark * 3)) * 100, 100);
                  const benchPct = (1/3) * 100;
                  return (
                    <div key={metric.abbreviation} className="flex items-center gap-4">
                      <span className="text-sm font-medium text-slate-600 w-12">{metric.abbreviation}</span>
                      <div className="flex-1 relative">
                        <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden">
                          <div
                            className={`${config.color} h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          >
                            <span className="text-[10px] text-white font-medium">{metric.value}{metric.unit}</span>
                          </div>
                        </div>
                        <div className="absolute top-0 h-full flex items-center" style={{ left: `${benchPct}%` }}>
                          <div className="w-0.5 h-full bg-slate-400" />
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 w-20 text-right">Target: {metric.benchmark}{metric.unit}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactColors[rec.impact]}`}>
                        {rec.impact} impact
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-analyze */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Re-analyze this URL
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Want expert performance optimization?</h2>
          <p className="text-orange-100 mb-6">Our performance engineers can audit your site, implement optimizations, and deliver measurable improvements to your Core Web Vitals.</p>
          <Link href="/contact" className="inline-block bg-white text-orange-700 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
