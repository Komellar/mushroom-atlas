import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { EdibilityBadge } from '@/components/edibility-badge';
import { getPhoto } from '@/data/atlas';
import { thumbnailAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { Mushroom } from '@/types/atlas';

export function SpeciesCard({ mushroom }: { mushroom: Mushroom }) {
  const photo = getPhoto(mushroom.photoIds[0] ?? '');
  return (
    <Link href={{ pathname: '/mushrooms/[id]', params: { id: mushroom.id } }} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${mushroom.polishName}, ${mushroom.scientificName}, ${pl.edibility[mushroom.edibility]}`}
        style={styles.card}
        android_ripple={{ color: theme.colors.primarySoft }}
      >
        {photo && (
          <Image
            source={thumbnailAssets[photo.id]}
            accessibilityLabel={photo.caption}
            style={styles.image}
            contentFit="cover"
          />
        )}
        <View style={styles.copy}>
          <View style={styles.meta}>
            <EdibilityBadge edibility={mushroom.edibility} />
            <View
              style={styles.photoCount}
              accessible
              accessibilityLabel={`${pl.photos.gallery}: ${mushroom.photoIds.length}`}
            >
              <Ionicons
                name="images-outline"
                size={16}
                color={theme.colors.muted}
                accessible={false}
              />
              <AppText variant="caption">{mushroom.photoIds.length}</AppText>
            </View>
          </View>
          <AppText variant="heading">{mushroom.polishName}</AppText>
          <AppText style={styles.scientific}>{mushroom.scientificName}</AppText>
          <View style={styles.cardFooter}>
            <AppText style={styles.action}>{pl.atlas.openSpecies}</AppText>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={theme.colors.primary}
              accessible={false}
            />
          </View>
          {photo && (
            <AppText
              variant="caption"
              style={styles.credit}
            >{`${pl.photos.author}: ${photo.author} · ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}</AppText>
          )}
        </View>
      </Pressable>
    </Link>
  );
}
const styles = StyleSheet.create({
  card: {
    ...theme.shadow.card,
    flex: 1,
    borderRadius: theme.radius.large,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1.65, backgroundColor: theme.colors.subtle },
  copy: { padding: theme.spacing.large, gap: theme.spacing.small },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.small,
  },
  photoCount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  scientific: { fontStyle: 'italic', fontSize: 14, lineHeight: 21 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    marginTop: theme.spacing.small,
  },
  action: { color: theme.colors.primary, fontSize: 13, fontWeight: '700' },
  credit: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.small,
    marginTop: theme.spacing.small,
  },
});
