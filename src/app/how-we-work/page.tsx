import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Lightbulb,
  Code2,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { ProcessStep, Page } from "@/lib/models";
import { ProcessJsonLd, BreadcrumbJsonLd } from "@/components/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "how-we-work", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "How We Work - Our Engineering Process";
    const description = pageData?.seoDescription?.en ||
      "Discover our proven engineering methodology. From discovery to delivery, we keep you informed at every step. Agile, transparent, results-focused.";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | Cloudrix`,
        description,
        url: "https://cloudrix.io/how-we-work",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("How Great Software Gets Built")}&subtitle=${encodeURIComponent("Our proven 5-step engineering methodology")}&type=how-we-work`,
            width: 1200,
            height: 630,
            alt: "Cloudrix Engineering Process",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Cloudrix`,
        description,
        images: [`/og?title=${encodeURIComponent("How Great Software Gets Built")}&subtitle=${encodeURIComponent("Our proven 5-step engineering methodology")}&type=how-we-work`],
      },
      alternates: {
        canonical: "https://cloudrix.io/how-we-work",
      },
    };
  } catch {
    return {
      title: "How We Work",
      description: "Our process, security practices, and communication standards. Learn how we deliver projects for EU clients.",
    };
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Lightbulb,
  Code2,
  Rocket,
  HeadphonesIcon,
};

async function getHowWeWorkData() {
  try {
    await connectDB();

    const processSteps = await ProcessStep.find({ isActive: true })
      .sort({ step: 1 })
      .lean();

    return {
      processSteps: JSON.parse(JSON.stringify(processSteps)),
    };
  } catch (error) {
    console.error("Error fetching how we work data:", error);
    return {
      processSteps: [],
    };
  }
}

// Default methodology if no data in DB
const defaultMethodology = [
  {
    icon: "Search",
    step: 1,
    title: "Discovery & Research",
    description:
      "We begin by thoroughly understanding your business goals, current challenges, and technical landscape.",
    activities: [
      "Stakeholder interviews",
      "Technical assessment",
      "Requirements gathering",
      "Competitive analysis",
    ],
  },
  {
    icon: "Lightbulb",
    step: 2,
    title: "Strategy & Planning",
    description:
      "Our experts design a comprehensive solution architecture and project roadmap tailored to your needs.",
    activities: [
      "Solution architecture design",
      "Technology stack selection",
      "Project timeline & milestones",
      "Resource allocation",
    ],
  },
  {
    icon: "Code2",
    step: 3,
    title: "Development & Implementation",
    description:
      "We build your solution using agile methodologies, ensuring flexibility and continuous improvement.",
    activities: [
      "Sprint-based development",
      "Regular code reviews",
      "Continuous integration",
      "Quality assurance testing",
    ],
  },
  {
    icon: "Rocket",
    step: 4,
    title: "Deployment & Launch",
    description:
      "We carefully deploy your solution to production with comprehensive testing and monitoring.",
    activities: [
      "Staged deployment",
      "Performance testing",
      "User acceptance testing",
      "Production monitoring",
    ],
  },
  {
    icon: "HeadphonesIcon",
    step: 5,
    title: "Support & Optimization",
    description:
      "Post-launch, we provide ongoing support and continuously optimize your systems for peak performance.",
    activities: [
      "24/7 support availability",
      "Performance monitoring",
      "Regular updates & patches",
      "Continuous optimization",
    ],
  },
];

const principles = [
  {
    icon: "CheckCircle2",
    title: "Agile & Flexible",
    description:
      "We adapt quickly to changing requirements and market conditions.",
  },
  {
    icon: "Users",
    title: "Collaborative",
    description:
      "Your team is involved every step of the way with full transparency.",
  },
  {
    icon: "CheckCircle2",
    title: "Quality First",
    description:
      "We never compromise on code quality, security, or performance.",
  },
  {
    icon: "Calendar",
    title: "On Time, On Budget",
    description: "We deliver projects on schedule and within agreed budgets.",
  },
];

const communication = [
  {
    icon: "MessageSquare",
    title: "Regular Updates",
    description: "Daily stand-ups and weekly progress reports keep you informed.",
  },
  {
    icon: "Users",
    title: "Dedicated Team",
    description:
      "A dedicated project manager serves as your single point of contact.",
  },
  {
    icon: "Calendar",
    title: "Sprint Reviews",
    description: "Bi-weekly sprint reviews to demo progress and gather feedback.",
  },
];

const tools = [
  "Jira / Linear",
  "Slack / Teams",
  "GitHub / GitLab",
  "Figma",
  "Confluence",
  "Postman",
  "DataDog / New Relic",
  "Terraform",
];

export default async function HowWeWorkPage() {
  const { processSteps } = await getHowWeWorkData();

  // Use default methodology if no data from DB
  const methodology =
    processSteps.length > 0
      ? processSteps.map(
          (
            step: {
              step: number;
              title: string;
              description: string;
              icon?: string;
              activities?: string[];
            },
            index: number
          ) => ({
            ...step,
            icon: step.icon || defaultMethodology[index]?.icon || "Search",
            activities:
              step.activities || defaultMethodology[index]?.activities || [],
          })
        )
      : defaultMethodology;

  return (
    <>
      <ProcessJsonLd steps={methodology} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "How We Work", url: "/how-we-work" },
        ]}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How We Work
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our proven methodology combines agile practices with deep technical
              expertise to deliver exceptional results for every project.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our 5-Step Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach that ensures successful delivery from concept
              to launch.
            </p>
          </div>

          <div className="space-y-12">
            {methodology.map(
              (
                phase: {
                  step: number;
                  title: string;
                  description: string;
                  icon?: string;
                  activities?: string[];
                },
                index: number
              ) => {
                const Icon = iconMap[phase.icon || "Search"] || Search;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8 items-center`}
                  >
                    <div className="flex-1">
                      <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-6">
                          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="text-5xl font-bold text-blue-100">
                            {String(phase.step).padStart(2, "0")}
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                          {phase.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {phase.description}
                        </p>
                        {phase.activities && phase.activities.length > 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {phase.activities.map((activity, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {activity}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      {index === 0 && (
                        <div className="rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                            alt="Team meeting"
                            width={800}
                            height={600}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80"
                            alt="Developer coding"
                            width={800}
                            height={600}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The values that guide every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const Icon =
                principle.icon === "Users"
                  ? Users
                  : principle.icon === "Calendar"
                  ? Calendar
                  : CheckCircle2;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Communication Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Clear Communication
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in transparency and keeping you informed throughout the
              entire process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communication.map((item, index) => {
              const Icon =
                item.icon === "MessageSquare"
                  ? MessageSquare
                  : item.icon === "Calendar"
                  ? Calendar
                  : Users;
              return (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-8 border border-blue-100 text-center"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tools We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading tools and platforms to ensure efficient project
              delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-gray-900 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Let&apos;s discuss how our proven methodology can help bring your
            vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
          >
            Schedule a Call
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

export const revalidate = 60;
