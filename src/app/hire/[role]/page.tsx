import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Euro,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { roles } from "@/data/roles";

interface Props {
  params: Promise<{ role: string }>;
}

function getArticle(title: string): string {
  const vowelSoundPrefixes = ["AI ", "Angular", "ML ", "iOS", "Ubuntu", "Elixir", "Erlang", "Oracle", "AWS", "Azure", "API ", "ERP", "ETL"];
  const startsWithVowelSound = vowelSoundPrefixes.some((prefix) => title.startsWith(prefix)) || /^[aeiouAEIOU]/.test(title);
  return startsWithVowelSound ? "an" : "a";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role: roleSlug } = await params;
  const role = roles.find((r) => r.slug === roleSlug);

  if (!role) {
    return { title: "Role Not Found" };
  }

  return {
    title: role.metaTitle,
    description: role.metaDescription,
    openGraph: {
      title: `${role.metaTitle} | Cloudrix`,
      description: role.metaDescription,
      url: `https://www.cloudrix.io/hire/${roleSlug}`,
    },
    alternates: {
      canonical: `https://www.cloudrix.io/hire/${roleSlug}`,
    },
  };
}

export function generateStaticParams() {
  return roles.map((r) => ({ role: r.slug }));
}

export default async function HireRolePage({ params }: Props) {
  const { role: roleSlug } = await params;
  const role = roles.find((r) => r.slug === roleSlug);

  if (!role) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Hire", url: "/hire" },
          { name: role.title, url: `/hire/${roleSlug}` },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                <span>Hire Engineers</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Hire {getArticle(role.title)} {role.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Senior talent, EU timezone, no lock-in. Start with a trial month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                >
                  Tell Us What You Need
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                >
                  View All Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What They Do */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What {getArticle(role.title)} {role.title} Does at Cloudrix
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                  {role.whatTheyDo}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Skills &amp; Capabilities
                </h3>
                <ul className="space-y-3 mb-10">
                  {role.skills.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Card */}
              <div>
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Pricing</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600">Monthly rate</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-gray-900">EUR 8,500</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-gray-200 pt-4">
                      <span className="text-gray-600">Trial month</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">EUR 7,500</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center text-gray-600">
                      <Euro className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      No hidden fees or setup costs
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      Full-time, dedicated to your project
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Shield className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      Cancel with 30 days notice
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
                  >
                    Get Started
                    <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {role.howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {role.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Hire {getArticle(role.title)} {role.title}?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Tell us what you need and we will match you with the right engineer
              within 48 hours. Start with a risk-free trial month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Tell Us What You Need
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
