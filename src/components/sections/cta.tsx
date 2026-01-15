import Link from "next/link";
import { Mail, Calendar } from "lucide-react";
import { Section, Container } from "@/components/ui";
import { companyInfo } from "@/data/company";

export function CTA() {
  return (
    <Section variant="gradient" size="lg">
      <Container size="md" className="text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Build Something Great?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
          Book a free consultation to discuss your project. No sales pitch
          just an honest conversation about how we can help.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Call
          </Link>
          <a
            href={`mailto:${companyInfo.email}`}
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            <Mail className="mr-2 h-5 w-5" />
            Send an Email
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Typically respond within 24 hours EU business hours available
        </p>
      </Container>
    </Section>
  );
}
