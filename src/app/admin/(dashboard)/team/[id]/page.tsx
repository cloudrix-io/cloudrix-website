"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Textarea } from "@/components/ui";
import { PageHeader } from "@/components/admin";

interface TeamMemberForm {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function TeamMemberEditPage({
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

  const [form, setForm] = useState<TeamMemberForm>({
    name: "",
    role: "",
    bio: "",
    email: "",
    linkedin: "",
    github: "",
    image: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) {
      fetchTeamMember();
    }
  }, [isNew]);

  const fetchTeamMember = async () => {
    try {
      const response = await fetch(`/api/admin/team/${id}`);
      const data = await response.json();
      if (data.success) {
        setForm(data.data);
      } else {
        setError("Team member not found");
      }
    } catch {
      setError("Failed to load team member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const url = isNew ? "/api/admin/team" : `/api/admin/team/${id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save team member");
      }

      router.push("/admin/team");
      router.refresh();
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
        title={isNew ? "Add Team Member" : "Edit Team Member"}
        backHref="/admin/team"
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
                  label="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Software Engineer"
                  required
                />

                <Textarea
                  label="Bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Brief description about this team member..."
                  rows={4}
                />

                <Input
                  label="Profile Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  helperText="Optional: URL to profile image"
                />
              </div>
            </Card>

            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">
                Contact & Social
              </h2>

              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@cloudrix.com"
                />

                <Input
                  label="LinkedIn URL"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />

                <Input
                  label="GitHub URL"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
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

            {/* Preview Card */}
            <Card variant="bordered">
              <h2 className="mb-4 font-semibold text-slate-900">Preview</h2>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {form.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900">
                  {form.name || "Name"}
                </h3>
                <p className="text-sm text-blue-600">{form.role || "Role"}</p>
              </div>
            </Card>

            <Card variant="bordered" className="bg-slate-50">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/admin/team")}
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
