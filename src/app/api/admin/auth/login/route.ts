import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/lib/models";
import { createToken, setAuthCookie } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    await connectDB();

    const admin = await Admin.findOne({ email, isActive: true }).select(
      "+password"
    );

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT token
    const token = await createToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    // Set cookie
    await setAuthCookie(token);

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
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
