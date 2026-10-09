import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validateAtlas } from './atlas-validation.mjs';

const load = (name) =>
  JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'));
const dataset = {
  metadata: load('metadata'),
  mushrooms: load('mushrooms'),
  photos: load('photos'),
  pairs: load('pairs'),
};
test('The bundled dataset satisfies the schema', () =>
  assert.deepEqual(validateAtlas(dataset), []));
test('Accepts a documented scientific synonym in photo source taxonomy', () => {
  const data = structuredClone(dataset);
  const owner = data.mushrooms.find((item) => item.id === 'imleria-badia');
  const photo = data.photos.find((item) => item.mushroomId === owner.id);
  photo.sourceTaxon = 'Boletus badius';
  assert.deepEqual(validateAtlas(data), []);
});
const mutations = [
  [
    'invalid thumbnail metadata',
    (data) => {
      data.photos[0].thumbnailPath = 'remote.jpg';
    },
    'invalid thumbnail path',
  ],
  [
    'invalid thumbnail hash',
    (data) => {
      data.photos[0].thumbnailSha256 = '';
    },
    'invalid thumbnail SHA-256',
  ],
  [
    'invalid scientific synonyms',
    (data) => {
      data.mushrooms[0].scientificSynonyms = [''];
    },
    'invalid scientific synonyms',
  ],
  [
    'duplicate species IDs',
    (data) => data.mushrooms.push(structuredClone(data.mushrooms[0])),
    'duplicate ID',
  ],
  [
    'missing content',
    (data) => {
      data.mushrooms[0].cap = '';
    },
    'missing cap',
  ],
  [
    'invalid category',
    (data) => {
      data.mushrooms[0].edibility = 'unknown';
    },
    'invalid edibility',
  ],
  [
    'out-of-range month',
    (data) => {
      data.mushrooms[0].occurrenceMonths.push(13);
    },
    'invalid occurrence months',
  ],
  [
    'missing photo',
    (data) => {
      data.mushrooms[0].photoIds.push('missing');
    },
    'unknown photo',
  ],
  [
    'wrong photo owner',
    (data) => {
      data.photos[0].mushroomId = data.mushrooms[1].id;
    },
    'photo owner mismatch',
  ],
  [
    'missing license',
    (data) => {
      data.photos[0].license = '';
    },
    'missing license',
  ],
  [
    'wrong taxon',
    (data) => {
      data.photos[0].sourceTaxon = 'Unknown species';
    },
    'source taxon mismatch',
  ],
  [
    'broken species reference',
    (data) => {
      data.mushrooms[0].similarSpecies[0].mushroomId = 'missing';
    },
    'invalid similar species reference',
  ],
  [
    'duplicate reversed pair',
    (data) => {
      data.pairs.push({ ...data.pairs[0], mushroomIds: [...data.pairs[0].mushroomIds].reverse() });
    },
    'duplicate or noncanonical pair',
  ],
  [
    'identical pair members',
    (data) => {
      data.pairs[0].mushroomIds[1] = data.pairs[0].mushroomIds[0];
    },
    'invalid pair members',
  ],
  [
    'premature expert sign-off',
    (data) => {
      data.metadata.expertReviewStatus = 'complete';
    },
    'Expert review is incomplete',
  ],
];
for (const [name, mutate, expected] of mutations)
  test(`Rejects ${name}`, () => {
    const data = structuredClone(dataset);
    mutate(data);
    assert.ok(validateAtlas(data).some((error) => error.includes(expected)));
  });
