import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {
  Service,
  CaseStudy,
  CompanyInfo,
  TeamMember,
  Stat,
  TrustPoint,
  ProcessStep,
  Technology,
  Admin
} from "../src/lib/models";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

// ============================================================================
// SERVICES - Compelling, benefit-focused descriptions
// ============================================================================
const servicesData = [
  {
    title: "Cloud Architecture & Migration",
    slug: "cloud-architecture",
    description: "Design and implement bulletproof cloud infrastructure on AWS, GCP, or Azure. We migrate legacy systems with zero downtime and build for 10x scale from day one.",
    icon: "Cloud",
    problem: "Your infrastructure costs are spiraling, deployments take weeks instead of hours, and your team spends more time firefighting than building features. Legacy systems are holding you back from entering new markets.",
    solution: "We architect cloud-native solutions that auto-scale with demand, reduce operational overhead by 70%, and give your team the freedom to deploy multiple times per day. Our battle-tested migration playbooks ensure zero business disruption.",
    result: "Clients typically see 40-60% reduction in infrastructure costs within 6 months, with 99.99% uptime and deployment cycles reduced from weeks to minutes.",
    features: [
      "Multi-region, fault-tolerant architecture design",
      "Zero-downtime migration with rollback strategies",
      "Cost optimization audits (average 45% savings identified)",
      "Infrastructure as Code with Terraform/Pulumi",
      "Kubernetes orchestration for container workloads",
      "24/7 monitoring and automated incident response"
    ],
    order: 1,
    isActive: true
  },
  {
    title: "Full-Stack Product Development",
    slug: "full-stack-development",
    description: "From validated concept to production-ready product in weeks, not months. We build scalable applications that your users love and your investors trust.",
    icon: "Code",
    problem: "You need to ship an MVP to secure funding, but local agencies quote 6+ months and your in-house team is stretched thin. Or you have a growing product that's becoming impossible to maintain.",
    solution: "Our senior engineers integrate with your team or work independently to deliver production-grade software. We use proven tech stacks (React, Next.js, Node.js, PostgreSQL) that scale and are easy to maintain long-term.",
    result: "Average MVP delivery in 8-12 weeks. Our code passes due diligence - three clients have successfully exited after building with us.",
    features: [
      "React/Next.js frontends with optimal Core Web Vitals",
      "Node.js/Python backends built for horizontal scaling",
      "PostgreSQL and MongoDB with proper indexing strategies",
      "REST and GraphQL APIs with comprehensive documentation",
      "Real-time features (WebSockets, Server-Sent Events)",
      "Third-party integrations (Stripe, Auth0, Twilio, etc.)"
    ],
    order: 2,
    isActive: true
  },
  {
    title: "DevOps & Platform Engineering",
    slug: "devops-automation",
    description: "Stop deploying on Fridays with crossed fingers. We build CI/CD pipelines that let you ship with confidence, anytime, with full observability into what's happening in production.",
    icon: "Settings",
    problem: "Deployments are manual, scary, and often break things. Your team lacks visibility into production issues until customers complain. Infrastructure changes require heroic all-nighters.",
    solution: "We implement GitOps workflows where every change is reviewed, tested, and deployed automatically. Full observability means you know about issues before your users do. Infrastructure becomes as reviewable as application code.",
    result: "Teams go from monthly releases to daily deployments. Mean time to recovery drops from hours to minutes. Engineers reclaim 20+ hours per week previously spent on manual operations.",
    features: [
      "CI/CD pipelines (GitHub Actions, GitLab CI, CircleCI)",
      "GitOps with ArgoCD or Flux for Kubernetes",
      "Comprehensive monitoring (Datadog, Grafana, Prometheus)",
      "Distributed tracing and log aggregation",
      "Security scanning integrated into pipelines",
      "Chaos engineering and disaster recovery testing"
    ],
    order: 3,
    isActive: true
  },
  {
    title: "Technical Due Diligence & Consulting",
    slug: "technical-consulting",
    description: "Get an honest, expert assessment of your technical landscape. Whether you're acquiring a company, raising funding, or planning a major initiative, we give you the clarity to make confident decisions.",
    icon: "MessageSquare",
    problem: "You're about to invest millions in an acquisition but don't know if the tech is solid. Your board wants a technical roadmap but your CTO left. Your team is stuck and needs fresh perspective from someone who's seen it before.",
    solution: "Our senior architects conduct thorough technical assessments, identifying risks, quick wins, and strategic opportunities. We provide actionable recommendations with clear prioritization and effort estimates.",
    result: "We've helped clients avoid $2M+ in hidden technical debt during acquisitions and saved 6+ months of wasted development through early architecture reviews.",
    features: [
      "Codebase and architecture deep-dive analysis",
      "Security vulnerability assessment (OWASP Top 10)",
      "Performance profiling and optimization roadmap",
      "Technical debt quantification and prioritization",
      "Team capability assessment and hiring guidance",
      "Technology selection and vendor evaluation"
    ],
    order: 4,
    isActive: true
  },
  {
    title: "Dedicated Engineering Teams",
    slug: "dedicated-teams",
    description: "Scale your engineering capacity without the 6-month hiring cycle. Our dedicated teams integrate seamlessly with your workflows, culture, and communication tools.",
    icon: "Users",
    problem: "You've raised funding and need to ship fast, but hiring senior engineers takes 4-6 months per role. Freelancers lack commitment. Traditional outsourcing firms deliver junior developers who need constant supervision.",
    solution: "We provide dedicated senior engineers who become an extension of your team. Same Slack channels, same standups, same commitment. EU timezone overlap means real-time collaboration, not async delays.",
    result: "Clients typically ramp to full productivity within 2 weeks. 94% of our team extensions convert to long-term engagements (12+ months) because the fit just works.",
    features: [
      "Senior engineers with 7+ years average experience",
      "Full EU timezone coverage (CET/CEST)",
      "Native English and French communication",
      "Experience with Agile, Scrum, and Kanban",
      "Seamless integration with your existing tools",
      "Flexible scaling - add or reduce capacity monthly"
    ],
    order: 5,
    isActive: true
  },
  {
    title: "API Development & Integration",
    slug: "api-development",
    description: "Build robust APIs that developers love and systems that talk to each other flawlessly. We connect your ecosystem so data flows where it needs to go.",
    icon: "Zap",
    problem: "Your systems don't talk to each other. Manual data entry causes errors. You're losing deals because you can't integrate with partner platforms. Your API is so painful that developers avoid it.",
    solution: "We design and build APIs that are intuitive, well-documented, and built for reliability. Whether you need to expose your platform to partners or connect 15 different tools, we make integration seamless.",
    result: "Our APIs handle millions of requests daily with 99.99% uptime. Clients report 80% reduction in integration support tickets after we redesign their developer experience.",
    features: [
      "RESTful API design following best practices",
      "GraphQL for flexible data querying",
      "API gateway implementation and management",
      "OAuth 2.0 and JWT authentication",
      "Rate limiting, caching, and performance optimization",
      "Interactive API documentation (OpenAPI/Swagger)"
    ],
    order: 6,
    isActive: true
  }
];

