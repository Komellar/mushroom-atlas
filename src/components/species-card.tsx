import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { EdibilityBadge } from '@/components/edibility-badge';
import { getPhoto } from '@/data/atlas';
import { photoAssets } from '@/data/photo-assets';
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
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {photo && (
          <Image
            source={photoAssets[photo.id]}
            accessibilityLabel={photo.caption}
            style={styles.image}
            contentFit="cover"
          />
        )}
        <View style={styles.copy}>
          <EdibilityBadge edibility={mushroom.edibility} />
          <AppText variant="heading">{mushroom.polishName}</AppText>
          <AppText style={styles.scientific}>{mushroom.scientificName}</AppText>
          {photo && (
            <AppText
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
    borderRadius: theme.radius.large,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1.7 },
  copy: { padding: theme.spacing.medium, gap: theme.spacing.small },
  scientific: { fontStyle: 'italic' },
  credit: { fontSize: 12, lineHeight: 18 },
  pressed: { opacity: 0.8 },
});
