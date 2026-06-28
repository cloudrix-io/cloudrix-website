import { Shield, CreditCard, Globe, Lock } from "lucide-react";
import { Container } from "@/components/ui";

const trustPoints = [
  {
    icon: Shield,
    title: "EU Standards",
    description: "GDPR-compliant delivery",
  },
  {
    icon: CreditCard,
    title: "Multi-Currency",
    description: "EUR, USD, GBP, AED",
  },
  {
    icon: Globe,
    title: "Remote-First",
    description: "Global timezone flexibility",
  },
  {
    icon: Lock,
    title: "Secure Delivery",
    description: "NDA & access control",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-100 bg-white py-8">
      <Container size="xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{point.title}</p>
                  <p className="text-sm text-slate-500">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
