import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Clock, Award, Filter, Globe, Briefcase, MapPin, CheckCircle2, Shield, DollarSign, Zap } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { CaseStudy, Stat, Page } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";

// Static stats for fallback
const staticStats = [
  { value: "8+", label: "Years Engineering Experience" },
  { value: "NL", label: "KVK-Registered Entity" },
  { value: "24/7", label: "Global Timezone Coverage" },
  { value: "24h", label: "Response Time" },
];

// Results highlights for the top section
const resultsHighlights = [
  { value: "55%", label: "Avg Cost Reduction", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
  { value: "99.99%", label: "Uptime Achieved", icon: Shield, color: "text-blue-600", bg: "bg-blue-100" },
  { value: "14 wks", label: "Avg MVP Delivery", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
  { value: "12x/day", label: "Deploy Frequency", icon: Zap, color: "text-orange-600", bg: "bg-orange-100" },
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

const serviceFilters = [
  "All Services",
  "Cloud Migration",
  "Full-Stack Development",
  "DevOps & CI/CD",
  "AI / ML Integration",
  "Legacy Modernization",
];

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "case-studies", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "Case Studies - Real Results for Global Companies";
    const description = pageData?.seoDescription?.en ||
      "See how we helped companies worldwide reduce costs by 55%, launch products in 14 weeks, and achieve 99.99% uptime. Real projects, real results.";

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
            url: `/og?title=${encodeURIComponent("Real Projects, Real Results")}&subtitle=${encodeURIComponent("See how we've helped companies succeed")}&type=case-studies`,
            width: 1200,
            height: 630,
            alt: "Cloudrix Case Studies",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title}`,
        description,
        images: [`/og?title=${encodeURIComponent("Real Projects, Real Results")}&subtitle=${encodeURIComponent("See how we've helped companies succeed")}&type=case-studies`],
      },
      alternates: {
        canonical: "https://www.cloudrix.io/case-studies",
      },
    };
  } catch {
    return {
      title: "Case Studies",
      description: "Real results for companies worldwide. See how we helped clients solve complex technical challenges.",
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
          { name: "Case Studies", url: "/case-studies" },
        ]}
      />
      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Case Studies", url: "/case-studies" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Real results from real projects. See how we&apos;ve helped
                businesses worldwide achieve their goals through expert cloud and
                software engineering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/results"
                  className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
                >
                  View Aggregated Results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Results Highlights */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {resultsHighlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div key={highlight.label} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${highlight.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${highlight.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{highlight.value}</div>
                      <div className="text-gray-500 text-sm">{highlight.label}</div>
                    </div>
                  </div>
                );
              })}
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

        {/* Case Studies */}
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
                        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                          {study.industry}
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
                              <span className="font-medium">Client:</span>{" "}
                              {study.client}
                            </span>
                          </div>
                          {study.duration && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <span className="text-sm text-gray-700">
                                <span className="font-medium">Duration:</span>{" "}
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
                                The Challenge
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {study.challenge}
                              </p>
                            </div>
                          )}
                          {study.solution && (
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                Our Solution
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {study.solution}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Results */}
                        {study.results && study.results.length > 0 && (
                          <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                              <h3 className="font-semibold text-gray-900">
                                Results Achieved
                              </h3>
                            </div>
                            <ul className="space-y-2">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
                              Technologies Used
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

                        {/* View Full Case Study Link */}
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
                        >
                          View Full Case Study
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

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-20 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Our Impact in Numbers
                </h2>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Let&apos;s discuss how we can help you achieve similar results for
              your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/results"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-white/60 transition-colors font-medium text-lg"
              >
                View All Results
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
