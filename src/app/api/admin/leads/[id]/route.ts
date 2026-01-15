import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateLeadSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
  notes: z.string().optional(),
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
    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("Get lead error:", error);
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
    const validation = updateLeadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: validation.data },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("Update lead error:", error);
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
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
