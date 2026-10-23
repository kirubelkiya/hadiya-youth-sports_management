import Link from "next/link";
import { Calendar, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { fetchEvents } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";
import type { Event } from "@/types";

export const metadata = {
  title: "Events | Hadiya Zone Youth & Sports Department",
};

export const revalidate = 60;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div className="pt-16">
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">
            Events
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Upcoming Events
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Explore all upcoming events, competitions, and activities organized
            by the Hadiya Zone Youth and Sports Department.
          </p>
        </div>
      </div>

      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <CalendarDays size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
              <p>Check back soon for new events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event: Event) => (
                <div key={event.id} className="card group flex overflow-hidden">
                  <div className="relative overflow-hidden w-48 flex-shrink-0 hidden sm:block">
                    <img
                      src={resolveImageUrl(
                        event.image,
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
                      )}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary-900/30" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-gold-700 text-xs font-semibold uppercase mb-2">
                        <Calendar size={12} />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={12} className="text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm hover:gap-3 transition-all mt-4"
                    >
                      View Details <ArrowRight size={14} />
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
