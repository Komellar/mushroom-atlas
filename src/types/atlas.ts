export type Edibility = 'edible' | 'inedible' | 'poisonous';
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Hymenophore = 'pores' | 'gills' | 'ridges' | 'teeth' | 'internal';

export interface ContentReference {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessedAt: string;
}

export interface SimilarSpecies {
  mushroomId?: string;
  polishName: string;
  scientificName: string;
  difference: string;
}

export interface Mushroom {
  id: string;
  polishName: string;
  scientificName: string;
  scientificSynonyms?: string[];
  synonyms: string[];
  edibility: Edibility;
  edibilityNote: string;
  keyFeatures: string[];
  identificationTips: string[];
  cap: string;
  stem: string;
  hymenophore: { type: Hymenophore; description: string };
  flesh: string;
  damageReaction: string;
  habitat: string;
  occurrenceMonths: Month[];
  occurrenceNote: string;
  similarSpecies: SimilarSpecies[];
  photoIds: string[];
  referenceIds: string[];
  datasetVersion: string;
  reviewedAt: string;
  reviewStatus: 'source-checked' | 'expert-reviewed';
}

export interface MushroomPhoto {
  id: string;
  mushroomId: string;
  assetPath: string;
  thumbnailPath: string;
  thumbnailSha256: string;
  thumbnailModifications: string;
  caption: string;
  perspective: 'whole' | 'cap' | 'underside' | 'stem' | 'cross-section';
  stage: 'young' | 'mature' | 'mixed';
  author: string;
  sourceUrl: string;
  originalUrl: string;
  downloadUrl: string;
  license: string;
  licenseUrl: string;
  modifications: string;
  sourceTaxon: string;
  identificationStatus: 'source-checked' | 'expert-reviewed';
  checkedAt: string;
  sha256: string;
}

export interface PairDifference {
  id: string;
  mushroomIds: [string, string];
  differences: { feature: string; values: [string, string] }[];
  referenceIds: string[];
  note?: string;
  reviewedAt: string;
  reviewStatus: 'source-checked' | 'expert-reviewed';
}

export interface AtlasMetadata {
  version: string;
  updatedAt: string;
  expertReviewStatus: 'pending' | 'complete';
  references: ContentReference[];
}
