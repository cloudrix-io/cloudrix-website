import { Metadata } from "next";
import { MarketPage } from "@/components/pages/market-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cloud & AI Engineering for US Companies - USD Pricing",
  description:
    "Enterprise cloud architecture, AI agent development, and DevOps consulting for US businesses. SOC 2 and HIPAA compliant. Timezone overlap with EST and PST. Book a free strategy call.",
  openGraph: {
    title: "Cloud & AI Engineering for US Companies",
    description:
      "Enterprise cloud architecture, AI integration, and DevOps for US businesses. SOC 2, HIPAA, FedRAMP expertise. USD pricing, no surprises.",
    url: "https://www.cloudrix.io/markets/us",
    images: [
      {
        url: "/og?title=US%20Cloud%20%26%20AI%20Engineering&subtitle=SOC%202%20%7C%20HIPAA%20%7C%20USD%20Pricing",
        width: 1200,
        height: 630,
        alt: "Cloudrix US Market",
      },
    ],
  },
  alternates: {
    canonical: "https://www.cloudrix.io/markets/us",
  },
};

export default function USMarketPage() {
  return (
    <MarketPage
      data={{
        region: "the United States",
        heroTitle: "Enterprise Cloud Engineering for American Companies",
        heroSubtitle: "US Market Specialists",
        heroDescription:
          "From Wall Street to Silicon Valley, we deliver production-grade cloud architecture, AI agent development, and full-stack engineering for US businesses. SOC 2 Type II certified processes, HIPAA-ready infrastructure, and transparent USD pricing with no currency conversion headaches.",
        currency: "USD",
        currencySymbol: "$",
        starterPrice: "4,500",
        introText:
          "The US market demands engineering partners who understand both technical excellence and regulatory rigor. Cloudrix bridges the gap between European engineering precision and American business velocity. Our teams overlap with both EST and PST working hours, ensuring real-time collaboration whether you are based in New York, San Francisco, Austin, or Boston. We have delivered over 50 projects for companies ranging from Y Combinator startups to Fortune 500 enterprises, and every engagement includes SOC 2-aligned development practices, comprehensive security audits, and architecture that scales to millions of users. Our deep experience with AWS US regions, multi-AZ deployments, and US data residency requirements means your infrastructure meets every federal and state-level compliance mandate from day one.",
        whyTitle: "Why US Companies Choose Cloudrix",
        whyDescription:
          "The advantages of working with a European engineering team that is fully adapted to American business practices.",
        stats: [
          { value: "50+", label: "US Projects Delivered" },
          { value: "6hrs", label: "EST/PST Overlap Daily" },
          { value: "99.99%", label: "Uptime SLA" },
          { value: "$0", label: "Currency Conversion Fees" },
        ],
        services: [
          {
            title: "Cloud Migration & Architecture",
            description:
              "Migrate to AWS, Azure, or GCP with zero-downtime strategies. Multi-region US deployments with data residency in us-east-1, us-west-2, or GovCloud for federal workloads.",
            icon: "globe",
          },
          {
            title: "AI Agent Development",
            description:
              "Build intelligent AI agents using LangChain, Claude, and GPT-4. RAG systems, conversational AI, and autonomous workflows tailored to your business processes.",
            icon: "building",
          },
          {
            title: "SOC 2 & HIPAA Compliance",
            description:
              "Infrastructure designed for SOC 2 Type II and HIPAA compliance from the ground up. Audit-ready logging, encryption, access controls, and documentation.",
            icon: "shield",
          },
          {
            title: "DevOps & Platform Engineering",
            description:
              "Kubernetes, Terraform, and CI/CD pipelines that accelerate your release cadence. Infrastructure as code with full observability via Datadog, New Relic, or Grafana.",
            icon: "clock",
          },
          {
            title: "Full-Stack Product Development",
            description:
              "From MVP to scale, we build products using React, Next.js, Node.js, Python, and Go. API-first architectures with comprehensive test coverage and type safety.",
            icon: "building",
          },
          {
            title: "Technical Due Diligence",
            description:
              "Pre-acquisition and investor-ready technical assessments. Code quality audits, architecture reviews, scalability analysis, and security posture evaluations.",
            icon: "check",
          },
        ],
        advantages: [
          {
            title: "6+ Hours of Daily Timezone Overlap",
            description:
              "Our team is structured to provide real-time collaboration during US business hours. Daily standups, instant Slack responses, and synchronous code reviews from 9 AM EST through 6 PM PST.",
          },
          {
            title: "Transparent USD Pricing",
            description:
              "All contracts, invoices, and proposals are in USD. No exchange rate surprises, no hidden conversion fees. Fixed monthly retainers or transparent time-and-materials billing.",
          },
          {
            title: "US Data Residency Guaranteed",
            description:
              "All data stays in US-based AWS regions. We configure infrastructure to comply with state-level data privacy laws including CCPA, and can deploy to GovCloud for federal requirements.",
          },
          {
            title: "European Engineering, American Velocity",
            description:
              "Combine the rigorous engineering culture of European development with the speed and pragmatism that US markets demand. Ship fast without cutting corners on quality or security.",
          },
          {
            title: "Cost Efficiency Without Compromise",
            description:
              "Senior European engineers at 40-60% lower cost than equivalent US-based talent, without the quality trade-offs of offshore outsourcing. Every team member has 5+ years of experience.",
          },
          {
            title: "Proven US Track Record",
            description:
              "Over 50 projects delivered for US companies including funded startups, public companies, and government contractors. References available upon request.",
          },
        ],
        compliance: [
          {
            name: "SOC 2 Type II",
            description:
              "Our development processes align with SOC 2 Type II controls for security, availability, processing integrity, confidentiality, and privacy. Audit evidence provided upon request.",
          },
          {
            name: "HIPAA",
            description:
              "HIPAA-ready infrastructure with encrypted PHI storage, audit logging, BAA support, and access controls that meet HHS requirements for covered entities and business associates.",
          },
          {
            name: "CCPA / CPRA",
            description:
              "California Consumer Privacy Act compliance built into data handling workflows. Consumer data request automation, deletion workflows, and consent management systems.",
          },
          {
            name: "FedRAMP",
            description:
              "Experience deploying to AWS GovCloud and Azure Government for FedRAMP-authorized workloads. Boundary controls and continuous monitoring aligned with NIST SP 800-53.",
          },
          {
            name: "PCI DSS",
            description:
              "Level 1 PCI DSS compliant payment processing architectures. Tokenization, network segmentation, and cardholder data environment isolation for e-commerce and fintech.",
          },
          {
            name: "SOX Compliance",
            description:
              "Sarbanes-Oxley compliant IT controls for publicly traded companies. Change management, access reviews, and audit trail systems that satisfy external auditor requirements.",
          },
        ],
        industries: [
          {
            name: "Financial Services & Fintech",
            description:
              "High-frequency trading platforms, payment processing, banking APIs, and regulatory reporting systems. PCI DSS and SOX compliant architectures that handle billions in transactions.",
          },
          {
            name: "Healthcare & Life Sciences",
            description:
              "HIPAA-compliant telemedicine platforms, EHR integrations, clinical trial data management, and FDA 21 CFR Part 11 compliant systems for pharmaceutical companies.",
          },
          {
            name: "SaaS & Technology",
            description:
              "Multi-tenant architectures, product analytics, API platforms, and developer tools. From pre-seed MVPs to Series C scale-ups processing millions of events daily.",
          },
          {
            name: "E-commerce & Retail",
            description:
              "Headless commerce platforms, inventory management, real-time personalization, and supply chain optimization. Built to handle Black Friday traffic spikes without breaking.",
          },
          {
            name: "Defense & Government",
            description:
              "FedRAMP-authorized cloud deployments, secure communication platforms, and data analytics solutions for federal agencies and defense contractors on AWS GovCloud.",
          },
          {
            name: "Media & Entertainment",
            description:
              "Streaming platforms, content management systems, rights management, and ad-tech solutions. Low-latency architectures for real-time content delivery at scale.",
          },
        ],
        faqs: [
          {
            question: "How do you handle the timezone difference with US clients?",
            answer:
              "Our team is structured to maximize overlap with US business hours. We provide 6+ hours of real-time collaboration daily, covering 9 AM EST through 6 PM PST. Morning standups happen during your business hours, and we use Slack, Loom, and detailed async documentation to ensure nothing falls through the cracks outside overlap hours. Many US clients tell us the async component actually increases productivity since complex decisions get more thoughtful written analysis.",
          },
          {
            question: "Is your pricing really in USD with no hidden fees?",
            answer:
              "Yes, 100%. All contracts, invoices, and proposals are denominated in USD. We absorb all currency exchange costs on our end. You receive a fixed monthly invoice in USD, payable via ACH, wire transfer, or credit card. No surprise FX markups, no mid-contract rate adjustments, and no international payment processing fees from our side.",
          },
          {
            question: "Can you deploy to US-only AWS regions?",
            answer:
              "Absolutely. We routinely deploy to us-east-1 (Virginia), us-west-2 (Oregon), us-east-2 (Ohio), and us-west-1 (N. California). For federal and government workloads, we deploy to AWS GovCloud (US-West) and GovCloud (US-East). All infrastructure-as-code ensures data residency compliance, and we can provide attestation documents for your compliance team.",
          },
          {
            question: "How does your pricing compare to US-based agencies?",
            answer:
              "Our senior engineers cost 40-60% less than equivalent US-based talent, while delivering the same or higher quality. Unlike cheap offshore alternatives, every Cloudrix engineer has 5+ years of experience and communicates fluently in English. You get European engineering rigor at a price point that makes sense for both startups watching their burn rate and enterprises optimizing their technology budgets.",
          },
          {
            question: "Do you support SOC 2 audit preparation?",
            answer:
              "Yes. We help companies achieve SOC 2 Type II certification by implementing the necessary technical controls, documentation, and monitoring. This includes access management, encryption, logging, incident response procedures, and vendor management. We have helped multiple US clients pass their SOC 2 audits on the first attempt and can work directly with your auditing firm.",
          },
          {
            question: "What is your contract structure for US clients?",
            answer:
              "We offer flexible engagement models: monthly retainers for ongoing development, fixed-price contracts for defined projects, and time-and-materials for discovery and R&D work. All contracts are governed by US law (typically Delaware or New York), use standard MSA/SOW structures that US legal teams are familiar with, and include clear IP assignment clauses.",
          },
        ],
        ctaTitle: "Ready to Build with a Trusted US Engineering Partner?",
        ctaDescription:
          "Join 50+ US companies who have chosen Cloudrix for their cloud architecture, AI integration, and product engineering needs. Book a free 30-minute strategy call to discuss your project.",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Markets", url: "/markets" },
          { name: "United States", url: "/markets/us" },
        ],
      }}
    />
  );
}
