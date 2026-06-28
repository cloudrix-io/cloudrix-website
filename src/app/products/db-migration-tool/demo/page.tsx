"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type DB = "mysql" | "postgresql" | "oracle" | "sqlserver" | "mongodb";

const dbNames: Record<DB, string> = {
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  oracle: "Oracle",
  sqlserver: "SQL Server",
  mongodb: "MongoDB",
};

const dbColors: Record<DB, string> = {
  mysql: "bg-blue-500",
  postgresql: "bg-blue-700",
  oracle: "bg-red-600",
  sqlserver: "bg-slate-600",
  mongodb: "bg-green-600",
};

interface FeatureComparison {
  feature: string;
  values: Record<DB, string>;
}

const featureComparisons: FeatureComparison[] = [
  { feature: "ACID Transactions", values: { mysql: "Yes", postgresql: "Yes", oracle: "Yes", sqlserver: "Yes", mongodb: "Partial" } },
  { feature: "JSON Support", values: { mysql: "Basic", postgresql: "Advanced", oracle: "Yes", sqlserver: "Basic", mongodb: "Native" } },
  { feature: "Full-Text Search", values: { mysql: "Yes", postgresql: "Advanced", oracle: "Yes", sqlserver: "Yes", mongodb: "Yes" } },
  { feature: "Stored Procedures", values: { mysql: "Yes", postgresql: "Yes", oracle: "Advanced", sqlserver: "Advanced", mongodb: "No" } },
  { feature: "Partitioning", values: { mysql: "Yes", postgresql: "Yes", oracle: "Advanced", sqlserver: "Yes", mongodb: "Yes (Sharding)" } },
  { feature: "Replication", values: { mysql: "Yes", postgresql: "Yes", oracle: "Yes", sqlserver: "Yes", mongodb: "Yes (Replica Set)" } },
  { feature: "Window Functions", values: { mysql: "Yes (8.0+)", postgresql: "Yes", oracle: "Yes", sqlserver: "Yes", mongodb: "Yes (5.0+)" } },
  { feature: "Materialized Views", values: { mysql: "No", postgresql: "Yes", oracle: "Yes", sqlserver: "Yes (Indexed)", mongodb: "Yes (On-Demand)" } },
  { feature: "CTE / Recursive Queries", values: { mysql: "Yes (8.0+)", postgresql: "Yes", oracle: "Yes", sqlserver: "Yes", mongodb: "No" } },
  { feature: "Licensing", values: { mysql: "Open Source / Commercial", postgresql: "Open Source", oracle: "Commercial", sqlserver: "Commercial", mongodb: "Open Source / Commercial" } },
];

interface CompatibilityInfo {
  compatibility: "high" | "medium" | "low";
  steps: string[];
  risks: { level: "low" | "medium" | "high"; description: string }[];
  estimatedTime: string;
  complexity: string;
}

function getCompatibility(source: DB, target: DB): CompatibilityInfo {
  if (source === target) {
    return {
      compatibility: "high",
      steps: ["Version upgrade or same-version migration", "Use native dump/restore tools", "Verify configuration compatibility"],
      risks: [{ level: "low", description: "Minimal risk for same-engine migrations" }],
      estimatedTime: "1-4 hours",
      complexity: "Low",
    };
  }

  const relational = ["mysql", "postgresql", "oracle", "sqlserver"];
  const isSourceRel = relational.includes(source);
  const isTargetRel = relational.includes(target);

  if (isSourceRel && isTargetRel) {
    // SQL to SQL
    const steps = [
      "Analyze source schema: tables, constraints, indexes, views",
      "Map data types between source and target engines",
      "Generate target DDL scripts with adjusted syntax",
      "Migrate stored procedures and functions (manual review needed)",
      "Export data using native or ETL tools",
      "Import data into target with constraint validation",
      "Recreate indexes and optimize for target engine",
      "Update application connection strings and queries",
      "Run integration tests against new database",
      "Perform parallel running period before cutover",
    ];
    const oracleInvolved = source === "oracle" || target === "oracle";
    return {
      compatibility: oracleInvolved ? "medium" : "high",
      steps,
      risks: [
        { level: oracleInvolved ? "high" : "medium", description: "Stored procedure syntax differences require manual translation" },
        { level: "medium", description: "Data type mapping may require precision adjustments" },
        { level: "low", description: "Auto-increment / sequence behavior differences" },
        ...(oracleInvolved ? [{ level: "high" as const, description: "Oracle-specific features (PL/SQL, packages) need significant rewriting" }] : []),
      ],
      estimatedTime: oracleInvolved ? "2-6 weeks" : "1-3 weeks",
      complexity: oracleInvolved ? "High" : "Medium",
    };
  }

  if (!isSourceRel && isTargetRel) {
    // MongoDB to SQL
    return {
      compatibility: "low",
      steps: [
        "Analyze MongoDB collections and document schemas",
        "Design normalized relational schema from document structure",
        "Map embedded documents to related tables with foreign keys",
        "Handle schema variability (optional fields, arrays)",
        "Build ETL pipeline to transform documents to rows",
        "Migrate data in batches with validation",
        "Rewrite application queries from MongoDB driver to SQL",
        "Implement joins to replace embedded document lookups",
        "Add proper indexing for query performance",
        "Extensive testing of data integrity and query results",
      ],
      risks: [
        { level: "high", description: "Document-to-relational schema design requires careful analysis" },
        { level: "high", description: "Application code rewrite needed for query layer" },
        { level: "medium", description: "Nested/embedded data may not map cleanly to tables" },
        { level: "medium", description: "Array fields require junction tables" },
      ],
      estimatedTime: "4-12 weeks",
      complexity: "Very High",
    };
  }

  if (isSourceRel && !isTargetRel) {
    // SQL to MongoDB
    return {
      compatibility: "low",
      steps: [
        "Analyze relational schema and join patterns",
        "Design document models (embed vs. reference decisions)",
        "Plan denormalization strategy for related tables",
        "Build ETL pipeline to transform rows to documents",
        "Handle foreign key relationships in document design",
        "Migrate data with embedded document construction",
        "Rewrite application queries to MongoDB driver/aggregation",
        "Design indexes for common query patterns",
        "Remove stored procedures (rebuild in application layer)",
        "Validate data integrity and query performance",
      ],
      risks: [
        { level: "high", description: "Loss of ACID transaction guarantees across collections" },
        { level: "high", description: "Complete rewrite of data access layer required" },
        { level: "medium", description: "Denormalization increases storage and update complexity" },
        { level: "medium", description: "No native join support — must use aggregation or application joins" },
      ],
      estimatedTime: "4-10 weeks",
      complexity: "Very High",
    };
  }

  return {
    compatibility: "high",
    steps: ["Analyze source and target", "Plan migration"],
    risks: [{ level: "low", description: "Standard migration" }],
    estimatedTime: "1-2 weeks",
    complexity: "Medium",
  };
}

