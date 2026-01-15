import connectDB from "@/lib/mongodb";
import { Page } from "@/lib/models";
import type { ILocalizedContent } from "@/lib/models/page";

export interface PageData {
  slug: string;
  title: string;
  isPublished: boolean;
  seoTitle: { en: string; fr: string };
  seoDescription: { en: string; fr: string };
  content: ILocalizedContent;
}

export async function getPageContent(slug: string): Promise<PageData | null> {
  try {
    await connectDB();
    const page = await Page.findOne({ slug, isPublished: true }).lean();

    if (!page) {
      return null;
    }

    return {
      slug: page.slug,
      title: page.title,
      isPublished: page.isPublished,
      seoTitle: page.seoTitle || { en: "", fr: "" },
      seoDescription: page.seoDescription || { en: "", fr: "" },
      content: page.content || { en: {}, fr: {} },
    };
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
}
