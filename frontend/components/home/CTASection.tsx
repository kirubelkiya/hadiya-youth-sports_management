import Link from "next/link";
import { ArrowRight, Users, Trophy, BookOpen } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-primary-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wide mb-6">
          Get Involved
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
          Be Part of Something Greater
        </h2>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-12">
          Join the Hadiya Zone movement — discover youth programs, support local
          sports, and help build a stronger community for future generations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {[
            {
              icon: Users,
              title: "Youth Programs",
              desc: "Explore programs designed to develop skills and leadership",
              href: "/youth",
            },
            {
              icon: Trophy,
              title: "Sports Activities",
              desc: "Discover sports events and competitions happening near you",
              href: "/sports",
            },
            {
              icon: BookOpen,
              title: "Learn More",
              desc: "Read about our department, mission, and objectives",
              href: "/about",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white/10 backdrop-blur hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all group text-center"
            >
              <item.icon className="w-10 h-10 text-gold-400 mx-auto mb-3" />
              <h3 className="text-white font-bold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-blue-200 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/youth" className="btn-gold px-8 py-4 text-base justify-center">
            Explore Youth Programs <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn-outline px-8 py-4 text-base justify-center">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
