"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderKanban,
  Building2,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Pages", href: "/admin/pages", icon: FileText },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Case Studies", href: "/admin/case-studies", icon: FolderKanban },
  { name: "Company Info", href: "/admin/company", icon: Building2 },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Leads", href: "/admin/leads", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth/me");
        const data = await response.json();

        if (!response.ok) {
          router.push("/admin/login");
          return;
        }

        setUser(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/admin" className="text-xl font-bold text-white">
              Cloudrix Admin
            </Link>
            <button
              className="rounded p-1 text-slate-400 hover:bg-slate-800 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="border-t border-slate-700 p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-8">
          <button
            className="rounded p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="text-slate-500 hover:text-slate-700">
              Admin
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">
                  {navigation.find((n) => n.href === pathname)?.name ||
                    pathname.split("/").pop()}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
