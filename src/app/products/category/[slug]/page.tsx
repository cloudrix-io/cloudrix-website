import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  ExternalLink,
  Check,
  Shield,
  Brain,
  Code,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";
import {
  productCategories,
  getProductsBySmartCategory,
  getSmartCategoryBySlug,
  type Product,
} from "@/data/products";

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

export async function generateStaticParams() {
  return productCategories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getSmartCategoryBySlug(slug);
  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Products | Cloudrix`,
    description: category.description,
    openGraph: {
      title: `${category.name} Products | Cloudrix`,
      description: category.description,
      url: `https://www.cloudrix.io/products/category/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.cloudrix.io/products/category/${slug}`,
    },
  };
}

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

const competitorData: Record<string, { title: string; competitors: { name: string; limitation: string }[] }> = {
  "security-compliance": {
    title: "How Cloudrix Security Compares",
    competitors: [
      { name: "Snyk", limitation: "Per-developer pricing gets expensive fast. Cloudrix offers unlimited scans on Pro plans." },
      { name: "SonarQube", limitation: "Requires self-hosting and infrastructure. Cloudrix is fully managed and cloud-native." },
      { name: "OneTrust", limitation: "Enterprise-only pricing with long sales cycles. Cloudrix has instant free tiers." },
    ],
  },
  "monitoring-reliability": {
    title: "How Cloudrix Monitoring Compares",
    competitors: [
      { name: "Datadog", limitation: "Complex pricing with per-host, per-log, and per-trace charges. Cloudrix offers simple, predictable pricing." },
      { name: "PagerDuty", limitation: "Focuses only on incident management. Cloudrix combines monitoring, status pages, and performance in one platform." },
      { name: "StatusPage (Atlassian)", limitation: "Limited free tier and part of a larger suite. Cloudrix StatusPage is standalone with generous free plan." },
    ],
  },
  "ai-automation": {
    title: "How Cloudrix AI Compares",
    competitors: [
      { name: "Intercom", limitation: "Starting at $74/mo per seat. Cloudrix AI Chat starts free with 100 messages/month." },
      { name: "Jasper", limitation: "Content-only focus at $49/mo. Cloudrix ContentAI Studio includes SEO, approval workflows, and multi-channel publishing." },
      { name: "Zendesk AI", limitation: "Add-on pricing on top of already expensive plans. Cloudrix HelpDesk AI has AI built-in from the start." },
    ],
  },
  "developer-tools": {
    title: "How Cloudrix Dev Tools Compare",
    competitors: [
      { name: "Terraform Cloud", limitation: "Complex pricing and vendor lock-in. Cloudrix CloudArchitect generates IaC for any provider." },
      { name: "Readme.io", limitation: "Starting at $99/mo for API docs. Cloudrix DocSmith AI auto-generates docs from code, starting free." },
      { name: "Notion + AI", limitation: "General purpose, not built for developers. Cloudrix tools are purpose-built for engineering workflows." },
    ],
  },
  "business-intelligence": {
    title: "How Cloudrix BI Compares",
    competitors: [
      { name: "HubSpot CRM", limitation: "Free tier is limited, paid starts at $45/mo/seat. Cloudrix SmartCRM includes AI lead scoring in Pro." },
      { name: "Looker", limitation: "Enterprise pricing with complex setup. Cloudrix InsightAI lets anyone query data in plain English." },
      { name: "QuickBooks", limitation: "Accounting-focused, not AI-powered. Cloudrix InvoiceAI uses AI to extract, categorize, and flag anomalies automatically." },
    ],
  },
};

function DetailedProductCard({ product, gradient }: { product: Product; gradient: string }) {
  const Icon = iconMap[product.icon];
  const startingPrice = getStartingPrice(product);

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80">
      <div className="grid lg:grid-cols-5 gap-0">
        {/* Screenshot placeholder */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 flex items-center justify-center min-h-[240px]">
          <div className="text-center">
            <div className={`flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} opacity-30 mb-4`}>
              {Icon && <Icon className="h-10 w-10 text-white" />}
            </div>
            <span className="text-sm text-slate-500">Product Screenshot</span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                {Icon && <Icon className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-emerald-400 font-medium">{startingPrice}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <p className="text-slate-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Key features */}
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {product.features.slice(0, 6).map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing tiers summary */}
          {product.pricingTiers && product.pricingTiers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.pricingTiers.map((tier) => (
                <span key={tier.name} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  <span className="font-semibold">{tier.name}</span>
                  <span className="text-slate-500 ml-1">{tier.price}</span>
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity`}
            >
              Try Now
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-slate-400 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getSmartCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsBySmartCategory(slug);
  const CategoryIcon = categoryIconMap[category.icon];
  const competitors = competitorData[slug];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "https://www.cloudrix.io/products" },
          { name: category.name, url: `https://www.cloudrix.io/products/category/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/3 h-96 w-96 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-3xl`} />
          <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", url: "/products" },
              { name: category.name, url: `/products/category/${slug}` },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
                {CategoryIcon && <CategoryIcon className="h-7 w-7 text-white" />}
              </div>
              <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
                {categoryProducts.length} products
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {category.name}
            </h1>
            <p className="mt-6 text-xl text-slate-400 leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
          {categoryProducts.map((product) => (
            <DetailedProductCard
              key={product.slug}
              product={product}
              gradient={category.gradient}
            />
          ))}
        </div>
      </section>

      {/* Competitors Comparison */}
      {competitors && (
        <section className="bg-slate-950 py-20 border-t border-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl mb-10">
              {competitors.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {competitors.competitors.map((comp) => (
                <div
                  key={comp.name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    vs. {comp.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {comp.limitation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            All products include free tiers. Pick a product above and start using it in minutes.
            Need a custom solution? We build those too.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Browse All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
