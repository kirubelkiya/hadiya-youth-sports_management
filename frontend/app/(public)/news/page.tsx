import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { fetchNews } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";
import type { News } from "@/types";

export const metadata = {
  title: "News | Hadiya Zone Youth & Sports Department",
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function NewsPage() {
  const news = await fetchNews();

  return (
    <div className="pt-16">
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">
            News
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Latest News</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Stay updated with the latest news, announcements, and stories from
            the Hadiya Zone Youth and Sports Department.
          </p>
        </div>
      </div>

      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Newspaper size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No News Yet</h3>
              <p>Check back soon for the latest updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item: News) => (
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
                      <span className="badge-green">{item.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Calendar size={12} />
                      <span>{formatDate(item.published_date)}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
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
    </div>
  );
}
