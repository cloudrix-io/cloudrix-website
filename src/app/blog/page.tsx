import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Blog - Cloud & Software Engineering Insights | Cloudrix",
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

const categories = [
  "All",
  "Cloud Architecture",
  "DevOps",
  "Software Development",
  "Technical Leadership",
  "Tutorials",
];

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    role?: string;
    image?: string;
  };
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;
  publishedAt: string;
  isFeatured: boolean;
}

async function getBlogPosts() {
  try {
    await connectDB();

    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .lean();

    return {
      posts: JSON.parse(JSON.stringify(posts)) as BlogPostData[],
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      posts: [],
    };
  }
}

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const regularPosts = posts.filter((p) => p._id !== featuredPost?._id);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      <div className="bg-white">
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

        {/* Categories Filter */}
        <section className="border-b border-gray-200 sticky top-16 bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Coming Soon</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We&apos;re working on bringing you valuable insights on cloud architecture,
                  DevOps, and software development. Check back soon!
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Notified When We Launch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-16">
                    <Link href={`/blog/${featuredPost.slug}`} className="group">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="relative h-64 lg:h-full min-h-[300px]">
                          {featuredPost.featuredImage ? (
                            <Image
                              src={featuredPost.featuredImage}
                              alt={featuredPost.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-6xl text-white/20 font-bold">C</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="p-8 lg:py-12">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                              {featuredPost.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {featuredPost.readingTime} min read
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">
                                  {featuredPost.author.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {featuredPost.author.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                            <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                              Read More
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
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
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-4xl text-gray-300 font-bold">C</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

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
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
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
