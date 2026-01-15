import connectDB from "@/lib/mongodb";
import {
  Service,
  Stat,
  ProcessStep,
  TrustPoint,
  CaseStudy,
  Page,
} from "@/lib/models";
import { HomeContent } from "@/components/pages/home-content";
import type { ILocalizedContent } from "@/lib/models/page";

async function getHomeData() {
  try {
    await connectDB();

    const [services, stats, processSteps, trustPoints, caseStudies, pageData] =
      await Promise.all([
        Service.find({ isActive: true }).sort({ order: 1 }).limit(4).lean(),
        Stat.find({ isActive: true }).sort({ order: 1 }).lean(),
        ProcessStep.find({ isActive: true }).sort({ step: 1 }).lean(),
        TrustPoint.find({ isActive: true }).sort({ order: 1 }).lean(),
        CaseStudy.find({ isActive: true }).sort({ order: 1 }).limit(3).lean(),
        Page.findOne({ slug: "home", isPublished: true }).lean(),
      ]);

    return {
      services: JSON.parse(JSON.stringify(services)),
      stats: JSON.parse(JSON.stringify(stats)),
      processSteps: JSON.parse(JSON.stringify(processSteps)),
      trustPoints: JSON.parse(JSON.stringify(trustPoints)),
      caseStudies: JSON.parse(JSON.stringify(caseStudies)),
      pageContent: pageData?.content
        ? JSON.parse(JSON.stringify(pageData.content))
        : { en: {}, fr: {} },
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      services: [],
      stats: [],
      processSteps: [],
      trustPoints: [],
      caseStudies: [],
      pageContent: { en: {}, fr: {} },
    };
  }
}

export default async function HomePage() {
  const { services, stats, processSteps, trustPoints, caseStudies, pageContent } =
    await getHomeData();

  return (
    <HomeContent
      pageContent={pageContent as ILocalizedContent}
      services={services}
      stats={stats}
      processSteps={processSteps}
      trustPoints={trustPoints}
      caseStudies={caseStudies}
    />
  );
}

export const revalidate = 60;
