import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X, Minus } from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd, ComparisonJsonLd } from "@/components/seo";
import { Breadcrumbs } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

interface ComparisonFeature {
  feature: string;
  cloudrix: string | boolean;
  competitor: string | boolean;
}

interface ComparisonData {
  slug: string;
  competitor: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroSubtitle: string;
  features: ComparisonFeature[];
  differentiators: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

const comparisons: Record<string, ComparisonData> = {
  "toptal-alternative": {
    slug: "toptal-alternative",
    competitor: "Toptal",
    title: "Cloudrix vs Toptal: Which Is Right for Your Company?",
    seoTitle: "Cloudrix vs Toptal — Senior Engineering Alternative to Toptal",
    seoDescription: "Compare Cloudrix and Toptal for software engineering services. See pricing, talent quality, EU timezone coverage, and cultural fit differences.",
    heroSubtitle: "Toptal connects you with global freelancers. Cloudrix provides dedicated senior engineering teams with global reach and European quality standards. Here's how they compare.",
    features: [
      { feature: "Base in Europe", cloudrix: true, competitor: false },
      { feature: "EU Timezone Coverage", cloudrix: "Full CET/CEST overlap", competitor: "Varies by freelancer" },
      { feature: "Team Integration", cloudrix: "Joins your standups, Slack, processes", competitor: "Independent contractor model" },
      { feature: "Pricing Model", cloudrix: "€8,500/mo per engineer, no markup", competitor: "€10-15K/mo (40-60% markup on freelancers)" },
      { feature: "Minimum Commitment", cloudrix: "Month-to-month", competitor: "2-week trial, then project-based" },
      { feature: "AI/ML Expertise", cloudrix: true, competitor: "Limited" },
      { feature: "Cloud Architecture", cloudrix: "Deep AWS/GCP/Azure expertise", competitor: "Freelancer-dependent" },
      { feature: "GDPR Compliance", cloudrix: "Built-in, NL entity", competitor: "Freelancer responsibility" },
      { feature: "EUR Invoicing", cloudrix: true, competitor: "USD only" },
      { feature: "Account Management", cloudrix: "Dedicated", competitor: "Self-service platform" },
      { feature: "Code Quality Guarantee", cloudrix: "Code reviews, testing standards", competitor: "Freelancer discretion" },
      { feature: "Onboarding Time", cloudrix: "1-2 weeks", competitor: "1-3 days (but no team integration)" },
    ],
    differentiators: [
      { title: "Team, Not Talent Marketplace", description: "Toptal is a freelancer marketplace. You get an individual who works independently. With Cloudrix, you get engineers who integrate with your team — attend your standups, follow your processes, and feel like an extension of your organization." },
      { title: "Built for Europe", description: "Cloudrix is a Dutch company that understands EU business culture, GDPR requirements, and European communication styles. Toptal's global talent pool means timezone and cultural alignment is a gamble." },
      { title: "Senior-Only, Always", description: "Every Cloudrix engineer has 5+ years of production experience. Toptal's '3% acceptance rate' sounds impressive, but it doesn't guarantee the seniority level you need for your specific tech stack." },
      { title: "Transparent Pricing", description: "Cloudrix charges €8,500/month per engineer with no hidden markups. Toptal typically adds a 40-60% markup on top of what the freelancer earns, meaning you're paying significantly more for the same work." },
    ],
    faqs: [
      { question: "Is Cloudrix cheaper than Toptal?", answer: "Yes. Cloudrix charges €8,500/month per engineer with transparent pricing. Toptal typically charges €10-15K/month per engineer due to their 40-60% platform markup. You get senior engineers at a fair price without the hidden fees." },
      { question: "Can Cloudrix scale as fast as Toptal?", answer: "Toptal can match freelancers faster (1-3 days), but they're individuals, not team members. Cloudrix onboards dedicated engineers in 1-2 weeks who integrate fully with your team. For sustained engagements, this slower start delivers much better outcomes." },
      { question: "What if I need just one developer for a short project?", answer: "For short-term, single-developer needs, Toptal may be a better fit. Cloudrix excels when you need 2+ engineers for 3+ months, or when you need deep expertise in cloud, DevOps, or AI that requires team-level collaboration." },
      { question: "Does Cloudrix offer a trial period?", answer: "Yes. We offer month-to-month contracts with no long-term commitment. If an engineer isn't the right fit, we replace them at no additional cost." },
    ],
  },
  "thoughtworks-alternative": {
    slug: "thoughtworks-alternative",
    competitor: "Thoughtworks",
    title: "Cloudrix vs Thoughtworks: Enterprise Engineering Without the Enterprise Price Tag",
    seoTitle: "Cloudrix vs Thoughtworks — Lean Alternative for EU Companies",
    seoDescription: "Compare Cloudrix and Thoughtworks for software consulting. Same senior quality, fraction of the cost. No 50-person teams, no 6-month ramp-up.",
    heroSubtitle: "Thoughtworks brings enterprise consulting rigor. Cloudrix brings the same senior talent without the overhead of a 12,000-person organization.",
    features: [
      { feature: "Company Size", cloudrix: "Boutique (focused, agile)", competitor: "12,000+ employees (slow, layered)" },
      { feature: "Engagement Minimum", cloudrix: "€15,000 project / 1 engineer", competitor: "€200K+ (typically 5+ person teams)" },
      { feature: "Decision Speed", cloudrix: "Founder-led, decisions in hours", competitor: "Multiple layers of management" },
      { feature: "Engineer Seniority", cloudrix: "Senior-only (5+ years)", competitor: "Mixed (often junior-heavy teams)" },
      { feature: "EU Focus", cloudrix: "Exclusively EU companies", competitor: "Global focus" },
      { feature: "AI/ML Services", cloudrix: "RAG, LLM integration, AI agents", competitor: "AI consulting (more strategic)" },
      { feature: "Pricing", cloudrix: "€8,500/mo per engineer", competitor: "€15-25K/mo per consultant" },
      { feature: "Contract Flexibility", cloudrix: "Month-to-month", competitor: "6-12 month minimum" },
      { feature: "Overhead", cloudrix: "Zero — direct engineering only", competitor: "Project managers, engagement leads, etc." },
      { feature: "Technology Agnostic", cloudrix: true, competitor: true },
    ],
    differentiators: [
      { title: "No Bench Tax", description: "Large consultancies like Thoughtworks bake bench costs into your rate. You're paying for engineers sitting between projects. Cloudrix has zero bench — you pay for productive engineering hours only." },
      { title: "Direct Access to Senior Engineers", description: "At Thoughtworks, you talk to account managers and engagement leads. At Cloudrix, you talk directly to the engineers building your product. Faster communication, fewer misunderstandings." },
      { title: "Right-Sized Teams", description: "Thoughtworks tends to recommend 5-10 person teams. We often solve the same problems with 2-3 senior engineers. Smaller teams move faster and cost less." },
      { title: "No Methodology Tax", description: "Thoughtworks sells their methodology and tools. We adopt YOUR processes. We join your Jira, follow your PR workflow, and use your CI/CD pipeline. Zero disruption to your existing workflow." },
    ],
    faqs: [
      { question: "Is Cloudrix as capable as Thoughtworks?", answer: "For projects that need 2-5 senior engineers — absolutely. Thoughtworks' advantage is at the 20+ person program level. For most European mid-market companies, Cloudrix delivers the same quality at 40-60% lower cost." },
      { question: "Does Cloudrix do enterprise-scale projects?", answer: "Yes, but we right-size the team. Where Thoughtworks might propose 10 consultants, we typically deliver the same outcomes with 3-4 senior engineers. Less overhead, faster delivery." },
      { question: "What about Thoughtworks' thought leadership and methodology?", answer: "Thoughtworks has excellent technical content and the Technology Radar. But methodology doesn't write code. Our engineers bring the same caliber of thinking without the consulting framework overhead." },
    ],
  },
  "epam-alternative": {
    slug: "epam-alternative",
    competitor: "EPAM",
    title: "Cloudrix vs EPAM: European Engineering Without the Offshore Complexity",
    seoTitle: "Cloudrix vs EPAM — EU-Based Alternative to EPAM Systems",
    seoDescription: "Compare Cloudrix and EPAM for software development. EU-based teams, no timezone gaps, transparent pricing. Senior engineers without the offshore model.",
    heroSubtitle: "EPAM offers scale through offshore delivery. Cloudrix offers senior EU-based engineers who work in your timezone. Different models for different needs.",
    features: [
      { feature: "Delivery Location", cloudrix: "EU-based (Netherlands)", competitor: "Eastern Europe, India, LATAM" },
      { feature: "Timezone Overlap", cloudrix: "Full CET/CEST", competitor: "Partial (1-3 hours typical gap)" },
      { feature: "Communication", cloudrix: "Native English, direct access", competitor: "Through project managers, possible language barriers" },
      { feature: "Team Size", cloudrix: "2-5 senior engineers", competitor: "10-50+ (mixed seniority)" },
      { feature: "Engineer Selection", cloudrix: "You interview every engineer", competitor: "EPAM assigns team members" },
      { feature: "Pricing", cloudrix: "€8,500/mo per engineer", competitor: "€5-8K/mo (but lower seniority, more heads needed)" },
      { feature: "Total Cost", cloudrix: "3 seniors × €8.5K = €25.5K/mo", competitor: "8 mixed × €6K = €48K/mo for same output" },
      { feature: "AI/ML Expertise", cloudrix: "Deep (RAG, LLMs, agents)", competitor: "Growing but variable" },
      { feature: "GDPR Compliance", cloudrix: "EU entity, EU data processing", competitor: "Complex cross-border data flows" },
      { feature: "Ramp-up Time", cloudrix: "1-2 weeks", competitor: "4-8 weeks" },
    ],
    differentiators: [
      { title: "Quality Over Quantity", description: "EPAM's model relies on larger teams with mixed seniority levels. Cloudrix uses fewer, more experienced engineers. Three senior engineers consistently outperform eight junior-to-mid engineers." },
      { title: "EU Data Sovereignty", description: "With Cloudrix, your code and data stay within the EU. EPAM's distributed delivery model means your IP may be accessed from multiple jurisdictions — a growing concern for GDPR-sensitive industries." },
      { title: "Zero Management Overhead", description: "EPAM's large teams require dedicated project management, increasing your coordination costs. With Cloudrix's small senior teams, your existing engineering lead can manage the collaboration directly." },
      { title: "Real EU Work Culture", description: "EU business culture values directness, work-life balance, and quality over speed. Cloudrix engineers share these values because they live and work in the EU, not because they've been trained in a corporate program." },
    ],
    faqs: [
      { question: "Isn't EPAM cheaper per hour?", answer: "EPAM's hourly rates are lower, but total project costs are often higher because you need more people to achieve the same output. Three Cloudrix seniors at €8.5K/month typically deliver what 7-8 EPAM mixed-seniority engineers would, at lower total cost." },
      { question: "Can Cloudrix handle 20+ person projects?", answer: "Our sweet spot is 2-8 engineers. For 20+ person programs, EPAM or similar large firms may be more appropriate. However, we find that most projects sized for 20 offshore engineers can be delivered by 5-8 senior engineers." },
      { question: "What about EPAM's industry expertise?", answer: "EPAM has deep vertical expertise from years of enterprise projects. Cloudrix brings strong horizontal expertise (cloud, AI, DevOps) that applies across industries. For industry-specific compliance requirements, we partner with domain experts." },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = comparisons[slug];

  if (!data) {
    return { title: "Comparison Not Found | Cloudrix" };
  }

  return {
    title: `${data.seoTitle} | Cloudrix`,
    description: data.seoDescription,
    openGraph: {
      title: `${data.seoTitle} | Cloudrix`,
      description: data.seoDescription,
      url: `https://www.cloudrix.io/compare/${data.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.cloudrix.io/compare/${data.slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({ slug }));
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-green-600 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  if (value === "Limited" || value === "Varies") return <Minus className="w-5 h-5 text-yellow-500 mx-auto" />;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const data = comparisons[slug];

  if (!data) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Compare", url: `/compare/${data.slug}` },
    { name: `vs ${data.competitor}`, url: `/compare/${data.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ComparisonJsonLd
        title={data.title}
        description={data.seoDescription}
        slug={data.slug}
        competitors={["Cloudrix", data.competitor]}
      />
      <FAQJsonLd faqs={data.faqs} pageUrl={`/compare/${data.slug}`} />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Feature-by-Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 border-b-2 border-gray-200 w-1/3">
                      Feature
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-blue-600 border-b-2 border-blue-200 w-1/3">
                      Cloudrix
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 border-b-2 border-gray-200 w-1/3">
                      {data.competitor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-100">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center border-b border-gray-100">
                        <CellValue value={row.cloudrix} />
                      </td>
                      <td className="py-4 px-6 text-center border-b border-gray-100">
                        <CellValue value={row.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Companies Switch from {data.competitor} to Cloudrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.differentiators.map((diff, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{diff.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to See the Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Book a free 30-minute consultation. No sales pitch — just an honest conversation
              about what your project needs and whether we&apos;re the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
              >
                Book Free Consultation
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
