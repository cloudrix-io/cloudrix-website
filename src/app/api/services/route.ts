import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Service } from "@/lib/models";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ order: 1 });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load services" },
      { status: 500 }
    );
  }
}

export const revalidate = 60;
