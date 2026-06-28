"use client";

import { useState } from "react";
import Link from "next/link";

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  email: string;
  category: "Bug" | "Feature" | "Question" | "Billing";
  sentiment: "Positive" | "Neutral" | "Negative";
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  created: string;
  message: string;
  suggestedResponse: string;
}

const tickets: Ticket[] = [
  {
    id: "TK-1042",
    subject: "Login page keeps crashing on mobile",
    customer: "David Park",
    email: "david@techstartup.com",
    category: "Bug",
    sentiment: "Negative",
    priority: "High",
    status: "Open",
    created: "10 minutes ago",
    message: "I've been trying to log in on my iPhone for the past hour and the page crashes every time I tap the password field. This is incredibly frustrating — I have a demo with a client in 30 minutes and can't access my dashboard. This needs to be fixed ASAP!",
    suggestedResponse: "Hi David,\n\nI completely understand your frustration, and I apologize for the inconvenience. We've identified this as a known issue affecting iOS Safari users and our engineering team is working on an emergency fix.\n\nIn the meantime, here's a quick workaround:\n1. Open the login page in Chrome on your iPhone\n2. Alternatively, use the desktop site option in Safari\n\nI'll personally follow up once the fix is deployed, which we expect within the next 2 hours.\n\nBest regards,\nSupport Team",
  },
  {
    id: "TK-1041",
    subject: "Can you add dark mode to the dashboard?",
    customer: "Emma Wilson",
    email: "emma@designco.io",
    category: "Feature",
    sentiment: "Positive",
    priority: "Low",
    status: "Open",
    created: "2 hours ago",
    message: "Love your product! I use it daily and was wondering if there are plans to add a dark mode option to the dashboard. Would be really nice for those late-night work sessions. Keep up the great work!",
    suggestedResponse: "Hi Emma,\n\nThank you so much for the kind words — it really means a lot to our team!\n\nGreat news: dark mode is actually on our product roadmap and is currently scheduled for Q3 2026. I've added your request to the feature vote count, which helps us prioritize.\n\nIn the meantime, you might want to try the 'Reduce brightness' option under Settings > Display, which provides a softer visual experience.\n\nWe'll notify you as soon as dark mode launches!\n\nBest,\nSupport Team",
  },
  {
    id: "TK-1040",
    subject: "How do I export data to CSV?",
    customer: "Michael Torres",
    email: "michael@dataworks.com",
    category: "Question",
    sentiment: "Neutral",
    priority: "Medium",
    status: "In Progress",
    created: "5 hours ago",
    message: "Hi, I need to export my analytics data to CSV format for a quarterly report. I've looked through the settings but can't find the export option. Could you point me in the right direction? Thanks.",
    suggestedResponse: "Hi Michael,\n\nHappy to help with your CSV export! Here are the steps:\n\n1. Navigate to Analytics > Reports\n2. Select the date range for your quarterly report\n3. Click the \"Export\" button (top-right corner)\n4. Choose \"CSV\" from the format dropdown\n5. Click \"Download\"\n\nYou can also schedule automatic exports by going to Settings > Scheduled Reports > Add New.\n\nIf you need any specific columns or custom formatting, let me know and I can walk you through our advanced export options.\n\nBest,\nSupport Team",
  },
  {
    id: "TK-1039",
    subject: "Incorrect charge on my last invoice",
    customer: "Sarah Kim",
    email: "sarah@retailhub.com",
    category: "Billing",
    sentiment: "Negative",
    priority: "High",
    status: "Open",
    created: "1 day ago",
    message: "I was charged $299 on my last invoice but my plan is the Pro tier at $199/month. I didn't authorize any upgrades or add-ons. Please explain this discrepancy and refund the difference immediately.",
    suggestedResponse: "Hi Sarah,\n\nThank you for bringing this to our attention. I've reviewed your account and I can see what happened:\n\nOn June 15th, a $100 overage charge was applied for exceeding the 10,000 API calls limit included in your Pro plan. Your account made approximately 14,200 calls during that billing cycle.\n\nHowever, I understand this may not have been clear. I've taken the following actions:\n1. Applied a one-time credit of $100 to your next invoice\n2. Set up usage alerts at 80% and 100% of your API quota\n3. Enabled overage protection so this doesn't happen again\n\nWould you like to discuss upgrading to the Business plan ($249/mo) which includes 25,000 API calls? It might be more cost-effective for your usage pattern.\n\nBest regards,\nSupport Team",
  },
  {
    id: "TK-1038",
    subject: "Integration with Slack not syncing",
    customer: "Alex Petrov",
    email: "alex@devops.io",
    category: "Bug",
    sentiment: "Neutral",
    priority: "Medium",
    status: "In Progress",
    created: "1 day ago",
    message: "Our Slack integration stopped syncing notifications about 3 days ago. We've checked our Slack workspace settings and everything seems fine on our end. The integration shows as 'Connected' in your dashboard but no notifications are coming through.",
    suggestedResponse: "Hi Alex,\n\nThank you for reporting this. We investigated and found that a recent Slack API update affected some webhook endpoints, including yours.\n\nHere's how to fix it:\n\n1. Go to Settings > Integrations > Slack\n2. Click \"Disconnect\"\n3. Wait 30 seconds\n4. Click \"Reconnect\" and re-authorize the integration\n\nThis will generate a fresh webhook URL that's compatible with the updated API.\n\nIf notifications still aren't coming through after reconnecting, please let me know your workspace ID and I'll escalate to our integrations team.\n\nBest,\nSupport Team",
  },
  {
    id: "TK-1037",
    subject: "Loving the new analytics feature!",
    customer: "Rachel Green",
    email: "rachel@marketpro.com",
    category: "Question",
    sentiment: "Positive",
    priority: "Low",
    status: "Resolved",
    created: "2 days ago",
    message: "Just wanted to say the new analytics dashboard is fantastic! Quick question though — is there a way to share specific report views with my team members who don't have admin access? Would be super useful for our weekly meetings.",
    suggestedResponse: "Hi Rachel,\n\nThank you so much for the wonderful feedback! We'll share this with the team — it's always great to hear our users love new features.\n\nAbsolutely! You can share report views in two ways:\n\n1. **Shareable Link**: Click the share icon on any report and generate a read-only link. You can set it to expire after a certain time.\n\n2. **Team Viewer Role**: Under Settings > Team, you can invite members as 'Viewer' (free, no license needed). They'll be able to see reports you share with them.\n\nLet me know if you need help setting either of these up!\n\nBest,\nSupport Team",
  },
];

