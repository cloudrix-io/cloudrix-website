import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/lib/models";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if ("error" in auth) return auth.error;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
