"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Won";
  aiScore: number;
  value: number;
  lastContact: string;
  notes: string;
  suggestedEmail: string;
  avatar: string;
}

const leads: Lead[] = [
  {
    id: 1, name: "Sarah Chen", company: "TechVista Inc.", email: "sarah@techvista.com", phone: "+1 415-555-0123",
    status: "Qualified", aiScore: 92, value: 45000, lastContact: "2 hours ago", avatar: "SC",
    notes: "Interested in enterprise plan. Had a product demo last week. Very engaged, asked about API integrations and SSO.",
    suggestedEmail: "Hi Sarah,\n\nThank you for your time during our demo last week. I noticed you had great questions about our API integrations and SSO capabilities.\n\nI've put together a custom proposal highlighting these features, along with our enterprise SLA guarantees that I think will address your team's requirements.\n\nWould you be available for a 30-minute call this Thursday to walk through the details?\n\nBest regards",
  },
  {
    id: 2, name: "Marcus Johnson", company: "DataFlow Systems", email: "marcus@dataflow.io", phone: "+1 212-555-0456",
    status: "Proposal", aiScore: 87, value: 72000, lastContact: "1 day ago", avatar: "MJ",
    notes: "Reviewing proposal. Budget approval pending from CFO. Decision expected by end of month.",
    suggestedEmail: "Hi Marcus,\n\nI wanted to follow up on the proposal we sent over. I understand budget approvals can take time, and I'm happy to provide any additional information that might help with the decision process.\n\nWe also have a flexible payment structure that might make the approval easier on your end. I'd love to discuss this option.\n\nLooking forward to hearing from you.",
  },
  {
    id: 3, name: "Emily Rodriguez", company: "GreenScale AI", email: "emily@greenscale.ai", phone: "+1 650-555-0789",
    status: "Lead", aiScore: 78, value: 28000, lastContact: "3 days ago", avatar: "ER",
    notes: "Signed up for free trial. Exploring AI features. Small but fast-growing startup.",
    suggestedEmail: "Hi Emily,\n\nWelcome to our platform! I saw you recently signed up for a free trial and I wanted to personally reach out.\n\nGiven GreenScale AI's focus on sustainability tech, I think our AI analytics module would be particularly valuable for your team. Would you like a personalized walkthrough?\n\nI'm available this week if you'd like to connect.",
  },
  {
    id: 4, name: "James O'Brien", company: "Nordic Payments", email: "james@nordicpay.com", phone: "+44 20-7946-0958",
    status: "Negotiation", aiScore: 88, value: 95000, lastContact: "5 hours ago", avatar: "JO",
    notes: "Final contract review. Legal team has minor concerns about data residency. Security compliance is top priority.",
    suggestedEmail: "Hi James,\n\nGreat speaking with you earlier today. I understand your legal team has questions about data residency.\n\nI've attached our data processing addendum and EU data residency guarantee documentation. We also offer a dedicated security review session with our CTO for enterprise prospects.\n\nShall I schedule that for you?",
  },
  {
    id: 5, name: "Aisha Patel", company: "MedConnect Health", email: "aisha@medconnect.com", phone: "+1 312-555-0234",
    status: "Won", aiScore: 95, value: 120000, lastContact: "1 week ago", avatar: "AP",
    notes: "Contract signed! Implementation starting next month. 3-year enterprise deal.",
    suggestedEmail: "Hi Aisha,\n\nCongratulations on getting everything finalized! We're thrilled to have MedConnect Health on board.\n\nYour dedicated implementation manager, Alex, will be reaching out within 48 hours to kick off the onboarding process. In the meantime, here's our getting started guide.\n\nWelcome to the family!",
  },
  {
    id: 6, name: "Lisa Tanaka", company: "Sakura Digital", email: "lisa@sakuradigital.jp", phone: "+81 3-5555-0890",
    status: "Qualified", aiScore: 84, value: 62000, lastContact: "4 days ago", avatar: "LT",
    notes: "Very interested in Asia-Pacific expansion features. Wants multi-language support demo.",
    suggestedEmail: "Hi Lisa,\n\nThank you for your interest in our Asia-Pacific capabilities. I've prepared a demo environment showcasing our multi-language support across Japanese, Korean, and Mandarin.\n\nThe demo includes real-time translation, localized reporting, and region-specific compliance templates.\n\nWhen would be a good time to walk through this together?",
  },
  {
    id: 7, name: "Carlos Mendez", company: "LatAm Fintech", email: "carlos@latamfintech.co", phone: "+52 55-5555-0123",
    status: "Lead", aiScore: 71, value: 35000, lastContact: "1 day ago", avatar: "CM",
    notes: "Referral from existing customer. Looking for fintech-specific features.",
    suggestedEmail: "Hi Carlos,\n\nWelcome! I understand you were referred by one of our valued customers. We're excited to show you what we can do for LatAm Fintech.\n\nOur platform includes specific modules for fintech compliance, transaction monitoring, and regulatory reporting across Latin American markets.\n\nLet's schedule a call to discuss your specific needs.",
  },
  {
    id: 8, name: "Diana Kruger", company: "EuroTech Solutions", email: "diana@eurotech.de", phone: "+49 30-555-0567",
    status: "Negotiation", aiScore: 91, value: 83000, lastContact: "12 hours ago", avatar: "DK",
    notes: "Negotiating 2-year contract. Wants volume discount for 50+ seats. Very likely to close this week.",
    suggestedEmail: "Hi Diana,\n\nThank you for the productive discussion yesterday. I've prepared the volume discount proposal for 50+ seats as discussed.\n\nThe 2-year commitment includes priority onboarding, dedicated support, and quarterly business reviews. I believe this addresses all of EuroTech's requirements.\n\nLooking forward to finalizing the agreement.",
  },
];

