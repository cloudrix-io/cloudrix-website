import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedServicesProps {
  serviceSlugs: string[];
}

const serviceMap: Record<string, { title: string; description: string }> = {
  "cloud-migration": { title: "Cloud Migration Services", description: "Migrate to AWS, GCP, or Azure with zero downtime" },
  "devops-consulting": { title: "DevOps Consulting", description: "CI/CD pipelines, monitoring, and infrastructure automation" },
  "ai-consulting": { title: "AI & ML Consulting", description: "Strategy to production: AI agents, RAG, GDPR-compliant ML" },
  "full-stack-development": { title: "Full-Stack Development", description: "React, Next.js, Node.js, Python — MVPs to enterprise systems" },
  "technical-due-diligence": { title: "Technical Due Diligence", description: "Independent code, architecture, and security assessment" },
  "dedicated-teams": { title: "Dedicated Development Teams", description: "Senior engineers, EU timezone, no long-term commitment" },
  "api-development": { title: "API Development & Integration", description: "REST, GraphQL, third-party integrations" },
  "llm-integration": { title: "LLM Integration Services", description: "RAG systems, prompt engineering, production AI" },
  "legacy-modernization": { title: "Legacy System Modernization", description: "Incremental migration from monoliths to modern architecture" },
};

export function RelatedServices({ serviceSlugs }: RelatedServicesProps) {
  const services = serviceSlugs
    .map((slug) => ({ slug, ...serviceMap[slug] }))
    .filter((s) => s.title);

  if (services.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">{service.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
