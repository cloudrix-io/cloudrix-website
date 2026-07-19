"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Endpoint {
  id: number;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  status: "up" | "degraded" | "down";
  responseTime: number;
  uptime: number;
  lastChecked: Date;
  history: number[];
  region: string;
  p95: number;
  p99: number;
}

function generateHistory(base: number, variance: number, length = 30): number[] {
  return Array.from({ length }, () => Math.max(10, base + Math.round((Math.random() - 0.5) * variance)));
}

const initialEndpoints: Endpoint[] = [
  { id: 1, name: "User API", url: "https://api.example.com/v2/users", method: "GET", status: "up", responseTime: 45, uptime: 99.99, lastChecked: new Date(), history: generateHistory(45, 30), region: "us-east-1", p95: 67, p99: 89 },
  { id: 2, name: "Payment Gateway", url: "https://api.example.com/v2/payments", method: "POST", status: "up", responseTime: 128, uptime: 99.95, lastChecked: new Date(), history: generateHistory(128, 60), region: "eu-west-1", p95: 189, p99: 245 },
  { id: 3, name: "Search Service", url: "https://api.example.com/v2/search", method: "GET", status: "degraded", responseTime: 487, uptime: 99.72, lastChecked: new Date(), history: [...generateHistory(67, 40, 20), ...generateHistory(350, 200, 10)], region: "us-west-2", p95: 520, p99: 890 },
  { id: 4, name: "Auth Service", url: "https://api.example.com/v2/auth/token", method: "POST", status: "up", responseTime: 89, uptime: 99.98, lastChecked: new Date(), history: generateHistory(89, 50), region: "us-east-1", p95: 112, p99: 156 },
  { id: 5, name: "Webhook Relay", url: "https://api.example.com/v2/webhooks", method: "PUT", status: "up", responseTime: 203, uptime: 99.87, lastChecked: new Date(), history: generateHistory(203, 80), region: "ap-southeast-1", p95: 298, p99: 412 },
  { id: 6, name: "File Upload", url: "https://api.example.com/v2/files/upload", method: "POST", status: "up", responseTime: 312, uptime: 99.91, lastChecked: new Date(), history: generateHistory(312, 120), region: "eu-west-1", p95: 445, p99: 580 },
  { id: 7, name: "Analytics Events", url: "https://api.example.com/v2/events", method: "POST", status: "down", responseTime: 0, uptime: 98.45, lastChecked: new Date(), history: [...generateHistory(156, 70, 22), 0, 0, 0, 0, 0, 0, 0, 0], region: "us-east-1", p95: 0, p99: 0 },
];

interface Alert {
  id: number;
  type: "error" | "warning" | "recovery";
  endpoint: string;
  message: string;
  time: string;
}

const initialAlerts: Alert[] = [
  { id: 1, type: "error", endpoint: "Analytics Events", message: "Endpoint returned HTTP 503 - Service Unavailable", time: "2 min ago" },
  { id: 2, type: "error", endpoint: "Analytics Events", message: "5 consecutive failures detected", time: "4 min ago" },
  { id: 3, type: "warning", endpoint: "Search Service", message: "Response time exceeded 400ms threshold (487ms)", time: "8 min ago" },
  { id: 4, type: "warning", endpoint: "Search Service", message: "P99 latency spike detected: 890ms", time: "12 min ago" },
  { id: 5, type: "recovery", endpoint: "Payment Gateway", message: "Endpoint recovered after 2 min downtime", time: "1 hour ago" },
];

