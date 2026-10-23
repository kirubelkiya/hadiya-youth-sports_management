"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",         href: "/"             },
  { label: "About",        href: "/about"         },
  { label: "Youth",        href: "/youth"         },
  { label: "Sports",       href: "/sports"        },
  { label: "News",         href: "/news"          },
  { label: "Events",       href: "/events"        },
  { label: "Achievements", href: "/achievements"  },
  { label: "Gallery",      href: "/gallery"       },
  { label: "Registration", href: "/registration"  },
  { label: "Contact",      href: "/contact"       },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prefetch all nav routes once on mount so navigation is instant
  useEffect(() => {
    navLinks.forEach(({ href }) => router.prefetch(href));
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const solidNav = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidNav ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
              HZ
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-bold text-sm leading-tight ${
                  solidNav ? "text-primary-800" : "text-white"
                }`}
              >
                Hadiya Zone
              </p>
              <p
                className={`text-xs ${
                  solidNav ? "text-gray-600" : "text-blue-100"
                }`}
              >
                Youth & Sports Dept.
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href === "/registration" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-gold-500 text-white"
                      : solidNav
                      ? "bg-gold-500 text-white hover:bg-gold-600"
                      : "bg-gold-500 text-white hover:bg-gold-600"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-primary-700 text-white"
                      : solidNav
                      ? "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Admin Button */}
          <div className="hidden lg:block">
            <Link
              href="/admin/login"
              prefetch={false}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                solidNav
                  ? "border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-primary-800"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              solidNav
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary-700 text-white"
                    : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              prefetch={false}
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-primary-700 border-2 border-primary-700 text-center mt-2 hover:bg-primary-700 hover:text-white transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
