import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Server,
  Code,
  Layout,
  Globe,
  FileCode,
  Database,
  Brain,
  Container,
  ChevronDown,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { technologies } from "@/data/technologies";

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Server,
  Code,
  Layout,
  Globe,
  FileCode,
  Database,
  Brain,
  Container,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = technologies.find((t) => t.slug === slug);

  if (!tech) {
    return { title: "Technology Not Found" };
  }

  return {
    title: `${tech.metaTitle} | Cloudrix`,
    description: tech.metaDescription,
    openGraph: {
      title: `${tech.metaTitle} | Cloudrix`,
      description: tech.metaDescription,
      url: `https://www.cloudrix.io/technologies/${slug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/technologies/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export default async function TechnologyPage({ params }: Props) {
  const { slug } = await params;
  const tech = technologies.find((t) => t.slug === slug);

  if (!tech) {
    notFound();
  }

  const Icon = iconMap[tech.iconDescription] || Code;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Technologies", url: "/technologies" },
          { name: tech.name, url: `/technologies/${slug}` },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon className="w-4 h-4" />
                <span>{tech.name}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {tech.metaTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {tech.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                >
                  {tech.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Do With {tech.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {tech.whatWeDo}
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tech.useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Mention */}
        {tech.caseStudyMention && (
          <section className="py-16 bg-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-blue-200 shadow-lg text-center">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  From Our Work
                </span>
                <p className="text-xl md:text-2xl text-gray-700 mt-4 leading-relaxed">
                  {tech.caseStudyMention}
                </p>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center text-blue-600 font-medium mt-6 group"
                >
                  View Case Studies
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Related Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tech.relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {tech.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              {tech.ctaText}
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Senior engineers, EU timezone, no lock-in. Tell us what you need
              and we will show you how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
