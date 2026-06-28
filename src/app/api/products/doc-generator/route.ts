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

    const { code, style } = await request.json();

    if (!code || !style) {
      return NextResponse.json(
        { error: "Code and style are required." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ demo: true, error: "API key not configured" });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const styleInstructions: Record<string, string> = {
      jsdoc: "Generate JSDoc documentation with @param, @returns, @throws, @example tags.",
      python: "Generate Python-style docstrings using Google/NumPy style with Args, Returns, Raises, Examples sections.",
      openapi: "Generate an OpenAPI 3.0 YAML schema definition for this code.",
      markdown: "Generate clean Markdown documentation with description, parameters table, return type, and usage examples.",
    };

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Generate documentation for the following code using ${style} style.\n\n${styleInstructions[style] || styleInstructions.markdown}\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nReturn ONLY the documentation, no extra explanation.`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ documentation: text });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
