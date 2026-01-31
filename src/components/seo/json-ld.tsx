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
    email: "contact@cloudrix.io",
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
      addressLocality: "Tilburg",
      addressRegion: "North Brabant",
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
      email: "contact@cloudrix.io",
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
    telephone: "+31-6-43166305",
    email: "contact@cloudrix.io",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressLocality: "Tilburg",
      addressRegion: "North Brabant",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5555,
      longitude: 5.0913,
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

// Blog Post / Article Schema
interface BlogPostJsonLdProps {
  title: string;
  description: string;
  slug: string;
  author: {
    name: string;
    role?: string;
  };
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  author,
  publishedAt,
  modifiedAt,
  image,
  category,
  tags,
  readingTime,
}: BlogPostJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${slug}#article`,
    headline: title,
    description: description,
    image: image || `${BASE_URL}/og-image.png`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    articleSection: category,
    keywords: tags?.join(", "),
    wordCount: readingTime ? readingTime * 200 : undefined,
    inLanguage: "en",
    isAccessibleForFree: true,
  };

  return (
    <Script
      id="blogpost-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Software Application Schema (for tools like calculator)
interface SoftwareAppJsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function SoftwareAppJsonLd({
  name,
  description,
  url,
  category = "BusinessApplication",
}: SoftwareAppJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}${url}#app`,
    name: name,
    description: description,
    url: `${BASE_URL}${url}`,
    applicationCategory: category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@id": `${BASE_URL}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Script
      id="softwareapp-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Review/Testimonial Schema
interface ReviewJsonLdProps {
  reviews: Array<{
    author: string;
    role: string;
    company: string;
    review: string;
    rating?: number;
  }>;
}

export function ReviewJsonLd({ reviews }: ReviewJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization-reviews`,
    name: "Cloudrix",
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
        jobTitle: r.role,
      },
      reviewBody: r.review,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating || 5,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: {
        "@type": "Organization",
        name: r.company,
      },
    })),
  };

  return (
    <Script
      id="review-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
