"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Endpoint {
  id: number;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT";
  status: "up" | "down";
  responseTime: number;
  uptime: number;
  lastChecked: Date;
  history: number[]; // last 20 response times
}

function generateHistory(base: number, variance: number, length = 20): number[] {
  return Array.from({ length }, () => Math.max(10, base + Math.round((Math.random() - 0.5) * variance)));
}

const initialEndpoints: Endpoint[] = [
  { id: 1, name: "User API", url: "https://api.example.com/v2/users", method: "GET", status: "up", responseTime: 45, uptime: 99.98, lastChecked: new Date(), history: generateHistory(45, 30) },
  { id: 2, name: "Payment Gateway", url: "https://api.example.com/v2/payments", method: "POST", status: "up", responseTime: 128, uptime: 99.95, lastChecked: new Date(), history: generateHistory(128, 60) },
  { id: 3, name: "Search Service", url: "https://api.example.com/v2/search", method: "GET", status: "up", responseTime: 67, uptime: 99.92, lastChecked: new Date(), history: generateHistory(67, 40) },
  { id: 4, name: "Auth Service", url: "https://api.example.com/v2/auth/token", method: "POST", status: "down", responseTime: 0, uptime: 98.74, lastChecked: new Date(), history: [...generateHistory(89, 50, 15), 0, 0, 0, 0, 0] },
  { id: 5, name: "Webhook Relay", url: "https://api.example.com/v2/webhooks", method: "PUT", status: "up", responseTime: 203, uptime: 99.87, lastChecked: new Date(), history: generateHistory(203, 80) },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const h = 24;
  const w = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-6" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export default function APIMonitorDemo() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints);
  const [showAlertConfig, setShowAlertConfig] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertThreshold, setAlertThreshold] = useState("500");
  const [countdown, setCountdown] = useState(5);

  const refreshData = useCallback(() => {
    setEndpoints((prev) =>
      prev.map((ep) => {
        if (ep.status === "down" && Math.random() > 0.7) {
          const newTime = Math.round(ep.history[0] * (0.8 + Math.random() * 0.4));
          return {
            ...ep,
            status: "up" as const,
            responseTime: newTime,
            lastChecked: new Date(),
            history: [...ep.history.slice(1), newTime],
          };
        }
        if (ep.status === "up") {
          const jitter = Math.round((Math.random() - 0.5) * 40);
          const newTime = Math.max(10, ep.responseTime + jitter);
          const goDown = Math.random() > 0.95;
          return {
            ...ep,
            status: goDown ? "down" as const : "up" as const,
            responseTime: goDown ? 0 : newTime,
            lastChecked: new Date(),
            history: [...ep.history.slice(1), goDown ? 0 : newTime],
          };
        }
        return { ...ep, lastChecked: new Date() };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          refreshData();
          return 5;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const allUp = endpoints.every((e) => e.status === "up");
  const downCount = endpoints.filter((e) => e.status === "down").length;
  const avgResponse = Math.round(endpoints.filter((e) => e.status === "up").reduce((s, e) => s + e.responseTime, 0) / Math.max(endpoints.filter((e) => e.status === "up").length, 1));
  const avgUptime = (endpoints.reduce((s, e) => s + e.uptime, 0) / endpoints.length).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/api-monitor" className="text-slate-400 hover:text-white text-sm mb-2 inline-block">&larr; Back to API Monitor</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">API Monitor Dashboard</h1>
              <p className="text-slate-400 mt-1">Real-time endpoint monitoring and alerting</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${allUp ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse"}`} />
                <span className={`text-sm font-medium ${allUp ? "text-green-400" : "text-red-400"}`}>
                  {allUp ? "All Systems Operational" : `${downCount} Service${downCount > 1 ? "s" : ""} Down`}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Refreshing in {countdown}s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Endpoints", value: endpoints.length.toString(), color: "text-blue-400" },
            { label: "Avg Response", value: `${avgResponse}ms`, color: "text-green-400" },
            { label: "Avg Uptime", value: `${avgUptime}%`, color: "text-purple-400" },
            { label: "Incidents (24h)", value: downCount.toString(), color: downCount > 0 ? "text-red-400" : "text-green-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <p className="text-sm text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Endpoints Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Endpoint</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Method</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Response Time</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Trend</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Uptime</th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-slate-400 uppercase">Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep) => (
                  <tr key={ep.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${ep.status === "up" ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse"}`} />
                        <span className={`text-xs font-medium uppercase ${ep.status === "up" ? "text-green-400" : "text-red-400"}`}>{ep.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-white">{ep.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{ep.url}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        ep.method === "GET" ? "bg-green-900/50 text-green-400" :
                        ep.method === "POST" ? "bg-blue-900/50 text-blue-400" :
                        "bg-yellow-900/50 text-yellow-400"
                      }`}>{ep.method}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-mono ${
                        ep.status === "down" ? "text-red-400" :
                        ep.responseTime < 100 ? "text-green-400" :
                        ep.responseTime < 200 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {ep.status === "down" ? "---" : `${ep.responseTime}ms`}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Sparkline
                        data={ep.history}
                        color={ep.status === "down" ? "#f87171" : ep.responseTime < 100 ? "#4ade80" : "#facc15"}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${ep.uptime >= 99.9 ? "text-green-400" : ep.uptime >= 99 ? "text-yellow-400" : "text-red-400"}`}>
                        {ep.uptime}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {ep.lastChecked.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Configuration */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Alert Configuration</h2>
            <button
              onClick={() => setShowAlertConfig(!showAlertConfig)}
              className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg transition-colors"
            >
              {showAlertConfig ? "Close" : "Configure Alerts"}
            </button>
          </div>
          {showAlertConfig && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Alert Email</label>
                <input
                  type="email"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  placeholder="team@company.com"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Response Time Threshold (ms)</label>
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Monitor your APIs for free</h2>
          <p className="text-blue-100 mb-6">Get started with 5 endpoints free. Upgrade for unlimited monitoring, custom alerting, and team dashboards.</p>
          <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Start Free Monitoring
          </Link>
        </div>
      </div>
    </div>
  );
}
