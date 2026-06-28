import { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import dbConnect from "@/lib/mongodb";
import { BlogPost } from "@/lib/models";

// Industry slugs for sitemap
const industries = [
  "fintech",
  "healthcare",
  "saas",
  "ecommerce",
  "manufacturing",
  "logistics",
];

// Static blog post slugs as fallback when MongoDB is unavailable
const staticBlogSlugs = [
  "cloud-migration-checklist-aws",
  "scaling-nodejs-applications-guide",
  "terraform-vs-pulumi-vs-cloudformation-comparison",
  "build-mvp-12-weeks-technical-guide",
  "api-security-best-practices-2025",
  "aws-cost-optimization-reduce-cloud-bill",
  "microservices-vs-monolith-when-to-switch",
  "technical-debt-quantify-convince-leadership",
  "react-vs-vue-vs-angular-enterprise-comparison",
  "gdpr-compliant-cloud-architecture-guide",
  "devops-engineer-cost-europe-salary-guide",
  "postgresql-performance-optimization-tips",
  "cicd-best-practices-pipelines",
  "kubernetes-vs-serverless-architecture",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudrix.io";

  // Fetch blog posts from database, fallback to static slugs
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    await dbConnect();
    blogPosts = await BlogPost.find({ status: "published" })
      .select("slug updatedAt")
      .lean();
  } catch {
    // DB connection failed
  }

  // Use static fallback if DB returned no results
  if (blogPosts.length === 0) {
    blogPosts = staticBlogSlugs.map((slug) => ({
      slug,
      updatedAt: new Date(),
    }));
  }

  // Static pages with language alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // New high-value pages
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/linkedin-templates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic case study pages with images
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
    images: study.image ? [study.image] : [`${baseUrl}/og-case-studies.png`],
  }));

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic industry pages
  const industryPages: MetadataRoute.Sitemap = industries.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages, ...industryPages];
}
