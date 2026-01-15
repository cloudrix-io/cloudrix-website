"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { PageHeader, DeleteDialog } from "@/components/admin";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/admin/services/${deleteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setServices(services.filter((s) => s._id !== deleteId));
    }
  };

  const toggleActive = async (service: Service) => {
    const response = await fetch(`/api/admin/services/${service._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !service.isActive }),
    });

    if (response.ok) {
      setServices(
        services.map((s) =>
          s._id === service._id ? { ...s, isActive: !s.isActive } : s
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
        title="Services"
        description="Manage the services displayed on your website"
        action={{ label: "Add Service", href: "/admin/services/new" }}
      />

      <Card variant="bordered">
        {services.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No services yet. Add your first service to get started.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex items-center gap-4 p-4 hover:bg-slate-50"
              >
                <GripVertical className="h-5 w-5 cursor-grab text-slate-400" />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">
                      {service.title}
                    </h3>
                    <Badge variant={service.isActive ? "success" : "default"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(service)}
                    title={service.isActive ? "Deactivate" : "Activate"}
                  >
                    {service.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/services/${service._id}`)
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setDeleteId(service._id)}
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
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
}
