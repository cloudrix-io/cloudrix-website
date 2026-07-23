import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Award, Filter, CheckCircle2, Info, Sparkles } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { CaseStudy, Stat, Page } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  caseStudies as staticCaseStudies,
  referenceScenarioDisclaimer,
} from "@/data/case-studies";

// Static stats for fallback — verifiable facts only
const staticStats = [
  { value: "8+", label: "Years Engineering Experience" },
  { value: "NL", label: "KVK-Registered Entity" },
  { value: "24/7", label: "Global Timezone Coverage" },
  { value: "24h", label: "Response Time" },
];

// Filter categories
const industryFilters = [
  "All Industries",
  "Financial Services / FinTech",
  "Enterprise SaaS",
  "Healthcare",
  "E-Commerce",
  "Manufacturing",
];

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "case-studies", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "Reference Scenarios - How We'd Approach Your Project";
    const description = pageData?.seoDescription?.en ||
      "Illustrative engagement blueprints — not client claims. See exactly how Cloudrix would approach cloud migration, AI deployment, and EU AI Act compliance: architecture, timelines, deliverables, and honest budget ranges.";

    return {
      title,
      description,
      openGraph: {
        title: `${title}`,
        description,
        url: "https://www.cloudrix.io/case-studies",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("Reference Scenarios")}&subtitle=${encodeURIComponent("How we'd approach your project — no invented case studies")}&type=case-studies`,
            width: 1200,
            height: 630,
            alt: "Cloudrix Reference Scenarios",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title}`,
        description,
        images: [`/og?title=${encodeURIComponent("Reference Scenarios")}&subtitle=${encodeURIComponent("How we'd approach your project — no invented case studies")}&type=case-studies`],
      },
      alternates: {
        canonical: "https://www.cloudrix.io/case-studies",
      },
    };
  } catch {
    return {
      title: "Reference Scenarios",
      description:
        "Illustrative engagement blueprints — not client claims. See exactly how Cloudrix would approach your project.",
    };
  }
}

async function getCaseStudiesData() {
  try {
    await connectDB();

    const [caseStudies, stats] = await Promise.all([
      CaseStudy.find({ isActive: true }).sort({ order: 1 }).lean(),
      Stat.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);

    const dbCaseStudies = caseStudies && caseStudies.length > 0
      ? JSON.parse(JSON.stringify(caseStudies))
      : [];

    // Merge: use DB case studies + append any static ones not in DB (by slug)
    const dbSlugs = new Set(dbCaseStudies.map((cs: { slug: string }) => cs.slug));
    const extraStatic = staticCaseStudies
      .filter((cs) => !dbSlugs.has(cs.slug))
      .map((cs, index) => ({ ...cs, _id: cs.id || `static-${index}` }));

    const allCaseStudies = [...dbCaseStudies, ...extraStatic];

    return {
      caseStudies: allCaseStudies.length > 0 ? allCaseStudies : staticCaseStudies.map((cs, index) => ({ ...cs, _id: cs.id || String(index) })),
      stats: stats && stats.length > 0 ? JSON.parse(JSON.stringify(stats)) : staticStats,
    };
  } catch (error) {
    console.error("Error fetching case studies data:", error);
  }
  // Fallback to static data
  return {
    caseStudies: staticCaseStudies.map((cs, index) => ({ ...cs, _id: cs.id || String(index) })),
    stats: staticStats,
  };
}

export default async function CaseStudiesPage() {
  const { caseStudies, stats } = await getCaseStudiesData();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Reference Scenarios", url: "/case-studies" },
        ]}
      />
      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Reference Scenarios", url: "/case-studies" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Info className="w-4 h-4" />
                Reference scenarios — not client case studies
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                How We&apos;d Approach Your Project
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Engagement blueprints showing exactly how we work: the
                architecture, the approach, the stack, the timeline, the
                deliverables, and an honest budget range — for the kinds of
                projects we&apos;re built to deliver.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
                >
                  Become Our First Named Case Study
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
                >
                  See How We Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Honesty Disclaimer */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 lg:p-8 flex flex-col sm:flex-row gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">
                  Read this before the scenarios
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {referenceScenarioDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b border-gray-200 sticky top-16 bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {industryFilters.map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      filter === "All Industries"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reference Scenarios */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {caseStudies.map(
                (
                  study: {
                    _id: string;
                    slug: string;
                    title: string;
                    client: string;
                    industry: string;
                    description?: string;
                    challenge?: string;
                    solution?: string;
                    duration?: string;
                    results?: string[];
                    technologies?: string[];
                    image?: string;
                  },
                  index: number
                ) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={study._id || index}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                        isEven ? "" : "lg:grid-flow-dense"
                      }`}
                    >
                      {/* Image */}
                      <div className={`${isEven ? "" : "lg:col-start-2"}`}>
                        <div className="rounded-xl overflow-hidden shadow-2xl">
                          <Image
                            src={
                              study.image ||
                              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                            }
                            alt={study.title}
                            width={800}
                            height={600}
                            className="w-full h-96 object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`${
                          isEven ? "" : "lg:col-start-1 lg:row-start-1"
                        }`}
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                            {study.industry}
                          </span>
                          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                            <Info className="w-3.5 h-3.5" />
                            Reference Scenario
                          </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          {study.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {study.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 mb-8">
                          <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-blue-600" />
                            <span className="text-sm text-gray-700">
                              <span className="font-medium">Type:</span>{" "}
                              Illustrative blueprint — not a client claim
                            </span>
                          </div>
                          {study.duration && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <span className="text-sm text-gray-700">
                                <span className="font-medium">Timeline:</span>{" "}
                                {study.duration}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Challenge & Solution */}
                        <div className="space-y-6 mb-8">
                          {study.challenge && (
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                The Typical Situation
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {study.challenge}
                              </p>
                            </div>
                          )}
                          {study.solution && (
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                How We&apos;d Approach It
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {study.solution}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Deliverables */}
                        {study.results && study.results.length > 0 && (
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                              <h3 className="font-semibold text-gray-900">
                                What You&apos;d Get
                              </h3>
                            </div>
                            <ul className="space-y-2">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-700">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        {study.technologies && study.technologies.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">
                              Typical Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* View Full Scenario Link */}
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
                        >
                          View Full Scenario
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* Stats Section — verifiable facts only */}
        {stats.length > 0 && (
          <section className="py-20 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Facts You Can Verify
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  No inflated numbers — just things you can check yourself,
                  starting with our KVK registration (97732699).
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map(
                  (stat: { value: string; label: string }, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-5xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-blue-100">{stat.label}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Early-client offer
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Become Our First Named Case Study
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Founder-level attention on every deliverable, case-study pricing,
              and — only if you&apos;re happy with the result — your project
              becomes the first real case study on this page. That&apos;s the
              deal, stated plainly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book a Free Intro Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/testimonials"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-white/60 transition-colors font-medium text-lg"
              >
                Guarantees, Not Anonymous Quotes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