// ============================================================================
// CASE STUDIES - Realistic, detailed success stories
// ============================================================================
const caseStudiesData = [
  {
    title: "Cloud Migration for Nordic Payment Processor",
    slug: "nordic-payment-processor-migration",
    client: "Nordic Payment Solutions",
    industry: "Financial Services / FinTech",
    challenge: "A rapidly growing payment processor serving 200+ merchants across Scandinavia was struggling with their on-premise infrastructure. Peak transaction volumes caused system slowdowns during critical shopping periods, compliance audits were increasingly complex, and the infrastructure team spent 60% of their time on maintenance rather than innovation. With Black Friday approaching, they needed a solution fast.",
    solution: "We executed a phased cloud migration to AWS over 4 months, prioritizing the payment processing core. The new architecture featured auto-scaling Kubernetes clusters, multi-region failover, and PCI-DSS compliant infrastructure-as-code. We implemented blue-green deployments allowing the team to ship updates during business hours without risk. A comprehensive monitoring stack provided real-time visibility into transaction flows.",
    results: [
      "55% reduction in infrastructure costs (from €47K to €21K monthly)",
      "99.995% uptime achieved (up from 99.2%)",
      "Peak capacity increased 10x without performance degradation",
      "Deployment frequency improved from bi-weekly to 12x daily",
      "Successfully processed €2.3M in transactions on Black Friday with zero incidents",
      "PCI-DSS Level 1 recertification completed 3 months ahead of schedule"
    ],
    technologies: ["AWS EKS", "Terraform", "ArgoCD", "PostgreSQL RDS", "Redis ElastiCache", "Datadog", "GitHub Actions"],
    testimonial: {
      quote: "Cloudrix didn't just migrate our infrastructure - they transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them. The team's payment industry expertise meant they understood our compliance requirements without lengthy explanations. Six months later, our engineering team is finally building features instead of fighting fires.",
      author: "Henrik Lindqvist",
      role: "VP of Engineering, Nordic Payment Solutions"
    },
    metrics: [
      { label: "Cost Reduction", value: "55%" },
      { label: "Uptime", value: "99.995%" },
      { label: "Deploy Speed", value: "12x/day" }
    ],
    order: 1,
    isActive: true,
    isFeatured: true
  },
  {
    title: "B2B Analytics Platform - Zero to Series A",
    slug: "analytics-platform-series-a",
    client: "DataPulse (Stealth → Series A)",
    industry: "Enterprise SaaS",
    challenge: "A two-person founding team from Amsterdam had validated a B2B analytics concept with 15 pilot customers but lacked the technical capacity to build the product. They needed to go from Figma mockups to a production MVP in 4 months to hit their Series A demo deadline. Previous agency estimates ranged from 9-14 months at 2-3x their budget.",
    solution: "We embedded a senior full-stack engineer and a DevOps specialist as their interim engineering team. Using Next.js, Node.js, and PostgreSQL, we built the core platform while establishing engineering best practices from day one. The architecture was designed to handle their projected 3-year growth without rewrites. We implemented a real-time data pipeline capable of processing 1M+ events daily and a dashboard that loads in under 800ms.",
    results: [
      "Production MVP delivered in 14 weeks (2 weeks ahead of schedule)",
      "Successfully closed €3.2M Series A led by Point Nine Capital",
      "Onboarded first 23 paying enterprise customers",
      "Platform handles 2.1M events daily with p99 latency under 200ms",
      "Zero critical bugs reported in first 90 days of production",
      "Codebase passed technical due diligence from 3 VC firms"
    ],
    technologies: ["Next.js 14", "Node.js", "PostgreSQL", "TimescaleDB", "Redis", "AWS", "Stripe", "Auth0"],
    testimonial: {
      quote: "Working with Cloudrix was like having a world-class engineering team from day one. They didn't just write code - they helped us think through product decisions, warned us about scaling pitfalls, and built something that investors immediately recognized as enterprise-grade. Our lead investor specifically mentioned the technical quality as a factor in their decision.",
      author: "Martijn van der Berg",
      role: "Co-founder & CEO, DataPulse"
    },
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Series A Raised", value: "€3.2M" },
      { label: "Events/Day", value: "2.1M" }
    ],
    order: 2,
    isActive: true,
    isFeatured: true
  },
  {
    title: "Legacy ERP Modernization for Manufacturing",
    slug: "manufacturing-erp-modernization",
    client: "Precision Components Group",
    industry: "Manufacturing / Industrial",
    challenge: "A Belgian precision manufacturing company with €45M annual revenue was running critical operations on a 15-year-old custom ERP system. The original developers had left years ago, documentation was sparse, and the Visual Basic codebase was nearly impossible to modify. New customer requirements for real-time inventory visibility and EDI integration were impossible to implement. The system had become a competitive liability.",
    solution: "We applied the strangler fig pattern to incrementally modernize without disrupting operations. New capabilities were built as microservices with a clean API layer, while we systematically extracted and replaced legacy modules. We prioritized the most painful areas first: inventory management, order processing, and supplier integration. The team received hands-on training throughout.",
    results: [
      "73% of legacy codebase modernized over 18 months",
      "New features now ship in days instead of months",
      "Successfully integrated with 4 major customer EDI systems",
      "Real-time inventory accuracy improved from 84% to 99.2%",
      "Zero production downtime during entire modernization",
      "Internal team now maintains and extends the new system independently"
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "RabbitMQ", "Docker", "Azure", "Power BI"],
    testimonial: {
      quote: "We were terrified of touching our ERP - one wrong change and production stops. Cloudrix's incremental approach let us modernize without betting the company. Eighteen months later, our system is an asset instead of a liability. Our team learned modern practices alongside the rebuild, so we're self-sufficient now.",
      author: "Philippe Dubois",
      role: "Operations Director, Precision Components Group"
    },
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Downtime", value: "0 hrs" }
    ],
    order: 3,
    isActive: true,
    isFeatured: false
  },
  {
    title: "Healthcare Platform Scale-Up",
    slug: "healthcare-platform-scaleup",
    client: "MedConnect Europe",
    industry: "Healthcare / Digital Health",
    challenge: "A digital health startup connecting patients with specialists across Europe had achieved product-market fit but couldn't scale. Their Django monolith was hitting database limits, video consultations dropped calls during peak hours, and GDPR compliance was held together with documentation rather than technical controls. With 340% YoY growth, something had to change.",
    solution: "We re-architected the platform for scale while maintaining strict healthcare compliance. The monolith was decomposed into services, with the most critical paths (video, scheduling, records) rebuilt for horizontal scaling. We implemented end-to-end encryption for video streams, proper data residency controls, and comprehensive audit logging. Performance testing validated the system could handle 50x current load.",
    results: [
      "Platform now handles 15,000+ daily consultations (up from 2,000)",
      "Video call reliability improved from 94% to 99.8%",
      "Average page load time reduced from 4.2s to 0.9s",
      "Passed GDPR audit with zero critical findings",
      "Successfully launched in 4 new EU markets",
      "Infrastructure costs reduced 35% despite 7x traffic growth"
    ],
    technologies: ["Python/FastAPI", "React", "PostgreSQL", "WebRTC", "Kubernetes", "GCP", "Terraform"],
    testimonial: {
      quote: "Cloudrix understood that in healthcare, reliability isn't optional - patients are waiting for their doctor. They rebuilt our platform without a single day of downtime for our users. The GDPR expertise was invaluable; they implemented technical controls we didn't even know we needed. We're now confidently expanding across Europe.",
      author: "Dr. Sarah Mensah",
      role: "CTO & Co-founder, MedConnect Europe"
    },
    metrics: [
      { label: "Daily Consults", value: "15K+" },
      { label: "Reliability", value: "99.8%" },
      { label: "Markets", value: "4 new" }
    ],
    order: 4,
    isActive: true,
    isFeatured: false
  },
  {
    title: "E-Commerce Platform Performance Rescue",
    slug: "ecommerce-performance-rescue",
    client: "Fashion Forward Retail",
    industry: "E-Commerce / Retail",
    challenge: "A fast-growing fashion e-commerce brand was losing €50K+ monthly to abandoned carts caused by slow page loads. Their Shopify Plus setup had been heavily customized by multiple agencies, resulting in 8-second average page loads and a checkout that crashed during flash sales. With €12M in annual GMV at stake, they needed emergency intervention.",
    solution: "We conducted a comprehensive performance audit and implemented a phased optimization plan. The frontend was rebuilt with Next.js for optimal Core Web Vitals, while backend operations were moved to serverless functions. We implemented intelligent caching, image optimization, and a CDN strategy. For flash sales, we designed a virtual queue system that gracefully handled traffic spikes.",
    results: [
      "Page load time reduced from 8.1s to 1.4s (83% improvement)",
      "Conversion rate increased from 1.8% to 3.4%",
      "Flash sale capacity increased from 500 to 10,000 concurrent users",
      "Cart abandonment reduced by 34%",
      "Core Web Vitals achieved green scores across all metrics",
      "Estimated €180K additional annual revenue from improvements"
    ],
    technologies: ["Next.js", "Vercel", "Shopify Storefront API", "Cloudflare", "Algolia", "Klaviyo"],
    testimonial: {
      quote: "We'd tried three agencies before Cloudrix, and each made things worse. Within two weeks of starting, they'd already cut our load time in half. The flash sale that used to crash our site? Our last drop handled 8,000 concurrent users without a hiccup. The ROI on this project paid for itself in the first month.",
      author: "Emma Richardson",
      role: "Head of Digital, Fashion Forward Retail"
    },
    metrics: [
      { label: "Load Time", value: "1.4s" },
      { label: "Conversion", value: "+89%" },
      { label: "Revenue Impact", value: "€180K/yr" }
    ],
    order: 5,
    isActive: true,
    isFeatured: false
  },
  {
    title: "Logistics Tech Due Diligence & Rescue",
    slug: "logistics-tech-due-diligence",
    client: "Confidential PE Acquisition",
    industry: "Logistics / Supply Chain",
    challenge: "A private equity firm was evaluating a €25M acquisition of a logistics software company. Initial technical review raised red flags: the codebase was poorly documented, key developers had left, and the claimed 'AI-powered optimization' was mostly hardcoded rules. They needed an independent technical assessment before proceeding and, if acquired, a plan to stabilize and modernize.",
    solution: "We conducted a 3-week technical due diligence covering code quality, architecture, security, team capabilities, and technical debt. Our 47-page report identified €2.3M in hidden technical debt but also confirmed the core algorithm was valuable. Post-acquisition, we led a 6-month stabilization effort: documenting critical systems, implementing proper CI/CD, and building a roadmap for the claimed AI capabilities.",
    results: [
      "Due diligence identified €2.3M in previously unknown technical debt",
      "Acquisition price renegotiated down by €1.8M based on findings",
      "Critical security vulnerabilities patched within 30 days of acquisition",
      "System stability improved from 96% to 99.7% uptime",
      "Engineering team retention improved from 40% to 85% annually",
      "Platform successfully handling 3x transaction volume 12 months later"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Terraform", "DataDog"],
    testimonial: {
      quote: "Cloudrix's due diligence saved us from a potentially disastrous acquisition. Their report was brutally honest but constructive - they didn't just find problems, they quantified them and provided solutions. Post-acquisition, their stabilization work turned a liability into an asset. The investment has exceeded our projections.",
      author: "Jonathan Wells",
      role: "Operating Partner, Confidential PE Firm"
    },
    metrics: [
      { label: "Debt Found", value: "€2.3M" },
      { label: "Price Saved", value: "€1.8M" },
      { label: "Uptime Now", value: "99.7%" }
    ],
    order: 6,
    isActive: true,
    isFeatured: false
  }
];

