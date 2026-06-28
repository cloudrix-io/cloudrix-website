import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

export interface MarketHubRegion {
  name: string;
  slug: string;
  description: string;
  countries?: { name: string; slug: string }[];
  highlight: string;
}

export interface MarketHubPageData {
  title: string;
  subtitle: string;
  description: string;
  regions: MarketHubRegion[];
  breadcrumbs: { name: string; url: string }[];
  basePath: string;
}

export function MarketHubPage({ data }: { data: MarketHubPageData }) {
  return (
    <>
      <BreadcrumbJsonLd items={data.breadcrumbs} />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumbs items={data.breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {data.subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {data.description}
              </p>
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.regions.map((region) => (
                <div
                  key={region.slug}
                  className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:border-blue-200"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <Link
                    href={`${data.basePath}/${region.slug}`}
                    className="group"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {region.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {region.highlight}
                  </p>
                  <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                    {region.description}
                  </p>
                  {region.countries && region.countries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {region.countries.map((country) => (
                        <Link
                          key={country.slug}
                          href={`${data.basePath}/${country.slug}`}
                          className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-xs px-3 py-1 rounded-full transition-colors"
                        >
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`${data.basePath}/${region.slug}`}
                    className="text-blue-600 font-medium flex items-center hover:translate-x-1 transition-transform text-sm"
                  >
                    Explore {region.name}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Go Global with Cloudrix?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Our distributed team delivers enterprise-grade cloud solutions across every timezone. Get a free consultation to discuss your regional needs.
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
