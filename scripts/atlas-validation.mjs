const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const validDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && !Number.isNaN(Date.parse(value));
const validUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

export function validateAtlas({ metadata, mushrooms, photos, pairs }) {
  const errors = [];
  const check = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const uniqueIds = (items, kind) => {
    const ids = items.map((item) => item.id);
    check(
      ids.every((id) => typeof id === 'string' && /^[a-z0-9]+(?:[-][a-z0-9]+)*$/.test(id)),
      `${kind}: invalid ID`,
    );
    check(new Set(ids).size === ids.length, `${kind}: duplicate ID`);
    return new Set(ids);
  };
  if (
    !metadata ||
    !Array.isArray(mushrooms) ||
    !Array.isArray(photos) ||
    !Array.isArray(pairs) ||
    !Array.isArray(metadata.references)
  )
    return ['Invalid dataset structure'];
  check(/^\d+\.\d+\.\d+$/.test(metadata.version ?? ''), 'Invalid dataset version');
  check(validDate(metadata.updatedAt), 'Invalid dataset date');
  check(
    ['pending', 'complete'].includes(metadata.expertReviewStatus),
    'Invalid expert review status',
  );
  const speciesIds = uniqueIds(mushrooms, 'Species');
  const photoIds = uniqueIds(photos, 'Photos');
  const referenceIds = uniqueIds(metadata.references, 'References');
  const referencedPhotos = new Set();
  const pairKeys = new Set();
  const references = (ids, label) =>
    check(
      Array.isArray(ids) &&
        ids.length > 0 &&
        new Set(ids).size === ids.length &&
        ids.every((id) => referenceIds.has(id)),
      `${label}: invalid references`,
    );
  const review = (item, label) => {
    check(validDate(item.reviewedAt), `${label}: invalid review date`);
    check(
      ['source-checked', 'expert-reviewed'].includes(item.reviewStatus),
      `${label}: invalid review status`,
    );
  };
  for (const reference of metadata.references) {
    check(
      nonempty(reference.title) &&
        nonempty(reference.publisher) &&
        validUrl(reference.url) &&
        validDate(reference.accessedAt),
      `${reference.id}: invalid reference metadata`,
    );
  }
  for (const mushroom of mushrooms) {
    const label = mushroom.id;
    for (const key of [
      'polishName',
      'scientificName',
      'edibilityNote',
      'cap',
      'stem',
      'flesh',
      'damageReaction',
      'habitat',
      'occurrenceNote',
    ])
      check(nonempty(mushroom[key]), `${label}: missing ${key}`);
    check(
      Array.isArray(mushroom.synonyms) && mushroom.synonyms.every(nonempty),
      `${label}: invalid synonyms`,
    );
    check(
      mushroom.scientificSynonyms === undefined ||
        (Array.isArray(mushroom.scientificSynonyms) && mushroom.scientificSynonyms.every(nonempty)),
      `${label}: invalid scientific synonyms`,
    );
    check(
      ['edible', 'inedible', 'poisonous'].includes(mushroom.edibility),
      `${label}: invalid edibility`,
    );
    check(
      ['pores', 'gills', 'ridges', 'teeth', 'internal'].includes(mushroom.hymenophore?.type) &&
        nonempty(mushroom.hymenophore?.description),
      `${label}: invalid hymenophore`,
    );
    for (const key of ['keyFeatures', 'identificationTips'])
      check(
        Array.isArray(mushroom[key]) && mushroom[key].length >= 2 && mushroom[key].every(nonempty),
        `${label}: invalid ${key}`,
      );
    check(
      Array.isArray(mushroom.occurrenceMonths) &&
        mushroom.occurrenceMonths.length > 0 &&
        new Set(mushroom.occurrenceMonths).size === mushroom.occurrenceMonths.length &&
        mushroom.occurrenceMonths.every(
          (month) => Number.isInteger(month) && month >= 1 && month <= 12,
        ),
      `${label}: invalid occurrence months`,
    );
    check(mushroom.datasetVersion === metadata.version, `${label}: dataset version mismatch`);
    references(mushroom.referenceIds, label);
    review(mushroom, label);
    check(
      Array.isArray(mushroom.photoIds) &&
        mushroom.photoIds.length >= 2 &&
        new Set(mushroom.photoIds).size === mushroom.photoIds.length,
      `${label}: needs at least two unique photos`,
    );
    for (const id of mushroom.photoIds ?? []) {
      check(photoIds.has(id), `${label}: unknown photo ${id}`);
      check(
        photos.find((photo) => photo.id === id)?.mushroomId === label,
        `${label}: photo owner mismatch ${id}`,
      );
      referencedPhotos.add(id);
    }
    check(Array.isArray(mushroom.similarSpecies), `${label}: invalid similar species`);
    for (const similar of mushroom.similarSpecies ?? []) {
      check(
        nonempty(similar.polishName) &&
          nonempty(similar.scientificName) &&
          nonempty(similar.difference),
        `${label}: incomplete similar species`,
      );
      if (similar.mushroomId) {
        const target = mushrooms.find((species) => species.id === similar.mushroomId);
        check(
          speciesIds.has(similar.mushroomId) &&
            similar.mushroomId !== label &&
            target?.scientificName === similar.scientificName &&
            target?.polishName === similar.polishName,
          `${label}: invalid similar species reference`,
        );
      }
    }
  }
  for (const photo of photos) {
    check(
      speciesIds.has(photo.mushroomId) && referencedPhotos.has(photo.id),
      `${photo.id}: orphan photo`,
    );
    const owner = mushrooms.find((mushroom) => mushroom.id === photo.mushroomId);
    check(
      [owner?.scientificName, ...(owner?.scientificSynonyms ?? [])].includes(photo.sourceTaxon),
      `${photo.id}: source taxon mismatch`,
    );
    check(
      photo.assetPath === `assets/mushrooms/${photo.id}.jpg`,
      `${photo.id}: invalid asset path`,
    );
    check(
      photo.thumbnailPath === `assets/mushrooms/thumbnails/${photo.id}.jpg`,
      `${photo.id}: invalid thumbnail path`,
    );
    check(
      /^[a-f0-9]{64}$/.test(photo.thumbnailSha256 ?? ''),
      `${photo.id}: invalid thumbnail SHA-256`,
    );
    check(nonempty(photo.thumbnailModifications), `${photo.id}: missing thumbnail modifications`);
    for (const key of ['caption', 'author', 'license', 'modifications'])
      check(nonempty(photo[key]), `${photo.id}: missing ${key}`);
    for (const key of ['sourceUrl', 'originalUrl', 'downloadUrl', 'licenseUrl'])
      check(validUrl(photo[key]), `${photo.id}: invalid ${key}`);
    check(
      ['whole', 'cap', 'underside', 'stem', 'cross-section'].includes(photo.perspective) &&
        ['young', 'mature', 'mixed'].includes(photo.stage),
      `${photo.id}: invalid view/stage`,
    );
    check(
      ['source-checked', 'expert-reviewed'].includes(photo.identificationStatus) &&
        validDate(photo.checkedAt),
      `${photo.id}: invalid identification review`,
    );
    check(/^[a-f0-9]{64}$/.test(photo.sha256 ?? ''), `${photo.id}: invalid SHA-256`);
  }
  for (const pair of pairs) {
    const label = pair.id;
    check(
      Array.isArray(pair.mushroomIds) &&
        pair.mushroomIds.length === 2 &&
        pair.mushroomIds.every((id) => speciesIds.has(id)) &&
        pair.mushroomIds[0] !== pair.mushroomIds[1],
      `${label}: invalid pair members`,
    );
    const key = [...(pair.mushroomIds ?? [])].sort().join('--');
    check(label === key && !pairKeys.has(key), `${label}: duplicate or noncanonical pair`);
    pairKeys.add(key);
    check(
      Array.isArray(pair.differences) &&
        pair.differences.length > 0 &&
        pair.differences.every(
          (difference) =>
            nonempty(difference.feature) &&
            Array.isArray(difference.values) &&
            difference.values.length === 2 &&
            difference.values.every(nonempty),
        ),
      `${label}: invalid differences`,
    );
    references(pair.referenceIds, label);
    check(pair.note === undefined || nonempty(pair.note), `${label}: invalid pair note`);
    review(pair, label);
  }
  if (metadata.expertReviewStatus === 'complete')
    check(
      mushrooms.every((item) => item.reviewStatus === 'expert-reviewed') &&
        pairs.every((item) => item.reviewStatus === 'expert-reviewed') &&
        photos.every((item) => item.identificationStatus === 'expert-reviewed'),
      'Expert review is incomplete',
    );
  return errors;
}
