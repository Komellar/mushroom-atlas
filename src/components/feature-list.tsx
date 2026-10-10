import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.section}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.row}>
          <View style={styles.dot} accessible={false} />
          <AppText style={styles.item}>{item}</AppText>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.medium,
    padding: theme.spacing.large,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: { flexDirection: 'row', gap: theme.spacing.small },
  dot: {
    width: 5,
    height: 5,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
  item: { flex: 1, color: theme.colors.text },
});
