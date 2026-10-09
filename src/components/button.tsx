import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

type ButtonProps = { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean };

export function Button({ label, onPress, secondary = false, disabled = false }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        secondary && styles.secondary,
        (pressed || disabled) && styles.dim,
      ]}
    >
      <AppText style={[styles.label, secondary && styles.secondaryLabel]}>{label}</AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: theme.touchTarget,
    borderRadius: theme.radius.medium,
    padding: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  secondary: { backgroundColor: theme.colors.primarySoft },
  label: { color: theme.colors.surface, fontWeight: '600', textAlign: 'center' },
  secondaryLabel: { color: theme.colors.primary },
  dim: { opacity: 0.65 },
});
