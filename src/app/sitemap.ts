import { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudrix.io";

  // Static pages with language alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          fr: baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/services`,
          fr: `${baseUrl}/services`,
        },
      },
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/case-studies`,
          fr: `${baseUrl}/case-studies`,
        },
      },
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/how-we-work`,
          fr: `${baseUrl}/how-we-work`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          fr: `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          fr: `${baseUrl}/contact`,
        },
      },
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

  return [...staticPages, ...caseStudyPages];
}
