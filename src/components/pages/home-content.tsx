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
  X,
  ChevronDown,
  Globe,
  Users,
  TrendingUp,
  ShieldCheck,
  Activity,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { IHomePageContent, ILocalizedContent } from "@/lib/models/page";
import { TechLogosMarquee } from "@/components/ui/tech-logos-marquee";
import { StatsCounter } from "@/components/ui/stats-counter";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

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

const popularProducts = [
  {
    icon: ShieldCheck,
    title: "AI Act Scanner",
    tagline: "Check EU AI Act compliance in minutes",
    href: "https://scanner.cloudrix.io",
    learnMore: "/products/eu-ai-act-scanner",
  },
  {
    icon: ScanSearch,
    title: "CodeScan AI",
    tagline: "Instant security + performance code review",
    href: "https://codescan.cloudrix.io",
    learnMore: "/products/ai-code-reviewer",
  },
  {
    icon: Activity,
    title: "API Monitor",
    tagline: "Uptime monitoring from 12 global locations",
    href: "https://monitor.cloudrix.io",
    learnMore: "/products/api-monitor",
  },
  {
    icon: CheckCircle2,
    title: "StatusPage",
    tagline: "Beautiful status pages for your services",
    href: "https://status.cloudrix.io",
    learnMore: "/products/status-page",
  },
  {
    icon: Users,
    title: "SmartCRM",
    tagline: "CRM with AI lead scoring and deal prediction",
    href: "https://crm.cloudrix.io",
    learnMore: "/products/smart-crm",
  },
  {
    icon: MessageSquareText,
    title: "CloudrixAI Chat",
    tagline: "AI support agent that learns from your docs",
    href: "https://chat.cloudrix.io",
    learnMore: "/products/cloudrix-ai-chat",
  },
];

