import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Calendar,
  AlertTriangle,
  CheckSquare,
  FileText,
  Settings,
  Users,
  XCircle,
  Euro,
  ArrowRight,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title:
    "EU AI Act Compliance Playbook - Complete Guide for European Companies | Cloudrix",
  description:
    "The definitive EU AI Act compliance guide. Risk classification framework, 20-item compliance checklist, documentation requirements, governance templates, and cost estimates. Free resource for engineering teams.",
  openGraph: {
    title: "EU AI Act Compliance Playbook - Complete Guide",
    description:
      "Risk classification, compliance checklist, documentation requirements, and governance templates for EU AI Act compliance.",
    url: "https://www.cloudrix.io/resources/eu-ai-act-playbook",
    type: "article",
    images: [
      {
        url: "/og?title=EU%20AI%20Act%20Compliance%20Playbook&subtitle=The%20Complete%20Guide%20for%20European%20Companies&type=guide",
        width: 1200,
        height: 630,
        alt: "EU AI Act Compliance Playbook",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/resources/eu-ai-act-playbook",
  },
};

const tableOfContents = [
  { id: "what-is-eu-ai-act", label: "What is the EU AI Act" },
  { id: "key-dates", label: "Key Dates and Deadlines" },
  { id: "risk-classification", label: "Risk Classification Framework" },
  { id: "compliance-checklist", label: "Compliance Checklist" },
  { id: "documentation", label: "Documentation Requirements" },
  { id: "technical-controls", label: "Technical Controls" },
  { id: "governance-framework", label: "Governance Framework" },
  { id: "common-mistakes", label: "Common Mistakes to Avoid" },
  { id: "cost-estimates", label: "Cost Estimates" },
  { id: "get-help", label: "Get Professional Help" },
];

const timelineEvents = [
  {
    date: "August 2024",
    event: "EU AI Act enters into force",
    status: "past",
  },
  {
    date: "February 2025",
    event: "Prohibited AI practices ban takes effect",
    status: "past",
  },
  {
    date: "August 2025",
    event: "GPAI model obligations apply",
    status: "past",
  },
  {
    date: "August 2026",
    event: "High-risk AI system obligations take effect",
    status: "upcoming",
  },
  {
    date: "August 2027",
    event: "Full enforcement for all AI systems",
    status: "future",
  },
];

const riskTiers = [
  {
    level: "Unacceptable Risk",
    color: "red",
    description:
      "AI systems that pose a clear threat to safety, livelihoods, and rights. These are banned outright.",
    examples: [
      "Social scoring by governments",
      "Real-time biometric identification in public spaces (with limited exceptions)",
      "Manipulation of vulnerable groups",
      "Emotion recognition in workplaces and schools",
    ],
  },
  {
    level: "High Risk",
    color: "orange",
    description:
      "AI systems used in critical areas that significantly impact people. Subject to strict compliance requirements.",
    examples: [
      "Credit scoring and loan decisions",
      "CV screening and recruitment tools",
      "Medical diagnostic AI",
      "Critical infrastructure management",
      "Law enforcement and border control",
      "Educational assessment systems",
    ],
  },
  {
    level: "Limited Risk",
    color: "yellow",
    description:
      "AI systems with specific transparency obligations. Users must be informed they are interacting with AI.",
    examples: [
      "Chatbots and virtual assistants",
      "AI-generated content (deepfakes, synthetic media)",
      "Emotion recognition systems (outside banned contexts)",
      "Biometric categorization systems",
    ],
  },
  {
    level: "Minimal Risk",
    color: "green",
    description:
      "The majority of AI systems. No specific obligations, but voluntary codes of conduct are encouraged.",
    examples: [
      "AI-enabled video games",
      "Spam filters",
      "Inventory management systems",
      "Manufacturing quality control",
    ],
  },
];

const complianceChecklist = [
  {
    category: "Risk Assessment",
    items: [
      "Classify all AI systems by risk tier",
      "Document risk assessment methodology",
      "Identify high-risk use cases in your portfolio",
      "Map AI systems to affected individuals and groups",
    ],
  },
  {
    category: "Technical Requirements",
    items: [
      "Implement data quality management processes",
      "Establish model transparency and explainability measures",
      "Set up human oversight mechanisms",
      "Deploy robustness and accuracy testing frameworks",
      "Implement cybersecurity measures for AI systems",
    ],
  },
  {
    category: "Documentation",
    items: [
      "Create technical documentation for each high-risk system",
      "Maintain training data documentation and provenance",
      "Document model architecture and design choices",
      "Record performance metrics and evaluation results",
      "Prepare instructions for use",
    ],
  },
  {
    category: "Governance",
    items: [
      "Appoint AI compliance officer or team",
      "Establish AI ethics review board",
      "Implement incident reporting procedures",
      "Create audit trail and logging systems",
      "Set up conformity assessment processes",
      "Register high-risk AI systems in EU database",
    ],
  },
];

const costEstimates = [
  {
    tier: "Quick Scan",
    price: "2,500",
    duration: "1-2 weeks",
    description: "Initial assessment of your AI systems against the Act",
    includes: [
      "AI system inventory",
      "Risk tier classification",
      "Gap analysis report",
      "Priority recommendations",
    ],
  },
  {
    tier: "Compliance Roadmap",
    price: "8,000 - 15,000",
    duration: "3-6 weeks",
    description:
      "Detailed compliance plan with technical and organizational measures",
    includes: [
      "Everything in Quick Scan",
      "Technical documentation templates",
      "Implementation roadmap",
      "Governance framework design",
      "Staff training plan",
    ],
  },
  {
    tier: "Implementation Support",
    price: "25,000 - 45,000",
    duration: "3-6 months",
    description:
      "Hands-on implementation of compliance measures across your AI systems",
    includes: [
      "Everything in Compliance Roadmap",
      "Technical controls implementation",
      "Documentation creation",
      "Testing and validation",
      "Audit preparation",
    ],
  },
  {
    tier: "Full Compliance Program",
    price: "60,000+",
    duration: "6-12 months",
    description:
      "End-to-end compliance program for organizations with multiple high-risk AI systems",
    includes: [
      "Everything in Implementation Support",
      "Ongoing monitoring setup",
      "Conformity assessment",
      "EU database registration",
      "Continuous compliance management",
      "Annual review and updates",
    ],
  },
];

export default function EuAiActPlaybookPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "EU AI Act Compliance Playbook", url: "/resources/eu-ai-act-playbook" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Resources", url: "/resources" },
              { name: "EU AI Act Compliance Playbook", url: "/resources/eu-ai-act-playbook" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Free Guide</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                EU AI Act Compliance Playbook
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                The complete guide to understanding and complying with the EU AI
                Act. Risk classification, checklists, documentation templates,
                and cost estimates — everything your team needs to get compliant.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  25 min read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated June 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav>
                  <ol className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-start gap-2"
                        >
                          <span className="text-gray-400 font-mono text-xs mt-0.5">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                {/* Share Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Share this guide
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.cloudrix.io/resources/eu-ai-act-playbook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0A66C2] text-white text-xs font-medium py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://www.cloudrix.io/resources/eu-ai-act-playbook&text=EU%20AI%20Act%20Compliance%20Playbook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 text-white text-xs font-medium py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-16">
              {/* Section 1: What is the EU AI Act */}
              <section id="what-is-eu-ai-act">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    What is the EU AI Act?
                  </h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The EU AI Act (Regulation (EU) 2024/1689) is the world&apos;s
                    first comprehensive legal framework for artificial
                    intelligence. Adopted on 13 June 2024 and entering into force
                    on 1 August 2024, it establishes harmonized rules for the
                    development, deployment, and use of AI systems across the
                    European Union.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Act takes a risk-based approach, categorizing AI systems
                    into four tiers based on their potential to cause harm. Higher
                    risk means stricter requirements — from outright bans on the
                    most dangerous applications to light-touch transparency
                    obligations for low-risk systems.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Who does it apply to?
                    </h4>
                    <ul className="text-blue-800 space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Providers</strong> — anyone who develops or
                          places an AI system on the EU market
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Deployers</strong> — organizations using AI
                          systems within the EU
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Non-EU companies</strong> — if the AI system
                          output is used within the EU
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: Key Dates */}
              <section id="key-dates">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Key Dates and Deadlines
                  </h2>
                </div>
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full flex-shrink-0 ${
                            event.status === "past"
                              ? "bg-green-500"
                              : event.status === "upcoming"
                                ? "bg-yellow-500 ring-4 ring-yellow-100"
                                : "bg-gray-300"
                          }`}
                        />
                        {index < timelineEvents.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-1" />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className="text-sm font-semibold text-gray-500">
                          {event.date}
                        </p>
                        <p
                          className={`font-medium ${
                            event.status === "upcoming"
                              ? "text-yellow-700"
                              : "text-gray-900"
                          }`}
                        >
                          {event.event}
                        </p>
                        {event.status === "past" && (
                          <span className="text-xs text-green-600 font-medium">
                            Already in effect
                          </span>
                        )}
                        {event.status === "upcoming" && (
                          <span className="text-xs text-yellow-600 font-medium">
                            Approaching deadline
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Risk Classification */}
              <section id="risk-classification">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Risk Classification Framework
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The EU AI Act uses a four-tier risk classification system. Your
                  compliance obligations depend entirely on which tier your AI
                  system falls into.
                </p>
                <div className="space-y-6">
                  {riskTiers.map((tier) => {
                    const colorMap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
                      red: {
                        bg: "bg-red-50",
                        border: "border-red-200",
                        badge: "bg-red-100 text-red-700",
                        text: "text-red-900",
                      },
                      orange: {
                        bg: "bg-orange-50",
                        border: "border-orange-200",
                        badge: "bg-orange-100 text-orange-700",
                        text: "text-orange-900",
                      },
                      yellow: {
                        bg: "bg-yellow-50",
                        border: "border-yellow-200",
                        badge: "bg-yellow-100 text-yellow-700",
                        text: "text-yellow-900",
                      },
                      green: {
                        bg: "bg-green-50",
                        border: "border-green-200",
                        badge: "bg-green-100 text-green-700",
                        text: "text-green-900",
                      },
                    };
                    const colors = colorMap[tier.color];
                    return (
                      <div
                        key={tier.level}
                        className={`${colors.bg} border ${colors.border} rounded-xl p-6`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}
                          >
                            {tier.level}
                          </span>
                        </div>
                        <p className={`${colors.text} mb-4 text-sm`}>
                          {tier.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tier.examples.map((example) => (
                            <div
                              key={example}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-400" />
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 4: Compliance Checklist */}
              <section id="compliance-checklist">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Compliance Checklist
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  A 20-item checklist covering all critical compliance areas.
                  Use this as a starting point for your compliance program.
                </p>
                <div className="space-y-8">
                  {complianceChecklist.map((group) => (
                    <div key={group.category}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                        {group.category}
                      </h3>
                      <div className="space-y-3">
                        {group.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100"
                          >
                            <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Documentation Requirements */}
              <section id="documentation">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Documentation Requirements
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  High-risk AI systems require extensive technical
                  documentation. Here is what regulators expect:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "System Description",
                      detail:
                        "General description of the AI system, its intended purpose, and the provider details.",
                    },
                    {
                      title: "Design Specifications",
                      detail:
                        "Detailed architecture, algorithms used, data processing logic, and computational resources.",
                    },
                    {
                      title: "Training Data Details",
                      detail:
                        "Data sources, preparation methods, labeling procedures, data quality measures, and biases identified.",
                    },
                    {
                      title: "Testing & Validation",
                      detail:
                        "Metrics used, test datasets, performance benchmarks, and known limitations.",
                    },
                    {
                      title: "Risk Management",
                      detail:
                        "Risk identification, assessment methodology, mitigation measures, and residual risk analysis.",
                    },
                    {
                      title: "Change Management",
                      detail:
                        "Version control, update procedures, modification logs, and impact assessments for changes.",
                    },
                  ].map((doc) => (
                    <div
                      key={doc.title}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {doc.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm">{doc.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6: Technical Controls */}
              <section id="technical-controls">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Technical Controls Needed
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: Shield,
                      title: "Data Governance",
                      description:
                        "Implement data quality checks, bias detection, and provenance tracking. Ensure training data is representative and free from discriminatory patterns.",
                    },
                    {
                      icon: Settings,
                      title: "Model Monitoring",
                      description:
                        "Deploy real-time monitoring for model drift, performance degradation, and anomalous outputs. Set up automated alerting for threshold violations.",
                    },
                    {
                      icon: Users,
                      title: "Human Oversight",
                      description:
                        "Build human-in-the-loop mechanisms for high-risk decisions. Ensure operators can override, pause, or shut down AI systems at any time.",
                    },
                    {
                      icon: FileText,
                      title: "Audit Logging",
                      description:
                        "Maintain comprehensive logs of AI system inputs, outputs, and decisions. Logs must be retained for the system lifetime plus 10 years for high-risk systems.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Incident Response",
                      description:
                        "Establish clear procedures for AI-related incidents, including notification timelines (72 hours for serious incidents) and corrective action protocols.",
                    },
                  ].map((control) => {
                    const Icon = control.icon;
                    return (
                      <div
                        key={control.title}
                        className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-xl p-6"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {control.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {control.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 7: Governance Framework */}
              <section id="governance-framework">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Governance Framework Template
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  A solid governance framework is the backbone of AI compliance.
                  Here is a template structure your organization can adopt:
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8">
                  <div className="space-y-6">
                    {[
                      {
                        step: "1",
                        title: "AI Steering Committee",
                        detail:
                          "Executive-level body responsible for AI strategy, risk appetite, and compliance oversight. Meets monthly.",
                      },
                      {
                        step: "2",
                        title: "AI Ethics Board",
                        detail:
                          "Cross-functional team reviewing high-risk AI applications before deployment. Includes legal, technical, and domain experts.",
                      },
                      {
                        step: "3",
                        title: "AI Compliance Officer",
                        detail:
                          "Dedicated role managing day-to-day compliance activities, documentation, and regulatory liaison.",
                      },
                      {
                        step: "4",
                        title: "AI Risk Register",
                        detail:
                          "Centralized registry of all AI systems, their risk classifications, and compliance status. Updated continuously.",
                      },
                      {
                        step: "5",
                        title: "Review Cadence",
                        detail:
                          "Quarterly compliance reviews, annual governance audits, and ad-hoc reviews for new AI deployments or significant changes.",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-indigo-900">
                            {item.title}
                          </h4>
                          <p className="text-indigo-800 text-sm">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 8: Common Mistakes */}
              <section id="common-mistakes">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    08
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Common Mistakes to Avoid
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      mistake: "Waiting until the deadline",
                      explanation:
                        "High-risk obligations kick in August 2026. Building a compliance program takes 6-12 months. If you haven't started, you're already behind.",
                    },
                    {
                      mistake: "Treating it as a legal-only problem",
                      explanation:
                        "The EU AI Act requires technical measures — monitoring, logging, testing, and documentation. Your engineering team needs to be involved from day one.",
                    },
                    {
                      mistake: "Under-classifying your AI systems",
                      explanation:
                        "Many companies classify their systems as 'minimal risk' when they actually fall into the 'high risk' category, especially for HR, finance, and healthcare use cases.",
                    },
                    {
                      mistake: "Ignoring third-party AI tools",
                      explanation:
                        "If you deploy third-party AI systems (including SaaS tools with AI features), you have deployer obligations. You can't just point to the vendor.",
                    },
                    {
                      mistake: "No AI inventory",
                      explanation:
                        "You can't comply with what you don't know about. Many organizations have AI systems scattered across departments with no central visibility.",
                    },
                    {
                      mistake: "Over-engineering compliance",
                      explanation:
                        "Not every AI system needs the same level of scrutiny. Start with your high-risk systems and work down. Don't burn resources on minimal-risk systems.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-xl p-5"
                    >
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">
                          {item.mistake}
                        </h4>
                        <p className="text-red-800 text-sm">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 9: Cost Estimates */}
              <section id="cost-estimates">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    09
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Cost Estimates for Compliance
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Compliance costs vary widely depending on the number and
                  complexity of your AI systems. Here are typical ranges based on
                  our experience with European companies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {costEstimates.map((estimate) => (
                    <div
                      key={estimate.tier}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">
                          {estimate.tier}
                        </h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {estimate.duration}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-3">
                        <Euro className="w-5 h-5 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {estimate.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {estimate.description}
                      </p>
                      <ul className="space-y-2">
                        {estimate.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckSquare className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 10: CTA */}
              <section id="get-help">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Get Professional Help with EU AI Act Compliance
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    This playbook gives you the knowledge. We can give you the
                    execution. Our team has helped dozens of European companies
                    achieve compliance — from quick scans to full programs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/eu-ai-act"
                      className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
                    >
                      Explore Our EU AI Act Services
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/contact?type=compliance"
                      className="inline-flex items-center bg-blue-500/20 text-white border border-white/30 px-8 py-4 rounded-lg hover:bg-blue-500/30 transition-colors font-medium text-lg"
                    >
                      Book Free Consultation
                    </Link>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;
