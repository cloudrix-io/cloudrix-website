import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    await connectDB();
    const caseStudy = await CaseStudy.findOne({ slug, isActive: true });

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
      { success: false, error: "Failed to load case study" },
      { status: 500 }
    );
  }
}

export const revalidate = 60;
