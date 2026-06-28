import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Clock,
  Laptop,
  Heart,
  Brain,
  Users,
  Rocket,
  Code2,
  MapPin,
  CheckCircle2,
  Send,
  Star,
  Coffee,
  Wifi,
  GraduationCap,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Careers at Cloudrix - Join Our Remote-First Engineering Team",
  description:
    "Join a team of senior engineers working on challenging projects for European companies. Remote-first, async culture, flexible hours, and global projects. We're always looking for exceptional talent.",
  openGraph: {
    title: "Careers at Cloudrix | Cloudrix",
    description:
      "Join a team of senior engineers. Remote-first, async culture, flexible hours, and challenging projects for European companies.",
    url: "https://www.cloudrix.io/careers",
    type: "website",
    images: [
      {
        url: "/og?title=Join%20Our%20Team&subtitle=Remote-First%20%E2%80%A2%20Senior%20Engineers%20%E2%80%A2%20Global%20Projects&type=careers",
        width: 1200,
        height: 630,
        alt: "Cloudrix Careers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Cloudrix | Cloudrix",
    description:
      "Remote-first, senior engineers, global projects. See open positions.",
  },
  alternates: {
    canonical: "https://www.cloudrix.io/careers",
  },
};

const values = [
  {
    icon: Brain,
    title: "Craftsmanship Over Speed",
    description:
      "We write code that lasts. No shortcuts, no hacks, no 'we'll fix it later.' Quality is non-negotiable.",
  },
  {
    icon: Users,
    title: "Trust & Autonomy",
    description:
      "We hire senior people and let them do their best work. No micromanagement, no unnecessary meetings, no permission-seeking.",
  },
  {
    icon: Heart,
    title: "Radical Transparency",
    description:
      "Open salaries, open decisions, open feedback. We share context so everyone can make good decisions independently.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "Every project is a chance to learn something new. We invest in your growth with conference budgets, learning time, and challenging work.",
  },
];

const benefits = [
  {
    icon: Wifi,
    title: "100% Remote",
    description: "Work from anywhere. No office requirement, ever. We've been remote-first since day one.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Core overlap hours for collaboration, but you choose when you do your best work.",
  },
  {
    icon: Globe,
    title: "Global Projects",
    description: "Work with clients across Europe and beyond. Diverse industries, challenging problems.",
  },
  {
    icon: Laptop,
    title: "Equipment Budget",
    description: "Get the hardware and software you need. MacBook Pro, monitors, standing desk — your choice.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "Annual budget for conferences, courses, books, and certifications. Growth is part of the job.",
  },
  {
    icon: Coffee,
    title: "Async Culture",
    description: "We default to async communication. Meetings are the exception, not the rule.",
  },
];

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Contract / Full-Time",
    location: "Remote (EU timezone preferred)",
    requirements: [
      "8+ years professional experience",
      "Strong TypeScript / Node.js / React",
      "Cloud infrastructure (AWS / GCP)",
      "Production-scale system design",
    ],
  },
  {
    title: "Senior Cloud / DevOps Engineer",
    type: "Contract / Full-Time",
    location: "Remote (EU timezone preferred)",
    requirements: [
      "8+ years in infrastructure / DevOps",
      "Kubernetes, Terraform, CI/CD",
      "AWS or GCP certified",
      "Security-first mindset",
    ],
  },
  {
    title: "Senior AI / ML Engineer",
    type: "Contract / Full-Time",
    location: "Remote (EU timezone preferred)",
    requirements: [
      "5+ years ML / AI production experience",
      "LLM integration and fine-tuning",
      "Python, PyTorch / TensorFlow",
      "EU AI Act awareness a plus",
    ],
  },
];

const applicationSteps = [
  {
    step: 1,
    title: "Apply",
    description: "Send us your CV and a brief note about what excites you. No cover letter essays required.",
  },
  {
    step: 2,
    title: "Technical Chat",
    description: "A 45-minute conversation about your experience, architecture thinking, and technical depth.",
  },
  {
    step: 3,
    title: "Practical Exercise",
    description: "A take-home exercise or pair programming session on a real-world problem. No leetcode.",
  },
  {
    step: 4,
    title: "Team Fit",
    description: "Meet the team, discuss working style, and make sure we're a good mutual fit.",
  },
  {
    step: 5,
    title: "Offer",
    description: "Fast decisions. We aim to go from first contact to offer within two weeks.",
  },
];

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ]}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Careers", url: "/careers" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>We&apos;re Hiring Senior Engineers</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Build Software That <span className="text-blue-600">Matters</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
                Join a team where every engineer is senior, every project is meaningful,
                and every person has the autonomy to do their best work. Remote-first,
                async-native, and craft-obsessed.
              </p>
              <Link
                href="#positions"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
              >
                View Open Positions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Culture Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What We Believe In
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our values aren&apos;t wall posters. They&apos;re how we actually work every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What You Get
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond competitive compensation, here&apos;s what makes working at Cloudrix different.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="bg-white rounded-xl p-6 border border-gray-200"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re always looking for senior talent. If you don&apos;t see a perfect
                fit below, reach out anyway — we&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position) => (
                <div
                  key={position.title}
                  className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Code2 className="w-4 h-4 mr-1.5 text-gray-400" />
                          {position.type}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                          {position.location}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {position.requirements.map((req) => (
                          <div key={req} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group whitespace-nowrap"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Speculative Application */}
            <div className="mt-12 max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Don&apos;t See Your Role?
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re always interested in hearing from exceptional senior engineers.
                Send us your CV and tell us what you&apos;re passionate about.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Speculative Application
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Hiring Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Straightforward, respectful of your time, and designed to find mutual fit.
                Typically completed in 2 weeks.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <div key={step.step} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      {index < applicationSteps.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              If you&apos;re a senior engineer who cares about quality, values autonomy,
              and wants to work on meaningful projects — we&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
