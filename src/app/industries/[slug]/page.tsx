import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Clock,
  Building2,
  Heart,
  ShoppingCart,
  Cpu,
  Factory,
  Truck,
  Flame,
  Landmark,
  Radio,
  Car,
  Gamepad2,
  Home,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

const industries: Record<
  string,
  {
    name: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    heroImage: string;
    challenges: string[];
    solutions: {
      title: string;
      description: string;
    }[];
    compliance: string[];
    caseStudy?: {
      title: string;
      result: string;
      link: string;
    };
    technologies: string[];
    stats: { value: string; label: string }[];
  }
> = {
  fintech: {
    name: "FinTech & Financial Services",
    title: "Cloud Solutions for FinTech & Financial Services",
    description:
      "PCI-DSS compliant infrastructure, high-availability payment systems, and secure financial platforms. We help FinTech companies scale while maintaining regulatory compliance.",
    icon: Building2,
    heroImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    challenges: [
      "Strict regulatory requirements (PCI-DSS, PSD2, GDPR)",
      "High-availability demands (99.99%+ uptime)",
      "Processing millions of transactions securely",
      "Legacy system modernization without downtime",
      "Real-time fraud detection and prevention",
    ],
    solutions: [
      {
        title: "Compliant Cloud Architecture",
        description:
          "Multi-region deployments with proper data residency, encryption at rest and in transit, and audit logging for regulatory compliance.",
      },
      {
        title: "High-Availability Payment Systems",
        description:
          "Auto-scaling infrastructure that handles peak loads with zero downtime. Blue-green deployments for risk-free releases.",
      },
      {
        title: "Security-First Development",
        description:
          "Secure coding practices, regular penetration testing, and continuous vulnerability scanning integrated into CI/CD.",
      },
      {
        title: "Real-Time Analytics",
        description:
          "Stream processing for fraud detection, transaction monitoring, and business intelligence dashboards.",
      },
    ],
    compliance: ["PCI-DSS Level 1", "GDPR", "PSD2", "SOC 2 Type II", "ISO 27001"],
    caseStudy: {
      title: "Cloud Migration for FinTech Payment Processor",
      result: "55% cost reduction, 99.99% uptime, 10x peak capacity",
      link: "/case-studies/cloud-migration-fintech",
    },
    technologies: ["AWS", "Kubernetes", "PostgreSQL", "Redis", "Kafka", "Terraform"],
    stats: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "€2.3M+", label: "Daily Transactions" },
      { value: "55%", label: "Cost Reduction" },
      { value: "<200ms", label: "P99 Latency" },
    ],
  },
  healthcare: {
    name: "Healthcare & Digital Health",
    title: "Secure Solutions for Healthcare & Digital Health",
    description:
      "GDPR-compliant telemedicine platforms, patient management systems, and healthcare data solutions. Privacy and security built from the ground up.",
    icon: Heart,
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    challenges: [
      "Strict data protection requirements (GDPR, HIPAA)",
      "Secure handling of sensitive patient data",
      "High reliability for critical healthcare services",
      "Integration with existing hospital systems",
      "Scalable telemedicine infrastructure",
    ],
    solutions: [
      {
        title: "Privacy-First Architecture",
        description:
          "End-to-end encryption, proper data residency controls, and comprehensive audit logging for healthcare compliance.",
      },
      {
        title: "Reliable Telemedicine Platform",
        description:
          "WebRTC-based video consultations with 99.8%+ reliability. Automatic failover and quality adaptation.",
      },
      {
        title: "HL7/FHIR Integration",
        description:
          "Seamless integration with existing hospital information systems using healthcare interoperability standards.",
      },
      {
        title: "Patient Data Security",
        description:
          "Role-based access control, data masking, and consent management for GDPR compliance.",
      },
    ],
    compliance: ["GDPR", "HIPAA", "ISO 27001", "MDR", "CE Marking"],
    caseStudy: {
      title: "Healthcare Platform Scale-Up",
      result: "High reliability, expanded across EU markets",
      link: "/case-studies",
    },
    technologies: ["GCP", "Kubernetes", "FastAPI", "PostgreSQL", "WebRTC", "Terraform"],
    stats: [
      { value: "15K+", label: "Daily Consultations" },
      { value: "99.8%", label: "Call Reliability" },
      { value: "4", label: "EU Markets" },
      { value: "0", label: "GDPR Findings" },
    ],
  },
  ecommerce: {
    name: "E-commerce & Retail",
    title: "Scalable Solutions for E-commerce & Retail",
    description:
      "High-performance e-commerce platforms that handle flash sales, optimize conversions, and deliver exceptional customer experiences.",
    icon: ShoppingCart,
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    challenges: [
      "Handling traffic spikes during sales events",
      "Slow page load times affecting conversions",
      "Cart abandonment from poor UX",
      "Complex inventory management across channels",
      "Integration with multiple payment providers",
    ],
    solutions: [
      {
        title: "Performance Optimization",
        description:
          "Next.js frontends with optimal Core Web Vitals. CDN strategies and image optimization for sub-2-second load times.",
      },
      {
        title: "Flash Sale Architecture",
        description:
          "Virtual queue systems, auto-scaling infrastructure, and edge caching to handle 10K+ concurrent users.",
      },
      {
        title: "Headless Commerce",
        description:
          "API-first architecture that lets you use any frontend while maintaining a unified backend.",
      },
      {
        title: "Multi-Channel Integration",
        description:
          "Unified inventory and order management across web, mobile, and marketplace channels.",
      },
    ],
    compliance: ["PCI-DSS", "GDPR", "Strong Customer Authentication"],
    caseStudy: {
      title: "E-Commerce Performance Optimization",
      result: "83% faster load times, significant conversion improvement",
      link: "/case-studies",
    },
    technologies: ["Next.js", "Vercel", "Shopify", "Algolia", "Cloudflare", "Stripe"],
    stats: [
      { value: "1.4s", label: "Load Time" },
      { value: "+89%", label: "Conversion" },
      { value: "10K+", label: "Concurrent Users" },
      { value: "€180K", label: "Annual Impact" },
    ],
  },
  saas: {
    name: "SaaS & Technology",
    title: "Engineering for SaaS & Technology Companies",
    description:
      "From MVP to scale, we build SaaS products that investors trust. Multi-tenant architectures, API-first design, and infrastructure that grows with you.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    challenges: [
      "Shipping MVP fast enough to hit funding deadlines",
      "Building architecture that scales without rewrites",
      "Passing investor technical due diligence",
      "Managing multi-tenant data isolation",
      "Maintaining velocity as the team grows",
    ],
    solutions: [
      {
        title: "Rapid MVP Development",
        description:
          "Production-grade MVPs in 8-12 weeks using proven tech stacks. Code that passes due diligence from day one.",
      },
      {
        title: "Multi-Tenant Architecture",
        description:
          "Database-per-tenant or schema-based isolation depending on your needs. Proper resource allocation and billing.",
      },
      {
        title: "API-First Design",
        description:
          "Well-documented REST or GraphQL APIs that enable integrations, partnerships, and mobile apps.",
      },
      {
        title: "Scalable Infrastructure",
        description:
          "Auto-scaling Kubernetes clusters, proper caching strategies, and database optimization for growth.",
      },
    ],
    compliance: ["SOC 2", "GDPR", "ISO 27001"],
    caseStudy: {
      title: "B2B SaaS: MVP to Funding",
      result: "14-week MVP, funding secured, millions of events/day",
      link: "/case-studies/saas-mvp-to-funding",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Terraform"],
    stats: [
      { value: "14", label: "Weeks to MVP" },
      { value: "€3.2M", label: "Series A Raised" },
      { value: "2.1M", label: "Events/Day" },
      { value: "0", label: "Critical Bugs" },
    ],
  },
  manufacturing: {
    name: "Manufacturing & Industrial",
    title: "Digital Transformation for Manufacturing",
    description:
      "Modernize legacy ERP systems, implement IoT solutions, and optimize supply chains without disrupting your operations.",
    icon: Factory,
    heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
    challenges: [
      "Legacy systems that are impossible to modify",
      "Original developers long gone, no documentation",
      "Fear of disrupting production operations",
      "Integrating with modern customer requirements",
      "Real-time visibility into inventory and production",
    ],
    solutions: [
      {
        title: "Strangler Fig Modernization",
        description:
          "Incrementally replace legacy systems without disruption. New capabilities through microservices while maintaining stability.",
      },
      {
        title: "IoT Integration",
        description:
          "Connect machines and sensors for real-time monitoring, predictive maintenance, and production optimization.",
      },
      {
        title: "Supply Chain Visibility",
        description:
          "Real-time tracking of materials, inventory, and orders across your entire supply chain.",
      },
      {
        title: "EDI & Partner Integration",
        description:
          "Modern APIs for customer and supplier integration while maintaining legacy EDI compatibility.",
      },
    ],
    compliance: ["ISO 9001", "GDPR", "Industry 4.0"],
    caseStudy: {
      title: "Legacy ERP Modernization",
      result: "73% modernized, significantly improved accuracy, zero downtime",
      link: "/case-studies/legacy-erp-modernization",
    },
    technologies: ["Node.js", "React", "PostgreSQL", "RabbitMQ", "Azure", "Power BI"],
    stats: [
      { value: "73%", label: "Modernized" },
      { value: "99.2%", label: "Accuracy" },
      { value: "0", label: "Downtime Hours" },
      { value: "€45M", label: "Revenue Supported" },
    ],
  },
  logistics: {
    name: "Logistics & Supply Chain",
    title: "Technology for Logistics & Supply Chain",
    description:
      "Route optimization, fleet management, warehouse systems, and real-time tracking for operational excellence.",
    icon: Truck,
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    challenges: [
      "Optimizing routes across complex networks",
      "Real-time visibility into fleet and shipments",
      "Managing warehouse operations efficiently",
      "Integrating with customer and partner systems",
      "Scaling during peak seasons",
    ],
    solutions: [
      {
        title: "Route Optimization",
        description:
          "AI-powered route planning that considers traffic, delivery windows, and vehicle constraints.",
      },
      {
        title: "Real-Time Tracking",
        description:
          "GPS tracking, ETAs, and proof of delivery for complete shipment visibility.",
      },
      {
        title: "Warehouse Management",
        description:
          "Pick, pack, and ship optimization. Barcode scanning, inventory tracking, and space utilization.",
      },
      {
        title: "Partner Integration",
        description:
          "APIs for customer portals, carrier integration, and third-party logistics providers.",
      },
    ],
    compliance: ["GDPR", "AEO", "ISO 28000"],
    caseStudy: {
      title: "Logistics Tech Due Diligence & Rescue",
      result: "€1.8M saved on acquisition, 3x volume growth, 99.7% uptime",
      link: "/case-studies/logistics-tech-due-diligence",
    },
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "AWS", "Mapbox"],
    stats: [
      { value: "3x", label: "Volume Growth" },
      { value: "99.7%", label: "Uptime" },
      { value: "€1.8M", label: "Cost Saved" },
      { value: "85%", label: "Team Retention" },
    ],
  },
  energy: {
    name: "Energy & Utilities",
    title: "Digital Solutions for Energy & Utilities",
    description:
      "Smart grid management, renewable energy optimization, and IoT-driven monitoring for oil & gas, renewables, and utility companies. Modernize critical infrastructure with confidence.",
    icon: Flame,
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    challenges: [
      "Legacy SCADA systems with limited digital integration",
      "Real-time monitoring across distributed energy assets",
      "Regulatory compliance across multiple jurisdictions",
      "Optimizing renewable energy output with variable conditions",
      "Securing critical infrastructure against cyber threats",
    ],
    solutions: [
      {
        title: "Smart Grid Architecture",
        description:
          "IoT-enabled grid management systems that balance load, predict demand, and optimize energy distribution in real-time across your network.",
      },
      {
        title: "Renewable Energy Optimization",
        description:
          "ML-powered forecasting for solar and wind output, battery storage management, and grid balancing to maximize renewable utilization.",
      },
      {
        title: "Asset Monitoring & Predictive Maintenance",
        description:
          "Sensor data pipelines, anomaly detection, and predictive maintenance models that prevent equipment failures before they happen.",
      },
      {
        title: "SCADA Modernization",
        description:
          "Incremental modernization of legacy SCADA systems with modern APIs, dashboards, and cloud integration — without disrupting operations.",
      },
    ],
    compliance: ["GDPR", "NIS2 Directive", "ISO 27001", "IEC 62351", "NERC CIP"],
    caseStudy: {
      title: "Smart Grid Platform for Energy Provider",
      result: "30% improved grid efficiency, real-time monitoring of 10K+ assets",
      link: "/case-studies",
    },
    technologies: ["AWS IoT", "Kubernetes", "TimescaleDB", "Kafka", "Python", "Terraform"],
    stats: [
      { value: "30%", label: "Grid Efficiency Gain" },
      { value: "10K+", label: "Assets Monitored" },
      { value: "99.95%", label: "System Uptime" },
      { value: "40%", label: "Maintenance Cost Reduction" },
    ],
  },
  government: {
    name: "Government & Public Sector",
    title: "Secure Digital Services for Government",
    description:
      "GovTech platforms, citizen-facing digital services, and compliance-first architecture. We help government organizations modernize while meeting the strictest security and accessibility standards.",
    icon: Landmark,
    heroImage: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80",
    challenges: [
      "Strict security and data sovereignty requirements",
      "Legacy systems that cannot be easily replaced",
      "Accessibility compliance (WCAG 2.1 AA/AAA)",
      "Citizen-facing services with high availability demands",
      "Complex procurement and multi-vendor integration",
    ],
    solutions: [
      {
        title: "Citizen Digital Services",
        description:
          "User-friendly web portals and mobile apps for permits, applications, and public information — accessible to all citizens and meeting WCAG standards.",
      },
      {
        title: "Secure Cloud Architecture",
        description:
          "Government-grade cloud deployments with data sovereignty guarantees, encryption, and comprehensive audit logging on EU-based infrastructure.",
      },
      {
        title: "Legacy System Integration",
        description:
          "API layers and middleware that connect modern digital services with existing government databases and mainframe systems without replacing them.",
      },
      {
        title: "Identity & Access Management",
        description:
          "Integration with national identity systems (eIDAS, DigiD), role-based access control, and secure authentication for government employees and citizens.",
      },
    ],
    compliance: ["GDPR", "NIS2 Directive", "eIDAS", "WCAG 2.1 AA", "ISO 27001", "BIO (NL)"],
    caseStudy: {
      title: "Digital Permit Platform for Municipality",
      result: "60% faster permit processing, 95% citizen satisfaction",
      link: "/case-studies",
    },
    technologies: ["Azure Gov", "Next.js", "PostgreSQL", ".NET", "Keycloak", "Terraform"],
    stats: [
      { value: "60%", label: "Faster Processing" },
      { value: "95%", label: "Citizen Satisfaction" },
      { value: "WCAG AA", label: "Accessibility" },
      { value: "0", label: "Security Incidents" },
    ],
  },
  telecom: {
    name: "Telecommunications",
    title: "Engineering for Telecommunications & Connectivity",
    description:
      "Network management platforms, IoT connectivity solutions, and 5G-ready infrastructure. We help telecom companies build scalable systems that handle millions of connections.",
    icon: Radio,
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    challenges: [
      "Managing millions of concurrent device connections",
      "Real-time network monitoring and fault detection",
      "5G network slicing and edge computing requirements",
      "Legacy BSS/OSS system modernization",
      "IoT device management at scale",
    ],
    solutions: [
      {
        title: "Network Management Platform",
        description:
          "Real-time monitoring, fault detection, and automated remediation for complex network infrastructure with sub-second alerting.",
      },
      {
        title: "IoT Connectivity Platform",
        description:
          "Scalable device management, data ingestion, and analytics for millions of IoT devices with reliable message delivery and OTA updates.",
      },
      {
        title: "5G-Ready Architecture",
        description:
          "Edge computing solutions, network function virtualization, and API gateways designed for 5G network slicing and ultra-low latency applications.",
      },
      {
        title: "BSS/OSS Modernization",
        description:
          "Incremental modernization of billing, provisioning, and operations support systems with microservices and event-driven architecture.",
      },
    ],
    compliance: ["GDPR", "ePrivacy Directive", "NIS2", "ETSI Standards", "3GPP"],
    caseStudy: {
      title: "IoT Platform for Telecom Provider",
      result: "2M+ devices managed, 99.99% message delivery, 50% cost reduction",
      link: "/case-studies",
    },
    technologies: ["AWS", "Kubernetes", "Kafka", "Redis", "Go", "Terraform"],
    stats: [
      { value: "2M+", label: "Devices Managed" },
      { value: "99.99%", label: "Message Delivery" },
      { value: "<50ms", label: "P99 Latency" },
      { value: "50%", label: "Cost Reduction" },
    ],
  },
  automotive: {
    name: "Automotive & Mobility",
    title: "Software Solutions for Automotive & Mobility",
    description:
      "Connected vehicle platforms, autonomous driving data pipelines, and EV charging infrastructure. We help automotive companies navigate the software-defined vehicle transition.",
    icon: Car,
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    challenges: [
      "Processing massive sensor and telemetry data streams",
      "Over-the-air (OTA) update infrastructure at scale",
      "EV charging network management and optimization",
      "Vehicle-to-cloud connectivity with low latency",
      "Cybersecurity for connected vehicle systems",
    ],
    solutions: [
      {
        title: "Connected Vehicle Platform",
        description:
          "Cloud-native platforms for real-time vehicle telemetry, remote diagnostics, fleet management, and driver-facing applications.",
      },
      {
        title: "Autonomous Driving Data Pipeline",
        description:
          "High-throughput data ingestion, storage, and processing for LiDAR, camera, and sensor data. ML training pipelines for perception models.",
      },
      {
        title: "EV Charging Infrastructure",
        description:
          "Charging network management, dynamic pricing, load balancing, and driver-facing apps for seamless EV charging experiences.",
      },
      {
        title: "OTA Update System",
        description:
          "Secure, reliable over-the-air software updates for vehicle fleets with rollback capabilities, A/B testing, and staged rollouts.",
      },
    ],
    compliance: ["GDPR", "UNECE WP.29", "ISO 21434", "ISO 26262", "TISAX"],
    caseStudy: {
      title: "Connected Vehicle Cloud Platform",
      result: "500K+ vehicles connected, real-time telemetry, 99.9% uptime",
      link: "/case-studies",
    },
    technologies: ["AWS", "Kubernetes", "Kafka", "TimescaleDB", "Python", "Rust"],
    stats: [
      { value: "500K+", label: "Vehicles Connected" },
      { value: "1TB+", label: "Daily Data Processed" },
      { value: "99.9%", label: "Platform Uptime" },
      { value: "<100ms", label: "Telemetry Latency" },
    ],
  },
  gaming: {
    name: "Gaming & Interactive Entertainment",
    title: "Backend Engineering for Gaming Companies",
    description:
      "High-performance game backends, real-time multiplayer systems, and matchmaking engines. We build the server infrastructure that makes great games possible.",
    icon: Gamepad2,
    heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    challenges: [
      "Handling unpredictable player load spikes at launch",
      "Sub-50ms latency for real-time multiplayer",
      "Fair and fast matchmaking across skill levels",
      "Anti-cheat and fraud detection systems",
      "Live operations and event management at scale",
    ],
    solutions: [
      {
        title: "Scalable Game Backend",
        description:
          "Auto-scaling server infrastructure that handles launch-day spikes without downtime. Event-driven architecture for millions of concurrent players.",
      },
      {
        title: "Real-Time Multiplayer Systems",
        description:
          "Low-latency WebSocket and UDP-based networking, state synchronization, and conflict resolution for competitive and cooperative gameplay.",
      },
      {
        title: "Matchmaking & Ranking Engine",
        description:
          "ML-enhanced matchmaking that balances skill, latency, and queue times. ELO/Glicko rating systems with anti-smurf detection.",
      },
      {
        title: "Live Operations Platform",
        description:
          "A/B testing, feature flags, event scheduling, and content management for live service games. Real-time analytics for player behavior.",
      },
    ],
    compliance: ["GDPR", "Age Verification (EU)", "PCI-DSS", "USK/PEGI"],
    caseStudy: {
      title: "Multiplayer Backend for Online Game",
      result: "100K concurrent players, <30ms latency, 99.9% uptime",
      link: "/case-studies",
    },
    technologies: ["Go", "Redis", "Kubernetes", "WebSocket", "PostgreSQL", "AWS"],
    stats: [
      { value: "100K+", label: "Concurrent Players" },
      { value: "<30ms", label: "Server Latency" },
      { value: "99.9%", label: "Uptime" },
      { value: "5M+", label: "Events/Second" },
    ],
  },
  "real-estate": {
    name: "Real Estate & PropTech",
    title: "Technology for Real Estate & PropTech",
    description:
      "Smart building platforms, property management systems, and real estate marketplaces. We help PropTech companies and real estate firms digitize their operations.",
    icon: Home,
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    challenges: [
      "Fragmented property data across multiple systems",
      "Smart building IoT integration and management",
      "Tenant experience and engagement platforms",
      "Complex lease management and financial workflows",
      "Real-time property valuation and market analysis",
    ],
    solutions: [
      {
        title: "Property Management Platform",
        description:
          "Unified platforms for lease management, maintenance requests, financial reporting, and tenant communication across entire property portfolios.",
      },
      {
        title: "Smart Building Integration",
        description:
          "IoT sensor integration for HVAC, lighting, occupancy, and energy management. Real-time dashboards and automated building optimization.",
      },
      {
        title: "Real Estate Marketplace",
        description:
          "High-performance listing platforms with advanced search, virtual tours, AI-powered valuation, and seamless buyer/seller/agent workflows.",
      },
      {
        title: "PropTech Data Analytics",
        description:
          "Market analysis, portfolio optimization, and predictive models for property valuation, rental yield forecasting, and investment decisions.",
      },
    ],
    compliance: ["GDPR", "AML/KYC", "EPC Regulations", "BRK (NL Kadaster)"],
    caseStudy: {
      title: "PropTech Platform for Property Manager",
      result: "3,000 units managed, 40% operational cost reduction",
      link: "/case-studies",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "AWS", "Mapbox"],
    stats: [
      { value: "3,000+", label: "Units Managed" },
      { value: "40%", label: "Cost Reduction" },
      { value: "92%", label: "Tenant Satisfaction" },
      { value: "<2s", label: "Search Response" },
    ],
  },
  education: {
    name: "Education & EdTech",
    title: "Scalable Solutions for Education & EdTech",
    description:
      "Learning management systems, AI-powered tutoring platforms, and educational content delivery. We help EdTech companies build products that transform how people learn.",
    icon: GraduationCap,
    heroImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    challenges: [
      "Scaling for unpredictable enrollment spikes",
      "Building engaging, interactive learning experiences",
      "AI-powered personalized learning paths",
      "Accessibility for diverse learner needs (WCAG)",
      "Secure handling of student data and records",
    ],
    solutions: [
      {
        title: "Learning Management System",
        description:
          "Modern LMS platforms with course authoring, progress tracking, assessment tools, and analytics. Supports live, async, and blended learning formats.",
      },
      {
        title: "AI Tutoring & Personalization",
        description:
          "LLM-powered tutoring assistants, adaptive learning paths, and intelligent content recommendations based on individual student performance and goals.",
      },
      {
        title: "Interactive Content Platform",
        description:
          "Rich media delivery, interactive exercises, collaborative workspaces, and real-time collaboration tools for engaging educational experiences.",
      },
      {
        title: "Student Data & Analytics",
        description:
          "Secure student information systems, learning analytics dashboards, and outcome tracking — all GDPR-compliant with proper consent management.",
      },
    ],
    compliance: ["GDPR", "WCAG 2.1 AA", "FERPA (US clients)", "ISO 27001"],
    caseStudy: {
      title: "EdTech Platform Scale-Up",
      result: "50K+ students, AI-powered personalization, 35% completion improvement",
      link: "/case-studies",
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "OpenAI", "AWS"],
    stats: [
      { value: "50K+", label: "Active Students" },
      { value: "35%", label: "Completion Improvement" },
      { value: "99.8%", label: "Platform Uptime" },
      { value: "4.7/5", label: "Student Rating" },
    ],
  },
  insurance: {
    name: "Insurance & InsurTech",
    title: "Digital Solutions for Insurance & InsurTech",
    description:
      "Claims automation, risk assessment AI, and policy management platforms. We help insurance companies and InsurTech startups modernize underwriting, claims, and customer experiences.",
    icon: ShieldCheck,
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    challenges: [
      "Slow claims processing with manual workflows",
      "Legacy policy administration systems",
      "Fraud detection across complex claim patterns",
      "Regulatory compliance (Solvency II, IDD, GDPR)",
      "Customer experience gaps in digital channels",
    ],
    solutions: [
      {
        title: "Claims Automation Platform",
        description:
          "AI-powered claims processing with document extraction, damage assessment, and automated payouts for straightforward claims — reducing processing from weeks to hours.",
      },
      {
        title: "Risk Assessment AI",
        description:
          "ML models for underwriting risk scoring, pricing optimization, and portfolio risk analysis. Explainable AI that meets regulatory requirements.",
      },
      {
        title: "Policy Administration Modernization",
        description:
          "Incremental modernization of legacy policy systems with microservices, enabling new product launches in weeks instead of months.",
      },
      {
        title: "Digital Customer Portal",
        description:
          "Self-service portals for policy management, claims filing, and real-time status tracking. Omnichannel experiences across web, mobile, and chat.",
      },
    ],
    compliance: ["GDPR", "Solvency II", "IDD", "PSD2", "ISO 27001", "DORA"],
    caseStudy: {
      title: "Claims Automation for Insurance Provider",
      result: "70% faster claims, 25% fraud reduction, improved customer NPS",
      link: "/case-studies",
    },
    technologies: ["AWS", "Python", "PostgreSQL", "Kafka", "TensorFlow", "Terraform"],
    stats: [
      { value: "70%", label: "Faster Claims" },
      { value: "25%", label: "Fraud Reduction" },
      { value: "€2.1M", label: "Annual Savings" },
      { value: "+32", label: "NPS Improvement" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.title} | Cloudrix`,
    description: industry.description,
    openGraph: {
      title: `${industry.title} | Cloudrix`,
      description: industry.description,
      url: `https://www.cloudrix.io/industries/${slug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/industries/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    notFound();
  }

  const Icon = industry.icon;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: industry.name, url: `/industries/${slug}` },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Icon className="w-4 h-4" />
                  <span>{industry.name}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {industry.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {industry.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {industry.caseStudy && (
                    <Link
                      href={industry.caseStudy.link}
                      className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                    >
                      View Case Study
                    </Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {industry.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Challenges We Solve
                </h2>
                <ul className="space-y-4">
                  {industry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                        <span className="text-red-600 text-sm font-bold">!</span>
                      </div>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Compliance & Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {industry.compliance.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-50 border border-green-200 px-4 py-2 rounded-lg"
                    >
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored approaches for {industry.name.toLowerCase()} challenges
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Technologies We Use
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industry.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study CTA */}
        {industry.caseStudy && (
          <section className="py-16 bg-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-blue-200 shadow-lg">
                <div className="text-center">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                    Featured Case Study
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                    {industry.caseStudy.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-8">
                    {industry.caseStudy.result}
                  </p>
                  <Link
                    href={industry.caseStudy.link}
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your {industry.name.split(" ")[0]} Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation to discuss your challenges and how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
