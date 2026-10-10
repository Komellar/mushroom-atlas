import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { theme } from '@/theme/theme';

export function IconButton({
  icon,
  label,
  onPress,
  disabled = false,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      aria-disabled={disabled}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dim]}
    >
      <Ionicons name={icon} size={22} color={theme.colors.primary} accessible={false} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: theme.touchTarget,
    height: theme.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primarySoft,
  },
  dim: { opacity: 0.4 },
});
