import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function ComparisonRow({
  label,
  values,
}: {
  label: string;
  values: [string | readonly string[], string | readonly string[]];
}) {
  const columns = values.map((value) => (typeof value === 'string' ? [value] : value));
  const rowCount = Math.max(...columns.map((column) => column.length));
  return (
    <View style={styles.row}>
      <AppText variant="heading" accessibilityRole="header" style={styles.label}>
        {label}
      </AppText>
      <View>
        {Array.from({ length: rowCount }, (_, rowIndex) => (
          <View
            key={rowIndex}
            style={[styles.columns, rowIndex > 0 && styles.nextRow]}
            testID={`comparison-value-row-${rowIndex}`}
          >
            {columns.map((column, index) => (
              <View key={index} style={[styles.cell, index === 1 && styles.second]}>
                {column[rowIndex] && <AppText style={styles.value}>{column[rowIndex]}</AppText>}
              </View>
            ))}
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
  nextRow: { paddingTop: theme.spacing.medium },
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
