import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2, Linkedin, Twitter } from "lucide-react";
import sanitizeHtml from "sanitize-html";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedServices } from "@/components/blog/related-services";
import { ReadingProgressBar, BackToTopButton, CopyLinkButton } from "@/components/blog/blog-post-client";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    await connectDB();

    const post = await BlogPost.findOne({ slug, isPublished: true }).lean();

    if (!post) return null;

    // Get related posts
    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      isPublished: true,
      category: post.category,
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    return {
      post: JSON.parse(JSON.stringify(post)),
      relatedPosts: JSON.parse(JSON.stringify(relatedPosts)),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogPost(slug);

  if (!data) {
    return {
      title: "Post Not Found | Cloudrix Blog",
    };
  }

  const { post } = data;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title: `${title} | Cloudrix Blog`,
    description,
    openGraph: {
      title: `${title} | Cloudrix Blog`,
      description,
      url: `https://www.cloudrix.io/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.featuredImage || `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category)}&type=blog`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Cloudrix Blog`,
      description,
      images: [post.featuredImage || `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category)}&type=blog`],
    },
    alternates: {
      canonical: `https://www.cloudrix.io/blog/${post.slug}`,
    },
  };
}

export const dynamicParams = true;

const STATIC_BLOG_SLUGS = [
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
  "cloud-migration-cost-calculator-guide",
  "hire-cloud-architect-europe",
  "devops-consulting-guide",
  "technical-due-diligence-checklist-ma",
  "aws-vs-azure-vs-gcp-europe",
  "how-to-reduce-aws-bill-40-percent",
  "signs-legacy-system-needs-modernization",
  "why-cloud-migration-failed-7-mistakes",
  "toptal-vs-boutique-agencies-comparison",
  "in-house-vs-outsourced-development-eu-cost",
  "nearshore-vs-offshore-netherlands-teams",
  "true-cost-technical-debt",
  "llm-integration-enterprise-architecture-guide",
  "how-to-build-rag-system-guide",
  "ai-strategy-european-companies-gdpr",
  "ai-automation-real-use-cases-roi",
  "eu-ai-act-compliance-checklist",
  "ai-integration-cost-europe",
  "rag-vs-fine-tuning-comparison",
  "building-first-ai-agent-guide",
  "why-ai-agent-projects-fail",
];

export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ isPublished: true }).select("slug").lean();
    if (posts.length > 0) {
      return posts.map((post) => ({ slug: post.slug }));
    }
  } catch {
    // Fall through to static fallback
  }
  return STATIC_BLOG_SLUGS.map((slug) => ({ slug }));
}

// Category-based gradient and emoji mapping for posts without featured images
const CATEGORY_STYLES: Record<string, { gradient: string; emoji: string }> = {
  "Cloud Architecture": {
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    emoji: "\u2601\uFE0F",
  },
  "DevOps": {
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    emoji: "\u2699\uFE0F",
  },
  "AI & Machine Learning": {
    gradient: "from-purple-700 via-purple-500 to-fuchsia-400",
    emoji: "\uD83E\uDDE0",
  },
  "Software Development": {
    gradient: "from-orange-600 via-orange-500 to-amber-400",
    emoji: "\uD83D\uDCBB",
  },
  "Technical Leadership": {
    gradient: "from-slate-700 via-slate-500 to-slate-400",
    emoji: "\uD83C\uDFAF",
  },
  "Tutorials": {
    gradient: "from-teal-600 via-teal-500 to-cyan-400",
    emoji: "\uD83D\uDCDA",
  },
  "Industry Insights": {
    gradient: "from-indigo-700 via-indigo-500 to-blue-400",
    emoji: "\uD83D\uDD2D",
  },
  "Case Studies": {
    gradient: "from-emerald-700 via-emerald-500 to-green-400",
    emoji: "\uD83D\uDCC8",
  },
};

