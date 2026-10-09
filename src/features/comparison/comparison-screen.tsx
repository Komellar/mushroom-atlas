import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { pl } from '@/locales/pl';

export default function ComparisonScreen() {
  return (
    <Page
      eyebrow={pl.comparison.eyebrow}
      title={pl.comparison.title}
      description={pl.comparison.description}
    >
      <PlaceholderPanel
        icon="git-compare-outline"
        title={pl.comparison.emptyTitle}
        description={pl.comparison.emptyDescription}
      />
      <ActionLink href="/" label={pl.comparison.atlasAction} secondary replace />
    </Page>
  );
}
