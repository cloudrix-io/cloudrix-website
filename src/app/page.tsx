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
  title: "Cloudrix | EU AI Act Implementation Engineering & AI Systems",
  description:
    "EU AI Act implementation by engineers, not lawyers. The high-risk deadline moved to Dec 2, 2027 — start now and implement compliance properly, from a EUR 2,500 Quick Scan to full programs. Plus AI agents, RAG systems, and cloud engineering.",
};

const homeFaqs = [
  {
    question: "What services does Cloudrix offer?",
    answer:
      "Cloudrix specializes in EU AI Act implementation engineering — risk classification, technical documentation, and compliance controls built into your codebase. We also build AI agents, RAG systems, and cloud infrastructure. Founder-led, Netherlands-based.",
  },
  {
    question: "How much does Cloudrix charge?",
    answer:
      "EU AI Act work starts at EUR 2,500 for a 1-day Quick Scan, EUR 8,000\u201315,000 for a full compliance audit, and EUR 25,000\u201360,000 for an implementation program. Dedicated engineering starts at EUR 8,500 per month, with a discounted first month at EUR 7,500 so you can evaluate the fit. All prices in EUR.",
  },
  {
    question: "Does Cloudrix work with US and international companies?",
    answer:
      "Yes. The EU AI Act applies to any company whose AI systems are used in the EU, regardless of where the company is headquartered. We work async-first with flexible scheduling across timezones.",
  },
  {
    question: "What free AI tools does Cloudrix offer?",
    answer:
      "Cloudrix offers 24 free tools including an AI Code Reviewer, EU AI Act Compliance Scanner, Cloud Cost Calculator, Tech Stack Advisor, and more. All tools are free to use with no signup required.",
  },
  {
    question: "What is the current EU AI Act deadline?",
    answer:
      "Following the EU Digital Omnibus (approved June 2026), high-risk (Annex III) obligations now apply from December 2, 2027, and Annex I embedded-AI obligations from August 2028. Prohibitions (February 2025) and GPAI obligations (August 2025) already apply. The extended window is the opportunity: companies that start now spread the cost and avoid paying panic prices in late 2027.",
  },
  {
    question: "Where is Cloudrix based?",
    answer:
      "Cloudrix is based in Tilburg, Netherlands and is registered with the Dutch Chamber of Commerce (KVK 97732699). We operate under EU jurisdiction with GDPR-compliant practices and serve clients internationally.",
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