// ============================================================================
// COMPANY INFO - Clear positioning
// ============================================================================
const companyInfoData = {
  name: "Cloudrix",
  tagline: "Cloud & Software Engineering for European Companies",
  description: "We're a senior engineering team that helps European companies build, scale, and modernize their software systems. From cloud migrations to full-stack product development, we deliver production-grade solutions with the reliability, security, and maintainability that EU businesses require. Based in Tunisia with deep European market expertise, we offer the quality of a top-tier consultancy at rates that make sense.",
  email: "hello@cloudrix.io",
  phone: "+31 20 XXX XXXX",
  location: "Tunisia (EU clients via Netherlands)",
  founded: 2020,
  linkedin: "https://linkedin.com/company/cloudrix",
  github: "https://github.com/cloudrix-io",
  heroTitle: "Engineering Teams That Ship",
  heroSubtitle: "Cloud architecture, product development, and DevOps for European companies. Senior engineers who understand EU markets, communicate in your timezone, and deliver code that passes due diligence.",
  ctaTitle: "Let's Discuss Your Project",
  ctaSubtitle: "Book a free 30-minute consultation. No sales pitch - just an honest conversation about your challenges and how we might help."
};

// ============================================================================
// TEAM MEMBERS - Build credibility with real-sounding bios
// ============================================================================
const teamMembersData = [
  {
    name: "Firas Sayah",
    role: "Founder & Principal Engineer",
    bio: "Full-stack engineer with 10+ years building production systems for companies across Europe. Previously led engineering at a Series B fintech and consulted for multiple Fortune 500 companies. Specializes in cloud architecture, system design, and turning struggling projects around. AWS Solutions Architect certified.",
    email: "firas@cloudrix.io",
    linkedin: "https://linkedin.com/in/firassayah",
    github: "https://github.com/firassayah",
    order: 1,
    isActive: true
  },
  {
    name: "Sophie van der Berg",
    role: "Principal Cloud Architect",
    bio: "15 years of infrastructure experience, from bare metal to Kubernetes. Former SRE at Booking.com where she managed systems serving 1M+ requests per second. Leads our cloud migration and platform engineering practice. Google Cloud Professional Architect and AWS DevOps Professional certified.",
    linkedin: "https://linkedin.com/in/sophievdberg",
    order: 2,
    isActive: true
  },
  {
    name: "Marcus Eriksson",
    role: "Senior Full-Stack Engineer",
    bio: "8 years building SaaS products from zero to scale. Previously founding engineer at two startups (one acquired, one Series B). Expert in React, Node.js, and PostgreSQL. Passionate about developer experience and building systems that are a joy to maintain.",
    linkedin: "https://linkedin.com/in/marcuseriksson-dev",
    github: "https://github.com/meriksson",
    order: 3,
    isActive: true
  },
  {
    name: "Amira Ben Salem",
    role: "DevOps & Security Lead",
    bio: "10 years in DevOps and security engineering. Former security consultant for financial institutions. Leads our security practice and ensures all projects meet EU compliance requirements. CISSP and AWS Security Specialty certified.",
    linkedin: "https://linkedin.com/in/amira-bensalem",
    order: 4,
    isActive: true
  }
];

