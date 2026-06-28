import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for UAE Companies - DIFC & Smart City Solutions",
  description:
    "Enterprise cloud architecture, AI integration, and fintech solutions for UAE businesses. DIFC and ADGM compliance, UAE data sovereignty, smart city platforms. AED pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for UAE Companies",
    description:
      "Cloud and AI solutions for the UAE. DIFC compliance, smart city infrastructure, and fintech platforms with AED pricing.",
    url: "https://www.cloudrix.io/markets/uae",
    images: [
      {
        url: "/og?title=UAE%20Cloud%20%26%20AI%20Engineering&subtitle=DIFC%20%7C%20Smart%20City%20%7C%20Fintech",
        width: 1200,
        height: 630,
        alt: "Cloudrix UAE",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/uae",
  },
};

export default function UAEMarketPage() {
  return (
    <MarketPage
      data={{
        region: "the United Arab Emirates",
        heroTitle: "Cloud Engineering for the UAE's Digital Ambitions",
        heroSubtitle: "UAE Cloud & AI Specialists",
        heroDescription:
          "The UAE leads the Middle East in digital innovation with its AI Strategy 2031, smart city initiatives, and world-class financial free zones. Cloudrix delivers enterprise-grade cloud architecture, AI-powered platforms, and fintech solutions that meet DIFC, ADGM, and UAE federal data protection requirements. AED pricing with no hidden conversion fees.",
        currency: "AED",
        currencySymbol: "AED ",
        starterPrice: "16,500",
        introText:
          "The United Arab Emirates has established itself as the technology gateway to the Middle East and a global leader in digital transformation. The UAE AI Strategy 2031 aims to make the country a global leader in artificial intelligence, while initiatives like Dubai's Smart City program, Abu Dhabi's Hub71, and the DIFC Innovation Hub have created a thriving ecosystem for technology companies. However, building technology in the UAE comes with unique requirements: data sovereignty laws mandate that certain data categories remain within UAE borders, financial regulators at DIFC and ADGM impose strict technology governance requirements, and the rapid pace of government digitization demands engineering partners who can deliver at speed without compromising quality. Cloudrix brings European engineering rigor to the UAE market. Our proximity in the CET timezone provides significant overlap with Gulf Standard Time, enabling real-time collaboration during UAE business hours. We have delivered cloud migration projects for UAE government entities, built fintech platforms compliant with DIFC regulations, and developed smart city components that process millions of IoT sensor readings daily. Our European GDPR expertise provides a natural foundation for UAE data protection compliance, and our multi-language team includes Arabic-speaking project managers who understand local business culture.",
        whyTitle: "Why UAE Companies Choose Cloudrix",
        whyDescription:
          "European engineering quality tailored for the UAE's ambitious technology landscape.",
        stats: [
          { value: "8+", label: "UAE Projects Delivered" },
          { value: "5hrs", label: "GST Overlap Daily" },
          { value: "100%", label: "UAE Data Sovereignty Compliant" },
          { value: "3", label: "UAE Free Zone Compliance" },
        ],
        services: [
          {
            title: "Smart City Infrastructure",
            description:
              "IoT platforms, digital twin systems, intelligent traffic management, and urban analytics. Building the technology backbone for Dubai Smart City and Abu Dhabi's digital transformation.",
            icon: "globe",
          },
          {
            title: "Fintech & Open Banking Platforms",
            description:
              "DIFC and ADGM-compliant financial technology platforms. Open banking APIs, payment processing, wealth management, and Islamic finance solutions built for Gulf markets.",
            icon: "dollar",
          },
          {
            title: "AI Strategy Implementation",
            description:
              "Turn the UAE AI Strategy 2031 into reality with production AI systems. Computer vision for smart surveillance, NLP for Arabic language processing, and predictive analytics for government services.",
            icon: "building",
          },
          {
            title: "Government Digital Transformation",
            description:
              "E-government portals, digital identity integration (UAE Pass), and citizen service platforms. Cloud architectures that meet UAE federal and emirate-level security requirements.",
            icon: "shield",
          },
          {
            title: "Cloud Migration & Data Sovereignty",
            description:
              "Migrate to AWS Middle East (Bahrain), Azure UAE, or local cloud providers while maintaining full compliance with UAE Federal Data Protection Law and sector-specific regulations.",
            icon: "globe",
          },
          {
            title: "Enterprise Application Development",
            description:
              "Custom enterprise platforms for UAE conglomerates, family offices, and government-related entities. Multi-language support including Arabic RTL interfaces and bilingual content management.",
            icon: "building",
          },
        ],
        advantages: [
          {
            title: "5 Hours Daily GST Overlap",
            description:
              "Our European timezone provides 5 hours of overlap with Gulf Standard Time, covering the UAE business afternoon from 12 PM to 5 PM GST. Ideal for daily syncs, demo sessions, and collaborative problem-solving.",
          },
          {
            title: "GDPR-Grade Data Protection Expertise",
            description:
              "The UAE Federal Data Protection Law draws heavily from GDPR. Our native GDPR expertise means we already build to the standard that UAE regulators expect, providing a compliance advantage from day one.",
          },
          {
            title: "Arabic-Speaking Project Management",
            description:
              "Our team includes Arabic-speaking project managers who understand Gulf business culture, communication norms, and the importance of relationship-building in the UAE market.",
          },
          {
            title: "AED Pricing with No Surprises",
            description:
              "All contracts and invoices are denominated in AED. No currency fluctuation risk, no hidden conversion fees. Transparent pricing that makes budget planning straightforward.",
          },
          {
            title: "Free Zone Regulatory Expertise",
            description:
              "Experience with DIFC, ADGM, DMCC, DWTC, and other free zone regulatory frameworks. We build technology that satisfies the specific compliance requirements of each jurisdiction.",
          },
          {
            title: "European Quality, Gulf Market Understanding",
            description:
              "We combine EU engineering standards and processes with genuine understanding of the Gulf market dynamics, government procurement processes, and the pace of transformation in the UAE.",
          },
        ],
        compliance: [
          {
            name: "UAE Federal Data Protection Law",
            description:
              "Full compliance with the UAE's federal data protection legislation including data classification, cross-border transfer restrictions, and data subject rights management.",
          },
          {
            name: "DIFC Data Protection Law",
            description:
              "DIFC-specific data protection requirements for financial services companies operating in the Dubai International Financial Centre. Commissioner registration and compliance documentation.",
          },
          {
            name: "ADGM Data Protection Regulations",
            description:
              "Abu Dhabi Global Market data protection compliance for financial services, fund management, and professional services companies operating in ADGM.",
          },
          {
            name: "NESA / ICA Standards",
            description:
              "National Electronic Security Authority information assurance standards for critical infrastructure and government entities in the UAE.",
          },
          {
            name: "Central Bank CBUAE Regulations",
            description:
              "Technology governance and cybersecurity requirements from the Central Bank of the UAE for licensed financial institutions and payment service providers.",
          },
          {
            name: "Dubai Cyber Security Standard",
            description:
              "Compliance with the Dubai Electronic Security Center (DESC) standards for government entities and critical infrastructure operators in the Emirate of Dubai.",
          },
        ],
        industries: [
          {
            name: "Financial Services & Fintech",
            description:
              "DIFC and ADGM-regulated platforms, open banking, Islamic finance, wealth management, and payment solutions for the UAE's rapidly growing financial sector.",
          },
          {
            name: "Government & Smart City",
            description:
              "Digital government services, smart city analytics, IoT platforms, and AI-powered public services for federal and emirate-level government entities.",
          },
          {
            name: "Real Estate & PropTech",
            description:
              "Property management platforms, real estate marketplace technology, digital escrow systems, and smart building management for the UAE's dynamic real estate sector.",
          },
          {
            name: "Energy & Sustainability",
            description:
              "Oil and gas digital transformation, renewable energy monitoring, carbon tracking, and sustainability reporting for UAE energy companies pursuing the 2050 net-zero strategy.",
          },
          {
            name: "Healthcare",
            description:
              "Telemedicine platforms, hospital information systems, health data exchange, and AI diagnostics for the UAE's expanding healthcare sector and medical tourism industry.",
          },
          {
            name: "Logistics & Trade",
            description:
              "Supply chain platforms, port management systems, trade finance solutions, and e-commerce fulfillment technology for the UAE's position as a global trade hub.",
          },
        ],
        faqs: [
          {
            question: "Can you deploy to UAE-based cloud regions for data sovereignty?",
            answer:
              "Yes. We deploy to AWS Middle East (Bahrain) region, Microsoft Azure UAE (Dubai and Abu Dhabi), and can also work with local UAE cloud providers like G42 Cloud and Khazna Data Centers when government mandates require in-country data residency. We design architectures that keep regulated data within the UAE while leveraging global CDN edges for performance.",
          },
          {
            question: "Do you understand DIFC and ADGM regulatory requirements?",
            answer:
              "Yes. We have built fintech platforms for companies licensed in both DIFC and ADGM. We understand the specific technology governance requirements of each free zone regulator, including data protection registration, outsourcing notifications, business continuity requirements, and the technology risk management frameworks they expect from licensed firms.",
          },
          {
            question: "How does the timezone difference work with UAE teams?",
            answer:
              "Our CET timezone provides 5 hours of overlap with GST (UAE time), covering your afternoon from 12 PM to 5 PM. This works well for daily syncs after lunch, afternoon code reviews, and end-of-day demo sessions. Morning hours in the UAE are covered by async work delivered overnight by our team, giving you fresh progress every morning.",
          },
          {
            question: "Can you support Arabic language applications?",
            answer:
              "Absolutely. We have extensive experience building bilingual Arabic/English applications with proper RTL layout support, Arabic typography, date formatting (Hijri calendar), and cultural localization. Our team includes Arabic-speaking project managers and QA engineers who ensure linguistic and cultural accuracy.",
          },
          {
            question: "What is your experience with UAE government projects?",
            answer:
              "We have delivered digital platforms for UAE government entities including e-government portals, data analytics dashboards, and citizen service applications. We understand the procurement processes, security clearance requirements, and the UAE government's digital-first service delivery expectations.",
          },
          {
            question: "Do you offer AED-denominated contracts?",
            answer:
              "Yes. All contracts, proposals, and invoices for UAE clients are denominated in AED. We absorb all currency exchange costs, providing complete price certainty. Payments can be made via international wire transfer or through our UAE banking partner for faster processing.",
          },
        ],
        ctaTitle: "Build the Technology Powering the UAE's Future",
        ctaDescription:
          "From smart cities to fintech platforms, Cloudrix delivers the cloud and AI engineering that the UAE's ambitions demand. Book a free strategy call to discuss your project.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "UAE", url: "/markets/uae" },
        ],
      }}
    />
  );
}