const compatColors = {
  high: { bg: "bg-green-100", text: "text-green-700", label: "High Compatibility" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium Compatibility" },
  low: { bg: "bg-red-100", text: "text-red-700", label: "Low Compatibility" },
};

const riskColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function DBMigrateDemo() {
  const [source, setSource] = useState<DB>("mysql");
  const [target, setTarget] = useState<DB>("postgresql");

  const result = useMemo(() => getCompatibility(source, target), [source, target]);
  const compat = compatColors[result.compatibility];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/db-migration-tool" className="text-indigo-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to DBMigrate</Link>
          <h1 className="text-3xl font-bold">DBMigrate Planning Tool</h1>
          <p className="text-indigo-100 mt-1">Plan your database migration with compatibility analysis and risk assessment</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selectors */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Source Database</label>
              <div className="grid grid-cols-1 gap-2">
                {(Object.entries(dbNames) as [DB, string][]).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setSource(key)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      source === key
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${dbColors[key]} ${source === key ? "ring-2 ring-white" : ""}`} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center py-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Database</label>
              <div className="grid grid-cols-1 gap-2">
                {(Object.entries(dbNames) as [DB, string][]).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setTarget(key)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      target === key
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${dbColors[key]} ${target === key ? "ring-2 ring-white" : ""}`} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Result */}
        <div className={`${compat.bg} border ${result.compatibility === "high" ? "border-green-200" : result.compatibility === "medium" ? "border-yellow-200" : "border-red-200"} rounded-xl p-5 mb-8 flex items-center justify-between`}>
          <div>
            <span className={`text-lg font-semibold ${compat.text}`}>{compat.label}</span>
            <p className="text-sm text-slate-600 mt-1">{dbNames[source]} &rarr; {dbNames[target]}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Est. Time: <span className="font-semibold text-slate-700">{result.estimatedTime}</span></p>
            <p className="text-sm text-slate-500">Complexity: <span className="font-semibold text-slate-700">{result.complexity}</span></p>
          </div>
        </div>

        {/* Migration Steps & Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Migration Steps</h3>
            <ol className="space-y-2">
              {result.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Risk Assessment</h3>
            <div className="space-y-3">
              {result.risks.map((risk, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${riskColors[risk.level]}`}>
                    {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)}
                  </span>
                  <p className="text-sm text-slate-600">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 pb-3">
            <h3 className="font-semibold text-slate-800">Feature Comparison: {dbNames[source]} vs {dbNames[target]}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500">Feature</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-slate-500">{dbNames[source]}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-slate-500">{dbNames[target]}</th>
                </tr>
              </thead>
              <tbody>
                {featureComparisons.map((fc) => (
                  <tr key={fc.feature} className="border-b border-slate-100">
                    <td className="px-6 py-3 text-sm text-slate-700">{fc.feature}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        fc.values[source] === "Yes" || fc.values[source] === "Advanced" || fc.values[source] === "Native" ? "bg-green-100 text-green-700" :
                        fc.values[source] === "No" ? "bg-red-100 text-red-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {fc.values[source]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        fc.values[target] === "Yes" || fc.values[target] === "Advanced" || fc.values[target] === "Native" ? "bg-green-100 text-green-700" :
                        fc.values[target] === "No" ? "bg-red-100 text-red-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {fc.values[target]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Need help migrating?</h2>
          <p className="text-indigo-100 mb-6">Our database engineers can plan and execute your migration with zero downtime. We handle schema conversion, data transfer, and application testing.</p>
          <Link href="/contact" className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
