"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, Clock, Euro, Layers, AlertTriangle, CheckCircle, Cpu } from "lucide-react";

interface FormInputs {
  description: string;
  industry: string;
  companySize: string;
  timeline: string;
}

interface ScopeEstimate {
  title: string;
  techStack: string[];
  phases: { name: string; duration: string }[];
  budgetRange: string;
  deliverables: string[];
  risks: string[];
  approach: string;
}

const INDUSTRIES = [
  "Financial Services",
  "Healthcare",
  "E-commerce",
  "Manufacturing",
  "Technology",
  "Logistics",
  "Insurance",
  "Other",
];

const COMPANY_SIZES = [
  { value: "1-50", label: "1-50 employees" },
  { value: "51-250", label: "51-250 employees" },
  { value: "251-1000", label: "251-1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3", label: "1-3 months" },
  { value: "3-6", label: "3-6 months" },
  { value: "6+", label: "6+ months" },
  { value: "exploring", label: "Just exploring" },
];

function detectProjectType(description: string): ScopeEstimate {
  const lower = description.toLowerCase();

  if (/chatbot|chat|customer service|support/.test(lower)) {
    return {
      title: "Conversational AI System",
      techStack: ["LangChain / LlamaIndex", "OpenAI GPT-4 / Claude", "Vector Database (Pinecone/Weaviate)", "Next.js / React Frontend", "Node.js API Layer"],
      phases: [
        { name: "Discovery & Data Audit", duration: "2 weeks" },
        { name: "Proof of Concept", duration: "3 weeks" },
        { name: "Production Development", duration: "6-8 weeks" },
        { name: "Testing & Optimization", duration: "2 weeks" },
      ],
      budgetRange: "\u20ac15,000 - \u20ac45,000",
      deliverables: [
        "Custom chatbot with your brand identity and tone of voice",
        "Knowledge base ingestion pipeline (documents, FAQs, support tickets)",
        "Multi-channel deployment (web widget, API, Slack/Teams integration)",
        "Conversation analytics dashboard",
        "Fallback-to-human escalation workflow",
        "Admin panel for managing responses and training data",
        "Performance monitoring and alerting system",
      ],
      risks: [
        "Knowledge base quality directly impacts answer accuracy",
        "Hallucination mitigation requires ongoing prompt engineering",
        "Multi-language support may require additional training data",
        "Integration complexity depends on existing tech stack",
      ],
      approach:
        "We start with a focused PoC using your top 50 most-asked questions to validate accuracy and user experience. Once validated, we scale to your full knowledge base with production-grade infrastructure, monitoring, and human escalation workflows.",
    };
  }

  if (/document|knowledge|search|retrieval|rag/.test(lower)) {
    return {
      title: "RAG-Powered Knowledge System",
      techStack: ["LangChain + RAG Pipeline", "Vector DB (Pinecone / Qdrant / Weaviate)", "Embedding Models (OpenAI / Cohere)", "Document Processing (Unstructured.io)", "Python / FastAPI Backend"],
      phases: [
        { name: "Discovery & Data Assessment", duration: "2 weeks" },
        { name: "Pipeline PoC", duration: "4 weeks" },
        { name: "Production Build", duration: "6-8 weeks" },
        { name: "Optimization & Fine-tuning", duration: "3 weeks" },
      ],
      budgetRange: "\u20ac20,000 - \u20ac60,000",
      deliverables: [
        "Document ingestion pipeline supporting PDF, DOCX, HTML, and structured data",
        "Semantic search engine with hybrid retrieval (dense + sparse)",
        "Source-cited answer generation with confidence scoring",
        "Automated document sync and re-indexing pipeline",
        "User-facing search interface with filters and faceted search",
        "Admin dashboard for pipeline monitoring and data management",
        "API endpoints for integration with existing systems",
      ],
      risks: [
        "Document quality and structure significantly affect retrieval accuracy",
        "Large document corpuses require careful chunking strategy optimization",
        "Embedding model selection impacts search quality and cost",
        "Data freshness — stale documents can lead to outdated answers",
      ],
      approach:
        "We begin with a data audit to understand your document landscape, then build a chunking and embedding pipeline optimized for your content types. The PoC focuses on a representative subset to validate retrieval quality before scaling to your full corpus.",
    };
  }

  if (/agent|automate|workflow|autonomous/.test(lower)) {
    return {
      title: "AI Agent & Workflow Automation",
      techStack: ["LangGraph / CrewAI", "Tool-calling LLMs (GPT-4 / Claude)", "MCP Server Integration", "BullMQ / Temporal (Orchestration)", "PostgreSQL + Redis"],
      phases: [
        { name: "Workflow Analysis & Design", duration: "2 weeks" },
        { name: "Agent PoC", duration: "4 weeks" },
        { name: "Production Development", duration: "8-10 weeks" },
        { name: "Testing & Guardrails", duration: "3 weeks" },
      ],
      budgetRange: "\u20ac25,000 - \u20ac75,000",
      deliverables: [
        "Custom AI agents with defined tool-use capabilities",
        "Workflow orchestration with retry logic and error handling",
        "Integration with your existing APIs and business systems",
        "Human-in-the-loop approval workflows for critical decisions",
        "Comprehensive audit trail and logging system",
        "Agent performance monitoring dashboard",
        "Safety guardrails and output validation framework",
      ],
      risks: [
        "Agent reliability requires extensive testing across edge cases",
        "Tool integration complexity depends on API maturity of target systems",
        "Autonomous decision-making needs carefully defined boundaries",
        "Cost management — agent loops can consume significant API credits",
      ],
      approach:
        "We map your existing workflows to identify high-impact automation opportunities, then build agents with clear boundaries and human oversight. Each agent is tested against comprehensive edge-case scenarios before deployment, with built-in guardrails to prevent runaway behavior.",
    };
  }

  if (/voice|call|phone|speech/.test(lower)) {
    return {
      title: "Voice AI System",
      techStack: ["Whisper / Deepgram (STT)", "ElevenLabs / Azure TTS", "LangChain Conversational Agent", "Twilio / WebRTC", "FastAPI + WebSocket Backend"],
      phases: [
        { name: "Discovery & Voice Design", duration: "2 weeks" },
        { name: "Voice PoC", duration: "4 weeks" },
        { name: "Production Development", duration: "8-10 weeks" },
        { name: "Testing & Voice Tuning", duration: "3 weeks" },
      ],
      budgetRange: "\u20ac30,000 - \u20ac80,000",
      deliverables: [
        "Real-time voice-to-text transcription pipeline",
        "Natural-sounding text-to-speech with custom voice profiles",
        "Conversational AI engine with context management",
        "Phone system integration (SIP/Twilio) or web-based voice interface",
        "Call recording, transcription, and analytics",
        "Multi-language support with automatic language detection",
        "Sentiment analysis and escalation triggers",
      ],
      risks: [
        "Audio quality and background noise affect transcription accuracy",
        "Latency requirements are strict for natural conversation flow",
        "Voice cloning and synthesis raise ethical and legal considerations",
        "Telephony integration complexity varies by provider and region",
      ],
      approach:
        "We design the voice experience around your specific use cases — inbound support, outbound calls, or voice-enabled interfaces. The PoC validates latency, accuracy, and natural conversation flow before building the full production system with telephony integration.",
    };
  }

  if (/compliance|ai act|regulation|audit/.test(lower)) {
    return {
      title: "EU AI Act Compliance Program",
      techStack: ["Risk Assessment Framework", "Documentation Templates (ISO 42001)", "Monitoring & Audit Tooling", "Compliance Dashboard (React + Node.js)", "Automated Testing Suite"],
      phases: [
        { name: "AI System Inventory & Risk Classification", duration: "2 weeks" },
        { name: "Gap Analysis & Roadmap", duration: "3 weeks" },
        { name: "Documentation & Implementation", duration: "6-8 weeks" },
        { name: "Audit Preparation & Review", duration: "3 weeks" },
      ],
      budgetRange: "\u20ac10,000 - \u20ac40,000",
      deliverables: [
        "Complete AI system inventory with risk classifications",
        "Gap analysis report against EU AI Act requirements",
        "Technical documentation package for high-risk systems",
        "Risk management system design and implementation",
        "Human oversight procedures and training materials",
        "Post-market monitoring plan",
        "Compliance dashboard for ongoing monitoring",
      ],
      risks: [
        "Regulatory requirements are still being finalized in some areas",
        "Cross-border operations may require multiple jurisdiction assessments",
        "Third-party AI components need separate compliance verification",
        "Ongoing compliance requires dedicated internal resources",
      ],
      approach:
        "We start with a comprehensive inventory of all your AI systems and classify each according to EU AI Act risk categories. From there, we build a prioritized compliance roadmap focusing on high-risk systems first, with templates and tools to maintain compliance over time.",
    };
  }

  // Default
  return {
    title: "General AI Integration",
    techStack: ["Python / Node.js Backend", "LLM APIs (OpenAI / Claude / Open-source)", "Cloud Infrastructure (AWS / GCP)", "React / Next.js Frontend", "PostgreSQL + Redis"],
    phases: [
      { name: "Discovery & Feasibility Study", duration: "2 weeks" },
      { name: "Proof of Concept", duration: "3-4 weeks" },
      { name: "Production Development", duration: "6-10 weeks" },
      { name: "Testing & Launch", duration: "2-3 weeks" },
    ],
    budgetRange: "\u20ac15,000 - \u20ac50,000",
    deliverables: [
      "AI feasibility assessment and architecture design",
      "Working proof of concept with your data",
      "Production-ready AI system with API endpoints",
      "Integration with your existing tech stack",
      "Monitoring and observability setup",
      "Documentation and knowledge transfer",
      "30-day post-launch support",
    ],
    risks: [
      "Data quality and availability directly impact AI system performance",
      "Model selection requires balancing accuracy, speed, and cost",
      "Integration complexity depends on existing system architecture",
      "User adoption requires change management alongside technical delivery",
    ],
    approach:
      "We follow a proven Discovery-PoC-Production methodology. The discovery phase validates feasibility and identifies the highest-impact AI opportunity. The PoC proves value with your actual data before committing to full production development.",
  };
}

