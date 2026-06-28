"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  { category: "Authentication", items: ["Email/password login", "OAuth (Google, GitHub, Microsoft)", "Magic link authentication", "Two-factor authentication (2FA)", "Session management", "Role-based access control"] },
  { category: "Billing & Payments", items: ["Stripe integration", "Subscription management", "Usage-based billing", "Invoice generation", "Proration & upgrades", "Webhook handling"] },
  { category: "Dashboard", items: ["Admin dashboard", "User dashboard", "Analytics overview", "Activity feed", "Search & filters", "Data export (CSV, PDF)"] },
  { category: "Team Management", items: ["Organization/workspace model", "Team invitations", "Member roles & permissions", "Audit logging", "API key management", "SSO (SAML)"] },
  { category: "Infrastructure", items: ["Next.js 16 App Router", "PostgreSQL + Prisma ORM", "Redis caching", "Background jobs (BullMQ)", "File uploads (S3)", "Email sending (Resend)"] },
  { category: "DevOps", items: ["Docker Compose setup", "CI/CD (GitHub Actions)", "Environment management", "Database migrations", "Monitoring & alerting", "One-click Vercel deploy"] },
];

const techStack = [
  { name: "Next.js 16", color: "bg-black text-white" },
  { name: "TypeScript", color: "bg-blue-600 text-white" },
  { name: "Tailwind CSS", color: "bg-cyan-500 text-white" },
  { name: "PostgreSQL", color: "bg-blue-800 text-white" },
  { name: "Prisma", color: "bg-indigo-600 text-white" },
  { name: "Redis", color: "bg-red-600 text-white" },
  { name: "Stripe", color: "bg-purple-600 text-white" },
  { name: "Resend", color: "bg-slate-700 text-white" },
  { name: "BullMQ", color: "bg-orange-500 text-white" },
  { name: "Docker", color: "bg-blue-500 text-white" },
  { name: "Vercel", color: "bg-black text-white" },
  { name: "shadcn/ui", color: "bg-slate-800 text-white" },
];

const codeSnippets = [
  {
    title: "Authentication Setup",
    language: "typescript",
    code: `// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ clientId: env.GOOGLE_ID, clientSecret: env.GOOGLE_SECRET }),
    GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET }),
    Resend({ from: "noreply@yoursaas.com" }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id, role: user.role },
    }),
  },
});`,
  },
  {
    title: "Stripe Subscription",
    language: "typescript",
    code: `// lib/billing.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createSubscription(
  customerId: string,
  priceId: string
) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  });

  return {
    subscriptionId: subscription.id,
    clientSecret: (subscription.latest_invoice as Stripe.Invoice)
      .payment_intent.client_secret,
  };
}`,
  },
  {
    title: "Database Schema",
    language: "prisma",
    code: `// prisma/schema.prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  members   Member[]
  apiKeys   ApiKey[]
  createdAt DateTime @default(now())
}

model Member {
  id             String       @id @default(cuid())
  role           Role         @default(MEMBER)
  user           User         @relation(fields: [userId])
  userId         String
  organization   Organization @relation(fields: [orgId])
  orgId          String
  @@unique([userId, orgId])
}`,
  },
];

const plans = [
  {
    name: "Starter",
    price: "$149",
    description: "Perfect for solo developers launching their first SaaS.",
    features: ["Full source code", "Authentication (email + OAuth)", "Stripe billing", "Basic dashboard", "Email support", "Community access"],
    cta: "Get Starter",
    popular: false,
  },
  {
    name: "Professional",
    price: "$249",
    description: "For serious builders who want the complete toolkit.",
    features: ["Everything in Starter", "Team management & RBAC", "Admin dashboard", "Background jobs", "File uploads (S3)", "Priority email support", "6 months of updates"],
    cta: "Get Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$399",
    description: "For teams building production SaaS products.",
    features: ["Everything in Professional", "SSO (SAML)", "Audit logging", "API key management", "Advanced analytics", "1-on-1 setup call", "Lifetime updates", "Private Discord channel"],
    cta: "Get Enterprise",
    popular: false,
  },
];

export default function SaasStarterDemo() {
  const [activeSnippet, setActiveSnippet] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/products/saas-starter" className="text-slate-400 hover:text-white text-sm mb-4 inline-block">&larr; Back to SaaS Starter Kit</Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-3xl font-bold">SaaS Starter Kit</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">Ship your SaaS in days, not months. Production-ready boilerplate with auth, billing, teams, and dashboards built in.</p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://demo.cloudrix.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
            >
              View Live Demo
            </a>
            <a
              href="https://demo.cloudrix.io"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech.name} className={`${tech.color} text-sm font-medium px-4 py-2 rounded-full`}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Code Previews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Code Preview</h2>
          <div className="flex gap-2 mb-4">
            {codeSnippets.map((snippet, i) => (
              <button
                key={i}
                onClick={() => setActiveSnippet(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSnippet === i ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-400">{codeSnippets[activeSnippet].title}</span>
            </div>
            <pre className="p-6 text-sm text-slate-300 overflow-x-auto font-mono leading-relaxed">
              <code>{codeSnippets[activeSnippet].code}</code>
            </pre>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Simple Pricing</h2>
          <p className="text-slate-500 text-center mb-8">One-time purchase. Lifetime access to your codebase.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-sm border p-6 relative ${
                  plan.popular ? "border-violet-300 shadow-violet-100 shadow-lg" : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-2">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-sm text-slate-500">one-time</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to ship your SaaS?</h2>
          <p className="text-violet-100 mb-6">Stop building boilerplate. Focus on what makes your product unique.</p>
          <a
            href="https://demo.cloudrix.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-violet-700 font-semibold px-8 py-3 rounded-lg hover:bg-violet-50 transition-colors"
          >
            View Live Demo at demo.cloudrix.io
          </a>
        </div>
      </div>
    </div>
  );
}
