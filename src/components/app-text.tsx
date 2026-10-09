import { StyleSheet, Text, type TextProps } from 'react-native';

import { theme } from '@/theme/theme';

type AppTextProps = TextProps & {
  variant?: 'title' | 'heading' | 'body' | 'eyebrow';
};

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
  base: { color: theme.colors.text },
  title: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
  heading: { fontSize: 21, lineHeight: 29, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 25, color: theme.colors.muted },
  eyebrow: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.primary,
  },
});
