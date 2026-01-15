import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/lib/models";

export async function GET() {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    const admin = await Admin.findById(payload.userId);

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
