import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Japan - Manufacturing, Automotive & Society 5.0",
  description:
    "Enterprise cloud architecture, Industry 4.0, and AI solutions for Japanese companies. APPI compliance, manufacturing digital twins, automotive IoT. JPY pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Japan",
    description:
      "Cloud and AI solutions for Japan's manufacturing and automotive industries. APPI compliance, Industry 4.0, JPY pricing.",
    url: "https://www.cloudrix.io/markets/japan",
    images: [
      {
        url: "/og?title=Japan%20Cloud%20Engineering&subtitle=Manufacturing%20%7C%20Automotive%20%7C%20Society%205.0",
        width: 1200,
        height: 630,
        alt: "Cloudrix Japan",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/japan",
  },
};

export default function JapanMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Japan",
        heroTitle: "Cloud Engineering for Japan's Industrial Innovation",
        heroSubtitle: "Japan Technology Specialists",
        heroDescription:
          "Japan's manufacturing giants, automotive leaders, and technology conglomerates are driving Society 5.0, the vision for a super-smart society. Cloudrix delivers enterprise cloud architecture, Industry 4.0 platforms, and AI solutions that help Japanese companies modernize their technology while maintaining the precision and quality standards Japan is known for. APPI compliant with JPY pricing.",
        currency: "JPY",
        currencySymbol: "\u00a5",
        starterPrice: "680,000",
        introText:
          "Japan faces a unique technology challenge: the world's most advanced manufacturing capabilities combined with legacy IT systems that often lag behind digital-native competitors. Society 5.0, the Japanese government's vision for integrating cyber and physical space, requires massive cloud migration, AI adoption, and digital transformation across every industry. At the same time, Japan's aging population and labor shortage make automation and AI-driven efficiency not just desirable but essential for economic sustainability. Cloudrix understands this intersection of world-class operational excellence and technology modernization needs. Our European engineering culture shares Japan's commitment to quality, precision, and thorough documentation, qualities that resonate deeply with Japanese business partners. We have helped Japanese manufacturing companies implement digital twin platforms, built IoT data pipelines for automotive suppliers, and developed AI-powered quality inspection systems that maintain the zero-defect standards Japanese production lines demand. Our cloud migration expertise helps Japanese enterprises move from on-premise data centers to AWS and Azure without disrupting the 24/7 manufacturing operations that their global supply chains depend on. We provide daily overlap with JST through early-morning European shifts and structure our communication to respect the consensus-building decision-making process that characterizes Japanese business culture.",
        whyTitle: "Why Japanese Companies Choose Cloudrix",
        whyDescription:
          "European engineering precision meets Japanese quality standards for transformative technology solutions.",
        stats: [
          { value: "4+", label: "Japan Projects Delivered" },
          { value: "3hrs", label: "JST Overlap Daily" },
          { value: "99.99%", label: "Manufacturing Uptime" },
          { value: "JPY", label: "Local Currency Pricing" },
        ],
        services: [
          {
            title: "Manufacturing Digital Twins",
            description:
              "Real-time digital representations of production lines, factories, and supply chains. Simulate changes before implementation, predict maintenance needs, and optimize throughput without risking production.",
            icon: "building",
          },
          {
            title: "Automotive IoT & Connected Vehicles",
            description:
              "Vehicle telematics platforms, connected car cloud infrastructure, autonomous driving data pipelines, and supplier quality management systems for Japan's automotive industry.",
            icon: "globe",
          },
          {
            title: "AI-Powered Quality Inspection",
            description:
              "Computer vision systems for automated visual inspection, defect detection, and quality classification. Maintain Japan's zero-defect manufacturing standards with AI-enhanced accuracy.",
            icon: "check",
          },
          {
            title: "Legacy System Modernization",
            description:
              "Migrate COBOL, mainframe, and on-premise systems to cloud without disrupting operations. Strangler fig pattern, event-driven architectures, and phased migration strategies.",
            icon: "clock",
          },
          {
            title: "Supply Chain Analytics",
            description:
              "End-to-end supply chain visibility, demand forecasting, inventory optimization, and supplier risk management. Real-time analytics across Japan's complex multi-tier supplier networks.",
            icon: "building",
          },
          {
            title: "Robotics & Factory Automation Cloud",
            description:
              "Cloud platforms for robotic process management, fleet coordination, edge computing integration, and factory automation analytics. Supporting Japan's leadership in industrial robotics.",
            icon: "globe",
          },
        ],
        advantages: [
          {
            title: "Shared Quality Philosophy",
            description:
              "European engineering culture shares Japan's commitment to quality, precision, documentation, and continuous improvement (Kaizen). Our engineering processes naturally align with Japanese expectations for thoroughness and reliability.",
          },
          {
            title: "Manufacturing Domain Expertise",
            description:
              "Deep experience with manufacturing execution systems, OT/IT convergence, predictive maintenance, and quality management systems. We understand the operational realities of factories and production lines.",
          },
          {
            title: "Respectful Business Communication",
            description:
              "We understand and respect Japanese business communication norms including consensus-building (nemawashi), thorough documentation, structured decision-making processes, and the importance of long-term relationships.",
          },
          {
            title: "JPY Pricing Stability",
            description:
              "All contracts and invoices in Japanese Yen. Transparent pricing that fits into Japanese fiscal year budgeting cycles and procurement processes.",
          },
          {
            title: "Follow-the-Sun Development",
            description:
              "The timezone offset creates a productive 24-hour development cycle. Japanese teams brief in the afternoon, our engineers deliver overnight, and completed work is ready for review each Tokyo morning.",
          },
          {
            title: "APPI Compliance from European GDPR Experts",
            description:
              "Japan's APPI achieved GDPR adequacy, meaning the frameworks are closely aligned. Our native GDPR expertise translates directly to APPI compliance requirements.",
          },
        ],
        compliance: [
          {
            name: "APPI (Act on Protection of Personal Information)",
            description:
              "Full compliance with Japan's APPI including the 2022 amendments covering data breach notification, individual rights, cross-border transfers, and pseudonymized data processing.",
          },
          {
            name: "ISMAP (Information System Security Management)",
            description:
              "Government cloud security assessment standards for Japanese public sector deployments. Compliance with ISMAP requirements for cloud service providers.",
          },
          {
            name: "FISC Security Guidelines",
            description:
              "Center for Financial Industry Information Systems security guidelines for financial institutions in Japan. Technology risk management and operations standards.",
          },
          {
            name: "METI Cyber Security Framework",
            description:
              "Ministry of Economy, Trade and Industry cybersecurity framework for industrial control systems and manufacturing operational technology environments.",
          },
          {
            name: "ISO 27001 / JIS Q 27001",
            description:
              "International and Japanese Industrial Standards for information security management. Essential for enterprise technology partnerships in Japan.",
          },
          {
            name: "J-SOX (Financial Instruments and Exchange Act)",
            description:
              "Japanese Sarbanes-Oxley equivalent requirements for IT controls at publicly listed companies on TSE. Internal controls over financial reporting.",
          },
        ],
        industries: [
          {
            name: "Automotive & Mobility",
            description:
              "Connected vehicle platforms, autonomous driving data, EV battery management, supplier quality systems, and aftermarket services for Japan's global automotive leaders.",
          },
          {
            name: "Manufacturing & Electronics",
            description:
              "Digital twin platforms, smart factory systems, quality inspection AI, and supply chain optimization for Japan's precision manufacturing and electronics sectors.",
          },
          {
            name: "Financial Services",
            description:
              "Banking platforms, insurance technology, payment systems, and regulatory reporting compliant with JFSA and FISC guidelines for megabanks and regional financial institutions.",
          },
          {
            name: "Pharmaceutical & Healthcare",
            description:
              "Clinical trial data management, drug discovery analytics, hospital information systems, and telemedicine platforms for Japan's aging-society healthcare challenges.",
          },
          {
            name: "Robotics & Industrial Automation",
            description:
              "Cloud platforms for industrial robot fleet management, collaborative robot integration, warehouse automation, and factory automation analytics.",
          },
          {
            name: "Telecommunications",
            description:
              "5G network analytics, IoT platform infrastructure, edge computing, and customer experience systems for Japan's telecommunications operators.",
          },
        ],
        faqs: [
          {
            question: "Do you understand Japanese business culture and decision-making?",
            answer:
              "Yes. We have worked with Japanese companies and understand the importance of nemawashi (consensus building), ringi (formal approval processes), and the emphasis on thorough documentation and quality. Our project management approach adapts to Japanese business rhythms, providing the detailed proposals, progress reports, and risk assessments that Japanese stakeholders expect.",
          },
          {
            question: "Can you deploy to AWS Tokyo region?",
            answer:
              "Yes. We deploy to AWS ap-northeast-1 (Tokyo) as the primary region for Japanese clients, with disaster recovery in ap-northeast-3 (Osaka). This ensures data stays in Japan, meeting APPI requirements and providing optimal latency for Japanese users. We also work with Azure Japan East (Tokyo) and Google Cloud asia-northeast1 (Tokyo).",
          },
          {
            question: "How do you handle the large timezone difference with Japan?",
            answer:
              "We provide 3 hours of daily overlap with JST through early-morning European shifts, typically covering 7-10 AM CET which is 3-6 PM JST. This handles afternoon standup meetings and end-of-day briefings. The timezone offset creates a productive follow-the-sun cycle where our overnight work (Japan time) means completed features are waiting each morning in Tokyo.",
          },
          {
            question: "What manufacturing systems have you integrated with?",
            answer:
              "We have integrated with major MES platforms, SCADA systems, PLCs from Siemens, Mitsubishi, and Fanuc, and ERP systems including SAP and Oracle. We understand OPC UA for industrial communication, MQTT for IoT data, and the specific challenges of bridging operational technology and cloud infrastructure in manufacturing environments.",
          },
          {
            question: "Can you work with Japanese documentation and communication standards?",
            answer:
              "While our primary documentation is in English, we structure all deliverables to meet the thoroughness and formality Japanese organizations expect. We provide detailed technical specifications, comprehensive test reports, formal risk assessments, and structured status reports. For client-facing documents, we can work with Japanese translation partners to provide bilingual documentation.",
          },
          {
            question: "Do you support J-SOX compliance for listed companies?",
            answer:
              "Yes. We implement IT general controls that satisfy J-SOX requirements including change management, access controls, computer operations, and program development controls. Our audit trail implementation and documentation practices are designed to satisfy the internal control requirements that external auditors evaluate during J-SOX assessments.",
          },
        ],
        ctaTitle: "Modernize Japanese Industry with World-Class Cloud Engineering",
        ctaDescription:
          "From automotive giants to precision manufacturers, Cloudrix delivers the cloud and AI engineering that Japan's Society 5.0 vision demands. Book a free strategy call.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Japan", url: "/markets/japan" },
        ],
      }}
    />
  );
}