const DEFAULT_CATEGORY_STYLE = {
  gradient: "from-blue-600 via-blue-500 to-cyan-400",
  emoji: "\u2601\uFE0F",
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] || DEFAULT_CATEGORY_STYLE;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogPost(slug);

  if (!data) {
    notFound();
  }

  const { post, relatedPosts } = data;
  const categoryStyle = getCategoryStyle(post.category);
  const postUrl = `https://www.cloudrix.io/blog/${post.slug}`;

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "https://www.cloudrix.io/og-image.png",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Cloudrix",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cloudrix.io/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-8 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-5">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  {post.author.role && (
                    <div className="text-sm text-gray-500">{post.author.role}</div>
                  )}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-1">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <CopyLinkButton url={postUrl} />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image or Category Gradient Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          {post.featuredImage ? (
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div
              className={`relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${categoryStyle.gradient}`}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute top-20 right-20 w-48 h-48 border-2 border-white rounded-full" />
                <div className="absolute bottom-10 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 border-2 border-white rounded-full" />
              </div>
              {/* Content overlay */}
              <div className="relative h-full flex flex-col items-center justify-center text-white px-8 text-center">
                <span className="text-6xl lg:text-7xl mb-6 drop-shadow-lg">
                  {categoryStyle.emoji}
                </span>
                <p className="text-sm font-medium uppercase tracking-widest text-white/80 mb-3">
                  {post.category}
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold max-w-2xl leading-snug drop-shadow-md">
                  {post.title}
                </h2>
              </div>
            </div>
          )}
        </section>

        {/* Article Content with TOC */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
              <div className="max-w-3xl">
                {/* Mobile TOC */}
                <TableOfContents content={post.content} />

                <article
                  className="
                    prose prose-lg prose-blue max-w-none

                    /* Headings */
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                    prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-10 prose-h3:mb-4
                    prose-h4:text-lg prose-h4:sm:text-xl prose-h4:mt-8 prose-h4:mb-3

                    /* Paragraphs */
                    prose-p:text-gray-700 prose-p:leading-[1.8]

                    /* Links */
                    prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium
                    prose-a:border-b prose-a:border-blue-200 hover:prose-a:border-blue-500
                    hover:prose-a:text-blue-700

                    /* Inline code */
                    prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                    prose-code:text-[0.875em] prose-code:font-medium prose-code:text-gray-800
                    prose-code:before:content-none prose-code:after:content-none

                    /* Code blocks */
                    prose-pre:bg-[#1e1e2e] prose-pre:text-gray-100 prose-pre:rounded-xl
                    prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-800
                    prose-pre:overflow-x-auto prose-pre:p-5

                    /* Blockquotes */
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                    prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg
                    prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic
                    prose-blockquote:text-gray-700 prose-blockquote:font-normal

                    /* Lists */
                    prose-ul:my-6 prose-ol:my-6
                    prose-li:text-gray-700 prose-li:leading-[1.8]
                    prose-li:marker:text-blue-500

                    /* Tables */
                    prose-table:overflow-hidden prose-table:rounded-lg prose-table:shadow-sm
                    prose-table:border prose-table:border-gray-200
                    prose-thead:bg-gray-50
                    prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-gray-900
                    prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:border-t prose-td:border-gray-100

                    /* Images */
                    prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:max-w-full prose-img:h-auto

                    /* Figures */
                    prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-500 prose-figcaption:mt-3

                    /* HR */
                    prose-hr:border-gray-200 prose-hr:my-12

                    /* Strong */
                    prose-strong:text-gray-900 prose-strong:font-semibold
                  "
                >
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "h4", "h5", "h6", "figure", "figcaption", "video", "source", "iframe", "pre", "code", "span"]),
                    allowedAttributes: {
                      ...sanitizeHtml.defaults.allowedAttributes,
                      img: ["src", "alt", "title", "width", "height", "loading"],
                      a: ["href", "target", "rel", "title"],
                      code: ["class"],
                      span: ["class"],
                      pre: ["class"],
                      iframe: ["src", "width", "height", "frameborder", "allowfullscreen", "title"],
                      h2: ["id"],
                      h3: ["id"],
                    },
                    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
                  }) }} />
                </article>

                {/* Related Services */}
                {post.relatedServiceSlugs && post.relatedServiceSlugs.length > 0 && (
                  <RelatedServices serviceSlugs={post.relatedServiceSlugs} />
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-14 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-5 h-5 text-gray-400" />
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Box */}
                <div className="mt-14 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-2xl">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                        Written by
                      </p>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {post.author.name}
                        </h3>
                        {post.author.linkedin && (
                          <a
                            href={post.author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            aria-label={`${post.author.name} on LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {post.author.role && (
                        <p className="text-gray-600 mb-2 font-medium">{post.author.role}</p>
                      )}
                      {post.author.credentials && (
                        <p className="text-gray-500 text-sm mb-3">{post.author.credentials}</p>
                      )}
                      <Link href="/about" className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                        Learn more about our team
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop TOC Sidebar */}
              <TableOfContents content={post.content} />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: typeof post) => {
                  const relatedCategoryStyle = getCategoryStyle(relatedPost.category);
                  return (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="relative h-40">
                        {relatedPost.featuredImage ? (
                          <Image
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${relatedCategoryStyle.gradient} flex items-center justify-center`}>
                            <span className="text-4xl drop-shadow-md">{relatedCategoryStyle.emoji}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="text-sm text-gray-500 mb-2">
                          {relatedPost.readingTime} min read
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help Implementing This?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Our senior engineers can help you put these concepts into practice.
              Book a free consultation to discuss your project.
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
                href="/blog"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                More Articles
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  );
}

export const revalidate = 60;
