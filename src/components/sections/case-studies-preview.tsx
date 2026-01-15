import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Section, Container, Card, Badge } from "@/components/ui";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesPreview() {
  const featuredStudy = caseStudies[0];

  return (
    <Section variant="default">
      <Container size="xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="primary" className="mb-4">
            Case Studies
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Real Results for Real Companies
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how we helped European companies solve complex technical
            challenges.
          </p>
        </div>

        {/* Featured Case Study */}
        <Card variant="bordered" padding="lg" className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Content */}
            <div>
              <Badge variant="secondary" className="mb-4">
                {featuredStudy.industry}
              </Badge>
              <h3 className="text-2xl font-bold text-slate-900">
                {featuredStudy.title}
              </h3>
              <p className="mt-4 text-slate-600">{featuredStudy.challenge}</p>

              {/* Metrics */}
              {featuredStudy.metrics && (
                <div className="mt-6 flex gap-8">
                  {featuredStudy.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-3xl font-bold text-blue-600">
                        {metric.value}
                      </p>
                      <p className="text-sm text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {featuredStudy.technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>

              <Link
                href={`/case-studies/${featuredStudy.slug}`}
                className="mt-8 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Read Full Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Testimonial */}
            {featuredStudy.testimonial && (
              <div className="flex flex-col justify-center rounded-xl bg-slate-50 p-8">
                <Quote className="h-10 w-10 text-blue-200" />
                <blockquote className="mt-4 text-lg italic text-slate-700">
                  &ldquo;{featuredStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">
                    {featuredStudy.testimonial.author}
                  </p>
                  <p className="text-sm text-slate-500">
                    {featuredStudy.testimonial.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* More Case Studies */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {caseStudies.slice(1, 3).map((study) => (
            <Card
              key={study.id}
              variant="bordered"
              className="transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
            >
              <Badge variant="secondary" className="mb-3">
                {study.industry}
              </Badge>
              <h3 className="text-xl font-semibold text-slate-900">
                {study.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-slate-600">
                {study.challenge}
              </p>
              {study.metrics && (
                <div className="mt-4 flex gap-6">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <p className="text-xl font-bold text-blue-600">
                        {metric.value}
                      </p>
                      <p className="text-xs text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                Read more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
