import { createApi } from 'unsplash-js';

/**
 * Creates the Unsplash API client using the env variable.
 * Returns null if the access key is not configured.
 */
function getUnsplashClient() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!accessKey || accessKey === 'your_unsplash_access_key_here') {
    return null;
  }
  return createApi({ accessKey });
}

/**
 * Fetches relevant images from Unsplash for the given topic.
 * Returns an empty array if the API key is not configured or if the request fails.
 *
 * @param topic - Search query for images
 * @param count - Number of images to fetch (default: 5)
 */
export async function getRelevantImages(topic: string, count = 5): Promise<string[]> {
  const unsplash = getUnsplashClient();
  if (!unsplash) {
    console.warn(
      '[ImageGenerator] VITE_UNSPLASH_ACCESS_KEY is not set. Images will not be fetched.'
    );
    return [];
  }

  try {
    const result = await unsplash.search.getPhotos({
      query: topic,
      perPage: count,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('[ImageGenerator] Unsplash API errors:', result.errors);
      return [];
    }

    return result.response?.results.map((photo) => photo.urls.regular) ?? [];
  } catch (error) {
    console.error('[ImageGenerator] Failed to fetch images:', error);
    return [];
  }
}