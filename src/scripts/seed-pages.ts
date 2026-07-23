import mongoose from "mongoose";
import Page from "../lib/models/page";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

// ============================================================================
// HONESTY POLICY FOR THIS SEED
// ----------------------------------------------------------------------------
// Cloudrix is a solo-founder Dutch studio, founded in 2026 in Tilburg, NL
// (KVK 97732699). Every claim in this file must be verifiable:
//  - NO invented project counts ("47 projects"), retention rates ("94%"),
//    revenue impact, or client counts.
//  - NO fake company history (no 2020-2025 timeline, no "5 engineers",
//    no "€500K+ project").
//  - NO SOC 2 / CISSP / certification badges we do not hold.
//  - NO fabricated testimonials or logo walls.
//  - EU AI Act dates: prohibitions + AI literacy in force since Feb 2, 2025;
//    GPAI obligations since Aug 2, 2025; transparency obligations Aug 2026;
//    high-risk Annex III delayed to Dec 2, 2027 (Digital Omnibus, June 2026);
//    Annex I embedded AI: Aug 2028.
// This content intentionally mirrors the honest code defaults in
// src/components/pages/home-content.tsx and about-content.tsx, because the
// components render DB content when present (content.hero || codeDefault).
// ============================================================================

const defaultPages = [
  // ============================================================================
  // HOME PAGE
  // ============================================================================
  {
    slug: "home",
    title: "Home",
    isPublished: true,
    order: 1,
    seoTitle: {
      en: "Cloudrix - EU AI Act Compliance Engineering & AI Systems",
      fr: "Cloudrix - Ingenierie de Conformite EU AI Act & Systemes IA",
    },
    seoDescription: {
      en: "EU AI Act compliance implemented by engineers, not lawyers. Founder-led Dutch studio (KVK 97732699). Quick Scan from €2,500. AI agents, RAG, cloud.",
      fr: "Conformite EU AI Act implementee par des ingenieurs, pas des avocats. Studio neerlandais dirige par son fondateur (KVK 97732699). Quick Scan des 2 500€.",
    },
    content: {
      en: {
        hero: {
          badge: "EU AI Act high-risk deadline: December 2, 2027",
          title: "Make Your AI Systems EU AI Act Compliant — Built by Engineers, Not Lawyers",
          subtitle: "The deadline moved to Dec 2, 2027 — that's your window to implement compliance properly and affordably, instead of paying panic prices in late 2027. Start with a €2,500 Quick Scan: risk classification for every AI system you run, in one day. We also build AI agents, RAG systems, and cloud infrastructure.",
          ctaText: "Book a Free Compliance Call",
          ctaLink: "/book",
          secondaryCtaText: "See the Compliance Roadmap",
          secondaryCtaLink: "/eu-ai-act",
        },
        services: {
          title: "Enterprise Services",
          subtitle: "Need custom engineering? We offer consulting and development services for enterprise clients by request.",
        },
        process: {
          title: "From Chaos to Confidence in 4 Steps",
          subtitle: "No endless meetings. No scope creep. Just a battle-tested process that actually ships.",
        },
        cta: {
          title: "Know Where You Stand Before the 2027 Deadline",
          subtitle: "A free 30-minute call with the engineer who will actually do the work. Honest assessment, clear next steps, no sales pitch.",
          buttonText: "Book a Free Call",
        },
        credibilityPoints: [
          "Quick Scan from €2,500 — results in 1 day",
          "First-sprint refund guarantee",
          "Founder does the work — no juniors",
        ],
      },
      fr: {
        hero: {
          badge: "Date limite haut risque EU AI Act : 2 decembre 2027",
          title: "Rendez Vos Systemes IA Conformes a l'EU AI Act — Par des Ingenieurs, Pas des Avocats",
          subtitle: "La date limite a ete reportee au 2 decembre 2027 — c'est votre fenetre pour implementer la conformite correctement et a moindre cout. Commencez avec un Quick Scan a 2 500€ : classification des risques de chaque systeme IA, en une journee. Nous construisons aussi des agents IA, des systemes RAG et des infrastructures cloud.",
          ctaText: "Reserver un Appel Gratuit",
          ctaLink: "/book",
          secondaryCtaText: "Voir la Feuille de Route",
          secondaryCtaLink: "/eu-ai-act",
        },
        services: {
          title: "Services Entreprise",
          subtitle: "Besoin d'ingenierie sur mesure ? Nous offrons des services de conseil et de developpement pour les entreprises sur demande.",
        },
        process: {
          title: "Du Chaos a la Confiance en 4 Etapes",
          subtitle: "Pas de reunions interminables. Pas de derive du perimetre. Juste un processus eprouve qui livre vraiment.",
        },
        cta: {
          title: "Sachez Ou Vous en Etes Avant l'Echeance 2027",
          subtitle: "Un appel gratuit de 30 minutes avec l'ingenieur qui fera reellement le travail. Evaluation honnete, etapes claires, pas de pitch commercial.",
          buttonText: "Reserver un Appel Gratuit",
        },
        credibilityPoints: [
          "Quick Scan des 2 500€ — resultats en 1 jour",
          "Garantie de remboursement du premier sprint",
          "Le fondateur fait le travail — pas de juniors",
        ],
      },
    },
  },

  // ============================================================================
  // SERVICES PAGE
  // ============================================================================
  {
    slug: "services",
    title: "Services",
    isPublished: true,
    order: 2,
    seoTitle: {
      en: "EU AI Act, AI & Cloud Engineering Services | Cloudrix",
      fr: "Services EU AI Act, IA & Ingenierie Cloud | Cloudrix",
    },
    seoDescription: {
      en: "EU AI Act compliance implementation, AI systems, cloud architecture, and DevOps. Founder-led Dutch studio, transparent pricing, EU jurisdiction.",
      fr: "Implementation de la conformite EU AI Act, systemes IA, architecture cloud et DevOps. Studio neerlandais dirige par son fondateur, tarification transparente.",
    },
    content: {
      en: {
        hero: {
          title: "Senior Engineering, Done by the Founder",
          subtitle: "Whether you need EU AI Act compliance implemented in your codebase, an AI system built, a cloud migration, or legacy modernization — you work directly with a senior engineer with 10+ years of production experience. No juniors, no handoffs.",
        },
        services: {
          title: "What We Do",
          subtitle: "Deep expertise across the full technology stack, from infrastructure to user interface.",
        },
        industries: {
          title: "Where This Matters Most",
          subtitle: "Sectors where compliance-aware engineering delivers the most value.",
          items: [
            { name: "Financial Services & FinTech", description: "Payment systems, credit-scoring AI (high-risk under the AI Act), audit trails" },
            { name: "Healthcare & Digital Health", description: "GDPR-compliant data handling, diagnostic AI governance (Annex III)" },
            { name: "HR & Recruitment Tech", description: "CV screening and assessment AI — high-risk systems needing controls by Dec 2027" },
            { name: "SaaS & Enterprise Software", description: "Multi-tenant architecture, API platforms, AI feature compliance" },
            { name: "E-Commerce & Retail", description: "Recommendation systems, chatbot transparency obligations, checkout optimization" },
            { name: "Logistics & Supply Chain", description: "Route optimization, forecasting models, integration engineering" },
          ],
        },
        technologies: {
          title: "Technologies We Master",
          subtitle: "We choose the right tool for the job, not the trendy one — grounded in 10+ years of hands-on production experience.",
        },
        cta: {
          title: "Not Sure What You Need?",
          subtitle: "Book a free technical consultation. We'll assess your situation and recommend the right approach - even if that means building in-house.",
          buttonText: "Get Expert Advice",
        },
      },
      fr: {
        hero: {
          title: "Ingenierie Senior, Realisee par le Fondateur",
          subtitle: "Que vous ayez besoin d'implementer la conformite EU AI Act dans votre code, de construire un systeme IA, de migrer vers le cloud ou de moderniser du legacy — vous travaillez directement avec un ingenieur senior avec 10+ ans d'experience. Pas de juniors, pas de transferts.",
        },
        services: {
          title: "Ce Que Nous Faisons",
          subtitle: "Une expertise approfondie sur toute la stack technologique, de l'infrastructure a l'interface utilisateur.",
        },
        industries: {
          title: "Ou Cela Compte le Plus",
          subtitle: "Les secteurs ou l'ingenierie consciente de la conformite apporte le plus de valeur.",
          items: [
            { name: "Services Financiers & FinTech", description: "Systemes de paiement, IA de scoring credit (haut risque selon l'AI Act), pistes d'audit" },
            { name: "Sante & Sante Numerique", description: "Traitement de donnees conforme RGPD, gouvernance de l'IA diagnostique (Annexe III)" },
            { name: "RH & Tech de Recrutement", description: "IA de tri de CV et d'evaluation — systemes haut risque necessitant des controles d'ici dec. 2027" },
            { name: "SaaS & Logiciels d'Entreprise", description: "Architecture multi-tenant, plateformes API, conformite des fonctionnalites IA" },
            { name: "E-Commerce & Retail", description: "Systemes de recommandation, obligations de transparence des chatbots, optimisation checkout" },
            { name: "Logistique & Supply Chain", description: "Optimisation de routes, modeles de prevision, ingenierie d'integration" },
          ],
        },
        technologies: {
          title: "Technologies Que Nous Maitrisons",
          subtitle: "Nous choisissons le bon outil pour le travail, pas le plus tendance — sur la base de 10+ ans d'experience en production.",
        },
        cta: {
          title: "Pas Sur de Ce Dont Vous Avez Besoin?",
          subtitle: "Reservez une consultation technique gratuite. Nous evaluerons votre situation et recommanderons la bonne approche.",
          buttonText: "Obtenir des Conseils d'Expert",
        },
      },
    },
  },

  // ============================================================================
  // ABOUT PAGE
  // ============================================================================
  {
    slug: "about",
    title: "About",
    isPublished: true,
    order: 3,
    seoTitle: {
      en: "About Cloudrix - Founder-Led Engineering Studio in the Netherlands",
      fr: "A Propos de Cloudrix - Studio d'Ingenierie Dirige par son Fondateur",
    },
    seoDescription: {
      en: "Founder-led Dutch engineering studio founded in 2026 (KVK 97732699). Senior engineering focused on EU AI Act implementation, AI systems, and cloud.",
      fr: "Studio d'ingenierie neerlandais fonde en 2026 (KVK 97732699). Ingenierie senior specialisee dans l'EU AI Act, les systemes IA et le cloud.",
    },
    content: {
      en: {
        hero: {
          title: "A Founder-Led Engineering Studio",
          subtitle: "Cloudrix was founded in 2026 in Tilburg, Netherlands, by a senior software engineer with 10+ years of full-stack experience (Angular, PHP, NestJS, AWS) who also works in the online-video industry. No fake team photos, no invented history: one senior engineer who does the work personally, backed by a network of trusted specialists when a project requires it.",
        },
        mission: {
          title: "Why Cloudrix Exists",
          content: "Most companies facing the EU AI Act get one of two things: expensive legal advice with no implementation, or offshore development with no compliance understanding. Cloudrix exists to close that gap — a senior engineer who implements compliance controls, AI agents, RAG systems, and cloud infrastructure directly in your codebase. When you hire Cloudrix, the founder does the work. No juniors, no handoffs, no account managers.",
        },
        values: {
          title: "Our Values",
          subtitle: "The principles that guide our work and relationships with clients.",
        },
        team: {
          title: "Founder",
          subtitle: "Cloudrix is a solo consultancy backed by a network of trusted specialists when projects require it.",
        },
        timeline: {
          title: "The Story So Far",
          subtitle: "A short, honest timeline — Cloudrix is young, and that's exactly why early clients get founder-level attention.",
          items: [
            { year: "2016", title: "Started professional software engineering career", description: "Full-stack development across Angular, PHP, NestJS, and cloud platforms — 10+ years of hands-on production experience since, including senior engineering work in the online-video industry." },
            { year: "2026", title: "Cloudrix founded in Tilburg, Netherlands", description: "Registered with the Dutch Chamber of Commerce (KVK 97732699), focused on EU AI Act implementation engineering, AI systems, and cloud consulting." },
          ],
        },
        certifications: {
          title: "Expertise & Compliance",
          subtitle: "Core areas of expertise and compliance standards we adhere to.",
          items: [
            { name: "GDPR-Compliant Practices", description: "EU data protection by design", icon: "Shield" },
            { name: "EU AI Act Expertise", description: "Technical implementation of the Act", icon: "Shield" },
            { name: "Secure Development Practices", description: "OWASP-aligned engineering", icon: "Shield" },
            { name: "AWS / GCP / Azure", description: "Hands-on cloud experience", icon: "Zap" },
            { name: "AI & Machine Learning", description: "LLMs, RAG, agents in production", icon: "Zap" },
            { name: "KVK-Registered Entity", description: "Dutch Chamber of Commerce 97732699", icon: "Award" },
          ],
        },
        stats: {
          title: "Facts You Can Verify",
          subtitle: "No invented metrics — just verifiable facts.",
        },
      },
      fr: {
        hero: {
          title: "Un Studio d'Ingenierie Dirige par son Fondateur",
          subtitle: "Cloudrix a ete fondee en 2026 a Tilburg, aux Pays-Bas, par un ingenieur logiciel senior avec 10+ ans d'experience full-stack (Angular, PHP, NestJS, AWS). Pas de fausses photos d'equipe, pas d'historique invente : un ingenieur senior qui fait le travail personnellement, soutenu par un reseau de specialistes de confiance quand un projet l'exige.",
        },
        mission: {
          title: "Pourquoi Cloudrix Existe",
          content: "La plupart des entreprises confrontees a l'EU AI Act obtiennent l'une de deux choses : des conseils juridiques couteux sans implementation, ou du developpement offshore sans comprehension de la conformite. Cloudrix existe pour combler cet ecart — un ingenieur senior qui implemente les controles de conformite, les agents IA, les systemes RAG et l'infrastructure cloud directement dans votre code. Quand vous engagez Cloudrix, le fondateur fait le travail. Pas de juniors, pas de transferts, pas de gestionnaires de compte.",
        },
        values: {
          title: "Nos Valeurs",
          subtitle: "Les principes qui guident notre travail et nos relations avec les clients.",
        },
        team: {
          title: "Fondateur",
          subtitle: "Cloudrix est un cabinet individuel soutenu par un reseau de specialistes de confiance quand les projets l'exigent.",
        },
        timeline: {
          title: "L'Histoire Jusqu'ici",
          subtitle: "Une chronologie courte et honnete — Cloudrix est jeune, et c'est exactement pourquoi les premiers clients beneficient de l'attention du fondateur.",
          items: [
            { year: "2016", title: "Debut de carriere en ingenierie logicielle", description: "Developpement full-stack : Angular, PHP, NestJS, plateformes cloud — 10+ ans d'experience en production, y compris dans l'industrie de la video en ligne." },
            { year: "2026", title: "Cloudrix fondee a Tilburg, Pays-Bas", description: "Enregistree a la Chambre de Commerce neerlandaise (KVK 97732699), specialisee dans l'implementation de l'EU AI Act, les systemes IA et le conseil cloud." },
          ],
        },
        certifications: {
          title: "Expertise & Conformite",
          subtitle: "Domaines d'expertise et normes de conformite que nous respectons.",
          items: [
            { name: "Pratiques Conformes RGPD", description: "Protection des donnees UE des la conception", icon: "Shield" },
            { name: "Expertise EU AI Act", description: "Implementation technique du reglement", icon: "Shield" },
            { name: "Pratiques de Developpement Securise", description: "Ingenierie alignee OWASP", icon: "Shield" },
            { name: "AWS / GCP / Azure", description: "Experience cloud pratique", icon: "Zap" },
            { name: "IA & Machine Learning", description: "LLMs, RAG, agents en production", icon: "Zap" },
            { name: "Entite Enregistree KVK", description: "Chambre de Commerce neerlandaise 97732699", icon: "Award" },
          ],
        },
        stats: {
          title: "Des Faits Verifiables",
          subtitle: "Pas de metriques inventees — juste des faits verifiables.",
        },
      },
    },
  },

  // ============================================================================
  // CONTACT PAGE
  // ============================================================================
  {
    slug: "contact",
    title: "Contact",
    isPublished: true,
    order: 4,
    seoTitle: {
      en: "Contact Cloudrix - Book a Free Consultation",
      fr: "Contactez Cloudrix - Consultation Gratuite",
    },
    seoDescription: {
      en: "Book a free 30-minute consultation with the founder — the engineer who does the work. EU AI Act, AI, cloud, or DevOps. No sales pitch.",
      fr: "Reservez une consultation gratuite de 30 minutes avec le fondateur. Discutez de vos defis EU AI Act, IA, cloud ou DevOps. Pas de discours commercial.",
    },
    content: {
      en: {
        hero: {
          title: "Let's Talk About Your Project",
          subtitle: "Book a free 30-minute consultation with the founder. We'll discuss your challenges, explore solutions, and give you honest advice - even if that means recommending someone else.",
        },
        form: {
          title: "Book Your Free Consultation",
          subtitle: "Fill out the form and we'll get back to you within 24 hours.",
        },
        faq: {
          title: "Frequently Asked Questions",
          items: [
            {
              question: "What happens during the consultation?",
              answer: "It's a focused 30-minute call where we listen to your challenges and goals. We'll ask questions to understand your situation, share relevant experience, and give you honest feedback on feasibility and approach. No slides, no sales pitch."
            },
            {
              question: "How quickly can you start a project?",
              answer: "For urgent needs, we can typically start within 1-2 weeks. For larger engagements, we recommend a short discovery phase to ensure we fully understand the scope before committing to a plan and price."
            },
            {
              question: "What are your rates?",
              answer: "Fixed-scope offers start at €2,500 (EU AI Act Quick Scan). Larger engagements are priced per written scope with a fixed price — changes require your sign-off. We're transparent about costs from the first conversation."
            },
            {
              question: "Do you sign NDAs?",
              answer: "Absolutely. We're happy to sign an NDA before any detailed discussions about your project or business. Confidentiality is fundamental to how we operate."
            },
            {
              question: "How do you handle communication and updates?",
              answer: "We integrate with your existing tools (Slack, Teams, etc.) and provide regular async updates, demos, and direct access to the engineer doing the work — the founder. You'll never wonder about status."
            },
            {
              question: "What currencies do you invoice in?",
              answer: "We invoice through our Netherlands entity (KVK 97732699), in EUR by default, with multi-currency invoicing available for international clients."
            },
          ],
        },
        expectations: {
          title: "What to Expect",
          items: [
            "Response within 24 hours (EU business days)",
            "Free 30-minute consultation call",
            "Honest assessment - we'll tell you if we're not the right fit",
            "No obligation, no pressure",
            "Clear next steps if we decide to work together",
          ],
        },
      },
      fr: {
        hero: {
          title: "Parlons de Votre Projet",
          subtitle: "Reservez une consultation gratuite de 30 minutes avec le fondateur. Nous discuterons de vos defis, explorerons des solutions et vous donnerons des conseils honnetes.",
        },
        form: {
          title: "Reservez Votre Consultation Gratuite",
          subtitle: "Remplissez le formulaire et nous vous recontacterons sous 24 heures.",
        },
        faq: {
          title: "Questions Frequentes",
          items: [
            {
              question: "Que se passe-t-il pendant la consultation?",
              answer: "C'est un appel de 30 minutes ou nous ecoutons vos defis et objectifs. Nous posons des questions pour comprendre votre situation, partageons notre experience pertinente et vous donnons un retour honnete sur la faisabilite."
            },
            {
              question: "Quelle est votre rapidite de demarrage?",
              answer: "Pour les besoins urgents, nous pouvons generalement commencer sous 1-2 semaines. Pour les engagements plus importants, nous recommandons une courte phase de decouverte avant de nous engager sur un plan et un prix."
            },
            {
              question: "Quels sont vos tarifs?",
              answer: "Les offres a perimetre fixe commencent a 2 500€ (Quick Scan EU AI Act). Les engagements plus larges sont chiffres sur perimetre ecrit avec un prix fixe — tout changement necessite votre accord."
            },
            {
              question: "Signez-vous des NDA?",
              answer: "Absolument. Nous signons volontiers un NDA avant toute discussion detaillee sur votre projet ou votre entreprise. La confidentialite est fondamentale dans notre facon de travailler."
            },
            {
              question: "Comment gerez-vous la communication?",
              answer: "Nous nous integrons a vos outils existants (Slack, Teams, etc.) et fournissons des mises a jour asynchrones regulieres, des demos et un acces direct a l'ingenieur qui fait le travail — le fondateur."
            },
            {
              question: "Dans quelles devises facturez-vous?",
              answer: "Nous facturons via notre entite aux Pays-Bas (KVK 97732699), en EUR par defaut, avec facturation multi-devises disponible pour les clients internationaux."
            },
          ],
        },
        expectations: {
          title: "A Quoi S'Attendre",
          items: [
            "Reponse sous 24 heures (jours ouvrables UE)",
            "Consultation gratuite de 30 minutes",
            "Evaluation honnete - nous vous dirons si nous ne sommes pas le bon choix",
            "Aucune obligation, aucune pression",
            "Prochaines etapes claires si nous decidons de travailler ensemble",
          ],
        },
      },
    },
  },

  // ============================================================================
  // CASE STUDIES PAGE
  // ============================================================================
  {
    slug: "case-studies",
    title: "Case Studies",
    isPublished: true,
    order: 5,
    seoTitle: {
      en: "Case Studies - Representative Project Scenarios | Cloudrix",
      fr: "Etudes de Cas - Scenarios de Projets Representatifs | Cloudrix",
    },
    seoDescription: {
      en: "Representative, anonymized scenarios showing how Cloudrix approaches cloud migration, AI systems, and compliance engineering.",
      fr: "Scenarios de projets representatifs et anonymises illustrant l'approche Cloudrix : migration cloud, systemes IA et ingenierie de conformite.",
    },
    content: {
      en: {
        hero: {
          title: "How We Approach Real Problems",
          subtitle: "These are representative project scenarios illustrating our capabilities and approach — client names and specifics are anonymized for confidentiality. Each one walks through the challenge, our approach, and the outcomes we engineer toward.",
        },
        featured: {
          title: "Featured Case Studies",
        },
        grid: {
          title: "More Scenarios",
        },
        stats: {
          title: "Facts You Can Verify",
          subtitle: "No invented aggregate metrics — just verifiable facts about how Cloudrix works.",
          items: [
            { value: "10+", label: "Years of Engineering Experience" },
            { value: "2026", label: "Founded in Tilburg, NL (KVK 97732699)" },
            { value: "<24h", label: "Response Time" },
            { value: "1", label: "Engineer on Your Project — the Founder" },
          ],
        },
        cta: {
          title: "Be One of Our First Named Case Studies",
          subtitle: "Early clients get founder-level attention and case-study pricing. Let's discuss what a documented success would look like for you.",
          buttonText: "Book Free Consultation",
        },
      },
      fr: {
        hero: {
          title: "Comment Nous Abordons de Vrais Problemes",
          subtitle: "Voici des scenarios de projets representatifs illustrant nos capacites et notre approche — les noms des clients et les details sont anonymises par confidentialite. Chacun detaille le defi, notre approche et les resultats vises.",
        },
        featured: {
          title: "Etudes de Cas en Vedette",
        },
        grid: {
          title: "Plus de Scenarios",
        },
        stats: {
          title: "Des Faits Verifiables",
          subtitle: "Pas de metriques agregees inventees — juste des faits verifiables sur la facon dont Cloudrix travaille.",
          items: [
            { value: "10+", label: "Annees d'Experience en Ingenierie" },
            { value: "2026", label: "Fondee a Tilburg, NL (KVK 97732699)" },
            { value: "<24h", label: "Temps de Reponse" },
            { value: "1", label: "Ingenieur sur Votre Projet — le Fondateur" },
          ],
        },
        cta: {
          title: "Devenez l'une de Nos Premieres Etudes de Cas Nommees",
          subtitle: "Les premiers clients beneficient de l'attention du fondateur et de tarifs d'etude de cas. Discutons de ce a quoi ressemblerait un succes documente pour vous.",
          buttonText: "Consultation Gratuite",
        },
      },
    },
  },

  // ============================================================================
  // HOW WE WORK PAGE
  // ============================================================================
  {
    slug: "how-we-work",
    title: "How We Work",
    isPublished: true,
    order: 6,
    seoTitle: {
      en: "How We Work - Our Engineering Process | Cloudrix",
      fr: "Notre Methode de Travail - Processus d'Ingenierie | Cloudrix",
    },
    seoDescription: {
      en: "Discover our engineering methodology. From discovery to delivery, we keep you informed at every step. Agile, transparent, results-focused.",
      fr: "Notre methodologie d'ingenierie. De la decouverte a la livraison, transparence totale. Processus agile, axe sur les resultats.",
    },
    content: {
      en: {
        hero: {
          title: "How Great Software Gets Built",
          subtitle: "Our process is designed for one thing: delivering results you can measure. No mystery, no black boxes - just structured collaboration that keeps you informed and in control.",
        },
        methodology: {
          title: "Our 5-Step Methodology",
          subtitle: "A structured approach, shaped by 10+ years of hands-on production engineering, applied to every engagement.",
        },
        principles: {
          title: "Our Core Principles",
          subtitle: "The beliefs that shape how we work.",
          items: [
            {
              title: "Ownership Over Tasks",
              description: "We don't just complete tickets. We take ownership of outcomes. If something isn't working, we flag it and propose solutions.",
            },
            {
              title: "Transparency By Default",
              description: "You have full visibility into our work. Regular updates, demos, access to all code and documentation. No surprises.",
            },
            {
              title: "Quality Is Non-Negotiable",
              description: "We write code we're proud of. Proper testing, clear documentation, security best practices. Our code passes due diligence.",
            },
            {
              title: "Communication Is Work",
              description: "Great software requires great communication. We invest time in making sure you understand what's happening and why.",
            },
          ],
        },
        communication: {
          title: "How We Communicate",
          subtitle: "Clear, consistent, proactive communication.",
          items: [
            {
              title: "Regular Async Updates",
              description: "A brief summary of what was accomplished, what's in progress, and any blockers. Posted in your Slack/Teams.",
            },
            {
              title: "Weekly Video Demos",
              description: "Every week, we demo what we've built. You see real progress, ask questions, and provide feedback while it's fresh.",
            },
            {
              title: "Direct Engineer Access",
              description: "Talk directly to the person doing the work — the founder. No account managers filtering your questions. Real answers from a real engineer.",
            },
          ],
        },
        tools: {
          title: "Tools We Use",
          subtitle: "We adapt to your toolchain, or recommend proven solutions.",
          items: [
            { name: "Slack / Microsoft Teams", category: "Communication" },
            { name: "Linear / Jira / Asana", category: "Project Management" },
            { name: "GitHub / GitLab", category: "Code & Version Control" },
            { name: "Figma / Miro", category: "Design & Collaboration" },
            { name: "Notion / Confluence", category: "Documentation" },
            { name: "Loom / Zoom", category: "Video & Demos" },
            { name: "Datadog / Grafana", category: "Monitoring" },
            { name: "1Password / Vault", category: "Security" },
          ],
        },
        cta: {
          title: "Ready to See Our Process in Action?",
          subtitle: "Book a consultation and we'll walk you through exactly how we'd approach your project.",
          buttonText: "Book Free Consultation",
        },
      },
      fr: {
        hero: {
          title: "Comment les Grands Logiciels Sont Construits",
          subtitle: "Notre processus est concu pour une chose: livrer des resultats mesurables. Pas de mystere, pas de boites noires - juste une collaboration structuree.",
        },
        methodology: {
          title: "Notre Methodologie en 5 Etapes",
          subtitle: "Une approche structuree, faconnee par 10+ ans d'ingenierie en production, appliquee a chaque mission.",
        },
        principles: {
          title: "Nos Principes Fondamentaux",
          subtitle: "Les convictions qui faconnent notre facon de travailler.",
          items: [
            {
              title: "Responsabilite Plutot que Taches",
              description: "Nous ne faisons pas que completer des tickets. Nous prenons la responsabilite des resultats. Si quelque chose ne fonctionne pas, nous le signalons et proposons des solutions.",
            },
            {
              title: "Transparence Par Defaut",
              description: "Vous avez une visibilite complete sur notre travail. Mises a jour regulieres, demos, acces a tout le code et la documentation.",
            },
            {
              title: "La Qualite N'est Pas Negociable",
              description: "Nous ecrivons du code dont nous sommes fiers. Tests appropries, documentation claire, bonnes pratiques de securite.",
            },
            {
              title: "La Communication Est du Travail",
              description: "Les grands logiciels necessitent une grande communication. Nous investissons du temps pour que vous compreniez ce qui se passe et pourquoi.",
            },
          ],
        },
        communication: {
          title: "Comment Nous Communiquons",
          subtitle: "Communication claire, coherente et proactive.",
          items: [
            {
              title: "Mises a Jour Async Regulieres",
              description: "Un bref resume de ce qui a ete accompli, ce qui est en cours et les blocages. Poste dans votre Slack/Teams.",
            },
            {
              title: "Demos Video Hebdomadaires",
              description: "Chaque semaine, nous faisons une demo de ce que nous avons construit. Vous voyez les progres reels et donnez votre feedback.",
            },
            {
              title: "Acces Direct a l'Ingenieur",
              description: "Parlez directement a la personne qui fait le travail — le fondateur. Pas de gestionnaires de compte filtrant vos questions.",
            },
          ],
        },
        tools: {
          title: "Outils Que Nous Utilisons",
          subtitle: "Nous nous adaptons a votre environnement ou recommandons des solutions eprouvees.",
          items: [
            { name: "Slack / Microsoft Teams", category: "Communication" },
            { name: "Linear / Jira / Asana", category: "Gestion de Projet" },
            { name: "GitHub / GitLab", category: "Code & Controle de Version" },
            { name: "Figma / Miro", category: "Design & Collaboration" },
            { name: "Notion / Confluence", category: "Documentation" },
            { name: "Loom / Zoom", category: "Video & Demos" },
            { name: "Datadog / Grafana", category: "Monitoring" },
            { name: "1Password / Vault", category: "Securite" },
          ],
        },
        cta: {
          title: "Pret a Voir Notre Processus en Action?",
          subtitle: "Reservez une consultation et nous vous expliquerons exactement comment nous aborderions votre projet.",
          buttonText: "Consultation Gratuite",
        },
      },
    },
  },
];

async function seedPages() {
  try {
    console.log("🚀 Seeding pages...");
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing pages
    console.log("\n🗑️  Clearing existing pages...");
    await Page.deleteMany({});

    // Insert new pages
    console.log("📦 Inserting pages...");
    for (const page of defaultPages) {
      await Page.create(page);
      console.log(`   → ${page.title} page created`);
    }

    console.log("\n" + "=".repeat(50));
    console.log("✅ PAGES SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📊 Summary:");
    console.log("   • 6 pages created (Home, Services, About, Contact, Case Studies, How We Work)");
    console.log("   • All pages published and bilingual (EN/FR)");
    console.log("   • Honest content only: no invented stats, no fake history, no SOC 2 claims");
    console.log("\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed pages error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedPages();
