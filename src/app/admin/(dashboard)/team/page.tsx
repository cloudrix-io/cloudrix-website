"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { PageHeader, DeleteDialog } from "@/components/admin";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  isActive: boolean;
}

export default function TeamMembersPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await fetch(`/api/admin/team/${deleteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTeamMembers(teamMembers.filter((m) => m._id !== deleteId));
    }
  };

  const toggleActive = async (member: TeamMember) => {
    const response = await fetch(`/api/admin/team/${member._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !member.isActive }),
    });

    if (response.ok) {
      setTeamMembers(
        teamMembers.map((m) =>
          m._id === member._id ? { ...m, isActive: !m.isActive } : m
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
        title="Team Members"
        description="Manage your team profile displayed on the website"
        action={{ label: "Add Team Member", href: "/admin/team/new" }}
      />

      <Card variant="bordered">
        {teamMembers.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No team members yet. Add your first team member to get started.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="flex items-center gap-4 p-4 hover:bg-slate-50"
              >
                <GripVertical className="h-5 w-5 cursor-grab text-slate-400" />

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{member.name}</h3>
                    <Badge variant={member.isActive ? "success" : "default"}>
                      {member.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(member)}
                  >
                    {member.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/admin/team/${member._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setDeleteId(member._id)}
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
        title="Delete Team Member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </div>
  );
}
