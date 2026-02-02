import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Clock,
  Building2,
  Heart,
  ShoppingCart,
  Cpu,
  Factory,
  Truck,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

const industries: Record<
  string,
  {
    name: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    heroImage: string;
    challenges: string[];
    solutions: {
      title: string;
      description: string;
    }[];
    compliance: string[];
    caseStudy?: {
      title: string;
      result: string;
      link: string;
    };
    technologies: string[];
    stats: { value: string; label: string }[];
  }
> = {
  fintech: {
    name: "FinTech & Financial Services",
    title: "Cloud Solutions for FinTech & Financial Services",
    description:
      "PCI-DSS compliant infrastructure, high-availability payment systems, and secure financial platforms. We help FinTech companies scale while maintaining regulatory compliance.",
    icon: Building2,
    heroImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    challenges: [
      "Strict regulatory requirements (PCI-DSS, PSD2, GDPR)",
      "High-availability demands (99.99%+ uptime)",
      "Processing millions of transactions securely",
      "Legacy system modernization without downtime",
      "Real-time fraud detection and prevention",
    ],
    solutions: [
      {
        title: "Compliant Cloud Architecture",
        description:
          "Multi-region deployments with proper data residency, encryption at rest and in transit, and audit logging for regulatory compliance.",
      },
      {
        title: "High-Availability Payment Systems",
        description:
          "Auto-scaling infrastructure that handles peak loads with zero downtime. Blue-green deployments for risk-free releases.",
      },
      {
        title: "Security-First Development",
        description:
          "Secure coding practices, regular penetration testing, and continuous vulnerability scanning integrated into CI/CD.",
      },
      {
        title: "Real-Time Analytics",
        description:
          "Stream processing for fraud detection, transaction monitoring, and business intelligence dashboards.",
      },
    ],
    compliance: ["PCI-DSS Level 1", "GDPR", "PSD2", "SOC 2 Type II", "ISO 27001"],
    caseStudy: {
      title: "Nordic Payment Processor Migration",
      result: "55% cost reduction, 99.995% uptime, 10x peak capacity",
      link: "/case-studies/nordic-payment-processor-migration",
    },
    technologies: ["AWS", "Kubernetes", "PostgreSQL", "Redis", "Kafka", "Terraform"],
    stats: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "€2.3M+", label: "Daily Transactions" },
      { value: "55%", label: "Cost Reduction" },
      { value: "<200ms", label: "P99 Latency" },
    ],
  },
  healthcare: {
    name: "Healthcare & Digital Health",
    title: "Secure Solutions for Healthcare & Digital Health",
    description:
      "GDPR-compliant telemedicine platforms, patient management systems, and healthcare data solutions. Privacy and security built from the ground up.",
    icon: Heart,
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    challenges: [
      "Strict data protection requirements (GDPR, HIPAA)",
      "Secure handling of sensitive patient data",
      "High reliability for critical healthcare services",
      "Integration with existing hospital systems",
      "Scalable telemedicine infrastructure",
    ],
    solutions: [
      {
        title: "Privacy-First Architecture",
        description:
          "End-to-end encryption, proper data residency controls, and comprehensive audit logging for healthcare compliance.",
      },
      {
        title: "Reliable Telemedicine Platform",
        description:
          "WebRTC-based video consultations with 99.8%+ reliability. Automatic failover and quality adaptation.",
      },
      {
        title: "HL7/FHIR Integration",
        description:
          "Seamless integration with existing hospital information systems using healthcare interoperability standards.",
      },
      {
        title: "Patient Data Security",
        description:
          "Role-based access control, data masking, and consent management for GDPR compliance.",
      },
    ],
    compliance: ["GDPR", "HIPAA", "ISO 27001", "MDR", "CE Marking"],
    caseStudy: {
      title: "MedConnect Europe Platform Scale-Up",
      result: "15K+ daily consultations, 99.8% reliability, 4 new markets",
      link: "/case-studies/healthcare-platform-scaleup",
    },
    technologies: ["GCP", "Kubernetes", "FastAPI", "PostgreSQL", "WebRTC", "Terraform"],
    stats: [
      { value: "15K+", label: "Daily Consultations" },
      { value: "99.8%", label: "Call Reliability" },
      { value: "4", label: "EU Markets" },
      { value: "0", label: "GDPR Findings" },
    ],
  },
  ecommerce: {
    name: "E-commerce & Retail",
    title: "Scalable Solutions for E-commerce & Retail",
    description:
      "High-performance e-commerce platforms that handle flash sales, optimize conversions, and deliver exceptional customer experiences.",
    icon: ShoppingCart,
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    challenges: [
      "Handling traffic spikes during sales events",
      "Slow page load times affecting conversions",
      "Cart abandonment from poor UX",
      "Complex inventory management across channels",
      "Integration with multiple payment providers",
    ],
    solutions: [
      {
        title: "Performance Optimization",
        description:
          "Next.js frontends with optimal Core Web Vitals. CDN strategies and image optimization for sub-2-second load times.",
      },
      {
        title: "Flash Sale Architecture",
        description:
          "Virtual queue systems, auto-scaling infrastructure, and edge caching to handle 10K+ concurrent users.",
      },
      {
        title: "Headless Commerce",
        description:
          "API-first architecture that lets you use any frontend while maintaining a unified backend.",
      },
      {
        title: "Multi-Channel Integration",
        description:
          "Unified inventory and order management across web, mobile, and marketplace channels.",
      },
    ],
    compliance: ["PCI-DSS", "GDPR", "Strong Customer Authentication"],
    caseStudy: {
      title: "Fashion Forward Performance Rescue",
      result: "83% faster load times, +89% conversion rate, €180K/yr revenue impact",
      link: "/case-studies/ecommerce-performance-rescue",
    },
    technologies: ["Next.js", "Vercel", "Shopify", "Algolia", "Cloudflare", "Stripe"],
    stats: [
      { value: "1.4s", label: "Load Time" },
      { value: "+89%", label: "Conversion" },
      { value: "10K+", label: "Concurrent Users" },
      { value: "€180K", label: "Annual Impact" },
    ],
  },
  saas: {
    name: "SaaS & Technology",
    title: "Engineering for SaaS & Technology Companies",
    description:
      "From MVP to scale, we build SaaS products that investors trust. Multi-tenant architectures, API-first design, and infrastructure that grows with you.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    challenges: [
      "Shipping MVP fast enough to hit funding deadlines",
      "Building architecture that scales without rewrites",
      "Passing investor technical due diligence",
      "Managing multi-tenant data isolation",
      "Maintaining velocity as the team grows",
    ],
    solutions: [
      {
        title: "Rapid MVP Development",
        description:
          "Production-grade MVPs in 8-12 weeks using proven tech stacks. Code that passes due diligence from day one.",
      },
      {
        title: "Multi-Tenant Architecture",
        description:
          "Database-per-tenant or schema-based isolation depending on your needs. Proper resource allocation and billing.",
      },
      {
        title: "API-First Design",
        description:
          "Well-documented REST or GraphQL APIs that enable integrations, partnerships, and mobile apps.",
      },
      {
        title: "Scalable Infrastructure",
        description:
          "Auto-scaling Kubernetes clusters, proper caching strategies, and database optimization for growth.",
      },
    ],
    compliance: ["SOC 2", "GDPR", "ISO 27001"],
    caseStudy: {
      title: "DataPulse: Zero to Series A",
      result: "14-week MVP, €3.2M raised, 2.1M events/day",
      link: "/case-studies/analytics-platform-series-a",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Terraform"],
    stats: [
      { value: "14", label: "Weeks to MVP" },
      { value: "€3.2M", label: "Series A Raised" },
      { value: "2.1M", label: "Events/Day" },
      { value: "0", label: "Critical Bugs" },
    ],
  },
  manufacturing: {
    name: "Manufacturing & Industrial",
    title: "Digital Transformation for Manufacturing",
    description:
      "Modernize legacy ERP systems, implement IoT solutions, and optimize supply chains without disrupting your operations.",
    icon: Factory,
    heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
    challenges: [
      "Legacy systems that are impossible to modify",
      "Original developers long gone, no documentation",
      "Fear of disrupting production operations",
      "Integrating with modern customer requirements",
      "Real-time visibility into inventory and production",
    ],
    solutions: [
      {
        title: "Strangler Fig Modernization",
        description:
          "Incrementally replace legacy systems without disruption. New capabilities through microservices while maintaining stability.",
      },
      {
        title: "IoT Integration",
        description:
          "Connect machines and sensors for real-time monitoring, predictive maintenance, and production optimization.",
      },
      {
        title: "Supply Chain Visibility",
        description:
          "Real-time tracking of materials, inventory, and orders across your entire supply chain.",
      },
      {
        title: "EDI & Partner Integration",
        description:
          "Modern APIs for customer and supplier integration while maintaining legacy EDI compatibility.",
      },
    ],
    compliance: ["ISO 9001", "GDPR", "Industry 4.0"],
    caseStudy: {
      title: "Precision Components ERP Modernization",
      result: "73% modernized, 99.2% inventory accuracy, zero downtime",
      link: "/case-studies/manufacturing-erp-modernization",
    },
    technologies: ["Node.js", "React", "PostgreSQL", "RabbitMQ", "Azure", "Power BI"],
    stats: [
      { value: "73%", label: "Modernized" },
      { value: "99.2%", label: "Accuracy" },
      { value: "0", label: "Downtime Hours" },
      { value: "€45M", label: "Revenue Supported" },
    ],
  },
  logistics: {
    name: "Logistics & Supply Chain",
    title: "Technology for Logistics & Supply Chain",
    description:
      "Route optimization, fleet management, warehouse systems, and real-time tracking for operational excellence.",
    icon: Truck,
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    challenges: [
      "Optimizing routes across complex networks",
      "Real-time visibility into fleet and shipments",
      "Managing warehouse operations efficiently",
      "Integrating with customer and partner systems",
      "Scaling during peak seasons",
    ],
    solutions: [
      {
        title: "Route Optimization",
        description:
          "AI-powered route planning that considers traffic, delivery windows, and vehicle constraints.",
      },
      {
        title: "Real-Time Tracking",
        description:
          "GPS tracking, ETAs, and proof of delivery for complete shipment visibility.",
      },
      {
        title: "Warehouse Management",
        description:
          "Pick, pack, and ship optimization. Barcode scanning, inventory tracking, and space utilization.",
      },
      {
        title: "Partner Integration",
        description:
          "APIs for customer portals, carrier integration, and third-party logistics providers.",
      },
    ],
    compliance: ["GDPR", "AEO", "ISO 28000"],
    caseStudy: {
      title: "Logistics Tech Due Diligence & Rescue",
      result: "€1.8M saved on acquisition, 3x volume growth, 99.7% uptime",
      link: "/case-studies/logistics-tech-due-diligence",
    },
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "AWS", "Mapbox"],
    stats: [
      { value: "3x", label: "Volume Growth" },
      { value: "99.7%", label: "Uptime" },
      { value: "€1.8M", label: "Cost Saved" },
      { value: "85%", label: "Team Retention" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.title} | Cloudrix`,
    description: industry.description,
    openGraph: {
      title: `${industry.title} | Cloudrix`,
      description: industry.description,
      url: `https://www.cloudrix.io/industries/${slug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/industries/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    notFound();
  }

  const Icon = industry.icon;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: industry.name, url: `/industries/${slug}` },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Icon className="w-4 h-4" />
                  <span>{industry.name}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {industry.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {industry.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {industry.caseStudy && (
                    <Link
                      href={industry.caseStudy.link}
                      className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                    >
                      View Case Study
                    </Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {industry.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Challenges We Solve
                </h2>
                <ul className="space-y-4">
                  {industry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                        <span className="text-red-600 text-sm font-bold">!</span>
                      </div>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Compliance & Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {industry.compliance.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-50 border border-green-200 px-4 py-2 rounded-lg"
                    >
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored approaches for {industry.name.toLowerCase()} challenges
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Technologies We Use
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industry.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study CTA */}
        {industry.caseStudy && (
          <section className="py-16 bg-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-blue-200 shadow-lg">
                <div className="text-center">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                    Featured Case Study
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                    {industry.caseStudy.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-8">
                    {industry.caseStudy.result}
                  </p>
                  <Link
                    href={industry.caseStudy.link}
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your {industry.name.split(" ")[0]} Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation to discuss your challenges and how we can help.
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
