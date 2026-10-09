import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { getMushroom } from '@/data/atlas';
import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { SpeciesSelector } from '@/components/species-selector';
import { pl } from '@/locales/pl';

export default function ComparisonScreen() {
  const params = useLocalSearchParams<{ first?: string; second?: string }>();
  const first = getMushroom(params.first)?.id;
  const second = getMushroom(params.second)?.id;
  return (
    <ComparisonContent
      key={`${params.first ?? ''}|${params.second ?? ''}`}
      initialFirst={first}
      initialSecond={first !== second ? second : undefined}
    />
  );
}

function ComparisonContent({
  initialFirst,
  initialSecond,
}: {
  initialFirst?: string;
  initialSecond?: string;
}) {
  const [first, setFirst] = useState(initialFirst);
  const [second, setSecond] = useState(initialSecond);
  return (
    <Page
      eyebrow={pl.comparison.eyebrow}
      title={pl.comparison.title}
      description={pl.comparison.description}
    >
      <SpeciesSelector
        label={pl.selection.first}
        selectedId={first}
        excludedId={second}
        onSelect={setFirst}
      />
      <SpeciesSelector
        label={pl.selection.second}
        selectedId={second}
        excludedId={first}
        onSelect={setSecond}
      />
      <PlaceholderPanel
        icon="git-compare-outline"
        title={pl.comparison.emptyTitle}
        description={pl.comparison.emptyDescription}
      />
      <ActionLink href="/" label={pl.comparison.atlasAction} secondary replace />
    </Page>
  );
}
