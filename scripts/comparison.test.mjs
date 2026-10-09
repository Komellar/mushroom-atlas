import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  findOrderedPair,
  resolveComparisonSelection,
  selectComparisonSpecies,
  swapComparisonSpecies,
} from '../src/utils/comparison.ts';

const mushrooms = JSON.parse(
  await readFile(new URL('../src/data/mushrooms.json', import.meta.url)),
);
const pairs = JSON.parse(await readFile(new URL('../src/data/pairs.json', import.meta.url)));
const firstId = mushrooms[0].id;
const secondId = mushrooms[1].id;

test('selection resolves valid route parameters and rejects unknown or identical species', () => {
  assert.deepEqual(resolveComparisonSelection(mushrooms, { firstId, secondId }), {
    firstId,
    secondId,
  });
  assert.deepEqual(resolveComparisonSelection(mushrooms, { firstId, secondId: firstId }), {
    firstId,
    secondId: undefined,
  });
  assert.deepEqual(resolveComparisonSelection(mushrooms, { firstId: 'unknown', secondId }), {
    firstId: undefined,
    secondId,
  });
});

test('either slot can be replaced while duplicate and unknown selections preserve the pair', () => {
  const original = { firstId, secondId };
  assert.equal(selectComparisonSpecies(mushrooms, original, 'firstId', secondId), original);
  assert.equal(selectComparisonSpecies(mushrooms, original, 'secondId', firstId), original);
  assert.equal(selectComparisonSpecies(mushrooms, original, 'secondId', 'unknown'), original);
  const thirdId = mushrooms[2].id;
  assert.deepEqual(selectComparisonSpecies(mushrooms, original, 'firstId', thirdId), {
    firstId: thirdId,
    secondId,
  });
  assert.deepEqual(selectComparisonSpecies(mushrooms, original, 'secondId', thirdId), {
    firstId,
    secondId: thirdId,
  });
  assert.deepEqual(original, { firstId, secondId });
});

test('swapping is reversible and does not mutate the selection', () => {
  const original = { firstId, secondId };
  const swapped = swapComparisonSpecies(original);
  assert.deepEqual(swapped, { firstId: secondId, secondId: firstId });
  assert.deepEqual(swapComparisonSpecies(swapped), original);
  assert.deepEqual(original, { firstId, secondId });
});

test('curated lookup follows column order without changing source data', () => {
  const before = structuredClone(pairs);
  for (const pair of pairs) {
    const [left, right] = pair.mushroomIds;
    const direct = findOrderedPair(pairs, left, right);
    const reverse = findOrderedPair(pairs, right, left);
    assert.deepEqual(direct, pair);
    assert.deepEqual(reverse.mushroomIds, [right, left]);
    assert.deepEqual(
      reverse.differences,
      pair.differences.map(({ feature, values }) => ({ feature, values: [values[1], values[0]] })),
    );
  }
  assert.deepEqual(pairs, before);
  assert.equal(findOrderedPair(pairs, firstId, firstId), undefined);
  assert.equal(findOrderedPair(pairs, firstId, 'unknown'), undefined);
});

test('every different species pair supports selection; undocumented pairs stay uncurated', () => {
  for (const first of mushrooms) {
    for (const second of mushrooms) {
      if (first.id === second.id) continue;
      assert.deepEqual(
        resolveComparisonSelection(mushrooms, { firstId: first.id, secondId: second.id }),
        { firstId: first.id, secondId: second.id },
      );
      const documented = pairs.some(
        (pair) => pair.mushroomIds.includes(first.id) && pair.mushroomIds.includes(second.id),
      );
      assert.equal(Boolean(findOrderedPair(pairs, first.id, second.id)), documented);
    }
  }
});
