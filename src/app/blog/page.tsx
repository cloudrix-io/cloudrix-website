import { Suspense } from "react";
import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";
import { BlogPageClient, type BlogPostData } from "./blog-page-client";

// Static blog posts data for fallback
const staticBlogPosts = [
  {
    _id: "1",
    title: "Cloud Migration Checklist: 15 Steps to a Successful AWS Migration",
    slug: "cloud-migration-checklist-aws",
    excerpt: "A comprehensive guide to planning and executing your AWS cloud migration. From assessment to optimization, learn the proven steps that ensure zero-downtime migrations.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Cloud Architecture",
    tags: ["aws", "cloud migration", "devops"],
    readingTime: 8,
    publishedAt: "2024-01-15",
    isFeatured: true,
  },
  {
    _id: "2",
    title: "Scaling Node.js Applications: From 1K to 100K Users",
    slug: "scaling-nodejs-applications-guide",
    excerpt: "Practical guide to scaling Node.js applications. Clustering, caching, database optimization, and architectural patterns that handle real growth.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Software Development",
    tags: ["nodejs", "scaling", "performance"],
    readingTime: 7,
    publishedAt: "2024-05-05",
    isFeatured: false,
  },
  {
    _id: "3",
    title: "Terraform vs Pulumi vs CloudFormation: IaC Tool Comparison",
    slug: "terraform-vs-pulumi-vs-cloudformation-comparison",
    excerpt: "Detailed comparison of Infrastructure as Code tools. When to use Terraform, Pulumi, or CloudFormation based on team skills and project requirements.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "DevOps",
    tags: ["terraform", "pulumi", "iac"],
    readingTime: 6,
    publishedAt: "2024-04-28",
    isFeatured: false,
  },
  {
    _id: "4",
    title: "How to Build an MVP in 12 Weeks: A Technical Founder's Guide",
    slug: "build-mvp-12-weeks-technical-guide",
    excerpt: "Practical roadmap for building a production-ready MVP in 12 weeks. Technology choices, scope management, and avoiding common pitfalls.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Software Development",
    tags: ["mvp", "startup", "product"],
    readingTime: 6,
    publishedAt: "2024-04-20",
    isFeatured: false,
  },
  {
    _id: "5",
    title: "API Security Best Practices: Protecting Your Backend in 2025",
    slug: "api-security-best-practices-2025",
    excerpt: "Comprehensive guide to API security. Authentication, authorization, rate limiting, input validation, and common vulnerabilities to avoid.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Software Development",
    tags: ["api", "security", "backend"],
    readingTime: 7,
    publishedAt: "2024-04-10",
    isFeatured: false,
  },
  {
    _id: "6",
    title: "AWS Cost Optimization: 15 Ways to Cut Your Cloud Bill by 40%",
    slug: "aws-cost-optimization-reduce-cloud-bill",
    excerpt: "Practical strategies to reduce your AWS spend without sacrificing performance. Reserved instances, right-sizing, and architectural patterns that save money.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Cloud Architecture",
    tags: ["aws", "cost-optimization", "finops"],
    readingTime: 7,
    publishedAt: "2024-04-02",
    isFeatured: false,
  },
  {
    _id: "7",
    title: "Microservices vs Monolith: When to Make the Switch",
    slug: "microservices-vs-monolith-when-to-switch",
    excerpt: "Stop following trends blindly. Learn the real criteria for choosing between monolithic and microservices architectures.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Cloud Architecture",
    tags: ["microservices", "monolith", "architecture"],
    readingTime: 6,
    publishedAt: "2024-03-25",
    isFeatured: false,
  },
  {
    _id: "8",
    title: "Technical Debt: How to Quantify It and Convince Leadership to Fix It",
    slug: "technical-debt-quantify-convince-leadership",
    excerpt: "Learn how to measure technical debt in euros, not just gut feelings. Frameworks for communicating technical debt to non-technical stakeholders.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Technical Leadership",
    tags: ["technical-debt", "leadership", "engineering-management"],
    readingTime: 6,
    publishedAt: "2024-03-18",
    isFeatured: false,
  },
  {
    _id: "9",
    title: "React vs Vue vs Angular: Which Framework for Your Enterprise App?",
    slug: "react-vs-vue-vs-angular-enterprise-comparison",
    excerpt: "Objective comparison of React, Vue, and Angular for enterprise applications. Performance, ecosystem, hiring, and maintainability considerations.",
    author: { name: "Firas Sayah", role: "Founder & Principal Engineer" },
    category: "Software Development",
    tags: ["react", "vue", "angular", "frontend"],
    readingTime: 6,
    publishedAt: "2024-03-10",
    isFeatured: false,
  },
];

export const metadata: Metadata = {
  title: "Blog - Cloud & Software Engineering Insights",
  description:
    "Expert insights on cloud architecture, DevOps, software development, and digital transformation. Practical guides and industry best practices from senior engineers.",
  openGraph: {
    title: "Blog - Cloud & Software Engineering Insights | Cloudrix",
    description:
      "Expert insights on cloud architecture, DevOps, software development, and digital transformation.",
    url: "https://www.cloudrix.io/blog",
    type: "website",
    images: [
      {
        url: "/og?title=Engineering%20Blog&subtitle=Insights%20from%20senior%20cloud%20engineers&type=blog",
        width: 1200,
        height: 630,
        alt: "Cloudrix Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Cloud & Software Engineering Insights | Cloudrix",
    description:
      "Expert insights on cloud architecture, DevOps, and software development.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/blog",
  },
};

async function getBlogPosts() {
  try {
    await connectDB();

    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .lean();

    if (posts && posts.length > 0) {
      return {
        posts: JSON.parse(JSON.stringify(posts)) as BlogPostData[],
      };
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
  // Fallback to static data
  return {
    posts: staticBlogPosts as unknown as BlogPostData[],
  };
}

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Free Engineering Intel
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                The stuff we wish someone told us before we wasted months figuring it out.
                Real lessons from real projects. No fluff. No theory-only BS.
              </p>
            </div>
          </div>
        </section>

        {/* Client-side interactive blog content */}
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse mb-3" />
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }>
          <BlogPageClient posts={posts} />
        </Suspense>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Don&apos;t Miss the Good Stuff
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              One email per week with insights that actually matter.
              No fluff. No sales pitches. Just engineering gold.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Join 500+ engineering leaders. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Reading Is Nice. Results Are Better.
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Still stuck after reading everything? Sometimes you need an expert
              who&apos;s done it 100 times before. We can help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Book Free Consultation
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
