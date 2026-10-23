import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold">
                HZ
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">Hadiya Zone</p>
                <p className="text-blue-400 text-sm">Youth & Sports Dept.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering youth, developing athletic talent, and building a
              stronger community across Hadiya Zone.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Youth Programs", href: "/youth" },
                { label: "Sports", href: "/sports" },
                { label: "News", href: "/news" },
                { label: "Events", href: "/events" },
                { label: "Achievements", href: "/achievements" },
                { label: "Gallery", href: "/gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  Hadiya Zone Youth & Sports Department
                  <br />
                  Hossana, SNNPR, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <span>+251 077 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>info@hadiyazone.gov.et</span>
              </li>
            </ul>
          </div>

          {/* About Dept */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Our Mission
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              To empower the youth of Hadiya Zone through comprehensive
              development programs, promote sports excellence, and foster
              community growth.
            </p>
            <div className="bg-primary-900 rounded-lg p-4 border border-primary-700">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">
                የሀዲያ ዞን
              </p>
              <p className="text-white text-sm font-medium">
                ወጣቶችና ስፖርት መምሪያ
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hadiya Zone Youth & Sports Department.
            All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