// Urgency Banner Component
function UrgencyBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("urgencyBannerDismissed");
    if (dismissed) setIsDismissed(true);
  }, []);

  const dismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("urgencyBannerDismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <p className="text-sm font-semibold text-white text-center">
            New: StatusPage & API Monitor now live — try free today
          </p>
          <span className="hidden sm:inline text-white/80 text-sm">&mdash;</span>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center text-sm font-bold text-white underline underline-offset-2 hover:no-underline"
          >
            Explore Products
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Objection Handling Section
function ObjectionSection({ t }: { t: (en: string, fr: string) => string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const objections = [
    {
      objection: t("\"We're too small for AI\"", "\"Nous sommes trop petits pour l'IA\""),
      response: t(
        "We've deployed AI for 10-person startups. Our Proof of Concept starts at \u20AC15K \u2014 less than one senior dev's monthly salary. Start small, prove ROI, then scale.",
        "Nous avons d\u00E9ploy\u00E9 de l'IA pour des startups de 10 personnes. Notre PoC d\u00E9marre \u00E0 15K\u20AC. Commencez petit, prouvez le ROI, puis scalez."
      ),
      icon: Users,
    },
    {
      objection: t("\"AI is just hype\"", "\"L'IA n'est que du battage m\u00E9diatique\""),
      response: t(
        "73% query automation. \u20AC840K savings. Real numbers from real clients. We don't sell hype \u2014 we ship measurable outcomes with clear before/after metrics.",
        "73% d'automatisation des requ\u00EAtes. 840K\u20AC d'\u00E9conomies. Des chiffres r\u00E9els de vrais clients. Nous livrons des r\u00E9sultats mesurables."
      ),
      icon: TrendingUp,
    },
    {
      objection: t("\"We tried AI before and it failed\"", "\"Nous avons d\u00E9j\u00E0 essay\u00E9 l'IA et \u00E7a a \u00E9chou\u00E9\""),
      response: t(
        "88% of AI projects fail. That's exactly why you hire the 12% that ships. We start with a 2-week technical audit to identify why it failed and what to do differently.",
        "88% des projets IA \u00E9chouent. C'est exactement pourquoi vous engagez les 12% qui livrent. Nous commen\u00E7ons par un audit technique de 2 semaines."
      ),
      icon: Shield,
    },
    {
      objection: t("\"We can't afford consultants\"", "\"Nous ne pouvons pas nous permettre des consultants\""),
      response: t(
        "We cost 50-70% less than Big Four firms. And we actually build, not just advise. No 200-page PowerPoints \u2014 you get working code, deployed to production.",
        "Nous co\u00FBtons 50 \u00E0 70% moins cher que les Big Four. Et nous construisons r\u00E9ellement, pas juste du conseil. Du code fonctionnel, d\u00E9ploy\u00E9 en production."
      ),
      icon: Calculator,
    },
    {
      objection: t("\"What about GDPR/compliance?\"", "\"Qu'en est-il du RGPD/conformit\u00E9 ?\""),
      response: t(
        "EU-native. Netherlands-registered. EU AI Act compliance built into every project. We handle data residency, model governance, and regulatory documentation from day one.",
        "Natif UE. Enregistr\u00E9 aux Pays-Bas. Conformit\u00E9 EU AI Act int\u00E9gr\u00E9e \u00E0 chaque projet. Nous g\u00E9rons la r\u00E9sidence des donn\u00E9es et la gouvernance des mod\u00E8les d\u00E8s le premier jour."
      ),
      icon: Globe,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            {t("Common Concerns", "Pr\u00E9occupations Courantes")}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("\"But...\" \u2014 We've Heard It All", "\"Mais...\" \u2014 Nous Avons Tout Entendu")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t(
              "Every objection you have, we've addressed it with real results. Click to see the proof.",
              "Chaque objection que vous avez, nous y avons r\u00E9pondu avec des r\u00E9sultats r\u00E9els."
            )}
          </p>
        </div>

        <div className="space-y-3">
          {objections.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-300 ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${isOpen ? "text-blue-600" : "text-gray-500"}`} />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {item.objection}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed ml-14">
                      {item.response}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
          >
            {t("Still have concerns? Let's talk.", "Encore des questions ? Parlons-en.")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Enhanced Trust Bar with company logos
function EnhancedTrustBar({ t }: { t: (en: string, fr: string) => string }) {
  const companyLogos = [
    { name: "FinTech Startup", industry: "Financial Services" },
    { name: "HealthTech Co", industry: "Healthcare" },
    { name: "LogiFlow", industry: "Logistics" },
    { name: "RetailAI", industry: "Retail" },
    { name: "InsureTech", industry: "Insurance" },
    { name: "ManufactureX", industry: "Manufacturing" },
  ];

  return (
    <section className="py-12 bg-gray-50/80 border-b border-gray-100 relative overflow-hidden">
      {/* Subtle animated gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            {t("Trusted by innovative companies", "Fait confiance par des entreprises innovantes")}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-gray-900">50+</span>
              <span>{t("companies", "entreprises")}</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-gray-900">15</span>
              <span>{t("countries", "pays")}</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-gray-900">8+</span>
              <span>{t("years", "ans")}</span>
            </div>
          </div>
        </div>

        {/* Company logos - styled as grayscale pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {companyLogos.map((company, index) => (
            <div
              key={index}
              className="group flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-gray-200 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:border-blue-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-500 group-hover:to-indigo-500 flex items-center justify-center transition-all duration-300">
                <span className="text-xs font-bold text-blue-600 group-hover:text-white transition-colors">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {company.name}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">{company.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    badge: t("24 AI & IT Products Live — Explore the Platform", "24 Produits IA & IT en Ligne — Explorez la Plateforme"),
    title: t("AI & IT Products That Run Your Business", "Produits IA & IT Qui Font Tourner Votre Entreprise"),
    subtitle: t(
      "24 AI-powered products for monitoring, security, compliance, and automation. From API Monitor to CodeScan AI — production-ready tools built by senior engineers. Free tiers available. Enterprise services by request.",
      "24 produits alimentés par l'IA pour le monitoring, la sécurité, la conformité et l'automatisation. De l'API Monitor à CodeScan AI — des outils prêts pour la production. Niveaux gratuits disponibles. Services entreprise sur demande."
    ),
    ctaText: t("Explore Our Products", "Explorer Nos Produits"),
    ctaLink: "/products",
    secondaryCtaText: t("Try Free Tools", "Essayer les Outils Gratuits"),
    secondaryCtaLink: "/products/free",
  };

  const servicesSection = content.services || {
    title: t("Enterprise Services", "Services Entreprise"),
    subtitle: t(
      "Need custom engineering? We offer consulting and development services for enterprise clients by request.",
      "Besoin d'ingénierie sur mesure ? Nous offrons des services de conseil et de développement pour les entreprises sur demande."
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
    title: t("Start Using Our Products Today", "Commencez à Utiliser Nos Produits Aujourd'hui"),
    subtitle: t(
      "24 AI-powered products with free tiers. No credit card required. Sign up in seconds and start getting value immediately.",
      "24 produits alimentés par l'IA avec des niveaux gratuits. Pas de carte de crédit requise. Inscrivez-vous en quelques secondes."
    ),
    buttonText: t("Explore Products", "Explorer les Produits"),
  };

  const credibilityPoints = content.credibilityPoints || [
    t("24 Products Live", "24 Produits en Ligne"),
    t("Used by 50+ Companies", "Utilisé par 50+ Entreprises"),
    t("Free Tiers Available", "Niveaux Gratuits Disponibles"),
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%" }}>
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
                <span className="gradient-text">{hero.title}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={hero.ctaLink || "/contact"}
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group animate-pulse-glow"
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
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full opacity-15 blur-3xl animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-400 rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Enhanced Trust Bar */}
      <EnhancedTrustBar t={t} />

      {/* Tech Logos Marquee */}
      <TechLogosMarquee />

      {/* Stats Section with Animated Counter */}
      {stats.length > 0 && (
        <StatsCounter
          stats={stats.map((stat) => {
            const numericMatch = stat.value.match(/^([\d.]+)/);
            const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
            const suffix = stat.value.replace(/^[\d.]+/, "");
            return { value: numericValue, suffix, label: stat.label };
          })}
        />
      )}

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4"><span className="gradient-text">{servicesSection.title}</span></h2>
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
                  className={`bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1 animate-fade-in-up stagger-${(index % 4) + 1}`}
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

      {/* Product Spotlight */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>{t("Featured Products", "Produits Phares")}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("AI-Powered Products, Live Now", "Produits Alimentés par l'IA, Disponibles Maintenant")}
              </h2>
              <p className="text-lg text-indigo-100 mb-8">
                {t(
                  "From compliance scanning to API monitoring — our products are live, production-tested, and ready to use. Free tiers on every product. No sales call required.",
                  "Du scan de conformité au monitoring d'API — nos produits sont en ligne, testés en production et prêts à l'emploi. Niveaux gratuits sur chaque produit."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <a href="https://scanner.cloudrix.io" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold text-white">Scanner</div>
                  <div className="text-sm text-indigo-200">{t("EU AI Act Compliance", "Conformité EU AI Act")}</div>
                </a>
                <a href="https://codescan.cloudrix.io" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold text-white">CodeScan</div>
                  <div className="text-sm text-indigo-200">{t("AI Code Review", "Revue de Code IA")}</div>
                </a>
                <a href="https://monitor.cloudrix.io" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold text-white">Monitor</div>
                  <div className="text-sm text-indigo-200">{t("API Monitoring", "Monitoring d'API")}</div>
                </a>
                <a href="https://status.cloudrix.io" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold text-white">StatusPage</div>
                  <div className="text-sm text-indigo-200">{t("Uptime Status Pages", "Pages de Statut")}</div>
                </a>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold group"
              >
                {t("View All 24 Products", "Voir les 24 Produits")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: t("AI-Powered Analysis", "Analyse Alimentée par l'IA"), desc: t("Every product uses AI to deliver smarter insights and automation", "Chaque produit utilise l'IA pour des analyses et automatisations plus intelligentes") },
                { title: t("Free Tiers on Every Product", "Niveaux Gratuits sur Chaque Produit"), desc: t("Start for free, upgrade as you grow. No credit card required.", "Commencez gratuitement, mettez à niveau en grandissant.") },
                { title: t("Enterprise Ready", "Prêt pour l'Entreprise"), desc: t("SOC 2, GDPR, EU AI Act compliant. Custom deployments available.", "SOC 2, RGPD, EU AI Act conforme. Déploiements personnalisés disponibles.") },
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">{testimonialsSection.title}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {testimonialsSection.subtitle}
              </p>
            </div>

            <TestimonialCarousel
              testimonials={caseStudies
                .filter((cs) => cs.testimonial?.quote)
                .slice(0, 6)
                .map((cs) => ({
                  quote: cs.testimonial!.quote,
                  author: cs.testimonial!.author,
                  position: cs.testimonial!.position,
                  rating: 5,
                }))}
            />
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

      {/* Popular Products Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("Popular Products", "Produits Populaires")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                "20+ live products with free tiers. No credit card required. Try any product instantly.",
                "20+ produits en ligne avec niveaux gratuits. Pas de carte de credit requise. Essayez n'importe quel produit instantanement."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.tagline}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                    >
                      {t("Try Free", "Essayer")}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href={product.learnMore}
                      className="inline-flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                      {t("Details", "Details")}
                      <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group"
            >
              {t("View All 20+ Products", "Voir les 20+ Produits")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Objection Handling Section */}
      <ObjectionSection t={t} />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 animate-gradient" style={{ backgroundSize: "200% 200%" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {ctaSection.title}
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {ctaSection.subtitle}
          </p>
          <Link
            href="/products"
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
