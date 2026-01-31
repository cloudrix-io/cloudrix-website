import { Metadata } from "next";
import Link from "next/link";
import { Linkedin, Copy, ArrowRight, CheckCircle, Download, Sparkles, Users } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Free LinkedIn Post Templates for Tech Founders | Cloudrix",
  description:
    "50+ proven LinkedIn post templates for tech founders and CTOs. Grow your personal brand and attract clients. Free download, no sign-up required.",
  openGraph: {
    title: "Free LinkedIn Post Templates for Tech Founders | Cloudrix",
    description:
      "50+ proven LinkedIn post templates for tech founders and CTOs. Grow your personal brand.",
    url: "https://cloudrix.io/linkedin-templates",
  },
  alternates: {
    canonical: "https://cloudrix.io/linkedin-templates",
  },
};

const templateCategories = [
  {
    name: "Thought Leadership",
    description: "Position yourself as an industry expert",
    templates: [
      {
        title: "The Contrarian Take",
        template: `[Controversial opinion in your field]

Here's why everyone's wrong about [topic]:

1. [First reason with specific data]
2. [Second reason with example]
3. [Third reason with insight]

The companies that understand this are [achieving X result].

The ones that don't? [They're struggling with Y].

What's your take? 👇`,
        engagement: "High engagement - drives comments",
      },
      {
        title: "The Mistake Confession",
        template: `I made a €[X] mistake last [time period].

Here's what happened:
[Brief story of the mistake]

What I learned:
• [Lesson 1]
• [Lesson 2]
• [Lesson 3]

If you're facing the same decision, here's my advice:
[Actionable advice]

Anyone else made this mistake? How did you handle it?`,
        engagement: "Very high - vulnerability resonates",
      },
      {
        title: "Industry Prediction",
        template: `My [industry] predictions for the next 12 months:

1. [Prediction] - because [reasoning]
2. [Prediction] - I'm seeing [evidence]
3. [Prediction] - the data shows [stats]

What most people are missing: [insight]

Bookmark this post. I'll revisit in 12 months.

What would you add to this list?`,
        engagement: "High - people love predictions",
      },
    ],
  },
  {
    name: "Case Studies",
    description: "Showcase your work and results",
    templates: [
      {
        title: "The Transformation Story",
        template: `[Company type] came to us with:
❌ [Problem 1]
❌ [Problem 2]
❌ [Problem 3]

6 months later:
✅ [Result 1 with numbers]
✅ [Result 2 with numbers]
✅ [Result 3 with numbers]

The turning point? [Key insight or change]

Here's exactly what we did:
[Brief explanation of approach]

DM me "CASE" if you want the full breakdown.`,
        engagement: "Excellent for lead generation",
      },
      {
        title: "The Numbers Story",
        template: `From €[X] to €[Y] in [timeframe].

That's not a typo.

Here's how [client type] achieved this:

Week 1-2: [Action]
Week 3-4: [Action]
Week 5-8: [Action]
Week 9-12: [Action]

The secret? [Key insight]

Most people skip step [X]. Don't.

Want the detailed playbook? Drop a 🔥 and I'll DM you.`,
        engagement: "High - specific numbers drive curiosity",
      },
    ],
  },
  {
    name: "Educational Content",
    description: "Teach your audience something valuable",
    templates: [
      {
        title: "The How-To Guide",
        template: `How to [achieve desirable outcome] in [timeframe]:

Step 1: [Specific action]
↳ [Brief explanation]

Step 2: [Specific action]
↳ [Brief explanation]

Step 3: [Specific action]
↳ [Brief explanation]

Step 4: [Specific action]
↳ [Brief explanation]

Step 5: [Specific action]
↳ [Brief explanation]

Bonus tip: [Extra insight]

Save this post. You'll need it.`,
        engagement: "High saves and shares",
      },
      {
        title: "The Myth Buster",
        template: `Stop believing these [industry] myths:

Myth 1: "[Common misconception]"
Reality: [What's actually true]

Myth 2: "[Common misconception]"
Reality: [What's actually true]

Myth 3: "[Common misconception]"
Reality: [What's actually true]

The truth? [Overarching insight]

Which myth did you believe? Be honest 👇`,
        engagement: "High - challenges beliefs",
      },
    ],
  },
  {
    name: "Personal Brand",
    description: "Build connection with your audience",
    templates: [
      {
        title: "The Origin Story",
        template: `[X] years ago, I was [previous situation].

I had no:
• [Thing you lacked]
• [Thing you lacked]
• [Thing you lacked]

Today, I [current achievement].

The turning point came when [pivotal moment].

I learned that [key lesson].

If you're where I was [X] years ago, know this:
[Encouragement and advice]

What's your origin story? Share below 👇`,
        engagement: "Builds strong connection",
      },
      {
        title: "The Day in the Life",
        template: `A realistic day as a [your role]:

6:00 AM - [Activity]
7:00 AM - [Activity]
9:00 AM - [Activity]
12:00 PM - [Activity]
2:00 PM - [Activity]
5:00 PM - [Activity]
8:00 PM - [Activity]

The part no one talks about: [Reality check]

It's not glamorous. But [positive insight].

What does YOUR typical day look like?`,
        engagement: "High relatability",
      },
    ],
  },
];

export default function LinkedInTemplatesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "LinkedIn Templates", url: "/linkedin-templates" },
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Linkedin className="w-4 h-4" />
                <span>Free Resource</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                LinkedIn Post Templates That Actually Get Engagement
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Stop staring at a blank screen. Use these proven templates to build your
                personal brand and attract clients. Tested by tech founders who&apos;ve
                grown to 50K+ followers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#templates"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Templates
                </a>
                <a
                  href="#download"
                  className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download All (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">Free</div>
                <div className="text-sm text-gray-600">No Email Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {templateCategories.map((category, catIdx) => (
              <div key={catIdx} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.templates.map((template, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">{template.title}</h3>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <div className="p-6">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {template.template}
                        </pre>
                        <div className="mt-4 flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{template.engagement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get All 50+ Templates in One PDF
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Download the complete collection and never stare at a blank screen again.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </form>

            <p className="text-sm text-gray-500">
              No spam. We&apos;ll also send you weekly LinkedIn tips. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Templates Are Just the Start
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Want a personal brand that actually generates leads? We help tech founders
              build content strategies that turn LinkedIn into a client acquisition machine.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
            >
              Let&apos;s Build Your Brand
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
