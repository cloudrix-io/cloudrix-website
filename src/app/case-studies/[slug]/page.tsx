import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";
import { CaseStudyJsonLd, BreadcrumbJsonLd } from "@/components/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCaseStudyBySlug(slug: string) {
  try {
    await connectDB();
    const caseStudy = await CaseStudy.findOne({ slug, isActive: true }).lean();
    return caseStudy ? JSON.parse(JSON.stringify(caseStudy)) : null;
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}

async function getAllCaseStudies() {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return JSON.parse(JSON.stringify(caseStudies));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((study: { slug: string }) => ({
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
      title: "Case Study Not Found",
    };
  }

  const title = study.title;
  const description = study.description || study.challenge?.substring(0, 155) + "...";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Cloudrix Case Study`,
      description,
      url: `https://cloudrix.io/case-studies/${slug}`,
      type: "article",
      siteName: "Cloudrix",
      images: [
        {
          url: study.image || `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(study.industry + " - " + study.client)}&type=case-studies`,
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
      images: [study.image || `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(study.industry + " - " + study.client)}&type=case-studies`],
    },
    alternates: {
      canonical: `https://cloudrix.io/case-studies/${slug}`,
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
        client={study.client}
        industry={study.industry}
        image={study.image}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Case Studies", url: "/case-studies" },
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
            Back to Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {study.industry}
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
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    <span className="font-medium">Client:</span> {study.client}
                  </span>
                </div>
                {study.duration && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      <span className="font-medium">Duration:</span>{" "}
                      {study.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Metrics */}
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
          {/* Challenge */}
          {study.challenge && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {study.challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {study.solution && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Solution
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {study.solution}
              </p>
            </div>
          )}

          {/* Results */}
          {study.results && study.results.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-8 mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Results Achieved
                </h2>
              </div>
              <ul className="space-y-4">
                {study.results.map((result: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
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
                Technologies Used
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

          {/* Testimonial */}
          {study.testimonial && study.testimonial.quote && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <Quote className="h-10 w-10 text-blue-200 mb-4" />
              <blockquote className="text-xl italic text-gray-700 mb-6">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">
                  {study.testimonial.author}
                </p>
                <p className="text-gray-500">{study.testimonial.position}</p>
              </div>
            </div>
          )}
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
            Have a Similar Challenge?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s discuss how we can help you achieve similar results.
          </p>
          <Link
            href="/contact"
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