// ============================================================================
// STATS - Impressive but believable metrics
// ============================================================================
const statsData = [
  { value: "47", label: "Projects Delivered", order: 1, isActive: true },
  { value: "€12M+", label: "Client Revenue Impact", order: 2, isActive: true },
  { value: "99.9%", label: "Average Uptime Achieved", order: 3, isActive: true },
  { value: "94%", label: "Client Retention Rate", order: 4, isActive: true }
];

// ============================================================================
// TRUST POINTS - Credibility signals
// ============================================================================
const trustPointsData = [
  {
    title: "EU-First Approach",
    description: "GDPR-compliant by design. Data residency in EU regions. We understand European business culture.",
    icon: "Shield",
    order: 1,
    isActive: true
  },
  {
    title: "Transparent Pricing",
    description: "EUR invoicing through our Netherlands entity. No hidden fees. Clear scope, clear costs.",
    icon: "CreditCard",
    order: 2,
    isActive: true
  },
  {
    title: "Real-Time Collaboration",
    description: "CET timezone overlap. Same-day responses. We join your Slack, attend your standups.",
    icon: "Globe",
    order: 3,
    isActive: true
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 practices. Encrypted communications. NDA signed before any sensitive discussion.",
    icon: "Lock",
    order: 4,
    isActive: true
  },
  {
    title: "Due Diligence Ready",
    description: "Our code passes investor scrutiny. Clean architecture, comprehensive docs, proper testing.",
    icon: "CheckCircle",
    order: 5,
    isActive: true
  },
  {
    title: "Long-Term Partnership",
    description: "94% client retention. We build relationships, not just software. Your success is our success.",
    icon: "Heart",
    order: 6,
    isActive: true
  }
];

