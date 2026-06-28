import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Dubai Tech Hub - Smart City & Fintech",
  description:
    "Cloud architecture, AI solutions, and fintech platforms for Dubai's technology ecosystem. DIFC compliance, smart city infrastructure, Dubai Blockchain Strategy. AED pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Dubai Tech Hub",
    description:
      "Smart city platforms, fintech solutions, and enterprise cloud architecture for Dubai. DIFC compliant, AED pricing.",
    url: "https://www.cloudrix.io/markets/uae/dubai",
    images: [
      {
        url: "/og?title=Dubai%20Cloud%20Engineering&subtitle=Smart%20City%20%7C%20DIFC%20%7C%20Fintech",
        width: 1200,
        height: 630,
        alt: "Cloudrix Dubai",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/uae/dubai",
  },
};

export default function DubaiMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Dubai",
        heroTitle: "Cloud Engineering for Dubai's Smart City Ambitions",
        heroSubtitle: "Dubai Technology Specialists",
        heroDescription:
          "Dubai is building the world's smartest city, powered by blockchain, AI, and IoT. Cloudrix delivers the enterprise cloud architecture, intelligent platforms, and DIFC-compliant fintech solutions that drive Dubai's position as the technology capital of the Middle East. From DIFC to Dubai Internet City, we build infrastructure for Dubai's most ambitious projects.",
        currency: "AED",
        currencySymbol: "AED ",
        starterPrice: "16,500",
        introText:
          "Dubai has set an audacious technology agenda: become the world's first blockchain-powered government, achieve the Dubai 10X innovation vision, and establish the city as a global AI hub through the Dubai AI Campus and Centennial Plan 2071. These initiatives require world-class engineering talent that can deliver at the pace Dubai demands while meeting the regulatory requirements of DIFC, DESC, and the Dubai Electronic Security Center. Cloudrix is built for exactly this challenge. Our European engineering discipline provides the quality and security standards that Dubai's regulators and enterprise clients expect, while our agile delivery model matches the speed at which Dubai operates. We have delivered smart city components for Dubai government entities, built DIFC-regulated fintech platforms, and developed real estate technology solutions for Dubai's dynamic property market. Our engineers understand the unique technical challenges of building in Dubai: high-availability requirements in extreme climate conditions, multi-language applications with proper Arabic RTL support, and integration with Dubai's digital government infrastructure including UAE Pass and smart services. We are not just another technology vendor; we are a committed partner in Dubai's journey to become the world's most technologically advanced city.",
        whyTitle: "Why Dubai Companies Choose Cloudrix",
        whyDescription:
          "The specialized capabilities that make us the right engineering partner for Dubai's technology ecosystem.",
        stats: [
          { value: "6+", label: "Dubai Projects Delivered" },
          { value: "5hrs", label: "GST Overlap Daily" },
          { value: "2M+", label: "IoT Data Points Processed Daily" },
          { value: "DIFC", label: "Regulatory Compliance" },
        ],
        services: [
          {
            title: "Dubai Smart City Platforms",
            description:
              "IoT sensor networks, urban analytics dashboards, intelligent traffic systems, and connected building management. Built for Dubai Smart City standards and integrated with Dubai Data Establishment frameworks.",
            icon: "globe",
          },
          {
            title: "DIFC Fintech Solutions",
            description:
              "Fully DIFC-regulated fintech platforms including payment gateways, wealth management portals, Islamic finance engines, and open banking APIs that meet DFSA technology governance requirements.",
            icon: "dollar",
          },
          {
            title: "Blockchain & Web3 Integration",
            description:
              "Supporting the Dubai Blockchain Strategy with enterprise blockchain solutions, smart contract development, digital asset platforms, and DLT-based government services.",
            icon: "shield",
          },
          {
            title: "PropTech & Real Estate Platforms",
            description:
              "Property marketplace technology, digital escrow systems, tenant management platforms, and smart building analytics for Dubai's dynamic real estate market.",
            icon: "building",
          },
          {
            title: "AI-Powered Customer Experiences",
            description:
              "Conversational AI in Arabic and English, computer vision for retail analytics, personalization engines for hospitality, and AI-driven tourism experiences.",
            icon: "building",
          },
          {
            title: "E-commerce & Logistics Platforms",
            description:
              "Cross-border e-commerce platforms, last-mile delivery optimization, warehouse management, and trade finance solutions leveraging Dubai's position as a global logistics hub.",
            icon: "clock",
          },
        ],
        advantages: [
          {
            title: "Dubai Regulatory Deep Knowledge",
            description:
              "We understand DIFC, DMCC, DWTC, DIC, and mainland regulatory requirements. Our solutions are designed for the specific jurisdiction your Dubai business operates in.",
          },
          {
            title: "Smart City Technology Experience",
            description:
              "Proven experience building IoT platforms, digital twins, and urban analytics systems that align with Dubai Smart City standards and the Dubai Data Establishment framework.",
          },
          {
            title: "Arabic-English Bilingual Platforms",
            description:
              "Full bilingual platform development with proper RTL layout, Arabic typography, Hijri calendar support, and cultural localization that serves Dubai's diverse population.",
          },
          {
            title: "Dubai Speed, European Quality",
            description:
              "Dubai demands fast delivery. Our agile methodology delivers working software every two weeks while maintaining the code quality, security, and documentation standards that European engineering is known for.",
          },
          {
            title: "Local Cloud Infrastructure",
            description:
              "Deploy to Azure UAE (Dubai), AWS Middle East (Bahrain), or local providers for data sovereignty. Multi-region architectures that optimize latency for Dubai users.",
          },
          {
            title: "AED Fixed Pricing",
            description:
              "All engagement pricing in AED. No currency risk, no conversion surprises. Budget certainty for Dubai companies used to AED-denominated business planning.",
          },
        ],
        compliance: [
          {
            name: "DIFC Data Protection Law (DIFC Law No. 5)",
            description:
              "Complete compliance with DIFC's data protection legislation for companies licensed in the Dubai International Financial Centre. Commissioner notification and records management.",
          },
          {
            name: "DFSA Technology Governance",
            description:
              "Dubai Financial Services Authority technology risk management and outsourcing requirements for regulated financial institutions operating in DIFC.",
          },
          {
            name: "DESC Cyber Security Standards",
            description:
              "Dubai Electronic Security Center standards for government entities and critical infrastructure. Security assessment, incident response, and vulnerability management compliance.",
          },
          {
            name: "Dubai Data Law (Law No. 26 of 2015)",
            description:
              "Compliance with Dubai's data dissemination and exchange law, including data classification, sharing protocols, and the Dubai Data Establishment standards.",
          },
          {
            name: "DMCC Regulatory Framework",
            description:
              "Technology governance and data handling requirements for companies operating within the Dubai Multi Commodities Centre free zone.",
          },
          {
            name: "PCI DSS for Payment Systems",
            description:
              "Payment card industry compliance for Dubai's e-commerce and fintech platforms. Essential for companies processing card payments in the UAE market.",
          },
        ],
        industries: [
          {
            name: "Financial Services (DIFC)",
            description:
              "Banking platforms, wealth management, Islamic finance, payments, and regulatory technology for DIFC-licensed institutions and fintech companies serving the Gulf market.",
          },
          {
            name: "Smart City & Government",
            description:
              "Connected infrastructure, digital government services, urban planning analytics, and public safety technology supporting Dubai's Smart City vision.",
          },
          {
            name: "Real Estate & Construction",
            description:
              "PropTech platforms, BIM integration, construction project management, smart building systems, and virtual property viewing technology for Dubai's property sector.",
          },
          {
            name: "Tourism & Hospitality",
            description:
              "Guest experience platforms, booking engines, loyalty systems, and AI-powered concierge services for Dubai's world-leading tourism and hospitality industry.",
          },
          {
            name: "Retail & E-commerce",
            description:
              "Omnichannel commerce platforms, marketplace solutions, inventory management, and personalization engines for Dubai's retail giants and growing D2C brands.",
          },
          {
            name: "Logistics & Free Zone Operations",
            description:
              "Trade management platforms, customs integration, warehouse automation, and cross-border logistics optimization leveraging Dubai's free zone infrastructure.",
          },
        ],
        faqs: [
          {
            question: "Do you have experience with Dubai government projects?",
            answer:
              "Yes. We have delivered technology components for Dubai government entities, working within the Smart Dubai standards, Dubai Data Establishment framework, and DESC security requirements. We understand the procurement process, including registration on Dubai's digital procurement platforms and the security clearance requirements for government technology partners.",
          },
          {
            question: "Can you build platforms that comply with DIFC and mainland Dubai regulations simultaneously?",
            answer:
              "Yes. Many Dubai fintech companies operate across both DIFC and mainland jurisdictions. We architect systems that satisfy both regulatory frameworks simultaneously, with appropriate data segregation, reporting, and access controls for each jurisdiction. Our experience spans DIFC, ADGM, DMCC, and mainland regulatory requirements.",
          },
          {
            question: "How do you support the Dubai Blockchain Strategy?",
            answer:
              "We have built enterprise blockchain solutions including supply chain provenance systems, digital identity verification, smart contract platforms, and document attestation services. We work with Hyperledger Fabric for permissioned enterprise chains and can integrate with Dubai's government blockchain infrastructure. We focus on practical blockchain applications that deliver real business value, not blockchain for its own sake.",
          },
          {
            question: "What cloud regions do you deploy to for Dubai clients?",
            answer:
              "We primarily deploy to Azure UAE North (Dubai) and Azure UAE Central (Abu Dhabi) for optimal local latency and data sovereignty. For services not yet available in UAE regions, we use AWS Middle East (Bahrain) which provides sub-10ms latency to Dubai. We can also deploy to G42 Cloud or other UAE-based providers when government contracts require strictly in-country hosting.",
          },
          {
            question: "Can you integrate with UAE Pass and other government digital services?",
            answer:
              "Yes. We have experience integrating with UAE Pass for digital identity verification, and we understand the APIs and protocols used by Dubai's digital government infrastructure. We can build applications that leverage government digital services for authentication, document verification, and service delivery.",
          },
          {
            question: "Do you understand Islamic finance technology requirements?",
            answer:
              "Yes. We have built Islamic finance platforms including Sharia-compliant investment portals, Sukuk management systems, and Murabaha/Ijara financing calculators. We understand the technology implications of Sharia compliance including profit-sharing calculation engines, purification modules, and Sharia board reporting requirements.",
          },
        ],
        ctaTitle: "Build Dubai's Next Breakthrough Technology",
        ctaDescription:
          "From smart city infrastructure to DIFC fintech platforms, Cloudrix delivers world-class engineering for Dubai's most ambitious projects. Book a free strategy call today.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "UAE", url: "/markets/uae" },
          { name: "Dubai", url: "/markets/uae/dubai" },
        ],
      }}
    />
  );
}
