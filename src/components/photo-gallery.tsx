import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { ExternalReference } from '@/components/external-reference';
import { getPhoto } from '@/data/atlas';
import { photoAssets } from '@/data/photo-assets';
import { pl } from '@/locales/pl';
import { theme } from '@/theme/theme';
import type { MushroomPhoto } from '@/types/atlas';

function PhotoCaption({ photo }: { photo: MushroomPhoto }) {
  return (
    <View style={styles.caption}>
      <AppText>{photo.caption}</AppText>
      <AppText>{`${pl.photos.author}: ${photo.author}`}</AppText>
      <ExternalReference url={photo.sourceUrl} label={pl.photos.source} />
      <ExternalReference
        url={photo.licenseUrl}
        label={`${pl.photos.license}: ${photo.license === 'Public domain' ? pl.photos.publicDomain : photo.license}`}
      />
      {photo.downloadUrl.includes('/thumb/') && <AppText>{pl.photos.resized}</AppText>}
    </View>
  );
}

export function PhotoGallery({ photoIds }: { photoIds: string[] }) {
  const [selected, setSelected] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const photo = getPhoto(photoIds[selected] ?? '');
  if (!photo) return null;
  const controls = (
    <View style={styles.controls}>
      <View style={styles.control}>
        <Button
          label={pl.photos.previous}
          secondary
          disabled={selected === 0}
          onPress={() => setSelected(selected - 1)}
        />
      </View>
      <AppText>{`${selected + 1} / ${photoIds.length}`}</AppText>
      <View style={styles.control}>
        <Button
          label={pl.photos.next}
          secondary
          disabled={selected === photoIds.length - 1}
          onPress={() => setSelected(selected + 1)}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.gallery}>
      <Pressable
        onPress={() => setEnlarged(true)}
        accessibilityRole="button"
        accessibilityLabel={pl.photos.enlarge}
      >
        <Image
          source={photoAssets[photo.id]}
          accessibilityLabel={photo.caption}
          style={styles.image}
          contentFit="contain"
        />
        <AppText style={styles.enlarge}>{pl.photos.enlarge} ⤢</AppText>
      </Pressable>
      {controls}
      <PhotoCaption photo={photo} />
      <Modal visible={enlarged} onRequestClose={() => setEnlarged(false)} animationType="fade">
        <SafeAreaView style={styles.modal} accessibilityViewIsModal>
          <Button label={pl.photos.close} onPress={() => setEnlarged(false)} />
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Image
              source={photoAssets[photo.id]}
              accessibilityLabel={photo.caption}
              style={styles.largeImage}
              contentFit="contain"
            />
            {controls}
            <PhotoCaption photo={photo} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  gallery: { gap: theme.spacing.medium },
  image: {
    width: '100%',
    aspectRatio: 1.3,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.medium,
  },
  enlarge: {
    color: theme.colors.primary,
    textAlign: 'center',
    minHeight: theme.touchTarget,
    padding: theme.spacing.small,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    flexWrap: 'wrap',
  },
  control: { flex: 1, minWidth: 96 },
  caption: { gap: 4 },
  modal: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
  },
  modalContent: { gap: theme.spacing.medium, paddingBottom: theme.spacing.large },
  largeImage: { width: '100%', aspectRatio: 0.85 },
});
