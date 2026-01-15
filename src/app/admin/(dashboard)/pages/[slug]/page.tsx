"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Globe } from "lucide-react";
import { Card, Input, Textarea, Button, Badge } from "@/components/ui";
import { PageHeader } from "@/components/admin";

type Language = "en" | "fr";

interface PageData {
  _id: string;
  slug: string;
  title: string;
  isPublished: boolean;
  seoTitle: { en: string; fr: string };
  seoDescription: { en: string; fr: string };
  content: {
    en: Record<string, unknown>;
    fr: Record<string, unknown>;
  };
}

// Page content structure definitions
const pageStructures: Record<string, { sections: { id: string; title: string; fields: { key: string; label: string; type: "text" | "textarea" | "array" }[] }[] }> = {
  home: {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.badge", label: "Badge Text", type: "text" },
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
          { key: "hero.ctaText", label: "Primary CTA Text", type: "text" },
          { key: "hero.ctaLink", label: "Primary CTA Link", type: "text" },
          { key: "hero.secondaryCtaText", label: "Secondary CTA Text", type: "text" },
          { key: "hero.secondaryCtaLink", label: "Secondary CTA Link", type: "text" },
        ],
      },
      {
        id: "services",
        title: "Services Section",
        fields: [
          { key: "services.title", label: "Section Title", type: "text" },
          { key: "services.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "stats",
        title: "Stats Section",
        fields: [
          { key: "stats.title", label: "Section Title", type: "text" },
          { key: "stats.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "process",
        title: "Process Section",
        fields: [
          { key: "process.title", label: "Section Title", type: "text" },
          { key: "process.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "testimonials",
        title: "Testimonials Section",
        fields: [
          { key: "testimonials.title", label: "Section Title", type: "text" },
          { key: "testimonials.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "cta",
        title: "CTA Section",
        fields: [
          { key: "cta.title", label: "CTA Title", type: "text" },
          { key: "cta.subtitle", label: "CTA Subtitle", type: "textarea" },
          { key: "cta.buttonText", label: "Button Text", type: "text" },
        ],
      },
      {
        id: "credibilityPoints",
        title: "Credibility Points",
        fields: [
          { key: "credibilityPoints", label: "Points (one per line)", type: "array" },
        ],
      },
    ],
  },
  services: {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        id: "servicesGrid",
        title: "Services Grid",
        fields: [
          { key: "servicesGrid.title", label: "Section Title", type: "text" },
          { key: "servicesGrid.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "industries",
        title: "Industries Section",
        fields: [
          { key: "industries.title", label: "Section Title", type: "text" },
          { key: "industries.subtitle", label: "Section Subtitle", type: "textarea" },
          { key: "industries.items", label: "Industries (one per line)", type: "array" },
        ],
      },
      {
        id: "technologies",
        title: "Technologies Section",
        fields: [
          { key: "technologies.title", label: "Section Title", type: "text" },
          { key: "technologies.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  about: {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        id: "mission",
        title: "Mission Section",
        fields: [
          { key: "mission.title", label: "Section Title", type: "text" },
          { key: "mission.content", label: "Mission Content", type: "textarea" },
        ],
      },
      {
        id: "values",
        title: "Values Section",
        fields: [
          { key: "values.title", label: "Section Title", type: "text" },
          { key: "values.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "team",
        title: "Team Section",
        fields: [
          { key: "team.title", label: "Section Title", type: "text" },
          { key: "team.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "timeline",
        title: "Timeline Section",
        fields: [
          { key: "timeline.title", label: "Section Title", type: "text" },
          { key: "timeline.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "certifications",
        title: "Certifications Section",
        fields: [
          { key: "certifications.title", label: "Section Title", type: "text" },
          { key: "certifications.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "stats",
        title: "Stats Section",
        fields: [
          { key: "stats.title", label: "Section Title", type: "text" },
          { key: "stats.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  contact: {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        id: "form",
        title: "Form Section",
        fields: [
          { key: "form.title", label: "Form Title", type: "text" },
          { key: "form.subtitle", label: "Form Subtitle", type: "textarea" },
        ],
      },
      {
        id: "faq",
        title: "FAQ Section",
        fields: [
          { key: "faq.title", label: "Section Title", type: "text" },
          { key: "faq.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "expectations",
        title: "Expectations Section",
        fields: [
          { key: "expectations.title", label: "Section Title", type: "text" },
          { key: "expectations.items", label: "Expectations (one per line)", type: "array" },
        ],
      },
      {
        id: "responseTime",
        title: "Response Time",
        fields: [
          { key: "responseTime", label: "Response Time Text", type: "text" },
        ],
      },
    ],
  },
  "how-we-work": {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        id: "methodology",
        title: "Methodology Section",
        fields: [
          { key: "methodology.title", label: "Section Title", type: "text" },
          { key: "methodology.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "principles",
        title: "Principles Section",
        fields: [
          { key: "principles.title", label: "Section Title", type: "text" },
          { key: "principles.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "communication",
        title: "Communication Section",
        fields: [
          { key: "communication.title", label: "Section Title", type: "text" },
          { key: "communication.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "tools",
        title: "Tools Section",
        fields: [
          { key: "tools.title", label: "Section Title", type: "text" },
          { key: "tools.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  "case-studies": {
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        id: "featured",
        title: "Featured Section",
        fields: [
          { key: "featured.title", label: "Section Title", type: "text" },
          { key: "featured.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
      {
        id: "grid",
        title: "Grid Section",
        fields: [
          { key: "grid.title", label: "Section Title", type: "text" },
          { key: "grid.subtitle", label: "Section Subtitle", type: "textarea" },
        ],
      },
    ],
  },
};

// Helper function to get nested value
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let value: unknown = obj;
  for (const key of keys) {
    if (value && typeof value === "object") {
      value = (value as Record<string, unknown>)[key];
    } else {
      return "";
    }
  }
  if (Array.isArray(value)) {
    return value.join("\n");
  }
  return (value as string) || "";
}

// Helper function to set nested value
function setNestedValue(obj: Record<string, unknown>, path: string, value: string | string[]): Record<string, unknown> {
  const keys = path.split(".");
  const result = { ...obj };
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current[key] = { ...(current[key] as Record<string, unknown>) };
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

export default function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [page, setPage] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [resolvedParams.slug]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${resolvedParams.slug}`);
      const data = await response.json();
      if (data.success) {
        setPage(data.data);
      } else {
        setError(data.error || "Page not found");
      }
    } catch (error) {
      console.error("Error fetching page:", error);
      setError("Failed to load page");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!page) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/pages/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          content: page.content,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      setError("Failed to save page");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key: string, value: string, isArray = false) => {
    if (!page) return;

    const processedValue = isArray ? value.split("\n").filter(Boolean) : value;

    setPage({
      ...page,
      content: {
        ...page.content,
        [activeLanguage]: setNestedValue(
          page.content[activeLanguage] as Record<string, unknown>,
          key,
          processedValue
        ),
      },
    });
  };

  const updateSeoField = (field: "seoTitle" | "seoDescription", value: string) => {
    if (!page) return;

    setPage({
      ...page,
      [field]: {
        ...page[field],
        [activeLanguage]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error && !page) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push("/admin/pages")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Button>
      </div>
    );
  }

  if (!page) return null;

  const structure = pageStructures[page.slug];

  return (
    <div>
      <PageHeader
        title={`Edit ${page.title}`}
        description="Manage page content in English and French"
        backHref="/admin/pages"
      />

      {/* Language Tabs */}
      <div className="mb-6 flex items-center gap-2">
        <Globe className="h-5 w-5 text-slate-400" />
        <div className="flex rounded-lg border border-slate-200 p-1">
          <button
            onClick={() => setActiveLanguage("en")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeLanguage === "en"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage("fr")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeLanguage === "fr"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            French
          </button>
        </div>
        <Badge variant={activeLanguage === "en" ? "primary" : "secondary"}>
          {activeLanguage === "en" ? "EN" : "FR"}
        </Badge>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          Page saved successfully!
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* SEO Settings */}
          <Card variant="bordered" padding="lg">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              SEO Settings ({activeLanguage.toUpperCase()})
            </h3>
            <div className="space-y-4">
              <Input
                label="SEO Title"
                value={page.seoTitle?.[activeLanguage] || ""}
                onChange={(e) => updateSeoField("seoTitle", e.target.value)}
                helperText="Max 70 characters"
                maxLength={70}
              />
              <Textarea
                label="SEO Description"
                value={page.seoDescription?.[activeLanguage] || ""}
                onChange={(e) => updateSeoField("seoDescription", e.target.value)}
                helperText="Max 160 characters"
                maxLength={160}
                rows={2}
              />
            </div>
          </Card>

          {/* Content Sections */}
          {structure?.sections.map((section) => (
            <Card key={section.id} variant="bordered" padding="lg">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.fields.map((field) => {
                  const value = getNestedValue(
                    page.content[activeLanguage] as Record<string, unknown>,
                    field.key
                  );

                  if (field.type === "textarea" || field.type === "array") {
                    return (
                      <Textarea
                        key={field.key}
                        label={field.label}
                        value={value}
                        onChange={(e) => updateField(field.key, e.target.value, field.type === "array")}
                        rows={field.type === "array" ? 4 : 3}
                        helperText={field.type === "array" ? "One item per line" : undefined}
                      />
                    );
                  }

                  return (
                    <Input
                      key={field.key}
                      label={field.label}
                      value={value}
                      onChange={(e) => updateField(field.key, e.target.value)}
                    />
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card variant="bordered" padding="lg">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Actions</h3>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/admin/pages")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pages
              </Button>
            </div>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Page Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Slug</span>
                <span className="font-medium text-slate-900">{page.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <Badge variant={page.isPublished ? "success" : "default"}>
                  {page.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">URL</span>
                <a
                  href={page.slug === "home" ? "/" : `/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {page.slug === "home" ? "/" : `/${page.slug}`}
                </a>
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="lg" className="bg-blue-50">
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              Translation Tips
            </h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>Switch between EN and FR tabs to edit each language</li>
              <li>Save to persist changes for both languages</li>
              <li>Keep translations consistent in tone and length</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