export function AiScopeGenerator() {
  const [inputs, setInputs] = useState<FormInputs>({
    description: "",
    industry: "",
    companySize: "",
    timeline: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScopeEstimate | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.description.trim()) {
      setError("Please describe your AI project");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    setTimeout(() => {
      const estimate = detectProjectType(inputs.description);
      setResult(estimate);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setInputs({ description: "", industry: "", companySize: "", timeline: "" });
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Project Scope Generator</h2>
        <p className="text-indigo-200">
          Describe your project in plain English and get an instant scope estimate
        </p>
      </div>

      <div className="p-6">
        {!result && !isAnalyzing ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your AI project in plain English <span className="text-red-500">*</span>
              </label>
              <textarea
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                placeholder="e.g., We want to build a chatbot that answers customer questions using our product documentation and support tickets..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none ${
                  error ? "border-red-400" : "border-gray-300"
                }`}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={inputs.industry}
                  onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="">Select...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company size</label>
                <select
                  value={inputs.companySize}
                  onChange={(e) => setInputs({ ...inputs, companySize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="">Select...</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                <select
                  value={inputs.timeline}
                  onChange={(e) => setInputs({ ...inputs, timeline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="">Select...</option>
                  {TIMELINES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Generate Scope Estimate
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : isAnalyzing ? (
          /* Analyzing Animation */
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing your project...</h3>
            <p className="text-gray-500 text-sm">
              Evaluating scope, tech stack, and timeline requirements
            </p>
          </div>
        ) : result ? (
          /* Results */
          <div className="space-y-6">
            {/* Project Title */}
            <div className="text-center pb-4 border-b border-gray-200">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                <Sparkles className="w-4 h-4" />
                Scope Estimate
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{result.title}</h3>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Recommended Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Estimated Timeline
              </h4>
              <div className="space-y-2">
                {result.phases.map((phase, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700">{phase.name}</span>
                    </div>
                    <span className="text-sm font-medium text-indigo-600">{phase.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-indigo-700 font-semibold mb-1">
                <Euro className="w-5 h-5" />
                Estimated Budget Range
              </div>
              <div className="text-3xl font-bold text-indigo-600">{result.budgetRange}</div>
              <p className="text-sm text-indigo-600/70 mt-1">
                Final pricing depends on specific requirements and complexity
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {result.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Risk Factors
              </h4>
              <ul className="space-y-2">
                {result.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Approach */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Approach</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{result.approach}</p>
            </div>

            {/* CTAs */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <a
                href="/contact?type=ai"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
              >
                Get a Detailed Proposal — Book a Free Call
              </a>
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors py-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