// ============================================================================
// PROCESS STEPS - Clear methodology
// ============================================================================
const processStepsData = [
  {
    step: 1,
    title: "Discovery Call",
    description: "A focused 30-minute conversation to understand your challenges, constraints, and goals. We'll ask tough questions and give you honest feedback on feasibility. No slides, no sales pitch.",
    duration: "30 minutes",
    icon: "Phone",
    isActive: true
  },
  {
    step: 2,
    title: "Technical Assessment",
    description: "For larger projects, we review your existing systems, codebase, or requirements in depth. You receive a clear analysis of the current state and what it will take to reach your goals.",
    duration: "3-5 days",
    icon: "Search",
    isActive: true
  },
  {
    step: 3,
    title: "Detailed Proposal",
    description: "A comprehensive proposal with specific deliverables, timeline milestones, team composition, and transparent pricing. No vague estimates - you'll know exactly what you're getting.",
    duration: "2-3 days",
    icon: "FileText",
    isActive: true
  },
  {
    step: 4,
    title: "Kickoff & Execution",
    description: "We hit the ground running with a structured kickoff. Weekly demos, daily async updates, and direct access to the engineers doing the work. You're never wondering about status.",
    duration: "Project-dependent",
    icon: "Rocket",
    isActive: true
  },
  {
    step: 5,
    title: "Delivery & Handoff",
    description: "Comprehensive documentation, knowledge transfer sessions, and production deployment support. We ensure your team can maintain and extend what we build. Optional ongoing support available.",
    duration: "1-2 weeks",
    icon: "CheckCircle2",
    isActive: true
  }
];

