"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cloud,
  Code,
  Zap,
  Shield,
  CheckCircle2,
  Star,
  Award,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { IHomePageContent, ILocalizedContent } from "@/lib/models/page";

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Code,
  Zap,
  Shield,
};

interface HomeContentProps {
  pageContent: ILocalizedContent;
  services: {
    icon?: string;
    title: string;
    shortDescription?: string;
    description?: string;
  }[];
  stats: { value: string; label: string }[];
  processSteps: { step: number; title: string; description: string }[];
  trustPoints: { title: string }[];
  caseStudies: {
    testimonial?: {
      quote: string;
      author: string;
      position: string;
    };
  }[];
}

export function HomeContent({
  pageContent,
  services,
  stats,
  processSteps,
  trustPoints,
  caseStudies,
}: HomeContentProps) {
  const { language, t } = useLanguage();

  // Get content for current language
  const content = (pageContent[language] || pageContent.en || {}) as IHomePageContent;

  // Default values
  const hero = content.hero || {
    badge: t("Available for new projects", "Disponible pour de nouveaux projets"),
    title: t("We Build Software That Scales Your Business", "Nous Construisons des Logiciels Qui Font Grandir Votre Entreprise"),
    subtitle: t(
      "Cloud architecture, full-stack development, and DevOps for European companies.",
      "Architecture cloud, developpement full-stack et DevOps pour les entreprises europeennes."
    ),
    ctaText: t("Book a Free Consultation", "Reserver une Consultation Gratuite"),
    ctaLink: "/contact",
    secondaryCtaText: t("View Case Studies", "Voir les Etudes de Cas"),
    secondaryCtaLink: "/case-studies",
  };

  const servicesSection = content.services || {
    title: t("Our Services", "Nos Services"),
    subtitle: t(
      "Comprehensive cloud and software engineering solutions designed to accelerate your digital transformation.",
      "Solutions completes d'ingenierie cloud et logicielle concues pour accelerer votre transformation numerique."
    ),
  };

  const statsSection = content.stats || {
    title: t("Trusted by European Companies", "Approuve par les Entreprises Europeennes"),
    subtitle: t("Our track record speaks for itself.", "Notre historique parle de lui-meme."),
  };

  const processSection = content.process || {
    title: t("How We Work", "Comment Nous Travaillons"),
    subtitle: t(
      "Our proven methodology ensures successful project delivery every time.",
      "Notre methodologie eprouvee garantit une livraison de projet reussie a chaque fois."
    ),
  };

  const testimonialsSection = content.testimonials || {
    title: t("What Our Clients Say", "Ce Que Disent Nos Clients"),
    subtitle: t(
      "Don't just take our word for it - hear from the businesses we've helped transform.",
      "Ne nous croyez pas sur parole - ecoutez les entreprises que nous avons aidees a se transformer."
    ),
  };

  const ctaSection = content.cta || {
    title: t("Ready to Transform Your Business?", "Pret a Transformer Votre Entreprise?"),
    subtitle: t(
      "Let's discuss how we can help you achieve your goals with expert cloud and software engineering.",
      "Discutons de la facon dont nous pouvons vous aider a atteindre vos objectifs avec une expertise en ingenierie cloud et logicielle."
    ),
    buttonText: t("Book a Free Consultation", "Reserver une Consultation Gratuite"),
  };

  const credibilityPoints = content.credibilityPoints || [
    t("Production-grade solutions for EU companies", "Solutions de qualite production pour les entreprises UE"),
    t("8+ years building scalable systems", "8+ ans de construction de systemes evolutifs"),
    t("Transparent pricing, EUR invoicing", "Tarification transparente, facturation EUR"),
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {hero.badge && (
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  <span>{hero.badge}</span>
                </div>
              )}
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={hero.ctaLink || "/contact"}
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
                >
                  {hero.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={hero.secondaryCtaLink || "/case-studies"}
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                >
                  {hero.secondaryCtaText}
                </Link>
              </div>

              {/* Credibility Points */}
              {credibilityPoints.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-6">
                  {credibilityPoints.slice(0, 3).map((point, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{servicesSection.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {servicesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon || "Cloud"] || Cloud;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 hover:border-blue-200"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.shortDescription || service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg group"
            >
              {t("Explore All Services", "Explorer Tous les Services")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{processSection.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {processSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-8 h-full border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-5xl font-bold text-blue-100 mb-4">
                      {String(item.step).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-blue-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/how-we-work"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg group"
              >
                {t("Learn More About Our Process", "En Savoir Plus Sur Notre Processus")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {caseStudies.length > 0 && caseStudies.some((cs) => cs.testimonial?.quote) && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {testimonialsSection.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {testimonialsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies
                .filter((cs) => cs.testimonial?.quote)
                .slice(0, 3)
                .map((caseStudy, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      &quot;{caseStudy.testimonial!.quote}&quot;
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {caseStudy.testimonial!.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {caseStudy.testimonial!.position}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {ctaSection.title}
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {ctaSection.subtitle}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg group"
          >
            {ctaSection.buttonText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
