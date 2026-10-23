import Link from "next/link";
import { ArrowRight, Trophy, Award } from "lucide-react";
import type { Achievement } from "@/types";

export default function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <section className="py-20 bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wide mb-4">
            Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Our Pride & Success
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Celebrating milestones that reflect the dedication and hard work of
            our youth and athletes.
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center py-12 text-blue-300">
            <Trophy size={48} className="mx-auto mb-3 opacity-30" />
            <p>No achievements listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-primary-700/60 backdrop-blur border border-primary-600/50 rounded-xl p-6 hover:bg-primary-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="text-gold-400 w-8 h-8" />
                  <span className="text-gold-400 text-sm font-bold bg-gold-500/20 px-2 py-1 rounded">
                    {achievement.year}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mb-2 line-clamp-2">
                  {achievement.title}
                </h3>
                <p className="text-blue-200 text-sm line-clamp-3">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg"
          >
            View All Achievements <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
