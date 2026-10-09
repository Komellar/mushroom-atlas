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
          <AppText accessible={false}>•</AppText>
          <AppText style={styles.item}>{item}</AppText>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: theme.spacing.small },
  row: { flexDirection: 'row', gap: theme.spacing.small },
  item: { flex: 1, color: theme.colors.text },
});
