import { CaseStudy } from "@/types";

// These are representative project scenarios illustrating our capabilities and approach.
// Client names and specific details have been anonymized for confidentiality.

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "nordic-payment-processor-migration",
    title: "Cloud Migration for a Nordic Payment Processor",
    client: "Nordic FinTech (Confidential)",
    industry: "Financial Services / FinTech",
    description:
      "Migrated a high-volume payment processor from on-premise infrastructure to AWS, achieving 99.99% uptime and 55% infrastructure cost reduction while maintaining PCI-DSS compliance.",
    duration: "6 months",
    challenge:
      "A growing payment processor serving merchants across Northern Europe was struggling with on-premise infrastructure. Peak transaction volumes caused system slowdowns, compliance audits were increasingly complex, and the infrastructure team spent most of their time on maintenance rather than innovation. The legacy setup could not scale to meet seasonal demand spikes, and the cost of provisioning new hardware was prohibitive.",
    solution:
      "We designed a phased cloud migration strategy to AWS, prioritizing the payment processing core. The new architecture featured auto-scaling Kubernetes clusters, multi-region failover, and PCI-DSS compliant infrastructure-as-code. Blue-green deployments enabled shipping updates during business hours without risk. We implemented a comprehensive observability stack with Datadog for real-time monitoring and alerting.",
    results: [
      "55% reduction in infrastructure costs through right-sizing and auto-scaling",
      "Improved uptime from ~99.2% to 99.99%+ with multi-region architecture",
      "Peak capacity increased 10x without performance degradation",
      "Deployment frequency improved from bi-weekly to 12x daily",
      "PCI-DSS compliance streamlined through infrastructure-as-code",
      "Mean time to recovery reduced from 4 hours to under 5 minutes",
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
      role: "Nordic Payment Processor",
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Deploy Speed", value: "12x/day" },
      { label: "Infra Cost", value: "-55%" },
    ],
  },
  {
    id: "2",
    slug: "analytics-platform-series-a",
    title: "B2B Analytics Platform — From MVP to Series A",
    client: "SaaS Startup (Confidential)",
    industry: "Enterprise SaaS",
    description:
      "Built a production-ready B2B analytics platform from Figma mockups in 14 weeks, enabling the startup to secure Series A funding and onboard enterprise customers.",
    duration: "14 weeks",
    challenge:
      "A two-person founding team had validated a B2B analytics concept with pilot customers but lacked the technical capacity to build the product. They needed to go from Figma mockups to a production MVP within a few months to hit their funding deadline. Multiple VC firms had expressed interest contingent on seeing a working product that could pass technical due diligence.",
    solution:
      "We embedded as their interim engineering team, building the core platform with Next.js, Node.js, and PostgreSQL while establishing engineering best practices from day one. The architecture was designed to handle projected 3-year growth without rewrites. We implemented comprehensive testing, CI/CD pipelines, and documentation that satisfied investor technical reviews.",
    results: [
      "Production MVP delivered ahead of schedule in 14 weeks",
      "Successfully secured Series A funding from a top-tier VC firm",
      "Onboarded first 5 paying enterprise customers within 30 days of launch",
      "Platform handles 2M+ events daily with sub-100ms latency",
      "Codebase passed technical due diligence from 3 VC firms",
      "Zero critical bugs at launch",
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
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Funding", value: "Series A" },
      { label: "Launch Bugs", value: "Zero critical" },
    ],
  },
  {
    id: "3",
    slug: "manufacturing-erp-modernization",
    title: "Legacy ERP Modernization for Manufacturing",
    client: "Manufacturing Company (Confidential)",
    industry: "Manufacturing / Industrial",
    description:
      "Incrementally modernized a 15-year-old custom ERP system using the strangler fig pattern, achieving zero downtime and enabling the internal team to maintain the system independently.",
    duration: "9 months",
    challenge:
      "A precision manufacturing company was running critical operations on a 15-year-old custom ERP system. The original developers had left, documentation was sparse, and the legacy codebase was nearly impossible to modify safely. Any downtime directly halted production lines, making a big-bang rewrite too risky. New customer EDI integration requirements were impossible to meet with the existing architecture.",
    solution:
      "We applied the strangler fig pattern to incrementally modernize without disrupting operations. New capabilities were built as microservices with a clean API layer, while legacy modules were systematically extracted and replaced. The team received hands-on training throughout the process, ensuring they could maintain and extend the system independently after our engagement ended.",
    results: [
      "73% of legacy codebase modernized incrementally",
      "New features now ship in days instead of months",
      "Successfully integrated with 4 major customer EDI systems",
      "Real-time inventory accuracy improved from 82% to 99.1%",
      "Zero production downtime during entire 9-month modernization",
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Downtime", value: "0 hrs" },
      { label: "Team", value: "Self-sufficient" },
    ],
  },
  {
    id: "4",
    slug: "healthcare-platform-scaleup",
    title: "Healthcare Platform Scale-Up",
    client: "HealthTech Startup (Confidential)",
    industry: "Healthcare / HealthTech",
    description:
      "Scaled a telehealth platform from 500 to 50,000 concurrent users while achieving HIPAA compliance and reducing API response times by 80%.",
    duration: "5 months",
    challenge:
      "A telehealth platform that launched during the pandemic had grown rapidly but was buckling under load. The monolithic architecture could not scale beyond 500 concurrent users, API response times were exceeding 3 seconds, and the platform lacked HIPAA compliance controls required for their enterprise hospital contracts. They were losing deals to competitors who could demonstrate compliance certification.",
    solution:
      "We decomposed the monolith into event-driven microservices, introduced a CQRS pattern for the high-read appointment and records modules, and implemented end-to-end encryption with HIPAA-compliant audit logging. A dedicated performance engineering sprint optimized database queries, introduced caching layers, and implemented connection pooling. We guided them through the full HIPAA compliance certification process.",
    results: [
      "Platform scales to 50,000+ concurrent users",
      "API response times reduced from 3s to under 200ms (93% improvement)",
      "Achieved full HIPAA compliance certification",
      "Signed 3 enterprise hospital contracts within 60 days of certification",
      "Infrastructure costs decreased 40% despite 100x user growth",
      "99.95% uptime SLA maintained throughout migration",
    ],
    technologies: [
      "Node.js",
      "React",
      "PostgreSQL",
      "Redis",
      "AWS ECS",
      "Terraform",
      "WebRTC",
      "Docker",
    ],
    testimonial: {
      quote:
        "We were turning away hospital contracts because we couldn't prove compliance or handle their user volumes. Within 5 months, we had HIPAA certification and a platform that handles 100x our original load. That directly translated to revenue.",
      author: "CTO",
      role: "HealthTech Startup",
    },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    metrics: [
      { label: "Users", value: "50K+" },
      { label: "Response Time", value: "-93%" },
      { label: "Compliance", value: "HIPAA" },
    ],
  },
  {
    id: "5",
    slug: "ecommerce-performance-rescue",
    title: "E-Commerce Performance Rescue",
    client: "E-Commerce Retailer (Confidential)",
    industry: "E-Commerce / Retail",
    description:
      "Rescued a failing e-commerce platform that was losing sales during peak traffic, reducing page load times by 70% and increasing conversion rates by 34%.",
    duration: "3 months",
    challenge:
      "A mid-market e-commerce retailer was losing significant revenue during peak shopping periods. Their platform would slow to a crawl under load, with page load times exceeding 8 seconds. Cart abandonment rates were at 78%, and the site had crashed during two consecutive Black Friday events. Their existing agency had been unable to resolve the underlying architectural issues.",
    solution:
      "We performed a comprehensive performance audit and identified critical bottlenecks: unoptimized database queries, lack of caching, synchronous third-party API calls, and oversized frontend bundles. We implemented a multi-layer caching strategy with Redis, migrated to server-side rendering with Next.js, optimized all critical database queries, and introduced a CDN with edge caching. Asynchronous processing was added for inventory checks and payment validation.",
    results: [
      "Page load times reduced from 8s to 2.1s (74% improvement)",
      "Cart abandonment dropped from 78% to 51%",
      "Conversion rate increased by 34%",
      "Platform handled 15x normal traffic during Black Friday without issues",
      "Core Web Vitals scores improved to 'Good' across all metrics",
      "Estimated revenue recovery of $2.3M annually from reduced abandonment",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Redis",
      "PostgreSQL",
      "Cloudflare CDN",
      "AWS",
      "Datadog",
      "Lighthouse",
    ],
    testimonial: {
      quote:
        "After two failed Black Fridays, we were desperate. The team identified issues in the first week that our previous agency missed for months. This Black Friday was our best ever — zero downtime and record sales.",
      author: "Head of Digital",
      role: "E-Commerce Retailer",
    },
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800",
    metrics: [
      { label: "Load Time", value: "-74%" },
      { label: "Conversion", value: "+34%" },
      { label: "Uptime", value: "100%" },
    ],
  },
  {
    id: "6",
    slug: "logistics-tech-due-diligence",
    title: "Technical Due Diligence for Logistics Acquisition",
    client: "Private Equity Firm (Confidential)",
    industry: "Logistics / Private Equity",
    description:
      "Conducted comprehensive technical due diligence on a logistics SaaS platform for a PE acquisition, identifying $1.8M in hidden technical debt and providing a remediation roadmap.",
    duration: "4 weeks",
    challenge:
      "A private equity firm was evaluating a logistics SaaS company for acquisition at a $45M valuation. The target company claimed a modern tech stack and scalable architecture, but the PE firm needed independent verification before committing. Previous acquisitions had been burned by undisclosed technical debt that required millions in post-acquisition remediation.",
    solution:
      "We conducted a 4-week deep-dive technical due diligence covering architecture assessment, code quality analysis, security posture review, scalability testing, team capability evaluation, and infrastructure cost analysis. We provided a detailed report with risk ratings, a technical debt quantification, and a prioritized remediation roadmap with cost estimates for each item.",
    results: [
      "Identified $1.8M in hidden technical debt across 3 critical systems",
      "Discovered 2 critical security vulnerabilities in the payment module",
      "Validated the core architecture's ability to scale to 10x current load",
      "Negotiated $2.1M reduction in acquisition price based on findings",
      "Provided 90-day post-acquisition technical remediation roadmap",
      "PE firm completed acquisition with full confidence in technical risk profile",
    ],
    technologies: [
      "Architecture Review",
      "Code Analysis",
      "Security Audit",
      "Load Testing",
      "k6",
      "SonarQube",
      "AWS Well-Architected",
    ],
    testimonial: {
      quote:
        "The due diligence report paid for itself 50x over. They found issues that would have cost us millions post-acquisition. The remediation roadmap gave us a clear plan from day one of ownership.",
      author: "Managing Partner",
      role: "Private Equity Firm",
    },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    metrics: [
      { label: "Debt Found", value: "$1.8M" },
      { label: "Price Saved", value: "$2.1M" },
      { label: "Timeline", value: "4 weeks" },
    ],
  },
  {
    id: "7",
    slug: "insurance-ai-agent-deployment",
    title: "AI-Powered Customer Service Agent for Insurance",
    client: "Insurance Company (Confidential)",
    industry: "Insurance / Financial Services",
    description:
      "Deployed a RAG-powered AI customer service agent that resolves 73% of inquiries automatically, reducing response times from 45 minutes to under 30 seconds.",
    duration: "4 months",
    challenge:
      "A customer service department was drowning in volume — tens of thousands of monthly inquiries across policy questions, claims status, and coverage changes. Average wait times had ballooned to over 45 minutes, driving high call abandonment rates. Experienced agents spent most of their time on routine queries, leaving complex cases understaffed. Customer satisfaction scores had dropped significantly over the past year.",
    solution:
      "We designed and deployed a RAG-powered AI agent using Claude as the reasoning engine and Pinecone as the vector store, ingesting complete policy documentation and knowledge base. The agent was integrated with CRM and core systems via custom API orchestration. We implemented EU AI Act-compliant transparency controls including AI disclosure, audit logging, and human escalation triggers for sensitive topics like claims disputes.",
    results: [
      "73% of customer inquiries resolved without human intervention",
      "Average response time reduced from 45+ minutes to under 30 seconds",
      "Customer satisfaction scores increased by 22%",
      "$1.2M annual cost savings in customer service operations",
      "Fully compliant with EU AI Act transparency and human oversight requirements",
      "Human agents now focus on complex cases, improving resolution quality by 40%",
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
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800",
    metrics: [
      { label: "Automation", value: "73%" },
      { label: "Response Time", value: "<30s" },
      { label: "CSAT", value: "+22%" },
    ],
  },
  {
    id: "8",
    slug: "fintech-eu-ai-act-compliance",
    title: "EU AI Act Compliance Program for FinTech",
    client: "FinTech Company (Confidential)",
    industry: "FinTech / Regulatory",
    description:
      "Executed a comprehensive EU AI Act compliance program for a FinTech company, classifying and remediating all AI systems ahead of the August 2026 deadline.",
    duration: "5 months",
    challenge:
      "A FinTech company had deployed multiple AI systems across fraud detection, credit scoring, and customer onboarding — but had no compliance framework for the EU AI Act. An internal audit revealed that several systems likely qualified as 'high-risk' under the Act, exposing the company to fines of up to 7% of global turnover. With the August 2, 2026 deadline approaching, the board demanded a comprehensive compliance program.",
    solution:
      "We executed a four-phase compliance program: AI system inventory and risk classification, Fundamental Rights Impact Assessments for high-risk systems, technical compliance controls (audit logging, bias monitoring, human override interfaces), and a governance framework including an AI ethics board charter and staff training. Each phase included regulatory consultation checkpoints.",
    results: [
      "All 12 AI systems classified, documented, and mapped to EU AI Act risk categories",
      "4 high-risk systems fully remediated with technical and organizational controls",
      "Compliance documentation accepted during preliminary regulatory consultation",
      "Potential fine exposure reduced from 7% of turnover to documented compliance",
      "Program completed 6 months ahead of the August 2026 deadline",
      "AI ethics board established with quarterly review cadence",
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
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    metrics: [
      { label: "Systems", value: "All compliant" },
      { label: "Risk", value: "Mitigated" },
      { label: "Timeline", value: "6mo early" },
    ],
  },
];
