/**
 * Resolves any image value stored in the DB to a full displayable URL.
 *
 * - "/uploads/xxx.jpg"  → "http://localhost:5000/uploads/xxx.jpg"
 * - "https://..."       → unchanged (external URL)
 * - "" / null / undefined → fallback image
 */
const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
    /\/api$/,
    ""
  );

export function resolveImageUrl(
  url: string | null | undefined,
  fallback = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600"
): string {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  // Local upload path like /uploads/xxx.jpg
  return `${API_BASE}${url}`;
}
