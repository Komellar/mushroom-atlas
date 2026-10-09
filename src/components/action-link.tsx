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
        android_ripple={{ color: theme.colors.border }}
        style={StyleSheet.flatten([styles.button, secondary ? styles.secondary : styles.primary])}
      >
        <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: theme.radius.medium,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: theme.colors.primary },
  secondary: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  label: { color: theme.colors.surface, fontSize: 16, lineHeight: 24, fontWeight: '600' },
  secondaryLabel: { color: theme.colors.primary },
});
