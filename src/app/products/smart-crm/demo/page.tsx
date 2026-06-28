"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";
  aiScore: number;
  value: number;
  lastContact: string;
  notes: string;
  suggestedEmail: string;
}

const leads: Lead[] = [
  {
    id: 1, name: "Sarah Chen", company: "TechVista Inc.", email: "sarah@techvista.com", phone: "+1 415-555-0123",
    status: "Qualified", aiScore: 92, value: 45000, lastContact: "2 hours ago",
    notes: "Interested in enterprise plan. Had a product demo last week. Very engaged, asked about API integrations and SSO.",
    suggestedEmail: "Hi Sarah,\n\nThank you for your time during our demo last week. I noticed you had great questions about our API integrations and SSO capabilities.\n\nI've put together a custom proposal highlighting these features, along with our enterprise SLA guarantees that I think will address your team's requirements.\n\nWould you be available for a 30-minute call this Thursday to walk through the details?\n\nBest regards",
  },
  {
    id: 2, name: "Marcus Johnson", company: "DataFlow Systems", email: "marcus@dataflow.io", phone: "+1 212-555-0456",
    status: "Proposal", aiScore: 87, value: 72000, lastContact: "1 day ago",
    notes: "Reviewing proposal. Budget approval pending from CFO. Decision expected by end of month.",
    suggestedEmail: "Hi Marcus,\n\nI wanted to follow up on the proposal we sent over. I understand budget approvals can take time, and I'm happy to provide any additional information that might help with the decision process.\n\nWe also have a flexible payment structure that might make the approval easier on your end. I'd love to discuss this option.\n\nLooking forward to hearing from you.",
  },
  {
    id: 3, name: "Emily Rodriguez", company: "GreenScale AI", email: "emily@greenscale.ai", phone: "+1 650-555-0789",
    status: "New", aiScore: 78, value: 28000, lastContact: "3 days ago",
    notes: "Signed up for free trial. Exploring AI features. Small but fast-growing startup.",
    suggestedEmail: "Hi Emily,\n\nWelcome to our platform! I saw you recently signed up for a free trial and I wanted to personally reach out.\n\nGiven GreenScale AI's focus on sustainability tech, I think our AI analytics module would be particularly valuable for your team. Would you like a personalized walkthrough?\n\nI'm available this week if you'd like to connect.",
  },
  {
    id: 4, name: "James O'Brien", company: "Nordic Payments", email: "james@nordicpay.com", phone: "+44 20-7946-0958",
    status: "Contacted", aiScore: 65, value: 55000, lastContact: "5 days ago",
    notes: "Initial call completed. Interested but comparing with 2 other vendors. Security compliance is top priority.",
    suggestedEmail: "Hi James,\n\nGreat speaking with you earlier this week. I understand security compliance is a top priority for Nordic Payments.\n\nI've attached our SOC 2 Type II report and GDPR compliance documentation. We also offer a dedicated security review session with our CTO for enterprise prospects.\n\nShall I schedule that for you?",
  },
  {
    id: 5, name: "Aisha Patel", company: "MedConnect Health", email: "aisha@medconnect.com", phone: "+1 312-555-0234",
    status: "Won", aiScore: 95, value: 120000, lastContact: "1 week ago",
    notes: "Contract signed! Implementation starting next month. 3-year enterprise deal.",
    suggestedEmail: "Hi Aisha,\n\nCongratulations on getting everything finalized! We're thrilled to have MedConnect Health on board.\n\nYour dedicated implementation manager, Alex, will be reaching out within 48 hours to kick off the onboarding process. In the meantime, here's our getting started guide.\n\nWelcome to the family!",
  },
  {
    id: 6, name: "Viktor Novak", company: "EuroLogistics", email: "viktor@eurologistics.eu", phone: "+49 30-555-0567",
    status: "Lost", aiScore: 32, value: 38000, lastContact: "2 weeks ago",
    notes: "Went with competitor. Price was the main factor. Consider re-engaging in Q3.",
    suggestedEmail: "Hi Viktor,\n\nI hope you're doing well. I wanted to reach out because we've recently introduced some new pricing tiers that might better align with EuroLogistics' budget.\n\nWe've also added several features since we last spoke, including real-time fleet tracking and automated compliance reporting.\n\nWould you be open to a brief catch-up call?",
  },
  {
    id: 7, name: "Lisa Tanaka", company: "Sakura Digital", email: "lisa@sakuradigital.jp", phone: "+81 3-5555-0890",
    status: "Qualified", aiScore: 84, value: 62000, lastContact: "4 days ago",
    notes: "Very interested in Asia-Pacific expansion features. Wants multi-language support demo.",
    suggestedEmail: "Hi Lisa,\n\nThank you for your interest in our Asia-Pacific capabilities. I've prepared a demo environment showcasing our multi-language support across Japanese, Korean, and Mandarin.\n\nThe demo includes real-time translation, localized reporting, and region-specific compliance templates.\n\nWhen would be a good time to walk through this together?",
  },
  {
    id: 8, name: "Carlos Mendez", company: "LatAm Fintech", email: "carlos@latamfintech.co", phone: "+52 55-5555-0123",
    status: "New", aiScore: 71, value: 35000, lastContact: "1 day ago",
    notes: "Referral from existing customer. Looking for fintech-specific features.",
    suggestedEmail: "Hi Carlos,\n\nWelcome! I understand you were referred by one of our valued customers. We're excited to show you what we can do for LatAm Fintech.\n\nOur platform includes specific modules for fintech compliance, transaction monitoring, and regulatory reporting across Latin American markets.\n\nLet's schedule a call to discuss your specific needs.",
  },
];

