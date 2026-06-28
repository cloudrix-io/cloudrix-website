import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  ChevronDown,
  Users,
  AlertTriangle,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { complianceFrameworks } from "@/data/compliance";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const framework = complianceFrameworks.find((f) => f.slug === slug);

  if (!framework) {
    return { title: "Compliance Framework Not Found" };
  }

  return {
    title: framework.metaTitle,
    description: framework.metaDescription,
    openGraph: {
      title: `${framework.metaTitle} | Cloudrix`,
      description: framework.metaDescription,
      url: `https://www.cloudrix.io/compliance/${slug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/compliance/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return complianceFrameworks
    .filter((f) => !f.externalLink)
    .map((f) => ({ slug: f.slug }));
}

export default async function ComplianceDetailPage({ params }: Props) {
  const { slug } = await params;
  const framework = complianceFrameworks.find((f) => f.slug === slug);

  if (!framework || framework.externalLink) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compliance", url: "/compliance" },
          { name: framework.name, url: `/compliance/${slug}` },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Compliance Engineering</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {framework.fullName}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {framework.metaDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
              >
                Get {framework.name} Compliant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is {framework.name}?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {framework.whatItIs}
              </p>
            </div>
          </div>
        </section>

        {/* Who Needs It */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Who Needs {framework.name}?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {framework.whoNeedsIt.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Help */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How Cloudrix Helps With {framework.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {framework.howWeHelp}
              </p>
            </div>
          </div>
        </section>

        {/* Key Requirements */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Key Requirements Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {framework.keyRequirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white p-5 rounded-xl border border-gray-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {framework.relatedServices.map((service) => (
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
              {framework.faq.map((item, index) => (
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
              Need Help With {framework.name} Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation to discuss your compliance requirements.
              We will assess your current state and provide a clear path to certification.
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
                href="/compliance"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View All Frameworks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
