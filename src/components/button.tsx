import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: ComponentProps<typeof Ionicons>['name'];
};

export function Button({ label, onPress, secondary = false, disabled = false, icon }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        secondary && styles.secondary,
        (pressed || disabled) && styles.dim,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={19}
          color={secondary ? theme.colors.primary : theme.colors.surface}
          accessible={false}
        />
      )}
      <AppText style={[styles.label, secondary && styles.secondaryLabel]}>{label}</AppText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: theme.touchTarget,
    borderRadius: theme.radius.small,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.medium,
    flexDirection: 'row',
    gap: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  secondary: { backgroundColor: theme.colors.primarySoft },
  label: {
    color: theme.colors.surface,
    fontWeight: '600',
    textAlign: 'center',
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  secondaryLabel: { color: theme.colors.primary },
  dim: { opacity: 0.65 },
});
