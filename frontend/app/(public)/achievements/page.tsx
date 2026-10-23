import { Award, Trophy } from "lucide-react";
import { fetchAchievements } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";
import type { Achievement } from "@/types";

export const metadata = {
  title: "Achievements | Hadiya Zone Youth & Sports Department",
};

export const revalidate = 60;

export default async function AchievementsPage() {
  const achievements = await fetchAchievements();

  // Group by year on the server
  const grouped = achievements.reduce<Record<number, Achievement[]>>((acc, a) => {
    if (!acc[a.year]) acc[a.year] = [];
    acc[a.year].push(a);
    return acc;
  }, {});
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <div className="pt-16">
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">
            Achievements
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Achievements
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Celebrating the milestones, awards, and successes that reflect our
            department&apos;s commitment to excellence.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {achievements.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Trophy size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No Achievements Yet</h3>
              <p>Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {years.map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary-700 text-white text-lg font-bold px-5 py-2 rounded-full">
                      {year}
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grouped[year].map((achievement) => (
                      <div key={achievement.id} className="card group flex flex-col">
                        {achievement.image && (
                          <div className="overflow-hidden h-44">
                            <img
                              src={resolveImageUrl(achievement.image)}
                              alt={achievement.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="text-gold-500 w-5 h-5 flex-shrink-0" />
                            <span className="text-gold-700 text-xs font-bold uppercase tracking-wide">
                              {achievement.year}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
