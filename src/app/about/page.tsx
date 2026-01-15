import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import { CompanyInfo, TeamMember, Stat, TrustPoint, Page } from "@/lib/models";
import { AboutContent } from "@/components/pages/about-content";
import { TeamJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import type { ILocalizedContent } from "@/lib/models/page";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "about", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "About Cloudrix - Senior Engineering for EU Companies";
    const description = pageData?.seoDescription?.en ||
      "Meet the team behind Cloudrix. Senior engineers with 10+ years experience, serving European companies with cloud, development, and DevOps expertise.";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | Cloudrix`,
        description,
        url: "https://cloudrix.io/about",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("Engineers Who Get Things Done")}&subtitle=${encodeURIComponent("Meet the senior team behind Cloudrix")}&type=about`,
            width: 1200,
            height: 630,
            alt: "About Cloudrix - Our Team",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Cloudrix`,
        description,
        images: [`/og?title=${encodeURIComponent("Engineers Who Get Things Done")}&subtitle=${encodeURIComponent("Meet the senior team behind Cloudrix")}&type=about`],
      },
      alternates: {
        canonical: "https://cloudrix.io/about",
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
      <TeamJsonLd members={teamMembers} />
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
