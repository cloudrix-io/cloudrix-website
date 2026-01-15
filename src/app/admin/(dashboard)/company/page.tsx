"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Textarea } from "@/components/ui";
import { PageHeader } from "@/components/admin";

interface CompanyForm {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  founded: number;
  linkedin: string;
  github: string;
  twitter: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

export default function CompanyInfoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<CompanyForm>({
    name: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    founded: 2024,
    linkedin: "",
    github: "",
    twitter: "",
    heroTitle: "",
    heroSubtitle: "",
    ctaTitle: "",
    ctaSubtitle: "",
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch("/api/admin/company");
      const data = await response.json();
      if (data.success && data.data) {
        setForm(data.data);
      }
    } catch (error) {
      console.error("Error fetching company info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Company Information"
        description="Update your company details and website content"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {error && (
            <div className="col-span-full rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="col-span-full rounded-lg bg-green-50 p-4 text-sm text-green-600">
              Company information saved successfully!
            </div>
          )}

          <Card variant="bordered">
            <h2 className="mb-4 font-semibold text-slate-900">
              Basic Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Company Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <Input
                label="Tagline"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                required
              />

              <Textarea
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Founded Year"
                  type="number"
                  value={form.founded.toString()}
                  onChange={(e) =>
                    setForm({ ...form, founded: parseInt(e.target.value) || 2024 })
                  }
                  required
                />

                <Input
                  label="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <h2 className="mb-4 font-semibold text-slate-900">
              Contact Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <Input
                label="LinkedIn URL"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/..."
              />

              <Input
                label="GitHub URL"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/..."
              />

              <Input
                label="Twitter URL"
                value={form.twitter}
                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
            </div>
          </Card>

          <Card variant="bordered">
            <h2 className="mb-4 font-semibold text-slate-900">Hero Section</h2>

            <div className="space-y-4">
              <Input
                label="Hero Title"
                value={form.heroTitle}
                onChange={(e) =>
                  setForm({ ...form, heroTitle: e.target.value })
                }
                placeholder="We Build Software That Scales Your Business"
              />

              <Textarea
                label="Hero Subtitle"
                value={form.heroSubtitle}
                onChange={(e) =>
                  setForm({ ...form, heroSubtitle: e.target.value })
                }
                rows={3}
                placeholder="Cloud architecture, full-stack development..."
              />
            </div>
          </Card>

          <Card variant="bordered">
            <h2 className="mb-4 font-semibold text-slate-900">CTA Section</h2>

            <div className="space-y-4">
              <Input
                label="CTA Title"
                value={form.ctaTitle}
                onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
                placeholder="Ready to Build Something Great?"
              />

              <Textarea
                label="CTA Subtitle"
                value={form.ctaSubtitle}
                onChange={(e) =>
                  setForm({ ...form, ctaSubtitle: e.target.value })
                }
                rows={3}
                placeholder="Book a free consultation to discuss your project..."
              />
            </div>
          </Card>

          <div className="col-span-full">
            <Button type="submit" isLoading={isSaving}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
