import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ActionLink } from '@/components/action-link';
import { AppText } from '@/components/app-text';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { EdibilityBadge } from '@/components/edibility-badge';
import { FeatureList } from '@/components/feature-list';
import { PhotoGallery } from '@/components/photo-gallery';
import { OccurrenceMonths } from '@/components/occurrence-months';
import { SafetyNotice } from '@/components/safety-notice';
import { getMushroom } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function MushroomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mushroom = getMushroom(id);

  if (mushroom)
    return (
      <Page
        eyebrow={pl.details.eyebrow}
        title={mushroom.polishName}
        description={mushroom.scientificName}
      >
        <EdibilityBadge edibility={mushroom.edibility} />
        <AppText>{mushroom.edibilityNote}</AppText>
        <FeatureList title={pl.species.keyFeatures} items={mushroom.keyFeatures} />
        <PhotoGallery key={mushroom.id} photoIds={mushroom.photoIds} />
        <OccurrenceMonths months={mushroom.occurrenceMonths} note={mushroom.occurrenceNote} />
        <SafetyNotice />
        <ActionLink href="/compare" label={pl.details.comparisonAction} />
      </Page>
    );

  if (id !== 'preview') {
    return (
      <Page title={pl.details.missingTitle} description={pl.details.missingDescription}>
        <ActionLink href="/" label={pl.details.atlasAction} replace />
      </Page>
    );
  }

  return (
    <Page
      eyebrow={pl.details.eyebrow}
      title={pl.details.title}
      description={pl.details.description}
    >
      <PlaceholderPanel
        icon="book-outline"
        title={pl.details.emptyTitle}
        description={pl.details.emptyDescription}
      />
      <View style={styles.actions}>
        <ActionLink href="/compare" label={pl.details.comparisonAction} replace />
        <ActionLink href="/" label={pl.details.atlasAction} secondary replace />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  actions: { gap: theme.spacing.medium },
});
