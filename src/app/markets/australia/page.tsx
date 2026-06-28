import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Australia - Mining, Fintech & Healthcare",
  description:
    "Enterprise cloud architecture, AI solutions, and DevOps for Australian businesses. Privacy Act compliant, APRA-regulated fintech, mining technology. AUD pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Australia",
    description:
      "Cloud and AI solutions for Australia. Mining tech, fintech, healthcare. Privacy Act compliance and AUD pricing.",
    url: "https://www.cloudrix.io/markets/australia",
    images: [
      {
        url: "/og?title=Australia%20Cloud%20Engineering&subtitle=Mining%20%7C%20Fintech%20%7C%20Healthcare",
        width: 1200,
        height: 630,
        alt: "Cloudrix Australia",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/australia",
  },
};

export default function AustraliaMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Australia",
        heroTitle: "Cloud Engineering for Australia's Digital Economy",
        heroSubtitle: "Australia Cloud & AI Specialists",
        heroDescription:
          "Australia's mining, financial services, and healthcare sectors are undergoing rapid digital transformation. Cloudrix delivers enterprise-grade cloud architecture, AI platforms, and regulatory-compliant solutions built for Australian businesses. Privacy Act compliance, APRA-ready fintech infrastructure, and transparent AUD pricing.",
        currency: "AUD",
        currencySymbol: "A$",
        starterPrice: "7,000",
        introText:
          "Australia combines a resource-rich economy with a sophisticated financial services sector and a rapidly growing technology ecosystem. The mining industry is investing billions in autonomous operations, predictive maintenance, and digital twins. The financial services sector, regulated by APRA and ASIC, demands technology partners who understand prudential standards and Consumer Data Right (Open Banking). Healthcare is transforming through telehealth adoption, My Health Record integration, and AI-assisted diagnostics. Cloudrix serves all three sectors with engineering capabilities built on European quality standards that Australian businesses appreciate. Our experience with GDPR provides a compliance advantage for Australia's Privacy Act requirements, and our cloud-native architecture expertise ensures Australian data stays in Australian regions. We deploy primarily to AWS Asia Pacific (Sydney) and Asia Pacific (Melbourne), with architectures that meet the geographic redundancy and business continuity requirements Australian regulators expect. The timezone difference creates a productive follow-the-sun workflow: Australian teams brief us at the end of their day, our European engineers work through the Australian night, and progress is waiting when Sydney, Melbourne, and Perth offices open each morning.",
        whyTitle: "Why Australian Companies Choose Cloudrix",
        whyDescription:
          "The advantages of European engineering tailored for the Australian market.",
        stats: [
          { value: "5+", label: "Australian Projects" },
          { value: "3hrs", label: "AEST Overlap Daily" },
          { value: "99.99%", label: "Uptime SLA" },
          { value: "AUD", label: "Local Currency Pricing" },
        ],
        services: [
          {
            title: "Mining & Resources Technology",
            description:
              "Digital twin platforms, autonomous operations control, predictive maintenance, environmental monitoring, and safety analytics for Australia's mining and resources sector.",
            icon: "building",
          },
          {
            title: "APRA-Compliant Financial Services",
            description:
              "Banking platforms, insurance technology, superannuation systems, and Consumer Data Right (Open Banking) APIs compliant with APRA prudential standards and CPS 234.",
            icon: "dollar",
          },
          {
            title: "Healthcare & Digital Health",
            description:
              "My Health Record integration, telehealth platforms, clinical decision support, and health data analytics compliant with Australian Digital Health Agency standards.",
            icon: "shield",
          },
          {
            title: "Cloud Migration to Australian Regions",
            description:
              "Migrate to AWS Sydney (ap-southeast-2) or Melbourne with data sovereignty guarantees. Multi-AZ deployments, DR architectures, and IRAP-assessed cloud configurations.",
            icon: "globe",
          },
          {
            title: "AI & Analytics Platforms",
            description:
              "Machine learning for demand forecasting, resource optimization, fraud detection, and natural language processing. Production ML on AWS SageMaker or GCP Vertex AI.",
            icon: "building",
          },
          {
            title: "Government & Public Sector",
            description:
              "Digital government services, citizen portals, and public sector transformation. Protected-level cloud deployments and ASD Essential Eight compliance.",
            icon: "shield",
          },
        ],
        advantages: [
          {
            title: "Follow-the-Sun Productivity",
            description:
              "The timezone difference becomes an advantage: brief us at end of your day, our engineers work through your night, and completed work awaits each morning. Three hours of daily overlap handles syncs and collaboration.",
          },
          {
            title: "GDPR-to-Privacy Act Compliance Bridge",
            description:
              "Australia's Privacy Act and the Australian Privacy Principles (APPs) share conceptual foundations with GDPR. Our native GDPR expertise ensures we meet Australian data protection requirements effortlessly.",
          },
          {
            title: "AUD Pricing with No Surprises",
            description:
              "All contracts and invoices denominated in Australian Dollars. No exchange rate risk, no hidden conversion fees. Clear, predictable budget planning for Australian CFOs.",
          },
          {
            title: "Australian Cloud Region Deployment",
            description:
              "Primary deployment to AWS ap-southeast-2 (Sydney) with DR in ap-southeast-4 (Melbourne). Australian data stays in Australia, meeting Privacy Act and APRA requirements.",
          },
          {
            title: "Senior Talent Without the Scarcity Premium",
            description:
              "Australia's technology talent shortage drives high salaries. Our senior European engineers deliver equivalent quality at significantly lower cost, without the compromise of cheaper offshore alternatives.",
          },
          {
            title: "Multi-Industry Expertise",
            description:
              "From mining operations to financial services to healthcare, we bring deep domain knowledge across Australia's key industries rather than generic technology consulting.",
          },
        ],
        compliance: [
          {
            name: "Privacy Act 1988 / APPs",
            description:
              "Compliance with Australia's Privacy Act and the 13 Australian Privacy Principles covering collection, use, disclosure, quality, security, and access to personal information.",
          },
          {
            name: "APRA CPS 234",
            description:
              "Information Security prudential standard for APRA-regulated entities including banks, insurers, and superannuation funds. Security capability, policy, testing, and incident management.",
          },
          {
            name: "Consumer Data Right (CDR)",
            description:
              "Open Banking compliance under the Consumer Data Right framework. Accredited data recipient requirements, API standards, and consent management for financial data sharing.",
          },
          {
            name: "ASD Essential Eight",
            description:
              "Australian Signals Directorate Essential Eight mitigation strategies for cybersecurity. Application controls, patching, MFA, admin privilege management, and backup strategies.",
          },
          {
            name: "IRAP Assessment",
            description:
              "Information Security Registered Assessors Program requirements for government cloud deployments. Protected and Official cloud security assessments.",
          },
          {
            name: "My Health Records Act",
            description:
              "Compliance with the My Health Records Act 2012 for healthcare applications integrating with Australia's national health records system.",
          },
        ],
        industries: [
          {
            name: "Mining & Resources",
            description:
              "Autonomous haulage control, predictive maintenance, environmental monitoring, mine planning optimization, and safety analytics for Australia's world-leading mining sector.",
          },
          {
            name: "Financial Services & Fintech",
            description:
              "APRA-regulated banking platforms, neobanking, wealth management, superannuation, insurance technology, and Open Banking APIs for Australia's Big Four and challenger banks.",
          },
          {
            name: "Healthcare & Life Sciences",
            description:
              "Telehealth platforms, My Health Record integration, clinical trial management, and health data analytics for hospitals, clinics, and digital health companies.",
          },
          {
            name: "Government & Defence",
            description:
              "Protected-level cloud deployments, digital government services, and defense technology platforms meeting ASD and IRAP requirements for Australian government agencies.",
          },
          {
            name: "Agriculture & AgTech",
            description:
              "Precision agriculture platforms, crop monitoring, livestock management, and supply chain traceability for Australia's agriculture sector leveraging IoT and satellite data.",
          },
          {
            name: "Energy & Renewables",
            description:
              "Renewable energy monitoring, grid management, energy trading platforms, and carbon tracking for Australia's energy transition from fossil fuels to renewables.",
          },
        ],
        faqs: [
          {
            question: "How does the timezone difference work with Australian teams?",
            answer:
              "We provide 3 hours of overlap with AEST, typically covering your early morning from 7-10 AM. The timezone offset creates a productive follow-the-sun model: you brief our team at the end of your Australian day, our engineers work through your night, and completed features, reviewed PRs, and deployed changes are waiting when you arrive in the morning. Many Australian clients find this actually increases their effective development velocity.",
          },
          {
            question: "Can you deploy to Australian cloud regions?",
            answer:
              "Yes. We deploy to AWS ap-southeast-2 (Sydney) as our primary region for Australian clients, with disaster recovery in ap-southeast-4 (Melbourne). This ensures all data stays within Australia, meeting Privacy Act requirements and APRA data sovereignty expectations. We can also deploy to Azure Australia East (Sydney) or Google Cloud australia-southeast1 (Sydney).",
          },
          {
            question: "Do you understand APRA's prudential standards?",
            answer:
              "Yes. We have built platforms for APRA-regulated entities including banks and insurance companies. We understand CPS 234 (Information Security), CPS 231 (Outsourcing), and the specific technology governance requirements APRA expects from regulated entities. We can provide the evidence and documentation needed for APRA compliance reviews.",
          },
          {
            question: "What is your experience with Australian mining technology?",
            answer:
              "We have built digital platforms for mining and resources companies including real-time production dashboards, predictive maintenance systems using sensor data, environmental monitoring platforms, and safety incident management systems. We understand the operational technology landscape, remote site connectivity challenges, and the specific requirements of mining operations in Australia.",
          },
          {
            question: "Can you help with Open Banking (CDR) compliance?",
            answer:
              "Yes. We have implemented Consumer Data Right APIs and consent management systems. We understand the technical standards published by the Data Standards Body, the accreditation requirements for data recipients, and the security controls needed for CDR-compliant data sharing. We can build both data holder and data recipient components.",
          },
          {
            question: "Do you offer AUD-denominated fixed-price contracts?",
            answer:
              "Yes. All contracts and invoices for Australian clients are in AUD. We offer both fixed-price project engagements and monthly retainer models, depending on the scope and nature of the work. Fixed-price contracts are ideal for well-defined projects, while retainers suit ongoing development and support needs.",
          },
        ],
        ctaTitle: "Build World-Class Technology for Australian Industry",
        ctaDescription:
          "From mining operations to financial services, Cloudrix delivers the cloud and AI engineering that Australian businesses need. Book a free strategy call to discuss your project.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Australia", url: "/markets/australia" },
        ],
      }}
    />
  );
}
