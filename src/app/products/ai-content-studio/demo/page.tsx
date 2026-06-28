"use client";

import { useState } from "react";
import Link from "next/link";

type ContentType = "blog" | "social" | "email" | "product";
type Tone = "professional" | "casual" | "persuasive";

const templates: Record<string, Record<Tone, string>> = {
  "blog:tech": {
    professional: `# The Future of Cloud Computing: Trends to Watch in 2026

Cloud computing continues to evolve at a remarkable pace. As organizations worldwide accelerate their digital transformation initiatives, understanding the emerging trends becomes essential for technology leaders and decision-makers.

## 1. Edge Computing Integration

The convergence of edge and cloud computing is reshaping how enterprises process data. By bringing computation closer to data sources, organizations are achieving unprecedented latency reduction while maintaining the scalability benefits of cloud infrastructure.

## 2. AI-Native Cloud Services

Cloud providers are increasingly embedding artificial intelligence directly into their platform services. From automated resource optimization to intelligent security monitoring, AI is becoming an integral component of cloud operations rather than an add-on feature.

## 3. Sustainable Cloud Architecture

Environmental sustainability has moved from a nice-to-have to a fundamental design principle. Leading organizations are adopting carbon-aware computing practices, optimizing workload placement based on renewable energy availability.

## Conclusion

The cloud landscape in 2026 demands a strategic approach that balances innovation with operational excellence. Organizations that embrace these trends early will position themselves for sustained competitive advantage.`,
    casual: `# Cloud Computing in 2026: What's Actually Cool Right Now

Hey there! Let's talk about what's happening in the cloud world, because honestly, things are getting pretty exciting.

## Edge Computing is Everywhere

Remember when everything had to go to a data center miles away? Those days are fading fast. Edge computing is bringing the processing power right next to where you need it. Think of it as having a mini cloud right in your neighborhood. Pretty neat, right?

## AI is Baked In

The coolest part? Cloud services are getting seriously smart. Your cloud platform can now automatically figure out the best way to run your stuff, catch security issues before they become problems, and even predict when you'll need more resources. It's like having a really smart assistant managing your infrastructure.

## Going Green

Here's something to feel good about — cloud providers are going all-in on sustainability. They're actually scheduling workloads based on when and where renewable energy is available. How cool is that?

## The Bottom Line

Cloud computing isn't just about storing stuff online anymore. It's getting smarter, faster, and greener. And that's something we can all get behind!`,
    persuasive: `# Why Your Business Can't Afford to Ignore Cloud Computing in 2026

Every day you delay cloud adoption costs your business money. Here's the reality: your competitors are already leveraging next-generation cloud technologies to move faster, spend less, and deliver better experiences.

## The Numbers Don't Lie

Companies that have embraced modern cloud architecture report 40% reduction in operational costs, 3x faster time-to-market, and 99.99% uptime. Can your on-premise infrastructure match that?

## Edge Computing: Speed is Revenue

In today's market, milliseconds matter. Edge computing delivers sub-10ms latency that transforms user experience. When Amazon found that every 100ms of latency cost them 1% in sales, the message was clear: faster infrastructure means more revenue.

## AI-Powered Operations: Do More With Less

Imagine reducing your operations team's workload by 60% while improving reliability. AI-native cloud services make this possible by automating routine tasks, predicting failures, and optimizing costs in real-time.

## Take Action Now

The gap between cloud-native companies and the rest is widening every quarter. Don't get left behind. Contact us today to start your cloud transformation journey.`,
  },
  "social:tech": {
    professional: `Excited to share our latest insights on cloud computing trends for 2026.

Key takeaways:
- Edge computing is reducing latency by up to 80%
- AI-native cloud services are transforming operations
- Sustainable architecture is becoming the new standard

The organizations that adapt now will lead tomorrow. Read our full analysis at the link below.

#CloudComputing #DigitalTransformation #TechTrends #Enterprise`,
    casual: `Cloud computing is getting SO much cooler in 2026!

Here's what's got us hyped:
- Edge computing = lightning fast everything
- AI built right into your cloud (no extra setup!)
- Green cloud = saving the planet while shipping code

Who else is excited about the future of cloud? Drop your hot takes below!

#Cloud #Tech #Developers #Innovation`,
    persuasive: `Still running on-premise servers? Here's what you're missing:

- 40% lower costs with modern cloud
- 3x faster deployments
- 99.99% uptime guarantee
- AI-powered auto-scaling

Your competitors made the switch. When will you?

Book a free cloud assessment today. Link in bio.

#CloudMigration #BusinessGrowth #ROI #Technology`,
  },
  "email:tech": {
    professional: `Subject: Your Cloud Strategy for 2026 — Key Insights Inside

Dear [Name],

I hope this message finds you well. I'm reaching out to share some insights that may be valuable for your organization's technology strategy.

Our latest research identifies three critical trends that are reshaping cloud infrastructure:

1. Edge-Cloud Integration — Organizations implementing edge computing alongside their cloud infrastructure are seeing 80% latency reduction and 30% cost savings on data transfer.

2. AI-Native Operations — Automated cloud management powered by AI is reducing operational overhead by up to 60% while improving system reliability.

3. Sustainable Architecture — Carbon-aware computing is now delivering both environmental and financial benefits, with early adopters reporting 25% energy cost reduction.

I would welcome the opportunity to discuss how these trends might impact your organization's roadmap. Would you be available for a brief call this week?

Best regards,
[Your Name]`,
    casual: `Subject: Quick cloud tip that could save you $$$

Hey [Name]!

Hope you're having a great week! I wanted to share something quick that I think you'll find super useful.

We've been digging into the latest cloud trends and found some game-changing stuff:

- Edge computing can slash your latency by 80% (your users will love you)
- AI-native cloud tools can automate about 60% of your ops work
- Going green with your cloud actually SAVES money (win-win!)

Want to hop on a quick 15-min call to chat about how this could work for your team? No pressure, just a friendly conversation.

Cheers!
[Your Name]`,
    persuasive: `Subject: [Name], your competitors are already doing this...

Hi [Name],

I'll be direct: 73% of companies in your industry have already migrated to next-generation cloud infrastructure. The remaining 27% are falling behind — faster than they realize.

Here's what early movers are gaining:
- 40% reduction in infrastructure costs
- 3x faster feature deployment
- 99.99% uptime (compared to industry average 99.5%)
- 60% less time spent on operations

Every month of delay widens the gap. But here's the good news: we can get you caught up in as little as 90 days.

I've set aside time this Thursday to walk you through exactly how. Should I send over a calendar invite?

Regards,
[Your Name]`,
  },
  "product:tech": {
    professional: `CloudScale Pro — Enterprise Cloud Management Platform

Streamline your cloud operations with an intelligent management platform designed for modern enterprises. CloudScale Pro provides unified visibility, automated optimization, and comprehensive governance across multi-cloud environments.

Key Features:
- Multi-cloud dashboard with real-time monitoring and alerting
- AI-powered cost optimization with automated right-sizing recommendations
- Security compliance scanning across 200+ regulatory frameworks
- Automated scaling based on predictive demand analysis
- Role-based access control with SSO integration

Technical Specifications:
- Supports AWS, Azure, GCP, and private cloud environments
- 99.99% platform uptime SLA
- SOC 2 Type II and ISO 27001 certified
- REST API with comprehensive documentation

Pricing starts at $499/month for up to 50 cloud resources.`,
    casual: `Meet CloudScale Pro — Your Cloud's New Best Friend!

Managing cloud stuff shouldn't be this hard, right? That's exactly why we built CloudScale Pro. It's like having a super-smart assistant that watches over all your cloud resources, keeps costs in check, and makes sure everything runs smoothly.

What makes it awesome:
- See ALL your cloud stuff in one beautiful dashboard
- AI that automatically finds ways to save you money
- Security checks that would make your compliance team cry tears of joy
- Auto-scaling that actually works (like, really works)

Works with AWS, Azure, GCP — you name it. And setup takes about 5 minutes. Seriously.

Starting at just $499/mo. Try it free for 14 days!`,
    persuasive: `CloudScale Pro: Stop Wasting Money on Cloud Resources You Don't Need

The average company wastes 32% of its cloud spend on underutilized resources. That's not a statistic — it's money walking out your door every single month.

CloudScale Pro puts an end to cloud waste with AI-powered optimization that automatically identifies and eliminates unnecessary spending. Our customers save an average of $47,000 per month within the first 90 days.

- Instant ROI: Most customers recoup their investment within 2 weeks
- Zero Risk: 14-day free trial, cancel anytime
- Proven Results: Trusted by 500+ enterprises worldwide
- Enterprise Ready: SOC 2 Type II certified, 99.99% uptime SLA

Don't let another month of cloud waste go by. Start your free trial now and see exactly how much you could be saving.`,
  },
};

