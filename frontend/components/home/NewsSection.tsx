import Link from "next/link";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import type { News } from "@/types";
import { resolveImageUrl } from "@/lib/image-url";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function NewsSection({ news }: { news: News[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-3">
              Latest News
            </span>
            <h2 className="section-title">Stay Informed</h2>
          </div>
          <Link
            href="/news"
            className="text-primary-700 hover:text-primary-900 font-semibold text-sm flex items-center gap-1 whitespace-nowrap"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Newspaper size={48} className="mx-auto mb-3 opacity-30" />
            <p>No news available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="card group flex flex-col">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={resolveImageUrl(
                      item.image,
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"
                    )}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge-green text-xs">{item.category}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{formatDate(item.published_date)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors flex-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm hover:gap-3 transition-all mt-auto"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
