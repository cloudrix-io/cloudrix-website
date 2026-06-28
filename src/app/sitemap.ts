import { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { technologies } from "@/data/technologies";
import { roles } from "@/data/roles";
import { complianceFrameworks } from "@/data/compliance";
import dbConnect from "@/lib/mongodb";
import { BlogPost, Service } from "@/lib/models";

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

  // Fetch blog posts and services from database
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  let serviceSlugs: string[] = [];
  try {
    await dbConnect();
    const [posts, services] = await Promise.all([
      BlogPost.find({ status: "published" }).select("slug updatedAt").lean(),
      Service.find({ isActive: true }).select("slug").lean(),
    ]);
    blogPosts = posts;
    serviceSlugs = services.map((s) => s.slug);
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
      url: `${baseUrl}/ai-services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/eu-ai-act`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ai-tools/compliance-scanner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-tools/scope-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-tools/readiness-assessment`,
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

  // Static service slug fallback
  if (serviceSlugs.length === 0) {
    serviceSlugs = [
      "cloud-migration", "devops-consulting", "ai-consulting",
      "full-stack-development", "technical-due-diligence", "dedicated-teams",
      "api-development", "llm-integration", "legacy-modernization",
    ];
  }

  // Dynamic service pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    "toptal-alternative",
    "thoughtworks-alternative",
    "epam-alternative",
  ].map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // City + Service pages
  const cityServiceCombos = ["cloud-migration", "devops-consulting", "ai-consulting", "full-stack-development", "dedicated-teams", "llm-integration", "legacy-modernization", "technical-due-diligence", "api-development"];
  const dutchCities = ["amsterdam", "rotterdam", "the-hague", "utrecht", "eindhoven"];
  const cityServicePages: MetadataRoute.Sitemap = cityServiceCombos.flatMap((service) =>
    dutchCities.map((city) => ({
      url: `${baseUrl}/services/${service}/${city}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Blog category pages
  const blogCategoryPages: MetadataRoute.Sitemap = [
    "cloud-architecture", "devops", "ai-ml", "software-development", "technical-leadership",
  ].map((slug) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Market pages
  const marketSlugs = [
    "markets",
    "markets/us",
    "markets/us/new-york",
    "markets/us/san-francisco",
    "markets/us/austin",
    "markets/us/boston",
    "markets/middle-east",
    "markets/uae",
    "markets/uae/dubai",
    "markets/saudi-arabia",
    "markets/qatar",
    "markets/asia-pacific",
    "markets/singapore",
    "markets/australia",
    "markets/japan",
    "markets/south-korea",
    "markets/africa",
    "markets/nigeria",
    "markets/kenya",
    "markets/south-africa",
    "markets/latin-america",
    "markets/brazil",
    "markets/mexico",
    "markets/uk",
    "markets/germany",
  ];
  const marketPages: MetadataRoute.Sitemap = marketSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "markets" ? 0.8 : 0.7,
  }));

  // Technology pages
  const technologyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/technologies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...technologies.map((tech) => ({
      url: `${baseUrl}/technologies/${tech.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Hire pages
  const hirePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/hire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...roles.map((role) => ({
      url: `${baseUrl}/hire/${role.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Compliance pages
  const compliancePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compliance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...complianceFrameworks
      .filter((f) => !f.externalLink)
      .map((framework) => ({
        url: `${baseUrl}/compliance/${framework.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];

  return [...staticPages, ...servicePages, ...comparisonPages, ...cityServicePages, ...blogCategoryPages, ...caseStudyPages, ...blogPages, ...industryPages, ...marketPages, ...technologyPages, ...hirePages, ...compliancePages];
}
