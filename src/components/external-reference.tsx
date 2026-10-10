import { Linking, Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function ExternalReference({ url, label }: { url: string; label: string }) {
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => void Linking.openURL(url)}
      style={styles.link}
    >
      <AppText style={styles.label}>{label} ↗</AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  link: { minHeight: theme.touchTarget, justifyContent: 'center' },
  label: {
    color: theme.colors.primary,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
