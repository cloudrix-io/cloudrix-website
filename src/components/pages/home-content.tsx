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
            EU AI Act update: high-risk deadline moved to Dec 2, 2027 — start now, at planning prices instead of panic prices
          </p>
          <span className="hidden sm:inline text-white/80 text-sm">&mdash;</span>
          <Link
            href="/eu-ai-act"
            className="hidden sm:inline-flex items-center text-sm font-bold text-white underline underline-offset-2 hover:no-underline"
          >
            See How It Works
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
      objection: t("\"The AI Act deadline moved \u2014 why start now?\"", "\"La date limite de l'AI Act a \u00E9t\u00E9 report\u00E9e \u2014 pourquoi commencer maintenant ?\""),
      response: t(
        "The high-risk deadline moved to December 2, 2027. That window is exactly why starting now is cheaper: you spread the work over normal sprints instead of paying panic prices in late 2027 \u2014 and you can ship AI features your competitors are still afraid to build.",
        "La date limite haut risque a \u00E9t\u00E9 report\u00E9e au 2 d\u00E9cembre 2027. Cette fen\u00EAtre est justement la raison de commencer maintenant : vous \u00E9talez le travail au lieu de payer des prix de panique fin 2027."
      ),
      icon: TrendingUp,
    },
    {
      objection: t("\"We're too small for AI\"", "\"Nous sommes trop petits pour l'IA\""),
      response: t(
        "You don't need an AI department. A focused Proof of Concept starts at \u20AC15K \u2014 less than one senior dev's monthly salary in most EU markets. Start small, prove ROI, then scale.",
        "Vous n'avez pas besoin d'un d\u00E9partement IA. Un PoC cibl\u00E9 d\u00E9marre \u00E0 15K\u20AC. Commencez petit, prouvez le ROI, puis scalez."
      ),
      icon: Users,
    },
    {
      objection: t("\"We tried AI before and it failed\"", "\"Nous avons d\u00E9j\u00E0 essay\u00E9 l'IA et \u00E7a a \u00E9chou\u00E9\""),
      response: t(
        "Most AI projects fail on integration and scope, not on the models. We start with a short technical audit to identify why it failed and what to do differently \u2014 before writing any new code.",
        "La plupart des projets IA \u00E9chouent sur l'int\u00E9gration et le p\u00E9rim\u00E8tre, pas sur les mod\u00E8les. Nous commen\u00E7ons par un court audit technique pour identifier pourquoi \u00E7a a \u00E9chou\u00E9."
      ),
      icon: Shield,
    },
    {
      objection: t("\"We can't afford consultants\"", "\"Nous ne pouvons pas nous permettre des consultants\""),
      response: t(
        "You're not paying for an agency's overhead \u2014 the founder does the work. No juniors, no handoffs, no 200-page PowerPoints. You get working code, deployed to production, at a fraction of Big Four rates.",
        "Vous ne payez pas les frais g\u00E9n\u00E9raux d'une agence \u2014 le fondateur fait le travail. Pas de juniors, pas de transferts. Du code fonctionnel, d\u00E9ploy\u00E9 en production."
      ),
      icon: Calculator,
    },
    {
      objection: t("\"What about GDPR/compliance?\"", "\"Qu'en est-il du RGPD/conformit\u00E9 ?\""),
      response: t(
        "EU-native. Netherlands-registered (KVK 97732699). GDPR-compliant practices and EU AI Act requirements are designed into every project \u2014 data residency, model governance, and regulatory documentation from day one.",
        "Natif UE. Enregistr\u00E9 aux Pays-Bas (KVK 97732699). Pratiques conformes RGPD et exigences EU AI Act int\u00E9gr\u00E9es \u00E0 chaque projet d\u00E8s le premier jour."
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
            href="/book"
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

// Honest trust bar — founder-led studio, verifiable facts only
function EnhancedTrustBar({ t }: { t: (en: string, fr: string) => string }) {
  const facts = [
    { value: "10+", label: t("years engineering experience", "ans d'exp\u00E9rience en ing\u00E9nierie") },
    { value: "KVK 97732699", label: t("Dutch-registered company", "entreprise n\u00E9erlandaise enregistr\u00E9e") },
    { value: "<24h", label: t("response time", "temps de r\u00E9ponse") },
    { value: "0", label: t("juniors or handoffs \u2014 founder does the work", "juniors ou transferts \u2014 le fondateur fait le travail") },
  ];

  return (
    <section className="py-12 bg-gray-50/80 border-b border-gray-100 relative overflow-hidden">
      {/* Subtle animated gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            {t("A founder-led senior studio \u2014 no fake logos, just facts you can verify", "Un studio senior dirig\u00E9 par son fondateur \u2014 des faits v\u00E9rifiables")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300"
            >
              <span className="text-sm font-bold text-blue-600">{fact.value}</span>
              <span className="text-sm text-gray-600">{fact.label}</span>
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

  // Default values — one hero offer: EU AI Act implementation engineering
  const hero = content.hero || {
    badge: t("EU AI Act high-risk deadline: December 2, 2027", "Date limite haut risque EU AI Act : 2 d\u00E9cembre 2027"),
    title: t("Make Your AI Systems EU AI Act Compliant — Built by Engineers, Not Lawyers", "Rendez Vos Syst\u00E8mes IA Conformes \u00E0 l'EU AI Act — Par des Ing\u00E9nieurs, Pas des Avocats"),
    subtitle: t(
      "The deadline moved to Dec 2, 2027 — that's your window to implement compliance properly and affordably, instead of paying panic prices in late 2027. Start with a \u20AC2,500 Quick Scan: risk classification for every AI system you run, in one day. We also build AI agents, RAG systems, and cloud infrastructure.",
      "La date limite a \u00E9t\u00E9 report\u00E9e au 2 d\u00E9cembre 2027 — c'est votre fen\u00EAtre pour impl\u00E9menter la conformit\u00E9 correctement et \u00E0 moindre co\u00FBt. Commencez avec un Quick Scan \u00E0 2 500\u20AC : classification des risques de chaque syst\u00E8me IA, en une journ\u00E9e."
    ),
    ctaText: t("Book a Free Compliance Call", "R\u00E9server un Appel Gratuit"),
    ctaLink: "/book",
    secondaryCtaText: t("See the Compliance Roadmap", "Voir la Feuille de Route"),
    secondaryCtaLink: "/eu-ai-act",
  };

  const servicesSection = content.services || {
    title: t("Enterprise Services", "Services Entreprise"),
    subtitle: t(
      "Need custom engineering? We offer consulting and development services for enterprise clients by request.",
      "Besoin d'ingénierie sur mesure ? Nous offrons des services de conseil et de développement pour les entreprises sur demande."
    ),
  };

  const processSection = content.process || {
    title: t("From Chaos to Confidence in 4 Steps", "Du Chaos à la Confiance en 4 Étapes"),
    subtitle: t(
      "No endless meetings. No scope creep. Just a battle-tested process that actually ships.",
      "Pas de réunions interminables. Pas de dérive du périmètre. Juste un processus éprouvé qui livre vraiment."
    ),
  };

  const ctaSection = content.cta || {
    title: t("Know Where You Stand Before the 2027 Deadline", "Sachez O\u00F9 Vous en \u00CAtes Avant l'\u00C9ch\u00E9ance 2027"),
    subtitle: t(
      "A free 30-minute call with the engineer who will actually do the work. Honest assessment, clear next steps, no sales pitch.",
      "Un appel gratuit de 30 minutes avec l'ing\u00E9nieur qui fera r\u00E9ellement le travail. \u00C9valuation honn\u00EAte, \u00E9tapes claires, pas de pitch commercial."
    ),
    buttonText: t("Book a Free Call", "R\u00E9server un Appel Gratuit"),
  };

  const credibilityPoints = content.credibilityPoints || [
    t("Quick Scan from \u20AC2,500 — results in 1 day", "Quick Scan d\u00E8s 2 500\u20AC — r\u00E9sultats en 1 jour"),
    t("First-sprint refund guarantee", "Garantie de remboursement du premier sprint"),
    t("Founder does the work — no juniors", "Le fondateur fait le travail — pas de juniors"),
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

      {/* Stats Section — honest, verifiable facts only */}
      <StatsCounter
        stats={[
          { value: 10, suffix: "+", label: t("Years of engineering experience", "Ann\u00E9es d'exp\u00E9rience en ing\u00E9nierie") },
          { value: 1, suffix: " day", label: t("EU AI Act Quick Scan turnaround", "D\u00E9lai du Quick Scan EU AI Act") },
          { value: 24, suffix: "h", label: t("Maximum response time", "Temps de r\u00E9ponse maximum") },
          { value: 100, suffix: "%", label: t("Source code ownership from day one", "Propri\u00E9t\u00E9 du code d\u00E8s le premier jour") },
        ]}
      />
      {/* Note: dynamic stats from CMS intentionally not rendered — replaced with verifiable claims */}

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
                { title: t("Privacy by Design", "Confidentialit\u00E9 d\u00E8s la Conception"), desc: t("GDPR-compliant by design, built with EU AI Act requirements in mind. Custom deployments available.", "Conforme RGPD d\u00E8s la conception, con\u00E7u avec les exigences de l'EU AI Act. D\u00E9ploiements personnalis\u00E9s disponibles.") },
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

      {/* Honesty as differentiation — guarantees instead of anonymous testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">{t("An Early-Stage Studio, and Proud of It", "Un Studio en Phase de Lancement, et Fier de l'\u00CAtre")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                "No logo wall, no anonymous quotes. Our first clients get founder-level attention, case-study pricing, and guarantees we actually stand behind.",
                "Pas de mur de logos, pas de citations anonymes. Nos premiers clients b\u00E9n\u00E9ficient de l'attention du fondateur, de tarifs d'\u00E9tude de cas et de vraies garanties."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("First-Sprint Refund", "Remboursement du Premier Sprint")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Not satisfied with the first sprint? Full refund, no questions asked. See our refund policy for details.",
                  "Pas satisfait du premier sprint ? Remboursement int\u00E9gral, sans question. Voir notre politique de remboursement."
                )}{" "}
                <Link href="/refunds" className="text-blue-600 hover:underline">
                  {t("Refund policy", "Politique de remboursement")}
                </Link>
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("Fixed Scope, Fixed Price", "P\u00E9rim\u00E8tre Fixe, Prix Fixe")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Every engagement starts with a written scope and a fixed price. Changes require your sign-off — no surprise invoices.",
                  "Chaque mission d\u00E9marre avec un p\u00E9rim\u00E8tre \u00E9crit et un prix fixe. Tout changement n\u00E9cessite votre accord — pas de factures surprises."
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("Direct Access to the Engineer", "Acc\u00E8s Direct \u00E0 l'Ing\u00E9nieur")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "You talk to the person writing the code — the founder. No account managers, no juniors, no handoffs.",
                  "Vous parlez \u00E0 la personne qui \u00E9crit le code — le fondateur. Pas de gestionnaires de compte, pas de juniors, pas de transferts."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

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
            href="/book"
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