const contentTypeLabels: Record<ContentType, string> = {
  blog: "Blog Post",
  social: "Social Media Post",
  email: "Email",
  product: "Product Description",
};

function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const syllables = words * 1.5; // rough estimate
  if (sentences === 0 || words === 0) return 0;
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function ContentAIStudioDemo() {
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [topic, setTopic] = useState("Cloud Computing Technology");
  const [audience, setAudience] = useState("Tech professionals and decision-makers");
  const [tone, setTone] = useState<Tone>("professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setGeneratedContent("");
    setTimeout(() => {
      const key = `${contentType}:tech`;
      const content = templates[key]?.[tone] || templates["blog:tech"][tone];
      setGeneratedContent(content);
      setGenerating(false);
    }, 2000);
  };

  const wordCount = generatedContent ? generatedContent.split(/\s+/).filter(Boolean).length : 0;
  const readability = generatedContent ? calculateReadability(generatedContent) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/ai-content-studio" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to ContentAI Studio</Link>
          <h1 className="text-3xl font-bold">ContentAI Studio</h1>
          <p className="text-pink-100 mt-1">Generate professional content in seconds</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(contentTypeLabels) as [ContentType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setContentType(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      contentType === key
                        ? "bg-pink-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {(["professional", "casual", "persuasive"] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      tone === t
                        ? "bg-pink-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Product Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm"
                placeholder="e.g., Cloud Computing, SaaS Platform, AI Tools"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm"
                placeholder="e.g., CTOs, small business owners, developers"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-3 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50 shadow-lg shadow-pink-200"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Generating {contentTypeLabels[contentType]}...
              </span>
            ) : `Generate ${contentTypeLabels[contentType]}`}
          </button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">Generated {contentTypeLabels[contentType]}</span>
                <span className="text-xs bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full">{wordCount} words</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full">Readability: {readability}/100</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-1.5 rounded-lg font-medium transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-6">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{generatedContent}</pre>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want AI content at scale?</h2>
          <p className="text-pink-100 mb-6">Generate thousands of pieces of content monthly with AI that learns your brand voice, maintains consistency, and optimizes for engagement.</p>
          <Link href="/contact" className="inline-block bg-white text-pink-700 font-semibold px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
