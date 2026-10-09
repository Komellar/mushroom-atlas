import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function ComparisonRow({ label, values }: { label: string; values: [string, string] }) {
  return (
    <View style={styles.row}>
      <AppText variant="heading" accessibilityRole="header">
        {label}
      </AppText>
      <View style={styles.columns}>
        {values.map((value, index) => (
          <View key={index} style={[styles.cell, index === 1 && styles.second]}>
            <AppText>{value}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    gap: theme.spacing.small,
    paddingVertical: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  columns: { flexDirection: 'row', alignItems: 'stretch' },
  cell: { flex: 1, minWidth: 0, paddingRight: theme.spacing.small },
  second: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    paddingLeft: theme.spacing.small,
    paddingRight: 0,
  },
});
