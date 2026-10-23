import Link from "next/link";
import { ArrowRight } from "lucide-react";

// No "use client" — fully static server component
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-gold-400 rounded-full" />
          <span className="text-sm font-medium text-gold-300">
            የሀዲያ ዞን ወጣቶችና ስፖርት መምሪያ
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
          Empowering{" "}
          <span className="text-gold-400">Youth</span>,<br />
          Developing{" "}
          <span className="text-gold-400">Talent</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">
          Building a stronger community in Hadiya Zone through comprehensive
          youth development programs, sports excellence, and community
          engagement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/youth" className="btn-gold text-base px-8 py-4 w-full sm:w-auto justify-center">
            Explore Youth Programs <ArrowRight size={18} />
          </Link>
          <Link href="/sports" className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center">
            View Sports
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "5,000+", label: "Youth Trained" },
            { value: "50+",    label: "Programs" },
            { value: "12+",    label: "Sports" },
            { value: "20+",    label: "Awards Won" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-2xl sm:text-3xl font-bold text-gold-400">{stat.value}</p>
              <p className="text-white/80 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
