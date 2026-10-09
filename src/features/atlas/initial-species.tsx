import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { getPhoto, mushrooms } from '@/data/atlas';
import { photoAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';

export function InitialSpecies() {
  return (
    <View style={styles.list}>
      <AppText variant="heading">{pl.atlas.initialSpecies}</AppText>
      <AppText>{pl.safety.reviewPending}</AppText>
      <AppText>{pl.safety.guidance}</AppText>
      {mushrooms.map((mushroom) => {
        const photo = getPhoto(mushroom.photoIds[0] ?? '');
        if (!photo) return null;
        return (
          <View key={mushroom.id} style={styles.item}>
            <Image
              source={photoAssets[photo.id]}
              accessibilityLabel={photo.caption}
              style={styles.image}
            />
            <View style={styles.copy}>
              <AppText variant="heading">{mushroom.polishName}</AppText>
              <AppText>{mushroom.scientificName}</AppText>
              <AppText>{pl.edibility[mushroom.edibility]}</AppText>
              <AppText>{`${pl.photos.author}: ${photo.author} · ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}</AppText>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: theme.spacing.medium },
  item: {
    gap: theme.spacing.medium,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.medium,
  },
  image: { width: '100%', height: 180, borderRadius: theme.radius.medium },
  copy: { gap: theme.spacing.small },
});
