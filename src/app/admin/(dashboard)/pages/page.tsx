"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Eye, EyeOff, FileText, Home, Briefcase, Users, Phone, Cog, FolderOpen } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { PageHeader } from "@/components/admin";

interface Page {
  _id: string;
  slug: string;
  title: string;
  isPublished: boolean;
  order: number;
  updatedAt: string;
}

const pageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  services: Briefcase,
  about: Users,
  contact: Phone,
  "how-we-work": Cog,
  "case-studies": FolderOpen,
};

const pageDescriptions: Record<string, string> = {
  home: "Main landing page with hero, services preview, and CTA",
  services: "Showcase your services and technologies",
  about: "Company mission, values, team, and timeline",
  contact: "Contact form, FAQ, and company info",
  "how-we-work": "Your process, principles, and communication methods",
  "case-studies": "Client success stories and testimonials",
};

export default function PagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      const data = await response.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublished = async (page: Page) => {
    const response = await fetch(`/api/admin/pages/${page.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !page.isPublished }),
    });

    if (response.ok) {
      setPages(
        pages.map((p) =>
          p._id === page._id ? { ...p, isPublished: !p.isPublished } : p
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
        title="Pages"
        description="Manage all website pages and their content in English and French"
      />

      <Card variant="bordered">
        {pages.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <FileText className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4">No pages found. Run the seed script to create default pages.</p>
            <code className="mt-2 block text-sm text-slate-400">
              npm run seed:pages
            </code>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pages.map((page) => {
              const Icon = pageIcons[page.slug] || FileText;
              return (
                <div
                  key={page._id}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-900">
                        {page.title}
                      </h3>
                      <Badge variant={page.isPublished ? "success" : "default"}>
                        {page.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {pageDescriptions[page.slug] || `/${page.slug}`}
                    </p>
                  </div>

                  <div className="text-right text-sm text-slate-400">
                    <p>Last updated</p>
                    <p>{new Date(page.updatedAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(page)}
                      title={page.isPublished ? "Unpublish" : "Publish"}
                    >
                      {page.isPublished ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/pages/${page.slug}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
