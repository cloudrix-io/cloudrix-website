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
  Wrench,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";

const productsFaqs = [
  {
    question: "Are Cloudrix tools free to use?",
    answer:
      "Yes, most of our 24 tools are completely free to use with no signup required. This includes the AI Code Reviewer, EU AI Act Compliance Scanner, Cloud Cost Calculator, and Tech Stack Advisor. Some advanced features are available in freemium or paid tiers.",
  },
  {
    question: "What types of tools does Cloudrix offer?",
    answer:
      "Cloudrix offers three categories of tools: AI-Powered tools (like the AI Code Reviewer and EU AI Act Scanner that use large language models), AI-Enhanced business tools (like CRM and analytics dashboards), and Engineering Tools (like deployment pipelines and monitoring utilities).",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer:
      "No, you can try all live tool demos without creating an account or signing up. Simply visit the product page and click Try Demo Free to get started immediately.",
  },
  {
    question: "Can Cloudrix build a custom tool for my company?",
    answer:
      "Absolutely. Every product in our portfolio was born from solving a real client challenge. If you need a tailored solution, we offer custom development starting from EUR 15,000 for project-based work or EUR 8,500 per month for a dedicated engineering team.",
  },
  {
    question: "What technology powers Cloudrix tools?",
    answer:
      "Our tools are built with production-grade technology including Next.js, React, TypeScript, Python, and Node.js on the frontend and backend; Claude, GPT-4o, and open-source LLMs for AI features; and AWS, Kubernetes, and Docker for infrastructure.",
  },
];
import {
  products,
  categoryInfo,
  getProductsByCategory,
  type Product,
  type ProductCategory,
} from "@/data/products";

export const metadata: Metadata = {
  title: "Products & Tools — Built to Solve Real Problems",
  description:
    "Try 24 free AI tools — no signup required. AI Code Reviewer, EU AI Act Scanner, Cloud Cost Calculator, and more. Built by senior engineers serving 50+ countries.",
  openGraph: {
    title: "Products & Tools — Built to Solve Real Problems",
    description:
      "Explore 24 AI-powered products, intelligent business solutions, and engineering tools built by Cloudrix.",
    url: "https://www.cloudrix.io/products",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Our Products & Tools")}&subtitle=${encodeURIComponent("24 products built to solve real problems")}&type=products`,
        width: 1200,
        height: 630,
        alt: "Cloudrix Products & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products & Tools",
    description:
      "Explore 24 AI-powered products, intelligent business solutions, and engineering tools built by Cloudrix.",
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

const categoryIcons: Record<ProductCategory, React.ComponentType<{ className?: string }>> = {
  "ai-powered": Sparkles,
  "ai-enhanced": Brain,
  "engineering-tools": Wrench,
};

function StatusBadge({ status }: { status: Product["status"] }) {
  const config = {
    live: { label: "Live", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    beta: { label: "Beta", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    "coming-soon": { label: "Coming Soon", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  };
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${className}`}>
      {label}
    </span>
  );
}

function PricingBadge({ product }: { product: Product }) {
  const { pricing, pricingTiers } = product;

  // Determine the starting price label
  let label: string;
  let className: string;

  if (pricing === "free") {
    label = "Free";
    className = "bg-emerald-500/10 text-emerald-400";
  } else if (pricing === "open-source") {
    label = "Open Source";
    className = "bg-orange-500/10 text-orange-400";
  } else if (pricingTiers && pricingTiers.length > 0) {
    const paidTiers = pricingTiers.filter(
      (t) => t.priceMonthly !== undefined && t.priceMonthly > 0
    );
    if (paidTiers.length > 0) {
      const cheapest = Math.min(...paidTiers.map((t) => t.priceMonthly!));
      const hasFree = pricingTiers.some((t) => t.priceMonthly === 0);
      label = hasFree ? `Free / From $${cheapest}/mo` : `From $${cheapest}/mo`;
      className = "bg-blue-500/10 text-blue-400";
    } else {
      label = "Free";
      className = "bg-emerald-500/10 text-emerald-400";
    }
  } else if (pricing === "freemium") {
    label = "Freemium";
    className = "bg-blue-500/10 text-blue-400";
  } else {
    label = "Paid";
    className = "bg-purple-500/10 text-purple-400";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${className}`}>
      {label}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.icon];
  const categoryGradient = categoryInfo[product.category].gradient;
  const hasDemo = product.status !== "coming-soon";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1">
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryGradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />

      <div className="relative flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${categoryGradient} shadow-lg`}>
            {Icon && <Icon className="h-6 w-6 text-white" />}
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={product.status} />
            <PricingBadge product={product} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-400 mb-2 line-clamp-2">
          {product.tagline}
        </p>
        <p className="text-xs text-slate-500 mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {tech}
            </span>
          ))}
          {product.techStack.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500">
              +{product.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
          {hasDemo ? (
            <Link
              href={`/products/${product.slug}/demo`}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r ${categoryGradient} hover:opacity-90 transition-opacity`}
            >
              <Sparkles className="h-4 w-4" />
              Try Demo Free
            </Link>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-500 rounded-lg bg-slate-800 cursor-not-allowed">
              Coming Soon
            </span>
          )}
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-slate-400 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: ProductCategory;
  index: number;
}) {
  const info = categoryInfo[category];
  const categoryProducts = getProductsByCategory(category);
  const CategoryIcon = categoryIcons[category];

  return (
    <section id={category} className="scroll-mt-24">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}>
          <CategoryIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {info.label}
          </h2>
          <p className="text-slate-400 mt-1">{info.description}</p>
        </div>
        <span className="ml-auto hidden sm:inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
          {categoryProducts.length} products
        </span>
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
  const categories: ProductCategory[] = [
    "ai-powered",
    "ai-enhanced",
    "engineering-tools",
  ];

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

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 border border-violet-500/20 mb-6">
              <Sparkles className="h-4 w-4" />
              {products.length} Products & Tools
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Products &amp; Tools
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                Built to Solve Real Problems
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              From AI-powered agents to engineering utilities, every product in our
              portfolio was born from solving a real client challenge. Try them free,
              explore the demos, or let us build something custom for you.
            </p>
          </div>

          {/* Category quick links */}
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const info = categoryInfo[cat];
              const Icon = categoryIcons[cat];
              const count = getProductsByCategory(cat).length;
              return (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className={`group inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-900 hover:text-white`}
                >
                  <Icon className="h-4 w-4" />
                  {info.label}
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-300 transition-colors">
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
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
          {categories.map((cat, i) => (
            <CategorySection key={cat} category={cat} index={i} />
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
