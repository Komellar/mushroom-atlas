import type { Mushroom, PairDifference } from '@/types/atlas';

export type ComparisonSelection = { firstId?: string; secondId?: string };
export type ComparisonSlot = 'firstId' | 'secondId';

export function resolveComparisonSelection(
  items: readonly Mushroom[],
  selection: ComparisonSelection,
): ComparisonSelection {
  const firstId = items.find((item) => item.id === selection.firstId)?.id;
  const secondId = items.find((item) => item.id === selection.secondId)?.id;
  return { firstId, secondId: firstId === secondId ? undefined : secondId };
}

export function selectComparisonSpecies(
  items: readonly Mushroom[],
  selection: ComparisonSelection,
  slot: ComparisonSlot,
  id: string,
): ComparisonSelection {
  const otherSlot = slot === 'firstId' ? 'secondId' : 'firstId';
  if (!items.some((item) => item.id === id) || selection[otherSlot] === id) return selection;
  return { ...selection, [slot]: id };
}

export function swapComparisonSpecies(selection: ComparisonSelection): ComparisonSelection {
  return { firstId: selection.secondId, secondId: selection.firstId };
}

export function findOrderedPair(
  items: readonly PairDifference[],
  firstId: string,
  secondId: string,
): PairDifference | undefined {
  if (firstId === secondId) return undefined;
  const pair = items.find(
    (item) => item.mushroomIds.includes(firstId) && item.mushroomIds.includes(secondId),
  );
  if (!pair) return undefined;
  const reversed = pair.mushroomIds[0] !== firstId;
  return {
    ...pair,
    mushroomIds: [firstId, secondId],
    differences: pair.differences.map(({ feature, values }) => ({
      feature,
      values: reversed ? [values[1], values[0]] : [values[0], values[1]],
    })),
  };
}
