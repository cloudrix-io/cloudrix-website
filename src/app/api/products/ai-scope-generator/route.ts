import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

const SAMPLE_RESULT = {
  projectSummary:
    "A vintage furniture marketplace platform connecting sellers of unique, pre-owned furniture pieces with buyers seeking authentic vintage items. The platform will include seller storefronts, search with visual filters, secure payments, shipping integration, and a review system.",
  techStack: [
    {
      technology: "Next.js 15 (App Router)",
      reason:
        "Server-side rendering for SEO-critical marketplace pages, excellent developer experience, and built-in API routes.",
    },
    {
      technology: "PostgreSQL with Prisma ORM",
      reason:
        "Relational data model ideal for products, orders, users, and reviews with complex queries.",
    },
    {
      technology: "Stripe Connect",
      reason:
        "Multi-party payment processing supporting marketplace splits between platform and sellers.",
    },
    {
      technology: "AWS S3 + CloudFront",
      reason:
        "Scalable image storage and CDN for product photos with automatic resizing.",
    },
    {
      technology: "Algolia",
      reason:
        "Fast, faceted search with typo tolerance crucial for marketplace discovery.",
    },
    {
      technology: "Redis",
      reason:
        "Session management, caching hot product listings, and real-time notification queues.",
    },
  ],
  phases: [
    {
      name: "MVP (Phase 1)",
      duration: "8-10 weeks",
      features: [
        "User registration and authentication (email + social)",
        "Seller onboarding and storefront creation",
        "Product listing with photo upload (up to 10 images)",
        "Basic search and category browsing",
        "Shopping cart and Stripe checkout",
        "Order management for buyers and sellers",
        "Responsive design for mobile and desktop",
      ],
    },
    {
      name: "V1 (Phase 2)",
      duration: "6-8 weeks",
      features: [
        "Advanced search with filters (era, style, material, price range)",
        "Seller analytics dashboard",
        "Review and rating system",
        "Wishlist and saved searches with email alerts",
        "Shipping rate calculator and label generation",
        "Admin dashboard for platform management",
        "SEO optimization and sitemap generation",
      ],
    },
    {
      name: "V2 (Phase 3)",
      duration: "6-8 weeks",
      features: [
        "AI-powered image recognition for style categorization",
        "Recommendation engine based on browsing history",
        "In-app messaging between buyers and sellers",
        "Auction functionality for rare pieces",
        "Mobile app (React Native) for iOS and Android",
        "Multi-currency and international shipping support",
        "Seller subscription tiers with premium features",
      ],
    },
  ],
  timeline: {
    total: "20-26 weeks",
    mvpLaunch: "8-10 weeks from project start",
    fullLaunch: "20-26 weeks from project start",
  },
  costEstimate: {
    low: "$45,000",
    mid: "$75,000",
    high: "$120,000",
    notes:
      "Estimates based on senior developer rates of $100-175/hr. Low estimate assumes an offshore team, mid assumes a mixed team, high assumes a fully senior US/EU team. Excludes ongoing hosting, third-party service fees, and maintenance.",
  },
  riskFactors: [
    {
      risk: "Two-sided marketplace cold start",
      mitigation:
        "Launch in a specific niche (e.g., mid-century modern) and seed with curated sellers before opening to buyers.",
    },
    {
      risk: "Payment fraud and disputes",
      mitigation:
        "Implement escrow-style payments with hold periods and Stripe Radar for fraud detection.",
    },
    {
      risk: "Image quality inconsistency",
      mitigation:
        "Provide photo guidelines for sellers and implement minimum image quality checks on upload.",
    },
    {
      risk: "Shipping damage for fragile items",
      mitigation:
        "Partner with specialty furniture shipping providers and offer shipping insurance integration.",
    },
  ],
  teamComposition: [
    { role: "Full-Stack Lead Developer", count: 1, allocation: "100%" },
    { role: "Frontend Developer", count: 1, allocation: "100%" },
    { role: "Backend Developer", count: 1, allocation: "80%" },
    { role: "UI/UX Designer", count: 1, allocation: "50%" },
    { role: "DevOps Engineer", count: 1, allocation: "25%" },
    { role: "QA Engineer", count: 1, allocation: "50%" },
    { role: "Project Manager", count: 1, allocation: "30%" },
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
    const { projectDescription, budgetRange, timeline, teamSize } = body;

    if (!projectDescription) {
      return NextResponse.json(
        { error: "Project description is required." },
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
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are a senior technical project manager and solution architect. Generate a detailed project scope for the following project.

Project Description: ${projectDescription}
Budget Range: ${budgetRange || "Not specified"}
Timeline Preference: ${timeline || "Not specified"}
Team Size: ${teamSize || "Not specified"}

Respond ONLY with valid JSON (no markdown, no code fences) in this exact structure:
{
  "projectSummary": "3-4 sentence project summary",
  "techStack": [
    { "technology": "Tech name", "reason": "Why this technology" }
  ],
  "phases": [
    {
      "name": "Phase name (MVP/V1/V2)",
      "duration": "X-Y weeks",
      "features": ["Feature 1", "Feature 2"]
    }
  ],
  "timeline": {
    "total": "Total estimated duration",
    "mvpLaunch": "When MVP could launch",
    "fullLaunch": "When full product launches"
  },
  "costEstimate": {
    "low": "$X",
    "mid": "$X",
    "high": "$X",
    "notes": "Cost assumptions"
  },
  "riskFactors": [
    { "risk": "Risk description", "mitigation": "How to mitigate" }
  ],
  "teamComposition": [
    { "role": "Role title", "count": 1, "allocation": "Percentage" }
  ]
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
    console.error("AI Scope Generator error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
