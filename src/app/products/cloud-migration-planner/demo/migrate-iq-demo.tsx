"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowRight,
  RotateCcw,
  Cpu,
  Clock,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Layers,
  Target,
} from "lucide-react";

interface FormInputs {
  currentInfra: string;
  targetCloud: string;
  serviceCount: string;
  databaseType: string;
  compliance: string[];
}

interface MigrationPhase {
  name: string;
  duration: string;
  description: string;
  risk: "High" | "Medium" | "Low";
}

interface MigrationResult {
  strategy: string;
  strategyDescription: string;
  phases: MigrationPhase[];
  estimatedCost: string;
  estimatedTimeline: string;
  tools: { name: string; purpose: string }[];
  keyRisks: string[];
  recommendations: string[];
}

const CURRENT_INFRA = [
  { value: "on-premise", label: "On-Premise" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "GCP" },
  { value: "azure", label: "Azure" },
  { value: "heroku", label: "Heroku" },
  { value: "digitalocean", label: "DigitalOcean" },
];

const TARGET_CLOUD = [
  { value: "aws", label: "Amazon Web Services (AWS)" },
  { value: "gcp", label: "Google Cloud Platform (GCP)" },
  { value: "azure", label: "Microsoft Azure" },
];

const SERVICE_COUNTS = [
  { value: "1-5", label: "1-5 services" },
  { value: "6-20", label: "6-20 services" },
  { value: "21-50", label: "21-50 services" },
  { value: "50+", label: "50+ services" },
];

const DATABASE_TYPES = [
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "sqlserver", label: "SQL Server" },
  { value: "oracle", label: "Oracle" },
  { value: "multiple", label: "Multiple databases" },
];

const COMPLIANCE_OPTIONS = [
  { value: "gdpr", label: "GDPR" },
  { value: "hipaa", label: "HIPAA" },
  { value: "pci-dss", label: "PCI-DSS" },
  { value: "soc2", label: "SOC 2" },
  { value: "eu-ai-act", label: "EU AI Act" },
];

