import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href, Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '@/theme/theme';

type ActionLinkProps = {
  href: Href;
  label: string;
  secondary?: boolean;
  replace?: boolean;
};

export function ActionLink({ href, label, secondary = false, replace = false }: ActionLinkProps) {
  return (
    <Link href={href} replace={replace} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={label}
        android_ripple={{ color: theme.colors.border }}
        style={StyleSheet.flatten([styles.button, secondary ? styles.secondary : styles.primary])}
      >
        <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
        <Ionicons
          name="arrow-forward"
          size={19}
          color={secondary ? theme.colors.primary : theme.colors.surface}
          accessible={false}
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: theme.radius.small,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  primary: { backgroundColor: theme.colors.primary },
  secondary: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  label: {
    color: theme.colors.surface,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    flexShrink: 1,
  },
  secondaryLabel: { color: theme.colors.primary },
});
