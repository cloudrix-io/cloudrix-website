import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { BreadcrumbJsonLd, ServicePageJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

const cityServiceImages: Record<string, { url: string; alt: string }> = {
  "cloud-migration": {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    alt: "Cloud server infrastructure and data center",
  },
  "devops-consulting": {
    url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
    alt: "DevOps terminal and CI/CD pipeline",
  },
  "ai-consulting": {
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    alt: "AI neural network visualization",
  },
  "full-stack-development": {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Full-stack web application code editor",
  },
  "technical-due-diligence": {
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Technical audit and code review process",
  },
  "dedicated-teams": {
    url: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&q=80",
    alt: "Remote engineering team collaborating across European time zones",
  },
  "api-development": {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    alt: "Connected API systems and integrations",
  },
  "llm-integration": {
    url: "https://images.unsplash.com/photo-1684369176170-463e84248b70?w=800&q=80",
    alt: "AI language model interface",
  },
  "legacy-modernization": {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Technology modernization and transformation",
  },
};

interface Props {
  params: Promise<{ slug: string; city: string }>;
}

interface CityData {
  name: string;
  country: string;
  region: string;
  population: string;
  techScene: string;
  localSentence: string;
  industries: string[];
  isDutch?: boolean;
}

const cities: Record<string, CityData> = {
  // --- Netherlands ---
  amsterdam: { name: "Amsterdam", country: "Netherlands", region: "North Holland", population: "900K+", techScene: "Europe's 4th largest tech hub with 800+ startups and major tech employers like Booking.com, Adyen, and TomTom.", localSentence: "We're based in Tilburg — just 2 hours from Amsterdam. Same timezone, same business culture.", industries: ["Fintech", "E-commerce", "AdTech", "SaaS"], isDutch: true },
  rotterdam: { name: "Rotterdam", country: "Netherlands", region: "South Holland", population: "650K+", techScene: "Major port city investing heavily in logistics tech, maritime innovation, and smart infrastructure.", localSentence: "We're based in Tilburg — just 1 hour from Rotterdam. Same timezone, same business culture.", industries: ["Logistics tech", "Maritime", "CleanTech", "Smart infrastructure"], isDutch: true },
  "the-hague": { name: "The Hague", country: "Netherlands", region: "South Holland", population: "550K+", techScene: "Government and international organization hub with growing cybersecurity and legal tech sectors.", localSentence: "We're based in Tilburg — just 1.5 hours from The Hague. Same timezone, same business culture.", industries: ["Cybersecurity", "LegalTech", "GovTech", "International orgs"], isDutch: true },
  utrecht: { name: "Utrecht", country: "Netherlands", region: "Utrecht", population: "360K+", techScene: "Fast-growing tech ecosystem with a strong focus on gaming, health tech, and sustainability startups.", localSentence: "We're based in Tilburg — just 1.5 hours from Utrecht. Same timezone, same business culture.", industries: ["Gaming", "HealthTech", "Sustainability", "EdTech"], isDutch: true },
  eindhoven: { name: "Eindhoven", country: "Netherlands", region: "North Brabant", population: "240K+", techScene: "The 'Silicon Valley of Europe' — home to ASML, Philips, NXP, and the High Tech Campus with 235+ companies.", localSentence: "We're based in Tilburg — just 30 minutes from Eindhoven. Practically neighbors.", industries: ["Semiconductors", "Hardware", "IoT", "Deep tech"], isDutch: true },

  // --- US Cities ---
  "new-york": { name: "New York", country: "United States", region: "New York", population: "8.3M+", techScene: "The world's largest financial center and a booming tech ecosystem — home to Google, Meta, Amazon offices, and thousands of startups across fintech, media, and enterprise SaaS.", localSentence: "Serving New York's tech ecosystem from our European HQ with a 6-hour timezone overlap during business hours.", industries: ["Fintech", "Media tech", "Enterprise SaaS", "AdTech"] },
  "san-francisco": { name: "San Francisco", country: "United States", region: "California", population: "870K+", techScene: "The global capital of tech innovation — headquarters of leading AI companies, cloud platforms, and the venture capital ecosystem that funds the future.", localSentence: "Supporting SF companies with EU-based engineering, 9-hour timezone offset enabling true follow-the-sun development.", industries: ["AI / ML", "Cloud platforms", "Venture-backed startups", "Developer tools"] },
  austin: { name: "Austin", country: "United States", region: "Texas", population: "1M+", techScene: "Fast-growing tech hub attracting major relocations from Tesla, Oracle, and Samsung, with a thriving startup scene and zero state income tax.", localSentence: "Serving Austin's booming tech scene from our European HQ with a 7-hour timezone overlap.", industries: ["Semiconductors", "Enterprise software", "CleanTech", "Gaming"] },
  boston: { name: "Boston", country: "United States", region: "Massachusetts", population: "680K+", techScene: "World-class biotech and life sciences corridor alongside MIT and Harvard-driven deep tech innovation in AI, robotics, and quantum computing.", localSentence: "Supporting Boston's innovation corridor from our EU base with a 6-hour timezone overlap during business hours.", industries: ["Biotech", "Life sciences", "Robotics", "EdTech"] },
  chicago: { name: "Chicago", country: "United States", region: "Illinois", population: "2.7M+", techScene: "Major enterprise tech hub with strengths in fintech, logistics, and B2B SaaS — home to Grubhub, Groupon, and a growing cloud-native ecosystem.", localSentence: "Serving Chicago enterprises from our European HQ with a 7-hour timezone overlap enabling extended coverage.", industries: ["Fintech", "Logistics tech", "B2B SaaS", "InsurTech"] },
  seattle: { name: "Seattle", country: "United States", region: "Washington", population: "740K+", techScene: "Home to Amazon, Microsoft, and a deep bench of cloud infrastructure talent — a global leader in cloud computing, AI, and developer tooling.", localSentence: "Supporting Seattle's cloud-first companies from our EU base with follow-the-sun coverage across a 9-hour offset.", industries: ["Cloud computing", "AI / ML", "Developer tools", "E-commerce"] },
  miami: { name: "Miami", country: "United States", region: "Florida", population: "450K+", techScene: "Rapidly emerging tech hub attracting crypto, fintech, and LatAm-focused startups — the gateway between North and South American markets.", localSentence: "Serving Miami's fast-growing tech scene from our European HQ with a 6-hour timezone overlap.", industries: ["Crypto / Web3", "Fintech", "LatAm tech", "Real estate tech"] },
  "los-angeles": { name: "Los Angeles", country: "United States", region: "California", population: "3.9M+", techScene: "Entertainment tech capital with a booming creator economy, gaming, and streaming industry — plus strong aerospace and defense tech sectors.", localSentence: "Supporting LA's entertainment and tech ecosystem from our EU base with follow-the-sun development across a 9-hour offset.", industries: ["Entertainment tech", "Streaming", "Gaming", "Aerospace"] },

  // --- UK ---
  london: { name: "London", country: "United Kingdom", region: "England", population: "9M+", techScene: "Europe's largest tech hub and the global fintech capital — home to over 80 unicorns, a world-leading AI cluster, and thousands of scaling startups.", localSentence: "Just a 1-hour flight from our Netherlands HQ. Same timezone, strong trade ties, and many shared clients.", industries: ["Fintech", "AI / ML", "InsurTech", "HealthTech"] },
  manchester: { name: "Manchester", country: "United Kingdom", region: "England", population: "550K+", techScene: "The UK's second-largest tech ecosystem with strengths in e-commerce, media tech, and a growing AI and cyber cluster.", localSentence: "Just a short flight from our Netherlands HQ. Same timezone, strong trade ties, and a thriving northern tech scene.", industries: ["E-commerce", "Media tech", "Cybersecurity", "HealthTech"] },

  // --- Germany ---
  berlin: { name: "Berlin", country: "Germany", region: "Berlin", population: "3.6M+", techScene: "Europe's startup capital with the highest concentration of VC-funded companies on the continent — strong in B2B SaaS, mobility, and fintech.", localSentence: "Serving Berlin from our Netherlands HQ — same timezone, EU single market, and just a 1.5-hour flight away.", industries: ["B2B SaaS", "Mobility", "Fintech", "E-commerce"] },
  munich: { name: "Munich", country: "Germany", region: "Bavaria", population: "1.5M+", techScene: "Germany's enterprise tech powerhouse — home to Siemens, BMW, and SAP offices, plus a growing AI and deep tech cluster.", localSentence: "Serving Munich from our Netherlands HQ — same timezone, EU single market, and strong existing DACH partnerships.", industries: ["Enterprise software", "Automotive tech", "AI / ML", "IoT"] },
  frankfurt: { name: "Frankfurt", country: "Germany", region: "Hesse", population: "760K+", techScene: "Europe's financial technology capital — home to the ECB, Deutsche Bank, and a rapidly growing fintech and regtech ecosystem.", localSentence: "Serving Frankfurt from our Netherlands HQ — same timezone, EU single market, and just a 1-hour flight away.", industries: ["Fintech", "RegTech", "Banking tech", "Cloud infrastructure"] },

  // --- Middle East ---
  dubai: { name: "Dubai", country: "United Arab Emirates", region: "Dubai", population: "3.5M+", techScene: "The Middle East's leading tech and innovation hub — a tax-free zone attracting global companies with its smart city initiatives, fintech sandbox, and AI strategy.", localSentence: "Serving Dubai's ambitious tech ecosystem from our European HQ with just a 3-hour timezone difference.", industries: ["Fintech", "PropTech", "Smart city", "E-commerce"] },
  riyadh: { name: "Riyadh", country: "Saudi Arabia", region: "Riyadh Province", population: "7.6M+", techScene: "Saudi Arabia's Vision 2030 is driving massive tech investment — NEOM, the $500B smart city, and a rapidly growing startup ecosystem backed by PIF.", localSentence: "Supporting Riyadh's Vision 2030 digital transformation from our European HQ with just a 2-hour timezone difference.", industries: ["GovTech", "Smart city", "Fintech", "Energy tech"] },
  "abu-dhabi": { name: "Abu Dhabi", country: "United Arab Emirates", region: "Abu Dhabi", population: "1.5M+", techScene: "A growing AI and deep tech hub — home to the world's first AI university (MBZUAI), Mubadala's tech investments, and Hub71 startup ecosystem.", localSentence: "Serving Abu Dhabi's AI-first ambitions from our European HQ with just a 3-hour timezone difference.", industries: ["AI / ML", "Energy tech", "Sovereign tech", "FinTech"] },

  // --- Asia-Pacific ---
  singapore: { name: "Singapore", country: "Singapore", region: "Southeast Asia", population: "5.9M+", techScene: "Asia's leading tech and financial hub — headquarters for Grab, Sea Group, and Shopee, with world-class infrastructure and business-friendly regulation.", localSentence: "Serving Singapore's thriving tech ecosystem from our European HQ with a 7-hour timezone overlap during business hours.", industries: ["Fintech", "E-commerce", "Logistics tech", "Web3"] },
  tokyo: { name: "Tokyo", country: "Japan", region: "Kanto", population: "14M+", techScene: "The world's largest metropolitan economy with leading innovation in robotics, gaming, and enterprise tech — home to Sony, Toyota, and SoftBank.", localSentence: "Supporting Tokyo's enterprise tech needs from our EU base with follow-the-sun coverage across an 8-hour offset.", industries: ["Robotics", "Gaming", "Enterprise software", "Automotive tech"] },
  sydney: { name: "Sydney", country: "Australia", region: "New South Wales", population: "5.3M+", techScene: "Australia's tech capital with a strong fintech sector, growing AI ecosystem, and the largest tech workforce in the southern hemisphere.", localSentence: "Supporting Sydney's tech ecosystem from our EU base — an 8-10 hour offset enabling true follow-the-sun development.", industries: ["Fintech", "Mining tech", "HealthTech", "EdTech"] },
  bangalore: { name: "Bangalore", country: "India", region: "Karnataka", population: "12M+", techScene: "India's Silicon Valley — headquarters for Infosys, Wipro, and the country's largest startup ecosystem, with deep talent pools in engineering and AI.", localSentence: "Partnering with Bangalore's tech ecosystem from our EU base with a 4.5-hour timezone overlap.", industries: ["Enterprise IT", "AI / ML", "SaaS", "E-commerce"] },

  // --- Africa ---
  lagos: { name: "Lagos", country: "Nigeria", region: "Lagos State", population: "16M+", techScene: "Africa's largest tech ecosystem — home to Flutterwave, Paystack, and Andela, leading the continent's fintech revolution and digital transformation.", localSentence: "Serving Lagos's booming tech scene from our European HQ — same timezone (CET +0/1h), minimal latency.", industries: ["Fintech", "Payments", "AgriTech", "Logistics tech"] },
  "cape-town": { name: "Cape Town", country: "South Africa", region: "Western Cape", population: "4.6M+", techScene: "Africa's leading tech hub for startups and scale-ups — a growing AI and fintech cluster with strong ties to European and US investors.", localSentence: "Serving Cape Town from our European HQ with just a 1-hour timezone difference — practically the same working hours.", industries: ["Fintech", "InsurTech", "AgriTech", "E-commerce"] },
  nairobi: { name: "Nairobi", country: "Kenya", region: "Nairobi County", population: "4.4M+", techScene: "East Africa's 'Silicon Savannah' — birthplace of M-Pesa mobile money and home to a thriving ecosystem of tech hubs, accelerators, and innovative startups.", localSentence: "Serving Nairobi from our European HQ with just a 2-hour timezone difference — strong overlap for real-time collaboration.", industries: ["Mobile payments", "AgriTech", "HealthTech", "CleanTech"] },

  // --- Latin America ---
  "sao-paulo": { name: "Sao Paulo", country: "Brazil", region: "Sao Paulo State", population: "12M+", techScene: "Latin America's largest tech market — home to Nubank, iFood, and a rapidly growing startup scene backed by Softbank and other major VC firms.", localSentence: "Serving Sao Paulo's tech ecosystem from our European HQ with a 4-5 hour timezone difference and strong overlap.", industries: ["Fintech", "E-commerce", "Logistics tech", "EdTech"] },
  "mexico-city": { name: "Mexico City", country: "Mexico", region: "CDMX", population: "9.2M+", techScene: "Mexico's booming tech hub with a fast-growing startup ecosystem — Kavak, Bitso, and Clip are leading LatAm innovation from the capital.", localSentence: "Serving Mexico City's growing tech scene from our European HQ with a 7-hour timezone overlap during business hours.", industries: ["Fintech", "E-commerce", "Mobility", "SaaS"] },
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
    features: ["Senior engineers (5+ yrs)", "Full team integration", "Month-to-month contracts", "EU timezone overlap", "Multilingual communication"],
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

  const title = `${serviceData.shortTitle} in ${cityData.name}`;
  const description = cityData.isDutch
    ? `${serviceData.title} for companies in ${cityData.name}, Netherlands. Senior EU-based engineers, GDPR-compliant, EUR invoicing. Free consultation.`
    : `${serviceData.title} for companies in ${cityData.name}, ${cityData.country}. Senior EU-based engineers, GDPR-compliant. Free consultation.`;

  return {
    title,
    description,
    // Programmatic city variants are thin near-duplicates of the main
    // service pages — keep them out of the index to avoid scaled-content
    // classification, but let crawlers follow links to canonical pages.
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `https://www.cloudrix.io/services/${slug}/${city}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.cloudrix.io/services/${slug}`,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{cityData.name}, {cityData.country}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {serviceData.shortTitle} in {cityData.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {serviceData.description}{" "}
                  {cityData.isDutch
                    ? `Based in the Netherlands, we serve ${cityData.name} companies with senior engineers who understand your market, speak your language, and work in your timezone.`
                    : `From our Netherlands HQ, we serve ${cityData.name} companies with senior EU-based engineers who deliver production-quality work on your schedule.`}
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
              {cityServiceImages[slug] && (
                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={cityServiceImages[slug].url}
                    alt={`${serviceData.shortTitle} in ${cityData.name} — ${cityServiceImages[slug].alt}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-white text-sm font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {serviceData.shortTitle} &middot; {cityData.name}
                    </p>
                  </div>
                </div>
              )}
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

        {/* Key Industries */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Key Industries in {cityData.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {cityData.industries.map((industry, idx) => (
                <span key={idx} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                  {industry}
                </span>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {cityData.isDutch ? "Netherlands-Based" : "EU-Based Team"}
                </h3>
                <p className="text-gray-600">
                  {cityData.localSentence}
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">GDPR by Default</h3>
                <p className="text-gray-600">
                  As a Dutch company (KVK: 97732699), GDPR compliance is built into everything we do.
                  {cityData.isDutch
                    ? " Your data stays in the EU, processed by EU-based engineers."
                    : " International data processing agreements, EU-grade security standards, and full compliance documentation."}
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {cityData.isDutch ? "EUR Invoicing" : "Flexible Invoicing"}
                </h3>
                <p className="text-gray-600">
                  {cityData.isDutch
                    ? "Simple, transparent billing in euros. No currency conversion, no international wire fees, no VAT confusion. Dutch btw-nummer on every invoice."
                    : "Simple, transparent billing in EUR or USD. Clear contracts under Dutch / EU law, no hidden fees, and flexible engagement models from project-based to dedicated teams."}
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
