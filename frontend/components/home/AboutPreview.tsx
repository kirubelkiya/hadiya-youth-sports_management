import Link from "next/link";
import { ArrowRight, Target, Eye, Users } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"
                alt="About the Department"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-gold-400 font-semibold text-sm uppercase tracking-wide">
                  Est. Hadiya Zone
                </p>
                <p className="text-2xl font-bold mt-1">
                  Youth & Sports Department
                </p>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -right-4 top-10 bg-primary-700 text-white rounded-xl shadow-xl p-5 hidden lg:block">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-blue-200 text-sm">Years of Service</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
              About Us
            </span>
            <h2 className="section-title mb-5">
              Dedicated to Youth Excellence & Sports Development
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Hadiya Zone Youth and Sports Department is a government body
              responsible for overseeing youth development, sports promotion,
              and community engagement programs across all woredas of Hadiya
              Zone, Southern Ethiopia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We are committed to creating an environment where young people can
              grow, develop their potential, and contribute meaningfully to
              their communities through structured programs and sporting
              excellence.
            </p>

            {/* Key points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Target, label: "Mission", desc: "Empowering youth through comprehensive development" },
                { icon: Eye, label: "Vision", desc: "A thriving youth community leading positive change" },
                { icon: Users, label: "Community", desc: "Serving all woredas across Hadiya Zone" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                  <item.icon className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Read More About Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
