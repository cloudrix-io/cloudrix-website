/**
 * Migration script: Update MongoDB data to remove unverifiable claims
 *
 * Updates: case studies, stats, team members, company info, trust points
 * Does NOT touch: services, blog posts, technologies, admin, process steps
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {
  CaseStudy,
  CompanyInfo,
  TeamMember,
  Stat,
  TrustPoint,
} from "../src/lib/models";
import { caseStudies as referenceScenarios } from "../src/data/case-studies";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

// ============================================================================
// REFERENCE SCENARIOS — mirrors src/data/case-studies.ts (single source of
// truth). These are clearly-labeled illustrative engagement blueprints, NOT
// client case studies: no invented outcome metrics, no fabricated
// testimonials, no fake endorsements. Metrics hold factual engagement
// parameters only (timeline, budget range, staffing).
// ============================================================================
const caseStudiesData = referenceScenarios.map((scenario, index) => ({
  title: scenario.title,
  slug: scenario.slug,
  client: scenario.client,
  industry: scenario.industry,
  description: scenario.description,
  duration: scenario.duration,
  challenge: scenario.challenge,
  solution: scenario.solution,
  results: scenario.results,
  technologies: scenario.technologies,
  // Intentionally no testimonial: we have no named clients yet and will not
  // invent anonymous quotes.
  metrics: scenario.metrics,
  image: scenario.image,
  order: index + 1,
  isActive: true,
  isFeatured: index < 2,
}));

// ============================================================================
// UPDATED STATS — honest, verifiable
// ============================================================================
const statsData = [
  { value: "8+", label: "Years Engineering Experience", order: 1, isActive: true },
  { value: "NL", label: "KVK-Registered Entity", order: 2, isActive: true },
  { value: "CET", label: "EU Timezone Coverage", order: 3, isActive: true },
  { value: "24h", label: "Response Time", order: 4, isActive: true },
];

// ============================================================================
// UPDATED TEAM — only Firas (real person)
// ============================================================================
const teamMembersData = [
  {
    name: "Firas Sayah",
    role: "Founder & Lead Engineer",
    bio: "Full-stack engineer with 8+ years of experience building production systems. Specializes in cloud architecture, AI systems, and scalable applications. Previously worked with companies across Europe on Angular, PHP, NestJS, and cloud platforms. KVK-registered in the Netherlands.",
    email: "firas@cloudrix.io",
    linkedin: "https://linkedin.com/in/firassayah",
    github: "https://github.com/firassayah",
    order: 1,
    isActive: true,
  },
];

// ============================================================================
// UPDATED COMPANY INFO — honest founding date
// ============================================================================
const companyInfoUpdate = {
  tagline: "AI-Powered Engineering for European Companies",
  description: "Cloudrix is a Dutch-registered consultancy that helps European companies build, scale, and optimize their software systems. From AI agent deployment and RAG systems to cloud architecture and EU AI Act compliance, we deliver production-grade solutions with a focus on reliability, security, and regulatory compliance.",
  founded: 2026,
  heroTitle: "Senior Engineering & AI for European Companies",
  heroSubtitle: "Cloud architecture, AI systems, and product development for European companies. A Dutch-registered consultancy with 8+ years of hands-on engineering experience. EU AI Act compliant.",
  ctaTitle: "Let's Talk About Your Project",
  ctaSubtitle: "Book a free 30-minute call — no sales pitch, just an honest conversation about your technical challenges and whether we're the right fit.",
};

// ============================================================================
// UPDATED TRUST POINTS — verifiable only
// ============================================================================
const trustPointsData = [
  {
    title: "Dutch KVK Entity",
    description: "Cloudrix is a proper Dutch-registered company. KVK-certified, EU contracts, transparent invoicing.",
    icon: "Shield",
    order: 1,
    isActive: true,
  },
  {
    title: "GDPR-Compliant Practices",
    description: "Data protection built into every project. EU data residency, encryption, proper consent management.",
    icon: "Shield",
    order: 2,
    isActive: true,
  },
  {
    title: "EUR Invoicing",
    description: "Simple, transparent EUR billing from our Netherlands entity. No currency hassle, no hidden fees.",
    icon: "CreditCard",
    order: 3,
    isActive: true,
  },
  {
    title: "CET Timezone",
    description: "Same-day responses, real-time collaboration. No async delays across timezones.",
    icon: "Globe",
    order: 4,
    isActive: true,
  },
  {
    title: "NDA Available",
    description: "We sign NDAs before any sensitive discussion. Your intellectual property is protected.",
    icon: "Lock",
    order: 5,
    isActive: true,
  },
  {
    title: "Senior Engineers Only",
    description: "8+ years of hands-on production experience. No juniors learning on your project.",
    icon: "CheckCircle",
    order: 6,
    isActive: true,
  },
];

// ============================================================================
// MIGRATION FUNCTION
// ============================================================================
async function migrate() {
  try {
    console.log("Starting honesty migration...");
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // 1. Replace case studies with clearly-labeled reference scenarios
    console.log("\n1. Replacing case studies with reference scenarios (no invented proof)...");
    await CaseStudy.deleteMany({});
    await CaseStudy.insertMany(caseStudiesData);
    console.log(`   Done: ${caseStudiesData.length} reference scenarios (illustrative blueprints, no testimonials/fake metrics)`);

    // 2. Replace stats
    console.log("\n2. Replacing stats with verifiable facts...");
    await Stat.deleteMany({});
    await Stat.insertMany(statsData);
    console.log("   Done: 4 honest stats");

    // 3. Replace team members (keep only Firas)
    console.log("\n3. Replacing team members (removing fictional members)...");
    await TeamMember.deleteMany({});
    await TeamMember.insertMany(teamMembersData);
    console.log("   Done: 1 real team member (Firas Sayah)");

    // 4. Update company info
    console.log("\n4. Updating company info (founding date, copy)...");
    await CompanyInfo.updateMany({}, { $set: companyInfoUpdate });
    console.log("   Done: founding date corrected to 2026, copy updated");

    // 5. Replace trust points
    console.log("\n5. Replacing trust points with verifiable claims...");
    await TrustPoint.deleteMany({});
    await TrustPoint.insertMany(trustPointsData);
    console.log("   Done: 6 honest trust points");

    console.log("\n" + "=".repeat(50));
    console.log("MIGRATION COMPLETE!");
    console.log("=".repeat(50));
    console.log("\nChanges applied:");
    console.log("  - Case studies: replaced by reference scenarios (illustrative blueprints; all invented metrics, testimonials, and endorsements removed)");
    console.log("  - Stats: replaced with verifiable facts (8+ yrs, KVK, CET, 24h)");
    console.log("  - Team: only Firas Sayah (fictional members removed)");
    console.log("  - Company info: founding date fixed to 2026");
    console.log("  - Trust points: only verifiable claims");
    console.log("\nNOT touched: services, blog posts, technologies, admin, process steps");
    console.log("");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

migrate();
