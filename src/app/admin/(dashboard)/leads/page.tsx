"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, Building2, Clock } from "lucide-react";
import { Card, Badge, Button, Select } from "@/components/ui";
import { PageHeader } from "@/components/admin";

interface Lead {
  _id: string;
  name: string;
  company: string;
  email: string;
  problemType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const statusColors: Record<string, "primary" | "default" | "success" | "warning"> = {
  new: "primary",
  contacted: "default",
  qualified: "success",
  converted: "success",
  lost: "warning",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, page]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/admin/leads?${params}`);
      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (leadId: string, status: string) => {
    const response = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      setLeads(
        leads.map((lead) =>
          lead._id === leadId ? { ...lead, status } : lead
        )
      );
    }
  };

  if (isLoading && leads.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Manage inquiries from your contact form"
      />

      {/* Filters */}
      <Card variant="bordered" className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              placeholder="All statuses"
              options={[
                { value: "", label: "All statuses" },
                { value: "new", label: "New" },
                { value: "contacted", label: "Contacted" },
                { value: "qualified", label: "Qualified" },
                { value: "converted", label: "Converted" },
                { value: "lost", label: "Lost" },
              ]}
            />
          </div>
          {pagination && (
            <p className="text-sm text-slate-500">
              Showing {leads.length} of {pagination.total} leads
            </p>
          )}
        </div>
      </Card>

      {/* Leads List */}
      {leads.length === 0 ? (
        <Card variant="bordered">
          <div className="py-12 text-center text-slate-500">
            No leads found.
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead._id} variant="bordered">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                    <Badge variant={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {lead.company}
                    </span>
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <Mail className="h-4 w-4" />
                      {lead.email}
                    </a>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{lead.problemType}</Badge>
                    {lead.budgetRange && (
                      <Badge variant="outline">{lead.budgetRange}</Badge>
                    )}
                    <Badge variant="outline">{lead.timeline}</Badge>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                    {lead.message}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    options={[
                      { value: "new", label: "New" },
                      { value: "contacted", label: "Contacted" },
                      { value: "qualified", label: "Qualified" },
                      { value: "converted", label: "Converted" },
                      { value: "lost", label: "Lost" },
                    ]}
                    className="w-36"
                  />
                  <Link href={`/admin/leads/${lead._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
