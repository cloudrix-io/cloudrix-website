import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Germany - DSGVO, Industry 4.0 & Mittelstand",
  description:
    "Enterprise cloud architecture, Industry 4.0, and AI solutions for German companies. DSGVO/GDPR native, BSI compliant, Mittelstand experience. EUR pricing, same timezone. Free consultation.",
  openGraph: {
    title: "Cloud & AI Engineering for Germany",
    description:
      "Cloud and AI solutions for Germany. DSGVO native, Industry 4.0, and Mittelstand experience. EUR pricing, same timezone.",
    url: "https://www.cloudrix.io/markets/germany",
    images: [
      {
        url: "/og?title=Germany%20Cloud%20Engineering&subtitle=DSGVO%20%7C%20Industry%204.0%20%7C%20Mittelstand",
        width: 1200,
        height: 630,
        alt: "Cloudrix Germany",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/germany",
  },
};

export default function GermanyMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Germany",
        heroTitle: "Cloud Engineering for Germany's Industrial Powerhouse",
        heroSubtitle: "Germany Cloud & AI Specialists",
        heroDescription:
          "Germany is the EU's largest economy and the global leader in precision manufacturing, automotive engineering, and industrial technology. Cloudrix delivers enterprise cloud architecture, Industry 4.0 platforms, and DSGVO-native AI solutions for German enterprises and the Mittelstand. Same timezone, EUR pricing, and deep understanding of German business culture.",
        currency: "EUR",
        currencySymbol: "\u20ac",
        starterPrice: "4,000",
        introText:
          "Germany's industrial sector is the backbone of the European economy, but its digital transformation lags behind the operational excellence for which the country is famous. Many Mittelstand companies, the hidden champions that dominate global niche markets, still rely on legacy IT systems that cannot support the data-driven manufacturing and AI-powered optimization their global competitors are adopting. At the same time, Germany's strict interpretation of DSGVO (the German implementation of GDPR), BSI IT-Grundschutz security standards, and the Schrems II implications for cloud computing create a regulatory environment that many international technology providers struggle to navigate. Cloudrix operates in the same timezone, the same regulatory environment, and with the same engineering culture that German businesses expect. We are fellow Europeans who share Germany's commitment to Datenschutz (data protection), engineering precision, and thorough documentation. We have helped German manufacturers implement Industry 4.0 platforms, built DSGVO-compliant SaaS products for German enterprise customers, and modernized legacy systems at Mittelstand companies without disrupting the operations that their global customers depend on. Our engineers deploy to AWS Frankfurt (eu-central-1) by default, ensuring German data stays in Germany. We understand the significance of Auftragsverarbeitung contracts, the role of the Datenschutzbeauftragter, and the practical requirements of BSI IT-Grundschutz. Whether your company is based in Munich, Berlin, Hamburg, Frankfurt, or Stuttgart, we deliver cloud and AI engineering that meets the exacting standards of German business.",
        whyTitle: "Why German Companies Choose Cloudrix",
        whyDescription:
          "Same-timezone, same-regulation European engineering built for German precision and privacy expectations.",
        stats: [
          { value: "20+", label: "German Projects Delivered" },
          { value: "8hrs", label: "Same Timezone (CET)" },
          { value: "DSGVO", label: "Native Compliance" },
          { value: "EUR", label: "Local Currency Pricing" },
        ],
        services: [
          {
            title: "Industry 4.0 & Smart Manufacturing",
            description:
              "Digital twin platforms, OPC UA integration, predictive maintenance, quality analytics, and MES modernization for German manufacturers pursuing Industrie 4.0 transformation.",
            icon: "building",
          },
          {
            title: "DSGVO-Native Cloud Architecture",
            description:
              "Cloud platforms built by Europeans for European data protection standards. Auftragsverarbeitung-ready, with privacy-by-design architecture and Datenschutzbeauftragter-ready documentation.",
            icon: "shield",
          },
          {
            title: "Automotive & Mobility Platforms",
            description:
              "Connected vehicle cloud, autonomous driving data pipelines, EV charging infrastructure, and supplier management systems for Germany's automotive OEMs and Tier 1 suppliers.",
            icon: "globe",
          },
          {
            title: "Enterprise SaaS for German Markets",
            description:
              "B2B SaaS platforms with German-market features: GoBD-compliant data retention, DATEV integration, German invoice formats, and enterprise SSO for German corporate customers.",
            icon: "building",
          },
          {
            title: "AI & Machine Learning",
            description:
              "Production AI aligned with the EU AI Act. Explainable ML for manufacturing quality, predictive analytics, and natural language processing with German language capabilities.",
            icon: "building",
          },
          {
            title: "Legacy Modernization for Mittelstand",
            description:
              "Carefully modernize legacy ERP, MES, and custom systems without disrupting the operations your global customers depend on. Strangler fig pattern and phased migration expertise.",
            icon: "clock",
          },
        ],
        advantages: [
          {
            title: "Same Timezone, Same Regulation",
            description:
              "We operate in CET, the same timezone as Germany. We also operate under GDPR/DSGVO, giving us native understanding of German data protection requirements. No cultural translation needed.",
          },
          {
            title: "German Engineering Culture Match",
            description:
              "We share Germany's values of engineering precision, thorough documentation (Dokumentation), quality assurance, and long-term thinking. Our processes are naturally compatible with German expectations.",
          },
          {
            title: "DSGVO Native, Not Learned",
            description:
              "We do not learn DSGVO from a compliance manual. As a European company, we live under GDPR daily. Data protection is woven into our engineering DNA, not bolted on as an afterthought.",
          },
          {
            title: "EUR Pricing, No Currency Risk",
            description:
              "All contracts in Euros. No exchange rate fluctuations, no conversion fees. Straightforward cost planning that fits German Controlling (financial management) processes.",
          },
          {
            title: "AWS Frankfurt (eu-central-1) Default",
            description:
              "German data stays in Germany. All deployments to AWS eu-central-1 (Frankfurt) with DR in eu-west-1 or eu-central-2. BSI-compliant cloud configurations as standard.",
          },
          {
            title: "Mittelstand Specialization",
            description:
              "We understand the Mittelstand: hidden champions with global market leadership but limited internal IT resources. We provide the technology capabilities these companies need without the overhead of building large internal teams.",
          },
        ],
        compliance: [
          {
            name: "DSGVO / GDPR",
            description:
              "Native GDPR compliance including Auftragsverarbeitung (processing agreements), Datenschutz-Folgenabschatzung (DPIAs), Verzeichnis von Verarbeitungstatigkeiten (records of processing), and Datenschutzbeauftragter support.",
          },
          {
            name: "BSI IT-Grundschutz",
            description:
              "Federal Office for Information Security (BSI) IT-Grundschutz compliance for systematic IT security management. Essential for German public sector and KRITIS (critical infrastructure) projects.",
          },
          {
            name: "BaFin MaRisk / BAIT",
            description:
              "Federal Financial Supervisory Authority requirements for IT governance at banks and financial institutions. MaRisk AT 7.2 outsourcing and BAIT technology management compliance.",
          },
          {
            name: "GoBD",
            description:
              "Grundsatze zur ordnungsmassigen Fuhrung und Aufbewahrung von Buchern compliance for tax-relevant data processing, archiving, and data access for financial authorities.",
          },
          {
            name: "EU AI Act",
            description:
              "European AI regulation compliance for risk classification, transparency, documentation, and human oversight requirements. Critical for German companies deploying AI in regulated sectors.",
          },
          {
            name: "ISO 27001 / ISO 27701",
            description:
              "International standards for information security and privacy information management. Widely required by German enterprise procurement and Mittelstand supplier qualifications.",
          },
        ],
        industries: [
          {
            name: "Automotive (OEM & Suppliers)",
            description:
              "Connected vehicle platforms, autonomous driving, EV infrastructure, supplier quality management, and production optimization for Germany's automotive industry leaders.",
          },
          {
            name: "Manufacturing & Mittelstand",
            description:
              "Industry 4.0 platforms, ERP modernization, predictive maintenance, and digital transformation for Germany's world-leading Mittelstand hidden champions.",
          },
          {
            name: "Financial Services & FinTech",
            description:
              "BaFin-compliant banking platforms, insurance technology, investment services, and payment solutions for Frankfurt's financial center and Berlin's fintech scene.",
          },
          {
            name: "Healthcare & Pharma",
            description:
              "DiGA-compliant digital health applications, clinical trial platforms, hospital information systems, and pharmaceutical manufacturing technology.",
          },
          {
            name: "Energy & Energiewende",
            description:
              "Renewable energy management, smart grid technology, carbon tracking, and energy trading platforms supporting Germany's Energiewende (energy transition).",
          },
          {
            name: "Logistics & Transport",
            description:
              "Fleet management, warehouse automation, supply chain optimization, and transport management for Germany's globally significant logistics sector.",
          },
        ],
        faqs: [
          {
            question: "Are you really in the same timezone as Germany?",
            answer:
              "Yes. We operate in CET/CEST, the identical timezone as Germany. There is zero timezone difference. We are available during German business hours from 9 Uhr to 18 Uhr, attend standups at whatever time your team prefers, and respond instantly on Slack throughout the entire workday. Working with us feels like working with a team in the next building.",
          },
          {
            question: "How do you handle DSGVO as a non-German EU company?",
            answer:
              "DSGVO is the German implementation of the EU GDPR, which is our home regulation. We operate under the same legal framework, process data under the same rules, and build privacy-by-design systems as standard practice. We execute Auftragsverarbeitungsvertrage (AVV/DPA) using standard contractual clauses that German Datenschutzbeauftragter are familiar with. Our data processing practices satisfy the heightened standards that German regulators and the Landesdatenschutzbeauftragte expect.",
          },
          {
            question: "Do you deploy to AWS Frankfurt?",
            answer:
              "Yes. AWS eu-central-1 (Frankfurt) is our default deployment region for all German clients. German data stays in Germany. We configure multi-AZ deployments within Frankfurt for high availability and can set up DR in eu-central-2 (Zurich) or eu-west-1 (Ireland) for geographic redundancy. Our infrastructure-as-code ensures BSI-compliant configurations.",
          },
          {
            question: "Can you help our Mittelstand company with digital transformation?",
            answer:
              "Absolutely. We specialize in helping Mittelstand companies modernize their technology without disrupting the operations that make them world leaders in their niches. We understand that Mittelstand companies typically have lean IT teams and cannot afford lengthy transformation projects with uncertain outcomes. Our approach is pragmatic and incremental: we start with high-impact, low-risk modernizations and build from there.",
          },
          {
            question: "Do you understand German enterprise procurement processes?",
            answer:
              "Yes. We are experienced with German enterprise procurement including Einkauf processes, supplier qualification questionnaires (Lieferantenselbstauskunft), framework agreements (Rahmenvertrage), and the documentation standards German procurement departments expect. We provide DSGVO compliance documentation, security certifications, and commercial references in formats German enterprises are familiar with.",
          },
          {
            question: "Can you integrate with German enterprise systems like SAP and DATEV?",
            answer:
              "Yes. We have extensive experience integrating with SAP (S/4HANA, ECC, BTP), DATEV for accounting and tax, and other German enterprise systems. We build APIs that connect legacy German systems with modern cloud platforms, enabling digital transformation without replacing the enterprise systems your business depends on.",
          },
        ],
        ctaTitle: "Deutsche Ingenieursqualitat fur Ihre Cloud-Transformation",
        ctaDescription:
          "Same timezone, same data protection standards, same engineering culture. Cloudrix delivers cloud and AI engineering that meets the exacting standards German businesses expect. Book a free consultation.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Germany", url: "/markets/germany" },
        ],
      }}
    />
  );
}
