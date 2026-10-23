import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import type { Sport } from "@/types";
import { resolveImageUrl } from "@/lib/image-url";

export default function SportsSection({ sports }: { sports: Sport[] }) {
  return (
    <section className="py-20 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-700 text-blue-300 text-xs font-semibold uppercase tracking-wide mb-4">
            Sports
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Promoting Sports Excellence
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Supporting athletes across multiple disciplines to achieve their
            highest potential.
          </p>
        </div>

        {sports.length === 0 ? (
          <div className="text-center py-12 text-blue-300">
            <Trophy size={48} className="mx-auto mb-3 opacity-30" />
            <p>No sports available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <div className="h-64">
                  <img
                    src={resolveImageUrl(
                      sport.image,
                      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600"
                    )}
                    alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {sport.name}
                  </h3>
                  <p className="text-gray-300 text-xs line-clamp-2">
                    {sport.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg"
          >
            Explore All Sports <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
