import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function AtlasHero({ speciesCount }: { speciesCount: number }) {
  return (
    <View style={styles.hero}>
      <View style={styles.decoration} pointerEvents="none" accessible={false}>
        <Ionicons name="leaf-outline" size={156} color={theme.colors.forestMuted} />
      </View>
      <AppText variant="eyebrow" style={styles.eyebrow}>
        {pl.atlas.eyebrow}
      </AppText>
      <AppText variant="title" accessibilityRole="header" style={styles.title}>
        {pl.atlas.title}
      </AppText>
      <AppText style={styles.description}>{pl.atlas.description}</AppText>
      <View style={styles.footer}>
        <AppText style={styles.meta}>{`${pl.atlas.speciesCount}: ${speciesCount}`}</AppText>
        <View style={styles.offline}>
          <Ionicons
            name="cloud-offline-outline"
            size={15}
            color={theme.colors.forestMuted}
            accessible={false}
          />
          <AppText variant="caption" style={styles.meta}>
            {pl.atlas.offline}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: theme.spacing.large,
    gap: theme.spacing.small,
    backgroundColor: theme.colors.forest,
    borderRadius: theme.radius.large,
    overflow: 'hidden',
  },
  decoration: {
    position: 'absolute',
    right: -28,
    top: -20,
    opacity: 0.1,
    transform: [{ rotate: '-25deg' }],
  },
  eyebrow: { color: theme.colors.accent, fontSize: 10, letterSpacing: 2 },
  title: {
    color: theme.colors.onForest,
    maxWidth: 340,
    marginTop: 4,
    fontSize: 34,
    lineHeight: 40,
  },
  description: { color: theme.colors.forestMuted, maxWidth: 440, fontSize: 14, lineHeight: 22 },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  offline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  meta: { color: theme.colors.forestMuted, fontSize: 12, lineHeight: 18 },
});
