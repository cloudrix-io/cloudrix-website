import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Cpu,
  Database,
  Globe,
  Handshake,
  Shield,
  Zap,
  CheckCircle2,
  ExternalLink,
  Mail,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Technology Partners - AWS, Google Cloud, Azure, AI Partners",
  description:
    "Cloudrix partners with AWS, Google Cloud, Azure, Anthropic, and OpenAI to deliver enterprise-grade cloud and AI solutions. Certified engineers, proven integrations.",
  openGraph: {
    title: "Technology Partners | Cloudrix",
    description:
      "Strategic technology partnerships with AWS, Google Cloud, Azure, Anthropic, and OpenAI for enterprise-grade solutions.",
    url: "https://www.cloudrix.io/partners",
    type: "website",
    images: [
      {
        url: "/og?title=Technology%20Partners&subtitle=Enterprise-Grade%20Cloud%20%26%20AI%20Partnerships&type=partners",
        width: 1200,
        height: 630,
        alt: "Cloudrix Technology Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Partners | Cloudrix",
    description:
      "Strategic partnerships with AWS, Google Cloud, Azure, Anthropic, and OpenAI.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/partners",
  },
};

const cloudPartners = [
  {
    name: "Amazon Web Services",
    shortName: "AWS",
    description:
      "Our primary cloud platform. We design, build, and optimize AWS architectures for enterprises across Europe. From EC2 and EKS to Lambda and SageMaker, we leverage the full AWS ecosystem.",
    certifications: [
      "AWS Solutions Architect",
      "AWS DevOps Engineer",
      "AWS Security Specialty",
    ],
    services: [
      "Cloud Migration",
      "Kubernetes (EKS)",
      "Serverless Architecture",
      "Cost Optimization",
      "Security & Compliance",
    ],
    color: "orange",
  },
  {
    name: "Google Cloud Platform",
    shortName: "GCP",
    description:
      "For data-intensive and AI/ML workloads, we leverage Google Cloud's strengths in BigQuery, Vertex AI, and GKE. Ideal for companies building data-driven products.",
    certifications: [
      "Google Cloud Professional Architect",
      "Google Cloud Data Engineer",
    ],
    services: [
      "Data Analytics (BigQuery)",
      "Kubernetes (GKE)",
      "AI/ML (Vertex AI)",
      "Multi-Cloud Strategy",
    ],
    color: "blue",
  },
  {
    name: "Microsoft Azure",
    shortName: "Azure",
    description:
      "For enterprises in the Microsoft ecosystem, we build and optimize Azure-based solutions. Strong integration with Active Directory, Microsoft 365, and Azure DevOps.",
    certifications: [
      "Azure Solutions Architect",
      "Azure DevOps Engineer",
    ],
    services: [
      "Azure Migration",
      "Kubernetes (AKS)",
      "Azure DevOps",
      "Hybrid Cloud",
    ],
    color: "sky",
  },
];

const aiPartners = [
  {
    name: "Anthropic",
    shortName: "Anthropic",
    description:
      "We integrate Claude for enterprise AI use cases — document processing, customer support automation, and code generation. Anthropic's focus on AI safety aligns with our EU-compliance-first approach.",
    useCases: [
      "Document understanding & extraction",
      "Customer support automation",
      "Code review & generation",
      "EU AI Act compliant deployments",
    ],
    color: "amber",
  },
  {
    name: "OpenAI",
    shortName: "OpenAI",
    description:
      "We build with GPT-4, DALL-E, and the Assistants API for clients who need powerful generative AI capabilities. From chatbots to content generation pipelines.",
    useCases: [
      "Conversational AI & chatbots",
      "Content generation pipelines",
      "Embeddings & semantic search",
      "Fine-tuned domain models",
    ],
    color: "green",
  },
];

const integrationPartners = [
  { name: "Terraform / HashiCorp", category: "Infrastructure as Code" },
  { name: "Datadog", category: "Observability" },
  { name: "GitHub", category: "Version Control & CI/CD" },
  { name: "GitLab", category: "DevOps Platform" },
  { name: "Vercel", category: "Frontend Deployment" },
  { name: "Stripe", category: "Payments" },
  { name: "Auth0 / Clerk", category: "Authentication" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Caching" },
  { name: "Kubernetes", category: "Container Orchestration" },
  { name: "Docker", category: "Containerization" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", light: "bg-orange-50" },
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", light: "bg-blue-50" },
  sky: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200", light: "bg-sky-50" },
  amber: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", light: "bg-green-50" },
};

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Partners", url: "/partners" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Partners", url: "/partners" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" />
                <span>Strategic Technology Partnerships</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Technology Partners
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                We partner with the world&apos;s leading cloud and AI platforms to deliver
                enterprise-grade solutions. Certified engineers, proven architectures,
                and deep platform expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Cloud Partners */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Cloud Platform Partners</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multi-cloud expertise across AWS, Google Cloud, and Azure
              </p>
            </div>

            <div className="space-y-8">
              {cloudPartners.map((partner) => {
                const colors = colorMap[partner.color];
                return (
                  <div
                    key={partner.name}
                    className={`border ${colors.border} rounded-xl overflow-hidden`}
                  >
                    <div className={`${colors.light} p-8 lg:p-10`}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Info */}
                        <div className="lg:col-span-2">
                          <div className={`inline-flex items-center ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                            {partner.shortName}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">{partner.description}</p>

                          {/* Certifications */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                              Certifications
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {partner.certifications.map((cert) => (
                                <span
                                  key={cert}
                                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Services
                          </h4>
                          <ul className="space-y-2">
                            {partner.services.map((service) => (
                              <li key={service} className="flex items-center gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                                <span className="text-gray-700 text-sm">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">AI &amp; ML Partners</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building with the most capable AI models available
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiPartners.map((partner) => {
                const colors = colorMap[partner.color];
                return (
                  <div
                    key={partner.name}
                    className={`${colors.light} border ${colors.border} rounded-xl p-8`}
                  >
                    <div className={`inline-flex items-center ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                      {partner.shortName}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{partner.description}</p>

                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Key Use Cases
                    </h4>
                    <ul className="space-y-2">
                      {partner.useCases.map((useCase) => (
                        <li key={useCase} className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Database className="w-6 h-6 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Integration Partners</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Best-in-class tools we use and integrate for our clients
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {integrationPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-gray-900 font-semibold mb-1">{partner.name}</h3>
                  <p className="text-gray-500 text-sm">{partner.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Partner */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Become a Partner
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                We&apos;re always looking for technology partners who share our commitment
                to quality engineering and client success. Let&apos;s explore how we can
                create value together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Partnership Team
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
