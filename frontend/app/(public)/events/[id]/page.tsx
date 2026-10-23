import Link from "next/link";
import { Calendar, MapPin, ArrowLeft, CalendarDays } from "lucide-react";
import { fetchEventById } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";

export const revalidate = 60;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(Number(id));

  if (!event || !(event as any).id) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CalendarDays size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Event Not Found
          </h2>
          <Link href="/events" className="btn-primary mt-4 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <article className="bg-white rounded-2xl shadow-md overflow-hidden">
          {event.image && (
            <img
              src={resolveImageUrl(event.image)}
              alt={event.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          )}
          <div className="p-8">
            <span className="badge-gold mb-4 inline-block">Event</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-2 text-primary-700">
                <Calendar size={18} />
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Date
                  </p>
                  <p className="font-semibold text-sm">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-primary-700">
                <MapPin size={18} />
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Location
                  </p>
                  <p className="font-semibold text-sm">{event.location}</p>
                </div>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
