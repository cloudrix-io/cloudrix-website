"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type ServiceStatus = "operational" | "degraded" | "investigating" | "outage";

interface Service {
  name: string;
  description: string;
  status: ServiceStatus;
  uptimeHistory: ServiceStatus[];
}

function generateUptimeHistory(status: ServiceStatus): ServiceStatus[] {
  const history: ServiceStatus[] = [];
  for (let i = 0; i < 90; i++) {
    if (status === "outage" && i >= 88) {
      history.push("outage");
    } else if (status === "investigating" && i >= 87) {
      history.push(i >= 89 ? "investigating" : "degraded");
    } else if (status === "degraded" && i >= 85) {
      history.push(i >= 88 ? "degraded" : "operational");
    } else {
      const r = Math.random();
      if (r > 0.98) history.push("degraded");
      else if (r > 0.997) history.push("outage");
      else history.push("operational");
    }
  }
  return history;
}

const initialServices: Service[] = [
  { name: "API", description: "REST & GraphQL API endpoints", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Web Application", description: "Dashboard and customer portal", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Database", description: "Primary database cluster", status: "degraded", uptimeHistory: generateUptimeHistory("degraded") },
  { name: "CDN", description: "Static assets and media delivery", status: "operational", uptimeHistory: generateUptimeHistory("operational") },
  { name: "Authentication", description: "SSO, OAuth, and session management", status: "investigating", uptimeHistory: generateUptimeHistory("investigating") },
];

const incidents = [
  {
    date: "June 28, 2026",
    title: "Authentication Service - Elevated Error Rates",
    status: "investigating" as const,
    severity: "major" as const,
    updates: [
      { time: "10:45 UTC", status: "investigating" as const, text: "We are investigating reports of intermittent login failures. Some users may experience delays when authenticating. Our engineering team is actively looking into the root cause." },
      { time: "10:30 UTC", status: "investigating" as const, text: "We have identified elevated error rates in the authentication service. Monitoring dashboards show a spike in 500 errors starting at approximately 10:15 UTC." },
    ],
  },
  {
    date: "June 28, 2026",
    title: "Database Cluster - Elevated Query Latency",
    status: "monitoring" as const,
    severity: "minor" as const,
    updates: [
      { time: "09:30 UTC", status: "monitoring" as const, text: "A fix has been deployed for the connection pool misconfiguration. Query latency is returning to normal levels. We are continuing to monitor." },
      { time: "08:45 UTC", status: "identified" as const, text: "Root cause identified: a misconfigured connection pool is causing query queueing during peak traffic. Deploying a configuration update." },
      { time: "08:15 UTC", status: "investigating" as const, text: "We are seeing elevated database query latency affecting some dashboard operations. Read queries are taking 2-3x longer than normal." },
    ],
  },
  {
    date: "June 25, 2026",
    title: "CDN - Intermittent Asset Loading Failures",
    status: "resolved" as const,
    severity: "minor" as const,
    updates: [
      { time: "16:00 UTC", status: "resolved" as const, text: "Issue has been fully resolved. Root cause was a cache invalidation bug in our CDN provider. A workaround has been deployed and the provider is working on a permanent fix." },
      { time: "14:30 UTC", status: "monitoring" as const, text: "We have purged the affected cache regions and are monitoring for recurrence." },
      { time: "13:45 UTC", status: "identified" as const, text: "Identified stale cache entries in EU-WEST region causing 404 errors for recently updated assets." },
      { time: "13:00 UTC", status: "investigating" as const, text: "Some users reporting images and scripts failing to load. Investigating CDN origin." },
    ],
  },
  {
    date: "June 20, 2026",
    title: "API - Brief Service Interruption",
    status: "resolved" as const,
    severity: "major" as const,
    updates: [
      { time: "04:15 UTC", status: "resolved" as const, text: "Service fully restored. Root cause: an automated deployment rolled out a breaking change to the rate limiter middleware. The deployment has been rolled back and safeguards have been added to the CI pipeline." },
      { time: "03:50 UTC", status: "monitoring" as const, text: "API responses returning to normal after rollback. Monitoring for stability." },
      { time: "03:30 UTC", status: "identified" as const, text: "Identified a faulty deployment affecting the rate limiter. Initiating rollback." },
      { time: "03:15 UTC", status: "investigating" as const, text: "API returning 503 errors for approximately 30% of requests. Engineering team engaged." },
    ],
  },
];

