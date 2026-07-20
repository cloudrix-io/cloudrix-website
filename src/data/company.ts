import { ProcessStep, TeamMember } from "@/types";

export const companyInfo = {
  name: "Cloudrix",
  tagline: "AI & IT Products for Modern Businesses",
  description:
    "We build AI & IT products used by companies worldwide. 24 production-ready SaaS tools for monitoring, security, compliance, and automation — from API Monitor and CodeScan AI to EU AI Act Scanner and StatusPage. Free tiers available on every product. We also offer select consulting and engineering services for enterprise clients by request.",
  founded: 2024,
  kvk: "94892610",
  location: "Tilburg, Netherlands",
  email: "contact@cloudrix.io",
  phone: "+31 6 43166305",
  linkedin: "https://linkedin.com/company/cloudrix",
  github: "https://github.com/cloudrix",
};

export const trustPoints = [
  {
    title: "EU Standards",
    description: "GDPR-compliant, secure delivery practices",
  },
  {
    title: "Multi-Currency Invoicing",
    description: "Invoice in EUR, USD, GBP, or AED",
  },
  {
    title: "Remote-First",
    description: "Async communication, global timezone flexibility",
  },
  {
    title: "Secure Delivery",
    description: "NDA, access control, data protection",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We start with a free consultation to understand your challenges, goals, and constraints. No sales pitch just an honest assessment of how we can help.",
    duration: "1-2 calls",
  },
  {
    step: 2,
    title: "Proposal",
    description:
      "You receive a detailed proposal with scope, timeline, deliverables, and transparent pricing. We break down complex projects into clear milestones.",
    duration: "2-3 days",
  },
  {
    step: 3,
    title: "Delivery",
    description:
      "We work in agile sprints with regular updates and demos. You have full visibility into progress through shared project management tools.",
    duration: "Varies by project",
  },
  {
    step: 4,
    title: "Support",
    description:
      "Post-delivery support and knowledge transfer included. We ensure your team can maintain and extend what we build. Optional ongoing support available.",
    duration: "Ongoing",
  },
];

export const technologies = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
  cloud: ["AWS", "GCP", "Azure", "Kubernetes", "Docker"],
  devops: ["Terraform", "GitHub Actions", "GitLab CI", "Datadog"],
  ai: [
    "Claude / Anthropic",
    "OpenAI GPT-4/5",
    "Google Gemini",
    "LangChain / LangGraph",
    "LlamaIndex",
    "Anthropic Agent SDK",
    "vLLM",
    "Pinecone / Weaviate / pgvector",
    "LangFuse",
    "MCP Servers",
  ],
  practices: [
    "Infrastructure as Code",
    "CI/CD",
    "Observability",
    "Security by Design",
  ],
};

export const securityPractices = [
  {
    title: "NDA Available",
    description:
      "We sign NDAs before any sensitive information is shared. Your intellectual property is protected.",
  },
  {
    title: "Access Control",
    description:
      "Least-privilege access to your systems. We only request the permissions we need.",
  },
  {
    title: "Secure Development",
    description:
      "Code reviews, security scanning, and best practices baked into our development process.",
  },
  {
    title: "Data Protection",
    description:
      "GDPR-aligned data handling. Clear data retention policies and secure disposal.",
  },
  {
    title: "Encrypted Communication",
    description:
      "All sensitive communication through encrypted channels. No data in plain text.",
  },
  {
    title: "Audit Trail",
    description:
      "Complete documentation of access, changes, and decisions throughout the engagement.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Firas Sayah",
    role: "Founder & Lead Engineer",
    bio: "Full-stack engineer with 8+ years of experience building production systems. Previously worked with companies across Europe, specializing in cloud architecture and scalable applications.",
    linkedin: "https://linkedin.com/in/firassayah",
  },
];

export const stats = [
  { value: "8+", label: "Years Engineering Experience" },
  { value: "NL", label: "KVK-Registered Entity" },
  { value: "24/7", label: "Global Timezone Coverage" },
  { value: "24h", label: "Response Time" },
];

export const aiCapabilities = [
  {
    title: "LLM Providers",
    items: [
      "Anthropic Claude",
      "OpenAI GPT-4/5",
      "Google Gemini",
      "Llama / Mistral / Qwen (on-premise)",
    ],
  },
  {
    title: "Agent Frameworks",
    items: [
      "LangChain / LangGraph",
      "LlamaIndex",
      "CrewAI",
      "Anthropic Agent SDK",
      "OpenAI Agents SDK",
    ],
  },
  {
    title: "Infrastructure",
    items: ["vLLM", "Ollama", "NVIDIA NIM", "AWS Bedrock", "Azure OpenAI"],
  },
  {
    title: "Vector Databases",
    items: ["Pinecone", "Weaviate", "Chroma", "Qdrant", "pgvector"],
  },
  {
    title: "Monitoring & Ops",
    items: [
      "LangFuse",
      "Datadog AI Monitoring",
      "Weights & Biases",
      "MLflow",
    ],
  },
  {
    title: "Integration",
    items: [
      "MCP Servers",
      "n8n Workflows",
      "Custom API Orchestration",
      "Data Residency Enforcement",
    ],
  },
];
