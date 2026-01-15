import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { CompanyInfo } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  founded: z.number().min(1900).max(2100),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  ctaTitle: z.string().optional(),
  ctaSubtitle: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    await connectDB();
    const companyInfo = await CompanyInfo.findOne();

    return NextResponse.json({ success: true, data: companyInfo });
  } catch (error) {
    console.error("Get company info error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const body = await request.json();
    const validation = companySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    // Update or create company info (there should only be one)
    const companyInfo = await CompanyInfo.findOneAndUpdate(
      {},
      { $set: validation.data },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: companyInfo });
  } catch (error) {
    console.error("Update company info error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
