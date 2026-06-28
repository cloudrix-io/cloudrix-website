import mongoose from "mongoose";
import Service from "../lib/models/service";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

const services = [
  {
    title: "Cloud Migration Services",
    slug: "cloud-migration",
    description: "Migrate your infrastructure to AWS, GCP, or Azure with zero downtime. We handle assessment, planning, execution, and optimization — so you can focus on your business.",
    longDescription: `<h2>Why Companies Migrate to the Cloud</h2>
<p>On-premise infrastructure is expensive, inflexible, and creates a ceiling on your growth. Cloud migration enables auto-scaling, pay-as-you-go pricing, and global availability — but only if done correctly.</p>
<p>According to Gartner, 85% of organizations will embrace a cloud-first principle by 2027. The question isn't whether to migrate — it's how to do it without disruption.</p>

<h2>Our Cloud Migration Process</h2>
<p>We follow a proven 6-phase methodology refined over dozens of migrations:</p>
<ol>
<li><strong>Discovery & Assessment</strong> — We audit your current infrastructure, dependencies, and workloads. You get a full migration readiness report.</li>
<li><strong>Strategy & Planning</strong> — We choose the right migration pattern for each workload: lift-and-shift, re-platform, re-architect, or rebuild.</li>
<li><strong>Proof of Concept</strong> — We migrate a non-critical workload first to validate the approach and build confidence.</li>
<li><strong>Migration Execution</strong> — Systematic, workload-by-workload migration with rollback plans at every step.</li>
<li><strong>Optimization</strong> — Right-sizing instances, implementing auto-scaling, and configuring cost alerts.</li>
<li><strong>Handover & Support</strong> — Documentation, team training, and 90-day post-migration support.</li>
</ol>

<h2>What Makes Our Approach Different</h2>
<p>Most agencies treat migration as a one-size-fits-all lift-and-shift. We evaluate each workload individually. Some applications benefit from containerization with Kubernetes. Others are better served by serverless architectures. We match the solution to the workload — not the other way around.</p>`,
    icon: "Cloud",
    problem: "Legacy infrastructure is expensive to maintain, doesn't scale, and creates operational bottlenecks that slow down your entire engineering organization.",
    solution: "A systematic cloud migration with zero-downtime cutover, cost optimization from day one, and Infrastructure as Code for repeatable, auditable infrastructure.",
    result: "40-60% reduction in infrastructure costs, 99.9%+ uptime, and the ability to scale instantly based on demand.",
    features: [
      "Cloud readiness assessment & migration roadmap",
      "Multi-cloud strategy (AWS, GCP, Azure)",
      "Zero-downtime migration execution",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Kubernetes orchestration & container migration",
      "Cost optimization & FinOps setup",
      "Security hardening & compliance (SOC2, GDPR)",
      "Post-migration monitoring & alerting",
    ],
    useCases: [
      "SaaS company migrating from managed hosting to AWS for auto-scaling",
      "Enterprise moving on-premise SAP workloads to Azure",
      "Startup consolidating multi-cloud setup to reduce costs",
      "Healthcare company migrating to HIPAA-compliant cloud infrastructure",
      "E-commerce platform preparing for peak traffic events",
      "Financial services firm migrating to meet regulatory requirements",
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Terraform", "Pulumi", "Kubernetes", "Docker", "CloudFormation", "AWS CDK", "Datadog", "Grafana"],
    faqs: [
      { question: "How long does a typical cloud migration take?", answer: "It depends on the complexity. A straightforward lift-and-shift of 5-10 servers takes 4-6 weeks. A full re-architecture with containerization for a mid-size application typically takes 3-6 months. We provide a detailed timeline after the assessment phase." },
      { question: "Will there be downtime during migration?", answer: "Our methodology is designed for zero downtime. We use blue-green deployments and DNS-based cutover to ensure your services remain available throughout the migration process." },
      { question: "How much will we save on cloud costs?", answer: "Most clients see 40-60% cost reduction compared to on-premise infrastructure when factoring in hardware refresh cycles, data center costs, and operational overhead. We also implement FinOps practices to continuously optimize costs post-migration." },
      { question: "Can you migrate our databases without data loss?", answer: "Absolutely. We use database replication and synchronization tools to ensure zero data loss. We perform multiple dry runs before the actual cutover and always maintain rollback capabilities." },
      { question: "Do you support multi-cloud setups?", answer: "Yes. While we often recommend consolidating to reduce complexity, some organizations benefit from multi-cloud for vendor independence or specific service capabilities. We help you make the right decision based on your requirements." },
    ],
    relatedServiceSlugs: ["devops-consulting", "legacy-modernization", "technical-due-diligence"],
    seoTitle: "Cloud Migration Services — Zero-Downtime AWS, GCP & Azure",
    seoDescription: "Migrate to the cloud with zero downtime. Assessment, planning, execution & optimization for AWS, GCP, Azure. 40-60% cost reduction. Free consultation.",
    order: 1,
    isActive: true,
  },
  {
    title: "DevOps Consulting",
    slug: "devops-consulting",
    description: "Implement CI/CD pipelines, monitoring, and infrastructure automation. Ship faster, break less, and sleep better at night.",
    longDescription: `<h2>What DevOps Consulting Actually Means</h2>
<p>DevOps isn't about tools — it's about removing friction between development and operations. Our consulting engagements focus on measurable outcomes: faster deployments, fewer incidents, and more time building features instead of fighting infrastructure.</p>

<h2>What We Deliver</h2>
<p>Every engagement starts with an assessment of your current DevOps maturity. We evaluate your CI/CD pipelines, infrastructure management, monitoring, incident response, and security practices against industry benchmarks.</p>
<p>Then we build a prioritized roadmap and execute it alongside your team — not as outsiders handing over a document, but as embedded engineers shipping real improvements.</p>

<h2>Common Outcomes</h2>
<ul>
<li>Deployment frequency from monthly to multiple times per day</li>
<li>Mean time to recovery (MTTR) reduced from hours to minutes</li>
<li>Infrastructure provisioning from weeks to minutes via IaC</li>
<li>Security scanning integrated into every PR — not just quarterly audits</li>
</ul>`,
    icon: "Zap",
    problem: "Manual deployments are slow and error-prone. Your team spends more time on operations than building features, and every release feels risky.",
    solution: "Fully automated CI/CD pipelines with testing, security scanning, and rollback capabilities. Infrastructure as Code for reproducible environments.",
    result: "Deploy multiple times per day with confidence. Reduce incidents by 80% and recovery time from hours to minutes.",
    features: [
      "CI/CD pipeline design & implementation",
      "GitHub Actions, GitLab CI, Jenkins setup",
      "Docker containerization & optimization",
      "Kubernetes cluster management",
      "Monitoring & alerting (Datadog, Grafana, PagerDuty)",
      "Log aggregation & centralized observability",
      "Security scanning (SAST, DAST, dependency scanning)",
      "Infrastructure as Code (Terraform, Pulumi)",
    ],
    useCases: [
      "Startup automating manual deployment process for faster iteration",
      "Enterprise standardizing CI/CD across 50+ microservices",
      "SaaS company implementing zero-downtime deployments",
      "FinTech adding security scanning to comply with PCI-DSS",
      "Scale-up building platform engineering team from scratch",
      "Healthcare company implementing compliant deployment pipelines",
    ],
    technologies: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker", "Kubernetes", "Terraform", "Pulumi", "Datadog", "Grafana", "Prometheus", "PagerDuty", "ArgoCD", "Helm"],
    faqs: [
      { question: "What does DevOps consulting include?", answer: "Our engagements typically cover CI/CD pipeline setup, infrastructure automation, monitoring, security scanning integration, and team training. We tailor the scope to your specific pain points and maturity level." },
      { question: "How much does DevOps consulting cost?", answer: "Project-based engagements start at €15,000 for focused improvements like CI/CD setup. Comprehensive DevOps transformations with ongoing support typically run €8,500/month per engineer. See our pricing page for details." },
      { question: "Can you work with our existing tools?", answer: "Absolutely. We're tool-agnostic and work with whatever stack you have. If we recommend changes, we'll explain exactly why and ensure a smooth transition." },
      { question: "How long until we see results?", answer: "Quick wins (automated deployments, basic monitoring) typically ship within 2-4 weeks. A full DevOps transformation with culture change takes 3-6 months, but you'll see measurable improvements every sprint." },
    ],
    relatedServiceSlugs: ["cloud-migration", "full-stack-development", "dedicated-teams"],
    seoTitle: "DevOps Consulting Services — CI/CD, Kubernetes & Automation",
    seoDescription: "Expert DevOps consulting: CI/CD pipelines, Kubernetes, monitoring, IaC. Deploy faster, break less. Senior engineers, EU timezone. Free consultation.",
    order: 2,
    isActive: true,
  },
  {
    title: "AI & ML Consulting",
    slug: "ai-consulting",
    description: "From strategy to production: AI agent development, RAG systems, computer vision, and GDPR-compliant ML solutions for European enterprises.",
    longDescription: `<h2>AI That Solves Real Business Problems</h2>
<p>The AI market is projected to reach $305 billion by 2027 (IDC). But most AI projects fail — not because of technology, but because of poor problem definition, bad data, or choosing the wrong approach.</p>
<p>We help European companies cut through the hype and implement AI solutions that deliver measurable ROI while staying GDPR-compliant.</p>

<h2>Our AI Services</h2>
<h3>AI Strategy & Readiness Assessment</h3>
<p>We evaluate your data, infrastructure, and business processes to identify the highest-impact AI opportunities. You get a prioritized roadmap with clear ROI projections.</p>

<h3>Custom AI/ML Development</h3>
<p>From natural language processing to computer vision, we build custom models tailored to your specific use case. No one-size-fits-all solutions.</p>

<h3>LLM Integration & RAG Systems</h3>
<p>We integrate large language models into your existing applications with retrieval-augmented generation (RAG) for accurate, context-aware responses grounded in your proprietary data.</p>

<h3>AI Agent Development</h3>
<p>Autonomous AI agents that handle complex workflows — from customer support to data analysis — with human-in-the-loop oversight for critical decisions.</p>

<h2>GDPR & EU AI Act Compliance</h2>
<p>European companies face unique regulatory requirements. We design AI systems that are compliant by design — with proper data handling, model transparency, and audit trails required by the EU AI Act.</p>`,
    icon: "Brain",
    problem: "You know AI can transform your business, but you're overwhelmed by options, worried about compliance, and unsure which use cases will actually deliver ROI.",
    solution: "Practical AI consulting that starts with your business problems, not the technology. We identify high-impact use cases, build proof-of-concepts, and scale to production — all GDPR-compliant.",
    result: "Production AI systems that deliver measurable business value: 60% reduction in manual processing, 3x faster customer response times, or 40% improvement in prediction accuracy.",
    features: [
      "AI strategy & readiness assessment",
      "Custom ML model development",
      "LLM integration (GPT-4, Claude, Llama)",
      "RAG system architecture & implementation",
      "AI agent development & orchestration",
      "Computer vision & NLP solutions",
      "GDPR & EU AI Act compliance",
      "MLOps & model monitoring",
    ],
    useCases: [
      "Customer support automation with AI agents that handle 70% of tickets",
      "Document processing pipeline that extracts data from unstructured documents",
      "RAG-powered knowledge base that answers questions from company documentation",
      "Predictive maintenance system for manufacturing equipment",
      "Fraud detection model for financial transactions",
      "Product recommendation engine for e-commerce",
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI API", "Claude API", "Hugging Face", "Pinecone", "Weaviate", "MLflow", "AWS SageMaker", "Vertex AI"],
    faqs: [
      { question: "Do we need a lot of data to start with AI?", answer: "Not always. Pre-trained models and transfer learning allow you to get started with relatively small datasets. For RAG and LLM integration, you mainly need well-organized internal documentation. We assess your data readiness in the first phase." },
      { question: "How do you ensure GDPR compliance for AI systems?", answer: "We implement privacy by design: data minimization, purpose limitation, right to explanation, and proper consent management. We also help you prepare the documentation required by the EU AI Act for high-risk AI systems." },
      { question: "What's the typical ROI timeline for AI projects?", answer: "Quick wins like chatbots and document processing can show ROI within 2-3 months. More complex projects like predictive analytics typically take 4-6 months to production but deliver 10x+ returns over the first year." },
      { question: "Can you integrate AI into our existing systems?", answer: "Yes. We specialize in integrating AI capabilities into existing applications via APIs, not replacing your entire stack. This minimizes risk and maximizes adoption." },
      { question: "Which AI model should we use — GPT, Claude, or open-source?", answer: "It depends on your use case, data sensitivity, and budget. For European companies, we often recommend a hybrid approach: open-source models for sensitive data processing and commercial APIs for general tasks. We help you make this decision during the assessment phase." },
    ],
    relatedServiceSlugs: ["llm-integration", "full-stack-development", "technical-due-diligence"],
    seoTitle: "AI & ML Consulting — GDPR-Compliant AI for EU Companies",
    seoDescription: "AI consulting for European companies: strategy, LLM integration, RAG systems, AI agents. GDPR & EU AI Act compliant. From assessment to production.",
    order: 3,
    isActive: true,
  },
  {
    title: "Full-Stack Development",
    slug: "full-stack-development",
    description: "Build production-ready applications with modern frameworks. From MVPs to enterprise-grade systems — React, Next.js, Node.js, Python, and more.",
    longDescription: `<h2>Modern Applications Built to Scale</h2>
<p>Whether you're building an MVP to validate a market or scaling an enterprise platform to millions of users, the technology choices you make today determine your engineering velocity for years to come.</p>
<p>We build applications using battle-tested stacks that balance developer productivity with long-term maintainability.</p>

<h2>Our Technology Approach</h2>
<p>We don't chase trends. We choose technologies based on your specific requirements: team size, expected scale, time-to-market constraints, and long-term maintenance needs.</p>
<p>For most projects, we recommend React or Next.js on the frontend with Node.js or Python backends. But if your team has Java expertise or your workload demands Go's performance, we adapt accordingly.</p>

<h2>What "Production-Ready" Means to Us</h2>
<ul>
<li>Comprehensive test coverage (unit, integration, e2e)</li>
<li>CI/CD pipeline from day one</li>
<li>Error tracking and monitoring built in</li>
<li>Security best practices (OWASP Top 10)</li>
<li>Performance optimized for Core Web Vitals</li>
<li>Documentation that your team can actually use</li>
</ul>`,
    icon: "Code",
    problem: "You need to ship features faster without compromising quality. Your current development velocity is too slow, technical debt is piling up, or you're building something new from scratch.",
    solution: "Senior engineers who write clean, tested, well-documented code using modern frameworks. We integrate with your team's workflow and ship production-ready features every sprint.",
    result: "Faster time-to-market with maintainable code that your team can confidently extend. 90%+ test coverage. Zero critical bugs in production.",
    features: [
      "React / Next.js frontend development",
      "Node.js / Python / Go backend development",
      "REST & GraphQL API design",
      "Database design (PostgreSQL, MongoDB, Redis)",
      "Real-time features (WebSockets, Server-Sent Events)",
      "Third-party API integrations",
      "Performance optimization & Core Web Vitals",
      "Comprehensive testing (unit, integration, e2e)",
    ],
    useCases: [
      "SaaS MVP development to validate market fit in 8-12 weeks",
      "Enterprise dashboard with real-time data visualization",
      "E-commerce platform with payment processing and inventory management",
      "Mobile-first web application with offline capabilities",
      "Internal tools to automate manual business processes",
      "API platform enabling third-party integrations",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Prisma", "Tailwind CSS"],
    faqs: [
      { question: "What tech stack do you recommend?", answer: "For most projects: Next.js + TypeScript frontend, Node.js or Python backend, PostgreSQL database. But we adapt to your team's existing skills and your project's specific requirements. We never force a stack." },
      { question: "Can you build an MVP in 8 weeks?", answer: "Yes, for well-scoped MVPs. We work with you to define the minimum feature set needed to validate your hypothesis, then execute in 2-week sprints with demos after each." },
      { question: "Do you write tests?", answer: "Always. We target 80%+ code coverage with a mix of unit, integration, and end-to-end tests. Tests aren't optional — they're part of our definition of done." },
      { question: "How do you handle project handover?", answer: "Every project includes comprehensive documentation, architecture decision records, and a handover period where we pair with your team. We ensure your developers can confidently maintain and extend the codebase." },
    ],
    relatedServiceSlugs: ["devops-consulting", "api-development", "dedicated-teams"],
    seoTitle: "Full-Stack Development — React, Next.js, Node.js, Python",
    seoDescription: "Production-ready full-stack development. React, Next.js, Node.js, Python. MVPs to enterprise systems. Senior engineers, EU timezone. Free consultation.",
    order: 4,
    isActive: true,
  },
  {
    title: "Technical Due Diligence",
    slug: "technical-due-diligence",
    description: "Independent technical assessment for M&A, investment decisions, or internal audits. We evaluate code quality, architecture, security, scalability, and team capabilities.",
    longDescription: `<h2>Make Informed Decisions About Technology Investments</h2>
<p>Whether you're acquiring a company, investing in a startup, or evaluating your own technology stack, you need an unbiased, expert assessment of the technology and team behind the product.</p>
<p>Our technical due diligence reports are used by PE firms, VCs, corporate acquirers, and CTOs across Europe to make informed decisions worth millions.</p>

<h2>What We Evaluate</h2>
<h3>Code Quality & Architecture</h3>
<p>We review the codebase for maintainability, test coverage, security vulnerabilities, and adherence to best practices. We identify technical debt and estimate the cost to address it.</p>

<h3>Infrastructure & Scalability</h3>
<p>Can the current architecture handle 10x growth? We assess infrastructure design, deployment practices, monitoring, and disaster recovery capabilities.</p>

<h3>Security & Compliance</h3>
<p>We evaluate security practices against OWASP standards, check for known vulnerabilities, and assess compliance readiness (GDPR, SOC2, ISO 27001).</p>

<h3>Team & Processes</h3>
<p>Technology is only as good as the team building it. We assess development practices, documentation quality, knowledge distribution, and bus factor risks.</p>`,
    icon: "Shield",
    problem: "You're about to invest millions in a technology company but don't have the technical expertise to evaluate whether the technology actually works, scales, and is maintainable.",
    solution: "An independent, comprehensive technical assessment covering code quality, architecture, security, scalability, and team capabilities — delivered as a clear, actionable report.",
    result: "A detailed due diligence report with risk ratings, cost estimates for remediation, and clear recommendations. Typical turnaround: 2-3 weeks.",
    features: [
      "Comprehensive code quality review",
      "Architecture & scalability assessment",
      "Security vulnerability scanning",
      "Technical debt quantification",
      "Infrastructure & DevOps evaluation",
      "Team capability assessment",
      "GDPR & compliance readiness check",
      "Executive summary with risk ratings",
    ],
    useCases: [
      "PE firm evaluating a SaaS acquisition target",
      "VC conducting due diligence on a Series B investment",
      "Corporate acquirer assessing technology synergies",
      "CTO commissioning an internal technology audit",
      "Board requesting an independent security assessment",
      "Startup preparing for investor due diligence",
    ],
    technologies: ["SonarQube", "Snyk", "OWASP ZAP", "Burp Suite", "GitGuardian", "Terraform", "Kubernetes", "AWS Well-Architected Framework"],
    faqs: [
      { question: "How long does a technical due diligence take?", answer: "A standard due diligence for a mid-size application takes 2-3 weeks. We can do expedited assessments in 1 week for time-sensitive transactions, though the scope may be narrower." },
      { question: "What do you need access to?", answer: "Ideally: source code repositories, CI/CD pipelines, infrastructure access (read-only), and 2-3 hours with the technical team. We sign NDAs before accessing any materials." },
      { question: "What format is the report?", answer: "You get a detailed technical report (40-60 pages) with risk ratings (Red/Amber/Green), plus a 5-page executive summary designed for non-technical stakeholders. We also present findings in a 1-hour call." },
      { question: "Can you do this remotely?", answer: "Yes. All our due diligence work is done remotely with secure access to repositories and infrastructure. We've done dozens of remote assessments across Europe." },
    ],
    relatedServiceSlugs: ["ai-consulting", "legacy-modernization", "cloud-migration"],
    seoTitle: "Technical Due Diligence — M&A, Investment & Code Audits",
    seoDescription: "Independent technical due diligence for M&A and investments. Code quality, architecture, security, scalability assessment. 2-3 week turnaround.",
    order: 5,
    isActive: true,
  },
  {
    title: "Dedicated Development Teams",
    slug: "dedicated-teams",
    description: "Extend your engineering capacity with senior developers who integrate seamlessly with your team. EU timezone, Multilingual communication, no long-term commitments.",
    longDescription: `<h2>Scale Your Engineering Without the Hiring Headache</h2>
<p>Hiring senior engineers takes 3-6 months and costs €15-25K in recruitment fees alone. With dedicated teams from Cloudrix, you get experienced engineers embedded in your workflow within 1-2 weeks.</p>

<h2>How It Works</h2>
<ol>
<li><strong>Requirements</strong> — Tell us what skills you need, your tech stack, and how many engineers.</li>
<li><strong>Matching</strong> — We propose candidates within 48 hours. You interview and approve each one.</li>
<li><strong>Onboarding</strong> — Your dedicated team members join your Slack, attend your standups, and follow your processes.</li>
<li><strong>Delivery</strong> — They work as part of your team, participating in sprints, code reviews, and planning sessions.</li>
</ol>

<h2>Why European Companies Choose Us</h2>
<ul>
<li><strong>EU Timezone Overlap</strong> — Real-time collaboration, not async messages across 8 timezone gaps</li>
<li><strong>Cultural Fit</strong> — Engineers who understand European business culture, communication styles, and work expectations</li>
<li><strong>No Lock-in</strong> — Month-to-month contracts. Scale up or down as needed.</li>
<li><strong>Senior Only</strong> — Minimum 5 years experience. No juniors masquerading as seniors.</li>
</ul>`,
    icon: "Users",
    problem: "You need to scale development capacity quickly, but hiring takes months and freelancers are unreliable. You need engineers who can integrate with your team immediately.",
    solution: "Vetted senior engineers who join your team within 1-2 weeks. They use your tools, attend your meetings, and follow your processes. EU timezone, Multilingual communication.",
    result: "Immediate capacity boost with zero ramp-up friction. Month-to-month flexibility. Engineers who feel like part of your team, not outsiders.",
    features: [
      "Senior full-stack developers (5+ years experience)",
      "DevOps & SRE engineers",
      "AI/ML engineers",
      "Technical leads & architects",
      "EU timezone coverage (CET/CEST)",
      "Multilingual communication",
      "Month-to-month contracts, no lock-in",
      "Seamless integration with your workflow",
    ],
    useCases: [
      "Scale-up needing 3 extra engineers for a product launch",
      "Enterprise filling a senior architect gap while hiring internally",
      "Startup augmenting a small team with specialized skills",
      "Agency needing overflow capacity for client projects",
      "Company building a new product line alongside existing team",
      "Organization needing temporary AI/ML expertise",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "TypeScript", "Go", "Java", "AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "MongoDB"],
    faqs: [
      { question: "How quickly can engineers start?", answer: "Typically within 1-2 weeks. We propose matched candidates within 48 hours of receiving your requirements. After your approval, onboarding begins immediately." },
      { question: "What seniority level are your engineers?", answer: "All our engineers have a minimum of 5 years of professional experience. Most have 7-10+ years. We don't offer junior developers — every team member is production-ready from day one." },
      { question: "Is there a minimum commitment?", answer: "No long-term commitment required. Our contracts are month-to-month with 30 days notice. We earn your continued business through quality, not contracts." },
      { question: "How do you ensure quality?", answer: "Every engineer goes through our rigorous vetting process: technical interviews, coding challenges, and reference checks. Once embedded, they follow your code review and quality processes. We also do regular check-ins to ensure alignment." },
    ],
    relatedServiceSlugs: ["full-stack-development", "devops-consulting", "ai-consulting"],
    seoTitle: "Dedicated Development Teams — Senior Engineers, EU Timezone",
    seoDescription: "Dedicated senior development teams for European companies. 1-2 week onboarding, EU timezone, no long-term commitment. Full-stack, DevOps, AI/ML engineers.",
    order: 6,
    isActive: true,
  },
  {
    title: "API Development & Integration",
    slug: "api-development",
    description: "Design, build, and integrate REST and GraphQL APIs that are fast, secure, and well-documented. Connect your systems, enable third-party integrations, and unlock your data.",
    longDescription: `<h2>APIs Are the Backbone of Modern Software</h2>
<p>Every modern application depends on APIs — whether it's connecting your frontend to your backend, integrating with third-party services, or enabling partners to build on your platform.</p>
<p>We design APIs that are fast, secure, well-documented, and a joy to integrate with. Because a great API isn't just functional — it's a product in itself.</p>

<h2>Our API Development Services</h2>
<h3>API Design & Architecture</h3>
<p>We follow API-first design principles: define the contract, validate with stakeholders, then implement. REST for simplicity, GraphQL when your frontend needs dictate it.</p>

<h3>Integration Services</h3>
<p>Connect your systems with payment processors, CRMs, ERPs, communication platforms, and any third-party service with an API. We handle authentication, error handling, rate limiting, and data transformation.</p>

<h3>API Platform Development</h3>
<p>Building a platform? We create developer portals, API key management, usage analytics, and documentation that makes your API easy to adopt.</p>`,
    icon: "Workflow",
    problem: "Your systems don't talk to each other. Data is siloed, integrations are fragile, and building new connections takes weeks instead of hours.",
    solution: "Well-designed APIs with comprehensive documentation, proper versioning, and robust error handling. Plus integration expertise to connect any systems you need.",
    result: "Reliable, fast APIs that enable your team and partners to build confidently. Integration time reduced from weeks to days.",
    features: [
      "REST API design & development",
      "GraphQL API implementation",
      "API gateway setup & management",
      "Third-party API integration",
      "Authentication & authorization (OAuth2, JWT)",
      "API documentation (OpenAPI/Swagger)",
      "Rate limiting & usage analytics",
      "Webhook system design",
    ],
    useCases: [
      "SaaS company building a public API for partner integrations",
      "E-commerce platform integrating with payment and shipping providers",
      "Healthcare company connecting EHR systems via HL7 FHIR APIs",
      "FinTech aggregating data from multiple banking APIs",
      "Enterprise building an API gateway for microservices",
      "Startup enabling white-label integrations for B2B clients",
    ],
    technologies: ["Node.js", "Python", "Go", "GraphQL", "REST", "gRPC", "OpenAPI", "Swagger", "Kong", "AWS API Gateway", "Postman", "OAuth2", "JWT"],
    faqs: [
      { question: "REST or GraphQL — which should we use?", answer: "REST is simpler and better for most use cases, especially public APIs. GraphQL shines when your frontend needs to fetch complex, nested data in a single request. We often use REST for public APIs and GraphQL for internal frontends." },
      { question: "How do you handle API versioning?", answer: "We implement URL-based versioning (v1, v2) for public APIs and header-based versioning for internal APIs. We also maintain backward compatibility and provide migration guides between versions." },
      { question: "Can you integrate with our legacy systems?", answer: "Yes. We've integrated with everything from SOAP services to mainframe systems. We create adapter layers that expose clean, modern APIs on top of legacy systems." },
      { question: "How do you document APIs?", answer: "We use OpenAPI (Swagger) specifications generated from code, interactive documentation portals, code examples in multiple languages, and Postman collections. Documentation is part of our definition of done." },
    ],
    relatedServiceSlugs: ["full-stack-development", "legacy-modernization", "ai-consulting"],
    seoTitle: "API Development & Integration — REST, GraphQL & More",
    seoDescription: "API design, development & integration services. REST, GraphQL, third-party integrations. Well-documented, secure, and built to scale. Free consultation.",
    order: 7,
    isActive: true,
  },
  {
    title: "LLM Integration Services",
    slug: "llm-integration",
    description: "Integrate large language models into your applications with RAG, fine-tuning, and prompt engineering. Turn AI capabilities into production features your users love.",
    longDescription: `<h2>From AI Demos to Production Features</h2>
<p>Everyone's seen ChatGPT demos. But turning LLM capabilities into reliable, production-grade features is an engineering challenge that requires experience with prompt engineering, retrieval-augmented generation, model selection, and robust error handling.</p>
<p>We've integrated LLMs into production applications serving thousands of users. We know what works and — more importantly — what doesn't.</p>

<h2>Our LLM Integration Services</h2>
<h3>RAG System Development</h3>
<p>Retrieval-Augmented Generation grounds LLM responses in your proprietary data. We build RAG pipelines that ingest your documents, chunk and embed them, and retrieve relevant context for accurate responses. No hallucinations about your products or services.</p>

<h3>Prompt Engineering & Optimization</h3>
<p>The difference between a good and great LLM feature is often in the prompts. We design, test, and optimize prompts for consistency, accuracy, and cost efficiency.</p>

<h3>Model Selection & Fine-Tuning</h3>
<p>GPT-4, Claude, Llama, Mistral — each model has strengths. We help you choose the right model for your use case and budget, and fine-tune when necessary for domain-specific accuracy.</p>

<h3>Production Infrastructure</h3>
<p>Streaming responses, fallback models, cost monitoring, response caching, content moderation, and observability — all the infrastructure needed to run LLMs reliably at scale.</p>`,
    icon: "Bot",
    problem: "You want to add AI-powered features to your application but don't know where to start. Demos work great, but production LLM integration requires careful engineering.",
    solution: "End-to-end LLM integration: model selection, RAG architecture, prompt engineering, and production infrastructure. Built for reliability, accuracy, and cost efficiency.",
    result: "Production AI features that your users love. 95%+ response accuracy with RAG. 60% reduction in support tickets. Transparent cost tracking.",
    features: [
      "RAG system architecture & implementation",
      "Vector database setup (Pinecone, Weaviate, pgvector)",
      "Prompt engineering & optimization",
      "Model selection & benchmarking",
      "Fine-tuning for domain-specific use cases",
      "Streaming response infrastructure",
      "Cost monitoring & optimization",
      "Content moderation & safety guardrails",
    ],
    useCases: [
      "Customer support chatbot that answers from your knowledge base",
      "Internal search tool that understands natural language queries",
      "Content generation system for marketing teams",
      "Code assistant trained on your codebase and coding standards",
      "Document analysis pipeline for legal or financial documents",
      "AI-powered product recommendations with natural language explanations",
    ],
    technologies: ["OpenAI API", "Claude API", "Llama", "Mistral", "LangChain", "LlamaIndex", "Pinecone", "Weaviate", "pgvector", "Chroma", "Python", "TypeScript", "Vercel AI SDK"],
    faqs: [
      { question: "What is RAG and why do we need it?", answer: "RAG (Retrieval-Augmented Generation) fetches relevant information from your data before generating a response. Without RAG, LLMs can only use their training data, which doesn't include your products, policies, or internal knowledge. RAG dramatically reduces hallucinations and ensures accurate, up-to-date responses." },
      { question: "How much does LLM integration cost to run?", answer: "Running costs depend on usage volume and model choice. GPT-4 costs roughly $0.01-0.03 per query, while open-source models on your own infrastructure can be much cheaper. We help you optimize with response caching, model routing, and usage monitoring." },
      { question: "Can we use open-source models instead of OpenAI?", answer: "Absolutely. We support Llama, Mistral, and other open-source models that can run on your own infrastructure. This is often preferred for data-sensitive applications where you can't send data to third-party APIs." },
      { question: "How do you handle hallucinations?", answer: "RAG is the primary defense. We also implement fact-checking layers, confidence scoring, citation requirements, and content moderation guardrails. For critical applications, we add human-in-the-loop review for uncertain responses." },
    ],
    relatedServiceSlugs: ["ai-consulting", "full-stack-development", "api-development"],
    seoTitle: "LLM Integration Services — RAG, Fine-Tuning & Production AI",
    seoDescription: "LLM integration for your applications: RAG systems, prompt engineering, model selection, production infrastructure. GPT-4, Claude, open-source models.",
    order: 8,
    isActive: true,
  },
  {
    title: "Legacy System Modernization",
    slug: "legacy-modernization",
    description: "Modernize your legacy applications without disrupting your business. Incremental migration from monoliths to modern architectures, databases, and cloud-native patterns.",
    longDescription: `<h2>Your Legacy System Is Holding You Back</h2>
<p>Legacy systems aren't just a technical problem — they're a business risk. They slow down feature development, make hiring difficult (nobody wants to work on COBOL), create security vulnerabilities, and cost more to maintain every year.</p>
<p>But a big-bang rewrite is almost never the answer. It's expensive, risky, and takes years. We take a different approach.</p>

<h2>Our Modernization Approach</h2>
<h3>Strangler Fig Pattern</h3>
<p>We incrementally replace legacy components with modern alternatives, routing traffic to the new system as each piece is ready. Your business continues to run on the old system while the new one grows around it.</p>

<h3>API Facade</h3>
<p>We place modern APIs in front of legacy systems, enabling new frontends and integrations while the backend is gradually replaced.</p>

<h3>Database Migration</h3>
<p>Moving from legacy databases (Oracle, SQL Server, proprietary systems) to modern alternatives (PostgreSQL, MongoDB) with zero data loss and minimal downtime.</p>

<h2>What We Don't Do</h2>
<p>We don't recommend rewriting everything from scratch. We don't introduce unnecessary complexity. And we don't modernize for the sake of modernization — every change is justified by measurable business value.</p>`,
    icon: "Layers",
    problem: "Your legacy system is a bottleneck. It's expensive to maintain, hard to hire for, difficult to integrate with modern tools, and every change carries the risk of breaking something.",
    solution: "Incremental modernization using the Strangler Fig pattern. We gradually replace legacy components while your business runs uninterrupted. Modern APIs, databases, and cloud-native architecture.",
    result: "A modern, maintainable system that your team can confidently extend. 70% reduction in maintenance costs. Development velocity increased 3-5x.",
    features: [
      "Legacy system assessment & modernization roadmap",
      "Strangler Fig pattern implementation",
      "Monolith to microservices migration",
      "Database migration (Oracle/SQL Server to PostgreSQL)",
      "API facade for legacy system integration",
      "Frontend modernization (to React/Next.js)",
      "Automated testing for legacy code",
      "Knowledge transfer & documentation",
    ],
    useCases: [
      "Enterprise replacing a 15-year-old PHP monolith with microservices",
      "Financial institution migrating from Oracle to PostgreSQL",
      "Manufacturing company modernizing custom ERP system",
      "Healthcare provider updating legacy patient management system",
      "Insurance company replacing mainframe-based policy system",
      "Government agency modernizing citizen-facing applications",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Terraform", "AWS", "Event Sourcing", "CQRS"],
    faqs: [
      { question: "Should we rewrite from scratch or modernize incrementally?", answer: "Almost always modernize incrementally. Full rewrites are expensive, risky, and historically have a high failure rate. The Strangler Fig pattern lets you modernize piece by piece while keeping your business running." },
      { question: "How long does legacy modernization take?", answer: "It depends on the system size and complexity. A focused modernization of a single critical component takes 2-3 months. A full system modernization is typically a 12-18 month program with value delivered every sprint." },
      { question: "What if our legacy system has no tests?", answer: "We start by adding characterization tests — tests that document current behavior without judging if it's correct. This gives us a safety net before making any changes. We then gradually add proper test coverage as components are modernized." },
      { question: "Can you modernize systems written in COBOL/Fortran/etc.?", answer: "Yes. We've worked with a range of legacy technologies. The specific language matters less than the approach. We wrap legacy functionality behind modern APIs and gradually replace components." },
    ],
    relatedServiceSlugs: ["cloud-migration", "full-stack-development", "technical-due-diligence"],
    seoTitle: "Legacy System Modernization — Incremental, Zero-Risk Migration",
    seoDescription: "Modernize legacy systems without disruption. Strangler Fig pattern, monolith to microservices, database migration. 70% maintenance cost reduction.",
    order: 9,
    isActive: true,
  },
];

async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const serviceData of services) {
      const existing = await Service.findOne({ slug: serviceData.slug });
      if (existing) {
        await Service.updateOne({ slug: serviceData.slug }, { $set: serviceData });
        console.log(`Updated service: ${serviceData.title}`);
      } else {
        await Service.create(serviceData);
        console.log(`Created service: ${serviceData.title}`);
      }
    }

    console.log(`\nSeeded ${services.length} services successfully`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
}

seedServices();
