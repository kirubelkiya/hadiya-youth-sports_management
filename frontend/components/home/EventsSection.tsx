import Link from "next/link";
import { ArrowRight, Calendar, MapPin, CalendarDays } from "lucide-react";
import type { Event } from "@/types";
import { resolveImageUrl } from "@/lib/image-url";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function EventsSection({ events }: { events: Event[] }) {
  return (
    <section className="py-20 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold uppercase tracking-wide mb-3">
              Upcoming Events
            </span>
            <h2 className="section-title">Don&apos;t Miss Out</h2>
          </div>
          <Link
            href="/events"
            className="text-primary-700 hover:text-primary-900 font-semibold text-sm flex items-center gap-1 whitespace-nowrap"
          >
            All Events <ArrowRight size={16} />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <CalendarDays size={48} className="mx-auto mb-3 opacity-30" />
            <p>No upcoming events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="card group bg-white overflow-hidden">
                <div className="relative overflow-hidden h-44">
                  <img
                    src={resolveImageUrl(
                      event.image,
                      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
                    )}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-gold-500 text-white rounded-lg px-3 py-1 text-xs font-bold">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <Calendar size={12} className="text-primary-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                    <MapPin size={12} className="text-primary-600" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Event Details <ArrowRight size={14} />
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
