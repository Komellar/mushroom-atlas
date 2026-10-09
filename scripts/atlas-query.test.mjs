import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { normalizeSearch, queryMushrooms } from '../src/utils/atlas-query.ts';
const species = JSON.parse(
  readFileSync(new URL('../src/data/mushrooms.json', import.meta.url), 'utf8'),
);
test('Normalizes all Polish diacritics, case and whitespace', () => {
  assert.equal(normalizeSearch('  ĄĆĘŁŃÓŚŹŻ  '), 'acelnoszz');
  assert.equal(normalizeSearch('  GORYCZAK   ŻÓŁCIOWY '), 'goryczak zolciowy');
});
test('Finds Polish names, Latin names and synonyms without diacritics', () => {
  assert.equal(queryMushrooms(species, ' zolciowy ')[0].id, 'tylopilus-felleus');
  assert.equal(queryMushrooms(species, '  BOLETUS EDULIS ')[0].id, 'boletus-edulis');
  assert.deepEqual(
    queryMushrooms(species, 'kurka').map((item) => item.id),
    ['hygrophoropsis-aurantiaca', 'cantharellus-cibarius'],
  );
});
test('Combines filters with search and handles zero results', () => {
  assert.equal(queryMushrooms(species, 'muchomor', 'poisonous').length, 4);
  assert.equal(queryMushrooms(species, 'muchomor', 'edible')[0].id, 'amanita-rubescens');
  assert.equal(queryMushrooms(species, 'goryczak', 'edible').length, 0);
  assert.equal(queryMushrooms(species, 'not-a-species').length, 0);
  assert.ok(queryMushrooms(species, '', 'inedible').every((item) => item.edibility === 'inedible'));
});
test('Finds older scientific names in documented synonym lists', () => {
  assert.equal(queryMushrooms(species, 'xerocomus badius')[0].id, 'imleria-badia');
  assert.equal(
    queryMushrooms(species, 'cantharellus tubaeformis')[0].id,
    'craterellus-tubaeformis',
  );
});
test('Sorts by Polish order without mutating input', () => {
  const originalIds = species.map((item) => item.id);
  const fake = ['Żaba', 'Zebra', 'Łąka', 'Las', 'Ćma', 'Cytryna'].map((polishName, index) => ({
    ...species[0],
    id: String(index),
    polishName,
  }));
  assert.deepEqual(
    queryMushrooms(fake, '').map((item) => item.polishName),
    ['Cytryna', 'Ćma', 'Las', 'Łąka', 'Zebra', 'Żaba'],
  );
  queryMushrooms(species, '');
  assert.deepEqual(
    species.map((item) => item.id),
    originalIds,
  );
});
