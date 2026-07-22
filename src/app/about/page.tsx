import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import { CompanyInfo, TeamMember, Stat, TrustPoint, Page } from "@/lib/models";
import { AboutContent } from "@/components/pages/about-content";
import { BreadcrumbJsonLd } from "@/components/seo";
import type { ILocalizedContent } from "@/lib/models/page";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "about", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "About Cloudrix - Founder-Led Senior Engineering Studio";
    const description = pageData?.seoDescription?.en ||
      "Cloudrix is a founder-led engineering studio in Tilburg, Netherlands (founded 2026). One senior engineer with 10+ years of full-stack experience — EU AI Act implementation, AI systems, and cloud engineering.";

    return {
      title,
      description,
      openGraph: {
        title: `${title}`,
        description,
        url: "https://www.cloudrix.io/about",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("A Founder-Led Engineering Studio")}&subtitle=${encodeURIComponent("Senior engineering, no juniors, no handoffs")}&type=about`,
            width: 1200,
            height: 630,
            alt: "About Cloudrix",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title}`,
        description,
        images: [`/og?title=${encodeURIComponent("A Founder-Led Engineering Studio")}&subtitle=${encodeURIComponent("Senior engineering, no juniors, no handoffs")}&type=about`],
      },
      alternates: {
        canonical: "https://www.cloudrix.io/about",
      },
    };
  } catch {
    return {
      title: "About",
      description: "Learn about Cloudrix - a software engineering company serving European clients with cloud architecture, development, and DevOps services.",
    };
  }
}

async function getAboutData() {
  try {
    await connectDB();

    const [companyInfo, teamMembers, stats, trustPoints, pageData] = await Promise.all([
      CompanyInfo.findOne().lean(),
      TeamMember.find({ isActive: true }).sort({ order: 1 }).lean(),
      Stat.find({ isActive: true }).sort({ order: 1 }).lean(),
      TrustPoint.find({ isActive: true }).sort({ order: 1 }).lean(),
      Page.findOne({ slug: "about", isPublished: true }).lean(),
    ]);

    return {
      companyInfo: JSON.parse(JSON.stringify(companyInfo)),
      teamMembers: JSON.parse(JSON.stringify(teamMembers)),
      stats: JSON.parse(JSON.stringify(stats)),
      trustPoints: JSON.parse(JSON.stringify(trustPoints)),
      pageContent: pageData?.content
        ? JSON.parse(JSON.stringify(pageData.content))
        : { en: {}, fr: {} },
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      companyInfo: null,
      teamMembers: [],
      stats: [],
      trustPoints: [],
      pageContent: { en: {}, fr: {} },
    };
  }
}

export default async function AboutPage() {
  const { companyInfo, teamMembers, stats, trustPoints, pageContent } = await getAboutData();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <AboutContent
        pageContent={pageContent as ILocalizedContent}
        companyInfo={companyInfo}
        teamMembers={teamMembers}
        stats={stats}
        trustPoints={trustPoints}
      />
    </>
  );
}

export const revalidate = 60;
