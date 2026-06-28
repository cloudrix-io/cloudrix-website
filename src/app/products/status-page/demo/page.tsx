"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type ServiceStatus = "operational" | "degraded" | "outage";

interface Service {
  name: string;
  status: ServiceStatus;
  uptimeHistory: ServiceStatus[]; // 90 days
}

function generateUptimeHistory(status: ServiceStatus): ServiceStatus[] {
  const history: ServiceStatus[] = [];
  for (let i = 0; i < 90; i++) {
    if (status === "outage" && i >= 87) {
      history.push("outage");
    } else if (status === "degraded" && i >= 85) {
      history.push(i >= 88 ? "degraded" : "operational");
    } else {
      const r = Math.random();
      if (r > 0.97) history.push("degraded");
      else if (r > 0.995) history.push("outage");
      else history.push("operational");
    }
  }
  return history;
}

const initialServices: Service[] = [
  { name: "Web Application", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "API Gateway", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Database Cluster", status: "degraded", uptimeHistory: generateUptimeHistory("degraded") },
  { name: "CDN / Static Assets", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Email Service", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Background Workers", status: "outage", uptimeHistory: generateUptimeHistory("outage") },
];

const incidents = [
  {
    date: "June 26, 2026",
    title: "Background Workers - Service Outage",
    status: "investigating" as const,
    updates: [
      { time: "14:30 UTC", text: "We are investigating reports of failed background job processing. Some async operations may be delayed." },
      { time: "14:15 UTC", text: "We have identified increased error rates in the background worker service." },
    ],
  },
  {
    date: "June 25, 2026",
    title: "Database Cluster - Elevated Latency",
    status: "monitoring" as const,
    updates: [
      { time: "18:00 UTC", text: "Database latency has returned to normal levels. We are continuing to monitor." },
      { time: "16:45 UTC", text: "We have identified the root cause as a misconfigured connection pool and are deploying a fix." },
      { time: "15:30 UTC", text: "We are seeing elevated database query latency affecting some dashboard operations." },
    ],
  },
  {
    date: "June 20, 2026",
    title: "API Gateway - Intermittent 503 Errors",
    status: "resolved" as const,
    updates: [
      { time: "11:00 UTC", text: "Issue has been fully resolved. Root cause was a memory leak in the rate limiting middleware. A patch has been deployed." },
      { time: "09:30 UTC", text: "We have deployed a hotfix and are monitoring results." },
      { time: "08:45 UTC", text: "Some API requests are returning 503 errors. We are investigating." },
    ],
  },
];

const statusConfig = {
  operational: { label: "Operational", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  degraded: { label: "Degraded Performance", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  outage: { label: "Major Outage", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
};

const incidentStatusConfig = {
  investigating: { label: "Investigating", color: "bg-red-100 text-red-700" },
  monitoring: { label: "Monitoring", color: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700" },
};

export default function StatusPageDemo() {
  const [companyName, setCompanyName] = useState("Acme Cloud Services");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [services] = useState<Service[]>(initialServices);

  const overallStatus = useMemo(() => {
    if (services.some((s) => s.status === "outage")) return "outage";
    if (services.some((s) => s.status === "degraded")) return "degraded";
    return "operational";
  }, [services]);

  const overallConfig = statusConfig[overallStatus];

  const handleSubscribe = () => {
    if (subscribeEmail.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/products/status-page" className="text-slate-400 hover:text-slate-600 text-sm">&larr; Back to StatusPage product</Link>
        </div>
      </div>

      {/* Company Name Input */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm text-slate-500 shrink-0">Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
          />
        </div>
      </div>

      {/* Status Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">{companyName}</h1>
          <p className="text-slate-500 mt-1">System Status</p>
        </div>

        {/* Overall Status Banner */}
        <div className={`${overallConfig.bgColor} ${overallConfig.borderColor} border rounded-xl p-5 mb-8 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${overallConfig.color} ${overallStatus !== "operational" ? "animate-pulse" : ""}`} />
            <span className={`text-lg font-semibold ${overallConfig.textColor}`}>
              {overallStatus === "operational" ? "All Systems Operational" :
               overallStatus === "degraded" ? "Some Systems Experiencing Issues" :
               "Major System Outage"}
            </span>
          </div>
          <span className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>

        {/* Services */}
        <div className="space-y-1 mb-8">
          {services.map((service) => {
            const config = statusConfig[service.status];
            return (
              <div key={service.name} className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${config.color} ${service.status !== "operational" ? "animate-pulse" : ""}`} />
                  <span className="text-sm font-medium text-slate-700">{service.name}</span>
                </div>
                <span className={`text-xs font-medium ${config.textColor}`}>{config.label}</span>
              </div>
            );
          })}
        </div>

        {/* Uptime History (90-day) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">90-Day Uptime History</h2>
          <div className="space-y-4">
            {services.map((service) => {
              const opDays = service.uptimeHistory.filter((s) => s === "operational").length;
              const uptimePct = ((opDays / 90) * 100).toFixed(2);
              return (
                <div key={service.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">{service.name}</span>
                    <span className="text-sm font-medium text-slate-700">{uptimePct}% uptime</span>
                  </div>
                  <div className="flex gap-[2px]">
                    {service.uptimeHistory.map((day, i) => (
                      <div
                        key={i}
                        className={`h-7 flex-1 rounded-sm transition-colors ${
                          day === "operational" ? "bg-green-400 hover:bg-green-500" :
                          day === "degraded" ? "bg-yellow-400 hover:bg-yellow-500" :
                          "bg-red-400 hover:bg-red-500"
                        }`}
                        title={`Day ${90 - i}: ${statusConfig[day].label}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>90 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-green-400" /> Operational</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-yellow-400" /> Degraded</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-400" /> Outage</div>
          </div>
        </div>

        {/* Incident History */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Incident History</h2>
          <div className="space-y-6">
            {incidents.map((incident, idx) => {
              const config = incidentStatusConfig[incident.status];
              return (
                <div key={idx} className="border-l-4 border-slate-200 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-800">{incident.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{incident.date}</p>
                  <div className="space-y-2">
                    {incident.updates.map((update, ui) => (
                      <div key={ui} className="flex gap-2">
                        <span className="text-xs text-slate-400 shrink-0 w-20">{update.time}</span>
                        <p className="text-sm text-slate-600">{update.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Subscribe to Updates</h3>
          <p className="text-sm text-slate-500 mb-4">Get notified when incidents are created, updated, or resolved.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Get your own status page</h2>
          <p className="text-slate-300 mb-6">Beautiful, customizable status pages that keep your customers informed. Free plan available.</p>
          <Link href="/contact" className="inline-block bg-white text-slate-800 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">
            Create Your Status Page
          </Link>
        </div>
      </div>
    </div>
  );
}
