import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  Phone,
  FileText,
  ArrowRight,
  Share2,
  Users,
  BookOpen,
  Wrench,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Cloudrix",
  description:
    "Thanks for reaching out! We'll review your project and get back to you within 24 hours.",
  robots: {
    index: false,
    follow: true,
  },
};

const nextSteps = [
  {
    step: 1,
    icon: FileText,
    title: "We review your project",
    description:
      "Our engineering team reads your message and assesses the best way to help.",
    time: "Within 2 hours",
  },
  {
    step: 2,
    icon: Phone,
    title: "We schedule a call",
    description:
      "We'll reach out via your preferred method to find a convenient time to talk.",
    time: "Within 24 hours",
  },
  {
    step: 3,
    icon: BarChart3,
    title: "We send a proposal",
    description:
      "After the call, if there's a good fit, you'll receive a clear proposal with scope, timeline, and pricing.",
    time: "Within 48 hours",
  },
];

const resources = [
  {
    icon: Wrench,
    title: "AI Tools",
    description: "Try our free AI-powered tools -- compliance scanner, scope generator, and more.",
    href: "/ai-tools",
    label: "Explore Tools",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Read engineering insights on cloud, AI, DevOps, and technical leadership.",
    href: "/blog",
    label: "Read Articles",
  },
  {
    icon: BarChart3,
    title: "Case Studies",
    description: "See how we helped companies like yours solve complex engineering challenges.",
    href: "/case-studies",
    label: "View Results",
  },
];

export default function ThankYouPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Thanks! We&apos;ll Be in Touch Within 24 Hours
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Your message has been received. Here&apos;s what happens next.
          </p>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nextSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative text-center">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-blue-600 font-medium">
                    <Clock className="w-3 h-3" />
                    {step.time}
                  </div>
                  {/* Connector line on desktop */}
                  {step.step < 3 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-10 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">50+</span>
          </div>
          <p className="text-gray-700">
            companies already trust Cloudrix with their engineering and AI challenges
          </p>
        </div>
      </section>

      {/* While You Wait */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              While You Wait
            </h2>
            <p className="text-gray-600">
              Explore our resources and tools to get a head start.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={index}
                  href={resource.href}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                    {resource.label}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Know Someone Who Needs AI Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Share Cloudrix with a colleague or friend who&apos;s exploring AI for their business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.cloudrix.io/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg hover:bg-[#004182] transition-colors text-sm font-medium"
            >
              Share on LinkedIn
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Just%20had%20a%20great%20AI%20strategy%20call%20with%20Cloudrix.%20Free%2030-min%20consultation%20for%20businesses%20exploring%20AI.&url=https://www.cloudrix.io/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Share on X
            </a>
            <a
              href="mailto:?subject=Free AI Strategy Call&body=I found this free AI consultation service - might be useful for your team: https://www.cloudrix.io/book"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Share via Email
            </a>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
