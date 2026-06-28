import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Saudi Arabia - Vision 2030 & NEOM",
  description:
    "Enterprise cloud architecture, AI solutions, and digital transformation for Saudi Arabia. Vision 2030, NCA compliance, NEOM technology. SAR pricing. Book a free strategy call.",
  openGraph: {
    title: "Cloud & AI Engineering for Saudi Arabia",
    description:
      "Cloud and AI solutions supporting Vision 2030. NCA compliance, digital government, and giga-project technology. SAR pricing.",
    url: "https://www.cloudrix.io/markets/saudi-arabia",
    images: [
      {
        url: "/og?title=Saudi%20Arabia%20Cloud%20Engineering&subtitle=Vision%202030%20%7C%20NCA%20%7C%20NEOM",
        width: 1200,
        height: 630,
        alt: "Cloudrix Saudi Arabia",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/saudi-arabia",
  },
};

export default function SaudiArabiaMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Saudi Arabia",
        heroTitle: "Cloud Engineering Powering Vision 2030",
        heroSubtitle: "Saudi Arabia Digital Transformation Partners",
        heroDescription:
          "Saudi Arabia is executing the world's most ambitious national transformation program. Cloudrix delivers the enterprise cloud architecture, AI platforms, and digital government solutions that Vision 2030 demands. NCA-compliant infrastructure, local data residency, and SAR pricing with deep understanding of the Kingdom's technology landscape.",
        currency: "SAR",
        currencySymbol: "SAR ",
        starterPrice: "62,000",
        introText:
          "Vision 2030 is transforming Saudi Arabia from an oil-dependent economy into a diversified, technology-driven powerhouse. The Kingdom is investing hundreds of billions in giga-projects like NEOM, The Line, AMAALA, and the Red Sea Development, each requiring sophisticated technology platforms. Simultaneously, Saudi Arabia is digitizing government services, building a thriving fintech sector under SAMA regulation, and developing one of the world's most advanced AI capabilities through SDAIA and the National Data Management Office. Cloudrix brings the engineering capabilities that this transformation requires. Our European pedigree provides the quality standards, data governance practices, and security frameworks that Saudi regulators expect, while our delivery model offers the flexibility to support projects across Riyadh, Jeddah, and the Kingdom's emerging technology hubs. We have built digital platforms for Saudi government entities, fintech solutions compliant with SAMA and CMA regulations, and data analytics platforms that support the Kingdom's national data strategy. Our engineers understand the NCA Essential Cybersecurity Controls, PDPL data protection requirements, and the evolving regulatory landscape as the Kingdom rapidly modernizes its technology governance framework.",
        whyTitle: "Why Saudi Companies Choose Cloudrix",
        whyDescription:
          "The capabilities that make us a trusted partner for the Kingdom's most important technology initiatives.",
        stats: [
          { value: "6+", label: "KSA Projects Delivered" },
          { value: "4hrs", label: "AST Overlap Daily" },
          { value: "NCA", label: "Compliance Certified" },
          { value: "SAR", label: "Local Currency Pricing" },
        ],
        services: [
          {
            title: "Vision 2030 Digital Platforms",
            description:
              "End-to-end digital platform development for Vision 2030 initiatives. Government portals, citizen services, digital identity integration with Absher, and national program management systems.",
            icon: "globe",
          },
          {
            title: "SAMA-Compliant Fintech",
            description:
              "Payment platforms, digital banking, open banking APIs, and lending technology compliant with Saudi Arabian Monetary Authority regulations and the Kingdom's fintech sandbox requirements.",
            icon: "dollar",
          },
          {
            title: "AI & National Data Strategy",
            description:
              "AI solutions aligned with the National Strategy for Data and AI. Arabic NLP, computer vision, predictive analytics, and machine learning platforms for government and enterprise.",
            icon: "building",
          },
          {
            title: "Giga-Project Technology",
            description:
              "Smart city platforms, construction technology, environmental monitoring, and digital twin systems for NEOM, The Line, AMAALA, and other giga-project developments.",
            icon: "building",
          },
          {
            title: "Cloud & Data Sovereignty",
            description:
              "Deploy to AWS Middle East (Bahrain), Azure, or STC Cloud with full compliance with Saudi data localization requirements. NCA-compliant architecture and NDMO data governance.",
            icon: "shield",
          },
          {
            title: "Enterprise Digital Transformation",
            description:
              "Legacy system modernization, ERP integration, process automation, and digital workplace solutions for Saudi corporations, family businesses, and government-related entities.",
            icon: "clock",
          },
        ],
        advantages: [
          {
            title: "NCA Compliance Expertise",
            description:
              "Deep understanding of the National Cybersecurity Authority's Essential Cybersecurity Controls (ECC) and Critical Systems Cybersecurity Controls (CSCC). We build infrastructure that satisfies NCA audit requirements.",
          },
          {
            title: "Vision 2030 Alignment",
            description:
              "Our technology solutions directly support Vision 2030 pillars: digital government, economic diversification, entertainment and tourism, and the development of local technology capabilities.",
          },
          {
            title: "PDPL Data Protection Compliance",
            description:
              "Full compliance with the Saudi Personal Data Protection Law. Our native GDPR expertise provides a strong foundation for PDPL compliance, which shares many principles with European data protection.",
          },
          {
            title: "SAR Pricing Transparency",
            description:
              "All pricing, contracts, and invoices in Saudi Riyals. No currency conversion risk, no hidden fees. Straightforward budget planning for Saudi organizations.",
          },
          {
            title: "Arabic-First Design Capability",
            description:
              "We build platforms with Arabic as a first-class citizen, not an afterthought. Proper RTL layouts, Arabic typography, Hijri date support, and culturally appropriate UX design.",
          },
          {
            title: "Saudization-Compatible Partnership",
            description:
              "We structure engagements to support Saudization goals through knowledge transfer programs, training of Saudi technical staff, and gradual transition of capabilities to local teams.",
          },
        ],
        compliance: [
          {
            name: "NCA Essential Cybersecurity Controls",
            description:
              "Full compliance with the National Cybersecurity Authority's ECC framework covering governance, defense, resilience, and third-party cybersecurity across all domains.",
          },
          {
            name: "PDPL (Personal Data Protection Law)",
            description:
              "Saudi Arabia's data protection legislation compliance including data subject rights, cross-border transfer restrictions, consent management, and NDMO registration.",
          },
          {
            name: "SAMA Cybersecurity Framework",
            description:
              "Saudi Arabian Monetary Authority's cybersecurity framework for financial institutions covering governance, risk management, compliance, and technology operations.",
          },
          {
            name: "CMA Technology Requirements",
            description:
              "Capital Market Authority technology governance requirements for companies operating in Saudi Arabia's capital markets and investment sectors.",
          },
          {
            name: "NDMO Data Governance",
            description:
              "National Data Management Office data classification, data sharing, and open data compliance for government entities and their technology partners.",
          },
          {
            name: "CITC Telecommunications Regulations",
            description:
              "Communications, Space, and Technology Commission requirements for cloud services, data centers, and telecommunications technology operating in the Kingdom.",
          },
        ],
        industries: [
          {
            name: "Government & Public Sector",
            description:
              "Digital government transformation, e-services portals, national program platforms, and citizen engagement systems supporting the Kingdom's Digital Government Authority initiatives.",
          },
          {
            name: "Financial Services & Fintech",
            description:
              "SAMA-regulated banking platforms, payment systems, insurance technology, and capital market solutions for Saudi Arabia's rapidly growing financial technology sector.",
          },
          {
            name: "Energy & Mining",
            description:
              "Digital oilfield technologies, renewable energy monitoring, mining analytics, and energy trading platforms supporting the Kingdom's energy diversification strategy.",
          },
          {
            name: "Tourism & Entertainment",
            description:
              "Booking platforms, visitor experience technology, event management systems, and destination analytics for Saudi Arabia's emerging tourism and entertainment sector.",
          },
          {
            name: "Healthcare",
            description:
              "Telemedicine platforms, hospital information systems, health data exchange, and pharmaceutical supply chain technology supporting the Kingdom's healthcare transformation.",
          },
          {
            name: "Education & Training",
            description:
              "E-learning platforms, workforce development systems, and educational technology supporting Saudi Arabia's human capital development and Saudization initiatives.",
          },
        ],
        faqs: [
          {
            question: "How do you ensure NCA compliance for Saudi projects?",
            answer:
              "We design all infrastructure for Saudi clients against the NCA Essential Cybersecurity Controls framework from the outset. This includes implementing the required governance structures, defense mechanisms, resilience procedures, and third-party management controls. We provide NCA compliance documentation and can support your organization through NCA assessments and audits.",
          },
          {
            question: "Can you deploy to Saudi-based cloud infrastructure?",
            answer:
              "Yes. We deploy to AWS Middle East (Bahrain) which provides excellent latency to Saudi Arabia, and also work with local Saudi cloud providers like STC Cloud and Alibaba Cloud's Riyadh region when data localization requirements mandate in-Kingdom hosting. Azure is expanding its Saudi presence and we can leverage those regions as they become available.",
          },
          {
            question: "Do you support Saudization of technology capabilities?",
            answer:
              "Absolutely. We structure our engagements with built-in knowledge transfer to Saudi technical staff. This includes mentoring programs, documentation in Arabic, training sessions, and a phased transition plan that builds local capability over the engagement period. We see our role as helping Saudi organizations develop their own technology competencies, not creating dependency.",
          },
          {
            question: "What is your experience with Saudi government procurement?",
            answer:
              "We understand the Saudi government procurement process including registration requirements, the Etimad platform, evaluation criteria, and the technology-specific qualification processes. We can participate as a technology subcontractor to Saudi prime contractors or work directly with government entities depending on the project structure.",
          },
          {
            question: "Can you build Arabic-first applications?",
            answer:
              "Yes. We develop fully bilingual Arabic/English applications with Arabic as the primary language. This includes proper RTL layout, Arabic font optimization, Hijri calendar integration, Saudi locale formatting for dates, numbers, and currency, and culturally appropriate user interface design. Our QA team includes Arabic speakers who verify linguistic accuracy.",
          },
          {
            question: "How do you handle the PDPL requirements for data protection?",
            answer:
              "The Saudi PDPL shares many principles with the EU GDPR, which is our native regulatory environment. We implement PDPL compliance through data classification, consent management, data subject rights automation, cross-border transfer assessments, and breach notification procedures. We also support registration with the NDMO and can prepare the required data protection impact assessments.",
          },
        ],
        ctaTitle: "Partner with Engineers Who Understand Vision 2030",
        ctaDescription:
          "Saudi Arabia's transformation demands world-class engineering. Cloudrix delivers the cloud architecture, AI capabilities, and digital platforms that turn Vision 2030 into reality. Book a free strategy call.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Saudi Arabia", url: "/markets/saudi-arabia" },
        ],
      }}
    />
  );
}
