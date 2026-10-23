/**
 * Server-side only fetch helpers — no axios, no cookies.
 * Used in Server Components (pages that don't need "use client").
 * Data is fetched on the server so the page HTML is fully rendered
 * before it reaches the browser — zero loading flash.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Revalidate every 60 seconds (ISR) — change to 0 for no cache
const OPTS: RequestInit = { next: { revalidate: 60 } };

async function get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  try {
    const res = await fetch(url.toString(), OPTS);
    if (!res.ok) return [] as T;
    const json = await res.json();
    return json.data as T;
  } catch {
    return [] as T;
  }
}

import type {
  News, Event, YouthProgram, Sport, Achievement, GalleryItem
} from '@/types';

export const fetchNews        = (limit?: number) => get<News[]>('/news', limit ? { limit } : undefined);
export const fetchNewsById    = (id: number)     => get<News>(`/news/${id}`);
export const fetchEvents      = (limit?: number) => get<Event[]>('/events', limit ? { limit } : undefined);
export const fetchEventById   = (id: number)     => get<Event>(`/events/${id}`);
export const fetchYouth       = (limit?: number) => get<YouthProgram[]>('/youth-programs', limit ? { limit } : undefined);
export const fetchSports      = (limit?: number) => get<Sport[]>('/sports', limit ? { limit } : undefined);
export const fetchAchievements= (limit?: number) => get<Achievement[]>('/achievements', limit ? { limit } : undefined);
export const fetchGallery     = (category?: string) =>
  get<GalleryItem[]>('/gallery', category && category !== 'all' ? { category } : undefined);
