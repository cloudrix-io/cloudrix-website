"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  FolderKanban,
  Users,
  Mail,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card, Badge } from "@/components/ui";

interface DashboardStats {
  services: number;
  caseStudies: number;
  teamMembers: number;
  leads: {
    total: number;
    new: number;
  };
}

interface Lead {
  _id: string;
  name: string;
  company: string;
  email: string;
  problemType: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, caseStudiesRes, teamRes, leadsRes] =
          await Promise.all([
            fetch("/api/admin/services"),
            fetch("/api/admin/case-studies"),
            fetch("/api/admin/team"),
            fetch("/api/admin/leads?limit=5"),
          ]);

        const [services, caseStudies, team, leads] = await Promise.all([
          servicesRes.json(),
          caseStudiesRes.json(),
          teamRes.json(),
          leadsRes.json(),
        ]);

        setStats({
          services: services.data?.length || 0,
          caseStudies: caseStudies.data?.length || 0,
          teamMembers: team.data?.length || 0,
          leads: {
            total: leads.pagination?.total || 0,
            new:
              leads.data?.filter((l: Lead) => l.status === "new").length || 0,
          },
        });

        setRecentLeads(leads.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    {
      name: "Services",
      value: stats?.services || 0,
      icon: Briefcase,
      href: "/admin/services",
      color: "blue",
    },
    {
      name: "Case Studies",
      value: stats?.caseStudies || 0,
      icon: FolderKanban,
      href: "/admin/case-studies",
      color: "green",
    },
    {
      name: "Team Members",
      value: stats?.teamMembers || 0,
      icon: Users,
      href: "/admin/team",
      color: "purple",
    },
    {
      name: "New Leads",
      value: stats?.leads.new || 0,
      total: stats?.leads.total || 0,
      icon: Mail,
      href: "/admin/leads",
      color: "amber",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-600">
          Overview of your website content and leads
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card
              variant="bordered"
              className="transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.name}</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  {stat.total !== undefined && (
                    <p className="mt-1 text-xs text-slate-400">
                      of {stat.total} total
                    </p>
                  )}
                </div>
                <div
                  className={`rounded-lg p-2 bg-${stat.color}-100 text-${stat.color}-600`}
                  style={{
                    backgroundColor:
                      stat.color === "blue"
                        ? "#dbeafe"
                        : stat.color === "green"
                          ? "#dcfce7"
                          : stat.color === "purple"
                            ? "#f3e8ff"
                            : "#fef3c7",
                    color:
                      stat.color === "blue"
                        ? "#2563eb"
                        : stat.color === "green"
                          ? "#16a34a"
                          : stat.color === "purple"
                            ? "#9333ea"
                            : "#d97706",
                  }}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <Card variant="bordered">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="py-8 text-center text-slate-500">No leads yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left text-xs font-medium uppercase text-slate-500">
                    Name
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-slate-500">
                    Company
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-slate-500">
                    Problem
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-slate-500">
                    Status
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50">
                    <td className="py-3">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="font-medium text-slate-900 hover:text-blue-600"
                      >
                        {lead.name}
                      </Link>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </td>
                    <td className="py-3 text-sm text-slate-600">
                      {lead.company}
                    </td>
                    <td className="py-3 text-sm text-slate-600">
                      {lead.problemType}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          lead.status === "new"
                            ? "primary"
                            : lead.status === "contacted"
                              ? "default"
                              : lead.status === "qualified"
                                ? "success"
                                : lead.status === "converted"
                                  ? "success"
                                  : "warning"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/services">
          <Card
            variant="bordered"
            className="flex items-center gap-4 transition-all hover:border-blue-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-blue-100 p-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Manage Services</h3>
              <p className="text-sm text-slate-500">
                Add, edit, or remove services
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/case-studies">
          <Card
            variant="bordered"
            className="flex items-center gap-4 transition-all hover:border-blue-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-green-100 p-3">
              <FolderKanban className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Case Studies</h3>
              <p className="text-sm text-slate-500">
                Showcase your best work
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/company">
          <Card
            variant="bordered"
            className="flex items-center gap-4 transition-all hover:border-blue-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Company Info</h3>
              <p className="text-sm text-slate-500">
                Update your company details
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
