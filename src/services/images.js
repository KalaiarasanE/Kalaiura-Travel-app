/* ==============================================================================
   AERORA — IMAGE RESOLUTION SERVICE
   Curated photography engine with dynamic fallback resilience
   ============================================================================== */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop';
const FALLBACK_LANDMARK = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop';

/**
 * Image cache to avoid duplicate network lookups
 */
const imageCache = new Map();

/**
 * Resolves a destination or landmark image URL with caching and fallbacks
 */
export async function fetchEditorialImage(query, orientation = 'landscape') {
  if (!query) return FALLBACK_HERO;

  const cacheKey = `${query}_${orientation}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  if (accessKey) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&orientation=${orientation}&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const resolved = data.results[0].urls.regular;
          imageCache.set(cacheKey, resolved);
          return resolved;
        }
      }
    } catch (err) {
      console.warn('AERORA Image Service: Unsplash query fallback activated', err);
    }
  }

  // Graceful curated fallback
  const fallback = orientation === 'portrait' ? FALLBACK_LANDMARK : FALLBACK_HERO;
  imageCache.set(cacheKey, fallback);
  return fallback;
}

export function getFallbackImage(type = 'hero') {
  return type === 'hero' ? FALLBACK_HERO : FALLBACK_LANDMARK;
}