const statusConfig: Record<ServiceStatus | "monitoring" | "identified" | "resolved", { label: string; color: string; textColor: string; bgColor: string; borderColor: string; dotColor: string }> = {
  operational: { label: "Operational", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200", dotColor: "bg-green-500" },
  degraded: { label: "Degraded Performance", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", dotColor: "bg-yellow-500" },
  investigating: { label: "Investigating", color: "bg-orange-500", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", dotColor: "bg-orange-500" },
  outage: { label: "Major Outage", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200", dotColor: "bg-red-500" },
  monitoring: { label: "Monitoring", color: "bg-blue-500", textColor: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", dotColor: "bg-blue-500" },
  identified: { label: "Identified", color: "bg-purple-500", textColor: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200", dotColor: "bg-purple-500" },
  resolved: { label: "Resolved", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200", dotColor: "bg-green-500" },
};

export default function StatusPageDemo() {
  const [companyName, setCompanyName] = useState("Acme Cloud Services");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeMethod, setSubscribeMethod] = useState<"email" | "webhook" | "slack">("email");
  const [services] = useState<Service[]>(initialServices);
  const [expandedIncident, setExpandedIncident] = useState<number | null>(0);
  const [editingName, setEditingName] = useState(false);

  const overallStatus = useMemo(() => {
    if (services.some((s) => s.status === "outage")) return "outage" as ServiceStatus;
    if (services.some((s) => s.status === "investigating")) return "investigating" as ServiceStatus;
    if (services.some((s) => s.status === "degraded")) return "degraded" as ServiceStatus;
    return "operational" as ServiceStatus;
  }, [services]);

  const overallConfig = statusConfig[overallStatus];

  const handleSubscribe = () => {
    if (subscribeEmail.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setSubscribeEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Demo controls bar */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <Link href="/products/status-page" className="text-slate-400 hover:text-white text-xs">&larr; Back to StatusPage product</Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Company:</span>
            {editingName ? (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                autoFocus
                className="px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:ring-1 focus:ring-blue-500 outline-none w-48"
              />
            ) : (
              <button onClick={() => setEditingName(true)} className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2">
                {companyName}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Page */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
              {companyName[0]}
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{companyName}</h1>
          </div>
          <p className="text-slate-500">System Status</p>
        </div>

        {/* Overall Status Banner */}
        <div className={`${overallConfig.bgColor} ${overallConfig.borderColor} border rounded-xl p-5 mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${overallConfig.color} ${overallStatus !== "operational" ? "animate-pulse" : ""}`} />
              <span className={`text-lg font-semibold ${overallConfig.textColor}`}>
                {overallStatus === "operational" ? "All Systems Operational" :
                 overallStatus === "degraded" ? "Some Systems Experiencing Issues" :
                 overallStatus === "investigating" ? "Investigating Reported Issues" :
                 "Major System Outage"}
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Updated {new Date().toLocaleTimeString()} UTC
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Current Status</h2>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {services.map((service) => {
              const config = statusConfig[service.status];
              return (
                <div key={service.name} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${config.color} ${service.status !== "operational" ? "animate-pulse" : ""}`} />
                    <div>
                      <span className="text-sm font-medium text-slate-800">{service.name}</span>
                      <p className="text-xs text-slate-400">{service.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bgColor} ${config.textColor} ${config.borderColor} border`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 90-Day Uptime History */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">90-Day Uptime</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
            {services.map((service) => {
              const opDays = service.uptimeHistory.filter((s) => s === "operational").length;
              const uptimePct = ((opDays / 90) * 100).toFixed(2);
              return (
                <div key={service.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{service.name}</span>
                    <span className={`text-sm font-semibold ${parseFloat(uptimePct) >= 99.9 ? "text-green-600" : parseFloat(uptimePct) >= 99 ? "text-yellow-600" : "text-red-600"}`}>
                      {uptimePct}%
                    </span>
                  </div>
                  <div className="flex gap-[2px]">
                    {service.uptimeHistory.map((day, i) => (
                      <div
                        key={i}
                        className={`h-8 flex-1 rounded-sm transition-colors cursor-pointer ${
                          day === "operational" ? "bg-green-400 hover:bg-green-500" :
                          day === "degraded" ? "bg-yellow-400 hover:bg-yellow-500" :
                          day === "investigating" ? "bg-orange-400 hover:bg-orange-500" :
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
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-400" /> Operational</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-yellow-400" /> Degraded</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-orange-400" /> Investigating</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-400" /> Outage</div>
            </div>
          </div>
        </div>

        {/* Incident History */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Incident History</h2>
          <div className="space-y-4">
            {incidents.map((incident, idx) => {
              const config = statusConfig[incident.status];
              const isExpanded = expandedIncident === idx;
              const severityColor = incident.severity === "major" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedIncident(isExpanded ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.dotColor} ${incident.status !== "resolved" ? "animate-pulse" : ""}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-800">{incident.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${config.bgColor} ${config.textColor}`}>{config.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${severityColor}`}>{incident.severity}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{incident.date}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm flex-shrink-0 ml-3">{isExpanded ? "\u25B2" : "\u25BC"}</span>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-4 border-t border-slate-100">
                      <div className="ml-5 mt-3 space-y-3 relative">
                        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-slate-200" />
                        {incident.updates.map((update, ui) => {
                          const updateConfig = statusConfig[update.status];
                          return (
                            <div key={ui} className="flex gap-4 relative">
                              <div className={`w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1.5 relative z-10 ${updateConfig.dotColor}`} />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-slate-700">{update.time}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${updateConfig.bgColor} ${updateConfig.textColor}`}>{updateConfig.label}</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{update.text}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Subscribe to Updates</h3>
            <p className="text-sm text-slate-500">Get notified when incidents are created, updated, or resolved.</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            {(["email", "webhook", "slack"] as const).map((method) => (
              <button
                key={method}
                onClick={() => setSubscribeMethod(method)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                  subscribeMethod === method
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {method === "email" ? "Email" : method === "webhook" ? "Webhook" : "Slack"}
              </button>
            ))}
          </div>

          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type={subscribeMethod === "email" ? "email" : "text"}
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder={subscribeMethod === "email" ? "your@email.com" : subscribeMethod === "webhook" ? "https://hooks.example.com/..." : "#channel-name"}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribed}
              className="bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </div>
          {subscribed && (
            <p className="text-center text-sm text-green-600 mt-3">You will be notified of all status changes.</p>
          )}
        </div>

        {/* Scheduled Maintenance */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 text-lg flex-shrink-0">&#128197;</span>
            <div>
              <h3 className="text-sm font-semibold text-blue-800">Scheduled Maintenance</h3>
              <p className="text-sm text-blue-700 mt-1">Database maintenance window: July 2, 2026, 02:00 - 04:00 UTC</p>
              <p className="text-xs text-blue-500 mt-1">Expected impact: Brief interruptions to write operations. Read operations will remain available.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Get your own status page</h2>
          <p className="text-slate-300 mb-6">Beautiful, customizable status pages that keep your customers informed. Automated monitoring, incident management, and subscriber notifications.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/products/status-page" className="inline-block bg-white text-slate-800 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">
              Try Free
            </Link>
            <Link href="/products/status-page#pricing" className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
