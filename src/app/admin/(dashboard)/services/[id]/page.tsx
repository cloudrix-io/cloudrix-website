"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";
import { Card, Button, Input, Textarea, Select } from "@/components/ui";
import { PageHeader } from "@/components/admin";

const iconOptions = [
  { value: "Cloud", label: "Cloud" },
  { value: "Code", label: "Code" },
  { value: "Settings", label: "Settings" },
  { value: "MessageSquare", label: "MessageSquare" },
  { value: "Users", label: "Users" },
  { value: "Database", label: "Database" },
  { value: "Shield", label: "Shield" },
  { value: "Zap", label: "Zap" },
];

interface ServiceForm {
  title: string;
  slug: string;
  description: string;
  icon: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  order: number;
  isActive: boolean;
}

export default function ServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const [form, setForm] = useState<ServiceForm>({
    title: "",
    slug: "",
    description: "",
    icon: "Code",
    problem: "",
    solution: "",
    result: "",
    features: [],
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) {
      fetchService();
    }
  }, [isNew]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/admin/services/${id}`);
      const data = await response.json();
      if (data.success) {
        setForm(data.data);
      } else {
        setError("Service not found");
      }
    } catch {
      setError("Failed to load service");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const url = isNew ? "/api/admin/services" : `/api/admin/services/${id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save service");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm({ ...form, features: [...form.features, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index),
    });
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
        title={isNew ? "Add Service" : "Edit Service"}
        backHref="/admin/services"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">
                Basic Information
              </h2>

              <div className="space-y-4">
                <Input
                  label="Title"
                  value={form.title}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: isNew ? generateSlug(e.target.value) : form.slug,
                    });
                  }}
                  required
                />

                <Input
                  label="Slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  helperText="URL-friendly identifier"
                  required
                />

                <Textarea
                  label="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  required
                />

                <Select
                  label="Icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  options={iconOptions}
                />
              </div>
            </Card>

            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">
                Problem / Solution / Result
              </h2>

              <div className="space-y-4">
                <Textarea
                  label="Problem"
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  placeholder="What problem does this service solve?"
                  rows={2}
                  required
                />

                <Textarea
                  label="Solution"
                  value={form.solution}
                  onChange={(e) =>
                    setForm({ ...form, solution: e.target.value })
                  }
                  placeholder="How do you solve this problem?"
                  rows={2}
                  required
                />

                <Textarea
                  label="Result"
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  placeholder="What results can clients expect?"
                  rows={2}
                  required
                />
              </div>
            </Card>

            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">Features</h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={addFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {form.features.length > 0 && (
                  <ul className="space-y-2">
                    {form.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                      >
                        <span className="text-sm text-slate-700">{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">Settings</h2>

              <div className="space-y-4">
                <Input
                  label="Order"
                  type="number"
                  value={form.order.toString()}
                  onChange={(e) =>
                    setForm({ ...form, order: parseInt(e.target.value) || 0 })
                  }
                  helperText="Lower numbers appear first"
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-slate-700"
                  >
                    Active (visible on website)
                  </label>
                </div>
              </div>
            </Card>

            <Card variant="bordered" className="bg-slate-50">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/admin/services")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving}>
                  {isNew ? "Create" : "Save"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
