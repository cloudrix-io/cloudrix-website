export type ProductCategory = "ai-powered" | "ai-enhanced" | "engineering-tools";
export type ProductStatus = "live" | "beta" | "coming-soon";
export type ProductPricing = "free" | "freemium" | "paid" | "open-source";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  icon: string;
  features: string[];
  techStack: string[];
  status: ProductStatus;
  productUrl: string;
  pricing: ProductPricing;
  howItWorks: { step: string; title: string; description: string }[];
  useCases: string[];
}

export const categoryInfo: Record<
  ProductCategory,
  { label: string; description: string; gradient: string }
> = {
  "ai-powered": {
    label: "AI-Powered Products",
    description:
      "Cutting-edge tools powered by large language models, RAG pipelines, and advanced AI agents.",
    gradient: "from-violet-600 to-purple-600",
  },
  "ai-enhanced": {
    label: "AI-Enhanced Solutions",
    description:
      "Business platforms supercharged with artificial intelligence for smarter workflows.",
    gradient: "from-blue-600 to-cyan-600",
  },
  "engineering-tools": {
    label: "Engineering & Business Tools",
    description:
      "Production-grade developer tools, monitoring platforms, and infrastructure utilities.",
    gradient: "from-emerald-600 to-teal-600",
  },
};

export const products: Product[] = [
  // ─── AI-Powered Products (7) ───────────────────────────────────────
  {
    slug: "cloudrix-ai-chat",
    name: "CloudrixAI Chat",
    tagline:
      "AI-powered customer support agent that learns from your docs.",
    description:
      "Deploy an intelligent support agent in minutes. CloudrixAI Chat ingests your documentation, knowledge base, and FAQs, then answers customer questions with human-level accuracy. Built on Claude API with a retrieval-augmented generation pipeline that keeps responses grounded in your content.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "MessageSquareText",
    features: [
      "Ingest docs, PDFs, and web pages in one click",
      "RAG pipeline ensures factual, grounded answers",
      "Multi-language support out of the box",
      "Escalation to human agents with full context",
      "Analytics dashboard with conversation insights",
      "Custom branding and widget styling",
    ],
    techStack: ["Claude API", "LangChain", "Pinecone", "Next.js", "Redis", "WebSocket"],
    status: "live",
    productUrl: "https://chat.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Connect Your Docs", description: "Upload PDFs, paste URLs, or connect your knowledge base. Our pipeline indexes everything in minutes." },
      { step: "2", title: "Customize the Agent", description: "Set the tone, define guardrails, and configure escalation rules to match your brand." },
      { step: "3", title: "Deploy the Widget", description: "Add a single script tag to your site. The chat widget goes live instantly." },
      { step: "4", title: "Monitor & Improve", description: "Track conversations, identify knowledge gaps, and fine-tune responses over time." },
    ],
    useCases: [
      "SaaS product support",
      "E-commerce pre-sales assistance",
      "Internal IT helpdesk",
      "Onboarding new employees with company docs",
    ],
  },
  {
    slug: "ai-code-reviewer",
    name: "CodeScan AI",
    tagline:
      "Paste code, get instant security + performance + architecture review.",
    description:
      "CodeScan AI performs deep static analysis powered by large language models. Paste any snippet or connect your repository and receive a detailed report covering security vulnerabilities, performance bottlenecks, architectural anti-patterns, and an overall quality score.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "ScanSearch",
    features: [
      "Security vulnerability detection (OWASP Top 10)",
      "Performance bottleneck identification",
      "Architecture and design pattern review",
      "Overall quality score with trend tracking",
      "Support for 20+ programming languages",
      "GitHub and GitLab integration for PR reviews",
    ],
    techStack: ["Claude API", "Tree-sitter", "Next.js", "PostgreSQL", "GitHub API"],
    status: "live",
    productUrl: "https://codescan.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Paste or Connect", description: "Paste a code snippet directly or connect your GitHub/GitLab repository." },
      { step: "2", title: "AI Analysis", description: "Our LLM-powered engine analyzes security, performance, and architecture in seconds." },
      { step: "3", title: "Review Report", description: "Get a detailed report with severity ratings, explanations, and fix suggestions." },
    ],
    useCases: [
      "Pre-merge code review automation",
      "Security auditing for compliance",
      "Onboarding developers to a new codebase",
      "Technical debt assessment",
    ],
  },
  {
    slug: "ai-scope-generator",
    name: "ScopeAI",
    tagline:
      "Describe your project in plain English, get a detailed scope document.",
    description:
      "Turn a project idea into a professional scope document in minutes. ScopeAI takes your plain-English description and produces a detailed breakdown including tech stack recommendations, timeline estimates, cost projections, and a downloadable PDF ready for stakeholders.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "FileText",
    features: [
      "Natural language project intake",
      "Automatic tech stack recommendation",
      "Timeline and milestone estimation",
      "Cost projection with ranges",
      "Downloadable PDF scope document",
      "Revision history and version comparison",
    ],
    techStack: ["Claude API", "React PDF", "Next.js", "Supabase", "Stripe"],
    status: "live",
    productUrl: "https://scope.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Describe Your Idea", description: "Write a few sentences about what you want to build. No technical jargon needed." },
      { step: "2", title: "AI Generates Scope", description: "Our engine produces a complete scope with features, tech stack, timeline, and cost estimate." },
      { step: "3", title: "Download & Share", description: "Export as PDF and share with your team or stakeholders. Iterate as needed." },
    ],
    useCases: [
      "Startup founders validating MVP scope",
      "Agencies preparing client proposals",
      "CTOs estimating new feature costs",
      "Freelancers scoping project bids",
    ],
  },
  {
    slug: "eu-ai-act-scanner",
    name: "AI Act Compliance Scanner",
    tagline:
      "Check if your AI system complies with EU AI Act regulations.",
    description:
      "Navigate the EU AI Act with confidence. Our compliance scanner evaluates your AI system against the full regulatory framework, classifies its risk level, identifies gaps, and generates an actionable compliance report with remediation steps.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "ShieldCheck",
    features: [
      "Automated risk classification (Minimal to Unacceptable)",
      "Gap analysis against EU AI Act requirements",
      "Actionable remediation recommendations",
      "Compliance report generation (PDF)",
      "Ongoing monitoring for regulatory updates",
      "Multi-system portfolio scanning",
    ],
    techStack: ["Claude API", "Next.js", "PostgreSQL", "React PDF", "Stripe"],
    status: "live",
    productUrl: "https://www.cloudrix.io/ai-tools/compliance-scanner",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Describe Your AI System", description: "Answer questions about your AI system's purpose, data, and deployment context." },
      { step: "2", title: "Risk Classification", description: "The scanner classifies your system into EU AI Act risk categories." },
      { step: "3", title: "Get Your Report", description: "Receive a detailed compliance report with gaps and remediation steps." },
    ],
    useCases: [
      "Companies deploying AI in the EU market",
      "Legal teams assessing AI compliance",
      "Startups preparing for funding due diligence",
      "Enterprises auditing existing AI systems",
    ],
  },
  {
    slug: "ai-architecture-generator",
    name: "CloudArchitect AI",
    tagline:
      "Describe your system, get a cloud architecture diagram with cost estimates.",
    description:
      "Skip weeks of architecture planning. Describe your application requirements in plain English and CloudArchitect AI generates a production-ready cloud architecture diagram, complete with service recommendations, scaling strategies, and monthly cost estimates across AWS, Azure, and GCP.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "Network",
    features: [
      "Natural language to architecture diagram",
      "Multi-cloud support (AWS, Azure, GCP)",
      "Monthly cost estimation with breakdowns",
      "Auto-scaling and high-availability patterns",
      "Exportable diagrams (SVG, PNG, PDF)",
      "Terraform/Pulumi code generation",
    ],
    techStack: ["Claude API", "D3.js", "Next.js", "Terraform", "React Flow"],
    status: "beta",
    productUrl: "https://architect.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Describe Requirements", description: "Tell us about your app, expected traffic, compliance needs, and budget." },
      { step: "2", title: "AI Designs Architecture", description: "Our engine generates an optimized architecture with service selection and scaling strategy." },
      { step: "3", title: "Export & Implement", description: "Download the diagram, cost breakdown, and optional IaC code to start building." },
    ],
    useCases: [
      "Startups designing their first cloud infrastructure",
      "Teams migrating from on-premise to cloud",
      "Architects comparing multi-cloud options",
      "CTOs estimating infrastructure budgets",
    ],
  },
  {
    slug: "ai-doc-generator",
    name: "DocSmith AI",
    tagline:
      "Point at your codebase, get production-ready API documentation.",
    description:
      "DocSmith AI reads your codebase and generates comprehensive, well-structured API documentation automatically. It understands your code's intent, not just its syntax, producing docs that developers actually want to read. Supports REST, GraphQL, and gRPC.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "BookOpen",
    features: [
      "Automatic endpoint discovery and documentation",
      "Request/response example generation",
      "Authentication flow documentation",
      "Interactive API playground",
      "Version diff tracking between releases",
      "Custom theme and branding support",
    ],
    techStack: ["Claude API", "Tree-sitter", "Next.js", "MDX", "Swagger UI"],
    status: "beta",
    productUrl: "https://docsmith.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Connect Repository", description: "Link your GitHub, GitLab, or Bitbucket repo with read-only access." },
      { step: "2", title: "AI Scans Code", description: "Our engine parses your codebase and understands the API structure and intent." },
      { step: "3", title: "Generate & Publish", description: "Review the generated docs, customize styling, and publish to a hosted URL." },
    ],
    useCases: [
      "API-first companies needing developer docs",
      "Teams with outdated documentation",
      "Open-source projects improving developer experience",
      "Enterprises standardizing internal API docs",
    ],
  },
  {
    slug: "ai-cost-optimizer",
    name: "CloudCost AI",
    tagline:
      "Scan your cloud bill, get AI-powered savings recommendations.",
    description:
      "CloudCost AI connects to your AWS, GCP, or Azure account and analyzes your spending patterns with machine learning. It identifies waste, recommends right-sizing, spots reserved instance opportunities, and projects savings, typically finding 25-40% reduction in the first month.",
    category: "ai-powered",
    categoryLabel: "AI-Powered",
    icon: "PiggyBank",
    features: [
      "Multi-cloud cost analysis (AWS, Azure, GCP)",
      "Right-sizing recommendations for compute and storage",
      "Reserved instance and savings plan optimization",
      "Idle resource detection and cleanup",
      "Cost anomaly alerts and forecasting",
      "Team-level cost allocation and tagging",
    ],
    techStack: ["Claude API", "AWS Cost Explorer API", "Next.js", "PostgreSQL", "Chart.js"],
    status: "coming-soon",
    productUrl: "https://cloudcost.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Connect Cloud Account", description: "Grant read-only billing access via IAM role. No resource access needed." },
      { step: "2", title: "AI Analyzes Spending", description: "Our engine analyzes months of billing data to identify patterns and waste." },
      { step: "3", title: "Get Savings Report", description: "Receive prioritized recommendations with projected savings and implementation steps." },
    ],
    useCases: [
      "Startups managing cloud costs as they scale",
      "Enterprises reducing multi-cloud waste",
      "Finance teams needing cloud cost visibility",
      "DevOps teams right-sizing infrastructure",
    ],
  },

  // ─── AI-Enhanced Solutions (7) ─────────────────────────────────────
  {
    slug: "smart-crm",
    name: "SmartCRM",
    tagline:
      "CRM with AI-powered lead scoring, email drafting, and deal prediction.",
    description:
      "SmartCRM is a modern CRM platform that uses AI to supercharge your sales pipeline. It automatically scores leads based on engagement signals, drafts personalized follow-up emails, and predicts deal outcomes so your team can focus on the opportunities that matter most.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "Users",
    features: [
      "AI-powered lead scoring and prioritization",
      "Automated follow-up email drafting",
      "Deal outcome prediction with confidence scores",
      "Pipeline analytics and forecasting",
      "Integration with email, calendar, and Slack",
      "Custom fields, tags, and workflow automation",
    ],
    techStack: ["Claude API", "Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ"],
    status: "beta",
    productUrl: "https://crm.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Import Contacts", description: "Import your existing contacts from CSV, HubSpot, or Salesforce." },
      { step: "2", title: "AI Enriches Data", description: "Our AI scores leads, enriches profiles, and identifies high-value opportunities." },
      { step: "3", title: "Close More Deals", description: "Get AI-drafted emails, meeting prep, and deal predictions to close faster." },
    ],
    useCases: [
      "B2B sales teams managing complex pipelines",
      "Startups scaling outbound sales",
      "Agencies tracking client relationships",
      "Consultancies managing lead qualification",
    ],
  },
  {
    slug: "ai-hiring-assistant",
    name: "HireAI",
    tagline:
      "AI screening tool that evaluates candidates against job requirements.",
    description:
      "HireAI automates the most time-consuming part of recruiting: initial screening. Upload a job description and candidate CVs, and the AI evaluates each candidate against your requirements, providing a structured scorecard, cultural fit assessment, and suggested interview questions.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "UserCheck",
    features: [
      "Automated CV parsing and skill extraction",
      "Structured scorecard per candidate",
      "Cultural fit and soft skill assessment",
      "Auto-generated interview questions",
      "Bias detection and fair hiring guardrails",
      "Integration with ATS platforms (Greenhouse, Lever)",
    ],
    techStack: ["Claude API", "Next.js", "PostgreSQL", "Supabase", "React PDF"],
    status: "beta",
    productUrl: "https://hire.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Define the Role", description: "Paste or upload the job description with must-have and nice-to-have requirements." },
      { step: "2", title: "Upload CVs", description: "Drag and drop candidate CVs in bulk. We support PDF, DOCX, and LinkedIn profiles." },
      { step: "3", title: "Review Scorecards", description: "Get a ranked list of candidates with detailed scorecards and interview questions." },
    ],
    useCases: [
      "Startups hiring their first engineering team",
      "HR departments screening high-volume applicants",
      "Recruitment agencies improving candidate matching",
      "Remote-first companies evaluating global talent",
    ],
  },
  {
    slug: "smart-analytics",
    name: "InsightAI",
    tagline:
      'Business analytics with natural language queries like "Show me revenue by region."',
    description:
      "InsightAI lets anyone on your team query business data using plain English. No SQL required. Ask questions like \"What was our churn rate last quarter?\" and get instant visualizations. Built for product, marketing, and finance teams who need answers fast.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "BarChart3",
    features: [
      "Natural language to SQL query engine",
      "Auto-generated charts and dashboards",
      "Scheduled reports via email and Slack",
      "Data source connectors (PostgreSQL, BigQuery, Snowflake)",
      "Team collaboration with shared dashboards",
      "Anomaly detection and trend alerts",
    ],
    techStack: ["Claude API", "Next.js", "Prisma", "Chart.js", "BigQuery", "WebSocket"],
    status: "coming-soon",
    productUrl: "https://insight.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Connect Data Sources", description: "Link your database, warehouse, or SaaS tools with secure read-only connectors." },
      { step: "2", title: "Ask Questions", description: "Type questions in plain English. Our AI translates them into optimized queries." },
      { step: "3", title: "Visualize & Share", description: "Get instant charts. Pin them to dashboards and schedule automated reports." },
    ],
    useCases: [
      "Product teams tracking feature adoption",
      "Marketing teams analyzing campaign performance",
      "Finance teams building revenue dashboards",
      "Executives needing real-time business metrics",
    ],
  },
  {
    slug: "ai-content-studio",
    name: "ContentAI Studio",
    tagline:
      "AI content generation platform for marketing teams.",
    description:
      "ContentAI Studio is a collaborative workspace where marketing teams create blog posts, social media content, email campaigns, and ad copy with AI assistance. It learns your brand voice, maintains consistency across channels, and includes a built-in approval workflow.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "PenTool",
    features: [
      "Brand voice training and consistency engine",
      "Multi-channel content generation (blog, social, email)",
      "SEO optimization with keyword suggestions",
      "Collaborative editing with approval workflows",
      "Content calendar with scheduling",
      "A/B variant generation for testing",
    ],
    techStack: ["Claude API", "Next.js", "TipTap", "PostgreSQL", "Redis", "S3"],
    status: "beta",
    productUrl: "https://content.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Train Your Voice", description: "Upload existing content so the AI learns your brand tone and style." },
      { step: "2", title: "Create Content", description: "Generate blog posts, social media, and emails with a single brief." },
      { step: "3", title: "Review & Publish", description: "Edit collaboratively, get approvals, and publish to connected channels." },
    ],
    useCases: [
      "Marketing teams scaling content output",
      "Agencies managing multiple brand voices",
      "Startups building thought leadership",
      "E-commerce teams writing product descriptions",
    ],
  },
  {
    slug: "smart-helpdesk",
    name: "HelpDesk AI",
    tagline:
      "Customer support with AI ticket routing, auto-responses, and sentiment analysis.",
    description:
      "HelpDesk AI transforms customer support operations with intelligent automation. It routes tickets to the right team, drafts responses for agents, detects customer sentiment in real time, and surfaces knowledge base articles, reducing resolution time by up to 60%.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "Headphones",
    features: [
      "AI-powered ticket routing and prioritization",
      "Auto-draft responses for agent review",
      "Real-time customer sentiment analysis",
      "Knowledge base article suggestions",
      "SLA tracking and escalation automation",
      "Multi-channel support (email, chat, social)",
    ],
    techStack: ["Claude API", "Next.js", "NestJS", "PostgreSQL", "Redis", "WebSocket"],
    status: "coming-soon",
    productUrl: "https://helpdesk.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Connect Channels", description: "Integrate email, live chat, and social media into a unified inbox." },
      { step: "2", title: "AI Processes Tickets", description: "Incoming tickets are classified, prioritized, and routed automatically." },
      { step: "3", title: "Agents Resolve Faster", description: "Agents get AI-drafted responses, relevant articles, and full customer context." },
    ],
    useCases: [
      "SaaS companies scaling customer support",
      "E-commerce brands handling seasonal spikes",
      "Tech companies with complex support workflows",
      "Multi-product companies needing unified support",
    ],
  },
  {
    slug: "ai-translation",
    name: "TranslateAI",
    tagline:
      "Real-time document and website translation powered by LLMs.",
    description:
      "TranslateAI delivers translations that actually read naturally, because they are powered by large language models that understand context, idioms, and industry terminology. Translate documents, websites, and apps in real time with quality that rivals professional human translators.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "Languages",
    features: [
      "Context-aware LLM-powered translation",
      "40+ language pairs supported",
      "Document translation (PDF, DOCX, PPTX)",
      "Website and app localization API",
      "Translation memory and glossary management",
      "Human review workflow for critical content",
    ],
    techStack: ["Claude API", "Next.js", "PostgreSQL", "Redis", "S3", "REST API"],
    status: "coming-soon",
    productUrl: "https://translate.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Upload or Connect", description: "Upload documents or connect your website/app via API or script tag." },
      { step: "2", title: "AI Translates", description: "Our LLM translates with full context awareness, not word-by-word." },
      { step: "3", title: "Review & Deploy", description: "Review translations, build a glossary, and deploy localized content." },
    ],
    useCases: [
      "EU companies localizing for multiple markets",
      "E-commerce brands expanding internationally",
      "SaaS products adding multi-language support",
      "Legal teams translating contracts and compliance docs",
    ],
  },
  {
    slug: "smart-invoice",
    name: "InvoiceAI",
    tagline:
      "AI-powered invoice processing: extract, categorize, and flag anomalies.",
    description:
      "InvoiceAI automates accounts payable with intelligent document processing. Upload invoices in any format and the AI extracts line items, matches them to purchase orders, categorizes expenses, and flags anomalies like duplicate charges or unusual amounts.",
    category: "ai-enhanced",
    categoryLabel: "AI-Enhanced",
    icon: "Receipt",
    features: [
      "OCR + AI extraction from PDF and scanned invoices",
      "Automatic PO matching and 3-way verification",
      "Expense categorization and GL coding",
      "Duplicate and anomaly detection",
      "Approval workflow with mobile support",
      "Integration with QuickBooks, Xero, and SAP",
    ],
    techStack: ["Claude API", "Tesseract OCR", "Next.js", "PostgreSQL", "Stripe", "S3"],
    status: "coming-soon",
    productUrl: "https://invoice.cloudrix.io",
    pricing: "paid",
    howItWorks: [
      { step: "1", title: "Upload Invoices", description: "Drag and drop invoices or forward them via email. Any format works." },
      { step: "2", title: "AI Extracts Data", description: "Line items, amounts, dates, and vendor info are extracted and validated." },
      { step: "3", title: "Approve & Sync", description: "Review flagged items, approve batches, and sync to your accounting system." },
    ],
    useCases: [
      "Finance teams processing high invoice volumes",
      "Companies wanting to eliminate manual data entry",
      "Procurement teams matching POs to invoices",
      "Auditors needing automated compliance checks",
    ],
  },

  // ─── Engineering & Business Tools (10) ─────────────────────────────
  {
    slug: "saas-starter",
    name: "SaaS Starter Kit",
    tagline:
      "Production-ready NestJS + Angular boilerplate with auth, payments, and multi-tenancy.",
    description:
      "Skip months of boilerplate and launch your SaaS product on a battle-tested foundation. The Cloudrix SaaS Starter Kit includes authentication, Stripe payments, multi-tenancy, role-based access, email templates, and deployment configs for AWS and Vercel.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "Rocket",
    features: [
      "Authentication with OAuth, magic links, and 2FA",
      "Stripe subscription billing with usage metering",
      "Multi-tenant architecture with data isolation",
      "Role-based access control (RBAC)",
      "Email templates with Resend integration",
      "Docker, Terraform, and CI/CD configs included",
    ],
    techStack: ["NestJS", "Angular", "PostgreSQL", "Stripe", "Docker", "Terraform"],
    status: "live",
    productUrl: "https://demo.cloudrix.io",
    pricing: "open-source",
    howItWorks: [
      { step: "1", title: "Clone the Repo", description: "Fork the repository and run the setup script. You are up and running in 5 minutes." },
      { step: "2", title: "Configure Services", description: "Set your Stripe keys, database URL, and email provider. All via environment variables." },
      { step: "3", title: "Build Your Product", description: "Focus on your unique features. Auth, billing, and infra are already handled." },
    ],
    useCases: [
      "Founders launching a new SaaS product",
      "Agencies building client products faster",
      "Enterprise teams standardizing their stack",
      "Hackathon teams shipping MVPs quickly",
    ],
  },
  {
    slug: "cloud-migration-planner",
    name: "MigrateIQ",
    tagline:
      "Interactive cloud migration planning tool with timeline and cost calculator.",
    description:
      "MigrateIQ helps you plan cloud migrations without the guesswork. Map your existing infrastructure, define target architecture, and get an interactive timeline with dependency tracking, risk assessment, and cost projections for the entire migration journey.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "ArrowRightLeft",
    features: [
      "Infrastructure inventory mapping",
      "Dependency graph and migration ordering",
      "Risk assessment and mitigation planning",
      "Cost comparison: current vs. cloud",
      "Interactive Gantt chart timeline",
      "Export migration plan as PDF",
    ],
    techStack: ["Next.js", "React Flow", "D3.js", "PostgreSQL", "React PDF"],
    status: "live",
    productUrl: "https://migrate.cloudrix.io",
    pricing: "free",
    howItWorks: [
      { step: "1", title: "Map Infrastructure", description: "List your servers, databases, and services. Or import from AWS/Azure discovery tools." },
      { step: "2", title: "Plan Migration Waves", description: "Group workloads into migration waves based on dependencies and risk." },
      { step: "3", title: "Get Your Plan", description: "Download a detailed migration plan with timeline, cost estimates, and risk mitigations." },
    ],
    useCases: [
      "Companies planning on-premise to cloud migration",
      "Teams evaluating multi-cloud strategies",
      "Consultants preparing migration proposals",
      "CTOs building business cases for cloud adoption",
    ],
  },
  {
    slug: "devops-dashboard",
    name: "DevOps Dashboard",
    tagline:
      "Real-time CI/CD pipeline monitoring, deployment tracking, and incident management.",
    description:
      "Get a single pane of glass for your entire DevOps operation. DevOps Dashboard aggregates data from GitHub Actions, GitLab CI, Jenkins, and ArgoCD to show pipeline status, deployment frequency, lead time, and MTTR across all your services.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "LayoutDashboard",
    features: [
      "Multi-provider pipeline aggregation",
      "DORA metrics tracking (deploy frequency, lead time, MTTR, CFR)",
      "Deployment history with rollback triggers",
      "Incident timeline and post-mortem tracking",
      "Team and service-level dashboards",
      "Slack and PagerDuty integrations",
    ],
    techStack: ["Next.js", "WebSocket", "PostgreSQL", "Redis", "Chart.js", "GitHub API"],
    status: "beta",
    productUrl: "https://devops.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Connect CI/CD Tools", description: "Integrate GitHub Actions, GitLab CI, Jenkins, or ArgoCD with API keys." },
      { step: "2", title: "Configure Dashboards", description: "Set up team views, service groups, and alerting thresholds." },
      { step: "3", title: "Monitor & Improve", description: "Track DORA metrics, spot bottlenecks, and improve deployment reliability." },
    ],
    useCases: [
      "Engineering managers tracking team velocity",
      "DevOps teams monitoring pipeline health",
      "CTOs reporting on engineering metrics",
      "Platform teams managing multi-service deployments",
    ],
  },
  {
    slug: "api-monitor",
    name: "API Monitor",
    tagline:
      "Uptime monitoring, latency tracking, and alerting for your APIs.",
    description:
      "API Monitor checks your endpoints every 30 seconds from 12 global locations. Track uptime, response times, SSL certificate expiry, and content validation. Get alerted via Slack, email, or PagerDuty before your customers notice issues.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "Activity",
    features: [
      "30-second check intervals from 12 global locations",
      "Latency percentile tracking (p50, p95, p99)",
      "SSL certificate expiry monitoring",
      "Response body and header validation",
      "Multi-step API transaction monitoring",
      "Public status page included",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "WebSocket"],
    status: "live",
    productUrl: "https://monitor.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Add Endpoints", description: "Paste your API URLs and configure expected response codes and content." },
      { step: "2", title: "Configure Alerts", description: "Set up Slack, email, or PagerDuty notifications for downtime and degradation." },
      { step: "3", title: "Track Performance", description: "View uptime history, latency trends, and incident reports from a central dashboard." },
    ],
    useCases: [
      "SaaS companies monitoring production APIs",
      "E-commerce platforms ensuring checkout availability",
      "Fintech companies meeting SLA requirements",
      "Teams running microservice architectures",
    ],
  },
  {
    slug: "tech-stack-advisor",
    name: "StackPilot",
    tagline:
      "Answer 5 questions, get a battle-tested tech stack recommendation.",
    description:
      "Choosing a tech stack is one of the most impactful decisions in any project. StackPilot asks you five targeted questions about your project requirements, team skills, and scale expectations, then recommends a proven technology combination with pros, cons, and alternatives.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "Compass",
    features: [
      "Guided 5-question assessment",
      "Recommendations based on 50+ real project outcomes",
      "Pros, cons, and alternative suggestions",
      "Team skill gap analysis",
      "Scalability and maintenance cost projections",
      "Shareable recommendation report",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "live",
    productUrl: "https://www.cloudrix.io/products/tech-stack-advisor",
    pricing: "free",
    howItWorks: [
      { step: "1", title: "Answer Questions", description: "Tell us about your project type, scale, team, timeline, and constraints." },
      { step: "2", title: "Get Recommendations", description: "Receive a ranked list of tech stacks with detailed pros and cons." },
      { step: "3", title: "Compare & Decide", description: "Compare alternatives side-by-side and share the report with your team." },
    ],
    useCases: [
      "Startups choosing their founding tech stack",
      "CTOs evaluating migration options",
      "Teams starting a new greenfield project",
      "Non-technical founders understanding technology choices",
    ],
  },
  {
    slug: "security-scanner",
    name: "SecureScan",
    tagline:
      "Automated security scanning for web applications (OWASP Top 10).",
    description:
      "SecureScan runs automated security tests against your web application, checking for OWASP Top 10 vulnerabilities, misconfigured headers, exposed secrets, and outdated dependencies. Get a prioritized report with fix instructions, not just a list of CVEs.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "ShieldAlert",
    features: [
      "OWASP Top 10 vulnerability scanning",
      "HTTP header and CORS misconfiguration checks",
      "Exposed secrets and API key detection",
      "Dependency vulnerability scanning (SCA)",
      "Prioritized report with fix instructions",
      "Scheduled scans with trend tracking",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Puppeteer", "NMAP", "Docker"],
    status: "beta",
    productUrl: "https://scan.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Enter Your URL", description: "Provide your web application URL and authentication details if needed." },
      { step: "2", title: "Scan Runs", description: "Our scanner checks for vulnerabilities, misconfigurations, and exposed data." },
      { step: "3", title: "Fix & Rescan", description: "Get a prioritized report with fix instructions. Rescan to verify remediation." },
    ],
    useCases: [
      "Teams preparing for penetration tests",
      "Companies meeting compliance requirements (SOC 2, ISO 27001)",
      "Developers checking for common vulnerabilities pre-deploy",
      "Security teams monitoring web application posture",
    ],
  },
  {
    slug: "cost-calculator",
    name: "Cloud Cost Calculator",
    tagline:
      "Estimate infrastructure costs across AWS, Azure, and GCP.",
    description:
      "Compare cloud infrastructure costs across all three major providers in one place. Configure compute, storage, database, and networking resources and see real-time price comparisons with monthly and annual projections. No more switching between three pricing pages.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "Calculator",
    features: [
      "Side-by-side pricing for AWS, Azure, and GCP",
      "Compute, storage, database, and networking estimates",
      "Reserved vs. on-demand pricing comparison",
      "Data transfer cost calculation",
      "Exportable cost breakdown (CSV, PDF)",
      "Saved configurations for scenario planning",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    status: "live",
    productUrl: "https://www.cloudrix.io/calculator",
    pricing: "free",
    howItWorks: [
      { step: "1", title: "Configure Resources", description: "Select compute instances, storage volumes, databases, and networking." },
      { step: "2", title: "Compare Providers", description: "See real-time price comparisons across AWS, Azure, and GCP." },
      { step: "3", title: "Export Estimate", description: "Download the cost breakdown as CSV or PDF for budget planning." },
    ],
    useCases: [
      "Teams evaluating cloud providers for new projects",
      "Finance teams budgeting infrastructure costs",
      "Architects designing cost-efficient architectures",
      "Companies negotiating enterprise cloud contracts",
    ],
  },
  {
    slug: "status-page",
    name: "StatusPage",
    tagline:
      "Beautiful, customizable status page for your services.",
    description:
      "StatusPage gives your customers a professional, real-time view of your system health. Set up in minutes with custom branding, automated incident updates, scheduled maintenance windows, and subscriber notifications via email and SMS.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "CheckCircle",
    features: [
      "Custom domain and branding",
      "Real-time component status updates",
      "Automated incident creation from monitoring tools",
      "Scheduled maintenance windows",
      "Email and SMS subscriber notifications",
      "Historical uptime graphs (90-day)",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Resend", "Twilio"],
    status: "live",
    productUrl: "https://status.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Set Up Components", description: "Define your services and components (API, web app, database, etc.)." },
      { step: "2", title: "Customize & Brand", description: "Add your logo, colors, and custom domain. Goes live in minutes." },
      { step: "3", title: "Manage Incidents", description: "Create incidents manually or automatically from your monitoring tools." },
    ],
    useCases: [
      "SaaS companies building customer trust",
      "API providers communicating uptime",
      "E-commerce platforms during high-traffic events",
      "Enterprise teams managing internal service status",
    ],
  },
  {
    slug: "db-migration-tool",
    name: "DBMigrate",
    tagline:
      "Database migration tool with zero-downtime schema changes.",
    description:
      "DBMigrate takes the risk out of database schema changes. It generates migration scripts, validates them against your production schema, simulates the migration on a shadow database, and executes with zero-downtime strategies like expand-and-contract patterns.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "DatabaseZap",
    features: [
      "Schema diff and migration script generation",
      "Shadow database migration simulation",
      "Zero-downtime migration strategies",
      "Rollback plan generation for every migration",
      "Support for PostgreSQL, MySQL, and MongoDB",
      "CI/CD integration for automated migrations",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Docker", "GitHub Actions"],
    status: "coming-soon",
    productUrl: "https://dbmigrate.cloudrix.io",
    pricing: "open-source",
    howItWorks: [
      { step: "1", title: "Connect Database", description: "Provide read-only access to your database for schema analysis." },
      { step: "2", title: "Define Changes", description: "Describe schema changes or let DBMigrate detect drift from your models." },
      { step: "3", title: "Simulate & Execute", description: "Run the migration on a shadow DB first, then execute with zero-downtime." },
    ],
    useCases: [
      "Teams deploying database changes to production",
      "Companies migrating between database engines",
      "DevOps teams automating schema management",
      "Startups needing safe database evolution",
    ],
  },
  {
    slug: "performance-profiler",
    name: "PerfProfiler",
    tagline:
      "Web application performance profiler with Core Web Vitals tracking.",
    description:
      "PerfProfiler continuously monitors your web application's performance from real user browsers. Track Core Web Vitals (LCP, FID, CLS), identify slow pages, and get actionable optimization recommendations backed by before-and-after projections.",
    category: "engineering-tools",
    categoryLabel: "Engineering Tool",
    icon: "Gauge",
    features: [
      "Core Web Vitals monitoring (LCP, FID, CLS, INP)",
      "Real User Monitoring (RUM) data collection",
      "Page-level performance breakdown",
      "Optimization recommendations with impact estimates",
      "Performance regression alerts",
      "Lighthouse score tracking over time",
    ],
    techStack: ["Next.js", "Web Vitals API", "PostgreSQL", "Chart.js", "WebSocket"],
    status: "beta",
    productUrl: "https://perf.cloudrix.io",
    pricing: "freemium",
    howItWorks: [
      { step: "1", title: "Add Script Tag", description: "Add a lightweight snippet to your site. It collects real user performance data." },
      { step: "2", title: "Analyze Performance", description: "View Core Web Vitals, page load breakdowns, and slowest pages." },
      { step: "3", title: "Optimize & Track", description: "Follow recommendations, deploy fixes, and track improvement over time." },
    ],
    useCases: [
      "E-commerce sites optimizing conversion rates",
      "SaaS products improving user experience",
      "Marketing teams monitoring landing page speed",
      "SEO teams tracking Core Web Vitals for rankings",
    ],
  },
];

/** Helper to get products by category */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

/** Helper to get a product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Helper to get related products (same category, excluding current) */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return products
    .filter((p) => p.category === current.category && p.slug !== slug)
    .slice(0, limit);
}
