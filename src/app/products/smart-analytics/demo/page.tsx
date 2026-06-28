"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const data = {
  revenue: [42000, 48000, 51000, 47000, 55000, 62000, 58000, 71000, 75000, 82000, 88000, 95000],
  users: [1200, 1350, 1480, 1520, 1690, 1820, 1950, 2100, 2350, 2600, 2850, 3100],
  conversions: [3.2, 3.5, 3.1, 3.8, 4.0, 4.2, 3.9, 4.5, 4.8, 5.1, 5.3, 5.6],
  regions: { "North America": 42, "Europe": 28, "Asia Pacific": 18, "Latin America": 8, "Middle East": 4 },
  channels: { "Organic Search": 35, "Direct": 25, "Social Media": 20, "Email": 12, "Referral": 8 },
  products: { "Enterprise Plan": 45, "Pro Plan": 30, "Starter Plan": 15, "Add-ons": 10 },
};

const queries: Record<string, { title: string; chartType: "bar" | "horizontal" | "line"; dataKey: string }> = {
  revenue: { title: "Revenue by Month", chartType: "bar", dataKey: "revenue" },
  users: { title: "Users by Month", chartType: "line", dataKey: "users" },
  conversions: { title: "Conversion Rate by Month (%)", chartType: "line", dataKey: "conversions" },
  region: { title: "Revenue by Region (%)", chartType: "horizontal", dataKey: "regions" },
  channel: { title: "Traffic by Channel (%)", chartType: "horizontal", dataKey: "channels" },
  product: { title: "Revenue by Product (%)", chartType: "horizontal", dataKey: "products" },
};

function matchQuery(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("revenue") && (q.includes("region") || q.includes("country") || q.includes("geo"))) return "region";
  if (q.includes("revenue") || q.includes("sales") || q.includes("income") || q.includes("money")) return "revenue";
  if (q.includes("user") || q.includes("visitor") || q.includes("traffic") || q.includes("customer")) {
    if (q.includes("channel") || q.includes("source") || q.includes("where")) return "channel";
    return "users";
  }
  if (q.includes("conversion") || q.includes("convert") || q.includes("rate")) return "conversions";
  if (q.includes("channel") || q.includes("source") || q.includes("acquisition")) return "channel";
  if (q.includes("product") || q.includes("plan") || q.includes("subscription")) return "product";
  if (q.includes("region") || q.includes("country") || q.includes("geo") || q.includes("location")) return "region";
  return "revenue";
}

function BarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-2 h-52">
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-slate-500">{v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}</span>
          <div
            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
            style={{ height: `${(v / max) * 180}px` }}
          />
          <span className="text-[10px] text-slate-500">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ values, labels }: { values: number[]; labels: string[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const h = 180;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = h - ((v - min) / range) * h;
    return { x, y, v };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative h-52">
      <svg viewBox={`-5 -10 110 ${h + 20}`} className="w-full h-full" preserveAspectRatio="none">
        <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {labels.map((l) => (
          <span key={l} className="text-[10px] text-slate-500">{l}</span>
        ))}
      </div>
    </div>
  );
}

function HorizontalChart({ data: chartData }: { data: Record<string, number> }) {
  const max = Math.max(...Object.values(chartData));
  const colors = ["bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-cyan-500"];
  return (
    <div className="space-y-3">
      {Object.entries(chartData).map(([label, value], i) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-sm text-slate-600 w-36 truncate">{label}</span>
          <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
            <div
              className={`${colors[i % colors.length]} h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500`}
              style={{ width: `${(value / max) * 100}%` }}
            >
              <span className="text-xs font-medium text-white">{value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InsightAIDemo() {
  const [query, setQuery] = useState("");
  const [activeChart, setActiveChart] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const kpis = [
    { label: "Total Revenue", value: "$773K", change: "+18.2%", positive: true },
    { label: "Active Users", value: "3,100", change: "+22.5%", positive: true },
    { label: "Avg Conversion", value: "4.2%", change: "+0.8%", positive: true },
    { label: "Avg Order Value", value: "$249", change: "-2.1%", positive: false },
  ];

  const handleQuery = () => {
    if (!query.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setActiveChart(matchQuery(query));
      setSearching(false);
    }, 1200);
  };

  const chartConfig = activeChart ? queries[activeChart] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/smart-analytics" className="text-violet-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to InsightAI</Link>
          <h1 className="text-3xl font-bold">InsightAI Analytics Dashboard</h1>
          <p className="text-violet-100 mt-1">Ask questions about your data in natural language</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{kpi.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</p>
              <p className={`text-sm mt-1 ${kpi.positive ? "text-green-600" : "text-red-600"}`}>
                {kpi.change} vs last year
              </p>
            </div>
          ))}
        </div>

        {/* Natural Language Query */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Ask Your Data</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuery()}
              placeholder="e.g., Show me revenue by region, What are my top channels?, How are conversions trending?"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-sm"
            />
            <button
              onClick={handleQuery}
              disabled={searching || !query.trim()}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {searching ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              ) : "Query"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Show me revenue by month", "How are users growing?", "Revenue by region", "Traffic by channel", "Conversion rate trend", "Revenue by product"].map((q) => (
              <button
                key={q}
                onClick={() => { setQuery(q); setTimeout(() => { setSearching(true); setTimeout(() => { setActiveChart(matchQuery(q)); setSearching(false); }, 1000); }, 100); }}
                className="text-xs bg-violet-50 text-violet-600 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Query Result */}
        {chartConfig && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{chartConfig.title}</h3>
            {chartConfig.chartType === "bar" && (
              <BarChart values={data[chartConfig.dataKey as keyof typeof data] as number[]} labels={months} />
            )}
            {chartConfig.chartType === "line" && (
              <LineChart values={data[chartConfig.dataKey as keyof typeof data] as number[]} labels={months} />
            )}
            {chartConfig.chartType === "horizontal" && (
              <HorizontalChart data={data[chartConfig.dataKey as keyof typeof data] as Record<string, number>} />
            )}
          </div>
        )}

        {/* Default Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Revenue</h3>
            <BarChart values={data.revenue} labels={months} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">User Growth</h3>
            <LineChart values={data.users} labels={months} />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want AI analytics for your data?</h2>
          <p className="text-violet-100 mb-6">Connect your data sources and ask questions in plain English. Get instant insights, automated reports, and predictive analytics.</p>
          <Link href="/contact" className="inline-block bg-white text-violet-700 font-semibold px-8 py-3 rounded-lg hover:bg-violet-50 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
