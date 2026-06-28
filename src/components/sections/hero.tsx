import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui";

const credibilityPoints = [
  "Production-grade solutions for global companies",
  "8+ years building scalable systems",
  "Transparent pricing, multi-currency invoicing",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />

      <Container size="xl" className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Available for new projects
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            We Build Software That
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Scales Your Business
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            Cloud architecture, full-stack development, and DevOps for companies
            worldwide. From startups to enterprises we deliver production-grade
            solutions that work.
          </p>

          {/* Credibility Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {credibilityPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                {point}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-slate-800"
            >
              View Services
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
