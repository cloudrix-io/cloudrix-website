import { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquareText,
  ScanSearch,
  FileText,
  ShieldCheck,
  Network,
  BookOpen,
  PiggyBank,
  Users,
  UserCheck,
  BarChart3,
  PenTool,
  Headphones,
  Languages,
  Receipt,
  Rocket,
  ArrowRightLeft,
  LayoutDashboard,
  Activity,
  Compass,
  ShieldAlert,
  Calculator,
  CheckCircle,
  DatabaseZap,
  Gauge,
  ArrowRight,
  Sparkles,
  Brain,
  Code,
  Shield,
  ExternalLink,
  Star,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";

const productsFaqs = [
  {
    question: "Are Cloudrix tools free to use?",
    answer:
      "Most of our 20+ products offer a free tier with no signup required. Premium plans start from $29/mo for advanced features, team collaboration, and priority support.",
  },
  {
    question: "What types of tools does Cloudrix offer?",
    answer:
      "Cloudrix offers five categories of products: Security & Compliance, Monitoring & Reliability, AI & Automation, Developer Tools, and Business Intelligence. All are live and production-ready.",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer:
      "No, you can try most products without creating an account. Simply click 'Try Now' to open the live product. Some features require a free account for persistence.",
  },
  {
    question: "Can Cloudrix build a custom tool for my company?",
    answer:
      "Absolutely. Every product in our portfolio was born from solving a real client challenge. If you need a tailored solution, we offer custom development starting from EUR 15,000 for project-based work.",
  },
  {
    question: "What technology powers Cloudrix tools?",
    answer:
      "Our tools are built with production-grade technology including Next.js, React, TypeScript, NestJS on the frontend and backend; Claude API and open-source LLMs for AI features; and AWS for infrastructure.",
  },
];
import {
  products,
  productCategories,
  getProductsBySmartCategory,
  getProductBySlug,
  popularProductSlugs,
  type Product,
  type SmartCategory,
} from "@/data/products";

export const metadata: Metadata = {
  title: "20+ AI & IT Products. One Platform. | Cloudrix",
  description:
    "From security scanning to AI chatbots — 20+ live products that run your business. Free tiers available. Try any product instantly.",
  openGraph: {
    title: "20+ AI & IT Products. One Platform.",
    description:
      "From security scanning to AI chatbots — tools that run your business. All live. All production-ready.",
    url: "https://www.cloudrix.io/products",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("20+ AI & IT Products")}&subtitle=${encodeURIComponent("One Platform. All Live.")}&type=products`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Products & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "20+ AI & IT Products. One Platform.",
    description:
      "From security scanning to AI chatbots — tools that run your business.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/products",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquareText,
  ScanSearch,
  FileText,
  ShieldCheck,
  Network,
  BookOpen,
  PiggyBank,
  Users,
  UserCheck,
  BarChart3,
  PenTool,
  Headphones,
  Languages,
  Receipt,
  Rocket,
  ArrowRightLeft,
  LayoutDashboard,
  Activity,
  Compass,
  ShieldAlert,
  Calculator,
  CheckCircle,
  DatabaseZap,
  Gauge,
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Activity,
  Brain,
  Code,
  BarChart3,
};

function getStartingPrice(product: Product): string {
  if (product.pricing === "free" || product.pricing === "open-source") return "Free";
  if (product.pricingTiers && product.pricingTiers.length > 0) {
    const hasFree = product.pricingTiers.some((t) => t.priceMonthly === 0);
    if (hasFree) return "Free";
    const paidTiers = product.pricingTiers.filter(
      (t) => t.priceMonthly !== undefined && t.priceMonthly > 0
    );
    if (paidTiers.length > 0) {
      const cheapest = Math.min(...paidTiers.map((t) => t.priceMonthly!));
      return `From $${cheapest}/mo`;
    }
  }
  return "Free";
}

function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.icon];
  const isPopular = popularProductSlugs.includes(product.slug);
  const startingPrice = getStartingPrice(product);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1">
      {isPopular && (
        <div className="absolute -top-3 left-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Star className="h-3 w-3" />
            Popular
          </span>
        </div>
      )}

      <div className="relative flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg">
            {Icon && <Icon className="h-6 w-6 text-white" />}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">
          {product.tagline}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-sm font-medium text-emerald-400">
            {startingPrice}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 transition-opacity"
          >
            Try Now
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-slate-400 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
          >
            Learn More
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  category,
}: {
  category: SmartCategory;
}) {
  const categoryProducts = getProductsBySmartCategory(category.slug);
  const CategoryIcon = categoryIconMap[category.icon];

  return (
    <section id={category.slug} className="scroll-mt-24">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
            {CategoryIcon && <CategoryIcon className="h-6 w-6 text-white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {category.name}
              </h2>
              <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
                {categoryProducts.length} products
              </span>
            </div>
            <p className="text-slate-400 mt-1">{category.description}</p>
          </div>
          <Link
            href={`/products/category/${category.slug}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            View category
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const liveCount = products.filter((p) => p.status === "live").length;

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Products", url: "https://www.cloudrix.io/products" }]}
      />
      <FAQJsonLd faqs={productsFaqs} pageUrl="/products" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.05),transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Products", url: "/products" }]}
          />

          <div className="mt-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {liveCount} products live
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              20+ AI &amp; IT Products.
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                One Platform.
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 leading-relaxed max-w-2xl">
              From security scanning to AI chatbots — tools that run your business.
              All live. All production-ready. Free tiers on every product.
            </p>
          </div>

          {/* Category navigation bar */}
          <nav className="mt-10 flex flex-wrap gap-3">
            {productCategories.map((cat) => {
              const CatIcon = categoryIconMap[cat.icon];
              const count = getProductsBySmartCategory(cat.slug).length;
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                >
                  {CatIcon && <CatIcon className="h-4 w-4" />}
                  {cat.name}
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-300 transition-colors">
                    {count}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="bg-slate-950 py-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/products/pricing"
            className="group flex items-center justify-between rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/10 to-purple-600/10 px-6 py-4 transition-all hover:border-violet-500/50 hover:from-violet-600/15 hover:to-purple-600/15"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <div>
                <span className="text-white font-semibold">View All Product Pricing</span>
                <span className="hidden sm:inline text-slate-400 ml-2">
                  -- Compare plans, see free tiers, and find the right fit for your team
                </span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-violet-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Products by Category */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {productCategories.map((cat) => (
            <CategorySection key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need Something Custom?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            These products showcase what we can build. If you need a tailored solution
            for your specific challenge, let&apos;s talk about making it happen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
