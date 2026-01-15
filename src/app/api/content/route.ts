import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import {
  Service,
  CaseStudy,
  CompanyInfo,
  TeamMember,
  Stat,
  TrustPoint,
  ProcessStep,
  Technology,
} from "@/lib/models";

// Public API to get all content for the website
// This aggregates all data needed for the homepage and other pages
export async function GET() {
  try {
    await connectDB();

    const [
      services,
      caseStudies,
      companyInfo,
      teamMembers,
      stats,
      trustPoints,
      processSteps,
      technologies,
    ] = await Promise.all([
      Service.find({ isActive: true }).sort({ order: 1 }),
      CaseStudy.find({ isActive: true }).sort({ order: 1 }),
      CompanyInfo.findOne(),
      TeamMember.find({ isActive: true }).sort({ order: 1 }),
      Stat.find({ isActive: true }).sort({ order: 1 }),
      TrustPoint.find({ isActive: true }).sort({ order: 1 }),
      ProcessStep.find({ isActive: true }).sort({ step: 1 }),
      Technology.find({ isActive: true }).sort({ category: 1, order: 1 }),
    ]);

    // Group technologies by category
    const technologiesByCategory = technologies.reduce((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech.name);
      return acc;
    }, {} as Record<string, string[]>);

    return NextResponse.json({
      success: true,
      data: {
        services,
        caseStudies,
        companyInfo,
        teamMembers,
        stats,
        trustPoints,
        processSteps,
        technologies: technologiesByCategory,
      },
    });
  } catch (error) {
    console.error("Get content error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load content" },
      { status: 500 }
    );
  }
}

// Revalidate every 60 seconds
export const revalidate = 60;
