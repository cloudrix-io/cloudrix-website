import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkProductRateLimit } from "@/lib/product-rate-limit";

const SAMPLE_RESULT = {
  overallScore: 62,
  summary:
    "The code has several security vulnerabilities and performance issues that should be addressed before production deployment. The architecture is reasonable but could benefit from better error handling and input validation.",
  issues: [
    {
      severity: "Critical",
      title: "SQL Injection Vulnerability",
      line: "12",
      description:
        "User input is directly concatenated into a SQL query string without sanitization or parameterized queries.",
      suggestion:
        "Use parameterized queries or an ORM to prevent SQL injection attacks.",
    },
    {
      severity: "Critical",
      title: "Missing Authentication Check",
      line: "5",
      description:
        "The endpoint handler does not verify that the user is authenticated before processing the request.",
      suggestion:
        "Add authentication middleware or check the session/token before executing business logic.",
    },
    {
      severity: "Warning",
      title: "No Error Handling",
      line: "15-22",
      description:
        "Database operations are not wrapped in try-catch blocks. Unhandled exceptions could crash the application.",
      suggestion:
        "Wrap database calls in try-catch and return appropriate error responses.",
    },
    {
      severity: "Warning",
      title: "Hardcoded Configuration",
      line: "3",
      description:
        "Database connection string is hardcoded in the source file instead of using environment variables.",
      suggestion:
        "Move sensitive configuration to environment variables and use a config module.",
    },
    {
      severity: "Info",
      title: "Missing TypeScript Types",
      line: "8",
      description:
        "Function parameters use 'any' type, losing the benefits of TypeScript's type system.",
      suggestion:
        "Define proper interfaces or types for function parameters and return values.",
    },
    {
      severity: "Good",
      title: "Clean Function Structure",
      line: "1-25",
      description:
        "The code is organized into clear, single-responsibility functions with descriptive names.",
      suggestion: "",
    },
  ],
  fixedCode:
    '// Fixed version with security improvements\nimport { db } from "./database";\nimport { authenticate } from "./middleware";\n\ninterface UserQuery {\n  id: string;\n  name: string;\n}\n\nexport async function getUser(req: Request): Promise<Response> {\n  try {\n    const user = await authenticate(req);\n    if (!user) {\n      return new Response("Unauthorized", { status: 401 });\n    }\n\n    const { id } = await req.json();\n    const result = await db.query<UserQuery>(\n      "SELECT * FROM users WHERE id = $1",\n      [id]\n    );\n\n    if (!result) {\n      return new Response("Not found", { status: 404 });\n    }\n\n    return Response.json(result);\n  } catch (error) {\n    console.error("getUser error:", error);\n    return new Response("Internal Server Error", { status: 500 });\n  }\n}',
  categories: {
    security: 40,
    performance: 75,
    architecture: 70,
    codeQuality: 65,
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
        { error: "Rate limit exceeded. Free tool allows 5 reviews per hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { code, language } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required." },
        { status: 400 }
      );
    }

    if (code.length > 10000) {
      return NextResponse.json(
        { error: "Code must be under 10,000 characters for the free tool." },
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
          content: `You are a senior code reviewer. Review this ${language} code for security, performance, architecture, and code quality.

\`\`\`${language}
${code}
\`\`\`

Respond ONLY with valid JSON (no markdown, no code fences) in this exact structure:
{
  "overallScore": <number 0-100>,
  "summary": "2-3 sentence overall assessment",
  "issues": [
    {
      "severity": "Critical" | "Warning" | "Info" | "Good",
      "title": "Issue title",
      "line": "Line number or range",
      "description": "What's wrong",
      "suggestion": "How to fix it (empty string for Good items)"
    }
  ],
  "fixedCode": "Complete corrected version of the code as a string",
  "categories": {
    "security": <number 0-100>,
    "performance": <number 0-100>,
    "architecture": <number 0-100>,
    "codeQuality": <number 0-100>
  }
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
    console.error("AI Code Reviewer error:", error);
    return NextResponse.json(
      { error: "Review failed. Please try again." },
      { status: 500 }
    );
  }
}