const statusColors: Record<Lead["status"], string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-purple-100 text-purple-700",
  Proposal: "bg-orange-100 text-orange-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

type SortKey = "name" | "aiScore" | "value" | "status";

export default function SmartCRMDemo() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showSuggestedEmail, setShowSuggestedEmail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("aiScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      result = result.filter((l) => l.status === statusFilter);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "aiScore") cmp = a.aiScore - b.aiScore;
      else if (sortKey === "value") cmp = a.value - b.value;
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [searchQuery, statusFilter, sortKey, sortDir]);

  const pipelineData = [
    { stage: "New", count: leads.filter((l) => l.status === "New").length, value: leads.filter((l) => l.status === "New").reduce((s, l) => s + l.value, 0), color: "bg-blue-500" },
    { stage: "Contacted", count: leads.filter((l) => l.status === "Contacted").length, value: leads.filter((l) => l.status === "Contacted").reduce((s, l) => s + l.value, 0), color: "bg-yellow-500" },
    { stage: "Qualified", count: leads.filter((l) => l.status === "Qualified").length, value: leads.filter((l) => l.status === "Qualified").reduce((s, l) => s + l.value, 0), color: "bg-purple-500" },
    { stage: "Proposal", count: leads.filter((l) => l.status === "Proposal").length, value: leads.filter((l) => l.status === "Proposal").reduce((s, l) => s + l.value, 0), color: "bg-orange-500" },
    { stage: "Won", count: leads.filter((l) => l.status === "Won").length, value: leads.filter((l) => l.status === "Won").reduce((s, l) => s + l.value, 0), color: "bg-green-500" },
    { stage: "Lost", count: leads.filter((l) => l.status === "Lost").length, value: leads.filter((l) => l.status === "Lost").reduce((s, l) => s + l.value, 0), color: "bg-red-500" },
  ];
  const maxPipelineValue = Math.max(...pipelineData.map((d) => d.value));

  const totalValue = leads.reduce((s, l) => s + l.value, 0);
  const avgScore = Math.round(leads.reduce((s, l) => s + l.aiScore, 0) / leads.length);
  const wonValue = leads.filter((l) => l.status === "Won").reduce((s, l) => s + l.value, 0);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/smart-crm" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to SmartCRM</Link>
          <h1 className="text-3xl font-bold">SmartCRM Dashboard</h1>
          <p className="text-blue-100 mt-1">AI-powered lead management and pipeline analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pipeline", value: `$${(totalValue / 1000).toFixed(0)}K`, sub: `${leads.length} leads`, color: "text-blue-600" },
            { label: "Won Revenue", value: `$${(wonValue / 1000).toFixed(0)}K`, sub: `${leads.filter(l=>l.status==="Won").length} deals`, color: "text-green-600" },
            { label: "Avg AI Score", value: `${avgScore}`, sub: "across all leads", color: "text-purple-600" },
            { label: "Conversion Rate", value: `${Math.round((leads.filter(l=>l.status==="Won").length / leads.length) * 100)}%`, sub: "won / total", color: "text-indigo-600" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{kpi.label}</p>
              <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Pipeline Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Sales Pipeline</h2>
          <div className="space-y-3">
            {pipelineData.map((stage) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <span className="text-sm text-slate-600 w-24">{stage.stage}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`${stage.color} h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700`}
                    style={{ width: `${Math.max((stage.value / maxPipelineValue) * 100, 8)}%` }}
                  >
                    <span className="text-xs font-medium text-white">${(stage.value / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <span className="text-sm text-slate-500 w-16 text-right">{stage.count} lead{stage.count !== 1 ? "s" : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
          >
            <option>All</option>
            {["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {([
                    ["name", "Name"],
                    ["status", "Status"],
                    ["aiScore", "AI Score"],
                    ["value", "Value"],
                  ] as [SortKey, string][]).map(([key, label]) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="text-left px-4 py-3 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900 select-none"
                    >
                      {label} {sortKey === key ? (sortDir === "desc" ? "↓" : "↑") : ""}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Last Contact</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-100 hover:bg-blue-50/50 cursor-pointer transition-colors"
                    onClick={() => { setSelectedLead(lead); setShowSuggestedEmail(false); }}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.company}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>{lead.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2">
                          <div className={`${getScoreBg(lead.aiScore)} h-full rounded-full`} style={{ width: `${lead.aiScore}%` }} />
                        </div>
                        <span className={`text-sm font-semibold ${getScoreColor(lead.aiScore)}`}>{lead.aiScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">${lead.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{lead.lastContact}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setShowSuggestedEmail(true); }}
                        className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        AI Suggest
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{selectedLead.name}</h3>
                    <p className="text-slate-500">{selectedLead.company}</p>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm text-slate-700">{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-slate-700">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[selectedLead.status]}`}>{selectedLead.status}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Deal Value</p>
                    <p className="text-sm font-semibold text-slate-700">${selectedLead.value.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">AI Lead Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-3">
                      <div className={`${getScoreBg(selectedLead.aiScore)} h-full rounded-full transition-all duration-500`} style={{ width: `${selectedLead.aiScore}%` }} />
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(selectedLead.aiScore)}`}>{selectedLead.aiScore}/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Notes</p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{selectedLead.notes}</p>
                </div>

                {!showSuggestedEmail && (
                  <button
                    onClick={() => setShowSuggestedEmail(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    ✨ AI Suggest Follow-up Email
                  </button>
                )}

                {showSuggestedEmail && (
                  <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-indigo-600 font-medium text-sm">AI-Generated Email Suggestion</span>
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Draft</span>
                    </div>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{selectedLead.suggestedEmail}</pre>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedLead.suggestedEmail)}
                        className="text-xs bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Copy to Clipboard
                      </button>
                      <button className="text-xs bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        Send Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Ready to supercharge your sales?</h2>
          <p className="text-blue-100 mb-6">Get AI-powered lead scoring, automated follow-ups, and pipeline analytics for your team.</p>
          <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
