import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { theme } from '@/theme/theme';

type AppTextProps = TextProps & {
  variant?: 'title' | 'heading' | 'body' | 'eyebrow' | 'caption';
};

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
  base: { color: theme.colors.text },
  title: {
    fontFamily: Platform.select({ android: 'serif', default: 'Georgia' }),
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  heading: { fontSize: 21, lineHeight: 28, fontWeight: '700', letterSpacing: -0.4 },
  body: { fontSize: 16, lineHeight: 25, color: theme.colors.muted },
  eyebrow: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: theme.colors.primary,
  },
  caption: { fontSize: 12, lineHeight: 18, color: theme.colors.muted },
});
