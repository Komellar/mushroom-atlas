import { StyleSheet, View } from 'react-native';

import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { SafetyNotice } from '@/components/safety-notice';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

import { InitialSpecies } from './initial-species';

export default function AtlasScreen() {
  return (
    <Page eyebrow={pl.atlas.eyebrow} title={pl.atlas.title} description={pl.atlas.description}>
      <SafetyNotice />
      <View style={styles.actions}>
        <ActionLink href="/compare" label={pl.atlas.comparisonAction} secondary />
      </View>
      <InitialSpecies />
    </Page>
  );
}

const styles = StyleSheet.create({
  actions: { gap: theme.spacing.medium },
});
