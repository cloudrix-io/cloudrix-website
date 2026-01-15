import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { TeamMember } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  bio: z.string().min(1).max(1000),
  image: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    await connectDB();
    const teamMembers = await TeamMember.find().sort({ order: 1 });

    return NextResponse.json({ success: true, data: teamMembers });
  } catch (error) {
    console.error("Get team members error:", error);
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
    const validation = teamMemberSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();
    const teamMember = await TeamMember.create(validation.data);

    return NextResponse.json({ success: true, data: teamMember }, { status: 201 });
  } catch (error) {
    console.error("Create team member error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
