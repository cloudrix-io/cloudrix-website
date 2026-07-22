import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Users, FileCode, Sparkles } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Client Proof & Guarantees — An Honest Page",
  description:
    "Cloudrix is an early-stage, founder-led studio. Instead of anonymous testimonials, we offer real guarantees: first-sprint refund, fixed scope, and direct access to the engineer.",
  openGraph: {
    title: "Client Proof & Guarantees | Cloudrix",
    description:
      "No anonymous quotes, no fake logos. Early clients get founder-level attention, case-study pricing, and a first-sprint refund guarantee.",
    url: "https://www.cloudrix.io/testimonials",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/testimonials",
  },
};

const guarantees = [
  {
    icon: Shield,
    title: "First-Sprint Refund",
    description:
      "If you're not satisfied with the first sprint delivery, you get a full refund. No questions asked, no fine print games.",
    link: "/refunds",
    linkText: "Read the refund policy",
  },
  {
    icon: FileCode,
    title: "Fixed Scope, Fixed Price",
    description:
      "Every engagement starts with a written scope and a fixed price. Any change requires your explicit sign-off before it costs you a cent.",
  },
  {
    icon: Users,
    title: "Direct Access to the Engineer",
    description:
      "You work directly with the founder — the senior engineer writing your code. No account managers, no juniors, no handoffs.",
  },
  {
    icon: Sparkles,
    title: "Case-Study Pricing for Early Clients",
    description:
      "As an early-stage studio, our first clients get preferential pricing in exchange for a reference and a written case study once the project ships.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                An Honest Page About Proof
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Cloudrix was founded in 2026. We don&apos;t have a wall of logos yet, and we won&apos;t
                invent one. What we offer instead: real guarantees, founder-level attention, and
                verifiable facts. As client projects ship, named case studies will appear here —
                with permission, never anonymized inventions.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Bar — verifiable facts */}
        <section className="bg-blue-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-1">10+</div>
                <div className="text-blue-100">Years Engineering Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">NL</div>
                <div className="text-blue-100">KVK 97732699, Tilburg</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">CET</div>
                <div className="text-blue-100">EU Timezone</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">24h</div>
                <div className="text-blue-100">Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Guarantees Instead of Anonymous Quotes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Anyone can write &quot;VP of Engineering, Confidential Company&quot; under a quote.
                These commitments are written into every contract instead.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {guarantees.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                      >
                        {item.linkText} &rarr;
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Be One of Our First Case Studies
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Early clients get founder-level attention and case-study pricing. Book a free
              30-minute call with the engineer who will do the work.
            </p>
            <Link
              href="/book"
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

export const revalidate = 3600;
