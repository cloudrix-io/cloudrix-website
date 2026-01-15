import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateServiceSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).toLowerCase().optional(),
  description: z.string().min(1).max(500).optional(),
  icon: z.string().min(1).optional(),
  problem: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
  result: z.string().min(1).optional(),
  features: z.array(z.string()).optional(),
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
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Get service error:", error);
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
    const validation = updateServiceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for duplicate slug if slug is being updated
    if (validation.data.slug) {
      const existing = await Service.findOne({
        slug: validation.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "A service with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { $set: validation.data },
      { new: true, runValidators: true }
    );

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Update service error:", error);
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
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