const categoryColors = {
  Bug: "bg-red-100 text-red-700",
  Feature: "bg-purple-100 text-purple-700",
  Question: "bg-blue-100 text-blue-700",
  Billing: "bg-orange-100 text-orange-700",
};

const sentimentColors = {
  Positive: "text-green-600",
  Neutral: "text-slate-500",
  Negative: "text-red-600",
};

const sentimentIcons = {
  Positive: "😊",
  Neutral: "😐",
  Negative: "😠",
};

const priorityColors = {
  High: "bg-red-500 text-white",
  Medium: "bg-yellow-400 text-yellow-900",
  Low: "bg-slate-200 text-slate-600",
};

const statusColors = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function SmartHelpdeskDemo() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const filteredTickets = filter === "All" ? tickets : tickets.filter((t) => t.category === filter);

  const stats = {
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
    avgResponseTime: "12 min",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/smart-helpdesk" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to HelpDesk AI</Link>
          <h1 className="text-3xl font-bold">HelpDesk AI Dashboard</h1>
          <p className="text-orange-100 mt-1">AI-powered ticket management with smart categorization and response suggestions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Open Tickets", value: stats.open, color: "text-blue-600" },
            { label: "In Progress", value: stats.inProgress, color: "text-yellow-600" },
            { label: "Resolved", value: stats.resolved, color: "text-green-600" },
            { label: "Avg Response", value: stats.avgResponseTime, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["All", "Bug", "Feature", "Question", "Billing"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? "bg-orange-500 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Ticket List */}
        <div className="space-y-3 mb-8">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => { setSelectedTicket(ticket); setShowSuggestion(false); }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md hover:border-orange-200 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-slate-400 font-mono">{ticket.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[ticket.category]}`}>{ticket.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[ticket.status]}`}>{ticket.status}</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-800 truncate">{ticket.subject}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{ticket.customer}</span>
                    <span className="text-xs text-slate-400">{ticket.created}</span>
                    <span className={`text-xs ${sentimentColors[ticket.sentiment]}`}>
                      {sentimentIcons[ticket.sentiment]} {ticket.sentiment}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTicket(ticket); setShowSuggestion(true); }}
                  className="text-xs bg-amber-50 text-amber-600 hover:bg-amber-100 px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0"
                >
                  AI Response
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTicket(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-slate-400 font-mono">{selectedTicket.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[selectedTicket.category]}`}>{selectedTicket.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{selectedTicket.subject}</h3>
                  </div>
                  <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600"><strong>From:</strong> {selectedTicket.customer} ({selectedTicket.email})</span>
                  <span className={`${sentimentColors[selectedTicket.sentiment]}`}>{sentimentIcons[selectedTicket.sentiment]} {selectedTicket.sentiment}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedTicket.message}</p>
                </div>

                {!showSuggestion && (
                  <button
                    onClick={() => setShowSuggestion(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all"
                  >
                    Generate AI Response
                  </button>
                )}

                {showSuggestion && (
                  <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-amber-700 font-medium text-sm">AI-Suggested Response</span>
                      <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Auto-generated</span>
                    </div>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{selectedTicket.suggestedResponse}</pre>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedTicket.suggestedResponse)}
                        className="text-xs bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Copy
                      </button>
                      <button className="text-xs bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        Send Response
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Automate your support with AI</h2>
          <p className="text-orange-100 mb-6">Reduce response times by 80%, auto-categorize tickets, and provide instant AI-suggested responses that your agents can send in one click.</p>
          <Link href="/contact" className="inline-block bg-white text-orange-700 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
