import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateCaseStudySchema = z.object({
  title: z.string().min(1).max(150).optional(),
  slug: z.string().min(1).toLowerCase().optional(),
  client: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  challenge: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
  results: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  testimonial: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
  }).optional().nullable(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  image: z.string().optional().nullable(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { id } = await params;

    await connectDB();
    const caseStudy = await CaseStudy.findById(id);

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Get case study error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { id } = await params;
    const body = await request.json();
    const validation = updateCaseStudySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    if (validation.data.slug) {
      const existing = await CaseStudy.findOne({
        slug: validation.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "A case study with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { $set: validation.data },
      { new: true, runValidators: true }
    );

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Update case study error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { id } = await params;

    await connectDB();
    const caseStudy = await CaseStudy.findByIdAndDelete(id);

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Case study deleted" });
  } catch (error) {
    console.error("Delete case study error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
