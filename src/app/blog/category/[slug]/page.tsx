import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ArrowRight } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

const categories: Record<string, { name: string; description: string; dbCategory: string }> = {
  "cloud-architecture": {
    name: "Cloud Architecture",
    description: "Guides and insights on cloud migration, AWS, Azure, GCP, and infrastructure design for companies worldwide.",
    dbCategory: "Cloud Architecture",
  },
  devops: {
    name: "DevOps",
    description: "CI/CD pipelines, Kubernetes, monitoring, automation, and DevOps best practices.",
    dbCategory: "DevOps",
  },
  "ai-ml": {
    name: "AI & Machine Learning",
    description: "LLM integration, RAG systems, AI strategy, GDPR-compliant AI, and practical ML implementation guides.",
    dbCategory: "AI & Machine Learning",
  },
  "software-development": {
    name: "Software Development",
    description: "Full-stack development, legacy modernization, technical debt, and modern application architecture.",
    dbCategory: "Software Development",
  },
  "technical-leadership": {
    name: "Technical Leadership",
    description: "Hiring, team building, outsourcing, technical due diligence, and engineering management.",
    dbCategory: "Technical Leadership",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    return { title: "Category Not Found | Cloudrix Blog" };
  }

  return {
    title: `${category.name} Articles | Cloudrix Blog`,
    description: category.description,
    openGraph: {
      title: `${category.name} Articles | Cloudrix Blog`,
      description: category.description,
      url: `https://www.cloudrix.io/blog/category/${slug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/blog/category/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

async function getCategoryPosts(dbCategory: string) {
  try {
    await connectDB();
    const posts = await BlogPost.find({
      isPublished: true,
      category: dbCategory,
    })
      .sort({ publishedAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    notFound();
  }

  const posts = await getCategoryPosts(category.dbCategory);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: category.name, url: `/blog/category/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                Blog Category
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: { _id: string; slug: string; title: string; excerpt: string; readingTime: number; publishedAt: string; featuredImage?: string; author: { name: string } }) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          <span className="text-4xl text-blue-200 font-bold">C</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </span>
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-6">
                  No articles in this category yet. Check back soon!
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-blue-600 font-medium hover:underline group"
                >
                  Browse all articles
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help With {category.name}?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our senior engineers can help you put these concepts into practice.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium group"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
