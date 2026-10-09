import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { SpeciesSelector } from '@/components/species-selector';
import { pl } from '@/locales/pl';
import { useState } from 'react';

export default function ComparisonScreen() {
  const [first, setFirst] = useState<string>();
  const [second, setSecond] = useState<string>();
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
