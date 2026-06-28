import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for Brazil - LGPD, Fintech & Pix Integration",
  description:
    "Enterprise cloud architecture, fintech platforms, and AI solutions for Brazilian companies. LGPD compliant, Pix payment integration, BACEN regulations. BRL/USD pricing. Free strategy call.",
  openGraph: {
    title: "Cloud & AI Engineering for Brazil",
    description:
      "Cloud and fintech solutions for Brazil. LGPD compliance, Pix integration, and scalable platforms for LATAM's largest economy.",
    url: "https://www.cloudrix.io/markets/brazil",
    images: [
      {
        url: "/og?title=Brazil%20Cloud%20Engineering&subtitle=LGPD%20%7C%20Fintech%20%7C%20Pix",
        width: 1200,
        height: 630,
        alt: "Cloudrix Brazil",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/brazil",
  },
};

export default function BrazilMarketPage() {
  return (
    <MarketPage
      data={{
        region: "Brazil",
        heroTitle: "Cloud Engineering for Brazil's Fintech Revolution",
        heroSubtitle: "Brazil Technology Specialists",
        heroDescription:
          "Brazil is Latin America's largest economy and home to the world's fastest-growing fintech ecosystem. Cloudrix delivers enterprise cloud architecture, Pix-integrated payment platforms, and LGPD-compliant solutions for Brazilian companies. From Sao Paulo's Faria Lima to emerging tech hubs nationwide, we build infrastructure that scales to 215 million Brazilians.",
        currency: "USD",
        currencySymbol: "$",
        starterPrice: "4,000",
        introText:
          "Brazil's technology ecosystem has reached an inflection point. Pix, the Central Bank's instant payment system, processes over 3 billion transactions monthly and has transformed how Brazilians interact with financial services. Open Finance (Open Banking) regulations are creating new opportunities for fintech innovation. Meanwhile, the LGPD (Lei Geral de Protecao de Dados) has established a data protection framework that closely mirrors the EU's GDPR, creating demand for companies with genuine privacy-by-design expertise. Cloudrix brings unique value to the Brazilian market. Our native GDPR expertise translates directly to LGPD compliance, giving Brazilian companies a data protection advantage that most local and international competitors cannot match. Our European engineering quality meets the standards that Brazilian enterprise customers and international investors expect. And our timezone provides substantial overlap with BRT for real-time collaboration. We have built Pix-integrated payment platforms, digital banking backends, insurance technology solutions, and e-commerce platforms for the Brazilian market. Our engineers understand the specific technical challenges of serving 215 million people across a continent-sized country: mobile-first users on diverse devices and networks, complex tax calculations across 27 states, Nota Fiscal electronic invoice integration, and the operational reality of Brazilian digital infrastructure.",
        whyTitle: "Why Brazilian Companies Choose Cloudrix",
        whyDescription:
          "European engineering quality and LGPD native expertise for Brazil's demanding technology market.",
        stats: [
          { value: "5+", label: "Brazilian Projects" },
          { value: "5hrs", label: "BRT Overlap Daily" },
          { value: "LGPD", label: "Native Compliance" },
          { value: "215M", label: "Potential Users Served" },
        ],
        services: [
          {
            title: "Pix Payment Integration",
            description:
              "End-to-end Pix integration including instant payments, QR code generation, Pix Cobranca for billing, and Pix Saque/Troco for cash services. Built on BACEN APIs with real-time settlement.",
            icon: "dollar",
          },
          {
            title: "Open Finance Platforms",
            description:
              "Open Banking and Open Finance compliant platforms for data sharing, consent management, and innovative financial products built on Brazil's regulatory framework.",
            icon: "building",
          },
          {
            title: "LGPD Compliance Engineering",
            description:
              "Privacy-by-design architecture, consent management, data subject rights automation, and DPIA documentation. Our GDPR native expertise maps directly to LGPD requirements.",
            icon: "shield",
          },
          {
            title: "Digital Banking & Neobanking",
            description:
              "Core banking systems, digital account opening, credit scoring, lending platforms, and investment features for Brazil's neobanking revolution.",
            icon: "dollar",
          },
          {
            title: "E-commerce & Marketplace Platforms",
            description:
              "High-traffic marketplaces, Nota Fiscal integration, multi-state tax calculation (ICMS, ISS), and logistics optimization for Brazil's complex e-commerce landscape.",
            icon: "globe",
          },
          {
            title: "Cloud Migration to Sao Paulo Region",
            description:
              "Deploy to AWS sa-east-1 (Sao Paulo) with full LGPD data residency compliance. Multi-AZ architectures optimized for Brazilian user latency and data sovereignty.",
            icon: "globe",
          },
        ],
        advantages: [
          {
            title: "GDPR-to-LGPD Native Expertise",
            description:
              "LGPD was directly inspired by GDPR. As a European company operating under GDPR, we do not learn LGPD from a textbook; we live its parent regulation daily. This gives Brazilian companies a genuine compliance advantage.",
          },
          {
            title: "5 Hours Daily BRT Overlap",
            description:
              "Substantial timezone overlap with Brasilia Time for real-time collaboration. Morning standups, afternoon code reviews, and synchronous work during your core business hours.",
          },
          {
            title: "Pix and Brazilian Payment Expertise",
            description:
              "Deep experience integrating with BACEN's Pix APIs, boleto bancario, and Brazilian card acquirers. We understand the specific transaction flows and settlement patterns of Brazilian payments.",
          },
          {
            title: "Investor-Ready Architecture",
            description:
              "Brazilian startups raising from international VCs need technology that passes global due diligence. Our European engineering standards provide the credibility that investors from Softbank, Tiger Global, and Sequoia LATAM expect.",
          },
          {
            title: "AWS Sao Paulo Deployment",
            description:
              "Native deployment to AWS sa-east-1 (Sao Paulo) for optimal Brazilian latency and LGPD data residency. Brazilian data stays in Brazil.",
          },
          {
            title: "USD Pricing for International Simplicity",
            description:
              "USD-denominated contracts that align with international fundraising and simplify cross-border payments. Clear pricing without BRL exchange rate volatility concerns.",
          },
        ],
        compliance: [
          {
            name: "LGPD (Lei Geral de Protecao de Dados)",
            description:
              "Full compliance with Brazil's General Data Protection Law including lawful bases for processing, data subject rights, DPIA requirements, and ANPD registration obligations.",
          },
          {
            name: "BACEN / CMN Regulations",
            description:
              "Central Bank of Brazil regulatory requirements for financial institutions, payment institutions, and fintech companies including Resolution 4893 on cybersecurity.",
          },
          {
            name: "Open Finance Regulations",
            description:
              "BACEN Open Finance regulatory framework compliance for data sharing APIs, consent management, and participant certification requirements.",
          },
          {
            name: "CVM (Securities Regulations)",
            description:
              "Comissao de Valores Mobiliarios requirements for investment platforms, crowdfunding, and digital securities operating in Brazil's capital markets.",
          },
          {
            name: "Nota Fiscal Eletronica",
            description:
              "Integration with Brazil's electronic invoice system across federal (NF-e), service (NFS-e), and consumer (NFC-e) tax document requirements.",
          },
          {
            name: "PCI DSS",
            description:
              "Payment Card Industry compliance for Brazilian platforms processing card payments through local acquirers like Cielo, Rede, and Stone.",
          },
        ],
        industries: [
          {
            name: "Fintech & Payments",
            description:
              "Pix integration, digital wallets, lending platforms, investment apps, and insurance technology for Brazil's world-leading fintech ecosystem.",
          },
          {
            name: "Digital Banking & Neobanking",
            description:
              "Core banking, account opening, credit scoring, and financial product distribution for Brazil's neobanking revolution led by Nubank, Inter, and C6.",
          },
          {
            name: "E-commerce & Retail",
            description:
              "Marketplace platforms, omnichannel commerce, last-mile logistics, and Nota Fiscal integration for Brazil's massive retail market.",
          },
          {
            name: "Healthcare & HealthTech",
            description:
              "Telemedicine platforms, health plan management, clinical data systems, and pharmaceutical technology for Brazil's SUS and private healthcare sectors.",
          },
          {
            name: "Agriculture & AgriTech",
            description:
              "Precision agriculture, commodity trading platforms, farm management, and supply chain traceability for Brazil's world-leading agribusiness sector.",
          },
          {
            name: "Education & EdTech",
            description:
              "E-learning platforms, university management, student financing, and educational content delivery for Brazil's 50-million-student education market.",
          },
        ],
        faqs: [
          {
            question: "Do you have experience with Pix integration?",
            answer:
              "Yes. We have built payment platforms with full Pix integration including Pix Instantaneo for real-time payments, Pix Cobranca for billing and invoicing, QR code generation (static and dynamic), and webhook-based payment confirmation. We integrate through BACEN-certified PSPs and understand the specific requirements of Pix transaction flows, including refund handling and dispute resolution.",
          },
          {
            question: "How does your LGPD compliance work as a European company?",
            answer:
              "LGPD was directly modeled on the EU GDPR, which is our home regulatory environment. We build with privacy-by-design principles natively, including data minimization, purpose limitation, consent management, and data subject rights automation. The GDPR-to-LGPD mapping is straightforward for our team, and we often exceed LGPD requirements because GDPR is in some areas even stricter. We support ANPD compliance documentation and can work with your DPO (Encarregado).",
          },
          {
            question: "Can you deploy to AWS Sao Paulo?",
            answer:
              "Yes. AWS sa-east-1 (Sao Paulo) is our primary deployment target for Brazilian clients. This ensures optimal latency for Brazilian users and LGPD data residency compliance. We configure multi-AZ deployments within the Sao Paulo region for high availability and can set up disaster recovery to us-east-1 for geographic redundancy.",
          },
          {
            question: "Do you handle Brazilian tax system complexity?",
            answer:
              "Yes. We have experience integrating with Brazil's tax infrastructure including ICMS (state tax), ISS (service tax), PIS/COFINS (federal contributions), and Nota Fiscal Eletronica (NF-e, NFS-e, NFC-e). We understand the complexity of inter-state tax calculations, tax substitution, and the different municipal NFS-e systems. Our e-commerce platforms handle tax calculation, document issuance, and fiscal reporting automatically.",
          },
          {
            question: "What is the timezone overlap with Brazil?",
            answer:
              "We provide approximately 5 hours of overlap with Brasilia Time (BRT/UTC-3), covering your morning to early afternoon. This is sufficient for daily standups, code reviews, and collaborative work. Our engineers adjust their schedules to maximize overlap with your core business hours, and we use async tools effectively for work outside overlap periods.",
          },
          {
            question: "Can you help Brazilian startups raise international funding?",
            answer:
              "Yes. Our European engineering standards provide the technology credibility that international investors expect. We have helped LATAM startups prepare for technical due diligence, create architecture documentation, and build the kind of clean, tested, well-documented codebases that impress technical advisors from global VC firms. Several clients have successfully raised rounds where our infrastructure was a positive differentiator.",
          },
        ],
        ctaTitle: "Build Fintech Infrastructure for 215 Million Brazilians",
        ctaDescription:
          "From Pix integration to LGPD compliance, Cloudrix delivers the cloud and AI engineering that Brazilian companies need. Book a free strategy call to discuss your project.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "Brazil", url: "/markets/brazil" },
        ],
      }}
    />
  );
}
