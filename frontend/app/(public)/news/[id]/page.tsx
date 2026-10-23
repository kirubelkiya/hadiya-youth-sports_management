import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Newspaper } from "lucide-react";
import { fetchNewsById } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";

export const revalidate = 60;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await fetchNewsById(Number(id));

  if (!news || !(news as any).id) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Newspaper size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            News Not Found
          </h2>
          <Link href="/news" className="btn-primary mt-4 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft size={16} /> Back to News
        </Link>

        <article className="bg-white rounded-2xl shadow-md overflow-hidden">
          {news.image && (
            <img
              src={resolveImageUrl(news.image)}
              alt={news.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-green">{news.category}</span>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Calendar size={14} />
                <span>{formatDate(news.published_date)}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>
            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap"
            >
              {news.description}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
