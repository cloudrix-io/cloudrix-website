import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import NewsletterSubscriber from "@/lib/models/newsletter";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  source: z.string().optional().default("exit-intent"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email, source } = result.data;

    await connectDB();

    // Upsert: if email exists and was unsubscribed, resubscribe
    await NewsletterSubscriber.findOneAndUpdate(
      { email },
      {
        email,
        source,
        isActive: true,
        subscribedAt: new Date(),
        $unset: { unsubscribedAt: 1 },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { success: true, message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch (error) {
    // Handle duplicate key error gracefully
    if (error instanceof Error && "code" in error && (error as { code: number }).code === 11000) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
