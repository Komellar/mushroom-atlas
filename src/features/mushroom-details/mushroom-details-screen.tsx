import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function MushroomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
