import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

const SAMPLE_RESULT = {
  architectureDescription:
    "A modern, event-driven microservices architecture deployed on AWS using containerized services orchestrated by ECS Fargate. The system uses an API Gateway for request routing, RDS PostgreSQL for transactional data, ElastiCache Redis for caching and session management, and S3/CloudFront for static assets. SQS queues decouple services for reliability, while CloudWatch provides observability across the stack.",
  components: [
    {
      name: "API Gateway",
      service: "AWS API Gateway",
      purpose:
        "Central entry point for all client requests. Handles authentication, rate limiting, and request routing to backend services.",
      tier: "Networking",
    },
    {
      name: "User Service",
      service: "ECS Fargate (Node.js)",
      purpose:
        "Manages user registration, authentication (JWT), profiles, and authorization. Connects to Cognito for OAuth flows.",
      tier: "Application",
    },
    {
      name: "Product Service",
      service: "ECS Fargate (Node.js)",
      purpose:
        "Handles product catalog CRUD, inventory management, and search indexing. Writes to PostgreSQL and publishes events to SQS.",
      tier: "Application",
    },
    {
      name: "Order Service",
      service: "ECS Fargate (Node.js)",
      purpose:
        "Processes orders, manages order lifecycle, coordinates with payment and inventory services via event-driven messaging.",
      tier: "Application",
    },
    {
      name: "Payment Service",
      service: "ECS Fargate (Node.js)",
      purpose:
        "Integrates with Stripe for payment processing. Handles webhooks, refunds, and payment reconciliation.",
      tier: "Application",
    },
    {
      name: "Primary Database",
      service: "RDS PostgreSQL (Multi-AZ)",
      purpose:
        "Stores transactional data: users, products, orders. Multi-AZ deployment for high availability with read replicas for scaling.",
      tier: "Data",
    },
    {
      name: "Cache Layer",
      service: "ElastiCache Redis",
      purpose:
        "Caches frequently accessed data (product listings, sessions), reduces database load, and enables real-time features.",
      tier: "Data",
    },
    {
      name: "Search Engine",
      service: "OpenSearch",
      purpose:
        "Full-text search across products with faceted filtering, autocomplete, and relevance scoring.",
      tier: "Data",
    },
    {
      name: "Message Queue",
      service: "SQS + SNS",
      purpose:
        "Decouples services with asynchronous messaging. Order events, inventory updates, and email notifications flow through queues.",
      tier: "Integration",
    },
    {
      name: "CDN & Static Assets",
      service: "CloudFront + S3",
      purpose:
        "Serves static assets (images, JS, CSS) globally with low latency. S3 for durable object storage.",
      tier: "Networking",
    },
    {
      name: "Monitoring",
      service: "CloudWatch + X-Ray",
      purpose:
        "Centralized logging, metrics, alarms, and distributed tracing across all services for observability.",
      tier: "Operations",
    },
    {
      name: "CI/CD Pipeline",
      service: "GitHub Actions + ECR",
      purpose:
        "Automated build, test, and deploy pipeline. Docker images pushed to ECR, deployed to ECS via rolling updates.",
      tier: "Operations",
    },
  ],
  estimatedMonthlyCost: {
    low: "$800",
    mid: "$2,500",
    high: "$8,000",
    breakdown: [
      { service: "ECS Fargate (4 services)", cost: "$200-$2,000" },
      { service: "RDS PostgreSQL (Multi-AZ)", cost: "$200-$2,000" },
      { service: "ElastiCache Redis", cost: "$50-$500" },
      { service: "OpenSearch", cost: "$100-$1,000" },
      { service: "API Gateway + CloudFront", cost: "$50-$500" },
      { service: "SQS/SNS + S3", cost: "$20-$200" },
      { service: "CloudWatch + X-Ray", cost: "$50-$300" },
      { service: "Data transfer", cost: "$30-$500" },
    ],
    notes:
      "Low estimate assumes minimal traffic (~1K DAU), mid assumes moderate traffic (~10K DAU), high assumes significant traffic (~100K DAU). Costs can be further optimized with reserved instances and Savings Plans.",
  },
  scalingStrategy: {
    horizontal:
      "ECS services auto-scale based on CPU/memory utilization and request count. Target tracking policies maintain 70% CPU utilization.",
    vertical:
      "RDS instances can be resized with minimal downtime. ElastiCache supports online scaling of node types.",
    database:
      "Read replicas handle read-heavy workloads. Connection pooling via PgBouncer reduces connection overhead. Consider sharding at 1M+ records per table.",
    caching:
      "Multi-tier caching: CloudFront edge cache (static), Redis (dynamic), application-level memoization. Cache invalidation via pub/sub events.",
  },
  securityConsiderations: [
    "All inter-service communication encrypted via TLS 1.3 within a private VPC",
    "API Gateway enforces JWT authentication and API key validation",
    "Database credentials stored in AWS Secrets Manager with automatic rotation",
    "WAF rules on API Gateway to prevent common attacks (SQLi, XSS, DDoS)",
    "VPC with private subnets for application and data tiers; only API Gateway in public subnet",
    "IAM roles with least-privilege policies for each service",
    "Automated vulnerability scanning in CI/CD pipeline",
    "PII encrypted at rest with AWS KMS customer-managed keys",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    const rateLimit = checkProductRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Free tool allows 5 generations per hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { requirements, cloudProvider, scale } = body;

    if (!requirements) {
      return NextResponse.json(
        { error: "System requirements are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ...SAMPLE_RESULT, demoMode: true });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3500,
      messages: [
        {
          role: "user",
          content: `You are a senior cloud architect. Generate a detailed cloud architecture recommendation for the following system.

System Requirements: ${requirements}
Cloud Provider: ${cloudProvider || "AWS"}
Scale: ${scale || "Startup"}

Respond ONLY with valid JSON (no markdown, no code fences) in this exact structure:
{
  "architectureDescription": "3-4 sentence overview of the architecture",
  "components": [
    {
      "name": "Component name",
      "service": "Specific cloud service",
      "purpose": "What it does and why",
      "tier": "Networking" | "Application" | "Data" | "Integration" | "Operations"
    }
  ],
  "estimatedMonthlyCost": {
    "low": "$X",
    "mid": "$X",
    "high": "$X",
    "breakdown": [
      { "service": "Service name", "cost": "$X-$Y" }
    ],
    "notes": "Cost assumptions and optimization tips"
  },
  "scalingStrategy": {
    "horizontal": "How to scale horizontally",
    "vertical": "How to scale vertically",
    "database": "Database scaling approach",
    "caching": "Caching strategy"
  },
  "securityConsiderations": ["Security item 1", "Security item 2"]
}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";
    let jsonStr = rawText;
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];
    const result = JSON.parse(jsonStr.trim());

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Architecture Generator error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
