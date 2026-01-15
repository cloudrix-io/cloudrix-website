import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const caseStudySchema = z.object({
  title: z.string().min(1).max(150),
  slug: z.string().min(1).toLowerCase(),
  client: z.string().min(1),
  industry: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  results: z.array(z.string()),
  technologies: z.array(z.string()),
  testimonial: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
  }).optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    await connectDB();
    const caseStudies = await CaseStudy.find().sort({ order: 1 });

    return NextResponse.json({ success: true, data: caseStudies });
  } catch (error) {
    console.error("Get case studies error:", error);
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
    const validation = caseStudySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await CaseStudy.findOne({ slug: validation.data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A case study with this slug already exists" },
        { status: 400 }
      );
    }

    const caseStudy = await CaseStudy.create(validation.data);

    return NextResponse.json({ success: true, data: caseStudy }, { status: 201 });
  } catch (error) {
    console.error("Create case study error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
