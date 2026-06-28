import { CaseStudy } from "@/types";

// These are representative project scenarios illustrating our capabilities and approach.
// Client names and specific details have been anonymized for confidentiality.

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "cloud-migration-fintech",
    title: "Cloud Migration for a FinTech Payment Processor",
    client: "FinTech Company (Confidential)",
    industry: "Financial Services / FinTech",
    challenge:
      "A growing payment processor serving merchants across Europe was struggling with on-premise infrastructure. Peak transaction volumes caused system slowdowns, compliance audits were increasingly complex, and the infrastructure team spent most of their time on maintenance rather than innovation.",
    solution:
      "We designed a phased cloud migration strategy to AWS, prioritizing the payment processing core. The new architecture featured auto-scaling Kubernetes clusters, multi-region failover, and PCI-DSS compliant infrastructure-as-code. Blue-green deployments enabled shipping updates during business hours without risk.",
    results: [
      "Significant reduction in infrastructure costs through right-sizing and auto-scaling",
      "Improved uptime from ~99.2% to 99.99%+ with multi-region architecture",
      "Peak capacity increased 10x without performance degradation",
      "Deployment frequency improved from bi-weekly to multiple times daily",
      "PCI-DSS compliance streamlined through infrastructure-as-code",
    ],
    technologies: [
      "AWS EKS",
      "Terraform",
      "ArgoCD",
      "PostgreSQL RDS",
      "Redis ElastiCache",
      "Datadog",
      "GitHub Actions",
    ],
    testimonial: {
      quote:
        "The migration transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them. The team understood our compliance requirements without lengthy explanations.",
      author: "VP of Engineering",
      role: "FinTech Company",
    },
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Deploy Speed", value: "12x/day" },
      { label: "Infra Cost", value: "-55%" },
    ],
  },
  {
    id: "2",
    slug: "saas-mvp-to-funding",
    title: "B2B SaaS Platform — From MVP to Funding",
    client: "SaaS Startup (Confidential)",
    industry: "Enterprise SaaS",
    challenge:
      "A two-person founding team had validated a B2B analytics concept with pilot customers but lacked the technical capacity to build the product. They needed to go from Figma mockups to a production MVP within a few months to hit their funding deadline.",
    solution:
      "We embedded as their interim engineering team, building the core platform with Next.js, Node.js, and PostgreSQL while establishing engineering best practices from day one. The architecture was designed to handle projected 3-year growth without rewrites.",
    results: [
      "Production MVP delivered ahead of schedule",
      "Successfully secured funding from a reputable VC firm",
      "Onboarded first paying enterprise customers",
      "Platform handles millions of events daily with low latency",
      "Codebase passed technical due diligence from multiple VC firms",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TimescaleDB",
      "Redis",
      "AWS",
      "Stripe",
      "Auth0",
    ],
    testimonial: {
      quote:
        "Working with Cloudrix was like having a world-class engineering team from day one. They helped us think through product decisions and built something that investors immediately recognized as enterprise-grade.",
      author: "Co-founder & CEO",
      role: "SaaS Startup",
    },
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Funding", value: "Secured" },
      { label: "Launch Bugs", value: "Zero critical" },
    ],
  },
  {
    id: "3",
    slug: "legacy-erp-modernization",
    title: "Legacy ERP Modernization for Manufacturing",
    client: "Manufacturing Company (Confidential)",
    industry: "Manufacturing / Industrial",
    challenge:
      "A precision manufacturing company was running critical operations on a 15-year-old custom ERP system. The original developers had left, documentation was sparse, and the legacy codebase was nearly impossible to modify safely.",
    solution:
      "We applied the strangler fig pattern to incrementally modernize without disrupting operations. New capabilities were built as microservices with a clean API layer, while legacy modules were systematically extracted and replaced. The team received hands-on training throughout.",
    results: [
      "Majority of legacy codebase modernized incrementally",
      "New features now ship in days instead of months",
      "Successfully integrated with major customer EDI systems",
      "Real-time inventory accuracy improved significantly",
      "Zero production downtime during entire modernization",
      "Internal team now maintains and extends the system independently",
    ],
    technologies: [
      "Node.js",
      "React",
      "PostgreSQL",
      "RabbitMQ",
      "Docker",
      "Azure",
      "Power BI",
    ],
    testimonial: {
      quote:
        "We were terrified of touching our ERP — one wrong change and production stops. The incremental approach let us modernize without betting the company. Our system is now an asset instead of a liability.",
      author: "Operations Director",
      role: "Manufacturing Company",
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Downtime", value: "0 hrs" },
      { label: "Team", value: "Self-sufficient" },
    ],
  },
  {
    id: "4",
    slug: "ai-customer-service-agent",
    title: "AI-Powered Customer Service Agent",
    client: "Insurance Company (Confidential)",
    industry: "Insurance / Financial Services",
    challenge:
      "A customer service department was drowning in volume — tens of thousands of monthly inquiries across policy questions, claims status, and coverage changes. Average wait times had ballooned, driving high call abandonment rates. Experienced agents spent most of their time on routine queries, leaving complex cases understaffed.",
    solution:
      "We designed and deployed a RAG-powered AI agent using Claude as the reasoning engine and Pinecone as the vector store, ingesting complete policy documentation and knowledge base. The agent was integrated with CRM and core systems via custom API orchestration. We implemented EU AI Act-compliant transparency controls including AI disclosure, audit logging, and human escalation triggers.",
    results: [
      "Majority of customer inquiries resolved without human intervention",
      "Average response time reduced from 45+ minutes to under 30 seconds",
      "Customer satisfaction scores increased significantly",
      "Substantial annual cost savings in customer service operations",
      "Fully compliant with EU AI Act transparency and human oversight requirements",
    ],
    technologies: [
      "Claude API",
      "Pinecone",
      "LangChain",
      "Python/FastAPI",
      "AWS",
      "PostgreSQL",
      "n8n",
    ],
    testimonial: {
      quote:
        "We approached AI with healthy skepticism. The team built a system that genuinely understands our policies and knows when to hand off to a human. Our agents finally have time for the complex cases that actually need human judgment.",
      author: "Chief Digital Officer",
      role: "Insurance Company",
    },
    image: "https://images.unsplash.com/photo-1531746790095-e5cb157f8489?w=800&q=80",
    metrics: [
      { label: "Automation", value: "73%" },
      { label: "Response Time", value: "<30s" },
      { label: "CSAT", value: "+22%" },
    ],
  },
  {
    id: "5",
    slug: "eu-ai-act-compliance-program",
    title: "EU AI Act Compliance Program",
    client: "FinTech Company (Confidential)",
    industry: "FinTech / Regulatory",
    challenge:
      "A FinTech company had deployed multiple AI systems across fraud detection, credit scoring, and customer onboarding — but had no compliance framework for the EU AI Act. An internal audit revealed that several systems likely qualified as 'high-risk' under the Act, exposing the company to significant fines. With the August 2, 2026 deadline approaching, the board demanded a comprehensive compliance program.",
    solution:
      "We executed a four-phase compliance program: AI system inventory and risk classification, Fundamental Rights Impact Assessments for high-risk systems, technical compliance controls (audit logging, bias monitoring, human override interfaces), and a governance framework including an AI ethics board charter and staff training.",
    results: [
      "All AI systems classified, documented, and mapped to EU AI Act risk categories",
      "High-risk systems fully remediated with technical and organizational controls",
      "Compliance documentation accepted during preliminary regulatory consultation",
      "Risk exposure reduced significantly through documented compliance posture",
      "Program completed well ahead of the August 2026 deadline",
    ],
    technologies: [
      "Custom compliance tooling",
      "LangFuse",
      "Python",
      "Azure",
      "Power BI",
    ],
    testimonial: {
      quote:
        "The EU AI Act felt like an impossible puzzle. The team delivered both a clear legal framework and the actual technical controls to back it up. When we presented to the regulator, they commented that our documentation was among the most thorough they'd reviewed.",
      author: "Head of Compliance",
      role: "FinTech Company",
    },
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    metrics: [
      { label: "Systems", value: "All compliant" },
      { label: "Risk", value: "Mitigated" },
      { label: "Timeline", value: "Ahead" },
    ],
  },
];
