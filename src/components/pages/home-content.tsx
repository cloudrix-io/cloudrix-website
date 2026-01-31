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

  // Default values - POWERFUL CONVERSION-FOCUSED COPY
  const hero = content.hero || {
    badge: t("🚀 2 Spots Left for Q1 2025", "🚀 2 Places Restantes pour T1 2025"),
    title: t("Stop Losing Money on Bad Software", "Arrêtez de Perdre de l'Argent avec de Mauvais Logiciels"),
    subtitle: t(
      "We turn struggling tech projects into revenue machines. €12M+ in client impact. 99.9% uptime. Zero BS.",
      "Nous transformons les projets tech en difficulté en machines à revenus. €12M+ d'impact client. 99.9% uptime. Zéro baratin."
    ),
    ctaText: t("Get Your Free Strategy Call", "Obtenez Votre Appel Stratégique Gratuit"),
    ctaLink: "/contact",
    secondaryCtaText: t("See Our Results", "Voir Nos Résultats"),
    secondaryCtaLink: "/case-studies",
  };

  const servicesSection = content.services || {
    title: t("We Fix What Others Break", "Nous Réparons Ce Que Les Autres Cassent"),
    subtitle: t(
      "Tired of agencies that overpromise and underdeliver? We're the team companies call when it actually needs to work.",
      "Fatigué des agences qui promettent trop et livrent peu? Nous sommes l'équipe que les entreprises appellent quand ça doit vraiment fonctionner."
    ),
  };

  const statsSection = content.stats || {
    title: t("Numbers Don't Lie", "Les Chiffres Ne Mentent Pas"),
    subtitle: t("Real results from real projects.", "Résultats réels de projets réels."),
  };

  const processSection = content.process || {
    title: t("From Chaos to Confidence in 4 Steps", "Du Chaos à la Confiance en 4 Étapes"),
    subtitle: t(
      "No endless meetings. No scope creep. Just a battle-tested process that actually ships.",
      "Pas de réunions interminables. Pas de dérive du périmètre. Juste un processus éprouvé qui livre vraiment."
    ),
  };

  const testimonialsSection = content.testimonials || {
    title: t("They Took the Risk. Here's What Happened.", "Ils Ont Pris le Risque. Voici Ce Qui S'est Passé."),
    subtitle: t(
      "These companies trusted us with their most critical projects. Now they're crushing it.",
      "Ces entreprises nous ont confié leurs projets les plus critiques. Maintenant elles cartonnent."
    ),
  };

  const ctaSection = content.cta || {
    title: t("Your Competitors Are Already Moving", "Vos Concurrents Bougent Déjà"),
    subtitle: t(
      "Every week you wait is a week they're getting ahead. Let's fix that. Free 30-min strategy call - no pitch, just solutions.",
      "Chaque semaine d'attente est une semaine où ils prennent de l'avance. Réglons ça. Appel stratégique gratuit de 30 min - pas de pitch, que des solutions."
    ),
    buttonText: t("Claim Your Free Strategy Call", "Réservez Votre Appel Gratuit"),
  };

  const credibilityPoints = content.credibilityPoints || [
    t("€12M+ Revenue Impact for Clients", "€12M+ d'Impact sur les Revenus Clients"),
    t("94% Client Retention Rate", "94% de Taux de Rétention Client"),
    t("Ships 10x Faster Than Agencies", "Livre 10x Plus Vite que les Agences"),
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

      {/* Trusted By Section - Client Logos */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">
            {t("Trusted by innovative companies across Europe", "Approuvé par des entreprises innovantes à travers l'Europe")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Company Logos - Using text placeholders styled as logos */}
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Nordic<span className="text-blue-500">Pay</span></span>
            </div>
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Data<span className="text-green-500">Pulse</span></span>
            </div>
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Med<span className="text-red-500">Connect</span></span>
            </div>
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Precision<span className="text-orange-500">MFG</span></span>
            </div>
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Fashion<span className="text-pink-500">Fwd</span></span>
            </div>
            <div className="flex items-center justify-center h-12">
              <span className="text-2xl font-bold text-gray-400 tracking-tight">Logi<span className="text-purple-500">Tech</span></span>
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

      {/* Why Cloudrix - Trust Badges Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("Why Smart Companies Choose Us Over Cheap Agencies", "Pourquoi les Entreprises Intelligentes Nous Choisissent")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                "You've been burned before. Missed deadlines. Buggy code. Disappearing developers. We're the antidote.",
                "Vous avez déjà été brûlé. Deadlines manquées. Code bogué. Développeurs qui disparaissent. Nous sommes l'antidote."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Trust Badge 1 - Dutch Company */}
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("Dutch Entity", "Entité Néerlandaise")}</h3>
              <p className="text-sm text-gray-600">
                {t("Cloudrix registered in Netherlands. KVK certified.", "Cloudrix enregistré aux Pays-Bas. Certifié KVK.")}
              </p>
            </div>

            {/* Trust Badge 2 - GDPR */}
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("GDPR Compliant", "Conforme RGPD")}</h3>
              <p className="text-sm text-gray-600">
                {t("Full EU data protection compliance. Your data stays in Europe.", "Conformité totale à la protection des données UE.")}
              </p>
            </div>

            {/* Trust Badge 3 - EUR Invoicing */}
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("EUR Invoicing", "Facturation EUR")}</h3>
              <p className="text-sm text-gray-600">
                {t("No currency hassle. Simple, transparent EUR billing.", "Pas de tracas de devise. Facturation EUR simple.")}
              </p>
            </div>

            {/* Trust Badge 4 - NDA Available */}
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("NDA Ready", "NDA Disponible")}</h3>
              <p className="text-sm text-gray-600">
                {t("We sign NDAs before any sensitive discussion. Your IP is protected.", "Nous signons des NDA avant toute discussion sensible.")}
              </p>
            </div>
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("47+ Projects Delivered", "47+ Projets Livrés")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("94% Client Retention", "94% Rétention Client")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("99.9% Uptime SLA", "99.9% SLA Disponibilité")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("CET Timezone", "Fuseau Horaire CET")}</span>
            </div>
          </div>
        </div>
      </section>

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
