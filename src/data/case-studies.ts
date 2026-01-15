import { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "nordic-payment-processor-migration",
    title: "Cloud Migration for Nordic Payment Processor",
    client: "Nordic Payment Solutions",
    industry: "Financial Services / FinTech",
    challenge:
      "A rapidly growing payment processor serving 200+ merchants across Scandinavia was struggling with their on-premise infrastructure. Peak transaction volumes caused system slowdowns during critical shopping periods, compliance audits were increasingly complex, and the infrastructure team spent 60% of their time on maintenance rather than innovation.",
    solution:
      "We executed a phased cloud migration to AWS over 4 months, prioritizing the payment processing core. The new architecture featured auto-scaling Kubernetes clusters, multi-region failover, and PCI-DSS compliant infrastructure-as-code. We implemented blue-green deployments allowing the team to ship updates during business hours without risk.",
    results: [
      "55% reduction in infrastructure costs (from €47K to €21K monthly)",
      "99.995% uptime achieved (up from 99.2%)",
      "Peak capacity increased 10x without performance degradation",
      "Deployment frequency improved from bi-weekly to 12x daily",
      "Successfully processed €2.3M in transactions on Black Friday",
      "PCI-DSS Level 1 recertification completed 3 months ahead of schedule",
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
        "Cloudrix didn't just migrate our infrastructure - they transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them. The team's payment industry expertise meant they understood our compliance requirements without lengthy explanations.",
      author: "Henrik Lindqvist",
      role: "VP of Engineering, Nordic Payment Solutions",
    },
    metrics: [
      { label: "Cost Reduction", value: "55%" },
      { label: "Uptime", value: "99.995%" },
      { label: "Deploy Speed", value: "12x/day" },
    ],
  },
  {
    id: "2",
    slug: "analytics-platform-series-a",
    title: "B2B Analytics Platform - Zero to Series A",
    client: "DataPulse (Stealth → Series A)",
    industry: "Enterprise SaaS",
    challenge:
      "A two-person founding team from Amsterdam had validated a B2B analytics concept with 15 pilot customers but lacked the technical capacity to build the product. They needed to go from Figma mockups to a production MVP in 4 months to hit their Series A demo deadline.",
    solution:
      "We embedded a senior full-stack engineer and a DevOps specialist as their interim engineering team. Using Next.js, Node.js, and PostgreSQL, we built the core platform while establishing engineering best practices from day one. The architecture was designed to handle their projected 3-year growth without rewrites.",
    results: [
      "Production MVP delivered in 14 weeks (2 weeks ahead of schedule)",
      "Successfully closed €3.2M Series A led by Point Nine Capital",
      "Onboarded first 23 paying enterprise customers",
      "Platform handles 2.1M events daily with p99 latency under 200ms",
      "Zero critical bugs reported in first 90 days of production",
      "Codebase passed technical due diligence from 3 VC firms",
    ],
    technologies: [
      "Next.js 14",
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
        "Working with Cloudrix was like having a world-class engineering team from day one. They didn't just write code - they helped us think through product decisions, warned us about scaling pitfalls, and built something that investors immediately recognized as enterprise-grade.",
      author: "Martijn van der Berg",
      role: "Co-founder & CEO, DataPulse",
    },
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Series A Raised", value: "€3.2M" },
      { label: "Events/Day", value: "2.1M" },
    ],
  },
  {
    id: "3",
    slug: "manufacturing-erp-modernization",
    title: "Legacy ERP Modernization for Manufacturing",
    client: "Precision Components Group",
    industry: "Manufacturing / Industrial",
    challenge:
      "A Belgian precision manufacturing company with €45M annual revenue was running critical operations on a 15-year-old custom ERP system. The original developers had left years ago, documentation was sparse, and the Visual Basic codebase was nearly impossible to modify.",
    solution:
      "We applied the strangler fig pattern to incrementally modernize without disrupting operations. New capabilities were built as microservices with a clean API layer, while we systematically extracted and replaced legacy modules. The team received hands-on training throughout.",
    results: [
      "73% of legacy codebase modernized over 18 months",
      "New features now ship in days instead of months",
      "Successfully integrated with 4 major customer EDI systems",
      "Real-time inventory accuracy improved from 84% to 99.2%",
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
        "We were terrified of touching our ERP - one wrong change and production stops. Cloudrix's incremental approach let us modernize without betting the company. Eighteen months later, our system is an asset instead of a liability.",
      author: "Philippe Dubois",
      role: "Operations Director, Precision Components Group",
    },
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Downtime", value: "0 hrs" },
    ],
  },
  {
    id: "4",
    slug: "healthcare-platform-scaleup",
    title: "Healthcare Platform Scale-Up",
    client: "MedConnect Europe",
    industry: "Healthcare / Digital Health",
    challenge:
      "A digital health startup connecting patients with specialists across Europe had achieved product-market fit but couldn't scale. Their Django monolith was hitting database limits, video consultations dropped calls during peak hours, and GDPR compliance was held together with documentation rather than technical controls.",
    solution:
      "We re-architected the platform for scale while maintaining strict healthcare compliance. The monolith was decomposed into services, with the most critical paths rebuilt for horizontal scaling. We implemented end-to-end encryption for video streams, proper data residency controls, and comprehensive audit logging.",
    results: [
      "Platform now handles 15,000+ daily consultations (up from 2,000)",
      "Video call reliability improved from 94% to 99.8%",
      "Average page load time reduced from 4.2s to 0.9s",
      "Passed GDPR audit with zero critical findings",
      "Successfully launched in 4 new EU markets",
      "Infrastructure costs reduced 35% despite 7x traffic growth",
    ],
    technologies: [
      "Python/FastAPI",
      "React",
      "PostgreSQL",
      "WebRTC",
      "Kubernetes",
      "GCP",
      "Terraform",
    ],
    testimonial: {
      quote:
        "Cloudrix understood that in healthcare, reliability isn't optional - patients are waiting for their doctor. They rebuilt our platform without a single day of downtime for our users. The GDPR expertise was invaluable.",
      author: "Dr. Sarah Mensah",
      role: "CTO & Co-founder, MedConnect Europe",
    },
    metrics: [
      { label: "Daily Consults", value: "15K+" },
      { label: "Reliability", value: "99.8%" },
      { label: "Markets", value: "4 new" },
    ],
  },
  {
    id: "5",
    slug: "ecommerce-performance-rescue",
    title: "E-Commerce Platform Performance Rescue",
    client: "Fashion Forward Retail",
    industry: "E-Commerce / Retail",
    challenge:
      "A fast-growing fashion e-commerce brand was losing €50K+ monthly to abandoned carts caused by slow page loads. Their Shopify Plus setup had been heavily customized by multiple agencies, resulting in 8-second average page loads and a checkout that crashed during flash sales.",
    solution:
      "We conducted a comprehensive performance audit and implemented a phased optimization plan. The frontend was rebuilt with Next.js for optimal Core Web Vitals, while backend operations were moved to serverless functions. We designed a virtual queue system for flash sales.",
    results: [
      "Page load time reduced from 8.1s to 1.4s (83% improvement)",
      "Conversion rate increased from 1.8% to 3.4%",
      "Flash sale capacity increased from 500 to 10,000 concurrent users",
      "Cart abandonment reduced by 34%",
      "Core Web Vitals achieved green scores across all metrics",
      "Estimated €180K additional annual revenue from improvements",
    ],
    technologies: [
      "Next.js",
      "Vercel",
      "Shopify Storefront API",
      "Cloudflare",
      "Algolia",
      "Klaviyo",
    ],
    testimonial: {
      quote:
        "We'd tried three agencies before Cloudrix, and each made things worse. Within two weeks of starting, they'd already cut our load time in half. The flash sale that used to crash our site? Our last drop handled 8,000 concurrent users without a hiccup.",
      author: "Emma Richardson",
      role: "Head of Digital, Fashion Forward Retail",
    },
    metrics: [
      { label: "Load Time", value: "1.4s" },
      { label: "Conversion", value: "+89%" },
      { label: "Revenue Impact", value: "€180K/yr" },
    ],
  },
  {
    id: "6",
    slug: "logistics-tech-due-diligence",
    title: "Logistics Tech Due Diligence & Rescue",
    client: "Confidential PE Acquisition",
    industry: "Logistics / Supply Chain",
    challenge:
      "A private equity firm was evaluating a €25M acquisition of a logistics software company. Initial technical review raised red flags: the codebase was poorly documented, key developers had left, and the claimed 'AI-powered optimization' was mostly hardcoded rules.",
    solution:
      "We conducted a 3-week technical due diligence covering code quality, architecture, security, team capabilities, and technical debt. Our 47-page report identified €2.3M in hidden technical debt but confirmed the core algorithm was valuable. Post-acquisition, we led a 6-month stabilization effort.",
    results: [
      "Due diligence identified €2.3M in previously unknown technical debt",
      "Acquisition price renegotiated down by €1.8M based on findings",
      "Critical security vulnerabilities patched within 30 days",
      "System stability improved from 96% to 99.7% uptime",
      "Engineering team retention improved from 40% to 85% annually",
      "Platform successfully handling 3x transaction volume 12 months later",
    ],
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Terraform",
      "DataDog",
    ],
    testimonial: {
      quote:
        "Cloudrix's due diligence saved us from a potentially disastrous acquisition. Their report was brutally honest but constructive - they didn't just find problems, they quantified them and provided solutions. The investment has exceeded our projections.",
      author: "Jonathan Wells",
      role: "Operating Partner, Confidential PE Firm",
    },
    metrics: [
      { label: "Debt Found", value: "€2.3M" },
      { label: "Price Saved", value: "€1.8M" },
      { label: "Uptime Now", value: "99.7%" },
    ],
  },
];
