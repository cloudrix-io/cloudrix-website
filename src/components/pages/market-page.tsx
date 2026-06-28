import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Shield,
  Clock,
  DollarSign,
  Building2,
  ChevronDown,
} from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

export interface MarketService {
  title: string;
  description: string;
  icon: string;
}

export interface MarketAdvantage {
  title: string;
  description: string;
}

export interface MarketIndustry {
  name: string;
  description: string;
}

export interface MarketFAQ {
  question: string;
  answer: string;
}

export interface MarketCompliance {
  name: string;
  description: string;
}

export interface MarketStat {
  value: string;
  label: string;
}

export interface MarketPageData {
  region: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  currency: string;
  currencySymbol: string;
  starterPrice: string;
  services: MarketService[];
  advantages: MarketAdvantage[];
  industries: MarketIndustry[];
  compliance: MarketCompliance[];
  stats: MarketStat[];
  faqs: MarketFAQ[];
  breadcrumbs: { name: string; url: string }[];
  ctaTitle: string;
  ctaDescription: string;
  introText: string;
  whyTitle: string;
  whyDescription: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  shield: Shield,
  clock: Clock,
  dollar: DollarSign,
  building: Building2,
  check: CheckCircle2,
};

function FAQItem({ question, answer }: MarketFAQ) {
  return (
    <details className="group border border-gray-200 rounded-lg">
      <summary className="flex items-center justify-between cursor-pointer p-6 text-left">
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
        {answer}
      </div>
    </details>
  );
}

export function MarketPage({ data }: { data: MarketPageData }) {
  return (
    <>
      <BreadcrumbJsonLd items={data.breadcrumbs} />
      <FAQJsonLd faqs={data.faqs} />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumbs items={data.breadcrumbs} />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {data.heroSubtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {data.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                {data.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-50 transition-colors font-medium text-lg"
                >
                  View {data.currency} Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="text-xl">{data.introText}</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Services for {data.region}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tailored cloud and software engineering solutions designed for the {data.region} market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.services.map((service, idx) => {
                const Icon = iconMap[service.icon] || Globe;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Cloudrix Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.whyTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {data.whyDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.advantages.map((adv, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Compliance &amp; Regulatory Expertise
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We understand the regulatory landscape in {data.region} and build compliant solutions from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.compliance.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Industry Focus in {data.region}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Deep domain expertise across the industries driving growth in {data.region}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transparent {data.currency} Pricing
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              No hidden fees, no currency conversion surprises. All our pricing for {data.region} clients is quoted in {data.currency}, starting from {data.currencySymbol}{data.starterPrice}/month for dedicated engineering support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
              >
                See Full Pricing
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-50 transition-colors font-medium text-lg"
              >
                Try Our Cost Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions from {data.region} clients about working with Cloudrix.
              </p>
            </div>
            <div className="space-y-4">
              {data.faqs.map((faq, idx) => (
                <FAQItem key={idx} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {data.ctaTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {data.ctaDescription}
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
                href="/case-studies"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
