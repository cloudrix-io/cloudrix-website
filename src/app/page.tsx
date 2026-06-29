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
import { FAQJsonLd } from "@/components/seo";
import type { ILocalizedContent } from "@/lib/models/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloudrix | AI & Cloud Engineering — 24 Free Tools, 50+ Markets",
  description:
    "Senior AI & cloud engineers serving 50+ countries. 24 free tools, EU AI Act compliance, RAG systems, and DevOps. Try free tools or book a free 30-min strategy call — no lock-in.",
};

const homeFaqs = [
  {
    question: "What services does Cloudrix offer?",
    answer:
      "Cloudrix offers cloud migration, AI agent development, RAG system implementation, EU AI Act compliance consulting, DevOps automation, and full-stack product development. We serve companies worldwide from our Netherlands base.",
  },
  {
    question: "How much does Cloudrix charge?",
    answer:
      "Quick Win engagements start from EUR 1,500, dedicated engineering teams from EUR 8,500 per month (with a EUR 7,500 trial month), and AI projects from EUR 2,500 for a compliance scan up to EUR 200K+ for full enterprise deployments. Multi-currency invoicing in EUR, USD, GBP, and AED.",
  },
  {
    question: "Does Cloudrix work with US and international companies?",
    answer:
      "Yes, Cloudrix serves clients in 50+ countries including the US, UK, Germany, UAE, Singapore, Australia, and more. We use async-first workflows and flexible scheduling across timezones, with USD, GBP, and AED invoicing available.",
  },
  {
    question: "What free AI tools does Cloudrix offer?",
    answer:
      "Cloudrix offers 24 free tools including an AI Code Reviewer, EU AI Act Compliance Scanner, Cloud Cost Calculator, Tech Stack Advisor, and more. All tools are free to use with no signup required.",
  },
  {
    question: "Where is Cloudrix based?",
    answer:
      "Cloudrix is based in Tilburg, Netherlands and is registered with the Dutch Chamber of Commerce (KVK). We operate under EU jurisdiction with full GDPR compliance, serving clients globally across Europe, the Americas, Middle East, Asia-Pacific, and Africa.",
  },
];

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
    <>
      <FAQJsonLd faqs={homeFaqs} pageUrl="/" />
      <HomeContent
        pageContent={pageContent as ILocalizedContent}
        services={services}
        stats={stats}
        processSteps={processSteps}
        trustPoints={trustPoints}
        caseStudies={caseStudies}
      />
    </>
  );
}

export const revalidate = 60;
