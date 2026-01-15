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
      "English & French fluency",
      "Agile / Scrum experience",
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
  "Other",
];

export const budgetRanges = [
  "Under 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 100,000",
  "100,000+",
  "Not sure yet",
];

export const timelines = [
  "Immediate (within 2 weeks)",
  "Short-term (1-2 months)",
  "Medium-term (3-6 months)",
  "Long-term / Ongoing",
  "Just exploring",
];
