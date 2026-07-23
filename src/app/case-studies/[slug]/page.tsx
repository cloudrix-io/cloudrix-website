import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Info,
  Sparkles,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";
import { CaseStudyJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import {
  caseStudies as staticCaseStudies,
  referenceScenarioDisclaimer,
} from "@/data/case-studies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCaseStudyBySlug(slug: string) {
  try {
    await connectDB();
    const caseStudy = await CaseStudy.findOne({ slug, isActive: true }).lean();
    if (caseStudy) {
      return JSON.parse(JSON.stringify(caseStudy));
    }
  } catch (error) {
    console.error("Error fetching case study from DB:", error);
  }
  // Fallback to static data
  const staticStudy = staticCaseStudies.find((s) => s.slug === slug);
  return staticStudy || null;
}

async function getAllCaseStudies() {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    if (caseStudies && caseStudies.length > 0) {
      return JSON.parse(JSON.stringify(caseStudies));
    }
  } catch (error) {
    console.error("Error fetching case studies from DB:", error);
  }
  // Fallback to static data
  return staticCaseStudies;
}

export async function generateStaticParams() {
  // Always use static data for generateStaticParams to avoid MongoDB dependency at build time.
  // DB-only case studies are still accessible at runtime via dynamicParams (true by default).
  return staticCaseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Reference Scenario Not Found",
    };
  }

  const title = study.title;
  const description = study.description || study.challenge?.substring(0, 155) + "...";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Cloudrix Reference Scenario`,
      description,
      url: `https://www.cloudrix.io/case-studies/${slug}`,
      type: "article",
      siteName: "Cloudrix",
      images: [
        {
          url: study.image || `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(study.industry + " - Reference Scenario")}&type=case-studies`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      authors: ["Cloudrix"],
      tags: study.technologies || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Cloudrix`,
      description,
      images: [study.image || `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(study.industry + " - Reference Scenario")}&type=case-studies`],
    },
    alternates: {
      canonical: `https://www.cloudrix.io/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const allCaseStudies = await getAllCaseStudies();
  const currentIndex = allCaseStudies.findIndex(
    (s: { slug: string }) => s.slug === slug
  );
  const prevStudy =
    currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < allCaseStudies.length - 1
      ? allCaseStudies[currentIndex + 1]
      : null;

  return (
    <>
      <CaseStudyJsonLd
        title={study.title}
        description={study.description || study.challenge || ""}
        slug={slug}
        client="Reference Scenario (illustrative)"
        industry={study.industry}
        image={study.image}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Reference Scenarios", url: "/case-studies" },
          { name: study.title, url: `/case-studies/${slug}` },
        ]}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reference Scenarios
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {study.industry}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Info className="w-3.5 h-3.5" />
                  Reference Scenario
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {study.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {study.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    <span className="font-medium">Type:</span> Illustrative
                    engagement blueprint — not a client claim
                  </span>
                </div>
                {study.duration && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      <span className="font-medium">Timeline:</span>{" "}
                      {study.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Engagement Parameters */}
              {study.metrics && study.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 bg-blue-600 rounded-xl p-6">
                  {study.metrics.map(
                    (
                      metric: { value: string; label: string },
                      index: number
                    ) => (
                      <div key={index} className="text-center">
                        <p className="text-3xl font-bold text-white">
                          {metric.value}
                        </p>
                        <p className="text-blue-100 text-sm">{metric.label}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

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
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Honesty Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12 flex gap-4">
            <Info className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 leading-relaxed">
              {referenceScenarioDisclaimer}
            </p>
          </div>

          {/* The Typical Situation */}
          {study.challenge && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Typical Situation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {study.challenge}
              </p>
            </div>
          )}

          {/* Our Approach */}
          {study.solution && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We&apos;d Approach It
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {study.solution}
              </p>
            </div>
          )}

          {/* Deliverables */}
          {study.results && study.results.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  What You&apos;d Get
                </h2>
              </div>
              <ul className="space-y-4">
                {study.results.map((result: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {study.technologies && study.technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Typical Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* First Named Case Study offer */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Become our first named case study
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              No anonymous testimonials here — we don&apos;t have named clients
              to quote yet, and we won&apos;t invent them. If this scenario
              looks like your project, you&apos;ll get founder-level attention
              and case-study pricing; in exchange, if (and only if) you&apos;re
              happy with the result, your project becomes the first real case
              study on this site.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
            >
              Book a Free Intro Call
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prevStudy ? (
              <Link
                href={`/case-studies/${prevStudy.slug}`}
                className="group flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <div>
                  <p className="text-sm text-gray-500">Previous</p>
                  <p className="font-medium text-gray-900">{prevStudy.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextStudy && (
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="group flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-colors text-right"
              >
                <div>
                  <p className="text-sm text-gray-500">Next</p>
                  <p className="font-medium text-gray-900">{nextStudy.title}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Does This Look Like Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s have an honest conversation about your situation and
            whether we&apos;re the right fit — no invented numbers, no pressure.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
          >
            Book a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

export const revalidate = 60;
