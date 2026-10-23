"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Users,
  Trophy,
  Award,
  Image,
  LogOut,
  ChevronRight,
  Mail,
  ClipboardList,
  X,
} from "lucide-react";
import { logout, isAuthenticated } from "@/lib/auth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getContactMessagesApi } from "@/lib/api";

const navItems = [
  { label: "Dashboard",     href: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "News",          href: "/admin/news",         icon: Newspaper },
  { label: "Events",        href: "/admin/events",       icon: Calendar },
  { label: "Youth Programs",href: "/admin/youth",        icon: Users },
  { label: "Sports",        href: "/admin/sports",       icon: Trophy },
  { label: "Achievements",  href: "/admin/achievements", icon: Award },
  { label: "Gallery",       href: "/admin/gallery",      icon: Image },
  { label: "Registrations", href: "/admin/registrations",icon: ClipboardList },
  { label: "Messages",      href: "/admin/contact",      icon: Mail },
];

interface Props {
  mobileOpen?: boolean;
  onClose?: () => void;
}

// ── Nav items list — extracted so it's never re-created inside a render ──────
function NavList({
  pathname,
  unreadCount,
  onClose,
}: {
  pathname: string;
  unreadCount: number;
  onClose?: () => void;
}) {
  return (
    <div className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin/dashboard" &&
            pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-gold-500 text-white shadow-lg"
                : "text-blue-200 hover:bg-primary-700 hover:text-white"
            }`}
          >
            <item.icon size={18} className="flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.href === "/admin/contact" && unreadCount > 0 ? (
              <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {unreadCount}
              </span>
            ) : isActive ? (
              <ChevronRight size={14} />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

// ── Sidebar shell ─────────────────────────────────────────────────────────────
function SidebarShell({
  pathname,
  unreadCount,
  onClose,
  onLogout,
}: {
  pathname: string;
  unreadCount: number;
  onClose?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-primary-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              HZ
            </div>
            <div>
              <p className="text-white font-bold text-sm">Hadiya Zone</p>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-blue-300 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <NavList
          pathname={pathname}
          unreadCount={unreadCount}
          onClose={onClose}
        />
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-primary-700/50">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AdminSidebar({ mobileOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread messages — only when the user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) return;

    const load = () => {
      getContactMessagesApi()
        .then((res) => {
          const msgs = res.data.data as { is_read: number }[];
          setUnreadCount(msgs.filter((m) => !m.is_read).length);
        })
        .catch(() => {});
    };

    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-primary-900 h-full">
        <SidebarShell
          pathname={pathname}
          unreadCount={unreadCount}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-primary-900 z-50 flex flex-col lg:hidden">
            <SidebarShell
              pathname={pathname}
              unreadCount={unreadCount}
              onClose={onClose}
              onLogout={handleLogout}
            />
          </div>
        </>
      )}
    </>
  );
}