function Sparkline({ data, color, height = 32 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data, 1);
  const w = 140;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - (v / max) * height;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,${height} ${points} ${w},${height}`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <polygon points={areaPoints} fill={color} fillOpacity="0.1" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function ResponseTimeChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(...data, 1);
  const h = 120;
  const w = 100;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-300">{label}</p>
        <p className="text-xs text-slate-500">Last 30 checks</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 120 }} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(pct => (
          <line key={pct} x1="0" y1={h - (pct / 100) * h} x2={w} y2={h - (pct / 100) * h} stroke="#334155" strokeWidth="0.5" />
        ))}
        {/* Bars */}
        {data.map((v, i) => {
          const barW = (w / data.length) * 0.7;
          const barH = (v / max) * (h - 10);
          const x = (i / data.length) * w + (w / data.length) * 0.15;
          const color = v === 0 ? "#ef4444" : v > max * 0.7 ? "#f59e0b" : "#22c55e";
          return (
            <rect key={i} x={x} y={h - barH} width={barW} height={barH} fill={color} rx="1" opacity="0.8" />
          );
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
        <span>30 checks ago</span>
        <span>Now</span>
      </div>
    </div>
  );
}

export default function APIMonitorDemo() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [showAlertConfig, setShowAlertConfig] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertThreshold, setAlertThreshold] = useState("500");
  const [countdown, setCountdown] = useState(5);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const refreshData = useCallback(() => {
    setEndpoints((prev) =>
      prev.map((ep) => {
        if (ep.status === "down" && Math.random() > 0.8) {
          const newTime = Math.round(Math.max(50, ep.history.filter(h => h > 0)[0] || 100) * (0.8 + Math.random() * 0.4));
          return { ...ep, status: "up" as const, responseTime: newTime, lastChecked: new Date(), history: [...ep.history.slice(1), newTime], p95: newTime + 30, p99: newTime + 60 };
        }
        if (ep.status === "degraded") {
          const recovery = Math.random() > 0.6;
          const newTime = recovery ? Math.round(80 + Math.random() * 60) : Math.round(300 + Math.random() * 300);
          return { ...ep, status: recovery ? "up" as const : "degraded" as const, responseTime: newTime, lastChecked: new Date(), history: [...ep.history.slice(1), newTime], p95: newTime + 40, p99: newTime + 80 };
        }
        if (ep.status === "up") {
          const jitter = Math.round((Math.random() - 0.5) * 40);
          const newTime = Math.max(10, ep.responseTime + jitter);
          const goDown = Math.random() > 0.97;
          const goDegraded = Math.random() > 0.95;
          const newStatus = goDown ? "down" as const : goDegraded ? "degraded" as const : "up" as const;
          return { ...ep, status: newStatus, responseTime: goDown ? 0 : newTime, lastChecked: new Date(), history: [...ep.history.slice(1), goDown ? 0 : newTime], p95: goDown ? 0 : newTime + 30, p99: goDown ? 0 : newTime + 60 };
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

  const upCount = endpoints.filter((e) => e.status === "up").length;
  const degradedCount = endpoints.filter((e) => e.status === "degraded").length;
  const downCount = endpoints.filter((e) => e.status === "down").length;
  const avgResponse = Math.round(endpoints.filter((e) => e.status === "up").reduce((s, e) => s + e.responseTime, 0) / Math.max(endpoints.filter((e) => e.status === "up").length, 1));
  const avgUptime = (endpoints.reduce((s, e) => s + e.uptime, 0) / endpoints.length).toFixed(2);
  const activeAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id));

  const statusLabel = downCount > 0 ? "Service Outage" : degradedCount > 0 ? "Degraded Performance" : "All Systems Operational";
  const statusColor = downCount > 0 ? "text-red-400" : degradedCount > 0 ? "text-amber-400" : "text-green-400";
  const statusDot = downCount > 0 ? "bg-red-500" : degradedCount > 0 ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/products/api-monitor" className="text-slate-400 hover:text-white text-sm mb-2 inline-block">&larr; Back to API Monitor</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">API Monitor Dashboard</h1>
              <p className="text-slate-400 mt-1">Real-time endpoint monitoring, alerting, and performance analytics</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusDot} animate-pulse`} />
                <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Refreshing in {countdown}s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Alert Banner */}
        {activeAlerts.filter(a => a.type === "error").length > 0 && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-red-400 text-lg flex-shrink-0 mt-0.5">&#9888;</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-300">Active Incident</p>
              <p className="text-xs text-red-400 mt-1">{activeAlerts.filter(a => a.type === "error")[0].endpoint}: {activeAlerts.filter(a => a.type === "error")[0].message}</p>
            </div>
            <button
              onClick={() => setDismissedAlerts([...dismissedAlerts, ...activeAlerts.filter(a => a.type === "error").map(a => a.id)])}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Endpoints", value: endpoints.length.toString(), color: "text-blue-400", sub: `${upCount} up` },
            { label: "Avg Response", value: `${avgResponse}ms`, color: avgResponse < 200 ? "text-green-400" : "text-amber-400", sub: "across healthy" },
            { label: "Avg Uptime", value: `${avgUptime}%`, color: "text-purple-400", sub: "all endpoints" },
            { label: "Degraded", value: degradedCount.toString(), color: degradedCount > 0 ? "text-amber-400" : "text-green-400", sub: "slow response" },
            { label: "Down", value: downCount.toString(), color: downCount > 0 ? "text-red-400" : "text-green-400", sub: "unreachable" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] text-slate-500 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Main - Endpoints */}
          <div className="flex-1 min-w-0">
            {/* Endpoints Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Endpoint</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Method</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Response</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Trend</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Uptime</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((ep) => {
                      const statusDotColor = ep.status === "up" ? "bg-green-500" : ep.status === "degraded" ? "bg-amber-500" : "bg-red-500";
                      const statusTextColor = ep.status === "up" ? "text-green-400" : ep.status === "degraded" ? "text-amber-400" : "text-red-400";
                      const sparkColor = ep.status === "down" ? "#ef4444" : ep.status === "degraded" ? "#f59e0b" : ep.responseTime < 150 ? "#4ade80" : "#facc15";
                      return (
                        <tr
                          key={ep.id}
                          className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer ${selectedEndpoint?.id === ep.id ? "bg-slate-700/40" : ""}`}
                          onClick={() => setSelectedEndpoint(ep)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${statusDotColor} ${ep.status !== "up" ? "animate-pulse" : ""}`} />
                              <span className={`text-xs font-medium uppercase ${statusTextColor}`}>{ep.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-white">{ep.name}</p>
                            <p className="text-xs text-slate-500 font-mono">{ep.url}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-mono px-2 py-1 rounded ${
                              ep.method === "GET" ? "bg-green-900/50 text-green-400" :
                              ep.method === "POST" ? "bg-blue-900/50 text-blue-400" :
                              ep.method === "DELETE" ? "bg-red-900/50 text-red-400" :
                              "bg-yellow-900/50 text-yellow-400"
                            }`}>{ep.method}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-mono ${
                              ep.status === "down" ? "text-red-400" :
                              ep.responseTime < 150 ? "text-green-400" :
                              ep.responseTime < 300 ? "text-yellow-400" : "text-red-400"
                            }`}>
                              {ep.status === "down" ? "---" : `${ep.responseTime}ms`}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-28">
                              <Sparkline data={ep.history} color={sparkColor} height={24} />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-medium ${ep.uptime >= 99.9 ? "text-green-400" : ep.uptime >= 99 ? "text-yellow-400" : "text-red-400"}`}>
                              {ep.uptime}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-400 font-mono">{ep.region}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Endpoint Detail */}
            {selectedEndpoint && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ResponseTimeChart data={selectedEndpoint.history} label={`${selectedEndpoint.name} - Response Time`} />
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                  <p className="text-sm font-medium text-slate-300 mb-4">{selectedEndpoint.name} - Latency Percentiles</p>
                  <div className="space-y-4">
                    {[
                      { label: "Median", value: selectedEndpoint.responseTime, max: 500 },
                      { label: "P95", value: selectedEndpoint.p95, max: 500 },
                      { label: "P99", value: selectedEndpoint.p99, max: 1000 },
                    ].map(p => (
                      <div key={p.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{p.label}</span>
                          <span className={`font-mono ${p.value === 0 ? "text-red-400" : p.value < 200 ? "text-green-400" : p.value < 400 ? "text-yellow-400" : "text-red-400"}`}>
                            {p.value === 0 ? "N/A" : `${p.value}ms`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${p.value === 0 ? "bg-red-500" : p.value < 200 ? "bg-green-500" : p.value < 400 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min((p.value / p.max) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">Region</span>
                      <p className="text-slate-300 font-mono mt-1">{selectedEndpoint.region}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Last Checked</span>
                      <p className="text-slate-300 font-mono mt-1">{selectedEndpoint.lastChecked.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Alerts */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="bg-slate-800 rounded-xl border border-slate-700 sticky top-6">
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
                  <span className="text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full">{activeAlerts.length}</span>
                </div>
              </div>
              <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto">
                {activeAlerts.map((alert) => {
                  const iconColor = alert.type === "error" ? "text-red-400" : alert.type === "warning" ? "text-amber-400" : "text-green-400";
                  const icon = alert.type === "error" ? "\u2716" : alert.type === "warning" ? "\u26A0" : "\u2714";
                  return (
                    <div key={alert.id} className="p-3 hover:bg-slate-700/30 transition-colors">
                      <div className="flex items-start gap-2">
                        <span className={`${iconColor} text-xs mt-0.5 flex-shrink-0`}>{icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-300">{alert.endpoint}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{alert.message}</p>
                          <p className="text-[10px] text-slate-600 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 border-t border-slate-700">
                <button
                  onClick={() => setShowAlertConfig(!showAlertConfig)}
                  className="w-full text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Configure Alerts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Configuration */}
        {showAlertConfig && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Alert Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <label className="block text-xs text-slate-400 mb-1">Response Threshold (ms)</label>
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Alert Channels</label>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-blue-900/50 text-blue-400 px-2.5 py-1.5 rounded-lg border border-blue-800">Email</span>
                  <span className="text-xs bg-slate-700 text-slate-400 px-2.5 py-1.5 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-500">Slack</span>
                  <span className="text-xs bg-slate-700 text-slate-400 px-2.5 py-1.5 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-500">PagerDuty</span>
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center mt-6">
          <h2 className="text-2xl font-bold mb-2">Monitor your APIs with confidence</h2>
          <p className="text-blue-100 mb-6">Get started with 5 endpoints free. Upgrade for unlimited monitoring, multi-region checks, and team dashboards.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/products/api-monitor" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Try Free
            </Link>
            <Link href="/products/api-monitor#pricing" className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
