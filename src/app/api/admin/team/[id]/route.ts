import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { TeamMember } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateTeamMemberSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: z.string().min(1).max(100).optional(),
  bio: z.string().min(1).max(1000).optional(),
  image: z.string().optional().nullable(),
  linkedin: z.string().url().optional().or(z.literal("")).nullable(),
  github: z.string().url().optional().or(z.literal("")).nullable(),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
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
    const teamMember = await TeamMember.findById(id);

    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: teamMember });
  } catch (error) {
    console.error("Get team member error:", error);
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
    const validation = updateTeamMemberSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();
    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      { $set: validation.data },
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: teamMember });
  } catch (error) {
    console.error("Update team member error:", error);
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
    const teamMember = await TeamMember.findByIdAndDelete(id);

    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Team member deleted" });
  } catch (error) {
    console.error("Delete team member error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
