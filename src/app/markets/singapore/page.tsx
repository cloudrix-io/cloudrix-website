import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Singapore - Smart Nation & PDPA Compliance",
  description:
    "Enterprise cloud architecture, AI integration, and fintech solutions for Singapore companies. PDPA and MAS compliant. Smart Nation infrastructure. SGD pricing. Free strategy call.",
  openGraph: {
    title: "Cloud & AI Engineering for Singapore",
    description:
      "Cloud and AI solutions for Singapore's Smart Nation. PDPA compliant, MAS-regulated fintech, SGD pricing.",
    url: "https://www.cloudrix.io/markets/singapore",
    images: [
      {
        url: "/og?title=Singapore%20Cloud%20Engineering&subtitle=Smart%20Nation%20%7C%20PDPA%20%7C%20Fintech",
        width: 1200,
        height: 630,
        alt: "Cloudrix Singapore",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/singapore",
  },
};

export default function SingaporeMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Singapore",
        heroTitle: "Cloud Engineering for Singapore's Smart Nation",
        heroSubtitle: "Singapore Technology Specialists",
        heroDescription:
          "Singapore leads Asia in digital government, fintech innovation, and technology adoption. Cloudrix delivers enterprise cloud architecture, AI platforms, and MAS-compliant fintech solutions for Singapore's most demanding companies. PDPA compliant, deployed on Singapore cloud regions, with transparent SGD pricing.",
        currency: "SGD",
        currencySymbol: "S$",
        starterPrice: "6,000",
        introText:
          "Singapore has established itself as the undisputed technology hub of Southeast Asia and a global leader in smart governance. The Smart Nation initiative drives digital transformation across every sector, the Monetary Authority of Singapore has created one of the world's most progressive fintech regulatory frameworks, and Singapore's strategic position makes it the gateway for technology companies expanding across ASEAN. Building technology for the Singapore market requires understanding PDPA data protection obligations, MAS Technology Risk Management guidelines, and the high standards that Singaporean enterprises expect from their technology partners. Cloudrix brings European engineering rigor that naturally aligns with Singapore's quality-focused business culture. Our GDPR expertise translates directly to PDPA compliance requirements, and our experience with financial regulations across multiple jurisdictions prepares us well for MAS oversight. We have built fintech platforms licensed by MAS, government-facing applications integrated with SingPass and CorpPass, and AI solutions deployed for multinational companies using Singapore as their APAC headquarters. Our engineers provide overlap with Singapore business hours through early-morning and late-evening shifts, ensuring real-time collaboration when it matters most.",
        whyTitle: "Why Singapore Companies Choose Cloudrix",
        whyDescription:
          "The capabilities that make us a natural fit for Singapore's quality-driven technology market.",
        stats: [
          { value: "7+", label: "Singapore Projects" },
          { value: "4hrs", label: "SGT Overlap Daily" },
          { value: "PDPA", label: "Full Compliance" },
          { value: "MAS", label: "Regulated Fintech Experience" },
        ],
        services: [
          {
            title: "MAS-Compliant Fintech Platforms",
            description:
              "Payment services, digital banking, wealth management, and insurance technology compliant with MAS Technology Risk Management Guidelines, Notice on Cyber Hygiene, and outsourcing regulations.",
            icon: "dollar",
          },
          {
            title: "Smart Nation Digital Services",
            description:
              "Government-facing applications with SingPass/CorpPass integration, GovTech API gateway connectivity, and alignment with Singapore Government Technology Stack.",
            icon: "globe",
          },
          {
            title: "AI & Machine Learning",
            description:
              "Production AI systems aligned with Singapore's Model AI Governance Framework. Responsible AI development, explainable ML, and AI-powered business process automation.",
            icon: "building",
          },
          {
            title: "Cloud Architecture on AWS Singapore",
            description:
              "Native deployment to AWS Asia Pacific (Singapore) region. Multi-AZ architectures with DR in ap-southeast-2 (Sydney). PDPA-compliant data handling and sovereignty.",
            icon: "shield",
          },
          {
            title: "ASEAN Expansion Platform",
            description:
              "Multi-region architectures for companies using Singapore as their ASEAN headquarters. Scalable platforms that extend to Indonesia, Malaysia, Thailand, Vietnam, and Philippines.",
            icon: "globe",
          },
          {
            title: "Supply Chain & Logistics Technology",
            description:
              "Trade management platforms, port logistics systems, and supply chain visibility solutions leveraging Singapore's position as a global shipping and logistics hub.",
            icon: "clock",
          },
        ],
        advantages: [
          {
            title: "GDPR-to-PDPA Compliance Bridge",
            description:
              "Singapore's PDPA shares foundational principles with GDPR, and our native European data protection expertise provides a compliance advantage. We build systems that satisfy both frameworks simultaneously.",
          },
          {
            title: "MAS Regulatory Fluency",
            description:
              "Deep understanding of MAS Technology Risk Management Guidelines, outsourcing requirements, and the Fintech Regulatory Sandbox. We have helped companies navigate MAS licensing requirements.",
          },
          {
            title: "Singapore Cloud Region Deployment",
            description:
              "Native deployment to AWS ap-southeast-1 (Singapore) and other Singapore-based cloud regions. Data stays in Singapore, latency is optimized, and PDPA data localization is maintained.",
          },
          {
            title: "European Quality Standards",
            description:
              "Singapore values precision, reliability, and quality, which aligns perfectly with European engineering culture. Our development processes meet the high standards Singaporean enterprises expect.",
          },
          {
            title: "Cost-Effective Senior Talent",
            description:
              "Singapore's technology talent market is expensive and competitive. Our senior European engineers provide equivalent quality at more competitive rates, extending technology budgets for Singapore companies.",
          },
          {
            title: "ASEAN-Ready Architecture",
            description:
              "We design systems for regional expansion from day one, with multi-tenancy, localization frameworks, and distributed deployment capabilities across ASEAN markets.",
          },
        ],
        compliance: [
          {
            name: "PDPA (Personal Data Protection Act)",
            description:
              "Full compliance with Singapore's data protection legislation including consent obligations, data protection provisions, and Do Not Call Registry requirements.",
          },
          {
            name: "MAS TRM Guidelines",
            description:
              "Monetary Authority of Singapore Technology Risk Management Guidelines covering IT governance, software development, IT security, system availability, and outsourcing.",
          },
          {
            name: "MAS Notice on Cyber Hygiene",
            description:
              "MAS requirements for financial institutions on administrative account security, security patching, malware protection, and multi-factor authentication.",
          },
          {
            name: "Singapore AI Governance Framework",
            description:
              "IMDA Model AI Governance Framework compliance for responsible AI deployment, explainability, fairness, and human oversight of AI systems.",
          },
          {
            name: "CSA Cybersecurity Code of Practice",
            description:
              "Cyber Security Agency of Singapore requirements for critical information infrastructure protection and cybersecurity incident reporting.",
          },
          {
            name: "ISO 27001 / SS 584",
            description:
              "International and Singapore-specific information security management standards widely required for enterprise technology partnerships.",
          },
        ],
        industries: [
          {
            name: "Financial Services & Fintech",
            description:
              "MAS-licensed payment platforms, digital banks, wealth management, insurance technology, and open banking solutions for Singapore's world-leading financial services sector.",
          },
          {
            name: "Government & Smart Nation",
            description:
              "Digital government services, SingPass integration, GovTech ecosystem development, and smart city analytics for Singapore's public sector digital transformation.",
          },
          {
            name: "Trade & Supply Chain",
            description:
              "Trade finance platforms, shipping logistics, port management, and cross-border commerce technology leveraging Singapore's position as a global trade hub.",
          },
          {
            name: "Healthcare & BioTech",
            description:
              "HCSA-compliant telemedicine platforms, health data exchange, clinical research systems, and pharmaceutical technology for Singapore's life sciences sector.",
          },
          {
            name: "Semiconductor & Manufacturing",
            description:
              "Industry 4.0 platforms, predictive maintenance, quality analytics, and supply chain optimization for Singapore's semiconductor manufacturing and precision engineering industries.",
          },
          {
            name: "Real Estate & PropTech",
            description:
              "Property management platforms, smart building technology, and real estate marketplace solutions for Singapore's high-value property market.",
          },
        ],
        faqs: [
          {
            question: "Can you integrate with SingPass and CorpPass?",
            answer:
              "Yes. We have experience integrating with SingPass for individual authentication and CorpPass for business entity verification. We work with the GovTech API gateway and follow the Singapore Government Technology Stack guidelines for government-facing applications. Our team understands the NDI (National Digital Identity) architecture and can implement Myinfo data retrieval.",
          },
          {
            question: "How do you handle PDPA requirements?",
            answer:
              "We implement PDPA compliance through consent management, purpose limitation, data minimization, accuracy obligations, and security controls. Our GDPR expertise means we naturally build to high data protection standards. We also handle Do Not Call Registry checks and can support your Data Protection Officer with compliance documentation and DPIA (Data Protection Impact Assessment) processes.",
          },
          {
            question: "What MAS regulations have you worked with?",
            answer:
              "We have built systems compliant with MAS Technology Risk Management Guidelines (TRM), Notice on Cyber Hygiene, Outsourcing Guidelines, and Business Continuity Management Guidelines. We have helped fintech companies prepare for MAS licensing under the Payment Services Act and supported regulated institutions through MAS technology audits.",
          },
          {
            question: "Do you deploy to AWS Singapore region?",
            answer:
              "Yes. Our default deployment for Singapore clients is AWS ap-southeast-1 (Singapore), which provides optimal latency and PDPA-compliant data residency. We set up multi-AZ deployments within Singapore for high availability and can configure disaster recovery to ap-southeast-2 (Sydney) or ap-northeast-1 (Tokyo) depending on your requirements.",
          },
          {
            question: "How does the timezone difference work?",
            answer:
              "We provide 4 hours of daily overlap with Singapore time (SGT), with our team working early morning European shifts to cover Singapore afternoon hours. This is sufficient for daily standups, code reviews, and key meetings. The remainder of our workday produces async progress that Singapore teams receive each morning, creating a productive follow-the-sun workflow.",
          },
          {
            question: "Can you help us expand from Singapore to other ASEAN markets?",
            answer:
              "Absolutely. We design architectures for ASEAN expansion from the start, with multi-tenancy, localization frameworks, and multi-region deployment capabilities. We have experience with regulatory requirements across Indonesia (PDP Law), Malaysia (PDPA), Thailand (PDPA), and other ASEAN markets, ensuring your platform is compliant as you scale across the region.",
          },
        ],
        ctaTitle: "Build Smart Nation Technology with European Engineering Quality",
        ctaDescription:
          "Singapore demands excellence. Cloudrix delivers enterprise-grade cloud architecture and AI solutions that meet Singapore's highest standards. Book a free strategy call.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Singapore", url: "/markets/singapore" },
        ],
      }}
    />
  );
}
