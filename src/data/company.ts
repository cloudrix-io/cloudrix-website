import { ProcessStep, TeamMember } from "@/types";

export const companyInfo = {
  name: "Cloudrix",
  tagline: "European-Standard Engineering, Global Expertise",
  description:
    "We help EU companies build, scale, and optimize their software systems. From cloud architecture to full-stack development, we deliver production-grade solutions with a focus on reliability, security, and maintainability.",
  founded: 2024,
  location: "Tunisia (serving EU clients)",
  email: "hello@cloudrix.io",
  phone: "+216 XX XXX XXX",
  linkedin: "https://linkedin.com/company/cloudrix",
  github: "https://github.com/cloudrix",
};

export const trustPoints = [
  {
    title: "EU Standards",
    description: "GDPR-compliant, secure delivery practices",
  },
  {
    title: "EUR Invoicing",
    description: "Simple billing, no currency hassle",
  },
  {
    title: "Remote-First",
    description: "Async communication, EU timezone overlap",
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
  { value: "50+", label: "Projects Delivered" },
  { value: "8+", label: "Years Experience" },
  { value: "99.9%", label: "Client Satisfaction" },
  { value: "15+", label: "EU Clients Served" },
];
