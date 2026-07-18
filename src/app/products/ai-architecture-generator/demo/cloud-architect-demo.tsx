"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Network,
  ArrowRight,
  RotateCcw,
  Cpu,
  Server,
  Shield,
  DollarSign,
  Gauge,
  Cloud,
  Layers,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface FormInputs {
  description: string;
  provider: string;
  scale: string;
}

interface ArchitectureResult {
  patternName: string;
  patternDescription: string;
  components: string;
  estimatedCost: string;
  scalabilityRating: number;
  scalabilityLabel: string;
  recommendedServices: { name: string; purpose: string }[];
  securityConsiderations: string[];
  additionalNotes: string;
}

const PROVIDERS = [
  { value: "aws", label: "Amazon Web Services (AWS)" },
  { value: "gcp", label: "Google Cloud Platform (GCP)" },
  { value: "azure", label: "Microsoft Azure" },
  { value: "multi", label: "Multi-Cloud" },
];

const SCALES = [
  { value: "startup", label: "Startup (< 10K users)" },
  { value: "growth", label: "Growth (10K - 500K users)" },
  { value: "enterprise", label: "Enterprise (500K+ users)" },
];

function detectArchitecture(
  description: string,
  provider: string,
  scale: string
): ArchitectureResult {
  const lower = description.toLowerCase();
  const isEnterprise = scale === "enterprise";
  const isStartup = scale === "startup";

  const serviceMap: Record<string, Record<string, string>> = {
    gateway: {
      aws: "Amazon API Gateway",
      gcp: "Google Cloud API Gateway",
      azure: "Azure API Management",
      multi: "Kong Gateway / Envoy",
    },
    compute: {
      aws: "AWS Lambda",
      gcp: "Google Cloud Functions",
      azure: "Azure Functions",
      multi: "Knative / OpenFaaS",
    },
    container: {
      aws: "Amazon ECS / EKS",
      gcp: "Google Kubernetes Engine (GKE)",
      azure: "Azure Kubernetes Service (AKS)",
      multi: "Kubernetes (multi-cluster)",
    },
    database: {
      aws: "Amazon RDS / Aurora",
      gcp: "Cloud SQL / AlloyDB",
      azure: "Azure SQL / Cosmos DB",
      multi: "CockroachDB / PlanetScale",
    },
    nosql: {
      aws: "Amazon DynamoDB",
      gcp: "Google Firestore",
      azure: "Azure Cosmos DB",
      multi: "MongoDB Atlas",
    },
    cache: {
      aws: "Amazon ElastiCache (Redis)",
      gcp: "Google Memorystore",
      azure: "Azure Cache for Redis",
      multi: "Redis Enterprise Cloud",
    },
    storage: {
      aws: "Amazon S3",
      gcp: "Google Cloud Storage",
      azure: "Azure Blob Storage",
      multi: "MinIO / Multi-cloud bucket",
    },
    queue: {
      aws: "Amazon SQS / EventBridge",
      gcp: "Google Cloud Pub/Sub",
      azure: "Azure Service Bus",
      multi: "RabbitMQ / Apache Kafka",
    },
    cdn: {
      aws: "Amazon CloudFront",
      gcp: "Cloud CDN",
      azure: "Azure CDN / Front Door",
      multi: "Cloudflare CDN",
    },
    monitoring: {
      aws: "Amazon CloudWatch",
      gcp: "Google Cloud Monitoring",
      azure: "Azure Monitor",
      multi: "Datadog / Grafana Cloud",
    },
  };

  const svc = (key: string) => serviceMap[key]?.[provider] || serviceMap[key]?.["aws"] || key;

  // E-commerce / marketplace
  if (/e-?commerce|shop|store|marketplace|cart|checkout|payment/.test(lower)) {
    return {
      patternName: "Event-Driven Microservices",
      patternDescription:
        "A distributed microservices architecture with event-driven communication for handling orders, payments, inventory, and user sessions with high availability and fault tolerance.",
      components: `${svc("cdn")} -> ${svc("gateway")} -> ${svc("container")} -> ${svc("database")} + ${svc("cache")} + ${svc("queue")}`,
      estimatedCost: isStartup
        ? "$200 - $800/month"
        : isEnterprise
          ? "$5,000 - $25,000/month"
          : "$800 - $5,000/month",
      scalabilityRating: isEnterprise ? 10 : isStartup ? 7 : 9,
      scalabilityLabel: isEnterprise
        ? "Unlimited horizontal scaling"
        : isStartup
          ? "Scales to 50K concurrent users"
          : "Scales to 200K concurrent users",
      recommendedServices: [
        { name: svc("container"), purpose: "Microservice orchestration" },
        { name: svc("database"), purpose: "Transactional data (orders, users)" },
        { name: svc("cache"), purpose: "Session and product catalog caching" },
        { name: svc("queue"), purpose: "Order processing and event bus" },
        { name: svc("cdn"), purpose: "Static assets and product images" },
        { name: svc("storage"), purpose: "Product images and media files" },
      ],
      securityConsiderations: [
        "PCI-DSS compliance for payment processing",
        "Encrypt all data at rest and in transit (TLS 1.3)",
        "Implement rate limiting and DDoS protection",
        "Use WAF rules for SQL injection and XSS prevention",
        "Tokenize payment data - never store raw card numbers",
        "Regular penetration testing and vulnerability scans",
      ],
      additionalNotes:
        "Consider using a managed payment gateway (Stripe/Adyen) to reduce PCI scope. Implement circuit breakers between services to prevent cascade failures.",
    };
  }

  // Real-time / chat / websocket
  if (/real-?time|chat|websocket|live|streaming|notification|push/.test(lower)) {
    return {
      patternName: "Real-Time Event Streaming",
      patternDescription:
        "A WebSocket-based architecture designed for low-latency real-time communication with event streaming, presence detection, and message persistence.",
      components: `${svc("cdn")} -> ${svc("gateway")} -> WebSocket Server -> ${svc("cache")} + ${svc("queue")} -> ${svc("nosql")}`,
      estimatedCost: isStartup
        ? "$150 - $500/month"
        : isEnterprise
          ? "$3,000 - $15,000/month"
          : "$500 - $3,000/month",
      scalabilityRating: isEnterprise ? 10 : isStartup ? 8 : 9,
      scalabilityLabel: isEnterprise
        ? "Millions of concurrent connections"
        : isStartup
          ? "Scales to 100K concurrent connections"
          : "Scales to 500K concurrent connections",
      recommendedServices: [
        { name: svc("container"), purpose: "WebSocket server fleet" },
        { name: svc("cache"), purpose: "Presence tracking and session state" },
        { name: svc("queue"), purpose: "Message fan-out and event streaming" },
        { name: svc("nosql"), purpose: "Message history and user data" },
        { name: svc("cdn"), purpose: "Static frontend delivery" },
        { name: svc("monitoring"), purpose: "Connection health and latency tracking" },
      ],
      securityConsiderations: [
        "Authenticate WebSocket connections with JWT tokens",
        "Implement message rate limiting per user",
        "Encrypt WebSocket traffic (WSS)",
        "Validate and sanitize all incoming messages",
        "Implement connection timeout and reconnection policies",
        "Store messages encrypted at rest for compliance",
      ],
      additionalNotes:
        "Consider using a managed WebSocket service for simpler scaling. Implement message deduplication to handle reconnection scenarios gracefully.",
    };
  }

  // API / backend / microservices
  if (/api|backend|microservice|rest|graphql|service/.test(lower)) {
    return {
      patternName: "Serverless API Gateway",
      patternDescription:
        "A serverless architecture that auto-scales with demand, using managed compute and databases to minimize operational overhead while maintaining high performance.",
      components: `${svc("cdn")} -> ${svc("gateway")} -> ${svc("compute")} -> ${svc("database")} + ${svc("cache")}`,
      estimatedCost: isStartup
        ? "$50 - $200/month"
        : isEnterprise
          ? "$2,000 - $12,000/month"
          : "$200 - $2,000/month",
      scalabilityRating: isEnterprise ? 9 : isStartup ? 9 : 9,
      scalabilityLabel: "Auto-scales to match demand with zero cold-start optimization",
      recommendedServices: [
        { name: svc("gateway"), purpose: "Request routing and rate limiting" },
        { name: svc("compute"), purpose: "Business logic execution" },
        { name: svc("database"), purpose: "Persistent data storage" },
        { name: svc("cache"), purpose: "Response caching and session storage" },
        { name: svc("monitoring"), purpose: "API metrics and alerting" },
        { name: svc("storage"), purpose: "File uploads and static assets" },
      ],
      securityConsiderations: [
        "Implement OAuth 2.0 / OpenID Connect for authentication",
        "Use API keys with rate limiting for external consumers",
        "Enable request validation at the gateway level",
        "Implement least-privilege IAM roles for each function",
        "Enable audit logging for all API calls",
        "Use VPC/private networking for database access",
      ],
      additionalNotes:
        "Serverless is ideal for variable workloads. For consistently high traffic, consider containers for cost efficiency. Use provisioned concurrency for latency-sensitive endpoints.",
    };
  }

  // ML / AI / data pipeline
  if (/machine learning|ml|ai|model|training|inference|data pipeline|etl|analytics/.test(lower)) {
    return {
      patternName: "ML Pipeline Architecture",
      patternDescription:
        "A data-centric architecture for training, deploying, and serving machine learning models with automated pipelines, feature stores, and model versioning.",
      components: `Data Ingestion -> ${svc("storage")} -> Processing Pipeline -> Model Training -> Model Registry -> ${svc("gateway")} -> Inference Endpoint`,
      estimatedCost: isStartup
        ? "$300 - $1,500/month"
        : isEnterprise
          ? "$8,000 - $50,000/month"
          : "$1,500 - $8,000/month",
      scalabilityRating: isEnterprise ? 10 : isStartup ? 7 : 8,
      scalabilityLabel: isEnterprise
        ? "Distributed training across GPU clusters"
        : "Scalable inference with auto-scaling endpoints",
      recommendedServices: [
        { name: svc("storage"), purpose: "Data lake for training datasets" },
        { name: svc("queue"), purpose: "Data ingestion pipeline" },
        {
          name: provider === "aws" ? "Amazon SageMaker" : provider === "gcp" ? "Vertex AI" : provider === "azure" ? "Azure ML" : "MLflow + Kubeflow",
          purpose: "Model training and deployment",
        },
        { name: svc("cache"), purpose: "Feature store and prediction caching" },
        { name: svc("gateway"), purpose: "Inference API endpoint" },
        { name: svc("monitoring"), purpose: "Model performance monitoring and drift detection" },
      ],
      securityConsiderations: [
        "Implement data access controls and encryption for training data",
        "Version and audit all model artifacts",
        "Monitor for model bias and fairness metrics",
        "Secure inference endpoints with authentication",
        "Implement data lineage tracking for compliance",
        "Consider EU AI Act risk classification for deployed models",
      ],
      additionalNotes:
        "Start with managed ML services to reduce infrastructure complexity. Implement A/B testing for model deployment to validate improvements before full rollout.",
    };
  }

  // Static site / SPA / frontend / web app
  if (/static|spa|website|frontend|web app|landing|blog|cms|content/.test(lower)) {
    return {
      patternName: "JAMStack / Edge-First Architecture",
      patternDescription:
        "A modern architecture serving static and dynamic content from the edge, with serverless backend functions for dynamic features. Optimized for speed, SEO, and global reach.",
      components: `${svc("cdn")} -> Edge Functions -> ${svc("compute")} -> ${svc("nosql")} + ${svc("storage")}`,
      estimatedCost: isStartup
        ? "$20 - $100/month"
        : isEnterprise
          ? "$500 - $3,000/month"
          : "$100 - $500/month",
      scalabilityRating: 10,
      scalabilityLabel: "Globally distributed with near-infinite scalability",
      recommendedServices: [
        { name: svc("cdn"), purpose: "Global content delivery and edge caching" },
        { name: svc("compute"), purpose: "Dynamic API routes and server-side rendering" },
        { name: svc("nosql"), purpose: "Content storage and user data" },
        { name: svc("storage"), purpose: "Media and asset storage" },
        { name: svc("monitoring"), purpose: "Core Web Vitals and uptime monitoring" },
        {
          name: provider === "aws" ? "Amazon Route 53" : provider === "gcp" ? "Cloud DNS" : provider === "azure" ? "Azure DNS" : "Cloudflare DNS",
          purpose: "DNS and domain management",
        },
      ],
      securityConsiderations: [
        "Implement Content Security Policy (CSP) headers",
        "Enable HTTPS everywhere with HSTS",
        "Use Subresource Integrity (SRI) for third-party scripts",
        "Implement DDoS protection at the CDN layer",
        "Set up CORS policies for API access",
        "Regular dependency scanning for vulnerabilities",
      ],
      additionalNotes:
        "Use ISR (Incremental Static Regeneration) for pages that change occasionally. Deploy to edge locations closest to your primary user base for optimal TTFB.",
    };
  }

  // Default - Kubernetes Microservices
  return {
    patternName: "Kubernetes Microservices",
    patternDescription:
      "A container-orchestrated microservices architecture with service mesh, distributed tracing, and auto-scaling. Designed for complex applications requiring high reliability and independent service deployments.",
    components: `${svc("cdn")} -> Load Balancer -> ${svc("container")} -> ${svc("database")} + ${svc("cache")} + ${svc("queue")}`,
    estimatedCost: isStartup
      ? "$300 - $1,000/month"
      : isEnterprise
        ? "$5,000 - $30,000/month"
        : "$1,000 - $5,000/month",
    scalabilityRating: isEnterprise ? 10 : isStartup ? 8 : 9,
    scalabilityLabel: isEnterprise
      ? "Horizontally scalable with auto-scaling node groups"
      : "Pod auto-scaling with cluster auto-scaler",
    recommendedServices: [
      { name: svc("container"), purpose: "Container orchestration and service management" },
      { name: svc("database"), purpose: "Persistent data storage" },
      { name: svc("cache"), purpose: "Distributed caching layer" },
      { name: svc("queue"), purpose: "Async communication between services" },
      { name: svc("storage"), purpose: "Persistent volumes and object storage" },
      { name: svc("monitoring"), purpose: "Distributed tracing and log aggregation" },
    ],
    securityConsiderations: [
      "Implement network policies for pod-to-pod communication",
      "Use service mesh (Istio/Linkerd) for mTLS between services",
      "Scan container images for vulnerabilities in CI/CD",
      "Implement RBAC for cluster access control",
      "Use secrets management (Vault/KMS) for sensitive config",
      "Enable audit logging for all cluster operations",
    ],
    additionalNotes:
      "Start with a managed Kubernetes service to reduce operational overhead. Implement GitOps (ArgoCD/Flux) for declarative deployments and easy rollbacks.",
  };
}

