"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { PageHeader, DeleteDialog } from "@/components/admin";

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function CaseStudiesPage() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/admin/case-studies");
      const data = await response.json();
      if (data.success) {
        setCaseStudies(data.data);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/admin/case-studies/${deleteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCaseStudies(caseStudies.filter((s) => s._id !== deleteId));
    }
  };

  const toggleActive = async (study: CaseStudy) => {
    const response = await fetch(`/api/admin/case-studies/${study._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !study.isActive }),
    });

    if (response.ok) {
      setCaseStudies(
        caseStudies.map((s) =>
          s._id === study._id ? { ...s, isActive: !s.isActive } : s
        )
      );
    }
  };

  const toggleFeatured = async (study: CaseStudy) => {
    const response = await fetch(`/api/admin/case-studies/${study._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !study.isFeatured }),
    });

    if (response.ok) {
      setCaseStudies(
        caseStudies.map((s) =>
          s._id === study._id ? { ...s, isFeatured: !s.isFeatured } : s
        )
      );
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
        title="Case Studies"
        description="Manage your portfolio and client success stories"
        action={{ label: "Add Case Study", href: "/admin/case-studies/new" }}
      />

      <Card variant="bordered">
        {caseStudies.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No case studies yet. Add your first case study to get started.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {caseStudies.map((study) => (
              <div
                key={study._id}
                className="flex items-center gap-4 p-4 hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{study.title}</h3>
                    <Badge variant={study.isActive ? "success" : "default"}>
                      {study.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {study.isFeatured && (
                      <Badge variant="warning">Featured</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {study.client} - {study.industry}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(study)}
                    title={study.isFeatured ? "Unfeature" : "Feature"}
                  >
                    {study.isFeatured ? (
                      <StarOff className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(study)}
                    title={study.isActive ? "Deactivate" : "Activate"}
                  >
                    {study.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/case-studies/${study._id}`)
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setDeleteId(study._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Case Study"
        description="Are you sure you want to delete this case study? This action cannot be undone."
      />
    </div>
  );
}
