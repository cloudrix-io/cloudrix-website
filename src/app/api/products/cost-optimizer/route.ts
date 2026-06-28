import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    const { allowed } = checkProductRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in an hour." },
        { status: 429 }
      );
    }

    const { provider, monthlySpend, serviceCount, workloadType, description } =
      await request.json();

    if (!provider || !monthlySpend || !description) {
      return NextResponse.json(
        { error: "Provider, monthly spend, and description are required." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ demo: true, error: "API key not configured" });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a cloud cost optimization expert. Analyze this cloud setup and provide specific savings recommendations.

Cloud Provider: ${provider}
Monthly Spend: $${monthlySpend}
Number of Services: ${serviceCount || "Unknown"}
Main Workload Type: ${workloadType || "General"}

Infrastructure Description:
${description}

Respond in this exact JSON format (no markdown, no code fences):
{
  "estimatedSavingsPercent": <number 10-40>,
  "estimatedSavingsAmount": <number>,
  "recommendations": [
    {
      "title": "<short title>",
      "description": "<1-2 sentence explanation>",
      "savingsPercent": <number>,
      "priority": "high" | "medium" | "low",
      "effort": "easy" | "moderate" | "complex"
    }
  ],
  "priorityActions": ["<action 1>", "<action 2>", "<action 3>"],
  "summary": "<2-3 sentence overall assessment>"
}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ raw: text });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
