"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper, Calendar, Users, Trophy, Award, Image,
  TrendingUp, ArrowRight, BarChart3
} from "lucide-react";
import { getDashboardStatsApi } from "@/lib/api";
import type { DashboardStats, News, Event } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStatsApi()
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total News", value: stats.stats.news, icon: Newspaper, color: "bg-blue-500", href: "/admin/news" },
        { label: "Total Events", value: stats.stats.events, icon: Calendar, color: "bg-purple-500", href: "/admin/events" },
        { label: "Youth Programs", value: stats.stats.youthPrograms, icon: Users, color: "bg-green-500", href: "/admin/youth" },
        { label: "Sports", value: stats.stats.sports, icon: Trophy, color: "bg-yellow-500", href: "/admin/sports" },
        { label: "Achievements", value: stats.stats.achievements, icon: Award, color: "bg-gold-500", href: "/admin/achievements" },
        { label: "Gallery Items", value: stats.stats.gallery, icon: Image, color: "bg-pink-500", href: "/admin/gallery" },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s an overview of your website content.
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl h-28 animate-pulse shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="admin-card hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                {card.value}
              </p>
              <p className="text-gray-500 text-xs mt-1">{card.label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Recent News & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent News */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-500" />
              Recent News
            </h2>
            <Link
              href="/admin/news"
              className="text-primary-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : !stats?.recentNews?.length ? (
            <div className="text-center py-6 text-gray-400">
              <Newspaper size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No news yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.recentNews.map((item: News) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                      item.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Upcoming Events
            </h2>
            <Link
              href="/admin/events"
              className="text-primary-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : !stats?.upcomingEvents?.length ? (
            <div className="text-center py-6 text-gray-400">
              <Calendar size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No upcoming events.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.upcomingEvents.map((event: Event) => (
                <div key={event.id} className="py-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(event.date).toLocaleDateString()} · {event.location}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Add News", href: "/admin/news/new", icon: Newspaper, color: "text-blue-600 bg-blue-50" },
            { label: "Add Event", href: "/admin/events/new", icon: Calendar, color: "text-purple-600 bg-purple-50" },
            { label: "Add Program", href: "/admin/youth/new", icon: Users, color: "text-primary-600 bg-primary-50" },
            { label: "Add Sport", href: "/admin/sports/new", icon: Trophy, color: "text-yellow-600 bg-yellow-50" },
            { label: "Add Achievement", href: "/admin/achievements/new", icon: Award, color: "text-orange-600 bg-orange-50" },
            { label: "Add Gallery", href: "/admin/gallery/new", icon: Image, color: "text-pink-600 bg-pink-50" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} hover:opacity-80 transition-all text-center`}
            >
              <action.icon size={22} />
              <span className="text-xs font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
