import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Page } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const pageSchema = z.object({
  slug: z.enum(["home", "services", "about", "contact", "case-studies", "how-we-work"]),
  title: z.string().min(1).max(100),
  isPublished: z.boolean().optional(),
  seoTitle: z.object({
    en: z.string().max(70).optional(),
    fr: z.string().max(70).optional(),
  }).optional(),
  seoDescription: z.object({
    en: z.string().max(160).optional(),
    fr: z.string().max(160).optional(),
  }).optional(),
  order: z.number().optional(),
  content: z.object({
    en: z.record(z.string(), z.any()).optional(),
    fr: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    await connectDB();
    const pages = await Page.find().sort({ order: 1 });

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Get pages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const body = await request.json();
    const validation = pageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for duplicate slug
    const existing = await Page.findOne({ slug: validation.data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A page with this slug already exists" },
        { status: 400 }
      );
    }

    const page = await Page.create(validation.data);

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    console.error("Create page error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