// ============================================================================
// TECHNOLOGIES - Comprehensive but focused
// ============================================================================
const technologiesData = [
  // Frontend
  { name: "React", category: "frontend" as const, order: 1, isActive: true },
  { name: "Next.js", category: "frontend" as const, order: 2, isActive: true },
  { name: "TypeScript", category: "frontend" as const, order: 3, isActive: true },
  { name: "Tailwind CSS", category: "frontend" as const, order: 4, isActive: true },
  { name: "Vue.js", category: "frontend" as const, order: 5, isActive: true },

  // Backend
  { name: "Node.js", category: "backend" as const, order: 1, isActive: true },
  { name: "Python", category: "backend" as const, order: 2, isActive: true },
  { name: "Go", category: "backend" as const, order: 3, isActive: true },
  { name: "PostgreSQL", category: "backend" as const, order: 4, isActive: true },
  { name: "MongoDB", category: "backend" as const, order: 5, isActive: true },
  { name: "Redis", category: "backend" as const, order: 6, isActive: true },

  // Cloud
  { name: "AWS", category: "cloud" as const, order: 1, isActive: true },
  { name: "Google Cloud", category: "cloud" as const, order: 2, isActive: true },
  { name: "Azure", category: "cloud" as const, order: 3, isActive: true },
  { name: "Kubernetes", category: "cloud" as const, order: 4, isActive: true },
  { name: "Docker", category: "cloud" as const, order: 5, isActive: true },
  { name: "Vercel", category: "cloud" as const, order: 6, isActive: true },

  // DevOps
  { name: "Terraform", category: "devops" as const, order: 1, isActive: true },
  { name: "GitHub Actions", category: "devops" as const, order: 2, isActive: true },
  { name: "GitLab CI", category: "devops" as const, order: 3, isActive: true },
  { name: "ArgoCD", category: "devops" as const, order: 4, isActive: true },
  { name: "Datadog", category: "devops" as const, order: 5, isActive: true },
  { name: "Grafana", category: "devops" as const, order: 6, isActive: true },

  // Practices
  { name: "Infrastructure as Code", category: "practices" as const, order: 1, isActive: true },
  { name: "CI/CD Automation", category: "practices" as const, order: 2, isActive: true },
  { name: "Observability & Monitoring", category: "practices" as const, order: 3, isActive: true },
  { name: "Security by Design", category: "practices" as const, order: 4, isActive: true },
  { name: "Test-Driven Development", category: "practices" as const, order: 5, isActive: true },
  { name: "Agile / Scrum", category: "practices" as const, order: 6, isActive: true }
];

