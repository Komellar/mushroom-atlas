import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function ComparisonRow({ label, values }: { label: string; values: [string, string] }) {
  return (
    <View style={styles.row}>
      <AppText variant="heading" accessibilityRole="header" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.columns}>
        {values.map((value, index) => (
          <View key={index} style={[styles.cell, index === 1 && styles.second]}>
            <AppText style={styles.value}>{value}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    gap: theme.spacing.small,
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surface,
  },
  columns: { flexDirection: 'row', alignItems: 'stretch' },
  label: { fontSize: 18, lineHeight: 25 },
  value: { fontSize: 14, lineHeight: 22 },
  cell: { flex: 1, minWidth: 0, paddingRight: theme.spacing.small },
  second: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    paddingLeft: theme.spacing.small,
    paddingRight: 0,
  },
});
