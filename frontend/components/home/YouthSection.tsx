import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import type { YouthProgram } from "@/types";
import { resolveImageUrl } from "@/lib/image-url";

export default function YouthSection({
  programs,
}: {
  programs: YouthProgram[];
}) {
  return (
    <section className="py-20 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
            Youth Programs
          </span>
          <h2 className="section-title">Developing Tomorrow&apos;s Leaders</h2>
          <p className="section-subtitle">
            Comprehensive programs designed to empower youth with skills,
            knowledge, and opportunities for personal and professional growth.
          </p>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users size={48} className="mx-auto mb-3 opacity-30" />
            <p>No programs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="card group">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={resolveImageUrl(
                      program.image,
                      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
                    )}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {program.description}
                  </p>
                  <Link
                    href="/youth"
                    className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/youth" className="btn-primary">
            View All Youth Programs <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