function generateMigrationPlan(inputs: FormInputs): MigrationResult {
  const isLarge = inputs.serviceCount === "21-50" || inputs.serviceCount === "50+";
  const isSmall = inputs.serviceCount === "1-5";
  const hasCompliance = inputs.compliance.length > 0;
  const isOnPrem = inputs.currentInfra === "on-premise";
  const isCloudToCloud = !isOnPrem && inputs.currentInfra !== "heroku" && inputs.currentInfra !== "digitalocean";
  const hasOracle = inputs.databaseType === "oracle";
  const hasMultipleDb = inputs.databaseType === "multiple";

  // Determine strategy
  let strategy: string;
  let strategyDescription: string;

  if (isOnPrem && isLarge) {
    strategy = "Re-Architect (Phased)";
    strategyDescription =
      "Given the scale of your on-premise infrastructure and the number of services, a phased re-architecture approach is recommended. This allows you to modernize applications for cloud-native patterns while migrating in manageable waves, minimizing business disruption.";
  } else if (isOnPrem && !isLarge) {
    strategy = "Re-Platform";
    strategyDescription =
      "Move your applications to the cloud with moderate optimizations. This balances speed with cloud-native benefits - updating databases to managed services, containerizing applications, and leveraging cloud networking without a full rewrite.";
  } else if (isCloudToCloud) {
    strategy = "Lift & Shift with Optimization";
    strategyDescription =
      "Since you are already on a cloud platform, the migration can leverage existing cloud-native patterns. Focus on mapping equivalent services, migrating data with minimal downtime, and optimizing for the target cloud's pricing and feature strengths.";
  } else {
    strategy = "Re-Platform";
    strategyDescription =
      "Migrate from your current platform to a full cloud environment with managed services. This involves containerizing applications, migrating databases to managed equivalents, and setting up proper CI/CD pipelines.";
  }

  // Generate phases
  const phases: MigrationPhase[] = [];

  phases.push({
    name: "Discovery & Assessment",
    duration: isLarge ? "3-4 weeks" : "1-2 weeks",
    description:
      "Inventory all applications, databases, dependencies, and data flows. Identify migration candidates and prioritize based on business value and complexity.",
    risk: "Low",
  });

  phases.push({
    name: "Architecture Design & Planning",
    duration: isLarge ? "2-3 weeks" : "1-2 weeks",
    description: `Design target architecture on ${inputs.targetCloud === "aws" ? "AWS" : inputs.targetCloud === "gcp" ? "GCP" : "Azure"}. Map services, define networking, security, and ${hasCompliance ? "compliance controls" : "monitoring setup"}.`,
    risk: "Low",
  });

  if (hasCompliance) {
    phases.push({
      name: "Compliance & Security Setup",
      duration: "2-3 weeks",
      description: `Implement ${inputs.compliance.map((c) => c.toUpperCase().replace("-", " ")).join(", ")} controls including encryption, access policies, audit logging, and data residency requirements.`,
      risk: "Medium",
    });
  }

  phases.push({
    name: "Data Migration",
    duration: isLarge
      ? "4-6 weeks"
      : hasOracle || hasMultipleDb
        ? "3-4 weeks"
        : "2-3 weeks",
    description: `Migrate ${inputs.databaseType === "multiple" ? "all databases" : inputs.databaseType} to ${inputs.targetCloud === "aws" ? "Amazon RDS/Aurora" : inputs.targetCloud === "gcp" ? "Cloud SQL/AlloyDB" : "Azure SQL/Cosmos DB"} with validation, data integrity checks, and rollback procedures.`,
    risk: hasOracle || hasMultipleDb ? "High" : "Medium",
  });

  phases.push({
    name: "Application Migration",
    duration: isLarge ? "6-10 weeks" : isSmall ? "2-3 weeks" : "4-6 weeks",
    description:
      "Migrate applications in prioritized waves. Each wave includes deployment, testing, DNS cutover, and monitoring validation before proceeding to the next.",
    risk: isLarge ? "High" : "Medium",
  });

  phases.push({
    name: "Validation & Optimization",
    duration: isLarge ? "3-4 weeks" : "1-2 weeks",
    description:
      "Performance testing, cost optimization, right-sizing resources, and decommissioning source infrastructure after validation period.",
    risk: "Low",
  });

  // Calculate cost
  const baseCost = isSmall ? 15000 : isLarge ? 80000 : 35000;
  const complianceMultiplier = hasCompliance
    ? 1 + inputs.compliance.length * 0.1
    : 1;
  const complexityMultiplier = hasOracle ? 1.3 : hasMultipleDb ? 1.2 : 1;
  const totalMin = Math.round(baseCost * complianceMultiplier * complexityMultiplier);
  const totalMax = Math.round(totalMin * 1.8);

  // Calculate total timeline
  const totalWeeksMin = phases.reduce((sum, p) => {
    const match = p.duration.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 2);
  }, 0);
  const totalWeeksMax = phases.reduce((sum, p) => {
    const parts = p.duration.match(/(\d+)(?:-(\d+))?/);
    return sum + (parts ? parseInt(parts[2] || parts[1]) : 4);
  }, 0);

  // Tools based on target cloud
  const toolMap: Record<string, { name: string; purpose: string }[]> = {
    aws: [
      { name: "AWS Migration Hub", purpose: "Central migration tracking and orchestration" },
      { name: "AWS Database Migration Service", purpose: "Database replication and migration" },
      { name: "AWS Application Migration Service", purpose: "Server and application migration" },
      { name: "AWS CloudFormation / Terraform", purpose: "Infrastructure as Code deployment" },
      { name: "Amazon CloudWatch", purpose: "Monitoring and alerting during migration" },
    ],
    gcp: [
      { name: "Google Migrate for Compute Engine", purpose: "VM and application migration" },
      { name: "Database Migration Service", purpose: "Database replication and migration" },
      { name: "Google Cloud Deploy", purpose: "CI/CD pipeline for deployments" },
      { name: "Terraform / Deployment Manager", purpose: "Infrastructure as Code deployment" },
      { name: "Google Cloud Monitoring", purpose: "Monitoring and alerting during migration" },
    ],
    azure: [
      { name: "Azure Migrate", purpose: "Central migration assessment and tracking" },
      { name: "Azure Database Migration Service", purpose: "Database migration with minimal downtime" },
      { name: "Azure Site Recovery", purpose: "Application replication and failover" },
      { name: "Terraform / Azure Bicep", purpose: "Infrastructure as Code deployment" },
      { name: "Azure Monitor", purpose: "Monitoring and alerting during migration" },
    ],
  };

  const tools = toolMap[inputs.targetCloud] || toolMap.aws;

  // Key risks
  const keyRisks: string[] = [
    "Data loss or corruption during database migration — mitigated with checksums and parallel validation",
  ];

  if (isLarge) {
    keyRisks.push(
      "Extended migration timeline increases risk of scope creep and team fatigue"
    );
  }

  if (isOnPrem) {
    keyRisks.push(
      "Network bandwidth limitations may slow data transfer — consider AWS Snowball or dedicated connections"
    );
  }

  if (hasCompliance) {
    keyRisks.push(
      `${inputs.compliance.map((c) => c.toUpperCase().replace("-", " ")).join("/")} compliance gaps during transition require dedicated audit checkpoints`
    );
  }

  keyRisks.push(
    "Application downtime during cutover — mitigated with blue-green deployment strategy"
  );

  if (hasOracle) {
    keyRisks.push(
      "Oracle database migration complexity — license considerations and schema conversion required"
    );
  }

  // Recommendations
  const recommendations: string[] = [
    "Start with a pilot migration of one low-risk application to validate the approach",
    "Set up monitoring and alerting on the target platform before migrating production workloads",
    "Maintain rollback procedures for each migration wave",
    "Train your team on the target cloud platform in parallel with migration activities",
  ];

  if (hasCompliance) {
    recommendations.push(
      "Engage a compliance auditor early to validate the target architecture meets all requirements"
    );
  }

  return {
    strategy,
    strategyDescription,
    phases,
    estimatedCost: `\u20ac${totalMin.toLocaleString()} - \u20ac${totalMax.toLocaleString()}`,
    estimatedTimeline: `${totalWeeksMin} - ${totalWeeksMax} weeks`,
    tools,
    keyRisks,
    recommendations,
  };
}

