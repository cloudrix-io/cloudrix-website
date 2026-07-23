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
  Sparkles,
  ChevronRight,
  Code2,
  Lightbulb,
  Target,
  Layers,
} from "lucide-react";
import { Breadcrumbs, ProductMockup } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo";
import {
  products,
  categoryInfo,
  getProductBySlug,
  getRelatedProducts,
  productCategories,
  type Product,
  type ProductCategory,
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

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.name;
  const description = product.description;

  return {
    title,
    description,
    // Archived products stay routable but are kept out of the index
    ...(product.hidden ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${title}`,
      description,
      url: `https://www.cloudrix.io/products/${slug}`,
      type: "website",
      images: [
        {
          url: `/og?title=${encodeURIComponent(product.name)}&subtitle=${encodeURIComponent(product.tagline)}&type=product`,
          width: 1200,
          height: 630,
          alt: `${product.name} by Cloudrix`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name}`,
      description: product.tagline,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/products/${slug}`,
    },
  };
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const config = {
    live: {
      label: "Live",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
    beta: {
      label: "Beta",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      dot: "bg-amber-400",
    },
    "coming-soon": {
      label: "Coming Soon",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      dot: "bg-blue-400",
    },
  };
  const { label, className, dot } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full border ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot} animate-pulse`} />
      {label}
    </span>
  );
}

function PricingTiersSection({ product }: { product: Product }) {
  const info = categoryInfo[product.category];

  if (!product.pricingTiers || product.pricingTiers.length === 0) {
    const fallbackConfig = {
      free: { label: "Free", gradient: "from-emerald-600 to-teal-600" },
      freemium: { label: "Free to Start", gradient: "from-blue-600 to-cyan-600" },
      paid: { label: "Paid Plans", gradient: "from-purple-600 to-violet-600" },
      "open-source": { label: "Open Source", gradient: "from-orange-600 to-amber-600" },
    };
    const fb = fallbackConfig[product.pricing];
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Pricing</h3>
        <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${fb.gradient} mb-3`}>
          {fb.label}
        </div>
        <p className="text-slate-400 max-w-md mx-auto mb-6">
          Interested in this product? Contact us for pricing details and a personalized demo.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
        >
          Contact for Pricing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${product.pricingTiers.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {product.pricingTiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
            tier.popular
              ? "border-violet-500/50 bg-slate-900/80 shadow-lg shadow-violet-500/10 scale-[1.02]"
              : "border-slate-800 bg-slate-900/50"
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${info.gradient} px-3 py-1 text-xs font-semibold text-white`}>
                <Sparkles className="h-3 w-3" />
                Most Popular
              </span>
            </div>
          )}
          <h4 className="text-lg font-semibold text-white mb-2">{tier.name}</h4>
          <div className="mb-4">
            {tier.priceMonthly !== undefined && tier.priceMonthly > 0 ? (
              <>
                <span className="text-3xl font-bold text-white">&euro;{tier.priceMonthly}</span>
                <span className="text-slate-400 text-sm">/mo</span>
                {tier.priceYearly !== undefined && tier.priceYearly > 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    &euro;{tier.priceYearly}/yr (save &euro;{tier.priceMonthly * 12 - tier.priceYearly})
                  </p>
                )}
              </>
            ) : tier.priceMonthly === 0 ? (
              <span className="text-3xl font-bold text-emerald-400">Free</span>
            ) : (
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Custom
              </span>
            )}
          </div>
          <ul className="space-y-2.5 mb-6 flex-1">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          {tier.ctaLink.startsWith("/contact") ? (
            <Link
              href={tier.ctaLink}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              {tier.cta}
            </Link>
          ) : (
            <Link
              href={tier.ctaLink}
              className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all ${
                tier.popular
                  ? `bg-gradient-to-r ${info.gradient} shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110`
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {tier.cta}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const Icon = iconMap[product.icon];
  const info = categoryInfo[product.category];
  const relatedProducts = getRelatedProducts(slug, 3);
  const ctaLabel = `Open ${product.name}`;
  const isExternalUrl = product.productUrl.startsWith("http");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "https://www.cloudrix.io/products" },
          {
            name: product.name,
            url: `https://www.cloudrix.io/products/${slug}`,
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", url: "/products" },
              { name: product.name, url: `/products/${slug}` },
            ]}
          />

          <div className="mt-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-2xl">
              {/* Category + Status */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${info.gradient} px-3 py-1 text-sm font-medium text-white`}
                >
                  {info.label}
                </span>
                <StatusBadge status={product.status} />
              </div>

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} shadow-lg shadow-purple-500/20`}
                >
                  {Icon && <Icon className="h-8 w-8 text-white" />}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {product.name}
                  </h1>
                  <p className="mt-2 text-xl text-slate-400">
                    {product.tagline}
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-400 leading-relaxed">
                {product.description}
              </p>

              {/* Primary CTA - Launch Product */}
              <div className="mt-8 flex flex-wrap gap-4">
                {isExternalUrl ? (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 hover:scale-[1.02]"
                  >
                    {ctaLabel}
                    <ExternalLink className="h-5 w-5" />
                  </a>
                ) : (
                  <Link
                    href={product.productUrl}
                    className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 hover:scale-[1.02]"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-4 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
                >
                  Request a Demo
                </Link>
              </div>
            </div>

            {/* Stylized product mockup (CSS-built from real feature list) */}
            <div className="relative lg:w-[480px] shrink-0">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-1 shadow-2xl">
                <ProductMockup
                  name={product.name}
                  slug={product.slug}
                  gradient={info.gradient}
                  features={product.features}
                  icon={Icon ? <Icon /> : undefined}
                />
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-violet-600/10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Features
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5 transition-all hover:border-slate-700 hover:bg-slate-900/60"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient} mt-0.5`}
                >
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-slate-300 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-800">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Tech Stack
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}
            >
              <Layers className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              How It Works
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {product.howItWorks.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < product.howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent z-0" />
                )}
                <div className="relative flex flex-col items-start">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} text-white text-xl font-bold shadow-lg mb-4`}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}
            >
              <Target className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Use Cases
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {product.useCases.map((useCase, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/60"
              >
                <Lightbulb className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-slate-300">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}>
              <Layers className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Pricing</h2>
          </div>
          <PricingTiersSection product={product} />
          <div className="mt-8 text-center">
            <Link
              href="/products/pricing"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Compare all product pricing
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Compare */}
      <section className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">How we compare</h3>
              <p className="text-sm text-slate-400">See how {product.name} stacks up against alternatives.</p>
            </div>
            <Link
              href="/products/compare"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900 shrink-0"
            >
              Compare Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-300 font-medium">
            Built and run by the Cloudrix engineering team in the EU.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            14-day money-back guarantee. Cancel anytime. No questions asked.
          </p>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-950 py-20 border-t border-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl mb-10">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp) => {
                const RpIcon = iconMap[rp.icon];
                const rpInfo = categoryInfo[rp.category];
                return (
                  <Link
                    key={rp.slug}
                    href={`/products/${rp.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${rpInfo.gradient}`}
                      >
                        {RpIcon && (
                          <RpIcon className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <h3 className="font-semibold text-white">
                        {rp.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 flex-1">
                      {rp.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                      View product
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative bg-slate-950 py-24 overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want a Custom Solution?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {product.name} showcases our capabilities. Need something tailored to
            your specific requirements? Let&apos;s build it together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:bg-slate-900"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
