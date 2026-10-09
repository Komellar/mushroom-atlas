import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Month } from '@/types/atlas';

export function OccurrenceMonths({ months, note }: { months: Month[]; note: string }) {
  return (
    <View style={styles.section}>
      <AppText variant="heading" accessibilityRole="header">
        {pl.species.occurrence}
      </AppText>
      <View style={styles.months}>
        {pl.months.short.map((name, index) => {
          const active = months.includes((index + 1) as Month);
          return (
            <View
              key={name}
              accessible
              accessibilityLabel={`${pl.months.full[index]}: ${active ? pl.months.active : pl.months.inactive}`}
              style={[styles.month, active && styles.active]}
            >
              <AppText style={active ? styles.activeText : undefined}>
                {active ? '● ' : ''}
                {name}
              </AppText>
            </View>
          );
        })}
      </View>
      <AppText>{note}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: theme.spacing.small },
  months: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.small },
  month: {
    minWidth: 56,
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
  },
  active: { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.primary },
  activeText: { fontWeight: '700', color: theme.colors.primary },
});
