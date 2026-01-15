import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms";
import connectDB from "@/lib/mongodb";
import { CompanyInfo, Service, Page } from "@/lib/models";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo";

const faqs = [
  {
    question: "How does the consultation work?",
    answer: "We'll have a 30-minute call to understand your challenges and goals. After the call, if there's a good fit, we'll send you a detailed proposal with scope, timeline, and pricing.",
  },
  {
    question: "What information should I prepare?",
    answer: "It helps to have a rough idea of your project scope, timeline, and budget. But don't worry if you're not sure - that's exactly what the consultation is for.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, absolutely. We're happy to sign an NDA before discussing any sensitive information about your project or business.",
  },
  {
    question: "What currencies do you invoice in?",
    answer: "We invoice in EUR for all EU clients. This keeps things simple and avoids currency conversion issues.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const pageData = await Page.findOne({ slug: "contact", isPublished: true }).lean();

    const title = pageData?.seoTitle?.en || "Contact Cloudrix - Book a Free Consultation";
    const description = pageData?.seoDescription?.en ||
      "Book a free 30-minute consultation with our engineering team. Discuss your cloud, development, or DevOps challenges. No sales pitch, just honest advice.";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | Cloudrix`,
        description,
        url: "https://cloudrix.io/contact",
        type: "website",
        images: [
          {
            url: `/og?title=${encodeURIComponent("Let's Talk About Your Project")}&subtitle=${encodeURIComponent("Book a free 30-minute consultation")}&type=contact`,
            width: 1200,
            height: 630,
            alt: "Contact Cloudrix",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Cloudrix`,
        description,
        images: [`/og?title=${encodeURIComponent("Let's Talk About Your Project")}&subtitle=${encodeURIComponent("Book a free 30-minute consultation")}&type=contact`],
      },
      alternates: {
        canonical: "https://cloudrix.io/contact",
      },
    };
  } catch {
    return {
      title: "Contact",
      description: "Get in touch with Cloudrix. Book a free consultation or send us a message about your software engineering needs.",
    };
  }
}

async function getContactData() {
  try {
    await connectDB();

    const [companyInfo, services] = await Promise.all([
      CompanyInfo.findOne().lean(),
      Service.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);

    return {
      companyInfo: JSON.parse(JSON.stringify(companyInfo)),
      services: JSON.parse(JSON.stringify(services)),
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      companyInfo: null,
      services: [],
    };
  }
}

export default async function ContactPage() {
  const { companyInfo } = await getContactData();

  const email = companyInfo?.email || "hello@cloudrix.io";
  const phone = companyInfo?.phone || "+216 XX XXX XXX";
  const location = companyInfo?.location || "Tunisia (serving EU clients)";

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Talk
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to transform your business with expert cloud and software
              engineering? Book a free consultation call with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Book a Free Consultation
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{email}</span>
                  </a>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  We&apos;re Fast!
                </h3>
                <p className="text-gray-700">
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Our Location
                </h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">{location}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      EU timezone overlap for seamless communication
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Free 30-minute consultation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      No obligation or pressure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Honest assessment of your needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Clear next steps provided
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900">
                How does the consultation work?
              </h3>
              <p className="mt-2 text-gray-600">
                We&apos;ll have a 30-minute call to understand your challenges
                and goals. After the call, if there&apos;s a good fit,
                we&apos;ll send you a detailed proposal with scope, timeline,
                and pricing.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900">
                What information should I prepare?
              </h3>
              <p className="mt-2 text-gray-600">
                It helps to have a rough idea of your project scope, timeline,
                and budget. But don&apos;t worry if you&apos;re not sure -
                that&apos;s exactly what the consultation is for.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900">Do you sign NDAs?</h3>
              <p className="mt-2 text-gray-600">
                Yes, absolutely. We&apos;re happy to sign an NDA before
                discussing any sensitive information about your project or
                business.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900">
                What currencies do you invoice in?
              </h3>
              <p className="mt-2 text-gray-600">
                We invoice in EUR for all EU clients. This keeps things simple
                and avoids currency conversion issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prefer to Talk First?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a 30-minute discovery call with one of our cloud experts to
            discuss your project.
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Call Us Now: {phone}
          </a>
        </div>
      </section>
    </div>
    </>
  );
}

export const revalidate = 60;
