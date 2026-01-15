import mongoose from "mongoose";
import Page from "../lib/models/page";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

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
      en: "Cloudrix - Cloud & Software Engineering for EU Companies",
      fr: "Cloudrix - Cloud & Ingenierie Logicielle pour l'Europe",
    },
    seoDescription: {
      en: "Senior engineering teams for European companies. Cloud architecture, product development, and DevOps. 47 projects delivered. Book a free consultation.",
      fr: "Equipes d'ingenieurs seniors pour entreprises europeennes. Architecture cloud, developpement et DevOps. 47 projets livres. Consultation gratuite.",
    },
    content: {
      en: {
        hero: {
          badge: "Now accepting Q1 2025 projects",
          title: "Engineering Teams That Actually Ship",
          subtitle: "Cloud architecture, product development, and DevOps for European companies. Senior engineers who understand EU markets, communicate in your timezone, and deliver code that passes investor due diligence.",
          ctaText: "Book Free Consultation",
          ctaLink: "/contact",
          secondaryCtaText: "View Case Studies",
          secondaryCtaLink: "/case-studies",
        },
        services: {
          title: "Engineering Services That Scale",
          subtitle: "From architecture to deployment, we handle the technical complexity so you can focus on growing your business.",
        },
        stats: {
          title: "Trusted by European Companies",
          subtitle: "Real results from real projects. Our track record speaks for itself.",
        },
        process: {
          title: "From First Call to Production",
          subtitle: "A structured approach that keeps you informed and in control at every stage. No surprises, no black boxes.",
        },
        testimonials: {
          title: "What Our Clients Say",
          subtitle: "Don't take our word for it. Here's what engineering leaders say about working with us.",
        },
        cta: {
          title: "Ready to Build Something Great?",
          subtitle: "Book a free 30-minute consultation. No sales pitch - just an honest conversation about your challenges and how we might help.",
          buttonText: "Schedule a Call",
        },
        credibilityPoints: [
          "47 projects delivered for EU companies",
          "94% client retention rate",
          "Code that passes VC due diligence",
        ],
      },
      fr: {
        hero: {
          badge: "Projets Q1 2025 acceptes",
          title: "Des Equipes Qui Livrent Vraiment",
          subtitle: "Architecture cloud, developpement produit et DevOps pour les entreprises europeennes. Des ingenieurs seniors qui comprennent les marches UE et livrent du code pret pour la due diligence.",
          ctaText: "Consultation Gratuite",
          ctaLink: "/contact",
          secondaryCtaText: "Voir les Etudes de Cas",
          secondaryCtaLink: "/case-studies",
        },
        services: {
          title: "Services d'Ingenierie Evolutifs",
          subtitle: "De l'architecture au deploiement, nous gerons la complexite technique pour que vous puissiez vous concentrer sur votre croissance.",
        },
        stats: {
          title: "La Confiance des Entreprises Europeennes",
          subtitle: "Des resultats reels de projets reels. Notre historique parle de lui-meme.",
        },
        process: {
          title: "Du Premier Appel a la Production",
          subtitle: "Une approche structuree qui vous garde informe et en controle a chaque etape. Pas de surprises.",
        },
        testimonials: {
          title: "Ce Que Disent Nos Clients",
          subtitle: "Ne nous croyez pas sur parole. Voici ce que disent les leaders techniques sur leur collaboration avec nous.",
        },
        cta: {
          title: "Pret a Construire Quelque Chose de Grand?",
          subtitle: "Reservez une consultation gratuite de 30 minutes. Pas de discours commercial - juste une conversation honnete.",
          buttonText: "Planifier un Appel",
        },
        credibilityPoints: [
          "47 projets livres pour des entreprises UE",
          "94% de taux de retention client",
          "Code qui passe la due diligence VC",
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
      en: "Cloud & Software Engineering Services | Cloudrix",
      fr: "Services Cloud & Ingenierie Logicielle | Cloudrix",
    },
    seoDescription: {
      en: "Cloud architecture, full-stack development, DevOps, and technical consulting for European companies. Senior engineers, transparent pricing, EU timezone.",
      fr: "Architecture cloud, developpement full-stack, DevOps et conseil technique pour entreprises europeennes. Ingenieurs seniors, tarification transparente.",
    },
    content: {
      en: {
        hero: {
          title: "Engineering Services Built for Scale",
          subtitle: "Whether you need to migrate to the cloud, build a new product, or modernize legacy systems, we have the expertise to make it happen. Senior engineers, proven methodologies, real results.",
        },
        services: {
          title: "What We Do",
          subtitle: "Deep expertise across the full technology stack, from infrastructure to user interface.",
        },
        industries: {
          title: "Industries We Serve",
          subtitle: "Domain expertise that accelerates delivery and reduces risk.",
          items: [
            { name: "Financial Services & FinTech", description: "PCI-DSS compliance, payment systems, trading platforms" },
            { name: "Healthcare & Digital Health", description: "HIPAA/GDPR compliance, telemedicine, health records" },
            { name: "E-Commerce & Retail", description: "High-traffic platforms, inventory systems, checkout optimization" },
            { name: "SaaS & Enterprise Software", description: "Multi-tenant architecture, API platforms, integrations" },
            { name: "Manufacturing & Industrial", description: "ERP modernization, IoT integration, supply chain" },
            { name: "Logistics & Supply Chain", description: "Fleet management, route optimization, warehouse systems" },
          ],
        },
        technologies: {
          title: "Technologies We Master",
          subtitle: "We choose the right tool for the job, not the trendy one. Our stack is battle-tested across 47+ production deployments.",
        },
        cta: {
          title: "Not Sure What You Need?",
          subtitle: "Book a free technical consultation. We'll assess your situation and recommend the right approach - even if that means building in-house.",
          buttonText: "Get Expert Advice",
        },
      },
      fr: {
        hero: {
          title: "Services d'Ingenierie Connus pour l'Echelle",
          subtitle: "Que vous ayez besoin de migrer vers le cloud, construire un nouveau produit ou moderniser des systemes legacy, nous avons l'expertise pour le realiser.",
        },
        services: {
          title: "Ce Que Nous Faisons",
          subtitle: "Une expertise approfondie sur toute la stack technologique, de l'infrastructure a l'interface utilisateur.",
        },
        industries: {
          title: "Secteurs d'Activite",
          subtitle: "Une expertise sectorielle qui accelere la livraison et reduit les risques.",
          items: [
            { name: "Services Financiers & FinTech", description: "Conformite PCI-DSS, systemes de paiement, plateformes de trading" },
            { name: "Sante & Sante Numerique", description: "Conformite HIPAA/RGPD, telemedecine, dossiers medicaux" },
            { name: "E-Commerce & Retail", description: "Plateformes a fort trafic, systemes d'inventaire, optimisation checkout" },
            { name: "SaaS & Logiciels d'Entreprise", description: "Architecture multi-tenant, plateformes API, integrations" },
            { name: "Industrie & Manufacturing", description: "Modernisation ERP, integration IoT, supply chain" },
            { name: "Logistique & Supply Chain", description: "Gestion de flotte, optimisation de routes, systemes d'entrepot" },
          ],
        },
        technologies: {
          title: "Technologies Que Nous Maitrisons",
          subtitle: "Nous choisissons le bon outil pour le travail, pas le plus tendance. Notre stack est eprouvee sur 47+ deploiements production.",
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
      en: "About Cloudrix - Senior Engineering for EU Companies",
      fr: "A Propos de Cloudrix - Ingenierie Senior pour l'Europe",
    },
    seoDescription: {
      en: "Meet the team behind Cloudrix. Senior engineers with 10+ years experience, serving European companies with cloud, development, and DevOps expertise.",
      fr: "Decouvrez l'equipe Cloudrix. Ingenieurs seniors avec 10+ ans d'experience, au service des entreprises europeennes.",
    },
    content: {
      en: {
        hero: {
          title: "We're Engineers Who Get Things Done",
          subtitle: "A senior engineering team that helps European companies build, scale, and modernize their software systems. We combine technical excellence with a deep understanding of EU business culture.",
        },
        mission: {
          title: "Our Mission",
          content: "To be the engineering partner that European companies can trust for their most critical technical challenges. We believe great software is built by experienced engineers who take ownership, communicate clearly, and deliver what they promise.",
        },
        values: {
          title: "What We Stand For",
          subtitle: "The principles that guide every project and every interaction.",
        },
        team: {
          title: "Meet the Team",
          subtitle: "Senior engineers with decades of combined experience building production systems.",
        },
        timeline: {
          title: "Our Journey",
          subtitle: "From a solo consultancy to a trusted engineering partner for EU companies.",
          items: [
            { year: "2020", title: "Cloudrix founded", description: "Started as a solo consultancy, focused on cloud migrations for Dutch startups." },
            { year: "2021", title: "First enterprise clients", description: "Expanded to serve mid-market companies. Delivered first €500K+ project." },
            { year: "2022", title: "Team expansion", description: "Grew to 5 engineers. Launched dedicated teams offering. Opened Netherlands entity." },
            { year: "2023", title: "50+ projects milestone", description: "Crossed 50 successful projects. 94% client retention rate achieved." },
            { year: "2024", title: "Healthcare & FinTech focus", description: "Deep expertise in regulated industries. SOC 2 practices implemented." },
            { year: "2025", title: "Scaling for growth", description: "Expanding team to meet demand. Accepting new strategic partnerships." },
          ],
        },
        certifications: {
          title: "Certifications & Expertise",
          subtitle: "Recognized credentials that demonstrate our commitment to excellence.",
          items: [
            { name: "AWS Solutions Architect Professional", description: "Advanced cloud architecture", icon: "Award" },
            { name: "Google Cloud Professional Architect", description: "Multi-cloud expertise", icon: "Award" },
            { name: "CISSP Certified", description: "Information security", icon: "Shield" },
            { name: "Kubernetes Administrator (CKA)", description: "Container orchestration", icon: "Award" },
            { name: "GDPR Compliant Practices", description: "EU data protection", icon: "Shield" },
            { name: "SOC 2 Type II Practices", description: "Security controls", icon: "Shield" },
          ],
        },
        stats: {
          title: "By the Numbers",
          subtitle: "Metrics that matter.",
        },
      },
      fr: {
        hero: {
          title: "Des Ingenieurs Qui Font Avancer les Choses",
          subtitle: "Une equipe d'ingenieurs seniors qui aide les entreprises europeennes a construire, faire evoluer et moderniser leurs systemes logiciels.",
        },
        mission: {
          title: "Notre Mission",
          content: "Etre le partenaire d'ingenierie sur lequel les entreprises europeennes peuvent compter pour leurs defis techniques les plus critiques. Nous croyons que les grands logiciels sont construits par des ingenieurs experimentes qui prennent leurs responsabilites et tiennent leurs promesses.",
        },
        values: {
          title: "Ce Que Nous Defendons",
          subtitle: "Les principes qui guident chaque projet et chaque interaction.",
        },
        team: {
          title: "Rencontrez l'Equipe",
          subtitle: "Des ingenieurs seniors avec des decennies d'experience combinee dans la construction de systemes de production.",
        },
        timeline: {
          title: "Notre Parcours",
          subtitle: "D'un cabinet de conseil solo a un partenaire d'ingenierie de confiance pour les entreprises UE.",
          items: [
            { year: "2020", title: "Cloudrix fondee", description: "Debut en tant que consultant solo, specialise dans les migrations cloud pour startups neerlandaises." },
            { year: "2021", title: "Premiers clients entreprise", description: "Expansion vers les entreprises mid-market. Premier projet a plus de 500K€ livre." },
            { year: "2022", title: "Expansion de l'equipe", description: "Croissance a 5 ingenieurs. Lancement de l'offre equipes dediees. Ouverture de l'entite Pays-Bas." },
            { year: "2023", title: "Cap des 50+ projets", description: "Plus de 50 projets reussis. Taux de retention client de 94% atteint." },
            { year: "2024", title: "Focus Sante & FinTech", description: "Expertise approfondie dans les secteurs reglementes. Pratiques SOC 2 implementees." },
            { year: "2025", title: "Croissance et expansion", description: "Expansion de l'equipe pour repondre a la demande. Nouveaux partenariats strategiques." },
          ],
        },
        certifications: {
          title: "Certifications & Expertise",
          subtitle: "Des credentials reconnus qui demontrent notre engagement envers l'excellence.",
          items: [
            { name: "AWS Solutions Architect Professional", description: "Architecture cloud avancee", icon: "Award" },
            { name: "Google Cloud Professional Architect", description: "Expertise multi-cloud", icon: "Award" },
            { name: "CISSP Certifie", description: "Securite de l'information", icon: "Shield" },
            { name: "Kubernetes Administrator (CKA)", description: "Orchestration de conteneurs", icon: "Award" },
            { name: "Pratiques Conformes RGPD", description: "Protection des donnees UE", icon: "Shield" },
            { name: "Pratiques SOC 2 Type II", description: "Controles de securite", icon: "Shield" },
          ],
        },
        stats: {
          title: "En Chiffres",
          subtitle: "Les metriques qui comptent.",
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
      en: "Book a free 30-minute consultation with our engineering team. Discuss your cloud, development, or DevOps challenges. No sales pitch, just honest advice.",
      fr: "Reservez une consultation gratuite de 30 minutes. Discutez de vos defis cloud, developpement ou DevOps. Pas de discours commercial.",
    },
    content: {
      en: {
        hero: {
          title: "Let's Talk About Your Project",
          subtitle: "Book a free 30-minute consultation. We'll discuss your challenges, explore solutions, and give you honest advice - even if that means recommending someone else.",
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
              answer: "For urgent needs, we can typically start within 1-2 weeks. For larger engagements, we recommend a 2-3 week discovery phase to ensure we fully understand the scope and can staff the right team."
            },
            {
              question: "What are your rates?",
              answer: "Our rates depend on the engagement type, team composition, and duration. We offer project-based pricing for defined scope work and time-and-materials for ongoing engagements. We're transparent about costs from the first conversation."
            },
            {
              question: "Do you sign NDAs?",
              answer: "Absolutely. We're happy to sign an NDA before any detailed discussions about your project or business. Confidentiality is fundamental to how we operate."
            },
            {
              question: "How do you handle communication and updates?",
              answer: "We integrate with your existing tools (Slack, Teams, etc.) and provide daily async updates, weekly demos, and direct access to the engineers working on your project. You'll never wonder about status."
            },
            {
              question: "What currencies do you invoice in?",
              answer: "We invoice in EUR through our Netherlands entity. This keeps things simple for EU clients and avoids currency conversion complications."
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
          subtitle: "Reservez une consultation gratuite de 30 minutes. Nous discuterons de vos defis, explorerons des solutions et vous donnerons des conseils honnetes.",
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
              answer: "Pour les besoins urgents, nous pouvons generalement commencer sous 1-2 semaines. Pour les engagements plus importants, nous recommandons une phase de decouverte de 2-3 semaines."
            },
            {
              question: "Quels sont vos tarifs?",
              answer: "Nos tarifs dependent du type d'engagement, de la composition de l'equipe et de la duree. Nous proposons des tarifs au projet pour les perimetre definis et en regie pour les engagements continus."
            },
            {
              question: "Signez-vous des NDA?",
              answer: "Absolument. Nous signons volontiers un NDA avant toute discussion detaillee sur votre projet ou votre entreprise. La confidentialite est fondamentale dans notre facon de travailler."
            },
            {
              question: "Comment gerez-vous la communication?",
              answer: "Nous nous integrons a vos outils existants (Slack, Teams, etc.) et fournissons des mises a jour quotidiennes, des demos hebdomadaires et un acces direct aux ingenieurs travaillant sur votre projet."
            },
            {
              question: "Dans quelles devises facturez-vous?",
              answer: "Nous facturons en EUR via notre entite aux Pays-Bas. Cela simplifie les choses pour les clients UE et evite les complications de conversion de devises."
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
      en: "Case Studies - Real Results for EU Companies | Cloudrix",
      fr: "Etudes de Cas - Resultats Reels pour l'Europe | Cloudrix",
    },
    seoDescription: {
      en: "See how we helped European companies reduce costs by 55%, launch products in 14 weeks, and achieve 99.99% uptime. Real projects, real results.",
      fr: "Comment nous avons aide des entreprises UE a reduire leurs couts de 55%, lancer des produits en 14 semaines. Projets reels, resultats reels.",
    },
    content: {
      en: {
        hero: {
          title: "Real Projects, Real Results",
          subtitle: "See how we've helped European companies solve their most challenging technical problems. Each case study includes the challenge, our approach, and measurable outcomes.",
        },
        featured: {
          title: "Featured Case Studies",
        },
        grid: {
          title: "More Success Stories",
        },
        stats: {
          title: "Our Impact in Numbers",
          subtitle: "Aggregate results across all client engagements.",
          items: [
            { value: "€12M+", label: "Client Revenue Impact" },
            { value: "55%", label: "Average Cost Reduction" },
            { value: "99.9%", label: "Average Uptime Achieved" },
            { value: "14 weeks", label: "Average MVP Delivery" },
          ],
        },
        cta: {
          title: "Your Success Story Starts Here",
          subtitle: "Every case study started with a conversation. Let's discuss how we can help you achieve similar results.",
          buttonText: "Book Free Consultation",
        },
      },
      fr: {
        hero: {
          title: "Projets Reels, Resultats Reels",
          subtitle: "Decouvrez comment nous avons aide des entreprises europeennes a resoudre leurs defis techniques les plus complexes. Chaque etude de cas inclut le defi, notre approche et les resultats mesurables.",
        },
        featured: {
          title: "Etudes de Cas en Vedette",
        },
        grid: {
          title: "Plus de Succes",
        },
        stats: {
          title: "Notre Impact en Chiffres",
          subtitle: "Resultats agreges sur tous les engagements clients.",
          items: [
            { value: "12M€+", label: "Impact sur les Revenus Clients" },
            { value: "55%", label: "Reduction Moyenne des Couts" },
            { value: "99,9%", label: "Disponibilite Moyenne Atteinte" },
            { value: "14 semaines", label: "Livraison MVP Moyenne" },
          ],
        },
        cta: {
          title: "Votre Success Story Commence Ici",
          subtitle: "Chaque etude de cas a commence par une conversation. Discutons de comment nous pouvons vous aider a atteindre des resultats similaires.",
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
      en: "Discover our proven engineering methodology. From discovery to delivery, we keep you informed at every step. Agile, transparent, results-focused.",
      fr: "Notre methodologie d'ingenierie eprouvee. De la decouverte a la livraison, transparence totale. Processus agile, axe sur les resultats.",
    },
    content: {
      en: {
        hero: {
          title: "How Great Software Gets Built",
          subtitle: "Our process is designed for one thing: delivering results you can measure. No mystery, no black boxes - just structured collaboration that keeps you informed and in control.",
        },
        methodology: {
          title: "Our 5-Step Methodology",
          subtitle: "A battle-tested approach refined across 47+ projects.",
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
              description: "You have full visibility into our work. Daily updates, weekly demos, access to all code and documentation. No surprises.",
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
              title: "Daily Async Updates",
              description: "A brief summary of what was accomplished, what's in progress, and any blockers. Posted in your Slack/Teams by end of each day.",
            },
            {
              title: "Weekly Video Demos",
              description: "Every Friday, we demo what we've built. You see real progress, ask questions, and provide feedback while it's fresh.",
            },
            {
              title: "Direct Engineer Access",
              description: "Talk directly to the people doing the work. No account managers filtering your questions. Real answers from real engineers.",
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
          subtitle: "Une approche eprouvee, affinee sur plus de 47 projets.",
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
              description: "Vous avez une visibilite complete sur notre travail. Mises a jour quotidiennes, demos hebdomadaires, acces a tout le code et la documentation.",
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
              title: "Mises a Jour Async Quotidiennes",
              description: "Un bref resume de ce qui a ete accompli, ce qui est en cours et les blocages. Poste dans votre Slack/Teams en fin de journee.",
            },
            {
              title: "Demos Video Hebdomadaires",
              description: "Chaque vendredi, nous faisons une demo de ce que nous avons construit. Vous voyez les progres reels et donnez votre feedback.",
            },
            {
              title: "Acces Direct aux Ingenieurs",
              description: "Parlez directement aux personnes qui font le travail. Pas de gestionnaires de compte filtrant vos questions.",
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
    console.log("   • SEO metadata configured for all pages");
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
