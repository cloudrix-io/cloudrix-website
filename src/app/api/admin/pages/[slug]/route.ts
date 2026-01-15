import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Page } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updatePageSchema = z.object({
  title: z.string().min(1).max(100).optional(),
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { slug } = await params;

    await connectDB();
    const page = await Page.findOne({ slug });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Get page error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { slug } = await params;
    const body = await request.json();
    const validation = updatePageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    const page = await Page.findOneAndUpdate(
      { slug },
      { $set: validation.data },
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Update page error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { slug } = await params;

    await connectDB();

    const page = await Page.findOneAndDelete({ slug });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    console.error("Delete page error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
