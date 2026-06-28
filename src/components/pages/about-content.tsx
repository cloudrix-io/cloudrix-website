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
  Linkedin,
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

  // Default values with translations - POWERFUL CONVERSION-FOCUSED COPY
  const hero = content.hero || {
    title: t("Senior Engineering, Direct — No Middlemen", "Ingénierie Senior, Directe — Sans Intermédiaires"),
    subtitle: t(
      "Cloudrix is a Dutch-registered consultancy founded by a senior engineer with 8+ years of production experience. You work directly with the people who build your system — no layers of project managers, no juniors learning on your project.",
      "Cloudrix est un cabinet néerlandais fondé par un ingénieur senior avec 8+ ans d'expérience en production. Vous travaillez directement avec les personnes qui construisent votre système."
    ),
  };

  const mission = content.mission || {
    title: t("Why Cloudrix Exists", "Pourquoi Cloudrix Existe"),
    content: t(
      "Businesses worldwide deserve engineering partners who deliver real results without the overhead of large agencies or the risk of unreliable freelancers. Cloudrix bridges that gap — offering senior-level cloud architecture, DevOps, and AI expertise with the accountability of a proper Dutch company, serving clients across Europe, the US, Middle East, Asia-Pacific, and Africa.",
      "Les entreprises du monde entier méritent des partenaires d'ingénierie qui livrent des résultats réels. Cloudrix comble ce fossé — offrant une expertise senior en architecture cloud, DevOps et IA avec la responsabilité d'une vraie entreprise néerlandaise, au service de clients en Europe, aux États-Unis, au Moyen-Orient, en Asie-Pacifique et en Afrique."
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
    title: t("Our Journey", "Notre Parcours"),
    subtitle: t(
      "Growing with our clients, delivering excellence every step of the way.",
      "Grandir avec nos clients, livrer l'excellence a chaque etape."
    ),
    items: [
      { year: "2016", title: t("Started professional software engineering career", "Début de carrière en ingénierie logicielle"), description: t("Full-stack development across Angular, PHP, NestJS, and cloud platforms", "Développement full-stack: Angular, PHP, NestJS, plateformes cloud") },
      { year: "2024", title: t("Cloudrix founded in Tilburg, Netherlands", "Cloudrix fondée à Tilburg, Pays-Bas"), description: t("Registered as a Dutch KVK entity to serve companies globally with European quality standards", "Enregistrée comme entité KVK néerlandaise pour servir les entreprises mondiales avec des standards européens") },
      { year: "2025", title: t("Launched AI & EU AI Act consulting services", "Lancement des services IA et conseil EU AI Act"), description: t("Expanded into AI agent development, RAG systems, and regulatory compliance", "Expansion vers les agents IA, systèmes RAG et conformité réglementaire") },
      { year: "2026", title: t("SaaS boilerplate product launch", "Lancement du produit SaaS boilerplate"), description: t("NestJS + Angular boilerplate — the only one of its kind on the market", "Boilerplate NestJS + Angular — le seul de son genre sur le marché") },
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

  const statsSection = content.stats || {
    title: t("At a Glance", "En Bref"),
    subtitle: t("Verifiable facts about Cloudrix.", "Faits vérifiables sur Cloudrix."),
  };

  const companyName = companyInfo?.name || "Cloudrix";

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
                  "Based in Tilburg, Netherlands, with a global client base. We're a proper Dutch company with a KVK number, international contracts, and engineers who adapt to your timezone. Whether you're in New York, Dubai, or Singapore — we deliver the same commitment to quality with async-first workflows and flexible scheduling.",
                  "Basés à Tilburg, Pays-Bas, avec une clientèle mondiale. Nous sommes une vraie entreprise néerlandaise avec un numéro KVK, des contrats internationaux, et des ingénieurs qui s'adaptent à votre fuseau horaire. Que vous soyez à New York, Dubaï ou Singapour — nous offrons le même engagement qualité avec des flux de travail asynchrones."
                )}
              </p>
              <div className="flex items-start space-x-3 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("Global Reach, European Roots", "Portée Mondiale, Racines Européennes")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "Headquartered in the Netherlands with clients across 5 continents. We understand international regulatory requirements including GDPR, the EU AI Act, SOC 2, and regional compliance standards — wherever your business operates.",
                      "Basés aux Pays-Bas avec des clients sur 5 continents. Nous comprenons les exigences réglementaires internationales incluant le RGPD, le EU AI Act, SOC 2, et les normes de conformité régionales — où que votre entreprise opère."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                alt="Cloudrix engineering team collaborating on enterprise solutions in a modern workspace"
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

      {/* Team Section */}
      {teamMembers.length > 0 && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member._id || index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
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
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t(
              "Ready to Work With Engineers Who Actually Care?",
              "Pret a Travailler Avec des Ingenieurs Qui Se Soucient Vraiment?"
            )}
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {t(
              "No sales pitch. No BS. Just a 30-minute conversation about your challenges and how we might help.",
              "Pas de pitch commercial. Pas de baratin. Juste une conversation de 30 minutes sur vos defis et comment nous pourrions aider."
            )}
          </p>
          <Link
            href="/contact"
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
