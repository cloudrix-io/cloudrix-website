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
    title: t("We're the Engineers Companies Call When It Actually Needs to Work", "Nous Sommes les Ingenieurs Qu'On Appelle Quand Ca Doit Vraiment Fonctionner"),
    subtitle: t(
      "While others hide behind project managers and deliver junior code, we put senior engineers directly on your problem. 47+ projects. €12M+ client impact. Zero excuses.",
      "Alors que d'autres se cachent derriere des chefs de projet, nous mettons des ingenieurs seniors directement sur votre probleme. 47+ projets. €12M+ d'impact client. Zero excuses."
    ),
  };

  const mission = content.mission || {
    title: t("Why We Exist", "Pourquoi Nous Existons"),
    content: t(
      "Too many companies get burned by agencies that overpromise and underdeliver. We started Cloudrix because European businesses deserve engineering partners who actually give a damn about their success.",
      "Trop d'entreprises se font avoir par des agences qui promettent trop et livrent peu. Nous avons cree Cloudrix parce que les entreprises europeennes meritent des partenaires d'ingenierie qui se soucient vraiment de leur succes."
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
    title: t("Leadership Team", "Equipe de Direction"),
    subtitle: t(
      "Experienced leaders with a passion for technology and client success.",
      "Des leaders experimentes passionnes par la technologie et le succes des clients."
    ),
  };

  const timeline = content.timeline || {
    title: t("Our Journey", "Notre Parcours"),
    subtitle: t(
      "Growing with our clients, delivering excellence every step of the way.",
      "Grandir avec nos clients, livrer l'excellence a chaque etape."
    ),
    items: [
      { year: "2020", title: t("Cloudrix founded in Netherlands", "Cloudrix fondee aux Pays-Bas"), description: "" },
      { year: "2021", title: t("First EU enterprise clients onboarded", "Premiers clients entreprises UE"), description: "" },
      { year: "2022", title: t("Expanded cloud services portfolio", "Expansion du portfolio cloud"), description: "" },
      { year: "2023", title: t("Achieved 50+ successful projects", "50+ projets reussis"), description: "" },
      { year: "2024", title: t("Strengthened European partnerships", "Partenariats europeens renforces"), description: "" },
      { year: "2025", title: t("Growing team and capabilities", "Croissance de l'equipe et des capacites"), description: "" },
    ],
  };

  const certifications = content.certifications || {
    title: t("Certifications & Expertise", "Certifications & Expertise"),
    subtitle: t(
      "Recognized for our expertise and commitment to excellence.",
      "Reconnus pour notre expertise et notre engagement envers l'excellence."
    ),
    items: [
      { name: t("AWS Certified Solutions Architect", "AWS Certified Solutions Architect"), description: "", icon: "Award" },
      { name: t("Google Cloud Partner", "Partenaire Google Cloud"), description: "", icon: "Award" },
      { name: t("GDPR Compliant", "Conforme RGPD"), description: "", icon: "Shield" },
      { name: t("Secure Development Practices", "Pratiques de Developpement Securise"), description: "", icon: "Shield" },
    ],
  };

  const statsSection = content.stats || {
    title: t("By the Numbers", "En Chiffres"),
    subtitle: t("Our track record of delivering results.", "Notre historique de livraison de resultats."),
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
                  "Based in Tilburg, Netherlands, we're not offshore outsourcing dressed up in a fancy website. We're a proper Dutch company with a KVK number, EU contracts, and engineers who speak your language (literally). Same timezone, same business culture, same commitment to quality.",
                  "Bases a Tilburg, Pays-Bas, nous ne sommes pas de l'externalisation offshore deguisee en site web elegant. Nous sommes une vraie entreprise neerlandaise avec un numero KVK, des contrats UE, et des ingenieurs qui parlent votre langue. Meme fuseau horaire, meme culture d'affaires, meme engagement qualite."
                )}
              </p>
              <div className="flex items-start space-x-3 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("European Focus", "Focus Europeen")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "We understand the unique regulatory, compliance, and business requirements of European markets, including GDPR and other regional standards.",
                      "Nous comprenons les exigences reglementaires et commerciales uniques des marches europeens, y compris le RGPD et autres normes regionales."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
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
