"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cloud,
  Code,
  Zap,
  Shield,
  CheckCircle2,
  Award,
  Brain,
  Bot,
  ScanSearch,
  Calculator,
  Compass,
  MessageSquareText,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { IHomePageContent, ILocalizedContent } from "@/lib/models/page";

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Code,
  Zap,
  Shield,
  Brain,
  Bot,
};

// Counter animation hook
function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Parse the numeric part from value like "50+" or "99.9%"
  const numericMatch = value.match(/^([\d.]+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = value.replace(/^[\d.]+/, "");
  const isDecimal = value.includes(".");

  const animatedCount = useCountUp(
    isDecimal ? Math.floor(numericValue * 10) : numericValue,
    isVisible
  );

  const displayValue = isDecimal
    ? (animatedCount / 10).toFixed(1)
    : animatedCount;

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
}

const popularTools = [
  {
    icon: MessageSquareText,
    title: "AI Code Reviewer",
    description: "Paste code, get instant review",
    href: "/products/ai-code-reviewer/demo",
  },
  {
    icon: Calculator,
    title: "Cloud Cost Calculator",
    description: "Compare AWS vs Azure vs GCP",
    href: "/products/cloud-cost-calculator/demo",
  },
  {
    icon: ScanSearch,
    title: "EU AI Act Scanner",
    description: "Check your AI compliance",
    href: "/products/eu-ai-act-scanner/demo",
  },
  {
    icon: Compass,
    title: "Tech Stack Advisor",
    description: "Get personalized recommendations",
    href: "/products/tech-stack-advisor/demo",
  },
];

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
    badge: t("EU AI Act Deadline: August 2, 2026 — Are You Ready?", "Délai EU AI Act: 2 Août 2026 — Êtes-vous Prêt?"),
    title: t("Senior Engineering & AI for Companies Worldwide", "Ingénierie Senior & IA pour les Entreprises du Monde Entier"),
    subtitle: t(
      "We build AI agents, RAG systems, and cloud infrastructure that works in production. A Dutch-registered consultancy serving clients globally with 8+ years of hands-on engineering experience. EU AI Act compliant.",
      "Nous construisons des agents IA, des systèmes RAG et des infrastructures cloud qui fonctionnent en production. Un cabinet néerlandais au service de clients dans le monde entier avec 8+ ans d'expérience. Conforme EU AI Act."
    ),
    ctaText: t("Book a Free 30-Min Call", "Réservez un Appel Gratuit de 30 Min"),
    ctaLink: "/contact",
    secondaryCtaText: t("See How We Work", "Voir Comment Nous Travaillons"),
    secondaryCtaLink: "/how-we-work",
  };

  const servicesSection = content.services || {
    title: t("What We Build", "Ce Que Nous Construisons"),
    subtitle: t(
      "From cloud architecture to production AI systems — we focus on what works, not what sounds impressive.",
      "De l'architecture cloud aux systèmes IA en production — nous nous concentrons sur ce qui fonctionne."
    ),
  };

  const statsSection = content.stats || {
    title: t("Why Cloudrix", "Pourquoi Cloudrix"),
    subtitle: t("A trusted engineering partner you can verify.", "Un partenaire d'ingénierie de confiance que vous pouvez vérifier."),
  };

  const processSection = content.process || {
    title: t("From Chaos to Confidence in 4 Steps", "Du Chaos à la Confiance en 4 Étapes"),
    subtitle: t(
      "No endless meetings. No scope creep. Just a battle-tested process that actually ships.",
      "Pas de réunions interminables. Pas de dérive du périmètre. Juste un processus éprouvé qui livre vraiment."
    ),
  };

  const testimonialsSection = content.testimonials || {
    title: t("What Our Approach Looks Like in Practice", "Notre Approche en Pratique"),
    subtitle: t(
      "Representative scenarios from our project work across industries.",
      "Scénarios représentatifs de notre travail dans différentes industries."
    ),
  };

  const ctaSection = content.cta || {
    title: t("Let's Talk About Your Project", "Parlons de Votre Projet"),
    subtitle: t(
      "Free 30-minute call — no sales pitch, just an honest conversation about your technical challenges and whether we're the right fit.",
      "Appel gratuit de 30 minutes — pas de pitch, juste une conversation honnête sur vos défis techniques."
    ),
    buttonText: t("Book a Free Call", "Réservez un Appel Gratuit"),
  };

  const credibilityPoints = content.credibilityPoints || [
    t("KVK-Registered Dutch Company", "Société Néerlandaise Enregistrée KVK"),
    t("8+ Years Senior Engineering Experience", "8+ Ans d'Expérience Ingénierie Senior"),
    t("EU AI Act Compliance Expertise", "Expertise Conformité EU AI Act"),
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

            <div className="relative lg:-mr-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=85"
                  alt="AI-powered cloud infrastructure and neural network visualization representing enterprise digital transformation"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-blue-600/10"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full opacity-15 blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-400 rounded-full opacity-15 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Strip */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            {[
              {
                label: t("GDPR Compliant", "Conforme RGPD"),
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                label: t("KVK Registered", "Enregistré KVK"),
                icon: (
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                label: t("AWS Partner", "Partenaire AWS"),
                icon: (
                  <Cloud className="w-6 h-6 text-yellow-600" />
                ),
              },
              {
                label: t("EU AI Act Ready", "Prêt EU AI Act"),
                icon: (
                  <Shield className="w-6 h-6 text-green-600" />
                ),
              },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg w-full max-w-[220px]">
                {badge.icon}
                <span className="text-sm font-medium text-gray-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      {stats.length > 0 && (
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} value={stat.value} label={stat.label} />
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

      {/* AI Services Spotlight */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>{t("New: AI & Machine Learning", "Nouveau: IA & Machine Learning")}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("AI That Ships to Production", "L'IA Qui Va en Production")}
              </h2>
              <p className="text-lg text-indigo-100 mb-8">
                {t(
                  "From AI agents and RAG systems to EU AI Act compliance — we build production-grade AI with proper guardrails, monitoring, and human oversight.",
                  "Des agents IA et systèmes RAG à la conformité EU AI Act — nous construisons de l'IA en production avec des garde-fous, du monitoring et une supervision humaine."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">Claude</div>
                  <div className="text-sm text-indigo-200">{t("& GPT, Gemini, Open Source", "& GPT, Gemini, Open Source")}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">RAG</div>
                  <div className="text-sm text-indigo-200">{t("Production Systems", "Systèmes en Production")}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">EU AI Act</div>
                  <div className="text-sm text-indigo-200">{t("Compliance Built-In", "Conformité Intégrée")}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">MCP</div>
                  <div className="text-sm text-indigo-200">{t("Server Development", "Développement de Serveurs")}</div>
                </div>
              </div>
              <Link
                href="/ai-services"
                className="inline-flex items-center bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold group"
              >
                {t("Explore AI Services", "Explorer les Services IA")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "Bot", title: t("AI Agent Development", "Développement d'Agents IA"), desc: t("Production-ready agents that automate complex workflows", "Agents prêts pour la production") },
                { icon: "Database", title: t("RAG Systems", "Systèmes RAG"), desc: t("Connect LLMs to your proprietary data securely", "Connectez les LLMs à vos données en toute sécurité") },
                { icon: "Shield", title: t("EU AI Act Compliance", "Conformité EU AI Act"), desc: t("Full compliance before the August 2026 deadline", "Conformité complète avant août 2026") },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-indigo-200">{item.desc}</p>
                </div>
              ))}
            </div>
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
              {t("Why Work With Us", "Pourquoi Travailler Avec Nous")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                "A proper Dutch-registered company with senior engineers, global reach, and transparent billing. Multi-currency invoicing available.",
                "Une vraie entreprise néerlandaise avec des ingénieurs seniors, une portée mondiale et une facturation transparente. Facturation multi-devises disponible."
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
              <h3 className="font-semibold text-gray-900 mb-2">{t("Multi-Currency Invoicing", "Facturation Multi-Devises")}</h3>
              <p className="text-sm text-gray-600">
                {t("Invoice in EUR, USD, GBP, or AED. Simple, transparent billing.", "Facturez en EUR, USD, GBP ou AED. Facturation simple et transparente.")}
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
              <span>{t("KVK Registered (Netherlands)", "Enregistré KVK (Pays-Bas)")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("GDPR-Compliant Practices", "Pratiques Conformes RGPD")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("Global Timezone Coverage", "Couverture Fuseau Horaire Mondiale")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>{t("Multi-Currency Invoicing", "Facturation Multi-Devises")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Boilerplate Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Code className="w-4 h-4" />
                <span>{t("Product: SaaS Boilerplate", "Produit: Boilerplate SaaS")}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("The Only NestJS + Angular SaaS Boilerplate", "Le Seul Boilerplate SaaS NestJS + Angular")}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t(
                  "Skip months of setup. Auth, billing, multi-tenancy, admin panel — production-ready from day one. Built by the same engineers who build enterprise systems.",
                  "Évitez des mois de configuration. Auth, facturation, multi-tenancy, panneau admin — prêt pour la production dès le premier jour."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://demo.cloudrix.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium group"
                >
                  {t("Try the Demo", "Essayer la Démo")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact?type=boilerplate"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  {t("Need a Custom Build?", "Besoin d'une Construction Sur Mesure?")}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t("Auth & RBAC", "Auth & RBAC"), desc: t("Login, roles, permissions", "Connexion, rôles, permissions") },
                { label: t("Billing", "Facturation"), desc: t("Stripe integration ready", "Intégration Stripe prête") },
                { label: t("Multi-Tenancy", "Multi-Tenancy"), desc: t("Team workspaces built-in", "Espaces d'équipe intégrés") },
                { label: t("Admin Panel", "Panneau Admin"), desc: t("User & content management", "Gestion utilisateurs & contenu") },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.label}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("Try Our Free AI Tools", "Essayez Nos Outils IA Gratuits")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                "24 free tools, no signup required. Built by senior engineers to solve real problems.",
                "24 outils gratuits, sans inscription. Construits par des ingenieurs seniors pour resoudre de vrais problemes."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.href}
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 group/link"
                  >
                    {t("Try Free", "Essayer Gratuitement")}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
            >
              {t("View All 24 Tools", "Voir les 24 Outils")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
