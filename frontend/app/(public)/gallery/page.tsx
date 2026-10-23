"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Video } from "lucide-react";
import { getGalleryApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/image-url";
import type { GalleryItem } from "@/types";

const CATEGORIES = ["all", "youth", "sports", "events"];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "photo" | "video">("all");

  useEffect(() => {
    getGalleryApi(activeCategory !== "all" ? activeCategory : undefined)
      .then((res) => setItems(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const filtered = items.filter((item) =>
    activeTab === "all" ? true : item.media_type === activeTab
  );

  return (
    <div className="pt-16">
      <div
        className="relative py-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">Gallery</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Photo & Video Gallery</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            A visual journey through our programs, events, sports, and community activities.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Media type tabs */}
          <div className="flex items-center gap-2 mb-6">
            {(["all", "photo", "video"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all capitalize ${
                  activeTab === tab
                    ? "bg-primary-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab === "photo" ? "Photos" : tab === "video" ? "Videos" : "All"}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLoading(true);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-gold-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-52 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No Items Found</h3>
              <p>Try a different category or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden shadow-md bg-gray-100"
                >
                  {item.media_type === "photo" ? (
                    <>
                      <img
                        src={resolveImageUrl(item.media_url)}
                        alt={item.title}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                        <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white font-medium text-sm line-clamp-2">{item.title}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-52 bg-primary-900 flex flex-col items-center justify-center gap-2">
                        <Video className="w-10 h-10 text-gold-400" />
                        <p className="text-white text-xs font-medium px-2 text-center line-clamp-2">{item.title}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href={item.media_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-gold-500/90 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </a>
                      </div>
                    </>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded capitalize">
                      {item.category}
                    </span>
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
