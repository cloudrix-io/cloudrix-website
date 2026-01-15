import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Page } from "@/lib/models";

export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    await connectDB();

    const page = await Page.findOne({ slug, isPublished: true }).lean();

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    // Return content for requested language with fallback to English
    const content = page.content[lang as "en" | "fr"] || page.content.en;
    const seoTitle = page.seoTitle?.[lang as "en" | "fr"] || page.seoTitle?.en || page.title;
    const seoDescription = page.seoDescription?.[lang as "en" | "fr"] || page.seoDescription?.en || "";

    return NextResponse.json({
      success: true,
      data: {
        slug: page.slug,
        title: page.title,
        seoTitle,
        seoDescription,
        content,
      },
    });
  } catch (error) {
    console.error("Get page error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
