import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { BreadcrumbJsonLd, ServicePageJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string; city: string }>;
}

const cities: Record<string, { name: string; region: string; population: string; techScene: string }> = {
  amsterdam: { name: "Amsterdam", region: "North Holland", population: "900K+", techScene: "Europe's 4th largest tech hub with 800+ startups and major tech employers like Booking.com, Adyen, and TomTom." },
  rotterdam: { name: "Rotterdam", region: "South Holland", population: "650K+", techScene: "Major port city investing heavily in logistics tech, maritime innovation, and smart infrastructure." },
  "the-hague": { name: "The Hague", region: "South Holland", population: "550K+", techScene: "Government and international organization hub with growing cybersecurity and legal tech sectors." },
  utrecht: { name: "Utrecht", region: "Utrecht", population: "360K+", techScene: "Fast-growing tech ecosystem with a strong focus on gaming, health tech, and sustainability startups." },
  eindhoven: { name: "Eindhoven", region: "North Brabant", population: "240K+", techScene: "The 'Silicon Valley of Europe' — home to ASML, Philips, NXP, and the High Tech Campus with 235+ companies." },
};

const services: Record<string, { title: string; shortTitle: string; description: string; features: string[] }> = {
  "cloud-migration": {
    title: "Cloud Migration Services",
    shortTitle: "Cloud Migration",
    description: "Migrate your infrastructure to AWS, GCP, or Azure with zero downtime.",
    features: ["Cloud readiness assessment", "Zero-downtime migration", "Infrastructure as Code", "Cost optimization", "Post-migration support"],
  },
  "devops-consulting": {
    title: "DevOps Consulting",
    shortTitle: "DevOps Consulting",
    description: "Implement CI/CD pipelines, monitoring, and infrastructure automation.",
    features: ["CI/CD pipeline setup", "Kubernetes management", "Monitoring & alerting", "Security scanning", "Infrastructure as Code"],
  },
  "ai-consulting": {
    title: "AI & ML Consulting",
    shortTitle: "AI Consulting",
    description: "AI strategy, LLM integration, RAG systems, and GDPR-compliant ML solutions.",
    features: ["AI strategy assessment", "LLM integration", "RAG systems", "GDPR compliance", "MLOps setup"],
  },
  "full-stack-development": {
    title: "Full-Stack Development",
    shortTitle: "Full-Stack Development",
    description: "Build production-ready applications with React, Next.js, Node.js, and Python.",
    features: ["React / Next.js apps", "API development", "Database design", "Performance optimization", "Comprehensive testing"],
  },
  "dedicated-teams": {
    title: "Dedicated Development Teams",
    shortTitle: "Dedicated Teams",
    description: "Senior engineers who integrate with your team. EU timezone, no lock-in.",
    features: ["Senior engineers (5+ yrs)", "Full team integration", "Month-to-month contracts", "EU timezone overlap", "English & French fluency"],
  },
  "llm-integration": {
    title: "LLM Integration Services",
    shortTitle: "LLM Integration",
    description: "Integrate large language models into your applications with RAG and prompt engineering.",
    features: ["RAG architecture", "Prompt engineering", "Model selection", "Production infrastructure", "Cost optimization"],
  },
  "legacy-modernization": {
    title: "Legacy System Modernization",
    shortTitle: "Legacy Modernization",
    description: "Modernize legacy applications incrementally without disrupting your business.",
    features: ["Strangler Fig pattern", "Monolith to microservices", "Database migration", "API facade", "Frontend modernization"],
  },
  "technical-due-diligence": {
    title: "Technical Due Diligence",
    shortTitle: "Technical Due Diligence",
    description: "Independent code, architecture, and security assessment for M&A and investments.",
    features: ["Code quality review", "Architecture assessment", "Security scanning", "Team evaluation", "Executive report"],
  },
  "api-development": {
    title: "API Development & Integration",
    shortTitle: "API Development",
    description: "Design, build, and integrate REST and GraphQL APIs.",
    features: ["REST & GraphQL APIs", "Third-party integrations", "API documentation", "Authentication setup", "Rate limiting"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const serviceData = services[slug];
  const cityData = cities[city];

  if (!serviceData || !cityData) {
    return { title: "Not Found | Cloudrix" };
  }

  const title = `${serviceData.shortTitle} in ${cityData.name} — Cloudrix`;
  const description = `${serviceData.title} for companies in ${cityData.name}, Netherlands. Senior EU-based engineers, GDPR-compliant, EUR invoicing. Free consultation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.cloudrix.io/services/${slug}/${city}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.cloudrix.io/services/${slug}/${city}`,
    },
  };
}

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const slug of Object.keys(services)) {
    for (const city of Object.keys(cities)) {
      params.push({ slug, city });
    }
  }
  return params;
}

export default async function CityServicePage({ params }: Props) {
  const { slug, city } = await params;
  const serviceData = services[slug];
  const cityData = cities[city];

  if (!serviceData || !cityData) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: serviceData.shortTitle, url: `/services/${slug}` },
    { name: cityData.name, url: `/services/${slug}/${city}` },
  ];

  return (
    <>
      <ServicePageJsonLd
        title={`${serviceData.shortTitle} in ${cityData.name}`}
        description={serviceData.description}
        slug={`${slug}/${city}`}
        features={serviceData.features}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{cityData.name}, Netherlands</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {serviceData.shortTitle} in {cityData.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {serviceData.description} Based in the Netherlands, we serve {cityData.name} companies
                with senior engineers who understand your market, speak your language, and work in your timezone.
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
                  href={`/services/${slug}`}
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  Full Service Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What We Deliver for {cityData.name} Companies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Local */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why {cityData.name} Companies Choose Cloudrix
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              {cityData.techScene}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Netherlands-Based</h3>
                <p className="text-gray-600">
                  We&apos;re based in Tilburg — just {city === "eindhoven" ? "30 minutes" : city === "rotterdam" ? "1 hour" : city === "utrecht" ? "1.5 hours" : city === "the-hague" ? "1.5 hours" : "2 hours"} from {cityData.name}.
                  Same timezone, same business culture, same legal framework.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">GDPR by Default</h3>
                <p className="text-gray-600">
                  As a Dutch company (KVK: 97732699), GDPR compliance is built into everything we do.
                  Your data stays in the EU, processed by EU-based engineers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">EUR Invoicing</h3>
                <p className="text-gray-600">
                  Simple, transparent billing in euros. No currency conversion, no international wire fees,
                  no VAT confusion. Dutch btw-nummer on every invoice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Talk?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free 30-minute consultation. We&apos;ll discuss your {serviceData.shortTitle.toLowerCase()} needs
              and provide a clear plan — no obligations.
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
