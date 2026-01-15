import Link from "next/link";
import { ArrowRight, Cloud, Code, Settings, MessageSquare, Users } from "lucide-react";
import { Section, Container, Card, Badge } from "@/components/ui";
import { services } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Code,
  Settings,
  MessageSquare,
  Users,
};

export function ServicesPreview() {
  return (
    <Section variant="default">
      <Container size="xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="primary" className="mb-4">
            What We Do
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Engineering Services Built for Scale
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From architecture to deployment, we handle the technical complexity
            so you can focus on your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <Card
                key={service.id}
                variant="bordered"
                className="group transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-slate-600">{service.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-slate-700">Problem:</span>{" "}
                    <span className="text-slate-500">{service.problem}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-green-600">Result:</span>{" "}
                    <span className="text-slate-500">{service.result}</span>
                  </p>
                </div>
                <Link
                  href={`/services#${service.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
