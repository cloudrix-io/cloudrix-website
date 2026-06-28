import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStaticServiceData } from "@/data/static-services";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  Wrench,
  Cloud,
  Code,
  Zap,
  Shield,
  Database,
  Layers,
  Lock,
  Workflow,
  Bot,
  Brain,
  Cpu,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { ServicePageJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

const serviceImages: Record<string, { url: string; alt: string }> = {
  "cloud-migration": {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    alt: "Modern data center with cloud server infrastructure",
  },
  "devops-consulting": {
    url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
    alt: "Developer terminal showing CI/CD pipeline and code deployment",
  },
  "ai-consulting": {
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    alt: "Abstract AI neural network visualization with data connections",
  },
  "full-stack-development": {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Code editor showing modern web application development",
  },
  "technical-due-diligence": {
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Business professional reviewing technical audit documents",
  },
  "dedicated-teams": {
    url: "https://images.unsplash.com/photo-1600880292089-7a95e44bdb6e?w=800&q=80",
    alt: "Dedicated senior engineering team collaborating on client project",
  },
  "api-development": {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    alt: "Connected network systems representing API integrations",
  },
  "llm-integration": {
    url: "https://images.unsplash.com/photo-1684369176170-463e84248b70?w=800&q=80",
    alt: "AI language model conversational interface visualization",
  },
  "legacy-modernization": {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Circuit board representing technology modernization and transformation",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Code,
  Zap,
  Shield,
  Database,
  Layers,
  Lock,
  Workflow,
  Bot,
  Brain,
  Cpu,
};

async function getService(slug: string) {
  // Try MongoDB first
  try {
    await connectDB();
    const service = await Service.findOne({ slug, isActive: true }).lean();
    if (service) {
      const relatedServices = await Service.find({
        slug: { $in: service.relatedServiceSlugs || [] },
        isActive: true,
      })
        .select("title slug description icon")
        .lean();

      return {
        service: JSON.parse(JSON.stringify(service)),
        relatedServices: JSON.parse(JSON.stringify(relatedServices)),
      };
    }
  } catch {
    // Fall through to static data
  }

  // Static fallback from seed data
  return getStaticServiceData(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getService(slug);

  if (!data) {
    return { title: "Service Not Found | Cloudrix" };
  }

  const { service } = data;
  const title = service.seoTitle || service.title;
  const description = service.seoDescription || service.description;

  return {
    title: `${title} | Cloudrix`,
    description,
    openGraph: {
      title: `${title} | Cloudrix`,
      description,
      url: `https://www.cloudrix.io/services/${service.slug}`,
      type: "website",
      images: [
        {
          url: `/og?title=${encodeURIComponent(service.title)}&subtitle=${encodeURIComponent(service.description.slice(0, 80))}&type=services`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Cloudrix`,
      description,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/services/${service.slug}`,
    },
  };
}

export const dynamicParams = true;

const STATIC_SLUGS = [
  "cloud-migration",
  "devops-consulting",
  "ai-consulting",
  "full-stack-development",
  "technical-due-diligence",
  "dedicated-teams",
  "api-development",
  "llm-integration",
  "legacy-modernization",
];

export async function generateStaticParams() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).select("slug").lean();
    if (services.length > 0) {
      return services.map((s) => ({ slug: s.slug }));
    }
  } catch {
    // Fall through to static slugs
  }
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const data = await getService(slug);

  if (!data) {
    notFound();
  }

  const { service, relatedServices } = data;
  const Icon = iconMap[service.icon || "Cloud"] || Cloud;
  const heroImage = serviceImages[slug];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  return (
    <>
      <ServicePageJsonLd
        title={service.title}
        description={service.description}
        slug={service.slug}
        features={service.features}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {service.faqs && service.faqs.length > 0 && (
        <FAQJsonLd faqs={service.faqs} pageUrl={`/services/${service.slug}`} />
      )}

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-lg"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="space-y-6">
                {heroImage && (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={heroImage.url}
                      alt={heroImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    What You Get
                  </h3>
                  <ul className="space-y-3">
                    {service.features?.slice(0, 6).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem / Solution / Result */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Problem</h3>
                <p className="text-gray-700 leading-relaxed">{service.problem}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Solution</h3>
                <p className="text-gray-700 leading-relaxed">{service.solution}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-8 border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Result</h3>
                <p className="text-gray-700 leading-relaxed">{service.result}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description */}
        {service.longDescription && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                <div dangerouslySetInnerHTML={{ __html: service.longDescription }} />
              </article>
            </div>
          </section>
        )}

        {/* Use Cases */}
        {service.useCases && service.useCases.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Common Use Cases
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Real scenarios where our clients have seen measurable results
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.useCases.map((useCase: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700">{useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies */}
        {service.technologies && service.technologies.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Technologies We Use
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {service.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Everything you need to know about our {service.title.toLowerCase()} services
              </p>
              <div className="space-y-6">
                {service.faqs.map((faq: { question: string; answer: string }, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((related: { _id: string; title: string; slug: string; description: string; icon?: string }) => {
                  const RelatedIcon = iconMap[related.icon || "Cloud"] || Cloud;
                  return (
                    <Link
                      key={related._id}
                      href={`/services/${related.slug}`}
                      className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <RelatedIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{related.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free 30-minute consultation. We&apos;ll assess your needs and provide
              a clear plan of action — no obligations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
