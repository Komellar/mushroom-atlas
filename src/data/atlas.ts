import metadataJson from './metadata.json';
import mushroomsJson from './mushrooms.json';
import pairsJson from './pairs.json';
import photosJson from './photos.json';

import type { AtlasMetadata, Mushroom, MushroomPhoto, PairDifference } from '@/types/atlas';

// The JSON files are checked by validate:data before checks and bundle exports.
export const atlasMetadata = metadataJson as AtlasMetadata;
export const mushrooms = mushroomsJson as Mushroom[];
export const photos = photosJson as MushroomPhoto[];
export const pairs = pairsJson as PairDifference[];

export function getMushroom(id: string | undefined) {
  return mushrooms.find((mushroom) => mushroom.id === id);
}

export function getPhoto(id: string) {
  return photos.find((photo) => photo.id === id);
}

export function getPair(firstId: string, secondId: string) {
  if (firstId === secondId) return undefined;
  return pairs.find(
    (pair) => pair.mushroomIds.includes(firstId) && pair.mushroomIds.includes(secondId),
  );
}
