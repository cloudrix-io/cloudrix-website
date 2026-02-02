import { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, ArrowRight, Building2 } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { CaseStudy } from "@/lib/models";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Client Testimonials - What Our Clients Say | Cloudrix",
  description:
    "Hear from the European companies we've helped with cloud architecture, software development, and DevOps. Real feedback from real clients.",
  openGraph: {
    title: "Client Testimonials | Cloudrix",
    description:
      "Hear from the European companies we've helped with cloud architecture, software development, and DevOps.",
    url: "https://www.cloudrix.io/testimonials",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/testimonials",
  },
};

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  metrics?: { label: string; value: string }[];
}

async function getTestimonials() {
  try {
    await connectDB();

    const caseStudies = await CaseStudy.find({
      isActive: true,
      "testimonial.quote": { $exists: true, $ne: "" },
    })
      .sort({ order: 1 })
      .lean();

    const testimonials: Testimonial[] = caseStudies.map((cs) => ({
      quote: cs.testimonial?.quote || "",
      author: cs.testimonial?.author || "",
      role: cs.testimonial?.role || "",
      company: cs.client,
      industry: cs.industry,
      metrics: cs.metrics,
    }));

    return { testimonials };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { testimonials: [] };
  }
}

const featuredTestimonials: Testimonial[] = [
  {
    quote:
      "Cloudrix didn't just migrate our infrastructure - they transformed how we operate. We went from dreading high-traffic periods to confidently scaling for them. The team's payment industry expertise meant they understood our compliance requirements without lengthy explanations. Six months later, our engineering team is finally building features instead of fighting fires.",
    author: "Henrik Lindqvist",
    role: "VP of Engineering",
    company: "Nordic Payment Solutions",
    industry: "Financial Services / FinTech",
    metrics: [
      { label: "Cost Reduction", value: "55%" },
      { label: "Uptime", value: "99.995%" },
    ],
  },
  {
    quote:
      "Working with Cloudrix was like having a world-class engineering team from day one. They didn't just write code - they helped us think through product decisions, warned us about scaling pitfalls, and built something that investors immediately recognized as enterprise-grade. Our lead investor specifically mentioned the technical quality as a factor in their decision.",
    author: "Martijn van der Berg",
    role: "Co-founder & CEO",
    company: "DataPulse",
    industry: "Enterprise SaaS",
    metrics: [
      { label: "Time to MVP", value: "14 weeks" },
      { label: "Series A", value: "€3.2M" },
    ],
  },
  {
    quote:
      "We were terrified of touching our ERP - one wrong change and production stops. Cloudrix's incremental approach let us modernize without betting the company. Eighteen months later, our system is an asset instead of a liability. Our team learned modern practices alongside the rebuild, so we're self-sufficient now.",
    author: "Philippe Dubois",
    role: "Operations Director",
    company: "Precision Components Group",
    industry: "Manufacturing",
    metrics: [
      { label: "Modernized", value: "73%" },
      { label: "Downtime", value: "0 hrs" },
    ],
  },
];

export default async function TestimonialsPage() {
  const { testimonials: dbTestimonials } = await getTestimonials();
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : featuredTestimonials;

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
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                They Took the Risk. Look What Happened.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every one of these companies had been burned by agencies before.
                They gave us a shot anyway. Here&apos;s what they have to say about it.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-1">47+</div>
                <div className="text-blue-100">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">94%</div>
                <div className="text-blue-100">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">€12M+</div>
                <div className="text-blue-100">Client Revenue Impact</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-10 h-10 text-blue-200" />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {testimonial.metrics && testimonial.metrics.length > 0 && (
                    <div className="flex gap-4 mb-6">
                      {testimonial.metrics.slice(0, 3).map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-50 px-4 py-2 rounded-lg text-center"
                        >
                          <div className="text-xl font-bold text-blue-600">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {testimonial.company}
                      </div>
                      <div className="text-xs text-gray-500">{testimonial.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to See the Full Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore our detailed case studies to see how we helped these companies
              achieve their goals.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
            >
              View Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Your Story Could Be Next
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              In 6 months, you could be writing one of these testimonials.
              Or you could still be stuck with the same problems. Your call.
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

export const revalidate = 60;
