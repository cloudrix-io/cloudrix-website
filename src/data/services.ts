import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "cloud-architecture",
    title: "Cloud Architecture & Migration",
    description:
      "Design and implement scalable cloud infrastructure on AWS, GCP, or Azure. Migrate legacy systems with zero downtime.",
    icon: "Cloud",
    problem: "Legacy infrastructure is expensive to maintain and doesn't scale",
    solution:
      "Modern cloud architecture with auto-scaling, cost optimization, and high availability",
    result: "40-60% reduction in infrastructure costs with improved reliability",
    features: [
      "Cloud-native architecture design",
      "Legacy system migration",
      "Multi-cloud strategies",
      "Cost optimization audits",
      "Infrastructure as Code (Terraform/Pulumi)",
      "Kubernetes orchestration",
    ],
  },
  {
    id: "full-stack-development",
    title: "Full-Stack Development",
    description:
      "Build production-ready applications with modern frameworks. From MVPs to enterprise-grade systems.",
    icon: "Code",
    problem: "Need to ship features faster without compromising quality",
    solution:
      "Battle-tested stack with React/Next.js, Node.js, and scalable databases",
    result: "Faster time-to-market with maintainable, well-documented code",
    features: [
      "React / Next.js applications",
      "Node.js / Python backends",
      "REST & GraphQL APIs",
      "Database design (PostgreSQL, MongoDB)",
      "Real-time features (WebSockets)",
      "Third-party integrations",
    ],
  },
  {
    id: "devops-automation",
    title: "DevOps & Automation",
    description:
      "Implement CI/CD pipelines, monitoring, and observability. Automate everything that should be automated.",
    icon: "Settings",
    problem: "Manual deployments are slow, error-prone, and blocking releases",
    solution:
      "Fully automated CI/CD with testing, security scanning, and rollback capabilities",
    result: "Deploy multiple times per day with confidence",
    features: [
      "CI/CD pipeline setup (GitHub Actions, GitLab CI)",
      "Docker containerization",
      "Automated testing strategies",
      "Monitoring & alerting (Datadog, Grafana)",
      "Log aggregation & analysis",
      "Security scanning integration",
    ],
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting & Audit",
    description:
      "Get expert advice on architecture decisions, code quality, and technical strategy. Independent audits and recommendations.",
    icon: "MessageSquare",
    problem: "Uncertain about technical decisions or existing system health",
    solution:
      "Deep-dive analysis with actionable recommendations and prioritized roadmap",
    result: "Clear direction with reduced technical risk",
    features: [
      "Architecture review & recommendations",
      "Code quality audits",
      "Security assessments",
      "Performance optimization",
      "Technical due diligence",
      "Team mentoring & training",
    ],
  },
  {
    id: "staff-augmentation",
    title: "Team Extension & Staff Augmentation",
    description:
      "Extend your engineering capacity with senior developers who integrate seamlessly with your team.",
    icon: "Users",
    problem: "Need to scale development capacity without long hiring cycles",
    solution:
      "Experienced engineers who understand EU work culture and communication standards",
    result: "Immediate capacity boost with zero ramp-up friction",
    features: [
      "Senior full-stack developers",
      "DevOps / SRE engineers",
      "Technical leads",
      "EU timezone coverage",
      "Multilingual communication",
      "Agile / Scrum experience",
    ],
  },
  {
    id: "ai-agent-development",
    title: "AI Agent Development & Deployment",
    description:
      "Design, build, and deploy production-grade AI agents that automate complex workflows. Only 17% of organizations have successfully deployed AI agents — we bridge the gap between prototype and production.",
    icon: "Bot",
    problem:
      "88% of AI agent projects fail before reaching production due to reliability, hallucination, and integration challenges",
    solution:
      "Battle-tested agent architectures with robust error handling, human-in-the-loop safeguards, and seamless integration with existing systems",
    result:
      "Production AI agents deployed in weeks, not months — with measurable ROI from €30K-€200K engagements",
    features: [
      "Multi-step autonomous agent design",
      "Tool-use and function-calling architectures",
      "Human-in-the-loop escalation workflows",
      "Agent evaluation and testing frameworks",
      "Production monitoring and observability",
      "Cost optimization and token management",
    ],
  },
  {
    id: "rag-systems",
    title: "RAG System Development",
    description:
      "Build Retrieval-Augmented Generation systems that give LLMs accurate, up-to-date access to your enterprise data. RAG represents 38% of enterprise LLM revenue — for good reason.",
    icon: "Database",
    problem:
      "LLMs hallucinate and lack access to your proprietary data, making them unreliable for business-critical applications",
    solution:
      "Custom RAG pipelines with advanced chunking, hybrid search, re-ranking, and citation tracking for verifiable AI responses",
    result:
      "AI systems that answer accurately from your data with full source attribution and minimal hallucination",
    features: [
      "Document ingestion and intelligent chunking",
      "Vector database setup (Pinecone, Weaviate, pgvector)",
      "Hybrid search (semantic + keyword)",
      "Re-ranking and relevance optimization",
      "Citation tracking and source attribution",
      "Multi-format support (PDF, docs, databases, APIs)",
    ],
  },
  {
    id: "eu-ai-act-compliance",
    title: "EU AI Act Compliance Consulting",
    description:
      "Navigate the EU AI Act with confidence. The €609M compliance market is growing fast, with fines up to €35M or 7% of global turnover for non-compliance. The August 2, 2026 deadline is approaching.",
    icon: "Scale",
    problem:
      "Organizations face massive fines and operational disruption if their AI systems don't comply with the EU AI Act by the August 2026 deadline",
    solution:
      "End-to-end compliance program: AI system inventory, risk classification, Fundamental Rights Impact Assessments, technical controls, and governance frameworks",
    result:
      "Full EU AI Act compliance with documented evidence, reducing fine exposure by 95%+ and positioning AI systems for long-term regulatory success",
    features: [
      "AI system inventory and risk classification",
      "Fundamental Rights Impact Assessments (FRIA)",
      "Technical compliance controls implementation",
      "Bias monitoring and fairness testing",
      "Human oversight mechanism design",
      "Compliance documentation and audit preparation",
    ],
  },
  {
    id: "conversational-ai",
    title: "Conversational AI & Voice Agents",
    description:
      "Build intelligent conversational interfaces and voice agents that handle real customer interactions. With 340% YoY growth and 78% of top banks already using voice AI, this is the fastest-growing AI category.",
    icon: "MessageSquare",
    problem:
      "Customer service teams are overwhelmed, wait times are unacceptable, and traditional chatbots frustrate users with rigid scripts",
    solution:
      "Context-aware conversational AI with natural language understanding, multi-turn dialogue management, and seamless human handoff",
    result:
      "60-80% of routine inquiries handled automatically with higher customer satisfaction than human-only support",
    features: [
      "Multi-channel deployment (web, phone, WhatsApp, Teams)",
      "Natural language understanding and intent detection",
      "Multi-turn conversation management",
      "Voice agent development and telephony integration",
      "Sentiment analysis and escalation triggers",
      "Multi-language support (EN, DE, NL, FR, and more)",
    ],
  },
  {
    id: "mcp-development",
    title: "MCP Server Development",
    description:
      "Build Model Context Protocol (MCP) servers that connect AI assistants to your tools and data. With 97M monthly SDK downloads and native support in Claude, ChatGPT, Gemini, and Copilot, MCP is the universal standard for AI integration.",
    icon: "Network",
    problem:
      "AI assistants are isolated from your internal tools, databases, and workflows — requiring manual copy-paste or custom integrations for each provider",
    solution:
      "Standards-compliant MCP servers that expose your systems to any AI assistant, with authentication, rate limiting, and audit logging built in",
    result:
      "AI assistants that can directly query your databases, trigger workflows, and access internal tools — securely and across all major AI platforms",
    features: [
      "Custom MCP server development",
      "Tool and resource endpoint design",
      "Authentication and authorization integration",
      "Rate limiting and usage monitoring",
      "Multi-transport support (stdio, SSE, HTTP)",
      "Integration with Claude, ChatGPT, Gemini, and Copilot",
    ],
  },
  {
    id: "llm-integration",
    title: "LLM Integration & API Orchestration",
    description:
      "Integrate large language models into your applications with multi-provider support, intelligent fallback, and cost optimization. Stop being locked into a single AI provider.",
    icon: "Workflow",
    problem:
      "Direct LLM API integration is fragile, expensive, and creates vendor lock-in with no fallback when providers have outages",
    solution:
      "Unified AI orchestration layer with automatic failover, cost-based routing, response caching, and provider-agnostic abstractions",
    result:
      "Resilient AI-powered features with 30-50% lower costs through intelligent routing and caching",
    features: [
      "Multi-provider orchestration (Anthropic, OpenAI, Google)",
      "Automatic failover and retry logic",
      "Cost optimization and token budgeting",
      "Response caching and deduplication",
      "Prompt management and versioning",
      "Usage analytics and cost dashboards",
    ],
  },
  {
    id: "ai-infrastructure",
    title: "AI Infrastructure & MLOps",
    description:
      "Set up production AI infrastructure: GPU clusters, model serving, monitoring, and CI/CD for machine learning. The foundation that makes everything else work reliably.",
    icon: "Cpu",
    problem:
      "AI models work in notebooks but fail in production — no reliable serving, no monitoring, no reproducibility, and GPU costs spiraling out of control",
    solution:
      "Production-grade ML infrastructure with optimized model serving, automated pipelines, comprehensive monitoring, and cost-efficient GPU utilization",
    result:
      "AI systems that run reliably at scale with full observability, automated retraining, and optimized infrastructure costs",
    features: [
      "GPU cluster setup and optimization",
      "Model serving with vLLM and NVIDIA NIM",
      "ML pipeline automation (training, evaluation, deployment)",
      "Model monitoring and drift detection",
      "CI/CD for machine learning workflows",
      "Cost optimization for GPU and inference workloads",
    ],
  },
];

export const problemTypes = [
  "Cloud Migration",
  "New Product Development",
  "Legacy System Modernization",
  "Performance Issues",
  "Security Audit",
  "DevOps Implementation",
  "Team Augmentation",
  "Technical Consulting",
  "AI Agent Development",
  "AI/LLM Integration",
  "EU AI Act Compliance",
  "RAG System",
  "Conversational AI / Voice",
  "Other",
];

export const budgetRanges = [
  "Under 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 100,000",
  "100,000 - 200,000",
  "200,000+",
  "Not sure yet",
];

export const timelines = [
  "Immediate (within 2 weeks)",
  "Short-term (1-2 months)",
  "Medium-term (3-6 months)",
  "Long-term / Ongoing",
  "Just exploring",
];
