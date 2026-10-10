import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { atlasMetadata } from '@/data/atlas';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function SafetyNotice() {
  return (
    <View style={styles.panel}>
      <View style={styles.heading}>
        <Ionicons name="shield-outline" color={theme.colors.warning} size={22} accessible={false} />
        <AppText variant="heading" accessibilityRole="header" style={styles.title}>
          {pl.safety.title}
        </AppText>
      </View>
      <AppText>{pl.safety.guidance}</AppText>
      {atlasMetadata.expertReviewStatus === 'pending' && (
        <AppText variant="caption" style={styles.pending}>
          {pl.safety.reviewPending}
        </AppText>
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
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  heading: { flexDirection: 'row', gap: theme.spacing.small, alignItems: 'center' },
  title: { flex: 1, fontSize: 18, lineHeight: 25, color: theme.colors.warning },
  pending: { color: theme.colors.warning, fontWeight: '600' },
});