const PIPELINE_STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"] as const;

const stageColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  Lead: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "bg-blue-500" },
  Qualified: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-500" },
  Proposal: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", dot: "bg-orange-500" },
  Negotiation: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
  Won: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", dot: "bg-green-500" },
};

function getScoreColor(score: number) {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
}

function getScoreBg(score: number) {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
}

type ViewMode = "pipeline" | "table";

export default function SmartCRMDemo() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showSuggestedEmail, setShowSuggestedEmail] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("pipeline");
  const [showAiInsights, setShowAiInsights] = useState(true);

  const pipelineLeads = useMemo(() => {
    const grouped: Record<string, Lead[]> = {};
    for (const stage of PIPELINE_STAGES) {
      grouped[stage] = leads.filter((l) => l.status === stage);
    }
    return grouped;
  }, []);

  const totalValue = leads.reduce((s, l) => s + l.value, 0);
  const avgScore = Math.round(leads.reduce((s, l) => s + l.aiScore, 0) / leads.length);
  const wonValue = leads.filter((l) => l.status === "Won").reduce((s, l) => s + l.value, 0);
  const activeDeals = leads.filter((l) => l.status !== "Won").length;

  // AI Insights - top deals to focus on
  const topDeals = [...leads]
    .filter((l) => l.status !== "Won")
    .sort((a, b) => b.aiScore * b.value - a.aiScore * a.value)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/products/smart-crm" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to SmartCRM</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">SmartCRM Dashboard</h1>
              <p className="text-blue-100 mt-1">AI-powered sales pipeline and lead management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("pipeline")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === "pipeline" ? "bg-white text-indigo-700" : "text-white hover:bg-white/10"}`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === "table" ? "bg-white text-indigo-700" : "text-white hover:bg-white/10"}`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Pipeline", value: `$${(totalValue / 1000).toFixed(0)}K`, sub: `${leads.length} deals`, icon: "📊", color: "text-blue-600" },
            { label: "Won Revenue", value: `$${(wonValue / 1000).toFixed(0)}K`, sub: `${leads.filter(l => l.status === "Won").length} closed`, icon: "🏆", color: "text-green-600" },
            { label: "Active Deals", value: `${activeDeals}`, sub: `$${((totalValue - wonValue) / 1000).toFixed(0)}K in pipeline`, icon: "🔄", color: "text-purple-600" },
            { label: "Avg AI Score", value: `${avgScore}`, sub: "across all deals", icon: "🤖", color: "text-indigo-600" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{kpi.label}</p>
                <span className="text-lg">{kpi.icon}</span>
              </div>
              <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {viewMode === "pipeline" ? (
              /* Pipeline View */
              <div className="flex gap-4 overflow-x-auto pb-4">
                {PIPELINE_STAGES.map((stage) => {
                  const stageLeads = pipelineLeads[stage];
                  const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);
                  const colors = stageColors[stage];
                  return (
                    <div key={stage} className="flex-shrink-0 w-[260px]">
                      <div className={`${colors.bg} ${colors.border} border rounded-t-xl px-4 py-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                            <span className={`text-sm font-semibold ${colors.text}`}>{stage}</span>
                          </div>
                          <span className="text-xs font-medium text-slate-500">{stageLeads.length}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">${(stageValue / 1000).toFixed(0)}K total</p>
                      </div>
                      <div className="bg-slate-100/50 rounded-b-xl p-2 min-h-[200px] space-y-2 border border-t-0 border-slate-200">
                        {stageLeads.map((lead) => (
                          <button
                            key={lead.id}
                            onClick={() => { setSelectedLead(lead); setShowSuggestedEmail(false); }}
                            className="w-full text-left bg-white rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                                {lead.avatar}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{lead.name}</p>
                                <p className="text-[11px] text-slate-500 truncate">{lead.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-700">${lead.value.toLocaleString()}</span>
                              <div className="flex items-center gap-1.5">
                                <div className="w-10 bg-slate-100 rounded-full h-1.5">
                                  <div className={`${getScoreBg(lead.aiScore)} h-full rounded-full`} style={{ width: `${lead.aiScore}%` }} />
                                </div>
                                <span className={`text-xs font-bold ${getScoreColor(lead.aiScore)}`}>{lead.aiScore}</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1.5">{lead.lastContact}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Table View */
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">Contact</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">Stage</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">AI Score</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">Value</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">Last Contact</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => {
                        const colors = stageColors[lead.status];
                        return (
                          <tr
                            key={lead.id}
                            className="border-b border-slate-100 hover:bg-blue-50/50 cursor-pointer transition-colors"
                            onClick={() => { setSelectedLead(lead); setShowSuggestedEmail(false); }}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-xs font-bold flex items-center justify-center">
                                  {lead.avatar}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-800">{lead.name}</p>
                                  <p className="text-xs text-slate-500">{lead.company}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>{lead.status}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-100 rounded-full h-2">
                                  <div className={`${getScoreBg(lead.aiScore)} h-full rounded-full`} style={{ width: `${lead.aiScore}%` }} />
                                </div>
                                <span className={`text-sm font-semibold ${getScoreColor(lead.aiScore)}`}>{lead.aiScore}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-700">${lead.value.toLocaleString()}</td>
                            <td className="px-4 py-3 text-xs text-slate-500">{lead.lastContact}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setShowSuggestedEmail(true); }}
                                className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition-colors border border-indigo-200"
                              >
                                Draft Email
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights Sidebar */}
          {showAiInsights && (
            <div className="hidden xl:block w-[300px] flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h3 className="text-sm font-semibold text-slate-800">AI Insights</h3>
                    </div>
                    <button onClick={() => setShowAiInsights(false)} className="text-slate-400 hover:text-slate-600 text-xs">Hide</button>
                  </div>
                </div>

                {/* Top 3 Deals */}
                <div className="p-4 border-b border-slate-100">
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Top 3 Deals to Focus On</p>
                  <div className="space-y-3">
                    {topDeals.map((deal, i) => (
                      <button
                        key={deal.id}
                        onClick={() => { setSelectedLead(deal); setShowSuggestedEmail(false); }}
                        className="w-full text-left flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{deal.company}</p>
                          <p className="text-xs text-slate-500">${deal.value.toLocaleString()} - Score: {deal.aiScore}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pipeline Health */}
                <div className="p-4 border-b border-slate-100">
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Pipeline Health</p>
                  <div className="space-y-2">
                    {PIPELINE_STAGES.filter(s => s !== "Won").map((stage) => {
                      const count = pipelineLeads[stage].length;
                      const value = pipelineLeads[stage].reduce((s, l) => s + l.value, 0);
                      return (
                        <div key={stage} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${stageColors[stage].dot}`} />
                            <span className="text-slate-600">{stage}</span>
                          </div>
                          <span className="text-slate-500">{count} / ${(value / 1000).toFixed(0)}K</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-4">
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Recommendations</p>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="text-amber-500 mt-0.5">&#9888;</span>
                      <p className="text-slate-600"><strong className="text-slate-700">Diana Kruger</strong> is likely to close this week. Prioritize final contract review.</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <span className="text-blue-500 mt-0.5">&#9432;</span>
                      <p className="text-slate-600"><strong className="text-slate-700">Emily Rodriguez</strong> hasn&apos;t been contacted in 3 days. Send a follow-up.</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <p className="text-slate-600"><strong className="text-slate-700">James O&apos;Brien</strong> has high intent signals. Schedule a closing call.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!showAiInsights && (
          <div className="fixed bottom-6 right-6 xl:block hidden">
            <button
              onClick={() => setShowAiInsights(true)}
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>🤖</span> Show AI Insights
            </button>
          </div>
        )}

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-sm font-bold flex items-center justify-center">
                      {selectedLead.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{selectedLead.name}</h3>
                      <p className="text-slate-500">{selectedLead.company}</p>
                    </div>
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
                    <p className="text-xs text-slate-500">Stage</p>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColors[selectedLead.status].bg} ${stageColors[selectedLead.status].text} ${stageColors[selectedLead.status].border} border`}>{selectedLead.status}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Deal Value</p>
                    <p className="text-sm font-semibold text-slate-700">${selectedLead.value.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">AI Confidence Score</p>
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
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <span>&#9998;</span> Draft Follow-up Email
                  </button>
                )}

                {showSuggestedEmail && (
                  <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-indigo-600 font-medium text-sm">AI-Generated Follow-up Email</span>
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Draft</span>
                    </div>
                    <div className="bg-white rounded-lg border border-indigo-100 p-4 mb-3">
                      <div className="text-xs text-slate-400 mb-2">
                        <span className="font-medium text-slate-600">To:</span> {selectedLead.email}
                      </div>
                      <div className="text-xs text-slate-400 mb-3">
                        <span className="font-medium text-slate-600">Subject:</span> Following up - {selectedLead.company} x Cloudrix
                      </div>
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{selectedLead.suggestedEmail}</pre>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedLead.suggestedEmail)}
                        className="text-xs bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Copy to Clipboard
                      </button>
                      <button className="text-xs bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        Send Email
                      </button>
                      <button className="text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium transition-colors">
                        Regenerate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Ready to supercharge your sales?</h2>
          <p className="text-blue-100 mb-6">Get AI-powered lead scoring, automated follow-ups, and pipeline analytics for your team.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/products/smart-crm" className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Try Free
            </Link>
            <Link href="/products/smart-crm#pricing" className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
