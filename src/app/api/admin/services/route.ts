import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).toLowerCase(),
  description: z.string().min(1).max(500),
  icon: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  result: z.string().min(1),
  features: z.array(z.string()),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    await connectDB();
    const services = await Service.find().sort({ order: 1 });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Get services error:", error);
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
    const validation = serviceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for duplicate slug
    const existing = await Service.findOne({ slug: validation.data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists" },
        { status: 400 }
      );
    }

    const service = await Service.create(validation.data);

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
