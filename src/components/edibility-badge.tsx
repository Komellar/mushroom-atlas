import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Edibility } from '@/types/atlas';

const appearances = {
  edible: {
    icon: 'checkmark-circle-outline',
    color: theme.colors.primary,
    background: theme.colors.primarySoft,
  },
  inedible: {
    icon: 'remove-circle-outline',
    color: theme.colors.warning,
    background: theme.colors.warningSoft,
  },
  poisonous: {
    icon: 'warning-outline',
    color: theme.colors.danger,
    background: theme.colors.dangerSoft,
  },
} as const;

export function EdibilityBadge({ edibility }: { edibility: Edibility }) {
  const appearance = appearances[edibility];
  return (
    <View
      accessible
      accessibilityLabel={pl.edibility[edibility]}
      style={[styles.badge, { backgroundColor: appearance.background }]}
    >
      <Ionicons name={appearance.icon} color={appearance.color} size={22} accessible={false} />
      <AppText style={[styles.text, { color: appearance.color }]}>
        {pl.edibility[edibility]}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.spacing.small,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    maxWidth: '100%',
  },
  text: { fontWeight: '700', flexShrink: 1 },
});
