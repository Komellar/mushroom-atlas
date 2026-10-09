import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { atlasMetadata } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function SafetyNotice() {
  return (
    <View style={styles.panel}>
      <AppText variant="heading" accessibilityRole="header">
        {pl.safety.title}
      </AppText>
      <AppText>{pl.safety.guidance}</AppText>
      {atlasMetadata.expertReviewStatus === 'pending' && (
        <AppText style={styles.pending}>{pl.safety.reviewPending}</AppText>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  panel: {
    gap: theme.spacing.small,
    backgroundColor: theme.colors.warningSoft,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.medium,
  },
  pending: { color: theme.colors.warning, fontWeight: '600' },
});
