import Script from "next/script";

const BASE_URL = "https://cloudrix.io";

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Cloudrix",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    description:
      "Senior engineering teams for European companies. Cloud architecture, product development, and DevOps.",
    email: "hello@cloudrix.io",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Firas Sayah",
        jobTitle: "Founder & Lead Architect",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressLocality: "Amsterdam",
    },
    areaServed: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Continent", name: "Europe" },
    ],
    sameAs: [
      "https://linkedin.com/company/cloudrix",
      "https://github.com/cloudrix",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@cloudrix.io",
      availableLanguage: ["English", "French"],
    },
    knowsAbout: [
      "Cloud Architecture",
      "AWS",
      "DevOps",
      "Kubernetes",
      "Software Development",
      "Full-Stack Development",
      "Cloud Migration",
      "Technical Consulting",
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Local Business Schema (for local SEO)
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Cloudrix",
    url: BASE_URL,
    image: `${BASE_URL}/og-image.png`,
    description:
      "Cloud & Software Engineering services for European companies. AWS, DevOps, Full-Stack Development.",
    priceRange: "€€€",
    telephone: "+216-XX-XXX-XXX",
    email: "hello@cloudrix.io",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3676,
      longitude: 4.9041,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Script
      id="localbusiness-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Website Schema with SearchAction
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Cloudrix",
    description: "Cloud & Software Engineering for EU Companies",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: ["en", "fr"],
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Services Schema
interface ServiceJsonLdProps {
  services: Array<{
    title: string;
    description?: string;
    shortDescription?: string;
  }>;
}

export function ServicesJsonLd({ services }: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/services#servicelist`,
    name: "Cloud & Software Engineering Services",
    description: "Professional engineering services for European companies",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description || service.shortDescription,
        provider: {
          "@id": `${BASE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Continent",
          name: "Europe",
        },
      },
    })),
  };

  return (
    <Script
      id="services-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// FAQ Schema
interface FAQJsonLdProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/contact#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Case Study Schema (Article type)
interface CaseStudyJsonLdProps {
  title: string;
  description: string;
  slug: string;
  client: string;
  industry: string;
  image?: string;
  datePublished?: string;
}

export function CaseStudyJsonLd({
  title,
  description,
  slug,
  client,
  industry,
  image,
  datePublished,
}: CaseStudyJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/case-studies/${slug}#article`,
    headline: title,
    description: description,
    image: image || `${BASE_URL}/og-image.png`,
    datePublished: datePublished || "2024-01-01",
    dateModified: new Date().toISOString(),
    author: {
      "@id": `${BASE_URL}/#organization`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/case-studies/${slug}`,
    },
    about: [
      { "@type": "Thing", name: client },
      { "@type": "Thing", name: industry },
    ],
    articleSection: "Case Studies",
    inLanguage: "en",
  };

  return (
    <Script
      id="casestudy-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Team/Person Schema
interface TeamMemberJsonLdProps {
  members: Array<{
    name: string;
    role: string;
    bio?: string;
    image?: string;
    linkedin?: string;
  }>;
}

export function TeamJsonLd({ members }: TeamMemberJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/about#team`,
    name: "Cloudrix Team",
    description: "Senior engineers at Cloudrix",
    numberOfItems: members.length,
    itemListElement: members.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
        image: member.image,
        url: member.linkedin,
        worksFor: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
    })),
  };

  return (
    <Script
      id="team-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// How We Work / Service Process Schema
interface ProcessJsonLdProps {
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}

export function ProcessJsonLd({ steps }: ProcessJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE_URL}/how-we-work#process`,
    name: "How Cloudrix Delivers Software Projects",
    description:
      "Our proven methodology for delivering successful software engineering projects",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
    })),
    totalTime: "P4M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "Contact for quote",
    },
  };

  return (
    <Script
      id="process-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
