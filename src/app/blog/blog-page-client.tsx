"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  ArrowUpDown,
  X,
} from "lucide-react";

export interface BlogPostData {
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

const POSTS_PER_PAGE = 8;

const CATEGORIES = [
  "All",
  "Cloud Architecture",
  "DevOps",
  "Software Development",
  "AI & Machine Learning",
  "Technical Leadership",
  "Tutorials",
];

interface BlogPageClientProps {
  posts: BlogPostData[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const currentPage = Number(searchParams.get("page")) || 1;
  const activeCategory = searchParams.get("category") || "All";

  // Local state for search and sort (not in URL to avoid noisy history)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Build new URL with updated search params
  const buildUrl = useCallback(
    (params: { page?: number; category?: string }) => {
      const newParams = new URLSearchParams();
      const page = params.page ?? currentPage;
      const category = params.category ?? activeCategory;

      if (page > 1) newParams.set("page", String(page));
      if (category !== "All") newParams.set("category", category);

      const qs = newParams.toString();
      return qs ? `/blog?${qs}` : "/blog";
    },
    [currentPage, activeCategory]
  );

  // Identify featured post (only shown on page 1 with no filters)
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  // Filter, search, and sort logic
  const processedPosts = useMemo(() => {
    let result = posts.filter((p) => p._id !== featuredPost?._id);

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter (title match, case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, activeCategory, searchQuery, sortOrder, featuredPost]);

  // Check if featured post matches current filters
  const showFeatured = useMemo(() => {
    if (currentPage !== 1) return false;
    if (activeCategory !== "All" && featuredPost?.category !== activeCategory)
      return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      if (
        !featuredPost?.title.toLowerCase().includes(query) &&
        !featuredPost?.excerpt.toLowerCase().includes(query) &&
        !featuredPost?.tags.some((t) => t.toLowerCase().includes(query))
      )
        return false;
    }
    return true;
  }, [currentPage, activeCategory, searchQuery, featuredPost]);

  // Pagination
  const totalPosts = processedPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalPosts);
  const paginatedPosts = processedPosts.slice(startIndex, endIndex);

  // Navigation handlers
  const handleCategoryChange = (category: string) => {
    router.push(buildUrl({ page: 1, category }), { scroll: false });
  };

  const handlePageChange = (page: number) => {
    router.push(buildUrl({ page }), { scroll: false });
    // Scroll to blog content area
    document
      .getElementById("blog-content")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (safePage > 3) pages.push("ellipsis");

    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (safePage < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  const allPostsCount = totalPosts + (showFeatured ? 1 : 0);

  return (
    <>
      {/* Categories Filter + Search Bar */}
      <section
        className="border-b border-gray-200 sticky top-16 bg-white z-40"
        id="blog-content"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category buttons */}
          <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === activeCategory
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and sort row */}
          <div className="flex flex-col sm:flex-row gap-3 pb-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title, excerpt, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort toggle */}
            <button
              onClick={toggleSortOrder}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>
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
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Blog Coming Soon
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We&apos;re working on bringing you valuable insights on cloud
                architecture, DevOps, and software development. Check back soon!
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
              {/* Post count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-gray-500">
                  {allPostsCount === 0 ? (
                    "No posts found"
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-medium text-gray-700">
                        {startIndex + 1 + (showFeatured ? 0 : 0)}
                      </span>
                      -
                      <span className="font-medium text-gray-700">
                        {Math.min(endIndex, totalPosts) +
                          (showFeatured ? 1 : 0)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-700">
                        {allPostsCount}
                      </span>{" "}
                      posts
                      {activeCategory !== "All" && (
                        <>
                          {" "}
                          in{" "}
                          <span className="font-medium text-blue-600">
                            {activeCategory}
                          </span>
                        </>
                      )}
                      {searchQuery.trim() && (
                        <>
                          {" "}
                          matching &quot;
                          <span className="font-medium text-blue-600">
                            {searchQuery.trim()}
                          </span>
                          &quot;
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>

              {/* No results after filtering */}
              {allPostsCount === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter to find what you&apos;re
                    looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      router.push("/blog", { scroll: false });
                    }}
                    className="text-blue-600 font-medium hover:text-blue-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Featured Post (page 1 only, when matching filters) */}
              {showFeatured && featuredPost && (
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
                            <span className="text-6xl text-white/20 font-bold">
                              C
                            </span>
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
                                {new Date(
                                  featuredPost.publishedAt
                                ).toLocaleDateString("en-US", {
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
              {paginatedPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
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
                            <span className="text-4xl text-gray-300 font-bold">
                              C
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm mt-auto">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="flex items-center justify-center gap-2 mt-16"
                  aria-label="Blog pagination"
                >
                  {/* Previous */}
                  <button
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage <= 1}
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      safePage <= 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label="Previous page"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) =>
                      page === "ellipsis" ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-3 py-2 text-gray-400 text-sm"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === safePage
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          aria-label={`Page ${page}`}
                          aria-current={
                            page === safePage ? "page" : undefined
                          }
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage >= totalPages}
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      safePage >= totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label="Next page"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
