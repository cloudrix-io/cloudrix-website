"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Target,
  Heart,
  Globe,
  ArrowRight,
  Users2,
  CheckCircle2,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Breadcrumbs } from "@/components/ui";
import type { IAboutPageContent, ILocalizedContent } from "@/lib/models/page";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Heart,
  Users2,
  Target,
  Shield,
  Zap,
  Star,
  Globe,
};

interface AboutContentProps {
  pageContent: ILocalizedContent;
  companyInfo: {
    name?: string;
    description?: string;
  } | null;
  teamMembers: {
    _id: string;
    name: string;
    role: string;
    bio?: string;
    linkedin?: string;
  }[];
  stats: { value: string; label: string }[];
  trustPoints: { icon?: string; title: string; description: string }[];
}

export function AboutContent({
  pageContent,
  companyInfo,
  teamMembers,
  stats,
  trustPoints,
}: AboutContentProps) {
  const { language, t } = useLanguage();

  // Get content for current language
  const content = (pageContent[language] || pageContent.en || {}) as IAboutPageContent;

  // Default values — honest founder-led story
  const hero = content.hero || {
    title: t("A Founder-Led Engineering Studio", "Un Studio d'Ing\u00E9nierie Dirig\u00E9 par son Fondateur"),
    subtitle: t(
      "Cloudrix was founded in 2026 in Tilburg, Netherlands, by a senior software engineer with 10+ years of full-stack experience (Angular, PHP, NestJS, AWS) who also works in the online-video industry. No fake team photos, no invented history: one senior engineer who does the work personally, backed by a network of trusted specialists when a project requires it.",
      "Cloudrix a \u00E9t\u00E9 fond\u00E9e en 2026 \u00E0 Tilburg, aux Pays-Bas, par un ing\u00E9nieur logiciel senior avec 10+ ans d'exp\u00E9rience full-stack (Angular, PHP, NestJS, AWS). Pas de fausses photos d'\u00E9quipe, pas d'historique invent\u00E9 : un ing\u00E9nieur senior qui fait le travail personnellement."
    ),
  };

  const mission = content.mission || {
    title: t("Why Cloudrix Exists", "Pourquoi Cloudrix Existe"),
    content: t(
      "Most companies facing the EU AI Act get one of two things: expensive legal advice with no implementation, or offshore development with no compliance understanding. Cloudrix exists to close that gap — a senior engineer who implements compliance controls, AI agents, RAG systems, and cloud infrastructure directly in your codebase. When you hire Cloudrix, the founder does the work. No juniors, no handoffs, no account managers.",
      "La plupart des entreprises confront\u00E9es \u00E0 l'EU AI Act obtiennent l'une de deux choses : des conseils juridiques co\u00FBteux sans impl\u00E9mentation, ou du d\u00E9veloppement offshore sans compr\u00E9hension de la conformit\u00E9. Cloudrix existe pour combler cet \u00E9cart. Quand vous engagez Cloudrix, le fondateur fait le travail."
    ),
  };

  const values = content.values || {
    title: t("Our Values", "Nos Valeurs"),
    subtitle: t(
      "The principles that guide our work and relationships with clients.",
      "Les principes qui guident notre travail et nos relations avec les clients."
    ),
  };

  const team = content.team || {
    title: t("Founder", "Fondateur"),
    subtitle: t(
      "Cloudrix is a solo consultancy backed by a network of trusted specialists when projects require it.",
      "Cloudrix est un cabinet individuel soutenu par un réseau de spécialistes de confiance."
    ),
  };

  const timeline = content.timeline || {
    title: t("The Story So Far", "L'Histoire Jusqu'ici"),
    subtitle: t(
      "A short, honest timeline — Cloudrix is young, and that's exactly why early clients get founder-level attention.",
      "Une chronologie courte et honn\u00EAte — Cloudrix est jeune, et c'est exactement pourquoi les premiers clients b\u00E9n\u00E9ficient de l'attention du fondateur."
    ),
    items: [
      { year: "2016", title: t("Started professional software engineering career", "D\u00E9but de carri\u00E8re en ing\u00E9nierie logicielle"), description: t("Full-stack development across Angular, PHP, NestJS, and cloud platforms — 10+ years of hands-on production experience since, including senior engineering work in the online-video industry", "D\u00E9veloppement full-stack : Angular, PHP, NestJS, plateformes cloud — 10+ ans d'exp\u00E9rience en production, y compris dans l'industrie de la vid\u00E9o en ligne") },
      { year: "2026", title: t("Cloudrix founded in Tilburg, Netherlands", "Cloudrix fond\u00E9e \u00E0 Tilburg, Pays-Bas"), description: t("Registered with the Dutch Chamber of Commerce (KVK 97732699), focused on EU AI Act implementation engineering, AI systems, and cloud consulting", "Enregistr\u00E9e \u00E0 la Chambre de Commerce n\u00E9erlandaise (KVK 97732699), sp\u00E9cialis\u00E9e dans l'impl\u00E9mentation de l'EU AI Act, les syst\u00E8mes IA et le conseil cloud") },
    ],
  };

  const certifications = content.certifications || {
    title: t("Expertise & Compliance", "Expertise & Conformité"),
    subtitle: t(
      "Core areas of expertise and compliance standards we adhere to.",
      "Domaines d'expertise et normes de conformité que nous respectons."
    ),
    items: [
      { name: t("GDPR-Compliant Practices", "Pratiques Conformes RGPD"), description: "", icon: "Shield" },
      { name: t("EU AI Act Expertise", "Expertise EU AI Act"), description: "", icon: "Shield" },
      { name: t("Secure Development Practices", "Pratiques de Développement Sécurisé"), description: "", icon: "Shield" },
      { name: t("AWS / GCP / Azure", "AWS / GCP / Azure"), description: "", icon: "Zap" },
      { name: t("AI & Machine Learning", "IA & Machine Learning"), description: "", icon: "Zap" },
      { name: t("KVK-Registered Entity", "Entité Enregistrée KVK"), description: "", icon: "Award" },
    ],
  };


  // Default values for trust points/values
  const defaultValues = [
    {
      icon: "Award",
      title: t("Excellence", "Excellence"),
      description: t(
        "We strive for the highest quality in everything we do, from code to client relationships.",
        "Nous recherchons la plus haute qualite dans tout ce que nous faisons."
      ),
    },
    {
      icon: "Heart",
      title: t("Integrity", "Integrite"),
      description: t(
        "Honesty, transparency, and ethical practices are at the core of our business.",
        "L'honnetete, la transparence et les pratiques ethiques sont au coeur de notre activite."
      ),
    },
    {
      icon: "Users2",
      title: t("Collaboration", "Collaboration"),
      description: t(
        "We work closely with clients as partners, not just service providers.",
        "Nous travaillons etroitement avec les clients en tant que partenaires."
      ),
    },
    {
      icon: "Target",
      title: t("Innovation", "Innovation"),
      description: t(
        "We continuously explore new technologies and approaches to solve complex problems.",
        "Nous explorons continuellement de nouvelles technologies pour resoudre des problemes complexes."
      ),
    },
  ];

  const displayValues = trustPoints.length > 0 ? trustPoints : defaultValues;

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {mission.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {mission.content}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t(
                  "Based in Tilburg, Netherlands. A proper Dutch company with a KVK number (97732699) and international contracts, working async-first with flexible scheduling across timezones.",
                  "Bas\u00E9e \u00E0 Tilburg, Pays-Bas. Une vraie entreprise n\u00E9erlandaise avec un num\u00E9ro KVK (97732699) et des contrats internationaux, travaillant en mode asynchrone avec des horaires flexibles."
                )}
              </p>
              <div className="flex items-start space-x-3 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("European Roots, EU Regulation Expertise", "Racines Europ\u00E9ennes, Expertise R\u00E9glementaire UE")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "Headquartered in the Netherlands and operating under EU jurisdiction. We work GDPR-compliant by design and specialize in the technical implementation of EU AI Act requirements.",
                      "Bas\u00E9e aux Pays-Bas et op\u00E9rant sous juridiction UE. Nous travaillons en conformit\u00E9 RGPD d\u00E8s la conception et sommes sp\u00E9cialis\u00E9s dans l'impl\u00E9mentation technique des exigences de l'EU AI Act."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
                alt="Code on a developer's screen — hands-on engineering work"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {values.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {values.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayValues.map((value, index) => {
              const Icon = iconMap[value.icon || "Award"] || Award;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {timeline.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {timeline.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.items?.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow pt-5">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <p className="text-lg text-gray-900 font-medium">
                        {milestone.title}
                      </p>
                      {milestone.description && (
                        <p className="text-gray-600 mt-2">{milestone.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section — honest, no stock team photos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {team.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {team.subtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Firas Sayah
              </h3>
              <p className="text-blue-600 font-medium mb-4">
                {t("Founder & Lead Engineer", "Fondateur & Ing\u00E9nieur Principal")}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t(
                  "Senior software engineer with 10+ years of full-stack experience across Angular, PHP, NestJS, and AWS, currently also working as a senior engineer in the online-video industry. Founded Cloudrix in 2026 to help companies implement EU AI Act compliance and production AI systems.",
                  "Ing\u00E9nieur logiciel senior avec 10+ ans d'exp\u00E9rience full-stack en Angular, PHP, NestJS et AWS, travaillant \u00E9galement dans l'industrie de la vid\u00E9o en ligne. A fond\u00E9 Cloudrix en 2026 pour aider les entreprises \u00E0 impl\u00E9menter la conformit\u00E9 EU AI Act et des syst\u00E8mes IA en production."
                )}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Every project is done personally by the founder — no juniors, no handoffs. For larger scopes, Cloudrix works with a small network of trusted senior specialists.",
                  "Chaque projet est r\u00E9alis\u00E9 personnellement par le fondateur — pas de juniors, pas de transferts. Pour les p\u00E9rim\u00E8tres plus larges, Cloudrix travaille avec un petit r\u00E9seau de sp\u00E9cialistes seniors de confiance."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {certifications.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {certifications.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.items?.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center space-x-3"
              >
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-900 font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section — verifiable facts only */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10+", label: t("Years of engineering experience", "Ann\u00E9es d'exp\u00E9rience en ing\u00E9nierie") },
              { value: "2026", label: t("Founded in Tilburg, NL (KVK 97732699)", "Fond\u00E9e \u00E0 Tilburg, NL (KVK 97732699)") },
              { value: "<24h", label: t("Response time", "Temps de r\u00E9ponse") },
              { value: "1", label: t("Engineer on your project — the founder", "Ing\u00E9nieur sur votre projet — le fondateur") },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t(
              "Talk Directly to the Engineer Who'll Do the Work",
              "Parlez Directement \u00E0 l'Ing\u00E9nieur Qui Fera le Travail"
            )}
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {t(
              "No sales pitch. No BS. Just a 30-minute conversation about your challenges and whether Cloudrix is the right fit.",
              "Pas de pitch commercial. Pas de baratin. Juste une conversation de 30 minutes sur vos d\u00E9fis."
            )}
          </p>
          <Link
            href="/book"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group"
          >
            {t("Get in Touch", "Contactez-Nous")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