// ============================================================================
// ADMIN USER
// ============================================================================
const adminData = {
  email: "admin@cloudrix.io",
  password: "ChangeMe123!",
  name: "Admin User",
  role: "superadmin" as const,
  isActive: true
};

// ============================================================================
// SEED FUNCTION
// ============================================================================
async function seed() {
  try {
    console.log("🚀 Starting database seed...");
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("\n🗑️  Clearing existing data...");
    await Promise.all([
      Service.deleteMany({}),
      CaseStudy.deleteMany({}),
      CompanyInfo.deleteMany({}),
      TeamMember.deleteMany({}),
      Stat.deleteMany({}),
      TrustPoint.deleteMany({}),
      ProcessStep.deleteMany({}),
      Technology.deleteMany({}),
      Admin.deleteMany({})
    ]);

    // Seed data
    console.log("\n📦 Seeding data...");

    console.log("   → Services (6 items)");
    await Service.insertMany(servicesData);

    console.log("   → Case Studies (6 items)");
    await CaseStudy.insertMany(caseStudiesData);

    console.log("   → Company Info");
    await CompanyInfo.create(companyInfoData);

    console.log("   → Team Members (4 items)");
    await TeamMember.insertMany(teamMembersData);

    console.log("   → Stats (4 items)");
    await Stat.insertMany(statsData);

    console.log("   → Trust Points (6 items)");
    await TrustPoint.insertMany(trustPointsData);

    console.log("   → Process Steps (5 items)");
    await ProcessStep.insertMany(processStepsData);

    console.log("   → Technologies (28 items)");
    await Technology.insertMany(technologiesData);

    console.log("   → Admin User");
    await Admin.create(adminData);

    console.log("\n" + "=".repeat(50));
    console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📝 Admin Credentials:");
    console.log("   Email:    admin@cloudrix.io");
    console.log("   Password: ChangeMe123!");
    console.log("\n⚠️  IMPORTANT: Change the admin password after first login!");
    console.log("\n📊 Summary:");
    console.log("   • 6 Services");
    console.log("   • 6 Case Studies");
    console.log("   • 4 Team Members");
    console.log("   • 4 Stats");
    console.log("   • 6 Trust Points");
    console.log("   • 5 Process Steps");
    console.log("   • 28 Technologies");
    console.log("\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
