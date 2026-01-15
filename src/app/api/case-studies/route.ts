import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";

export async function GET() {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({ isActive: true }).sort({ order: 1 });

    return NextResponse.json({ success: true, data: caseStudies });
  } catch (error) {
    console.error("Get case studies error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load case studies" },
      { status: 500 }
    );
  }
}

export const revalidate = 60;
