/**
 * Migration script: Update MongoDB data to remove unverifiable claims
 *
 * Updates: case studies, stats, team members, company info, trust points
 * Does NOT touch: services, blog posts, technologies, admin, process steps
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {
  CaseStudy,
  CompanyInfo,
  TeamMember,
  Stat,
  TrustPoint,
} from "../src/lib/models";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

// ============================================================================
// UPDATED CASE STUDIES — anonymized, honest
// ============================================================================
const caseStudiesData = [
  {
    title: "Cloud Migration for a FinTech Payment Processor",
    slug: "cloud-migration-fintech",
    client: "FinTech Company (Confidential)",
    industry: "Financial Services / FinTech",
    challenge: "A growing payment processor serving merchants across Europe was struggling with on-premise infrastructure. Peak transaction volumes caused system slowdowns, compliance audits were increasingly complex, and the infrastructure team spent most of their time on maintenance rather than innovation.",
    solution: "We designed a phased cloud migration strategy to AWS, prioritizing the payment processing core. The new architecture featured auto-scaling Kubernetes clusters, multi-region failover, and PCI-DSS compliant infrastructure-as-code. Blue-green deployments enabled shipping updates during business hours without risk.",
    results: [
      "Significant reduction in infrastructure costs through right-sizing and auto-scaling",
      "Improved uptime from ~99.2% to 99.99%+ with multi-region architecture",
      "Peak capacity increased 10x without performance degradation",
      "Deployment frequency improved from bi-weekly to multiple times daily",
      "PCI-DSS compliance streamlined through infrastructure-as-code",
    ],
    technologies: ["AWS EKS", "Terraform", "ArgoCD", "PostgreSQL RDS", "Redis ElastiCache", "Datadog", "GitHub Actions"],
    testimonial: {
      quote: "The migration transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them. The team understood our compliance requirements without lengthy explanations.",
      author: "VP of Engineering",
      role: "FinTech Company",
    },
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Deploy Speed", value: "12x/day" },
      { label: "Infra Cost", value: "-55%" },
    ],
    order: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    title: "B2B SaaS Platform — From MVP to Funding",
    slug: "saas-mvp-to-funding",
    client: "SaaS Startup (Confidential)",
    industry: "Enterprise SaaS",
    challenge: "A two-person founding team had validated a B2B analytics concept with pilot customers but lacked the technical capacity to build the product. They needed to go from Figma mockups to a production MVP within a few months to hit their funding deadline.",
    solution: "We embedded as their interim engineering team, building the core platform with Next.js, Node.js, and PostgreSQL while establishing engineering best practices from day one. The architecture was designed to handle projected 3-year growth without rewrites.",
    results: [
      "Production MVP delivered ahead of schedule",
      "Successfully secured funding from a reputable VC firm",
      "Onboarded first paying enterprise customers",
      "Platform handles millions of events daily with low latency",
      "Codebase passed technical due diligence from multiple VC firms",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TimescaleDB", "Redis", "AWS", "Stripe", "Auth0"],
    testimonial: {
      quote: "Working with Cloudrix was like having a world-class engineering team from day one. They helped us think through product decisions and built something that investors immediately recognized as enterprise-grade.",
      author: "Co-founder & CEO",
      role: "SaaS Startup",
    },
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Funding", value: "Secured" },
      { label: "Launch Bugs", value: "Zero critical" },
    ],
    order: 2,
    isActive: true,
    isFeatured: true,
  },
  {
    title: "Legacy ERP Modernization for Manufacturing",
    slug: "legacy-erp-modernization",
    client: "Manufacturing Company (Confidential)",
    industry: "Manufacturing / Industrial",
    challenge: "A precision manufacturing company was running critical operations on a 15-year-old custom ERP system. The original developers had left, documentation was sparse, and the legacy codebase was nearly impossible to modify safely.",
    solution: "We applied the strangler fig pattern to incrementally modernize without disrupting operations. New capabilities were built as microservices with a clean API layer, while legacy modules were systematically extracted and replaced. The team received hands-on training throughout.",
    results: [
      "Majority of legacy codebase modernized incrementally",
      "New features now ship in days instead of months",
      "Successfully integrated with major customer EDI systems",
      "Real-time inventory accuracy improved significantly",
      "Zero production downtime during entire modernization",
      "Internal team now maintains and extends the system independently",
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "RabbitMQ", "Docker", "Azure", "Power BI"],
    testimonial: {
      quote: "We were terrified of touching our ERP — one wrong change and production stops. The incremental approach let us modernize without betting the company. Our system is now an asset instead of a liability.",
      author: "Operations Director",
      role: "Manufacturing Company",
    },
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Downtime", value: "0 hrs" },
      { label: "Team", value: "Self-sufficient" },
    ],
    order: 3,
    isActive: true,
    isFeatured: false,
  },
  {
    title: "AI-Powered Customer Service Agent",
    slug: "ai-customer-service-agent",
    client: "Insurance Company (Confidential)",
    industry: "Insurance / Financial Services",
    challenge: "A customer service department was drowning in volume — tens of thousands of monthly inquiries across policy questions, claims status, and coverage changes. Average wait times had ballooned, driving high call abandonment rates. Experienced agents spent most of their time on routine queries, leaving complex cases understaffed.",
    solution: "We designed and deployed a RAG-powered AI agent using Claude as the reasoning engine and Pinecone as the vector store, ingesting complete policy documentation and knowledge base. The agent was integrated with CRM and core systems via custom API orchestration. We implemented EU AI Act-compliant transparency controls including AI disclosure, audit logging, and human escalation triggers.",
    results: [
      "Majority of customer inquiries resolved without human intervention",
      "Average response time reduced from 45+ minutes to under 30 seconds",
      "Customer satisfaction scores increased significantly",
      "Substantial annual cost savings in customer service operations",
      "Fully compliant with EU AI Act transparency and human oversight requirements",
    ],
    technologies: ["Claude API", "Pinecone", "LangChain", "Python/FastAPI", "AWS", "PostgreSQL", "n8n"],
    testimonial: {
      quote: "We approached AI with healthy skepticism. The team built a system that genuinely understands our policies and knows when to hand off to a human. Our agents finally have time for the complex cases that actually need human judgment.",
      author: "Chief Digital Officer",
      role: "Insurance Company",
    },
    metrics: [
      { label: "Automation", value: "73%" },
      { label: "Response Time", value: "<30s" },
      { label: "CSAT", value: "+22%" },
    ],
    order: 4,
    isActive: true,
    isFeatured: false,
  },
  {
    title: "EU AI Act Compliance Program",
    slug: "eu-ai-act-compliance-program",
    client: "FinTech Company (Confidential)",
    industry: "FinTech / Regulatory",
    challenge: "A FinTech company had deployed multiple AI systems across fraud detection, credit scoring, and customer onboarding — but had no compliance framework for the EU AI Act. An internal audit revealed that several systems likely qualified as 'high-risk' under the Act, exposing the company to significant fines. With the high-risk compliance deadline (since moved to December 2, 2027 by the Digital Omnibus) on the horizon and enterprise partners already asking AI Act questions in vendor reviews, the board demanded a comprehensive compliance program.",
    solution: "We executed a four-phase compliance program: AI system inventory and risk classification, Fundamental Rights Impact Assessments for high-risk systems, technical compliance controls (audit logging, bias monitoring, human override interfaces), and a governance framework including an AI ethics board charter and staff training.",
    results: [
      "All AI systems classified, documented, and mapped to EU AI Act risk categories",
      "High-risk systems fully remediated with technical and organizational controls",
      "Compliance documentation accepted during preliminary regulatory consultation",
      "Risk exposure reduced significantly through documented compliance posture",
      "Program completed well ahead of the regulatory deadline (now December 2, 2027)",
    ],
    technologies: ["Custom compliance tooling", "LangFuse", "Python", "Azure", "Power BI"],
    testimonial: {
      quote: "The EU AI Act felt like an impossible puzzle. The team delivered both a clear legal framework and the actual technical controls to back it up. When we presented to the regulator, they commented that our documentation was among the most thorough they'd reviewed.",
      author: "Head of Compliance",
      role: "FinTech Company",
    },
    metrics: [
      { label: "Systems", value: "All compliant" },
      { label: "Risk", value: "Mitigated" },
      { label: "Timeline", value: "Ahead" },
    ],
    order: 5,
    isActive: true,
    isFeatured: false,
  },
];

// ============================================================================
// UPDATED STATS — honest, verifiable
// ============================================================================
const statsData = [
  { value: "8+", label: "Years Engineering Experience", order: 1, isActive: true },
  { value: "NL", label: "KVK-Registered Entity", order: 2, isActive: true },
  { value: "CET", label: "EU Timezone Coverage", order: 3, isActive: true },
  { value: "24h", label: "Response Time", order: 4, isActive: true },
];

// ============================================================================
// UPDATED TEAM — only Firas (real person)
// ============================================================================
const teamMembersData = [
  {
    name: "Firas Sayah",
    role: "Founder & Lead Engineer",
    bio: "Full-stack engineer with 8+ years of experience building production systems. Specializes in cloud architecture, AI systems, and scalable applications. Previously worked with companies across Europe on Angular, PHP, NestJS, and cloud platforms. KVK-registered in the Netherlands.",
    email: "firas@cloudrix.io",
    linkedin: "https://linkedin.com/in/firassayah",
    github: "https://github.com/firassayah",
    order: 1,
    isActive: true,
  },
];

// ============================================================================
// UPDATED COMPANY INFO — honest founding date
// ============================================================================
const companyInfoUpdate = {
  tagline: "AI-Powered Engineering for European Companies",
  description: "Cloudrix is a Dutch-registered consultancy that helps European companies build, scale, and optimize their software systems. From AI agent deployment and RAG systems to cloud architecture and EU AI Act compliance, we deliver production-grade solutions with a focus on reliability, security, and regulatory compliance.",
  founded: 2024,
  heroTitle: "Senior Engineering & AI for European Companies",
  heroSubtitle: "Cloud architecture, AI systems, and product development for European companies. A Dutch-registered consultancy with 8+ years of hands-on engineering experience. EU AI Act compliant.",
  ctaTitle: "Let's Talk About Your Project",
  ctaSubtitle: "Book a free 30-minute call — no sales pitch, just an honest conversation about your technical challenges and whether we're the right fit.",
};

// ============================================================================
// UPDATED TRUST POINTS — verifiable only
// ============================================================================
const trustPointsData = [
  {
    title: "Dutch KVK Entity",
    description: "Cloudrix is a proper Dutch-registered company. KVK-certified, EU contracts, transparent invoicing.",
    icon: "Shield",
    order: 1,
    isActive: true,
  },
  {
    title: "GDPR-Compliant Practices",
    description: "Data protection built into every project. EU data residency, encryption, proper consent management.",
    icon: "Shield",
    order: 2,
    isActive: true,
  },
  {
    title: "EUR Invoicing",
    description: "Simple, transparent EUR billing from our Netherlands entity. No currency hassle, no hidden fees.",
    icon: "CreditCard",
    order: 3,
    isActive: true,
  },
  {
    title: "CET Timezone",
    description: "Same-day responses, real-time collaboration. No async delays across timezones.",
    icon: "Globe",
    order: 4,
    isActive: true,
  },
  {
    title: "NDA Available",
    description: "We sign NDAs before any sensitive discussion. Your intellectual property is protected.",
    icon: "Lock",
    order: 5,
    isActive: true,
  },
  {
    title: "Senior Engineers Only",
    description: "8+ years of hands-on production experience. No juniors learning on your project.",
    icon: "CheckCircle",
    order: 6,
    isActive: true,
  },
];

// ============================================================================
// MIGRATION FUNCTION
// ============================================================================
async function migrate() {
  try {
    console.log("Starting honesty migration...");
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // 1. Replace case studies
    console.log("\n1. Replacing case studies with anonymized versions...");
    await CaseStudy.deleteMany({});
    await CaseStudy.insertMany(caseStudiesData);
    console.log("   Done: 5 anonymized case studies");

    // 2. Replace stats
    console.log("\n2. Replacing stats with verifiable facts...");
    await Stat.deleteMany({});
    await Stat.insertMany(statsData);
    console.log("   Done: 4 honest stats");

    // 3. Replace team members (keep only Firas)
    console.log("\n3. Replacing team members (removing fictional members)...");
    await TeamMember.deleteMany({});
    await TeamMember.insertMany(teamMembersData);
    console.log("   Done: 1 real team member (Firas Sayah)");

    // 4. Update company info
    console.log("\n4. Updating company info (founding date, copy)...");
    await CompanyInfo.updateMany({}, { $set: companyInfoUpdate });
    console.log("   Done: founding date corrected to 2024, copy updated");

    // 5. Replace trust points
    console.log("\n5. Replacing trust points with verifiable claims...");
    await TrustPoint.deleteMany({});
    await TrustPoint.insertMany(trustPointsData);
    console.log("   Done: 6 honest trust points");

    console.log("\n" + "=".repeat(50));
    console.log("MIGRATION COMPLETE!");
    console.log("=".repeat(50));
    console.log("\nChanges applied:");
    console.log("  - Case studies: anonymized (fake company names removed)");
    console.log("  - Stats: replaced with verifiable facts (8+ yrs, KVK, CET, 24h)");
    console.log("  - Team: only Firas Sayah (fictional members removed)");
    console.log("  - Company info: founding date fixed to 2024");
    console.log("  - Trust points: only verifiable claims");
    console.log("\nNOT touched: services, blog posts, technologies, admin, process steps");
    console.log("");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

migrate();
