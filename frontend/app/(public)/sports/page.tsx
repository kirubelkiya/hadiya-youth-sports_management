import { Trophy, Star, Zap } from "lucide-react";
import { fetchSports } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";
import type { Sport } from "@/types";

export const metadata = {
  title: "Sports | Hadiya Zone Youth & Sports Department",
};

export const revalidate = 60;

export default async function SportsPage() {
  const sports = await fetchSports();

  return (
    <div className="pt-16">
      {/* Banner */}
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">
            Sports
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sports in Hadiya Zone
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Fostering athletic excellence, healthy competition, and community
            spirit through a diverse range of sports across the zone.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "12+", label: "Sports Disciplines" },
              { value: "50+", label: "Competitions/Year" },
              { value: "2,000+", label: "Registered Athletes" },
              { value: "20+", label: "Trophies Won" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary-700">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports List */}
      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-green mb-4">Our Sports</span>
            <h2 className="section-title">Sports We Support</h2>
          </div>

          {sports.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Trophy size={48} className="mx-auto mb-3 opacity-30" />
              <p>No sports listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sports.map((sport: Sport) => (
                <div key={sport.id} className="card group">
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={resolveImageUrl(
                        sport.image,
                        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600"
                      )}
                      alt={sport.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-xl">
                        {sport.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {sport.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Competitions */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Competitions & Events</h2>
            <p className="text-blue-200">
              We organize and participate in competitions at all levels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Inter-Woreda Leagues",
                desc: "Regular leagues and tournaments between woredas across the zone",
              },
              {
                icon: Star,
                title: "Regional Championships",
                desc: "Representing Hadiya Zone at SNNPR regional championships",
              },
              {
                icon: Trophy,
                title: "National Competitions",
                desc: "Sending our best athletes to compete at national level",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-primary-700/60 rounded-xl p-6 border border-primary-600/30 text-center"
              >
                <item.icon className="w-10 h-10 text-gold-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
