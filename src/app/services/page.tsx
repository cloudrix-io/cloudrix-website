import { Metadata } from "next";
import Link from "next/link";
import {
  Cloud,
  Code,
  Zap,
  Shield,
  Database,
  Layers,
  Lock,
  Workflow,
  ArrowRight,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Service, Technology, Page } from "@/lib/models";
import { ServicesJsonLd, BreadcrumbJsonLd } from "@/components/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "services", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "Cloud & Software Engineering Services";
    const description = pageData?.seoDescription?.en ||
      "Cloud architecture, full-stack development, DevOps, and technical consulting services for European companies. Senior engineers, transparent pricing.";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | Cloudrix`,
        description,
        url: "https://www.cloudrix.io/services",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("Engineering Services Built for Scale")}&subtitle=${encodeURIComponent("Cloud architecture, development & DevOps for EU companies")}&type=services`,
            width: 1200,
            height: 630,
            alt: "Cloudrix Engineering Services",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Cloudrix`,
        description,
        images: [`/og?title=${encodeURIComponent("Engineering Services Built for Scale")}&subtitle=${encodeURIComponent("Cloud architecture, development & DevOps for EU companies")}&type=services`],
      },
      alternates: {
        canonical: "https://www.cloudrix.io/services",
      },
    };
  } catch {
    return {
      title: "Services",
      description: "Cloud architecture, full-stack development, DevOps, and technical consulting services for European companies.",
    };
  }
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
};

const industries = [
  "Financial Services",
  "Healthcare",
  "E-commerce",
  "Manufacturing",
  "Technology",
  "Logistics",
];

async function getServicesData() {
  try {
    await connectDB();

    const [services, technologies] = await Promise.all([
      Service.find({ isActive: true }).sort({ order: 1 }).lean(),
      Technology.find({ isActive: true }).sort({ category: 1, order: 1 }).lean(),
    ]);

    // Group technologies by category
    const technologiesByCategory = technologies.reduce(
      (
        acc: Record<string, string[]>,
        tech: { category: string; name: string }
      ) => {
        if (!acc[tech.category]) {
          acc[tech.category] = [];
        }
        acc[tech.category].push(tech.name);
        return acc;
      },
      {}
    );

    return {
      services: JSON.parse(JSON.stringify(services)),
      technologies: technologiesByCategory,
    };
  } catch (error) {
    console.error("Error fetching services data:", error);
    return {
      services: [],
      technologies: {},
    };
  }
}

export default async function ServicesPage() {
  const { services, technologies } = await getServicesData();

  return (
    <>
      <ServicesJsonLd services={services} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive cloud and software engineering solutions designed to
              help your business thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(
              (
                service: {
                  _id: string;
                  icon?: string;
                  title: string;
                  description?: string;
                  shortDescription?: string;
                  features?: string[];
                },
                index: number
              ) => {
                const Icon = iconMap[service.icon || "Cloud"] || Cloud;
                return (
                  <div
                    key={service._id || index}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description || service.shortDescription}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have deep expertise across multiple industries, understanding
              unique challenges and requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-gray-900 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies We Work With
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage the latest technologies and frameworks to deliver
              cutting-edge solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.keys(technologies).length > 0 ? (
              Object.entries(technologies).map(([category, techs]) => (
                <div key={category} className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    {(techs as string[]).map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Cloud Platforms
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>AWS</li>
                    <li>Microsoft Azure</li>
                    <li>Google Cloud</li>
                    <li>DigitalOcean</li>
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Backend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>.NET Core</li>
                    <li>Java / Spring</li>
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Frontend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>React</li>
                    <li>Vue.js</li>
                    <li>Angular</li>
                    <li>Next.js</li>
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">DevOps</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Kubernetes</li>
                    <li>Docker</li>
                    <li>Terraform</li>
                    <li>Jenkins / GitLab CI</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Schedule a free consultation to discuss your project and discover
            how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

export const revalidate = 60;