function RiskBadge({ risk }: { risk: MigrationPhase["risk"] }) {
  const config = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${config[risk]}`}
    >
      {risk} Risk
    </span>
  );
}

export function MigrateIQDemo() {
  const [inputs, setInputs] = useState<FormInputs>({
    currentInfra: "",
    targetCloud: "",
    serviceCount: "",
    databaseType: "",
    compliance: [],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [error, setError] = useState("");

  const toggleCompliance = (value: string) => {
    setInputs((prev) => ({
      ...prev,
      compliance: prev.compliance.includes(value)
        ? prev.compliance.filter((c) => c !== value)
        : [...prev.compliance, value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.currentInfra) {
      setError("Please select your current infrastructure");
      return;
    }
    if (!inputs.targetCloud) {
      setError("Please select a target cloud");
      return;
    }
    if (!inputs.serviceCount) {
      setError("Please select the number of services");
      return;
    }
    if (!inputs.databaseType) {
      setError("Please select a database type");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    setTimeout(() => {
      const plan = generateMigrationPlan(inputs);
      setResult(plan);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleReset = () => {
    setInputs({
      currentInfra: "",
      targetCloud: "",
      serviceCount: "",
      databaseType: "",
      compliance: [],
    });
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/products/cloud-migration-planner"
            className="text-indigo-200 hover:text-white text-sm mb-4 inline-block"
          >
            &larr; Back to MigrateIQ
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">MigrateIQ Demo</h1>
          </div>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Plan your cloud migration with an interactive tool. Get a phased
            timeline, risk assessment, and cost estimates in minutes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            {!result && !isAnalyzing ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Infrastructure{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.currentInfra}
                      onChange={(e) =>
                        setInputs({ ...inputs, currentInfra: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {CURRENT_INFRA.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Cloud <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.targetCloud}
                      onChange={(e) =>
                        setInputs({ ...inputs, targetCloud: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {TARGET_CLOUD.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Services/Apps{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.serviceCount}
                      onChange={(e) =>
                        setInputs({ ...inputs, serviceCount: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {SERVICE_COUNTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Database Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.databaseType}
                      onChange={(e) =>
                        setInputs({ ...inputs, databaseType: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {DATABASE_TYPES.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Compliance Checkboxes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Compliance Requirements{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {COMPLIANCE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${
                          inputs.compliance.includes(opt.value)
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={inputs.compliance.includes(opt.value)}
                          onChange={() => toggleCompliance(opt.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            inputs.compliance.includes(opt.value)
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-400"
                          }`}
                        >
                          {inputs.compliance.includes(opt.value) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Generate Migration Plan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : isAnalyzing ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Generating your migration plan...
                </h3>
                <p className="text-gray-500 text-sm">
                  Analyzing infrastructure, dependencies, and compliance
                  requirements
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Strategy */}
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                    <ArrowRightLeft className="w-4 h-4" />
                    Migration Plan
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {result.strategy}
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
                    {result.strategyDescription}
                  </p>
                </div>

                {/* Cost + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-indigo-700 font-semibold mb-1">
                      <DollarSign className="w-5 h-5" />
                      Estimated Cost
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {result.estimatedCost}
                    </div>
                    <p className="text-xs text-indigo-600/70 mt-1">
                      Migration services and tooling
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-700 font-semibold mb-1">
                      <Clock className="w-5 h-5" />
                      Estimated Timeline
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {result.estimatedTimeline}
                    </div>
                    <p className="text-xs text-purple-600/70 mt-1">
                      End-to-end including validation
                    </p>
                  </div>
                </div>

                {/* Phased Timeline */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Phased Timeline
                  </h4>
                  <div className="space-y-3">
                    {result.phases.map((phase, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </span>
                            <div>
                              <h5 className="text-sm font-semibold text-gray-900">
                                {phase.name}
                              </h5>
                              <span className="text-xs text-indigo-600 font-medium">
                                {phase.duration}
                              </span>
                            </div>
                          </div>
                          <RiskBadge risk={phase.risk} />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed ml-10">
                          {phase.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-indigo-600" />
                    Key Tools Needed
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.tools.map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
                      >
                        <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tool.purpose}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Risks */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    Key Risks
                  </h4>
                  <ul className="space-y-2">
                    {result.keyRisks.map((risk, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-600" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <Link
                    href="/contact?type=migration"
                    className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
                  >
                    Get Detailed Migration Plan
                  </Link>
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

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          This is a simulated demo. Actual migration plans include detailed
          dependency mapping, workload assessments, and custom timeline
          optimization.
        </p>
      </div>
    </div>
  );
}
