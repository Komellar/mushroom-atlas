import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme/theme';

export function Disclosure({
  title,
  children,
  compact = false,
}: PropsWithChildren<{ title: string; compact?: boolean }>) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={[styles.panel, compact && styles.compactPanel]}>
      <Pressable
        onPress={() => setExpanded((value) => !value)}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        aria-expanded={expanded}
        style={({ pressed }) => [
          styles.toggle,
          compact && styles.compactToggle,
          pressed && styles.pressed,
        ]}
      >
        {!compact && <AppText style={styles.title}>{title}</AppText>}
        <Ionicons
          name={
            compact
              ? expanded
                ? 'close-outline'
                : 'information-circle-outline'
              : expanded
                ? 'chevron-up'
                : 'chevron-down'
          }
          color={theme.colors.primary}
          size={20}
          accessible={false}
        />
      </Pressable>
      {expanded && (
        <View style={styles.content}>
          {compact && (
            <AppText variant="caption" style={styles.title}>
              {title}
            </AppText>
          )}
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.medium,
    overflow: 'hidden',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    padding: theme.spacing.medium,
    gap: theme.spacing.small,
  },
  title: { flex: 1, color: theme.colors.primary, fontWeight: '600' },
  compactPanel: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: theme.radius.small,
  },
  compactToggle: {
    alignSelf: 'flex-end',
    width: theme.touchTarget,
    minHeight: theme.touchTarget,
    padding: 0,
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primarySoft,
  },
  content: { padding: theme.spacing.medium, paddingTop: 0, gap: theme.spacing.small },
  pressed: { backgroundColor: theme.colors.primarySoft },
});
