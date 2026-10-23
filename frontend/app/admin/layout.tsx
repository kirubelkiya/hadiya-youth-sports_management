"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAuthenticated, getUser } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      // Keep checking=true so nothing renders while redirecting
      return;
    }
    setUser(getUser());
    setChecking(false);
  }, [pathname, router]);

  // Login page — render children directly (login page handles its own layout)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Still checking auth — show blank screen to prevent flash
  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-700 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 transition-colors"
            >
              <ExternalLink size={14} />
              View Site
            </Link>
            {user && (
              <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-lg">
                <div className="w-7 h-7 bg-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || "A"}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
