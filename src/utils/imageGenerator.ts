// Created by Atharv Hatwar
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'YOUR_UNSPLASH_ACCESS_KEY',
});

export async function getRelevantImages(topic: string, count: number = 3): Promise<string[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query: topic,
      perPage: count,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Error fetching images:', result.errors);
      return [];
    }

    return result.response.results.map(photo => photo.urls.regular);
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}