import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Qatar - National Vision 2030",
  description:
    "Enterprise cloud architecture, AI solutions, and digital transformation for Qatar. QFCA compliance, QCB regulations, smart nation infrastructure. QAR pricing. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Qatar",
    description:
      "Cloud and AI solutions for Qatar National Vision 2030. QFCA compliance, energy analytics, and smart city infrastructure.",
    url: "https://www.cloudrix.io/markets/qatar",
    images: [
      {
        url: "/og?title=Qatar%20Cloud%20Engineering&subtitle=National%20Vision%20%7C%20QFCA%20%7C%20Smart%20Nation",
        width: 1200,
        height: 630,
        alt: "Cloudrix Qatar",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/qatar",
  },
};

export default function QatarMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Qatar",
        heroTitle: "Cloud Engineering for Qatar National Vision 2030",
        heroSubtitle: "Qatar Technology Partners",
        heroDescription:
          "Qatar is investing billions in technology infrastructure, smart city development, and digital government as part of Qatar National Vision 2030. Cloudrix delivers enterprise-grade cloud architecture, AI platforms, and digital solutions that meet QCB, QFCA, and national cybersecurity standards. QAR pricing with transparent engagement models.",
        currency: "QAR",
        currencySymbol: "QAR ",
        starterPrice: "60,000",
        introText:
          "Qatar National Vision 2030 envisions a knowledge-based economy powered by technology innovation. Post-FIFA World Cup 2022, Qatar is leveraging its world-class infrastructure investments to build a diversified digital economy. The Qatar Financial Centre Authority attracts global financial services firms, the Qatar Science and Technology Park drives research commercialization, and Lusail Smart City represents one of the most ambitious urban technology projects in the world. Cloudrix supports Qatar's digital transformation with engineering capabilities that match the nation's ambitions. Our European regulatory expertise translates directly to Qatar's data protection and cybersecurity requirements, which draw heavily from international standards. We have built energy analytics platforms for Qatar's LNG sector, fintech solutions for QFC-licensed institutions, and smart city components for urban development projects. Our team provides consistent overlap with Arabia Standard Time, and our project managers understand the business culture and government procurement processes specific to Qatar. Whether your organization operates from Qatar Financial Centre, the Qatar Free Zones Authority, or mainland Qatar, we tailor our compliance approach to your specific regulatory jurisdiction.",
        whyTitle: "Why Qatar Organizations Choose Cloudrix",
        whyDescription:
          "The capabilities that make us a natural partner for Qatar's technology-driven diversification strategy.",
        stats: [
          { value: "4+", label: "Qatar Projects Delivered" },
          { value: "4hrs", label: "AST Overlap Daily" },
          { value: "QNV", label: "2030 Aligned Solutions" },
          { value: "QAR", label: "Local Currency Pricing" },
        ],
        services: [
          {
            title: "Smart City & Urban Technology",
            description:
              "IoT platforms, smart building management, urban mobility systems, and sustainability monitoring for Lusail City and Qatar's broader smart infrastructure development.",
            icon: "globe",
          },
          {
            title: "Energy & LNG Analytics",
            description:
              "Real-time production monitoring, predictive maintenance, supply chain optimization, and carbon tracking platforms for Qatar's world-leading LNG industry.",
            icon: "building",
          },
          {
            title: "QFC Financial Services Technology",
            description:
              "QFC-compliant fintech platforms, wealth management solutions, Islamic banking systems, and regulatory reporting for financial institutions operating in Qatar Financial Centre.",
            icon: "dollar",
          },
          {
            title: "Digital Government Services",
            description:
              "E-government portals, citizen service platforms, digital identity integration, and government process automation aligned with Qatar's Digital Government strategy.",
            icon: "shield",
          },
          {
            title: "AI & Data Analytics",
            description:
              "Arabic language NLP, computer vision, predictive analytics, and business intelligence platforms supporting Qatar's national data strategy and AI adoption roadmap.",
            icon: "building",
          },
          {
            title: "Sports & Events Technology",
            description:
              "Venue management systems, fan engagement platforms, ticketing infrastructure, and event analytics leveraging Qatar's world-class sports and events ecosystem.",
            icon: "clock",
          },
        ],
        advantages: [
          {
            title: "QNV 2030 Strategic Alignment",
            description:
              "Our solutions directly support Qatar National Vision 2030 pillars: economic diversification, knowledge-based economy, human development, and environmental sustainability.",
          },
          {
            title: "European Regulatory Expertise",
            description:
              "Qatar's data protection and cybersecurity frameworks draw from international standards. Our GDPR native expertise provides a strong compliance foundation for Qatar's regulatory environment.",
          },
          {
            title: "Energy Sector Understanding",
            description:
              "Deep experience with energy industry technology including production monitoring, HSE systems, and digital oilfield platforms relevant to Qatar's LNG and hydrocarbon sector.",
          },
          {
            title: "QAR-Denominated Contracts",
            description:
              "All pricing in Qatari Riyals. No currency conversion risk, transparent invoicing, and payment terms aligned with Qatar's standard business practices.",
          },
          {
            title: "Post-World Cup Infrastructure Leverage",
            description:
              "Qatar built world-class digital infrastructure for the FIFA World Cup 2022. We help organizations leverage these assets for ongoing smart city, tourism, and entertainment technology needs.",
          },
          {
            title: "Arabic-English Bilingual Development",
            description:
              "Full RTL Arabic support, bilingual interfaces, and culturally appropriate design for Qatar's diverse population of Qatari nationals and international residents.",
          },
        ],
        compliance: [
          {
            name: "Qatar Data Privacy Law",
            description:
              "Compliance with Qatar's data protection legislation covering personal data processing, consent management, data subject rights, and cross-border data transfer requirements.",
          },
          {
            name: "QCB Cybersecurity Framework",
            description:
              "Qatar Central Bank cybersecurity requirements for financial institutions including technology risk management, incident response, and third-party risk assessment.",
          },
          {
            name: "QFCA Regulations",
            description:
              "Qatar Financial Centre Authority regulatory requirements for technology governance, data protection, and outsourcing for QFC-licensed institutions.",
          },
          {
            name: "QCERT Standards",
            description:
              "Qatar Computer Emergency Response Team security standards for critical infrastructure protection, incident reporting, and vulnerability management.",
          },
          {
            name: "MOTC ICT Regulations",
            description:
              "Ministry of Transport and Communications ICT governance requirements for cloud services, data centers, and telecommunications technology in Qatar.",
          },
          {
            name: "ISO 27001 Alignment",
            description:
              "International information security management alignment, widely required by Qatar government entities and large enterprises for technology partnerships.",
          },
        ],
        industries: [
          {
            name: "Energy & Natural Gas",
            description:
              "Production analytics, predictive maintenance, supply chain management, and environmental monitoring for Qatar's world-leading LNG and hydrocarbon industry.",
          },
          {
            name: "Financial Services",
            description:
              "QFC-regulated banking, wealth management, insurance, and fintech platforms serving Qatar's growing financial services sector and international financial center.",
          },
          {
            name: "Government & Public Sector",
            description:
              "Digital government transformation, smart services, data analytics, and citizen engagement platforms for Qatar government ministries and public entities.",
          },
          {
            name: "Sports & Entertainment",
            description:
              "Venue technology, fan experience platforms, sports analytics, and event management systems leveraging Qatar's post-World Cup infrastructure and events strategy.",
          },
          {
            name: "Education & Research",
            description:
              "E-learning platforms, research data management, academic collaboration tools, and technology transfer systems for Qatar Foundation and Education City institutions.",
          },
          {
            name: "Healthcare",
            description:
              "Hospital information systems, telemedicine, health data analytics, and population health management for Hamad Medical Corporation and Qatar's private healthcare providers.",
          },
        ],
        faqs: [
          {
            question: "Can you deploy to Qatar-based cloud infrastructure?",
            answer:
              "Yes. We deploy to cloud regions with optimal Qatar latency including AWS Middle East (Bahrain), which is geographically adjacent. We also work with Ooredoo Cloud and other Qatar-based hosting providers when data localization requirements mandate in-country hosting. Our architectures optimize for Qatar user latency while meeting all data sovereignty requirements.",
          },
          {
            question: "Do you have experience with Qatar's energy sector?",
            answer:
              "Yes. We have built technology solutions for energy companies operating in the Gulf region, including real-time production monitoring dashboards, predictive maintenance systems, and environmental compliance platforms. We understand the operational technology landscape, SCADA integration requirements, and the cybersecurity standards specific to critical energy infrastructure.",
          },
          {
            question: "How do you support Qatarization goals?",
            answer:
              "Similar to our approach in Saudi Arabia, we structure engagements with knowledge transfer to Qatari technical staff built into the project plan. This includes mentoring, comprehensive documentation, training programs, and phased capability transition. We actively support Qatar's national workforce development goals in technology sectors.",
          },
          {
            question: "Can you work with Qatar Foundation and Education City institutions?",
            answer:
              "Yes. We understand the unique requirements of academic and research institutions, including multi-institutional data sharing, research data management, grant-funded project timelines, and the technology needs of world-class universities operating in Education City. We can support collaborative research platforms and educational technology initiatives.",
          },
          {
            question: "What is your experience with smart city projects in Qatar?",
            answer:
              "We have contributed to smart city technology initiatives in the Gulf region, including IoT sensor networks, urban analytics platforms, smart building management systems, and connected infrastructure monitoring. We understand the standards and integration requirements of Lusail City's smart infrastructure and can develop components that integrate with Qatar's broader smart nation ecosystem.",
          },
          {
            question: "Do you offer QAR-denominated contracts?",
            answer:
              "Yes. All contracts, proposals, and invoices for Qatar clients are denominated in QAR. We provide fixed monthly pricing with no currency exchange surprises. Payment terms are aligned with standard Qatar business practices, and we can accept payment via international wire transfer through Qatar-based banking channels.",
          },
        ],
        ctaTitle: "Build Technology That Advances Qatar National Vision 2030",
        ctaDescription:
          "From energy analytics to smart city platforms, Cloudrix delivers the engineering that Qatar's digital transformation demands. Book a free strategy call to discuss your project.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Qatar", url: "/markets/qatar" },
        ],
      }}
    />
  );
}
