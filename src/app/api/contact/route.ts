import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/lead";
import { contactFormSchema, checkRateLimit } from "@/lib/validation";
import { sendLeadNotification, sendThankYouEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    // Check rate limit (5 requests per minute)
    const rateLimit = checkRateLimit(ip, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Connect to MongoDB
    await connectDB();

    // Create lead in database
    const lead = await Lead.create({
      name: data.name,
      company: data.company,
      email: data.email,
      problemType: data.problemType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
      source: "website",
      status: "new",
    });

    // Send notification email to admin (don't fail if email fails)
    await sendLeadNotification(data);

    // Send thank you email to user (don't fail if email fails)
    await sendThankYouEmail({ name: data.name, email: data.email });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        leadId: lead._id,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Don't expose internal errors
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = ["https://www.cloudrix.io", "https://cloudrix.io"];
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