export function CloudArchitectDemo() {
  const [inputs, setInputs] = useState<FormInputs>({
    description: "",
    provider: "",
    scale: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ArchitectureResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.description.trim()) {
      setError("Please describe your infrastructure needs");
      return;
    }
    if (!inputs.provider) {
      setError("Please select a cloud provider");
      return;
    }
    if (!inputs.scale) {
      setError("Please select a scale");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    setTimeout(() => {
      const architecture = detectArchitecture(
        inputs.description,
        inputs.provider,
        inputs.scale
      );
      setResult(architecture);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleReset = () => {
    setInputs({ description: "", provider: "", scale: "" });
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/products/ai-architecture-generator"
            className="text-indigo-200 hover:text-white text-sm mb-4 inline-block"
          >
            &larr; Back to CloudArchitect AI
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">CloudArchitect AI Demo</h1>
          </div>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Describe your infrastructure needs in plain English and get a
            production-ready architecture recommendation with cost estimates.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            {!result && !isAnalyzing ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your infrastructure needs{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={inputs.description}
                    onChange={(e) =>
                      setInputs({ ...inputs, description: e.target.value })
                    }
                    placeholder="e.g., We need a real-time chat platform that supports 100K concurrent users, with message persistence, file sharing, and push notifications..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-gray-900 ${
                      error ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cloud Provider <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.provider}
                      onChange={(e) =>
                        setInputs({ ...inputs, provider: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select provider...</option>
                      {PROVIDERS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scale <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputs.scale}
                      onChange={(e) =>
                        setInputs({ ...inputs, scale: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select scale...</option>
                      {SCALES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Generate Architecture
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
                  Designing your architecture...
                </h3>
                <p className="text-gray-500 text-sm">
                  Evaluating patterns, services, and cost optimizations
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Pattern Name */}
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                    <Network className="w-4 h-4" />
                    Architecture Recommendation
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {result.patternName}
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
                    {result.patternDescription}
                  </p>
                </div>

                {/* Architecture Flow */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Architecture Components
                  </h4>
                  <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono whitespace-nowrap">
                      {result.components}
                    </code>
                  </div>
                </div>

                {/* Cost + Scalability Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-indigo-700 font-semibold mb-1">
                      <DollarSign className="w-5 h-5" />
                      Estimated Monthly Cost
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {result.estimatedCost}
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-700 font-semibold mb-1">
                      <Gauge className="w-5 h-5" />
                      Scalability: {result.scalabilityRating}/10
                    </div>
                    <div className="text-sm text-purple-600 mt-1">
                      {result.scalabilityLabel}
                    </div>
                    <div className="mt-2 flex gap-0.5 justify-center">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-6 rounded-full ${
                            i < result.scalabilityRating
                              ? "bg-purple-500"
                              : "bg-purple-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Services */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-indigo-600" />
                    Recommended Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.recommendedServices.map((service, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
                      >
                        <Server className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {service.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {service.purpose}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Considerations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    Security Considerations
                  </h4>
                  <ul className="space-y-2">
                    {result.securityConsiderations.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Notes */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Additional Notes
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {result.additionalNotes}
                  </p>
                </div>

                {/* CTAs */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <Link
                    href="/contact?type=architecture"
                    className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
                  >
                    Get Detailed Architecture Plan
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
          This is a simulated demo. Actual recommendations are generated by our
          AI engine with deeper analysis of your specific requirements.
        </p>
      </div>
    </div>
  );
}
