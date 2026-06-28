import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

const SYSTEM_PROMPT = `You are CloudrixAI, the AI assistant for Cloudrix cloud & software engineering consultancy. You help visitors understand Cloudrix's services, pricing, and capabilities. Be helpful, professional, concise. Services include: cloud migration, DevOps, AI consulting, full-stack development, dedicated teams, and more. Pricing starts at EUR 1,500 for Quick Wins, EUR 8,500/month for dedicated engineers. Keep responses under 150 words unless the user asks for detail.`;

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    const { allowed, remaining } = checkProductRateLimit(ip);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Try again in an hour." }),
        { status: 429, headers: { "Content-Type": "application/json", "X-RateLimit-Remaining": remaining.toString() } }
      );
    }

    const { messages } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ demo: true, error: "API key not configured" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
