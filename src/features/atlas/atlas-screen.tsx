import { StyleSheet, View } from 'react-native';

import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { PlaceholderPanel } from '@/components/placeholder-panel';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export default function AtlasScreen() {
  return (
    <Page eyebrow={pl.atlas.eyebrow} title={pl.atlas.title} description={pl.atlas.description}>
      <PlaceholderPanel
        icon="leaf-outline"
        title={pl.atlas.emptyTitle}
        description={pl.atlas.emptyDescription}
      />
      <View style={styles.actions}>
        <ActionLink href="/mushrooms/preview" label={pl.atlas.previewAction} />
        <ActionLink href="/compare" label={pl.atlas.comparisonAction} secondary />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  actions: { gap: theme.spacing.medium },
});
