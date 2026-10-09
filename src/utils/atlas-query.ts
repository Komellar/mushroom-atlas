import type { Edibility, Mushroom } from '../types/atlas';

export type EdibilityFilter = Edibility | 'all';
export function normalizeSearch(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('pl')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/\s+/g, ' ');
}
const polishOrder = new Intl.Collator('pl', { sensitivity: 'base' });
export function queryMushrooms(
  items: readonly Mushroom[],
  query: string,
  filter: EdibilityFilter = 'all',
) {
  const normalized = normalizeSearch(query);
  return items
    .filter(
      (item) =>
        (filter === 'all' || item.edibility === filter) &&
        [item.polishName, item.scientificName, ...item.synonyms].some((name) =>
          normalizeSearch(name).includes(normalized),
        ),
    )
    .sort(
      (first, second) =>
        polishOrder.compare(first.polishName, second.polishName) ||
        first.id.localeCompare(second.id),
    );
}
