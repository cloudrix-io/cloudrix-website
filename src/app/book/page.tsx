import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Map,
  Shield,
  FileCheck,
  Scale,
  Building2,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Users,
  Brain,
} from "lucide-react";
import { BookingCalendar } from "@/components/ui";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

const faqs = [
  {
    question: "What happens on the call?",
    answer:
      "We spend 30 minutes understanding your business, current tech landscape, and AI goals. You'll walk away with an honest assessment, quick wins you can implement immediately, and a clear roadmap for next steps. No slides, no sales pitch - just a practical conversation between engineers.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes, 100% free with no strings attached. We believe in earning trust through value. If there's a fit, we'll propose a paid engagement. If not, you'll still leave with actionable insights. We've had plenty of calls where we told people they didn't need us - and that's fine.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "No preparation required, but it helps to have a rough idea of: (1) what your business does, (2) what AI challenge or opportunity you're exploring, and (3) any constraints like budget, timeline, or compliance requirements. Don't worry if you're early stage - that's exactly what the call is for.",
  },
  {
    question: "Who will I be speaking with?",
    answer:
      "You'll speak directly with a senior AI engineer who has hands-on experience building and deploying AI systems. No junior account managers or sales reps - just someone who understands both the technology and the business impact.",
  },
  {
    question: "What if I'm not sure AI is right for my business?",
    answer:
      "That's one of the best reasons to book a call. We'll give you an honest assessment of whether AI makes sense for your use case, what the ROI could look like, and what alternatives exist. Sometimes the answer is 'not yet' - and we'll tell you that.",
  },
];

const guarantees = [
  {
    quote:
      "If you're not satisfied with the first sprint of any paid engagement, you get a full refund. The free call carries zero risk by definition.",
    name: "First-Sprint Refund",
    role: "Written into every contract",
  },
  {
    quote:
      "You speak with the founder — the senior engineer (10+ years) who would actually write your code. No account managers, no handoffs.",
    name: "Direct Access to the Engineer",
    role: "Founder-led studio",
  },
  {
    quote:
      "Cloudrix is an early-stage studio founded in 2026. We won't show you invented quotes — we'd rather earn a named case study from you.",
    name: "No Fake Testimonials",
    role: "KVK 97732699, Tilburg, NL",
  },
];

export const metadata: Metadata = {
  title: "Book a Free AI Strategy Call | Cloudrix",
  description:
    "Book a free 30-minute AI strategy call with a senior engineer. Get a custom AI roadmap, learn your EU AI Act compliance status, and get practical advice - no sales pitch.",
  keywords: [
    "book AI consultation",
    "AI strategy call",
    "free AI consultation",
    "AI roadmap",
    "EU AI Act compliance",
    "AI consulting call",
    "book AI strategy session",
  ],
  openGraph: {
    title: "Book a Free AI Strategy Call | Cloudrix",
    description:
      "30 minutes. A senior AI engineer. A custom roadmap for your business. No sales pitch - just practical advice.",
    url: "https://www.cloudrix.io/book",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Book Your Free AI Strategy Call")}&subtitle=${encodeURIComponent("30 min. Senior engineer. Custom roadmap.")}&type=contact`,
        width: 1200,
        height: 630,
        alt: "Book a Free AI Strategy Call with Cloudrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free AI Strategy Call | Cloudrix",
    description:
      "30 minutes. A senior AI engineer. A custom roadmap for your business. No sales pitch.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/book",
  },
};

export default function BookPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Book a Strategy Call", url: "/book" },
        ]}
      />
      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Book a Strategy Call", url: "/book" },
            ]}
          />
        </div>

        {/* Hero - Compact */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-2 rounded-full mb-6">
              <Clock className="w-4 h-4" />
              30-Minute Free Strategy Call
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get a Custom AI Roadmap for Your Business
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Skip the guesswork. Talk to a senior AI engineer who will give you a clear,
              actionable plan -- no sales pitch, no slides, just answers.
            </p>
          </div>
        </section>

        {/* Main Content: Benefits + Booking */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Benefits */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What You&apos;ll Get From This Call
                  </h2>
                  <ul className="space-y-5">
                    {[
                      {
                        icon: Clock,
                        title: "30-minute free strategy call",
                        description:
                          "Focused, efficient, respectful of your time. No long presentations.",
                      },
                      {
                        icon: Map,
                        title: "A custom AI roadmap for your business",
                        description:
                          "Walk away with a prioritized list of AI opportunities specific to your industry and use case.",
                      },
                      {
                        icon: Scale,
                        title: "Learn your EU AI Act compliance status",
                        description:
                          "Understand where you stand and what steps to take before the high-risk deadline of December 2, 2027.",
                      },
                      {
                        icon: Users,
                        title: "No sales pitch -- just practical advice",
                        description:
                          "If we're not the right fit, we'll tell you. And you'll still walk away with value.",
                      },
                      {
                        icon: Brain,
                        title: "Speak directly with a senior AI engineer",
                        description:
                          "No account managers. No junior consultants. Someone who builds AI systems daily.",
                      },
                    ].map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900">
                              {benefit.title}
                            </strong>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {benefit.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Who it's for */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    This call is for you if:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "You're exploring AI but unsure where to start",
                      "You have an AI project but need architecture guidance",
                      "You need to understand EU AI Act implications",
                      "You want to automate operations or customer interactions",
                      "You're evaluating build vs. buy for AI features",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Booking Calendar */}
              <div className="lg:sticky lg:top-8">
                <BookingCalendar />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10 bg-gray-50 border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  label: "GDPR Compliant",
                  sublabel: "Your data is safe",
                },
                {
                  icon: FileCheck,
                  label: "NDA Available",
                  sublabel: "We sign before we talk",
                },
                {
                  icon: Scale,
                  label: "EU AI Act Experts",
                  sublabel: "Compliance-first approach",
                },
                {
                  icon: Building2,
                  label: "KVK Registered",
                  sublabel: "Dutch Chamber of Commerce",
                },
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {badge.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {badge.sublabel}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Guarantees instead of testimonials */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Guarantees, Not Anonymous Quotes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guarantees.map((g, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex gap-1 mb-3">
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {g.quote}
                  </p>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {g.name}
                    </div>
                    <div className="text-xs text-gray-500">{g.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Your Competitors Are Already Using AI
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              The question isn&apos;t whether to adopt AI -- it&apos;s how fast you can start.
              One call. 30 minutes. A clear path forward.
            </p>
            <Link
              href="/book#top"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Book Your Free Call Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
