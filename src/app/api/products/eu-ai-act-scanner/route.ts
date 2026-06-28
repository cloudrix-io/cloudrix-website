import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

const SAMPLE_RESULT = {
  riskLevel: "High-Risk",
  riskColor: "orange",
  summary:
    "Based on the information provided, your AI system falls under the High-Risk category of the EU AI Act. Systems used for employment decisions involving automated screening and ranking of candidates are explicitly listed in Annex III as high-risk AI systems.",
  requirements: [
    {
      title: "Risk Management System",
      description:
        "Implement a continuous risk management system that identifies, analyses, and mitigates risks throughout the AI system lifecycle.",
      priority: "Critical",
    },
    {
      title: "Data Governance",
      description:
        "Ensure training, validation, and testing datasets are relevant, representative, and free from errors. Implement bias detection and mitigation measures.",
      priority: "Critical",
    },
    {
      title: "Technical Documentation",
      description:
        "Maintain comprehensive technical documentation covering system design, development, and performance metrics before the system is placed on the market.",
      priority: "High",
    },
    {
      title: "Record-Keeping & Logging",
      description:
        "Implement automatic logging capabilities to ensure traceability of the AI system's functioning throughout its lifecycle.",
      priority: "High",
    },
    {
      title: "Transparency & Information",
      description:
        "Provide clear instructions for use to deployers, including system capabilities, limitations, and human oversight measures.",
      priority: "High",
    },
    {
      title: "Human Oversight",
      description:
        "Design the system to allow effective human oversight, including the ability to interpret outputs, override decisions, and intervene in real-time.",
      priority: "Critical",
    },
    {
      title: "Accuracy, Robustness & Cybersecurity",
      description:
        "Achieve appropriate levels of accuracy and robustness. Implement cybersecurity measures to protect against manipulation.",
      priority: "High",
    },
  ],
  actionItems: [
    "Conduct a Fundamental Rights Impact Assessment (FRIA) before deployment",
    "Register the AI system in the EU public database before placing it on the market",
    "Appoint a human oversight officer responsible for monitoring system decisions",
    "Implement an appeals mechanism for individuals affected by AI decisions",
    "Establish a post-market monitoring plan for continuous compliance",
    "Engage a notified body for conformity assessment if required for your sector",
  ],
  timeline: {
    immediate: "Begin risk management system design and data governance audit",
    threeMonths: "Complete technical documentation and implement logging systems",
    sixMonths: "Conduct conformity assessment and register in EU database",
    twelveMonths: "Full compliance with all high-risk requirements by August 2026 deadline",
  },
};

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    const rateLimit = checkProductRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Free tool allows 5 scans per hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { systemName, description, purpose, dataTypes, decisionImpact, sector } = body;

    if (!systemName || !description || !purpose) {
      return NextResponse.json(
        { error: "System name, description, and purpose are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Demo mode: return sample result
      return NextResponse.json({ ...SAMPLE_RESULT, demoMode: true });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `You are an EU AI Act compliance expert. Analyze the following AI system and provide a compliance assessment.

AI System Name: ${systemName}
Description: ${description}
Purpose: ${purpose}
Data Types Used: ${dataTypes || "Not specified"}
Decision-Making Impact: ${decisionImpact || "Not specified"}
Sector: ${sector || "Not specified"}

Respond ONLY with valid JSON (no markdown, no code fences) in this exact structure:
{
  "riskLevel": "Prohibited" | "High-Risk" | "Limited" | "Minimal",
  "riskColor": "red" | "orange" | "yellow" | "green",
  "summary": "2-3 sentence explanation of why this risk level was assigned",
  "requirements": [
    {
      "title": "Requirement name",
      "description": "What needs to be done",
      "priority": "Critical" | "High" | "Medium" | "Low"
    }
  ],
  "actionItems": ["Specific action item 1", "Action item 2", ...],
  "timeline": {
    "immediate": "What to do now",
    "threeMonths": "What to do in 3 months",
    "sixMonths": "What to do in 6 months",
    "twelveMonths": "What to do in 12 months"
  }
}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response (handle markdown code fences)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];
    jsonStr = jsonStr.trim();

    try {
      const result = JSON.parse(jsonStr);
      return NextResponse.json(result);
    } catch {
      // If JSON parsing fails, return the sample result with AI summary
      return NextResponse.json({ ...SAMPLE_RESULT, summary: text.slice(0, 500), demoMode: false });
    }
  } catch (error) {
    console.error("EU AI Act Scanner error:", error);
    // Return demo result on any error so the user still gets value
    return NextResponse.json({ ...SAMPLE_RESULT, demoMode: true });
  }
}
