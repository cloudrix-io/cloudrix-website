import Link from "next/link";
import { ArrowRight, Search, FileText, Rocket, HeartHandshake } from "lucide-react";
import { Section, Container, Badge } from "@/components/ui";

const steps = [
  {
    icon: Search,
    step: 1,
    title: "Discovery",
    description: "Free consultation to understand your challenges and goals",
  },
  {
    icon: FileText,
    step: 2,
    title: "Proposal",
    description: "Detailed scope, timeline, and transparent pricing",
  },
  {
    icon: Rocket,
    step: 3,
    title: "Delivery",
    description: "Agile sprints with regular updates and demos",
  },
  {
    icon: HeartHandshake,
    step: 4,
    title: "Support",
    description: "Knowledge transfer and optional ongoing support",
  },
];

export function ProcessPreview() {
  return (
    <Section variant="gray">
      <Container size="xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="primary" className="mb-4">
            Our Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From First Call to Production
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A structured approach that keeps you informed and in control at
            every stage.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-slate-200 lg:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step Number & Icon */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-lg">
                      <Icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/how-we-work"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
          >
            Learn More About Our Process
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
